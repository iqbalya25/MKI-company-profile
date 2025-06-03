// next.config.js - OPTIMIZED FOR SEO & PERFORMANCE
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode for better error handling
  reactStrictMode: true,

  // Optimize images from Contentful
  images: {
    domains: ["images.ctfassets.net"],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Enable SWC minification for better performance
  swcMinify: true,

  // Compress assets
  compress: true,

  // Optimize production builds
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  // Headers for security and SEO
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },

  // Redirects for SEO
  async redirects() {
    return [
      {
        source: "/vfd",
        destination: "/products?category=inverter",
        permanent: true, // 301 redirect for SEO
      },
      {
        source: "/products/vfd/:slug*",
        destination: "/products/inverter/:slug*",
        permanent: true,
      },
    ];
  },

  // Enable experimental features for better performance
  experimental: {
    optimizeCss: true,
  },
};

module.exports = nextConfig;
