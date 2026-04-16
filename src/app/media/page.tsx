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
    { id: 'all', label: 'All Media' },
    { id: 'presentations', label: 'Presentations' },
    { id: 'interviews', label: 'Interviews' },
    { id: 'community', label: 'Community' },
    { id: 'updates', label: 'Updates' },
  ],
  items: [
    {
      id: '1',
      category: 'presentations',
      title: 'AURUM EXPLAINED (UPDATED) | AI Finance Meets Real-World Assets',
      description: 'Complete updated overview of the full ecosystem: AI trading bots, crypto cards, exchange, neobank, and the opportunity.',
      youtubeId: 'MmAnR4YAPv4',
      duration: '15:22',
      badge: 'Must Watch',
    },
    {
      id: '2',
      category: 'presentations',
      title: 'Why Aurum? A 12-Minute Due-Diligence Briefing',
      description: 'Independent due diligence overview for anyone considering the platform.',
      youtubeId: 'XYaFPdtHBUU',
      duration: '12:00',
      badge: 'Featured',
    },
    {
      id: '3',
      category: 'presentations',
      title: 'Aurum From 30,000 Feet | Lazy Critics Always Miss This',
      description: 'High-level strategic view of the ecosystem — see what the critics miss.',
      youtubeId: 'toL9hE-DoCo',
      duration: '14:30',
      badge: null,
    },
    {
      id: '4',
      category: 'interviews',
      title: 'Shane Morand Joins AURUM After Scaling Organo Gold to $1 Billion',
      description: 'Industry legend Shane Morand explains why he chose the Aurum ecosystem.',
      youtubeId: '-6viWJxNYVU',
      duration: '25:00',
      badge: 'New',
    },
    {
      id: '5',
      category: 'community',
      title: 'Aurum Live Trading Testimonials | Real Results & Proof of Trading',
      description: 'Real partner testimonials and live trading proof from active Aurum members.',
      youtubeId: '6ZGS7zwEn5Q',
      duration: '16:42',
      badge: null,
    },
    {
      id: '6',
      category: 'updates',
      title: 'Aurum CEO Update 2025: Roadmap, Exchange Launch & Future Vision',
      description: 'Bryan Benson\'s comprehensive CEO update on the platform roadmap and future plans.',
      youtubeId: 'yvqzJvQNSlA',
      duration: '35:00',
      badge: 'New',
    },
    {
      id: '7',
      category: 'community',
      title: 'Inside AURUM\'s Dubai Global Launch | 650+ Partners',
      description: 'Full recap of the Dubai global launch event with 650+ partners in attendance.',
      youtubeId: 'khR9DaHsf88',
      duration: '30:00',
      badge: null,
    },
    {
      id: '8',
      category: 'interviews',
      title: 'Can You Verify the Trades? AURUM Leaders Respond',
      description: 'Aurum leadership addresses trade verification questions from the community.',
      youtubeId: 'iYZMYLhgXv8',
      duration: '20:01',
      badge: null,
    },
    {
      id: '9',
      category: 'updates',
      title: 'AURUM Announces Major Gold Tokenization Partnership',
      description: 'Breaking news on the Clinq.Gold + Sierra Leone real-world asset tokenization deal.',
      youtubeId: 'xc97Nr3G3vU',
      duration: '11:20',
      badge: null,
    },
  ],
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.45, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
}

interface MediaItem {
  id: string
  category: string
  title: string
  description: string
  youtubeId: string
  duration: string
  badge: string | null
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
        if (mediaVideos.length === 0) return // keep fallback
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
    <div className="min-h-screen bg-[var(--bg-primary)]">
      {/* Header */}
      <div className="relative overflow-hidden border-b border-[var(--border-primary)] bg-[var(--bg-section)] px-6 py-16 lg:px-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_80%,rgba(59,130,246,0.15),transparent_60%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)', backgroundSize: '50px 50px' }} />
        <div className="relative mx-auto max-w-4xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-300">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
              Media Library
            </div>
            <h1 className="font-[var(--font-sora)] text-4xl font-bold tracking-tight text-[var(--text-primary)] sm:text-5xl lg:text-6xl">
              {mediaContent.headline}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-[var(--text-tertiary)]">
              {mediaContent.description}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
        {/* Category filters */}
        <div className="mb-8 flex flex-wrap gap-2">
          {mediaContent.categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                activeCategory === cat.id
                  ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                  : 'bg-[var(--bg-card)] text-[var(--text-secondary)] border border-[var(--border-primary)] hover:border-[var(--border-accent)] hover:text-[var(--text-primary)]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Video grid */}
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {visible.map((item, i) => (
            <motion.article
              key={item.id}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              custom={i}
              className="group overflow-hidden rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-card)] shadow-[var(--card-shadow,none)] transition-all duration-300 hover:border-[var(--border-accent)] hover:shadow-[var(--card-shadow-hover,none)]"
            >
              {/* Thumbnail */}
              <VideoModal videoUrl={`https://www.youtube.com/watch?v=${item.youtubeId}`} ctaLabel="Ready to Get Started?" ctaHref="/signup">
                <div className="relative aspect-video cursor-pointer overflow-hidden bg-slate-900">
                  <YouTubeThumbnail
                    videoId={item.youtubeId}
                    title={item.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Play overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 shadow-lg">
                      <svg viewBox="0 0 24 24" className="h-6 w-6 ml-0.5 text-[#061238]" fill="currentColor">
                        <path d="M8 5.14v14l11-7-11-7z" />
                      </svg>
                    </div>
                  </div>
                  {item.badge && (
                    <span className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-xs font-bold shadow-lg ${
                      item.badge === 'New' ? 'bg-emerald-500 text-white'
                      : item.badge === 'Must Watch' ? 'bg-red-500 text-white'
                      : 'bg-blue-500 text-white'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                  <span className="absolute bottom-2 right-2 rounded bg-black/70 px-2 py-0.5 text-xs font-medium text-white/90 backdrop-blur-sm">
                    {item.duration}
                  </span>
                </div>
              </VideoModal>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-[var(--font-sora)] text-sm font-bold leading-snug text-[var(--text-primary)] line-clamp-2 group-hover:text-[var(--accent-primary)] transition-colors">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-[var(--text-muted)] line-clamp-2">{item.description}</p>
              </div>
            </motion.article>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-card)] p-10 text-center shadow-[var(--card-shadow,none)]">
          <h2 className="font-[var(--font-sora)] text-2xl font-bold text-[var(--text-primary)]">
            Ready to Start Your Journey?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-[var(--text-tertiary)]">
            The best way to understand the platform is to work through the guided onboarding with your
            AutoPilot ROI partner.
          </p>
          <Link
            href="/signup"
            className="mt-6 inline-flex items-center rounded-xl bg-[linear-gradient(180deg,#3b82f6_0%,#2563eb_100%)] px-7 py-3 text-base font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:shadow-blue-600/40"
          >
            Begin Onboarding →
          </Link>
        </div>
      </div>
    </div>
  )
}
