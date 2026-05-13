/**
 * Shared Puck Component Prop Types
 *
 * All slot/rich-text component prop interfaces are defined here so each
 * component module can import exactly what it needs.
 */

import type { RichText, SlotComponent } from '@puckeditor/core'

export type { RichText, SlotComponent }

// ─────────────────────────────────────────────────────────────────────────────
// Hero components
// ─────────────────────────────────────────────────────────────────────────────

export type HeroDarkProps = {
  badge: string
  title: string
  highlightedText: string
  description: RichText
  ctaLabel: string
  ctaHref: string
  bulletOne: string
  bulletTwo: string
  bulletThree: string
  videoUrl: string
  videoThumb: string
}

export type HeroBlueProps = {
  eyebrow: string
  title: string
  description: RichText
  ctaLabel: string
  ctaHref: string
}

export type PageHeaderWhiteProps = {
  badge: string
  title: string
  highlightedText: string
  description1: RichText
  description2: RichText
  cta1Label: string
  cta1Href: string
  cta2Label: string
  cta2Href: string
}

// ─────────────────────────────────────────────────────────────────────────────
// Layout containers
// ─────────────────────────────────────────────────────────────────────────────

export type SectionBoxProps = {
  variant: 'white' | 'surface' | 'blue' | 'navy'
  padding: 'lg' | 'xl' | 'none' | 'custom'
  customPadding: number
  content: SlotComponent
}

export type FeatureGridProps = {
  columns: '2' | '3' | '4'
  cards: SlotComponent
}

export type CardGridProps = {
  columns: '2' | '3' | '4'
  cards: SlotComponent
}

export type StepGroupProps = {
  steps: SlotComponent
}

// ─────────────────────────────────────────────────────────────────────────────
// Content blocks
// ─────────────────────────────────────────────────────────────────────────────

export type SectionHeaderProps = {
  eyebrow: string
  title: string
  lead: RichText
  align: 'center' | 'left'
  badgeVariant: 'blue' | 'white'
}

export type StatRowProps = {
  stats: { value: number; suffix: string; label: string }[]
}

export type StepProps = {
  num: string
  title: string
  body: RichText
}

export type CTABandProps = {
  eyebrow: string
  title: string
  description: RichText
  ctaLabel: string
  ctaHref: string
  secondaryLabel: string
  secondaryHref: string
}

// ─────────────────────────────────────────────────────────────────────────────
// Cards
// ─────────────────────────────────────────────────────────────────────────────

export type FeatureCardProps = {
  title: string
  body: RichText
  color: string
  colorBg: string
}

export type TrustSignalCardProps = {
  iconName: string
  title: string
  body: RichText
}

export type ProductCardProps = {
  productId: string
  name: string
  tagline: string
  description: RichText
  features: { value: string }[]
  badge: string
  badgeColor: string
  iconName: string
  image: string
}

export type EcoCardProps = {
  title: string
  description: RichText
  tag: string
  tagColor: string
}

export type TestimonialCardProps = {
  quote: RichText
  author: string
  role: string
}

// ─────────────────────────────────────────────────────────────────────────────
// Utility blocks
// ─────────────────────────────────────────────────────────────────────────────

export type HtmlBlockProps = { html: string }
export type SpacerProps = { height: number }
export type ImageBlockProps = { src: string; alt: string; maxWidth: number; borderRadius: number }
export type ButtonBlockProps = { label: string; href: string; variant: string; align: string; fullWidth: boolean }
export type CalculatorWidgetProps = Record<string, never>
export type SignupWidgetProps = Record<string, never>
export type FaqAccordionWidgetProps = Record<string, never>

// ─────────────────────────────────────────────────────────────────────────────
// Full component map (used by puck.config.tsx Config<Components> generic)
// ─────────────────────────────────────────────────────────────────────────────

export type Components = {
  HeroDark: HeroDarkProps
  HeroBlue: HeroBlueProps
  PageHeaderWhite: PageHeaderWhiteProps
  SectionBox: SectionBoxProps
  SectionHeader: SectionHeaderProps
  StatRow: StatRowProps
  FeatureGrid: FeatureGridProps
  FeatureCard: FeatureCardProps
  TrustSignalCard: TrustSignalCardProps
  ProductCard: ProductCardProps
  CardGrid: CardGridProps
  EcoCard: EcoCardProps
  TestimonialCard: TestimonialCardProps
  StepGroup: StepGroupProps
  Step: StepProps
  CTABand: CTABandProps
  CalculatorWidget: CalculatorWidgetProps
  SignupWidget: SignupWidgetProps
  FaqAccordionWidget: FaqAccordionWidgetProps
  HtmlBlock: HtmlBlockProps
  Spacer: SpacerProps
  ImageBlock: ImageBlockProps
  ButtonBlock: ButtonBlockProps
}
