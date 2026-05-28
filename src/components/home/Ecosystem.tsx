'use client'

import { motion } from 'framer-motion'

const PRODUCTS = [
  {
    icon: '⚡',
    title: 'EX-AI Trading Bot',
    description: 'Fully automated 24/7 AI trading bot across Binance, Bybit, and KuCoin. Machine learning-powered market analysis.',
    tag: 'LIVE',
    tagColor: '#059669',
    tagBg: 'rgba(5,150,105,0.10)',
  },
  {
    icon: '💳',
    title: 'Visa Crypto Card',
    description: 'Spend your crypto anywhere in the world. Linked to your Aurum balance. Physical and virtual card available.',
    tag: 'LIVE',
    tagColor: '#059669',
    tagBg: 'rgba(5,150,105,0.10)',
  },
  {
    icon: '🔄',
    title: 'Crypto Exchange',
    description: 'Trade 200+ crypto assets with institutional liquidity. Low fees, deep order books, fast settlement.',
    tag: 'LIVE',
    tagColor: '#059669',
    tagBg: 'rgba(5,150,105,0.10)',
  },
  {
    icon: '🏦',
    title: 'Web3 Neobank',
    description: 'Digital banking on blockchain rails. IBAN accounts, cross-border transfers, DeFi access, multi-currency wallets.',
    tag: 'LAUNCHING',
    tagColor: '#7c3aed',
    tagBg: 'rgba(124,58,237,0.10)',
  },
] as const

export default function Ecosystem() {
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
          <div className="text-center" style={{ maxWidth: '42rem', margin: '0 auto 4rem' }}>
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
            {PRODUCTS.map((p, i) => (
              <motion.div
                key={p.title}
                className="card-flat flex flex-col gap-4"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
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
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
