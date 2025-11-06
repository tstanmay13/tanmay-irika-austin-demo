/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove basePath - deploy at root for Vercel
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

module.exports = nextConfig;
