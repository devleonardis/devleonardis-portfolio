import type { NextConfig } from "next";

// Static export: Cloudflare serves the HTML/JS from the edge, the Worker in /worker handles /api/contact.
const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
