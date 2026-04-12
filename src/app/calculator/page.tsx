'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

/* ═══════════════════════════════════════════════════════════════
   PROFIT CALCULATOR
   
   Interactive ROI calculator matching Aurum's EX-AI Bot tiers.
   Auto-detects tier from investment amount.
   Supports compound interest toggle.
   ═══════════════════════════════════════════════════════════════ */

const TIERS = [
  { name: 'BASIC',    rate: 10.50, clientShare: 60,  min: 100,    max: 249.99 },
  { name: 'STANDARD', rate: 11.37, clientShare: 65,  min: 250,    max: 999.99 },
  { name: 'COMFORT',  rate: 12.25, clientShare: 70,  min: 1000,   max: 2499.99 },
  { name: 'OPTIMAL',  rate: 13.12, clientShare: 75,  min: 2500,   max: 4999.99 },
  { name: 'BUSINESS', rate: 14.00, clientShare: 80,  min: 5000,   max: 9999.99 },
  { name: 'VIP',      rate: 14.88, clientShare: 85,  min: 10000,  max: 24999.99 },
  { name: 'LUXURY',   rate: 15.75, clientShare: 90,  min: 25000,  max: 49999.99 },
  { name: 'ULTIMATE', rate: 16.62, clientShare: 95,  min: 50000,  max: 99999.99 },
]

const TERMS = [
  { label: '1 month',   months: 1 },
  { label: '6 months',  months: 6 },
  { label: '1 year',    months: 12 },
  { label: '2 years',   months: 24 },
  { label: '3 years',   months: 36 },
  { label: '4 years',   months: 48 },
  { label: '5 years',   months: 60 },
]

function autoDetectTier(amount: number) {
  for (let i = TIERS.length - 1; i >= 0; i--) {
    if (amount >= TIERS[i].min) return i
  }
  return 0
}

function calculateProfit(amount: number, monthlyRate: number, months: number, compound: boolean) {
  const r = monthlyRate / 100
  if (compound) {
    return amount * Math.pow(1 + r, months) - amount
  }
  return amount * r * months
}

function formatNumber(n: number) {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n)
}

