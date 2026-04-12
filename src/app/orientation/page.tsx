'use client'

import { useState, useCallback, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Logo from '@/components/ui/Logo'
import { motion, AnimatePresence } from 'framer-motion'
import {
  READINESS_QUESTIONS,
  calculateReadiness,
  type ReadinessResult,
} from '@/lib/readiness'

const tierColors = {
  beginner: { bg: 'bg-amber-500/15', border: 'border-amber-400/30', text: 'text-amber-300', bar: 'bg-amber-500' },
  intermediate: { bg: 'bg-blue-500/15', border: 'border-blue-400/30', text: 'text-blue-300', bar: 'bg-blue-500' },
  advanced: { bg: 'bg-emerald-500/15', border: 'border-emerald-400/30', text: 'text-emerald-300', bar: 'bg-emerald-500' },
}

const tierEmoji = { beginner: '🌱', intermediate: '⚡', advanced: '🚀' }

interface LeadInfo {
  id: string
  name: string
  email: string
  ref?: string
}

export default function OrientationPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [result, setResult] = useState<ReadinessResult | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [lead, setLead] = useState<LeadInfo | null>(null)
  const router = useRouter()

  const totalSteps = READINESS_QUESTIONS.length
  const currentQuestion = READINESS_QUESTIONS[currentStep]
  const progress = result
    ? 100
    : Math.round((currentStep / totalSteps) * 100)

  // Load lead info from localStorage (set during signup)
  useEffect(() => {
    const stored = localStorage.getItem('autopilotroi-lead')
    if (stored) {
      try {
        setLead(JSON.parse(stored))
      } catch {
        // If no lead data, redirect back to signup
        router.push('/signup')
      }
    } else {
      router.push('/signup')
    }
  }, [router])

  const selectAnswer = useCallback(
    (value: string) => {
      const newAnswers = { ...answers, [currentQuestion.key]: value }
      setAnswers(newAnswers)

      // Auto-advance after a short delay
      setTimeout(() => {
        if (currentStep < totalSteps - 1) {
          setCurrentStep((s) => s + 1)
        } else {
          // Calculate result
          const readinessResult = calculateReadiness(newAnswers)
          setResult(readinessResult)
          saveResult(newAnswers, readinessResult)
        }
      }, 300)
    },
    [answers, currentStep, totalSteps, currentQuestion]
  )

  async function saveResult(
    allAnswers: Record<string, string>,
    readinessResult: ReadinessResult
  ) {
    // Always save to localStorage
    localStorage.setItem(
      'autopilotroi-readiness',
      JSON.stringify({
        answers: allAnswers,
        ...readinessResult,
        completedAt: new Date().toISOString(),
      })
    )

    // Update lead in the database via API
    if (lead?.id) {
      try {
        await fetch('/api/leads/assess', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            leadId: lead.id,
            readinessScore: readinessResult.score,
            readinessTier: readinessResult.tier,
            quizAnswers: allAnswers,
          }),
        })
      } catch (err) {
        console.error('Error saving assessment:', err)
      }
    }
  }

  async function handleSubmitConfirm() {
    setSubmitted(true)

    // Send email notifications via API route
    try {
      await fetch('/api/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prospectName: lead?.name || 'New Prospect',
          prospectEmail: lead?.email || '',
          readinessScore: result!.score,
          readinessTier: result!.tier,
        }),
      })
    } catch (err) {
      // Don't block the UI — notifications are best-effort
      console.error('Notification error:', err)
    }

    // Redirect to waiting room after brief delay
    setTimeout(() => {
      router.push('/waiting-room')
    }, 2000)
  }

  const colors = result ? tierColors[result.tier] : tierColors.beginner

  if (!lead) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Logo bar */}
      <div className="flex items-center justify-center py-6">
        <Link href="/">
          <Logo size={40} showText />
        </Link>
      </div>

      {/* Welcome message */}
      {currentStep === 0 && !result && (
        <div className="mx-auto max-w-2xl px-6 mb-2">
          <p className="text-center text-sm text-[var(--text-muted)]">
            Welcome, <span className="text-blue-400 font-medium">{lead.name}</span> — let&apos;s assess your readiness.
          </p>
        </div>
      )}

      {/* Progress bar */}
      <div className="mx-auto w-full max-w-2xl px-6">
        <div className="flex items-center justify-between text-sm text-[var(--text-tertiary)] mb-2">
          <span>Readiness Assessment</span>
          <span>{progress}%</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-[var(--bg-card)]">
          <motion.div
            className="h-full rounded-full bg-blue-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>

      {/* Content area */}
      <div className="flex flex-1 items-center justify-center px-6 py-12">
        <div className="w-full max-w-2xl">
          <AnimatePresence mode="wait">
            {!result ? (
              /* ── Question Card ── */
              <motion.div
                key={`question-${currentStep}`}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="mb-2 text-sm font-medium text-blue-400">
                  Question {currentStep + 1} of {totalSteps}
                </p>
                <h2 className="mb-2 font-[var(--font-sora)] text-2xl font-bold text-[var(--text-primary)] lg:text-3xl">
                  {currentQuestion.question}
                </h2>
                <p className="mb-8 text-[var(--text-tertiary)]">
                  {currentQuestion.description}
                </p>

                <div className="space-y-3">
                  {currentQuestion.options.map((option) => {
                    const isSelected =
                      answers[currentQuestion.key] === option.value
                    return (
                      <button
                        key={option.value}
                        onClick={() => selectAnswer(option.value)}
                        className={`w-full rounded-xl border p-4 text-left transition-all duration-200 ${
                          isSelected
                            ? 'border-blue-500 bg-blue-500/15 text-[var(--text-primary)]'
                            : 'border-[var(--border-primary)] bg-[var(--bg-card)] text-[var(--text-secondary)] hover:border-blue-500/50 hover:bg-[var(--bg-card-hover)]'
                        }`}
                      >
                        <span className="font-medium">{option.label}</span>
                      </button>
                    )
                  })}
                </div>

                {/* Back button */}
                {currentStep > 0 && (
                  <button
                    onClick={() => setCurrentStep((s) => s - 1)}
                    className="mt-6 text-sm text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition"
                  >
                    ← Previous question
                  </button>
                )}
              </motion.div>
            ) : !submitted ? (
              /* ── Results ── */
              <motion.div
                key="results"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <div className="mb-6 text-6xl">{tierEmoji[result.tier]}</div>
                <h2 className="mb-2 font-[var(--font-sora)] text-3xl font-bold text-[var(--text-primary)]">
                  Your Readiness Score
                </h2>

                {/* Score circle */}
                <div className="mx-auto my-8 flex h-40 w-40 items-center justify-center rounded-full border-4 border-blue-500/30 bg-[var(--bg-card)]">
                  <div>
                    <div className="font-[var(--font-sora)] text-5xl font-bold text-[var(--text-primary)]">
                      {result.score}
                    </div>
                    <div className="text-sm text-[var(--text-muted)]">out of 100</div>
                  </div>
                </div>

                {/* Tier badge */}
                <div
                  className={`mx-auto mb-4 inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold ${colors.bg} ${colors.border} border ${colors.text}`}
                >
                  {tierEmoji[result.tier]} {result.tierLabel}
                </div>

                <p className="mx-auto max-w-md text-[var(--text-secondary)] leading-relaxed">
                  {result.tierDescription}
                </p>

                <button
                  onClick={handleSubmitConfirm}
                  className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[linear-gradient(180deg,#3b82f6_0%,#2563eb_100%)] px-8 py-3.5 font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:shadow-blue-600/40"
                >
                  Submit & Continue →
                </button>
              </motion.div>
            ) : (
              /* ── Redirecting to Waiting Room ── */
              <motion.div
                key="confirmed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <div className="mb-6 text-6xl">✅</div>
                <h2 className="mb-4 font-[var(--font-sora)] text-3xl font-bold text-[var(--text-primary)]">
                  Assessment Complete!
                </h2>

                <div className="mx-auto max-w-md rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-card)] p-6">
                  <p className="text-[var(--text-secondary)] leading-relaxed">
                    Your partner has been notified. Redirecting you to the Learning Center...
                  </p>
                  <div className="mt-4 flex justify-center">
                    <div className="h-6 w-6 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
