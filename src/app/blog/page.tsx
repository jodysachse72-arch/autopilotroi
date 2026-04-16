'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { loadStore, type BlogPost } from '@/lib/content-store'

const fallbackPosts = [
  { slug: 'getting-started-with-aurum', title: 'Getting Started with the Aurum Ecosystem', excerpt: 'A complete beginner\'s guide to understanding what Aurum offers, how the products work together, and why this ecosystem is different from anything else in the market.', author: 'Barry Goss', category: 'education', publishedAt: '2026-04-10', featured: true },
  { slug: 'ex-ai-bot-performance', title: 'EX-AI Bot Performance: March 2026 Report', excerpt: 'Breaking down the EX-AI Bot\'s performance over the past month, including ROI metrics, market conditions, and strategy adjustments made by the AI.', author: 'Team AutoPilot ROI', category: 'product-updates', publishedAt: '2026-04-05', featured: false },
  { slug: 'partner-onboarding-best-practices', title: 'Partner Onboarding Best Practices', excerpt: 'How top partners are converting prospects into active members with a structured onboarding approach. Tips, scripts, and the psychology behind it.', author: 'Barry Goss', category: 'partner-resources', publishedAt: '2026-04-02', featured: false },
  { slug: 'understanding-vpns-for-crypto', title: 'Why VPNs Matter for Crypto Users in 2026', excerpt: 'A practical guide to VPNs — what they are, why you need one for crypto, and which ones we recommend for Aurum members.', author: 'Team AutoPilot ROI', category: 'education', publishedAt: '2026-03-28', featured: false },
  { slug: 'neobank-launch', title: 'Aurum NeoBank: The Future of Banking is Here', excerpt: 'Aurum\'s NeoBank combines the best of traditional banking with Web 3.0 technology. Store, earn, and spend — all from one platform.', author: 'Barry Goss', category: 'announcements', publishedAt: '2026-03-20', featured: false },
  { slug: 'market-outlook-q2-2026', title: 'Crypto Market Outlook: Q2 2026', excerpt: 'Our analysis of the current crypto market, upcoming catalysts, and how Aurum\'s AI bots are positioned to capitalize on volatility.', author: 'Team AutoPilot ROI', category: 'market-insights', publishedAt: '2026-03-15', featured: false },
]

const categories = [
  { label: 'All', value: 'all' },
  { label: 'Education', value: 'education' },
  { label: 'Product Updates', value: 'product-updates' },
  { label: 'Announcements', value: 'announcements' },
  { label: 'Partner Resources', value: 'partner-resources' },
  { label: 'Market Insights', value: 'market-insights' },
]

const categoryColors: Record<string, { bg: string; color: string }> = {
  'education':         { bg: 'rgba(27,97,201,0.08)',    color: '#1b61c9' },
  'product-updates':   { bg: 'rgba(124,58,237,0.08)',   color: '#7c3aed' },
  'announcements':     { bg: 'rgba(16,185,129,0.08)',   color: '#059669' },
  'partner-resources': { bg: 'rgba(245,158,11,0.08)',   color: '#d97706' },
  'market-insights':   { bg: 'rgba(6,182,212,0.08)',    color: '#0891b2' },
}

