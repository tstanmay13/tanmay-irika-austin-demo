/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.NODE_ENV === 'production' ? '/tanmay-irika-austin' : '',
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

module.exports = nextConfig;
