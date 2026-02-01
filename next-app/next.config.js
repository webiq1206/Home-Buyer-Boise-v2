/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'homebuyerboise.com',
      },
    ],
  },
  // Ensure trailing slashes match the original site (no trailing slashes)
  trailingSlash: false,
}

module.exports = nextConfig
