import type { ReactNode } from 'react'

/**
 * The OnePay-style page shell: light page background → centered stack → rounded section boxes.
 * Every public page wraps its sections in this.
 *
 * Layout: `page-bg` (full-bleed light gray) → `sections-stack` (1440px capped, 1.25rem gap) → children.
 */
export default function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="page-bg">
      <div className="sections-stack">
        {children}
      </div>
    </div>
  )
}
