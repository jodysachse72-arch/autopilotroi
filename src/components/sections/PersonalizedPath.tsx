'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

/* ═══════════════════════════════════════════════════════════════
   PERSONALIZED PATH — Shows tier-specific recommended next steps
   Drops into the waiting room based on the user's readiness tier
   ═══════════════════════════════════════════════════════════════ */

interface PathStep {
  title: string
  description: string
  icon: string
  link?: string
  linkLabel?: string
  completed?: boolean
}

interface TierPath {
  title: string
  subtitle: string
  emoji: string
  color: string
  bgColor: string
  borderColor: string
  steps: PathStep[]
}

const TIER_PATHS: Record<string, TierPath> = {
  beginner: {
    title: 'Beginner Path',
    subtitle: 'You\'re new to crypto — we\'ll walk you through everything.',
    emoji: '🌱',
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-400/20',
    steps: [
      {
        title: 'Watch the Platform Overview',
        description: 'Understand what Aurum Foundation is and how the ecosystem works before anything else.',
        icon: '📺',
        link: '#videos',
        linkLabel: 'Watch Video',
      },
      {
        title: 'Learn About Crypto Wallets',
        description: 'You\'ll need Trust Wallet to interact with the platform. Don\'t worry — it\'s easy to set up.',
        icon: '👛',
        link: '/university',
        linkLabel: 'Go to University',
      },
      {
        title: 'Connect with Your Partner',
        description: 'Your assigned partner will reach out via email. They\'ll guide you through everything.',
        icon: '🤝',
      },
      {
        title: 'Start Guided Onboarding',
        description: 'Once your partner connects, follow the step-by-step onboarding checklist together.',
        icon: '🚀',
        link: '/onboarding?tier=beginner',
        linkLabel: 'Preview Steps',
      },
    ],
  },
  intermediate: {
    title: 'Intermediate Path',
    subtitle: 'You have some crypto knowledge — let\'s build on it.',
    emoji: '⚡',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-400/20',
    steps: [
      {
        title: 'Review the Trading Bot Strategy',
        description: 'Understand how EX-AI generates returns and what risk parameters to consider.',
        icon: '🤖',
        link: '#videos',
        linkLabel: 'Watch Video',
      },
      {
        title: 'Evaluate Risk vs. Reward',
        description: 'Read the risk disclaimer and understand realistic expectations for AI-managed trading.',
        icon: '⚖️',
        link: '/disclaimer',
        linkLabel: 'Read Disclaimer',
      },
      {
        title: 'Prepare 2FA + Wallet',
        description: 'Get your authenticator app ready and ensure your wallet is funded with USDC/USDT.',
        icon: '🛡️',
        link: '/onboarding?tier=intermediate',
        linkLabel: 'Onboarding Checklist',
      },
      {
        title: 'Connect & Activate',
        description: 'Your partner will share your unique registration link. You\'ll be set up in under 30 minutes.',
        icon: '✅',
      },
    ],
  },
  advanced: {
    title: 'Advanced Path',
    subtitle: 'You know crypto — skip the basics, get to the strategy.',
    emoji: '🚀',
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-400/20',
    steps: [
      {
        title: 'Dive Into the Products',
        description: 'Review the full product suite: trading bots, exchange, crypto card, and neobank.',
        icon: '🔍',
        link: '/products',
        linkLabel: 'View Products',
      },
      {
        title: 'Analyze the Auto-Reinvest Strategy',
        description: 'Compound vs. withdraw daily — understand the math behind each approach.',
        icon: '📊',
        link: '#videos',
        linkLabel: 'Watch Video',
      },
      {
        title: 'Quick Security Check',
        description: 'Confirm VPN, 2FA, and wallet are all configured. Skip the tutorials.',
        icon: '✓',
        link: '/onboarding?tier=advanced',
        linkLabel: 'Pre-Flight Checklist',
      },
      {
        title: 'Partner Opportunity',
        description: 'Interested in building a team? Explore the partner referral program.',
        icon: '🤝',
        link: '/partner-tools',
        linkLabel: 'Learn More',
      },
    ],
  },
}

interface PersonalizedPathProps {
  tier: string
  watchedVideoCount?: number
}

export default function PersonalizedPath({ tier, watchedVideoCount = 0 }: PersonalizedPathProps) {
  const path = TIER_PATHS[tier] || TIER_PATHS.beginner

  // Auto-complete first step if they've watched at least 1 video
  const steps = path.steps.map((step, i) => ({
    ...step,
    completed: i === 0 && watchedVideoCount > 0,
  }))

  return (
    <section className="mx-auto max-w-4xl px-6 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`rounded-2xl border ${path.borderColor} ${path.bgColor} p-6 sm:p-8`}
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <span className="text-3xl">{path.emoji}</span>
          <div>
            <h3 className={`font-[var(--font-sora)] text-lg font-bold ${path.color}`}>
              Your Recommended {path.title}
            </h3>
            <p className="text-sm text-white/50">{path.subtitle}</p>
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-4">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`relative flex gap-4 rounded-xl border border-white/5 bg-white/[0.03] p-4 transition hover:bg-white/[0.06] ${
                step.completed ? 'opacity-60' : ''
              }`}
            >
              {/* Step number + connector */}
              <div className="flex flex-col items-center">
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                  step.completed
                    ? 'bg-emerald-500/20 text-emerald-400'
                    : 'bg-white/10 text-white/60'
                }`}>
                  {step.completed ? '✓' : step.icon}
                </div>
                {i < steps.length - 1 && (
                  <div className="mt-2 h-full w-px bg-white/5" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h4 className={`font-semibold ${step.completed ? 'text-white/40 line-through' : 'text-white'}`}>
                  {step.title}
                </h4>
                <p className="mt-1 text-sm text-white/40">{step.description}</p>
                {step.link && !step.completed && (
                  <Link
                    href={step.link}
                    className={`mt-2 inline-block text-sm font-semibold ${path.color} hover:underline`}
                  >
                    {step.linkLabel || 'Learn More'} →
                  </Link>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
