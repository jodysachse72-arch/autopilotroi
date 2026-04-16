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

export default function ProductSuitePage() {
  return (
    <div className="min-h-screen" style={{ background: '#f8fafc' }}>
      {/* Hero */}
      <section className="px-6 py-20 lg:py-28 lg:px-10" style={{ background: '#fff', borderBottom: '1px solid #e0e2e6' }}>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mx-auto max-w-4xl text-center">
          <span className="inline-block rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] mb-4"
            style={{ background: 'rgba(27,97,201,0.08)', color: '#1b61c9', border: '1px solid rgba(27,97,201,0.15)' }}>
            AI-Managed Finance
          </span>
          <h1 className="text-4xl font-bold lg:text-5xl mb-5" style={{ color: '#181d26', letterSpacing: '-0.03em' }}>
            The Complete Product Suite
          </h1>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: 'rgba(4,14,32,0.55)', lineHeight: 1.7 }}>
            Eight integrated products powering the future of digital finance — from AI-driven trading bots to a full Web 3.0 bank — everything works together as one ecosystem.
          </p>
          <div className="mt-10 flex justify-center gap-10">
            {[{ num: '8', label: 'Products' }, { num: '18K+', label: 'Partners' }, { num: '$30M', label: 'AUM' }].map(s => (
              <div key={s.label} className="text-center">
                <div className="text-3xl font-bold" style={{ color: '#1b61c9', letterSpacing: '-0.03em' }}>{s.num}</div>
                <div className="text-xs font-bold uppercase tracking-[0.12em] mt-1" style={{ color: 'rgba(4,14,32,0.4)' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Product grid */}
      <section className="py-16 lg:py-24 px-6 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 md:grid-cols-2">
            {products.map((product, i) => (
              <motion.div
                key={product.id}
                id={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className="group relative rounded-2xl p-8 transition-shadow hover:shadow-[0_8px_32px_rgba(27,97,201,0.12)]"
                style={{ background: '#fff', border: '1px solid #e0e2e6' }}
              >
                {/* Badge */}
                {product.badge && (
                  <span className="absolute right-6 top-6 rounded-full px-3 py-1 text-xs font-bold text-white"
                    style={{ background: product.badgeColor }}>
                    {product.badge}
                  </span>
                )}

                {/* Icon */}
                <div className="mb-5 flex h-13 w-13 items-center justify-center rounded-xl text-2xl"
                  style={{ background: 'rgba(27,97,201,0.08)', width: '3.25rem', height: '3.25rem' }}>
                  {product.icon}
                </div>

                <h3 className="text-xl font-bold mb-1 group-hover:text-[#1b61c9] transition-colors" style={{ color: '#181d26', letterSpacing: '-0.02em' }}>
                  {product.name}
                </h3>
                <p className="text-sm font-semibold mb-4" style={{ color: '#1b61c9' }}>{product.tagline}</p>
                <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(4,14,32,0.6)' }}>{product.description}</p>

                <ul className="grid grid-cols-2 gap-2">
                  {product.features.map(f => (
                    <li key={f} className="flex items-start gap-2 text-sm" style={{ color: 'rgba(4,14,32,0.7)' }}>
                      <svg className="mt-0.5 h-4 w-4 shrink-0" style={{ color: '#1b61c9' }} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex items-center gap-1 text-sm font-semibold group-hover:gap-2 transition-all" style={{ color: '#1b61c9' }}>
                  Explore Details <span className="transition-transform group-hover:translate-x-1">→</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="px-6 py-20 lg:px-10 text-center" style={{ background: '#1b61c9' }}>
        <h2 className="text-3xl font-bold text-white mb-4" style={{ letterSpacing: '-0.02em' }}>Ready to Get Started?</h2>
        <p className="text-white/75 mb-8 max-w-xl mx-auto">
          Complete the onboarding process and start exploring the full ecosystem with guided support from your partner.
        </p>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link href="/signup" className="rounded-xl px-8 py-3.5 font-bold text-[#1b61c9] transition hover:opacity-90" style={{ background: '#fff' }}>
            Start Here →
          </Link>
          <Link href="/university" className="rounded-xl border border-white/30 px-8 py-3.5 font-bold text-white transition hover:bg-white/10">
            Explore University
          </Link>
        </div>
      </section>
    </div>
  )
}
