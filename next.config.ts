import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Transpile Plasmic packages so Turbopack can resolve their ESM modules
  // correctly on both server and browser bundles.
  transpilePackages: ['@plasmicapp/loader-nextjs', '@plasmicapp/loader-react', '@plasmicapp/host'],

  // Disable React StrictMode in development.
  // StrictMode double-invokes effects (mount → unmount → remount) to catch bugs.
  // PlasmicCanvasHost's `renderStudioIntoIframe()` has no cleanup function,
  // so StrictMode fires it twice, loading studio.js twice into the same global
  // scope → "Identifier '__plasmicData' has already been declared" SyntaxError.
  // This flag only affects local dev; production is never in StrictMode.
  reactStrictMode: false,

  turbopack: {
    root: __dirname,
  },

  // ── Security Headers ──
  async headers() {
    return [

      // ── All other routes — fully locked down ──
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://challenges.cloudflare.com https://plausible.io https://*.sentry.io https://www.youtube.com https://s.ytimg.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://rsms.me",
              "font-src 'self' https://fonts.gstatic.com https://rsms.me",
              "img-src 'self' data: blob: https://img.youtube.com https://i.ytimg.com https://*.supabase.co",
              "frame-src 'self' blob: https://www.youtube.com https://challenges.cloudflare.com",
              "connect-src 'self' https://*.supabase.co https://plausible.io https://*.sentry.io https://challenges.cloudflare.com",
              "media-src 'self' https://www.youtube.com",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'none'",
            ].join("; "),
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
