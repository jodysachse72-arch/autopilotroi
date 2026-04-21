'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const products = [
  { id: 'bots', name: 'EX-AI Trading Bot', tagline: 'AI-Managed Liquidity Engine', description: 'Machine-learning algorithms execute trades 24/7 across Binance, Bybit, and KuCoin — detecting mid-term opportunities and rebalancing in real time. Zero manual input required.', features: ['24/7 automated execution', 'Multi-exchange arbitrage', 'AI-optimized entry/exit', 'Real-time portfolio rebalancing'], badge: 'Flagship', badgeColor: '#1b61c9', icon: '🤖' },
  { id: 'zeus', name: 'Zeus AI Bot', tagline: 'Institutional-Grade Capital Growth', description: 'Higher-tier liquidity management with advanced algorithmic strategies. Zeus operates with larger capital pools for institutional-grade execution and priority support.', features: ['Advanced algorithmic strategies', 'Higher capital tier entry', 'Institutional-grade execution', 'Priority support channel'], badge: 'Pro Tier', badgeColor: '#7c3aed', icon: '⚡' },
  { id: 'flash-loans', name: 'Flash Loans', tagline: 'Instant DeFi Capital Access', description: 'Access instant capital through DeFi flash loan mechanisms. Designed for short-duration, high-volume transactions within a single block — no collateral required.', features: ['Instantaneous execution', 'No collateral required', 'DeFi-native architecture', 'Smart contract secured'], badge: null, badgeColor: '', icon: '💡' },
  { id: 'exchange', name: 'Aurum Exchange', tagline: 'Next-Gen Crypto Exchange', description: 'A full-featured cryptocurrency exchange with deep liquidity, advanced order types, institutional-grade security, and seamless ecosystem integration.', features: ['Deep liquidity pools', 'Advanced order types', 'Institutional-grade security', '200+ trading pairs'], badge: null, badgeColor: '', icon: '📈' },
  { id: 'neobank', name: 'NeoBank', tagline: 'Web 3.0 Banking Infrastructure', description: 'A Web 3.0 bank for secure, private management of crypto and fiat assets. Seamless integration between traditional and decentralised finance — one app, one account.', features: ['Crypto + fiat unified', 'Store, earn, and spend', 'Global SWIFT & SEPA', 'Privacy-first design'], badge: 'Coming Soon', badgeColor: '#0ea5e9', icon: '🏦' },
  { id: 'cards', name: 'Crypto Cards', tagline: 'Spend Crypto Anywhere', description: 'Premium crypto debit cards powered by Visa. Spend your crypto earnings at 80M+ merchants globally, withdraw from ATMs, and manage everything from your app.', features: ['Visa-powered cards', '4 tiers: Nova → Infinity', 'ATM withdrawals worldwide', 'Instant crypto-to-fiat'], badge: null, badgeColor: '', icon: '💳' },
  { id: 'token', name: 'AUR Token', tagline: 'Ecosystem Utility Token', description: 'The native utility token powering the entire ecosystem. Used for governance voting, staking rewards, fee discounts, and premium feature access across all products.', features: ['Governance voting rights', 'Staking rewards', 'Fee discounts across platform', 'Premium tier access'], badge: null, badgeColor: '', icon: '🪙' },
  { id: 'subscription', name: 'Subscription Tiers', tagline: 'All-Access Membership', description: 'Membership tiers that unlock progressive levels of the ecosystem. From basic bot access to full-suite institutional features and partner program access.', features: ['Tiered membership levels', 'Progressive feature unlock', 'Partner program access', 'Priority support channels'], badge: null, badgeColor: '', icon: '🎯' },
]

const STATS = [
  { num: '8',    label: 'Products' },
  { num: '18K+', label: 'Partners' },
  { num: '$30M', label: 'AUM' },
]

export default function ProductSuitePage() {
  return (
    <div className="page-bg">
      <div className="sections-stack">

        {/* ── Hero ── */}
        <section className="section-box">
          <div className="container-xl section-padding">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{ maxWidth: '52rem', margin: '0 auto', textAlign: 'center' }}
            >
              <span className="text-label" style={{
                display: 'inline-block',
                background: 'rgba(27,97,201,0.08)',
                color: '#1b61c9',
                border: '1px solid rgba(27,97,201,0.15)',
                borderRadius: '99px',
                padding: '0.375rem 1rem',
                marginBottom: '1.25rem',
              }}>
                AI-Managed Finance
              </span>

              <h1 className="text-display" style={{ color: '#181d26', marginBottom: '1.25rem' }}>
                The Complete Product Suite
              </h1>

              <p className="text-body-lg" style={{ color: 'var(--color-text-weak)', maxWidth: '38rem', margin: '0 auto 3rem' }}>
                Eight integrated products powering the future of digital finance — from AI-driven trading bots to a full Web 3.0 bank — everything works together as one ecosystem.
              </p>

              {/* Stats */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(2rem,6vw,5rem)' }}>
                {STATS.map(s => (
                  <div key={s.label} style={{ textAlign: 'center' }}>
                    <div style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(1.75rem,3vw,2.5rem)',
                      fontWeight: 800,
                      color: '#1b61c9',
                      letterSpacing: '-0.03em',
                      lineHeight: 1,
                    }}>{s.num}</div>
                    <div className="text-label" style={{ color: 'var(--color-text-muted)', marginTop: '0.375rem' }}>
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Product grid ── */}
        <section className="section-box">
          <div className="container-xl section-padding">
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 26rem), 1fr))',
              gap: '1.25rem',
            }}>
              {products.map((product, i) => (
                <motion.div
                  key={product.id}
                  id={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                  className="group"
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
                  {/* Badge */}
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

                  {/* Icon */}
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

                  <div style={{
                    display: 'flex', alignItems: 'center', gap: '0.375rem',
                    marginTop: '1.5rem',
                    fontSize: 'var(--text-body)', fontWeight: 600, color: '#1b61c9',
                  }}>
                    Explore Details <span>→</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA Band ── */}
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
                letterSpacing: '0.01em',
              }}>
                Start Here →
              </Link>
              <Link href="/university" style={{
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
                Explore University
              </Link>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}
