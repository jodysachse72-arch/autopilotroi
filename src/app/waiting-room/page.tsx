'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Logo from '@/components/ui/Logo'
import { motion } from 'framer-motion'
import VideoModal from '@/components/ui/VideoModal'
import YouTubeThumbnail from '@/components/ui/YouTubeThumbnail'
import { trackEvent, EVENTS } from '@/lib/analytics'
import PersonalizedPath from '@/components/sections/PersonalizedPath'

/* ─── Curated Aurum University Video Library ─── */
/* All IDs verified live via YouTube oembed API on 2026-04-13 */
const WAITING_ROOM_VIDEOS = [
  {
    id: 'MmAnR4YAPv4',
    title: 'Aurum Platform Overview',
    description: 'Learn what Aurum Foundation is and how the full ecosystem works.',
    category: 'Getting Started',
    duration: '15:22',
    priority: 1,
  },
  {
    id: 'CRuZqkc8sh4',
    title: 'AI Trading Bots vs Aurum: The Key Difference',
    description: 'What sets Aurum\'s AI trading apart from generic trading bots in the market.',
    category: 'Trading & Bots',
    duration: '12:30',
    priority: 2,
  },
  {
    id: 'X1TO-hC1Geg',
    title: 'Aurum Account Registration + Bot Activation',
    description: 'Step-by-step guide to creating your Aurum account and activating the EX-AI Bot.',
    category: 'Getting Started',
    duration: '14:00',
    priority: 3,
  },
  {
    id: 'hgPSheoUs_s',
    title: 'VPN Required? U.S. & Canada Access Rules',
    description: 'Important access requirements for members in the United States and Canada.',
    category: 'Wallets & Security',
    duration: '7:15',
    priority: 4,
  },
  {
    id: 'GJEK3wOjlyQ',
    title: 'Aurum Packages and Percentages',
    description: 'Complete overview of all investment packages and their return percentages.',
    category: 'Getting Started',
    duration: '18:00',
    priority: 5,
  },
  {
    id: 'K8qYdD1sC7w',
    title: 'Two-Factor Authentication Setup',
    description: 'Why 2FA is critical and how to enable it before your first deposit.',
    category: 'Wallets & Security',
    duration: '6:42',
    priority: 6,
  },
  {
    id: '1BI9_YikUKc',
    title: 'Compounding Strategies: Plan A vs Plan B',
    description: 'Choose the right strategy — compound or take daily profits.',
    category: 'Trading & Bots',
    duration: '22:15',
    priority: 7,
  },
  {
    id: 'xc97Nr3G3vU',
    title: 'Gold Tokenization Partnership | Clinq.Gold',
    description: 'Aurum\'s real-world asset tokenization partnership with Sierra Leone.',
    category: 'Products',
    duration: '11:20',
    priority: 8,
  },
]

const CATEGORIES = ['All', 'Getting Started', 'Trading & Bots', 'Wallets & Security', 'Products']

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
}

interface LeadInfo {
  id: string
  name: string
  email: string
}

interface ReadinessData {
  score: number
  tier: string
  tierLabel: string
}

