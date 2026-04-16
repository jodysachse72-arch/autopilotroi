'use client'

import { motion } from 'framer-motion'

/* ═══════════════════════════════════════════════════════════════
   PARTNER PERFORMANCE — Analytics & growth tracking
   Shows conversion metrics, referral performance, and trends
   ═══════════════════════════════════════════════════════════════ */

const weeklyData = [
  { week: 'W1', leads: 2, converted: 0 },
  { week: 'W2', leads: 5, converted: 1 },
  { week: 'W3', leads: 3, converted: 1 },
  { week: 'W4', leads: 8, converted: 2 },
  { week: 'W5', leads: 6, converted: 2 },
  { week: 'W6', leads: 12, converted: 4 },
]

const topReferralSources = [
  { source: 'WhatsApp', count: 14, pct: 38 },
  { source: 'Direct Link', count: 10, pct: 27 },
  { source: 'Telegram', count: 8, pct: 22 },
  { source: 'Email', count: 3, pct: 8 },
  { source: 'QR Code', count: 2, pct: 5 },
]

const milestones = [
  { target: 5, label: 'First 5 Leads', reward: 'Partner Badge', reached: true },
  { target: 10, label: '10 Leads', reward: 'Priority Support', reached: true },
  { target: 25, label: '25 Leads', reward: 'Early Access Features', reached: false },
  { target: 50, label: '50 Leads', reward: 'Custom Landing Page', reached: false },
  { target: 100, label: 'Century Club', reward: 'Revenue Share Boost', reached: false },
]

export default function PerformancePage() {
  const totalLeads = weeklyData.reduce((s, w) => s + w.leads, 0)
  const totalConverted = weeklyData.reduce((s, w) => s + w.converted, 0)
  const conversionRate = totalLeads > 0 ? Math.round((totalConverted / totalLeads) * 100) : 0
  const maxLeads = Math.max(...weeklyData.map((w) => w.leads))

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div>
        <h1 className="font-[var(--font-sora)] text-2xl font-bold text-[var(--text-primary)]">
          Performance
        </h1>
        <p className="mt-1 text-sm text-[var(--text-muted)]">
          Track your referral growth, conversion rates, and milestones.
        </p>
      </div>

      {/* Top-level stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: 'Total Leads', value: totalLeads, icon: '👥' },
          { label: 'Converted', value: totalConverted, icon: '✅' },
          { label: 'Conv. Rate', value: `${conversionRate}%`, icon: '📈' },
          { label: 'Trend', value: '+42%', icon: '🔥', sub: 'vs last month' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-card)] p-5"
          >
            <span className="text-2xl">{stat.icon}</span>
            <div className="mt-2 font-[var(--font-sora)] text-3xl font-bold text-[var(--text-primary)]">
              {stat.value}
            </div>
            <div className="text-xs text-[var(--text-muted)]">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Weekly chart */}
        <div className="rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-card)] p-6">
          <h3 className="font-[var(--font-sora)] text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-6">
            Weekly Leads
          </h3>
          <div className="flex items-end gap-3 h-40">
            {weeklyData.map((w, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-xs font-bold text-[var(--text-primary)]">{w.leads}</span>
                <div className="w-full relative" style={{ height: '100px' }}>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(w.leads / maxLeads) * 100}%` }}
                    transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                    className="absolute bottom-0 w-full rounded-t-md bg-blue-500/40"
                  />
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(w.converted / maxLeads) * 100}%` }}
                    transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                    className="absolute bottom-0 w-full rounded-t-md bg-emerald-500/50"
                  />
                </div>
                <span className="text-xs text-[var(--text-muted)]">{w.week}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex gap-4 justify-center text-xs">
            <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-blue-500/40" /> Leads</span>
            <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-emerald-500/50" /> Converted</span>
          </div>
        </div>

        {/* Top referral sources */}
        <div className="rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-card)] p-6">
          <h3 className="font-[var(--font-sora)] text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-6">
            Top Referral Sources
          </h3>
          <div className="space-y-4">
            {topReferralSources.map((source) => (
              <div key={source.source}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-medium text-[var(--text-primary)]">{source.source}</span>
                  <span className="text-xs text-[var(--text-muted)]">{source.count} leads · {source.pct}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-[#e8edf5]">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${source.pct}%` }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Milestones */}
      <div className="rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-card)] p-6">
        <h3 className="font-[var(--font-sora)] text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-6">
          Partner Milestones
        </h3>
        <div className="flex flex-wrap gap-4">
          {milestones.map((m) => (
            <div
              key={m.target}
              className={`flex-1 min-w-[140px] rounded-xl border p-4 text-center transition ${
                m.reached
                  ? 'border-emerald-200 bg-emerald-50'
                  : 'border-[#e0e2e6] bg-[#f8fafc] opacity-60'
              }`}
            >
              <div className="text-2xl mb-1">{m.reached ? '🏆' : '🔒'}</div>
              <div className={`text-sm font-bold ${m.reached ? 'text-emerald-700' : 'text-[rgba(4,14,32,0.35)]'}`}>
                {m.label}
              </div>
              <div className="mt-1 text-xs text-[rgba(4,14,32,0.40)]">{m.reward}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
