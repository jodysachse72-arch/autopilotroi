'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import YouTubeThumbnail from '@/components/ui/YouTubeThumbnail'
import { createClient } from '@/lib/supabase/client'
import type { CmsPost } from '@/lib/cms/types'
import {
  AcademyIcon,
  SparkleIcon,
  SearchIcon,
  PartnerIcon,
  OnboardingIcon,
  TrendingUpIcon,
  BankIcon,
  PlayCircleIcon,
  CheckCircleIcon,
  CompassIcon,
  FlagIcon,
} from '@/components/ui/Icons'
import { PageShell, SectionBox, SectionHeader, HeroDark, CTABand } from '@/components/sections'
import { useScrollReveal } from '@/lib/useScrollReveal'

// ════════════════════════════════════════════════════════════════
// FALLBACK VIDEO DATA — verified live via YouTube oembed API
// Used when Supabase has no published university videos yet.
// ════════════════════════════════════════════════════════════════
const fallbackVideos: UniversityVideo[] = [
  { _id: '1',  title: 'AURUM EXPLAINED (UPDATED) | AI Finance Meets Real-World Assets', youtubeId: 'MmAnR4YAPv4', description: 'Complete updated introduction to the Aurum ecosystem, products, and opportunity.', category: 'beginner', duration: '15:22', order: 1, featured: true },
  { _id: '2',  title: 'Why Aurum? A 12-Minute Due-Diligence Briefing', youtubeId: 'XYaFPdtHBUU', description: 'Independent due diligence overview for prospective members evaluating the platform.', category: 'due-diligence', duration: '12:00', order: 2, featured: true },
  { _id: '3',  title: 'Aurum From 30,000 Feet | Lazy Critics Always Miss This', youtubeId: 'toL9hE-DoCo', description: 'High-level strategic view of the Aurum ecosystem and why critics often miss the big picture.', category: 'beginner', duration: '14:30', order: 3, featured: true },
  { _id: '4',  title: 'The 1000 Millionaires Mission | Aurum CEO\u0027s Tip of the Iceberg Talk', youtubeId: '4wZ48SCivbk', description: 'Bryan Benson\u0027s vision talk on building 1,000 millionaires through the Aurum ecosystem.', category: 'beginner', duration: '10:15', order: 4, featured: false },
  { _id: '5',  title: 'The Shift From Old Money to AI Finance (Aurum Explained)', youtubeId: 'KmG-RRVUhis', description: 'Understanding the paradigm shift from traditional finance to AI-powered wealth building.', category: 'beginner', duration: '18:45', order: 5, featured: false },
  { _id: '6',  title: 'Is The Trading Real? EX AI Bot Proof of Trading Resources', youtubeId: '__fiYVbAtcs', description: 'Verification resources and evidence that the EX-AI Bot trading is legitimate.', category: 'due-diligence', duration: '15:30', order: 6, featured: false },
  { _id: '7',  title: 'Can You Verify the Trades? AURUM Leaders Respond', youtubeId: 'iYZMYLhgXv8', description: 'Aurum leadership addresses trade verification questions head-on.', category: 'due-diligence', duration: '20:01', order: 7, featured: false },
  { _id: '8',  title: 'Aurum Live Trading Testimonials | Real Results & Proof of Trading', youtubeId: '6ZGS7zwEn5Q', description: 'Real partner testimonials and live trading proof from active Aurum members.', category: 'due-diligence', duration: '16:42', order: 8, featured: false },
  { _id: '9',  title: 'AI Trading Bots vs Aurum: The Key Difference Most People Miss', youtubeId: 'CRuZqkc8sh4', description: 'What sets Aurum\u0027s AI trading apart from generic trading bots in the market.', category: 'product', duration: '12:30', order: 9, featured: false },
  { _id: '10', title: 'EX AI Bot Compounding Strategies: Plan A vs Plan B Explained', youtubeId: '1BI9_YikUKc', description: 'Detailed breakdown of the two compounding strategies for maximum returns.', category: 'product', duration: '22:15', order: 10, featured: false },
  { _id: '11', title: 'Aurum Packages and Percentages', youtubeId: 'GJEK3wOjlyQ', description: 'Complete overview of all investment packages and their return percentages.', category: 'product', duration: '18:00', order: 11, featured: false },
  { _id: '12', title: 'AURUM Announces Major Gold Tokenization Partnership | Clinq.Gold + Sierra Leone', youtubeId: 'xc97Nr3G3vU', description: 'Breaking news on Aurum\u0027s real-world asset tokenization partnership.', category: 'product', duration: '11:20', order: 12, featured: false },
  { _id: '13', title: 'Shane Morand Joins AURUM After Helping Scale Organo Gold to $1 Billion', youtubeId: '-6viWJxNYVU', description: 'Industry leader Shane Morand explains why he chose to join the Aurum ecosystem.', category: 'partner', duration: '25:00', order: 13, featured: false },
  { _id: '14', title: 'Build VOYAGERS, Not Noise | Aurum Partner Strategy Explained', youtubeId: 'FMkQxq9lb0o', description: 'Strategic framework for building a sustainable Aurum partner organization.', category: 'partner', duration: '19:30', order: 14, featured: false },
  { _id: '15', title: 'PEP-TALK: Stop Overthinking. Start Compounding with Aurum', youtubeId: 'zb1iV9aApOA', description: 'Motivational session on taking action and leveraging the compounding power of Aurum.', category: 'partner', duration: '8:45', order: 15, featured: false },
  { _id: '16', title: 'Aurum Account Registration + EX AI Bot Activation (U.S. & Canada)', youtubeId: 'X1TO-hC1Geg', description: 'Step-by-step guide to creating your Aurum account and activating the EX-AI Bot.', category: 'onboarding', duration: '14:00', order: 16, featured: false },
  { _id: '17', title: 'How to Login to Aurum Exchange | Sync Your Account', youtubeId: 'C4cTJLPmIlY', description: 'Tutorial on logging into the Aurum Exchange and syncing with your foundation account.', category: 'onboarding', duration: '6:30', order: 17, featured: false },
  { _id: '18', title: 'EX AI Pro & Zeus Bot: How To Deposit & Activate', youtubeId: 'ZxTVBeeeJNQ', description: 'Complete deposit and activation walkthrough for EX AI Pro and Zeus Bot products.', category: 'onboarding', duration: '10:45', order: 18, featured: false },
  { _id: '19', title: 'VPN Required for Aurum? U.S. & Canada Access Rules Explained', youtubeId: 'hgPSheoUs_s', description: 'Important access requirements for members in the United States and Canada.', category: 'onboarding', duration: '7:15', order: 19, featured: false },
  { _id: '20', title: 'Aurum CEO Update 2025: Roadmap, Exchange Launch & Future Vision', youtubeId: 'yvqzJvQNSlA', description: 'Bryan Benson\u0027s comprehensive CEO update on the platform roadmap and future plans.', category: 'advanced', duration: '35:00', order: 20, featured: false },
  { _id: '21', title: 'Aurum Product Updates | January 21st Call With CEO Bryan Benson', youtubeId: '_tRy32ojJik', description: 'Latest product updates and announcements directly from the CEO.', category: 'advanced', duration: '45:00', order: 21, featured: false },
  { _id: '22', title: 'Inside AURUM\u0027s Dubai Global Launch | 650+ Partners', youtubeId: 'khR9DaHsf88', description: 'Full recap of the Dubai global launch event with 650+ partners in attendance.', category: 'advanced', duration: '30:00', order: 22, featured: false },
  { _id: '23', title: 'AURUM Dubai Launch Debrief | Brad Weinman\u0027s Inside Perspective', youtubeId: '-7oJTGVtGn8', description: 'Insider debrief from Brad Weinman on what happened at the Dubai launch.', category: 'advanced', duration: '47:08', order: 23, featured: false },
  { _id: '24', title: 'Inside Aurum at ETHCC Cannes', youtubeId: 'hDmt6QPSeo0', description: 'Aurum\u0027s presence at the ETHCC conference in Cannes — networking and strategic partnerships.', category: 'advanced', duration: '12:00', order: 24, featured: false },
]

