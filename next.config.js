/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  /** Chunk 0 / Chunk 10: real HTTP 308s for legacy permalinks (App Router `permanentRedirect` alone may not emit redirect responses). */
  async redirects() {
    return [
      { source: '/about', destination: '/?section=about', permanent: true },
      { source: '/services', destination: '/?section=services', permanent: true },
      { source: '/work', destination: '/?section=work', permanent: true },
      { source: '/contact', destination: '/?section=contact', permanent: true },
      { source: '/testimonials', destination: '/?section=testimonials', permanent: true },
    ]
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '**',
      },
    ],
  },
}

module.exports = nextConfig
