'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

/* ═══════════════════════════════════════════════════════════════
   PARTNER VIDEOS — Curated video library for partner training
   Stubbed with descriptions — videos to be added later
   ═══════════════════════════════════════════════════════════════ */

interface Video {
  id: string
  title: string
  description: string
  duration: string
  category: string
  thumbnail?: string
  videoUrl?: string // YouTube/Vimeo embed URL — null means "coming soon"
}

const VIDEO_CATEGORIES = [
  { key: 'getting-started', label: '🚀 Getting Started', desc: 'Essential onboarding for new partners' },
  { key: 'sales-training', label: '💼 Sales Training', desc: 'Proven strategies for prospect conversion' },
  { key: 'product-knowledge', label: '📚 Product Deep Dives', desc: 'Master the Aurum platform and tools' },
  { key: 'social-media', label: '📱 Social Media', desc: 'Grow your audience and generate leads online' },
]

const VIDEOS: Video[] = [
  // ── Getting Started ──
  {
    id: 'gs-1',
    title: 'Welcome to the Partner Program',
    description: 'An overview of what the AutopilotROI partner program offers, how commissions work, and what success looks like. This is your first stop after joining.',
    duration: '8 min',
    category: 'getting-started',
  },
  {
    id: 'gs-2',
    title: 'Dashboard Walkthrough',
    description: 'A complete tour of your partner dashboard — understanding your stats, leads table, pipeline funnel, and how to use each section effectively.',
    duration: '12 min',
    category: 'getting-started',
  },
  {
    id: 'gs-3',
    title: 'How Referral Links Work',
    description: 'Learn how to generate hot, cold, and page-specific referral links. Understand tracking, QR codes, and which link type to use for different situations.',
    duration: '6 min',
    category: 'getting-started',
  },
  {
    id: 'gs-4',
    title: 'Setting Up Your Profile',
    description: 'Walk through your profile settings — adding your contact info, social links, and notification preferences to maximize lead engagement.',
    duration: '5 min',
    category: 'getting-started',
  },

  // ── Sales Training ──
  {
    id: 'st-1',
    title: 'The Perfect Approach',
    description: 'How to introduce AutopilotROI to a prospect naturally. Scripts, conversation frameworks, and the psychology behind why people say yes. Warm vs. cold approaches.',
    duration: '15 min',
    category: 'sales-training',
  },
  {
    id: 'st-2',
    title: 'Objection Handling Masterclass',
    description: 'The top 10 objections you\'ll hear and exactly how to respond. Covers "Is this a scam?", "I don\'t have the money", "I need to think about it", and more.',
    duration: '18 min',
    category: 'sales-training',
  },
  {
    id: 'st-3',
    title: 'Follow-Up Framework',
    description: 'Most conversions happen on the 3rd-7th touch. Learn the follow-up cadence, what to say on each touchpoint, and when to use the drip email system vs. personal outreach.',
    duration: '10 min',
    category: 'sales-training',
  },
  {
    id: 'st-4',
    title: 'Building Trust with Content',
    description: 'How to position yourself as a trusted advisor rather than a salesperson. Using educational content, case studies, and social proof to build credibility.',
    duration: '12 min',
    category: 'sales-training',
  },

  // ── Product Deep Dives ──
  {
    id: 'pd-1',
    title: 'Aurum Platform Overview',
    description: 'A comprehensive walkthrough of the Aurum platform from a partner perspective. What prospects need to know, key features, and how to demo it confidently.',
    duration: '20 min',
    category: 'product-knowledge',
  },
  {
    id: 'pd-2',
    title: 'ROI Calculator Explained',
    description: 'Deep dive into the ROI calculator tool. How the numbers work, what assumptions are made, and how to walk a prospect through projections without overpromising.',
    duration: '10 min',
    category: 'product-knowledge',
  },
  {
    id: 'pd-3',
    title: 'Readiness Assessment Deep Dive',
    description: 'Understanding the readiness quiz scoring system, what each tier means, and how to tailor your approach based on a prospect\'s readiness score.',
    duration: '8 min',
    category: 'product-knowledge',
  },

  // ── Social Media ──
  {
    id: 'sm-1',
    title: 'Instagram Growth Strategy',
    description: 'Build your fintech authority on Instagram. Content pillars, posting schedule, hashtag strategy, and how to use Stories and Reels to drive referral traffic.',
    duration: '14 min',
    category: 'social-media',
  },
  {
    id: 'sm-2',
    title: 'Facebook Groups & Messenger',
    description: 'How to leverage Facebook groups for warm leads and use Messenger for relationship-based selling. Includes group posting templates and conversation starters.',
    duration: '12 min',
    category: 'social-media',
  },
  {
    id: 'sm-3',
    title: 'TikTok & Short-Form Video',
    description: 'Creating engaging short-form content that educates and converts. Hook formulas, trending formats, and compliance-safe ways to talk about financial products.',
    duration: '10 min',
    category: 'social-media',
  },
  {
    id: 'sm-4',
    title: 'YouTube Long-Form Strategy',
    description: 'Building a YouTube channel around financial education. SEO titling, thumbnail design, content planning, and embedding your referral links in descriptions.',
    duration: '16 min',
    category: 'social-media',
  },
]

