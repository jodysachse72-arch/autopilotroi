'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { loadStore } from '@/lib/content-store'

export const faqCategories = [
  { id: 'all',           label: 'All Questions' },
  { id: 'basic',         label: '📘 Basic' },
  { id: 'advanced',      label: '📗 Advanced' },
  { id: 'technical',     label: '🔧 Technical' },
  { id: 'partner',       label: '🤝 Partner Program' },
  { id: 'getting-started', label: '🚀 Getting Started' },
  { id: 'products',      label: '🤖 Products' },
  { id: 'general',       label: '📋 General' },
]

export const faqs = [
  { id: '1',  q: 'What is Aurum Foundation?', a: 'Aurum Foundation is a decentralised AI-driven financial ecosystem that includes an automated cryptocurrency trading bot (EX-AI Bot), a Visa crypto debit card, a crypto exchange, and a Web3 neobank. AutoPilot ROI is the structured onboarding and support team for Aurum.', category: 'basic' },
  { id: '2',  q: 'What is the minimum investment to get started?', a: 'The minimum investment to activate the Aurum AI trading bot is $100 USDT (Tether). This is held in your Aurum account and used by the bot to trade. You can start with $100 and scale up as you become comfortable.', category: 'basic' },
  { id: '3',  q: 'How does the AI trading bot work?', a: 'The EX-AI Bot analyses global cryptocurrency markets 24/7 using machine learning. It executes trades automatically on Binance, Bybit, and KuCoin — the world\'s top exchanges. You activate it once during onboarding, and it runs continuously. Returns are automatically credited to your account.', category: 'basic' },
  { id: '4',  q: 'Is this risky? Can I lose my money?', a: 'All investment carries risk. Cryptocurrency markets are volatile, and the AI bot does not guarantee specific returns. Past performance is not a guarantee of future results. You should only invest what you can afford to lose. We strongly recommend completing all education resources before investing.', category: 'basic' },
  { id: '5',  q: 'Do I need any experience with crypto to join?', a: 'No experience is required. AutoPilot ROI and the onboarding guide walk you through every step from setting up a wallet to activating the bot. If you can follow instructions step by step, you can complete onboarding successfully.', category: 'basic' },
  { id: '6',  q: 'How long does onboarding take?', a: 'Most members complete all onboarding steps within 1–3 days. The process includes setting up Trust Wallet, a VPN, acquiring USDT, creating your Aurum account, and activating the bot. Your partner is available to help at every step.', category: 'basic' },
  { id: '7',  q: 'How does the Aurum spillover system work?', a: 'Aurum uses a 3-deep spillover model. Each partner has 3 direct positions. When those positions are filled, new members who join through your team automatically route to the next open position in your downline. This means your team grows from the collective activity of everyone above you in the structure — not just your personal referrals.', category: 'advanced' },
  { id: '8',  q: 'How are returns paid out?', a: 'Returns from the AI bot are credited to your Aurum account balance. You can withdraw to your Trust Wallet in USDT. Withdrawal schedules and fees vary — see the Aurum back office for current terms. You can also use the Visa crypto card to spend your earnings directly.', category: 'advanced' },
  { id: '9',  q: 'What is the difference between the Investor path and the Partner path?', a: 'Investors activate the Aurum bot and let AI manage their portfolio without building a network. Partners do everything investors do, but additionally build a referral team and benefit from the spillover model — earning from team activity as well as their own bot returns.', category: 'advanced' },
  { id: '10', q: 'Why do I need a VPN?', a: 'Aurum is not available in all countries due to regional restrictions. A VPN masks your location so you can access the platform. We recommend NordVPN or ExpressVPN. Never use a free VPN for financial applications — it creates a security risk.', category: 'technical' },
  { id: '11', q: 'Why do I need Trust Wallet?', a: 'Trust Wallet is a self-custodial crypto wallet — meaning you control your own private keys. You use it to hold USDT before depositing into Aurum, and to withdraw your earnings.', category: 'technical' },
  { id: '12', q: 'What is USDT and where do I buy it?', a: 'USDT (Tether) is a stablecoin pegged to the US Dollar — 1 USDT ≈ $1 USD. You can purchase USDT on major exchanges like Binance, Coinbase, or Kraken using bank transfer or card. Once purchased, transfer it to your Trust Wallet, then deposit from there into Aurum.', category: 'technical' },
  { id: '13', q: 'How do referral codes work?', a: 'When you join through AutoPilot ROI, your referral is attributed to a specific partner in the team. Your partner\'s referral code is embedded in your onboarding link. This ensures the correct partner receives notification and credit for your signup. Never join Aurum using a random link from the internet — it may not place you correctly.', category: 'partner' },
  { id: '14', q: 'Can I become a partner?', a: 'Yes. After completing your own onboarding and activating your bot, you can opt into the Partner Program. Your AutoPilot ROI partner will walk you through the partner tools and show you how to use the referral system.', category: 'partner' },
  { id: '15', q: 'What is the Partner Dashboard?', a: 'The Partner Dashboard is live at /dashboard. Partners can see every prospect referred through their link, track readiness scores, tiers, and onboarding status. It includes performance analytics, a team leaderboard, a multi-type referral link generator with QR codes, training videos, and profile settings.', category: 'partner' },
]

