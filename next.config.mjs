import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** Set by GitHub Actions for project pages (`/repo-name`). Empty for local dev or `*.github.io` user sites. */
const basePath = (process.env.BASE_PATH ?? "").replace(/\/$/, "");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  /** Prefer this repo when another lockfile exists higher in the directory tree (e.g. user home). */
  outputFileTracingRoot: path.join(__dirname),
  /**
   * Avoids dev-only UI that can interact badly with the App Router client manifest
   * (see Next devtools segment explorer). Pages still work; build is unchanged.
   */
  devIndicators: false,
  /** Static export for GitHub Pages (no Node server). */
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
};

export default nextConfig;
