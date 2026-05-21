'use client'

import { useState } from 'react'
import type { ReactNode } from 'react'

/* ═══════════════════════════════════════════════════════════════
   FaqItem — a single accordion item for the CMS-editable FAQ system.
   Matches the visual style of the existing FaqsPageClient accordion.
   ═══════════════════════════════════════════════════════════════ */

interface FaqItemProps {
  question: string
  answer: ReactNode
  openByDefault?: boolean
}

export default function FaqItem({ question, answer, openByDefault = false }: FaqItemProps) {
  const [isOpen, setIsOpen] = useState(openByDefault)

  if (!question) return null

  return (
    <div
      style={{
        background: '#ffffff',
        border: '1px solid var(--color-border)',
        borderRadius: '0.75rem',
        overflow: 'hidden',
        transition: 'border-color 150ms ease, box-shadow 150ms ease',
        boxShadow: isOpen ? '0 4px 16px rgba(24,29,38,0.06)' : 'none',
        borderColor: isOpen ? '#1b61c9' : 'var(--color-border)',
      }}
    >
      <button
        onClick={() => setIsOpen((v) => !v)}
        aria-expanded={isOpen}
        style={{
          display: 'flex',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          padding: '1rem 1.25rem',
          textAlign: 'left',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        <span
          style={{
            fontSize: 'var(--text-body)',
            fontWeight: 600,
            color: '#181d26',
            fontFamily: 'var(--font-display)',
            lineHeight: 1.45,
          }}
        >
          {question}
        </span>
        <span
          aria-hidden
          style={{
            flexShrink: 0,
            width: '1.5rem',
            height: '1.5rem',
            borderRadius: '50%',
            background: isOpen ? '#1b61c9' : '#f1f5f9',
            color: isOpen ? '#ffffff' : '#1b61c9',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 150ms ease, transform 200ms ease',
            transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
            fontSize: '1rem',
            fontWeight: 400,
            lineHeight: 1,
          }}
        >
          +
        </span>
      </button>

      {isOpen && (
        <div
          style={{
            padding: '0 1.25rem 1.25rem',
            borderTop: '1px solid var(--color-border-light)',
          }}
        >
          <div
            style={{
              fontSize: 'var(--text-body)',
              lineHeight: 1.65,
              color: 'var(--color-text-weak)',
              paddingTop: '1rem',
            }}
          >
            {answer || (
              <span style={{ color: 'var(--color-text-muted)' }}>
                No answer yet.
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
