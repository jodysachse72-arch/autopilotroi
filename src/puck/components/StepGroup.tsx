'use client'

import type { ComponentConfig, SlotComponent } from '@puckeditor/core'
import type { StepGroupProps } from '../types'

export const StepGroup: ComponentConfig<StepGroupProps> = {
  label: 'Step Group',
  fields: {
    steps: { type: 'slot' },
  },
  defaultProps: { steps: ((() => null) as unknown) as SlotComponent },
  render: ({ steps: Steps }) => (
    <div className="puck-flex-passthrough" style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
      <Steps />
    </div>
  ),
}