export default function FaqsPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [openId, setOpenId] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [allFaqs, setAllFaqs] = useState(faqs)

  useEffect(() => {
    try {
      const store = loadStore()
      if (store.faqs && store.faqs.length > 0) {
        const editorFaqs = store.faqs.map(f => ({ id: f.id, q: f.question, a: f.answer, category: f.category }))
        const hardcodedIds = new Set(faqs.map(f => f.id))
        setAllFaqs([...faqs, ...editorFaqs.filter(f => !hardcodedIds.has(f.id))])
      }
    } catch {}
  }, [])

  const visible = allFaqs.filter(faq => {
    const matchesCat = activeCategory === 'all' || faq.category === activeCategory
    const matchesSearch = !search || faq.q.toLowerCase().includes(search.toLowerCase()) || faq.a.toLowerCase().includes(search.toLowerCase())
    return matchesCat && matchesSearch
  })

  return (
    <div className="min-h-screen" style={{ background: '#f8fafc' }}>
      {/* Hero */}
      <section className="px-6 py-16 lg:px-10" style={{ background: '#fff', borderBottom: '1px solid #e0e2e6' }}>
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-block rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] mb-4"
            style={{ background: 'rgba(27,97,201,0.08)', color: '#1b61c9', border: '1px solid rgba(27,97,201,0.15)' }}>
            Frequently Asked Questions
          </span>
          <h1 className="text-4xl font-bold mb-4" style={{ color: '#181d26', letterSpacing: '-0.03em' }}>FAQs</h1>
          <p className="text-lg max-w-2xl mx-auto mb-8" style={{ color: 'rgba(4,14,32,0.55)', lineHeight: 1.7 }}>
            Common questions about Aurum, the AI bot, onboarding steps, and the partner program — answered clearly.
          </p>
          {/* Search */}
          <div className="relative mx-auto max-w-xl">
            <input
              type="text" placeholder="Search questions..."
              value={search} onChange={e => setSearch(e.target.value)}
              className="w-full rounded-xl px-5 py-3 text-base outline-none transition"
              style={{ border: '1.5px solid #e0e2e6', color: '#181d26', background: '#fff' }}
              onFocus={e => (e.target.style.borderColor = '#1b61c9')}
              onBlur={e  => (e.target.style.borderColor = '#e0e2e6')}
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2" style={{ color: '#1b61c9' }}>🔍</span>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-6 py-12 lg:px-10">
        {/* Category filters */}
        <div className="mb-8 flex flex-wrap gap-2">
          {faqCategories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className="rounded-full px-4 py-2 text-sm font-semibold transition"
              style={{
                background: activeCategory === cat.id ? '#1b61c9' : '#fff',
                color: activeCategory === cat.id ? '#fff' : 'rgba(4,14,32,0.65)',
                border: activeCategory === cat.id ? '1px solid #1b61c9' : '1px solid #e0e2e6',
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Accordion */}
        <div className="space-y-2">
          {visible.length === 0 && (
            <div className="rounded-2xl p-10 text-center" style={{ background: '#fff', border: '1px solid #e0e2e6' }}>
              <div className="text-3xl mb-3">🔍</div>
              <p style={{ color: 'rgba(4,14,32,0.5)' }}>No questions found for &quot;{search}&quot;. Try a different search term.</p>
            </div>
          )}
          {visible.map(faq => {
            const isOpen = openId === faq.id
            return (
              <div key={faq.id} className="overflow-hidden rounded-xl transition-shadow hover:shadow-[0_4px_16px_rgba(27,97,201,0.08)]"
                style={{ background: '#fff', border: '1px solid #e0e2e6' }}>
                <button
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="text-base font-semibold" style={{ color: '#181d26' }}>{faq.q}</span>
                  <span className="shrink-0 text-xl font-light transition-transform" style={{ color: '#1b61c9', transform: isOpen ? 'rotate(45deg)' : 'none' }}>+</span>
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 pt-0" style={{ borderTop: '1px solid #f0f2f7' }}>
                    <p className="text-base leading-relaxed" style={{ color: 'rgba(4,14,32,0.65)' }}>{faq.a}</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Still have questions */}
        <div className="mt-12 rounded-2xl p-10 text-center" style={{ background: '#1b61c9' }}>
          <div className="text-3xl mb-4">💬</div>
          <h2 className="text-2xl font-bold text-white mb-3" style={{ letterSpacing: '-0.02em' }}>Still have questions?</h2>
          <p className="text-white/75 mb-6 max-w-lg mx-auto">
            Your AutoPilot ROI partner is available to answer any specific questions and walk you through onboarding personally.
          </p>
          <Link href="/signup" className="inline-block rounded-xl px-8 py-3.5 font-bold transition hover:opacity-90" style={{ background: '#fff', color: '#1b61c9' }}>
            Begin Onboarding →
          </Link>
        </div>
      </div>
    </div>
  )
}
