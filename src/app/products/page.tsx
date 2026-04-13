'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const products = [
  {
    id: 'bots',
    name: 'EX-AI Trading Bot',
    tagline: 'AI-Managed Liquidity Engine',
    description: 'Machine-learning algorithms execute trades 24/7 across Binance, Bybit, and KuCoin — detecting mid-term opportunities and rebalancing in real time. Zero manual input required.',
    features: ['24/7 automated execution', 'Multi-exchange arbitrage', 'AI-optimized entry/exit', 'Real-time portfolio rebalancing'],
    badge: 'Flagship',
    badgeColor: 'from-blue-500 to-cyan-400',
    gradient: 'from-blue-600/20 via-cyan-500/10 to-transparent',
    iconGradient: 'from-blue-500 to-cyan-400',
    visual: (
      <svg viewBox="0 0 120 80" className="w-full h-full opacity-20">
        <path d="M0 60 Q20 30 40 45 T80 25 T120 15" fill="none" stroke="url(#g1)" strokeWidth="2"/>
        <defs><linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#3b82f6"/><stop offset="100%" stopColor="#22d3ee"/></linearGradient></defs>
        {[15, 30, 45, 60, 75, 90, 105].map((x, i) => <rect key={x} x={x} y={35 - i * 3} width="6" height={20 + i * 4} fill={i % 2 === 0 ? '#22c55e' : '#ef4444'} opacity="0.5" rx="1"/>)}
      </svg>
    ),
  },
  {
    id: 'zeus',
    name: 'Zeus AI Bot',
    tagline: 'Institutional-Grade Capital Growth',
    description: 'Higher-tier liquidity management with advanced algorithmic strategies. Zeus operates with larger capital pools for institutional-grade execution and priority support.',
    features: ['Advanced algorithmic strategies', 'Higher capital tier entry', 'Institutional-grade execution', 'Priority support channel'],
    badge: 'Pro Tier',
    badgeColor: 'from-purple-500 to-violet-400',
    gradient: 'from-purple-600/20 via-violet-500/10 to-transparent',
    iconGradient: 'from-purple-500 to-violet-400',
    visual: (
      <svg viewBox="0 0 120 80" className="w-full h-full opacity-20">
        <circle cx="60" cy="40" r="25" fill="none" stroke="url(#g2)" strokeWidth="1.5"/>
        <circle cx="60" cy="40" r="18" fill="none" stroke="url(#g2)" strokeWidth="1" strokeDasharray="4 3"/>
        <circle cx="60" cy="40" r="8" fill="url(#g2)" opacity="0.4"/>
        <defs><linearGradient id="g2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#a855f7"/><stop offset="100%" stopColor="#7c3aed"/></linearGradient></defs>
      </svg>
    ),
  },
  {
    id: 'flash-loans',
    name: 'Flash Loans',
    tagline: 'Instant DeFi Capital Access',
    description: 'Access instant capital through DeFi flash loan mechanisms. Designed for short-duration, high-volume transactions within a single block — no collateral required.',
    features: ['Instantaneous execution', 'No collateral required', 'DeFi-native architecture', 'Smart contract secured'],
    badge: null,
    badgeColor: '',
    gradient: 'from-amber-600/20 via-orange-500/10 to-transparent',
    iconGradient: 'from-amber-500 to-orange-400',
    visual: (
      <svg viewBox="0 0 120 80" className="w-full h-full opacity-20">
        <path d="M60 5 L70 35 L55 35 L65 75" fill="none" stroke="url(#g3)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <defs><linearGradient id="g3" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#f59e0b"/><stop offset="100%" stopColor="#f97316"/></linearGradient></defs>
      </svg>
    ),
  },
  {
    id: 'exchange',
    name: 'Aurum Exchange',
    tagline: 'Next-Gen Crypto Exchange',
    description: 'A full-featured cryptocurrency exchange with deep liquidity, advanced order types, institutional-grade security, and seamless ecosystem integration.',
    features: ['Deep liquidity pools', 'Advanced order types', 'Institutional-grade security', '200+ trading pairs'],
    badge: null,
    badgeColor: '',
    gradient: 'from-emerald-600/20 via-green-500/10 to-transparent',
    iconGradient: 'from-emerald-500 to-green-400',
    visual: (
      <svg viewBox="0 0 120 80" className="w-full h-full opacity-20">
        <path d="M20 50 L40 35 L60 42 L80 20 L100 30" fill="none" stroke="url(#g4)" strokeWidth="2"/>
        <path d="M20 55 L40 60 L60 48 L80 55 L100 45" fill="none" stroke="#22c55e" strokeWidth="1" opacity="0.5" strokeDasharray="3 3"/>
        <defs><linearGradient id="g4" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#10b981"/><stop offset="100%" stopColor="#22c55e"/></linearGradient></defs>
      </svg>
    ),
  },
  {
    id: 'neobank',
    name: 'NeoBank',
    tagline: 'Web 3.0 Banking Infrastructure',
    description: 'A Web 3.0 bank for secure, private management of crypto and fiat assets. Seamless integration between traditional and decentralised finance — one app, one account.',
    features: ['Crypto + fiat unified', 'Store, earn, and spend', 'Global SWIFT & SEPA', 'Privacy-first design'],
    badge: 'Coming Soon',
    badgeColor: 'from-sky-500 to-blue-400',
    gradient: 'from-sky-600/20 via-blue-500/10 to-transparent',
    iconGradient: 'from-sky-500 to-blue-400',
    visual: (
      <svg viewBox="0 0 120 80" className="w-full h-full opacity-20">
        <rect x="30" y="20" width="60" height="40" rx="8" fill="none" stroke="url(#g5)" strokeWidth="1.5"/>
        <line x1="30" y1="35" x2="90" y2="35" stroke="url(#g5)" strokeWidth="1"/>
        <rect x="38" y="45" width="15" height="8" rx="2" fill="url(#g5)" opacity="0.5"/>
        <defs><linearGradient id="g5" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#0ea5e9"/><stop offset="100%" stopColor="#3b82f6"/></linearGradient></defs>
      </svg>
    ),
  },
  {
    id: 'cards',
    name: 'Crypto Cards',
    tagline: 'Spend Crypto Anywhere',
    description: 'Premium crypto debit cards powered by Visa. Spend your crypto earnings at 80M+ merchants globally, withdraw from ATMs, and manage everything from your app.',
    features: ['Visa-powered cards', '4 tiers: Nova → Infinity', 'ATM withdrawals worldwide', 'Instant crypto-to-fiat'],
    badge: null,
    badgeColor: '',
    gradient: 'from-rose-600/20 via-pink-500/10 to-transparent',
    iconGradient: 'from-rose-500 to-pink-400',
    visual: (
      <svg viewBox="0 0 120 80" className="w-full h-full opacity-20">
        <rect x="25" y="22" width="70" height="40" rx="6" fill="none" stroke="url(#g6)" strokeWidth="1.5" transform="rotate(-5 60 42)"/>
        <rect x="30" y="25" width="70" height="40" rx="6" fill="none" stroke="url(#g6)" strokeWidth="1" opacity="0.5" transform="rotate(3 65 45)"/>
        <defs><linearGradient id="g6" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#f43f5e"/><stop offset="100%" stopColor="#ec4899"/></linearGradient></defs>
      </svg>
    ),
  },
  {
    id: 'token',
    name: 'AUR Token',
    tagline: 'Ecosystem Utility Token',
    description: 'The native utility token powering the entire ecosystem. Used for governance voting, staking rewards, fee discounts, and premium feature access across all products.',
    features: ['Governance voting rights', 'Staking rewards', 'Fee discounts across platform', 'Premium tier access'],
    badge: null,
    badgeColor: '',
    gradient: 'from-yellow-600/20 via-amber-500/10 to-transparent',
    iconGradient: 'from-yellow-500 to-amber-400',
    visual: (
      <svg viewBox="0 0 120 80" className="w-full h-full opacity-20">
        <circle cx="60" cy="40" r="22" fill="none" stroke="url(#g7)" strokeWidth="1.5"/>
        <text x="60" y="47" textAnchor="middle" fill="url(#g7)" fontSize="18" fontWeight="bold">A</text>
        <defs><linearGradient id="g7" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#eab308"/><stop offset="100%" stopColor="#f59e0b"/></linearGradient></defs>
      </svg>
    ),
  },
  {
    id: 'subscription',
    name: 'Subscription Tiers',
    tagline: 'All-Access Membership',
    description: 'Membership tiers that unlock progressive levels of the ecosystem. From basic bot access to full-suite institutional features and partner program access.',
    features: ['Tiered membership levels', 'Progressive feature unlock', 'Partner program access', 'Priority support channels'],
    badge: null,
    badgeColor: '',
    gradient: 'from-indigo-600/20 via-blue-500/10 to-transparent',
    iconGradient: 'from-indigo-500 to-blue-400',
    visual: (
      <svg viewBox="0 0 120 80" className="w-full h-full opacity-20">
        {[0, 1, 2, 3].map((i) => <rect key={i} x={25 + i * 20} y={55 - i * 12} width="14" height={15 + i * 12} rx="3" fill="url(#g8)" opacity={0.3 + i * 0.15}/>)}
        <defs><linearGradient id="g8" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#6366f1"/><stop offset="100%" stopColor="#3b82f6"/></linearGradient></defs>
      </svg>
    ),
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
}

