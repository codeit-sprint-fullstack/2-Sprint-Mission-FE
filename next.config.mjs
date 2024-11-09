/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    emotion: true,
  },
  experimental: {
    esmExternals: true,
  },
  images: {
    domains: ['sprint-fe-project.s3.ap-northeast-2.amazonaws.com', 'example.com', 'www.shutterstock.com', 'i.imgur.com'],
  },
};

export default nextConfig;
