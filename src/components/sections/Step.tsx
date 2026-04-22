import type { ReactNode } from 'react'

/**
 * Numbered step row used in "How it works" sections.
 * Number circle on the left, title + body on the right.
 *
 * Stack inside a flex column with gap to build a multi-step list:
 *   <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
 *     <Step num="1" title="…" body="…" />
 *     <Step num="2" title="…" body="…" />
 *   </div>
 */
export default function Step({
  num,
  title,
  body,
  reveal = true,
}: {
  num: ReactNode
  title: ReactNode
  body: ReactNode
  reveal?: boolean
}) {
  return (
    <div className={reveal ? 'reveal' : ''} style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
      <div style={{
        width: '3rem',
        height: '3rem',
        flexShrink: 0,
        background: '#1b61c9',
        color: '#fff',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'var(--font-display)',
        fontWeight: 800,
        fontSize: '1.125rem',
      }}>
        {num}
      </div>
      <div>
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: 'clamp(1.0625rem, 1.6vw, 1.375rem)',
          color: '#181d26',
          marginBottom: '0.5rem',
          lineHeight: 1.3,
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
