'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  PageShell,
  SectionBox,
  SectionHeader,
  HeroBlue,
  CTABand,
} from '@/components/sections'

/* ═══════════════════════════════════════════════════════════════
   PROFIT CALCULATOR — Wise.com-style
   Big input → live output, side commentary explaining the math.
   Tier comparison as horizontal cards with per-tier accent color.
   All calc logic preserved from the prior implementation.
   ═══════════════════════════════════════════════════════════════ */

const TIERS = [
  { name: 'BASIC',    rate: 10.50, clientShare: 60,  min: 100,    max: 249.99,    accent: '#64748b', accentBg: 'rgba(100,116,139,0.08)' },
  { name: 'STANDARD', rate: 11.37, clientShare: 65,  min: 250,    max: 999.99,    accent: '#0891b2', accentBg: 'rgba(8,145,178,0.08)' },
  { name: 'COMFORT',  rate: 12.25, clientShare: 70,  min: 1000,   max: 2499.99,   accent: '#1b61c9', accentBg: 'rgba(27,97,201,0.08)' },
  { name: 'OPTIMAL',  rate: 13.12, clientShare: 75,  min: 2500,   max: 4999.99,   accent: '#7c3aed', accentBg: 'rgba(124,58,237,0.08)' },
  { name: 'BUSINESS', rate: 14.00, clientShare: 80,  min: 5000,   max: 9999.99,   accent: '#059669', accentBg: 'rgba(5,150,105,0.08)' },
  { name: 'VIP',      rate: 14.88, clientShare: 85,  min: 10000,  max: 24999.99,  accent: '#d97706', accentBg: 'rgba(217,119,6,0.08)' },
  { name: 'LUXURY',   rate: 15.75, clientShare: 90,  min: 25000,  max: 49999.99,  accent: '#dc2626', accentBg: 'rgba(220,38,38,0.08)' },
  { name: 'ULTIMATE', rate: 16.62, clientShare: 95,  min: 50000,  max: 99999.99,  accent: '#c026d3', accentBg: 'rgba(192,38,211,0.08)' },
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

function formatInt(n: number) {
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(n)
}

/* ── Inline icons ── */
function InfoIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
      <circle cx="12" cy="12" r="9" />
      <path strokeLinecap="round" d="M12 8h.01M11 12h1v4h1" />
    </svg>
  )
}

function AlertIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
    </svg>
  )
}

function ChevronDownIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  )
}

function TrendUpIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
    </svg>
  )
}

function LayersIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0 4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0-5.571 3-5.571-3" />
    </svg>
  )
}

function PieIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" />
    </svg>
  )
}

/* ── Style helpers ── */
const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: 'var(--text-caption)',
  fontWeight: 700,
  color: 'var(--color-text-weak)',
  marginBottom: '0.625rem',
  fontFamily: 'var(--font-display)',
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
}

