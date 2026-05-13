/**
 * src/puck/index.ts
 *
 * Public barrel — re-exports all Puck component configs and shared utilities.
 * Import from '@/puck' to access any component config.
 */

// Component configs
export { HeroDark }         from './components/HeroDark'
export { HeroBlue }         from './components/HeroBlue'
export { PageHeaderWhite }  from './components/PageHeaderWhite'
export { SectionBox }       from './components/SectionBox'
export { FeatureGrid }      from './components/FeatureGrid'
export { CardGrid }         from './components/CardGrid'
export { StepGroup }        from './components/StepGroup'
export { SectionHeader }    from './components/SectionHeader'
export { StatRow }          from './components/StatRow'
export { FeatureCard }      from './components/FeatureCard'
export { TrustSignalCard }  from './components/TrustSignalCard'
export { ProductCard }      from './components/ProductCard'
export { EcoCard }          from './components/EcoCard'
export { TestimonialCard }  from './components/TestimonialCard'
export { Step }             from './components/Step'
export { CTABand }          from './components/CTABand'
export { HtmlBlock, Spacer, ImageBlock, ButtonBlock } from './components/UtilityBlocks'
export { CalculatorWidget, SignupWidget, FaqAccordionWidget } from './components/Widgets'

// Shared types
export type { Components }  from './types'
