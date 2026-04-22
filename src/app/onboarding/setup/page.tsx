'use client'

import { useState } from 'react'
import type { ComponentType } from 'react'
import Link from 'next/link'
import Logo from '@/components/ui/Logo'
import { motion, AnimatePresence } from 'framer-motion'
import {
  SecurityIcon,
  BankIcon,
  AutomationIcon,
  GrowthIcon,
  TrendingUpIcon,
  CheckCircleIcon,
  SparkleIcon,
} from '@/components/ui/Icons'

type IconCmp = ComponentType<{ className?: string; strokeWidth?: number }>

interface SetupStep {
  id: string
  title: string
  Icon: IconCmp
  accent: string
  description: string
  checklist: string[]
  videoId?: string
  critical?: boolean
}

const SETUP_STEPS: SetupStep[] = [
  {
    id: 'verify-2fa',
    title: 'Verify 2FA is Active',
    Icon: SecurityIcon,
    accent: '#dc2626',
    description: 'Before doing anything else, confirm your Two-Factor Authentication is enabled and working.',
    checklist: [
      'Log into your Aurum back office',
      'Go to Security Settings',
      'Confirm 2FA shows "Active" or "Enabled"',
      'Test it by logging out and back in \u2014 you should be prompted for your authenticator code',
    ],
    videoId: 'K8qYdD1sC7w',
    critical: true,
  },
  {
    id: 'add-funds',
    title: 'Add Funds to Your Account',
    Icon: BankIcon,
    accent: '#d97706',
    description: 'Now that your account is secured, it\u0027s time to make your first deposit.',
    checklist: [
      'In your Aurum back office, go to Deposits',
      'Select your deposit method (USDC BEP20, USDC ERC20, or USDT)',
      'Copy the deposit wallet address',
      'Open Trust Wallet and send your USDC/USDT to that address',
      'Wait for the transaction to confirm (usually 2-10 minutes)',
      'Your balance will appear in your Aurum dashboard',
    ],
    videoId: 'ZxTVBeeeJNQ',
  },
  {
    id: 'ex-ai-bot',
    title: 'Set Up the EX-AI Bot',
    Icon: AutomationIcon,
    accent: '#059669',
    description: 'The flagship trading bot that works 24/7. Choose your tier and activate it.',
    checklist: [
      'Navigate to Bots \u2192 EX-AI Bot in your back office',
      'Select your account tier based on your deposit amount',
      'Review the tier benefits and expected returns',
      'Click "Activate" to start the bot',
      'The bot begins trading immediately \u2014 you\u0027ll see results within 24 hours',
    ],
    videoId: 'CRuZqkc8sh4',
  },
  {
    id: 'reinvest',
    title: 'Configure Auto-Reinvest',
    Icon: GrowthIcon,
    accent: '#0891b2',
    description: 'Choose whether to compound your earnings or withdraw daily. You can change this anytime.',
    checklist: [
      'Go to your EX-AI Bot settings',
      'Find the "Reinvest" toggle',
      'Choose: ON = profits automatically compound | OFF = profits go to withdrawable balance',
      'Recommended for beginners: Start with reinvest ON for 90 days, then evaluate',
      'You can switch between modes at any time',
    ],
    videoId: '1BI9_YikUKc',
  },
  {
    id: 'dashboard-tour',
    title: 'Dashboard Overview & Next Steps',
    Icon: TrendingUpIcon,
    accent: '#1b61c9',
    description: 'Know your way around the back office and understand what\u0027s next.',
    checklist: [
      'Portfolio Overview: Track total value, gains, and bot performance',
      'Transaction History: View all deposits, withdrawals, and bot trades',
      'Referral Center: Share your invite code and build a team',
      'Support: Access live support via the Help Center',
      'Mobile App: Download the Aurum app for on-the-go access',
    ],
    videoId: 'GJEK3wOjlyQ',
  },
]

