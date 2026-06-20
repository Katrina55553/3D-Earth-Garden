# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Commands

| Task | Command |
|------|---------|
| Dev server | `npm run dev` |
| Production build | `npm build` |
| Lint | `npm run lint` |

No test framework is configured.

## Next.js Warning

This project uses **Next.js 15.5.6** with breaking API changes from earlier versions. Before writing any Next.js code, read the relevant guide in `node_modules/next/dist/docs/`. Heed deprecation notices.

## Tech Stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript 5**
- **Three.js 0.184** via **React Three Fiber 9** + **Drei 10**
- **GSAP** for 3D camera fly-to animations; **Framer Motion** for UI transitions
- **Tailwind CSS 3.4** for styling

## Architecture

A single-page 3D interactive globe that displays 51 plants (7 species) at real-world lat/lng coordinates.

**Data flow**: `page.tsx` wraps everything in `AppProvider` (React Context in `store/AppContext.tsx`). Context holds filter state (continent, vegetation type, climate) and selection state (selected species name). Filtered results are derived via `useMemo`.

**3D layer** (`components/EarthScene.tsx`): R3F `Canvas` with `<Earth>`, `<PlantsLayer>`, `<Starfield>`, and `<OrbitControls>`. `PlantsLayer` renders a `<PlantModel>` for each of the 51 plants. Non-matching plants get `dimmed` (opacity 0.12). Camera fly-to uses GSAP timelines.

**Plant placement** (`utils/coordinates.ts`): `latLngToPosition(lat, lng, radius)` converts geographic coords to `[x, y, z]` on a sphere. `PlantModel.tsx` uses quaternion math (`setFromUnitVectors`) to orient models outward from the surface.

**UI layer** (`components/ui/`): Fixed overlay with `pointer-events-none`. `ControlPanel` (bottom filter tabs/dropdowns), `PlantInfoCard` (right-side species detail card animated by Framer Motion), `TopStats` (visible/total count).

**Data** (`data/plants.ts`): `PlantData` interface with 51 entries across 7 species. Each entry has `id`, `name`, `latinName`, `latitude`, `longitude`, `continent`, `vegetationType`, `climateFeature`, `modelPath`, `description`.

## Path Alias

`@/*` maps to `./src/*` (configured in tsconfig.json).

## Known Issues

- GLB model files in `public/models/` have Chinese filenames with encoding problems (see `problem.md`)
- `PlantModel.tsx` traverses the scene graph every frame — potential performance/memory concern at scale
- No loading state, error boundaries, or mobile touch support yet
