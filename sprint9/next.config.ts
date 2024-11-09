import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["image.hanatour.com"]
  },
  output: "standalone"
};

export default nextConfig;
