'use client'

import type { ComponentConfig } from '@puckeditor/core'
import { CalculatorWidget as CalculatorWidgetComponent } from '@/app/calculator/StaticCalculatorPage'
import { SignupWidget as SignupWidgetComponent } from '@/app/signup/StaticSignupPage'
import { FaqAccordionWidget as FaqAccordionWidgetComponent } from '@/app/faqs/FaqsPageClient'
import type { CalculatorWidgetProps, SignupWidgetProps, FaqAccordionWidgetProps } from '../types'

export const CalculatorWidget: ComponentConfig<CalculatorWidgetProps> = {
  label: 'Calculator Widget',
  fields: {},
  render: () => <CalculatorWidgetComponent />,
}

export const SignupWidget: ComponentConfig<SignupWidgetProps> = {
  label: 'Signup Form',
  fields: {},
  render: () => <SignupWidgetComponent />,
}

export const FaqAccordionWidget: ComponentConfig<FaqAccordionWidgetProps> = {
  label: 'FAQ Accordion',
  fields: {},
  render: () => <FaqAccordionWidgetComponent />,
}
