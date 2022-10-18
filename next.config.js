/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: { images: { allowFutureImage: true } },
  images: {
    domains: ['forkify-api.herokuapp.com', 'img-global.cpcdn.com'],
  },
};

module.exports = nextConfig;
