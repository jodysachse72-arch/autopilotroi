'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

/* ═══════════════════════════════════════════════════════════════
   TRUST CHECK — 60-Second Opportunity Evaluator
   
   Educational trust-building tool. NOT fear-based.
   Helps users evaluate ANY crypto/AI/income opportunity
   using the same due diligence framework AutopilotROI
   used when choosing to partner with Aurum Foundation.
   
   The logic is transparent. The scoring is honest.
   When Aurum is evaluated, it scores well — because
   it has real products, real tech, and verifiable proof.
   ═══════════════════════════════════════════════════════════════ */

/* ─── Quiz Questions ─── */
interface QuizOption {
  label: string
  score: number
  flag?: string // red/yellow flag text if selected
}

interface QuizQuestion {
  id: string
  category: string
  categoryIcon: string
  question: string
  context: string // explains WHY this question matters
  options: QuizOption[]
  weight: number // multiplier for this category
}

const QUESTIONS: QuizQuestion[] = [
  {
    id: 'revenue',
    category: 'Revenue Source',
    categoryIcon: '💰',
    question: 'Where does the company make its money?',
    context: 'Legitimate businesses earn revenue from products, services, or technology — not from new users joining.',
    weight: 1.4, // Weighted higher — this is the #1 red flag
    options: [
      { label: 'Real products/services people pay for (trading tools, exchange fees, financial services)', score: 10 },
      { label: 'A mix of products and referral bonuses', score: 6 },
      { label: 'It\'s unclear — mostly seems to come from new members joining', score: 2, flag: 'Revenue source unclear or dependent on recruitment' },
      { label: 'I have no idea where the money comes from', score: 0, flag: 'No verifiable revenue model' },
    ],
  },
  {
    id: 'sustainability',
    category: 'Sustainability',
    categoryIcon: '🔋',
    question: 'Could this opportunity survive if no new people joined tomorrow?',
    context: 'A sustainable business doesn\'t collapse without growth. Its products have standalone value.',
    weight: 1.3,
    options: [
      { label: 'Yes — the products/tech work independently of how many people join', score: 10 },
      { label: 'Probably — but growth is heavily encouraged', score: 6 },
      { label: 'Unlikely — it seems to need constant new participants', score: 2, flag: 'Growth-dependent model' },
      { label: 'Definitely not — the entire system relies on new money coming in', score: 0, flag: 'Structural dependency on new participant funding' },
    ],
  },
  {
    id: 'transparency',
    category: 'Transparency',
    categoryIcon: '🔍',
    question: 'Can you verify who runs it and how it works?',
    context: 'Real companies have verifiable leadership, registered entities, auditable technology, and clear documentation.',
    weight: 1.2,
    options: [
      { label: 'Yes — known team, registered company, public documentation, and verifiable tech', score: 10 },
      { label: 'Partially — some info is public but not everything', score: 5 },
      { label: 'Not really — the founders are anonymous or hard to find', score: 2, flag: 'Limited team transparency' },
      { label: 'No — I can\'t verify anything about the company or team', score: 0, flag: 'No verifiable team or entity' },
    ],
  },
  {
    id: 'incentives',
    category: 'Incentive Structure',
    categoryIcon: '⚖️',
    question: 'What are you rewarded for?',
    context: 'Healthy programs reward you for using the product. Risky ones reward you mainly for recruiting others.',
    weight: 1.0,
    options: [
      { label: 'Using the product — referrals are optional and secondary', score: 10 },
      { label: 'Both using the product and referring others, roughly equal', score: 7 },
      { label: 'Mostly referrals — the product seems secondary to recruitment', score: 3, flag: 'Referral-heavy incentive model' },
      { label: 'Almost entirely recruiting — the \'product\' is the opportunity itself', score: 0, flag: 'Recruitment-as-product structure' },
    ],
  },
  {
    id: 'language',
    category: 'Marketing Language',
    categoryIcon: '📣',
    question: 'How does the opportunity describe itself?',
    context: 'Legitimate businesses focus on what the product does. Risky ones focus on how much money you\'ll make.',
    weight: 1.0,
    options: [
      { label: 'Focuses on the technology, features, and real use cases', score: 10 },
      { label: 'Balanced — talks about both the product and earning potential', score: 6 },
      { label: 'Lots of income claims, lifestyle posts, and urgency ("get in now!")', score: 2, flag: 'Hype-heavy marketing' },
      { label: '"Guaranteed returns," "passive income," "financial freedom" with no substance', score: 0, flag: 'Guaranteed return claims detected' },
    ],
  },
]

