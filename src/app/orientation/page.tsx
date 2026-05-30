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

/* ── Loading shell — dark bg + brand spinner, matches signup pattern ── */
function LoadingShell() {
  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(160deg, #061238 0%, #0c1e4a 60%, #061238 100%)',
      }}
    >
      <div
        style={{
          width: '2rem',
          height: '2rem',
          borderRadius: '50%',
          border: '2px solid rgba(255,255,255,0.15)',
          borderTopColor: '#60a5fa',
          animation: 'spin 0.75s linear infinite',
        }}
      />
    </div>
  )
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

  if (!lead) return <LoadingShell />

  return (
    /* ── Dark hero band — matches /signup hero pattern ── */
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(3rem, 8vw, 5rem) var(--page-px)',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(160deg, #061238 0%, #0c1e4a 60%, #061238 100%)',
      }}
    >
      {/* Scoped styles: pseudo-classes that can't be set inline */}
      <style>{`
        .orient-tile {
          outline: none;
          transition: border-color 150ms ease, background 150ms ease, box-shadow 150ms ease;
        }
        .orient-tile:hover:not(.orient-tile--selected) {
          border-color: rgba(96,165,250,0.50) !important;
          background: rgba(59,130,246,0.06) !important;
        }
        .orient-tile:focus-visible {
          box-shadow: 0 0 0 3px rgba(27,97,201,0.30);
        }
        #orient-submit:not(:disabled):hover {
          background: var(--color-accent-hover) !important;
        }
        #orient-prev:hover {
          color: rgba(191,219,254,0.90) !important;
        }
        #orient-confirm:not(:disabled):hover {
          background: var(--color-accent-hover) !important;
        }
      `}</style>

      {/* Ambient grid overlay */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        opacity: 0.03,
        backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
        backgroundSize: '50px 50px',
      }} />
      {/* Radial glow */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at 50% 0%, rgba(59,130,246,0.18) 0%, transparent 65%)',
      }} />

      <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '36rem' }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Link href="/" style={{ display: 'inline-block' }}>
            <Logo size={38} showText textColorClass="text-white" />
          </Link>
        </div>

        {/* Step badge */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            borderRadius: '9999px',
            border: '1px solid rgba(96,165,250,0.30)',
            background: 'rgba(59,130,246,0.10)',
            padding: '0.375rem 1rem',
            fontSize: '0.6875rem', fontWeight: 700,
            textTransform: 'uppercase', letterSpacing: '0.1em',
            color: '#93c5fd',
          }}>
            <span style={{ width: '0.375rem', height: '0.375rem', borderRadius: '50%', background: '#60a5fa', display: 'inline-block' }} />
            Step 2 of 3
          </span>
        </div>

        {/* Premium surface card */}
        <div style={{
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-card)',
          padding: 'clamp(1.75rem, 5vw, 2.5rem)',
          boxShadow: '0 8px 48px rgba(0,0,0,0.28), 0 2px 12px rgba(0,0,0,0.16)',
        }}>

          {/* Heading */}
          <h1
            className="text-heading"
            style={{ color: 'var(--color-text)', textAlign: 'center', marginBottom: '0.5rem' }}
          >
            Readiness Assessment
          </h1>

          {/* Progress bar */}
          {!result && (
            <div style={{ marginBottom: '1.75rem' }}>
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                fontSize: 'var(--text-caption)', color: 'var(--color-text-muted)',
                marginBottom: '0.5rem',
              }}>
                <span style={{ fontWeight: 500 }}>
                  {currentStep === 0 && lead
                    ? <>Welcome, <span style={{ color: 'var(--color-accent)', fontWeight: 600 }}>{lead.name}</span></>
                    : `Question ${currentStep + 1} of ${totalSteps}`}
                </span>
                <span style={{ fontVariantNumeric: 'tabular-nums', fontWeight: 700 }}>{progress}%</span>
              </div>
              <div style={{
                height: '0.375rem', width: '100%', overflow: 'hidden',
                borderRadius: '999px', background: 'var(--color-surface-alt)',
                border: '1px solid var(--color-border)',
              }}>
                <motion.div
                  style={{ height: '100%', borderRadius: '999px', background: 'var(--color-accent)' }}
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            </div>
          )}

          {/* Content: question / results / confirmed */}
          <AnimatePresence mode="wait">
            {!result ? (
              /* ── Question card ── */
              <motion.div
                key={`question-${currentStep}`}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <h2 style={{
                  marginBottom: '0.375rem',
                  fontFamily: 'var(--font-display)', fontWeight: 700,
                  fontSize: '1.25rem', lineHeight: 1.3,
                  color: 'var(--color-text)',
                }}>
                  {currentQuestion.question}
                </h2>
                <p style={{ marginBottom: '1.5rem', fontSize: 'var(--text-body)', color: 'var(--color-text-muted)' }}>
                  {currentQuestion.description}
                </p>

                {/* Answer option tiles */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                  {currentQuestion.options.map((option) => {
                    const isSelected = answers[currentQuestion.key] === option.value
                    return (
                      <button
                        key={option.value}
                        onClick={() => selectAnswer(option.value)}
                        className={`orient-tile${isSelected ? ' orient-tile--selected' : ''}`}
                        style={{
                          width: '100%',
                          borderRadius: 'var(--radius-md)',
                          border: `1.5px solid ${isSelected ? 'var(--color-accent)' : 'var(--color-border)'}`,
                          background: isSelected ? 'rgba(27,97,201,0.10)' : 'var(--color-surface-alt)',
                          color: isSelected ? 'var(--color-text)' : 'var(--color-text-weak)',
                          padding: '0.875rem 1rem',
                          textAlign: 'left',
                          cursor: 'pointer',
                          fontWeight: isSelected ? 600 : 500,
                          fontSize: 'var(--text-body)',
                          fontFamily: 'var(--font-body)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem',
                        }}
                      >
                        {/* Selection indicator dot */}
                        <span style={{
                          flexShrink: 0,
                          width: '1rem', height: '1rem',
                          borderRadius: '50%',
                          border: `2px solid ${isSelected ? 'var(--color-accent)' : 'var(--color-border)'}`,
                          background: isSelected ? 'var(--color-accent)' : 'transparent',
                          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                          transition: 'all 150ms ease',
                        }}>
                          {isSelected && (
                            <span style={{
                              width: '0.375rem', height: '0.375rem',
                              borderRadius: '50%', background: '#fff',
                              display: 'inline-block',
                            }} />
                          )}
                        </span>
                        {option.label}
                      </button>
                    )
                  })}
                </div>

                {/* Previous question */}
                {currentStep > 0 && (
                  <button
                    id="orient-prev"
                    onClick={() => setCurrentStep((s) => s - 1)}
                    style={{
                      marginTop: '1.5rem',
                      background: 'transparent', border: 'none', cursor: 'pointer',
                      fontSize: 'var(--text-caption)', color: 'rgba(147,197,253,0.55)',
                      padding: 0, fontFamily: 'var(--font-body)',
                      transition: 'color 150ms ease',
                    }}
                  >
                    ← Previous question
                  </button>
                )}
              </motion.div>

            ) : !submitted ? (
              /* ── Results screen ── */
              <motion.div
                key="results"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                style={{ textAlign: 'center' }}
              >
                {/* Tier icon */}
                <div style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  width: '4rem', height: '4rem', borderRadius: '999px',
                  background: theme.bg, border: `1px solid ${theme.border}`, color: theme.text,
                  marginBottom: '1.25rem',
                }}>
                  <theme.Icon className="w-7 h-7" />
                </div>

                <h2 style={{
                  marginBottom: '0.5rem',
                  fontFamily: 'var(--font-display)', fontWeight: 700,
                  fontSize: '1.625rem', color: 'var(--color-text)',
                }}>
                  Your Readiness Score
                </h2>
                <p style={{ marginBottom: '1.75rem', fontSize: 'var(--text-body)', color: 'var(--color-text-muted)' }}>
                  Based on your answers, here&apos;s where you stand.
                </p>

                {/* Score circle */}
                <div style={{
                  margin: '0 auto 1.5rem',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  width: '9rem', height: '9rem',
                  borderRadius: '999px',
                  background: 'var(--color-surface-alt)',
                  border: `4px solid ${theme.bar}55`,
                  boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
                }}>
                  <div>
                    <div style={{
                      fontFamily: 'var(--font-display)', fontWeight: 700,
                      fontSize: '2.75rem', color: 'var(--color-text)', lineHeight: 1,
                    }}>
                      {result.score}
                    </div>
                    <div style={{ fontSize: 'var(--text-caption)', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>out of 100</div>
                  </div>
                </div>

                {/* Tier badge */}
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  margin: '0 auto 1.25rem',
                  borderRadius: '999px', padding: '0.5rem 1.25rem',
                  fontSize: 'var(--text-body)', fontWeight: 600,
                  background: theme.bg, border: `1px solid ${theme.border}`, color: theme.text,
                }}>
                  <theme.Icon className="w-4 h-4" />
                  {result.tierLabel}
                </div>

                <p style={{ margin: '0 auto 2rem', maxWidth: '26rem', fontSize: 'var(--text-body)', color: 'var(--color-text-weak)', lineHeight: 'var(--lh-relaxed)' }}>
                  {result.tierDescription}
                </p>

                {/* Submit & Continue CTA — matches signup primary button */}
                <button
                  id="orient-submit"
                  onClick={handleSubmitConfirm}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    width: '100%',
                    padding: '0.875rem 1.5rem',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: 'var(--text-body)',
                    color: '#ffffff',
                    background: 'var(--color-accent)',
                    border: 'none',
                    borderRadius: 'var(--radius-btn)',
                    cursor: 'pointer',
                    transition: 'background 150ms ease',
                  }}
                >
                  Submit &amp; Continue →
                </button>
              </motion.div>

            ) : (
              /* ── Confirmed / redirecting screen ── */
              <motion.div
                key="confirmed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{ textAlign: 'center' }}
              >
                {/* Success icon */}
                <div style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  width: '4rem', height: '4rem', borderRadius: '999px',
                  background: 'rgba(16,185,129,0.15)', color: '#10b981',
                  marginBottom: '1.25rem',
                }}>
                  <CheckCircleIcon className="w-8 h-8" />
                </div>

                <h2 style={{
                  marginBottom: '0.75rem',
                  fontFamily: 'var(--font-display)', fontWeight: 700,
                  fontSize: '1.625rem', color: 'var(--color-text)',
                }}>
                  Assessment Complete
                </h2>

                <p style={{
                  marginBottom: '2rem', maxWidth: '24rem', margin: '0 auto 2rem',
                  fontSize: 'var(--text-body)', color: 'var(--color-text-muted)',
                  lineHeight: 'var(--lh-relaxed)',
                }}>
                  Your partner has been notified. Redirecting you to the waiting room…
                </p>

                {/* Spinner */}
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <div style={{
                    width: '1.5rem', height: '1.5rem', borderRadius: '50%',
                    border: '2px solid rgba(255,255,255,0.15)',
                    borderTopColor: '#60a5fa',
                    animation: 'spin 0.75s linear infinite',
                  }} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {/* End surface card */}

      </div>
    </div>
  )
}
