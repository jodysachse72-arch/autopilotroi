import type { ReactNode, CSSProperties } from 'react'

type Variant = 'white' | 'surface' | 'blue' | 'navy'

const VARIANT_CLASS: Record<Variant, string> = {
  white:   'section-box',
  surface: 'section-box-surface',
  blue:    'section-box-blue',
  navy:    'section-box-navy',
}

/**
 * Standard rounded section card. Sits inside <PageShell>.
 * Provides a `container-xl` + `section-padding` interior so children don't have to.
 *
 * Variants:
 *   white   — primary content sections (default)
 *   surface — alternating sections (#f8fafc)
 *   blue    — brand-accent sections (use sparingly)
 *   navy    — dark CTA / footer sections
 */
export default function SectionBox({
  children,
  variant = 'white',
  padding = 'lg',
  innerStyle,
  innerClassName,
  id,
}: {
  children: ReactNode
  variant?: Variant
  padding?: 'lg' | 'xl' | 'none'
  innerStyle?: CSSProperties
  innerClassName?: string
  id?: string
}) {
  const padClass = padding === 'xl' ? 'section-padding-lg' : padding === 'none' ? '' : 'section-padding'
  return (
    <section id={id} className={VARIANT_CLASS[variant]}>
      <div className={`container-xl ${padClass} ${innerClassName ?? ''}`} style={innerStyle}>
        {children}
      </div>
    </section>
  )
}
