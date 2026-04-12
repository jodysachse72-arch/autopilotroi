'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Logo from '@/components/ui/Logo'
import { motion, AnimatePresence } from 'framer-motion'
import StepByStepGuide, { type GuideStep } from '@/components/ui/StepByStepGuide'
import { InfoTip } from '@/components/ui/Tooltip'

/* ─── Beginner Onboarding Steps ─── */

// Rich visual guides for each setup step
const VPN_GUIDE: GuideStep[] = [
  {
    title: 'Choose a VPN Provider',
    instruction: 'Download one of these trusted VPN apps from your app store. All three work on iPhone, Android, Mac, and Windows.',
    illustration: '🔎',
    tip: 'NordVPN is the most beginner-friendly. ExpressVPN is fastest. Surfshark is cheapest.',
  },
  {
    title: 'Install & Create Account',
    instruction: 'Open the app and create an account. Most offer a free trial or 30-day money-back guarantee so you can try it risk-free.',
    illustration: '📲',
    tip: 'Use a strong password and enable 2FA on your VPN account too.',
  },
  {
    title: 'Connect to a Server',
    instruction: 'Tap "Quick Connect" or choose a server in a supported region (US, UK, or Canada work best). You\'ll see a green shield icon when connected.',
    illustration: '🌐',
  },
  {
    title: 'Verify Your Connection',
    instruction: 'Visit whatismyipaddress.com in your browser. Your displayed location should match the server you chose, not your real location.',
    illustration: '✅',
    tip: 'Bookmark this site so you can quickly verify your VPN is active.',
  },
  {
    title: 'Make It a Habit',
    instruction: 'Always connect your VPN BEFORE opening any crypto platform, wallet, or exchange. Think of it like locking your front door before leaving the house.',
    illustration: '🔒',
    warning: 'If your VPN disconnects during a transaction, stop what you\'re doing and reconnect before continuing.',
  },
]

const WALLET_GUIDE: GuideStep[] = [
  {
    title: 'Download Trust Wallet',
    instruction: 'Go to your phone\'s app store (App Store for iPhone, Google Play for Android). Search for "Trust Wallet" — look for the blue shield icon. Only download the official app.',
    illustration: '📱',
    warning: 'There are fake Trust Wallet apps. The real one is published by "Six Days LLC" and has millions of downloads.',
  },
  {
    title: 'Create a New Wallet',
    instruction: 'Open the app and tap "Create a new wallet." The app will generate your wallet — this takes a few seconds.',
    illustration: '🆕',
  },
  {
    title: 'Write Down Your Recovery Phrase',
    instruction: 'You\'ll see 12 random words. Write these down ON PAPER (not a screenshot, not a note on your phone). Store the paper somewhere safe like a lockbox or safe.',
    illustration: '📝',
    warning: 'If you lose these 12 words, you lose access to your crypto FOREVER. There is no "forgot password" for crypto wallets. No one can recover it — not Trust Wallet, not us, not anyone.',
  },
  {
    title: 'Confirm Your Phrase',
    instruction: 'The app will ask you to tap the 12 words in the correct order. This proves you wrote them down correctly.',
    illustration: '🔢',
    tip: 'If you get stuck, start over and write them down more carefully this time.',
  },
  {
    title: 'Your Wallet Is Ready',
    instruction: 'You now have a crypto wallet. You\'ll see a receive address (a long string of letters and numbers). This is like your bank account number — you can share it safely to receive crypto.',
    illustration: '🎉',
    tip: 'Tap the USDC/USDT coin to see your specific receive address for those tokens.',
  },
]

const FUNDING_GUIDE: GuideStep[] = [
  {
    title: 'Understand What You\'re Buying',
    instruction: 'You need USDC or USDT — these are "stablecoins" that are always worth exactly $1 USD. They\'re how money moves in and out of crypto platforms.',
    illustration: '💵',
    tip: 'USDC is slightly more regulated/trusted. Both work fine.',
  },
  {
    title: 'Buy Inside Trust Wallet',
    instruction: 'The easiest way: Open Trust Wallet → tap "Buy" → choose USDC → enter the dollar amount → pay with your debit card or Apple Pay. The crypto appears in your wallet within minutes.',
    illustration: '🛒',
    tip: 'There\'s a small fee (1-3%) for buying with a card. This is normal and charged by the payment processor, not us.',
  },
  {
    title: 'Alternative: Use an Exchange',
    instruction: 'If the in-app purchase doesn\'t work for your bank, create an account on Coinbase, Binance, or Kraken. Buy USDC there, then transfer it to your Trust Wallet address.',
    illustration: '🔄',
    warning: 'When transferring, double-check the wallet address AND the network (usually BEP20 or ERC20). Sending to the wrong address or network means lost funds.',
  },
  {
    title: 'Check Your Balance',
    instruction: 'Open Trust Wallet and check that your USDC or USDT balance reflects the amount you purchased. It may take 5-15 minutes to appear.',
    illustration: '✅',
  },
]

