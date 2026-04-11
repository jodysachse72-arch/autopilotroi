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
    <div className="min-h-screen bg-[#06122f]">
      {/* Header */}
      <div className="relative overflow-hidden border-b border-white/10 bg-[linear-gradient(180deg,#0b1f57_0%,#06122f_100%)] px-6 py-12 lg:px-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_60%,rgba(59,130,246,0.18),transparent_50%)]" />
        <div className="relative mx-auto max-w-7xl">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/15 px-4 py-2 text-sm font-medium text-blue-200">
            🚀 Guided Onboarding
          </div>
          <h1 className="font-[var(--font-sora)] text-4xl font-semibold tracking-[-0.05em] text-white lg:text-5xl">
            Start Your Aurum Journey
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-blue-100/80">
            Follow these 6 steps to complete your Aurum onboarding. Your partner is available to
            help at any stage.
          </p>

          {/* Progress strip */}
          <div className="mt-8 flex items-center gap-2 overflow-x-auto pb-2">
            {progressSteps.map((step, i) => {
              const done = completedSteps.includes(i + 1)
              return (
                <div key={step.label} className="flex items-center gap-2">
                  <div
                    className={`flex items-center gap-2 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold ${
                      done
                        ? 'bg-emerald-500/25 text-emerald-300'
                        : i + 1 === expandedStep
                          ? 'bg-blue-600/80 text-white'
                          : 'bg-white/10 text-blue-100/60'
                    }`}
                  >
                    {done && <span>✓</span>}
                    {step.label}
                  </div>
                  {i < progressSteps.length - 1 && (
                    <div
                      className={`h-px w-6 shrink-0 ${done ? 'bg-emerald-500/50' : 'bg-white/15'}`}
                    />
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
                  className={`overflow-hidden rounded-2xl border transition-all ${
                    isComplete
                      ? 'border-emerald-500/30 bg-emerald-500/5'
                      : isExpanded
                        ? 'border-blue-400/40 bg-white/6'
                        : 'border-white/10 bg-white/4'
                  }`}
                >
                  {/* Step header — always visible, click to expand */}
                  <button
                    onClick={() => setExpandedStep(isExpanded ? 0 : step.id)}
                    className="flex w-full items-center gap-4 px-6 py-5 text-left"
                  >
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-[var(--font-sora)] text-sm font-bold ${
                        isComplete
                          ? 'bg-emerald-500 text-white'
                          : isExpanded
                            ? 'bg-[linear-gradient(180deg,#3b82f6_0%,#2563eb_100%)] text-white shadow-[0_6px_16px_rgba(37,99,235,0.35)]'
                            : 'bg-white/12 text-white/60'
                      }`}
                    >
                      {isComplete ? '✓' : step.id}
                    </div>
                    <div className="flex-1">
                      <div className="text-xs font-semibold uppercase tracking-widest text-blue-300/70">
                        Step {step.id}
                      </div>
                      <div className="mt-0.5 font-[var(--font-sora)] text-lg font-semibold text-white">
                        {step.title}
                      </div>
                      <div className="text-sm text-blue-100/60">{step.subtitle}</div>
                    </div>
                    {isComplete && (
                      <span className="shrink-0 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-300">
                        ✓ Complete
                      </span>
                    )}
                    <span
                      className={`shrink-0 text-blue-300 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                    >
                      ▾
                    </span>
                  </button>

                  {/* Expanded content */}
                  {isExpanded && (
                    <div className="border-t border-white/8 px-6 pb-6 pt-5 space-y-5">
                      {/* Video */}
                      {step.videoUrl && (
                        <VideoModal videoUrl={step.videoUrl}>
                          <div className="flex cursor-pointer items-center gap-3 rounded-2xl border border-white/15 bg-slate-900/60 px-4 py-3 transition hover:bg-slate-900/80">
                            <span className="text-2xl">🎬</span>
                            <div>
                              <div className="text-xs font-semibold text-blue-300">{step.videoLabel}</div>
                              <div className="text-sm font-medium text-white">{step.videoNote}</div>
                            </div>
                            <span className="ml-auto flex h-9 w-9 items-center justify-center rounded-full bg-red-500 text-white shadow-[0_4px_12px_rgba(239,68,68,0.4)]">
                              ▶
                            </span>
                          </div>
                        </VideoModal>
                      )}

                      {/* Warning */}
                      {step.warning && (
                        <div className="rounded-2xl border border-amber-400/30 bg-amber-400/10 p-4 text-sm leading-7 text-amber-100">
                          ⚠️ {step.warning}
                        </div>
                      )}

                      {/* Why info */}
                      {step.why && (
                        <div className="rounded-2xl border border-blue-400/20 bg-blue-400/8 p-4 text-sm leading-7 text-blue-100">
                          <span className="font-semibold">ℹ️ Why this step? </span>
                          {step.why}
                        </div>
                      )}

                      {/* External link */}
                      {step.link && (
                        <a
                          href={step.link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 rounded-2xl border border-blue-400/30 bg-blue-500/10 px-4 py-3 text-sm font-medium text-blue-200 transition hover:bg-blue-500/18"
                        >
                          🔗 {step.link.label} →
                        </a>
                      )}

                      {/* Instructions */}
                      <ol className="space-y-4">
                        {step.instructions.map((instruction, i) => (
                          <li key={i} className="flex gap-3">
                            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600/40 text-xs font-bold text-blue-200">
                              {i + 1}
                            </span>
                            <div className="text-sm leading-7 text-blue-100/85">
                              {instruction.text}
                              {instruction.warning && (
                                <div className="mt-2 rounded-xl border border-amber-400/25 bg-amber-400/10 px-3 py-2 text-xs text-amber-200">
                                  ⚠️ {instruction.warning}
                                </div>
                              )}
                              {instruction.tip && (
                                <div className="mt-2 rounded-xl border border-cyan-400/25 bg-cyan-400/8 px-3 py-2 text-xs text-cyan-200">
                                  💡 {instruction.tip}
                                </div>
                              )}
                            </div>
                          </li>
                        ))}
                      </ol>

                      {/* Complete button */}
                      <button
                        onClick={() => {
                          toggleStep(step.id)
                          if (!completedSteps.includes(step.id)) {
                            setExpandedStep(step.id < 6 ? step.id + 1 : 0)
                          }
                        }}
                        className={`w-full rounded-2xl py-3.5 text-base font-semibold transition ${
                          isComplete
                            ? 'bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30'
                            : 'bg-[linear-gradient(180deg,#3b82f6_0%,#2563eb_100%)] text-white shadow-[0_10px_24px_rgba(37,99,235,0.32)] hover:brightness-110'
                        }`}
                      >
                        {isComplete
                          ? `✓ ${step.id === 6 ? 'All Steps Complete!' : 'Mark Incomplete'}`
                          : step.id === 6
                            ? "I've Confirmed with My Partner ✦"
                            : `${step.title} — Mark Complete ✓`}
                      </button>
                    </div>
                  )}
                </div>
              )
            })}

            {/* Congrats */}
            {showCongrats && (
              <div className="rounded-[1.8rem] bg-[linear-gradient(135deg,#1d4ed8_0%,#0f172a_100%)] p-8 text-center border border-blue-400/30">
                <div className="text-4xl">🎉</div>
                <h2 className="mt-4 font-[var(--font-sora)] text-3xl font-semibold text-white">
                  You&apos;re Fully Onboarded!
                </h2>
                <p className="mt-3 text-blue-100/80">
                  Your AI trading bot is active and you are now part of the AutoPilot ROI team.
                  Head to Resources to keep learning.
                </p>
                <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                  <Link
                    href="/resources"
                    className="rounded-xl bg-white px-6 py-3 text-base font-bold text-blue-700 shadow-[0_8px_20px_rgba(255,255,255,0.2)] transition hover:bg-blue-50"
                  >
                    Go to Resources →
                  </Link>
                  <Link
                    href="/university"
                    className="text-sm font-medium text-blue-200 underline underline-offset-2 hover:text-white"
                  >
                    Visit Aurum University
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Progress summary */}
            <div
              className="sticky top-24 rounded-2xl border border-white/10 bg-white/6 p-5 backdrop-blur-sm"
              id="partner-contact"
            >
              <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wide">
                Your Progress
              </h3>
              <div className="mb-4 h-2 w-full overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-[linear-gradient(90deg,#3b82f6,#22c55e)] transition-all"
                  style={{ width: `${(completedSteps.length / 6) * 100}%` }}
                />
              </div>
              <div className="mb-4 text-sm text-blue-100/70">
                {completedSteps.length} of 6 steps complete
              </div>

              <div className="space-y-2">
                {onboardingSteps.map((step) => {
                  const done = completedSteps.includes(step.id)
                  return (
                    <button
                      key={step.id}
                      onClick={() => setExpandedStep(step.id)}
                      className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-left transition ${
                        done
                          ? 'bg-emerald-500/15 text-emerald-300'
                          : expandedStep === step.id
                            ? 'bg-blue-600/30 text-white'
                            : 'text-blue-100/60 hover:bg-white/6 hover:text-white'
                      }`}
                    >
                      <span className="shrink-0 font-bold">
                        {done ? '✓' : step.symbol}
                      </span>
                      <div>
                        <div className="font-semibold">{step.title}</div>
                        <div className="text-xs opacity-70">{step.subtitle}</div>
                      </div>
                    </button>
                  )
                })}
              </div>

              <div className="mt-5 border-t border-white/10 pt-4">
                <p className="text-xs text-blue-100/60 mb-3">
                  Need help? Your AutoPilot ROI partner is here to guide you through every step.
                </p>
                <Link
                  href="/faqs"
                  className="block w-full rounded-xl border border-white/15 bg-white/8 py-2.5 text-center text-sm font-medium text-white transition hover:bg-white/12"
                >
                  View FAQs
                </Link>
              </div>
            </div>

            {/* University card */}
            <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-5">
              <div className="text-2xl mb-2">🎓</div>
              <h3 className="font-bold text-white mb-2">Aurum University</h3>
              <p className="text-xs text-blue-100/60 leading-relaxed mb-4">
                Each step includes embedded Aurum University videos. Watch them in order to fully
                understand each part of the onboarding process before acting.
              </p>
              <Link
                href="/university"
                className="block text-center text-sm font-medium text-blue-300 hover:text-white transition"
              >
                Browse All Videos →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
