'use client'

import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { useFeatureFlags } from '@/lib/feature-flags'
import {
  SectionHeader,
  Card,
  EmptyState,
  DataTable,
  type DataColumn,
} from '@/components/backend'

/* ═══════════════════════════════════════════════════════════════
   PARTNER LEADERBOARD  (/dashboard/leaderboard)
   Gamified ranking with podium, full table, achievement badges.
   Gated by partnerLeaderboard feature flag.
   ═══════════════════════════════════════════════════════════════ */

type Tier = 'Diamond' | 'Platinum' | 'Gold' | 'Silver' | 'Bronze'

interface Partner {
  rank: number
  name: string
  code: string
  leads: number
  converted: number
  badge: string
  streak: number
  tier: Tier
}

interface Achievement {
  icon: string
  name: string
  description: string
  unlocked: boolean
}

const PARTNERS: Partner[] = [
  { rank: 1, name: 'Jody S.',    code: 'jody',    leads: 47, converted: 18, badge: '🏆', streak: 12, tier: 'Diamond'  },
  { rank: 2, name: 'Marcus W.',  code: 'marcus',  leads: 35, converted: 14, badge: '🥈', streak: 8,  tier: 'Platinum' },
  { rank: 3, name: 'Elena R.',   code: 'elena',   leads: 28, converted: 11, badge: '🥉', streak: 6,  tier: 'Gold'     },
  { rank: 4, name: 'David K.',   code: 'david',   leads: 22, converted: 8,  badge: '',   streak: 4,  tier: 'Gold'     },
  { rank: 5, name: 'Sophia L.',  code: 'sophia',  leads: 19, converted: 7,  badge: '',   streak: 3,  tier: 'Silver'   },
  { rank: 6, name: 'Chris T.',   code: 'chris',   leads: 15, converted: 5,  badge: '',   streak: 2,  tier: 'Silver'   },
  { rank: 7, name: 'Amanda P.',  code: 'amanda',  leads: 11, converted: 3,  badge: '',   streak: 1,  tier: 'Bronze'   },
  { rank: 8, name: 'Ryan M.',    code: 'ryan',    leads: 8,  converted: 2,  badge: '',   streak: 0,  tier: 'Bronze'   },
]

const TIER_STYLES: Record<Tier, { color: string; bg: string }> = {
  Diamond:  { color: 'text-cyan-700',   bg: 'bg-cyan-100'   },
  Platinum: { color: 'text-violet-700', bg: 'bg-violet-100' },
  Gold:     { color: 'text-amber-700',  bg: 'bg-amber-100'  },
  Silver:   { color: 'text-slate-600',  bg: 'bg-slate-100'  },
  Bronze:   { color: 'text-orange-700', bg: 'bg-orange-100' },
}

const ACHIEVEMENTS: Achievement[] = [
  { icon: '🌟', name: 'First lead',     description: 'Referred your first prospect',          unlocked: true  },
  { icon: '🔥', name: '5-day streak',   description: 'Referred leads 5 days in a row',        unlocked: true  },
  { icon: '🎯', name: 'Sharpshooter',   description: '50%+ conversion rate',                  unlocked: true  },
  { icon: '💎', name: 'Diamond status', description: 'Reached Diamond partner tier',          unlocked: false },
  { icon: '🏅', name: 'Century club',   description: 'Referred 100+ total leads',             unlocked: false },
  { icon: '👑', name: 'Top dog',        description: 'Held #1 rank for 30 consecutive days',  unlocked: false },
]

