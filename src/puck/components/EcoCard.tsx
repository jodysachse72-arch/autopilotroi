'use client'

import type { ComponentConfig } from '@puckeditor/core'
import { richTextField } from '@/lib/puck-editor'
import EcoCardSection from '@/components/sections/EcoCard'
import type { EcoCardProps } from '../types'

export const EcoCard: ComponentConfig<EcoCardProps> = {
  label: 'Ecosystem Card',
  fields: {
    title:       { type: 'text', contentEditable: true },
    description: richTextField(),
    tag:         { type: 'text' },
    tagColor:    { type: 'text' },
  },
  defaultProps: {
    title:       'EX-AI Trading Bot',
    description: 'Fully automated 24/7 AI trading bot with proven track record.',
    tag:         'LIVE',
    tagColor:    '#059669',
  },
  render: ({ title, description, tag, tagColor }) => (
    <EcoCardSection
      icon={<span style={{ fontSize: '1.5rem' }}>🔧</span>}
      title={title}
      description={description}
      tag={tag}
      tagColor={tagColor}
    />
  ),
}
