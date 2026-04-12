'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useFeatureFlags } from '@/lib/feature-flags'

/* ═══════════════════════════════════════════════════════════════
   SMART FAQ BOT — Local knowledge base, zero API cost
   Fuzzy-matches user questions against curated Q&A pairs.
   No ChatGPT/OpenAI needed — runs entirely in the browser.
   ═══════════════════════════════════════════════════════════════ */

interface QA {
  question: string
  keywords: string[]
  answer: string
  category: string
}

const KNOWLEDGE_BASE: QA[] = [
  // Getting Started
  {
    question: 'How much money do I need to get started?',
    keywords: ['how much', 'minimum', 'start', 'cost', 'money', 'invest', 'deposit', 'need'],
    answer: 'The minimum to get started depends on which product you choose. Trading bots typically require a minimum deposit of $100-$500. Your assigned partner will walk you through the exact amounts during your onboarding call.',
    category: 'Getting Started',
  },
  {
    question: 'Is this safe? Can I lose my money?',
    keywords: ['safe', 'risk', 'lose', 'scam', 'legitimate', 'legit', 'trust', 'secure'],
    answer: 'All investments carry risk — anyone who tells you otherwise is not being honest. AI trading bots use algorithms to manage risk, but markets can be unpredictable. We recommend only investing what you can afford to set aside. Read our full Risk Disclaimer for complete details.',
    category: 'Getting Started',
  },
  {
    question: 'What is AutopilotROI?',
    keywords: ['what is', 'autopilot', 'autopilotroi', 'about', 'platform', 'company'],
    answer: 'AutopilotROI is a structured onboarding platform that helps people understand and access AI-managed financial tools — including trading bots, crypto infrastructure, digital banking, and the partner referral program. We guide you from zero knowledge to fully set up.',
    category: 'Getting Started',
  },
  {
    question: 'How do I sign up?',
    keywords: ['sign up', 'register', 'create account', 'join', 'get started', 'signup'],
    answer: 'Start by taking our free Readiness Assessment at /signup. It takes about 2 minutes and matches you with a partner who will guide you through the rest. No payment information needed to get started.',
    category: 'Getting Started',
  },
  // Trading & Bots
  {
    question: 'How do AI trading bots work?',
    keywords: ['bot', 'trading bot', 'AI', 'algorithm', 'automated', 'how does it work', 'trading'],
    answer: 'AI trading bots use machine learning algorithms to analyze market data 24/7 and execute trades automatically. They look for patterns that humans would miss and can react to market changes in milliseconds. The EX-AI bot, for example, focuses on low-risk arbitrage and momentum strategies.',
    category: 'Trading & Bots',
  },
  {
    question: 'What returns can I expect?',
    keywords: ['returns', 'profit', 'earn', 'make', 'percentage', 'daily', 'monthly', 'roi'],
    answer: 'Past performance does not guarantee future results. Returns vary based on market conditions, your chosen strategy, and deposit amount. We never promise specific returns because that would be misleading. Your partner can show you historical performance data during your call.',
    category: 'Trading & Bots',
  },
  {
    question: 'Can I withdraw my money anytime?',
    keywords: ['withdraw', 'withdrawal', 'cash out', 'take out', 'get money back', 'pull out'],
    answer: 'Yes, you maintain control of your funds. Withdrawal policies vary by product and there may be processing times. Typically withdrawals are processed within 24-72 hours. Your partner will explain the exact process during onboarding.',
    category: 'Trading & Bots',
  },
  // Security
  {
    question: 'What is 2FA and why do I need it?',
    keywords: ['2fa', 'two factor', 'authentication', 'authenticator', 'security', 'verification'],
    answer: 'Two-Factor Authentication (2FA) adds an extra layer of security. Even if someone gets your password, they can\'t access your account without the code from your authenticator app. It\'s mandatory before depositing any funds — this protects your money.',
    category: 'Security',
  },
  {
    question: 'Do I need a VPN?',
    keywords: ['vpn', 'privacy', 'location', 'access', 'connect'],
    answer: 'A VPN (Virtual Private Network) is recommended for privacy and to ensure you can always access the platform regardless of your location. NordVPN, ExpressVPN, or Surfshark are all good options. Always connect your VPN before logging in.',
    category: 'Security',
  },
  // Referral Program
  {
    question: 'How does the partner/referral program work?',
    keywords: ['partner', 'referral', 'refer', 'affiliate', 'commission', 'earn', 'recruit', 'share'],
    answer: 'When you become a partner, you get a unique referral link. Share it with others — when they sign up and complete onboarding through your link, you earn commissions on their activity. The more people you refer, the higher your partner tier and rewards. Check the Partner Tools page for details.',
    category: 'Referral Program',
  },
  {
    question: 'How do I share my referral link?',
    keywords: ['share', 'link', 'referral link', 'social media', 'whatsapp', 'telegram', 'send'],
    answer: 'Go to your Partner Dashboard → Referral Links. There you can copy your unique link, generate a QR code, or use pre-written share templates for WhatsApp, Telegram, email, and social media.',
    category: 'Referral Program',
  },
  // Technical
  {
    question: 'What is Trust Wallet?',
    keywords: ['trust wallet', 'wallet', 'crypto wallet', 'store crypto'],
    answer: 'Trust Wallet is a free mobile app that securely stores your cryptocurrency. Think of it as a digital bank vault. You\'ll use it to hold USDC/USDT stablecoins and transfer them to your trading account. Download it from the official app store only (avoid clones).',
    category: 'Technical',
  },
  {
    question: 'What is USDC or USDT?',
    keywords: ['usdc', 'usdt', 'stablecoin', 'tether', 'usd coin', 'crypto dollar'],
    answer: 'USDC and USDT are stablecoins — cryptocurrencies that are always worth $1 USD. They\'re how you move money into the crypto ecosystem without exposure to Bitcoin price swings. You buy them with a debit card or bank transfer.',
    category: 'Technical',
  },
]

