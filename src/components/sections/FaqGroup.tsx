import type { ReactNode } from 'react'

/* ═══════════════════════════════════════════════════════════════
   FaqGroup — a labelled container for FaqItem blocks.
   Renders a section heading + a vertical list of FAQ items.
   ═══════════════════════════════════════════════════════════════ */

interface FaqGroupProps {
  groupTitle?: string
  children: ReactNode
}

export default function FaqGroup({ groupTitle, children }: FaqGroupProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      {groupTitle && (
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.375rem',
            fontWeight: 800,
            color: '#181d26',
            letterSpacing: '-0.015em',
            margin: '0 0 0.75rem',
          }}
        >
          {groupTitle}
        </h2>
      )}
      {children}
    </div>
  )
}
