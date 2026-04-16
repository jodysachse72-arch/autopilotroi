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
          borderColor: '#bfdbfe',
          iconBg: 'rgba(27,97,201,0.08)',
          iconColor: '#1b61c9',
          icon: (
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="5" y="8" width="14" height="12" rx="2"/><path d="M12 8V4H8"/>
            </svg>
          ),
        },
        {
          title: 'Visa Crypto Card',
          description: 'Spend your crypto earnings anywhere Visa is accepted — 80M+ merchants globally.',
          borderColor: '#fecaca',
          iconBg: 'rgba(239,68,68,0.08)',
          iconColor: '#dc2626',
          icon: (
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="5" width="20" height="14" rx="3"/><line x1="2" y1="10" x2="22" y2="10"/>
            </svg>
          ),
        },
        {
          title: 'Gold RWA Trading',
          description: 'Tokenised real-world gold from African suppliers with AI-driven trading and physical delivery options.',
          borderColor: '#fde68a',
          iconBg: 'rgba(217,119,6,0.08)',
          iconColor: '#b45309',
          icon: (
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><path d="M12 6v12M8 9l4-3 4 3"/>
            </svg>
          ),
        },
        {
          title: 'Zeus AI & Web3 NeoBank',
          description: 'Manage crypto and fiat in one account with Swift, SEPA transfers, and 24/7 support.',
          borderColor: '#ddd6fe',
          iconBg: 'rgba(109,40,217,0.08)',
          iconColor: '#6d28d9',
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
    <div className="min-h-screen" style={{ background: '#f8fafc' }}>

      {/* Header */}
      <div className="px-6 py-16 lg:px-10" style={{ background: '#1b61c9', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div className="relative mx-auto max-w-4xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold"
            style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)', color: '#fff' }}>
            <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
            Executive Summary
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl" style={{ letterSpacing: '-0.03em' }}>
            {headline}
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed" style={{ color: 'rgba(255,255,255,0.75)' }}>{intro}</p>
        </div>
      </div>

      {/* Sections */}
      <div className="mx-auto max-w-4xl space-y-6 px-6 py-16 lg:px-10">
        {sections.map((section) => (
          <section key={section.id} id={section.id} className="rounded-2xl p-8"
            style={{ background: '#fff', border: '1px solid #e0e2e6', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl"
                style={{ background: 'rgba(27,97,201,0.08)', border: '1px solid rgba(27,97,201,0.2)', color: '#1b61c9' }}>
                {section.icon}
              </div>
              <h2 className="text-2xl font-bold" style={{ color: '#181d26' }}>
                {section.title}
              </h2>
            </div>

            {section.body.map((para, i) => (
              <p key={i} className="mb-4 text-[0.95rem] leading-relaxed" style={{ color: 'rgba(4,14,32,0.6)' }}>
                {para}
              </p>
            ))}

            {'products' in section && section.products && (
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {section.products.map((product) => (
                  <div key={product.title} className="rounded-xl p-5 transition-shadow hover:shadow-md"
                    style={{ border: `1px solid ${product.borderColor}`, background: '#fafbff' }}>
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg"
                      style={{ background: product.iconBg, color: product.iconColor }}>
                      {product.icon}
                    </div>
                    <h3 className="text-lg font-bold" style={{ color: '#181d26' }}>
                      {product.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed" style={{ color: 'rgba(4,14,32,0.55)' }}>{product.description}</p>
                  </div>
                ))}
              </div>
            )}

            {section.callout && (
              <div className="mt-6 rounded-xl border p-5 text-sm leading-relaxed"
                style={
                  section.calloutType === 'warning'
                    ? { borderColor: '#fde68a', background: '#fffbeb', color: '#b45309' }
                    : { borderColor: '#bfdbfe', background: '#eff6ff', color: '#1d4ed8' }
                }>
                {section.callout}
              </div>
            )}
          </section>
        ))}

        {/* CTA */}
        <div className="rounded-2xl p-10 text-center" style={{ background: '#1b61c9' }}>
          <h2 className="text-2xl font-bold text-white" style={{ letterSpacing: '-0.02em' }}>
            {cta.headline}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[0.95rem] leading-relaxed" style={{ color: 'rgba(255,255,255,0.75)' }}>
            {cta.description}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link href={cta.primaryCta.href}
              className="rounded-xl px-7 py-3 font-bold text-white transition hover:opacity-90"
              style={{ background: '#fff', color: '#1b61c9' }}>
              {cta.primaryCta.label}
            </Link>
            <Link href={cta.secondaryCta.href}
              className="rounded-xl px-7 py-3 font-semibold text-white transition"
              style={{ border: '1.5px solid rgba(255,255,255,0.35)', background: 'rgba(255,255,255,0.1)' }}>
              {cta.secondaryCta.label}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
