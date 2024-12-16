/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, 
  swcMinify: true,
  images: {
    domains: ['facebook.com', 'x.com', 'linkedin.com', 'image.tmdb.org'],
    formats: ['image/avif', 'image/webp'],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }
    return config;
  },
};

export default nextConfig;