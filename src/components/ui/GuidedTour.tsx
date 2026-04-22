'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* ═══════════════════════════════════════════════════════════════
   GUIDED TOUR — Reusable spotlight walkthrough component
   
   Mobile-aware: if a target element is hidden (display:none or
   zero-size), the step automatically falls back to a centered
   modal — no broken spotlights or off-screen tooltips.
   ═══════════════════════════════════════════════════════════════ */

export interface TourStep {
  /** CSS selector for the element to highlight. Use null for a centered modal step. */
  target: string | null
  /** Step title */
  title: string
  /** Step description — supports line breaks with \n */
  content: string
  /** Emoji or icon to show in the header */
  icon?: string
  /** Preferred tooltip position */
  position?: 'top' | 'bottom' | 'left' | 'right' | 'center'
  /** Optional action label for the target (e.g. "Click here to try it") */
  actionHint?: string
}

interface GuidedTourProps {
  /** Unique ID for this tour (used for localStorage persistence) */
  tourId: string
  /** Array of tour steps */
  steps: TourStep[]
  /** Callback when tour completes */
  onComplete?: () => void
  /** If true, auto-starts on mount (unless already completed) */
  autoStart?: boolean
  /** If true, forces the tour to show even if previously completed */
  forceShow?: boolean
}

interface Rect {
  top: number
  left: number
  width: number
  height: number
}

function getStorageKey(tourId: string) {
  return `autopilotroi-tour-${tourId}`
}

function getSessionKey(tourId: string) {
  return `autopilotroi-tour-${tourId}-session`
}

export function useTour(tourId: string) {
  const [active, setActive] = useState(false)

  const start = useCallback(() => setActive(true), [])
  const stop = useCallback(() => setActive(false), [])

  const hasCompleted = typeof window !== 'undefined'
    ? localStorage.getItem(getStorageKey(tourId)) === 'done'
    : false

  const reset = useCallback(() => {
    localStorage.removeItem(getStorageKey(tourId))
    sessionStorage.removeItem(getSessionKey(tourId))
  }, [tourId])

  return { active, start, stop, hasCompleted, reset }
}

/** Check if an element is actually visible and has layout */
function isElementVisible(el: Element): boolean {
  const style = window.getComputedStyle(el)
  if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') return false
  const rect = el.getBoundingClientRect()
  if (rect.width === 0 || rect.height === 0) return false
  return true
}