/* ─── Scoring Logic ─── */
function calculateResults(answers: Record<string, number>, flags: string[]) {
  let weightedTotal = 0
  let maxPossible = 0

  QUESTIONS.forEach((q) => {
    const raw = answers[q.id] ?? 0
    weightedTotal += raw * q.weight
    maxPossible += 10 * q.weight
  })

  // Normalize to 0-50 scale
  const score = Math.round((weightedTotal / maxPossible) * 50)

  let level: 'strong' | 'caution' | 'high-risk'
  let levelLabel: string
  let levelColor: string
  let explanation: string

  if (score >= 40) {
    level = 'strong'
    levelLabel = 'Strong Opportunity'
    levelColor = 'emerald'
    explanation = 'This opportunity shows signs of a legitimate, product-driven business. Revenue appears to come from real activity, the model looks sustainable, and there\'s meaningful transparency. That said, always continue doing your own research — no evaluation tool replaces personal due diligence.'
  } else if (score >= 25) {
    level = 'caution'
    levelLabel = 'Proceed with Caution'
    levelColor = 'amber'
    explanation = 'This opportunity has some positive indicators but also raises questions. There may be unclear revenue sources, heavy emphasis on recruitment, or limited transparency. Take time to verify claims independently before committing any funds.'
  } else {
    level = 'high-risk'
    levelLabel = 'High Risk'
    levelColor = 'red'
    explanation = 'This opportunity shows multiple patterns commonly associated with unsustainable models. Revenue sources are unclear, growth-dependency is high, and verifiable information is limited. We strongly recommend extreme caution and independent research before proceeding.'
  }

  return { score, level, levelLabel, levelColor, explanation, flags }
}

/* ─── Category breakdown for results ─── */
function getCategoryScores(answers: Record<string, number>) {
  return QUESTIONS.map((q) => ({
    category: q.category,
    icon: q.categoryIcon,
    score: answers[q.id] ?? 0,
    max: 10,
    weight: q.weight,
  }))
}

/* ─── Aurum Self-Evaluation (Transparency) ─── */
const AURUM_EVALUATION = {
  score: 43,
  breakdown: [
    {
      category: 'Revenue Source',
      score: 9,
      note: 'Aurum generates revenue through exchange trading fees, AI bot licensing, crypto card interchange fees, and neobank services. Products operate independently of member growth.',
    },
    {
      category: 'Sustainability',
      score: 9,
      note: 'The trading exchange and AI bots function regardless of participant count. The technology has standalone utility in the market.',
    },
    {
      category: 'Transparency',
      score: 8,
      note: 'Registered entity, public leadership, live product suite. Some areas are still expanding documentation, which is why this isn\'t a perfect 10.',
    },
    {
      category: 'Incentive Structure',
      score: 8,
      note: 'Primary value comes from using the trading tools and financial products. Referral program exists but is secondary to the product experience.',
    },
    {
      category: 'Marketing Language',
      score: 9,
      note: 'Focuses on technology, product features, and ecosystem development. Avoids income guarantees or unrealistic promises.',
    },
  ],
  totalNote: 'This is how AutopilotROI evaluated Aurum Foundation before choosing to partner. We applied the same framework you just used. No special scoring — just honest evaluation.',
}

