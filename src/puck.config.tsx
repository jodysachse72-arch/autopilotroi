'use client'

/**
 * Puck Configuration
 *
 * Maps existing AutoPilotROI section components to Puck's visual editor.
 * Each component keeps its exact appearance — Puck just makes the text
 * fields editable inline on the canvas.
 *
 * Text fields with `contentEditable: true` can be clicked and edited
 * directly on the rendered page in the editor.
 */

import type { Config } from '@puckeditor/core'
import type { ReactNode } from 'react'

import HeroDark from '@/components/sections/HeroDark'
import SectionBox from '@/components/sections/SectionBox'
import SectionHeader from '@/components/sections/SectionHeader'
import StatRow from '@/components/sections/StatRow'
import FeatureCard from '@/components/sections/FeatureCard'
import EcoCard from '@/components/sections/EcoCard'
import TestimonialCard from '@/components/sections/TestimonialCard'
import Step from '@/components/sections/Step'
import CTABand from '@/components/sections/CTABand'
import HeroBlue from '@/components/sections/HeroBlue'
import { CalculatorWidget } from '@/app/calculator/StaticCalculatorPage'
import { SignupWidget } from '@/app/signup/StaticSignupPage'
import { FaqAccordionWidget } from '@/app/faqs/FaqsPageClient'
import { AutomationIcon, GrowthIcon, SecurityIcon, DataIcon, EcosystemIcon, ExchangeIcon, BankIcon, CardIcon, PartnerIcon } from '@/components/ui/Icons'

// ─────────────────────────────────────────────────────────────────
// Component props definitions for Puck
// ─────────────────────────────────────────────────────────────────

type HeroDarkProps = {
  badge: string
  title: string
  highlightedText: string
  description: string
  ctaLabel: string
  ctaHref: string
  bulletOne: string
  bulletTwo: string
  bulletThree: string
}

type HeroBlueProps = {
  eyebrow: string
  title: string
  description: string
  ctaLabel: string
  ctaHref: string
}

type PageHeaderWhiteProps = {
  badge: string
  title: string
  highlightedText: string
  description1: string
  description2: string
  cta1Label: string
  cta1Href: string
  cta2Label: string
  cta2Href: string
}

type SectionBoxProps = {
  variant: 'white' | 'surface' | 'blue' | 'navy'
  padding: 'lg' | 'xl' | 'none'
}

type SectionHeaderProps = {
  eyebrow: string
  title: string
  lead: string
  align: 'center' | 'left'
  badgeVariant: 'blue' | 'white'
}

type StatRowProps = {
  stats: { value: number; suffix: string; label: string }[]
}

type FeatureCardProps = {
  title: string
  body: string
  color: string
  colorBg: string
}

type TrustSignalCardProps = {
  iconName: string
  title: string
  body: string
}

type ProductCardProps = {
  productId: string
  name: string
  tagline: string
  description: string
  features: { value: string }[]
  badge: string
  badgeColor: string
  iconName: string
  image: string
}

type EcoCardProps = {
  title: string
  description: string
  tag: string
  tagColor: string
}

type TestimonialCardProps = {
  quote: string
  author: string
  role: string
}

type StepProps = {
  num: string
  title: string
  body: string
}

type CTABandProps = {
  eyebrow: string
  title: string
  description: string
  ctaLabel: string
  ctaHref: string
  secondaryLabel: string
  secondaryHref: string
}

type CalculatorWidgetProps = {}
type SignupWidgetProps = {}
type FaqAccordionWidgetProps = {}

// ─────────────────────────────────────────────────────────────────
// Puck Config
// ─────────────────────────────────────────────────────────────────