const TWO_FA_GUIDE: GuideStep[] = [
  {
    title: 'Download an Authenticator App',
    instruction: 'Get Google Authenticator or Authy from your app store. Both are free. Authy has a backup feature which is slightly safer.',
    illustration: '📲',
    tip: 'We recommend Authy because it can back up your codes to the cloud. Google Authenticator codes are lost if you lose your phone.',
  },
  {
    title: 'Open Security Settings',
    instruction: 'Log into your Aurum back office → go to Settings → Security → Two-Factor Authentication → tap "Enable."',
    illustration: '⚙️',
  },
  {
    title: 'Scan the QR Code',
    instruction: 'Your screen will show a QR code. Open your authenticator app → tap the "+" button → "Scan QR code" → point your phone camera at the code on your screen.',
    illustration: '📷',
  },
  {
    title: 'Save Your Backup Codes',
    instruction: 'You\'ll receive backup codes. Write these down and store them with your wallet recovery phrase. These are your emergency access if you lose your phone.',
    illustration: '💾',
    warning: 'Without backup codes AND without your phone, you will be locked out of your account. Take this seriously.',
  },
  {
    title: 'Test It',
    instruction: 'Log out and log back in. You should now be asked for a 6-digit code from your authenticator app. Enter it to confirm 2FA is working.',
    illustration: '🧪',
    tip: 'The code changes every 30 seconds. If it expires while you\'re typing, just wait for the next one.',
  },
]

const BEGINNER_STEPS = [
  {
    id: 'vpn',
    title: 'Set Up a VPN',
    subtitle: 'Privacy & Access',
    icon: '🔒',
    description: 'A VPN protects your identity and ensures you can access crypto platforms from anywhere in the world.',
    details: [
      'Download a trusted VPN app (NordVPN, ExpressVPN, or Surfshark are recommended)',
      'Connect to a server in a supported region',
      'Always use VPN before accessing Aurum or any crypto platform',
      'This protects your funds and ensures uninterrupted access',
    ],
    videoId: 'MmAnR4YAPv4',
    guide: VPN_GUIDE,
    guideColor: 'blue' as const,
    // Future tutorial video (uncomment when ready):
    // tutorialVideoId: 'YOUR_VPN_TUTORIAL_ID',
  },
  {
    id: 'wallet',
    title: 'Install Trust Wallet',
    subtitle: 'Your Crypto Wallet',
    icon: '👛',
    description: 'Trust Wallet is where your crypto lives before it enters Aurum. Think of it as your personal bank vault.',
    details: [
      'Download Trust Wallet from the official app store',
      'Create a new wallet and WRITE DOWN your recovery phrase (12 words)',
      'Never share your recovery phrase with anyone — not even support',
      'This wallet will be used to send USDC/USDT to Aurum',
    ],
    videoId: 'SXpfGOUfEKg',
    guide: WALLET_GUIDE,
    guideColor: 'amber' as const,
  },
  {
    id: 'funding',
    title: 'How to Buy Crypto',
    subtitle: 'Fiat On-Ramp',
    icon: '💳',
    description: 'You\'ll need USDC or USDT stablecoins to fund your Aurum account. Here\'s how to get them.',
    details: [
      'Option 1: Buy crypto directly in Trust Wallet using a debit card',
      'Option 2: Use Coinbase, Binance, or another exchange to buy USDC',
      'Transfer your USDC to your Trust Wallet address',
      'Make sure you\'re using the correct network (BEP20 or ERC20)',
    ],
    videoId: '4GNo8E1yj7g',
    guide: FUNDING_GUIDE,
    guideColor: 'emerald' as const,
  },
  {
    id: '2fa',
    title: 'Enable Two-Factor Authentication',
    subtitle: 'Critical Security',
    icon: '🛡️',
    description: '2FA is REQUIRED before you deposit any funds. This is your most important security step.',
    details: [
      'Download Google Authenticator or Authy on your phone',
      'In your Aurum back office, go to Security → Enable 2FA',
      'Scan the QR code with your authenticator app',
      'Save your backup codes in a safe place',
      '⚠️ DO NOT skip this step — it protects your funds from unauthorized access',
    ],
    videoId: 'K8qYdD1sC7w',
    critical: true,
    guide: TWO_FA_GUIDE,
    guideColor: 'red' as const,
  },
  {
    id: 'signup',
    title: 'Create Your Aurum Account',
    subtitle: 'Final Step',
    icon: '🚀',
    description: 'Now you\'re ready to create your Aurum back office account and start your journey.',
    details: [
      'Click the button below to go to the Aurum signup page',
      'Use your partner\'s referral link (provided in the button)',
      'Complete the registration form',
      'Verify your email and log in',
      'You\'ll land in your Aurum back office — ready to activate!',
    ],
    isSignup: true,
  },
]

