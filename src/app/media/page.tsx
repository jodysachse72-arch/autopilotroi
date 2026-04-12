'use client'

import { useState } from 'react'
import Link from 'next/link'
import VideoModal from '@/components/ui/VideoModal'
import YouTubeThumbnail from '@/components/ui/YouTubeThumbnail'
import { motion } from 'framer-motion'

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
      title: 'Aurum Explained — AI Finance Meets Real-World Assets',
      description: 'Complete overview of the full ecosystem: AI trading bots, crypto cards, exchange, neobank, and the opportunity.',
      youtubeId: 'MmAnR4YAPv4',
      duration: '15:22',
      badge: 'Must Watch',
    },
    {
      id: '2',
      category: 'presentations',
      title: 'Why Aurum — Due Diligence Briefing',
      description: 'Independent analysis and fact-based overview for anyone considering the platform.',
      youtubeId: 'kbGSa11bBHc',
      duration: '11:57',
      badge: 'Featured',
    },
    {
      id: '3',
      category: 'presentations',
      title: '5-Minute Aurum Overview',
      description: 'Quick intro — perfect for sharing with friends and family who want the highlights.',
      youtubeId: 'yTb2rAJhU7w',
      duration: '5:41',
      badge: null,
    },
    {
      id: '4',
      category: 'interviews',
      title: 'The 1000 Millionaires Mission — CEO Bryan Benson',
      description: "Bryan Benson's 'Tip of the Iceberg' talk on the company's vision and roadmap.",
      youtubeId: 'SXpfGOUfEKg',
      duration: '4:32',
      badge: null,
    },
    {
      id: '5',
      category: 'community',
      title: 'Are the EX AI Bot Profits Real?',
      description: 'Verification and proof of real trading results from actual members.',
      youtubeId: '4GNo8E1yj7g',
      duration: '17:03',
      badge: null,
    },
    {
      id: '6',
      category: 'updates',
      title: 'Product Updates — Bryan Benson',
      description: 'Latest platform updates, new features, and roadmap announcements from the CEO.',
      youtubeId: '7LNl58JwgSc',
      duration: '12:06',
      badge: 'New',
    },
    {
      id: '7',
      category: 'community',
      title: 'Dubai Launch Event — January 2026 Recap',
      description: 'Full event recap from the global launch in Dubai. Key announcements and partner highlights.',
      youtubeId: 'Fw6LoJ0afR4',
      duration: '47:08',
      badge: null,
    },
    {
      id: '8',
      category: 'interviews',
      title: 'Proof of Trading — Ricky, Brad & Dino',
      description: 'Live trading verification session showing real bot performance and results.',
      youtubeId: 'jGXH8BhyJbY',
      duration: '20:01',
      badge: null,
    },
    {
      id: '9',
      category: 'updates',
      title: 'Compensation Plan Explained',
      description: 'Full walkthrough of the partner compensation plan and earning structure.',
      youtubeId: 'f2CA_eDL0Eo',
      duration: '29:01',
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

export default function MediaPage() {
  const [activeCategory, setActiveCategory] = useState('all')

  const visible =
    activeCategory === 'all'
      ? mediaContent.items
      : mediaContent.items.filter((item) => item.category === activeCategory)

  return (
    <div className="min-h-screen bg-[#06122f]">
      {/* Header */}
      <div className="relative overflow-hidden border-b border-white/10 bg-[linear-gradient(180deg,#0b1f57_0%,#06122f_100%)] px-6 py-16 lg:px-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_80%,rgba(59,130,246,0.15),transparent_60%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)', backgroundSize: '50px 50px' }} />
        <div className="relative mx-auto max-w-4xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-300">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
              Media Library
            </div>
            <h1 className="font-[var(--font-sora)] text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {mediaContent.headline}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-blue-100/60">
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
                  : 'bg-white/[0.06] text-blue-100/70 border border-white/10 hover:bg-white/10 hover:text-white'
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
              className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06]"
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
                <h3 className="font-[var(--font-sora)] text-sm font-bold leading-snug text-white line-clamp-2 group-hover:text-blue-300 transition-colors">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-blue-100/50 line-clamp-2">{item.description}</p>
              </div>
            </motion.article>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 rounded-2xl border border-white/10 bg-white/[0.03] p-10 text-center backdrop-blur-sm">
          <h2 className="font-[var(--font-sora)] text-2xl font-bold text-white">
            Ready to Start Your Journey?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-blue-100/60">
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