type Components = {
  HeroDark: HeroDarkProps
  HeroBlue: HeroBlueProps
  PageHeaderWhite: PageHeaderWhiteProps
  SectionBox: SectionBoxProps
  SectionHeader: SectionHeaderProps
  StatRow: StatRowProps
  FeatureCard: FeatureCardProps
  TrustSignalCard: TrustSignalCardProps
  ProductCard: ProductCardProps
  EcoCard: EcoCardProps
  TestimonialCard: TestimonialCardProps
  Step: StepProps
  CTABand: CTABandProps
  CalculatorWidget: CalculatorWidgetProps
  SignupWidget: SignupWidgetProps
  FaqAccordionWidget: FaqAccordionWidgetProps
}

const ICONS: Record<string, ReactNode> = {
  AutomationIcon: <AutomationIcon />,
  GrowthIcon: <GrowthIcon />,
  SecurityIcon: <SecurityIcon />,
  DataIcon: <DataIcon />,
  EcosystemIcon: <EcosystemIcon />,
  ExchangeIcon: <ExchangeIcon />,
  BankIcon: <BankIcon />,
  CardIcon: <CardIcon />,
  PartnerIcon: <PartnerIcon />,
}

export const puckConfig: Config<Components> = {
  components: {
    // ── HERO ────────────────────────────────────────────────
    HeroDark: {
      label: 'Hero (Dark)',
      fields: {
        badge:           { type: 'text' },
        title:           { type: 'text' },
        highlightedText: { type: 'text' },
        description:     { type: 'textarea' },
        ctaLabel:        { type: 'text' },
        ctaHref:         { type: 'text' },
        bulletOne:       { type: 'text' },
        bulletTwo:       { type: 'text' },
        bulletThree:     { type: 'text' },
      },
      defaultProps: {
        badge: '✦ Powered by Aurum Ecosystem',
        title: 'Your Money,',
        highlightedText: 'Working 24/7',
        description: 'AutoPilotROI is your structured guide into the Aurum ecosystem — AI-powered crypto trading, a Visa crypto card, exchange, and Web3 neobank. Start with $100.',
        ctaLabel: 'Start Here →',
        ctaHref: '/signup',
        bulletOne: 'Start with $100 USDT',
        bulletTwo: 'AI runs 24/7',
        bulletThree: 'Guided onboarding',
      },
      render: ({ badge, title, highlightedText, description, ctaLabel, ctaHref, bulletOne, bulletTwo, bulletThree }) => (
        <HeroDark
          badge={badge}
          title={
            <>
              {title}
              <br />
              <span style={{ color: '#93c5fd' }}>{highlightedText}</span>
            </>
          }
          description={description}
          ctas={[{ label: ctaLabel, href: ctaHref, variant: 'primary' }]}
          bullets={[
            { icon: '✓', text: bulletOne },
            { icon: '✓', text: bulletTwo },
            { icon: '✓', text: bulletThree },
          ]}
        />
      ),
    },

    // ── HERO BLUE ───────────────────────────────────────────
    HeroBlue: {
      label: 'Hero (Blue)',
      fields: {
        eyebrow:      { type: 'text' },
        title:        { type: 'text' },
        description:  { type: 'textarea' },
        ctaLabel:     { type: 'text' },
        ctaHref:      { type: 'text' },
      },
      defaultProps: {
        eyebrow: 'Knowledge Base',
        title: 'Everything you need to get started.',
        description: 'Find clear answers to the most common questions about AutoPilotROI.',
        ctaLabel: '',
        ctaHref: '',
      },
      render: ({ eyebrow, title, description, ctaLabel, ctaHref }) => {
        const ctas = ctaLabel && ctaHref ? [{ label: ctaLabel, href: ctaHref, variant: 'primary' as const }] : []
        return (
          <HeroBlue
            eyebrow={eyebrow}
            title={title}
            description={description}
            ctas={ctas}
          />
        )
      },
    },

    // ── PAGE HEADER WHITE ──────────────────────────────────
    PageHeaderWhite: {
      label: 'Page Header (White)',
      fields: {
        badge:            { type: 'text' },
        title:            { type: 'text' },
        highlightedText:  { type: 'text' },
        description1:     { type: 'textarea' },
        description2:     { type: 'textarea' },
        cta1Label:        { type: 'text' },
        cta1Href:         { type: 'text' },
        cta2Label:        { type: 'text' },
        cta2Href:         { type: 'text' },
      },
      defaultProps: {
        badge: 'What Is Aurum',
        title: 'A Complete Financial Ecosystem',
        highlightedText: 'Built on AI and Blockchain',
        description1: 'Aurum Foundation is a legally registered financial technology company...',
        description2: 'The core product is the EX-AI Bot...',
        cta1Label: 'Start Here →',
        cta1Href: '/signup',
        cta2Label: 'Calculate Your Returns →',
        cta2Href: '/calculator',
      },
      render: ({ badge, title, highlightedText, description1, description2, cta1Label, cta1Href, cta2Label, cta2Href }) => (
        <section className="section-box" style={{ borderBottom: '1px solid var(--color-border)' }}>
          <div className="container-xl section-padding">
            <div style={{ maxWidth: '56rem', margin: '0 auto' }}>
              {badge && (
                <span style={{
                  display: 'inline-block', background: 'rgba(27,97,201,0.08)', color: '#1b61c9',
                  border: '1px solid rgba(27,97,201,0.15)', borderRadius: '99px',
                  padding: '0.375rem 1rem', fontSize: 'var(--text-label)', fontWeight: 700,
                  letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1.5rem',
                }}>
                  {badge}
                </span>
              )}
              <h1 style={{
                fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3.25rem)', fontWeight: 800,
                color: '#181d26', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '1.5rem',
              }}>
                {title}<br /><span style={{ color: '#1b61c9' }}>{highlightedText}</span>
              </h1>
              {description1 && (
                <p style={{ fontSize: 'var(--text-body-lg)', color: 'var(--color-text-weak)', lineHeight: 'var(--lh-relaxed)', maxWidth: '44rem', marginBottom: '2rem' }}>
                  {description1}
                </p>
              )}
              {description2 && (
                <p style={{ fontSize: 'var(--text-body-lg)', color: 'var(--color-text-weak)', lineHeight: 'var(--lh-relaxed)', maxWidth: '44rem', marginBottom: '2.5rem' }}>
                  {description2}
                </p>
              )}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.875rem' }}>
                {cta1Label && cta1Href && (
                  <a href={cta1Href} className="btn-primary shimmer-hover" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', padding: '0.875rem 2rem', borderRadius: 'var(--radius-btn)', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-body)', textDecoration: 'none' }}>
                    {cta1Label}
                  </a>
                )}
                {cta2Label && cta2Href && (
                  <a href={cta2Href} className="btn-outline shimmer-hover" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', padding: '0.875rem 2rem', borderRadius: 'var(--radius-btn)', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'var(--text-body)', textDecoration: 'none' }}>
                    {cta2Label}
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>
      ),
    },

    // ── SECTION BOX ────────────────────────────────────────
    SectionBox: {
      label: 'Section Container',
      fields: {
        variant: {
          type: 'select',
          options: [
            { label: 'White', value: 'white' },
            { label: 'Surface (gray)', value: 'surface' },
            { label: 'Blue', value: 'blue' },
            { label: 'Navy (dark)', value: 'navy' },
          ],
        },
        padding: {
          type: 'select',
          options: [
            { label: 'Normal', value: 'lg' },
            { label: 'Large', value: 'xl' },
            { label: 'None', value: 'none' },
          ],
        },
      },
      defaultProps: {
        variant: 'white',
        padding: 'lg',
      },
      render: ({ variant, padding, puck }) => (
        <SectionBox variant={variant} padding={padding}>
          {puck.renderDropZone({ zone: 'content' })}
        </SectionBox>
      ),
    },

    // ── SECTION HEADER ─────────────────────────────────────
    SectionHeader: {
      label: 'Section Header',
      fields: {
        eyebrow:      { type: 'text' },
        title:        { type: 'text' },
        lead:         { type: 'textarea' },
        align:        {
          type: 'select',
          options: [
            { label: 'Center', value: 'center' },
            { label: 'Left', value: 'left' },
          ],
        },
        badgeVariant: {
          type: 'select',
          options: [
            { label: 'Blue', value: 'blue' },
            { label: 'White', value: 'white' },
          ],
        },
      },
      defaultProps: {
        eyebrow: 'Why AutoPilotROI',
        title: 'Everything you need to grow on autopilot',
        lead: 'From your first $100 to a fully active portfolio — we guide you through every step.',
        align: 'center',
        badgeVariant: 'blue',
      },
      render: ({ eyebrow, title, lead, align, badgeVariant }) => (
        <SectionHeader
          eyebrow={eyebrow}
          title={title}
          align={align}
          badgeVariant={badgeVariant}
        >
          {lead}
        </SectionHeader>
      ),
    },

    // ── STAT ROW ───────────────────────────────────────────
    StatRow: {
      label: 'Stats Row',
      fields: {
        stats: {
          type: 'array',
          arrayFields: {
            value:  { type: 'number' },
            suffix: { type: 'text' },
            label:  { type: 'text' },
          },
        },
      },
      defaultProps: {
        stats: [
          { value: 12000, suffix: '+', label: 'Members Onboarded' },
          { value: 47, suffix: '%', label: 'Avg. Portfolio Growth' },
          { value: 24, suffix: '/7', label: 'AI Bot Active Hours' },
          { value: 100, suffix: '+', label: 'Countries Supported' },
        ],
      },
      render: ({ stats }) => <StatRow stats={stats} />,
    },

    // ── FEATURE CARD ───────────────────────────────────────
    FeatureCard: {
      label: 'Feature Card',
      fields: {
        title:   { type: 'text' },
        body:    { type: 'textarea' },
        color:   { type: 'text' },
        colorBg: { type: 'text' },
      },
      defaultProps: {
        title: 'EX-AI Trading Bot',
        body: 'The AI analyzes global crypto markets 24/7, executing trades with precision.',
        color: '#1b61c9',
        colorBg: 'rgba(27,97,201,0.10)',
      },
      render: ({ title, body, color, colorBg }) => (
        <FeatureCard
          icon={<span style={{ fontSize: '1.5rem' }}>⚡</span>}
          title={title}
          body={body}
          color={color}
          colorBg={colorBg}
        />
      ),
    },

    // ── TRUST SIGNAL CARD ──────────────────────────────────
    TrustSignalCard: {
      label: 'Trust Signal',
      fields: {
        iconName: {
          type: 'select',
          options: Object.keys(ICONS).map(k => ({ label: k.replace('Icon', ''), value: k })),
        },
        title:    { type: 'text' },
        body:     { type: 'textarea' },
      },
      defaultProps: {
        iconName: 'BankIcon',
        title: 'Legally Registered',
        body: 'Aurum Foundation Limited was officially incorporated...',
      },
      render: ({ iconName, title, body }) => (
        <div style={{ background: '#ffffff', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-card)', padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '0.875rem' }} className="shimmer-hover">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
            <div className="icon-circle" style={{ width: '3rem', height: '3rem', flexShrink: 0, borderRadius: 'var(--radius-md)', fontSize: '1.375rem' }}>
              {ICONS[iconName] || <BankIcon />}
            </div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-subheading)', fontWeight: 700, color: '#181d26', letterSpacing: '-0.01em' }}>
              {title}
            </h3>
          </div>
          <p style={{ fontSize: 'var(--text-body)', color: 'var(--color-text-weak)', lineHeight: 'var(--lh-relaxed)' }}>
            {body}
          </p>
        </div>
      ),
    },

    // ── PRODUCT CARD ───────────────────────────────────────
    ProductCard: {
      label: 'Product Card',
      fields: {
        productId:   { type: 'text' },
        name:        { type: 'text' },
        tagline:     { type: 'text' },
        description: { type: 'textarea' },
        features:    { type: 'array', arrayFields: { value: { type: 'text' } } },
        badge:       { type: 'text' },
        badgeColor:  { type: 'text' },
        iconName: {
          type: 'select',
          options: Object.keys(ICONS).map(k => ({ label: k.replace('Icon', ''), value: k })),
        },
        image:       { type: 'text' },
      },
      defaultProps: {
        productId: 'bots',
        name: 'EX-AI Trading Bot',
        tagline: 'AI-Managed Liquidity Engine',
        description: 'Machine-learning algorithms execute trades 24/7...',
        features: [{ value: '24/7 automated execution' }, { value: 'Multi-exchange arbitrage' }],
        badge: 'Flagship',
        badgeColor: '#1b61c9',
        iconName: 'AutomationIcon',
        image: '/product-bots.png',
      },
      render: ({ productId, name, tagline, description, features, badge, badgeColor, iconName, image }) => (
        <div id={productId} style={{ position: 'relative', background: '#ffffff', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-card)', padding: '2rem' }} className="shimmer-hover">
          {badge && (
            <span style={{ position: 'absolute', right: '1.25rem', top: '1.25rem', background: badgeColor || '#1b61c9', color: '#fff', borderRadius: '99px', padding: '0.25rem 0.75rem', fontSize: 'var(--text-caption)', fontWeight: 700 }}>
              {badge}
            </span>
          )}
          {image && (
            <div style={{ marginBottom: '1.5rem', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--color-border-light)', aspectRatio: '16 / 9' }}>
              <img src={image} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
          )}
          <div className="icon-circle" style={{ width: '3.25rem', height: '3.25rem', borderRadius: 'var(--radius-md)', fontSize: '1.5rem', marginBottom: '1.25rem' }}>
            {ICONS[iconName] || <AutomationIcon />}
          </div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-subheading)', fontWeight: 700, color: '#181d26', letterSpacing: '-0.02em', marginBottom: '0.25rem' }}>
            {name}
          </h3>
          <p style={{ fontSize: 'var(--text-body)', fontWeight: 600, color: '#1b61c9', marginBottom: '0.875rem' }}>
            {tagline}
          </p>
          <p style={{ fontSize: 'var(--text-body)', lineHeight: 1.65, color: 'var(--color-text-weak)', marginBottom: '1.5rem' }}>
            {description}
          </p>
          <ul style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
            {features?.map((f, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: 'var(--text-body)', color: 'var(--color-text-weak)' }}>
                <svg style={{ width: '1rem', height: '1rem', color: '#1b61c9', flexShrink: 0, marginTop: '0.2rem' }} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                {f.value}
              </li>
            ))}
          </ul>
        </div>
      ),
    },

    // ── ECO CARD ───────────────────────────────────────────
    EcoCard: {
      label: 'Ecosystem Card',
      fields: {
        title:       { type: 'text' },
        description: { type: 'textarea' },
        tag:         { type: 'text' },
        tagColor:    { type: 'text' },
      },
      defaultProps: {
        title: 'EX-AI Trading Bot',
        description: 'Fully automated 24/7 AI trading bot with proven track record.',
        tag: 'LIVE',
        tagColor: '#059669',
      },
      render: ({ title, description, tag, tagColor }) => (
        <EcoCard
          icon={<span style={{ fontSize: '1.5rem' }}>🔧</span>}
          title={title}
          description={description}
          tag={tag}
          tagColor={tagColor}
        />
      ),
    },

    // ── TESTIMONIAL CARD ───────────────────────────────────
    TestimonialCard: {
      label: 'Testimonial',
      fields: {
        quote:  { type: 'textarea' },
        author: { type: 'text' },
        role:   { type: 'text' },
      },
      defaultProps: {
        quote: 'I was skeptical at first — the results speak for themselves.',
        author: 'Marcus T.',
        role: 'Member since 2025',
      },
      render: ({ quote, author, role }) => (
        <TestimonialCard quote={quote} author={author} role={role} />
      ),
    },

    // ── STEP ───────────────────────────────────────────────
    Step: {
      label: 'Process Step',
      fields: {
        num:   { type: 'text' },
        title: { type: 'text' },
        body:  { type: 'textarea' },
      },
      defaultProps: {
        num: '1',
        title: 'Set up your infrastructure',
        body: 'Install Trust Wallet, activate a VPN, and acquire USDT.',
      },
      render: ({ num, title, body }) => (
        <Step num={num} title={title} body={body} />
      ),
    },

    // ── CTA BAND ───────────────────────────────────────────
    CTABand: {
      label: 'CTA Banner',
      fields: {
        eyebrow:        { type: 'text' },
        title:          { type: 'text' },
        description:    { type: 'textarea' },
        ctaLabel:       { type: 'text' },
        ctaHref:        { type: 'text' },
        secondaryLabel: { type: 'text' },
        secondaryHref:  { type: 'text' },
      },
      defaultProps: {
        eyebrow: 'Ready to start?',
        title: 'Your AI portfolio starts with $100',
        description: 'Join thousands of members who activated the EX-AI Bot and started growing their portfolio on autopilot.',
        ctaLabel: 'Begin Onboarding →',
        ctaHref: '/signup',
        secondaryLabel: 'Read FAQs',
        secondaryHref: '/faqs',
      },
      render: ({ eyebrow, title, description, ctaLabel, ctaHref, secondaryLabel, secondaryHref }) => {
        const ctas: { label: string; href: string; variant?: 'primary' | 'ghost' }[] = [
          { label: ctaLabel, href: ctaHref, variant: 'primary' },
        ]
        if (secondaryLabel && secondaryHref) {
          ctas.push({ label: secondaryLabel, href: secondaryHref, variant: 'ghost' })
        }
        return (
          <CTABand
            eyebrow={eyebrow}
            title={title}
            description={description}
            ctas={ctas}
          />
        )
      },
    },

    // ── CALCULATOR WIDGET ──────────────────────────────────
    CalculatorWidget: {
      label: 'Calculator Widget',
      fields: {},
      render: () => <CalculatorWidget />,
    },

    // ── SIGNUP WIDGET ──────────────────────────────────────
    SignupWidget: {
      label: 'Signup Form',
      fields: {},
      render: () => <SignupWidget />,
    },

    // ── FAQ ACCORDION WIDGET ───────────────────────────────
    FaqAccordionWidget: {
      label: 'FAQ Accordion',
      fields: {},
      render: () => <FaqAccordionWidget />,
    },
  },

  // ── Component Categories (sidebar grouping) ──────────────
  categories: {
    heroes: {
      title: '🎯 Heroes & Headers',
      components: ['HeroDark', 'HeroBlue', 'PageHeaderWhite'],
      defaultExpanded: true,
    },
    layout: {
      title: '📐 Layout',
      components: ['SectionBox', 'SectionHeader'],
      defaultExpanded: true,
    },
    content: {
      title: '📝 Content Blocks',
      components: ['StatRow', 'Step', 'CTABand'],
      defaultExpanded: true,
    },
    cards: {
      title: '🃏 Cards',
      components: ['FeatureCard', 'TrustSignalCard', 'ProductCard', 'EcoCard', 'TestimonialCard'],
      defaultExpanded: false,
    },
    widgets: {
      title: '⚡ Interactive Widgets',
      components: ['CalculatorWidget', 'SignupWidget', 'FaqAccordionWidget'],
      defaultExpanded: false,
    },
  },

  // ── Root Config (page-level settings) ────────────────────
  root: {
    fields: {
      title: { type: 'text' },
      description: { type: 'textarea' },
    },
    render: ({ children, puck }) => (
      <div
        style={{
          fontFamily: 'var(--font-body, system-ui, sans-serif)',
          minHeight: '100vh',
        }}
      >
        {children}
      </div>
    ),
  },
}
