'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import YouTubeThumbnail from '@/components/ui/YouTubeThumbnail'
import { createClient } from '@/lib/supabase/client'
import type { CmsPost } from '@/lib/cms/types'

// ─── Fallback video data — ALL IDs verified live via YouTube oembed API ──────
const fallbackVideos = [
  { _id: '1',  title: 'AURUM EXPLAINED (UPDATED) | AI Finance Meets Real-World Assets', youtubeId: 'MmAnR4YAPv4', description: 'Complete updated introduction to the Aurum ecosystem, products, and opportunity.', category: 'beginner', duration: '15:22', order: 1, featured: true },
  { _id: '2',  title: 'Why Aurum? A 12-Minute Due-Diligence Briefing', youtubeId: 'XYaFPdtHBUU', description: 'Independent due diligence overview for prospective members evaluating the platform.', category: 'due-diligence', duration: '12:00', order: 2, featured: true },
  { _id: '3',  title: 'Aurum From 30,000 Feet | Lazy Critics Always Miss This', youtubeId: 'toL9hE-DoCo', description: 'High-level strategic view of the Aurum ecosystem and why critics often miss the big picture.', category: 'beginner', duration: '14:30', order: 3, featured: true },
  { _id: '4',  title: 'The 1000 Millionaires Mission | Aurum CEO\'s Tip of the Iceberg Talk', youtubeId: '4wZ48SCivbk', description: 'Bryan Benson\'s vision talk on building 1,000 millionaires through the Aurum ecosystem.', category: 'beginner', duration: '10:15', order: 4, featured: false },
  { _id: '5',  title: 'The Shift From Old Money to AI Finance (Aurum Explained)', youtubeId: 'KmG-RRVUhis', description: 'Understanding the paradigm shift from traditional finance to AI-powered wealth building.', category: 'beginner', duration: '18:45', order: 5, featured: false },
  { _id: '6',  title: 'Is The Trading Real? EX AI Bot Proof of Trading Resources', youtubeId: '__fiYVbAtcs', description: 'Verification resources and evidence that the EX-AI Bot trading is legitimate.', category: 'due-diligence', duration: '15:30', order: 6, featured: false },
  { _id: '7',  title: 'Can You Verify the Trades? AURUM Leaders Respond', youtubeId: 'iYZMYLhgXv8', description: 'Aurum leadership addresses trade verification questions head-on.', category: 'due-diligence', duration: '20:01', order: 7, featured: false },
  { _id: '8',  title: 'Aurum Live Trading Testimonials | Real Results & Proof of Trading', youtubeId: '6ZGS7zwEn5Q', description: 'Real partner testimonials and live trading proof from active Aurum members.', category: 'due-diligence', duration: '16:42', order: 8, featured: false },
  { _id: '9',  title: 'AI Trading Bots vs Aurum: The Key Difference Most People Miss', youtubeId: 'CRuZqkc8sh4', description: 'What sets Aurum\'s AI trading apart from generic trading bots in the market.', category: 'product', duration: '12:30', order: 9, featured: false },
  { _id: '10', title: 'EX AI Bot Compounding Strategies: Plan A vs Plan B Explained', youtubeId: '1BI9_YikUKc', description: 'Detailed breakdown of the two compounding strategies for maximum returns.', category: 'product', duration: '22:15', order: 10, featured: false },
  { _id: '11', title: 'Aurum Packages and Percentages', youtubeId: 'GJEK3wOjlyQ', description: 'Complete overview of all investment packages and their return percentages.', category: 'product', duration: '18:00', order: 11, featured: false },
  { _id: '12', title: 'AURUM Announces Major Gold Tokenization Partnership | Clinq.Gold + Sierra Leone', youtubeId: 'xc97Nr3G3vU', description: 'Breaking news on Aurum\'s real-world asset tokenization partnership.', category: 'product', duration: '11:20', order: 12, featured: false },
  { _id: '13', title: 'Shane Morand Joins AURUM After Helping Scale Organo Gold to $1 Billion', youtubeId: '-6viWJxNYVU', description: 'Industry leader Shane Morand explains why he chose to join the Aurum ecosystem.', category: 'partner', duration: '25:00', order: 13, featured: false },
  { _id: '14', title: 'Build VOYAGERS, Not Noise | Aurum Partner Strategy Explained', youtubeId: 'FMkQxq9lb0o', description: 'Strategic framework for building a sustainable Aurum partner organization.', category: 'partner', duration: '19:30', order: 14, featured: false },
  { _id: '15', title: 'PEP-TALK: Stop Overthinking. Start Compounding with Aurum', youtubeId: 'zb1iV9aApOA', description: 'Motivational session on taking action and leveraging the compounding power of Aurum.', category: 'partner', duration: '8:45', order: 15, featured: false },
  { _id: '16', title: 'Aurum Account Registration + EX AI Bot Activation (U.S. & Canada)', youtubeId: 'X1TO-hC1Geg', description: 'Step-by-step guide to creating your Aurum account and activating the EX-AI Bot.', category: 'onboarding', duration: '14:00', order: 16, featured: false },
  { _id: '17', title: 'How to Login to Aurum Exchange | Sync Your Account', youtubeId: 'C4cTJLPmIlY', description: 'Tutorial on logging into the Aurum Exchange and syncing with your foundation account.', category: 'onboarding', duration: '6:30', order: 17, featured: false },
  { _id: '18', title: 'EX AI Pro & Zeus Bot: How To Deposit & Activate', youtubeId: 'ZxTVBeeeJNQ', description: 'Complete deposit and activation walkthrough for EX AI Pro and Zeus Bot products.', category: 'onboarding', duration: '10:45', order: 18, featured: false },
  { _id: '19', title: 'VPN Required for Aurum? U.S. & Canada Access Rules Explained', youtubeId: 'hgPSheoUs_s', description: 'Important access requirements for members in the United States and Canada.', category: 'onboarding', duration: '7:15', order: 19, featured: false },
  { _id: '20', title: 'Aurum CEO Update 2025: Roadmap, Exchange Launch & Future Vision', youtubeId: 'yvqzJvQNSlA', description: 'Bryan Benson\'s comprehensive CEO update on the platform roadmap and future plans.', category: 'advanced', duration: '35:00', order: 20, featured: false },
  { _id: '21', title: 'Aurum Product Updates | January 21st Call With CEO Bryan Benson', youtubeId: '_tRy32ojJik', description: 'Latest product updates and announcements directly from the CEO.', category: 'advanced', duration: '45:00', order: 21, featured: false },
  { _id: '22', title: 'Inside AURUM\'s Dubai Global Launch | 650+ Partners', youtubeId: 'khR9DaHsf88', description: 'Full recap of the Dubai global launch event with 650+ partners in attendance.', category: 'advanced', duration: '30:00', order: 22, featured: false },
  { _id: '23', title: 'AURUM Dubai Launch Debrief | Brad Weinman\'s Inside Perspective', youtubeId: '-7oJTGVtGn8', description: 'Insider debrief from Brad Weinman on what happened at the Dubai launch.', category: 'advanced', duration: '47:08', order: 23, featured: false },
  { _id: '24', title: 'Inside Aurum at ETHCC Cannes', youtubeId: 'hDmt6QPSeo0', description: 'Aurum\'s presence at the ETHCC conference in Cannes — networking and strategic partnerships.', category: 'advanced', duration: '12:00', order: 24, featured: false },
]

