'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

interface PlanFeature {
  text: string
}

interface Plan {
  name: string
  tagline: string
  price: string
  features: PlanFeature[]
  ctaLabel: string
  ctaHref: string
  featured?: boolean
  badge?: string
}

const PLANS: Plan[] = [
  {
    name: 'Starter',
    tagline: 'First-time investors testing the ecosystem.',
    price: '$100 USDT',
    features: [
      { text: 'EX-AI Bot activation' },
      { text: 'AI-managed 24/7 trading' },
      { text: 'Aurum University access' },
      { text: 'Partner support included' },
    ],
    ctaLabel: 'Start with $100 →',
    ctaHref: '/signup',
  },
  {
    name: 'Growth',
    tagline: 'Investors ready to maximize compounding returns.',
    price: '$500–$2,500',
    features: [
      { text: 'All Starter features' },
      { text: 'Higher compounding tier' },
      { text: 'Multi-exchange deployment' },
      { text: 'Priority partner access' },
      { text: 'Advanced dashboard analytics' },
    ],
    ctaLabel: 'Activate Growth →',
    ctaHref: '/signup',
    featured: true,
    badge: 'Most Popular',
  },
  {
    name: 'Advanced',
    tagline: 'Full ecosystem access across all Aurum products.',
    price: '$2,500+',
    features: [
      { text: 'All Growth features' },
      { text: 'Visa Crypto Card (physical)' },
      { text: 'Neobank account access' },
      { text: 'Partner income eligibility' },
      { text: 'Dedicated onboarding specialist' },
    ],
    ctaLabel: 'Go Advanced →',
    ctaHref: '/signup',
  },
]

const AI_FINANCE_PLANS: Plan[] = [
  { name: 'Explore', tagline: 'Understand the landscape before choosing a provider.', price: 'Discover', features: [{ text: 'AI finance orientation' }, { text: 'Goal and risk clarification' }, { text: 'Provider-neutral education' }, { text: 'Guided next steps' }], ctaLabel: 'Start Exploring →', ctaHref: '/signup' },
  { name: 'Compare', tagline: 'Evaluate compatible platforms and strategies clearly.', price: 'Evaluate', features: [{ text: 'Everything in Explore' }, { text: 'Provider comparison framework' }, { text: 'Strategy and feature matching' }, { text: 'Transparent decision support' }, { text: 'Human guidance included' }], ctaLabel: 'Compare Options →', ctaHref: '/signup', featured: true, badge: 'Recommended' },
  { name: 'Connect', tagline: 'Activate the right tools through a guided experience.', price: 'Activate', features: [{ text: 'Everything in Compare' }, { text: 'Guided provider setup' }, { text: 'Connected portfolio view' }, { text: 'Ongoing progress visibility' }, { text: 'Room to expand later' }], ctaLabel: 'Build Your Path →', ctaHref: '/signup' },
]

export default function Pricing({ variant = 'aurum' }: { variant?: 'aurum' | 'ai-finance' }) {
  const plans = variant === 'ai-finance' ? AI_FINANCE_PLANS : PLANS
  return (
    <section
      style={{
        margin: '0',
      }}
    >
      <div
        style={{
          backgroundColor: 'var(--color-surface)',
          borderRadius: 'var(--radius-section, 1.125rem)',
          border: '1px solid var(--color-border)',
          padding: 'var(--section-py) clamp(1.5rem, 4vw, 3.5rem)',
        }}
      >
        <div style={{ maxWidth: 'var(--container)', margin: '0 auto' }}>
          <div className="text-center" style={{ maxWidth: '36rem', margin: '0 auto 4rem' }}>
            <span className="badge mb-4 inline-flex">Start Where You Are</span>
            <h2 className="text-display mb-4">
              Your entry point.
              <br />
              Your pace.
            </h2>
            <p className="text-body-lg" style={{ color: 'var(--color-fg-muted)' }}>
              {variant === 'ai-finance'
                ? 'Start with understanding, compare the possibilities, and connect the right platform when you are ready.'
                : <>Every plan includes full AI bot access, guided onboarding, and partner support. Start with what you&apos;re comfortable with — scale when you&apos;re ready.</>}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                className="rounded-xl flex flex-col relative"
                style={{
                  backgroundColor: plan.featured ? 'var(--color-fg)' : 'var(--color-bg)',
                  color: plan.featured ? '#ffffff' : 'var(--color-fg)',
                  border: plan.featured ? 'none' : '1px solid var(--color-border)',
                  padding: '2rem',
                  boxShadow: plan.featured
                    ? '0 24px 48px rgba(0,0,0,0.15), 0 0 0 1px rgba(27,97,201,0.20)'
                    : undefined,
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                {plan.badge && (
                  <span
                    className="absolute -top-3 left-8 text-caption px-3 py-1 rounded-full font-semibold"
                    style={{
                      backgroundColor: 'var(--color-accent)',
                      color: '#ffffff',
                      letterSpacing: '0.02em',
                    }}
                  >
                    ⭐ {plan.badge}
                  </span>
                )}

                <h3 className="text-subheading mb-2">{plan.name}</h3>
                <p
                  className="text-caption mb-6"
                  style={{ color: plan.featured ? 'rgba(255,255,255,0.6)' : 'var(--color-fg-muted)' }}
                >
                  {plan.tagline}
                </p>

                <p className="text-heading mb-8" style={{ fontWeight: 800 }}>
                  {plan.price}
                  <span
                    className="text-caption font-normal ml-2"
                    style={{ color: plan.featured ? 'rgba(255,255,255,0.4)' : 'var(--color-fg-faint)' }}
                  >
                    {variant === 'ai-finance' ? 'your next step' : 'minimum'}
                  </span>
                </p>

                <ul className="flex flex-col gap-3 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f.text} className="flex items-start gap-3 text-body">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        className="flex-shrink-0 mt-0.5"
                      >
                        <circle
                          cx="9"
                          cy="9"
                          r="9"
                          fill={plan.featured ? 'rgba(255,255,255,0.1)' : 'var(--color-accent-light)'}
                        />
                        <path
                          d="M5.5 9l2.5 2.5 4.5-4.5"
                          stroke={plan.featured ? '#ffffff' : 'var(--color-accent)'}
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span style={{ color: plan.featured ? 'rgba(255,255,255,0.85)' : 'var(--color-fg-muted)' }}>
                        {f.text}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={plan.ctaHref}
                  className={`btn btn-lg w-full shimmer-hover ${plan.featured ? '' : 'btn-ghost'}`}
                  style={plan.featured ? { backgroundColor: 'var(--color-accent)', color: '#fff' } : {}}
                >
                  {plan.ctaLabel}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
