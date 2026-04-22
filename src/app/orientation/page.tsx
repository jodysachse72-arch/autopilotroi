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
import {
  FlagIcon,
  SparkleIcon,
  GrowthIcon,
  CheckCircleIcon,
} from '@/components/ui/Icons'
import type { ComponentType } from 'react'

type IconCmp = ComponentType<{ className?: string; strokeWidth?: number }>

const TIER_THEME: Record<'beginner' | 'intermediate' | 'advanced', {
  bg: string; border: string; text: string; bar: string; Icon: IconCmp; label: string
}> = {
  beginner:     { bg: 'rgba(245,158,11,0.10)', border: 'rgba(245,158,11,0.30)', text: '#d97706', bar: '#f59e0b', Icon: FlagIcon,    label: 'Beginner' },
  intermediate: { bg: 'rgba(27,97,201,0.10)',  border: 'rgba(27,97,201,0.30)',  text: '#1b61c9', bar: '#3b82f6', Icon: SparkleIcon, label: 'Intermediate' },
  advanced:     { bg: 'rgba(5,150,105,0.10)',  border: 'rgba(5,150,105,0.30)',  text: '#059669', bar: '#10b981', Icon: GrowthIcon,  label: 'Advanced' },
}

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
  const progress = result ? 100 : Math.round((currentStep / totalSteps) * 100)

  useEffect(() => {
    const stored = localStorage.getItem('autopilotroi-lead')
    if (stored) {
      try {
        setLead(JSON.parse(stored))
      } catch {
        router.push('/signup')
      }
    } else {
      router.push('/signup')
    }
  }, [router])

  const selectAnswer = useCallback((value: string) => {
    const newAnswers = { ...answers, [currentQuestion.key]: value }
    setAnswers(newAnswers)

    setTimeout(() => {
      if (currentStep < totalSteps - 1) {
        setCurrentStep((s) => s + 1)
      } else {
        const readinessResult = calculateReadiness(newAnswers)
        setResult(readinessResult)
        saveResult(newAnswers, readinessResult)
      }
    }, 300)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answers, currentStep, totalSteps, currentQuestion])

  async function saveResult(allAnswers: Record<string, string>, readinessResult: ReadinessResult) {
    localStorage.setItem(
      'autopilotroi-readiness',
      JSON.stringify({
        answers: allAnswers,
        ...readinessResult,
        completedAt: new Date().toISOString(),
      })
    )

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
      console.error('Notification error:', err)
    }
    setTimeout(() => router.push('/waiting-room'), 2000)
  }

  const theme = result ? TIER_THEME[result.tier] : TIER_THEME.beginner

  if (!lead) {
    return (
      <div className="page-bg" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '2rem', height: '2rem', borderRadius: '50%', border: '2px solid #1b61c9', borderTopColor: 'transparent' }} />
      </div>
    )
  }

  return (
    <div className="page-bg" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Logo bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
        <Link href="/"><Logo size={40} showText /></Link>
      </div>

      {/* Welcome message */}
      {currentStep === 0 && !result && (
        <div style={{ maxWidth: '36rem', margin: '0 auto 0.5rem', padding: '0 1.5rem' }}>
          <p style={{ textAlign: 'center', fontSize: 'var(--text-body)', color: 'var(--color-text-muted)' }}>
            Welcome, <span style={{ color: '#1b61c9', fontWeight: 600 }}>{lead.name}</span> &mdash; let&apos;s assess your readiness.
          </p>
        </div>
      )}

      {/* Progress bar */}
      <div style={{ width: '100%', maxWidth: '36rem', margin: '0 auto', padding: '0 1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 'var(--text-body)', color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>
          <span>Readiness Assessment</span>
          <span style={{ fontVariantNumeric: 'tabular-nums', fontWeight: 700 }}>{progress}%</span>
        </div>
        <div style={{ height: '0.5rem', width: '100%', overflow: 'hidden', borderRadius: '999px', background: '#fff', border: '1px solid var(--color-border)' }}>
          <motion.div
            style={{ height: '100%', borderRadius: '999px', background: '#1b61c9' }}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem 1.5rem' }}>
        <div style={{ width: '100%', maxWidth: '36rem' }}>
          <AnimatePresence mode="wait">
            {!result ? (
              <motion.div
                key={`question-${currentStep}`}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <p style={{ marginBottom: '0.5rem', fontSize: 'var(--text-body)', fontWeight: 500, color: '#1b61c9' }}>
                  Question {currentStep + 1} of {totalSteps}
                </p>
                <h2 style={{
                  marginBottom: '0.5rem',
                  fontFamily: 'var(--font-display)', fontWeight: 700,
                  fontSize: '1.625rem', lineHeight: 1.25,
                  color: '#181d26',
                }}>
                  {currentQuestion.question}
                </h2>
                <p style={{ marginBottom: '2rem', color: 'var(--color-text-muted)' }}>
                  {currentQuestion.description}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {currentQuestion.options.map((option) => {
                    const isSelected = answers[currentQuestion.key] === option.value
                    return (
                      <button
                        key={option.value}
                        onClick={() => selectAnswer(option.value)}
                        style={{
                          width: '100%',
                          borderRadius: '0.75rem',
                          border: `1px solid ${isSelected ? '#1b61c9' : 'var(--color-border)'}`,
                          background: isSelected ? 'rgba(27,97,201,0.10)' : '#fff',
                          color: isSelected ? '#181d26' : 'var(--color-text-weak)',
                          padding: '1rem',
                          textAlign: 'left',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          fontWeight: 500,
                          fontSize: 'var(--text-body)',
                        }}
                      >
                        {option.label}
                      </button>
                    )
                  })}
                </div>

                {currentStep > 0 && (
                  <button
                    onClick={() => setCurrentStep((s) => s - 1)}
                    style={{
                      marginTop: '1.5rem',
                      background: 'transparent', border: 'none', cursor: 'pointer',
                      fontSize: 'var(--text-body)', color: 'var(--color-text-muted)',
                      padding: 0,
                    }}
                  >
                    \u2190 Previous question
                  </button>
                )}
              </motion.div>
            ) : !submitted ? (
              <motion.div
                key="results"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                style={{ textAlign: 'center' }}
              >
                <div style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  width: '4rem', height: '4rem', borderRadius: '999px',
                  background: theme.bg, border: `1px solid ${theme.border}`, color: theme.text,
                  marginBottom: '1.5rem',
                }}>
                  <theme.Icon className="w-7 h-7" />
                </div>
                <h2 style={{
                  marginBottom: '0.5rem',
                  fontFamily: 'var(--font-display)', fontWeight: 700,
                  fontSize: '1.875rem', color: '#181d26',
                }}>
                  Your Readiness Score
                </h2>

                <div style={{
                  margin: '2rem auto',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  width: '10rem', height: '10rem',
                  borderRadius: '999px',
                  background: '#fff',
                  border: `4px solid ${theme.bar}55`,
                  boxShadow: '0 8px 24px rgba(15,23,42,0.06)',
                }}>
                  <div>
                    <div style={{
                      fontFamily: 'var(--font-display)', fontWeight: 700,
                      fontSize: '3rem', color: '#181d26', lineHeight: 1,
                    }}>
                      {result.score}
                    </div>
                    <div style={{ fontSize: 'var(--text-caption)', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>out of 100</div>
                  </div>
                </div>

                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  margin: '0 auto 1rem',
                  borderRadius: '999px', padding: '0.5rem 1.25rem',
                  fontSize: 'var(--text-body)', fontWeight: 600,
                  background: theme.bg, border: `1px solid ${theme.border}`, color: theme.text,
                }}>
                  <theme.Icon className="w-4 h-4" />
                  {result.tierLabel}
                </div>

                <p style={{ margin: '0 auto', maxWidth: '28rem', color: 'var(--color-text-weak)', lineHeight: 'var(--lh-relaxed)' }}>
                  {result.tierDescription}
                </p>

                <button
                  onClick={handleSubmitConfirm}
                  className="btn btn-primary-lg shimmer-hover"
                  style={{ marginTop: '2rem' }}
                >
                  Submit & Continue \u2192
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="confirmed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{ textAlign: 'center' }}
              >
                <div style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  width: '4rem', height: '4rem', borderRadius: '999px',
                  background: 'rgba(16,185,129,0.15)', color: '#059669',
                  marginBottom: '1.5rem',
                }}>
                  <CheckCircleIcon className="w-8 h-8" />
                </div>
                <h2 style={{
                  marginBottom: '1rem',
                  fontFamily: 'var(--font-display)', fontWeight: 700,
                  fontSize: '1.875rem', color: '#181d26',
                }}>
                  Assessment Complete
                </h2>

                <div style={{
                  margin: '0 auto', maxWidth: '28rem',
                  borderRadius: '1rem',
                  border: '1px solid var(--color-border)',
                  background: '#fff',
                  padding: '1.5rem',
                }}>
                  <p style={{ color: 'var(--color-text-weak)', lineHeight: 'var(--lh-relaxed)', margin: 0 }}>
                    Your partner has been notified. Redirecting you to the Learning Center...
                  </p>
                  <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center' }}>
                    <div style={{ width: '1.5rem', height: '1.5rem', borderRadius: '50%', border: '2px solid #1b61c9', borderTopColor: 'transparent' }} />
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
