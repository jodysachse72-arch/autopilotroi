'use client'

import Link from 'next/link'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { resourcesMeta, resourceSections, socialChannels, backOfficeLinks } from '@/content/resources'

/* ═══════════════════════════════════════════════════════════════
   PARTNER RESOURCE CENTER  (/dashboard/resources)
   Partner-facing resource hub — marketing materials, training,
   social channels, and back-office links.
   ═══════════════════════════════════════════════════════════════ */

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.45, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
}

export default function DashboardResourcesPage() {
  const [activeFilter, setActiveFilter] = useState('all')

  const filterTabs = [
    { id: 'all', label: 'All Resources' },
    ...resourceSections.map((s) => ({ id: s.id, label: `${s.icon} ${s.label}` })),
    { id: 'social', label: '💬 Social & Community' },
  ]

  const visibleSections = activeFilter === 'all'
    ? resourceSections
    : resourceSections.filter((s) => s.id === activeFilter)

  return (
    <div className="mx-auto max-w-6xl space-y-6">

      {/* Page Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-[#1b61c9]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#1b61c9] animate-pulse" />
              Partner Resource Center
            </div>
            <h1 className="font-[var(--font-sora)] text-3xl font-bold text-[#181d26] tracking-tight">
              {resourcesMeta.headline}
            </h1>
            <p className="mt-2 max-w-xl text-[rgba(4,14,32,0.55)] leading-relaxed">
              {resourcesMeta.description}
            </p>
            <div className="mt-3 flex items-center gap-2 text-xs text-[rgba(4,14,32,0.35)]">
              <div className="h-6 w-6 rounded-full bg-[#1b61c9] flex items-center justify-center text-white font-bold text-[0.6rem]">AP</div>
              <span>Curated by {resourcesMeta.curatorName} · Last updated {resourcesMeta.lastUpdated}</span>
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-8 shrink-0">
            {resourcesMeta.stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-[var(--font-sora)] text-3xl font-bold text-[#1b61c9]">{stat.value}</div>
                <div className="text-xs text-[rgba(4,14,32,0.45)]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Filter tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {filterTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveFilter(tab.id)}
            className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all shrink-0 ${
              activeFilter === tab.id
                ? 'bg-[#1b61c9] text-white shadow-md shadow-blue-500/20'
                : 'bg-white border border-[#e0e2e6] text-[rgba(4,14,32,0.55)] hover:border-[#1b61c9]/30 hover:text-[#181d26]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Resource sections */}
      {visibleSections.map((section, si) => (
        <motion.div
          key={section.id}
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          custom={si}
          className="overflow-hidden rounded-2xl border border-[#e0e2e6] bg-white shadow-sm"
        >
          <div className="flex items-start justify-between gap-4 border-b border-[#e0e2e6] px-6 py-5">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl">{section.icon}</span>
                <h2 className="font-[var(--font-sora)] font-bold text-[#181d26] text-lg">{section.title}</h2>
                <span className="rounded-full bg-blue-50 border border-blue-200 px-2.5 py-0.5 text-xs font-semibold text-[#1b61c9]">
                  {section.count} resources
                </span>
              </div>
              <p className="text-sm text-[rgba(4,14,32,0.50)]">{section.description}</p>
            </div>
            {section.updatedDate && (
              <span className="shrink-0 text-xs text-[rgba(4,14,32,0.30)]">Updated {section.updatedDate}</span>
            )}
          </div>

          <div className="divide-y divide-[#f0f2f7]">
            {section.resources.map((resource) => (
              <Link
                key={resource.title}
                href={resource.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 px-6 py-4 transition-colors hover:bg-[#f8fafc] group"
              >
                <span className="text-xl shrink-0">{resource.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-[#181d26] text-sm group-hover:text-[#1b61c9] transition-colors">
                      {resource.title}
                    </span>
                    {resource.badge && (
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                        resource.badge === 'New' || resource.badge === 'New Feature'
                          ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                          : resource.badge === 'Must Read'
                          ? 'bg-red-100 text-red-700 border border-red-200'
                          : 'bg-blue-100 text-[#1b61c9] border border-blue-200'
                      }`}>
                        {resource.badge}
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-[rgba(4,14,32,0.45)] mt-0.5">
                    {resource.type}{resource.duration && ` · ${resource.duration}`} · {resource.source}
                  </div>
                  {resource.note && (
                    <div className="text-xs text-amber-600 mt-1">🔑 {resource.note}</div>
                  )}
                </div>
                <svg className="h-4 w-4 shrink-0 text-[rgba(4,14,32,0.20)] group-hover:text-[#1b61c9] transition-colors" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
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
          className="overflow-hidden rounded-2xl border border-[#e0e2e6] bg-white shadow-sm">
          <div className="border-b border-[#e0e2e6] px-6 py-5">
            <h2 className="font-[var(--font-sora)] font-bold text-[#181d26] text-lg">💬 Social & Community</h2>
            <p className="text-sm text-[rgba(4,14,32,0.50)]">Official channels. Stay connected, get updates, and attend community calls.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 p-6">
            {socialChannels.map((channel) => (
              <Link
                key={channel.platform}
                href={channel.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-xl border border-[#e0e2e6] bg-[#f8fafc] p-4 transition-all hover:border-[#1b61c9]/30 hover:bg-white group"
              >
                <span className="text-xl">{channel.icon}</span>
                <div>
                  <div className="font-semibold text-[#181d26] text-sm group-hover:text-[#1b61c9] transition-colors">{channel.platform}</div>
                  <div className="text-xs text-[rgba(4,14,32,0.45)]">{channel.handle}</div>
                </div>
                <svg className="ml-auto h-4 w-4 text-[rgba(4,14,32,0.20)] group-hover:text-[#1b61c9] transition-colors" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
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
          className="overflow-hidden rounded-2xl border border-[#e0e2e6] bg-white shadow-sm">
          <div className="border-b border-[#e0e2e6] px-6 py-5">
            <h2 className="font-[var(--font-sora)] font-bold text-[#181d26] text-lg">🔐 Back Office & Support</h2>
            <p className="text-sm text-[rgba(4,14,32,0.50)]">Your dashboard — deposits, withdrawals, bot management, and portfolio overview.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-3 p-6">
            {backOfficeLinks.map((link) => (
              <Link
                key={link.title}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-xl border border-[#e0e2e6] bg-[#f8fafc] p-4 transition-all hover:border-[#1b61c9]/30 hover:bg-white group"
              >
                <span className="text-lg">{link.icon}</span>
                <span className="text-sm font-medium text-[rgba(4,14,32,0.65)] group-hover:text-[#181d26] transition-colors">{link.title}</span>
                <svg className="ml-auto h-4 w-4 text-[rgba(4,14,32,0.20)] group-hover:text-[#1b61c9] transition-colors" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
                </svg>
              </Link>
            ))}
          </div>
        </motion.div>
      )}

    </div>
  )
}
