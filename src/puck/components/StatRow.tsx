'use client'

import type { ComponentConfig } from '@puckeditor/core'
import StatRowSection from '@/components/sections/StatRow'
import type { StatRowProps } from '../types'

export const StatRow: ComponentConfig<StatRowProps> = {
  label: 'Stats Row',
  fields: {
    stats: {
      type: 'array',
      arrayFields: {
        value:  { type: 'number' },
        suffix: { type: 'text' },
        label:  { type: 'text' },
      },
    },
  },
  defaultProps: {
    stats: [
      { value: 12000, suffix: '+', label: 'Members Onboarded' },
      { value: 47,    suffix: '%', label: 'Avg. Portfolio Growth' },
      { value: 24,    suffix: '/7', label: 'AI Bot Active Hours' },
      { value: 100,   suffix: '+', label: 'Countries Supported' },
    ],
  },
  render: ({ stats }) => <StatRowSection stats={stats} />,
}
