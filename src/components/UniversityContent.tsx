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
  { id: 'all',           label: 'All Videos',     icon: '📚' },
  { id: 'beginner',      label: 'Beginner',        icon: '🟢' },
  { id: 'product',       label: 'Product Info',    icon: 'ℹ️' },
  { id: 'due-diligence', label: 'Due Diligence',   icon: '🔍' },
  { id: 'partner',       label: 'Partner Program', icon: '💸' },
  { id: 'onboarding',    label: 'Onboarding',      icon: '🚀' },
  { id: 'advanced',      label: 'Advanced',        icon: '⚡' },
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
        if (sectionVideos.length === 0) return
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

      {/* ── Hero — blue brand accent ── */}
      <section style={{ background: 'linear-gradient(145deg, #1047b0 0%, #1b61c9 60%, #0d3599 100%)', borderRadius: 'var(--radius-section)', overflow: 'hidden' }}>
        <div className="container-xl section-padding" style={{ textAlign: 'center' }}>

          {/* Badge */}
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0}
            className="mb-6 inline-flex items-center gap-2 badge badge-white">
            🎓 Aurum University
          </motion.div>

          {/* H1 — no longer duplicates the badge text */}
          <motion.h1 variants={fadeUp} initial="hidden" animate="show" custom={1}
            className="text-display" style={{ color: '#ffffff', letterSpacing: '-0.03em' }}>
            Your Learning Path Starts Here
          </motion.h1>

          <motion.p variants={fadeUp} initial="hidden" animate="show" custom={2}
            className="text-body-lg mx-auto mt-5 max-w-2xl"
            style={{ color: 'rgba(255,255,255,0.80)' }}>
            Structured video learning for new and existing Aurum members — from wallet setup to
            advanced bot strategy. Watch, learn, and track your progress.
          </motion.p>

          {/* Progress bar */}
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={3} className="mx-auto mt-10 max-w-sm">
            <div className="flex items-center justify-between mb-2" style={{ fontSize: 'var(--text-caption)', color: 'rgba(255,255,255,0.70)' }}>
              <span>{watched.size} of {videos.length} watched</span>
              <span style={{ fontWeight: 700, color: '#ffffff' }}>{progress}%</span>
            </div>
            <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.18)' }}>
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{ width: `${progress}%`, background: 'linear-gradient(90deg, rgba(255,255,255,0.9), rgba(255,255,255,0.55))' }}
              />
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={4}
            className="mt-10 flex flex-wrap items-center justify-center gap-10">
            {[
              { value: `${videos.length}`, label: 'Videos' },
              { value: `${categories.length - 1}`, label: 'Categories' },
              { value: 'Free', label: 'Always' },
            ].map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-1">
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 800, color: '#ffffff', lineHeight: 1 }}>{s.value}</span>
                <span style={{ fontSize: 'var(--text-caption)', color: 'rgba(255,255,255,0.62)', letterSpacing: '0.06em', textTransform: 'uppercase', fontWeight: 600 }}>{s.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Main content ── */}
      <section className="section-box">
        <div className="container-xl section-padding">

          {/* Featured Videos — distinct treatment */}
          {featured.length > 0 && (
            <div className="mb-14">
              <div className="mb-7 flex items-center gap-3">
                <div style={{
                  width: '4px', height: '2rem', borderRadius: '2px',
                  background: 'linear-gradient(180deg, #f59e0b, #d97706)',
                  flexShrink: 0,
                }} />
                <h2 className="text-subheading" style={{ color: '#181d26' }}>
                  Recommended Starting Points
                </h2>
                <span className="badge" style={{ background: 'rgba(217,119,6,0.10)', color: '#b45309', border: '1px solid rgba(217,119,6,0.20)', marginLeft: '0.25rem' }}>
                  ⭐ {featured.length} videos
                </span>
              </div>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
          <div className="mb-8 flex flex-wrap gap-2.5">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.375rem',
                    padding: '0.5rem 1.125rem',
                    borderRadius: '99px',
                    fontSize: 'var(--text-body)',
                    fontWeight: isActive ? 700 : 500,
                    fontFamily: 'var(--font-display)',
                    cursor: 'pointer',
                    transition: 'all 200ms cubic-bezier(0.22,1,0.36,1)',
                    background: isActive ? '#1b61c9' : '#ffffff',
                    color: isActive ? '#ffffff' : 'rgba(24,29,38,0.65)',
                    border: isActive ? '1.5px solid #1b61c9' : '1.5px solid #e0e2e6',
                    boxShadow: isActive ? '0 4px 14px rgba(27,97,201,0.30)' : 'none',
                    transform: isActive ? 'translateY(-1px)' : 'none',
                  }}
                >
                  <span>{cat.icon}</span>
                  {cat.label}
                </button>
              )
            })}
          </div>

          {/* Video Grid */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
              background: '#f8fafc',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-card)',
              padding: '4rem 2rem',
              textAlign: 'center',
              color: 'var(--color-text-muted)',
              fontSize: 'var(--text-body-lg)',
            }}>
              No videos in this category yet — check back soon!
            </div>
          )}
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="section-box-navy">
        <div className="container-xl section-padding" style={{ textAlign: 'center' }}>
          <div style={{
            width: '4rem', height: '4rem', borderRadius: '1rem',
            background: 'rgba(27,97,201,0.20)',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.75rem', marginBottom: '1.5rem',
          }}>
            🎯
          </div>
          <h2 className="text-heading" style={{ color: '#ffffff', marginBottom: '0.875rem' }}>
            Ready to get started?
          </h2>
          <p className="text-body-lg mx-auto" style={{ color: 'rgba(255,255,255,0.72)', maxWidth: '36rem', marginBottom: '2.25rem', lineHeight: 'var(--lh-relaxed)' }}>
            Once you&apos;ve completed the key education videos, start your onboarding
            with confidence. Your partner will guide you through every step.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
            <Link href="/signup" className="btn btn-primary-lg shimmer-hover">
              Begin Onboarding →
            </Link>
            <Link href="/resources" className="btn btn-ghost">
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
      className="group relative overflow-hidden"
      style={{
        background: '#fff',
        borderRadius: 'var(--radius-card)',
        border: isFeatured ? '1.5px solid #fde68a' : '1px solid #e0e2e6',
        boxShadow: isFeatured
          ? '0 0 0 1px rgba(251,191,36,0.08), 0 4px 20px rgba(217,119,6,0.10)'
          : 'var(--shadow-card)',
        /* Featured cards get a left accent bar */
        borderLeft: isFeatured ? '4px solid #f59e0b' : undefined,
        transition: 'box-shadow 300ms cubic-bezier(0.22,1,0.36,1), transform 300ms cubic-bezier(0.22,1,0.36,1)',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'
        ;(e.currentTarget as HTMLElement).style.boxShadow = isFeatured
          ? '0 0 0 1px rgba(251,191,36,0.18), 0 8px 28px rgba(217,119,6,0.16)'
          : 'var(--shadow-card-hover)'
      }}
      onMouseLeave={e => {
        ;(e.currentTarget as HTMLElement).style.transform = ''
        ;(e.currentTarget as HTMLElement).style.boxShadow = isFeatured
          ? '0 0 0 1px rgba(251,191,36,0.08), 0 4px 20px rgba(217,119,6,0.10)'
          : 'var(--shadow-card)'
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
              <span className="absolute left-2 top-2 rounded-full bg-emerald-500/90 px-2.5 py-0.5 text-xs font-bold text-white">
                ✓ Watched
              </span>
            )}
          </button>
        )}
      </div>

      {/* Info */}
      <div style={{ padding: '1.25rem 1.375rem 1.375rem' }}>
        <div className="mb-2.5 flex items-center gap-2 flex-wrap">
          <span
            className="rounded-full px-3 py-1"
            style={{
              fontSize: 'var(--text-caption)',
              fontWeight: 600,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              ...(isFeatured
                ? { background: 'rgba(217,119,6,0.10)', color: '#b45309' }
                : { background: 'rgba(27,97,201,0.08)', color: '#1b61c9' }),
            }}
          >
            {categoryLabel}
          </span>
          {isFeatured && (
            <span
              className="rounded-full px-3 py-1"
              style={{ fontSize: 'var(--text-caption)', fontWeight: 600, background: 'rgba(217,119,6,0.10)', color: '#b45309' }}
            >
              ⭐ Recommended
            </span>
          )}
        </div>
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1rem',
            fontWeight: 700,
            lineHeight: 1.35,
            color: '#181d26',
            marginBottom: '0.5rem',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
          className="transition-colors group-hover:text-[#1b61c9]"
        >
          {video.title}
        </h3>
        {video.description && (
          <p
            style={{
              fontSize: '0.875rem',
              lineHeight: 1.6,
              color: 'rgba(24,29,38,0.56)',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {video.description}
          </p>
        )}
      </div>
    </motion.div>
  )
}
