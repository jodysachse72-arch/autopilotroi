'use client'

import { motion } from 'framer-motion'

const FEATURES = [
  {
    icon: '⚡',
    title: 'EX-AI Trading Bot',
    description: 'The AI analyzes global crypto markets 24/7 and executes trades automatically on Binance, Bybit, and KuCoin. You activate it once.',
    color: '#1b61c9',
    bg: 'rgba(27,97,201,0.10)',
  },
  {
    icon: '💳',
    title: 'Visa Crypto Card',
    description: 'Spend your earnings anywhere Visa is accepted. Your crypto balance powers your everyday purchases worldwide.',
    color: '#7c3aed',
    bg: 'rgba(124,58,237,0.10)',
  },
  {
    icon: '🏦',
    title: 'Web3 Neobank',
    description: 'A full-featured digital bank built on blockchain infrastructure. IBAN accounts, cross-border transfers, DeFi integration.',
    color: '#0891b2',
    bg: 'rgba(8,145,178,0.10)',
  },
  {
    icon: '🔄',
    title: 'Crypto Exchange',
    description: 'Trade 200+ assets at competitive rates with institutional-grade liquidity and a clean, intuitive interface.',
    color: '#059669',
    bg: 'rgba(5,150,105,0.10)',
  },
  {
    icon: '🎯',
    title: 'Guided Onboarding',
    description: 'Step-by-step setup: wallet, VPN, USDT acquisition, Aurum account, and bot activation. Nothing gets skipped.',
    color: '#1b61c9',
    bg: 'rgba(27,97,201,0.10)',
  },
  {
    icon: '🤝',
    title: 'Partner Program',
    description: 'Earn additional income by introducing others. 3-deep spillover model — your network grows even while you sleep.',
    color: '#d97706',
    bg: 'rgba(217,119,6,0.10)',
  },
] as const

export default function Features() {
  return (
    <section
      style={{
        margin: '0',
      }}
    >
      <div
        style={{
          backgroundColor: 'var(--color-surface-alt)',
          borderRadius: 'var(--radius-section, 1.125rem)',
          padding: 'var(--section-py) clamp(1.5rem, 4vw, 3.5rem)',
        }}
      >
        <div style={{ maxWidth: 'var(--container)', margin: '0 auto' }}>
          {/* Section header */}
          <div className="text-center" style={{ maxWidth: '40rem', margin: '0 auto 4rem' }}>
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
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                className="card"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              >
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
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
