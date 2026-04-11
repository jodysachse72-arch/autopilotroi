'use client'

import { useState } from 'react'
import Link from 'next/link'
import VideoModal from '@/components/ui/VideoModal'

const mediaContent = {
  headline: 'Media & Social Proof',
  description:
    'Interviews, presentations, community videos, and external coverage of the Aurum ecosystem. See what real members say.',
  categories: [
    { id: 'all', label: 'All Media' },
    { id: 'interviews', label: '🎙️ Interviews' },
    { id: 'presentations', label: '📊 Presentations' },
    { id: 'community', label: '🤝 Community' },
    { id: 'external', label: '📰 External' },
  ],
  items: [
    {
      id: '1',
      category: 'presentations',
      title: 'Aurum Foundation — Full Product Overview',
      description:
        'A comprehensive walkthrough of the entire Aurum ecosystem: AI trading bot, crypto card, exchange, and neobank explained.',
      thumbnailBg: 'from-blue-700 to-blue-900',
      emoji: '📊',
      duration: '45 min',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      badge: 'Must Watch',
    },
    {
      id: '2',
      category: 'interviews',
      title: 'Member Interview — Maria T., New Zealand',
      description:
        '"AutoPilot ROI walked me through everything step by step. I actually understood what I was getting into before I invested a cent."',
      thumbnailBg: 'from-cyan-600 to-blue-800',
      emoji: '🎙️',
      duration: '12 min',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      badge: null,
    },
    {
      id: '3',
      category: 'interviews',
      title: 'Partner Spotlight — James O., United Kingdom',
      description:
        '"I\'ve had 3 people placed in my downline from spillover I didn\'t personally generate. The team is genuinely building around me."',
      thumbnailBg: 'from-indigo-600 to-slate-900',
      emoji: '🎙️',
      duration: '18 min',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      badge: null,
    },
    {
      id: '4',
      category: 'presentations',
      title: 'Aurum EX-AI Bot — How It Works Deep Dive',
      description:
        'Technical walkthrough of the AI trading algorithm, exchange integrations, return distribution, and risk management.',
      thumbnailBg: 'from-sky-600 to-blue-900',
      emoji: '🤖',
      duration: '32 min',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      badge: 'Featured',
    },
    {
      id: '5',
      category: 'community',
      title: 'AutoPilot ROI Team Call — April 2026',
      description:
        'Monthly community call. Updates on platform performance, new member Q&A, and onboarding tips from senior partners.',
      thumbnailBg: 'from-violet-600 to-blue-900',
      emoji: '🤝',
      duration: '1 hr 10 min',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      badge: 'New',
    },
    {
      id: '6',
      category: 'external',
      title: "Aurum Foundation — 'The Future of AI Finance'",
      description:
        'Third-party coverage of the Aurum Foundation ecosystem and its position in the AI-managed decentralised finance sector.',
      thumbnailBg: 'from-slate-600 to-slate-900',
      emoji: '📰',
      duration: '8 min',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      badge: null,
    },
  ],
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
        <div className="relative mx-auto max-w-4xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/15 px-4 py-2 text-sm font-medium text-blue-200">
            🎬 Media & Social Proof
          </div>
          <h1 className="font-[var(--font-sora)] text-5xl font-semibold tracking-[-0.055em] text-white sm:text-6xl">
            {mediaContent.headline}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-blue-100/80">
            {mediaContent.description}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
        {/* Category filters */}
        <div className="mb-8 flex flex-wrap gap-2">
          {mediaContent.categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                activeCategory === cat.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white/10 text-blue-100/80 hover:bg-white/15 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Video grid */}
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {visible.map((item) => (
            <article
              key={item.id}
              className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/6 backdrop-blur-sm transition hover:-translate-y-1 hover:border-white/20"
            >
              {/* Thumbnail */}
              <VideoModal videoUrl={item.videoUrl}>
                <div
                  className={`relative h-48 cursor-pointer bg-gradient-to-br ${item.thumbnailBg} flex items-center justify-center`}
                >
                  <div className="text-6xl opacity-30">{item.emoji}</div>
                  {/* Play button */}
                  <div className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[1.2rem] bg-red-500 text-white shadow-[0_8px_25px_rgba(239,68,68,0.45)] transition hover:scale-110">
                    <span className="ml-1 text-2xl">▶</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`absolute right-3 top-3 rounded-full px-2.5 py-1 text-xs font-semibold ${
                        item.badge === 'New'
                          ? 'bg-green-500/90 text-white'
                          : item.badge === 'Must Watch'
                            ? 'bg-red-500/90 text-white'
                            : 'bg-blue-500/90 text-white'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                  <span className="absolute bottom-3 right-3 rounded-lg bg-slate-900/80 px-2 py-1 text-xs text-white/80">
                    {item.duration}
                  </span>
                </div>
              </VideoModal>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-[var(--font-sora)] text-lg font-semibold leading-snug text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-blue-100/70">{item.description}</p>
              </div>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-14 rounded-[2rem] border border-white/15 bg-white/6 p-10 text-center backdrop-blur-sm">
          <div className="text-4xl">🚀</div>
          <h2 className="mt-4 font-[var(--font-sora)] text-3xl font-semibold text-white">
            Ready to Start Your Journey?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-base leading-7 text-blue-100/80">
            The best way to understand Aurum is to work through the guided onboarding with your
            AutoPilot ROI partner.
          </p>
          <Link
            href="/start"
            className="mt-6 inline-flex items-center rounded-xl border border-blue-300/40 bg-[linear-gradient(180deg,#3b82f6_0%,#2563eb_100%)] px-7 py-3 text-base font-medium text-white shadow-[0_14px_30px_rgba(37,99,235,0.35)] transition hover:brightness-110"
          >
            Begin Onboarding →
          </Link>
        </div>
      </div>
    </div>
  )
}
