/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "sprint-fe-project.s3.ap-northeast-2.amazonaws.com",
      "another-domain.com",
      "example.com",
      "shutterstock.com",
      "www.shutterstock.com",
      "i.imgur.com",
      "youtube.com"
    ] // 허용할 도메인 추가
  }
};

export default nextConfig;