export default function CalculatorPage() {
  const [amount, setAmount] = useState(1000)
  const [tierIndex, setTierIndex] = useState(2) // COMFORT default for $1000
  const [termIndex, setTermIndex] = useState(2) // 1 year
  const [compound, setCompound] = useState(true)

  const tier = TIERS[tierIndex]
  const term = TERMS[termIndex]

  const profit = useMemo(
    () => calculateProfit(amount, tier.rate, term.months, compound),
    [amount, tier.rate, term.months, compound]
  )

  function handleAmountChange(val: string) {
    const num = parseFloat(val) || 0
    setAmount(num)
    setTierIndex(autoDetectTier(num))
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[var(--bg-body)] pt-24 pb-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
          >
            <h1 className="font-[var(--font-sora)] text-4xl font-bold text-[var(--text-primary)] sm:text-5xl tracking-tight">
              Profit Calculator
            </h1>
            <p className="mt-3 max-w-xl text-lg text-[var(--text-muted)]">
              Calculate your potential earnings by investing in AURUM EX-AI Bot.
              Choose the investment amount and term to see your returns.
            </p>
          </motion.div>

          <div className="grid gap-10 lg:grid-cols-[1fr_400px]">

            {/* ─── LEFT: Calculator Inputs ─── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-7"
            >
              {/* Investment Amount */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[var(--text-secondary)]">
                  Investment Amount
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="100"
                    max="99999"
                    value={amount || ''}
                    onChange={(e) => handleAmountChange(e.target.value)}
                    className="w-full rounded-xl border border-[var(--border-primary)] bg-[var(--bg-card)] px-5 py-4 pr-24 text-xl font-semibold text-[var(--text-primary)] outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 rounded-lg bg-blue-500/10 border border-blue-500/20 px-3 py-1.5 text-sm font-bold text-blue-400">
                    USDT
                  </span>
                </div>
              </div>

              {/* Tier Selector */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[var(--text-secondary)]">
                  Select Tier (or auto-detect from amount)
                </label>
                <select
                  value={tierIndex}
                  onChange={(e) => setTierIndex(parseInt(e.target.value))}
                  className="w-full rounded-xl border border-[var(--border-primary)] bg-[var(--bg-card)] px-5 py-4 text-[var(--text-primary)] outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition cursor-pointer"
                >
                  <option value="" disabled>— Auto-detect from amount —</option>
                  {TIERS.map((t, i) => (
                    <option key={t.name} value={i}>
                      {t.name} · ~{t.rate.toFixed(2)}% monthly · ${t.min.toLocaleString()}–${t.max.toLocaleString()} USDT
                    </option>
                  ))}
                </select>

                {/* Tier badge */}
                <div className="mt-3 flex items-center gap-3 text-sm">
                  <span className="rounded-lg bg-blue-600 px-3 py-1 text-xs font-bold text-white uppercase tracking-wide">
                    {tier.name} Tier
                  </span>
                  <span className="text-[var(--text-muted)]">
                    ~{tier.rate.toFixed(2)}% monthly · {tier.clientShare}% client share
                  </span>
                </div>
              </div>

              {/* Term + Compound Row */}
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[var(--text-secondary)]">
                    Investment Term
                  </label>
                  <select
                    value={termIndex}
                    onChange={(e) => setTermIndex(parseInt(e.target.value))}
                    className="w-full rounded-xl border border-[var(--border-primary)] bg-[var(--bg-card)] px-5 py-4 text-[var(--text-primary)] outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition cursor-pointer"
                  >
                    {TERMS.map((t, i) => (
                      <option key={t.label} value={i}>{t.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-[var(--text-secondary)]">
                    Compound Interest (%)
                  </label>
                  <div className="flex h-[58px] items-center gap-4 rounded-xl border border-[var(--border-primary)] bg-[var(--bg-card)] px-5">
                    <span className={`text-sm font-medium ${!compound ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)]'}`}>off</span>
                    <button
                      type="button"
                      onClick={() => setCompound(!compound)}
                      className={`relative h-7 w-12 rounded-full transition-colors duration-200 ${compound ? 'bg-blue-500' : 'bg-white/20'}`}
                    >
                      <span className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow-md transition-transform duration-200 ${compound ? 'translate-x-[22px]' : 'translate-x-0.5'}`} />
                    </button>
                    <span className={`text-sm font-medium ${compound ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)]'}`}>on</span>
                  </div>
                </div>
              </div>

              {/* ── Result Card ── */}
              <motion.div
                key={`${amount}-${tierIndex}-${termIndex}-${compound}`}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.03] p-6"
              >
                <div className="text-sm font-medium text-[var(--text-muted)] mb-1">Total Profit:</div>
                <div className="font-[var(--font-sora)] text-4xl font-bold text-emerald-400 sm:text-5xl tracking-tight">
                  {formatNumber(profit)}
                  <span className="ml-2 text-xl font-semibold text-emerald-400/60">USDT</span>
                </div>
                <div className="mt-2 text-sm text-[var(--text-muted)]">
                  Based on {tier.name} tier · ~{tier.rate.toFixed(2)}% monthly return
                  {compound && ' · Compounded'}
                </div>
                <p className="mt-4 text-[11px] leading-relaxed text-[var(--text-muted)]/60">
                  ⚠ Projected returns are based on the EX-AI Bot&apos;s historical average performance and may fluctuate.
                  Actual results depend on market conditions. Past performance does not guarantee future results.
                </p>
              </motion.div>

              {/* CTA */}
              <Link
                href="/signup"
                className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-blue-600/30 transition-all hover:-translate-y-0.5 hover:shadow-blue-600/50"
              >
                Try Now →
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </Link>
            </motion.div>

            {/* ─── RIGHT: Why Tiers + Tier Grid ─── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              {/* Why Tiers */}
              <div className="rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-card)] p-6">
                <h3 className="mb-3 font-[var(--font-sora)] text-sm font-bold uppercase tracking-widest text-blue-400">
                  Why Tiers?
                </h3>
                <p className="text-sm leading-relaxed text-[var(--text-muted)]">
                  The more capital you deploy, the more trading volume the EX-AI Bot can execute — and the
                  greater share of returns you receive. Larger deposits unlock deeper market access, enabling
                  the bot to compound gains at a higher rate.
                </p>

                {/* Tier grid */}
                <div className="mt-5 grid grid-cols-2 gap-2">
                  {TIERS.map((t, i) => (
                    <button
                      key={t.name}
                      onClick={() => setTierIndex(i)}
                      className={`rounded-lg px-3 py-2.5 text-left text-xs font-semibold transition ${
                        i === tierIndex
                          ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25'
                          : 'bg-white/5 text-[var(--text-muted)] hover:bg-white/10 hover:text-[var(--text-secondary)]'
                      }`}
                    >
                      <div className="font-bold">{t.name}</div>
                      <div className={`text-[10px] mt-0.5 ${i === tierIndex ? 'text-blue-100' : 'text-[var(--text-muted)]'}`}>
                        ~{t.rate.toFixed(2)}%
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-card)] p-6">
                <h3 className="mb-4 font-[var(--font-sora)] text-sm font-bold uppercase tracking-widest text-blue-400">
                  Your Investment Breakdown
                </h3>
                <div className="space-y-3">
                  {[
                    { label: 'Monthly Return', value: `~${formatNumber(amount * tier.rate / 100)} USDT`, color: 'text-emerald-400' },
                    { label: 'Your Share', value: `${tier.clientShare}%`, color: 'text-blue-400' },
                    { label: 'Duration', value: term.label, color: 'text-[var(--text-primary)]' },
                    { label: 'Total Investment', value: `${formatNumber(amount)} USDT`, color: 'text-[var(--text-primary)]' },
                    { label: 'Total Return', value: `${formatNumber(amount + profit)} USDT`, color: 'text-emerald-400' },
                    { label: 'ROI', value: `${formatNumber((profit / amount) * 100)}%`, color: 'text-emerald-400' },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between">
                      <span className="text-sm text-[var(--text-muted)]">{item.label}</span>
                      <span className={`text-sm font-bold ${item.color}`}>{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Disclaimer card */}
              <div className="rounded-xl border border-amber-500/15 bg-amber-500/[0.03] px-4 py-3">
                <p className="text-[11px] leading-relaxed text-amber-300/60">
                  <strong className="text-amber-400/80">Important:</strong> This calculator provides estimates based on
                  historical EX-AI Bot returns. Cryptocurrency trading involves risk. Never invest more than you can
                  afford to lose. Past performance is not indicative of future results.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
