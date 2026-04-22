'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  PageShell,
  SectionBox,
  SectionHeader,
  HeroBlue,
  CTABand,
} from '@/components/sections'
import {
  AutomationIcon,
  GrowthIcon,
  SecurityIcon,
  DataIcon,
  EcosystemIcon,
  BankIcon,
  PartnerIcon,
  CheckCircleIcon,
  FlagIcon,
  SparkleIcon,
} from '@/components/ui/Icons'

/* ═══════════════════════════════════════════════════════════════
   TRUST CHECK — 60-Second Opportunity Evaluator
   Educational trust-building tool. Evaluates ANY opportunity
   using AutopilotROI's due diligence framework.
   ═══════════════════════════════════════════════════════════════ */

interface QuizOption {
  label: string
  score: number
  flag?: string
}

interface QuizQuestion {
  id: string
  category: string
  Icon: React.ComponentType<{ className?: string; strokeWidth?: number }>
  question: string
  context: string
  options: QuizOption[]
  weight: number
}

const QUESTIONS: QuizQuestion[] = [
  {
    id: 'revenue',
    category: 'Revenue source',
    Icon: BankIcon,
    question: 'Where does the company make its money?',
    context: 'Legitimate businesses earn revenue from products, services, or technology — not from new users joining.',
    weight: 1.4,
    options: [
      { label: 'Real products/services people pay for (trading tools, exchange fees, financial services)', score: 10 },
      { label: 'A mix of products and referral bonuses', score: 6 },
      { label: 'It\u0027s unclear — mostly seems to come from new members joining', score: 2, flag: 'Revenue source unclear or dependent on recruitment' },
      { label: 'I have no idea where the money comes from', score: 0, flag: 'No verifiable revenue model' },
    ],
  },
  {
    id: 'sustainability',
    category: 'Sustainability',
    Icon: GrowthIcon,
    question: 'Could this opportunity survive if no new people joined tomorrow?',
    context: 'A sustainable business doesn\u0027t collapse without growth. Its products have standalone value.',
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
    Icon: DataIcon,
    question: 'Can you verify who runs it and how it works?',
    context: 'Real companies have verifiable leadership, registered entities, auditable technology, and clear documentation.',
    weight: 1.2,
    options: [
      { label: 'Yes — known team, registered company, public documentation, and verifiable tech', score: 10 },
      { label: 'Partially — some info is public but not everything', score: 5 },
      { label: 'Not really — the founders are anonymous or hard to find', score: 2, flag: 'Limited team transparency' },
      { label: 'No — I can\u0027t verify anything about the company or team', score: 0, flag: 'No verifiable team or entity' },
    ],
  },
  {
    id: 'incentives',
    category: 'Incentive structure',
    Icon: SecurityIcon,
    question: 'What are you rewarded for?',
    context: 'Healthy programs reward you for using the product. Risky ones reward you mainly for recruiting others.',
    weight: 1.0,
    options: [
      { label: 'Using the product — referrals are optional and secondary', score: 10 },
      { label: 'Both using the product and referring others, roughly equal', score: 7 },
      { label: 'Mostly referrals — the product seems secondary to recruitment', score: 3, flag: 'Referral-heavy incentive model' },
      { label: 'Almost entirely recruiting — the \u0027product\u0027 is the opportunity itself', score: 0, flag: 'Recruitment-as-product structure' },
    ],
  },
  {
    id: 'language',
    category: 'Marketing language',
    Icon: EcosystemIcon,
    question: 'How does the opportunity describe itself?',
    context: 'Legitimate businesses focus on what the product does. Risky ones focus on how much money you\u0027ll make.',
    weight: 1.0,
    options: [
      { label: 'Focuses on the technology, features, and real use cases', score: 10 },
      { label: 'Balanced — talks about both the product and earning potential', score: 6 },
      { label: 'Lots of income claims, lifestyle posts, and urgency ("get in now!")', score: 2, flag: 'Hype-heavy marketing' },
      { label: '"Guaranteed returns," "passive income," "financial freedom" with no substance', score: 0, flag: 'Guaranteed return claims detected' },
    ],
  },
]

