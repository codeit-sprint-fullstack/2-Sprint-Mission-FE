/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "panda-market-api.vercel.app",  // https://는 제외
        port: "",
        pathname: "/products/images/**"
      },
      {
        protocol: "https",
        hostname: "sprint-fe-project.s3.ap-northeast-2.amazonaws.com",  // 추가한 도메인
        port: "",
        pathname: "/Sprint_Mission/user/**"
      }
    ]
  }
};

export default nextConfig;
