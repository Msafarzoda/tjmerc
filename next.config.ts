import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    // allow images served from the same host (uploaded to /public/uploads)
    remotePatterns: [],
    unoptimized: true,
  },
};

export default nextConfig;
