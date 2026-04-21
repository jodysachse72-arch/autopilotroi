'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

/* ════════════════════════════════════════════════════════════════
   WHAT IS AURUM — Products & Trust Page
   Page order:
   1. Hero — What is Aurum (company overview)
   2. Why We Chose Aurum (trust signals, credentials, reasoning)
   3. Key Facts strip
   4. The Product Suite (cards)
   5. CTA Band
   ════════════════════════════════════════════════════════════════ */

// ── Why We Chose Aurum — trust signals ──────────────────────────
const trustReasons = [
  {
    icon: '🏛️',
    title: 'Legally Registered in Hong Kong',
    body: 'Aurum Foundation Limited was officially incorporated in Hong Kong on November 7, 2024 under the Companies Ordinance — one of the world\'s most respected regulatory environments for fintech. Certificate No. 77289699-000-11-24-6.',
  },
  {
    icon: '🪪',
    title: '3 International Licenses',
    body: 'Aurum holds three internationally recognized operating licenses, allowing it to legally offer financial services and crypto-related products to clients globally. This is not a grey-market operation.',
  },
  {
    icon: '👔',
    title: 'Leadership With Proven Track Records',
    body: 'CEO Bryan Benson previously led Binance\'s expansion across Latin America and worked at Morgan Stanley. Co-founder Drei Menza leads AI trading strategy. These are not anonymous founders — they are public, verified, and accountable.',
  },
  {
    icon: '📰',
    title: 'Covered by Major Media',
    body: 'Aurum has been featured across Forbes, Entrepreneur, Benzinga, Cointelegraph, Bitcoin.com, Crypto.news, Binance, Bitget, and MEXC — independently recognized as institutional-grade financial infrastructure.',
  },
  {
    icon: '🤝',
    title: 'Exchange Partnerships',
    body: 'Aurum operates under formal contracts with leading exchanges including Binance, Bybit, and KuCoin. These are legally binding, compliance-reviewed agreements — not informal affiliate relationships.',
  },
  {
    icon: '💡',
    title: 'We Did the Homework So You Don\'t Have To',
    body: 'Before recommending Aurum to anyone, we independently verified the registration, leadership backgrounds, license numbers, and media coverage. We would not stake our reputation — or yours — on something we hadn\'t fully vetted.',
  },
]

// ── Key facts strip ──────────────────────────────────────────────
const STATS = [
  { num: '18K+',  label: 'Active Partners Worldwide' },
  { num: '$30M',  label: 'Assets Under Management' },
  { num: '3',     label: 'International Licenses' },
  { num: '2024',  label: 'Founded & Incorporated' },
]

