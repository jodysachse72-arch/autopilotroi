'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

/* ═══════════════════════════════════════════════════════════════
   CMS CONTENT HUB
   
   Central page for managing content via Sanity CMS.
   Shows setup status, tutorial videos, and quick-start guide.
   ═══════════════════════════════════════════════════════════════ */

const SANITY_PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'gnd0za31'
const isConfigured = SANITY_PROJECT_ID !== 'placeholder' && SANITY_PROJECT_ID.length > 3

const tutorialVideos = [
  {
    title: 'What is Sanity CMS?',
    desc: 'Official introduction to Sanity — what it is, why developers love it, and how it powers modern content.',
    videoId: 'Rx6IABKJH0I',
    duration: '10 min',
  },
  {
    title: 'Sanity Studio Walkthrough',
    desc: 'How to navigate the Studio, create content, manage schemas, and publish changes.',
    videoId: '2ceM_tSus_M',
    duration: '28 min',
  },
  {
    title: 'Content Operations Deep Dive',
    desc: 'Day-to-day content editing workflows — creating posts, managing media, scheduling, and collaboration.',
    videoId: 'bDVAQZVeebw',
    duration: '45 min',
  },
]

const quickStartSteps = [
  {
    step: 1,
    title: 'Open the CMS Studio',
    desc: 'Click "Launch Studio" below to open the Sanity editor in a new tab. You\'ll be prompted to log in with your Sanity account.',
    icon: '🚀',
  },
  {
    step: 2,
    title: 'Create or Edit Content',
    desc: 'Navigate through content types (Blog Posts, Pages, FAQs) in the left sidebar. Click any item to edit, or the "+" button to create new content.',
    icon: '✏️',
  },
  {
    step: 3,
    title: 'Publish Changes',
    desc: 'After editing, click "Publish" in the bottom toolbar. Changes appear live on the website within seconds — no deploy needed.',
    icon: '✅',
  },
  {
    step: 4,
    title: 'Manage Media',
    desc: 'Upload images and videos through the Media Library. All assets are optimized automatically by Sanity\'s image pipeline.',
    icon: '🖼️',
  },
]

export default function CMSHubPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-8">
      {/* Status Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`rounded-2xl border p-6 flex items-center justify-between ${
          isConfigured
            ? 'border-emerald-500/20 bg-emerald-500/5'
            : 'border-amber-500/20 bg-amber-500/5'
        }`}
      >
        <div className="flex items-center gap-4">
          <div className={`flex h-12 w-12 items-center justify-center rounded-xl text-2xl ${
            isConfigured ? 'bg-emerald-500/20' : 'bg-amber-500/20'
          }`}>
            {isConfigured ? '✅' : '⚠️'}
          </div>
          <div>
            <h3 className="font-[var(--font-sora)] text-lg font-bold text-[var(--text-primary)]">
              {isConfigured ? 'CMS Connected' : 'CMS Setup Required'}
            </h3>
            <p className="text-sm text-[var(--text-muted)]">
              {isConfigured
                ? `Project: ${SANITY_PROJECT_ID} • Dataset: production • Status: Active`
                : 'Sanity project ID not configured. Set NEXT_PUBLIC_SANITY_PROJECT_ID in your environment variables.'}
            </p>
          </div>
        </div>
        {isConfigured && (
          <Link
            href="/studio"
            target="_blank"
            className="rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-600/25 transition hover:bg-emerald-500 hover:shadow-emerald-600/40"
          >
            Launch Studio →
          </Link>
        )}
      </motion.div>

      {/* Quick Start Guide */}
      <div>
        <h2 className="mb-4 font-[var(--font-sora)] text-xl font-bold text-[var(--text-primary)]">
          📋 Quick Start Guide
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {quickStartSteps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-card)] p-5"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/20 text-sm font-bold text-blue-400">
                  {s.step}
                </div>
                <span className="text-xl">{s.icon}</span>
              </div>
              <h3 className="text-sm font-bold text-[var(--text-primary)] mb-1">{s.title}</h3>
              <p className="text-xs leading-relaxed text-[var(--text-muted)]">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Tutorial Videos */}
      <div>
        <h2 className="mb-4 font-[var(--font-sora)] text-xl font-bold text-[var(--text-primary)]">
          🎓 Learn Sanity CMS
        </h2>
        <p className="mb-6 text-sm text-[var(--text-muted)]">
          New to Sanity? These video tutorials will get you up to speed. Start with &quot;What is Sanity CMS?&quot; for a quick overview, then dive deeper.
        </p>
        <div className="grid gap-6 lg:grid-cols-3">
          {tutorialVideos.map((video, i) => (
            <motion.div
              key={video.videoId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="group overflow-hidden rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-card)] transition hover:border-blue-500/30"
            >
              {/* YouTube Thumbnail */}
              <a
                href={`https://www.youtube.com/watch?v=${video.videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="relative block aspect-video bg-slate-900 overflow-hidden"
              >
                <img
                  src={`https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`}
                  alt={video.title}
                  className="h-full w-full object-cover opacity-80 transition group-hover:opacity-100 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Play overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-600/90 shadow-lg transition group-hover:scale-110">
                    <svg viewBox="0 0 24 24" className="h-6 w-6 ml-0.5 fill-white">
                      <path d="M8 5.14v14l11-7-11-7z" />
                    </svg>
                  </div>
                </div>
                {/* Duration badge */}
                <span className="absolute bottom-2 right-2 rounded bg-black/70 px-2 py-0.5 text-[10px] font-semibold text-white">
                  {video.duration}
                </span>
              </a>
              {/* Info */}
              <div className="p-4">
                <h3 className="text-sm font-bold text-[var(--text-primary)] mb-1">{video.title}</h3>
                <p className="text-xs leading-relaxed text-[var(--text-muted)]">{video.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Additional Resources */}
      <div className="rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-card)] p-6">
        <h2 className="mb-4 font-[var(--font-sora)] text-lg font-bold text-[var(--text-primary)]">
          📚 Resources
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: 'Sanity Docs', href: 'https://www.sanity.io/docs', icon: '📖' },
            { label: 'GROQ Query Language', href: 'https://www.sanity.io/docs/groq', icon: '🔍' },
            { label: 'Sanity Community', href: 'https://slack.sanity.io/', icon: '💬' },
            { label: 'Manage Project', href: `https://www.sanity.io/manage/project/${SANITY_PROJECT_ID}`, icon: '⚙️' },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl border border-[var(--border-secondary)] bg-[var(--bg-card)] px-4 py-3 text-sm font-medium text-[var(--text-secondary)] transition hover:border-blue-500/30 hover:text-[var(--text-primary)]"
            >
              <span className="text-lg">{link.icon}</span>
              {link.label}
              <svg className="ml-auto h-3 w-3 text-[var(--text-muted)]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
