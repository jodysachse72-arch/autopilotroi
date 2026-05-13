'use client'

import type { ComponentConfig } from '@puckeditor/core'
import { richTextField } from '@/lib/puck-editor'
import TestimonialCardSection from '@/components/sections/TestimonialCard'
import type { TestimonialCardProps } from '../types'

export const TestimonialCard: ComponentConfig<TestimonialCardProps> = {
  label: 'Testimonial',
  fields: {
    quote:  richTextField(),
    author: { type: 'text', contentEditable: true },
    role:   { type: 'text', contentEditable: true },
  },
  defaultProps: {
    quote:  'I was skeptical at first — the results speak for themselves.',
    author: 'Marcus T.',
    role:   'Member since 2025',
  },
  render: ({ quote, author, role }) => (
    <TestimonialCardSection quote={quote} author={author} role={role} />
  ),
}