export default function WaitingRoomPage() {
  const [lead, setLead] = useState<LeadInfo | null>(null)
  const [readiness, setReadiness] = useState<ReadinessData | null>(null)
  const [activeCategory, setActiveCategory] = useState('All')
  const [watchedVideos, setWatchedVideos] = useState<Set<string>>(new Set())

  useEffect(() => {
    const storedLead = localStorage.getItem('autopilotroi-lead')
    if (storedLead) {
      try { setLead(JSON.parse(storedLead)) } catch { /* ignore */ }
    }
    const storedReadiness = localStorage.getItem('autopilotroi-readiness')
    if (storedReadiness) {
      try { setReadiness(JSON.parse(storedReadiness)) } catch { /* ignore */ }
    }
    const storedWatched = localStorage.getItem('autopilotroi-watched')
    if (storedWatched) {
      try { setWatchedVideos(new Set(JSON.parse(storedWatched))) } catch { /* ignore */ }
    }
    // Track page view
    trackEvent(EVENTS.WAITING_ROOM_VIEW)
  }, [])

  function markWatched(videoId: string) {
    const updated = new Set(watchedVideos)
    updated.add(videoId)
    setWatchedVideos(updated)
    localStorage.setItem('autopilotroi-watched', JSON.stringify([...updated]))
    trackEvent(EVENTS.VIDEO_WATCHED, { videoId })
  }

  const filteredVideos = activeCategory === 'All'
    ? WAITING_ROOM_VIDEOS
    : WAITING_ROOM_VIDEOS.filter(v => v.category === activeCategory)

  const watchProgress = Math.round((watchedVideos.size / WAITING_ROOM_VIDEOS.length) * 100)

  const tierConfig = {
    beginner: { emoji: '🌱', color: 'text-amber-400', bg: 'bg-amber-500/15', border: 'border-amber-400/30' },
    intermediate: { emoji: '⚡', color: 'text-blue-400', bg: 'bg-blue-500/15', border: 'border-blue-400/30' },
    advanced: { emoji: '🚀', color: 'text-emerald-400', bg: 'bg-emerald-500/15', border: 'border-emerald-400/30' },
  }

  const tier = readiness?.tier as keyof typeof tierConfig || 'beginner'
  const tc = tierConfig[tier]

  return (
    <div className="min-h-screen" style={{ background: '#f8fafc' }}>
      {/* Header Bar */}
      <header className="sticky top-0 z-50" style={{ borderBottom: '1px solid #e0e2e6', background: '#fff' }}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <Link href="/">
            <Logo size={32} showText />
          </Link>
          {readiness && (
            <div className="flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold"
              style={{
                background: tier === 'advanced' ? 'rgba(16,185,129,0.1)' : tier === 'intermediate' ? 'rgba(27,97,201,0.08)' : 'rgba(245,158,11,0.08)',
                color: tier === 'advanced' ? '#059669' : tier === 'intermediate' ? '#1b61c9' : '#b45309',
                border: `1px solid ${tier === 'advanced' ? 'rgba(16,185,129,0.25)' : tier === 'intermediate' ? 'rgba(27,97,201,0.2)' : 'rgba(245,158,11,0.25)'}`,
              }}>
              {tc.emoji} {readiness.tierLabel} — {readiness.score}/100
            </div>
          )}
        </div>
      </header>

      {/* ── Hero Banner ── */}
      <section data-dark className="relative overflow-hidden bg-[#061238] px-6 py-16 text-center text-white">
        <div className="pointer-events-none absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(59,130,246,0.15)_0%,transparent_60%)]" />

        <div className="relative z-10 mx-auto max-w-3xl">
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0}>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-blue-300">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
              Learning Center
            </div>
          </motion.div>

          <motion.h1 variants={fadeUp} initial="hidden" animate="show" custom={1} className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Welcome{lead ? `, ${lead.name.split(' ')[0]}` : ''}! 🎉
          </motion.h1>

          <motion.p variants={fadeUp} initial="hidden" animate="show" custom={2} className="mx-auto mt-4 max-w-xl text-blue-100/60 leading-relaxed">
            Your assessment is complete and your partner has been notified. While you wait, explore these videos to learn about the Aurum ecosystem.
          </motion.p>

          {/* Status Card */}
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={3} className="mx-auto mt-8 grid max-w-lg gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-blue-400/20 bg-white/5 p-4 backdrop-blur-sm">
              <div className="text-xs text-blue-300/60 uppercase tracking-widest mb-1">Status</div>
              <div className="flex items-center gap-2 text-sm font-semibold text-emerald-400">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                Partner Notified
              </div>
            </div>
            <div className="rounded-xl border border-blue-400/20 bg-white/5 p-4 backdrop-blur-sm">
              <div className="text-xs text-blue-300/60 uppercase tracking-widest mb-1">Next Step</div>
              <div className="text-sm font-semibold text-[var(--text-primary)]">Check Your Email</div>
            </div>
            <div className="rounded-xl border border-blue-400/20 bg-white/5 p-4 backdrop-blur-sm">
              <div className="text-xs text-blue-300/60 uppercase tracking-widest mb-1">Videos Watched</div>
              <div className="text-sm font-semibold text-[var(--text-primary)]">{watchedVideos.size}/{WAITING_ROOM_VIDEOS.length}</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Personalized Path ── */}
      {readiness && (
        <PersonalizedPath tier={readiness.tier} watchedVideoCount={watchedVideos.size} />
      )}

      {/* Learning Progress */}
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold" style={{ color: '#181d26' }}>Learning Progress</span>
          <span className="text-sm font-bold" style={{ color: '#1b61c9' }}>{watchProgress}%</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full" style={{ background: '#e0e2e6' }}>
          <motion.div
            className="h-full rounded-full"
            style={{ background: 'linear-gradient(90deg, #1b61c9, #06b6d4)' }}
            initial={{ width: 0 }}
            animate={{ width: `${watchProgress}%` }}
            transition={{ duration: 0.6, delay: 0.3 }}
          />
        </div>
      </div>

      {/* Category Filters */}
      <div className="mx-auto max-w-7xl px-6 pb-4">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className="rounded-full px-4 py-2 text-sm font-semibold transition-all"
              style={{
                background: activeCategory === cat ? '#1b61c9' : '#fff',
                color: activeCategory === cat ? '#fff' : 'rgba(4,14,32,0.6)',
                border: activeCategory === cat ? '1px solid #1b61c9' : '1px solid #e0e2e6',
              }}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Video Grid */}
      <div className="mx-auto max-w-7xl px-6 pb-20">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredVideos.map((video, i) => (
            <motion.div key={video.id} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i * 0.08}>
              <VideoModal videoUrl={`https://www.youtube.com/watch?v=${video.id}`} ctaLabel="Ready to Get Started? →" ctaHref="/signup">
                <div className="group cursor-pointer overflow-hidden rounded-2xl transition-all hover:shadow-lg"
                  style={{ background: '#fff', border: '1px solid #e0e2e6' }}
                  onClick={() => markWatched(video.id)}>
                  <div className="relative aspect-video overflow-hidden" style={{ background: '#0f172a' }}>
                    <YouTubeThumbnail videoId={video.id} title={video.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors group-hover:bg-black/40">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-600 shadow-lg transition-transform group-hover:scale-110">
                        <svg viewBox="0 0 24 24" className="h-5 w-5 ml-0.5 fill-white"><path d="M8 5.14v14l11-7-11-7z" /></svg>
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 rounded bg-black/80 px-1.5 py-0.5 text-xs font-medium text-white">{video.duration}</div>
                    {watchedVideos.has(video.id) && (
                      <div className="absolute top-2 right-2 rounded-full bg-emerald-500 p-1">
                        <svg className="h-3 w-3 fill-white" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                      </div>
                    )}
                    <div className="absolute top-2 left-2 rounded-full px-2 py-0.5 text-[0.6rem] font-semibold text-white" style={{ background: 'rgba(27,97,201,0.9)' }}>{video.category}</div>
                  </div>
                  <div className="p-4">
                    <h3 className="mb-1 text-sm font-bold line-clamp-2 transition-colors group-hover:text-blue-600" style={{ color: '#181d26' }}>{video.title}</h3>
                    <p className="text-xs line-clamp-2 leading-relaxed" style={{ color: 'rgba(4,14,32,0.5)' }}>{video.description}</p>
                  </div>
                </div>
              </VideoModal>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <section className="px-6 py-16 text-center" style={{ borderTop: '1px solid #e0e2e6', background: '#fff' }}>
        <h2 className="mb-3 text-2xl font-bold" style={{ color: '#181d26', letterSpacing: '-0.02em' }}>What Happens Next?</h2>
        <p className="mx-auto max-w-lg leading-relaxed mb-6" style={{ color: 'rgba(4,14,32,0.55)' }}>
          Your partner will review your assessment and send you a personalized onboarding link via email.
          Keep an eye on your inbox for <span className="font-semibold" style={{ color: '#1b61c9' }}>{lead?.email}</span>.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/university" className="rounded-xl px-8 py-3 font-bold text-white transition" style={{ background: '#1b61c9' }}>
            Explore Full University →
          </Link>
          <Link href="/" className="rounded-xl px-8 py-3 font-semibold transition" style={{ background: '#f8fafc', border: '1px solid #e0e2e6', color: '#181d26' }}>
            Back to Home
          </Link>
        </div>
      </section>
    </div>
  )
}
