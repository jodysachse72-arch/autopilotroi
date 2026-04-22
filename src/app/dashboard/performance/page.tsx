'use client'

import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { SectionHeader, StatCard, Card } from '@/components/backend'

/* ═══════════════════════════════════════════════════════════════
   PARTNER · PERFORMANCE  (/dashboard/performance)
   Conversion metrics, referral sources, milestones.
   Demo data — wire to Supabase analytics later.
   ═══════════════════════════════════════════════════════════════ */

interface WeeklyPoint { week: string; leads: number; converted: number }
interface SourceRow   { source: string; count: number; pct: number }
interface Milestone   { target: number; label: string; reward: string; reached: boolean }

const WEEKLY: WeeklyPoint[] = [
  { week: 'W1', leads: 2,  converted: 0 },
  { week: 'W2', leads: 5,  converted: 1 },
  { week: 'W3', leads: 3,  converted: 1 },
  { week: 'W4', leads: 8,  converted: 2 },
  { week: 'W5', leads: 6,  converted: 2 },
  { week: 'W6', leads: 12, converted: 4 },
]

const SOURCES: SourceRow[] = [
  { source: 'WhatsApp',    count: 14, pct: 38 },
  { source: 'Direct Link', count: 10, pct: 27 },
  { source: 'Telegram',    count: 8,  pct: 22 },
  { source: 'Email',       count: 3,  pct: 8  },
  { source: 'QR Code',     count: 2,  pct: 5  },
]

const MILESTONES: Milestone[] = [
  { target: 5,   label: 'First 5 leads', reward: 'Partner badge',         reached: true  },
  { target: 10,  label: '10 leads',      reward: 'Priority support',      reached: true  },
  { target: 25,  label: '25 leads',      reward: 'Early access features', reached: false },
  { target: 50,  label: '50 leads',      reward: 'Custom landing page',   reached: false },
  { target: 100, label: 'Century club',  reward: 'Revenue share boost',   reached: false },
]

export default function PerformancePage() {
  const totalLeads     = useMemo(() => WEEKLY.reduce((s, w) => s + w.leads, 0), [])
  const totalConverted = useMemo(() => WEEKLY.reduce((s, w) => s + w.converted, 0), [])
  const conversionRate = totalLeads > 0 ? Math.round((totalConverted / totalLeads) * 100) : 0
  const maxLeads       = useMemo(() => Math.max(...WEEKLY.map(w => w.leads)), [])

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <SectionHeader
        title="Performance"
        subtitle="Track your referral growth, conversion rates, and milestones."
      />

      {/* Top-level stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard label="Total leads"  value={totalLeads}             icon="👥" />
        <StatCard label="Converted"    value={totalConverted}         icon="✅" />
        <StatCard label="Conv. rate"   value={`${conversionRate}%`}   icon="📈" />
        <StatCard label="Trend"        value="+42%"                   icon="🔥" delta="vs last month" trend="up" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Weekly chart */}
        <Card padding="lg">
          <h3 className="font-[var(--font-sora)] text-sm font-semibold text-[rgba(4,14,32,0.45)] uppercase tracking-wider mb-6">
            Weekly leads
          </h3>
          <div className="flex items-end gap-3 h-40">
            {WEEKLY.map((w, i) => (
              <div key={w.week} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-xs font-bold text-[#181d26]">{w.leads}</span>
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
                    className="absolute bottom-0 w-full rounded-t-md bg-emerald-500/60"
                  />
                </div>
                <span className="text-xs text-[rgba(4,14,32,0.45)]">{w.week}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex gap-4 justify-center text-xs text-[rgba(4,14,32,0.55)]">
            <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-blue-500/40" /> Leads</span>
            <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-emerald-500/60" /> Converted</span>
          </div>
        </Card>

        {/* Top referral sources */}
        <Card padding="lg">
          <h3 className="font-[var(--font-sora)] text-sm font-semibold text-[rgba(4,14,32,0.45)] uppercase tracking-wider mb-6">
            Top referral sources
          </h3>
          <div className="space-y-4">
            {SOURCES.map((source) => (
              <div key={source.source}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-medium text-[#181d26]">{source.source}</span>
                  <span className="text-xs text-[rgba(4,14,32,0.55)]">{source.count} leads · {source.pct}%</span>
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
        </Card>
      </div>

      {/* Milestones */}
      <Card padding="lg">
        <h3 className="font-[var(--font-sora)] text-sm font-semibold text-[rgba(4,14,32,0.45)] uppercase tracking-wider mb-6">
          Partner milestones
        </h3>
        <div className="flex flex-wrap gap-4">
          {MILESTONES.map((m) => (
            <div
              key={m.target}
              className={`flex-1 min-w-[140px] rounded-xl border p-4 text-center transition ${
                m.reached
                  ? 'border-emerald-200 bg-emerald-50'
                  : 'border-[#e0e2e6] bg-[#f8fafc] opacity-70'
              }`}
            >
              <div className="text-2xl mb-1">{m.reached ? '🏆' : '🔒'}</div>
              <div className={`text-sm font-bold ${m.reached ? 'text-emerald-700' : 'text-[rgba(4,14,32,0.45)]'}`}>
                {m.label}
              </div>
              <div className="mt-1 text-xs text-[rgba(4,14,32,0.50)]">{m.reward}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
