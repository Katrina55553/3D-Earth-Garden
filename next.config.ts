import type { NextConfig } from "next";

// Only set a sub-path when the deploy target explicitly needs one.
// This keeps local production previews (`next build`) working at `/`
// while GitHub Pages can still opt into `/3d-earth-garden`.
const basePath = process.env.BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // Static export for GitHub Pages (no SSR / API routes needed)
  output: "export",
  basePath,

  // Let client code read the resolved basePath at build time.
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
