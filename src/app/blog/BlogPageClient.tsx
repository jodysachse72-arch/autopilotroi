'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { CmsPost } from '@/lib/cms/types'
import {
  PageShell,
  SectionBox,
  HeroBlue,
} from '@/components/sections'
import { SparkleIcon, AcademyIcon } from '@/components/ui/Icons'

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
    <PageShell>
      <HeroBlue
        eyebrow="Blog"
        title={<>Insights &amp; Updates.</>}
        description="Education, product updates, and partner resources \u2014 curated by the AutoPilot ROI team."
      />

      {/* Featured post */}
      {featured && (
        <SectionBox variant="white" padding="lg">
          <Link
            href={'/blog/' + featured.slug}
            style={{
              display: 'block',
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-lg)',
              padding: 'clamp(1.5rem,4vw,2.5rem)',
              textDecoration: 'none',
              transition: 'box-shadow 200ms ease',
              maxWidth: '60rem',
              margin: '0 auto',
            }}
            onMouseEnter={e => (e.currentTarget.style.boxShadow = 'var(--shadow-card-hover)')}
            onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}
          >
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.375rem',
              background: 'rgba(27,97,201,0.08)',
              color: '#1b61c9',
              borderRadius: '99px',
              padding: '0.25rem 0.75rem',
              fontSize: 'var(--text-caption)',
              fontWeight: 700,
              marginBottom: '1rem',
            }}>
              <SparkleIcon className="w-3.5 h-3.5" /> Featured
            </span>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-subheading)',
              fontWeight: 700,
              color: '#181d26',
              letterSpacing: '-0.02em',
              marginBottom: '0.75rem',
              transition: 'color 150ms ease',
            }}>
              {featured.title}
            </h2>
            {featured.meta?.excerpt && (
              <p style={{
                fontSize: 'var(--text-body)',
                color: 'var(--color-text-weak)',
                lineHeight: 'var(--lh-relaxed)',
                maxWidth: '48rem',
                marginBottom: '1rem',
              }}>
                {featured.meta.excerpt as string}
              </p>
            )}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: 'var(--text-caption)', color: 'var(--color-text-muted)' }}>
              {featured.meta?.author ? <span>{featured.meta.author as string}</span> : null}
              {featured.meta?.author && featured.meta?.publishedAt ? <span>{'\u00b7'}</span> : null}
              {featured.meta?.publishedAt ? <span>{formatDate(featured.meta.publishedAt as string)}</span> : null}
            </div>
          </Link>
        </SectionBox>
      )}

      {/* Filters + Post grid */}
      <SectionBox variant="surface" padding="lg">
        {/* Filters */}
        <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem', marginBottom: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              style={{
                whiteSpace: 'nowrap',
                borderRadius: '99px',
                padding: '0.4375rem 1rem',
                fontSize: 'var(--text-body)',
                fontWeight: 600,
                background: activeCategory === cat.value ? '#1b61c9' : '#ffffff',
                color: activeCategory === cat.value ? '#fff' : 'var(--color-text-weak)',
                border: activeCategory === cat.value ? '1.5px solid #1b61c9' : '1.5px solid var(--color-border)',
                cursor: 'pointer',
                transition: 'all 150ms ease',
                fontFamily: 'var(--font-body)',
                flexShrink: 0,
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div style={{
            background: '#fff',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-card)',
            padding: '4rem 2rem',
            textAlign: 'center',
            maxWidth: '32rem',
            margin: '0 auto',
          }}>
            <span style={{ display: 'inline-flex', color: 'var(--color-text-muted)', marginBottom: '0.75rem' }}>
              <AcademyIcon className="w-8 h-8" />
            </span>
            <p style={{ color: 'var(--color-text-muted)', margin: 0 }}>No posts in this category yet.</p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 20rem), 1fr))',
            gap: '1.25rem',
          }}>
            {filtered.map(post => {
              const cat = post.meta?.category as string | undefined
              const cc = (cat && CATEGORY_COLORS[cat]) || { bg: 'rgba(4,14,32,0.06)', color: 'rgba(4,14,32,0.55)' }
              const excerpt = post.meta?.excerpt as string | undefined
              const author = post.meta?.author as string | undefined
              const publishedAt = (post.meta?.publishedAt as string | undefined) ?? post.publish_at
              return (
                <Link
                  key={post.id}
                  href={'/blog/' + post.slug}
                  style={{
                    display: 'block',
                    background: '#ffffff',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-card)',
                    padding: '1.5rem',
                    textDecoration: 'none',
                    transition: 'box-shadow 200ms ease, transform 200ms ease',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-card-hover)'
                    ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.boxShadow = 'none'
                    ;(e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
                  }}
                >
                  {cat && (
                    <span style={{
                      display: 'inline-block',
                      background: cc.bg, color: cc.color,
                      borderRadius: '99px',
                      padding: '0.25rem 0.625rem',
                      fontSize: 'var(--text-caption)',
                      fontWeight: 700,
                      textTransform: 'capitalize',
                      marginBottom: '0.875rem',
                    }}>
                      {cat.replace(/-/g, ' ')}
                    </span>
                  )}
                  <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--text-body)',
                    fontWeight: 700,
                    color: '#181d26',
                    letterSpacing: '-0.01em',
                    marginBottom: '0.5rem',
                    lineHeight: 1.4,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}>
                    {post.title}
                  </h3>
                  {excerpt && (
                    <p style={{
                      fontSize: 'var(--text-caption)',
                      color: 'var(--color-text-weak)',
                      lineHeight: 'var(--lh-relaxed)',
                      marginBottom: '1rem',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}>
                      {excerpt}
                    </p>
                  )}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: 'var(--text-caption)', color: 'var(--color-text-muted)' }}>
                    {author && <span>{author}</span>}
                    {author && publishedAt && <span>{'\u00b7'}</span>}
                    {publishedAt && <span>{formatDate(publishedAt)}</span>}
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </SectionBox>
    </PageShell>
  )
}
