// next.config.mjs
/** @type {import('next').NextConfig} */
const isProduction = process.env.NODE_ENV === "production"

const nextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  poweredByHeader: false,
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d2xsxph8kpxj0f.cloudfront.net",
      },
    ],
  },
  compress: true,
  experimental: {
    optimizeCss: true,
    // Disable client-side Router Cache for dynamically rendered pages (pages that
    // use headers(), cookies(), etc.). This ensures locale-switching via
    // /en/* ↔ /th/* always triggers a fresh RSC fetch — not a cached payload.
    staleTimes: { dynamic: 0 },
    optimizePackageImports: [
      "@radix-ui/react-accordion",
      "@radix-ui/react-dialog",
      "@radix-ui/react-dropdown-menu",
      "@radix-ui/react-tabs",
      "@radix-ui/react-tooltip",
      "lucide-react",
      // NOTE: framer-motion intentionally excluded — its `motion` factory uses a
      // dynamic Proxy/function pattern that Turbopack's tree-shaking mishandles,
      // causing `motion.div` etc. to become `undefined` after HMR invalidation.
    ],
  },
  async redirects() {
    return [
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
      {
        source: "/index",
        destination: "/",
        permanent: true,
      },
      {
        source: "/technology/jitna-rfc-001",
        destination: "/protocols/jitna-rfc-001",
        permanent: true,
      },
      {
        source: "/en/technology/jitna-rfc-001",
        destination: "/en/protocols/jitna-rfc-001",
        permanent: true,
      },
      {
        source: "/technology/fdia-equation-explained",
        destination: "/blog/fdia-equation-explained",
        permanent: true,
      },
      {
        source: "/en/technology/fdia-equation-explained",
        destination: "/en/blog/fdia-equation-explained",
        permanent: true,
      },
    ]
  },
  async headers() {
    const headers = [
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-XSS-Protection", value: "0" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://vercel.live https://va.vercel-scripts.com https://www.googletagmanager.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: blob: https://d2xsxph8kpxj0f.cloudfront.net https://rctlabs.co https://www.googletagmanager.com",
              "connect-src 'self' https://*.supabase.co https://vercel.live wss://*.supabase.co https://api.rctlabs.co https://vitals.vercel-insights.com https://www.google-analytics.com https://analytics.google.com https://www.googletagmanager.com https://region1.google-analytics.com https://region1.analytics.google.com",
              "frame-ancestors 'none'",
            ].join("; "),
          },
        ],
      },
    ]

    if (isProduction) {
      headers.push({
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      })
    }

    return headers
  },
}

export default nextConfig;
