import type { ReactNode, CSSProperties } from 'react'

/**
 * Standard "icon + title + body" card used in feature grids.
 * Renders inside a `.card` with the colored `icon-circle-accent` glow.
 *
 * Pair multiple in a CSS grid:
 *   <div style={{
 *     display: 'grid',
 *     gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
 *     gap: '1.25rem',
 *   }}>
 *     <FeatureCard icon={<X />} title="..." body="..." color="#1b61c9" colorBg="rgba(27,97,201,0.10)" />
 *   </div>
 */
export default function FeatureCard({
  icon,
  title,
  body,
  color = '#1b61c9',
  colorBg = 'rgba(27,97,201,0.10)',
  reveal = true,
  style,
}: {
  icon: ReactNode
  title: ReactNode
  body: ReactNode
  /** Solid icon color (used for stroke/fill) */
  color?: string
  /** Faint background swatch — must be `rgba(...)` so we can derive border/glow */
  colorBg?: string
  reveal?: boolean
  style?: CSSProperties
}) {
  // Derive subtle glow + border alphas from the bg color
  const glowAlpha = colorBg.replace(/[^,]+(?=\))/, '0.18')
  const borderAlpha = colorBg.replace(/[^,]+(?=\))/, '0.22')

  return (
    <div
      className={`card ${reveal ? 'reveal' : ''} shimmer-hover`}
      style={{ display: 'flex', flexDirection: 'column', gap: '1rem', ...style }}
    >
      <div
        className="icon-circle-accent"
        style={{
          '--icon-bg': colorBg,
          '--icon-color': color,
          '--icon-border': borderAlpha,
          '--icon-glow': glowAlpha,
        } as CSSProperties}
      >
        {icon}
      </div>
      <div>
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
          color: '#181d26',
          lineHeight: 1.3,
          marginBottom: '0.5rem',
        }}>
          {title}
        </h3>
        <p style={{
          fontSize: 'var(--text-body)',
          color: 'rgba(24,29,38,0.62)',
          lineHeight: 1.65,
        }}>
          {body}
        </p>
      </div>
    </div>
  )
}
