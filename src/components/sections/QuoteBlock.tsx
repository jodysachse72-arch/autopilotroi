import type { ReactNode } from 'react'

/* ═══════════════════════════════════════════════════════════════
   QuoteBlock — a standalone pullquote for endorsements, key
   statistics callouts, or founder/member statements.
   ═══════════════════════════════════════════════════════════════ */

const ACCENT_COLORS: Record<string, string> = {
  'brand-blue': '#1b61c9',
  'emerald':    '#059669',
  'amber':      '#d97706',
  'navy':       '#0f172a',
  'slate':      '#475569',
}

interface QuoteBlockProps {
  quote: ReactNode
  attribution?: string
  attributionRole?: string
  style?: 'centered' | 'left'
  accentColor?: string
}

export default function QuoteBlock({
  quote,
  attribution,
  attributionRole,
  style = 'centered',
  accentColor = 'brand-blue',
}: QuoteBlockProps) {
  if (!quote) return null

  const color = ACCENT_COLORS[accentColor] ?? ACCENT_COLORS['brand-blue']
  const isCentered = style === 'centered'

  return (
    <figure
      style={{
        padding: isCentered ? '2.5rem 2rem' : '1.75rem 2rem 1.75rem 2.5rem',
        background: isCentered ? 'transparent' : '#f8fafc',
        borderRadius: isCentered ? 0 : '0.875rem',
        borderLeft: isCentered ? 'none' : `4px solid ${color}`,
        textAlign: isCentered ? 'center' : 'left',
        maxWidth: isCentered ? '44rem' : '100%',
        margin: isCentered ? '0 auto' : 0,
      }}
    >
      {/* Opening quotation mark */}
      <span
        aria-hidden
        style={{
          display: 'block',
          fontFamily: 'Georgia, serif',
          fontSize: isCentered ? '4rem' : '3rem',
          lineHeight: 0.75,
          color,
          opacity: 0.35,
          marginBottom: isCentered ? '0.5rem' : '0.25rem',
        }}
      >
        &ldquo;
      </span>

      {/* Quote body */}
      <blockquote
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: isCentered ? 'clamp(1.25rem, 2.5vw, 1.75rem)' : 'var(--text-body-lg)',
          fontWeight: isCentered ? 700 : 600,
          lineHeight: 1.45,
          color: '#181d26',
          letterSpacing: isCentered ? '-0.02em' : '-0.01em',
          margin: 0,
          fontStyle: 'italic',
        }}
      >
        {quote}
      </blockquote>

      {/* Attribution */}
      {attribution && (
        <figcaption
          style={{
            marginTop: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.625rem',
            justifyContent: isCentered ? 'center' : 'flex-start',
          }}
        >
          {/* Accent line for centered style */}
          {isCentered && (
            <span
              style={{
                display: 'inline-block',
                width: '2rem',
                height: '2px',
                background: color,
                flexShrink: 0,
              }}
            />
          )}
          <span>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: 'var(--text-body)',
                color: '#181d26',
                display: 'block',
              }}
            >
              {attribution}
            </span>
            {attributionRole && (
              <span
                style={{
                  fontSize: 'var(--text-caption)',
                  color: 'var(--color-text-muted)',
                  fontWeight: 500,
                }}
              >
                {attributionRole}
              </span>
            )}
          </span>
        </figcaption>
      )}
    </figure>
  )
}
