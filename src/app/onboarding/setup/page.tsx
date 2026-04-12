'use client'

import { useState } from 'react'
import Link from 'next/link'
import Logo from '@/components/ui/Logo'
import { motion, AnimatePresence } from 'framer-motion'

const SETUP_STEPS = [
  {
    id: 'verify-2fa',
    title: 'Verify 2FA is Active',
    icon: '🛡️',
    description: 'Before doing anything else, confirm your Two-Factor Authentication is enabled and working.',
    checklist: [
      'Log into your Aurum back office',
      'Go to Security Settings',
      'Confirm 2FA shows "Active" or "Enabled"',
      'Test it by logging out and back in — you should be prompted for your authenticator code',
    ],
    videoId: 'K8qYdD1sC7w',
    critical: true,
  },
  {
    id: 'add-funds',
    title: 'Add Funds to Your Account',
    icon: '💰',
    description: 'Now that your account is secured, it\'s time to make your first deposit.',
    checklist: [
      'In your Aurum back office, go to Deposits',
      'Select your deposit method (USDC BEP20, USDC ERC20, or USDT)',
      'Copy the deposit wallet address',
      'Open Trust Wallet and send your USDC/USDT to that address',
      'Wait for the transaction to confirm (usually 2-10 minutes)',
      'Your balance will appear in your Aurum dashboard',
    ],
    videoId: '4GNo8E1yj7g',
  },
  {
    id: 'ex-ai-bot',
    title: 'Set Up the EX-AI Bot',
    icon: '🤖',
    description: 'The flagship trading bot that works 24/7. Choose your tier and activate it.',
    checklist: [
      'Navigate to Bots → EX-AI Bot in your back office',
      'Select your account tier based on your deposit amount',
      'Review the tier benefits and expected returns',
      'Click "Activate" to start the bot',
      'The bot begins trading immediately — you\'ll see results within 24 hours',
    ],
    videoId: 'kbGSa11bBHc',
  },
  {
    id: 'reinvest',
    title: 'Configure Auto-Reinvest',
    icon: '♻️',
    description: 'Choose whether to compound your earnings or withdraw daily. You can change this anytime.',
    checklist: [
      'Go to your EX-AI Bot settings',
      'Find the "Reinvest" toggle',
      'Choose: ON = profits automatically compound | OFF = profits go to withdrawable balance',
      'Recommended for beginners: Start with reinvest ON for 90 days, then evaluate',
      'You can switch between modes at any time',
    ],
    videoId: 'V3XEvrIFHSA',
  },
  {
    id: 'dashboard-tour',
    title: 'Dashboard Overview & Next Steps',
    icon: '📊',
    description: 'Know your way around the back office and understand what\'s next.',
    checklist: [
      'Portfolio Overview: Track total value, gains, and bot performance',
      'Transaction History: View all deposits, withdrawals, and bot trades',
      'Referral Center: Share your invite code and build a team',
      'Support: Access live support via the Help Center',
      'Mobile App: Download the Aurum app for on-the-go access',
    ],
    videoId: 'yTb2rAJhU7w',
  },
]

