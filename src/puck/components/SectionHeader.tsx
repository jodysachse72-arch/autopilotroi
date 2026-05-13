'use client'

import type { ComponentConfig } from '@puckeditor/core'
import { richTextField } from '@/lib/puck-editor'
import SectionHeaderSection from '@/components/sections/SectionHeader'
import type { SectionHeaderProps } from '../types'

export const SectionHeader: ComponentConfig<SectionHeaderProps> = {
  label: 'Section Header',
  fields: {
    eyebrow: { type: 'text', contentEditable: true },
    title:   { type: 'text', contentEditable: true },
    lead:    richTextField(),
    align:   {
      type: 'select',
      options: [
        { label: 'Center', value: 'center' },
        { label: 'Left',   value: 'left' },
      ],
    },
    badgeVariant: {
      type: 'select',
      options: [
        { label: 'Blue',  value: 'blue' },
        { label: 'White', value: 'white' },
      ],
    },
  },
  defaultProps: {
    eyebrow:      'Why AutoPilotROI',
    title:        'Everything you need to grow on autopilot',
    lead:         'From your first $100 to a fully active portfolio — we guide you through every step.',
    align:        'center',
    badgeVariant: 'blue',
  },
  render: ({ eyebrow, title, lead, align, badgeVariant }) => (
    <SectionHeaderSection eyebrow={eyebrow} title={title} align={align} badgeVariant={badgeVariant}>
      {lead}
    </SectionHeaderSection>
  ),
}
