'use client'

import { useState, useEffect, useCallback, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Logo from '@/components/ui/Logo'
import { motion, AnimatePresence } from 'framer-motion'

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   ONBOARDING â€” Guided Setup for New Aurum Members
   
   Two paths:
   â€¢ Beginner (/onboarding?tier=beginner&ref=CODE) â€” Full accordion walkthrough
   â€¢ Advanced (/onboarding?tier=advanced&ref=CODE) â€” Quick pre-flight checklist
   
   Correct step order:
   1. VPN â†’ 2. Trust Wallet â†’ 3. Buy crypto â†’ 4. Create Aurum account
   â†’ 5. Confirm email â†’ 6. Enable 2FA â†’ 7. Fund account â†’ 8. Activate bot
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */

// â”€â”€ Step Data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

interface OnboardingStep {
  id: string
  phase: 'prep' | 'account' | 'activate'
  title: string
  icon: string
  time: string
  critical?: boolean
  content: {
    what: string
    why: string
    steps: string[]
    warning?: string
    tip?: string
    links?: { label: string; url: string }[]
    videoId?: string
    isSignup?: boolean
  }
}

const STEPS: OnboardingStep[] = [
  // â”€â”€ Phase 1: Preparation (before Aurum) â”€â”€
  {
    id: 'vpn',
    phase: 'prep',
    title: 'Set Up a VPN',
    icon: 'ðŸ”’',
    time: '5 min',
    content: {
      what: 'A Virtual Private Network encrypts your internet traffic and masks your location.',
      why: 'Aurum is not available in all regions. A VPN ensures uninterrupted access to the platform and protects your financial data.',
      steps: [
        'Download a trusted VPN â€” NordVPN, ExpressVPN, or Surfshark.',
        'Create an account (most offer a 30-day money-back guarantee).',
        'Open the app â†’ tap "Quick Connect" or select a US/UK/Canada server.',
        'Verify it\'s working: visit whatismyipaddress.com â€” your location should match the server.',
        'Always connect VPN before opening any crypto platform.',
      ],
      tip: 'NordVPN is the most beginner-friendly. Set it to auto-connect on startup so you never forget.',
      warning: 'Never use a free VPN for financial transactions â€” they sell your data.',
      videoId: 'hgPSheoUs_s',
    },
  },
  {
    id: 'wallet',
    phase: 'prep',
    title: 'Install Trust Wallet',
    icon: 'ðŸ‘›',
    time: '10 min',
    content: {
      what: 'Trust Wallet is a self-custodial crypto wallet â€” you control your own private keys.',
      why: 'You need a personal wallet to hold crypto before depositing into Aurum. Think of it as your personal bank vault.',
      steps: [
        'Download Trust Wallet from your phone\'s app store (blue shield icon, publisher "Six Days LLC").',
        'Tap "Create a new wallet."',
        'Write your 12-word recovery phrase on PAPER. Not a screenshot. Not a note on your phone. Paper.',
        'Store the paper somewhere safe â€” lockbox, safe, fireproof bag.',
        'Confirm the phrase by tapping the words in order.',
        'Your wallet is ready. Tap USDT or USDC to see your receive address.',
      ],
      warning: 'If you lose these 12 words, you lose access to your crypto forever. There is no "forgot password" â€” not Trust Wallet, not us, not anyone can recover it.',
      links: [
        { label: 'Trust Wallet (iOS)', url: 'https://apps.apple.com/app/trust-crypto-bitcoin-wallet/id1288339409' },
        { label: 'Trust Wallet (Android)', url: 'https://play.google.com/store/apps/details?id=com.wallet.crypto.trustapp' },
      ],
      videoId: 'C4cTJLPmIlY',
    },
  },
  {
    id: 'buy-crypto',
    phase: 'prep',
    title: 'Buy USDC or USDT',
    icon: 'ðŸ’³',
    time: '15 min',
    content: {
      what: 'USDC and USDT are stablecoins pegged to the US Dollar â€” 1 USDC = $1 USD. This is how money moves in and out of crypto.',
      why: 'Aurum accepts USDC or USDT deposits. You need to buy some before you can fund your trading account.',
      steps: [
        'Option A (easiest): Open Trust Wallet â†’ tap "Buy" â†’ choose USDC â†’ enter amount â†’ pay with debit card or Apple Pay.',
        'Option B (lower fees): Create an account on Coinbase, Binance, or Kraken â†’ buy USDC â†’ transfer to your Trust Wallet address.',
        'If using Option B: double-check the wallet address AND the network (BEP20 or ERC20).',
        'Wait for the transaction to confirm (2-15 minutes).',
        'Check Trust Wallet â€” your balance should reflect the purchase.',
      ],
      tip: 'Card purchases have a small fee (1-3%) from the payment processor. This is normal. Exchange transfers are cheaper but require an extra account.',
      warning: 'When transferring between wallets, sending to the wrong address or wrong network means permanently lost funds. Triple-check before confirming.',
      videoId: 'ZxTVBeeeJNQ',
    },
  },

  // â”€â”€ Phase 2: Account Setup (at Aurum) â”€â”€
  {
    id: 'create-account',
    phase: 'account',
    title: 'Create Your Aurum Account',
    icon: 'ðŸš€',
    time: '5 min',
    content: {
      what: 'Register for your Aurum back office account using your partner\'s referral link.',
      why: 'This is where you\'ll manage your bot, track returns, make deposits/withdrawals, and access all Aurum products.',
      steps: [
        'Click the "Create Aurum Account" button below â€” it includes your partner\'s referral code.',
        'Fill in the registration form with your real name and email.',
        'Choose a strong password (12+ characters, mix of letters, numbers, symbols).',
        'Submit the form.',
      ],
      tip: 'Use the same email you signed up with on AutopilotROI so your partner can track your progress.',
      isSignup: true,
    } as OnboardingStep['content'],
  },
  {
    id: 'confirm-email',
    phase: 'account',
    title: 'Confirm Your Email',
    icon: 'âœ‰ï¸',
    time: '2 min',
    content: {
      what: 'Aurum sends a verification email to the address you registered with.',
      why: 'Email verification is required before you can access your back office or make any transactions.',
      steps: [
        'Check your inbox for an email from Aurum (may take 1-2 minutes).',
        'Check your spam/junk folder if you don\'t see it.',
        'Click the verification link in the email.',
        'You\'ll be redirected to the Aurum login page.',
        'Log in with the email and password you just created.',
      ],
      tip: 'Add Aurum\'s email address to your contacts so future emails don\'t go to spam.',
    },
  },
  {
    id: '2fa',
    phase: 'account',
    title: 'Enable Two-Factor Authentication',
    icon: 'ðŸ›¡ï¸',
    time: '5 min',
    critical: true,
    content: {
      what: '2FA adds a second layer of security â€” even if someone gets your password, they can\'t access your account without your phone.',
      why: 'This is REQUIRED before depositing any funds. It\'s the most important security step you\'ll take.',
      steps: [
        'Download Google Authenticator or Authy from your app store.',
        'In your Aurum back office â†’ Settings â†’ Security â†’ Two-Factor Authentication â†’ "Enable."',
        'Scan the QR code on screen with your authenticator app.',
        'Enter the 6-digit code from the app to confirm.',
        'Save the backup codes on paper (same place as your wallet recovery phrase).',
        'Test it: log out, log back in â€” you should be asked for the 6-digit code.',
      ],
      warning: 'Without backup codes AND without your phone, you will be locked out of your account permanently. Write them down.',
      tip: 'Authy is slightly better than Google Authenticator because it backs up to the cloud. If you lose your phone, you can recover your codes.',
      videoId: 'K8qYdD1sC7w',
    },
  },

  // â”€â”€ Phase 3: Activate (go live) â”€â”€
  {
    id: 'fund-account',
    phase: 'activate',
    title: 'Fund Your Aurum Account',
    icon: 'ðŸ’°',
    time: '10 min',
    content: {
      what: 'Transfer the USDC/USDT from your Trust Wallet into your Aurum trading account.',
      why: 'The EX-AI Bot needs capital to trade with. This is your investment â€” the bot uses it to generate returns.',
      steps: [
        'In your Aurum back office â†’ Deposits.',
        'Select deposit method: USDC (BEP20), USDC (ERC20), or USDT.',
        'Copy the deposit wallet address shown on screen.',
        'Open Trust Wallet â†’ select USDC/USDT â†’ tap "Send."',
        'Paste the Aurum deposit address â†’ enter amount â†’ confirm.',
        'Wait 2-10 minutes for the blockchain to confirm.',
        'Your balance will appear in your Aurum dashboard.',
      ],
      warning: 'Triple-check the wallet address before sending. Crypto transactions cannot be reversed.',
      tip: 'Send a small test amount first ($5-10) to make sure everything works before sending your full deposit.',
      videoId: 'ZxTVBeeeJNQ',
    },
  },
  {
    id: 'activate-bot',
    phase: 'activate',
    title: 'Activate the EX-AI Bot',
    icon: 'ðŸ¤–',
    time: '5 min',
    content: {
      what: 'The EX-AI Bot is an AI trading algorithm that executes trades 24/7 on your behalf.',
      why: 'This is the core product â€” once activated, the bot starts generating returns immediately.',
      steps: [
        'In your back office â†’ Bots â†’ EX-AI Bot.',
        'Select your account tier based on your deposit amount.',
        'Review the tier details (minimum deposit, expected performance).',
        'Click "Activate" to start the bot.',
        'Choose reinvest strategy: ON = compound earnings | OFF = withdraw daily.',
        'The bot begins trading immediately. Check back in 24 hours for your first results.',
      ],
      tip: 'Recommended: Start with auto-reinvest ON for 90 days to maximize compounding. You can switch anytime.',
      videoId: '1BI9_YikUKc',
    },
  },
]

const PHASES = [
  { id: 'prep', label: 'Preparation', description: 'Before you touch Aurum', icon: 'ðŸ“¦' },
  { id: 'account', label: 'Account Setup', description: 'Creating & securing your account', icon: 'ðŸ”' },
  { id: 'activate', label: 'Go Live', description: 'Fund & start earning', icon: 'âš¡' },
]

// â”€â”€ Advanced Checklist â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const ADVANCED_CHECKLIST = [
  { id: 'vpn', label: 'VPN installed and connected to a supported region', icon: 'ðŸ”’', phase: 'prep' },
  { id: 'wallet', label: 'Trust Wallet installed, recovery phrase secured on paper', icon: 'ðŸ‘›', phase: 'prep' },
  { id: 'funds', label: 'USDC or USDT purchased and in Trust Wallet', icon: 'ðŸ’³', phase: 'prep' },
  { id: 'account', label: 'Aurum account created with partner referral link', icon: 'ðŸš€', phase: 'account' },
  { id: 'email', label: 'Email verified and logged in to back office', icon: 'âœ‰ï¸', phase: 'account' },
  { id: '2fa', label: '2FA enabled (Google Authenticator or Authy)', icon: 'ðŸ›¡ï¸', phase: 'account' },
  { id: 'deposit', label: 'Funds deposited from Trust Wallet to Aurum', icon: 'ðŸ’°', phase: 'activate' },
  { id: 'bot', label: 'EX-AI Bot activated with chosen tier', icon: 'ðŸ¤–', phase: 'activate' },
]

