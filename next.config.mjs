/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "panda-market-api.vercel.app",
        port: "",
        pathname: "/products/images/**"
      },
      {
        protocol: "https",
        hostname: "sprint-fe-project.s3.ap-northeast-2.amazonaws.com",  // 추가한 도메인
        port: "",
        pathname: "/Sprint_Mission/user/**"
      },
      {
        protocol: "https",
        hostname: "example.com",
        port: "",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "www.shutterstock.com",  // 여기에 추가
        port: "",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "i.imgur.com",
        port: "",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "image.hanatour.com",
        port: "",
        pathname: "/**"
      }
    ]
  }
};

export default nextConfig;
