'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import YouTubeThumbnail from '@/components/ui/YouTubeThumbnail'

// ─── Fallback video data (used until Sanity is connected) ───────────────────
const fallbackVideos = [
  { _id: '1', title: 'Product Overview Presentation — Full Aurum Walkthrough', youtubeId: 'MmAnR4YAPv4', description: 'Complete introduction to the Aurum ecosystem, products, and opportunity.', category: 'beginner', duration: '40:11', order: 1, featured: true },
  { _id: '2', title: 'Why Aurum — Due Diligence Briefing', youtubeId: 'kbGSa11bBHc', description: 'Independent analysis and fact-based overview for prospective members.', category: 'due-diligence', duration: '11:57', order: 2, featured: true },
  { _id: '3', title: '5-Minute Aurum Overview', youtubeId: 'yTb2rAJhU7w', description: 'Quick intro for sharing with friends and family.', category: 'beginner', duration: '5:41', order: 3, featured: false },
  { _id: '4', title: 'The 1000 Millionaires Mission — CEO Bryan Benson', youtubeId: 'SXpfGOUfEKg', description: "Bryan Benson's 'Tip of the Iceberg' talk on Aurum's vision.", category: 'beginner', duration: '4:32', order: 4, featured: false },
  { _id: '5', title: 'Are the EX AI Bot Profits Real?', youtubeId: '4GNo8E1yj7g', description: 'Verification and proof of trading results.', category: 'due-diligence', duration: '17:03', order: 5, featured: false },
  { _id: '6', title: 'Which Aurum AI Bot is Right For You?', youtubeId: 'K8qYdD1sC7w', description: 'EX AI Bot vs EX AI Pro vs Zeus Bot — detailed comparison guide.', category: 'product', duration: '15:00', order: 6, featured: false },
  { _id: '7', title: 'How the Withdrawal Fee Works', youtubeId: 'V3XEvrIFHSA', description: 'Important: Understand the -35% withdrawal mechanics before investing.', category: 'product', duration: '8:30', order: 7, featured: true },
  { _id: '8', title: 'Aurum Product Updates — Bryan Benson', youtubeId: '7LNl58JwgSc', description: 'Latest platform updates and roadmap from the CEO.', category: 'product', duration: '12:06', order: 8, featured: false },
  { _id: '9', title: 'Aurum Compensation Plan Explained', youtubeId: 'f2CA_eDL0Eo', description: 'Full walkthrough of the partner compensation plan.', category: 'partner', duration: '29:01', order: 9, featured: false },
  { _id: '10', title: 'Fast Start Training', youtubeId: 'Q6z2rGQfFDk', description: 'New partner onboarding training — everything to get started as a partner.', category: 'partner', duration: '56:28', order: 10, featured: false },
  { _id: '11', title: 'Back Office Tutorial — Full Walkthrough', youtubeId: 'LVWYzlaNmOo', description: 'Navigate your Aurum dashboard with confidence.', category: 'onboarding', duration: '14:19', order: 11, featured: false },
  { _id: '12', title: 'How to Start the EX AI Pro and Zeus Bots', youtubeId: 'JvG6tClql60', description: 'Step-by-step bot activation guide.', category: 'onboarding', duration: '10:00', order: 12, featured: false },
  { _id: '13', title: 'Dubai Launch Debriefing — January 2026', youtubeId: 'Fw6LoJ0afR4', description: 'Full event recap from the Dubai global launch.', category: 'due-diligence', duration: '47:08', order: 13, featured: false },
  { _id: '14', title: 'Proof of Trading with Ricky, Brad & Dino', youtubeId: 'jGXH8BhyJbY', description: 'Live trading verification session.', category: 'due-diligence', duration: '20:01', order: 14, featured: false },
  { _id: '15', title: 'Compounding with the Aurum NeoBank Telegram App', youtubeId: '0cBqs1HWWFI', description: 'How to use the NeoBank for automated compounding.', category: 'advanced', duration: '5:13', order: 15, featured: false },
  { _id: '16', title: 'To Compound? Or Not to Compound?', youtubeId: '8nMTD_NRZXE', description: 'Strategy discussion for active members on compounding vs withdrawing.', category: 'advanced', duration: '27:45', order: 16, featured: false },
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
  const videos = cmsVideos && cmsVideos.length > 0 ? cmsVideos : fallbackVideos
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
    <div className="min-h-screen bg-[#06122f]">
      {/* ═══ Hero ═══ */}
      <div className="relative overflow-hidden border-b border-white/10 bg-[linear-gradient(180deg,#0b1f57_0%,#06122f_100%)] px-6 py-16 lg:px-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,rgba(59,130,246,0.15),transparent_60%)]" />
        <div className="relative mx-auto max-w-6xl text-center">
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/15 px-4 py-2 text-sm font-medium text-blue-200">
            🎓 Aurum University
          </motion.div>
          <motion.h1 variants={fadeUp} initial="hidden" animate="show" custom={1}
            className="font-[var(--font-sora)] text-5xl font-semibold tracking-[-0.055em] text-white sm:text-6xl">
            Aurum University
          </motion.h1>
          <motion.p variants={fadeUp} initial="hidden" animate="show" custom={2}
            className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-blue-100/80">
            Structured video learning for new and existing Aurum members — from wallet setup to
            advanced bot strategy. Watch, learn, and track your progress.
          </motion.p>

          {/* Progress bar */}
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={3} className="mx-auto mt-8 max-w-md">
            <div className="flex items-center justify-between text-sm text-blue-200/70 mb-2">
              <span>{watched.size} of {videos.length} watched</span>
              <span className="font-semibold text-blue-300">{progress}%</span>
            </div>
            <div className="h-2 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-300 transition-all duration-700"
                style={{ width: `${progress}%` }}
              />
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={4}
            className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm">
            {[
              { value: `${videos.length}`, label: 'Videos' },
              { value: `${categories.length - 1}`, label: 'Categories' },
              { value: 'Free', label: 'Always' },
            ].map((s) => (
              <div key={s.label} className="flex flex-col items-center">
                <span className="text-2xl font-bold text-white">{s.value}</span>
                <span className="text-blue-200/60">{s.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-12 lg:px-10">
        {/* ═══ Featured Videos ═══ */}
        {featured.length > 0 && (
          <div className="mb-12">
            <h2 className="mb-6 flex items-center gap-2 font-[var(--font-sora)] text-2xl font-semibold text-white">
              <span className="text-amber-400">⭐</span> Recommended Starting Points
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

        {/* ═══ Category Filters ═══ */}
        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                activeCategory === cat.id
                  ? 'bg-blue-600 text-white shadow-[0_4px_12px_rgba(59,130,246,0.4)]'
                  : 'bg-white/10 text-blue-100/80 hover:bg-white/15 hover:text-white'
              }`}
            >
              {cat.icon} {cat.label}
            </button>
          ))}
        </div>

        {/* ═══ Video Grid ═══ */}
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
          <div className="rounded-2xl border border-white/10 bg-white/6 p-12 text-center text-blue-100/60">
            No videos in this category yet. Check back soon!
          </div>
        )}

        {/* ═══ Bottom CTA ═══ */}
        <div className="mt-16 rounded-[2rem] border border-white/15 bg-white/6 p-8 text-center backdrop-blur-sm">
          <div className="text-4xl">🎯</div>
          <h2 className="mt-4 font-[var(--font-sora)] text-2xl font-semibold text-white">
            Ready to get started?
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-base leading-7 text-blue-100/80">
            Once you&apos;ve completed the key education videos, start your onboarding
            with confidence. Your partner will guide you through every step.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/signup"
              className="rounded-xl border border-blue-300/40 bg-[linear-gradient(180deg,#3b82f6_0%,#2563eb_100%)] px-7 py-3 text-base font-medium text-white shadow-[0_14px_30px_rgba(37,99,235,0.35)] transition hover:brightness-110"
            >
              Begin Onboarding →
            </Link>
            <Link
              href="/resources"
              className="rounded-xl border border-white/20 bg-white/10 px-7 py-3 text-base font-medium text-white backdrop-blur-md transition hover:bg-white/15"
            >
              Browse Resources
            </Link>
          </div>
        </div>
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
      className={`group relative overflow-hidden rounded-2xl border backdrop-blur-sm transition-all ${
        isFeatured
          ? 'border-amber-400/30 bg-amber-500/5 hover:border-amber-400/50'
          : 'border-white/10 bg-white/6 hover:border-white/20'
      }`}
    >
      {/* Thumbnail / Player */}
      <div className="relative aspect-video w-full overflow-hidden bg-[#0a1a3f]">
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
            {/* YouTube thumbnail */}
            <YouTubeThumbnail
              videoId={video.youtubeId}
              title={video.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Play overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors group-hover:bg-black/20">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e12a2b] shadow-[0_8px_24px_rgba(225,42,43,0.5)] transition-all group-hover:scale-110">
                <svg viewBox="0 0 24 24" className="h-6 w-6 ml-0.5 fill-white">
                  <path d="M8 5.14v14l11-7-11-7z" />
                </svg>
              </div>
            </div>
            {/* Duration badge */}
            {video.duration && (
              <span className="absolute bottom-2 right-2 rounded bg-black/80 px-2 py-0.5 text-xs font-medium text-white">
                {video.duration}
              </span>
            )}
            {/* Watched badge */}
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
          <span className={`rounded-full px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide ${
            isFeatured
              ? 'bg-amber-500/20 text-amber-300'
              : 'bg-blue-500/20 text-blue-300'
          }`}>
            {categoryLabel}
          </span>
          {isFeatured && (
            <span className="rounded-full bg-amber-500/20 px-2.5 py-0.5 text-[0.65rem] font-semibold text-amber-300">
              ⭐ Recommended
            </span>
          )}
        </div>
        <h3 className="text-sm font-semibold leading-snug text-white line-clamp-2">
          {video.title}
        </h3>
        {video.description && (
          <p className="mt-1.5 text-xs leading-relaxed text-blue-100/60 line-clamp-2">
            {video.description}
          </p>
        )}
      </div>
    </motion.div>
  )
}