/* ─── Rotating Quotes ─── */
const QUOTES = [
  'The best investment you can make is in your own knowledge.',
  'Due diligence isn\'t paranoia — it\'s wisdom.',
  'Trust is earned through transparency, not promises.',
  'In a world of noise, clarity is the ultimate edge.',
  'Smart money asks questions before writing checks.',
  'The right opportunity welcomes scrutiny.',
]

/* ─── Component ─── */

const fadeAnim = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
}

export default function EvaluatePage() {
  const [phase, setPhase] = useState<'intro' | 'quiz' | 'results' | 'aurum'>('intro')
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [flags, setFlags] = useState<string[]>([])
  const [showAurum, setShowAurum] = useState(false)
  const [quoteIndex, setQuoteIndex] = useState(0)

  // Rotate quotes every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % QUOTES.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  function selectAnswer(questionId: string, score: number, flag?: string) {
    setAnswers((prev) => ({ ...prev, [questionId]: score }))
    if (flag) setFlags((prev) => [...prev, flag])

    if (currentQ < QUESTIONS.length - 1) {
      setTimeout(() => setCurrentQ(currentQ + 1), 300)
    } else {
      setTimeout(() => setPhase('results'), 400)
    }
  }

  function restart() {
    setPhase('intro')
    setCurrentQ(0)
    setAnswers({})
    setFlags([])
    setShowAurum(false)
  }

  const results = phase === 'results' || phase === 'aurum' ? calculateResults(answers, flags) : null
  const categories = phase === 'results' || phase === 'aurum' ? getCategoryScores(answers) : []

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      {/* Success quote ticker — replaces the old duplicate header */}
      <div className="border-b border-[var(--border-primary)] bg-[var(--bg-card)]/50 backdrop-blur-sm">
        <div className="mx-auto max-w-5xl px-6 py-2.5 text-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={quoteIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4 }}
              className="text-xs sm:text-sm text-[var(--text-muted)] italic"
            >
              &ldquo;{QUOTES[quoteIndex]}&rdquo;
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-6 py-12 lg:py-16">
        <AnimatePresence mode="wait">
          {/* ═══════════════════════════════════════════════
              PHASE: INTRO
          ═══════════════════════════════════════════════ */}
          {phase === 'intro' && (
            <motion.div key="intro" {...fadeAnim} className="text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-blue-300 sm:text-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" /> Free Tool
              </div>

              <h1 className="font-[var(--font-sora)] text-4xl font-bold text-[var(--text-primary)] sm:text-5xl lg:text-6xl">
                Trust Check
                <span className="block mt-3 text-xl font-normal text-[var(--text-muted)] sm:text-2xl lg:text-3xl">
                  Evaluate any opportunity in 60 seconds
                </span>
              </h1>

              <p className="mx-auto mt-8 max-w-2xl text-base text-[var(--text-secondary)] leading-relaxed sm:text-lg lg:text-xl">
                Before you invest time or money into any crypto, AI, or passive income opportunity — run it through the same due diligence framework that AutopilotROI used when choosing to partner with Aurum Foundation.
              </p>

              <p className="mx-auto mt-4 max-w-xl text-sm text-[var(--text-muted)] sm:text-base">
                5 questions. No sign-up required. Completely free.
              </p>

              {/* What this checks */}
              <div className="mx-auto mt-10 grid max-w-xl gap-3 sm:grid-cols-5">
                {QUESTIONS.map((q) => (
                  <div key={q.id} className="rounded-xl border border-[var(--border-primary)] bg-[var(--bg-card)] p-3 text-center">
                    <span className="text-xl">{q.categoryIcon}</span>
                    <div className="mt-1 text-[10px] font-medium text-[var(--text-muted)]">{q.category}</div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setPhase('quiz')}
                className="mt-10 inline-flex items-center gap-2 rounded-xl bg-[linear-gradient(180deg,#3b82f6_0%,#2563eb_100%)] px-8 py-4 font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:shadow-blue-600/40"
              >
                Start Evaluation →
              </button>

              <p className="mt-4 text-xs text-[var(--text-muted)]">
                No data is collected. This runs entirely in your browser.
              </p>
            </motion.div>
          )}

          {/* ═══════════════════════════════════════════════
              PHASE: QUIZ
          ═══════════════════════════════════════════════ */}
          {phase === 'quiz' && (
            <motion.div key={`quiz-${currentQ}`} {...fadeAnim}>
              {/* Progress */}
              <div className="mb-8">
                <div className="flex items-center justify-between text-sm text-[var(--text-muted)] mb-2">
                  <span>Question {currentQ + 1} of {QUESTIONS.length}</span>
                  <span>{Math.round(((currentQ) / QUESTIONS.length) * 100)}%</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-[var(--bg-card)]">
                  <motion.div
                    className="h-full rounded-full bg-blue-500"
                    animate={{ width: `${((currentQ) / QUESTIONS.length) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                {/* Step dots */}
                <div className="mt-3 flex justify-between">
                  {QUESTIONS.map((_, i) => (
                    <div
                      key={i}
                      className={`h-2 w-2 rounded-full transition ${
                        i < currentQ ? 'bg-blue-500' :
                        i === currentQ ? 'bg-blue-400 ring-4 ring-blue-400/20' :
                        'bg-white/10'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Category badge */}
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-[var(--text-muted)]">
                {QUESTIONS[currentQ].categoryIcon} {QUESTIONS[currentQ].category}
              </div>

              {/* Question */}
              <h2 className="font-[var(--font-sora)] text-2xl font-bold text-[var(--text-primary)] sm:text-3xl">
                {QUESTIONS[currentQ].question}
              </h2>

              {/* Context */}
              <p className="mt-3 text-sm text-[var(--text-muted)] leading-relaxed">
                <span className="text-blue-400 font-semibold">Why this matters:</span>{' '}
                {QUESTIONS[currentQ].context}
              </p>

              {/* Options */}
              <div className="mt-8 space-y-3">
                {QUESTIONS[currentQ].options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => selectAnswer(QUESTIONS[currentQ].id, opt.score, opt.flag)}
                    className={`group w-full rounded-xl border border-[var(--border-primary)] bg-[var(--bg-card)] px-5 py-4 text-left transition-all hover:border-blue-500/40 hover:bg-blue-500/5 ${
                      answers[QUESTIONS[currentQ].id] === opt.score ? 'border-blue-500 bg-blue-500/10' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold transition ${
                        answers[QUESTIONS[currentQ].id] === opt.score
                          ? 'border-blue-500 bg-blue-500 text-white'
                          : 'border-white/20 text-white/20 group-hover:border-blue-400/40'
                      }`}>
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span className="text-sm text-[var(--text-secondary)] leading-relaxed group-hover:text-white">
                        {opt.label}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* ═══════════════════════════════════════════════
              PHASE: RESULTS
          ═══════════════════════════════════════════════ */}
          {(phase === 'results' || phase === 'aurum') && results && (
            <motion.div key="results" {...fadeAnim} className="space-y-8">
              {/* Score Header */}
              <div className="text-center">
                <div className={`mx-auto mb-4 flex h-28 w-28 items-center justify-center rounded-full border-4 ${
                  results.levelColor === 'emerald' ? 'border-emerald-400/40 bg-emerald-500/10' :
                  results.levelColor === 'amber' ? 'border-amber-400/40 bg-amber-500/10' :
                  'border-red-400/40 bg-red-500/10'
                }`}>
                  <div className="text-center">
                    <div className={`font-[var(--font-sora)] text-4xl font-black ${
                      results.levelColor === 'emerald' ? 'text-emerald-400' :
                      results.levelColor === 'amber' ? 'text-amber-400' :
                      'text-red-400'
                    }`}>
                      {results.score}
                    </div>
                    <div className="text-xs text-[var(--text-muted)]">/50</div>
                  </div>
                </div>

                <div className={`inline-block rounded-full px-4 py-1.5 text-sm font-bold ${
                  results.levelColor === 'emerald' ? 'bg-emerald-500/15 text-emerald-400' :
                  results.levelColor === 'amber' ? 'bg-amber-500/15 text-amber-400' :
                  'bg-red-500/15 text-red-400'
                }`}>
                  {results.levelLabel}
                </div>

                <p className="mx-auto mt-6 max-w-xl text-sm text-[var(--text-secondary)] leading-relaxed">
                  {results.explanation}
                </p>
              </div>

              {/* Category Breakdown */}
              <div className="rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-card)] p-6">
                <h3 className="font-[var(--font-sora)] text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-5">
                  Score Breakdown
                </h3>
                <div className="space-y-4">
                  {categories.map((cat) => (
                    <div key={cat.category}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="flex items-center gap-2 text-sm text-[var(--text-primary)]">
                          {cat.icon} {cat.category}
                          {cat.weight > 1 && (
                            <span className="text-[10px] text-[var(--text-muted)]">×{cat.weight}</span>
                          )}
                        </span>
                        <span className={`text-sm font-bold ${
                          cat.score >= 7 ? 'text-emerald-400' :
                          cat.score >= 4 ? 'text-amber-400' :
                          'text-red-400'
                        }`}>
                          {cat.score}/{cat.max}
                        </span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-[var(--bg-card)]">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(cat.score / cat.max) * 100}%` }}
                          transition={{ delay: 0.2, duration: 0.5 }}
                          className={`h-2 rounded-full ${
                            cat.score >= 7 ? 'bg-emerald-500' :
                            cat.score >= 4 ? 'bg-amber-500' :
                            'bg-red-500'
                          }`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Flags Detected */}
              {flags.length > 0 && (
                <div className="rounded-2xl border border-amber-400/20 bg-amber-500/5 p-6">
                  <h3 className="flex items-center gap-2 font-[var(--font-sora)] text-sm font-semibold text-amber-400 uppercase tracking-wider mb-4">
                    ⚡ Patterns Detected
                  </h3>
                  <div className="space-y-2">
                    {flags.map((flag, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm text-amber-200/70">
                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                        {flag}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ── How Aurum Scores (Transparency Section) ── */}
              <div className="rounded-2xl border border-blue-400/20 bg-blue-500/5 p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-[var(--font-sora)] text-base font-bold text-[var(--text-primary)]">
                      See how we evaluated Aurum Foundation
                    </h3>
                    <p className="mt-1 text-sm text-[var(--text-muted)]">
                      AutopilotROI applied this exact framework before choosing to partner with Aurum. Here&apos;s how it scored — transparently, with notes on each category.
                    </p>
                  </div>
                  <button
                    onClick={() => setShowAurum(!showAurum)}
                    className="shrink-0 rounded-xl border border-blue-400/30 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-300 transition hover:bg-blue-500/20"
                  >
                    {showAurum ? 'Hide' : 'View'} Evaluation
                  </button>
                </div>

                <AnimatePresence>
                  {showAurum && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-6 pt-6 border-t border-blue-400/10 space-y-5">
                        {/* Aurum Score */}
                        <div className="flex items-center gap-4">
                          <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-emerald-400/40 bg-emerald-500/10">
                            <span className="font-[var(--font-sora)] text-2xl font-black text-emerald-400">
                              {AURUM_EVALUATION.score}
                            </span>
                          </div>
                          <div>
                            <div className="text-sm font-bold text-emerald-400">Strong Opportunity</div>
                            <div className="text-xs text-[var(--text-muted)]">Aurum Foundation · Evaluated by AutopilotROI</div>
                          </div>
                        </div>

                        {/* Category breakdown with notes */}
                        {AURUM_EVALUATION.breakdown.map((cat) => (
                          <div key={cat.category} className="rounded-xl bg-[var(--bg-card)] border border-[var(--border-primary)] p-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-semibold text-[var(--text-primary)]">{cat.category}</span>
                              <span className="text-sm font-bold text-emerald-400">{cat.score}/10</span>
                            </div>
                            <p className="text-xs text-[var(--text-muted)] leading-relaxed">{cat.note}</p>
                          </div>
                        ))}

                        <div className="rounded-lg bg-[var(--bg-card)] border border-[var(--border-primary)] p-4">
                          <p className="text-xs text-[var(--text-muted)] leading-relaxed italic">
                            {AURUM_EVALUATION.totalNote}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* CTA — Value-first, not pushy */}
              <div className="rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-card)] p-6 text-center">
                <h3 className="font-[var(--font-sora)] text-lg font-bold text-[var(--text-primary)]">
                  Want to evaluate Aurum for yourself?
                </h3>
                <p className="mx-auto mt-2 max-w-lg text-sm text-[var(--text-muted)]">
                  AutopilotROI provides a structured, step-by-step path to understand the Aurum ecosystem — with education, transparency, and real partner support. No pressure. No hype.
                </p>
                <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                  <Link
                    href="/products"
                    className="rounded-xl bg-[linear-gradient(180deg,#3b82f6_0%,#2563eb_100%)] px-6 py-3 font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:shadow-blue-600/40"
                  >
                    Explore the Products →
                  </Link>
                  <Link
                    href="/signup"
                    className="rounded-xl border border-[var(--border-primary)] bg-[var(--bg-card)] px-6 py-3 font-semibold text-[var(--text-secondary)] transition hover:bg-[var(--bg-card-hover)]"
                  >
                    Take the Readiness Quiz
                  </Link>
                </div>
              </div>

              {/* Share + Restart */}
              <div className="flex items-center justify-between">
                <button
                  onClick={restart}
                  className="text-sm font-medium text-[var(--text-muted)] hover:text-white transition"
                >
                  ← Evaluate Another
                </button>
                <button
                  onClick={() => {
                    const text = `I just evaluated a crypto opportunity using AutopilotROI's Trust Check tool. It scored ${results.score}/50 (${results.levelLabel}). Try it yourself:`
                    const url = typeof window !== 'undefined' ? window.location.href : ''
                    if (navigator.share) {
                      navigator.share({ title: 'Trust Check Results', text, url })
                    } else {
                      navigator.clipboard.writeText(`${text} ${url}`)
                      alert('Results copied to clipboard!')
                    }
                  }}
                  className="flex items-center gap-2 text-sm font-medium text-blue-400 hover:text-blue-300 transition"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                  Share Results
                </button>
              </div>

              {/* Disclaimer */}
              <p className="text-center text-xs text-[var(--text-muted)]">
                This tool is for educational purposes only and does not constitute financial advice. Always conduct your own research before investing in any opportunity. No data from this evaluation is stored or transmitted.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ═══════════════════════════════════════════════
          WHY AUTOPILOTROI CHOSE AURUM
      ═══════════════════════════════════════════════ */}
      <div className="mx-auto max-w-5xl px-6 py-20 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-12">
            <span className="inline-block rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-emerald-300 mb-4">
              Our Due Diligence
            </span>
            <h2 className="font-[var(--font-sora)] text-3xl font-bold text-[var(--text-primary)] sm:text-4xl lg:text-5xl tracking-tight">
              Why We Chose <span className="text-emerald-400">Aurum</span>
            </h2>
            <p className="mt-4 mx-auto max-w-2xl text-lg leading-relaxed text-[var(--text-tertiary)]">
              We evaluated dozens of opportunities using the same Trust Check framework above.
              Aurum Foundation wasn&apos;t just a good score — it was the best we found. Here&apos;s why.
            </p>
          </div>

          {/* Verification grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: '💰',
                title: 'Real Revenue Model',
                desc: 'Aurum earns through exchange fees, AI bot subscriptions, Neo-Bank services, and card transactions — not through recruitment.',
                color: 'emerald',
              },
              {
                icon: '🔍',
                title: 'Fully Transparent',
                desc: 'Named CEO (Bryan Benson, ex-Binance), registered in Hong Kong (Cert #77289699), public team with verifiable LinkedIn profiles.',
                color: 'blue',
              },
              {
                icon: '🛡️',
                title: '3 International Licenses',
                desc: 'Regulated across multiple jurisdictions. Contracts with leading exchanges for secure, compliant custodial services.',
                color: 'blue',
              },
              {
                icon: '🤖',
                title: '5 Real Tech Products',
                desc: 'Ex-AI Bot, Zeus AI Bot, NeoBank, Exchange, and Crypto Cards — all functional, all generating real value.',
                color: 'emerald',
              },
              {
                icon: '📰',
                title: 'Global Media Coverage',
                desc: 'Featured in Forbes, Entrepreneur, Cointelegraph, Benzinga, Bitcoin.com, Crypto.news, and Hackernoon.',
                color: 'blue',
              },
              {
                icon: '🌍',
                title: '18,000+ Active Partners',
                desc: '$30M+ assets under management. A growing global ecosystem — not a promise, but measurable traction.',
                color: 'emerald',
              },
            ].map((item) => (
              <div
                key={item.title}
                className={`rounded-2xl border p-6 transition hover:scale-[1.02] ${
                  item.color === 'emerald'
                    ? 'border-emerald-500/20 bg-emerald-500/5'
                    : 'border-blue-500/20 bg-blue-500/5'
                }`}
              >
                <div className="text-2xl mb-3">{item.icon}</div>
                <h3 className="font-[var(--font-sora)] text-base font-bold text-[var(--text-primary)] mb-2">{item.title}</h3>
                <p className="text-sm leading-relaxed text-[var(--text-tertiary)]">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ═══════════════════════════════════════════════
          TEAM CREDIBILITY
      ═══════════════════════════════════════════════ */}
      <div className="mx-auto max-w-5xl px-6 pb-20 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-10">
            <h3 className="font-[var(--font-sora)] text-2xl font-bold text-[var(--text-primary)] sm:text-3xl tracking-tight">
              Built by Industry Veterans
            </h3>
            <p className="mt-3 text-[var(--text-tertiary)] text-base">
              The team behind Aurum brings decades of leadership from Binance, global network development, and fintech.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                name: 'Bryan Benson',
                role: 'Chief Executive Officer',
                bio: 'Web3 expert with 27 years of experience. Previously led Binance\'s expansion in Latin America. Responsible for strategic growth and bridging traditional and decentralized finance.',
                icon: '👤',
              },
              {
                name: 'Shane Morand',
                role: 'Chief Network Dev Officer',
                bio: 'Global business leader with decades of experience in network development and large-scale growth systems. Leads scalable systems and long-term ecosystem growth strategy.',
                icon: '👤',
              },
              {
                name: 'Ahmad Zen',
                role: 'Co-Founder & Marketing Director',
                bio: '15+ years of expertise in network marketing and cryptocurrency. Proven track record driving campaigns across fintech and blockchain sectors, boosting Aurum\'s global growth.',
                icon: '👤',
              },
            ].map((person) => (
              <div
                key={person.name}
                className="flex flex-col items-center rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-card)] p-6 text-center shadow-[var(--card-shadow,none)] transition hover:border-[var(--border-accent)]"
              >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-500/30 to-cyan-500/30 text-3xl">
                  {person.icon}
                </div>
                <h4 className="font-[var(--font-sora)] text-lg font-bold text-[var(--text-primary)]">{person.name}</h4>
                <p className="text-xs font-semibold uppercase tracking-widest text-[var(--accent-primary)] mt-1">{person.role}</p>
                <p className="mt-3 text-sm leading-relaxed text-[var(--text-tertiary)]">{person.bio}</p>
              </div>
            ))}
          </div>

          <p className="mt-8 text-center text-xs text-[var(--text-muted)]">
            Full team details available at <a href="https://aurum.foundation/en#team" target="_blank" rel="noopener noreferrer" className="text-blue-400/40 hover:text-blue-400/60 transition underline">aurum.foundation</a>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
