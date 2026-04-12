import type { MetadataRoute } from 'next'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://autopilotroi.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString()

  // Static pages with their priorities and change frequencies
  const staticPages = [
    { path: '/', priority: 1.0, changeFrequency: 'weekly' as const },
    { path: '/products', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/summary', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/university', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/media', priority: 0.7, changeFrequency: 'weekly' as const },
    { path: '/resources', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/faqs', priority: 0.6, changeFrequency: 'monthly' as const },
    { path: '/blog', priority: 0.7, changeFrequency: 'weekly' as const },
    { path: '/signup', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/terms', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/disclaimer', priority: 0.3, changeFrequency: 'yearly' as const },
  ]

  return staticPages.map((page) => ({
    url: `${BASE_URL}${page.path}`,
    lastModified: now,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }))
}
