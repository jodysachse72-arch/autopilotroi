'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useFeatureFlags, FEATURE_META, type FeatureFlags } from '@/lib/feature-flags'

/* ═══════════════════════════════════════════════════════════════
   ADMIN FEATURE TOGGLES — with built-in documentation
   Every toggle explains WHAT it does, WHY it matters,
   and WHEN to turn it on/off — in plain English.
   ═══════════════════════════════════════════════════════════════ */

const riskBadge: Record<string, { label: string; color: string }> = {
  none: { label: 'Safe', color: 'bg-emerald-500/15 text-emerald-400' },
  low: { label: 'Low Risk', color: 'bg-blue-500/15 text-blue-400' },
  medium: { label: 'Medium Risk', color: 'bg-amber-500/15 text-amber-400' },
  high: { label: '⚠️ High Risk', color: 'bg-red-500/15 text-red-400' },
}

export default function FeatureTogglesPage() {
  const { flags, setFlag } = useFeatureFlags()
  const [expandedFlag, setExpandedFlag] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const categories = [...new Set(Object.values(FEATURE_META).map((m) => m.category))]

  // Filter by search
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
        <h1 className="font-[var(--font-sora)] text-3xl font-bold text-[var(--text-primary)]">
          Feature Toggles
        </h1>
        <p className="mt-2 text-[var(--text-muted)]">
          Turn features on and off instantly. Click any feature to see what it does and when to use it.
        </p>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-xl border border-emerald-400/20 bg-emerald-500/5 p-4 text-center">
          <div className="text-2xl font-bold text-emerald-400">
            {Object.values(flags).filter(Boolean).length}
          </div>
          <div className="text-xs text-white/40">Active</div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-center">
          <div className="text-2xl font-bold text-white/40">
            {Object.values(flags).filter((v) => !v).length}
          </div>
          <div className="text-xs text-white/40">Disabled</div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-center">
          <div className="text-2xl font-bold text-white">
            {Object.keys(flags).length}
          </div>
          <div className="text-xs text-white/40">Total Features</div>
        </div>
        <div className="rounded-xl border border-blue-400/20 bg-blue-500/5 p-4 text-center">
          <div className="text-2xl font-bold text-blue-400">{categories.length}</div>
          <div className="text-xs text-white/40">Categories</div>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search features by name, description, or category..."
          className="w-full rounded-xl border border-[var(--border-primary)] bg-[var(--bg-card)] px-4 py-3 pl-10 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none focus:border-blue-500 transition"
        />
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            className="rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-card)] overflow-hidden"
          >
            <div className="border-b border-[var(--border-primary)] px-6 py-4">
              <h2 className="font-[var(--font-sora)] text-base font-bold text-[var(--text-primary)]">
                {category}
              </h2>
            </div>

            <div className="divide-y divide-white/5">
              {categoryFlags.map(([key, meta]) => {
                const isOn = flags[key]
                const isDangerous = meta.risk === 'high'
                const isExpanded = expandedFlag === key
                const risk = riskBadge[meta.risk]

                return (
                  <div
                    key={key}
                    className={`transition ${isDangerous && isOn ? 'bg-red-500/5' : ''}`}
                  >
                    {/* Toggle row */}
                    <div className="flex items-center justify-between px-6 py-5">
                      <button
                        onClick={() => setExpandedFlag(isExpanded ? null : key)}
                        className="flex-1 min-w-0 pr-4 text-left"
                      >
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-medium text-white">{meta.label}</span>
                          <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${risk.color}`}>
                            {risk.label}
                          </span>
                          <span className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-white/30">
                            {meta.phase}
                          </span>
                          <span className="text-[10px] text-white/20">
                            {isExpanded ? '▼' : '▶'} Click for details
                          </span>
                        </div>
                        <p className="mt-0.5 text-xs text-white/40 line-clamp-1">{meta.description}</p>
                      </button>

                      {/* Toggle Switch */}
                      <button
                        onClick={() => setFlag(key, !isOn)}
                        className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 focus:outline-none ${
                          isOn
                            ? isDangerous
                              ? 'bg-red-500'
                              : 'bg-emerald-500'
                            : 'bg-white/10'
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
                          <div className="px-6 pb-5 space-y-4">
                            {/* What it does */}
                            <div className="rounded-lg bg-white/[0.02] border border-white/5 p-4">
                              <h4 className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-2">
                                📖 What It Does
                              </h4>
                              <p className="text-sm text-white/60 leading-relaxed">
                                {meta.description}
                              </p>
                            </div>

                            {/* Why it matters */}
                            <div className="rounded-lg bg-white/[0.02] border border-white/5 p-4">
                              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">
                                💡 Why It Matters
                              </h4>
                              <p className="text-sm text-white/60 leading-relaxed">
                                {meta.why}
                              </p>
                            </div>

                            {/* When to use */}
                            <div className="rounded-lg bg-white/[0.02] border border-white/5 p-4">
                              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
                                ⏰ When To Turn On/Off
                              </h4>
                              <p className="text-sm text-white/60 leading-relaxed">
                                {meta.whenToUse}
                              </p>
                            </div>
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
      <div className="rounded-xl border border-white/5 bg-white/[0.02] p-5 space-y-3">
        <h3 className="text-sm font-bold text-white">Understanding Risk Levels</h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {Object.entries(riskBadge).map(([key, value]) => (
            <div key={key} className="flex items-center gap-2">
              <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${value.color}`}>{value.label}</span>
              <span className="text-xs text-white/30">
                {key === 'none' ? 'No impact' : key === 'low' ? 'Minimal impact' : key === 'medium' ? 'Test first' : 'Use carefully'}
              </span>
            </div>
          ))}
        </div>
        <p className="text-xs text-white/20 mt-2">
          💡 Tip: Click any feature name to see a detailed explanation of what it does, why it exists, and exactly when you should turn it on or off.
        </p>
      </div>
    </div>
  )
}