// ── Categories: kept for the "Browse all" filter row ─────────────────────────
type Category = {
  id: string
  label: string
  Icon: (p: { className?: string; strokeWidth?: number }) => React.ReactElement
  color: string
  colorBg: string
}
const categories: Category[] = [
  { id: 'all',           label: 'All Videos',     Icon: AcademyIcon,     color: '#1b61c9', colorBg: 'rgba(27,97,201,0.10)' },
  { id: 'beginner',      label: 'Beginner',       Icon: SparkleIcon,     color: '#059669', colorBg: 'rgba(5,150,105,0.10)' },
  { id: 'product',       label: 'Product Info',   Icon: BankIcon,        color: '#0891b2', colorBg: 'rgba(8,145,178,0.10)' },
  { id: 'due-diligence', label: 'Due Diligence',  Icon: SearchIcon,      color: '#7c3aed', colorBg: 'rgba(124,58,237,0.10)' },
  { id: 'partner',       label: 'Partner Program',Icon: PartnerIcon,     color: '#d97706', colorBg: 'rgba(217,119,6,0.10)' },
  { id: 'onboarding',    label: 'Onboarding',     Icon: OnboardingIcon,  color: '#1b61c9', colorBg: 'rgba(27,97,201,0.10)' },
  { id: 'advanced',      label: 'Advanced',       Icon: TrendingUpIcon,  color: '#dc2626', colorBg: 'rgba(220,38,38,0.10)' },
]

