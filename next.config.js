/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: "https://www.ohble.net/:path*",
      },
    ];
  },
};
module.exports = nextConfig;
