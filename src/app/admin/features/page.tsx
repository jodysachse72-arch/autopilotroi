'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useFeatureFlags, FEATURE_META, type FeatureFlags } from '@/lib/feature-flags'
import { getAnnouncementMessage, setAnnouncementMessage } from '@/components/layout/AnnouncementBanner'
import { Search, ChevronDown, ChevronRight } from 'lucide-react'


const riskPill: Record<string, { bg: string; color: string }> = {
  none:   { bg: '#f0fdf4', color: '#16a34a' },
  low:    { bg: 'rgba(27,97,201,0.08)', color: '#1b61c9' },
  medium: { bg: '#fefce8', color: '#ca8a04' },
  high:   { bg: '#fef2f2', color: '#dc2626' },
}


const riskLabel: Record<string, string> = {
  none:   'Safe',
  low:    'Low Risk',
  medium: 'Medium Risk',
  high:   '⚠️ High Risk',
}

export default function FeatureTogglesPage() {
  const { flags, setFlag } = useFeatureFlags()
  const [expandedFlag, setExpandedFlag] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [bannerMsg, setBannerMsg] = useState('')
  const [bannerSaved, setBannerSaved] = useState(false)

  useEffect(() => {
    setBannerMsg(getAnnouncementMessage())
  }, [])

  const categories = [...new Set(Object.values(FEATURE_META).map((m) => m.category))]
  const activeCount = Object.values(flags).filter(Boolean).length
  const totalCount = Object.keys(flags).length

  const matchesSearch = (key: string) => {
    if (!searchQuery) return true
    const q = searchQuery.toLowerCase()
    const meta = FEATURE_META[key as keyof FeatureFlags]
    return (
      meta.label.toLowerCase().includes(q) ||
      meta.description.toLowerCase().includes(q) ||
      meta.category.toLowerCase().includes(q)
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div className="adm-page-header">
        <div>
          <h1 className="adm-page-title">Feature Flags</h1>
          <p className="adm-page-subtitle">Turn features on and off instantly. Click any feature to see what it does.</p>
        </div>
      </div>

      {/* Stats */}
      <div className="adm-three-col">
        {[
          { label: 'Active',   value: activeCount },
          { label: 'Disabled', value: totalCount - activeCount },
          { label: 'Total',    value: totalCount },
        ].map(s => (
          <div key={s.label} className="adm-card" style={{ textAlign: 'center' }}>
            <div className="adm-stat-value">{s.value}</div>
            <div className="adm-stat-label" style={{ marginTop: 6 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="adm-search-wrap" style={{ maxWidth: 360 }}>
        <Search size={15} className="adm-search-icon" />
        <input
          className="adm-input"
          placeholder="Search features..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Categories */}
      {categories.map(category => {
        const categoryFlags = (
          Object.entries(FEATURE_META) as [keyof FeatureFlags, typeof FEATURE_META[keyof FeatureFlags]][]
        ).filter(([key, meta]) => meta.category === category && matchesSearch(key))

        if (categoryFlags.length === 0) return null

        return (
          <div key={category} className="adm-card adm-card--flush">
            <div className="adm-card-header">
              <span className="adm-card-title">{category}</span>
            </div>

            <div>
              {categoryFlags.map(([key, meta]) => {
                const isOn = flags[key]
                const isDangerous = meta.risk === 'high'
                const isExpanded = expandedFlag === key
                const pill = riskPill[meta.risk]

                return (
                  <div key={key}>
                    {/* Toggle row */}
                    <div className={`adm-flag-row${isDangerous && isOn ? ' adm-flag-row--danger' : ''}`}>
                      <button
                        type="button"
                        className="adm-flag-expand"
                        onClick={() => setExpandedFlag(isExpanded ? null : key)}
                      >
                        <div className="adm-flag-meta">
                          <span className="adm-flag-name">{meta.label}</span>
                          <span
                            className="adm-pill"
                            style={{ background: pill.bg, color: pill.color, fontSize: 10 }}
                          >
                            {riskLabel[meta.risk]}
                          </span>
                          <span className="adm-pill adm-pill--gray" style={{ fontSize: 10 }}>{meta.phase}</span>
                          {isExpanded
                            ? <ChevronDown size={12} color="#94a3b8" />
                            : <ChevronRight size={12} color="#94a3b8" />
                          }
                        </div>
                        <div className="adm-flag-desc">{meta.description}</div>
                      </button>

                      {/* Toggle switch */}
                      <button
                        type="button"
                        className={`adm-toggle-btn ${isOn ? (isDangerous ? 'adm-toggle-btn--danger-on' : 'adm-toggle-btn--on') : 'adm-toggle-btn--off'}`}
                        onClick={() => setFlag(key, !isOn)}
                        aria-pressed={isOn}
                        aria-label={`${isOn ? 'Disable' : 'Enable'} ${meta.label}`}
                      >
                        <span className="adm-toggle-knob" />
                      </button>
                    </div>

                    {/* Expanded documentation */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          style={{ overflow: 'hidden' }}
                        >
                          <div className="adm-flag-expanded">
                            <div className="adm-flag-detail">
                              <div className="adm-flag-detail-title" style={{ color: '#1b61c9' }}>What It Does</div>
                              <div className="adm-flag-detail-body">{meta.description}</div>
                            </div>
                            <div className="adm-flag-detail">
                              <div className="adm-flag-detail-title" style={{ color: '#16a34a' }}>Why It Matters</div>
                              <div className="adm-flag-detail-body">{meta.why}</div>
                            </div>
                            <div className="adm-flag-detail">
                              <div className="adm-flag-detail-title" style={{ color: '#ca8a04' }}>When To Use</div>
                              <div className="adm-flag-detail-body">{meta.whenToUse}</div>
                            </div>
                            {key === 'announcementBanner' && (
                              <div className="adm-flag-detail" style={{ gridColumn: '1 / -1', background: 'rgba(27,97,201,0.04)', borderColor: 'rgba(27,97,201,0.20)' }}>
                                <div className="adm-flag-detail-title" style={{ color: '#1b61c9', marginBottom: 8 }}>Edit Banner Message</div>
                                <div style={{ display: 'flex', gap: 8 }}>
                                  <input
                                    className="adm-input"
                                    value={bannerMsg}
                                    onChange={e => { setBannerMsg(e.target.value); setBannerSaved(false) }}
                                    placeholder="Enter announcement message…"
                                    style={{ flex: 1 }}
                                  />
                                  <button
                                    className="adm-btn adm-btn--primary adm-btn--sm"
                                    onClick={() => { setAnnouncementMessage(bannerMsg); setBannerSaved(true); window.setTimeout(() => setBannerSaved(false), 2000) }}
                                  >
                                    {bannerSaved ? '✓ Saved' : 'Save'}
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}