function calculateResults(answers: Record<string, number>, flags: string[]) {
  let weightedTotal = 0
  let maxPossible = 0
  QUESTIONS.forEach((q) => {
    const raw = answers[q.id] ?? 0
    weightedTotal += raw * q.weight
    maxPossible += 10 * q.weight
  })
  const score = Math.round((weightedTotal / maxPossible) * 50)

  let level: 'strong' | 'caution' | 'high-risk'
  let levelLabel: string
  let levelColor: '#059669' | '#d97706' | '#dc2626'
  let levelBg: string
  let explanation: string

  if (score >= 40) {
    level = 'strong'
    levelLabel = 'Strong opportunity'
    levelColor = '#059669'
    levelBg = 'rgba(5,150,105,0.08)'
    explanation = 'This opportunity shows signs of a legitimate, product-driven business. Revenue appears to come from real activity, the model looks sustainable, and there\u0027s meaningful transparency. That said, always continue doing your own research — no evaluation tool replaces personal due diligence.'
  } else if (score >= 25) {
    level = 'caution'
    levelLabel = 'Proceed with caution'
    levelColor = '#d97706'
    levelBg = 'rgba(217,119,6,0.08)'
    explanation = 'This opportunity has some positive indicators but also raises questions. There may be unclear revenue sources, heavy emphasis on recruitment, or limited transparency. Take time to verify claims independently before committing any funds.'
  } else {
    level = 'high-risk'
    levelLabel = 'High risk'
    levelColor = '#dc2626'
    levelBg = 'rgba(220,38,38,0.08)'
    explanation = 'This opportunity shows multiple patterns commonly associated with unsustainable models. Revenue sources are unclear, growth-dependency is high, and verifiable information is limited. We strongly recommend extreme caution and independent research before proceeding.'
  }

  return { score, level, levelLabel, levelColor, levelBg, explanation, flags }
}

function getCategoryScores(answers: Record<string, number>) {
  return QUESTIONS.map((q) => ({
    category: q.category,
    Icon: q.Icon,
    score: answers[q.id] ?? 0,
    max: 10,
    weight: q.weight,
  }))
}

const AURUM_EVALUATION = {
  score: 43,
  breakdown: [
    { category: 'Revenue source',     score: 9, note: 'Aurum generates revenue through exchange trading fees, AI bot licensing, crypto card interchange fees, and neobank services. Products operate independently of member growth.' },
    { category: 'Sustainability',     score: 9, note: 'The trading exchange and AI bots function regardless of participant count. The technology has standalone utility in the market.' },
    { category: 'Transparency',       score: 8, note: 'Registered entity, public leadership, live product suite. Some areas are still expanding documentation, which is why this isn\u0027t a perfect 10.' },
    { category: 'Incentive structure', score: 8, note: 'Primary value comes from using the trading tools and financial products. Referral program exists but is secondary to the product experience.' },
    { category: 'Marketing language', score: 9, note: 'Focuses on technology, product features, and ecosystem development. Avoids income guarantees or unrealistic promises.' },
  ],
  totalNote: 'This is how AutopilotROI evaluated Aurum Foundation before choosing to partner. We applied the same framework you just used. No special scoring — just honest evaluation.',
}

const QUOTES = [
  'The best investment you can make is in your own knowledge.',
  'Due diligence isn\u0027t paranoia — it\u0027s wisdom.',
  'Trust is earned through transparency, not promises.',
  'In a world of noise, clarity is the ultimate edge.',
  'Smart money asks questions before writing checks.',
  'The right opportunity welcomes scrutiny.',
]

const fadeAnim = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
}

