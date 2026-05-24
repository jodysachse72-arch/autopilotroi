const FEATURES = [
  {
    icon: '⚡',
    title: 'EX-AI Trading Bot',
    description: 'The AI analyzes global crypto markets 24/7 and executes trades automatically on Binance, Bybit, and KuCoin. You activate it once.',
    color: 'var(--color-accent)',
    bg: 'var(--color-accent-light)',
  },
  {
    icon: '💳',
    title: 'Visa Crypto Card',
    description: 'Spend your earnings anywhere Visa is accepted. Your crypto balance powers your everyday purchases worldwide.',
    color: '#7c3aed',
    bg: '#f5f3ff',
  },
  {
    icon: '🏦',
    title: 'Web3 Neobank',
    description: 'A full-featured digital bank built on blockchain infrastructure. IBAN accounts, cross-border transfers, DeFi integration.',
    color: '#0891b2',
    bg: '#ecfeff',
  },
  {
    icon: '🔄',
    title: 'Crypto Exchange',
    description: 'Trade 200+ assets at competitive rates with institutional-grade liquidity and a clean, intuitive interface.',
    color: '#059669',
    bg: '#ecfdf5',
  },
  {
    icon: '🎯',
    title: 'Guided Onboarding',
    description: 'Step-by-step setup: wallet, VPN, USDT acquisition, Aurum account, and bot activation. Nothing gets skipped.',
    color: 'var(--color-accent)',
    bg: 'var(--color-accent-light)',
  },
  {
    icon: '🤝',
    title: 'Partner Program',
    description: 'Earn additional income by introducing others. 3-deep spillover model — your network grows even while you sleep.',
    color: '#d97706',
    bg: '#fffbeb',
  },
] as const

export default function Features() {
  return (
    <section className="section section-alt">
      <div className="container-content">
        {/* Section header */}
        <div className="text-center mb-16" style={{ maxWidth: '40rem', margin: '0 auto 4rem' }}>
          <span className="badge mb-4 inline-flex">Why AutoPilotROI</span>
          <h2 className="text-display mb-4">
            Everything you need
            <br />
            to grow on autopilot
          </h2>
          <p className="text-body-lg" style={{ color: 'var(--color-fg-muted)' }}>
            From your first $100 to a fully active portfolio — we guide you through
            every step of the Aurum ecosystem.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f) => (
            <div key={f.title} className="card">
              <div
                className="flex items-center justify-center w-12 h-12 rounded-xl mb-5 text-xl"
                style={{ backgroundColor: f.bg }}
              >
                {f.icon}
              </div>
              <h3
                className="text-subheading mb-3"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {f.title}
              </h3>
              <p className="text-body" style={{ color: 'var(--color-fg-muted)' }}>
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
