'use client'

import type { ComponentConfig } from '@puckeditor/core'
import { richTextField } from '@/lib/puck-editor'
import CTABandSection from '@/components/sections/CTABand'
import type { CTABandProps } from '../types'

export const CTABand: ComponentConfig<CTABandProps> = {
  label: 'CTA Banner',
  fields: {
    eyebrow:        { type: 'text', contentEditable: true },
    title:          { type: 'text', contentEditable: true },
    description:    richTextField(),
    ctaLabel:       { type: 'text', contentEditable: true },
    ctaHref:        { type: 'text' },
    secondaryLabel: { type: 'text', contentEditable: true },
    secondaryHref:  { type: 'text' },
  },
  defaultProps: {
    eyebrow:        'Ready to start?',
    title:          'Your AI portfolio starts with $100',
    description:    'Join thousands of members who activated the EX-AI Bot and started growing their portfolio on autopilot.',
    ctaLabel:       'Begin Onboarding →',
    ctaHref:        '/signup',
    secondaryLabel: 'Read FAQs',
    secondaryHref:  '/faqs',
  },
  render: ({ eyebrow, title, description, ctaLabel, ctaHref, secondaryLabel, secondaryHref }) => {
    const ctas: { label: string; href: string; variant?: 'primary' | 'ghost' }[] = [
      { label: ctaLabel, href: ctaHref, variant: 'primary' },
    ]
    if (secondaryLabel && secondaryHref) {
      ctas.push({ label: secondaryLabel, href: secondaryHref, variant: 'ghost' })
    }
    return (
      <CTABandSection
        eyebrow={eyebrow}
        title={title}
        description={description}
        ctas={ctas}
      />
    )
  },
}
