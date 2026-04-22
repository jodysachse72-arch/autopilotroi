import type { ReactNode, CSSProperties } from 'react'

/**
 * Testimonial card with monogram avatar. Designed for the dark blue testimonials section.
 * For light-section variants, override `background` / text colors via `style` / `quoteColor` / `nameColor`.
 *
 * Usage:
 *   <TestimonialCard
 *     quote="My partner walked me through every step…"
 *     author="Marcus T."
 *     role="Member since March 2025"
 *   />
 */
export default function TestimonialCard({
  quote,
  author,
  role,
  avatarFrom = '#1b61c9',
  avatarTo = '#0c1f6e',
  reveal = true,
  variant = 'on-blue',
  style,
}: {
  quote: ReactNode
  author: string
  role?: ReactNode
  avatarFrom?: string
  avatarTo?: string
  reveal?: boolean
  /** "on-blue" = white text on translucent dark bg; "on-light" = dark text on white card */
  variant?: 'on-blue' | 'on-light'
  style?: CSSProperties
}) {
  const isLight = variant === 'on-light'
  const cardStyle: CSSProperties = isLight
    ? {
        background: '#ffffff',
        border: '1px solid rgba(24,29,38,0.06)',
        borderRadius: '1.25rem',
        padding: '1.75rem',
        boxShadow: '0 4px 16px rgba(24,29,38,0.04)',
      }
    : {
        background: 'rgba(255,255,255,0.10)',
        border: '1px solid rgba(255,255,255,0.15)',
        borderRadius: '1.25rem',
        padding: '1.75rem',
      }

  const quoteColor = isLight ? 'rgba(24,29,38,0.85)' : 'rgba(255,255,255,0.90)'
  const nameColor = isLight ? '#181d26' : '#ffffff'
  const roleColor = isLight ? 'rgba(24,29,38,0.55)' : 'rgba(255,255,255,0.55)'

  return (
    <div className={reveal ? 'reveal' : ''} style={{ ...cardStyle, ...style }}>
      <p style={{
        fontSize: 'var(--text-body-lg)',
        color: quoteColor,
        lineHeight: 1.7,
        marginBottom: '1.25rem',
        fontStyle: 'italic',
      }}>
        &ldquo;{quote}&rdquo;
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div
          className="avatar-monogram"
          style={{
            '--avatar-from': avatarFrom,
            '--avatar-to': avatarTo,
          } as CSSProperties}
        >
          {author[0]}
        </div>
        <div>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            color: nameColor,
            fontSize: 'var(--text-body)',
          }}>
            {author}
          </div>
          {role && (
            <div style={{ fontSize: 'var(--text-caption)', color: roleColor }}>
              {role}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
