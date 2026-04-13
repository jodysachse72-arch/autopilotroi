'use client'

import { useState } from 'react'
import Link from 'next/link'

export const faqCategories = [
  { id: 'all', label: 'All Questions' },
  { id: 'basic', label: '📘 Basic' },
  { id: 'advanced', label: '📗 Advanced' },
  { id: 'technical', label: '🔧 Technical' },
  { id: 'partner', label: '🤝 Partner Program' },
]

export const faqs = [
  // Basic
  {
    id: '1',
    q: 'What is Aurum Foundation?',
    a: 'Aurum Foundation is a decentralised AI-driven financial ecosystem that includes an automated cryptocurrency trading bot (EX-AI Bot), a Visa crypto debit card, a crypto exchange, and a Web3 neobank. AutoPilot ROI is the structured onboarding and support team for Aurum.',
    category: 'basic',
  },
  {
    id: '2',
    q: 'What is the minimum investment to get started?',
    a: 'The minimum investment to activate the Aurum AI trading bot is $100 USDT (Tether). This is held in your Aurum account and used by the bot to trade. You can start with $100 and scale up as you become comfortable.',
    category: 'basic',
  },
  {
    id: '3',
    q: 'How does the AI trading bot work?',
    a: 'The EX-AI Bot analyses global cryptocurrency markets 24/7 using machine learning. It executes trades automatically on Binance, Bybit, and KuCoin — the world\'s top exchanges. You activate it once during onboarding, and it runs continuously. Returns are automatically credited to your account.',
    category: 'basic',
  },
  {
    id: '4',
    q: 'Is this risky? Can I lose my money?',
    a: 'All investment carries risk. Cryptocurrency markets are volatile, and the AI bot does not guarantee specific returns. Past performance is not a guarantee of future results. You should only invest what you can afford to lose. We strongly recommend completing all education resources before investing.',
    category: 'basic',
  },
  {
    id: '5',
    q: 'Do I need any experience with crypto to join?',
    a: 'No experience is required. AutoPilot ROI and the onboarding guide walk you through every step from setting up a wallet to activating the bot. If you can follow instructions step by step, you can complete onboarding successfully.',
    category: 'basic',
  },
  {
    id: '6',
    q: 'How long does onboarding take?',
    a: 'Most members complete all onboarding steps within 1–3 days. The process includes setting up Trust Wallet, a VPN, acquiring USDT, creating your Aurum account, and activating the bot. Your partner is available to help at every step.',
    category: 'basic',
  },
  // Advanced
  {
    id: '7',
    q: 'How does the Aurum spillover system work?',
    a: 'Aurum uses a 3-deep spillover model. Each partner has 3 direct positions. When those positions are filled, new members who join through your team automatically route to the next open position in your downline. This means your team grows from the collective activity of everyone above you in the structure — not just your personal referrals.',
    category: 'advanced',
  },
  {
    id: '8',
    q: 'How are returns paid out?',
    a: 'Returns from the AI bot are credited to your Aurum account balance. You can withdraw to your Trust Wallet in USDT. Withdrawal schedules and fees vary — see the Aurum back office for current terms. You can also use the Visa crypto card to spend your earnings directly.',
    category: 'advanced',
  },
  {
    id: '9',
    q: 'What is the difference between the Investor path and the Partner path?',
    a: 'Investors activate the Aurum bot and let AI manage their portfolio without building a network. Partners do everything investors do, but additionally build a referral team and benefit from the spillover model — earning from team activity as well as their own bot returns.',
    category: 'advanced',
  },
  // Technical
  {
    id: '10',
    q: 'Why do I need a VPN?',
    a: 'Aurum is not available in all countries due to regional restrictions. A VPN (Virtual Private Network) masks your location so you can access the platform. We recommend NordVPN or ExpressVPN. Never use a free VPN for financial applications — it creates a security risk.',
    category: 'technical',
  },
  {
    id: '11',
    q: 'Why do I need Trust Wallet?',
    a: 'Trust Wallet is a self-custodial crypto wallet — meaning you control your own private keys. You use it to hold USDT before depositing into Aurum, and to withdraw your earnings. You should never store funds on an exchange you don\'t control.',
    category: 'technical',
  },
  {
    id: '12',
    q: 'What is USDT and where do I buy it?',
    a: 'USDT (Tether) is a stablecoin pegged to the US Dollar — 1 USDT ≈ $1 USD. You can purchase USDT on major exchanges like Binance, Coinbase, or Kraken using bank transfer or card. Once purchased, transfer it to your Trust Wallet, then deposit from there into Aurum.',
    category: 'technical',
  },
  // Partner
  {
    id: '13',
    q: 'How do referral codes work?',
    a: 'When you join through AutoPilot ROI, your referral is attributed to a specific partner in the team. Your partner\'s referral code is embedded in your onboarding link. This ensures the correct partner receives notification and credit for your signup. Never join Aurum using a random link from the internet — it may not place you correctly.',
    category: 'partner',
  },
  {
    id: '14',
    q: 'Can I become a partner?',
    a: 'Yes. After completing your own onboarding and activating your bot, you can opt into the Partner Program. Your AutoPilot ROI partner will walk you through the partner tools and show you how to use the referral system. Select the "Partner Program" path when registering.',
    category: 'partner',
  },
  {
    id: '15',
    q: 'What is the Partner Dashboard?',
    a: 'The Partner Dashboard is live at /dashboard. Partners can see every prospect referred through their link, track readiness scores, tiers, and onboarding status. It includes performance analytics, a team leaderboard, a multi-type referral link generator with QR codes, training videos, and profile settings.',
    category: 'partner',
  },
]

