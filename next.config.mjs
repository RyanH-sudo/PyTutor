/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  webpack: (config) => {
    // Fix for Pyodide loading in Next.js
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
      crypto: false,
    };
    // Allow importing .md files as raw strings
    config.module.rules.push({
      test: /\.(md|mdx)$/,
      type: 'asset/source',
    });
    return config;
  },
};

export default nextConfig;
