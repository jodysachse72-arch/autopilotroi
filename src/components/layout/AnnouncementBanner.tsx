'use client'

import { useState, useEffect } from 'react'

/* ═══════════════════════════════════════════════════════════════
   ANNOUNCEMENT BANNER — Site-wide top bar
   Message is stored in localStorage so admins can edit it
   from the Feature Toggles page. Controlled by feature flag.
   ═══════════════════════════════════════════════════════════════ */

const STORAGE_KEY = 'autopilotroi-announcement'
const DEFAULT_MESSAGE = '🚀 Welcome to AutopilotROI — Your AI-powered finance onboarding platform is live!'

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
  const [dismissed, setDismissed] = useState(false)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    // Check feature flag
    try {
      const flags = localStorage.getItem('autopilotroi-feature-flags')
      if (flags) {
        const parsed = JSON.parse(flags)
        if (parsed.announcementBanner === false) {
          setEnabled(false)
          return
        }
      }
    } catch {}
    setEnabled(true)

    // Load message
    setMessage(getAnnouncementMessage())

    // Listen for updates from admin panel
    const handleUpdate = () => setMessage(getAnnouncementMessage())
    window.addEventListener('announcement-update', handleUpdate)
    window.addEventListener('storage', handleUpdate)
    return () => {
      window.removeEventListener('announcement-update', handleUpdate)
      window.removeEventListener('storage', handleUpdate)
    }
  }, [])

  if (!enabled || !message || dismissed) return null

  return (
    <div className="relative z-[60] bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 text-white text-center px-10 py-3">
      <p className="text-sm font-semibold tracking-wide">{message}</p>
      <button
        onClick={() => setDismissed(true)}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition text-xl leading-none"
        aria-label="Dismiss announcement"
      >
        ×
      </button>
    </div>
  )
}
