'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useFeatureFlags, FEATURE_META, type FeatureFlags } from '@/lib/feature-flags'
import { getAnnouncementMessage, setAnnouncementMessage } from '@/components/layout/AnnouncementBanner'

/* ═══════════════════════════════════════════════════════════════
   ADMIN FEATURE TOGGLES — with built-in documentation
   ═══════════════════════════════════════════════════════════════ */

const riskBadge: Record<string, { label: string; color: string }> = {
  none: { label: 'Safe', color: 'bg-emerald-100 text-emerald-700' },
  low: { label: 'Low Risk', color: 'bg-blue-100 text-blue-700' },
  medium: { label: 'Medium Risk', color: 'bg-amber-100 text-amber-700' },
  high: { label: '⚠️ High Risk', color: 'bg-red-100 text-red-700' },
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

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div>
        <h1 className="font-[var(--font-sora)] text-3xl font-bold text-[#181d26]">
          Feature Toggles
        </h1>
        <p className="mt-2 text-[rgba(4,14,32,0.55)]">
          Turn features on and off instantly. Click any feature to see what it does and when to use it.
        </p>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-center">
          <div className="text-2xl font-bold text-emerald-700">
            {Object.values(flags).filter(Boolean).length}
          </div>
          <div className="text-xs text-emerald-600 mt-1">Active</div>
        </div>
        <div className="rounded-xl border border-[#e0e2e6] bg-[#f8fafc] p-4 text-center">
          <div className="text-2xl font-bold text-[rgba(4,14,32,0.45)]">
            {Object.values(flags).filter((v) => !v).length}
          </div>
          <div className="text-xs text-[rgba(4,14,32,0.45)] mt-1">Disabled</div>
        </div>
        <div className="rounded-xl border border-[#e0e2e6] bg-[#f8fafc] p-4 text-center">
          <div className="text-2xl font-bold text-[#181d26]">
            {Object.keys(flags).length}
          </div>
          <div className="text-xs text-[rgba(4,14,32,0.45)] mt-1">Total Features</div>
        </div>
        <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 text-center">
          <div className="text-2xl font-bold text-[#1b61c9]">{categories.length}</div>
          <div className="text-xs text-blue-600 mt-1">Categories</div>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search features by name, description, or category..."
          className="w-full rounded-xl border border-[#e0e2e6] bg-white px-4 py-3 pl-10 text-sm text-[#181d26] placeholder:text-[rgba(4,14,32,0.35)] outline-none focus:border-[#1b61c9] transition"
        />
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[rgba(4,14,32,0.35)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      {/* Categories */}
      {categories.map((category) => {
        const categoryFlags = (Object.entries(FEATURE_META) as [keyof FeatureFlags, typeof FEATURE_META[keyof FeatureFlags]][]).filter(
          ([key, meta]) => meta.category === category && matchesSearch(key)
        )

        if (categoryFlags.length === 0) return null

        return (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-[#e0e2e6] bg-white overflow-hidden"
          >
            <div className="border-b border-[#e0e2e6] px-6 py-4 bg-[#f8fafc]">
              <h2 className="font-[var(--font-sora)] text-base font-bold text-[#181d26]">
                {category}
              </h2>
            </div>

            <div className="divide-y divide-[#f0f2f5]">
              {categoryFlags.map(([key, meta]) => {
                const isOn = flags[key]
                const isDangerous = meta.risk === 'high'
                const isExpanded = expandedFlag === key
                const risk = riskBadge[meta.risk]

                return (
                  <div
                    key={key}
                    className={`transition ${isDangerous && isOn ? 'bg-red-50' : ''}`}
                  >
                    {/* Toggle row */}
                    <div className="flex items-center justify-between px-6 py-5">
                      <button
                        onClick={() => setExpandedFlag(isExpanded ? null : key)}
                        className="flex-1 min-w-0 pr-4 text-left"
                      >
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-medium text-[#181d26]">{meta.label}</span>
                          <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${risk.color}`}>
                            {risk.label}
                          </span>
                          <span className="rounded-full bg-[#f0f2f5] px-2 py-0.5 text-[10px] text-[rgba(4,14,32,0.45)]">
                            {meta.phase}
                          </span>
                          <span className="text-[10px] text-[rgba(4,14,32,0.35)]">
                            {isExpanded ? '▼' : '▶'} Click for details
                          </span>
                        </div>
                        <p className="mt-0.5 text-xs text-[rgba(4,14,32,0.55)] line-clamp-1">{meta.description}</p>
                      </button>

                      {/* Toggle Switch */}
                      <button
                        onClick={() => setFlag(key, !isOn)}
                        className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 focus:outline-none ${
                          isOn
                            ? isDangerous
                              ? 'bg-red-500'
                              : 'bg-emerald-500'
                            : 'bg-[#c8ccd4]'
                        }`}
                      >
                        <span
                          className={`inline-block h-5 w-5 rounded-full bg-white shadow transform transition-transform duration-200 ${
                            isOn ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>

                    {/* Expanded documentation panel */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-5 space-y-3 bg-[#f8fafc]">
                            <div className="rounded-lg bg-white border border-[#e0e2e6] p-4">
                              <h4 className="text-xs font-bold uppercase tracking-wider text-[#1b61c9] mb-2">
                                📖 What It Does
                              </h4>
                              <p className="text-sm text-[rgba(4,14,32,0.69)] leading-relaxed">
                                {meta.description}
                              </p>
                            </div>

                            <div className="rounded-lg bg-white border border-[#e0e2e6] p-4">
                              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-2">
                                💡 Why It Matters
                              </h4>
                              <p className="text-sm text-[rgba(4,14,32,0.69)] leading-relaxed">
                                {meta.why}
                              </p>
                            </div>

                            <div className="rounded-lg bg-white border border-[#e0e2e6] p-4">
                              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-700 mb-2">
                                ⏰ When To Turn On/Off
                              </h4>
                              <p className="text-sm text-[rgba(4,14,32,0.69)] leading-relaxed">
                                {meta.whenToUse}
                              </p>
                            </div>

                            {key === 'announcementBanner' && (
                              <div className="rounded-lg bg-blue-50 border border-blue-200 p-4">
                                <h4 className="text-xs font-bold uppercase tracking-wider text-[#1b61c9] mb-2">
                                  ✏️ Edit Banner Message
                                </h4>
                                <p className="text-xs text-[rgba(4,14,32,0.55)] mb-3">
                                  This is the text displayed in the banner at the top of every page when the toggle is ON.
                                </p>
                                <div className="flex gap-2">
                                  <input
                                    type="text"
                                    value={bannerMsg}
                                    onChange={(e) => { setBannerMsg(e.target.value); setBannerSaved(false) }}
                                    placeholder="Enter announcement message..."
                                    className="flex-1 rounded-xl border border-[#e0e2e6] bg-white px-4 py-2.5 text-sm text-[#181d26] placeholder:text-[rgba(4,14,32,0.35)] outline-none focus:border-[#1b61c9] transition"
                                  />
                                  <button
                                    onClick={() => {
                                      setAnnouncementMessage(bannerMsg)
                                      setBannerSaved(true)
                                      setTimeout(() => setBannerSaved(false), 2000)
                                    }}
                                    className="shrink-0 rounded-xl bg-[#1b61c9] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                                  >
                                    {bannerSaved ? '✓ Saved!' : 'Save'}
                                  </button>
                                </div>
                                <p className="mt-2 text-[10px] text-[rgba(4,14,32,0.35)]">
                                  💡 Tip: Use emojis to make announcements eye-catching.
                                </p>
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
          </motion.div>
        )
      })}

      {/* Legend */}
      <div className="rounded-xl border border-[#e0e2e6] bg-white p-5 space-y-3">
        <h3 className="text-sm font-bold text-[#181d26]">Understanding Risk Levels</h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {Object.entries(riskBadge).map(([key, value]) => (
            <div key={key} className="flex items-center gap-2">
              <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${value.color}`}>{value.label}</span>
              <span className="text-xs text-[rgba(4,14,32,0.45)]">
                {key === 'none' ? 'No impact' : key === 'low' ? 'Minimal impact' : key === 'medium' ? 'Test first' : 'Use carefully'}
              </span>
            </div>
          ))}
        </div>
        <p className="text-xs text-[rgba(4,14,32,0.35)] mt-2">
          💡 Tip: Click any feature name to see a detailed explanation of what it does, why it exists, and exactly when you should turn it on or off.
        </p>
      </div>
    </div>
  )
}
