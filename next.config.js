/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require('@next/bundle-analyzer');

const nextConfig = {
   images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'res.cloudinary.com',
        },
        {
          protocol: 'http',
          hostname: 'books.google.com'
        },
      ],
    },
    typescript: {ignoreBuildErrors: true}
};

module.exports = withBundleAnalyzer({enabled: process.env.ANALYZE === "true"})(nextConfig);