// ── Curated learning paths — Maven-style horizontal lanes ────────────────────
type LearningPath = {
  id: string
  eyebrow: string
  title: string
  description: string
  instructor: { name: string; role: string }
  Icon: (p: { className?: string; strokeWidth?: number }) => React.ReactElement
  color: string
  colorBg: string
  /** Categories that feed this lane, in the order they should appear */
  sourceCategories: string[]
}
const learningPaths: LearningPath[] = [
  {
    id: 'exploring',
    eyebrow: 'Path 01',
    title: 'Just Exploring',
    description:
      'Get the big picture: what Aurum is, how it works, and why due-diligence-minded people are paying attention.',
    instructor: { name: 'Bryan Benson', role: 'CEO, Aurum Foundation' },
    Icon: CompassIcon,
    color: '#0891b2',
    colorBg: 'rgba(8,145,178,0.10)',
    sourceCategories: ['beginner', 'due-diligence'],
  },
  {
    id: 'onboard',
    eyebrow: 'Path 02',
    title: 'Ready to Onboard',
    description:
      'Walk through the products, packages, and the exact steps to register, fund, and activate the EX-AI Bot.',
    instructor: { name: 'Brad Weinman', role: 'Senior Aurum Partner' },
    Icon: OnboardingIcon,
    color: '#1b61c9',
    colorBg: 'rgba(27,97,201,0.10)',
    sourceCategories: ['product', 'onboarding'],
  },
  {
    id: 'team',
    eyebrow: 'Path 03',
    title: 'Building a Team',
    description:
      'Strategy, advanced product calls, and partner playbooks for members ready to grow an organization.',
    instructor: { name: 'Shane Morand', role: 'Aurum Partner & Industry Veteran' },
    Icon: PartnerIcon,
    color: '#d97706',
    colorBg: 'rgba(217,119,6,0.10)',
    sourceCategories: ['partner', 'advanced'],
  },
]

// ── Animation easing/preset ─────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
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

