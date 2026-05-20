'use client'

import type { ComponentConfig } from '@puckeditor/core'
import { richTextField } from '@/lib/puck-editor'
import HeroBlueSection from '@/components/sections/HeroBlue'
import type { HeroBlueProps } from '../types'

export const HeroBlue: ComponentConfig<HeroBlueProps> = {
  label: 'Hero (Blue)',
  fields: {
    eyebrow:     { type: 'text', contentEditable: true },
    title:       { type: 'text', contentEditable: true },
    description: richTextField(),
    ctaLabel:    { type: 'text', contentEditable: true },
    ctaHref:     { type: 'text' },
  },
  defaultProps: {
    eyebrow:     'Knowledge Base',
    title:       'Everything you need to get started.',
    description: 'Find clear answers to the most common questions about AutoPilotROI.',
    ctaLabel:    '',
    ctaHref:     '',
  },
  render: ({ eyebrow, title, description, ctaLabel, ctaHref }) => {
    const ctas = ctaLabel && ctaHref ? [{ label: ctaLabel, href: ctaHref, variant: 'primary' as const }] : []
    return (
      <HeroBlueSection
        eyebrow={eyebrow}
        title={title}
        description={description}
        ctas={ctas}
      />
    )
  },
}
