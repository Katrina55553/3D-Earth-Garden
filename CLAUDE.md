# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Commands

| Task | Command |
|------|---------|
| Dev server | `npm run dev` |
| Production build | `npm run build` |
| Production preview | `npm start` |
| Lint | `npm run lint` |

No test framework is configured. The build emits a fully static site to `out/` (configured via `next.config.ts`).

## Next.js Warning

This project uses **Next.js 15.5.6** with breaking API changes from earlier versions. Before writing any Next.js code, read the relevant guide in `node_modules/next/dist/docs/`. Heed deprecation notices. `AGENTS.md` repeats the same rule — do not skip it.

## Tech Stack

- **Next.js 15** (App Router, `output: "export"`) + **React 19** + **TypeScript 5**
- **Three.js 0.184** via **React Three Fiber 9** + **Drei 10**
- **GSAP** for 3D camera fly-to animations; **Framer Motion** for UI transitions
- **Tailwind CSS 3.4** for styling

## Architecture

A single-page 3D interactive globe. The user clicks anywhere on the globe surface; the nearest **country** (of 25 hard-coded entries in `src/data/countries.ts`) is selected and a side card displays its info. The globe has radius **1.2** and the default camera is at `[0, 1.5, 5]`.

**Selection flow** (the most important thing to understand):

1. `Earth.tsx` captures `pointerdown` and `click` events. If the pointer moved more than `CLICK_DRAG_THRESHOLD_PX` (5 px) between down and up, the click is suppressed — that's an `OrbitControls` drag, not a real tap.
2. On a real click, `Earth` calls `onSurfaceSelect(lat, lng)`. The hit point is normalized and converted back via `positionToLatLng` in `src/utils/coordinates.ts`.
3. `EarthScene.tsx`'s `handleSurfaceSelect` finds the nearest country in the currently filtered set using `haversineDistanceKm`. Filter scope falls back to all countries if the filtered set is empty.
4. Selection state lives in `store/AppContext.tsx`. A `useEffect` there auto-clears the selection if the chosen country is filtered out — the info card will not stay open pointing at something invisible.

**Camera animation** — `EarthScene.tsx` runs two GSAP timelines:

- `flyToCountry` — interpolates `camera.position` and `controls.target` toward a point along the surface normal at `radius = 1.22 + 0.92 = 2.14` from origin.
- `flyBackToDefault` — restores the initial `[0, 1.5, 5]` camera and `[0, 0, 0]` target.

Both set `isAnimating.current = true` and disable `OrbitControls` during the tween to prevent user input from fighting the animation; the `onComplete` hook restores both.

**Layered UI** — `components/ui/AppUI.tsx` is a single fixed overlay with `pointer-events-none`; individual panels re-enable pointer events (`pointer-events-auto`) where they need to be clickable. Layout: `TopStats` (top center, header + counts), `CountryInfoCard` (right side, Framer Motion enter/exit), `ControlPanel` (bottom, continent tabs + reset button).

**Data** — `CountryData` shape: `id, name, capital, population, areaKm2, continent, climate, latitude, longitude, flagEmoji, description`. The continent list shown in the filter is derived at runtime via `getFilterOptions()` in `AppContext.tsx`.

## Deployment & Asset Paths

The site is statically exported and deployed to **GitHub Pages** by `.github/workflows/deploy.yml`. CI sets `BASE_PATH: /<repo-name>` at build time; locally it's empty so `next dev` and `next build` work at `/`.

**Always load `public/` assets through `src/utils/assetPath.ts`.** The `<base href="…">` tag Next.js emits covers relative URLs but **not** absolute ones like `/textures/earth.jpg` or `/models/foo.glb` — those bypass the base and 404 on GitHub Pages. `assetPath("/textures/earth.jpg")` prefixes `process.env.NEXT_PUBLIC_BASE_PATH` and is the supported way to reference anything under `public/`. Any new texture, model, or `useGLTF.preload` call must go through this helper.

## Path Alias

`@/*` maps to `./src/*` (configured in tsconfig.json). Use it consistently — do not reach across with relative `../../` paths from `src/components/ui/`.

## Known Quirks

- `Starfield.tsx` uses `Math.random()` for star positions — fine in dev, but the starfield will differ across renders. Don't rely on it being deterministic.
- `useProgress` (drei) reads `THREE.DefaultLoadingManager`, so the loading overlay correctly tracks GLB/texture streaming even though it lives outside the `<Canvas>`.
- `SceneErrorBoundary` is intentionally outside the `<Canvas>` — R3F children aren't real DOM, so the standard React error boundary pattern doesn't apply to scene-internal errors. This boundary only catches failures from the overlay/UI children.
- Globe radius is hard-coded to **1.2** in both `Earth.tsx` (`<sphereGeometry args={[1.2, 64, 64]} />`) and `latLngToPosition`'s default. Camera fly-to distance constants (`1.22`, `0.92`) are tuned to that radius — change all three together if you resize the globe.
