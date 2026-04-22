'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp } from 'lucide-react'

/* ═══════════════════════════════════════════════════════════════
   PARTNER ONBOARDING WIZARD — 3-step Welcome for new partners
   Collapsed by default after first visit (thin progress strip).
   Expands/collapses on click. Dismissed permanently via localStorage.
   ═══════════════════════════════════════════════════════════════ */

const STORAGE_KEY = 'autopilotroi-partner-onboarded'
const STEPS_KEY = STORAGE_KEY + '-steps'
const COLLAPSED_KEY = STORAGE_KEY + '-collapsed'

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
  const [mounted, setMounted] = useState(false)
  const [dismissed, setDismissed] = useState(true)
  const [collapsed, setCollapsed] = useState(true)
  const [completedSteps, setCompletedSteps] = useState<string[]>([])

  // eslint-disable-next-line react-hooks/set-state-in-effect -- sync localStorage to React state on mount; SSR-safe
  useEffect(() => {
    const wasDismissed = localStorage.getItem(STORAGE_KEY) === 'true'
    setDismissed(wasDismissed)

    // First ever visit → expand; returning visits → collapsed
    const savedCollapsed = localStorage.getItem(COLLAPSED_KEY)
    if (savedCollapsed === null) {
      setCollapsed(false)
      try { localStorage.setItem(COLLAPSED_KEY, 'false') } catch {}
    } else {
      setCollapsed(savedCollapsed !== 'false')
    }

    try {
      const saved = localStorage.getItem(STEPS_KEY)
      if (saved) setCompletedSteps(JSON.parse(saved))
    } catch {}

    setMounted(true)
  }, [])

  function markDone(stepId: string) {
    setCompletedSteps((prev) => {
      const next = [...new Set([...prev, stepId])]
      try { localStorage.setItem(STEPS_KEY, JSON.stringify(next)) } catch {}
      if (next.length === steps.length) {
        setTimeout(() => dismiss(), 1500)
      }
      return next
    })
  }

  function dismiss() {
    try { localStorage.setItem(STORAGE_KEY, 'true') } catch {}
    setDismissed(true)
  }

  function toggleCollapsed() {
    setCollapsed((prev) => {
      const next = !prev
      try { localStorage.setItem(COLLAPSED_KEY, String(next)) } catch {}
      return next
    })
  }

  const visible = mounted && !dismissed
  const progress = Math.round((completedSteps.length / steps.length) * 100)

  return (
    <AnimatePresence initial={false}>
      {visible && (
        <motion.div
          key="partner-onboarding"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{ overflow: 'hidden' }}
        >
          <div
            className="be-card overflow-hidden"
            style={{ border: '1px solid #bfdbfe', marginBottom: '0' }}
          >
            {/* Collapsed header strip — always visible */}
            <button
              type="button"
              onClick={toggleCollapsed}
              className="w-full flex items-center gap-3 px-4 py-2.5 transition hover:bg-blue-50/60"
              style={{ background: '#f0f7ff' }}
              aria-expanded={!collapsed}
              aria-label={collapsed ? 'Expand setup checklist' : 'Collapse setup checklist'}
            >
              <span className="text-sm shrink-0" aria-hidden>🚀</span>
              <div className="flex-1 min-w-0 flex items-center gap-3">
                <span className="text-[13px] font-semibold shrink-0" style={{ color: '#0b1220' }}>
                  Partner setup
                </span>
                <div className="flex items-center gap-2 min-w-0">
                  {/* Inline progress bar */}
                  <div className="h-1 w-24 rounded-full overflow-hidden shrink-0" style={{ background: '#dbeafe' }}>
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: 'linear-gradient(90deg, #1b61c9, #10b981)' }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  <span className="text-[11px] font-medium shrink-0" style={{ color: 'rgba(4,14,32,0.5)' }}>
                    {completedSteps.length}/{steps.length} complete
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {!collapsed && (
                  <span
                    role="button"
                    tabIndex={0}
                    onClick={(e) => { e.stopPropagation(); dismiss() }}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.stopPropagation(); dismiss() } }}
                    className="text-[11px] font-medium px-2 py-0.5 rounded transition hover:bg-blue-100 cursor-pointer"
                    style={{ color: 'rgba(4,14,32,0.4)' }}
                    aria-label="Dismiss setup wizard"
                  >
                    Dismiss
                  </span>
                )}
                {collapsed
                  ? <ChevronDown className="h-3.5 w-3.5 shrink-0" style={{ color: 'rgba(4,14,32,0.35)' }} strokeWidth={2.2} />
                  : <ChevronUp className="h-3.5 w-3.5 shrink-0" style={{ color: 'rgba(4,14,32,0.35)' }} strokeWidth={2.2} />
                }
              </div>
            </button>

            {/* Expandable step grid */}
            <AnimatePresence initial={false}>
              {!collapsed && (
                <motion.div
                  key="wizard-body"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  style={{ overflow: 'hidden' }}
                >
                  <div className="p-4 grid gap-3 sm:grid-cols-3" style={{ borderTop: '1px solid #bfdbfe' }}>
                    {steps.map((step) => {
                      const isDone = completedSteps.includes(step.id)
                      return (
                        <div
                          key={step.id}
                          className="rounded-xl p-4 transition"
                          style={{
                            background: isDone ? '#f0fdf4' : '#fff',
                            border: isDone ? '1px solid #bbf7d0' : '1px solid #e0e2e6',
                          }}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-lg">{isDone ? '✅' : step.icon}</span>
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
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
