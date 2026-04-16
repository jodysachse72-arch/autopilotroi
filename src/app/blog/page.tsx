import BlogPageClient from './BlogPageClient'
import { getPublishedBlogsServer } from '@/lib/cms/server-adapter'
import type { CmsPost } from '@/lib/cms/types'

export const metadata = {
  title: 'Blog | AutoPilot ROI',
  description: 'Education, product updates, and partner resources — curated by the AutoPilot ROI team.',
}

// Revalidate every 60 seconds so edits appear quickly
export const revalidate = 60

// Hardcoded fallback seed posts (used only if CMS is empty)
const FALLBACK_POSTS: CmsPost[] = [
  { id: 'seed-1', type: 'blog', slug: 'getting-started-with-aurum', title: 'Getting Started with the Aurum Ecosystem', body: null, body_html: null, meta: { excerpt: "A complete beginner's guide to understanding what Aurum offers, how the products work together, and why this ecosystem is different from anything else in the market.", author: 'Barry Goss', category: 'education', featured: true, publishedAt: '2026-04-10' }, status: 'published', publish_at: '2026-04-10', sort_order: 1, created_at: '2026-04-10', updated_at: '2026-04-10', created_by: null },
  { id: 'seed-2', type: 'blog', slug: 'ex-ai-bot-performance', title: 'EX-AI Bot Performance: March 2026 Report', body: null, body_html: null, meta: { excerpt: "Breaking down the EX-AI Bot's performance over the past month.", author: 'Team AutoPilot ROI', category: 'product-updates', featured: false, publishedAt: '2026-04-05' }, status: 'published', publish_at: '2026-04-05', sort_order: 2, created_at: '2026-04-05', updated_at: '2026-04-05', created_by: null },
  { id: 'seed-3', type: 'blog', slug: 'partner-onboarding-best-practices', title: 'Partner Onboarding Best Practices', body: null, body_html: null, meta: { excerpt: 'How top partners are converting prospects into active members with a structured onboarding approach.', author: 'Barry Goss', category: 'partner-resources', featured: false, publishedAt: '2026-04-02' }, status: 'published', publish_at: '2026-04-02', sort_order: 3, created_at: '2026-04-02', updated_at: '2026-04-02', created_by: null },
  { id: 'seed-4', type: 'blog', slug: 'understanding-vpns-for-crypto', title: 'Why VPNs Matter for Crypto Users in 2026', body: null, body_html: null, meta: { excerpt: 'A practical guide to VPNs — what they are, why you need one for crypto, and which ones we recommend.', author: 'Team AutoPilot ROI', category: 'education', featured: false, publishedAt: '2026-03-28' }, status: 'published', publish_at: '2026-03-28', sort_order: 4, created_at: '2026-03-28', updated_at: '2026-03-28', created_by: null },
  { id: 'seed-5', type: 'blog', slug: 'neobank-launch', title: 'Aurum NeoBank: The Future of Banking is Here', body: null, body_html: null, meta: { excerpt: "Aurum's NeoBank combines the best of traditional banking with Web 3.0 technology.", author: 'Barry Goss', category: 'announcements', featured: false, publishedAt: '2026-03-20' }, status: 'published', publish_at: '2026-03-20', sort_order: 5, created_at: '2026-03-20', updated_at: '2026-03-20', created_by: null },
  { id: 'seed-6', type: 'blog', slug: 'market-outlook-q2-2026', title: 'Crypto Market Outlook: Q2 2026', body: null, body_html: null, meta: { excerpt: "Our analysis of the current crypto market, upcoming catalysts, and how Aurum's AI bots are positioned.", author: 'Team AutoPilot ROI', category: 'market-insights', featured: false, publishedAt: '2026-03-15' }, status: 'published', publish_at: '2026-03-15', sort_order: 6, created_at: '2026-03-15', updated_at: '2026-03-15', created_by: null },
]

export default async function BlogPage() {
  const cmsPosts = await getPublishedBlogsServer()
  const posts = cmsPosts.length > 0 ? cmsPosts : FALLBACK_POSTS
  return <BlogPageClient posts={posts} />
}