// ════════════════════════════════════════════════════════════════
// MAIN PAGE
// ════════════════════════════════════════════════════════════════
export default function UniversityContent({ videos: cmsVideos }: { videos: UniversityVideo[] | null }) {
  useScrollReveal()

  const [liveVideos, setLiveVideos] = useState<UniversityVideo[]>(fallbackVideos)
  const [activeCategory, setActiveCategory] = useState('all')
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

  // ── Pull live videos from Supabase, fall back to the static array ──
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

  const videos = (cmsVideos && cmsVideos.length > 0) ? cmsVideos : liveVideos

  // Build the three lane buckets, ordered by source category then video order
  const lanesWithVideos = useMemo(() => {
    return learningPaths.map(path => {
      const items = videos
        .filter(v => path.sourceCategories.includes(v.category))
        .sort((a, b) => {
          const ai = path.sourceCategories.indexOf(a.category)
          const bi = path.sourceCategories.indexOf(b.category)
          if (ai !== bi) return ai - bi
          return a.order - b.order
        })
      return { ...path, videos: items }
    })
  }, [videos])

  const filtered = videos.filter(v => activeCategory === 'all' || v.category === activeCategory)

  const totalVideos = videos.length
  const watchedCount = watched.size
  const progress = totalVideos > 0 ? Math.round((watchedCount / totalVideos) * 100) : 0

  function markWatched(id: string) {
    setWatched(prev => {
      const next = new Set(prev)
      next.add(id)
      try { localStorage.setItem('aurum-university-watched', JSON.stringify([...next])) } catch {}
      return next
    })
  }

  const totalMinutes = videos.reduce((sum, v) => {
    if (!v.duration) return sum
    const parts = v.duration.split(':').map(Number)
    if (parts.length !== 2 || parts.some(isNaN)) return sum
    return sum + parts[0] + Math.round(parts[1] / 60)
  }, 0)
  const hours = Math.floor(totalMinutes / 60)

  return (
    <PageShell>
      {/* ── HERO — editorial dark, quote attribution on the right ─────────── */}
      <HeroDark
        badge={
          <>
            <AcademyIcon className="w-4 h-4" strokeWidth={2} />
            Aurum University
          </>
        }
        title={
          <>
            Three paths.
            <br />
            <span style={{ color: '#93c5fd' }}>One ecosystem to master.</span>
          </>
        }
        description="A curated video curriculum for new and existing Aurum members. Pick the path that fits where you are right now — exploring, onboarding, or building a team — and learn at your own pace."
        bullets={[
          { icon: <PlayCircleIcon className="w-4 h-4" strokeWidth={2.2} />, text: `${totalVideos} videos` },
          { icon: <FlagIcon className="w-4 h-4" strokeWidth={2.2} />, text: `${learningPaths.length} learning paths` },
          { icon: <CheckCircleIcon className="w-4 h-4" strokeWidth={2.2} />, text: hours > 0 ? `~${hours}h of content` : 'Self-paced' },
        ]}
        visual={<EditorialQuote watchedCount={watchedCount} totalVideos={totalVideos} progress={progress} />}
      />

      {/* ── LEARNING PATHS — three Maven-style horizontal lanes ───────────── */}
      <SectionBox>
        <SectionHeader
          eyebrow={
            <>
              <FlagIcon className="w-3.5 h-3.5" strokeWidth={2.2} />
              Learning Paths
            </>
          }
          title={
            <>
              Pick the path that
              <br />
              fits where you are.
            </>
          }
          align="left"
          maxWidth="40rem"
          marginBottom="3rem"
        >
          Each path is a curated sequence of videos — start at the top of a lane and work your way
          across. Your watched progress is saved on this device.
        </SectionHeader>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
          {lanesWithVideos.map((lane, laneIdx) => (
            <PathLane
              key={lane.id}
              lane={lane}
              laneIndex={laneIdx}
              watched={watched}
              playingId={playingId}
              onPlay={(id) => { setPlayingId(id); markWatched(id) }}
              onClose={() => setPlayingId(null)}
            />
          ))}
        </div>
      </SectionBox>

      {/* ── BROWSE ALL — category filters + full grid ─────────────────────── */}
      <SectionBox variant="surface" id="browse-all">
        <SectionHeader
          eyebrow={
            <>
              <AcademyIcon className="w-3.5 h-3.5" strokeWidth={2.2} />
              Full Library
            </>
          }
          title={<>Browse all videos.</>}
          align="left"
          maxWidth="40rem"
          marginBottom="2rem"
        >
          {totalVideos} videos across {categories.length - 1} categories. Filter by topic to find
          exactly what you need.
        </SectionHeader>

        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onSelect={setActiveCategory}
        />

        <div style={{
          display: 'grid',
          gap: '1.5rem',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
          marginTop: '2rem',
        }}>
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
            padding: '4rem 2rem',
            textAlign: 'center',
            color: 'var(--color-text-muted)',
            fontSize: 'var(--text-body-lg)',
            marginTop: '1.5rem',
          }}>
            No videos in this category yet — check back soon.
          </div>
        )}
      </SectionBox>

      {/* ── BOTTOM CTA ───────────────────────────────────────────────────── */}
      <CTABand
        eyebrow="Ready when you are"
        title={
          <>
            Watched the essentials?
            <br />
            Begin onboarding.
          </>
        }
        description="Once you've completed a learning path, your AutoPilotROI partner walks you through wallet setup, account creation, and bot activation."
        ctas={[
          { label: 'Begin Onboarding →', href: '/signup' },
          { label: 'Browse Resources', href: '/resources', variant: 'ghost' },
        ]}
      />
    </PageShell>
  )
}

