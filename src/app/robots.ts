import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://autopilotroi.com'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/dashboard/',
          '/onboarding/',
          '/waiting-room/',
          '/orientation/',
          '/studio/',
          '/login',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
