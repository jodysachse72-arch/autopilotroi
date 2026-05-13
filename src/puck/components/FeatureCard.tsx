'use client'

import type { ComponentConfig } from '@puckeditor/core'
import { richTextField } from '@/lib/puck-editor'
import FeatureCardSection from '@/components/sections/FeatureCard'
import type { FeatureCardProps } from '../types'

export const FeatureCard: ComponentConfig<FeatureCardProps> = {
  label: 'Feature Card',
  fields: {
    title:   { type: 'text', contentEditable: true },
    body:    richTextField(),
    color:   { type: 'text' },
    colorBg: { type: 'text' },
  },
  defaultProps: {
    title:   'EX-AI Trading Bot',
    body:    'The AI analyzes global crypto markets 24/7, executing trades with precision.',
    color:   '#1b61c9',
    colorBg: 'rgba(27,97,201,0.10)',
  },
  render: ({ title, body, color, colorBg }) => (
    <FeatureCardSection
      icon={<span style={{ fontSize: '1.5rem' }}>⚡</span>}
      title={title}
      body={body}
      color={color}
      colorBg={colorBg}
    />
  ),
}