export default function ProductSuitePage() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[var(--border-primary)] bg-[var(--bg-section)] px-6 py-20 lg:py-28 lg:px-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(59,130,246,0.15)_0%,transparent_60%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(128,128,128,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(128,128,128,0.5) 1px,transparent 1px)', backgroundSize: '50px 50px' }} />

        <div className="relative mx-auto max-w-4xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--border-accent)] bg-[var(--badge-bg)] px-5 py-2 text-sm font-semibold text-[var(--accent-primary)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-primary)] animate-pulse" />
              AI-Managed Finance
            </div>
            <h1 className="mx-auto max-w-3xl font-[var(--font-sora)] text-4xl font-bold leading-tight text-[var(--text-primary)] lg:text-6xl">
              The Complete{' '}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">Product Suite</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-[var(--text-tertiary)] leading-relaxed">
              Eight integrated products powering the future of digital finance.
              From AI-driven trading bots to a full Web 3.0 bank — everything
              works together as one ecosystem.
            </p>
          </motion.div>

          {/* Stats */}
          <div className="mx-auto mt-12 flex max-w-lg justify-center gap-12">
            {[
              { num: '8', label: 'Products' },
              { num: '18K+', label: 'Partners' },
              { num: '$30M', label: 'AUM' },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="text-center"
              >
                <div className="font-[var(--font-sora)] text-3xl font-bold text-[var(--text-primary)]">{s.num}</div>
                <div className="text-sm text-[var(--text-muted)]">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Product grid */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-6 md:grid-cols-2">
            {products.map((product, i) => (
              <motion.div
                key={product.name}
                id={product.id}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-50px' }}
                custom={i}
                className="group relative overflow-hidden rounded-2xl border border-[var(--border-secondary)] bg-[var(--bg-card)] shadow-[var(--card-shadow,none)] backdrop-blur-sm transition-all duration-500 hover:border-[var(--border-accent)] hover:shadow-[var(--card-shadow-hover,none)]"
              >
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${product.gradient} pointer-events-none`} />

                {/* Background visual */}
                <div className="absolute right-0 top-0 h-32 w-32 opacity-60 pointer-events-none">
                  {product.visual}
                </div>

                {/* Badge */}
                {product.badge && (
                  <div className="absolute right-6 top-6 z-10">
                    <span className={`rounded-full bg-gradient-to-r ${product.badgeColor} px-3 py-1 text-xs font-bold text-white shadow-lg`}>
                      {product.badge}
                    </span>
                  </div>
                )}

                <div className="relative p-8">
                  {/* Icon */}
                  <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${product.iconGradient} shadow-lg`}>
                    <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      {product.id === 'bots' && <><path d="M12 8V4H8"/><rect x="5" y="8" width="14" height="12" rx="2"/><circle cx="9" cy="14" r="1" fill="white"/><circle cx="15" cy="14" r="1" fill="white"/></>}
                      {product.id === 'zeus' && <><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></>}
                      {product.id === 'flash-loans' && <><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/><circle cx="12" cy="12" r="10"/></>}
                      {product.id === 'exchange' && <><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></>}
                      {product.id === 'neobank' && <><rect x="2" y="5" width="20" height="14" rx="3"/><line x1="2" y1="10" x2="22" y2="10"/><rect x="6" y="14" width="4" height="2" rx="1"/></>}
                      {product.id === 'cards' && <><rect x="2" y="5" width="20" height="14" rx="3"/><line x1="2" y1="10" x2="22" y2="10"/><circle cx="17" cy="15" r="2"/></>}
                      {product.id === 'token' && <><circle cx="12" cy="12" r="10"/><path d="M12 6v12M8 9l4-3 4 3M8 15l4 3 4-3"/></>}
                      {product.id === 'subscription' && <><rect x="3" y="11" width="4" height="9" rx="1"/><rect x="10" y="7" width="4" height="13" rx="1"/><rect x="17" y="3" width="4" height="17" rx="1"/></>}
                    </svg>
                  </div>

                  <h3 className="font-[var(--font-sora)] text-xl font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors">
                    {product.name}
                  </h3>
                  <p className="mt-1 text-sm font-medium bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    {product.tagline}
                  </p>
                  <p className="mt-4 text-[0.9rem] leading-relaxed text-[var(--text-tertiary)]">
                    {product.description}
                  </p>

                  <ul className="mt-6 grid grid-cols-2 gap-2">
                    {product.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                        <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-[var(--accent-primary)]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex items-center gap-1 text-sm font-medium text-[var(--accent-primary)] group-hover:gap-2 transition-all">
                    Explore Details
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-[var(--border-primary)] py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-[var(--font-sora)] text-3xl font-bold text-[var(--text-primary)]">
            Ready to Get Started?
          </h2>
          <p className="mt-4 text-[var(--text-tertiary)]">
            Complete the onboarding process and start exploring the full
            ecosystem with guided support from your partner.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/signup"
              className="rounded-xl bg-[linear-gradient(180deg,#3b82f6_0%,#2563eb_100%)] px-8 py-3.5 font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:shadow-blue-600/40"
            >
              Start Here →
            </Link>
            <Link
              href="/university"
              className="rounded-xl border border-[var(--border-secondary)] bg-[var(--bg-card)] px-8 py-3.5 font-semibold text-[var(--text-primary)] transition hover:bg-[var(--bg-card-hover)]"
            >
              Explore University
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