export default function PartnerVideosPage() {
  const [activeCategory, setActiveCategory] = useState('getting-started')
  const [expandedVideo, setExpandedVideo] = useState<string | null>(null)

  const filteredVideos = VIDEOS.filter((v) => v.category === activeCategory)
  const activeCat = VIDEO_CATEGORIES.find((c) => c.key === activeCategory)!

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-[var(--font-sora)] text-3xl font-bold text-[var(--text-primary)]">
          Partner Videos
        </h1>
        <p className="mt-2 text-sm text-[var(--text-tertiary)]">
          Training videos to help you master the platform, close more prospects, and grow your team.
        </p>
      </motion.div>

      {/* Coming Soon Banner */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="rounded-2xl border border-amber-400/20 bg-amber-500/5 p-5"
      >
        <div className="flex items-start gap-3">
          <span className="text-2xl">🎬</span>
          <div>
            <h3 className="font-semibold text-amber-300 text-sm">Videos Coming Soon</h3>
            <p className="mt-1 text-xs text-amber-200/60">
              We&apos;re producing professional training content for each topic below. Browse the curriculum
              to see what&apos;s planned, and check back soon for new releases.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Category Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide"
      >
        {VIDEO_CATEGORIES.map((cat) => {
          const count = VIDEOS.filter((v) => v.category === cat.key).length
          return (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`flex items-center gap-2 whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                activeCategory === cat.key
                  ? 'bg-blue-600 text-white'
                  : 'border border-[var(--border-primary)] bg-[var(--bg-card)] text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)]'
              }`}
            >
              {cat.label}
              <span
                className={`rounded-full px-1.5 py-0.5 text-xs ${
                  activeCategory === cat.key ? 'bg-white/20' : 'bg-white/5'
                }`}
              >
                {count}
              </span>
            </button>
          )
        })}
      </motion.div>

      {/* Category Description */}
      <motion.p
        key={activeCategory}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-sm text-[var(--text-tertiary)]"
      >
        {activeCat.desc}
      </motion.p>

      {/* Video Grid */}
      <div className="grid gap-4 sm:grid-cols-2">
        {filteredVideos.map((video, i) => {
          const isExpanded = expandedVideo === video.id
          const isComingSoon = !video.videoUrl

          return (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className={`group rounded-2xl border overflow-hidden transition-all ${
                isExpanded
                  ? 'border-blue-400/30 bg-blue-500/5 sm:col-span-2'
                  : 'border-[var(--border-primary)] bg-[var(--bg-card)] hover:border-blue-400/20'
              }`}
            >
              {/* Video preview / placeholder */}
              <div
                className="relative cursor-pointer"
                onClick={() => setExpandedVideo(isExpanded ? null : video.id)}
              >
                {/* Thumbnail area */}
                <div className="relative h-40 bg-gradient-to-br from-[#0b1f57] to-[#06122f] flex items-center justify-center overflow-hidden">
                  {/* Decorative background pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-1/4 left-1/4 h-32 w-32 rounded-full bg-blue-500 blur-3xl" />
                    <div className="absolute bottom-1/4 right-1/4 h-24 w-24 rounded-full bg-purple-500 blur-3xl" />
                  </div>

                  {/* Play button or Coming Soon badge */}
                  {isComingSoon ? (
                    <div className="relative flex flex-col items-center gap-2">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/5 border border-white/10">
                        <span className="text-2xl">🎬</span>
                      </div>
                      <span className="rounded-full bg-amber-500/20 px-3 py-1 text-xs font-medium text-amber-300">
                        Coming Soon
                      </span>
                    </div>
                  ) : (
                    <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-blue-600/90 shadow-lg shadow-blue-600/30 transition group-hover:scale-110 group-hover:bg-blue-500">
                      <span className="ml-1 text-xl text-white">▶</span>
                    </div>
                  )}

                  {/* Duration badge */}
                  <span className="absolute bottom-3 right-3 rounded-lg bg-black/60 px-2.5 py-1 text-xs font-mono text-white/80 backdrop-blur-sm">
                    {video.duration}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="p-4">
                <h3 className="font-[var(--font-sora)] text-sm font-semibold text-[var(--text-primary)] line-clamp-1">
                  {video.title}
                </h3>
                <p className={`mt-1.5 text-xs text-[var(--text-tertiary)] ${isExpanded ? '' : 'line-clamp-2'}`}>
                  {video.description}
                </p>

                {/* Expanded content — video embed placeholder */}
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-4 space-y-3"
                  >
                    {video.videoUrl ? (
                      <div className="aspect-video rounded-xl overflow-hidden bg-black">
                        <iframe
                          src={video.videoUrl}
                          className="h-full w-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    ) : (
                      <div className="flex items-center gap-3 rounded-xl border border-dashed border-white/10 bg-white/[0.02] p-4">
                        <span className="text-xl">🎥</span>
                        <div>
                          <p className="text-sm font-medium text-[var(--text-secondary)]">
                            Video in production
                          </p>
                          <p className="text-xs text-[var(--text-muted)]">
                            This video is being recorded. You&apos;ll be notified when it&apos;s available.
                          </p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Request a topic */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-card)] p-6 text-center"
      >
        <span className="text-2xl">💡</span>
        <h3 className="mt-2 font-[var(--font-sora)] font-semibold text-[var(--text-primary)]">
          Have a topic suggestion?
        </h3>
        <p className="mt-1 text-sm text-[var(--text-tertiary)]">
          Let us know what training content would help you most. Drop your ideas in the partner Telegram group.
        </p>
      </motion.div>
    </div>
  )
}