// ════════════════════════════════════════════════════════════════
// EDITORIAL QUOTE — sits in the hero's right column
// Replaces the old progress panel with a quote + attribution + thin progress.
// ════════════════════════════════════════════════════════════════
function EditorialQuote({
  watchedCount,
  totalVideos,
  progress,
}: {
  watchedCount: number
  totalVideos: number
  progress: number
}) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.06)',
      border: '1px solid rgba(255,255,255,0.12)',
      borderRadius: '1.25rem',
      padding: '2.25rem',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 24px 64px rgba(0,0,0,0.30)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '-1.25rem',
          left: '1rem',
          fontFamily: 'Georgia, serif',
          fontSize: '7rem',
          lineHeight: 1,
          color: 'rgba(147,197,253,0.14)',
          fontWeight: 700,
          pointerEvents: 'none',
        }}
      >
        &ldquo;
      </div>

      <div style={{ position: 'relative' }}>
        <p style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.375rem',
          lineHeight: 1.45,
          color: 'rgba(255,255,255,0.94)',
          fontWeight: 500,
          marginBottom: '1.75rem',
          letterSpacing: '-0.01em',
        }}>
          The mission isn&apos;t a faster trade — it&apos;s a thousand new millionaires
          who actually understand what their money is doing.
        </p>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.875rem',
          paddingBottom: '1.5rem',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}>
          <div
            aria-hidden
            style={{
              width: '2.5rem',
              height: '2.5rem',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #1b61c9 0%, #4f46e5 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '0.9375rem',
              flexShrink: 0,
            }}
          >
            BB
          </div>
          <div>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: '0.9375rem',
              fontWeight: 700,
              color: '#ffffff',
              lineHeight: 1.2,
            }}>
              Bryan Benson
            </div>
            <div style={{
              fontSize: 'var(--text-caption)',
              color: 'rgba(255,255,255,0.55)',
              marginTop: '0.125rem',
              letterSpacing: '0.02em',
            }}>
              Founder &amp; CEO, Aurum Foundation
            </div>
          </div>
        </div>

        <div style={{ marginTop: '1.5rem' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '0.625rem',
          }}>
            <span style={{
              fontSize: '0.6875rem',
              letterSpacing: '0.10em',
              textTransform: 'uppercase',
              fontWeight: 700,
              color: 'rgba(255,255,255,0.55)',
              fontFamily: 'var(--font-display)',
            }}>
              Your Progress
            </span>
            <span style={{
              fontSize: 'var(--text-caption)',
              color: 'rgba(255,255,255,0.78)',
              fontWeight: 600,
            }}>
              {watchedCount} / {totalVideos} watched
            </span>
          </div>
          <div style={{
            height: '0.4375rem',
            background: 'rgba(255,255,255,0.10)',
            borderRadius: '99px',
            overflow: 'hidden',
          }}>
            <div style={{
              height: '100%',
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #93c5fd 0%, #60a5fa 100%)',
              borderRadius: '99px',
              transition: 'width 700ms cubic-bezier(0.22,1,0.36,1)',
            }} />
          </div>
        </div>
      </div>
    </div>
  )
}