export default function LeaderboardPage() {
  const { isEnabled } = useFeatureFlags()

  const columns = useMemo<ReadonlyArray<DataColumn<Partner>>>(() => [
    {
      key: 'rank',
      header: 'Rank',
      width: '5rem',
      render: (p) => (
        <span className="font-mono text-lg font-bold text-[rgba(4,14,32,0.30)]">
          {p.badge || `#${p.rank}`}
        </span>
      ),
    },
    {
      key: 'partner',
      header: 'Partner',
      render: (p) => (
        <div>
          <div className="font-medium text-[#181d26]">{p.name}</div>
          <div className="text-xs text-[rgba(4,14,32,0.45)]">@{p.code}</div>
        </div>
      ),
    },
    {
      key: 'tier',
      header: 'Tier',
      render: (p) => {
        const t = TIER_STYLES[p.tier]
        return (
          <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${t.bg} ${t.color}`}>
            {p.tier}
          </span>
        )
      },
    },
    { key: 'leads',     header: 'Leads',     align: 'right', render: (p) => <span className="font-mono text-[#181d26]">{p.leads}</span> },
    { key: 'converted', header: 'Converted', align: 'right', render: (p) => <span className="font-mono text-emerald-600">{p.converted}</span> },
    {
      key: 'rate',
      header: 'Conv. rate',
      align: 'right',
      render: (p) => {
        const rate = p.leads > 0 ? Math.round((p.converted / p.leads) * 100) : 0
        return <span className="font-mono text-blue-600">{rate}%</span>
      },
    },
    {
      key: 'streak',
      header: 'Streak',
      align: 'right',
      render: (p) => p.streak > 0
        ? <span className="text-amber-600 font-medium">🔥 {p.streak}d</span>
        : <span className="text-[rgba(4,14,32,0.30)]">—</span>,
    },
  ], [])

  if (!isEnabled('partnerLeaderboard')) {
    return (
      <div className="mx-auto max-w-3xl py-10">
        <EmptyState
          icon="🔒"
          title="Leaderboard is currently disabled"
          description="An admin has turned off the leaderboard. Check back later!"
        />
      </div>
    )
  }

  // Podium uses gold-center / silver-left / bronze-right layout
  const podiumOrder = [1, 0, 2] // index into PARTNERS for visual columns
  const podiumHeights = ['h-32', 'h-40', 'h-28'] // matched to visual order [silver, gold, bronze]

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <SectionHeader
        title="Partner leaderboard"
        subtitle="Top-performing partners ranked by total referrals. Updated daily."
      />

      {/* Podium */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[0, 1, 2].map((visualIdx) => {
          const dataIdx = podiumOrder[visualIdx]
          const partner = PARTNERS[dataIdx]
          const t = TIER_STYLES[partner.tier]
          return (
            <motion.div
              key={partner.code}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: visualIdx * 0.15 }}
              className={`flex flex-col items-center justify-end ${visualIdx === 1 ? 'order-first sm:order-none' : ''}`}
            >
              <span className="text-3xl mb-2">{partner.badge}</span>
              <div className="text-sm font-bold text-[#181d26]">{partner.name}</div>
              <div className={`text-xs font-semibold ${t.color}`}>{partner.tier}</div>
              <div className="text-xs text-[rgba(4,14,32,0.50)] mt-1">{partner.leads} leads · {partner.converted} converted</div>
              <div className={`mt-3 w-full rounded-t-xl ${t.bg} ${podiumHeights[visualIdx]} flex items-center justify-center`}>
                <span className="font-[var(--font-sora)] text-3xl font-black text-[rgba(4,14,32,0.20)]">
                  #{partner.rank}
                </span>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Full ranking table */}
      <Card padding="flush">
        <div className="border-b border-[#e0e2e6] px-5 py-4">
          <h3 className="font-[var(--font-sora)] text-base font-semibold text-[#181d26]">
            Full rankings
          </h3>
        </div>
        <DataTable<Partner>
          columns={columns}
          rows={PARTNERS}
          rowKey={(p) => p.code}
          emptyState="No partners on the leaderboard yet."
        />
      </Card>

      {/* Achievements */}
      <Card padding="lg">
        <h3 className="font-[var(--font-sora)] text-base font-semibold text-[#181d26] mb-4">
          Achievement badges
        </h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {ACHIEVEMENTS.map((a) => (
            <div
              key={a.name}
              className={`rounded-xl border p-4 text-center transition ${
                a.unlocked
                  ? 'border-emerald-300 bg-emerald-50'
                  : 'border-[#e0e2e6] bg-[#f8fafc] opacity-50'
              }`}
            >
              <div className="text-3xl mb-2">{a.unlocked ? a.icon : '🔒'}</div>
              <div className="text-xs font-bold text-[#181d26]">{a.name}</div>
              <div className="mt-1 text-[10px] text-[rgba(4,14,32,0.50)]">{a.description}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
