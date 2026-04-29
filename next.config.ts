import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },

  // ── Security Headers ──
  async headers() {
    return [
      // ── /plasmic-host — allow Plasmic Studio to frame this page ──
      // This page is a canvas host for Plasmic Studio only. It is intentionally
      // fully open so PlasmicCanvasHost can load all its internal resources.
      {
        source: "/plasmic-host",
        headers: [
          {
            key: "Content-Security-Policy",
            // Allow everything — Plasmic's canvas host loads many resources
            // from its own CDN. The only restriction we keep is frame-ancestors
            // so only Plasmic Studio can embed this page.
            value: "frame-ancestors https://studio.plasmic.app https://*.plasmic.app; default-src * 'unsafe-inline' 'unsafe-eval' data: blob:;",
          },
        ],
      },

      // ── All other routes — fully locked down ──
      {
        source: "/((?!plasmic-host).*)",
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
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: blob: https://img.youtube.com https://i.ytimg.com https://*.supabase.co",
              "frame-src https://www.youtube.com https://challenges.cloudflare.com",
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
