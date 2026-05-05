import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** Set by GitHub Actions for project pages (`/repo-name`). Empty for local dev or `*.github.io` user sites. */
const basePath = (process.env.BASE_PATH ?? "").replace(/\/$/, "");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  /** Point to the main project root so Turbopack can find node_modules (worktree support). */
  outputFileTracingRoot: path.join(__dirname, "..", "..", "..", ".."),
  /** Turbopack root must match outputFileTracingRoot. */
  turbopack: {
    root: path.join(__dirname, "..", "..", "..", ".."),
  },
  /**
   * Avoids dev-only UI that can interact badly with the App Router client manifest
   * (see Next devtools segment explorer). Pages still work; build is unchanged.
   */
  devIndicators: false,
  /** Static export for GitHub Pages (no Node server). */
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  async redirects() {
    return [
      { source: "/products/fix-111", destination: "/products/tiles-adhesive/fix-111", permanent: true },
      { source: "/products/fix-222", destination: "/products/tiles-adhesive/fix-222", permanent: true },
      { source: "/products/fix-333", destination: "/products/tiles-adhesive/fix-333", permanent: true },
      { source: "/products/fix-444", destination: "/products/tiles-adhesive/fix-444", permanent: true },
      { source: "/products/fix-555", destination: "/products/tiles-adhesive/fix-555", permanent: true },
      { source: "/products/fix-c1t-111", destination: "/products/tiles-adhesive/fix-111", permanent: true },
      { source: "/products/fix-c2t-222", destination: "/products/tiles-adhesive/fix-222", permanent: true },
      { source: "/products/fix-c2te-333", destination: "/products/tiles-adhesive/fix-333", permanent: true },
      { source: "/products/fix-c2tes1-444", destination: "/products/tiles-adhesive/fix-444", permanent: true },
      { source: "/products/fix-c2tes2-555", destination: "/products/tiles-adhesive/fix-555", permanent: true },
    ];
  },
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
};

export default nextConfig;
