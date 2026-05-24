const PRODUCTS = [
  {
    icon: '⚡',
    title: 'EX-AI Trading Bot',
    description: 'Fully automated 24/7 AI trading bot across Binance, Bybit, and KuCoin. Machine learning-powered market analysis.',
    tag: 'LIVE',
    tagColor: '#059669',
    tagBg: '#ecfdf5',
  },
  {
    icon: '💳',
    title: 'Visa Crypto Card',
    description: 'Spend your crypto anywhere in the world. Linked to your Aurum balance. Physical and virtual card available.',
    tag: 'LIVE',
    tagColor: '#059669',
    tagBg: '#ecfdf5',
  },
  {
    icon: '🔄',
    title: 'Crypto Exchange',
    description: 'Trade 200+ crypto assets with institutional liquidity. Low fees, deep order books, fast settlement.',
    tag: 'LIVE',
    tagColor: '#059669',
    tagBg: '#ecfdf5',
  },
  {
    icon: '🏦',
    title: 'Web3 Neobank',
    description: 'Digital banking on blockchain rails. IBAN accounts, cross-border transfers, DeFi access, multi-currency wallets.',
    tag: 'LAUNCHING',
    tagColor: '#7c3aed',
    tagBg: '#f5f3ff',
  },
] as const

export default function Ecosystem() {
  return (
    <section className="section section-alt">
      <div className="container-content">
        <div className="text-center mb-16" style={{ maxWidth: '40rem', margin: '0 auto 4rem' }}>
          <span className="badge mb-4 inline-flex">The Ecosystem</span>
          <h2 className="text-display mb-4">
            One ecosystem.
            <br />
            Four powerful products.
          </h2>
          <p className="text-body-lg" style={{ color: 'var(--color-fg-muted)' }}>
            Aurum Foundation has built a complete financial infrastructure stack.
            AutoPilotROI is your onboarding partner for all of it.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {PRODUCTS.map((p) => (
            <div key={p.title} className="card-flat flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-2xl">{p.icon}</span>
                <span
                  className="text-caption font-semibold px-3 py-1 rounded-full"
                  style={{
                    backgroundColor: p.tagBg,
                    color: p.tagColor,
                    letterSpacing: 'var(--ls-wide)',
                  }}
                >
                  {p.tag}
                </span>
              </div>
              <h3 className="text-subheading">{p.title}</h3>
              <p className="text-body" style={{ color: 'var(--color-fg-muted)' }}>
                {p.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
