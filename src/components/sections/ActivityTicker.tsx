'use client'

import { useState, useEffect } from 'react'

/* ═══════════════════════════════════════════════════════════════
   ActivityTicker — editable rotating social proof feed.
   Subtle, trustworthy, no casino energy.
   Reuses the same setInterval rotation pattern from SocialProof.tsx.
   
   Theme options:
     emerald  — green live-activity feel
     blue     — brand-blue authority signal
     neutral  — minimal dark pill
   ═══════════════════════════════════════════════════════════════ */

const SPEEDS: Record<string, number> = {
  slow:   6000,
  normal: 4000,
  fast:   2500,
}

const THEMES: Record<string, { bg: string; border: string; dot: string; text: string }> = {
  emerald: {
    bg:     'rgba(16,185,129,0.07)',
    border: 'rgba(16,185,129,0.20)',
    dot:    '#10b981',
    text:   '#065f46',
  },
  blue: {
    bg:     'rgba(27,97,201,0.07)',
    border: 'rgba(27,97,201,0.20)',
    dot:    '#1b61c9',
    text:   '#1e3a6f',
  },
  neutral: {
    bg:     'rgba(24,29,38,0.05)',
    border: 'rgba(24,29,38,0.12)',
    dot:    '#475569',
    text:   '#1e293b',
  },
}

const DEFAULT_MESSAGES = [
  'A new member just completed their readiness assessment',
  'Someone from the US started their onboarding journey',
  'A partner was just notified of a new qualified lead',
  'A member activated the EX-AI Bot this morning',
  'Someone from Canada completed their onboarding steps',
]

interface ActivityTickerProps {
  messages?: string[]
  speed?: 'slow' | 'normal' | 'fast'
  theme?: 'emerald' | 'blue' | 'neutral'
}

export default function ActivityTicker({
  messages = DEFAULT_MESSAGES,
  speed = 'normal',
  theme = 'emerald',
}: ActivityTickerProps) {
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  // Guard: need at least one message
  const items = messages.filter(Boolean)
  if (items.length === 0) return null

  const interval = SPEEDS[speed] ?? SPEEDS.normal
  const colors = THEMES[theme] ?? THEMES.emerald

  // Rotate through messages with a fade transition
  useEffect(() => {
    if (items.length <= 1) return
    const timer = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setIndex((i) => (i + 1) % items.length)
        setVisible(true)
      }, 280)
    }, interval)
    return () => clearInterval(timer)
  }, [items.length, interval])

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.75rem',
          background: colors.bg,
          border: `1px solid ${colors.border}`,
          borderRadius: '99px',
          padding: '0.5rem 1.125rem',
          maxWidth: '100%',
        }}
      >
        {/* Pulsing dot */}
        <span
          style={{
            position: 'relative',
            display: 'inline-flex',
            width: '0.625rem',
            height: '0.625rem',
            flexShrink: 0,
          }}
        >
          <span
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              background: colors.dot,
              opacity: 0.35,
              animation: 'ping 1.4s cubic-bezier(0,0,0.2,1) infinite',
            }}
          />
          <span
            style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              background: colors.dot,
            }}
          />
        </span>

        {/* Message — CSS opacity transition, no framer-motion dependency */}
        <span
          style={{
            fontSize: '0.875rem',
            fontWeight: 500,
            color: colors.text,
            transition: 'opacity 280ms ease',
            opacity: visible ? 1 : 0,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxWidth: '42ch',
          }}
        >
          {items[index]}
        </span>
      </div>

      {/*
        Ping animation — inlined keyframe to avoid globals.css dependency.
        Matches the `animate-ping` pattern from SocialProof.tsx.
      */}
      <style>{`
        @keyframes ping {
          75%, 100% { transform: scale(2.2); opacity: 0; }
        }
      `}</style>
    </div>
  )
}
