import type { ReactNode } from 'react'

/**
 * The standard centered section header: eyebrow badge → H2 → lead paragraph.
 * All three slots animate in with the reveal classes.
 *
 * Usage:
 *   <SectionHeader eyebrow="Why AutoPilotROI" title={<>Everything you need<br/>to grow on autopilot</>}>
 *     From your first $100 to a fully active portfolio — we guide you through every step.
 *   </SectionHeader>
 */
export default function SectionHeader({
  eyebrow,
  title,
  children,
  align = 'center',
  badgeVariant = 'blue',
  titleColor,
  leadColor,
  maxWidth = '44rem',
  marginBottom = '4rem',
}: {
  eyebrow?: ReactNode
  title: ReactNode
  children?: ReactNode
  align?: 'center' | 'left'
  badgeVariant?: 'blue' | 'white'
  titleColor?: string
  leadColor?: string
  maxWidth?: string
  marginBottom?: string
}) {
  const alignStyle = align === 'center'
    ? { textAlign: 'center' as const, maxWidth, margin: `0 auto ${marginBottom}` }
    : { textAlign: 'left' as const, maxWidth, marginBottom }

  return (
    <div style={alignStyle}>
      {eyebrow && (
        <span
          className={`badge badge-${badgeVariant} reveal`}
          style={{ marginBottom: '1rem', display: 'inline-flex' }}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className="text-display reveal reveal-delay-1"
        style={{ color: titleColor ?? '#181d26', marginBottom: '1rem' }}
      >
        {title}
      </h2>
      {children && (
        <p
          className="text-body-lg reveal reveal-delay-2"
          style={{ color: leadColor ?? 'rgba(24,29,38,0.60)' }}
        >
          {children}
        </p>
      )}
    </div>
  )
}
