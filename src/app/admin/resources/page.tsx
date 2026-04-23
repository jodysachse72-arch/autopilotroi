'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { resourcesMeta, resourceSections, socialChannels, backOfficeLinks } from '@/content/resources'
import {
  SectionHeader,
  Card,
  Toolbar,
  FilterPill,
  StatusBadge,
  type StatusTone,
} from '@/components/backend'

/* ═══════════════════════════════════════════════════════════════
   ADMIN RESOURCE CENTER  (/admin/resources)
   Admin view of the resource hub — same content visible to
   partners, plus admin-only ability to see metadata.
   ═══════════════════════════════════════════════════════════════ */

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: Math.min(i * 0.04, 0.25), duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
}

function badgeTone(label: string): StatusTone {
  if (label === 'New' || label === 'New Feature') return 'green'
  if (label === 'Must Read') return 'red'
  return 'blue'
}

export default function AdminResourcesPage() {
  const [activeFilter, setActiveFilter] = useState<string>('all')

  const filterTabs = useMemo(
    () => [
      { id: 'all', label: 'All Resources' },
      ...resourceSections.map((s) => ({ id: s.id, label: `${s.icon} ${s.label}` })),
      { id: 'social', label: '💬 Social & Community' },
    ],
    []
  )

  const visibleSections =
    activeFilter === 'all'
      ? resourceSections
      : resourceSections.filter((s) => s.id === activeFilter)

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <SectionHeader
        title="Resource Center"
        subtitle={`Preview what partners see — content managed in the Content Editor. Curated by ${resourcesMeta.curatorName} · Last updated ${resourcesMeta.lastUpdated}`}
        actions={
          <Link
            href="/admin/cms"
            className="be-btn be-btn--secondary be-btn--sm"
          >
            Open Content Editor
          </Link>
        }
      />

      {/* Stats row + admin badge */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-6">
          {resourcesMeta.stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-[var(--font-sora)] text-2xl font-bold" style={{ color: '#1b61c9' }}>
                {stat.value}
              </div>
              <div className="text-xs" style={{ color: 'rgba(4,14,32,0.45)' }}>{stat.label}</div>
            </div>
          ))}
        </div>
        <StatusBadge tone="red">Admin View — partners see the same content</StatusBadge>
      </div>

      {/* Filter tabs */}
      <Toolbar
        left={
          <>
            {filterTabs.map((tab) => (
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
          <Card padding="flush">
            <div className="flex items-start justify-between gap-4 px-6 py-5" style={{ borderBottom: '1px solid #e0e2e6' }}>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl" aria-hidden>{section.icon}</span>
                  <h2 className="font-[var(--font-sora)] font-bold text-lg" style={{ color: '#181d26' }}>
                    {section.title}
                  </h2>
                  <StatusBadge tone="blue">{section.count} resources</StatusBadge>
                </div>
                <p className="text-sm" style={{ color: 'rgba(4,14,32,0.5)' }}>{section.description}</p>
              </div>
              {section.updatedDate && (
                <span className="shrink-0 text-xs" style={{ color: 'rgba(4,14,32,0.3)' }}>
                  Updated {section.updatedDate}
                </span>
              )}
            </div>
            <div className="divide-y" style={{ borderColor: '#f0f2f7' }}>
              {section.resources.map((resource) => (
                <Link
                  key={resource.title}
                  href={resource.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 px-6 py-4 transition-colors hover:bg-[#f8fafc] group"
                >
                  <span className="text-xl shrink-0" aria-hidden>{resource.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-sm transition-colors group-hover:text-[#1b61c9]" style={{ color: '#181d26' }}>
                        {resource.title}
                      </span>
                      {resource.badge && (
                        <StatusBadge tone={badgeTone(resource.badge)}>{resource.badge}</StatusBadge>
                      )}
                    </div>
                    <div className="text-xs mt-0.5" style={{ color: 'rgba(4,14,32,0.45)' }}>
                      {resource.type}{resource.duration && ` · ${resource.duration}`} · {resource.source}
                    </div>
                    {resource.note && (
                      <div className="text-xs mt-1" style={{ color: '#b45309' }}>🔑 {resource.note}</div>
                    )}
                  </div>
                  <svg className="h-4 w-4 shrink-0 transition-colors group-hover:text-[#1b61c9]" style={{ color: 'rgba(4,14,32,0.2)' }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ))}
            </div>
          </Card>
        </motion.div>
      ))}

      {/* Social & Community */}
      {(activeFilter === 'all' || activeFilter === 'social') && (
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={0}>
          <Card padding="flush">
            <div className="px-6 py-5" style={{ borderBottom: '1px solid #e0e2e6' }}>
              <h2 className="font-[var(--font-sora)] font-bold text-lg" style={{ color: '#181d26' }}>
                💬 Social & Community
              </h2>
              <p className="text-sm" style={{ color: 'rgba(4,14,32,0.5)' }}>
                Official channels. Stay connected, get updates, and attend community calls.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 p-6">
              {socialChannels.map((channel) => (
                <Link
                  key={channel.platform}
                  href={channel.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-xl p-4 transition-all group"
                  style={{ border: '1px solid #e0e2e6', background: '#f8fafc' }}
                >
                  <span className="text-xl" aria-hidden>{channel.icon}</span>
                  <div>
                    <div className="font-semibold text-sm transition-colors group-hover:text-[#1b61c9]" style={{ color: '#181d26' }}>
                      {channel.platform}
                    </div>
                    <div className="text-xs" style={{ color: 'rgba(4,14,32,0.45)' }}>{channel.handle}</div>
                  </div>
                  <svg className="ml-auto h-4 w-4 transition-colors group-hover:text-[#1b61c9]" style={{ color: 'rgba(4,14,32,0.2)' }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ))}
            </div>
          </Card>
        </motion.div>
      )}

      {/* Back Office */}
      {(activeFilter === 'all' || activeFilter === 'social') && (
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={1}>
          <Card padding="flush">
            <div className="px-6 py-5" style={{ borderBottom: '1px solid #e0e2e6' }}>
              <h2 className="font-[var(--font-sora)] font-bold text-lg" style={{ color: '#181d26' }}>
                🔐 Back Office & Support
              </h2>
              <p className="text-sm" style={{ color: 'rgba(4,14,32,0.5)' }}>
                Partner dashboard — deposits, withdrawals, bot management, and portfolio overview.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-3 p-6">
              {backOfficeLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-xl p-4 transition-all group"
                  style={{ border: '1px solid #e0e2e6', background: '#f8fafc' }}
                >
                  <span className="text-lg" aria-hidden>{link.icon}</span>
                  <span className="text-sm font-medium transition-colors group-hover:text-[#181d26]" style={{ color: 'rgba(4,14,32,0.65)' }}>
                    {link.title}
                  </span>
                  <svg className="ml-auto h-4 w-4 transition-colors group-hover:text-[#1b61c9]" style={{ color: 'rgba(4,14,32,0.2)' }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ))}
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  )
}