/* ─── Advanced Checklist ─── */
const ADVANCED_CHECKLIST = [
  { id: 'vpn', label: 'VPN configured and connected', icon: '🔒' },
  { id: 'wallet', label: 'Trust Wallet installed with recovery phrase secured', icon: '👛' },
  { id: '2fa', label: '2FA authenticator app ready (Google Authenticator / Authy)', icon: '🛡️' },
  { id: 'funds', label: 'USDC/USDT ready to deposit', icon: '💰' },
]




export default function OnboardingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
      </div>
    }>
      <OnboardingContent />
    </Suspense>
  )
}

function OnboardingContent() {
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set())
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set())
  const searchParams = useSearchParams()
  const router = useRouter()

  const tier = searchParams.get('tier') || 'beginner'
  const ref = searchParams.get('ref') || ''
  const isAdvanced = tier === 'advanced'

  const aurumSignupUrl = ref
    ? `https://app.aurfrn.com/register?ref=${ref}`
    : 'https://app.aurfrn.com/register'

  useEffect(() => {
    const saved = localStorage.getItem('autopilotroi-onboarding-progress')
    if (saved) {
      try { setCompletedSteps(new Set(JSON.parse(saved))) } catch { /* ignore */ }
    }
  }, [])

  function completeStep(stepId: string) {
    const updated = new Set(completedSteps)
    updated.add(stepId)
    setCompletedSteps(updated)
    localStorage.setItem('autopilotroi-onboarding-progress', JSON.stringify([...updated]))
  }

  function toggleChecked(id: string) {
    const updated = new Set(checkedItems)
    if (updated.has(id)) updated.delete(id)
    else updated.add(id)
    setCheckedItems(updated)
  }

  const allChecked = ADVANCED_CHECKLIST.every(item => checkedItems.has(item.id))
  const step = BEGINNER_STEPS[currentStep]
  const progress = Math.round(((currentStep + (completedSteps.has(step?.id) ? 1 : 0)) / BEGINNER_STEPS.length) * 100)

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-[var(--border-primary)] bg-[var(--bg-primary)]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
          <Link href="/">
            <Logo size={32} showText />
          </Link>
          <div className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${
            isAdvanced ? 'bg-emerald-500/15 border border-emerald-400/30 text-emerald-400' : 'bg-amber-500/15 border border-amber-400/30 text-amber-400'
          }`}>
            {isAdvanced ? '🚀 Advanced' : '🌱 Guided'} Path
          </div>
        </div>
      </header>

      {isAdvanced ? (
        /* ═══════════════════════════════════════════════
            ADVANCED — Quick Checklist
        ═══════════════════════════════════════════════ */
        <div className="mx-auto max-w-2xl px-6 py-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }} className="text-center mb-12">
            <div className="mb-4 text-5xl">🚀</div>
            <h1 className="font-[var(--font-sora)] text-3xl font-bold text-[var(--text-primary)] mb-3">
              Advanced Fast Track
            </h1>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Confirm you&apos;re ready, then go straight to Aurum signup.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }} className="rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-card)] p-6 mb-8">
            <h2 className="mb-4 font-semibold text-[var(--text-primary)]">Pre-Flight Checklist</h2>
            <div className="space-y-3">
              {ADVANCED_CHECKLIST.map((item) => (
                <button
                  key={item.id}
                  onClick={() => toggleChecked(item.id)}
                  className={`flex w-full items-center gap-3 rounded-xl border p-4 text-left transition-all ${
                    checkedItems.has(item.id)
                      ? 'border-emerald-500/30 bg-emerald-500/10'
                      : 'border-[var(--border-primary)] bg-[var(--bg-card-hover)] hover:border-blue-500/30'
                  }`}
                >
                  <div className={`flex h-6 w-6 items-center justify-center rounded-md border-2 transition ${
                    checkedItems.has(item.id)
                      ? 'border-emerald-500 bg-emerald-500'
                      : 'border-[var(--text-muted)]'
                  }`}>
                    {checkedItems.has(item.id) && (
                      <svg className="h-3.5 w-3.5 fill-white" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <span className="text-xl">{item.icon}</span>
                  <span className={`font-medium ${checkedItems.has(item.id) ? 'text-emerald-400' : 'text-[var(--text-primary)]'}`}>
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}>
            <a
              href={aurumSignupUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`block w-full rounded-xl py-4 text-center font-bold text-white text-lg transition-all ${
                allChecked
                  ? 'bg-[linear-gradient(180deg,#3b82f6_0%,#2563eb_100%)] shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 cursor-pointer'
                  : 'bg-slate-600 cursor-not-allowed opacity-60'
              }`}
              onClick={(e) => { if (!allChecked) e.preventDefault() }}
            >
              {allChecked ? 'Create Aurum Account →' : 'Complete checklist to continue'}
            </a>
          </motion.div>
        </div>
      ) : (
        /* ═══════════════════════════════════════════════
            BEGINNER — Guided Step-by-Step
        ═══════════════════════════════════════════════ */
        <div className="mx-auto max-w-3xl px-6 py-8">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex items-center justify-between text-sm text-[var(--text-tertiary)] mb-2">
              <span>Onboarding Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-[var(--bg-card)]">
              <motion.div
                className="h-full rounded-full bg-blue-500"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>
            {/* Step indicators */}
            <div className="mt-4 flex justify-between">
              {BEGINNER_STEPS.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => setCurrentStep(i)}
                  className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-all ${
                    i === currentStep
                      ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30 scale-110'
                      : completedSteps.has(s.id)
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-[var(--bg-card)] text-[var(--text-muted)] border border-[var(--border-primary)]'
                  }`}
                >
                  {completedSteps.has(s.id) ? '✓' : i + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Current Step Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.35 }}
              className="rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-card)] overflow-hidden"
            >
              {/* Step Header */}
              <div className={`px-6 py-5 ${step.critical ? 'bg-red-500/10 border-b border-red-500/20' : 'border-b border-[var(--border-primary)]'}`}>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">{step.icon}</span>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)]">
                      Step {currentStep + 1} of {BEGINNER_STEPS.length} — {step.subtitle}
                    </div>
                    <h2 className="font-[var(--font-sora)] text-2xl font-bold text-[var(--text-primary)]">
                      {step.title}
                    </h2>
                  </div>
                </div>
                {step.critical && (
                  <div className="mt-2 rounded-lg bg-red-500/15 border border-red-500/30 px-3 py-2 text-sm text-red-400 font-medium">
                    ⚠️ Critical Security Step — Do not skip this
                  </div>
                )}
              </div>

              {/* Step Body */}
              <div className="p-6">
                <p className="mb-6 text-[var(--text-secondary)] leading-relaxed">
                  {step.description}
                </p>

                {/* Visual Step-by-Step Guide (replaces bullet points) */}
                {step.guide ? (
                  <div className="mb-6">
                    <StepByStepGuide
                      steps={step.guide}
                      title={`How to: ${step.title}`}
                      accentColor={step.guideColor || 'blue'}
                      videoId={(step as Record<string, unknown>).tutorialVideoId as string | undefined}
                    />
                  </div>
                ) : step.details && (
                  <div className="space-y-3 mb-6">
                    {step.details.map((detail: string, i: number) => (
                      <div key={i} className="flex items-start gap-3 rounded-xl bg-[var(--bg-card-hover)] p-3">
                        <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-500/20 text-xs font-bold text-blue-400">
                          {i + 1}
                        </span>
                        <span className="text-sm text-[var(--text-secondary)] leading-relaxed">{detail}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Related overview video */}
                {step.videoId && (
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                        📺 Related Video
                      </span>
                      <InfoTip content="This is a general overview video for this topic. A dedicated step-by-step tutorial is coming soon." />
                    </div>
                    <div className="overflow-hidden rounded-xl border border-[var(--border-primary)]">
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
                  </div>
                )}

                {/* Aurum signup button for final step */}
                {step.isSignup && (
                  <a
                    href={aurumSignupUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mb-6 block w-full rounded-xl bg-[linear-gradient(180deg,#3b82f6_0%,#2563eb_100%)] py-4 text-center font-bold text-white text-lg shadow-lg shadow-blue-600/25 transition hover:shadow-blue-600/40"
                  >
                    Create Aurum Account →
                  </a>
                )}

                {/* Navigation */}
                <div className="flex items-center justify-between pt-4 border-t border-[var(--border-primary)]">
                  <button
                    onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                    disabled={currentStep === 0}
                    className="text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition disabled:opacity-30"
                  >
                    ← Previous
                  </button>

                  {currentStep < BEGINNER_STEPS.length - 1 ? (
                    <button
                      onClick={() => {
                        completeStep(step.id)
                        setCurrentStep(currentStep + 1)
                      }}
                      className="rounded-xl bg-blue-500 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-400"
                    >
                      Mark Complete & Continue →
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        completeStep(step.id)
                        router.push('/onboarding/setup')
                      }}
                      className="rounded-xl bg-emerald-500 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-400"
                    >
                      Continue to Setup →
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}
