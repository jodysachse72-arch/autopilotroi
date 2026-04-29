'use client'

import { Content } from '@builder.io/sdk-react'
import { BUILDER_BLOCKS } from './blocks'
import {
  HeroDark,
  SectionBox,
  SectionHeader,
  StatRow,
  FeatureCard,
  EcoCard,
  TestimonialCard,
  CTABand,
  Step,
} from '@/components/sections'

const BUILDER_API_KEY = process.env.NEXT_PUBLIC_BUILDER_API_KEY!

const COMPONENT_MAP: Record<string, React.ComponentType<any>> = {
  HeroDark,
  SectionBox,
  SectionHeader,
  StatRow,
  FeatureCard,
  EcoCard,
  TestimonialCard,
  CTABand,
  Step,
}

const customComponents = BUILDER_BLOCKS.map((block) => ({
  ...block,
  component: COMPONENT_MAP[block.name] ?? (() => null),
}))

interface BuilderContentProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: any
}

export function BuilderPageContent({ content }: BuilderContentProps) {
  if (!content) return null

  return (
    <Content
      model="page"
      content={content}
      apiKey={BUILDER_API_KEY}
      customComponents={customComponents}
    />
  )
}
