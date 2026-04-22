'use client'

import { useState, useEffect, useCallback, Suspense } from 'react'
import type { ComponentType } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Logo from '@/components/ui/Logo'
import { motion, AnimatePresence } from 'framer-motion'
import {
  SecurityIcon,
  BankIcon,
  CardIcon,
  AutomationIcon,
  CheckCircleIcon,
  SparkleIcon,
  PartnerIcon,
  GrowthIcon,
  PlayCircleIcon,
  AcademyIcon,
  FlagIcon,
} from '@/components/ui/Icons'

/* ─────────────────────────────────────────────────────────────────────────
   ONBOARDING — Guided Setup for New Aurum Members

   Two paths:
   • Beginner (/onboarding?tier=beginner&ref=CODE) — Full accordion walkthrough
   • Advanced (/onboarding?tier=advanced&ref=CODE) — Quick pre-flight checklist

   Correct step order:
   1. VPN → 2. Trust Wallet → 3. Buy crypto → 4. Create Aurum account
   → 5. Confirm email → 6. Enable 2FA → 7. Fund account → 8. Activate bot
   ───────────────────────────────────────────────────────────────────────── */

type IconCmp = ComponentType<{ className?: string; strokeWidth?: number }>

interface OnboardingStep {
  id: string
  phase: 'prep' | 'account' | 'activate'
  title: string
  Icon: IconCmp
  accent: string
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
  // Phase 1: Preparation
  {
    id: 'vpn',
    phase: 'prep',
    title: 'Set Up a VPN',
    Icon: SecurityIcon,
    accent: '#1b61c9',
    time: '5 min',
    content: {
      what: 'A Virtual Private Network encrypts your internet traffic and masks your location.',
      why: 'Aurum is not available in all regions. A VPN ensures uninterrupted access to the platform and protects your financial data.',
      steps: [
        'Download a trusted VPN \u2014 NordVPN, ExpressVPN, or Surfshark.',
        'Create an account (most offer a 30-day money-back guarantee).',
        'Open the app \u2192 tap "Quick Connect" or select a US/UK/Canada server.',
        'Verify it\u0027s working: visit whatismyipaddress.com \u2014 your location should match the server.',
        'Always connect VPN before opening any crypto platform.',
      ],
      tip: 'NordVPN is the most beginner-friendly. Set it to auto-connect on startup so you never forget.',
      warning: 'Never use a free VPN for financial transactions \u2014 they sell your data.',
      videoId: 'hgPSheoUs_s',
    },
  },
  {
    id: 'wallet',
    phase: 'prep',
    title: 'Install Trust Wallet',
    Icon: BankIcon,
    accent: '#0891b2',
    time: '10 min',
    content: {
      what: 'Trust Wallet is a self-custodial crypto wallet \u2014 you control your own private keys.',
      why: 'You need a personal wallet to hold crypto before depositing into Aurum. Think of it as your personal bank vault.',
      steps: [
        'Download Trust Wallet from your phone\u0027s app store (blue shield icon, publisher "Six Days LLC").',
        'Tap "Create a new wallet."',
        'Write your 12-word recovery phrase on PAPER. Not a screenshot. Not a note on your phone. Paper.',
        'Store the paper somewhere safe \u2014 lockbox, safe, fireproof bag.',
        'Confirm the phrase by tapping the words in order.',
        'Your wallet is ready. Tap USDT or USDC to see your receive address.',
      ],
      warning: 'If you lose these 12 words, you lose access to your crypto forever. There is no "forgot password" \u2014 not Trust Wallet, not us, not anyone can recover it.',
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
    Icon: CardIcon,
    accent: '#059669',
    time: '15 min',
    content: {
      what: 'USDC and USDT are stablecoins pegged to the US Dollar \u2014 1 USDC = $1 USD. This is how money moves in and out of crypto.',
      why: 'Aurum accepts USDC or USDT deposits. You need to buy some before you can fund your trading account.',
      steps: [
        'Option A (easiest): Open Trust Wallet \u2192 tap "Buy" \u2192 choose USDC \u2192 enter amount \u2192 pay with debit card or Apple Pay.',
        'Option B (lower fees): Create an account on Coinbase, Binance, or Kraken \u2192 buy USDC \u2192 transfer to your Trust Wallet address.',
        'If using Option B: double-check the wallet address AND the network (BEP20 or ERC20).',
        'Wait for the transaction to confirm (2-15 minutes).',
        'Check Trust Wallet \u2014 your balance should reflect the purchase.',
      ],
      tip: 'Card purchases have a small fee (1-3%) from the payment processor. This is normal. Exchange transfers are cheaper but require an extra account.',
      warning: 'When transferring between wallets, sending to the wrong address or wrong network means permanently lost funds. Triple-check before confirming.',
      videoId: 'ZxTVBeeeJNQ',
    },
  },
  // Phase 2: Account Setup
  {
    id: 'create-account',
    phase: 'account',
    title: 'Create Your Aurum Account',
    Icon: SparkleIcon,
    accent: '#1b61c9',
    time: '5 min',
    content: {
      what: 'Register for your Aurum back office account using your partner\u0027s referral link.',
      why: 'This is where you\u0027ll manage your bot, track returns, make deposits/withdrawals, and access all Aurum products.',
      steps: [
        'Click the "Create Aurum Account" button below \u2014 it includes your partner\u0027s referral code.',
        'Fill in the registration form with your real name and email.',
        'Choose a strong password (12+ characters, mix of letters, numbers, symbols).',
        'Submit the form.',
      ],
      tip: 'Use the same email you signed up with on AutopilotROI so your partner can track your progress.',
      isSignup: true,
    },
  },
  {
    id: 'confirm-email',
    phase: 'account',
    title: 'Confirm Your Email',
    Icon: AcademyIcon,
    accent: '#0891b2',
    time: '2 min',
    content: {
      what: 'Aurum sends a verification email to the address you registered with.',
      why: 'Email verification is required before you can access your back office or make any transactions.',
      steps: [
        'Check your inbox for an email from Aurum (may take 1-2 minutes).',
        'Check your spam/junk folder if you don\u0027t see it.',
        'Click the verification link in the email.',
        'You\u0027ll be redirected to the Aurum login page.',
        'Log in with the email and password you just created.',
      ],
      tip: 'Add Aurum\u0027s email address to your contacts so future emails don\u0027t go to spam.',
    },
  },
  {
    id: '2fa',
    phase: 'account',
    title: 'Enable Two-Factor Authentication',
    Icon: SecurityIcon,
    accent: '#dc2626',
    time: '5 min',
    critical: true,
    content: {
      what: '2FA adds a second layer of security \u2014 even if someone gets your password, they can\u0027t access your account without your phone.',
      why: 'This is REQUIRED before depositing any funds. It\u0027s the most important security step you\u0027ll take.',
      steps: [
        'Download Google Authenticator or Authy from your app store.',
        'In your Aurum back office \u2192 Settings \u2192 Security \u2192 Two-Factor Authentication \u2192 "Enable."',
        'Scan the QR code on screen with your authenticator app.',
        'Enter the 6-digit code from the app to confirm.',
        'Save the backup codes on paper (same place as your wallet recovery phrase).',
        'Test it: log out, log back in \u2014 you should be asked for the 6-digit code.',
      ],
      warning: 'Without backup codes AND without your phone, you will be locked out of your account permanently. Write them down.',
      tip: 'Authy is slightly better than Google Authenticator because it backs up to the cloud. If you lose your phone, you can recover your codes.',
      videoId: 'K8qYdD1sC7w',
    },
  },
  // Phase 3: Activate
  {
    id: 'fund-account',
    phase: 'activate',
    title: 'Fund Your Aurum Account',
    Icon: BankIcon,
    accent: '#d97706',
    time: '10 min',
    content: {
      what: 'Transfer the USDC/USDT from your Trust Wallet into your Aurum trading account.',
      why: 'The EX-AI Bot needs capital to trade with. This is your investment \u2014 the bot uses it to generate returns.',
      steps: [
        'In your Aurum back office \u2192 Deposits.',
        'Select deposit method: USDC (BEP20), USDC (ERC20), or USDT.',
        'Copy the deposit wallet address shown on screen.',
        'Open Trust Wallet \u2192 select USDC/USDT \u2192 tap "Send."',
        'Paste the Aurum deposit address \u2192 enter amount \u2192 confirm.',
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
    Icon: AutomationIcon,
    accent: '#059669',
    time: '5 min',
    content: {
      what: 'The EX-AI Bot is an AI trading algorithm that executes trades 24/7 on your behalf.',
      why: 'This is the core product \u2014 once activated, the bot starts generating returns immediately.',
      steps: [
        'In your back office \u2192 Bots \u2192 EX-AI Bot.',
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

interface PhaseDef {
  id: 'prep' | 'account' | 'activate'
  label: string
  description: string
  Icon: IconCmp
  accent: string
}

const PHASES: PhaseDef[] = [
  { id: 'prep',     label: 'Preparation',   description: 'Before you touch Aurum',         Icon: PartnerIcon,    accent: '#1b61c9' },
  { id: 'account',  label: 'Account Setup', description: 'Creating & securing your account', Icon: SecurityIcon, accent: '#0891b2' },
  { id: 'activate', label: 'Go Live',       description: 'Fund & start earning',           Icon: GrowthIcon,     accent: '#059669' },
]

interface ChecklistItem {
  id: string
  label: string
  Icon: IconCmp
  accent: string
  phase: 'prep' | 'account' | 'activate'
}

const ADVANCED_CHECKLIST: ChecklistItem[] = [
  { id: 'vpn',     label: 'VPN installed and connected to a supported region',     Icon: SecurityIcon,  accent: '#1b61c9', phase: 'prep'     },
  { id: 'wallet',  label: 'Trust Wallet installed, recovery phrase secured on paper', Icon: BankIcon,   accent: '#0891b2', phase: 'prep'     },
  { id: 'funds',   label: 'USDC or USDT purchased and in Trust Wallet',           Icon: CardIcon,      accent: '#059669', phase: 'prep'     },
  { id: 'account', label: 'Aurum account created with partner referral link',     Icon: SparkleIcon,   accent: '#1b61c9', phase: 'account'  },
  { id: 'email',   label: 'Email verified and logged in to back office',          Icon: AcademyIcon,   accent: '#0891b2', phase: 'account'  },
  { id: '2fa',     label: '2FA enabled (Google Authenticator or Authy)',          Icon: SecurityIcon,  accent: '#dc2626', phase: 'account'  },
  { id: 'deposit', label: 'Funds deposited from Trust Wallet to Aurum',           Icon: BankIcon,      accent: '#d97706', phase: 'activate' },
  { id: 'bot',     label: 'EX-AI Bot activated with chosen tier',                 Icon: AutomationIcon, accent: '#059669', phase: 'activate' },
]

// ─── Page ─────────────────────────────────────────────────────────

export default function OnboardingPage() {
  return (
    <Suspense fallback={
      <div className="page-bg" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '2rem', height: '2rem', borderRadius: '50%', border: '2px solid #1b61c9', borderTopColor: 'transparent' }} />
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
            background: isAdvanced ? 'rgba(5,150,105,0.10)' : 'rgba(27,97,201,0.10)',
            color: isAdvanced ? '#059669' : '#1b61c9',
            border: `1px solid ${isAdvanced ? 'rgba(5,150,105,0.25)' : 'rgba(27,97,201,0.25)'}`,
            fontFamily: 'var(--font-display)',
          }}>
            {isAdvanced ? <SparkleIcon className="w-3.5 h-3.5" /> : <FlagIcon className="w-3.5 h-3.5" />}
            {isAdvanced ? 'Fast Track' : 'Guided Setup'}
          </span>
        </div>
      </header>

      {isAdvanced
        ? <AdvancedChecklist aurumSignupUrl={aurumSignupUrl} />
        : <BeginnerAccordion aurumSignupUrl={aurumSignupUrl} />}
    </div>
  )
}

/* ─── Beginner Accordion ─────────────────────────────────────────── */

function BeginnerAccordion({ aurumSignupUrl }: { aurumSignupUrl: string }) {
  const [openStep, setOpenStep] = useState<string | null>(STEPS[0].id)
  const [completed, setCompleted] = useState<Set<string>>(new Set())

  useEffect(() => {
    const saved = localStorage.getItem('autopilotroi-onboarding-progress')
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (saved) { try { setCompleted(new Set(JSON.parse(saved))) } catch { /* ignore */ } }
  }, [])

  const toggleStep = useCallback((id: string) => setOpenStep(prev => prev === id ? null : id), [])

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
    <div style={{ maxWidth: '56rem', margin: '0 auto', padding: '2.5rem 1.5rem 4rem' }}>
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 className="text-display" style={{ color: '#181d26', marginBottom: '0.75rem' }}>
          Onboarding Guide
        </h1>
        <p className="text-body-lg" style={{ color: 'var(--color-text-weak)', lineHeight: 'var(--lh-relaxed)' }}>
          Follow each step in order. Your progress is saved automatically.
        </p>

        <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ flex: 1, height: '0.5rem', borderRadius: '999px', background: '#fff', border: '1px solid var(--color-border)', overflow: 'hidden' }}>
            <motion.div
              style={{ height: '100%', borderRadius: '999px', background: 'linear-gradient(90deg,#3b82f6 0%,#10b981 100%)' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>
          <span style={{ fontSize: 'var(--text-body)', fontWeight: 700, color: 'var(--color-text-muted)', fontVariantNumeric: 'tabular-nums', minWidth: '3rem', textAlign: 'right' }}>
            {completed.size}/{STEPS.length}
          </span>
        </div>
      </div>

      {PHASES.map(phase => {
        const phaseSteps = STEPS.filter(s => s.phase === phase.id)
        const phaseComplete = phaseSteps.every(s => completed.has(s.id))

        return (
          <div key={phase.id} style={{ marginBottom: '2.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                width: '2.25rem', height: '2.25rem', borderRadius: '0.625rem',
                background: phase.accent + '14', color: phase.accent,
              }}>
                <phase.Icon className="w-5 h-5" />
              </span>
              <div>
                <h2 style={{
                  fontFamily: 'var(--font-display)', fontWeight: 700,
                  fontSize: 'var(--text-body)', textTransform: 'uppercase', letterSpacing: '0.08em',
                  color: '#181d26', margin: 0,
                }}>
                  {phase.label}
                </h2>
                <p style={{ fontSize: 'var(--text-body)', color: 'var(--color-text-muted)', margin: '0.125rem 0 0' }}>
                  {phase.description}
                </p>
              </div>
              {phaseComplete && (
                <span style={{
                  marginLeft: 'auto',
                  display: 'inline-flex', alignItems: 'center', gap: '0.375rem',
                  fontSize: 'var(--text-caption)', fontWeight: 700,
                  color: '#059669', background: 'rgba(16,185,129,0.10)',
                  border: '1px solid rgba(16,185,129,0.25)',
                  borderRadius: '999px', padding: '0.25rem 0.75rem',
                }}>
                  <CheckCircleIcon className="w-3.5 h-3.5" /> Complete
                </span>
              )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {phaseSteps.map(step => {
                const isOpen = openStep === step.id
                const isDone = completed.has(step.id)
                const cardBorder = step.critical
                  ? (isDone ? 'rgba(16,185,129,0.30)' : 'rgba(220,38,38,0.30)')
                  : (isDone ? 'rgba(16,185,129,0.20)' : 'var(--color-border)')
                const cardBg = step.critical
                  ? (isDone ? 'rgba(16,185,129,0.04)' : 'rgba(220,38,38,0.04)')
                  : '#ffffff'

                return (
                  <div
                    key={step.id}
                    style={{
                      borderRadius: '1rem',
                      border: `1px solid ${cardBorder}`,
                      background: cardBg,
                      overflow: 'hidden',
                      transition: 'border-color 0.2s, background 0.2s',
                    }}
                  >
                    <button
                      onClick={() => toggleStep(step.id)}
                      style={{
                        display: 'flex', width: '100%', alignItems: 'center', gap: '1rem',
                        padding: '1.25rem 1.5rem', textAlign: 'left',
                        background: 'transparent', border: 'none', cursor: 'pointer',
                      }}
                    >
                      <span
                        role="checkbox"
                        aria-checked={isDone}
                        tabIndex={0}
                        onClick={(e) => { e.stopPropagation(); markComplete(step.id) }}
                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.stopPropagation(); e.preventDefault(); markComplete(step.id) } }}
                        style={{
                          display: 'inline-flex', flexShrink: 0,
                          alignItems: 'center', justifyContent: 'center',
                          width: '1.75rem', height: '1.75rem',
                          borderRadius: '0.5rem',
                          border: `2px solid ${isDone ? '#059669' : 'var(--color-text-muted)'}`,
                          background: isDone ? '#059669' : 'transparent',
                          color: '#fff', cursor: 'pointer',
                          transition: 'all 0.15s',
                        }}
                      >
                        {isDone && (
                          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </span>

                      <span style={{
                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0, width: '2.5rem', height: '2.5rem',
                        borderRadius: '0.625rem',
                        background: step.accent + '14', color: step.accent,
                      }}>
                        <step.Icon className="w-5 h-5" />
                      </span>

                      <div style={{ flex: 1, minWidth: 0 }}>
                        <span style={{
                          fontFamily: 'var(--font-display)', fontWeight: 700,
                          fontSize: 'var(--text-body-lg)',
                          color: isDone ? '#059669' : '#181d26',
                          textDecoration: isDone ? 'line-through' : 'none',
                          opacity: isDone ? 0.7 : 1,
                        }}>
                          {step.title}
                        </span>
                        {step.critical && !isDone && (
                          <span style={{
                            marginLeft: '0.5rem',
                            display: 'inline-block',
                            fontSize: 'var(--text-caption)', fontWeight: 700,
                            textTransform: 'uppercase', letterSpacing: '0.08em',
                            color: '#dc2626', background: 'rgba(220,38,38,0.10)',
                            borderRadius: '0.25rem', padding: '0.125rem 0.5rem',
                          }}>
                            Required
                          </span>
                        )}
                      </div>

                      <span style={{ fontSize: 'var(--text-body)', fontWeight: 500, color: 'var(--color-text-muted)', flexShrink: 0 }}>
                        {step.time}
                      </span>
                      <svg
                        width="20" height="20"
                        style={{ color: 'var(--color-text-muted)', transition: 'transform 0.2s', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', flexShrink: 0 }}
                        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                          style={{ overflow: 'hidden' }}
                        >
                          <div style={{ padding: '0.5rem 1.5rem 1.5rem', borderTop: '1px solid var(--color-border)' }}>
                            <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 16rem), 1fr))', marginBottom: '1.5rem' }}>
                              <div style={{ borderRadius: '0.75rem', background: '#f8fafc', padding: '1rem' }}>
                                <div style={{ fontSize: 'var(--text-caption)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#1b61c9', marginBottom: '0.375rem' }}>What</div>
                                <p style={{ fontSize: 'var(--text-body)', color: 'var(--color-text-weak)', lineHeight: 'var(--lh-relaxed)', margin: 0 }}>{step.content.what}</p>
                              </div>
                              <div style={{ borderRadius: '0.75rem', background: '#f8fafc', padding: '1rem' }}>
                                <div style={{ fontSize: 'var(--text-caption)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#1b61c9', marginBottom: '0.375rem' }}>Why</div>
                                <p style={{ fontSize: 'var(--text-body)', color: 'var(--color-text-weak)', lineHeight: 'var(--lh-relaxed)', margin: 0 }}>{step.content.why}</p>
                              </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.25rem' }}>
                              {step.content.steps.map((text, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                                  <span style={{
                                    display: 'inline-flex', flexShrink: 0,
                                    alignItems: 'center', justifyContent: 'center',
                                    width: '1.75rem', height: '1.75rem', borderRadius: '999px',
                                    background: 'rgba(27,97,201,0.12)', color: '#1b61c9',
                                    fontSize: 'var(--text-body)', fontWeight: 700, marginTop: '0.125rem',
                                  }}>
                                    {i + 1}
                                  </span>
                                  <span style={{ fontSize: 'var(--text-body)', color: 'var(--color-text-weak)', lineHeight: 'var(--lh-relaxed)' }}>
                                    {text}
                                  </span>
                                </div>
                              ))}
                            </div>

                            {step.content.warning && (
                              <div style={{
                                borderRadius: '0.75rem',
                                border: '1px solid rgba(220,38,38,0.20)',
                                background: 'rgba(220,38,38,0.05)',
                                padding: '1rem 1.25rem', marginBottom: '1rem',
                              }}>
                                <p style={{ fontSize: 'var(--text-body)', color: '#b91c1c', lineHeight: 'var(--lh-relaxed)', margin: 0 }}>
                                  <span style={{ fontWeight: 700 }}>Warning: </span>{step.content.warning}
                                </p>
                              </div>
                            )}

                            {step.content.tip && (
                              <div style={{
                                borderRadius: '0.75rem',
                                border: '1px solid rgba(27,97,201,0.18)',
                                background: 'rgba(27,97,201,0.05)',
                                padding: '1rem 1.25rem', marginBottom: '1rem',
                              }}>
                                <p style={{ fontSize: 'var(--text-body)', color: '#1d4ed8', lineHeight: 'var(--lh-relaxed)', margin: 0 }}>
                                  <span style={{ fontWeight: 700 }}>Tip: </span>{step.content.tip}
                                </p>
                              </div>
                            )}

                            {step.content.links && step.content.links.length > 0 && (
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                                {step.content.links.map(link => (
                                  <a
                                    key={link.url}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                      display: 'inline-flex', alignItems: 'center', gap: '0.375rem',
                                      borderRadius: '0.5rem',
                                      border: '1px solid var(--color-border)', background: '#f8fafc',
                                      padding: '0.625rem 1rem',
                                      fontSize: 'var(--text-body)', fontWeight: 500, color: '#1b61c9',
                                      textDecoration: 'none',
                                    }}
                                  >
                                    {link.label}
                                  </a>
                                ))}
                              </div>
                            )}

                            {step.content.isSignup && (
                              <a
                                href={aurumSignupUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                  display: 'block', width: '100%',
                                  borderRadius: '0.75rem',
                                  background: 'linear-gradient(180deg,#3b82f6 0%,#2563eb 100%)',
                                  padding: '1rem',
                                  textAlign: 'center',
                                  fontFamily: 'var(--font-display)',
                                  fontSize: 'var(--text-body-lg)', fontWeight: 700,
                                  color: '#fff', textDecoration: 'none',
                                  boxShadow: '0 8px 20px rgba(37,99,235,0.20)',
                                  marginBottom: '1rem',
                                }}
                              >
                                Create Aurum Account \u2192
                              </a>
                            )}

                            {step.content.videoId && (
                              <div style={{ overflow: 'hidden', borderRadius: '0.75rem', border: '1px solid var(--color-border)' }}>
                                <div style={{ aspectRatio: '16 / 9', width: '100%' }}>
                                  <iframe
                                    src={`https://www.youtube.com/embed/${step.content.videoId}?rel=0`}
                                    title={step.title}
                                    style={{ width: '100%', height: '100%', border: 0 }}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                  />
                                </div>
                              </div>
                            )}

                            <div style={{ marginTop: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
                              <button
                                onClick={() => markComplete(step.id)}
                                style={{
                                  background: 'transparent', border: 'none', cursor: 'pointer',
                                  fontSize: 'var(--text-body)', fontWeight: 600,
                                  color: isDone ? '#059669' : 'var(--color-text-muted)',
                                  padding: 0,
                                }}
                              >
                                {isDone ? 'Completed' : 'Mark as complete'}
                              </button>

                              {!isDone && (
                                <button
                                  onClick={() => {
                                    markComplete(step.id)
                                    const idx = STEPS.findIndex(s => s.id === step.id)
                                    if (idx < STEPS.length - 1) setOpenStep(STEPS[idx + 1].id)
                                  }}
                                  style={{
                                    borderRadius: '0.75rem',
                                    background: 'rgba(27,97,201,0.10)',
                                    border: '1px solid rgba(27,97,201,0.20)',
                                    padding: '0.625rem 1.25rem',
                                    fontFamily: 'var(--font-display)',
                                    fontSize: 'var(--text-body)', fontWeight: 700,
                                    color: '#1b61c9', cursor: 'pointer',
                                  }}
                                >
                                  Done \u2192 Next Step
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

      {completed.size === STEPS.length && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            borderRadius: '1.25rem',
            border: '1px solid rgba(16,185,129,0.30)',
            background: 'rgba(16,185,129,0.05)',
            padding: '2rem',
            textAlign: 'center',
          }}
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '3rem', height: '3rem', borderRadius: '999px', background: 'rgba(16,185,129,0.15)', color: '#059669', marginBottom: '1rem' }}>
            <CheckCircleIcon className="w-7 h-7" />
          </div>
          <h2 className="text-section" style={{ color: '#181d26', marginBottom: '0.5rem' }}>
            You&apos;re All Set
          </h2>
          <p style={{ fontSize: 'var(--text-body)', color: 'var(--color-text-weak)', maxWidth: '28rem', margin: '0 auto 1.5rem', lineHeight: 'var(--lh-relaxed)' }}>
            Your Aurum account is secured, funded, and the EX-AI bot is working for you 24/7.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
            <Link
              href="/dashboard"
              className="btn btn-primary-lg shimmer-hover"
            >
              Go to Partner Dashboard \u2192
            </Link>
            <Link
              href="/university"
              className="btn btn-ghost btn-primary-lg shimmer-hover"
            >
              Continue Learning
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  )
}

/* ─── Advanced Pre-flight Checklist ────────────────────────────── */

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
    <div style={{ maxWidth: '40rem', margin: '0 auto', padding: '3rem 1.5rem 4rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          width: '3.25rem', height: '3.25rem', borderRadius: '999px',
          background: 'rgba(5,150,105,0.12)', color: '#059669',
          marginBottom: '1rem',
        }}>
          <SparkleIcon className="w-6 h-6" />
        </div>
        <h1 className="text-section" style={{ color: '#181d26', marginBottom: '0.5rem' }}>
          Advanced Fast Track
        </h1>
        <p style={{ fontSize: 'var(--text-body)', color: 'var(--color-text-muted)', margin: 0 }}>
          Confirm each item, then head straight to Aurum.
        </p>
      </div>

      {PHASES.map(phase => {
        const items = ADVANCED_CHECKLIST.filter(i => i.phase === phase.id)
        return (
          <div key={phase.id} style={{ marginBottom: '1.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <span style={{ color: phase.accent, display: 'inline-flex' }}>
                <phase.Icon className="w-3.5 h-3.5" />
              </span>
              <span style={{
                fontSize: 'var(--text-caption)', fontWeight: 700,
                textTransform: 'uppercase', letterSpacing: '0.08em',
                color: 'var(--color-text-muted)',
              }}>
                {phase.label}
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {items.map(item => {
                const isChecked = checked.has(item.id)
                return (
                  <button
                    key={item.id}
                    onClick={() => toggle(item.id)}
                    style={{
                      display: 'flex', width: '100%', alignItems: 'center', gap: '0.875rem',
                      borderRadius: '0.75rem',
                      border: `1px solid ${isChecked ? 'rgba(16,185,129,0.30)' : 'var(--color-border)'}`,
                      background: isChecked ? 'rgba(16,185,129,0.05)' : '#fff',
                      padding: '1rem',
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'all 0.15s',
                    }}
                  >
                    <span style={{
                      display: 'inline-flex', flexShrink: 0,
                      alignItems: 'center', justifyContent: 'center',
                      width: '1.25rem', height: '1.25rem',
                      borderRadius: '0.25rem',
                      border: `2px solid ${isChecked ? '#059669' : 'var(--color-text-muted)'}`,
                      background: isChecked ? '#059669' : 'transparent',
                      color: '#fff',
                    }}>
                      {isChecked && (
                        <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </span>
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0, width: '2rem', height: '2rem',
                      borderRadius: '0.5rem',
                      background: item.accent + '14', color: item.accent,
                    }}>
                      <item.Icon className="w-4 h-4" />
                    </span>
                    <span style={{
                      fontSize: 'var(--text-body)', fontWeight: 500,
                      color: isChecked ? '#059669' : '#181d26',
                      textDecoration: isChecked ? 'line-through' : 'none',
                    }}>
                      {item.label}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        )
      })}

      <a
        href={aurumSignupUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => { if (!allDone) e.preventDefault() }}
        style={{
          display: 'block', width: '100%',
          borderRadius: '0.75rem',
          padding: '1rem',
          marginTop: '1rem',
          textAlign: 'center',
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--text-body-lg)', fontWeight: 700,
          color: '#fff', textDecoration: 'none',
          background: allDone ? 'linear-gradient(180deg,#3b82f6 0%,#2563eb 100%)' : 'rgba(75,85,99,0.50)',
          boxShadow: allDone ? '0 8px 20px rgba(37,99,235,0.25)' : 'none',
          cursor: allDone ? 'pointer' : 'not-allowed',
          opacity: allDone ? 1 : 0.7,
          transition: 'all 0.2s',
        }}
      >
        {allDone
          ? 'Create Aurum Account \u2192'
          : `Complete checklist to continue (${checked.size}/${ADVANCED_CHECKLIST.length})`}
      </a>

      {!allDone && (
        <p style={{ marginTop: '1rem', textAlign: 'center', fontSize: 'var(--text-caption)', color: 'var(--color-text-muted)' }}>
          <PlayCircleIcon className="w-3.5 h-3.5" /> Need a refresher? Switch to <Link href="/onboarding?tier=beginner" style={{ color: '#1b61c9', fontWeight: 600 }}>Guided Setup</Link>.
        </p>
      )}
    </div>
  )
}
