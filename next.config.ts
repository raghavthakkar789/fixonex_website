import type { NextConfig } from "next";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  reactStrictMode: true,
  /** Prefer this repo when another lockfile exists higher in the directory tree (e.g. user home). */
  outputFileTracingRoot: path.join(__dirname),
  /**
   * Avoids dev-only UI that can interact badly with the App Router client manifest
   * (see Next devtools segment explorer). Pages still work; build is unchanged.
   */
  devIndicators: false,
};

export default nextConfig;
