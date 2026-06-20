/**
 * Prefix a public asset path with the Next.js basePath.
 *
 * When deployed to GitHub Pages (e.g. https://user.github.io/3d-earth-garden),
 * Next.js sets <base href="/3d-earth-garden/"> in the HTML so relative URLs
 * resolve correctly. However, absolute paths like `/models/plant.glb` bypass
 * the <base> tag entirely — useGLTF.preload and useTexture hit those paths
 * directly and will 404 without the prefix.
 *
 * NEXT_PUBLIC_BASE_PATH is injected at build time from next.config.ts basePath
 * (or via the CI env). Falls back to empty string for local dev.
 */
export function assetPath(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return `${base}${path}`;
}