// â”€â”€ Components â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export default function OnboardingPage() {
  return (
    <Suspense fallback={
      <div className="page-bg" style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <div style={{ width:'2rem', height:'2rem', borderRadius:'50%', border:'2px solid #1b61c9', borderTopColor:'transparent' }} />
      </div>
    }>
      <OnboardingContent />
    </Suspense>
  )
}

function OnboardingContent() {
  const searchParams = useSearchParams()
  const tier = searchParams.get('tier') || 'beginner'
  const ref = searchParams.get('ref') || ''
  const isAdvanced = tier === 'advanced'

  const aurumSignupUrl = ref
    ? `https://app.aurfrn.com/register?ref=${ref}`
    : 'https://app.aurfrn.com/register'

  return (
    <div className="page-bg">
      {/* Header */}
      <header className="sticky top-0 z-50" style={{ borderBottom:'1px solid var(--color-border)', background:'rgba(255,255,255,0.90)', backdropFilter:'blur(12px)' }}>
        <div className="container-xl" style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0.75rem 1.5rem' }}>
          <Link href="/">
            <Logo size={32} showText />
          </Link>
          <div className={`rounded-full px-3.5 py-1.5 text-sm font-semibold uppercase tracking-wider ${
            isAdvanced
              ? 'bg-emerald-500/15 border border-emerald-400/30 text-emerald-400'
              : 'bg-blue-500/15 border border-blue-400/30 text-blue-300'
          }`}>
            {isAdvanced ? 'ðŸš€ Fast Track' : 'ðŸŒ± Guided Setup'}
          </div>
        </div>
      </header>

      {isAdvanced ? (
        <AdvancedChecklist aurumSignupUrl={aurumSignupUrl} />
      ) : (
        <BeginnerAccordion aurumSignupUrl={aurumSignupUrl} />
      )}
    </div>
  )
}

