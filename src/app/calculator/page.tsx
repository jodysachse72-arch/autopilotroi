'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

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

/* ── Shared card style ── */
const cardStyle: React.CSSProperties = {
  background: '#ffffff',
  border: '1px solid var(--color-border)',
  borderRadius: 'var(--radius-card)',
  padding: '1.5rem',
}

/* ── Input style ── */
const inputStyle: React.CSSProperties = {
  width: '100%',
  borderRadius: 'var(--radius-md)',
  border: '1.5px solid var(--color-border)',
  background: '#ffffff',
  padding: '0.9375rem 1.25rem',
  fontSize: 'var(--text-body)',
  color: '#181d26',
  outline: 'none',
  fontFamily: 'var(--font-body)',
  transition: 'border-color 150ms ease',
}

/* ── Select style ── */
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

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: 'var(--text-caption)',
  fontWeight: 700,
  color: 'var(--color-text-weak)',
  marginBottom: '0.5rem',
  fontFamily: 'var(--font-display)',
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
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
    <div className="page-bg">
      <div className="sections-stack">

        {/* ── Hero header ── */}
        <section className="section-box">
          <div className="container-xl section-padding">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span className="text-label" style={{
                display: 'inline-block',
                background: 'rgba(27,97,201,0.08)',
                color: '#1b61c9',
                border: '1px solid rgba(27,97,201,0.15)',
                borderRadius: '99px',
                padding: '0.375rem 1rem',
                marginBottom: '1.25rem',
              }}>
                EX-AI Bot ROI Estimator
              </span>
              <h1 className="text-display" style={{ color: '#181d26', marginBottom: '0.75rem' }}>
                Profit Calculator
              </h1>
              <p className="text-body-lg" style={{
                color: 'var(--color-text-weak)',
                maxWidth: '36rem',
                lineHeight: 'var(--lh-relaxed)',
              }}>
                Calculate your potential earnings by investing in AURUM EX-AI Bot.
                Choose the investment amount and term to see your returns.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── Calculator body ── */}
        <section className="section-box">
          <div className="container-xl section-padding">
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 28rem), 1fr))',
              gap: '2rem',
              alignItems: 'start',
            }}>

              {/* ─── LEFT: Inputs ─── */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
              >

                {/* Investment Amount */}
                <div>
                  <label style={labelStyle}>Investment Amount</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="number"
                      min="100"
                      max="99999"
                      value={amount || ''}
                      onChange={(e) => handleAmountChange(e.target.value)}
                      style={{ ...inputStyle, paddingRight: '5rem', fontSize: '1.25rem', fontWeight: 700 }}
                      onFocus={e  => (e.target.style.borderColor = '#1b61c9')}
                      onBlur={e   => (e.target.style.borderColor = 'var(--color-border)')}
                    />
                    <span style={{
                      position: 'absolute', right: '0.875rem', top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'rgba(27,97,201,0.08)',
                      border: '1px solid rgba(27,97,201,0.2)',
                      borderRadius: '0.5rem',
                      padding: '0.25rem 0.625rem',
                      fontSize: 'var(--text-caption)',
                      fontWeight: 700,
                      color: '#1b61c9',
                    }}>
                      USDT
                    </span>
                  </div>
                </div>

                {/* Tier Selector */}
                <div>
                  <label style={labelStyle}>Select Tier (or auto-detect from amount)</label>
                  <div style={{ position: 'relative' }}>
                    <select
                      value={tierIndex}
                      onChange={(e) => setTierIndex(parseInt(e.target.value))}
                      style={selectStyle}
                      onFocus={e  => (e.target.style.borderColor = '#1b61c9')}
                      onBlur={e   => (e.target.style.borderColor = 'var(--color-border)')}
                    >
                      <option value="" disabled>— Auto-detect from amount —</option>
                      {TIERS.map((t, i) => (
                        <option key={t.name} value={i}>
                          {t.name} · ~{t.rate.toFixed(2)}% monthly · ${t.min.toLocaleString()}–${t.max.toLocaleString()} USDT
                        </option>
                      ))}
                    </select>
                    {/* chevron */}
                    <svg style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', width: '1rem', height: '1rem', color: 'var(--color-text-muted)', pointerEvents: 'none' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>

                  {/* Tier badge */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginTop: '0.625rem' }}>
                    <span style={{
                      background: '#1b61c9', color: '#fff',
                      borderRadius: '0.5rem',
                      padding: '0.25rem 0.625rem',
                      fontSize: 'var(--text-caption)',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                    }}>
                      {tier.name} Tier
                    </span>
                    <span style={{ fontSize: 'var(--text-caption)', color: 'var(--color-text-muted)' }}>
                      ~{tier.rate.toFixed(2)}% monthly · {tier.clientShare}% client share
                    </span>
                  </div>
                </div>

                {/* Term + Compound Row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={labelStyle}>Investment Term</label>
                    <div style={{ position: 'relative' }}>
                      <select
                        value={termIndex}
                        onChange={(e) => setTermIndex(parseInt(e.target.value))}
                        style={selectStyle}
                        onFocus={e  => (e.target.style.borderColor = '#1b61c9')}
                        onBlur={e   => (e.target.style.borderColor = 'var(--color-border)')}
                      >
                        {TERMS.map((t, i) => (
                          <option key={t.label} value={i}>{t.label}</option>
                        ))}
                      </select>
                      <svg style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', width: '1rem', height: '1rem', color: 'var(--color-text-muted)', pointerEvents: 'none' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>

                  <div>
                    <label style={labelStyle}>Compound Interest</label>
                    <div style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem',
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
                        style={{
                          position: 'relative',
                          display: 'inline-flex',
                          height: '1.625rem', width: '3rem',
                          flexShrink: 0,
                          alignItems: 'center',
                          borderRadius: '99px',
                          background: compound ? '#1b61c9' : '#e0e2e6',
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

                {/* ── Result Card ── */}
                <motion.div
                  key={`${amount}-${tierIndex}-${termIndex}-${compound}`}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    background: 'rgba(5,150,105,0.04)',
                    border: '1.5px solid rgba(5,150,105,0.2)',
                    borderRadius: 'var(--radius-card)',
                    padding: '1.5rem',
                  }}
                >
                  <div style={{ fontSize: 'var(--text-caption)', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: '0.375rem' }}>
                    Total Profit:
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(2rem,4vw,3rem)',
                    fontWeight: 800,
                    color: '#059669',
                    letterSpacing: '-0.03em',
                    lineHeight: 1.1,
                  }}>
                    {formatNumber(profit)}
                    <span style={{ fontSize: '1.25rem', fontWeight: 600, color: 'rgba(5,150,105,0.6)', marginLeft: '0.5rem' }}>USDT</span>
                  </div>
                  <div style={{ marginTop: '0.5rem', fontSize: 'var(--text-caption)', color: 'var(--color-text-muted)' }}>
                    Based on {tier.name} tier · ~{tier.rate.toFixed(2)}% monthly return
                    {compound && ' · Compounded'}
                  </div>
                  <p style={{ marginTop: '1rem', fontSize: '0.6875rem', lineHeight: 1.6, color: 'rgba(24,29,38,0.38)' }}>
                    ⚠ Projected returns are based on the EX-AI Bot&apos;s historical average performance and may fluctuate.
                    Actual results depend on market conditions. Past performance does not guarantee future results.
                  </p>
                </motion.div>

                {/* CTA button */}
                <Link
                  href="/signup"
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.375rem',
                    width: '100%',
                    background: 'linear-gradient(135deg, #2563eb 0%, #1b61c9 100%)',
                    color: '#ffffff',
                    padding: '1rem',
                    borderRadius: 'var(--radius-btn)',
                    fontFamily: 'var(--font-display)', fontWeight: 700,
                    fontSize: 'var(--text-body)',
                    textDecoration: 'none',
                    boxShadow: '0 4px 20px rgba(27,97,201,0.4)',
                    letterSpacing: '0.01em',
                    transition: 'box-shadow 150ms ease, transform 150ms ease',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 28px rgba(27,97,201,0.55)'
                    ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(27,97,201,0.4)'
                    ;(e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
                  }}
                >
                  Try Now →
                </Link>
              </motion.div>

              {/* ─── RIGHT: Tier Grid + Breakdown ─── */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
              >
                {/* Quick Stats — Investment Breakdown at top */}
                <div style={cardStyle}>
                  <h3 style={{
                    fontSize: 'var(--text-caption)',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: '#1b61c9',
                    marginBottom: '1rem',
                    fontFamily: 'var(--font-display)',
                  }}>
                    Your Investment Breakdown
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {[
                      { label: 'Monthly Return',   value: `~${formatNumber(amount * tier.rate / 100)} USDT`, green: true },
                      { label: 'Your Share',        value: `${tier.clientShare}%`,                           blue: true },
                      { label: 'Duration',          value: term.label,                                        green: false, blue: false },
                      { label: 'Total Investment',  value: `${formatNumber(amount)} USDT`,                   green: false, blue: false },
                      { label: 'Total Return',      value: `${formatNumber(amount + profit)} USDT`,          green: true },
                      { label: 'ROI',               value: `${formatNumber((profit / amount) * 100)}%`,      green: true },
                    ].map((item) => (
                      <div key={item.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border-light)', paddingBottom: '0.625rem' }}>
                        <span style={{ fontSize: 'var(--text-body)', color: 'var(--color-text-muted)' }}>{item.label}</span>
                        <span style={{
                          fontSize: 'var(--text-body)',
                          fontWeight: 700,
                          color: item.green ? '#059669' : item.blue ? '#1b61c9' : '#181d26',
                          fontFamily: 'var(--font-display)',
                        }}>{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Why Tiers — moved below breakdown */}
                <div style={cardStyle}>
                  <h3 style={{
                    fontSize: 'var(--text-caption)',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: '#1b61c9',
                    marginBottom: '0.75rem',
                    fontFamily: 'var(--font-display)',
                  }}>
                    Why Tiers?
                  </h3>
                  <p style={{ fontSize: 'var(--text-body)', lineHeight: 'var(--lh-relaxed)', color: 'var(--color-text-weak)' }}>
                    The more capital you deploy, the more trading volume the EX-AI Bot can execute — and the
                    greater share of returns you receive. Larger deposits unlock deeper market access, enabling
                    the bot to compound gains at a higher rate.
                  </p>

                  {/* Tier grid */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginTop: '1.25rem' }}>
                    {TIERS.map((t, i) => (
                      <button
                        key={t.name}
                        onClick={() => setTierIndex(i)}
                        style={{
                          borderRadius: '0.625rem',
                          padding: '0.625rem 0.75rem',
                          textAlign: 'left',
                          fontSize: 'var(--text-caption)',
                          fontWeight: 600,
                          background: i === tierIndex ? '#1b61c9' : '#f8fafc',
                          color: i === tierIndex ? '#ffffff' : 'var(--color-text-weak)',
                          border: i === tierIndex ? '1.5px solid #1b61c9' : '1.5px solid var(--color-border)',
                          cursor: 'pointer',
                          transition: 'all 150ms ease',
                          fontFamily: 'var(--font-display)',
                        }}
                      >
                        <div style={{ fontWeight: 700 }}>{t.name}</div>
                        <div style={{ fontSize: '0.6875rem', marginTop: '0.125rem', opacity: 0.75 }}>
                          ~{t.rate.toFixed(2)}%
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Disclaimer */}
                <div style={{
                  background: 'rgba(245,158,11,0.05)',
                  border: '1px solid rgba(245,158,11,0.2)',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.875rem 1rem',
                }}>
                  <p style={{ fontSize: '0.6875rem', lineHeight: 1.65, color: 'rgba(180,120,0,0.75)' }}>
                    <strong>Important:</strong> This calculator provides estimates based on historical EX-AI Bot returns.
                    Cryptocurrency trading involves risk. Never invest more than you can afford to lose.
                    Past performance is not indicative of future results.
                  </p>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

      </div>
    </div>
  )
}