export default function GuidedTour({
  tourId,
  steps,
  onComplete,
  autoStart = true,
  forceShow = false,
}: GuidedTourProps) {
  const [active, setActive] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [targetRect, setTargetRect] = useState<Rect | null>(null)
  const [showConfetti, setShowConfetti] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const tooltipRef = useRef<HTMLDivElement>(null)

  const step = steps[currentStep]
  const progress = ((currentStep + 1) / steps.length) * 100
  const isLast = currentStep === steps.length - 1

  // Detect mobile
  useEffect(() => {
    function check() { setIsMobile(window.innerWidth < 1024) }
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // Auto-start logic
  // - forceShow always wins (manual replay from "Tour" button)
  // - autoStart fires AT MOST once per browser session (sessionStorage gate)
  // - and never fires again after the user has dismissed/completed it (localStorage gate)
  useEffect(() => {
    if (!autoStart && !forceShow) return
    if (!forceShow) {
      const completed = localStorage.getItem(getStorageKey(tourId))
      if (completed === 'done') return
      const seenThisSession = sessionStorage.getItem(getSessionKey(tourId))
      if (seenThisSession === '1') return
      sessionStorage.setItem(getSessionKey(tourId), '1')
    }
    // Reset to step 0 when starting
    // eslint-disable-next-line react-hooks/set-state-in-effect -- sync tour state to localStorage/sessionStorage on mount
    setCurrentStep(0)
    // Small delay to let page render
    const timer = setTimeout(() => setActive(true), 800)
    return () => clearTimeout(timer)
  }, [autoStart, forceShow, tourId])

  // Find and measure target element
  useEffect(() => {
    if (!active || !step) return

    function measure() {
      if (!step.target) {
        setTargetRect(null)
        return
      }
      const el = document.querySelector(step.target)
      if (el && isElementVisible(el)) {
        const rect = el.getBoundingClientRect()
        setTargetRect({
          top: rect.top + window.scrollY,
          left: rect.left + window.scrollX,
          width: rect.width,
          height: rect.height,
        })
        // Scroll element into view
        el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      } else {
        // Element hidden (e.g. sidebar on mobile) → fall back to centered modal
        setTargetRect(null)
      }
    }

    measure()
    // Re-measure on scroll/resize
    const handler = () => measure()
    window.addEventListener('scroll', handler, { passive: true })
    window.addEventListener('resize', handler)
    return () => {
      window.removeEventListener('scroll', handler)
      window.removeEventListener('resize', handler)
    }
  }, [active, step, currentStep])

  const handleComplete = useCallback(() => {
    setShowConfetti(true)
    localStorage.setItem(getStorageKey(tourId), 'done')
    setTimeout(() => {
      setShowConfetti(false)
      setActive(false)
      onComplete?.()
    }, 2500)
  }, [tourId, onComplete])

  const handleSkip = useCallback(() => {
    setActive(false)
    localStorage.setItem(getStorageKey(tourId), 'done')
  }, [tourId])

  const handleNext = useCallback(() => {
    if (isLast) {
      handleComplete()
    } else {
      setCurrentStep((s) => s + 1)
    }
  }, [isLast, handleComplete])

  const handlePrev = useCallback(() => {
    if (currentStep > 0) setCurrentStep((s) => s - 1)
  }, [currentStep])

  // Keyboard navigation
  useEffect(() => {
    if (!active) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') handleSkip()
      if (e.key === 'ArrowRight' || e.key === 'Enter') handleNext()
      if (e.key === 'ArrowLeft') handlePrev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active, handleSkip, handleNext, handlePrev])

  if (!active) return null

  // Calculate tooltip position — mobile always centers, desktop positions relative to target
  const tooltipStyle: React.CSSProperties = {}
  const pos = step?.position || 'bottom'
  const useCenter = !targetRect || pos === 'center' || isMobile
  const tooltipWidth = isMobile ? Math.min(360, window.innerWidth - 32) : 380

  if (targetRect && !useCenter) {
    const padding = 16

    switch (pos) {
      case 'bottom':
        tooltipStyle.top = targetRect.top + targetRect.height + padding
        tooltipStyle.left = Math.max(
          padding,
          Math.min(
            targetRect.left + targetRect.width / 2 - tooltipWidth / 2,
            window.innerWidth - tooltipWidth - padding
          )
        )
        break
      case 'top':
        tooltipStyle.bottom = window.innerHeight - targetRect.top + padding + window.scrollY
        tooltipStyle.left = Math.max(
          padding,
          Math.min(
            targetRect.left + targetRect.width / 2 - tooltipWidth / 2,
            window.innerWidth - tooltipWidth - padding
          )
        )
        break
      case 'right':
        tooltipStyle.top = targetRect.top + targetRect.height / 2 - 60
        tooltipStyle.left = Math.min(
          targetRect.left + targetRect.width + padding,
          window.innerWidth - tooltipWidth - padding
        )
        break
      case 'left':
        tooltipStyle.top = targetRect.top + targetRect.height / 2 - 60
        tooltipStyle.right = window.innerWidth - targetRect.left + padding
        break
    }
  }

  return (
    <>
      {/* ── Overlay ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9998]"
        style={{ pointerEvents: 'auto' }}
      >
        {/* Dark overlay with spotlight cutout */}
        <svg
          className="absolute inset-0 h-full w-full"
          style={{ width: '100vw', height: `${document.documentElement.scrollHeight}px` }}
        >
          <defs>
            <mask id={`tour-mask-${tourId}`}>
              <rect x="0" y="0" width="100%" height="100%" fill="white" />
              {targetRect && !isMobile && (
                <rect
                  x={targetRect.left - 8}
                  y={targetRect.top - 8}
                  width={targetRect.width + 16}
                  height={targetRect.height + 16}
                  rx="12"
                  fill="black"
                />
              )}
            </mask>
          </defs>
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="rgba(0,0,0,0.75)"
            mask={`url(#tour-mask-${tourId})`}
          />
        </svg>

        {/* Spotlight ring glow — only on desktop when target is visible */}
        {targetRect && !isMobile && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="absolute rounded-xl border-2 border-blue-400/60 shadow-[0_0_30px_rgba(59,130,246,0.3)]"
            style={{
              top: targetRect.top - 8,
              left: targetRect.left - 8,
              width: targetRect.width + 16,
              height: targetRect.height + 16,
              pointerEvents: 'none',
            }}
          />
        )}
      </motion.div>

      {/* ── Tooltip Card ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          ref={tooltipRef}
          initial={{ opacity: 0, y: 12, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.97 }}
          transition={{ duration: 0.25 }}
          className={`fixed z-[9999] rounded-2xl shadow-2xl ${
            useCenter
              ? 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
              : ''
          }`}
          style={{
            width: tooltipWidth,
            maxWidth: 'calc(100vw - 32px)',
            background: '#fff',
            border: '1px solid #e0e2e6',
            boxShadow: '0 8px 30px rgba(27,97,201,0.12)',
            ...(useCenter ? {} : { position: 'absolute', ...tooltipStyle }),
          }}
        >
          {/* Progress bar */}
          <div className="h-1 w-full overflow-hidden rounded-t-2xl" style={{ background: '#e0e2e6' }}>
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-400"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          <div className="p-4 sm:p-5">
            {/* Header */}
            <div className="mb-3 flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                {step?.icon && (
                  <span className="text-2xl">{step.icon}</span>
                )}
                <div>
                  <h4 className="font-[var(--font-sora)] text-sm sm:text-base font-bold leading-tight" style={{ color: '#181d26' }}>
                    {step?.title}
                  </h4>
                  <span className="text-[11px] font-semibold uppercase tracking-widest" style={{ color: '#1b61c9' }}>
                    Step {currentStep + 1} of {steps.length}
                  </span>
                </div>
              </div>
              <button
                onClick={handleSkip}
                className="rounded-lg p-1.5 transition"
                style={{ color: 'rgba(4,14,32,0.35)' }}
                title="Skip tour"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <p className="mb-4 text-xs sm:text-sm leading-relaxed whitespace-pre-line" style={{ color: 'rgba(4,14,32,0.55)' }}>
              {step?.content}
            </p>

            {/* Action hint */}
            {step?.actionHint && (
              <div className="mb-4 flex items-center gap-2 rounded-lg bg-blue-500/10 border border-blue-500/20 px-3 py-2 text-xs font-medium text-blue-300">
                <span className="text-blue-400">💡</span>
                {step.actionHint}
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <button
                onClick={handlePrev}
                disabled={currentStep === 0}
                className="text-sm font-medium transition disabled:opacity-30 disabled:cursor-not-allowed"
                style={{ color: 'rgba(4,14,32,0.45)' }}
              >
                ← Back
              </button>

              {/* Step dots — hidden on mobile to save space */}
              <div className="hidden sm:flex items-center gap-1.5">
                {steps.map((_, i) => (
                  <div
                    key={i}
                    style={{
                      height: '6px',
                      borderRadius: '3px',
                      transition: 'all 0.3s',
                      width: i === currentStep ? '24px' : '6px',
                      background: i === currentStep ? '#1b61c9' : i < currentStep ? 'rgba(27,97,201,0.4)' : '#e0e2e6',
                    }}
                  />
                ))}
              </div>

              {/* Mobile step counter instead of dots */}
              <span className="sm:hidden text-[11px] font-semibold tabular-nums" style={{ color: 'rgba(4,14,32,0.35)' }}>
                {currentStep + 1}/{steps.length}
              </span>

              <button
                onClick={handleNext}
                className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-400 active:scale-95"
              >
                {isLast ? '🎉 Finish' : 'Next →'}
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* ── Completion Confetti ── */}
      <AnimatePresence>
        {showConfetti && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center px-6"
            >
              <div className="text-6xl sm:text-7xl mb-4">🎉</div>
              <h3 className="font-[var(--font-sora)] text-2xl sm:text-3xl font-bold text-white mb-2">
                Tour Complete!
              </h3>
              <p className="text-sm sm:text-base text-blue-50/60">
                You&apos;re ready to go. You can replay this tour anytime.
              </p>
            </motion.div>

            {/* Particle confetti — deterministic seeded values keep render pure (React 19 rule) */}
            {Array.from({ length: 30 }).map((_, i) => {
              // simple LCG-style hash so each i yields stable but varied numbers in [0, 1)
              const rand = (n: number) => ((Math.sin(i * 9301 + n * 49297) * 233280) % 1 + 1) % 1
              return (
                <motion.div
                  key={i}
                  initial={{
                    opacity: 1,
                    x: '50vw',
                    y: '50vh',
                    scale: 0,
                  }}
                  animate={{
                    opacity: 0,
                    x: `${20 + rand(1) * 60}vw`,
                    y: `${10 + rand(2) * 80}vh`,
                    scale: 1,
                    rotate: rand(3) * 720,
                  }}
                  transition={{
                    duration: 1.5 + rand(4),
                    ease: 'easeOut',
                  }}
                                   className="fixed h-3 w-3 rounded-sm"
                  style={{
                    background: ['#3b82f6', '#06b6d4', '#8b5cf6', '#f59e0b', '#10b981', '#ec4899'][i % 6],
                  }}
                  />
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
