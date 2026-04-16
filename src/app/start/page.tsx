'use client'

import { useState } from 'react'
import Link from 'next/link'
import VideoModal from '@/components/ui/VideoModal'

interface Instruction {
  text: string
  warning?: string
  tip?: string
}

interface OnboardingStep {
  id: number
  symbol: string
  title: string
  subtitle: string
  status: 'current' | 'locked'
  why?: string
  warning?: string
  videoLabel?: string
  videoNote?: string
  videoUrl?: string
  link?: { label: string; href: string }
  instructions: Instruction[]
}

const onboardingSteps: OnboardingStep[] = [
  {
    id: 1,
    symbol: '💼',
    title: 'Set Up Trust Wallet',
    subtitle: 'Your self-custodial crypto wallet',
    status: 'current' as const,
    why: 'Trust Wallet is a self-custodial wallet — meaning you control your own funds with a private seed phrase. You need it to hold USDT and interact with the Aurum platform.',
    warning:
      'Never share your 12-word seed phrase with anyone — including your AutoPilot ROI partner. Anyone who asks for it is a scammer.',
    videoLabel: 'Aurum University · Step 1',
    videoNote: 'How to set up Trust Wallet correctly',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    link: { label: 'Download Trust Wallet — Official Site', href: 'https://trustwallet.com' },
    instructions: [
      {
        text: 'Download Trust Wallet from the official App Store or Google Play. Ensure the developer is "Six Days LLC" — do not download unofficial versions.',
      },
      {
        text: 'Open the app and select "Create a new wallet". Write down your 12-word recovery phrase on paper — not your phone.',
        warning: 'If you lose your seed phrase, you lose access to your funds permanently.',
      },
      {
        text: 'Confirm your seed phrase in the app to verify you wrote it correctly.',
      },
      {
        text: 'Add USDT (TRC20) to your wallet. In Trust Wallet, tap the "+" icon and search for "USDT TRC20". Enable it.',
        tip: 'Always use USDT on the TRC20 network for Aurum deposits — it has the lowest fees.',
      },
    ],
  },
  {
    id: 2,
    symbol: '🔒',
    title: 'Set Up a VPN',
    subtitle: 'Required to access the Aurum platform',
    status: 'locked' as const,
    why: 'Aurum is geo-restricted in some regions. A VPN lets you connect from a supported jurisdiction. This is a requirement, not optional.',
    warning:
      'Never use a free VPN for financial applications. Free VPNs can log your data and expose your accounts. Use a paid, reputable provider.',
    videoLabel: 'Aurum University · Step 2',
    videoNote: 'VPN setup guide for Aurum access',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    link: {
      label: 'Get NordVPN — Recommended Provider',
      href: 'https://nordvpn.com',
    },
    instructions: [
      {
        text: 'Download NordVPN or ExpressVPN from their official website. Both have mobile and desktop apps.',
      },
      {
        text: 'Create an account and start your subscription — both have money-back guarantees.',
      },
      {
        text: 'Connect to a server in a supported country (USA, UK, or Germany typically work well).',
      },
      {
        text: 'Keep the VPN connected whenever you access the Aurum platform.',
        tip: 'Set VPN to connect automatically on startup so you never forget.',
      },
    ],
  },
  {
    id: 3,
    symbol: '💵',
    title: 'Acquire USDT',
    subtitle: 'Purchase Tether (USDT) to fund your bot',
    status: 'locked' as const,
    why: 'USDT is a stablecoin (1 USDT ≈ $1 USD). Aurum requires USDT for deposits. It is the safest and most stable way to fund your account without volatility risk.',
    warning:
      'Only use the TRC20 (Tron) network to send USDT to Aurum. Sending on the wrong network will result in lost funds.',
    videoLabel: 'Aurum University · Step 3',
    videoNote: 'How to buy and transfer USDT safely',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    instructions: [
      {
        text: 'The minimum to activate the Aurum bot is $100 USDT. Most members start with $500–$1,000.',
      },
      {
        text: 'Purchase USDT on a reputable exchange — Binance, Kraken, or Coinbase are recommended. Use your bank card or bank transfer.',
      },
      {
        text: 'Withdraw your USDT to your Trust Wallet. Select the TRC20 network when withdrawing.',
        warning: 'Confirm TRC20 network twice before sending. Wrong network = lost funds.',
      },
      {
        text: 'Verify the transaction arrived in Trust Wallet by checking your TRC20 USDT balance before moving on.',
      },
    ],
  },
  {
    id: 4,
    symbol: '🌐',
    title: 'Create Your Aurum Account',
    subtitle: 'Register on Aurum Foundation with your referral code',
    status: 'locked' as const,
    warning:
      'You must use the referral link provided by your AutoPilot ROI partner. Creating an account without a referral link will mean you are placed incorrectly in the structure and may lose spillover benefits.',
    videoLabel: 'Aurum University · Step 4',
    videoNote: 'Creating your Aurum account step by step',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    link: {
      label: 'Contact Your Partner for Your Referral Link',
      href: '/start#partner-contact',
    },
    instructions: [
      {
        text: 'Ensure your VPN is active and connected to a supported country before visiting the Aurum website.',
      },
      {
        text: 'Click the referral link provided by your AutoPilot ROI partner. This link contains your partner\'s referral code.',
        warning: 'Do not create an account from the main Aurum website without a referral link.',
      },
      {
        text: 'Complete the registration form. Use your real name and a secure email address. Save your password in a password manager.',
      },
      {
        text: 'Verify your email address by clicking the link in the confirmation email from Aurum.',
      },
      {
        text: 'Log in to your new Aurum account and confirm your referral code is visible in your back office.',
      },
    ],
  },
  {
    id: 5,
    symbol: '🤖',
    title: 'Fund and Activate the Bot',
    subtitle: 'Deposit USDT and start the EX-AI Trading Bot',
    status: 'locked' as const,
    why: 'Funding your Aurum account activates the EX-AI Bot, which begins automated trading on Binance, Bybit, and KuCoin. Returns are generated and credited to your Aurum balance.',
    warning:
      'Only use the TRC20 USDT deposit address shown in your Aurum back office. Do not deposit directly from an exchange — always send from Trust Wallet.',
    videoLabel: 'Aurum University · Step 5',
    videoNote: 'How to fund your Aurum account and activate the AI bot',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    instructions: [
      {
        text: 'Log in to your Aurum back office. Navigate to "Deposit" or "Fund Account".',
      },
      {
        text: 'Copy the TRC20 USDT deposit address shown in your Aurum account.',
        warning: 'Re-check the first and last 4 characters of the address before sending.',
      },
      {
        text: 'Open Trust Wallet and send your USDT to the Aurum deposit address using the TRC20 network.',
      },
      {
        text: 'Wait for the deposit to confirm on-chain (usually 1-5 minutes). Your Aurum balance will update.',
      },
      {
        text: 'Once funded, activate the EX-AI Bot from your back office. Your bot will begin trading automatically.',
        tip: 'Take a screenshot of your bot activation confirmation for your records.',
      },
    ],
  },
  {
    id: 6,
    symbol: '✅',
    title: 'Confirm Your Referral Placement',
    subtitle: 'Verify with your partner that everything is correct',
    status: 'locked' as const,
    why: 'Referral confirmation ensures you are placed in the correct position within the AutoPilot ROI spillover structure and that your partner is notified of your successful onboarding.',
    videoLabel: 'Aurum University · Step 6',
    videoNote: 'Confirming your referral and team placement',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    instructions: [
      {
        text: 'In your Aurum back office, find your referral information and copy your upline partner\'s referral code.',
      },
      {
        text: 'Message your AutoPilot ROI partner directly to confirm everything looks correct on their end.',
      },
      {
        text: 'Your partner will confirm your placement in the spillover tree and guide you to the Resources section for next steps.',
      },
      {
        text: 'Bookmark the AutoPilot ROI Resources page — it is your ongoing hub for education, updates, and community.',
        tip: 'If you are joining the Partner Program, your partner will now walk you through the referral tools.',
      },
    ],
  },
]