const categories = [
  { id: 'all', label: 'All Videos', icon: '📚' },
  { id: 'beginner', label: 'Beginner', icon: '🟢' },
  { id: 'product', label: 'Product Info', icon: 'ℹ️' },
  { id: 'due-diligence', label: 'Due Diligence', icon: '🔍' },
  { id: 'partner', label: 'Partner Program', icon: '💸' },
  { id: 'onboarding', label: 'Onboarding', icon: '🚀' },
  { id: 'advanced', label: 'Advanced', icon: '⚡' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.45, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
}

interface UniversityVideo {
  _id: string
  title: string
  youtubeId: string
  description?: string
  category: string
  duration?: string
  order: number
  featured?: boolean
}

export default function UniversityContent({ videos: cmsVideos }: { videos: UniversityVideo[] | null }) {
  const [liveVideos, setLiveVideos] = useState<UniversityVideo[]>(fallbackVideos)
  const [activeCategory, setActiveCategory] = useState('all')

  useEffect(() => {
    async function fetchVideos() {
      try {
        const db = createClient()
        const { data, error } = await db
          .from('cms_posts')
          .select('*')
          .eq('type', 'video')
          .eq('status', 'published')
          .order('sort_order', { ascending: true })
        if (error || !data || data.length === 0) return
        const sectionVideos = (data as CmsPost[]).filter(v => v.meta?.section === 'university')
        if (sectionVideos.length === 0) return // keep fallback
        const mapped: UniversityVideo[] = sectionVideos.map(v => ({
          _id: v.id,
          title: v.title ?? 'Untitled',
          youtubeId: (v.meta?.youtubeId as string) ?? '',
          description: v.meta?.excerpt as string | undefined,
          category: (v.meta?.category as string) ?? 'beginner',
          duration: v.meta?.duration as string | undefined,
          order: v.sort_order ?? 99,
          featured: (v.meta?.featured as boolean) ?? false,
        }))
        setLiveVideos(mapped)
      } catch (e) {
        console.error('[University] Supabase fetch error:', e)
      }
    }
    fetchVideos()
  }, [])

  const [playingId, setPlayingId] = useState<string | null>(null)
  const [watched, setWatched] = useState<Set<string>>(() => {
    if (typeof window === 'undefined') return new Set()
    try {
      const saved = localStorage.getItem('aurum-university-watched')
      return saved ? new Set(JSON.parse(saved)) : new Set()
    } catch {
      return new Set()
    }
  })

  const videos = (cmsVideos && cmsVideos.length > 0) ? cmsVideos : liveVideos

  const featured = videos.filter((v) => v.featured)
  const filtered = videos.filter(
    (v) => activeCategory === 'all' || v.category === activeCategory
  )

  function markWatched(id: string) {
    setWatched((prev) => {
      const next = new Set(prev)
      next.add(id)
      try { localStorage.setItem('aurum-university-watched', JSON.stringify([...next])) } catch {}
      return next
    })
  }

  const progress = videos.length > 0 ? Math.round((watched.size / videos.length) * 100) : 0

  return (
    <div className="page-bg">
      <div className="sections-stack">

      {/* ── Blue hero — intentional brand accent for education section ── */}
      <section style={{ background: '#1b61c9', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div className="container-xl section-padding" style={{ textAlign: 'center' }}>
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0}
            className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold"
            style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)', color: '#fff' }}>
            🎓 Aurum University
          </motion.div>
          <motion.h1 variants={fadeUp} initial="hidden" animate="show" custom={1}
            className="text-5xl font-bold tracking-tight text-white sm:text-6xl" style={{ letterSpacing: '-0.03em' }}>
            Aurum University
          </motion.h1>
          <motion.p variants={fadeUp} initial="hidden" animate="show" custom={2}
            className="mx-auto mt-4 max-w-2xl text-lg leading-8" style={{ color: 'rgba(255,255,255,0.78)' }}>
            Structured video learning for new and existing Aurum members — from wallet setup to
            advanced bot strategy. Watch, learn, and track your progress.
          </motion.p>

          {/* Progress bar */}
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={3} className="mx-auto mt-8 max-w-md">
            <div className="flex items-center justify-between text-sm mb-2" style={{ color: 'rgba(255,255,255,0.65)' }}>
              <span>{watched.size} of {videos.length} watched</span>
              <span className="font-semibold text-white">{progress}%</span>
            </div>
            <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.15)' }}>
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #fff, rgba(255,255,255,0.7))' }}
              />
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={4}
            className="mt-8 flex flex-wrap items-center justify-center gap-8 text-sm">
            {[
              { value: `${videos.length}`, label: 'Videos' },
              { value: `${categories.length - 1}`, label: 'Categories' },
              { value: 'Free', label: 'Always' },
            ].map((s) => (
              <div key={s.label} className="flex flex-col items-center">
                <span className="text-2xl font-bold text-white">{s.value}</span>
                <span style={{ color: 'rgba(255,255,255,0.6)' }}>{s.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Main content ── */}
      <section className="section-box">
        <div className="container-xl section-padding">
        {/* Featured Videos */}
        {featured.length > 0 && (
          <div className="mb-12">
            <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold" style={{ color: '#181d26' }}>
              <span className="text-amber-500">⭐</span> Recommended Starting Points
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((video, i) => (
                <VideoCard
                  key={video._id}
                  video={video}
                  index={i}
                  isWatched={watched.has(video._id)}
                  isPlaying={playingId === video._id}
                  onPlay={() => { setPlayingId(video._id); markWatched(video._id) }}
                  onClose={() => setPlayingId(null)}
                  isFeatured
                />
              ))}
            </div>
          </div>
        )}

        {/* Category Filters */}
        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className="rounded-full px-4 py-2 text-sm font-semibold transition-all"
              style={{
                background: activeCategory === cat.id ? '#1b61c9' : '#fff',
                color: activeCategory === cat.id ? '#fff' : 'rgba(4,14,32,0.6)',
                border: activeCategory === cat.id ? '1px solid #1b61c9' : '1px solid #e0e2e6',
              }}
            >
              {cat.icon} {cat.label}
            </button>
          ))}
        </div>

        {/* Video Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((video, i) => (
              <VideoCard
                key={video._id}
                video={video}
                index={i}
                isWatched={watched.has(video._id)}
                isPlaying={playingId === video._id}
                onPlay={() => { setPlayingId(video._id); markWatched(video._id) }}
                onClose={() => setPlayingId(null)}
              />
            ))}
          </AnimatePresence>
        </div>

          {filtered.length === 0 && (
            <div style={{
              background: '#ffffff',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-card)',
              padding: '3rem',
              textAlign: 'center',
              color: 'var(--color-text-muted)',
            }}>
              No videos in this category yet. Check back soon!
            </div>
          )}
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="section-box-navy">
        <div className="container-xl section-padding" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2.5rem' }}>🎯</div>
          <h2 className="text-heading" style={{ color: '#ffffff', marginTop: '1rem', marginBottom: '0.75rem' }}>
            Ready to get started?
          </h2>
          <p style={{ fontSize: 'var(--text-body-lg)', color: 'rgba(255,255,255,0.72)', maxWidth: '36rem', margin: '0 auto 2rem', lineHeight: 'var(--lh-relaxed)' }}>
            Once you&apos;ve completed the key education videos, start your onboarding
            with confidence. Your partner will guide you through every step.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '0.875rem' }}>
            <Link href="/signup" style={{
              display: 'inline-flex', alignItems: 'center',
              background: 'linear-gradient(135deg, #2563eb 0%, #1b61c9 100%)',
              color: '#ffffff',
              padding: '0.875rem 2rem',
              borderRadius: 'var(--radius-btn)',
              fontFamily: 'var(--font-display)', fontWeight: 700,
              fontSize: 'var(--text-body)',
              textDecoration: 'none',
              boxShadow: '0 4px 16px rgba(27,97,201,0.45)',
            }}>
              Begin Onboarding →
            </Link>
            <Link href="/resources" style={{
              display: 'inline-flex', alignItems: 'center',
              padding: '0.875rem 2rem',
              borderRadius: 'var(--radius-btn)',
              fontFamily: 'var(--font-display)', fontWeight: 600,
              fontSize: 'var(--text-body)',
              textDecoration: 'none',
              color: '#ffffff',
              border: '1.5px solid rgba(255,255,255,0.3)',
              background: 'rgba(255,255,255,0.08)',
            }}>
              Browse Resources
            </Link>
          </div>
        </div>
      </section>

      </div>
    </div>
  )
}

// ─── Video Card Component ───────────────────────────────────────────────────
function VideoCard({
  video,
  index,
  isWatched,
  isPlaying,
  onPlay,
  onClose,
  isFeatured,
}: {
  video: UniversityVideo
  index: number
  isWatched: boolean
  isPlaying: boolean
  onPlay: () => void
  onClose: () => void
  isFeatured?: boolean
}) {
  const categoryLabel = categories.find((c) => c.id === video.category)?.label ?? video.category

  return (
    <motion.div
      layout
      variants={fadeUp}
      initial="hidden"
      animate="show"
      exit={{ opacity: 0, scale: 0.95 }}
      custom={index * 0.06}
      className="group relative overflow-hidden rounded-2xl transition-all hover:shadow-lg"
      style={{
        background: '#fff',
        border: isFeatured ? '1px solid #fde68a' : '1px solid #e0e2e6',
        boxShadow: isFeatured ? '0 0 0 1px rgba(251,191,36,0.1)' : undefined,
      }}
    >
      {/* Thumbnail / Player */}
      <div className="relative aspect-video w-full overflow-hidden" style={{ background: '#0f172a' }}>
        {isPlaying ? (
          <div className="relative h-full w-full">
            <iframe
              src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
              title={video.title}
              className="absolute inset-0 h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <button
              onClick={(e) => { e.stopPropagation(); onClose() }}
              className="absolute right-2 top-2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-black/70 text-white text-xs hover:bg-black/90 transition"
            >
              ✕
            </button>
          </div>
        ) : (
          <button onClick={onPlay} className="relative h-full w-full cursor-pointer">
            <YouTubeThumbnail
              videoId={video.youtubeId}
              title={video.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors group-hover:bg-black/20">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e12a2b] shadow-lg transition-all group-hover:scale-110">
                <svg viewBox="0 0 24 24" className="h-6 w-6 ml-0.5 fill-white">
                  <path d="M8 5.14v14l11-7-11-7z" />
                </svg>
              </div>
            </div>
            {video.duration && (
              <span className="absolute bottom-2 right-2 rounded bg-black/80 px-2 py-0.5 text-xs font-medium text-white">
                {video.duration}
              </span>
            )}
            {isWatched && (
              <span className="absolute left-2 top-2 rounded bg-emerald-500/90 px-2 py-0.5 text-xs font-bold text-white">
                ✓ Watched
              </span>
            )}
          </button>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="mb-2 flex items-center gap-2">
          <span className="rounded-full px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide"
            style={
              isFeatured
                ? { background: 'rgba(217,119,6,0.1)', color: '#b45309' }
                : { background: 'rgba(27,97,201,0.08)', color: '#1b61c9' }
            }>
            {categoryLabel}
          </span>
          {isFeatured && (
            <span className="rounded-full px-2.5 py-0.5 text-[0.65rem] font-semibold"
              style={{ background: 'rgba(217,119,6,0.1)', color: '#b45309' }}>
              ⭐ Recommended
            </span>
          )}
        </div>
        <h3 className="text-sm font-bold leading-snug line-clamp-2 transition-colors group-hover:text-[#1b61c9]"
          style={{ color: '#181d26' }}>
          {video.title}
        </h3>
        {video.description && (
          <p className="mt-1.5 text-xs leading-relaxed line-clamp-2" style={{ color: 'rgba(4,14,32,0.5)' }}>
            {video.description}
          </p>
        )}
      </div>
    </motion.div>
  )
}
