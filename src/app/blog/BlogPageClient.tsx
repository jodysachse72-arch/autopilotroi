'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { CmsPost } from '@/lib/cms/types'

const CATEGORIES = [
  { label: 'All',               value: 'all' },
  { label: 'Education',         value: 'education' },
  { label: 'Product Updates',   value: 'product-updates' },
  { label: 'Announcements',     value: 'announcements' },
  { label: 'Partner Resources', value: 'partner-resources' },
  { label: 'Market Insights',   value: 'market-insights' },
]

const CATEGORY_COLORS: Record<string, { bg: string; color: string }> = {
  'education':         { bg: 'rgba(27,97,201,0.08)',  color: '#1b61c9' },
  'product-updates':   { bg: 'rgba(124,58,237,0.08)', color: '#7c3aed' },
  'announcements':     { bg: 'rgba(16,185,129,0.08)', color: '#059669' },
  'partner-resources': { bg: 'rgba(245,158,11,0.08)', color: '#d97706' },
  'market-insights':   { bg: 'rgba(6,182,212,0.08)',  color: '#0891b2' },
}

function formatDate(dateStr?: string | null): string {
  if (!dateStr) return ''
  try { return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) }
  catch { return dateStr }
}

interface Props { posts: CmsPost[] }

export default function BlogPageClient({ posts }: Props) {
  const [activeCategory, setActiveCategory] = useState('all')

  const filtered = activeCategory === 'all'
    ? posts
    : posts.filter(p => p.meta?.category === activeCategory)

  const featured = posts.find(p => p.meta?.featured)

  return (
    <div className="min-h-screen" style={{ background: '#f8fafc' }}>

      {/* Hero */}
      <section className="px-6 py-16 lg:px-10" style={{ background: '#fff', borderBottom: '1px solid #e0e2e6' }}>
        <div className="mx-auto max-w-7xl text-center">
          <span className="inline-block rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] mb-4"
            style={{ background: 'rgba(27,97,201,0.08)', color: '#1b61c9', border: '1px solid rgba(27,97,201,0.15)' }}>
            📝 Blog
          </span>
          <h1 className="text-4xl font-bold mb-4" style={{ color: '#181d26', letterSpacing: '-0.03em' }}>
            Insights &amp; Updates
          </h1>
          <p className="text-lg max-w-xl mx-auto" style={{ color: 'rgba(4,14,32,0.55)', lineHeight: 1.7 }}>
            Education, product updates, and partner resources — curated by the AutoPilot ROI team.
          </p>
        </div>
      </section>

      {/* Featured post */}
      {featured && (
        <section className="px-6 pt-10 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <Link href={`/blog/${featured.slug}`}
              className="group block rounded-2xl p-8 lg:p-10 transition-shadow hover:shadow-[0_8px_32px_rgba(27,97,201,0.12)]"
              style={{ background: '#fff', border: '1px solid #e0e2e6' }}>
              <span className="inline-block rounded-full px-3 py-1 text-xs font-bold mb-4"
                style={{ background: 'rgba(27,97,201,0.08)', color: '#1b61c9' }}>
                ⭐ Featured
              </span>
              <h2 className="text-2xl font-bold mb-3 group-hover:text-[#1b61c9] transition-colors lg:text-3xl"
                style={{ color: '#181d26', letterSpacing: '-0.02em' }}>
                {featured.title}
              </h2>
              {featured.meta?.excerpt && (
                <p className="max-w-2xl mb-4 leading-relaxed" style={{ color: 'rgba(4,14,32,0.6)' }}>
                  {featured.meta.excerpt as string}
                </p>
              )}
              <div className="flex items-center gap-3 text-sm" style={{ color: 'rgba(4,14,32,0.4)' }}>
                {featured.meta?.author && <span>{featured.meta.author as string}</span>}
                {featured.meta?.author && featured.meta?.publishedAt && <span>·</span>}
                {featured.meta?.publishedAt && <span>{formatDate(featured.meta.publishedAt as string)}</span>}
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Category filters */}
      <section className="px-6 py-6 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {CATEGORIES.map(cat => (
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

      {/* Post grid */}
      <section className="px-6 pb-20 lg:px-10">
        <div className="mx-auto max-w-7xl">
          {filtered.length === 0 ? (
            <div className="rounded-2xl p-12 text-center" style={{ background: '#fff', border: '1px solid #e0e2e6' }}>
              <div className="text-3xl mb-3">📝</div>
              <p style={{ color: 'rgba(4,14,32,0.5)' }}>No posts in this category yet.</p>
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map(post => {
                const cat = post.meta?.category as string | undefined
                const cc = (cat && CATEGORY_COLORS[cat]) || { bg: 'rgba(4,14,32,0.06)', color: 'rgba(4,14,32,0.55)' }
                const excerpt = post.meta?.excerpt as string | undefined
                const author = post.meta?.author as string | undefined
                const publishedAt = (post.meta?.publishedAt as string | undefined) ?? post.publish_at
                return (
                  <Link key={post.id} href={`/blog/${post.slug}`}
                    className="group block rounded-2xl p-6 transition-shadow hover:shadow-[0_8px_24px_rgba(27,97,201,0.10)]"
                    style={{ background: '#fff', border: '1px solid #e0e2e6' }}>
                    {cat && (
                      <span className="inline-block rounded-full px-3 py-1 text-xs font-bold capitalize mb-4"
                        style={{ background: cc.bg, color: cc.color }}>
                        {cat.replace(/-/g, ' ')}
                      </span>
                    )}
                    <h3 className="text-lg font-bold mb-2 group-hover:text-[#1b61c9] transition-colors line-clamp-2"
                      style={{ color: '#181d26', letterSpacing: '-0.01em' }}>
                      {post.title}
                    </h3>
                    {excerpt && (
                      <p className="text-sm leading-relaxed line-clamp-3 mb-4" style={{ color: 'rgba(4,14,32,0.6)' }}>
                        {excerpt}
                      </p>
                    )}
                    <div className="flex items-center gap-2 text-xs" style={{ color: 'rgba(4,14,32,0.4)' }}>
                      {author && <span>{author}</span>}
                      {author && publishedAt && <span>·</span>}
                      {publishedAt && <span>{formatDate(publishedAt)}</span>}
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