/* â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• 
   BEGINNER PATH â€” Accordion
   â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â•  */

function BeginnerAccordion({ aurumSignupUrl }: { aurumSignupUrl: string }) {
  const [openStep, setOpenStep] = useState<string | null>(STEPS[0].id)
  const [completed, setCompleted] = useState<Set<string>>(new Set())

  // Persist progress
  useEffect(() => {
    const saved = localStorage.getItem('autopilotroi-onboarding-progress')
    if (saved) {
      try { setCompleted(new Set(JSON.parse(saved))) } catch { /* ignore */ }
    }
  }, [])

  const toggleStep = useCallback((id: string) => {
    setOpenStep(prev => prev === id ? null : id)
  }, [])

  const markComplete = useCallback((id: string) => {
    setCompleted(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id); else next.add(id)
      localStorage.setItem('autopilotroi-onboarding-progress', JSON.stringify([...next]))
      return next
    })
  }, [])

  const progress = Math.round((completed.size / STEPS.length) * 100)

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      {/* Title */}
      <div className="mb-10">
        <h1 className="font-[var(--font-display)] text-4xl font-bold text-[#181d26] tracking-tight">
          Onboarding Guide
        </h1>
        <p className="mt-3 text-lg text-[rgba(4,14,32,0.45)] leading-relaxed">
          Follow each step in order. Your progress is saved automatically.
        </p>

        {/* Progress bar */}
        <div className="mt-5 flex items-center gap-4">
          <div className="flex-1 h-2 rounded-full bg-white overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-blue-500 to-emerald-400"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>
          <span className="text-sm font-bold text-[rgba(4,14,32,0.50)] tabular-nums w-10 text-right">
            {completed.size}/{STEPS.length}
          </span>
        </div>
      </div>

      {/* Phase groups */}
      {PHASES.map((phase) => {
        const phaseSteps = STEPS.filter(s => s.phase === phase.id)
        const phaseComplete = phaseSteps.every(s => completed.has(s.id))

        return (
          <div key={phase.id} className="mb-8">
            {/* Phase header */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">{phase.icon}</span>
              <div>
                <h2 className="text-base font-bold uppercase tracking-wider text-[#181d26]">
                  {phase.label}
                </h2>
                <p className="text-sm text-[rgba(4,14,32,0.50)]">{phase.description}</p>
              </div>
              {phaseComplete && (
                <span className="ml-auto text-sm font-bold text-emerald-400 bg-emerald-500/10 rounded-full px-3 py-1 border border-emerald-500/20">
                  âœ“ Complete
                </span>
              )}
            </div>

            {/* Steps */}
            <div className="space-y-3">
              {phaseSteps.map((step) => {
                const isOpen = openStep === step.id
                const isDone = completed.has(step.id)

                return (
                  <div
                    key={step.id}
                    className={`rounded-2xl border overflow-hidden transition-colors ${
                      step.critical
                        ? isDone
                          ? 'border-emerald-500/30 bg-emerald-500/5'
                          : 'border-red-500/30 bg-red-500/5'
                        : isDone
                        ? 'border-emerald-500/20 bg-white'
                        : 'border-[#e0e2e6] bg-white'
                    }`}
                  >
                    {/* Accordion trigger */}
                    <button
                      onClick={() => toggleStep(step.id)}
                      className="flex w-full items-center gap-4 px-6 py-5 text-left group"
                    >
                      {/* Checkbox */}
                      <button
                        onClick={(e) => { e.stopPropagation(); markComplete(step.id) }}
                        className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg border-2 transition-all ${
                          isDone
                            ? 'border-emerald-500 bg-emerald-500 text-white'
                            : 'border-[var(--text-muted)] hover:border-blue-400'
                        }`}
                      >
                        {isDone && (
                          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </button>

                      {/* Icon + title */}
                      <span className="text-2xl flex-shrink-0">{step.icon}</span>
                      <div className="flex-1 min-w-0">
                        <span className={`font-bold text-lg ${isDone ? 'text-emerald-400 line-through opacity-70' : 'text-[#181d26]'}`}>
                          {step.title}
                        </span>
                        {step.critical && !isDone && (
                          <span className="ml-2 text-xs font-bold uppercase tracking-wider text-red-400 bg-red-500/10 rounded px-2 py-0.5">
                            Required
                          </span>
                        )}
                      </div>

                      {/* Time + chevron */}
                      <span className="text-sm font-medium text-[rgba(4,14,32,0.50)] flex-shrink-0">{step.time}</span>
                      <svg
                        className={`h-5 w-5 text-[rgba(4,14,32,0.50)] transition-transform flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}
                        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {/* Expanded content */}
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 pt-2 border-t border-[#e0e2e6]">
                            {/* What & why */}
                            <div className="grid gap-4 sm:grid-cols-2 mb-6">
                              <div className="rounded-xl bg-[#f8fafc] p-4">
                                <div className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-1.5">What</div>
                                <p className="text-base text-[rgba(4,14,32,0.70)] leading-relaxed">{step.content.what}</p>
                              </div>
                              <div className="rounded-xl bg-[#f8fafc] p-4">
                                <div className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-1.5">Why</div>
                                <p className="text-base text-[rgba(4,14,32,0.70)] leading-relaxed">{step.content.why}</p>
                              </div>
                            </div>

                            {/* Numbered steps */}
                            <div className="space-y-3 mb-5">
                              {step.content.steps.map((text, i) => (
                                <div key={i} className="flex items-start gap-3">
                                  <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-blue-500/15 text-sm font-bold text-blue-400 mt-0.5">
                                    {i + 1}
                                  </span>
                                  <span className="text-base text-[rgba(4,14,32,0.70)] leading-relaxed">{text}</span>
                                </div>
                              ))}
                            </div>

                            {/* Warning */}
                            {step.content.warning && (
                              <div className="rounded-xl border border-red-500/20 bg-red-500/5 px-5 py-4 mb-4">
                                <p className="text-base text-red-300 leading-relaxed">
                                  <span className="font-bold">âš ï¸  Warning:</span> {step.content.warning}
                                </p>
                              </div>
                            )}

                            {/* Tip */}
                            {step.content.tip && (
                              <div className="rounded-xl border border-blue-500/15 bg-blue-500/5 px-5 py-4 mb-4">
                                <p className="text-base text-blue-300 leading-relaxed">
                                  <span className="font-bold">ðŸ’¡ Tip:</span> {step.content.tip}
                                </p>
                              </div>
                            )}

                            {/* Links */}
                            {step.content.links && step.content.links.length > 0 && (
                              <div className="flex flex-wrap gap-2 mb-4">
                                {step.content.links.map((link) => (
                                  <a
                                    key={link.url}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 rounded-lg border border-[#e0e2e6] bg-[#f8fafc] px-4 py-2.5 text-sm font-medium text-blue-400 transition hover:border-blue-500/40 hover:text-blue-300"
                                  >
                                    ðŸ”— {link.label}
                                  </a>
                                ))}
                              </div>
                            )}

                            {/* Aurum signup button */}
                            {step.content.isSignup && (
                              <a
                                href={aurumSignupUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block w-full rounded-xl bg-[linear-gradient(180deg,#3b82f6_0%,#2563eb_100%)] py-4 text-center text-lg font-bold text-white shadow-lg shadow-blue-600/20 transition hover:shadow-blue-600/35 mb-4"
                              >
                                Create Aurum Account â†’
                              </a>
                            )}

                            {/* Video */}
                            {step.content.videoId && (
                              <div className="overflow-hidden rounded-xl border border-[#e0e2e6]">
                                <div className="aspect-video w-full">
                                  <iframe
                                    src={`https://www.youtube.com/embed/${step.content.videoId}?rel=0`}
                                    title={step.title}
                                    className="h-full w-full"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                  />
                                </div>
                              </div>
                            )}

                            {/* Mark complete button */}
                            <div className="mt-5 flex items-center justify-between">
                              <button
                                onClick={() => markComplete(step.id)}
                                className={`text-base font-semibold transition ${
                                  isDone ? 'text-emerald-400 hover:text-emerald-300' : 'text-[rgba(4,14,32,0.50)] hover:text-blue-400'
                                }`}
                              >
                                {isDone ? 'âœ“ Completed' : 'Mark as complete'}
                              </button>

                              {/* Auto-advance to next */}
                              {!isDone && (
                                <button
                                  onClick={() => {
                                    markComplete(step.id)
                                    const idx = STEPS.findIndex(s => s.id === step.id)
                                    if (idx < STEPS.length - 1) setOpenStep(STEPS[idx + 1].id)
                                  }}
                                  className="rounded-xl bg-blue-500/10 border border-blue-500/20 px-5 py-2.5 text-base font-bold text-blue-400 transition hover:bg-blue-500/20"
                                >
                                  Done â†’ Next Step
                                </button>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}

      {/* Completion */}
      {completed.size === STEPS.length && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-8 text-center"
        >
          <div className="text-5xl mb-4">ðŸŽ‰</div>
          <h2 className="font-[var(--font-display)] text-2xl font-bold text-[#181d26] mb-2">
            You&apos;re All Set!
          </h2>
          <p className="text-[rgba(4,14,32,0.70)] mb-6 max-w-md mx-auto leading-relaxed">
            Your Aurum account is secured, funded, and the EX-AI bot is working for you 24/7.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/dashboard"
              className="rounded-xl bg-[linear-gradient(180deg,#3b82f6_0%,#2563eb_100%)] px-6 py-3 font-semibold text-white shadow-lg shadow-blue-600/20"
            >
              Go to Partner Dashboard â†’
            </Link>
            <Link
              href="/university"
              className="rounded-xl border border-[#e0e2e6] bg-white px-6 py-3 font-semibold text-[#181d26]"
            >
              Continue Learning
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  )
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   ADVANCED PATH â€” Pre-flight Checklist
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */

function AdvancedChecklist({ aurumSignupUrl }: { aurumSignupUrl: string }) {
  const [checked, setChecked] = useState<Set<string>>(new Set())

  const toggle = useCallback((id: string) => {
    setChecked(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id); else next.add(id)
      return next
    })
  }, [])

  const allDone = ADVANCED_CHECKLIST.every(item => checked.has(item.id))

  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <div className="text-center mb-10">
        <div className="text-5xl mb-4">ðŸš€</div>
        <h1 className="font-[var(--font-display)] text-3xl font-bold text-[#181d26] mb-2">
          Advanced Fast Track
        </h1>
        <p className="text-[rgba(4,14,32,0.45)]">
          Confirm each item, then head straight to Aurum.
        </p>
      </div>

      {/* Grouped checklist */}
      {PHASES.map(phase => {
        const items = ADVANCED_CHECKLIST.filter(i => i.phase === phase.id)
        return (
          <div key={phase.id} className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm">{phase.icon}</span>
              <span className="text-xs font-bold uppercase tracking-wider text-[rgba(4,14,32,0.50)]">{phase.label}</span>
            </div>
            <div className="space-y-2">
              {items.map(item => (
                <button
                  key={item.id}
                  onClick={() => toggle(item.id)}
                  className={`flex w-full items-center gap-3.5 rounded-xl border p-4 text-left transition-all ${
                    checked.has(item.id)
                      ? 'border-emerald-500/30 bg-emerald-500/5'
                      : 'border-[#e0e2e6] bg-white hover:border-blue-500/30'
                  }`}
                >
                  <div className={`flex h-5 w-5 items-center justify-center rounded border-2 transition flex-shrink-0 ${
                    checked.has(item.id)
                      ? 'border-emerald-500 bg-emerald-500'
                      : 'border-[var(--text-muted)]'
                  }`}>
                    {checked.has(item.id) && (
                      <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className="text-lg flex-shrink-0">{item.icon}</span>
                  <span className={`text-sm font-medium ${
                    checked.has(item.id) ? 'text-emerald-400 line-through' : 'text-[#181d26]'
                  }`}>
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )
      })}

      {/* CTA */}
      <a
        href={aurumSignupUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`block w-full rounded-xl py-4 text-center text-lg font-bold text-white transition-all mt-4 ${
          allDone
            ? 'bg-[linear-gradient(180deg,#3b82f6_0%,#2563eb_100%)] shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40'
            : 'bg-slate-600/50 cursor-not-allowed opacity-60'
        }`}
        onClick={(e) => { if (!allDone) e.preventDefault() }}
      >
        {allDone ? 'Create Aurum Account â†’' : `Complete checklist to continue (${checked.size}/${ADVANCED_CHECKLIST.length})`}
      </a>
    </div>
  )
}

