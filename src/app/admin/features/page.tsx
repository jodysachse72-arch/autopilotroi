'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useFeatureFlags, FEATURE_META, type FeatureFlags } from '@/lib/feature-flags'
import { getAnnouncementMessage, setAnnouncementMessage } from '@/components/layout/AnnouncementBanner'
import {
  SectionHeader,
  Card,
  StatCard,
  StatusBadge,
  FormInput,
  FormButton,
  type StatusTone,
} from '@/components/backend'

/* ═══════════════════════════════════════════════════════════════
   ADMIN FEATURE TOGGLES — with built-in documentation
   ═══════════════════════════════════════════════════════════════ */

const riskMeta: Record<string, { label: string; tone: StatusTone; help: string }> = {
  none:   { label: 'Safe',          tone: 'green',  help: 'No impact'         },
  low:    { label: 'Low Risk',      tone: 'blue',   help: 'Minimal impact'    },
  medium: { label: 'Medium Risk',   tone: 'amber',  help: 'Test first'        },
  high:   { label: '⚠️ High Risk',  tone: 'red',    help: 'Use carefully'     },
}

export default function FeatureTogglesPage() {
  const { flags, setFlag } = useFeatureFlags()
  const [expandedFlag, setExpandedFlag] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [bannerMsg, setBannerMsg] = useState('')
  const [bannerSaved, setBannerSaved] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- pull initial banner copy out of the global module on mount
    setBannerMsg(getAnnouncementMessage())
  }, [])

  const categories = [...new Set(Object.values(FEATURE_META).map((m) => m.category))]

  const matchesSearch = (key: string) => {
    if (!searchQuery) return true
    const q = searchQuery.toLowerCase()
    const meta = FEATURE_META[key as keyof FeatureFlags]
    return (
      meta.label.toLowerCase().includes(q) ||
      meta.description.toLowerCase().includes(q) ||
      meta.category.toLowerCase().includes(q) ||
      meta.why.toLowerCase().includes(q)
    )
  }

  const activeCount = Object.values(flags).filter(Boolean).length
  const disabledCount = Object.values(flags).filter((v) => !v).length
  const totalCount = Object.keys(flags).length

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <SectionHeader
        title="Feature Toggles"
        subtitle="Turn features on and off instantly. Click any feature to see what it does and when to use it."
      />

      {/* Stats Overview */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="Active"          value={activeCount}     icon="🟢" />
        <StatCard label="Disabled"        value={disabledCount}   icon="⚪" />
        <StatCard label="Total Features"  value={totalCount}      icon="🎛️" />
        <StatCard label="Categories"      value={categories.length} icon="🗂️" />
      </div>

      {/* Search */}
      <FormInput
        type="search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search features by name, description, or category…"
        aria-label="Search features"
      />

      {/* Categories */}
      {categories.map((category) => {
        const categoryFlags = (
          Object.entries(FEATURE_META) as [keyof FeatureFlags, typeof FEATURE_META[keyof FeatureFlags]][]
        ).filter(([key, meta]) => meta.category === category && matchesSearch(key))

        if (categoryFlags.length === 0) return null

        return (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card padding="flush">
              <div className="px-6 py-4" style={{ borderBottom: '1px solid #e0e2e6', background: '#f8fafc' }}>
                <h2 className="font-[var(--font-sora)] text-base font-bold" style={{ color: '#181d26' }}>
                  {category}
                </h2>
              </div>

              <div className="divide-y" style={{ borderColor: '#f0f2f5' }}>
                {categoryFlags.map(([key, meta]) => {
                  const isOn = flags[key]
                  const isDangerous = meta.risk === 'high'
                  const isExpanded = expandedFlag === key
                  const risk = riskMeta[meta.risk] ?? riskMeta.none

                  return (
                    <div
                      key={key}
                      className={`transition ${isDangerous && isOn ? 'bg-red-50' : ''}`}
                    >
                      {/* Toggle row */}
                      <div className="flex items-center justify-between px-6 py-5">
                        <button
                          type="button"
                          onClick={() => setExpandedFlag(isExpanded ? null : key)}
                          className="flex-1 min-w-0 pr-4 text-left"
                        >
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-sm font-medium" style={{ color: '#181d26' }}>
                              {meta.label}
                            </span>
                            <StatusBadge tone={risk.tone}>{risk.label}</StatusBadge>
                            <span
                              className="rounded-full px-2 py-0.5 text-[10px]"
                              style={{ background: '#f0f2f5', color: 'rgba(4,14,32,0.45)' }}
                            >
                              {meta.phase}
                            </span>
                            <span className="text-[10px]" style={{ color: 'rgba(4,14,32,0.35)' }}>
                              {isExpanded ? '▼' : '▶'} Click for details
                            </span>
                          </div>
                          <p className="mt-0.5 text-xs line-clamp-1" style={{ color: 'rgba(4,14,32,0.55)' }}>
                            {meta.description}
                          </p>
                        </button>

                        {/* Toggle Switch */}
                        <button
                          type="button"
                          onClick={() => setFlag(key, !isOn)}
                          aria-pressed={isOn}
                          aria-label={`${isOn ? 'Disable' : 'Enable'} ${meta.label}`}
                          className="relative inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
                          style={{
                            background: isOn ? (isDangerous ? '#ef4444' : '#10b981') : '#c8ccd4',
                          }}
                        >
                          <span
                            className="inline-block h-5 w-5 rounded-full bg-white shadow transform transition-transform duration-200"
                            style={{ transform: isOn ? 'translateX(22px)' : 'translateX(4px)' }}
                          />
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
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-5 space-y-3" style={{ background: '#f8fafc' }}>
                              <Card>
                                <h4 className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: '#1b61c9' }}>
                                  📖 What It Does
                                </h4>
                                <p className="text-sm leading-relaxed" style={{ color: 'rgba(4,14,32,0.69)' }}>
                                  {meta.description}
                                </p>
                              </Card>
                              <Card>
                                <h4 className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: '#047857' }}>
                                  💡 Why It Matters
                                </h4>
                                <p className="text-sm leading-relaxed" style={{ color: 'rgba(4,14,32,0.69)' }}>
                                  {meta.why}
                                </p>
                              </Card>
                              <Card>
                                <h4 className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: '#b45309' }}>
                                  ⏰ When To Turn On/Off
                                </h4>
                                <p className="text-sm leading-relaxed" style={{ color: 'rgba(4,14,32,0.69)' }}>
                                  {meta.whenToUse}
                                </p>
                              </Card>

                              {key === 'announcementBanner' && (
                                <Card className="!bg-blue-50" padding="lg">
                                  <h4 className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: '#1b61c9' }}>
                                    ✏️ Edit Banner Message
                                  </h4>
                                  <p className="text-xs mb-3" style={{ color: 'rgba(4,14,32,0.55)' }}>
                                    This is the text displayed in the banner at the top of every page when the toggle is ON.
                                  </p>
                                  <div className="flex flex-wrap gap-2">
                                    <FormInput
                                      value={bannerMsg}
                                      onChange={(e) => {
                                        setBannerMsg(e.target.value)
                                        setBannerSaved(false)
                                      }}
                                      placeholder="Enter announcement message…"
                                      className="flex-1 min-w-[12rem]"
                                    />
                                    <FormButton
                                      variant="primary"
                                      onClick={() => {
                                        setAnnouncementMessage(bannerMsg)
                                        setBannerSaved(true)
                                        window.setTimeout(() => setBannerSaved(false), 2000)
                                      }}
                                    >
                                      {bannerSaved ? '✓ Saved!' : 'Save'}
                                    </FormButton>
                                  </div>
                                  <p className="mt-2 text-[10px]" style={{ color: 'rgba(4,14,32,0.35)' }}>
                                    💡 Tip: Use emojis to make announcements eye-catching.
                                  </p>
                                </Card>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                })}
              </div>
            </Card>
          </motion.div>
        )
      })}

      {/* Risk Legend */}
      <Card>
        <h3 className="text-sm font-bold mb-3" style={{ color: '#181d26' }}>Understanding Risk Levels</h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {Object.entries(riskMeta).map(([key, value]) => (
            <div key={key} className="flex items-center gap-2">
              <StatusBadge tone={value.tone}>{value.label}</StatusBadge>
              <span className="text-xs" style={{ color: 'rgba(4,14,32,0.45)' }}>{value.help}</span>
            </div>
          ))}
        </div>
        <p className="text-xs mt-3" style={{ color: 'rgba(4,14,32,0.35)' }}>
          💡 Tip: Click any feature name to see a detailed explanation of what it does, why it exists, and exactly when you should turn it on or off.
        </p>
      </Card>
    </div>
  )
}