const selectStyle: React.CSSProperties = {
  width: '100%',
  borderRadius: 'var(--radius-md)',
  border: '1.5px solid var(--color-border)',
  background: '#ffffff',
  padding: '0.9375rem 1.25rem',
  fontSize: 'var(--text-body)',
  color: '#181d26',
  outline: 'none',
  fontFamily: 'var(--font-body)',
  cursor: 'pointer',
  transition: 'border-color 150ms ease',
  appearance: 'none',
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

  const monthlyReturn = useMemo(() => amount * (tier.rate / 100), [amount, tier.rate])
  const totalReturn = amount + profit
  const roiPct = amount > 0 ? (profit / amount) * 100 : 0

  function handleAmountChange(val: string) {
    const num = parseFloat(val) || 0
    setAmount(num)
    setTierIndex(autoDetectTier(num))
  }

  return (
    <PageShell>

      {/* ── 1. HERO ── */}
      <HeroBlue
        eyebrow="EX-AI Bot ROI Estimator"
        title={<>See exactly what your<br />portfolio could earn.</>}
        description="Move the slider, pick a term — your projected return updates live. No sign-in required."
      />

      {/* ── 2. BIG INPUT → LIVE OUTPUT (Wise pattern) ── */}
      <SectionBox variant="white" padding="lg">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.35fr) minmax(0, 1fr)',
          gap: '3rem',
          alignItems: 'start',
        }}>

          {/* LEFT: Input + Live output */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
          >

            {/* OVERSIZED amount input — the hero element */}
            <div>
              <label style={labelStyle}>You invest</label>
              <div style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                background: '#ffffff',
                border: `2px solid ${tier.accent}`,
                borderRadius: '1rem',
                padding: '1.25rem 1.5rem',
                transition: 'border-color 200ms ease',
                boxShadow: `0 4px 24px ${tier.accentBg}`,
              }}>
                <input
                  type="number"
                  min="100"
                  max="99999"
                  value={amount || ''}
                  onChange={(e) => handleAmountChange(e.target.value)}
                  style={{
                    flex: 1,
                    minWidth: 0,
                    border: 'none',
                    outline: 'none',
                    background: 'transparent',
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(2rem, 5vw, 3.25rem)',
                    fontWeight: 800,
                    color: '#181d26',
                    letterSpacing: '-0.03em',
                    padding: 0,
                  }}
                />
                <span style={{
                  background: tier.accentBg,
                  color: tier.accent,
                  borderRadius: '0.5rem',
                  padding: '0.5rem 0.875rem',
                  fontSize: 'var(--text-caption)',
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  fontFamily: 'var(--font-display)',
                  flexShrink: 0,
                }}>
                  USDT
                </span>
              </div>

              {/* Tier badge under input */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginTop: '0.875rem', flexWrap: 'wrap' }}>
                <span style={{
                  background: tier.accent,
                  color: '#fff',
                  borderRadius: '0.5rem',
                  padding: '0.3125rem 0.75rem',
                  fontSize: 'var(--text-caption)',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  fontFamily: 'var(--font-display)',
                }}>
                  {tier.name} tier
                </span>
                <span style={{ fontSize: 'var(--text-caption)', color: 'var(--color-text-muted)' }}>
                  ~{tier.rate.toFixed(2)}% monthly · {tier.clientShare}% client share
                </span>
              </div>
            </div>

            {/* Term + Compound */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={labelStyle}>Investment term</label>
                <div style={{ position: 'relative' }}>
                  <select
                    value={termIndex}
                    onChange={(e) => setTermIndex(parseInt(e.target.value))}
                    style={selectStyle}
                  >
                    {TERMS.map((t, i) => (
                      <option key={t.label} value={i}>{t.label}</option>
                    ))}
                  </select>
                  <span style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)', pointerEvents: 'none' }}>
                    <ChevronDownIcon />
                  </span>
                </div>
              </div>

              <div>
                <label style={labelStyle}>Compound interest</label>
                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem',
                  height: '3.25rem',
                  background: '#ffffff',
                  border: '1.5px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  padding: '0 1rem',
                }}>
                  <span style={{ fontSize: 'var(--text-caption)', fontWeight: 600, color: !compound ? '#181d26' : 'var(--color-text-muted)' }}>Off</span>
                  <button
                    type="button"
                    onClick={() => setCompound(!compound)}
                    aria-label="Toggle compound interest"
                    style={{
                      position: 'relative',
                      display: 'inline-flex',
                      height: '1.625rem', width: '3rem',
                      flexShrink: 0,
                      alignItems: 'center',
                      borderRadius: '99px',
                      background: compound ? tier.accent : '#e0e2e6',
                      transition: 'background 200ms ease',
                      border: 'none',
                      cursor: 'pointer',
                      padding: 0,
                    }}
                  >
                    <span style={{
                      display: 'inline-block',
                      height: '1.375rem', width: '1.375rem',
                      borderRadius: '50%',
                      background: '#ffffff',
                      boxShadow: '0 1px 4px rgba(0,0,0,0.15)',
                      transform: compound ? 'translateX(1.5rem)' : 'translateX(0.125rem)',
                      transition: 'transform 200ms ease',
                    }} />
                  </button>
                  <span style={{ fontSize: 'var(--text-caption)', fontWeight: 600, color: compound ? '#181d26' : 'var(--color-text-muted)' }}>On</span>
                </div>
              </div>
            </div>

            {/* LIVE OUTPUT — the big number */}
            <motion.div
              key={`${amount}-${tierIndex}-${termIndex}-${compound}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              style={{
                background: '#ffffff',
                border: '1.5px solid var(--color-border)',
                borderTop: `4px solid ${tier.accent}`,
                borderRadius: '1rem',
                padding: '1.75rem 1.75rem 1.5rem',
              }}
            >
              <div style={{ fontSize: 'var(--text-caption)', fontWeight: 700, color: 'var(--color-text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '0.5rem', fontFamily: 'var(--font-display)' }}>
                You receive
              </div>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                fontWeight: 800,
                color: tier.accent,
                letterSpacing: '-0.035em',
                lineHeight: 1.05,
              }}>
                {formatNumber(totalReturn)}
                <span style={{ fontSize: '1.25rem', fontWeight: 600, opacity: 0.6, marginLeft: '0.625rem' }}>USDT</span>
              </div>
              <div style={{ marginTop: '0.875rem', fontSize: 'var(--text-body)', color: 'var(--color-text-weak)' }}>
                {formatNumber(amount)} invested · <strong style={{ color: '#059669' }}>+{formatNumber(profit)}</strong> profit over {term.label}
                {compound && <span style={{ color: 'var(--color-text-muted)' }}> · compounded monthly</span>}
              </div>

              {/* Mini breakdown row */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '0.75rem',
                marginTop: '1.25rem',
                paddingTop: '1.25rem',
                borderTop: '1px solid var(--color-border-light)',
              }}>
                {[
                  { label: 'Monthly', value: `~${formatInt(monthlyReturn)}` },
                  { label: 'Your share', value: `${tier.clientShare}%` },
                  { label: 'ROI', value: `${roiPct.toFixed(1)}%` },
                ].map((s) => (
                  <div key={s.label}>
                    <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{s.label}</div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.125rem', fontWeight: 700, color: '#181d26', marginTop: '0.125rem' }}>{s.value}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <Link
              href="/signup"
              style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                width: '100%',
                background: 'linear-gradient(135deg, #2563eb 0%, #1b61c9 100%)',
                color: '#ffffff',
                padding: '1.125rem',
                borderRadius: 'var(--radius-btn)',
                fontFamily: 'var(--font-display)', fontWeight: 700,
                fontSize: 'var(--text-body-lg)',
                textDecoration: 'none',
                boxShadow: '0 4px 20px rgba(27,97,201,0.4)',
                letterSpacing: '0.01em',
                transition: 'box-shadow 150ms ease, transform 150ms ease',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 28px rgba(27,97,201,0.55)'
                ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(27,97,201,0.4)'
                ;(e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
              }}
            >
              Begin onboarding →
            </Link>
          </motion.div>

          {/* RIGHT: Side commentary explaining the math (Wise pattern) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
          >
            <div style={{ marginBottom: '0.25rem' }}>
              <div style={{ fontSize: 'var(--text-caption)', fontWeight: 700, color: tier.accent, letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'var(--font-display)' }}>
                How this is calculated
              </div>
              <h3 className="text-display-sm" style={{ color: '#181d26', marginTop: '0.5rem', marginBottom: 0 }}>
                Three things drive your return.
              </h3>
            </div>

            {[
              {
                Icon: LayersIcon,
                title: 'Your tier sets the rate',
                body: <>The bot routes capital through different liquidity pools by deposit size. Larger deposits unlock deeper pools — that\u0027s why <strong style={{ color: tier.accent }}>{tier.name}</strong> earns ~{tier.rate.toFixed(2)}% monthly while BASIC earns ~10.50%.</>,
              },
              {
                Icon: PieIcon,
                title: 'Your share is fixed by tier',
                body: <>The bot keeps the rest as a performance fee. At <strong style={{ color: tier.accent }}>{tier.name}</strong> you keep <strong>{tier.clientShare}%</strong> of every cycle\u0027s profit. The higher your tier, the bigger your slice.</>,
              },
              {
                Icon: TrendUpIcon,
                title: compound ? 'Compounding accelerates growth' : 'Simple interest pays out monthly',
                body: compound
                  ? <>Each month\u0027s profit is reinvested into the next month\u0027s base. Over <strong>{term.label}</strong>, your <strong>{formatNumber(amount)}</strong> compounds to <strong style={{ color: tier.accent }}>{formatNumber(totalReturn)}</strong> USDT.</>
                  : <>Profit is calculated on your original <strong>{formatNumber(amount)}</strong> every cycle and paid out — no reinvestment. Over <strong>{term.label}</strong> that\u0027s a flat <strong style={{ color: tier.accent }}>{formatNumber(profit)}</strong> USDT in profit.</>,
              },
            ].map((card, i) => (
              <div key={i} style={{
                background: '#f8fafc',
                border: '1px solid var(--color-border-light)',
                borderRadius: '0.875rem',
                padding: '1.25rem 1.375rem',
                display: 'flex',
                gap: '0.875rem',
                alignItems: 'flex-start',
              }}>
                <span style={{
                  flexShrink: 0,
                  width: '2.25rem', height: '2.25rem',
                  borderRadius: '0.625rem',
                  background: tier.accentBg,
                  color: tier.accent,
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <card.Icon className="w-5 h-5" />
                </span>
                <div>
                  <div style={{ fontSize: 'var(--text-body)', fontWeight: 700, color: '#181d26', marginBottom: '0.25rem', fontFamily: 'var(--font-display)' }}>
                    {card.title}
                  </div>
                  <p style={{ fontSize: '0.9375rem', lineHeight: 1.55, color: 'var(--color-text-weak)', margin: 0 }}>
                    {card.body}
                  </p>
                </div>
              </div>
            ))}

            {/* Disclaimer */}
            <div style={{
              background: 'rgba(245,158,11,0.06)',
              border: '1px solid rgba(245,158,11,0.22)',
              borderRadius: '0.75rem',
              padding: '0.875rem 1rem',
              display: 'flex',
              gap: '0.625rem',
              alignItems: 'flex-start',
              color: 'rgba(180,120,0,0.95)',
            }}>
              <span style={{ flexShrink: 0, marginTop: '0.125rem' }}><AlertIcon className="w-4 h-4" /></span>
              <p style={{ fontSize: '0.75rem', lineHeight: 1.6, margin: 0 }}>
                Estimates use the EX-AI Bot&apos;s historical monthly performance band. Real returns vary with market
                conditions. Past performance does not guarantee future results — never invest more than you can afford to lose.
              </p>
            </div>
          </motion.div>

        </div>
      </SectionBox>

      {/* ── 3. TIER COMPARISON — horizontal cards w/ per-tier accent ── */}
      <SectionBox variant="surface" padding="lg">
        <SectionHeader
          eyebrow="The 8 tiers"
          title={<>One bot, eight tiers.<br />Pick the one your capital unlocks.</>}
        >
          Each tier corresponds to a deposit range. The bot auto-routes you the moment your balance crosses a threshold — no manual upgrade needed.
        </SectionHeader>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 14rem), 1fr))',
          gap: '1rem',
          marginTop: '1rem',
        }}>
          {TIERS.map((t, i) => {
            const active = i === tierIndex
            return (
              <motion.button
                key={t.name}
                onClick={() => {
                  setTierIndex(i)
                  if (amount < t.min) setAmount(t.min)
                }}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                whileHover={{ y: -4 }}
                style={{
                  textAlign: 'left',
                  background: active ? t.accentBg : '#ffffff',
                  border: active ? `2px solid ${t.accent}` : '1.5px solid var(--color-border)',
                  borderTop: `4px solid ${t.accent}`,
                  borderRadius: '0.875rem',
                  padding: '1.25rem',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-display)',
                  transition: 'background 150ms ease, border-color 150ms ease, box-shadow 150ms ease',
                  boxShadow: active ? `0 8px 24px ${t.accentBg}` : '0 2px 8px rgba(24,29,38,0.04)',
                }}
              >
                <div style={{
                  display: 'inline-block',
                  background: t.accent,
                  color: '#fff',
                  fontSize: '0.6875rem',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  padding: '0.25rem 0.625rem',
                  borderRadius: '0.375rem',
                  marginBottom: '0.875rem',
                }}>
                  {t.name}
                </div>
                <div style={{
                  fontSize: '1.875rem',
                  fontWeight: 800,
                  color: t.accent,
                  letterSpacing: '-0.025em',
                  lineHeight: 1,
                }}>
                  {t.rate.toFixed(2)}%
                </div>
                <div style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--color-text-muted)', marginTop: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  monthly · {t.clientShare}% your share
                </div>
                <div style={{
                  marginTop: '1rem',
                  paddingTop: '0.875rem',
                  borderTop: '1px dashed var(--color-border)',
                  fontSize: '0.8125rem',
                  color: 'var(--color-text-weak)',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 500,
                }}>
                  {`$${formatInt(t.min)} – $${formatInt(t.max)}`}
                </div>
              </motion.button>
            )
          })}
        </div>

        {/* Helper note under tiers */}
        <div style={{
          marginTop: '1.75rem',
          display: 'flex',
          gap: '0.625rem',
          alignItems: 'flex-start',
          background: '#ffffff',
          border: '1px solid var(--color-border-light)',
          borderRadius: '0.75rem',
          padding: '0.875rem 1rem',
          color: 'var(--color-text-weak)',
        }}>
          <span style={{ flexShrink: 0, marginTop: '0.125rem', color: '#1b61c9' }}><InfoIcon className="w-4 h-4" /></span>
          <p style={{ fontSize: '0.875rem', lineHeight: 1.55, margin: 0 }}>
            Click any tier to preview its math above. Your live tier is auto-detected from the amount you enter — you don&apos;t pick it manually when funding for real.
          </p>
        </div>
      </SectionBox>

      {/* ── 4. FULL BREAKDOWN — detail table for current selection ── */}
      <SectionBox variant="white" padding="lg">
        <SectionHeader
          eyebrow="Full breakdown"
          title={<>Your {tier.name} projection,<br />line by line.</>}
          align="left"
          maxWidth="42rem"
          marginBottom="2.5rem"
        >
          Every figure below updates from the inputs above. Use it as a sanity check — the math is intentionally boring.
        </SectionHeader>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 16rem), 1fr))',
          gap: '1rem',
        }}>
          {[
            { label: 'You invest',          value: `${formatNumber(amount)} USDT`,                     color: '#181d26' },
            { label: 'Tier rate',           value: `~${tier.rate.toFixed(2)}% monthly`,                color: tier.accent },
            { label: 'Your share',          value: `${tier.clientShare}%`,                              color: tier.accent },
            { label: 'Term',                value: term.label,                                          color: '#181d26' },
            { label: 'Mode',                value: compound ? 'Compounding' : 'Simple',                 color: '#181d26' },
            { label: 'Monthly profit (est)', value: `~${formatNumber(monthlyReturn)} USDT`,             color: '#059669' },
            { label: 'Total profit',        value: `${formatNumber(profit)} USDT`,                     color: '#059669' },
            { label: 'Total return',        value: `${formatNumber(totalReturn)} USDT`,                color: '#059669' },
            { label: 'ROI over term',       value: `${roiPct.toFixed(2)}%`,                            color: '#059669' },
          ].map((row) => (
            <div key={row.label} style={{
              background: '#f8fafc',
              border: '1px solid var(--color-border-light)',
              borderRadius: '0.75rem',
              padding: '1rem 1.125rem',
            }}>
              <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.375rem' }}>
                {row.label}
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.375rem', fontWeight: 800, color: row.color, letterSpacing: '-0.015em' }}>
                {row.value}
              </div>
            </div>
          ))}
        </div>
      </SectionBox>

      {/* ── 5. CLOSING CTA ── */}
      <CTABand
        eyebrow="Ready to put it on autopilot?"
        title={<>The bot does the trading.<br />You do the watching.</>}
        description="Start with $100 in the BASIC tier or scale straight into ULTIMATE — same onboarding either way."
        ctas={[
          { label: 'Begin onboarding →', href: '/signup' },
          { label: 'Read the FAQs', href: '/faqs', variant: 'ghost' },
        ]}
      />

    </PageShell>
  )
}
