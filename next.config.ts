import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin Turbopack's workspace root to this project so it doesn't walk up
  // and mistakenly pick up an unrelated lockfile in the parent directory.
  turbopack: {
    root: path.join(import.meta.dirname, "."),
  },
};

export default nextConfig;
