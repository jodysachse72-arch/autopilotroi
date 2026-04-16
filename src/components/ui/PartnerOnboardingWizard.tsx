'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

/* ═══════════════════════════════════════════════════════════════
   PARTNER ONBOARDING WIZARD — 3-step Welcome for new partners
   Shows once, dismissed permanently via localStorage
   ═══════════════════════════════════════════════════════════════ */

const STORAGE_KEY = 'autopilotroi-partner-onboarded'

interface WizardStep {
  id: string
  title: string
  description: string
  icon: string
  cta: string
  href: string
}

const steps: WizardStep[] = [
  {
    id: 'profile',
    title: 'Set Up Your Profile',
    description: 'Add your name, photo, and social links so prospects know who they\'re working with.',
    icon: '👤',
    cta: 'Edit Profile',
    href: '/dashboard/settings',
  },
  {
    id: 'link',
    title: 'Share Your First Link',
    description: 'Generate your unique referral link and share it on social media, email, or direct message.',
    icon: '🔗',
    cta: 'Generate Link',
    href: '/dashboard/links',
  },
  {
    id: 'learn',
    title: 'Watch Partner Training',
    description: 'Quick training videos on how to present Aurum, handle objections, and close signups.',
    icon: '🎬',
    cta: 'Watch Videos',
    href: '/dashboard/videos',
  },
]

export default function PartnerOnboardingWizard() {
  const [visible, setVisible] = useState(false)
  const [completedSteps, setCompletedSteps] = useState<string[]>([])

  useEffect(() => {
    const dismissed = localStorage.getItem(STORAGE_KEY)
    if (!dismissed) setVisible(true)

    try {
      const saved = localStorage.getItem(STORAGE_KEY + '-steps')
      if (saved) setCompletedSteps(JSON.parse(saved))
    } catch {}
  }, [])

  function markDone(stepId: string) {
    setCompletedSteps((prev) => {
      const next = [...new Set([...prev, stepId])]
      localStorage.setItem(STORAGE_KEY + '-steps', JSON.stringify(next))
      if (next.length === steps.length) {
        setTimeout(() => dismiss(), 1500)
      }
      return next
    })
  }

  function dismiss() {
    localStorage.setItem(STORAGE_KEY, 'true')
    setVisible(false)
  }

  if (!visible) return null

  const progress = Math.round((completedSteps.length / steps.length) * 100)

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="rounded-2xl p-6 mb-6"
        style={{ background: '#eff6ff', border: '1px solid #bfdbfe' }}
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold" style={{ color: '#181d26' }}>
              🚀 Welcome! Let&apos;s get you started
            </h3>
            <p className="mt-1 text-sm" style={{ color: 'rgba(4,14,32,0.55)' }}>
              Complete these 3 steps to start building your referral network.
            </p>
          </div>
          <button onClick={dismiss} className="text-xs transition hover:opacity-70" style={{ color: 'rgba(4,14,32,0.45)' }}>
            Dismiss ×
          </button>
        </div>

        {/* Progress bar */}
        <div className="mb-5">
          <div className="flex justify-between text-[10px] mb-1" style={{ color: 'rgba(4,14,32,0.45)' }}>
            <span>{completedSteps.length}/{steps.length} completed</span>
            <span>{progress}%</span>
          </div>
          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: '#e0e2e6' }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, #1b61c9, #10b981)' }}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Steps */}
        <div className="grid gap-3 sm:grid-cols-3">
          {steps.map((step) => {
            const isDone = completedSteps.includes(step.id)
            return (
              <div
                key={step.id}
                className="rounded-xl border p-4 transition"
                style={{
                  background: isDone ? '#f0fdf4' : '#fff',
                  border: isDone ? '1px solid #bbf7d0' : '1px solid #e0e2e6',
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{isDone ? '✅' : step.icon}</span>
                  <h4 className="text-sm font-semibold" style={{
                    color: isDone ? '#15803d' : '#181d26',
                    textDecoration: isDone ? 'line-through' : 'none',
                  }}>
                    {step.title}
                  </h4>
                </div>
                <p className="text-xs mb-3" style={{ color: 'rgba(4,14,32,0.55)' }}>{step.description}</p>
                {isDone ? (
                  <span className="text-[10px] font-semibold uppercase" style={{ color: '#15803d' }}>Done!</span>
                ) : (
                  <Link
                    href={step.href}
                    onClick={() => markDone(step.id)}
                    className="inline-flex items-center rounded-lg px-3 py-1.5 text-xs font-semibold text-white transition hover:opacity-90"
                    style={{ background: '#1b61c9' }}
                  >
                    {step.cta} →
                  </Link>
                )}
              </div>
            )
          })}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
