/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  // Configure base path for GitHub Pages
  basePath: '/loona-meditation',
  images: {
    unoptimized: true,
  }
}

module.exports = nextConfig
