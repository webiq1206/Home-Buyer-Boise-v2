/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'homebuyerboise.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  // Ensure trailing slashes match the original site (no trailing slashes)
  trailingSlash: false,
  // Experimental features
  experimental: {
    // Server actions are stable in Next.js 14
  },
  // Environment variables to expose to the browser
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://homebuyerboise.com',
  },
}

module.exports = nextConfig