const progressSteps = [
  { label: 'Trust Wallet', status: 'complete' },
  { label: 'VPN Setup', status: 'current' },
  { label: 'Get USDT', status: 'locked' },
  { label: 'Aurum Account', status: 'locked' },
  { label: 'Fund & Activate', status: 'locked' },
  { label: 'Confirm Referral', status: 'locked' },
]

export default function StartPage() {
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [showCongrats, setShowCongrats] = useState(false)
  const [expandedStep, setExpandedStep] = useState<number>(1)

  const toggleStep = (id: number) => {
    setCompletedSteps((prev) => {
      const next = prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
      if (id === 6 && !prev.includes(6)) setShowCongrats(true)
      return next
    })
  }

  return (
    <div className="min-h-screen" style={{ background: '#f8fafc' }}>
      {/* Header */}
      <div className="px-6 py-12 lg:px-10" style={{ background: '#fff', borderBottom: '1px solid #e0e2e6' }}>
        <div className="mx-auto max-w-7xl">
          <span className="inline-block rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] mb-4"
            style={{ background: 'rgba(27,97,201,0.08)', color: '#1b61c9', border: '1px solid rgba(27,97,201,0.15)' }}>
            🚀 Guided Onboarding
          </span>
          <h1 className="text-4xl font-bold mb-3 lg:text-5xl" style={{ color: '#181d26', letterSpacing: '-0.03em' }}>
            Start Your Aurum Journey
          </h1>
          <p className="max-w-2xl text-lg mb-8" style={{ color: 'rgba(4,14,32,0.55)', lineHeight: 1.7 }}>
            Follow these 6 steps to complete your Aurum onboarding. Your partner is available to help at any stage.
          </p>

          {/* Progress strip */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {progressSteps.map((step, i) => {
              const done = completedSteps.includes(i + 1)
              return (
                <div key={step.label} className="flex items-center gap-2">
                  <div className="flex items-center gap-2 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold transition"
                    style={{
                      background: done ? 'rgba(16,185,129,0.1)' : i + 1 === expandedStep ? '#1b61c9' : '#f0f2f7',
                      color: done ? '#059669' : i + 1 === expandedStep ? '#fff' : 'rgba(4,14,32,0.45)',
                      border: done ? '1px solid rgba(16,185,129,0.3)' : 'none',
                    }}>
                    {done && <span>✓</span>}
                    {step.label}
                  </div>
                  {i < progressSteps.length - 1 && (
                    <div className="h-px w-6 shrink-0" style={{ background: done ? '#10b981' : '#e0e2e6' }} />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          {/* Steps */}
          <div className="space-y-4">
            {onboardingSteps.map((step) => {
              const isComplete = completedSteps.includes(step.id)
              const isExpanded = expandedStep === step.id

              return (
                <div
                  key={step.id}
                  className="overflow-hidden rounded-2xl transition-shadow"
                  style={{
                    background: isComplete ? 'rgba(16,185,129,0.05)' : '#fff',
                    border: isComplete ? '1px solid rgba(16,185,129,0.25)' : isExpanded ? '1px solid rgba(27,97,201,0.4)' : '1px solid #e0e2e6',
                  }}
                >
                  <button
                    onClick={() => setExpandedStep(isExpanded ? 0 : step.id)}
                    className="flex w-full items-center gap-4 px-6 py-5 text-left"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold"
                      style={{
                        background: isComplete ? '#10b981' : isExpanded ? '#1b61c9' : '#f0f2f7',
                        color: isComplete || isExpanded ? '#fff' : 'rgba(4,14,32,0.4)',
                      }}>
                      {isComplete ? '✓' : step.id}
                    </div>
                    <div className="flex-1">
                      <div className="text-xs font-bold uppercase tracking-[0.12em] mb-0.5" style={{ color: '#1b61c9' }}>
                        Step {step.id}
                      </div>
                      <div className="text-lg font-bold" style={{ color: '#181d26' }}>
                        {step.title}
                      </div>
                      <div className="text-sm" style={{ color: 'rgba(4,14,32,0.5)' }}>{step.subtitle}</div>
                    </div>
                    {isComplete && (
                      <span className="shrink-0 rounded-full px-3 py-1 text-xs font-semibold" style={{ background: 'rgba(16,185,129,0.1)', color: '#059669' }}>
                        ✓ Complete
                      </span>
                    )}
                    <span className="shrink-0 transition-transform" style={{ color: '#1b61c9', transform: isExpanded ? 'rotate(180deg)' : 'none' }}>
                      ▾
                    </span>
                  </button>

                  {isExpanded && (
                    <div className="px-6 pb-6 pt-5 space-y-5" style={{ borderTop: '1px solid #f0f2f7' }}>
                      {step.videoUrl && (
                        <VideoModal videoUrl={step.videoUrl}>
                          <div className="flex cursor-pointer items-center gap-3 rounded-xl px-4 py-3 transition hover:shadow" style={{ background: '#f8fafc', border: '1px solid #e0e2e6' }}>
                            <span className="text-2xl">🎬</span>
                            <div>
                              <div className="text-xs font-bold" style={{ color: '#1b61c9' }}>{step.videoLabel}</div>
                              <div className="text-sm font-medium" style={{ color: '#181d26' }}>{step.videoNote}</div>
                            </div>
                            <span className="ml-auto flex h-9 w-9 items-center justify-center rounded-full bg-red-500 text-white">
                              ▶
                            </span>
                          </div>
                        </VideoModal>
                      )}

                      {step.warning && (
                        <div className="rounded-xl p-4 text-sm leading-relaxed" style={{ background: 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.25)', color: '#b45309' }}>
                          ⚠️ {step.warning}
                        </div>
                      )}

                      {step.why && (
                        <div className="rounded-xl p-4 text-sm leading-relaxed" style={{ background: 'rgba(27,97,201,0.05)', border: '1px solid rgba(27,97,201,0.15)', color: '#1b61c9' }}>
                          <strong>ℹ️ Why this step? </strong>
                          {step.why}
                        </div>
                      )}

                      {step.link && (
                        <a href={step.link.href} target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition hover:opacity-80"
                          style={{ background: 'rgba(27,97,201,0.06)', border: '1px solid rgba(27,97,201,0.2)', color: '#1b61c9' }}>
                          🔗 {step.link.label} →
                        </a>
                      )}

                      <ol className="space-y-4">
                        {step.instructions.map((instruction, i) => (
                          <li key={i} className="flex gap-3">
                            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white" style={{ background: '#1b61c9' }}>
                              {i + 1}
                            </span>
                            <div className="text-sm leading-relaxed" style={{ color: 'rgba(4,14,32,0.7)' }}>
                              {instruction.text}
                              {instruction.warning && (
                                <div className="mt-2 rounded-lg px-3 py-2 text-xs" style={{ background: 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.2)', color: '#b45309' }}>
                                  ⚠️ {instruction.warning}
                                </div>
                              )}
                              {instruction.tip && (
                                <div className="mt-2 rounded-lg px-3 py-2 text-xs" style={{ background: 'rgba(6,182,212,0.06)', border: '1px solid rgba(6,182,212,0.2)', color: '#0891b2' }}>
                                  💡 {instruction.tip}
                                </div>
                              )}
                            </div>
                          </li>
                        ))}
                      </ol>

                      <button
                        onClick={() => { toggleStep(step.id); if (!completedSteps.includes(step.id)) setExpandedStep(step.id < 6 ? step.id + 1 : 0) }}
                        className="w-full rounded-xl py-3.5 text-base font-bold text-white transition"
                        style={{ background: isComplete ? '#10b981' : '#1b61c9' }}
                        onMouseEnter={e => !isComplete && ((e.currentTarget as HTMLButtonElement).style.background = '#254fad')}
                        onMouseLeave={e => !isComplete && ((e.currentTarget as HTMLButtonElement).style.background = '#1b61c9')}
                      >
                        {isComplete ? `✓ ${step.id === 6 ? 'All Steps Complete!' : 'Mark Incomplete'}` : step.id === 6 ? "I've Confirmed with My Partner ✦" : `${step.title} — Mark Complete ✓`}
                      </button>
                    </div>
                  )}
                </div>
              )
            })}

            {showCongrats && (
              <div className="rounded-2xl p-8 text-center" style={{ background: '#1b61c9', border: '1px solid rgba(27,97,201,0.3)' }}>
                <div className="text-4xl">🎉</div>
                <h2 className="mt-4 text-3xl font-bold text-white" style={{ letterSpacing: '-0.02em' }}>
                  You&apos;re Fully Onboarded!
                </h2>
                <p className="mt-3 text-white/75">
                  Your AI trading bot is active and you are now part of the AutoPilot ROI team.
                </p>
                <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                  <Link href="/resources" className="rounded-xl bg-white px-6 py-3 text-base font-bold transition hover:bg-blue-50" style={{ color: '#1b61c9' }}>Go to Resources →</Link>
                  <Link href="/university" className="text-sm font-semibold text-white/80 underline underline-offset-2 hover:text-white">Visit Aurum University</Link>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            <div className="sticky top-24 rounded-2xl p-5" id="partner-contact"
              style={{ background: '#fff', border: '1px solid #e0e2e6', boxShadow: '0 2px 12px rgba(27,97,201,0.07)' }}>
              <h3 className="font-bold mb-4 text-sm uppercase tracking-[0.12em]" style={{ color: '#181d26' }}>Your Progress</h3>
              <div className="mb-3 h-2 w-full overflow-hidden rounded-full" style={{ background: '#f0f2f7' }}>
                <div className="h-full rounded-full transition-all" style={{ width: `${(completedSteps.length / 6) * 100}%`, background: 'linear-gradient(90deg, #1b61c9, #10b981)' }} />
              </div>
              <div className="mb-4 text-sm" style={{ color: 'rgba(4,14,32,0.55)' }}>{completedSteps.length} of 6 steps complete</div>

              <div className="space-y-1">
                {onboardingSteps.map(step => {
                  const done = completedSteps.includes(step.id)
                  return (
                    <button key={step.id} onClick={() => setExpandedStep(step.id)}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-left transition"
                      style={{
                        background: done ? 'rgba(16,185,129,0.08)' : expandedStep === step.id ? 'rgba(27,97,201,0.08)' : 'transparent',
                        color: done ? '#059669' : expandedStep === step.id ? '#1b61c9' : 'rgba(4,14,32,0.55)',
                      }}>
                      <span className="shrink-0 font-bold">{done ? '✓' : step.symbol}</span>
                      <div>
                        <div className="font-semibold">{step.title}</div>
                        <div className="text-xs opacity-70">{step.subtitle}</div>
                      </div>
                    </button>
                  )
                })}
              </div>

              <div className="mt-4 pt-4" style={{ borderTop: '1px solid #e0e2e6' }}>
                <p className="text-xs mb-3" style={{ color: 'rgba(4,14,32,0.45)' }}>Need help? Your AutoPilot ROI partner is here to guide you through every step.</p>
                <Link href="/faqs" className="block w-full rounded-xl py-2.5 text-center text-sm font-semibold transition" style={{ background: '#f8fafc', border: '1px solid #e0e2e6', color: '#181d26' }}>
                  View FAQs
                </Link>
              </div>
            </div>

            <div className="rounded-2xl p-5" style={{ background: '#fff', border: '1px solid #e0e2e6' }}>
              <div className="text-2xl mb-2">🎓</div>
              <h3 className="font-bold mb-2" style={{ color: '#181d26' }}>Aurum University</h3>
              <p className="text-xs leading-relaxed mb-4" style={{ color: 'rgba(4,14,32,0.5)' }}>
                Each step includes embedded Aurum University videos. Watch them in order to fully understand each part of the onboarding process before acting.
              </p>
              <Link href="/university" className="block text-center text-sm font-semibold transition" style={{ color: '#1b61c9' }}>
                Browse All Videos →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
