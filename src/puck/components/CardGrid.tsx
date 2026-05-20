'use client'

import type { ComponentConfig, SlotComponent } from '@puckeditor/core'
import type { CardGridProps } from '../types'

export const CardGrid: ComponentConfig<CardGridProps> = {
  label: 'Card Grid',
  fields: {
    columns: {
      type: 'select',
      options: [
        { label: '2 columns', value: '2' },
        { label: '3 columns', value: '3' },
        { label: '4 columns', value: '4' },
      ],
    },
    cards: { type: 'slot' },
  },
  defaultProps: { columns: '4', cards: ((() => null) as unknown) as SlotComponent },
  render: ({ columns, cards: Cards }) => (
    <div className="puck-grid-passthrough" style={{
      display: 'grid',
      gridTemplateColumns: `repeat(auto-fit, minmax(min(100%, ${columns === '2' ? '340px' : '260px'}), 1fr))`,
      gap: '1.25rem',
    }}>
      <Cards />
    </div>
  ),
}
