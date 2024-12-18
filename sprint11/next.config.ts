import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'sprint-fe-project.s3.ap-northeast-2.amazonaws.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'image.hanatour.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'example.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'www.shutterstock.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'youtube.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'pbs.twimg.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'images.samsung.com',
        pathname: '/**'
      }
    ],
  }
};

export default nextConfig;