import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow all hosts for Replit development
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Ensure proper loading in Replit iframe
  assetPrefix: '',
  trailingSlash: false,
};

export default nextConfig;