export default function FaqsPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [openId, setOpenId] = useState<string | null>(null)
  const [search, setSearch] = useState('')

  const visible = faqs.filter((faq) => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory
    const matchesSearch =
      search === '' ||
      faq.q.toLowerCase().includes(search.toLowerCase()) ||
      faq.a.toLowerCase().includes(search.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-[#06122f]">
      {/* Header */}
      <div className="relative overflow-hidden border-b border-white/10 bg-[linear-gradient(180deg,#0b1f57_0%,#06122f_100%)] px-6 py-16 lg:px-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(59,130,246,0.15),transparent_60%)]" />
        <div className="relative mx-auto max-w-4xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/15 px-4 py-2 text-sm font-medium text-blue-200">
            ❓ Frequently Asked Questions
          </div>
          <h1 className="font-[var(--font-sora)] text-5xl font-semibold tracking-[-0.055em] text-white sm:text-6xl">
            FAQs
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-blue-100/80">
            Common questions about Aurum, the AI bot, onboarding steps, and the partner program —
            answered clearly.
          </p>

          {/* Search */}
          <div className="relative mx-auto mt-8 max-w-xl">
            <input
              type="text"
              placeholder="Search questions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-2xl border border-white/20 bg-white/10 px-5 py-3 text-base text-white placeholder-blue-200/50 backdrop-blur-md outline-none focus:border-blue-400/60 focus:bg-white/12"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-300">🔍</span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-6 py-12 lg:px-10">
        {/* Category filters */}
        <div className="mb-8 flex flex-wrap gap-2">
          {faqCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                activeCategory === cat.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white/10 text-blue-100/80 hover:bg-white/15 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-3">
          {visible.length === 0 && (
            <div className="rounded-2xl border border-white/10 bg-white/6 p-8 text-center text-blue-100/60">
              No questions found for &quot;{search}&quot;. Try a different search term.
            </div>
          )}
          {visible.map((faq) => {
            const isOpen = openId === faq.id
            return (
              <div
                key={faq.id}
                className="overflow-hidden rounded-2xl border border-white/10 bg-white/6 backdrop-blur-sm"
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="text-base font-semibold text-white">{faq.q}</span>
                  <span
                    className={`shrink-0 text-blue-300 transition-transform ${isOpen ? 'rotate-45' : ''}`}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>
                {isOpen && (
                  <div className="border-t border-white/8 px-6 pb-6 pt-4">
                    <p className="text-base leading-8 text-blue-100/80">{faq.a}</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Still have questions */}
        <div className="mt-12 rounded-[2rem] border border-white/15 bg-white/6 p-8 text-center backdrop-blur-sm">
          <div className="text-3xl">💬</div>
          <h2 className="mt-3 font-[var(--font-sora)] text-2xl font-semibold text-white">
            Still have questions?
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-base leading-7 text-blue-100/80">
            Your AutoPilot ROI partner is available to answer any specific questions and walk you
            through onboarding personally.
          </p>
          <Link
            href="/start"
            className="mt-6 inline-flex items-center rounded-xl border border-blue-300/40 bg-[linear-gradient(180deg,#3b82f6_0%,#2563eb_100%)] px-7 py-3 text-base font-medium text-white shadow-[0_14px_30px_rgba(37,99,235,0.35)] transition hover:brightness-110"
          >
            Begin Onboarding →
          </Link>
        </div>
      </div>
    </div>
  )
}