export default function SetupPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set())

  const step = SETUP_STEPS[currentStep]
  const progress = Math.round((completedSteps.size / SETUP_STEPS.length) * 100)

  function completeStep(stepId: string) {
    const updated = new Set(completedSteps)
    updated.add(stepId)
    setCompletedSteps(updated)
  }

  const allDone = SETUP_STEPS.every(s => completedSteps.has(s.id))

  return (
    <div className="page-bg" style={{ minHeight: '100vh' }}>
      <header className="sticky top-0 z-50" style={{
        borderBottom: '1px solid var(--color-border)',
        background: 'rgba(255,255,255,0.90)',
        backdropFilter: 'blur(12px)',
      }}>
        <div className="container-xl" style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0.75rem 1.5rem',
        }}>
          <Link href="/"><Logo size={32} showText /></Link>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.375rem',
            borderRadius: '999px', padding: '0.375rem 0.875rem',
            fontSize: 'var(--text-caption)', fontWeight: 700,
            textTransform: 'uppercase', letterSpacing: '0.08em',
            background: 'rgba(124,58,237,0.10)',
            color: '#7c3aed',
            border: '1px solid rgba(124,58,237,0.25)',
            fontFamily: 'var(--font-display)',
          }}>
            <SparkleIcon className="w-3.5 h-3.5" />
            Post-Signup Setup
          </span>
        </div>
      </header>

      <div style={{ maxWidth: '48rem', margin: '0 auto', padding: '2rem 1.5rem 4rem' }}>
        {/* Progress */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 'var(--text-body)', color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>
            <span>Setup Progress</span>
            <span style={{ fontVariantNumeric: 'tabular-nums', fontWeight: 700 }}>{progress}%</span>
          </div>
          <div style={{ height: '0.5rem', width: '100%', overflow: 'hidden', borderRadius: '999px', background: '#fff', border: '1px solid var(--color-border)' }}>
            <motion.div
              style={{ height: '100%', borderRadius: '999px', background: 'linear-gradient(90deg,#7c3aed 0%,#3b82f6 100%)' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>

          {/* Step indicators */}
          <div style={{ marginTop: '1.25rem', display: 'flex', justifyContent: 'space-between', gap: '0.5rem' }}>
            {SETUP_STEPS.map((s, i) => {
              const isActive = i === currentStep
              const isDone = completedSteps.has(s.id)
              return (
                <button
                  key={s.id}
                  onClick={() => setCurrentStep(i)}
                  aria-label={`Go to step ${i + 1}: ${s.title}`}
                  style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    width: '2.5rem', height: '2.5rem', borderRadius: '999px',
                    background: isActive ? '#1b61c9' : isDone ? 'rgba(16,185,129,0.15)' : '#fff',
                    border: isActive
                      ? '1px solid #1b61c9'
                      : isDone
                        ? '1px solid rgba(16,185,129,0.30)'
                        : '1px solid var(--color-border)',
                    color: isActive ? '#fff' : isDone ? '#059669' : s.accent,
                    boxShadow: isActive ? '0 8px 18px rgba(27,97,201,0.30)' : 'none',
                    transform: isActive ? 'scale(1.08)' : 'scale(1)',
                    transition: 'all 0.2s',
                    cursor: 'pointer',
                  }}
                >
                  {isDone ? <CheckCircleIcon className="w-4 h-4" /> : <s.Icon className="w-4 h-4" />}
                </button>
              )
            })}
          </div>
        </div>

        {/* Step content */}
        <AnimatePresence mode="wait">
          {!allDone ? (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.35 }}
              style={{
                borderRadius: '1.25rem',
                border: '1px solid var(--color-border)',
                background: '#fff',
                overflow: 'hidden',
                boxShadow: '0 4px 18px rgba(15,23,42,0.04)',
              }}
            >
              <div style={{
                padding: '1.5rem',
                borderBottom: '1px solid var(--color-border)',
                background: step.critical ? 'rgba(220,38,38,0.05)' : 'transparent',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    width: '3rem', height: '3rem', borderRadius: '0.75rem',
                    background: step.accent + '14', color: step.accent,
                  }}>
                    <step.Icon className="w-6 h-6" />
                  </span>
                  <div>
                    <div style={{
                      fontSize: 'var(--text-caption)', fontWeight: 700,
                      textTransform: 'uppercase', letterSpacing: '0.1em',
                      color: 'var(--color-text-muted)',
                      fontFamily: 'var(--font-display)',
                    }}>
                      Step {currentStep + 1} of {SETUP_STEPS.length}
                    </div>
                    <h2 style={{
                      fontFamily: 'var(--font-display)', fontWeight: 700,
                      fontSize: '1.5rem', color: '#181d26', margin: '0.125rem 0 0',
                    }}>
                      {step.title}
                    </h2>
                  </div>
                </div>
                {step.critical && (
                  <div style={{
                    marginTop: '0.875rem',
                    borderRadius: '0.5rem',
                    background: 'rgba(220,38,38,0.10)',
                    border: '1px solid rgba(220,38,38,0.25)',
                    padding: '0.625rem 0.875rem',
                    fontSize: 'var(--text-body)', color: '#b91c1c', fontWeight: 500,
                  }}>
                    Do not deposit until 2FA is confirmed active.
                  </div>
                )}
              </div>

              <div style={{ padding: '1.5rem' }}>
                <p style={{ marginBottom: '1.5rem', color: 'var(--color-text-weak)', lineHeight: 'var(--lh-relaxed)' }}>
                  {step.description}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  {step.checklist.map((item, i) => (
                    <div key={i} style={{
                      display: 'flex', alignItems: 'flex-start', gap: '0.75rem',
                      borderRadius: '0.75rem',
                      background: '#f8fafc',
                      padding: '0.75rem 0.875rem',
                    }}>
                      <span style={{
                        display: 'inline-flex', flexShrink: 0,
                        alignItems: 'center', justifyContent: 'center',
                        marginTop: '0.125rem',
                        width: '1.25rem', height: '1.25rem', borderRadius: '999px',
                        background: 'rgba(27,97,201,0.18)', color: '#1b61c9',
                        fontSize: 'var(--text-caption)', fontWeight: 700,
                      }}>
                        {i + 1}
                      </span>
                      <span style={{ fontSize: 'var(--text-body)', color: 'var(--color-text-weak)', lineHeight: 'var(--lh-relaxed)' }}>
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                {step.videoId && (
                  <div style={{ marginBottom: '1.5rem', overflow: 'hidden', borderRadius: '0.75rem', border: '1px solid var(--color-border)' }}>
                    <div style={{ aspectRatio: '16 / 9', width: '100%' }}>
                      <iframe
                        src={`https://www.youtube.com/embed/${step.videoId}?rel=0`}
                        title={step.title}
                        style={{ width: '100%', height: '100%', border: 0 }}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </div>
                )}

                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  paddingTop: '1rem',
                  borderTop: '1px solid var(--color-border)', gap: '1rem',
                }}>
                  <button
                    onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                    disabled={currentStep === 0}
                    style={{
                      background: 'transparent', border: 'none', cursor: currentStep === 0 ? 'not-allowed' : 'pointer',
                      fontSize: 'var(--text-body)', fontWeight: 500,
                      color: 'var(--color-text-muted)',
                      opacity: currentStep === 0 ? 0.3 : 1,
                      padding: 0,
                    }}
                  >
                    \u2190 Previous
                  </button>
                  <button
                    onClick={() => {
                      completeStep(step.id)
                      if (currentStep < SETUP_STEPS.length - 1) setCurrentStep(currentStep + 1)
                    }}
                    style={{
                      borderRadius: '0.75rem',
                      background: '#1b61c9',
                      padding: '0.75rem 1.5rem',
                      fontFamily: 'var(--font-display)',
                      fontSize: 'var(--text-body)', fontWeight: 700,
                      color: '#fff', border: 'none',
                      cursor: 'pointer',
                      boxShadow: '0 8px 18px rgba(27,97,201,0.20)',
                    }}
                  >
                    {currentStep < SETUP_STEPS.length - 1 ? 'Complete & Continue \u2192' : 'Finish Setup \u2713'}
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{ textAlign: 'center', padding: '4rem 1rem' }}
            >
              <div style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                width: '3.5rem', height: '3.5rem', borderRadius: '999px',
                background: 'rgba(16,185,129,0.15)', color: '#059669',
                marginBottom: '1.5rem',
              }}>
                <CheckCircleIcon className="w-7 h-7" />
              </div>
              <h2 className="text-section" style={{ color: '#181d26', marginBottom: '0.75rem' }}>
                You&apos;re All Set
              </h2>
              <p style={{ margin: '0 auto 2rem', maxWidth: '28rem', color: 'var(--color-text-weak)', lineHeight: 'var(--lh-relaxed)' }}>
                Your Aurum account is secured, funded, and your EX-AI bot is working for you 24/7. Welcome to the future of finance.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '0.875rem' }}>
                <Link href="/dashboard" className="btn btn-primary-lg shimmer-hover">
                  Go to Dashboard \u2192
                </Link>
                <Link href="/university" className="btn btn-ghost btn-primary-lg shimmer-hover">
                  Continue Learning
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
