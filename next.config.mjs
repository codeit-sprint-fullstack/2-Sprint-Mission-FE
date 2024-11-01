/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sprint-fe-project.s3.ap-northeast-2.amazonaws.com',
        port: '',
        pathname: '/**'
      },
      {
        protocol: 'http',
        hostname: 'via.placeholder.com',
        port: '',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'flexible.img.hani.co.kr',
        port: '',
        pathname: '/**'
      }
    ]
  }
};

export default nextConfig;
