'use client'

import { motion } from 'framer-motion'
import { useFeatureFlags } from '@/lib/feature-flags'

/* ═══════════════════════════════════════════════════════════════
   PARTNER LEADERBOARD — Gamified ranking system
   Shows top partners by referrals, with badges and streaks
   ═══════════════════════════════════════════════════════════════ */

const demoPartners = [
  { rank: 1, name: 'Jody S.', code: 'jody', leads: 47, converted: 18, badge: '🏆', streak: 12, tier: 'Diamond' },
  { rank: 2, name: 'Marcus W.', code: 'marcus', leads: 35, converted: 14, badge: '🥈', streak: 8, tier: 'Platinum' },
  { rank: 3, name: 'Elena R.', code: 'elena', leads: 28, converted: 11, badge: '🥉', streak: 6, tier: 'Gold' },
  { rank: 4, name: 'David K.', code: 'david', leads: 22, converted: 8, badge: '', streak: 4, tier: 'Gold' },
  { rank: 5, name: 'Sophia L.', code: 'sophia', leads: 19, converted: 7, badge: '', streak: 3, tier: 'Silver' },
  { rank: 6, name: 'Chris T.', code: 'chris', leads: 15, converted: 5, badge: '', streak: 2, tier: 'Silver' },
  { rank: 7, name: 'Amanda P.', code: 'amanda', leads: 11, converted: 3, badge: '', streak: 1, tier: 'Bronze' },
  { rank: 8, name: 'Ryan M.', code: 'ryan', leads: 8, converted: 2, badge: '', streak: 0, tier: 'Bronze' },
]

const tiers: Record<string, { color: string; bg: string; min: number }> = {
  Diamond: { color: 'text-cyan-300', bg: 'bg-cyan-500/15', min: 40 },
  Platinum: { color: 'text-violet-300', bg: 'bg-violet-500/15', min: 25 },
  Gold: { color: 'text-amber-300', bg: 'bg-amber-500/15', min: 15 },
  Silver: { color: 'text-slate-300', bg: 'bg-slate-500/15', min: 5 },
  Bronze: { color: 'text-orange-300', bg: 'bg-orange-500/15', min: 0 },
}

const achievements = [
  { icon: '🌟', name: 'First Lead', description: 'Referred your first prospect', unlocked: true },
  { icon: '🔥', name: '5-Day Streak', description: 'Referred leads 5 days in a row', unlocked: true },
  { icon: '🎯', name: 'Sharpshooter', description: '50%+ conversion rate', unlocked: true },
  { icon: '💎', name: 'Diamond Status', description: 'Reached Diamond partner tier', unlocked: false },
  { icon: '🏅', name: 'Century Club', description: 'Referred 100+ total leads', unlocked: false },
  { icon: '👑', name: 'Top Dog', description: 'Held #1 rank for 30 consecutive days', unlocked: false },
]

export default function LeaderboardPage() {
  const { isEnabled } = useFeatureFlags()

  if (!isEnabled('partnerLeaderboard')) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <span className="text-4xl mb-4 block">🔒</span>
          <h2 className="font-[var(--font-sora)] text-xl font-bold text-[var(--text-primary)]">
            Leaderboard is Currently Disabled
          </h2>
          <p className="mt-2 text-sm text-[var(--text-muted)]">
            An admin has turned off the leaderboard. Check back later!
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div>
        <h1 className="font-[var(--font-sora)] text-2xl font-bold text-[var(--text-primary)]">
          Partner Leaderboard
        </h1>
        <p className="mt-1 text-sm text-[var(--text-muted)]">
          Top-performing partners ranked by total referrals. Updated daily.
        </p>
      </div>

      {/* Top 3 podium */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {demoPartners.slice(0, 3).map((p, i) => {
          const heights = ['h-40', 'h-32', 'h-28']
          const order = [1, 0, 2] // Gold center, Silver left, Bronze right
          const idx = order[i]
          const partner = demoPartners[idx]
          const t = tiers[partner.tier]

          return (
            <motion.div
              key={partner.code}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              className={`flex flex-col items-center justify-end ${i === 1 ? 'order-first sm:order-none' : ''}`}
            >
              <span className="text-3xl mb-2">{partner.badge}</span>
              <div className="text-sm font-bold text-white">{partner.name}</div>
              <div className={`text-xs font-semibold ${t.color}`}>{partner.tier}</div>
              <div className="text-xs text-[var(--text-muted)] mt-1">{partner.leads} leads · {partner.converted} converted</div>
              <div className={`mt-3 w-full rounded-t-xl ${t.bg} ${heights[idx]} flex items-center justify-center`}>
                <span className="font-[var(--font-sora)] text-3xl font-black text-white/20">
                  #{partner.rank}
                </span>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Full ranking table */}
      <div className="rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-card)] overflow-hidden">
        <div className="border-b border-[var(--border-primary)] px-4 sm:px-6 py-4">
          <h3 className="font-[var(--font-sora)] text-base font-semibold text-[var(--text-primary)]">
            Full Rankings
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border-primary)] text-left text-[var(--text-muted)]">
                <th className="px-6 py-3 font-medium w-16">Rank</th>
                <th className="px-6 py-3 font-medium">Partner</th>
                <th className="px-6 py-3 font-medium">Tier</th>
                <th className="px-6 py-3 font-medium text-right">Leads</th>
                <th className="px-6 py-3 font-medium text-right">Converted</th>
                <th className="px-6 py-3 font-medium text-right">Conv. Rate</th>
                <th className="px-6 py-3 font-medium text-right">Streak</th>
              </tr>
            </thead>
            <tbody>
              {demoPartners.map((p) => {
                const t = tiers[p.tier]
                const rate = p.leads > 0 ? Math.round((p.converted / p.leads) * 100) : 0
                return (
                  <motion.tr
                    key={p.code}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="border-b border-[var(--border-primary)] transition hover:bg-[var(--bg-card-hover)]"
                  >
                    <td className="px-6 py-4 font-mono text-lg font-bold text-white/20">
                      {p.badge || `#${p.rank}`}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-[var(--text-primary)]">{p.name}</div>
                      <div className="text-xs text-[var(--text-muted)]">@{p.code}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${t.bg} ${t.color}`}>
                        {p.tier}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right font-mono text-[var(--text-primary)]">{p.leads}</td>
                    <td className="px-6 py-4 text-right font-mono text-emerald-400">{p.converted}</td>
                    <td className="px-6 py-4 text-right font-mono text-blue-400">{rate}%</td>
                    <td className="px-6 py-4 text-right">
                      {p.streak > 0 ? (
                        <span className="text-amber-400">🔥 {p.streak}d</span>
                      ) : (
                        <span className="text-white/20">—</span>
                      )}
                    </td>
                  </motion.tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Achievements */}
      <div className="rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-card)] p-6">
        <h3 className="font-[var(--font-sora)] text-base font-semibold text-[var(--text-primary)] mb-4">
          Achievement Badges
        </h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {achievements.map((a) => (
            <div
              key={a.name}
              className={`rounded-xl border p-4 text-center transition ${
                a.unlocked
                  ? 'border-emerald-400/20 bg-emerald-500/5'
                  : 'border-white/5 bg-white/[0.01] opacity-40'
              }`}
            >
              <div className="text-3xl mb-2">{a.unlocked ? a.icon : '🔒'}</div>
              <div className="text-xs font-bold text-[var(--text-primary)]">{a.name}</div>
              <div className="mt-1 text-[10px] text-[var(--text-muted)]">{a.description}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