export default function EvaluatePage() {
  const [phase, setPhase] = useState<'intro' | 'quiz' | 'results'>('intro')
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [flags, setFlags] = useState<string[]>([])
  const [showAurum, setShowAurum] = useState(false)
  const [quoteIndex, setQuoteIndex] = useState(0)

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

  const results = phase === 'results' ? calculateResults(answers, flags) : null
  const categories = phase === 'results' ? getCategoryScores(answers) : []

  return (
    <PageShell>

      {/* ── 1. HERO ── */}
      <HeroBlue
        eyebrow="Free tool · 60 seconds"
        title={<>Trust Check.<br />Evaluate any opportunity.</>}
        description="Five questions. No sign-up. The same due diligence framework AutoPilot ROI used before partnering with Aurum Foundation."
      />

      {/* ── 2. ROTATING QUOTE TICKER ── */}
      <SectionBox variant="white" padding="none">
        <div style={{
          padding: '1rem 1.5rem',
          textAlign: 'center',
          borderBottom: '1px solid var(--color-border-light)',
        }}>
          <AnimatePresence mode="wait">
            <motion.p
              key={quoteIndex}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.4 }}
              style={{
                fontSize: 'var(--text-body)',
                color: 'var(--color-text-muted)',
                fontStyle: 'italic',
                margin: 0,
              }}
            >
              &ldquo;{QUOTES[quoteIndex]}&rdquo;
            </motion.p>
          </AnimatePresence>
        </div>
      </SectionBox>

      {/* ── 3. QUIZ MACHINE ── */}
      <SectionBox variant="white" padding="lg">
        <div style={{ maxWidth: '44rem', margin: '0 auto' }}>
          <AnimatePresence mode="wait">

            {/* PHASE: INTRO */}
            {phase === 'intro' && (
              <motion.div key="intro" {...fadeAnim} style={{ textAlign: 'center' }}>
                <h2 className="text-display" style={{ color: '#181d26', marginBottom: '1rem' }}>
                  Run any opportunity through our framework.
                </h2>
                <p className="text-body-lg" style={{ color: 'var(--color-text-weak)', maxWidth: '36rem', margin: '0 auto 2rem', lineHeight: 1.6 }}>
                  Before you invest time or money into any crypto, AI, or passive income opportunity, run it through the same five questions we asked before partnering with Aurum.
                </p>

                {/* Category preview grid */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 8rem), 1fr))',
                  gap: '0.75rem',
                  margin: '0 auto 2.5rem',
                  maxWidth: '36rem',
                }}>
                  {QUESTIONS.map((q) => (
                    <div key={q.id} style={{
                      background: '#f8fafc',
                      border: '1px solid var(--color-border-light)',
                      borderRadius: '0.75rem',
                      padding: '0.875rem 0.5rem',
                      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
                    }}>
                      <span style={{ color: '#1b61c9' }}><q.Icon className="w-5 h-5" /></span>
                      <div style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--color-text-weak)', textAlign: 'center', lineHeight: 1.3 }}>
                        {q.category}
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setPhase('quiz')}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                    background: 'linear-gradient(135deg, #2563eb 0%, #1b61c9 100%)',
                    color: '#ffffff',
                    padding: '1rem 2rem',
                    borderRadius: 'var(--radius-btn)',
                    fontFamily: 'var(--font-display)', fontWeight: 700,
                    fontSize: 'var(--text-body-lg)',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 4px 20px rgba(27,97,201,0.4)',
                    letterSpacing: '0.01em',
                    transition: 'box-shadow 150ms ease, transform 150ms ease',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 28px rgba(27,97,201,0.55)'
                    ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(27,97,201,0.4)'
                    ;(e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
                  }}
                >
                  Start evaluation →
                </button>

                <p style={{ marginTop: '1rem', fontSize: 'var(--text-caption)', color: 'var(--color-text-muted)' }}>
                  No data is collected. This runs entirely in your browser.
                </p>
              </motion.div>
            )}

            {/* PHASE: QUIZ */}
            {phase === 'quiz' && (
              <motion.div key={`quiz-${currentQ}`} {...fadeAnim}>
                {/* Progress */}
                <div style={{ marginBottom: '2rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-caption)', color: 'var(--color-text-muted)', marginBottom: '0.5rem', fontFamily: 'var(--font-display)' }}>
                    <span>Question {currentQ + 1} of {QUESTIONS.length}</span>
                    <span>{Math.round((currentQ / QUESTIONS.length) * 100)}%</span>
                  </div>
                  <div style={{ height: '0.375rem', borderRadius: '99px', background: '#f1f5f9', overflow: 'hidden' }}>
                    <motion.div
                      style={{ height: '100%', borderRadius: '99px', background: '#1b61c9' }}
                      animate={{ width: `${(currentQ / QUESTIONS.length) * 100}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>

                {/* Category badge */}
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  background: 'rgba(27,97,201,0.08)',
                  color: '#1b61c9',
                  border: '1px solid rgba(27,97,201,0.2)',
                  padding: '0.375rem 0.875rem',
                  borderRadius: '99px',
                  fontSize: '0.6875rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  marginBottom: '1.25rem',
                  fontFamily: 'var(--font-display)',
                }}>
                  {(() => { const Q = QUESTIONS[currentQ]; return <Q.Icon className="w-4 h-4" /> })()}
                  {QUESTIONS[currentQ].category}
                </div>

                <h2 className="text-display" style={{ color: '#181d26', marginBottom: '0.875rem', fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}>
                  {QUESTIONS[currentQ].question}
                </h2>

                <p style={{ fontSize: 'var(--text-body)', color: 'var(--color-text-weak)', lineHeight: 1.6, marginBottom: '2rem' }}>
                  <strong style={{ color: '#1b61c9', fontWeight: 700 }}>Why this matters:</strong>{' '}
                  {QUESTIONS[currentQ].context}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {QUESTIONS[currentQ].options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => selectAnswer(QUESTIONS[currentQ].id, opt.score, opt.flag)}
                      style={{
                        display: 'flex', alignItems: 'flex-start', gap: '0.875rem',
                        width: '100%',
                        textAlign: 'left',
                        background: '#ffffff',
                        border: '1.5px solid var(--color-border)',
                        borderRadius: '0.75rem',
                        padding: '1rem 1.25rem',
                        cursor: 'pointer',
                        transition: 'border-color 150ms ease, background 150ms ease, transform 150ms ease',
                        fontFamily: 'var(--font-body)',
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor = '#1b61c9'
                        ;(e.currentTarget as HTMLElement).style.background = 'rgba(27,97,201,0.04)'
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-border)'
                        ;(e.currentTarget as HTMLElement).style.background = '#ffffff'
                      }}
                    >
                      <span style={{
                        flexShrink: 0,
                        width: '1.75rem', height: '1.75rem',
                        borderRadius: '50%',
                        border: '1.5px solid var(--color-border)',
                        color: 'var(--color-text-weak)',
                        background: '#f8fafc',
                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                        fontFamily: 'var(--font-display)', fontWeight: 700,
                        fontSize: '0.8125rem',
                      }}>
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span style={{ fontSize: 'var(--text-body)', color: '#181d26', lineHeight: 1.5 }}>
                        {opt.label}
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* PHASE: RESULTS */}
            {phase === 'results' && results && (
              <motion.div key="results" {...fadeAnim} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                {/* Score Header */}
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    width: '7rem', height: '7rem',
                    margin: '0 auto 1.25rem',
                    borderRadius: '50%',
                    border: `4px solid ${results.levelColor}66`,
                    background: results.levelBg,
                    display: 'inline-flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <div style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '2.25rem',
                      fontWeight: 800,
                      color: results.levelColor,
                      lineHeight: 1,
                    }}>
                      {results.score}
                    </div>
                    <div style={{ fontSize: 'var(--text-caption)', color: 'var(--color-text-muted)', marginTop: '0.125rem' }}>/ 50</div>
                  </div>

                  <div style={{
                    display: 'inline-block',
                    background: results.levelBg,
                    color: results.levelColor,
                    border: `1px solid ${results.levelColor}44`,
                    borderRadius: '99px',
                    padding: '0.375rem 1rem',
                    fontSize: 'var(--text-body)',
                    fontWeight: 700,
                    fontFamily: 'var(--font-display)',
                    marginBottom: '1.25rem',
                  }}>
                    {results.levelLabel}
                  </div>

                  <p style={{ maxWidth: '36rem', margin: '0 auto', fontSize: 'var(--text-body)', color: 'var(--color-text-weak)', lineHeight: 1.65 }}>
                    {results.explanation}
                  </p>
                </div>

                {/* Category Breakdown */}
                <div style={{
                  background: '#f8fafc',
                  border: '1px solid var(--color-border-light)',
                  borderRadius: '1rem',
                  padding: '1.5rem',
                }}>
                  <h3 style={{
                    fontSize: '0.6875rem',
                    fontWeight: 700,
                    color: 'var(--color-text-muted)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    marginBottom: '1.25rem',
                    fontFamily: 'var(--font-display)',
                  }}>
                    Score breakdown
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {categories.map((cat) => {
                      const color = cat.score >= 7 ? '#059669' : cat.score >= 4 ? '#d97706' : '#dc2626'
                      return (
                        <div key={cat.category}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.375rem' }}>
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: 'var(--text-body)', color: '#181d26', fontFamily: 'var(--font-display)' }}>
                              <span style={{ color: '#1b61c9' }}><cat.Icon className="w-4 h-4" /></span>
                              {cat.category}
                              {cat.weight > 1 && (
                                <span style={{ fontSize: '0.6875rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                                  ×{cat.weight}
                                </span>
                              )}
                            </span>
                            <span style={{ fontSize: 'var(--text-body)', fontWeight: 800, color, fontFamily: 'var(--font-display)' }}>
                              {cat.score}/{cat.max}
                            </span>
                          </div>
                          <div style={{ height: '0.5rem', borderRadius: '99px', background: '#ffffff', border: '1px solid var(--color-border-light)', overflow: 'hidden' }}>
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${(cat.score / cat.max) * 100}%` }}
                              transition={{ delay: 0.2, duration: 0.5 }}
                              style={{ height: '100%', background: color }}
                            />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Flags */}
                {flags.length > 0 && (
                  <div style={{
                    background: 'rgba(217,119,6,0.06)',
                    border: '1px solid rgba(217,119,6,0.25)',
                    borderRadius: '1rem',
                    padding: '1.5rem',
                  }}>
                    <h3 style={{
                      display: 'flex', alignItems: 'center', gap: '0.5rem',
                      fontSize: '0.6875rem',
                      fontWeight: 700,
                      color: '#d97706',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      marginBottom: '1rem',
                      fontFamily: 'var(--font-display)',
                    }}>
                      <FlagIcon className="w-4 h-4" />
                      Patterns detected
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {flags.map((flag, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: 'var(--text-body)', color: '#92400e', lineHeight: 1.5 }}>
                          <span style={{ marginTop: '0.5rem', width: '0.375rem', height: '0.375rem', borderRadius: '50%', background: '#d97706', flexShrink: 0 }} />
                          {flag}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* How Aurum scored */}
                <div style={{
                  background: 'rgba(27,97,201,0.04)',
                  border: '1px solid rgba(27,97,201,0.2)',
                  borderRadius: '1rem',
                  padding: '1.5rem',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap' }}>
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <h3 style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'var(--text-body-lg)',
                        fontWeight: 700,
                        color: '#181d26',
                        marginBottom: '0.375rem',
                      }}>
                        See how we evaluated Aurum Foundation
                      </h3>
                      <p style={{ fontSize: 'var(--text-body)', color: 'var(--color-text-weak)', margin: 0, lineHeight: 1.55 }}>
                        AutopilotROI applied this exact framework before choosing to partner with Aurum. Here&apos;s how it scored — transparently, with notes on each category.
                      </p>
                    </div>
                    <button
                      onClick={() => setShowAurum(!showAurum)}
                      style={{
                        flexShrink: 0,
                        background: '#1b61c9',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: 'var(--radius-btn)',
                        padding: '0.625rem 1.125rem',
                        fontFamily: 'var(--font-display)',
                        fontWeight: 700,
                        fontSize: 'var(--text-body)',
                        cursor: 'pointer',
                      }}
                    >
                      {showAurum ? 'Hide' : 'View'} evaluation
                    </button>
                  </div>

                  <AnimatePresence>
                    {showAurum && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div style={{
                          marginTop: '1.5rem',
                          paddingTop: '1.5rem',
                          borderTop: '1px solid rgba(27,97,201,0.15)',
                          display: 'flex', flexDirection: 'column', gap: '1rem',
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{
                              width: '4rem', height: '4rem',
                              borderRadius: '50%',
                              border: '2px solid rgba(5,150,105,0.4)',
                              background: 'rgba(5,150,105,0.08)',
                              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                              fontFamily: 'var(--font-display)',
                              fontSize: '1.5rem',
                              fontWeight: 800,
                              color: '#059669',
                            }}>
                              {AURUM_EVALUATION.score}
                            </div>
                            <div>
                              <div style={{ fontSize: 'var(--text-body)', fontWeight: 700, color: '#059669', fontFamily: 'var(--font-display)' }}>
                                Strong opportunity
                              </div>
                              <div style={{ fontSize: 'var(--text-caption)', color: 'var(--color-text-muted)' }}>
                                Aurum Foundation · Evaluated by AutopilotROI
                              </div>
                            </div>
                          </div>

                          {AURUM_EVALUATION.breakdown.map((cat) => (
                            <div key={cat.category} style={{
                              background: '#ffffff',
                              border: '1px solid var(--color-border-light)',
                              borderRadius: '0.75rem',
                              padding: '1rem 1.125rem',
                            }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.375rem' }}>
                                <span style={{ fontSize: 'var(--text-body)', fontWeight: 700, color: '#181d26', fontFamily: 'var(--font-display)' }}>
                                  {cat.category}
                                </span>
                                <span style={{ fontSize: 'var(--text-body)', fontWeight: 800, color: '#059669', fontFamily: 'var(--font-display)' }}>
                                  {cat.score}/10
                                </span>
                              </div>
                              <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-weak)', lineHeight: 1.55, margin: 0 }}>
                                {cat.note}
                              </p>
                            </div>
                          ))}

                          <div style={{
                            background: '#ffffff',
                            border: '1px solid var(--color-border-light)',
                            borderRadius: '0.5rem',
                            padding: '0.875rem 1rem',
                          }}>
                            <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', fontStyle: 'italic', lineHeight: 1.55, margin: 0 }}>
                              {AURUM_EVALUATION.totalNote}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Restart + share */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
                  <button
                    onClick={restart}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: 'var(--color-text-weak)',
                      fontFamily: 'var(--font-display)',
                      fontWeight: 600,
                      fontSize: 'var(--text-body)',
                      cursor: 'pointer',
                      padding: 0,
                    }}
                  >
                    ← Evaluate another
                  </button>
                  <button
                    onClick={() => {
                      const text = `I just evaluated a crypto opportunity using AutopilotROI's Trust Check tool. It scored ${results.score}/50 (${results.levelLabel}). Try it yourself:`
                      const url = typeof window !== 'undefined' ? window.location.href : ''
                      if (typeof navigator !== 'undefined' && navigator.share) {
                        navigator.share({ title: 'Trust Check Results', text, url })
                      } else if (typeof navigator !== 'undefined') {
                        navigator.clipboard.writeText(`${text} ${url}`)
                        alert('Results copied to clipboard!')
                      }
                    }}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                      background: 'transparent',
                      border: 'none',
                      color: '#1b61c9',
                      fontFamily: 'var(--font-display)',
                      fontWeight: 600,
                      fontSize: 'var(--text-body)',
                      cursor: 'pointer',
                      padding: 0,
                    }}
                  >
                    <SparkleIcon className="w-4 h-4" />
                    Share results
                  </button>
                </div>

                <p style={{ textAlign: 'center', fontSize: 'var(--text-caption)', color: 'var(--color-text-muted)' }}>
                  This tool is for educational purposes only and does not constitute financial advice. Always conduct your own research before investing in any opportunity. No data from this evaluation is stored or transmitted.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </SectionBox>

      {/* ── 4. WHY WE CHOSE AURUM ── */}
      <SectionBox variant="surface" padding="lg">
        <SectionHeader
          eyebrow="Our due diligence"
          title={<>Why we chose Aurum.</>}
        >
          We evaluated dozens of opportunities using the same Trust Check framework above. Aurum Foundation wasn&apos;t just a good score — it was the best we found. Here&apos;s why.
        </SectionHeader>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 18rem), 1fr))',
          gap: '1rem',
        }}>
          {[
            { Icon: BankIcon,       title: 'Real revenue model',    desc: 'Aurum earns through exchange fees, AI bot subscriptions, NeoBank services, and card transactions — not through recruitment.', accent: '#059669' },
            { Icon: DataIcon,       title: 'Fully transparent',     desc: 'Named CEO (Bryan Benson, ex-Binance), registered in Hong Kong (Cert #77289699), public team with verifiable LinkedIn profiles.', accent: '#1b61c9' },
            { Icon: SecurityIcon,   title: '3 international licenses', desc: 'Regulated across multiple jurisdictions. Contracts with leading exchanges for secure, compliant custodial services.', accent: '#7c3aed' },
            { Icon: AutomationIcon, title: '5 real tech products',  desc: 'EX-AI Bot, Zeus AI Bot, NeoBank, Exchange, and Crypto Cards — all functional, all generating real value.', accent: '#0891b2' },
            { Icon: EcosystemIcon,  title: 'Global media coverage', desc: 'Featured in Forbes, Entrepreneur, Cointelegraph, Benzinga, Bitcoin.com, Crypto.news, and Hackernoon.', accent: '#d97706' },
            { Icon: PartnerIcon,    title: '18,000+ active partners', desc: '$30M+ assets under management. A growing global ecosystem — measurable traction, not a promise.', accent: '#dc2626' },
          ].map((item) => (
            <div
              key={item.title}
              style={{
                background: '#ffffff',
                border: '1px solid var(--color-border)',
                borderTop: `3px solid ${item.accent}`,
                borderRadius: '0.875rem',
                padding: '1.5rem',
                transition: 'transform 200ms ease, box-shadow 200ms ease',
              }}
            >
              <span style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                width: '2.5rem', height: '2.5rem',
                borderRadius: '0.625rem',
                background: `${item.accent}14`,
                color: item.accent,
                marginBottom: '0.875rem',
              }}>
                <item.Icon className="w-5 h-5" />
              </span>
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-body-lg)',
                fontWeight: 700,
                color: '#181d26',
                marginBottom: '0.5rem',
              }}>
                {item.title}
              </h3>
              <p style={{ fontSize: 'var(--text-body)', color: 'var(--color-text-weak)', lineHeight: 1.6, margin: 0 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </SectionBox>

      {/* ── 5. TEAM CREDIBILITY ── */}
      <SectionBox variant="white" padding="lg">
        <SectionHeader
          eyebrow="Team"
          title={<>Built by industry veterans.</>}
        >
          The team behind Aurum brings decades of leadership from Binance, global network development, and fintech.
        </SectionHeader>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 18rem), 1fr))',
          gap: '1.25rem',
        }}>
          {[
            {
              name: 'Bryan Benson',
              role: 'Chief Executive Officer',
              bio: 'Web3 expert with 27 years of experience. Previously led Binance\u0027s expansion in Latin America. Responsible for strategic growth and bridging traditional and decentralized finance.',
            },
            {
              name: 'Shane Morand',
              role: 'Chief Network Dev Officer',
              bio: 'Global business leader with decades of experience in network development and large-scale growth systems. Leads scalable systems and long-term ecosystem growth strategy.',
            },
            {
              name: 'Ahmad Zen',
              role: 'Co-Founder & Marketing Director',
              bio: '15+ years of expertise in network marketing and cryptocurrency. Proven track record driving campaigns across fintech and blockchain sectors, boosting Aurum\u0027s global growth.',
            },
          ].map((person) => (
            <div
              key={person.name}
              style={{
                background: '#f8fafc',
                border: '1px solid var(--color-border-light)',
                borderRadius: '1rem',
                padding: '1.75rem 1.5rem',
                textAlign: 'center',
              }}
            >
              <div style={{
                width: '4rem', height: '4rem',
                margin: '0 auto 1rem',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(27,97,201,0.15) 0%, rgba(8,145,178,0.15) 100%)',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                color: '#1b61c9',
              }}>
                <PartnerIcon className="w-7 h-7" />
              </div>
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-body-lg)', fontWeight: 800, color: '#181d26', marginBottom: '0.25rem' }}>
                {person.name}
              </h4>
              <p style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#1b61c9', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.875rem', fontFamily: 'var(--font-display)' }}>
                {person.role}
              </p>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-weak)', lineHeight: 1.6, margin: 0 }}>
                {person.bio}
              </p>
            </div>
          ))}
        </div>

        <p style={{ marginTop: '2rem', textAlign: 'center', fontSize: 'var(--text-caption)', color: 'var(--color-text-muted)' }}>
          <CheckCircleIcon className="w-4 h-4" /> Full team bios and LinkedIn profiles are publicly available and independently verifiable.
        </p>
      </SectionBox>

      {/* ── 6. CLOSING CTA ── */}
      <CTABand
        eyebrow="Want to evaluate Aurum yourself?"
        title={<>Use the framework.<br />Then dig into the products.</>}
        description="No pressure, no hype. Browse the products, run our calculator, and read every FAQ before you decide."
        ctas={[
          { label: 'Explore the products →', href: '/products' },
          { label: 'Estimate your returns', href: '/calculator', variant: 'ghost' },
        ]}
      />

    </PageShell>
  )
}
