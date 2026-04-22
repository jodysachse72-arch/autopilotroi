'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { resourcesMeta, resourceSections, socialChannels, backOfficeLinks } from '@/content/resources'
import {
  SectionHeader,
  Card,
  FilterPill,
  StatCard,
  StatusBadge,
  Toolbar,
  type StatusTone,
} from '@/components/backend'

/* ═══════════════════════════════════════════════════════════════
   PARTNER · RESOURCES  (/dashboard/resources)
   Marketing materials, training, social, back-office links.
   ═══════════════════════════════════════════════════════════════ */

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.06, duration: 0.45, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
}

function badgeTone(badge: string): StatusTone {
  if (badge === 'New' || badge === 'New Feature') return 'green'
  if (badge === 'Must Read') return 'red'
  return 'blue'
}

const ChevronRight = () => (
  <svg className="ml-auto h-4 w-4 shrink-0 text-[rgba(4,14,32,0.20)] group-hover:text-[#1b61c9] transition-colors" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
)

export default function DashboardResourcesPage() {
  const [activeFilter, setActiveFilter] = useState('all')

  const filterTabs = useMemo(() => [
    { id: 'all', label: 'All resources' },
    ...resourceSections.map(s => ({ id: s.id, label: `${s.icon} ${s.label}` })),
    { id: 'social', label: '💬 Social & community' },
  ], [])

  const visibleSections = activeFilter === 'all'
    ? resourceSections
    : resourceSections.filter(s => s.id === activeFilter)

  return (
    <div className="mx-auto max-w-6xl space-y-6">

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-[#1b61c9]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#1b61c9] animate-pulse" />
              Partner resource center
            </div>
            <SectionHeader
              title={resourcesMeta.headline}
              subtitle={resourcesMeta.description}
            />
            <div className="mt-2 flex items-center gap-2 text-xs text-[rgba(4,14,32,0.40)]">
              <div className="h-6 w-6 rounded-full bg-[#1b61c9] flex items-center justify-center text-white font-bold text-[0.6rem]">AP</div>
              <span>Curated by {resourcesMeta.curatorName} · last updated {resourcesMeta.lastUpdated}</span>
            </div>
          </div>

          <div className="flex gap-3 shrink-0">
            {resourcesMeta.stats.map((stat) => (
              <StatCard
                key={stat.label}
                label={stat.label}
                value={<span className="text-[#1b61c9]">{stat.value}</span>}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Filter pills */}
      <Toolbar
        left={
          <>
            {filterTabs.map(tab => (
              <FilterPill
                key={tab.id}
                label={tab.label}
                active={activeFilter === tab.id}
                onClick={() => setActiveFilter(tab.id)}
              />
            ))}
          </>
        }
      />

      {/* Resource sections */}
      {visibleSections.map((section, si) => (
        <motion.div
          key={section.id}
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          custom={si}
        >
          <Card padding="flush" className="overflow-hidden">
            <div className="flex items-start justify-between gap-4 border-b border-[#e0e2e6] px-6 py-5">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl">{section.icon}</span>
                  <h2 className="font-[var(--font-sora)] font-bold text-[#181d26] text-lg">{section.title}</h2>
                  <StatusBadge tone="blue">{section.count} resources</StatusBadge>
                </div>
                <p className="text-sm text-[rgba(4,14,32,0.55)]">{section.description}</p>
              </div>
              {section.updatedDate && (
                <span className="shrink-0 text-xs text-[rgba(4,14,32,0.35)]">Updated {section.updatedDate}</span>
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
                        <StatusBadge tone={badgeTone(resource.badge)}>
                          {resource.badge}
                        </StatusBadge>
                      )}
                    </div>
                    <div className="text-xs text-[rgba(4,14,32,0.50)] mt-0.5">
                      {resource.type}{resource.duration && ` · ${resource.duration}`} · {resource.source}
                    </div>
                    {resource.note && (
                      <div className="text-xs text-amber-700 mt-1">🔑 {resource.note}</div>
                    )}
                  </div>
                  <ChevronRight />
                </Link>
              ))}
            </div>
          </Card>
        </motion.div>
      ))}

      {/* Social & Community */}
      {(activeFilter === 'all' || activeFilter === 'social') && (
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={0}>
          <Card padding="flush" className="overflow-hidden">
            <div className="border-b border-[#e0e2e6] px-6 py-5">
              <h2 className="font-[var(--font-sora)] font-bold text-[#181d26] text-lg">💬 Social & community</h2>
              <p className="text-sm text-[rgba(4,14,32,0.55)]">Official channels. Stay connected, get updates, and attend community calls.</p>
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
                    <div className="text-xs text-[rgba(4,14,32,0.50)]">{channel.handle}</div>
                  </div>
                  <ChevronRight />
                </Link>
              ))}
            </div>
          </Card>
        </motion.div>
      )}

      {/* Back Office */}
      {(activeFilter === 'all' || activeFilter === 'social') && (
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={1}>
          <Card padding="flush" className="overflow-hidden">
            <div className="border-b border-[#e0e2e6] px-6 py-5">
              <h2 className="font-[var(--font-sora)] font-bold text-[#181d26] text-lg">🔐 Back office & support</h2>
              <p className="text-sm text-[rgba(4,14,32,0.55)]">Your dashboard — deposits, withdrawals, bot management, and portfolio overview.</p>
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
                  <span className="text-sm font-medium text-[rgba(4,14,32,0.70)] group-hover:text-[#181d26] transition-colors">{link.title}</span>
                  <ChevronRight />
                </Link>
              ))}
            </div>
          </Card>
        </motion.div>
      )}

    </div>
  )
}
