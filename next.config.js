/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "pb-plus.s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "pb-plus-main.s3.amazonaws.com",
      },
    ],
  },
};
module.exports = nextConfig;
