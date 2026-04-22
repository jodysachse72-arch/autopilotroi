import type { ReactNode, CSSProperties } from 'react'

/**
 * Ecosystem card with a status pill (e.g. "LIVE", "LAUNCHING").
 * Use when the card needs to communicate availability or category in addition to the title/body.
 *
 * Usage:
 *   <EcoCard
 *     icon={<AutomationIcon />}
 *     title="EX-AI Trading Bot"
 *     description="Fully automated 24/7 AI trading bot…"
 *     tag="LIVE"
 *     tagColor="#059669"
 *   />
 */
export default function EcoCard({
  icon,
  title,
  description,
  tag,
  tagColor = '#059669',
  reveal = true,
  style,
}: {
  icon: ReactNode
  title: ReactNode
  description: ReactNode
  tag: ReactNode
  tagColor?: string
  reveal?: boolean
  style?: CSSProperties
}) {
  return (
    <div
      className={`card ${reveal ? 'reveal' : ''} shimmer-hover`}
      style={{ display: 'flex', flexDirection: 'column', gap: '1rem', ...style }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span
          className="icon-circle"
          style={{
            background: 'transparent',
            boxShadow: 'none',
            width: '2.5rem',
            height: '2.5rem',
            justifyContent: 'flex-start',
          }}
        >
          {icon}
        </span>
        <span style={{
          fontSize: 'var(--text-caption)',
          fontWeight: 700,
          padding: '0.25rem 0.75rem',
          borderRadius: '99px',
          background: `${tagColor}15`,
          color: tagColor,
          border: `1px solid ${tagColor}25`,
          letterSpacing: '0.06em',
        }}>
          {tag}
        </span>
      </div>
      <div>
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: 'clamp(1rem, 1.4vw, 1.1875rem)',
          color: '#181d26',
          marginBottom: '0.375rem',
          lineHeight: 1.3,
        }}>
          {title}
        </h3>
        <p style={{
          fontSize: 'var(--text-body)',
          color: 'rgba(24,29,38,0.62)',
          lineHeight: 1.6,
        }}>
          {description}
        </p>
      </div>
    </div>
  )
}
