/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  output: 'standalone',
  outputFileTracingRoot: require('path').join(__dirname, '../'),

  // Optimisations de performance
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Optimisation des images et ressources
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },

  // Configuration pour React et Plotly
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
}

module.exports = nextConfig