interface DisplayPost { slug: string; title: string; excerpt: string; author: string; category: string; publishedAt: string; featured: boolean }

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [posts, setPosts] = useState<DisplayPost[]>(fallbackPosts)

  useEffect(() => {
    try {
      const store = loadStore()
      if (store.blogs && store.blogs.length > 0) {
        setPosts(store.blogs.map((b: BlogPost) => ({ slug: b.slug, title: b.title, excerpt: b.excerpt, author: b.author, category: b.category, publishedAt: b.publishedAt, featured: b.featured })))
      }
    } catch {}
  }, [])

  const filteredPosts = activeCategory === 'all' ? posts : posts.filter(p => p.category === activeCategory)
  const featuredPost = posts.find(p => p.featured)

  return (
    <div className="min-h-screen" style={{ background: '#f8fafc' }}>
      {/* Hero */}
      <section className="px-6 py-16 lg:px-10" style={{ background: '#fff', borderBottom: '1px solid #e0e2e6' }}>
        <div className="mx-auto max-w-7xl text-center">
          <span className="inline-block rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] mb-4"
            style={{ background: 'rgba(27,97,201,0.08)', color: '#1b61c9', border: '1px solid rgba(27,97,201,0.15)' }}>
            📝 Blog
          </span>
          <h1 className="text-4xl font-bold mb-4" style={{ color: '#181d26', letterSpacing: '-0.03em' }}>Insights & Updates</h1>
          <p className="text-lg max-w-xl mx-auto" style={{ color: 'rgba(4,14,32,0.55)', lineHeight: 1.7 }}>
            Education, product updates, and partner resources — curated by the AutoPilot ROI team.
          </p>
        </div>
      </section>

      {/* Featured post */}
      {featuredPost && (
        <section className="px-6 pt-10 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <Link href={`/blog/${featuredPost.slug}`}
              className="group block rounded-2xl p-8 lg:p-10 transition-shadow hover:shadow-[0_8px_32px_rgba(27,97,201,0.12)]"
              style={{ background: '#fff', border: '1px solid #e0e2e6' }}>
              <span className="inline-block rounded-full px-3 py-1 text-xs font-bold mb-4" style={{ background: 'rgba(27,97,201,0.08)', color: '#1b61c9' }}>
                ⭐ Featured
              </span>
              <h2 className="text-2xl font-bold mb-3 group-hover:text-[#1b61c9] transition-colors lg:text-3xl" style={{ color: '#181d26', letterSpacing: '-0.02em' }}>
                {featuredPost.title}
              </h2>
              <p className="max-w-2xl mb-4 leading-relaxed" style={{ color: 'rgba(4,14,32,0.6)' }}>{featuredPost.excerpt}</p>
              <div className="flex items-center gap-3 text-sm" style={{ color: 'rgba(4,14,32,0.4)' }}>
                <span>{featuredPost.author}</span><span>·</span><span>{featuredPost.publishedAt}</span>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Filters */}
      <section className="px-6 py-6 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map(cat => (
              <button key={cat.value} onClick={() => setActiveCategory(cat.value)}
                className="whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition"
                style={{
                  background: activeCategory === cat.value ? '#1b61c9' : '#fff',
                  color: activeCategory === cat.value ? '#fff' : 'rgba(4,14,32,0.65)',
                  border: activeCategory === cat.value ? '1px solid #1b61c9' : '1px solid #e0e2e6',
                }}>
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="px-6 pb-20 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map(post => {
              const cc = categoryColors[post.category] || { bg: 'rgba(4,14,32,0.06)', color: 'rgba(4,14,32,0.55)' }
              return (
                <Link key={post.slug} href={`/blog/${post.slug}`}
                  className="group block rounded-2xl p-6 transition-shadow hover:shadow-[0_8px_24px_rgba(27,97,201,0.10)]"
                  style={{ background: '#fff', border: '1px solid #e0e2e6' }}>
                  <span className="inline-block rounded-full px-3 py-1 text-xs font-bold capitalize mb-4" style={{ background: cc.bg, color: cc.color }}>
                    {post.category.replace('-', ' ')}
                  </span>
                  <h3 className="text-lg font-bold mb-2 group-hover:text-[#1b61c9] transition-colors line-clamp-2" style={{ color: '#181d26', letterSpacing: '-0.01em' }}>
                    {post.title}
                  </h3>
                  <p className="text-sm leading-relaxed line-clamp-3 mb-4" style={{ color: 'rgba(4,14,32,0.6)' }}>{post.excerpt}</p>
                  <div className="flex items-center gap-2 text-xs" style={{ color: 'rgba(4,14,32,0.4)' }}>
                    <span>{post.author}</span><span>·</span><span>{post.publishedAt}</span>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
