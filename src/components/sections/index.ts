/**
 * OnePay-pattern section primitives. Every public page should be assembled
 * from these — see src/app/page.tsx for the canonical example.
 *
 * Layout shell:
 *   <PageShell>          Page background + 1440px capped stack
 *     <HeroDark/HeroBlue>  Top-of-page hero
 *     <SectionBox>         Rounded section card
 *       <SectionHeader>    Eyebrow + h2 + lead
 *       …card grids…
 *     </SectionBox>
 *     <CTABand>            Closing CTA (renders its own section)
 *   </PageShell>
 */

export { default as PageShell } from './PageShell'
export { default as SectionBox } from './SectionBox'
export { default as SectionHeader } from './SectionHeader'
export { default as HeroDark } from './HeroDark'
export { default as HeroBlue } from './HeroBlue'
export { default as ProductPanel } from './ProductPanel'
export { default as FeatureCard } from './FeatureCard'
export { default as TestimonialCard } from './TestimonialCard'
export { default as StatRow, StatItem } from './StatRow'
export type { Stat } from './StatRow'
export { default as Step } from './Step'
export { default as EcoCard } from './EcoCard'
export { default as CTABand } from './CTABand'
