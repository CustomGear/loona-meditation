/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  // Configure base path for GitHub Pages
  basePath: '/loona-meditation',
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [];
  },
}

module.exports = {
  ...nextConfig,
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    return config;
  },
  // Enable access from local network
  experimental: {
    allowMiddlewareResponseBody: true,
  },
  // Listen on all network interfaces
  server: {
    host: '0.0.0.0',
  },
}
