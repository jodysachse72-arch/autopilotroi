import type { NextConfig } from "next";
import withVercelToolbar from "@vercel/toolbar/plugins/next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },

  // ── Security Headers ──
  async headers() {
    return [
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
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://challenges.cloudflare.com https://plausible.io https://*.sentry.io https://www.youtube.com https://s.ytimg.com https://vercel.live",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://rsms.me https://vercel.live",
              "font-src 'self' https://fonts.gstatic.com https://rsms.me",
              "img-src 'self' data: blob: https://img.youtube.com https://i.ytimg.com https://*.supabase.co https://vercel.live https://vercel.com",
              "frame-src https://www.youtube.com https://challenges.cloudflare.com https://vercel.live",
              "connect-src 'self' https://*.supabase.co https://plausible.io https://*.sentry.io https://challenges.cloudflare.com https://vercel.live https://vitals.vercel-insights.com",
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

export default withVercelToolbar()(nextConfig);
