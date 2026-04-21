'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import VideoModal from '@/components/ui/VideoModal'
import YouTubeThumbnail from '@/components/ui/YouTubeThumbnail'
import { motion } from 'framer-motion'
import { createClient } from '@/lib/supabase/client'
import type { CmsPost } from '@/lib/cms/types'

const mediaContent = {
  headline: 'Media & Social Proof',
  description:
    'Interviews, presentations, community videos, and coverage of the Aurum ecosystem. See what real members and leaders say.',
  categories: [
    { id: 'all',           label: 'All Media' },
    { id: 'presentations', label: 'Presentations' },
    { id: 'interviews',    label: 'Interviews' },
    { id: 'community',     label: 'Community' },
    { id: 'updates',       label: 'Updates' },
  ],
  items: [
    { id: '1', category: 'presentations', title: 'AURUM EXPLAINED (UPDATED) | AI Finance Meets Real-World Assets', description: 'Complete updated overview of the full ecosystem: AI trading bots, crypto cards, exchange, neobank, and the opportunity.', youtubeId: 'MmAnR4YAPv4', duration: '15:22', badge: 'Must Watch' },
    { id: '2', category: 'presentations', title: 'Why Aurum? A 12-Minute Due-Diligence Briefing', description: 'Independent due diligence overview for anyone considering the platform.', youtubeId: 'XYaFPdtHBUU', duration: '12:00', badge: 'Featured' },
    { id: '3', category: 'presentations', title: 'Aurum From 30,000 Feet | Lazy Critics Always Miss This', description: 'High-level strategic view of the ecosystem — see what the critics miss.', youtubeId: 'toL9hE-DoCo', duration: '14:30', badge: null },
    { id: '4', category: 'interviews',    title: 'Shane Morand Joins AURUM After Scaling Organo Gold to $1 Billion', description: 'Industry legend Shane Morand explains why he chose the Aurum ecosystem.', youtubeId: '-6viWJxNYVU', duration: '25:00', badge: 'New' },
    { id: '5', category: 'community',     title: 'Aurum Live Trading Testimonials | Real Results & Proof of Trading', description: 'Real partner testimonials and live trading proof from active Aurum members.', youtubeId: '6ZGS7zwEn5Q', duration: '16:42', badge: null },
    { id: '6', category: 'updates',       title: 'Aurum CEO Update 2025: Roadmap, Exchange Launch & Future Vision', description: "Bryan Benson's comprehensive CEO update on the platform roadmap and future plans.", youtubeId: 'yvqzJvQNSlA', duration: '35:00', badge: 'New' },
    { id: '7', category: 'community',     title: "Inside AURUM's Dubai Global Launch | 650+ Partners", description: 'Full recap of the Dubai global launch event with 650+ partners in attendance.', youtubeId: 'khR9DaHsf88', duration: '30:00', badge: null },
    { id: '8', category: 'interviews',    title: 'Can You Verify the Trades? AURUM Leaders Respond', description: 'Aurum leadership addresses trade verification questions from the community.', youtubeId: 'iYZMYLhgXv8', duration: '20:01', badge: null },
    { id: '9', category: 'updates',       title: 'AURUM Announces Major Gold Tokenization Partnership', description: 'Breaking news on the Clinq.Gold + Sierra Leone real-world asset tokenization deal.', youtubeId: 'xc97Nr3G3vU', duration: '11:20', badge: null },
  ],
}

const BADGE_COLORS: Record<string, { bg: string; color: string }> = {
  'New':        { bg: '#059669', color: '#fff' },
  'Must Watch': { bg: '#dc2626', color: '#fff' },
  'Featured':   { bg: '#1b61c9', color: '#fff' },
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.06, duration: 0.45, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
}

interface MediaItem {
  id: string; category: string; title: string; description: string
  youtubeId: string; duration: string; badge: string | null
}

