'use client'

import { useEffect, useState } from 'react'

interface ChapterMeta {
  id: number
  title: string
  accent: string
}

const CHAPTERS: ChapterMeta[] = [
  { id: 1, title: 'Trust Wallet',   accent: '#1b61c9' },
  { id: 2, title: 'VPN Setup',      accent: '#7c3aed' },
  { id: 3, title: 'Acquire USDT',   accent: '#059669' },
  { id: 4, title: 'Aurum Account',  accent: '#0891b2' },
  { id: 5, title: 'Activate Bot',   accent: '#d97706' },
  { id: 6, title: 'Confirm & Go',   accent: '#dc2626' },
]

export function ChapterNav() {
  const [active, setActive] = useState(0)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Show nav only after scroll past hero
    const onScroll = () => setVisible(window.scrollY > 320)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observers: IntersectionObserver[] = []
    CHAPTERS.forEach(ch => {
      const el = document.getElementById(`chapter-${ch.id}`)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(ch.id) },
        { rootMargin: '-20% 0px -65% 0px' }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach(o => o.disconnect())
  }, [])

  function scrollTo(id: number) {
    const el = document.getElementById(`chapter-${id}`)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <nav
      aria-label="Chapter navigation"
      style={{
        position: 'fixed',
        left: 'max(1rem, calc(50% - 40rem - 11rem))',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 40,
        display: 'flex',
        flexDirection: 'column',
        gap: '0',
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
        transition: 'opacity 300ms ease',
      }}
    >
      {/* Progress line */}
      <div style={{
        position: 'absolute',
        left: '0.9375rem',
        top: '1.25rem',
        bottom: '1.25rem',
        width: '2px',
        background: '#e4e6ec',
        borderRadius: '99px',
        zIndex: 0,
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          width: '100%',
          height: `${((active - 1) / (CHAPTERS.length - 1)) * 100}%`,
          background: active > 0 ? CHAPTERS[active - 1]?.accent ?? '#1b61c9' : '#1b61c9',
          borderRadius: '99px',
          transition: 'height 400ms cubic-bezier(0.22, 1, 0.36, 1), background 300ms ease',
        }} />
      </div>

      {CHAPTERS.map(ch => {
        const isActive = active === ch.id
        const isDone   = active > ch.id
        return (
          <button
            key={ch.id}
            onClick={() => scrollTo(ch.id)}
            title={`Chapter ${ch.id}: ${ch.title}`}
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              gap: '0.625rem',
              padding: '0.5rem 0',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              textAlign: 'left',
              zIndex: 1,
            }}
          >
            {/* Dot */}
            <span style={{
              flexShrink: 0,
              width: '1.875rem',
              height: '1.875rem',
              borderRadius: '50%',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: isActive ? ch.accent : isDone ? ch.accent : '#fff',
              border: `2px solid ${isActive || isDone ? ch.accent : '#e4e6ec'}`,
              color: isActive || isDone ? '#fff' : '#94a3b8',
              fontSize: '0.6875rem',
              fontWeight: 800,
              fontFamily: 'var(--font-display)',
              transition: 'all 250ms ease',
              boxShadow: isActive ? `0 0 0 4px ${ch.accent}22` : 'none',
            }}>
              {isDone ? (
                <svg width="10" height="10" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              ) : ch.id}
            </span>

            {/* Label — only show when active */}
            <span style={{
              fontSize: '0.75rem',
              fontWeight: isActive ? 700 : 500,
              color: isActive ? ch.accent : '#94a3b8',
              whiteSpace: 'nowrap',
              opacity: isActive ? 1 : 0,
              transform: isActive ? 'translateX(0)' : 'translateX(-4px)',
              transition: 'opacity 200ms ease, transform 200ms ease, color 200ms ease',
              fontFamily: 'var(--font-display)',
              pointerEvents: 'none',
            }}>
              {ch.title}
            </span>
          </button>
        )
      })}
    </nav>
  )
}
