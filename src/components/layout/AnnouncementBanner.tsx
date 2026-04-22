'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'

/* ═══════════════════════════════════════════════════════════════
   ANNOUNCEMENT BANNER — Site-wide top bar
   Message stored in localStorage. Feature-flag controlled.
   Dismissal is persisted — stays gone after page refresh.
   ═══════════════════════════════════════════════════════════════ */

const STORAGE_KEY = 'autopilotroi-announcement'
const DISMISSED_KEY = 'autopilotroi-announcement-dismissed'
const DEFAULT_MESSAGE = '🚀 AutopilotROI is live — AI-powered finance onboarding for your partners.'

export function getAnnouncementMessage(): string {
  if (typeof window === 'undefined') return DEFAULT_MESSAGE
  return localStorage.getItem(STORAGE_KEY) || DEFAULT_MESSAGE
}

export function setAnnouncementMessage(msg: string) {
  localStorage.setItem(STORAGE_KEY, msg)
  window.dispatchEvent(new Event('announcement-update'))
}

export default function AnnouncementBanner() {
  const [message, setMessage] = useState<string | null>(null)
  const [visible, setVisible] = useState(false)

  // eslint-disable-next-line react-hooks/set-state-in-effect -- reads localStorage after mount; SSR-safe hydration pattern
  useEffect(() => {
    try {
      const flags = localStorage.getItem('autopilotroi-feature-flags')
      if (flags) {
        const parsed = JSON.parse(flags)
        if (parsed.announcementBanner === false) return
      }
    } catch {}

    if (localStorage.getItem(DISMISSED_KEY) === 'true') return

    setMessage(getAnnouncementMessage())
    setVisible(true)

    const handleUpdate = () => setMessage(getAnnouncementMessage())
    window.addEventListener('announcement-update', handleUpdate)
    window.addEventListener('storage', handleUpdate)
    return () => {
      window.removeEventListener('announcement-update', handleUpdate)
      window.removeEventListener('storage', handleUpdate)
    }
  }, [])

  function dismiss() {
    try { localStorage.setItem(DISMISSED_KEY, 'true') } catch {}
    setVisible(false)
  }

  if (!visible || !message) return null

  return (
    <div
      className="relative z-[60] flex items-center justify-center px-10"
      style={{
        minHeight: '36px',
        background: '#0f172a',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      <span
        className="mr-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400"
        aria-hidden
      />
      <p style={{ fontSize: '0.8125rem', fontWeight: 500, color: 'rgba(255,255,255,0.72)', letterSpacing: '0.01em' }}>
        {message}
      </p>
      <button
        onClick={dismiss}
        className="absolute right-3 top-1/2 -translate-y-1/2 flex h-5 w-5 items-center justify-center rounded transition hover:bg-white/10"
        aria-label="Dismiss announcement"
        style={{ color: 'rgba(255,255,255,0.4)' }}
      >
        <X className="h-3 w-3" strokeWidth={2.5} />
      </button>
    </div>
  )
}
