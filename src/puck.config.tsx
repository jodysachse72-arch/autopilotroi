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

import type { Config, RichText } from '@puckeditor/core'
import { richTextField } from '@/lib/puck-editor'
import type { ReactNode } from 'react'
import VideoModal from '@/components/ui/VideoModal'

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
  description: RichText
  ctaLabel: string
  ctaHref: string
  bulletOne: string
  bulletTwo: string
  bulletThree: string
  videoUrl: string
  videoThumb: string
}

type HeroBlueProps = {
  eyebrow: string
  title: string
  description: RichText
  ctaLabel: string
  ctaHref: string
}

type PageHeaderWhiteProps = {
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

type SectionBoxProps = {
  variant: 'white' | 'surface' | 'blue' | 'navy'
  padding: 'lg' | 'xl' | 'none' | 'custom'
  customPadding: number
}

type SectionHeaderProps = {
  eyebrow: string
  title: string
  lead: RichText
  align: 'center' | 'left'
  badgeVariant: 'blue' | 'white'
}

type StatRowProps = {
  stats: { value: number; suffix: string; label: string }[]
}

type FeatureCardProps = {
  title: string
  body: RichText
  color: string
  colorBg: string
}

type TrustSignalCardProps = {
  iconName: string
  title: string
  body: RichText
}

type ProductCardProps = {
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

type EcoCardProps = {
  title: string
  description: RichText
  tag: string
  tagColor: string
}

type TestimonialCardProps = {
  quote: RichText
  author: string
  role: string
}

type StepProps = {
  num: string
  title: string
  body: RichText
}

type CTABandProps = {
  eyebrow: string
  title: string
  description: RichText
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

type FeatureGridProps = {
  columns: '2' | '3' | '4'
}

type CardGridProps = {
  columns: '2' | '3' | '4'
}

type StepGroupProps = {}

type Components = {
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
  HtmlBlock: { html: string }
  Spacer: { height: number }
  ImageBlock: { src: string; alt: string; maxWidth: number; borderRadius: number }
  ButtonBlock: { label: string; href: string; variant: string; align: string; fullWidth: boolean }
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
        badge:           { type: 'text', contentEditable: true },
        title:           { type: 'text', contentEditable: true },
        highlightedText: { type: 'text', contentEditable: true },
        description:     richTextField(),
        ctaLabel:        { type: 'text', contentEditable: true },
        ctaHref:         { type: 'text' },
        bulletOne:       { type: 'text', contentEditable: true },
        bulletTwo:       { type: 'text', contentEditable: true },
        bulletThree:     { type: 'text', contentEditable: true },
        videoUrl:        { type: 'text', label: 'Video URL (YouTube)' },
        videoThumb:      { type: 'text', label: 'Thumbnail URL' },
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
        videoUrl: 'https://youtu.be/MmAnR4YAPv4',
        videoThumb: 'https://i.ytimg.com/vi/MmAnR4YAPv4/hqdefault.jpg',
      },
      render: ({ badge, title, highlightedText, description, ctaLabel, ctaHref, bulletOne, bulletTwo, bulletThree, videoUrl, videoThumb }) => {
        const videoVisual = videoUrl ? (
          <VideoModal videoUrl={videoUrl} ctaLabel="Start Here →" ctaHref={ctaHref || '/signup'}>
            <div style={{
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.18)',
              borderRadius: '1.25rem',
              overflow: 'hidden',
              backdropFilter: 'blur(8px)',
              cursor: 'pointer',
              boxShadow: '0 24px 64px rgba(0,0,0,0.35)',
            }}>
              <div style={{
                background: 'rgba(255,255,255,0.07)',
                borderBottom: '1px solid rgba(255,255,255,0.10)',
                padding: '0.75rem 1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}>
                {['#ff5f56', '#ffbd2e', '#27c93f'].map((c) => (
                  <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
                ))}
                <span style={{ flex: 1, textAlign: 'center', fontSize: '0.75rem', color: 'rgba(255,255,255,0.38)', marginLeft: '-1.5rem' }}>
                  app.autopilotroi.com
                </span>
              </div>
              <div style={{ position: 'relative', aspectRatio: '16/9' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={videoThumb || `https://i.ytimg.com/vi/${(videoUrl || '').split('/').pop()?.split('?')[0]}/hqdefault.jpg`}
                  alt="AutoPilotROI Overview Video"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.28)' }} />
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{
                    width: '64px', height: '64px', borderRadius: '50%',
                    background: 'rgba(255,0,0,0.92)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 4px 32px rgba(255,0,0,0.55)',
                  }}>
                    <svg width="22" height="26" viewBox="0 0 22 26" fill="white">
                      <path d="M0 0L22 13L0 26V0Z" />
                    </svg>
                  </div>
                </div>
                <div style={{ position: 'absolute', bottom: '1rem', left: 0, right: 0, display: 'flex', justifyContent: 'center' }}>
                  <span style={{
                    background: 'rgba(0,0,0,0.55)',
                    backdropFilter: 'blur(6px)',
                    borderRadius: '99px',
                    padding: '0.375rem 1rem',
                    fontSize: '0.8125rem',
                    color: 'rgba(255,255,255,0.88)',
                    fontWeight: 500,
                  }}>
                    ▶ Watch Overview
                  </span>
                </div>
              </div>
            </div>
          </VideoModal>
        ) : undefined

        return (
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
            visual={videoVisual}
            innerStyle={{ paddingTop: 'clamp(2.5rem, 5vw, 4rem)', paddingBottom: 'clamp(2.5rem, 5vw, 4rem)' }}
          />
        )
      },
    },

    // ── HERO BLUE ───────────────────────────────────────────
    HeroBlue: {
      label: 'Hero (Blue)',
      fields: {
        eyebrow:      { type: 'text', contentEditable: true },
        title:        { type: 'text', contentEditable: true },
        description:  richTextField(),
        ctaLabel:     { type: 'text', contentEditable: true },
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
        badge:            { type: 'text', contentEditable: true },
        title:            { type: 'text', contentEditable: true },
        highlightedText:  { type: 'text', contentEditable: true },
        description1:     richTextField(),
        description2:     richTextField(),
        cta1Label:        { type: 'text', contentEditable: true },
        cta1Href:         { type: 'text' },
        cta2Label:        { type: 'text', contentEditable: true },
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
            { label: 'Custom', value: 'custom' },
          ],
        },
        customPadding: {
          type: 'number',
          label: 'Custom Padding (px)',
          min: 0,
          max: 200,
        },
      },
      defaultProps: {
        variant: 'white',
        padding: 'lg',
        customPadding: 48,
      },
      render: ({ variant, padding, customPadding, puck }) => {
        const customStyle = padding === 'custom'
          ? { paddingTop: `${customPadding}px`, paddingBottom: `${customPadding}px` }
          : undefined
        return (
          <SectionBox variant={variant} padding={padding === 'custom' ? 'none' : padding} innerStyle={customStyle}>
            {puck.renderDropZone({ zone: 'content' })}
          </SectionBox>
        )
      },
    },

    // ── FEATURE GRID (wraps FeatureCards in a CSS grid) ────
    FeatureGrid: {
      label: 'Feature Grid',
      fields: {
        columns: {
          type: 'select',
          options: [
            { label: '2 columns', value: '2' },
            { label: '3 columns', value: '3' },
            { label: '4 columns', value: '4' },
          ],
        },
      },
      defaultProps: { columns: '3' },
      render: ({ columns, puck }) => (
        <div className="puck-grid-passthrough" style={{
          display: 'grid',
          gridTemplateColumns: `repeat(auto-fit, minmax(min(100%, ${columns === '2' ? '340px' : '280px'}), 1fr))`,
          gap: '1.25rem',
        }}>
          {puck.renderDropZone({ zone: 'cards' })}
        </div>
      ),
    },

    // ── CARD GRID (wraps EcoCards/Testimonials in a grid) ──
    CardGrid: {
      label: 'Card Grid',
      fields: {
        columns: {
          type: 'select',
          options: [
            { label: '2 columns', value: '2' },
            { label: '3 columns', value: '3' },
            { label: '4 columns', value: '4' },
          ],
        },
      },
      defaultProps: { columns: '4' },
      render: ({ columns, puck }) => (
        <div className="puck-grid-passthrough" style={{
          display: 'grid',
          gridTemplateColumns: `repeat(auto-fit, minmax(min(100%, ${columns === '2' ? '340px' : '260px'}), 1fr))`,
          gap: '1.25rem',
        }}>
          {puck.renderDropZone({ zone: 'cards' })}
        </div>
      ),
    },

    // ── STEP GROUP (vertical list of Steps) ────────────────
    StepGroup: {
      label: 'Step Group',
      fields: {},
      render: ({ puck }) => (
        <div className="puck-flex-passthrough" style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          {puck.renderDropZone({ zone: 'steps' })}
        </div>
      ),
    },

    // ── SECTION HEADER ─────────────────────────────────────
    SectionHeader: {
      label: 'Section Header',
      fields: {
        eyebrow:      { type: 'text', contentEditable: true },
        title:        { type: 'text', contentEditable: true },
        lead:         richTextField(),
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
        title:   { type: 'text', contentEditable: true },
        body:    richTextField(),
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
        title:    { type: 'text', contentEditable: true },
        body:     richTextField(),
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
        name:        { type: 'text', contentEditable: true },
        tagline:     { type: 'text', contentEditable: true },
        description: richTextField(),
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
        title:       { type: 'text', contentEditable: true },
        description: richTextField(),
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
        quote:  richTextField(),
        author: { type: 'text', contentEditable: true },
        role:   { type: 'text', contentEditable: true },
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
        num:   { type: 'text', contentEditable: true },
        title: { type: 'text', contentEditable: true },
        body:  richTextField(),
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
        eyebrow:        { type: 'text', contentEditable: true },
        title:          { type: 'text', contentEditable: true },
        description:    richTextField(),
        ctaLabel:       { type: 'text', contentEditable: true },
        ctaHref:        { type: 'text' },
        secondaryLabel: { type: 'text', contentEditable: true },
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

    // ── HTML BLOCK (raw HTML editing) ──────────────────────
    HtmlBlock: {
      label: 'HTML Block',
      fields: {
        html: { type: 'textarea', label: 'HTML Code' },
      },
      defaultProps: {
        html: '<div style="padding: 2rem; text-align: center; color: #666;"><p>Custom HTML block — edit the HTML in the sidebar panel.</p></div>',
      },
      render: ({ html }) => (
        <div dangerouslySetInnerHTML={{ __html: html }} />
      ),
    },

    // ── SPACER ─────────────────────────────────────────────
    Spacer: {
      label: 'Spacer',
      fields: {
        height: { type: 'number', label: 'Height (px)', min: 8, max: 200 },
      },
      defaultProps: { height: 40 },
      render: ({ height }) => (
        <div style={{ height: `${height}px` }} aria-hidden="true" />
      ),
    },

    // ── IMAGE BLOCK ────────────────────────────────────────
    ImageBlock: {
      label: 'Image',
      fields: {
        src:          { type: 'text', label: 'Image URL' },
        alt:          { type: 'text', label: 'Alt Text' },
        maxWidth:     { type: 'number', label: 'Max Width (px)', min: 100, max: 1400 },
        borderRadius: { type: 'number', label: 'Border Radius (px)', min: 0, max: 50 },
      },
      defaultProps: {
        src: '',
        alt: 'Image',
        maxWidth: 800,
        borderRadius: 12,
      },
      render: ({ src, alt, maxWidth, borderRadius }) => (
        src ? (
          <div style={{ maxWidth: `${maxWidth}px`, margin: '0 auto' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={alt}
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: `${borderRadius}px`,
                display: 'block',
              }}
            />
          </div>
        ) : (
          <div style={{
            padding: '3rem',
            textAlign: 'center',
            background: '#f1f5f9',
            borderRadius: `${borderRadius}px`,
            color: '#94a3b8',
            border: '2px dashed #cbd5e1',
          }}>
            📷 Set image URL in sidebar
          </div>
        )
      ),
    },

    // ── BUTTON BLOCK ──────────────────────────────────────
    ButtonBlock: {
      label: 'Button',
      fields: {
        label:     { type: 'text', contentEditable: true, label: 'Button Text' },
        href:      { type: 'text', label: 'Link URL' },
        variant: {
          type: 'select',
          label: 'Style',
          options: [
            { label: 'Primary (blue)', value: 'primary' },
            { label: 'Outline', value: 'outline' },
            { label: 'Ghost (text only)', value: 'ghost' },
          ],
        },
        align: {
          type: 'select',
          label: 'Alignment',
          options: [
            { label: 'Left', value: 'left' },
            { label: 'Center', value: 'center' },
            { label: 'Right', value: 'right' },
          ],
        },
        fullWidth: { type: 'radio', label: 'Full Width', options: [{ label: 'Yes', value: true }, { label: 'No', value: false }] },
      },
      defaultProps: {
        label: 'Click Here →',
        href: '#',
        variant: 'primary',
        align: 'left',
        fullWidth: false,
      },
      render: ({ label, href, variant, align, fullWidth }) => {
        const baseStyle: React.CSSProperties = {
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.375rem',
          padding: '0.875rem 2rem',
          borderRadius: 'var(--radius-btn, 12px)',
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: 'var(--text-body, 1rem)',
          textDecoration: 'none',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          width: fullWidth ? '100%' : 'auto',
        }
        const variantStyles: Record<string, React.CSSProperties> = {
          primary: { background: 'var(--color-accent, #1b61c9)', color: '#fff', border: 'none' },
          outline: { background: 'transparent', color: 'var(--color-accent, #1b61c9)', border: '2px solid var(--color-accent, #1b61c9)' },
          ghost:   { background: 'transparent', color: 'var(--color-accent, #1b61c9)', border: 'none', textDecoration: 'underline' },
        }
        return (
          <div style={{ textAlign: align as 'left' | 'center' | 'right' }}>
            <a href={href} style={{ ...baseStyle, ...variantStyles[variant] }} className="shimmer-hover">
              {label}
            </a>
          </div>
        )
      },
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
      components: ['SectionBox', 'SectionHeader', 'FeatureGrid', 'CardGrid', 'StepGroup', 'Spacer'],
      defaultExpanded: true,
    },
    content: {
      title: '📝 Content Blocks',
      components: ['StatRow', 'Step', 'CTABand', 'HtmlBlock', 'ImageBlock', 'ButtonBlock'],
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
    render: ({ children }) => (
      <div className="page-bg">
        <div className="sections-stack">
          {children}
        </div>
      </div>
    ),
  },
}
