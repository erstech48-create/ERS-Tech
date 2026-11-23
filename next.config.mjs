/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "erstech.org",
      },
      {
        protocol: "https",
        hostname: "www.erstech.org",
      },
      {
        protocol: "https",
        hostname: "erstech-lime.vercel.app",
      },
      {
        protocol: "https",
        hostname: "blogs.erstech.org",
      },
    ],
  },
  async headers() {
    return [
      // Sitewide Security Headers (no Content-Security-Policy)
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      // Default for all static assets (images, fonts, media): 30 days
      {
        source: "/assets/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=2592000, stale-while-revalidate=86400",
          },
        ],
      },
      // Styles and scripts under /assets: max-age=86400 (1 day) - overrides general rule
      {
        source: "/assets/styles/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=86400",
          },
        ],
      },
      {
        source: "/assets/:path*.css",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=86400",
          },
        ],
      },
      {
        source: "/assets/:path*.js",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=86400",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/home",
        destination: "/",
        statusCode: 301,
      },
      // Fix the typo: /sitmap.xml -> /sitemap.xml (301 Permanent Redirect)
      {
        source: "/sitmap.xml",
        destination: "/sitemap.xml",
        statusCode: 301,
      },
    ];
  },
  async rewrites() {
    return [
      // Serve /sitemap.xml via the API route (no header/footer wrapper)
      {
        source: "/sitemap.xml",
        destination: "/api/sitemap",
      },
      // Serve /rss.xml via the API route
      {
        source: "/rss.xml",
        destination: "/api/rss.xml",
      },
    ];
  },
};

export default nextConfig;
