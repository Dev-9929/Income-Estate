/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'http',
        hostname: 'staging.income-estate.com',
      },
      {
        protocol: 'https',
        hostname: 'staging.income-estate.com',
      },
      {
        protocol: 'http',
        hostname: 'income-estate.com',
      },
      {
        protocol: 'https',
        hostname: 'income-estate.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/properties',
        destination: '/roi-properties',
        permanent: true,
      },
      {
        source: '/properties/:category(roi-properties|branded-residences|other-properties)',
        destination: '/:category',
        permanent: true,
      },
      {
        source: '/properties/:category(roi-properties|branded-residences|other-properties)/:slug',
        destination: '/:category/:slug',
        permanent: true,
      },
      {
        source: '/blog',
        destination: '/blogs',
        permanent: true,
      },
      {
        source: '/blog/:slug*',
        destination: '/blogs/:slug*',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