export default function MediaPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [liveItems, setLiveItems] = useState<MediaItem[]>(mediaContent.items)

  useEffect(() => {
    async function fetchMedia() {
      try {
        const db = createClient()
        const { data, error } = await db
          .from('cms_posts')
          .select('*')
          .eq('type', 'video')
          .eq('status', 'published')
          .order('sort_order', { ascending: true })
        if (error || !data || data.length === 0) return
        const mediaVideos = (data as CmsPost[]).filter(v => v.meta?.section === 'media')
        if (mediaVideos.length === 0) return
        const mapped: MediaItem[] = mediaVideos.map(v => ({
          id: v.id,
          category: (v.meta?.category as string) ?? 'presentations',
          title: v.title ?? 'Untitled',
          description: (v.meta?.excerpt as string) ?? '',
          youtubeId: (v.meta?.youtubeId as string) ?? '',
          duration: (v.meta?.duration as string) ?? '',
          badge: (v.meta?.badge as string | null) ?? null,
        }))
        setLiveItems(mapped)
      } catch (e) {
        console.error('[Media] Supabase fetch error:', e)
      }
    }
    fetchMedia()
  }, [])

  const visible = activeCategory === 'all'
    ? liveItems
    : liveItems.filter(item => item.category === activeCategory)

  return (
    <div className="page-bg">
      <div className="sections-stack">

        {/* ── Hero ── */}
        <section className="section-box">
          <div className="container-xl section-padding" style={{ textAlign: 'center' }}>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span className="text-label" style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                background: 'rgba(27,97,201,0.08)',
                color: '#1b61c9',
                border: '1px solid rgba(27,97,201,0.15)',
                borderRadius: '99px',
                padding: '0.375rem 1rem',
                marginBottom: '1.25rem',
              }}>
                <span style={{ width: '0.5rem', height: '0.5rem', borderRadius: '50%', background: '#1b61c9' }} />
                Media Library
              </span>

              <h1 className="text-display" style={{ color: '#181d26', marginBottom: '1rem' }}>
                {mediaContent.headline}
              </h1>

              <p className="text-body-lg" style={{
                color: 'var(--color-text-weak)',
                maxWidth: '36rem',
                margin: '0 auto',
                lineHeight: 'var(--lh-relaxed)',
              }}>
                {mediaContent.description}
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── Video grid ── */}
        <section className="section-box">
          <div className="container-xl section-padding">

            {/* Category filters */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
              {mediaContent.categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  style={{
                    borderRadius: '99px',
                    padding: '0.4375rem 1rem',
                    fontSize: 'var(--text-body)',
                    fontWeight: 600,
                    background: activeCategory === cat.id ? '#1b61c9' : '#ffffff',
                    color: activeCategory === cat.id ? '#fff' : 'var(--color-text-weak)',
                    border: activeCategory === cat.id ? '1.5px solid #1b61c9' : '1.5px solid var(--color-border)',
                    cursor: 'pointer',
                    transition: 'all 150ms ease',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 20rem), 1fr))',
              gap: '1.25rem',
            }}>
              {visible.map((item, i) => (
                <motion.article
                  key={item.id}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  custom={i}
                  style={{
                    background: '#ffffff',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-card)',
                    overflow: 'hidden',
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
                  {/* Thumbnail */}
                  <VideoModal
                    videoUrl={`https://www.youtube.com/watch?v=${item.youtubeId}`}
                    ctaLabel="Ready to Get Started?"
                    ctaHref="/signup"
                  >
                    <div style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden', background: '#0f1729', cursor: 'pointer' }}>
                      <YouTubeThumbnail
                        videoId={item.youtubeId}
                        title={item.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {/* Play overlay */}
                      <div style={{
                        position: 'absolute', inset: 0,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: 'rgba(0,0,0,0.28)',
                        opacity: 0,
                        transition: 'opacity 200ms ease',
                      }}
                        onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                        onMouseLeave={e => (e.currentTarget.style.opacity = '0')}
                      >
                        <div style={{
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          width: '3.5rem', height: '3.5rem',
                          borderRadius: '50%',
                          background: 'rgba(255,255,255,0.92)',
                          boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
                        }}>
                          <svg viewBox="0 0 24 24" style={{ width: '1.375rem', height: '1.375rem', marginLeft: '0.125rem' }} fill="#061238">
                            <path d="M8 5.14v14l11-7-11-7z" />
                          </svg>
                        </div>
                      </div>

                      {/* Badge */}
                      {item.badge && (
                        <span style={{
                          position: 'absolute', left: '0.75rem', top: '0.75rem',
                          borderRadius: '99px',
                          padding: '0.25rem 0.625rem',
                          fontSize: 'var(--text-caption)',
                          fontWeight: 700,
                          background: BADGE_COLORS[item.badge]?.bg ?? '#1b61c9',
                          color: BADGE_COLORS[item.badge]?.color ?? '#fff',
                        }}>
                          {item.badge}
                        </span>
                      )}

                      {/* Duration */}
                      <span style={{
                        position: 'absolute', bottom: '0.5rem', right: '0.5rem',
                        background: 'rgba(0,0,0,0.72)',
                        color: 'rgba(255,255,255,0.92)',
                        borderRadius: '0.375rem',
                        padding: '0.125rem 0.5rem',
                        fontSize: 'var(--text-caption)',
                        fontWeight: 600,
                        backdropFilter: 'blur(4px)',
                      }}>
                        {item.duration}
                      </span>
                    </div>
                  </VideoModal>

                  {/* Card content */}
                  <div style={{ padding: '1.25rem' }}>
                    <h3 style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'var(--text-body)',
                      fontWeight: 700,
                      color: '#181d26',
                      lineHeight: 1.4,
                      marginBottom: '0.5rem',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}>
                      {item.title}
                    </h3>
                    <p style={{
                      fontSize: 'var(--text-caption)',
                      color: 'var(--color-text-muted)',
                      lineHeight: 'var(--lh-relaxed)',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}>
                      {item.description}
                    </p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="section-box-navy">
          <div className="container-xl section-padding" style={{ textAlign: 'center' }}>
            <h2 className="text-heading" style={{ color: '#ffffff', marginBottom: '0.875rem' }}>
              Ready to Start Your Journey?
            </h2>
            <p style={{
              fontSize: 'var(--text-body-lg)',
              color: 'rgba(255,255,255,0.65)',
              maxWidth: '36rem',
              margin: '0 auto 2rem',
              lineHeight: 'var(--lh-relaxed)',
            }}>
              The best way to understand the platform is to work through the guided onboarding with your AutoPilot ROI partner.
            </p>
            <Link href="/signup" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.375rem',
              background: 'linear-gradient(135deg, #2563eb 0%, #1b61c9 100%)',
              color: '#ffffff',
              padding: '0.875rem 2rem',
              borderRadius: 'var(--radius-btn)',
              fontFamily: 'var(--font-display)', fontWeight: 700,
              fontSize: 'var(--text-body)',
              textDecoration: 'none',
              boxShadow: '0 4px 16px rgba(27,97,201,0.45)',
              letterSpacing: '0.01em',
            }}>
              Begin Onboarding →
            </Link>
          </div>
        </section>

      </div>
    </div>
  )
}
