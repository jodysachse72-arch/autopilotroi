import Link from 'next/link'

export const metadata = {
  title: 'Executive Summary | AutoPilot ROI',
  description:
    'Understand the Aurum ecosystem before you join — AI trading bots, crypto card, exchange, and neobank explained simply.',
}

const summaryContent = {
  headline: 'What is the Aurum Ecosystem?',
  intro:
    'A decentralised AI-driven financial platform that combines automated trading bots, a crypto debit card, a crypto exchange, and a Web3 neobank into one ecosystem. AutoPilot ROI is your guided entry point.',
  sections: [
    {
      id: 'how-bot-works',
      title: 'How the AI Trading Bot Works',
      icon: (
        <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="5" y="8" width="14" height="12" rx="2"/><path d="M12 8V4H8"/><circle cx="9" cy="14" r="1" fill="currentColor"/><circle cx="15" cy="14" r="1" fill="currentColor"/>
        </svg>
      ),
      body: [
        'The EX-AI Bot analyses global cryptocurrency markets around the clock using machine learning algorithms. It executes trades automatically on Binance, Bybit, and KuCoin — the world\'s largest crypto exchanges.',
        'Once you fund and activate your bot, it generates returns and distributes them to your account on a regular basis. You do not need trading experience. The system is fully automated.',
        'Returns are illustrative and vary by market conditions. Regular performance reports are published for members.',
      ],
      callout: '⚠️ All investment carries risk. Bot returns are not guaranteed. Never invest more than you can afford to lose.',
      calloutType: 'warning' as const,
    },
    {
      id: 'ecosystem',
      title: 'The Complete Ecosystem',
      icon: (
        <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
        </svg>
      ),
      body: [
        'More than a trading bot. It is a complete financial infrastructure for the decentralised economy.',
      ],
      products: [
        {
          title: 'EX-AI Bot',
          description: 'Automated cryptocurrency trading on the world\'s top exchanges. BTC, ETH, USDT and more — live 24/7.',
          gradient: 'from-blue-500/20 to-cyan-500/10',
          iconColor: 'text-blue-400',
          icon: (
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="5" y="8" width="14" height="12" rx="2"/><path d="M12 8V4H8"/>
            </svg>
          ),
        },
        {
          title: 'Visa Crypto Card',
          description: 'Spend your crypto earnings anywhere Visa is accepted — 80M+ merchants globally.',
          gradient: 'from-rose-500/20 to-pink-500/10',
          iconColor: 'text-rose-400',
          icon: (
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="5" width="20" height="14" rx="3"/><line x1="2" y1="10" x2="22" y2="10"/>
            </svg>
          ),
        },
        {
          title: 'Gold RWA Trading',
          description: 'Tokenised real-world gold from African suppliers with AI-driven trading and physical delivery options.',
          gradient: 'from-amber-500/20 to-yellow-500/10',
          iconColor: 'text-amber-400',
          icon: (
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><path d="M12 6v12M8 9l4-3 4 3"/>
            </svg>
          ),
        },
        {
          title: 'Zeus AI & Web3 NeoBank',
          description: 'Manage crypto and fiat in one account with Swift, SEPA transfers, and 24/7 support.',
          gradient: 'from-purple-500/20 to-violet-500/10',
          iconColor: 'text-purple-400',
          icon: (
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
            </svg>
          ),
        },
      ],
    },
    {
      id: 'spillover',
      title: 'The Spillover Model',
      icon: (
        <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>
        </svg>
      ),
      body: [
        'A 3-deep spillover referral model. Each partner has three direct positions beneath them. When those three positions are filled, new members who join through the team automatically "spill" into the next available position in the downline.',
        'This means that as the team grows, members benefit from activity they did not personally generate. Your downline builds from the momentum of the entire team.',
      ],
      callout: '✅ AutoPilot ROI exists specifically to make sure every new member is correctly placed in the spillover structure with full partner support.',
      calloutType: 'info' as const,
    },
  ],
  cta: {
    headline: 'Ready to Get Started?',
    description: 'Now that you understand the system, your next step is to work through the onboarding guide with your AutoPilot ROI partner.',
    primaryCta: { label: 'Begin Onboarding →', href: '/signup' },
    secondaryCta: { label: 'View Resources', href: '/resources' },
  },
}

export default function SummaryPage() {
  const { headline, intro, sections, cta } = summaryContent

  return (
    <div className="min-h-screen bg-[#06122f]">

      {/* Header */}
      <div className="relative overflow-hidden border-b border-white/10 bg-[linear-gradient(180deg,#0b1f57_0%,#06122f_100%)] px-6 py-16 lg:px-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.15),transparent_60%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)', backgroundSize: '50px 50px' }} />
        <div className="relative mx-auto max-w-4xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-300">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
            Executive Summary
          </div>
          <h1 className="font-[var(--font-sora)] text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {headline}
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-blue-100/60">{intro}</p>
        </div>
      </div>

      {/* Sections */}
      <div className="mx-auto max-w-4xl space-y-10 px-6 py-16 lg:px-10">
        {sections.map((section) => (
          <section key={section.id} id={section.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-sm">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/10 text-blue-400 border border-blue-400/20">
                {section.icon}
              </div>
              <h2 className="font-[var(--font-sora)] text-2xl font-bold text-white">
                {section.title}
              </h2>
            </div>

            {section.body.map((para, i) => (
              <p key={i} className="mb-4 text-[0.95rem] leading-relaxed text-blue-100/60">
                {para}
              </p>
            ))}

            {'products' in section && section.products && (
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {section.products.map((product) => (
                  <div
                    key={product.title}
                    className={`rounded-xl border border-white/10 bg-gradient-to-br ${product.gradient} p-5 transition-all hover:border-white/20`}
                  >
                    <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 ${product.iconColor}`}>
                      {product.icon}
                    </div>
                    <h3 className="font-[var(--font-sora)] text-lg font-semibold text-white">
                      {product.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-blue-100/60">{product.description}</p>
                  </div>
                ))}
              </div>
            )}

            {section.callout && (
              <div
                className={`mt-6 rounded-xl border p-5 text-sm leading-relaxed ${
                  section.calloutType === 'warning'
                    ? 'border-amber-400/30 bg-amber-400/10 text-amber-200'
                    : 'border-blue-400/30 bg-blue-400/10 text-blue-200'
                }`}
              >
                {section.callout}
              </div>
            )}
          </section>
        ))}

        {/* CTA */}
        <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-blue-900/30 to-transparent p-10 text-center backdrop-blur-sm">
          <h2 className="font-[var(--font-sora)] text-2xl font-bold text-white">
            {cta.headline}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[0.95rem] leading-relaxed text-blue-100/60">
            {cta.description}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href={cta.primaryCta.href}
              className="rounded-xl bg-[linear-gradient(180deg,#3b82f6_0%,#2563eb_100%)] px-7 py-3 font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:shadow-blue-600/40"
            >
              {cta.primaryCta.label}
            </Link>
            <Link
              href={cta.secondaryCta.href}
              className="rounded-xl border border-white/20 bg-white/10 px-7 py-3 font-semibold text-white transition hover:bg-white/15"
            >
              {cta.secondaryCta.label}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