// ── Products ─────────────────────────────────────────────────────
const products = [
  {
    id: 'bots',
    name: 'EX-AI Trading Bot',
    tagline: 'AI-Managed Liquidity Engine',
    description: 'Machine-learning algorithms execute trades 24/7 across Binance, Bybit, and KuCoin — detecting mid-term opportunities and rebalancing in real time. Zero manual input required.',
    features: ['24/7 automated execution', 'Multi-exchange arbitrage', 'AI-optimized entry/exit', 'Real-time portfolio rebalancing'],
    badge: 'Flagship', badgeColor: '#1b61c9', icon: '🤖',
  },
  {
    id: 'zeus',
    name: 'Zeus AI Bot',
    tagline: 'Institutional-Grade Capital Growth',
    description: 'Higher-tier liquidity management with advanced algorithmic strategies. Zeus operates with larger capital pools for institutional-grade execution and priority support.',
    features: ['Advanced algorithmic strategies', 'Higher capital tier entry', 'Institutional-grade execution', 'Priority support channel'],
    badge: 'Pro Tier', badgeColor: '#7c3aed', icon: '⚡',
  },
  {
    id: 'flash-loans',
    name: 'Flash Loans',
    tagline: 'Instant DeFi Capital Access',
    description: 'Access instant capital through DeFi flash loan mechanisms. Designed for short-duration, high-volume transactions within a single block — no collateral required.',
    features: ['Instantaneous execution', 'No collateral required', 'DeFi-native architecture', 'Smart contract secured'],
    badge: null, badgeColor: '', icon: '💡',
  },
  {
    id: 'exchange',
    name: 'Aurum Exchange',
    tagline: 'Next-Gen Crypto Exchange',
    description: 'A full-featured cryptocurrency exchange with deep liquidity, advanced order types, institutional-grade security, and seamless ecosystem integration.',
    features: ['Deep liquidity pools', 'Advanced order types', 'Institutional-grade security', '200+ trading pairs'],
    badge: null, badgeColor: '', icon: '📈',
  },
  {
    id: 'neobank',
    name: 'NeoBank',
    tagline: 'Web 3.0 Banking Infrastructure',
    description: 'A Web 3.0 bank for secure, private management of crypto and fiat assets. Seamless integration between traditional and decentralised finance — one app, one account.',
    features: ['Crypto + fiat unified', 'Store, earn, and spend', 'Global SWIFT & SEPA', 'Privacy-first design'],
    badge: 'Coming Soon', badgeColor: '#0ea5e9', icon: '🏦',
  },
  {
    id: 'cards',
    name: 'Crypto Cards',
    tagline: 'Spend Crypto Anywhere',
    description: 'Premium crypto debit cards powered by Visa. Spend your crypto earnings at 80M+ merchants globally, withdraw from ATMs, and manage everything from your app.',
    features: ['Visa-powered cards', '4 tiers: Nova → Infinity', 'ATM withdrawals worldwide', 'Instant crypto-to-fiat'],
    badge: null, badgeColor: '', icon: '💳',
  },
  {
    id: 'token',
    name: 'AUR Token',
    tagline: 'Ecosystem Utility Token',
    description: 'The native utility token powering the entire ecosystem. Used for governance voting, staking rewards, fee discounts, and premium feature access across all products.',
    features: ['Governance voting rights', 'Staking rewards', 'Fee discounts across platform', 'Premium tier access'],
    badge: null, badgeColor: '', icon: '🪙',
  },
  {
    id: 'subscription',
    name: 'Subscription Tiers',
    tagline: 'All-Access Membership',
    description: 'Membership tiers that unlock progressive levels of the ecosystem. From basic bot access to full-suite institutional features and partner program access.',
    features: ['Tiered membership levels', 'Progressive feature unlock', 'Partner program access', 'Priority support channels'],
    badge: null, badgeColor: '', icon: '🎯',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
}

export default function WhatIsAurumPage() {
  return (
    <div className="page-bg">
      <div className="sections-stack">

        {/* ── 1. HERO — What Is Aurum ── */}
        <section className="section-box" style={{ borderBottom: '1px solid var(--color-border)' }}>
          <div className="container-xl section-padding">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{ maxWidth: '56rem', margin: '0 auto' }}
            >
              <span style={{
                display: 'inline-block',
                background: 'rgba(27,97,201,0.08)',
                color: '#1b61c9',
                border: '1px solid rgba(27,97,201,0.15)',
                borderRadius: '99px',
                padding: '0.375rem 1rem',
                fontSize: 'var(--text-label)',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: '1.5rem',
              }}>
                What Is Aurum
              </span>

              <h1 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 5vw, 3.25rem)',
                fontWeight: 800,
                color: '#181d26',
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
                marginBottom: '1.5rem',
              }}>
                A Complete Financial Ecosystem<br />
                <span style={{ color: '#1b61c9' }}>Built on AI and Blockchain</span>
              </h1>

              <p style={{
                fontSize: 'var(--text-body-lg)',
                color: 'var(--color-text-weak)',
                lineHeight: 'var(--lh-relaxed)',
                maxWidth: '44rem',
                marginBottom: '2rem',
              }}>
                Aurum Foundation is a legally registered financial technology company headquartered in Hong Kong.
                They combine AI-driven trading bots, a full-featured cryptocurrency exchange, a Web 3.0 NeoBank,
                and crypto debit cards into a single, unified ecosystem — designed to let everyday people
                participate in institutional-grade capital management.
              </p>

              <p style={{
                fontSize: 'var(--text-body-lg)',
                color: 'var(--color-text-weak)',
                lineHeight: 'var(--lh-relaxed)',
                maxWidth: '44rem',
                marginBottom: '2.5rem',
              }}>
                The core product is the <strong style={{ color: '#181d26' }}>EX-AI Bot</strong> — an AI-powered
                liquidity management system that trades 24/7 across Binance, Bybit, and KuCoin without requiring
                manual input. Members choose a subscription tier, deposit USDC or USDT, and the bot generates
                returns around the clock. The wider ecosystem — exchange, NeoBank, cards, and AUR token — all
                plug into the same back office.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.875rem' }}>
                <Link href="/signup" style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.375rem',
                  background: 'linear-gradient(135deg, #2563eb 0%, #1b61c9 100%)',
                  color: '#ffffff',
                  padding: '0.875rem 2rem',
                  borderRadius: 'var(--radius-btn)',
                  fontFamily: 'var(--font-display)', fontWeight: 700,
                  fontSize: 'var(--text-body)',
                  textDecoration: 'none',
                  boxShadow: '0 4px 16px rgba(27,97,201,0.35)',
                }}>
                  Start Here →
                </Link>
                <Link href="/calculator" style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.375rem',
                  background: '#fff',
                  border: '1.5px solid var(--color-border)',
                  color: '#181d26',
                  padding: '0.875rem 2rem',
                  borderRadius: 'var(--radius-btn)',
                  fontFamily: 'var(--font-display)', fontWeight: 600,
                  fontSize: 'var(--text-body)',
                  textDecoration: 'none',
                }}>
                  Calculate Your Returns →
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── 2. KEY STATS STRIP ── */}
        <section style={{ background: '#1b61c9' }}>
          <div className="container-xl" style={{ padding: '2.25rem 1.5rem' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(8rem, 1fr))',
              gap: '1rem',
              textAlign: 'center',
            }}>
              {STATS.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.4 }}
                  style={{ padding: '0.5rem' }}
                >
                  <div style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
                    fontWeight: 800,
                    color: '#ffffff',
                    letterSpacing: '-0.03em',
                    lineHeight: 1,
                  }}>
                    {s.num}
                  </div>
                  <div style={{
                    fontSize: 'var(--text-body)',
                    color: 'rgba(255,255,255,0.72)',
                    marginTop: '0.375rem',
                    fontWeight: 500,
                  }}>
                    {s.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 3. WHY WE CHOSE AURUM ── */}
        <section className="section-box">
          <div className="container-xl section-padding">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              style={{ textAlign: 'center', maxWidth: '44rem', margin: '0 auto 3rem' }}
            >
              <span style={{
                display: 'inline-block',
                background: 'rgba(27,97,201,0.08)',
                color: '#1b61c9',
                border: '1px solid rgba(27,97,201,0.15)',
                borderRadius: '99px',
                padding: '0.375rem 1rem',
                fontSize: 'var(--text-label)',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: '1.25rem',
              }}>
                Our Vetting Process
              </span>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)',
                fontWeight: 800,
                color: '#181d26',
                letterSpacing: '-0.03em',
                marginBottom: '1rem',
              }}>
                Why We Chose Aurum
              </h2>
              <p style={{
                fontSize: 'var(--text-body-lg)',
                color: 'var(--color-text-weak)',
                lineHeight: 'var(--lh-relaxed)',
              }}>
                We don&apos;t recommend platforms we haven&apos;t thoroughly investigated. Here is exactly
                what we looked at — and what we found — before endorsing Aurum to our network.
              </p>
            </motion.div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 22rem), 1fr))',
              gap: '1.25rem',
            }}>
              {trustReasons.map((reason, i) => (
                <motion.div
                  key={reason.title}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    background: '#ffffff',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-card)',
                    padding: '1.75rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.875rem',
                    transition: 'box-shadow 200ms ease, transform 200ms ease',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-card-hover)'
                    ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.boxShadow = 'none'
                    ;(e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
                  }}
                >
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: '0.875rem',
                  }}>
                    <div style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      width: '3rem', height: '3rem', flexShrink: 0,
                      background: 'rgba(27,97,201,0.08)',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '1.375rem',
                    }}>
                      {reason.icon}
                    </div>
                    <h3 style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'var(--text-subheading)',
                      fontWeight: 700,
                      color: '#181d26',
                      letterSpacing: '-0.01em',
                    }}>
                      {reason.title}
                    </h3>
                  </div>
                  <p style={{
                    fontSize: 'var(--text-body)',
                    color: 'var(--color-text-weak)',
                    lineHeight: 'var(--lh-relaxed)',
                  }}>
                    {reason.body}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Disclaimer note */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              style={{
                marginTop: '2.5rem',
                padding: '1.25rem 1.5rem',
                background: 'rgba(27,97,201,0.04)',
                border: '1px solid rgba(27,97,201,0.12)',
                borderRadius: 'var(--radius-card)',
                display: 'flex',
                gap: '0.875rem',
                alignItems: 'flex-start',
              }}
            >
              <span style={{ fontSize: '1.25rem', flexShrink: 0, marginTop: '0.1rem' }}>⚠️</span>
              <p style={{ fontSize: 'var(--text-body)', color: 'var(--color-text-weak)', lineHeight: 'var(--lh-relaxed)' }}>
                <strong style={{ color: '#181d26' }}>Important:</strong> All investment activity carries risk.
                Aurum&apos;s track record and credentials do not guarantee future returns. We recommend starting
                with only what you can comfortably allocate to a higher-risk asset class, and reading the
                full <Link href="/disclaimer" style={{ color: '#1b61c9', textDecoration: 'underline' }}>risk disclaimer</Link> before making any deposit.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── 4. PRODUCT SUITE ── */}
        <section className="section-box" style={{ background: '#f4f6fb' }}>
          <div className="container-xl section-padding">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              style={{ textAlign: 'center', maxWidth: '44rem', margin: '0 auto 3rem' }}
            >
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)',
                fontWeight: 800,
                color: '#181d26',
                letterSpacing: '-0.03em',
                marginBottom: '1rem',
              }}>
                The Aurum Product Suite
              </h2>
              <p style={{
                fontSize: 'var(--text-body-lg)',
                color: 'var(--color-text-weak)',
                lineHeight: 'var(--lh-relaxed)',
              }}>
                Eight integrated products — from AI trading bots to a full Web 3.0 bank — all connected
                through a single back office and powered by the AUR token.
              </p>
            </motion.div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 26rem), 1fr))',
              gap: '1.25rem',
            }}>
              {products.map((product, i) => (
                <motion.div
                  key={product.id}
                  id={product.id}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    position: 'relative',
                    background: '#ffffff',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-card)',
                    padding: '2rem',
                    transition: 'box-shadow 200ms ease, transform 200ms ease',
                    cursor: 'default',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-card-hover)'
                    ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.boxShadow = 'none'
                    ;(e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
                  }}
                >
                  {product.badge && (
                    <span style={{
                      position: 'absolute', right: '1.25rem', top: '1.25rem',
                      background: product.badgeColor,
                      color: '#fff',
                      borderRadius: '99px',
                      padding: '0.25rem 0.75rem',
                      fontSize: 'var(--text-caption)',
                      fontWeight: 700,
                    }}>
                      {product.badge}
                    </span>
                  )}

                  <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    width: '3.25rem', height: '3.25rem',
                    background: 'rgba(27,97,201,0.08)',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '1.5rem',
                    marginBottom: '1.25rem',
                  }}>
                    {product.icon}
                  </div>

                  <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--text-subheading)',
                    fontWeight: 700,
                    color: '#181d26',
                    letterSpacing: '-0.02em',
                    marginBottom: '0.25rem',
                  }}>
                    {product.name}
                  </h3>
                  <p style={{ fontSize: 'var(--text-body)', fontWeight: 600, color: '#1b61c9', marginBottom: '0.875rem' }}>
                    {product.tagline}
                  </p>
                  <p style={{ fontSize: 'var(--text-body)', lineHeight: 1.65, color: 'var(--color-text-weak)', marginBottom: '1.5rem' }}>
                    {product.description}
                  </p>

                  <ul style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                    {product.features.map(f => (
                      <li key={f} style={{
                        display: 'flex', alignItems: 'flex-start', gap: '0.5rem',
                        fontSize: 'var(--text-body)', color: 'var(--color-text-weak)',
                      }}>
                        <svg style={{ width: '1rem', height: '1rem', color: '#1b61c9', flexShrink: 0, marginTop: '0.2rem' }} fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 5. CTA BAND ── */}
        <section className="section-box-navy">
          <div className="container-xl section-padding" style={{ textAlign: 'center' }}>
            <h2 className="text-heading" style={{ color: '#ffffff', marginBottom: '1rem' }}>
              Ready to Get Started?
            </h2>
            <p style={{
              fontSize: 'var(--text-body-lg)',
              color: 'rgba(255,255,255,0.65)',
              maxWidth: '36rem',
              margin: '0 auto 2.5rem',
              lineHeight: 'var(--lh-relaxed)',
            }}>
              Complete the onboarding process and start exploring the full ecosystem with guided support from your partner.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.875rem', justifyContent: 'center' }}>
              <Link href="/signup" style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.375rem',
                background: 'linear-gradient(135deg, #2563eb 0%, #1b61c9 100%)',
                color: '#ffffff',
                padding: '0.875rem 2rem',
                borderRadius: 'var(--radius-btn)',
                fontFamily: 'var(--font-display)', fontWeight: 700,
                fontSize: 'var(--text-body)',
                textDecoration: 'none',
                boxShadow: '0 4px 16px rgba(27,97,201,0.45)',
              }}>
                Start Here →
              </Link>
              <Link href="/calculator" style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.375rem',
                background: 'rgba(255,255,255,0.08)',
                color: '#ffffff',
                padding: '0.875rem 2rem',
                borderRadius: 'var(--radius-btn)',
                fontFamily: 'var(--font-display)', fontWeight: 600,
                fontSize: 'var(--text-body)',
                textDecoration: 'none',
                border: '1px solid rgba(255,255,255,0.18)',
              }}>
                Calculate Your Returns
              </Link>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}