function findBestMatch(query: string): QA | null {
  const q = query.toLowerCase().trim()
  if (q.length < 3) return null

  let bestMatch: QA | null = null
  let bestScore = 0

  for (const qa of KNOWLEDGE_BASE) {
    let score = 0

    // Check keyword matches
    for (const keyword of qa.keywords) {
      if (q.includes(keyword)) {
        score += keyword.length // Longer keyword matches = higher confidence
      }
    }

    // Check question similarity
    const words = q.split(/\s+/)
    for (const word of words) {
      if (word.length >= 3 && qa.question.toLowerCase().includes(word)) {
        score += 2
      }
    }

    if (score > bestScore) {
      bestScore = score
      bestMatch = qa
    }
  }

  return bestScore >= 3 ? bestMatch : null
}

interface Message {
  id: number
  role: 'user' | 'bot'
  text: string
  category?: string
}

export default function SmartFaqBot() {
  const { isEnabled } = useFeatureFlags()
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: 'bot',
      text: 'Hi! 👋 I can answer questions about AutopilotROI, trading bots, security, the referral program, and more. What would you like to know?',
    },
  ])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  if (!isEnabled('smartFaq')) return null

  function handleSend() {
    if (!input.trim()) return

    const userMsg: Message = { id: Date.now(), role: 'user', text: input.trim() }
    setMessages((prev) => [...prev, userMsg])
    setInput('')

    // Find answer
    setTimeout(() => {
      const match = findBestMatch(userMsg.text)
      const botMsg: Message = match
        ? {
            id: Date.now() + 1,
            role: 'bot',
            text: match.answer,
            category: match.category,
          }
        : {
            id: Date.now() + 1,
            role: 'bot',
            text: "I'm not sure about that one. Try asking about: getting started, trading bots, security (VPN/2FA), the referral program, or wallets. You can also reach out to your assigned partner for personalized help!",
          }
      setMessages((prev) => [...prev, botMsg])
    }, 400 + Math.random() * 400)
  }

  return (
    <>
      {/* Floating button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg shadow-blue-600/30 hover:bg-blue-500 transition"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 flex w-[380px] max-w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0a1628] shadow-2xl"
            style={{ height: '520px' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 bg-[#061238] px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/20 text-sm">🤖</span>
                <div>
                  <div className="text-sm font-semibold text-white">AutopilotROI Assistant</div>
                  <div className="flex items-center gap-1 text-xs text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    Always online
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-white/40 hover:bg-white/5 hover:text-white transition"
              >
                ✕
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-blue-600 text-white rounded-br-md'
                        : 'bg-white/5 text-white/80 rounded-bl-md'
                    }`}
                  >
                    {msg.text}
                    {msg.category && (
                      <div className="mt-2 flex">
                        <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-white/30">
                          {msg.category}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick suggestions */}
            {messages.length <= 2 && (
              <div className="border-t border-white/5 px-4 py-2 flex gap-2 overflow-x-auto scrollbar-hide">
                {['How much to start?', 'Is this safe?', 'How do bots work?'].map((q) => (
                  <button
                    key={q}
                    onClick={() => { setInput(q); setTimeout(handleSend, 100) }}
                    className="whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/60 hover:bg-white/10 transition"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="border-t border-white/10 p-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask a question..."
                  className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/30 outline-none focus:border-blue-500 transition"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white transition hover:bg-blue-500 disabled:opacity-30"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
