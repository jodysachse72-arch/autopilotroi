'use client'

import type { ComponentConfig } from '@puckeditor/core'
import { richTextField } from '@/lib/puck-editor'
import StepSection from '@/components/sections/Step'
import type { StepProps } from '../types'

export const Step: ComponentConfig<StepProps> = {
  label: 'Process Step',
  fields: {
    num:   { type: 'text', contentEditable: true },
    title: { type: 'text', contentEditable: true },
    body:  richTextField(),
  },
  defaultProps: {
    num:   '1',
    title: 'Set up your infrastructure',
    body:  'Install Trust Wallet, activate a VPN, and acquire USDT.',
  },
  render: ({ num, title, body }) => (
    <StepSection num={num} title={title} body={body} />
  ),
}
