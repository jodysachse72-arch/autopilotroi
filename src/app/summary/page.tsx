import Link from 'next/link'

export const metadata = {
  title: 'Aurum Summary | AutoPilot ROI',
  description:
    'Understand the Aurum Foundation ecosystem before you join — AI trading bot, crypto card, exchange, and neobank explained simply.',
}

const summaryContent = {
  headline: 'What is Aurum Foundation?',
  intro:
    'Aurum Foundation is a decentralised AI-driven financial ecosystem that combines automated trading bots, a crypto debit card, a crypto exchange, and a Web3 neobank into one platform. AutoPilot ROI is your guided entry point.',
  sections: [
    {
      id: 'how-bot-works',
      icon: '🤖',
      title: 'How the AI Trading Bot Works',
      body: [
        'The Aurum EX-AI Bot analyses global cryptocurrency markets around the clock using machine learning algorithms. It executes trades automatically on Binance, Bybit, and KuCoin — the world\'s largest crypto exchanges.',
        'Once you fund and activate your bot, it generates returns and distributes them to your account on a regular basis. You do not need trading experience. The system is fully automated.',
        'Returns are illustrative and vary by market conditions. Aurum publishes regular performance reports for members.',
      ],
      callout: '⚠️ All investment carries risk. Aurum bot returns are not guaranteed. Never invest more than you can afford to lose.',
      calloutType: 'warning' as const,
    },
    {
      id: 'ecosystem',
      icon: '🌐',
      title: 'The Aurum Ecosystem',
      body: [
        'Aurum is more than a trading bot. It is a complete financial infrastructure for the decentralised economy.',
      ],
      products: [
        {
          icon: '🤖',
          title: 'EX-AI Bot',
          description:
            'Automated cryptocurrency trading on the world\'s top exchanges. BTC, ETH, USDT and more — live 24/7.',
        },
        {
          icon: '💳',
          title: 'Visa Crypto Card',
          description:
            'Spend your crypto earnings anywhere Visa is accepted — 80M+ merchants globally. No manual conversion needed.',
        },
        {
          icon: '🥇',
          title: 'Gold RWA Trading',
          description:
            'Tokenised real-world gold from African suppliers at ~30% below spot price with AI-driven trading and physical delivery options.',
        },
        {
          icon: '🏦',
          title: 'Zeus AI & Web3 NeoBank',
          description:
            'Manage crypto and fiat in one regulated account with Swift, SEPA transfers, and a 24/7 support system.',
        },
      ],
    },
    {
      id: 'spillover',
      icon: '🔗',
      title: 'The Spillover Model',
      body: [
        'Aurum uses a 3-deep spillover referral model. Each partner has three direct positions beneath them. When those three positions are filled, new members who join through the team automatically "spill" into the next available position in the downline.',
        'This means that as the team grows, members benefit from activity they did not personally generate. Your downline builds from the momentum of the entire team.',
      ],
      callout:
        '✅ AutoPilot ROI exists specifically to make sure every new member is correctly placed in the spillover structure with full partner support.',
      calloutType: 'info' as const,
    },
  ],
  cta: {
    headline: 'Ready to Get Started?',
    description:
      'Now that you understand the system, your next step is to work through the onboarding guide with your AutoPilot ROI partner.',
    primaryCta: { label: 'Begin Onboarding →', href: '/start' },
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
        <div className="relative mx-auto max-w-4xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/15 px-4 py-2 text-sm font-medium text-blue-200">
            📋 Executive Summary
          </div>
          <h1 className="font-[var(--font-sora)] text-5xl font-semibold tracking-[-0.055em] text-white sm:text-6xl">
            {headline}
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-9 text-blue-100/80">{intro}</p>
        </div>
      </div>

      {/* Sections */}
      <div className="mx-auto max-w-4xl space-y-12 px-6 py-16 lg:px-10">
        {sections.map((section) => (
          <section key={section.id} id={section.id}>
            <div className="mb-6 flex items-center gap-3">
              <span className="text-4xl">{section.icon}</span>
              <h2 className="font-[var(--font-sora)] text-3xl font-semibold tracking-[-0.04em] text-white">
                {section.title}
              </h2>
            </div>

            {section.body.map((para, i) => (
              <p key={i} className="mb-4 text-lg leading-9 text-blue-100/80">
                {para}
              </p>
            ))}

            {'products' in section && section.products && (
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {section.products.map((product) => (
                  <div
                    key={product.title}
                    className="rounded-2xl border border-white/10 bg-white/6 p-5 backdrop-blur-sm"
                  >
                    <div className="mb-3 text-3xl">{product.icon}</div>
                    <h3 className="font-[var(--font-sora)] text-xl font-semibold text-white">
                      {product.title}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-blue-100/75">{product.description}</p>
                  </div>
                ))}
              </div>
            )}

            {section.callout && (
              <div
                className={`mt-6 rounded-2xl border p-5 text-base leading-7 ${
                  section.calloutType === 'warning'
                    ? 'border-amber-400/40 bg-amber-400/10 text-amber-100'
                    : 'border-blue-400/40 bg-blue-400/10 text-blue-100'
                }`}
              >
                {section.callout}
              </div>
            )}
          </section>
        ))}

        {/* CTA */}
        <div className="rounded-[2rem] border border-white/15 bg-white/6 p-10 text-center backdrop-blur-sm">
          <h2 className="font-[var(--font-sora)] text-3xl font-semibold text-white">
            {cta.headline}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-8 text-blue-100/80">
            {cta.description}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href={cta.primaryCta.href}
              className="rounded-xl border border-blue-300/40 bg-[linear-gradient(180deg,#3b82f6_0%,#2563eb_100%)] px-7 py-3 text-lg font-medium text-white shadow-[0_14px_30px_rgba(37,99,235,0.35)] transition hover:brightness-110"
            >
              {cta.primaryCta.label}
            </Link>
            <Link
              href={cta.secondaryCta.href}
              className="rounded-xl border border-white/20 bg-white/10 px-7 py-3 text-lg font-medium text-white backdrop-blur-md transition hover:bg-white/15"
            >
              {cta.secondaryCta.label}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