export default function SetupPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set())

  const step = SETUP_STEPS[currentStep]
  const progress = Math.round(((completedSteps.size) / SETUP_STEPS.length) * 100)

  function completeStep(stepId: string) {
    const updated = new Set(completedSteps)
    updated.add(stepId)
    setCompletedSteps(updated)
  }

  const allDone = SETUP_STEPS.every(s => completedSteps.has(s.id))

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-[var(--border-primary)] bg-[var(--bg-primary)]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
          <Link href="/">
            <Logo size={32} showText />
          </Link>
          <div className="rounded-full bg-violet-500/15 border border-violet-400/30 px-3 py-1 text-xs font-semibold text-violet-400 uppercase tracking-wider">
            ⚙️ Post-Signup Setup
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-6 py-8">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm text-[var(--text-tertiary)] mb-2">
            <span>Setup Progress</span>
            <span>{progress}%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-[var(--bg-card)]">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-violet-500 to-blue-500"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
          {/* Step indicators */}
          <div className="mt-4 flex justify-between">
            {SETUP_STEPS.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setCurrentStep(i)}
                className={`flex h-10 w-10 items-center justify-center rounded-full text-lg transition-all ${
                  i === currentStep
                    ? 'bg-blue-500 shadow-lg shadow-blue-500/30 scale-110'
                    : completedSteps.has(s.id)
                    ? 'bg-emerald-500/20 border border-emerald-500/30'
                    : 'bg-[var(--bg-card)] border border-[var(--border-primary)]'
                }`}
              >
                {completedSteps.has(s.id) ? '✅' : s.icon}
              </button>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          {!allDone ? (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.35 }}
              className="rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-card)] overflow-hidden"
            >
              {/* Header */}
              <div className={`px-6 py-5 border-b ${step.critical ? 'bg-red-500/10 border-red-500/20' : 'border-[var(--border-primary)]'}`}>
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{step.icon}</span>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)]">
                      Step {currentStep + 1} of {SETUP_STEPS.length}
                    </div>
                    <h2 className="font-[var(--font-sora)] text-2xl font-bold text-[var(--text-primary)]">
                      {step.title}
                    </h2>
                  </div>
                </div>
                {step.critical && (
                  <div className="mt-3 rounded-lg bg-red-500/15 border border-red-500/30 px-3 py-2 text-sm text-red-400 font-medium">
                    ⚠️ Do not deposit until 2FA is confirmed active
                  </div>
                )}
              </div>

              {/* Body */}
              <div className="p-6">
                <p className="mb-6 text-[var(--text-secondary)] leading-relaxed">
                  {step.description}
                </p>

                <div className="space-y-3 mb-6">
                  {step.checklist.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 rounded-xl bg-[var(--bg-card-hover)] p-3">
                      <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-500/20 text-xs font-bold text-blue-400">
                        {i + 1}
                      </span>
                      <span className="text-sm text-[var(--text-secondary)] leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>

                {step.videoId && (
                  <div className="mb-6 overflow-hidden rounded-xl border border-[var(--border-primary)]">
                    <div className="aspect-video w-full">
                      <iframe
                        src={`https://www.youtube.com/embed/${step.videoId}?rel=0`}
                        title={step.title}
                        className="h-full w-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t border-[var(--border-primary)]">
                  <button
                    onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                    disabled={currentStep === 0}
                    className="text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition disabled:opacity-30"
                  >
                    ← Previous
                  </button>
                  <button
                    onClick={() => {
                      completeStep(step.id)
                      if (currentStep < SETUP_STEPS.length - 1) {
                        setCurrentStep(currentStep + 1)
                      }
                    }}
                    className="rounded-xl bg-blue-500 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-400"
                  >
                    {currentStep < SETUP_STEPS.length - 1 ? 'Complete & Continue →' : 'Finish Setup ✓'}
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            /* ── All Done ── */
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <div className="text-6xl mb-6">🎉</div>
              <h2 className="font-[var(--font-sora)] text-3xl font-bold text-[var(--text-primary)] mb-4">
                You&apos;re All Set!
              </h2>
              <p className="mx-auto max-w-md text-[var(--text-secondary)] leading-relaxed mb-8">
                Your Aurum account is secured, funded, and your EX-AI bot is working for you 24/7.
                Welcome to the future of finance.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/dashboard"
                  className="rounded-xl bg-[linear-gradient(180deg,#3b82f6_0%,#2563eb_100%)] px-8 py-3 font-semibold text-white shadow-lg shadow-blue-600/25"
                >
                  Go to Dashboard →
                </Link>
                <Link
                  href="/university"
                  className="rounded-xl border border-[var(--border-primary)] bg-[var(--bg-card)] px-8 py-3 font-semibold text-[var(--text-primary)]"
                >
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
