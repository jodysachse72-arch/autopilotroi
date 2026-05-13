'use client'

import type { ComponentConfig } from '@puckeditor/core'
import SectionBoxSection from '@/components/sections/SectionBox'
import type { SectionBoxProps } from '../types'

export const SectionBox: ComponentConfig<SectionBoxProps> = {
  label: 'Section Container',
  fields: {
    variant: {
      type: 'select',
      options: [
        { label: 'White',        value: 'white' },
        { label: 'Surface (gray)', value: 'surface' },
        { label: 'Blue',         value: 'blue' },
        { label: 'Navy (dark)',  value: 'navy' },
      ],
    },
    padding: {
      type: 'select',
      options: [
        { label: 'Normal', value: 'lg' },
        { label: 'Large',  value: 'xl' },
        { label: 'None',   value: 'none' },
        { label: 'Custom', value: 'custom' },
      ],
    },
    customPadding: { type: 'number', label: 'Custom Padding (px)', min: 0, max: 200 },
    content: { type: 'slot' },
  },
  defaultProps: {
    variant:       'white',
    padding:       'lg',
    customPadding: 48,
    content:       [],
  },
  render: ({ variant, padding, customPadding, content: Content }) => {
    const customStyle = padding === 'custom'
      ? { paddingTop: `${customPadding}px`, paddingBottom: `${customPadding}px` }
      : undefined
    return (
      <SectionBoxSection variant={variant} padding={padding === 'custom' ? 'none' : padding} innerStyle={customStyle}>
        <Content />
      </SectionBoxSection>
    )
  },
}
