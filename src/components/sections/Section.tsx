import { ReactNode } from 'react'

type SectionBg = 'white' | 'surface' | 'blue' | 'navy' | 'transparent'
type SectionPadding = 'sm' | 'md' | 'lg' | 'xl' | 'none'

interface SectionProps {
  children: ReactNode
  bg?: SectionBg
  padding?: SectionPadding
  className?: string
  id?: string
  /** Skip the rounded scroll-box wrapper — for hero/full-bleed sections */
  flush?: boolean
}

const BG_MAP: Record<SectionBg, string> = {
  white:       'section-box',
  surface:     'section-box-surface',
  blue:        'section-box-blue',
  navy:        'section-box-navy',
  transparent: '',
}

const PADDING_MAP: Record<SectionPadding, string> = {
  none: '',
  sm:   'py-12 md:py-16',
  md:   'py-16 md:py-20',
  lg:   'section-padding',
  xl:   'section-padding-lg',
}

export default function Section({
  children,
  bg = 'white',
  padding = 'lg',
  className = '',
  id,
  flush = false,
}: SectionProps) {
  const boxClass = flush ? '' : BG_MAP[bg]
  const padClass = PADDING_MAP[padding]

  return (
    <section id={id} className={`${boxClass} ${padClass} ${className}`}>
      {children}
    </section>
  )
}