// ════════════════════════════════════════════════════════════════
// PATH LANE — one Maven-style horizontal learning path
// Header with instructor + cover treatment, scrollable row of cards
// ════════════════════════════════════════════════════════════════
function PathLane({
  lane,
  laneIndex,
  watched,
  playingId,
  onPlay,
  onClose,
}: {
  lane: LearningPath & { videos: UniversityVideo[] }
  laneIndex: number
  watched: Set<string>
  playingId: string | null
  onPlay: (id: string) => void
  onClose: () => void
}) {
  const Icon = lane.Icon
  const initials = lane.instructor.name
    .split(' ')
    .map(s => s[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')

  return (
    <motion.section
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      custom={laneIndex}
      style={{
        background: '#ffffff',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-card)',
        boxShadow: 'var(--shadow-card)',
        overflow: 'hidden',
      }}
    >
      <div style={{
        position: 'relative',
        padding: '2rem 2rem 1.75rem',
        background: `linear-gradient(135deg, ${lane.colorBg} 0%, rgba(255,255,255,0) 70%)`,
        borderBottom: '1px solid var(--color-border)',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
          gap: '1.5rem',
          alignItems: 'flex-end',
        }}>
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.625rem',
              marginBottom: '0.875rem',
            }}>
              <div style={{
                width: '2.25rem',
                height: '2.25rem',
                borderRadius: '0.625rem',
                background: lane.colorBg,
                color: lane.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Icon className="w-5 h-5" strokeWidth={2} />
              </div>
              <span style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.6875rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                fontWeight: 700,
                color: lane.color,
              }}>
                {lane.eyebrow}
              </span>
            </div>
            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.875rem',
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: '-0.01em',
              color: '#181d26',
              marginBottom: '0.625rem',
            }}>
              {lane.title}
            </h3>
            <p style={{
              fontSize: 'var(--text-body)',
              lineHeight: 1.55,
              color: 'rgba(24,29,38,0.65)',
              maxWidth: '34rem',
            }}>
              {lane.description}
            </p>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.875rem',
            justifySelf: 'end',
          }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{
                fontSize: '0.6875rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                fontWeight: 700,
                color: 'rgba(24,29,38,0.45)',
                marginBottom: '0.25rem',
              }}>
                Featuring
              </div>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.9375rem',
                fontWeight: 700,
                color: '#181d26',
                lineHeight: 1.2,
              }}>
                {lane.instructor.name}
              </div>
              <div style={{
                fontSize: 'var(--text-caption)',
                color: 'rgba(24,29,38,0.55)',
                marginTop: '0.125rem',
              }}>
                {lane.instructor.role}
              </div>
            </div>
            <div
              aria-hidden
              style={{
                width: '3rem',
                height: '3rem',
                borderRadius: '50%',
                background: `linear-gradient(135deg, ${lane.color} 0%, rgba(0,0,0,0.4) 140%)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '0.9375rem',
                flexShrink: 0,
                boxShadow: '0 6px 16px rgba(0,0,0,0.18)',
              }}
            >
              {initials}
            </div>
          </div>
        </div>

        <div style={{
          display: 'flex',
          gap: '1.5rem',
          marginTop: '1.5rem',
          paddingTop: '1.25rem',
          borderTop: '1px solid rgba(0,0,0,0.06)',
          flexWrap: 'wrap',
        }}>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4375rem',
            fontSize: 'var(--text-caption)',
            color: 'rgba(24,29,38,0.62)',
            fontWeight: 500,
          }}>
            <PlayCircleIcon className="w-3.5 h-3.5" strokeWidth={2.2} />
            {lane.videos.length} videos
          </span>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4375rem',
            fontSize: 'var(--text-caption)',
            color: 'rgba(24,29,38,0.62)',
            fontWeight: 500,
          }}>
            <CheckCircleIcon className="w-3.5 h-3.5" strokeWidth={2.2} />
            {lane.videos.filter(v => watched.has(v._id)).length} watched
          </span>
        </div>
      </div>

      <div style={{
        padding: '1.5rem 2rem 2rem',
        overflowX: 'auto',
        WebkitOverflowScrolling: 'touch',
      }}>
        <div style={{
          display: 'grid',
          gridAutoFlow: 'column',
          gridAutoColumns: 'minmax(280px, 320px)',
          gap: '1.25rem',
          paddingBottom: '0.5rem',
        }}>
          {lane.videos.map((video, i) => (
            <VideoCard
              key={video._id}
              video={video}
              index={i}
              isWatched={watched.has(video._id)}
              isPlaying={playingId === video._id}
              onPlay={() => onPlay(video._id)}
              onClose={onClose}
              accentColor={lane.color}
            />
          ))}
        </div>
      </div>
    </motion.section>
  )
}

// ════════════════════════════════════════════════════════════════
// CATEGORY FILTER — pill row, scrollable on small screens
// ════════════════════════════════════════════════════════════════
function CategoryFilter({
  categories,
  activeCategory,
  onSelect,
}: {
  categories: Category[]
  activeCategory: string
  onSelect: (id: string) => void
}) {
  return (
    <div style={{
      background: '#ffffff',
      border: '1px solid var(--color-border)',
      borderRadius: '0.875rem',
      padding: '0.625rem 0.75rem',
      overflowX: 'auto',
      WebkitOverflowScrolling: 'touch',
    }}>
      <div style={{ display: 'flex', gap: '0.375rem', width: 'max-content', minWidth: '100%' }}>
        {categories.map(cat => {
          const isActive = activeCategory === cat.id
          const Icon = cat.Icon
          return (
            <button
              key={cat.id}
              onClick={() => onSelect(cat.id)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5625rem 1rem',
                borderRadius: '99px',
                fontSize: '0.875rem',
                fontWeight: isActive ? 700 : 500,
                fontFamily: 'var(--font-display)',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                flexShrink: 0,
                transition: 'all 200ms cubic-bezier(0.22,1,0.36,1)',
                background: isActive ? '#181d26' : 'transparent',
                color: isActive ? '#ffffff' : 'rgba(24,29,38,0.65)',
                border: isActive ? '1.5px solid #181d26' : '1.5px solid transparent',
              }}
              onMouseEnter={e => {
                if (!isActive) (e.currentTarget as HTMLElement).style.background = 'rgba(24,29,38,0.04)'
              }}
              onMouseLeave={e => {
                if (!isActive) (e.currentTarget as HTMLElement).style.background = 'transparent'
              }}
            >
              <Icon className="w-3.5 h-3.5" strokeWidth={2.2} />
              {cat.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ════════════════════════════════════════════════════════════════
// CLOSE ICON — used in the player overlay
// ════════════════════════════════════════════════════════════════
function CloseIcon({ className = 'w-3.5 h-3.5' }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

// ════════════════════════════════════════════════════════════════
// VIDEO CARD
// ════════════════════════════════════════════════════════════════
function VideoCard({
  video,
  index,
  isWatched,
  isPlaying,
  onPlay,
  onClose,
  accentColor,
}: {
  video: UniversityVideo
  index: number
  isWatched: boolean
  isPlaying: boolean
  onPlay: () => void
  onClose: () => void
  /** Optional border-top accent — used inside path lanes */
  accentColor?: string
}) {
  const cat = categories.find(c => c.id === video.category)
  const categoryLabel = cat?.label ?? video.category

  return (
    <motion.div
      layout
      variants={fadeUp}
      initial="hidden"
      animate="show"
      exit={{ opacity: 0, scale: 0.95 }}
      custom={index * 0.06}
      style={{
        background: '#ffffff',
        borderRadius: 'var(--radius-card)',
        border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-card)',
        overflow: 'hidden',
        position: 'relative',
        transition: 'box-shadow 300ms cubic-bezier(0.22,1,0.36,1), transform 300ms cubic-bezier(0.22,1,0.36,1)',
        ...(accentColor ? { borderTop: `3px solid ${accentColor}` } : {}),
      }}
      onMouseEnter={e => {
        ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'
        ;(e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-card-hover)'
      }}
      onMouseLeave={e => {
        ;(e.currentTarget as HTMLElement).style.transform = ''
        ;(e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-card)'
      }}
    >
      <div style={{ position: 'relative', aspectRatio: '16/9', width: '100%', overflow: 'hidden', background: '#0f172a' }}>
        {isPlaying ? (
          <div style={{ position: 'relative', height: '100%', width: '100%' }}>
            <iframe
              src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
              title={video.title}
              style={{ position: 'absolute', inset: 0, height: '100%', width: '100%', border: 0 }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <button
              aria-label="Close video"
              onClick={(e) => { e.stopPropagation(); onClose() }}
              style={{
                position: 'absolute', right: '0.5rem', top: '0.5rem', zIndex: 10,
                width: '1.875rem', height: '1.875rem', borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'rgba(0,0,0,0.70)', color: '#fff',
                border: 0, cursor: 'pointer',
              }}
            >
              <CloseIcon className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <button
            onClick={onPlay}
            style={{
              position: 'relative', height: '100%', width: '100%',
              cursor: 'pointer', border: 0, padding: 0, background: 'transparent',
            }}
          >
            <YouTubeThumbnail
              videoId={video.youtubeId}
              title={video.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div style={{
              position: 'absolute', inset: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'rgba(0,0,0,0.32)',
              transition: 'background 200ms ease',
            }}>
              <div style={{
                width: '3.25rem', height: '3.25rem', borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: '#e12a2b',
                boxShadow: '0 4px 24px rgba(225,42,43,0.55)',
              }}>
                <svg viewBox="0 0 24 24" width="22" height="22" fill="#ffffff" aria-hidden>
                  <path d="M8 5.14v14l11-7-11-7z" />
                </svg>
              </div>
            </div>
            {video.duration && (
              <span style={{
                position: 'absolute', bottom: '0.5rem', right: '0.5rem',
                background: 'rgba(0,0,0,0.80)',
                padding: '0.125rem 0.5rem', borderRadius: '0.25rem',
                fontSize: '0.75rem', fontWeight: 500, color: '#ffffff',
              }}>
                {video.duration}
              </span>
            )}
            {isWatched && (
              <span style={{
                position: 'absolute', top: '0.5rem', left: '0.5rem',
                display: 'inline-flex', alignItems: 'center', gap: '0.25rem',
                background: 'rgba(5,150,105,0.95)',
                padding: '0.25rem 0.625rem', borderRadius: '99px',
                fontSize: '0.6875rem', fontWeight: 700, color: '#ffffff',
                letterSpacing: '0.04em',
              }}>
                <CheckCircleIcon className="w-3 h-3" strokeWidth={2.5} />
                WATCHED
              </span>
            )}
          </button>
        )}
      </div>

      <div style={{ padding: '1.25rem 1.375rem 1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.375rem',
            padding: '0.25rem 0.625rem', borderRadius: '99px',
            fontSize: 'var(--text-caption)', fontWeight: 700,
            background: cat?.colorBg ?? 'rgba(27,97,201,0.10)',
            color: cat?.color ?? '#1b61c9',
            letterSpacing: '0.04em',
          }}>
            {cat && <cat.Icon className="w-3 h-3" strokeWidth={2.2} />}
            {categoryLabel}
          </span>
        </div>
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.0625rem',
          fontWeight: 700,
          lineHeight: 1.35,
          color: '#181d26',
          marginBottom: '0.5rem',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}>
          {video.title}
        </h3>
        {video.description && (
          <p style={{
            fontSize: '0.875rem',
            lineHeight: 1.6,
            color: 'rgba(24,29,38,0.58)',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}>
            {video.description}
          </p>
        )}
      </div>
    </motion.div>
  )
}
