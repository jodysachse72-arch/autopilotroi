'use client'

import Link from 'next/link'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { resourcesMeta, resourceSections, socialChannels, backOfficeLinks } from '@/content/resources'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.45, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
}

export default function ResourcesPage() {
  const [activeFilter, setActiveFilter] = useState('all')

  const filterTabs = [
    { id: 'all', label: 'All Resources' },
    ...resourceSections.map((s) => ({ id: s.id, label: `${s.icon} ${s.label}` })),
    { id: 'social', label: 'Social & Community' },
  ]

  const visibleSections = activeFilter === 'all'
    ? resourceSections
    : resourceSections.filter((s) => s.id === activeFilter)

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">

      {/* Hero */}
      <div className="relative overflow-hidden border-b border-[var(--border-primary)] bg-[var(--bg-section)] px-6 py-16 lg:px-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.15),transparent_60%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)', backgroundSize: '50px 50px' }} />

        <div className="relative mx-auto max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
                  Resource Center
                </div>
                <h1 className="font-[var(--font-sora)] text-4xl font-bold text-[var(--text-primary)] lg:text-5xl">
                  {resourcesMeta.headline}
                </h1>
                <p className="mt-3 max-w-xl text-[var(--text-tertiary)] leading-relaxed">{resourcesMeta.description}</p>
                <div className="mt-4 flex items-center gap-2 text-xs text-blue-200/40">
                  <div className="h-6 w-6 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-[0.6rem]">AP</div>
                  <span>Curated by {resourcesMeta.curatorName} · Last updated {resourcesMeta.lastUpdated}</span>
                </div>
              </div>
              <div className="flex gap-8">
                {resourcesMeta.stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="font-[var(--font-sora)] text-3xl font-bold text-[var(--text-primary)]">{stat.value}</div>
                    <div className="text-xs text-[var(--text-muted)]">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Filter tabs */}
          <div className="mt-10 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all shrink-0 ${
                  activeFilter === tab.id
                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                    : 'bg-[var(--bg-card)] text-[var(--text-secondary)] border border-[var(--border-primary)] hover:border-[var(--border-accent)] hover:text-[var(--text-primary)]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 py-12 lg:px-10 space-y-8">

        {/* Resource sections */}
        {visibleSections.map((section, si) => (
          <motion.div
            key={section.id}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={si}
            className="overflow-hidden rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-card)] shadow-[var(--card-shadow,none)]"
          >
            <div className="flex items-start justify-between gap-4 border-b border-[var(--border-primary)] px-6 py-5">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl">{section.icon}</span>
                  <h2 className="font-[var(--font-sora)] font-bold text-[var(--text-primary)] text-lg">{section.title}</h2>
                  <span className="rounded-full bg-blue-500/15 border border-blue-400/20 px-2.5 py-0.5 text-xs font-semibold text-blue-300">{section.count} resources</span>
                </div>
                <p className="text-sm text-[var(--text-muted)]">{section.description}</p>
              </div>
              {section.updatedDate && (
                <span className="shrink-0 text-xs text-blue-200/40">Updated {section.updatedDate}</span>
              )}
            </div>

            <div className="divide-y divide-[var(--border-primary)]">
              {section.resources.map((resource) => (
                <Link
                  key={resource.title}
                  href={resource.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 px-6 py-4 transition-colors hover:bg-white/[0.04] group"
                >
                  <span className="text-xl shrink-0">{resource.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-[var(--text-primary)] text-sm group-hover:text-[var(--accent-primary)] transition-colors">{resource.title}</span>
                      {resource.badge && (
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                          resource.badge === 'New' || resource.badge === 'New Feature'
                            ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-400/20'
                            : resource.badge === 'Must Read'
                            ? 'bg-red-500/15 text-red-400 border border-red-400/20'
                            : 'bg-blue-500/15 text-blue-300 border border-blue-400/20'
                        }`}>
                          {resource.badge}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-[var(--text-muted)] mt-0.5">
                      {resource.type}{resource.duration && ` · ${resource.duration}`} · {resource.source}
                    </div>
                    {resource.note && (
                      <div className="text-xs text-amber-400/80 mt-1">🔑 {resource.note}</div>
                    )}
                  </div>
                  <svg className="h-4 w-4 shrink-0 text-white/20 group-hover:text-blue-400 transition-colors" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
                  </svg>
                </Link>
              ))}
            </div>
          </motion.div>
        ))}

        {/* Social & Community */}
        {(activeFilter === 'all' || activeFilter === 'social') && (
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={0}
            className="overflow-hidden rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-card)] shadow-[var(--card-shadow,none)]">
            <div className="border-b border-[var(--border-primary)] px-6 py-5">
              <h2 className="font-[var(--font-sora)] font-bold text-[var(--text-primary)] text-lg">Social & Community</h2>
              <p className="text-sm text-[var(--text-muted)]">Official channels. Stay connected, get updates, and attend community calls.</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 p-6">
              {socialChannels.map((channel) => (
                <Link
                  key={channel.platform}
                  href={channel.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-xl border border-[var(--border-primary)] bg-[var(--bg-card)] p-4 transition-all hover:border-[var(--border-accent)] group"
                >
                  <span className="text-xl">{channel.icon}</span>
                  <div>
                    <div className="font-semibold text-[var(--text-primary)] text-sm group-hover:text-[var(--accent-primary)] transition-colors">{channel.platform}</div>
                    <div className="text-xs text-[var(--text-muted)]">{channel.handle}</div>
                  </div>
                  <svg className="ml-auto h-4 w-4 text-white/20 group-hover:text-blue-400 transition-colors" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
                  </svg>
                </Link>
              ))}
            </div>
          </motion.div>
        )}

        {/* Back Office */}
        {(activeFilter === 'all' || activeFilter === 'social') && (
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={1}
            className="overflow-hidden rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-card)] shadow-[var(--card-shadow,none)]">
            <div className="border-b border-[var(--border-primary)] px-6 py-5">
              <h2 className="font-[var(--font-sora)] font-bold text-[var(--text-primary)] text-lg">🔐 Back Office & Support</h2>
              <p className="text-sm text-[var(--text-muted)]">Your dashboard is where everything happens — deposits, withdrawals, bot management, and portfolio overview.</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-3 p-6">
              {backOfficeLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-xl border border-[var(--border-primary)] bg-[var(--bg-card)] p-4 transition-all hover:border-[var(--border-accent)] group"
                >
                  <span className="text-lg">{link.icon}</span>
                  <span className="text-sm font-medium text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">{link.title}</span>
                  <svg className="ml-auto h-4 w-4 text-white/20 group-hover:text-blue-400 transition-colors" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
                  </svg>
                </Link>
              ))}
            </div>
          </motion.div>
        )}

      </div>
    </div>
  )
}
