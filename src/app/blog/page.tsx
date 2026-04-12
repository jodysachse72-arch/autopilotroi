'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

// Fallback demo posts (replaced by Sanity when connected)
const demoPosts = [
  {
    slug: 'getting-started-with-aurum',
    title: 'Getting Started with the Aurum Ecosystem',
    excerpt: 'A complete beginner\'s guide to understanding what Aurum offers, how the products work together, and why this ecosystem is different from anything else in the market.',
    author: 'Barry Goss',
    category: 'education',
    publishedAt: '2026-04-10',
    featured: true,
  },
  {
    slug: 'ex-ai-bot-performance',
    title: 'EX-AI Bot Performance: March 2026 Report',
    excerpt: 'Breaking down the EX-AI Bot\'s performance over the past month, including ROI metrics, market conditions, and strategy adjustments made by the AI.',
    author: 'Team AutoPilot ROI',
    category: 'product-updates',
    publishedAt: '2026-04-05',
    featured: false,
  },
  {
    slug: 'partner-onboarding-best-practices',
    title: 'Partner Onboarding Best Practices',
    excerpt: 'How top partners are converting prospects into active members with a structured onboarding approach. Tips, scripts, and the psychology behind it.',
    author: 'Barry Goss',
    category: 'partner-resources',
    publishedAt: '2026-04-02',
    featured: false,
  },
  {
    slug: 'understanding-vpns-for-crypto',
    title: 'Why VPNs Matter for Crypto Users in 2026',
    excerpt: 'A practical guide to VPNs — what they are, why you need one for crypto, and which ones we recommend for Aurum members.',
    author: 'Team AutoPilot ROI',
    category: 'education',
    publishedAt: '2026-03-28',
    featured: false,
  },
  {
    slug: 'neobank-launch',
    title: 'Aurum NeoBank: The Future of Banking is Here',
    excerpt: 'Aurum\'s NeoBank combines the best of traditional banking with Web 3.0 technology. Store, earn, and spend — all from one platform.',
    author: 'Barry Goss',
    category: 'announcements',
    publishedAt: '2026-03-20',
    featured: false,
  },
  {
    slug: 'market-outlook-q2-2026',
    title: 'Crypto Market Outlook: Q2 2026',
    excerpt: 'Our analysis of the current crypto market, upcoming catalysts, and how Aurum\'s AI bots are positioned to capitalize on volatility.',
    author: 'Team AutoPilot ROI',
    category: 'market-insights',
    publishedAt: '2026-03-15',
    featured: false,
  },
]

const categories = [
  { label: 'All', value: 'all' },
  { label: 'Education', value: 'education' },
  { label: 'Product Updates', value: 'product-updates' },
  { label: 'Announcements', value: 'announcements' },
  { label: 'Partner Resources', value: 'partner-resources' },
  { label: 'Market Insights', value: 'market-insights' },
]

const categoryColors: Record<string, string> = {
  education: 'bg-blue-500/15 text-blue-300',
  'product-updates': 'bg-purple-500/15 text-purple-300',
  announcements: 'bg-emerald-500/15 text-emerald-300',
  'partner-resources': 'bg-amber-500/15 text-amber-300',
  'market-insights': 'bg-cyan-500/15 text-cyan-300',
}

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const filteredPosts =
    activeCategory === 'all'
      ? demoPosts
      : demoPosts.filter((p) => p.category === activeCategory)
  const featuredPost = demoPosts.find((p) => p.featured)

  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 text-center lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--badge-border)] bg-[var(--badge-bg)] px-5 py-2 text-sm font-semibold text-[var(--badge-text)]">
              📝 Blog
            </div>
            <h1 className="font-[var(--font-sora)] text-4xl font-bold text-[var(--text-primary)] lg:text-5xl">
              Insights & Updates
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg text-[var(--text-tertiary)]">
              Education, product updates, and partner resources — curated by the
              AutoPilot ROI team.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured post */}
      {featuredPost && (
        <section className="pb-12">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <Link
              href={`/blog/${featuredPost.slug}`}
              className="group block rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-card)] p-8 transition hover:border-blue-500/30 lg:p-10"
            >
              <span className="inline-flex items-center gap-1 rounded-full bg-blue-500/15 px-3 py-1 text-xs font-semibold text-blue-400">
                ⭐ Featured
              </span>
              <h2 className="mt-4 font-[var(--font-sora)] text-2xl font-bold text-[var(--text-primary)] group-hover:text-blue-400 transition lg:text-3xl">
                {featuredPost.title}
              </h2>
              <p className="mt-3 max-w-2xl text-[var(--text-tertiary)] leading-relaxed">
                {featuredPost.excerpt}
              </p>
              <div className="mt-4 flex items-center gap-4 text-sm text-[var(--text-muted)]">
                <span>{featuredPost.author}</span>
                <span>·</span>
                <span>{featuredPost.publishedAt}</span>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Category filters */}
      <section className="pb-4">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition ${
                  activeCategory === cat.value
                    ? 'bg-blue-600 text-white'
                    : 'border border-[var(--border-primary)] bg-[var(--bg-card)] text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Post grid */}
      <section className="py-8 pb-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post, i) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block h-full rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-card)] p-6 transition hover:border-blue-500/30"
                >
                  {/* Category badge */}
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-xs font-semibold capitalize ${categoryColors[post.category] || 'bg-gray-500/15 text-gray-300'}`}
                  >
                    {post.category.replace('-', ' ')}
                  </span>

                  <h3 className="mt-4 font-[var(--font-sora)] text-lg font-bold text-[var(--text-primary)] group-hover:text-blue-400 transition">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-sm text-[var(--text-tertiary)] leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="mt-4 flex items-center gap-3 text-xs text-[var(--text-muted)]">
                    <span>{post.author}</span>
                    <span>·</span>
                    <span>{post.publishedAt}</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
