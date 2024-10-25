/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "two-sprint-mission-be.onrender.com/products",
        port: "",
        pathname: "/images/**"
      }
    ]
  }
};

export default nextConfig;
