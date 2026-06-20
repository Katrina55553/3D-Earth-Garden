import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  // Static export for GitHub Pages (no SSR / API routes needed)
  output: "export",

  // GitHub Pages serves from a sub-path (https://<user>.github.io/3d-earth-garden/)
  basePath: isProd ? "/3d-earth-garden" : "",

  // Let client code read the basePath at runtime
  env: {
    NEXT_PUBLIC_BASE_PATH: isProd ? "/3d-earth-garden" : "",
  },
};

export default nextConfig;