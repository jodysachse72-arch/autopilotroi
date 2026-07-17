'use client'

import { motion } from 'framer-motion'

const PRODUCTS = [
  {
    icon: '⚡',
    title: 'EX-AI Trading Bot',
    description: 'Fully automated 24/7 AI trading bot across Binance, Bybit, and KuCoin. Machine learning-powered market analysis.',
    tag: 'LIVE',
    tagColor: '#059669',
    tagBg: '#ecfdf5',
    tagBorder: 'rgba(5,150,105,0.18)',
    tagRing: 'rgba(5,150,105,0.14)',
  },
  {
    icon: '💳',
    title: 'Visa Crypto Card',
    description: 'Spend your crypto anywhere in the world. Linked to your Aurum balance. Physical and virtual card available.',
    tag: 'LIVE',
    tagColor: '#059669',
    tagBg: '#ecfdf5',
    tagBorder: 'rgba(5,150,105,0.18)',
    tagRing: 'rgba(5,150,105,0.14)',
  },
  {
    icon: '🔄',
    title: 'Crypto Exchange',
    description: 'Trade 200+ crypto assets with institutional liquidity. Low fees, deep order books, fast settlement.',
    tag: 'LIVE',
    tagColor: '#059669',
    tagBg: '#ecfdf5',
    tagBorder: 'rgba(5,150,105,0.18)',
    tagRing: 'rgba(5,150,105,0.14)',
  },
  {
    icon: '🏦',
    title: 'Web3 Neobank',
    description: 'Digital banking on blockchain rails. IBAN accounts, cross-border transfers, DeFi access, multi-currency wallets.',
    tag: 'LAUNCHING',
    tagColor: '#7c3aed',
    tagBg: '#f5f3ff',
    tagBorder: 'rgba(124,58,237,0.18)',
    tagRing: 'rgba(124,58,237,0.14)',
  },
] as const

const AI_FINANCE_PRODUCTS = [
  { icon: '⚡', title: 'AI Strategy Layer', description: 'Automation and intelligence that can work across compatible strategies and providers.', tag: 'READY', tagColor: '#059669', tagBg: '#ecfdf5', tagBorder: 'rgba(5,150,105,0.18)', tagRing: 'rgba(5,150,105,0.14)' },
  { icon: '📊', title: 'Portfolio Intelligence', description: 'A clear view of performance, allocation, activity, and risk in one understandable place.', tag: 'READY', tagColor: '#059669', tagBg: '#ecfdf5', tagBorder: 'rgba(5,150,105,0.18)', tagRing: 'rgba(5,150,105,0.14)' },
  { icon: '🔌', title: 'Provider Connections', description: 'A flexible connection layer designed to accommodate the financial platforms selected later.', tag: 'FLEXIBLE', tagColor: '#1b61c9', tagBg: '#eff6ff', tagBorder: 'rgba(27,97,201,0.18)', tagRing: 'rgba(27,97,201,0.14)' },
  { icon: '🏦', title: 'Connected Financial Tools', description: 'Room for payments, banking, investing, and other services without binding the experience to one vendor.', tag: 'EXPANDABLE', tagColor: '#7c3aed', tagBg: '#f5f3ff', tagBorder: 'rgba(124,58,237,0.18)', tagRing: 'rgba(124,58,237,0.14)' },
] as const

export default function Ecosystem({ variant = 'aurum' }: { variant?: 'aurum' | 'ai-finance' }) {
  const products = variant === 'ai-finance' ? AI_FINANCE_PRODUCTS : PRODUCTS
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
              {variant === 'ai-finance'
                ? 'A flexible financial experience that can connect intelligence, providers, and guidance without being defined by any one of them.'
                : 'Aurum Foundation has built a complete financial infrastructure stack. AutoPilotROI is your onboarding partner for all of it.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {products.map((p, i) => (
              <motion.div
                key={p.title}
                className="card-flat flex flex-col gap-4"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex items-center justify-between gap-4">
                  <span
                    className="flex shrink-0 items-center justify-center text-2xl"
                    aria-hidden="true"
                    style={{
                      width: '3rem',
                      height: '3rem',
                      border: '1px solid var(--color-border-light)',
                      borderRadius: '0.875rem',
                      backgroundColor: 'var(--color-surface-alt)',
                    }}
                  >
                    {p.icon}
                  </span>
                  <span
                    className="inline-flex shrink-0 items-center rounded-full"
                    style={{
                      backgroundColor: p.tagBg,
                      color: p.tagColor,
                      border: `1px solid ${p.tagBorder}`,
                      padding: '0.5rem 0.875rem 0.5rem 0.6875rem',
                      gap: '0.5rem',
                      fontFamily: 'var(--font-display)',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      lineHeight: 1,
                      letterSpacing: '0.075em',
                      boxShadow: '0 1px 2px rgba(18,18,18,0.04)',
                    }}
                  >
                    <span
                      aria-hidden="true"
                      style={{
                        width: '0.4375rem',
                        height: '0.4375rem',
                        flex: '0 0 auto',
                        borderRadius: '9999px',
                        backgroundColor: p.tagColor,
                        boxShadow: `0 0 0 0.25rem ${p.tagRing}`,
                      }}
                    />
                    <span>{p.tag}</span>
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
