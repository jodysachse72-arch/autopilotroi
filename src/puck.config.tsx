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
import { richTextField, ImageUrlField, VideoUrlField } from '@/lib/puck-editor'
import type { ReactNode } from 'react'
import { useState, useRef } from 'react'
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
import FaqItem from '@/components/sections/FaqItem'
import FaqGroup from '@/components/sections/FaqGroup'
import VideoBlock from '@/components/sections/VideoBlock'
import QuoteBlock from '@/components/sections/QuoteBlock'
import PricingCard from '@/components/sections/PricingCard'
import ActivityTicker from '@/components/sections/ActivityTicker'
import { CalculatorWidget } from '@/app/calculator/StaticCalculatorPage'
import { SignupWidget } from '@/app/signup/StaticSignupPage'
import { FaqAccordionWidget } from '@/app/faqs/FaqsPageClient'
import { AutomationIcon, GrowthIcon, SecurityIcon, DataIcon, EcosystemIcon, ExchangeIcon, BankIcon, CardIcon, PartnerIcon } from '@/components/ui/Icons'


// ─────────────────────────────────────────────────────────────────
// Component props definitions for Puck
// ─────────────────────────────────────────────────────────────────

type HeroDarkProps = {
  // Visual group dividers (custom fields — values not stored)
  _groupCopy?: string
  _groupCTA?: string
  _groupBullets?: string
  _groupMedia?: string
  badge: string
  title: string
  highlightedText: string
  description: RichText
  ctaLabel: string
  ctaHref: string
  secondaryCtaLabel: string
  secondaryCtaHref: string
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
  sectionName: string
  variant: 'white' | 'surface' | 'blue' | 'navy'
  padding: 'lg' | 'xl' | 'none'
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
  colorPreset: string
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
  company: string
  starRating: '5' | '4' | '3' | '0'
  memberInitials: string
  avatarUrl: string
  cardStyle: 'standard' | 'featured'
}

type FaqItemProps = {
  question: string
  answer: RichText
  openByDefault: 'yes' | 'no'
}

type FaqGroupProps = {
  groupTitle: string
}

type VideoBlockProps = {
  videoUrl: string
  caption: string
  displaySize: 'small' | 'medium' | 'large' | 'full'
}

type QuoteBlockProps = {
  quote: RichText
  attribution: string
  attributionRole: string
  quoteStyle: 'centered' | 'left'
  accentColor: string
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

type PricingFeature = { text: string }

type PricingCardProps = {
  _groupPlan?: string
  _groupFeatures?: string
  _groupCTA?: string
  planName: string
  planTagline: string
  priceDisplay: string
  feature1: string
  feature2: string
  feature3: string
  feature4: string
  feature5: string
  feature6: string
  feature7: string
  feature8: string
  ctaLabel: string
  ctaHref: string
  badge: string
  guaranteeBadge: string
  countdownText: string
  cardStyle: 'standard' | 'featured'
}

type ActivityTickerProps = {
  message1: string
  message2: string
  message3: string
  message4: string
  message5: string
  speed: 'slow' | 'normal' | 'fast'
  theme: 'emerald' | 'blue' | 'neutral'
}

type ModalBlockProps = {
  triggerLabel: string
  modalTitle: string
  modalBody: RichText
  ctaLabel: string
  ctaHref: string
  mediaUrl: string
  mediaType: 'none' | 'image' | 'video'
}

type PopupCTAProps = {
  headline: string
  body: RichText
  ctaLabel: string
  ctaHref: string
  style: 'modal' | 'banner'
}

type FormBlockProps = {
  formTitle: string
  formDescription: string
  nameLabel: string
  namePlaceholder: string
  emailLabel: string
  emailPlaceholder: string
  messageLabel: string
  messagePlaceholder: string
  showMessage: 'yes' | 'no'
  submitLabel: string
  successMessage: string
  formStyle: 'card' | 'inline'
}

type FunnelStepsProps = {
  stepTitle1: string
  stepBody1: string
  stepTitle2: string
  stepBody2: string
  stepTitle3: string
  stepBody3: string
  stepTitle4: string
  stepBody4: string
  ctaLabel: string
  ctaHref: string
  style: 'horizontal' | 'vertical'
}

type CTAStripProps = {
  eyebrow: string
  headline: string
  body: string
  ctaLabel: string
  ctaHref: string
  variant: 'onboarding' | 'webinar' | 'trust' | 'urgency' | 'lead-magnet'
}

// ─────────────────────────────────────────────────────────────────
// Puck Config
// ─────────────────────────────────────────────────────────────────

type FeatureGridProps = {}

type CardGridProps = {}

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
  FaqItem: FaqItemProps
  FaqGroup: FaqGroupProps
  VideoBlock: VideoBlockProps
  QuoteBlock: QuoteBlockProps
  PricingCard: PricingCardProps
  ActivityTicker: ActivityTickerProps
  CalculatorWidget: CalculatorWidgetProps
  SignupWidget: SignupWidgetProps
  FaqAccordionWidget: FaqAccordionWidgetProps
  ImageBlock: { src: string; alt: string; maxWidth: number; borderRadius: number }
  ModalBlock: ModalBlockProps
  PopupCTA: PopupCTAProps
  FormBlock: FormBlockProps
  FunnelSteps: FunnelStepsProps
  CTAStrip: CTAStripProps
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

// ─────────────────────────────────────────────────────────────────
// Brand-safe color palettes — Barry never types a hex code
// ─────────────────────────────────────────────────────────────────

/** Icon accent color + tinted background pairs for Feature Cards */
const ICON_COLOR_PRESETS: Record<string, { color: string; colorBg: string }> = {
  'brand-blue':   { color: '#1b61c9',  colorBg: 'rgba(27,97,201,0.10)'  },
  'emerald':      { color: '#059669',  colorBg: 'rgba(5,150,105,0.10)'  },
  'violet':       { color: '#7c3aed',  colorBg: 'rgba(124,58,237,0.10)' },
  'amber':        { color: '#d97706',  colorBg: 'rgba(217,119,6,0.10)'  },
  'rose':         { color: '#e11d48',  colorBg: 'rgba(225,29,72,0.10)'  },
  'slate':        { color: '#475569',  colorBg: 'rgba(71,85,105,0.10)'  },
}

const ICON_COLOR_OPTIONS = [
  { label: 'Brand Blue',    value: 'brand-blue' },
  { label: 'Emerald Green', value: 'emerald'    },
  { label: 'Violet',        value: 'violet'     },
  { label: 'Amber Gold',    value: 'amber'      },
  { label: 'Rose Red',      value: 'rose'       },
  { label: 'Slate Gray',    value: 'slate'      },
]

/** Badge colors for Product Card corner badges */
const BADGE_COLOR_OPTIONS = [
  { label: 'Brand Blue',    value: '#1b61c9' },
  { label: 'Emerald Green', value: '#059669' },
  { label: 'Violet',        value: '#7c3aed' },
  { label: 'Amber Gold',    value: '#d97706' },
  { label: 'Rose Red',      value: '#e11d48' },
  { label: 'Dark Navy',     value: '#0f172a' },
]

/** Status tag colors for Ecosystem Cards */
const TAG_COLOR_OPTIONS = [
  { label: 'Emerald Green (Live)',    value: '#059669' },
  { label: 'Brand Blue (Active)',     value: '#1b61c9' },
  { label: 'Amber Gold (Coming Soon)', value: '#d97706' },
  { label: 'Rose Red (Paused)',       value: '#e11d48' },
  { label: 'Slate Gray (Inactive)',   value: '#475569' },
]

// ─────────────────────────────────────────────────────────────────
// TASK 1: Field group divider — renders a labeled separator in
// the Puck right panel. No data stored. Pure visual affordance.
// ─────────────────────────────────────────────────────────────────

function fieldGroupDivider(label: string) {
  return {
    type: 'custom' as const,
    label,
    render: () => (
      <div style={{
        borderTop: '1px solid #e5e7eb',
        marginTop: 4,
        marginBottom: 2,
        paddingTop: 8,
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: '0.07em',
        textTransform: 'uppercase' as const,
        color: '#1b61c9',
        fontFamily: 'system-ui',
        opacity: 0.75,
      }}>
        {label}
      </div>
    ),
  }
}

// ─────────────────────────────────────────────────────────────────
// TASK 2: LinkField — validates CTA/href inputs inline.
// Supports /relative, #anchor, https:// URLs.
// Shows a red warning for invalid values, never blocks typing.
// ─────────────────────────────────────────────────────────────────

function isValidLink(v: string): boolean {
  if (!v || v.trim() === '') return true // blank = hidden = OK
  const s = v.trim()
  if (s.startsWith('/')) return true
  if (s.startsWith('#')) return true
  if (s.startsWith('https://')) return true
  if (s.startsWith('http://')) return true
  if (s.startsWith('mailto:')) return true
  return false
}

function LinkField({
  value,
  onChange,
  label,
  placeholder = '/page-path or #section or https://…',
}: {
  value: string
  onChange: (v: string) => void
  label?: string
  placeholder?: string
}) {
  const [touched, setTouched] = useState(false)
  const invalid = touched && value.trim() !== '' && !isValidLink(value)
  return (
    <div style={{ fontFamily: 'system-ui', width: '100%' }}>
      {label && (
        <label style={{
          display: 'block', fontSize: 12, fontWeight: 600,
          color: '#374151', marginBottom: 4,
        }}>
          {label}
        </label>
      )}
      <input
        type="text"
        value={value ?? ''}
        placeholder={placeholder}
        onChange={(e) => { onChange(e.target.value); setTouched(true) }}
        onBlur={() => setTouched(true)}
        style={{
          width: '100%', boxSizing: 'border-box',
          padding: '6px 10px', borderRadius: 6, fontSize: 13,
          fontFamily: 'system-ui',
          border: invalid ? '1.5px solid #ef4444' : '1px solid #d1d5db',
          background: invalid ? '#fff5f5' : '#fff',
          outline: 'none',
        }}
      />
      {invalid && (
        <div style={{
          fontSize: 11, color: '#dc2626',
          marginTop: 3, lineHeight: 1.4,
        }}>
          ⚠ Link must start with / (page), # (anchor), or https://
        </div>
      )}
      {!invalid && value && (
        <div style={{ fontSize: 10, color: '#6b7280', marginTop: 2 }}>
          ✓ Valid link
        </div>
      )}
    </div>
  )
}

export const puckConfig: Config<Components> = {
  components: {
    // ── HERO ────────────────────────────────────────────────
    HeroDark: {
      label: 'Hero (Dark)',
      fields: {
        // TASK 1: group dividers for scanability
        _groupCopy:        fieldGroupDivider('— Hero Copy'),
        badge:              { type: 'text', contentEditable: true, label: 'Badge Text' },
        title:              { type: 'text', contentEditable: true, label: 'Headline — First Line' },
        highlightedText:    { type: 'text', contentEditable: true, label: 'Headline — Highlighted Word(s)' },
        description:        richTextField({ label: 'Body Text' }),
        _groupCTA:         fieldGroupDivider('— CTA Buttons'),
        ctaLabel:           { type: 'text', contentEditable: true, label: 'Primary Button Text' },
        ctaHref:            {
          type: 'custom',
          label: 'Primary Button Link',
          render: ({ value, onChange }: { value: string; onChange: (v: string) => void }) => (
            <LinkField value={value ?? ''} onChange={onChange} label="Primary Button Link" placeholder="/signup or #section" />
          ),
        },
        secondaryCtaLabel:  { type: 'text', contentEditable: true, label: 'Secondary Button Text (leave blank to hide)' },
        secondaryCtaHref:   {
          type: 'custom',
          label: 'Secondary Button Link',
          render: ({ value, onChange }: { value: string; onChange: (v: string) => void }) => (
            <LinkField value={value ?? ''} onChange={onChange} label="Secondary Button Link" placeholder="#section or /page (optional)" />
          ),
        },
        _groupBullets:     fieldGroupDivider('— Benefit Bullets'),
        bulletOne:          { type: 'text', contentEditable: true, label: 'First Benefit' },
        bulletTwo:          { type: 'text', contentEditable: true, label: 'Second Benefit' },
        bulletThree:        { type: 'text', contentEditable: true, label: 'Third Benefit' },
        _groupMedia:       fieldGroupDivider('— Media'),
        videoUrl: {
          type: 'custom',
          label: 'YouTube Video URL',
          render: ({ value, onChange, name }: { value: string; onChange: (v: string) => void; name: string }) => {
            // Find the videoThumb sibling value from the parent form — pass through as standalone
            void name
            return <VideoUrlField value={value ?? ''} onChange={onChange} label="YouTube Video URL" />
          },
        },
        videoThumb: {
          type: 'custom',
          label: 'Custom Thumbnail',
          render: ({ value, onChange }: { value: string; onChange: (v: string) => void }) => (
            <ImageUrlField value={value ?? ''} onChange={onChange} label="Custom Thumbnail (optional — overrides auto)" />
          ),
        },
      },
      defaultProps: {
        badge: '✦ Powered by Aurum Ecosystem',
        title: 'Your Money,',
        highlightedText: 'Working 24/7',
        description: 'Start earning with $100 USDT. AutoPilotROI guides you into the Aurum ecosystem step by step — AI trading bot, Visa crypto card, exchange, and Web3 neobank. No experience needed.',
        ctaLabel: 'Start Here →',
        ctaHref: '/signup',
        secondaryCtaLabel: 'See how it works',
        secondaryCtaHref: '#how-it-works',
        bulletOne: 'Start with $100 USDT',
        bulletTwo: 'AI trades 24/7 — you sleep',
        bulletThree: 'Setup complete in 3 days',
        videoUrl: 'https://youtu.be/MmAnR4YAPv4',
        videoThumb: 'https://i.ytimg.com/vi/MmAnR4YAPv4/hqdefault.jpg',
      },
      render: ({ badge, title, highlightedText, description, ctaLabel, ctaHref, secondaryCtaLabel, secondaryCtaHref, bulletOne, bulletTwo, bulletThree, videoUrl, videoThumb }) => {
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

        // Build CTAs: primary always present; ghost CTA only if both label and href are set
        const ctas: { label: string; href: string; variant: 'primary' | 'ghost' }[] = [
          { label: ctaLabel, href: ctaHref, variant: 'primary' },
          ...(secondaryCtaLabel && secondaryCtaHref
            ? [{ label: secondaryCtaLabel, href: secondaryCtaHref, variant: 'ghost' as const }]
            : []),
        ]

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
            ctas={ctas}
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
        eyebrow:      { type: 'text', contentEditable: true, label: 'Eyebrow Label' },
        title:        { type: 'text', contentEditable: true, label: 'Headline' },
        description:  richTextField({ label: 'Body Text' }),
        ctaLabel:     { type: 'text', contentEditable: true, label: 'Button Text (leave blank to hide)' },
        ctaHref:      {
          type: 'custom',
          label: 'Button Link',
          render: ({ value, onChange }: { value: string; onChange: (v: string) => void }) => (
            <LinkField value={value ?? ''} onChange={onChange} label="Button Link (leave blank to hide)" />
          ),
        },
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
        badge:            { type: 'text', contentEditable: true, label: 'Badge Text' },
        title:            { type: 'text', contentEditable: true, label: 'Headline' },
        highlightedText:  { type: 'text', contentEditable: true, label: 'Highlighted Headline Phrase' },
        description1:     richTextField({ label: 'First Paragraph' }),
        description2:     richTextField({ label: 'Second Paragraph (optional)' }),
        cta1Label:        { type: 'text', contentEditable: true, label: 'Primary Button Text' },
        cta1Href:         {
          type: 'custom',
          label: 'Primary Button Link',
          render: ({ value, onChange }: { value: string; onChange: (v: string) => void }) => (
            <LinkField value={value ?? ''} onChange={onChange} label="Primary Button Link" />
          ),
        },
        cta2Label:        { type: 'text', contentEditable: true, label: 'Secondary Button Text (leave blank to hide)' },
        cta2Href:         {
          type: 'custom',
          label: 'Secondary Button Link',
          render: ({ value, onChange }: { value: string; onChange: (v: string) => void }) => (
            <LinkField value={value ?? ''} onChange={onChange} label="Secondary Button Link" />
          ),
        },
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
                <div style={{ fontSize: 'var(--text-body-lg)', color: 'var(--color-text-weak)', lineHeight: 'var(--lh-relaxed)', maxWidth: '44rem', marginBottom: '2rem' }}>
                  {description1}
                </div>
              )}
              {description2 && (
                <div style={{ fontSize: 'var(--text-body-lg)', color: 'var(--color-text-weak)', lineHeight: 'var(--lh-relaxed)', maxWidth: '44rem', marginBottom: '2.5rem' }}>
                  {description2}
                </div>
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
      label: 'Content Section',
      fields: {
        sectionName: {
          type: 'text',
          label: 'Section Name (for your reference)',
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore — non-standard helper text field
          helperText: 'Give this section a name so you can identify it in the editor (e.g. "Stats Bar", "Features", "Testimonials"). This name is not visible to visitors.',
        },
        variant: {
          type: 'select',
          label: 'Background Color',
          options: [
            { label: 'White', value: 'white' },
            { label: 'Light Gray', value: 'surface' },
            { label: 'Blue', value: 'blue' },
            { label: 'Dark Navy', value: 'navy' },
          ],
        },
        padding: {
          type: 'select',
          label: 'Vertical Spacing',
          options: [
            { label: 'Normal', value: 'lg' },
            { label: 'Extra Spacious', value: 'xl' },
            { label: 'None', value: 'none' },
          ],
        },
      },
      defaultProps: {
        sectionName: '',
        variant: 'white',
        padding: 'lg',
      },
      render: ({ variant, padding, puck }) => {
        return (
          <SectionBox variant={variant} padding={padding}>
            {puck.renderDropZone({
              zone: 'content',
      allow: ['SectionHeader', 'FeatureGrid', 'CardGrid', 'StepGroup', 'StatRow', 'CTABand', 'ImageBlock', 'VideoBlock', 'QuoteBlock', 'FaqGroup', 'PricingCard', 'ActivityTicker', 'ModalBlock', 'PopupCTA', 'FormBlock', 'FunnelSteps', 'CTAStrip'],
              minEmptyHeight: 120,
            })}
          </SectionBox>
        )
      },
    },

    // ── FEATURE GRID (wraps FeatureCards in a CSS grid) ────
    FeatureGrid: {
      label: 'Benefits Grid',
      fields: {},
      defaultProps: {},
      render: ({ puck }) => (
        <div className="puck-grid-passthrough" style={{
          display: 'grid',
          gridTemplateColumns: `repeat(auto-fit, minmax(min(100%, 280px), 1fr))`,
          gap: '1.25rem',
        }}>
          {puck.renderDropZone({ zone: 'cards', allow: ['FeatureCard'] })}
        </div>
      ),
    },

    // ── CARD GRID (wraps EcoCards/Testimonials in a grid) ──
    CardGrid: {
      label: 'Card Grid (Products / Testimonials)',
      fields: {},
      defaultProps: {},
      render: ({ puck }) => (
        <div className="puck-grid-passthrough" style={{
          display: 'grid',
          gridTemplateColumns: `repeat(auto-fit, minmax(min(100%, 260px), 1fr))`,
          gap: '1.25rem',
        }}>
          {puck.renderDropZone({ zone: 'cards', allow: ['EcoCard', 'TestimonialCard', 'ProductCard', 'TrustSignalCard'] })}
        </div>
      ),
    },

    // ── STEP GROUP (vertical list of Steps) ────────────────
    StepGroup: {
      label: 'How-It-Works Steps',
      fields: {},
      render: ({ puck }) => (
        <div className="puck-flex-passthrough" style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          {puck.renderDropZone({ zone: 'steps', allow: ['Step'] })}
        </div>
      ),
    },

    // ── SECTION HEADER ─────────────────────────────────────
    SectionHeader: {
      label: 'Section Heading',
      fields: {
        eyebrow:      { type: 'text', contentEditable: true, label: 'Eyebrow Label' },
        title:        { type: 'text', contentEditable: true, label: 'Section Headline' },
        lead:         richTextField({ label: 'Subtitle / Supporting Text' }),
        align:        {
          type: 'select',
          label: 'Text Alignment',
          options: [
            { label: 'Centered', value: 'center' },
            { label: 'Left-aligned', value: 'left' },
          ],
        },
        badgeVariant: {
          type: 'select',
          label: 'Badge Style',
          options: [
            { label: 'Blue (on white background)', value: 'blue' },
            { label: 'White (on dark background)', value: 'white' },
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
      label: 'Statistics Bar',
      fields: {
        stats: {
          type: 'array',
          label: 'Statistics',
          arrayFields: {
            value:  { type: 'number', label: 'Number' },
            suffix: { type: 'text', label: 'Symbol after number (e.g. + or %)' },
            label:  { type: 'text', label: 'Caption below number' },
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
      label: 'Feature / Benefit Card',
      fields: {
        title:       { type: 'text', contentEditable: true, label: 'Card Title' },
        body:        richTextField({ label: 'Card Description' }),
        colorPreset: {
          type: 'select',
          label: 'Icon Color Theme',
          options: ICON_COLOR_OPTIONS,
        },
      },
      defaultProps: {
        title: 'EX-AI Trading Bot',
        body: 'The AI analyzes global crypto markets 24/7, executing trades with precision.',
        colorPreset: 'brand-blue',
      },
      render: ({ title, body, colorPreset }) => {
        const { color, colorBg } = ICON_COLOR_PRESETS[colorPreset] ?? ICON_COLOR_PRESETS['brand-blue']
        return (
          <FeatureCard
            icon={<span style={{ fontSize: '1.5rem' }}>⚡</span>}
            title={title}
            body={body}
            color={color}
            colorBg={colorBg}
          />
        )
      },
    },

    // ── TRUST SIGNAL CARD ──────────────────────────────────
    TrustSignalCard: {
      label: 'Trust Signal Card',
      fields: {
        iconName: {
          type: 'select',
          label: 'Icon',
          options: Object.keys(ICONS).map(k => ({ label: k.replace('Icon', ''), value: k })),
        },
        title:    { type: 'text', contentEditable: true, label: 'Trust Point Headline' },
        body:     richTextField({ label: 'Trust Point Detail' }),
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
          <div style={{ fontSize: 'var(--text-body)', color: 'var(--color-text-weak)', lineHeight: 'var(--lh-relaxed)' }}>
            {body}
          </div>
        </div>
      ),
    },

    // ── PRODUCT CARD ───────────────────────────────────────
    ProductCard: {
      label: 'Product Card (Aurum Suite)',
      fields: {
        productId:   { type: 'text', label: 'Anchor ID (used for #links to this card — no spaces)' },
        name:        { type: 'text', contentEditable: true, label: 'Product Name' },
        tagline:     { type: 'text', contentEditable: true, label: 'Short Tagline' },
        description: richTextField({ label: 'Product Description' }),
        features:    { type: 'array', label: 'Feature Bullet Points', arrayFields: { value: { type: 'text', label: 'Feature' } } },
        badge:       { type: 'text', label: 'Corner Badge Text (e.g. Flagship — leave blank to hide)' },
        badgeColor:  {
          type: 'select',
          label: 'Badge Color',
          options: BADGE_COLOR_OPTIONS,
        },
        iconName: {
          type: 'select',
          label: 'Icon',
          options: Object.keys(ICONS).map(k => ({ label: k.replace('Icon', ''), value: k })),
        },
        image:       { type: 'text', label: 'Product Image URL (leave blank to hide)' },
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
          <div style={{ fontSize: 'var(--text-body)', lineHeight: 1.65, color: 'var(--color-text-weak)', marginBottom: '1.5rem' }}>
            {description}
          </div>
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
      label: 'Ecosystem Product Card',
      fields: {
        title:       { type: 'text', contentEditable: true, label: 'Card Title' },
        description: richTextField({ label: 'Card Description' }),
        tag:         { type: 'text', label: 'Status Badge Text (e.g. LIVE, COMING SOON)' },
        tagColor:    {
          type: 'select',
          label: 'Status Badge Color',
          options: TAG_COLOR_OPTIONS,
        },
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

    // ── TESTIMONIAL CARD (Phase C enhanced) ─────────────────
    TestimonialCard: {
      label: 'Member Testimonial',
      fields: {
        quote:          richTextField({ label: 'Testimonial Quote' }),
        author:         { type: 'text', contentEditable: true, label: 'Member Name' },
        role:           { type: 'text', contentEditable: true, label: 'Title / Description (e.g. Member since 2025)' },
        company:        { type: 'text', contentEditable: true, label: 'Company or Team (optional)' },
        starRating:     {
          type: 'select',
          label: 'Star Rating',
          options: [
            { label: '⭐⭐⭐⭐⭐  (5 stars)', value: '5' },
            { label: '⭐⭐⭐⭐  (4 stars)',  value: '4' },
            { label: '⭐⭐⭐  (3 stars)',   value: '3' },
            { label: 'No stars',             value: '0' },
          ],
        },
        memberInitials: { type: 'text', label: 'Initials (2 letters — fallback if no avatar)' },
        avatarUrl: {
          type: 'custom',
          label: 'Avatar Image (optional)',
          render: ({ value, onChange }: { value: string; onChange: (v: string) => void }) => (
            <ImageUrlField value={value ?? ''} onChange={onChange} label="Avatar Photo (optional — upload or paste URL)" />
          ),
        },
        cardStyle: {
          type: 'select',
          label: 'Card Style',
          options: [
            { label: 'Standard — white card',         value: 'standard'  },
            { label: 'Featured — highlighted border',  value: 'featured'  },
          ],
        },
      },
      defaultProps: {
        quote: 'I was skeptical at first — the results speak for themselves.',
        author: 'Marcus T.',
        role: 'Member since 2025',
        company: '',
        starRating: '5',
        memberInitials: 'MT',
        avatarUrl: '',
        cardStyle: 'standard',
      },
      render: ({ quote, author, role, company, starRating, memberInitials, avatarUrl, cardStyle }) => {
        const stars = parseInt(starRating ?? '5', 10)
        const initials = (memberInitials || author?.[0] || '?').slice(0, 2).toUpperCase()
        const isFeatured = cardStyle === 'featured'
        return (
          <div
            className="reveal"
            style={{
              background: '#ffffff',
              border: isFeatured ? '2px solid #1b61c9' : '1px solid rgba(24,29,38,0.06)',
              borderRadius: '1.25rem',
              padding: '1.75rem',
              boxShadow: isFeatured
                ? '0 8px 32px rgba(27,97,201,0.12)'
                : '0 4px 16px rgba(24,29,38,0.04)',
              position: 'relative',
            }}
          >
            {/* Featured badge */}
            {isFeatured && (
              <div style={{
                position: 'absolute', top: '-0.625rem', left: '1.25rem',
                background: 'linear-gradient(135deg, #1b61c9, #3b82f6)',
                color: '#fff', fontSize: '0.625rem', fontWeight: 700,
                padding: '0.2rem 0.625rem', borderRadius: 99,
                letterSpacing: '0.05em', textTransform: 'uppercase',
              }}>
                ★ Featured
              </div>
            )}

            {/* Star rating */}
            {stars > 0 && (
              <div style={{ display: 'flex', gap: '0.2rem', marginBottom: '0.875rem' }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    width="16" height="16" viewBox="0 0 20 20" fill="currentColor"
                    style={{ color: i < stars ? '#f59e0b' : '#e2e8f0' }}
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            )}

            {/* Quote */}
            <div
              style={{
                fontSize: 'var(--text-body-lg)',
                color: 'rgba(24,29,38,0.85)',
                lineHeight: 1.7,
                marginBottom: '1.25rem',
                fontStyle: 'italic',
              }}
            >
              {quote}
            </div>

            {/* Author row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              {/* Avatar — image or initials fallback */}
              {avatarUrl ? (
                <div style={{
                  width: '2.5rem', height: '2.5rem', borderRadius: '50%',
                  overflow: 'hidden', flexShrink: 0,
                  border: '2px solid rgba(27,97,201,0.15)',
                }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={avatarUrl} alt={author || ''} style={{
                    width: '100%', height: '100%', objectFit: 'cover',
                  }} />
                </div>
              ) : (
                <div
                  style={{
                    width: '2.5rem', height: '2.5rem', borderRadius: '50%',
                    background: 'linear-gradient(135deg, #1b61c9 0%, #254fad 100%)',
                    color: '#ffffff', display: 'flex',
                    alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'var(--font-display)', fontWeight: 700,
                    fontSize: '0.875rem', flexShrink: 0,
                  }}
                >
                  {initials}
                </div>
              )}
              <div>
                <div style={{
                  fontFamily: 'var(--font-display)', fontWeight: 700,
                  color: '#181d26', fontSize: 'var(--text-body)',
                }}>
                  {author}
                </div>
                {(role || company) && (
                  <div style={{ fontSize: 'var(--text-caption)', color: 'rgba(24,29,38,0.55)' }}>
                    {role}{role && company ? ' · ' : ''}{company}
                  </div>
                )}
              </div>
            </div>
          </div>
        )
      },
    },



    // ── STEP ───────────────────────────────────────────────
    Step: {
      label: 'Numbered Step',
      fields: {
        num:   { type: 'text', contentEditable: true, label: 'Step Number' },
        title: { type: 'text', contentEditable: true, label: 'Step Title' },
        body:  richTextField({ label: 'Step Description' }),
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
      label: 'Call-to-Action Banner',
      fields: {
        eyebrow:        { type: 'text', contentEditable: true, label: 'Eyebrow Label' },
        title:          { type: 'text', contentEditable: true, label: 'Headline' },
        description:    richTextField({ label: 'Supporting Text' }),
        ctaLabel:       { type: 'text', contentEditable: true, label: 'Primary Button Text' },
        ctaHref:        {
          type: 'custom',
          label: 'Primary Button Link',
          render: ({ value, onChange }: { value: string; onChange: (v: string) => void }) => (
            <LinkField value={value ?? ''} onChange={onChange} label="Primary Button Link" />
          ),
        },
        secondaryLabel: { type: 'text', contentEditable: true, label: 'Secondary Button Text (leave blank to hide)' },
        secondaryHref:  {
          type: 'custom',
          label: 'Secondary Button Link',
          render: ({ value, onChange }: { value: string; onChange: (v: string) => void }) => (
            <LinkField value={value ?? ''} onChange={onChange} label="Secondary Button Link" />
          ),
        },
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

    // ── FAQ ITEM ───────────────────────────────────────────
    FaqItem: {
      label: 'FAQ — Question & Answer',
      fields: {
        question:      { type: 'text', contentEditable: true, label: 'Question' },
        answer:        richTextField({ label: 'Answer' }),
        openByDefault: {
          type: 'select',
          label: 'Open by default?',
          options: [
            { label: 'Closed (visitor clicks to open)', value: 'no' },
            { label: 'Open on page load',               value: 'yes' },
          ],
        },
      },
      defaultProps: {
        question: 'What is the minimum investment to get started?',
        answer: 'The minimum investment to activate the Aurum AI trading bot is $100 USDT (Tether). You can start with $100 and scale as you become comfortable.',
        openByDefault: 'no',
      },
      render: ({ question, answer, openByDefault }) => (
        <FaqItem
          question={question || ''}
          answer={answer}
          openByDefault={openByDefault === 'yes'}
        />
      ),
    },

    // ── FAQ GROUP ──────────────────────────────────────────
    FaqGroup: {
      label: 'FAQ Section (drag FAQ items inside)',
      fields: {
        groupTitle: {
          type: 'text',
          contentEditable: true,
          label: 'Section Heading (optional — leave blank to hide)',
        },
      },
      defaultProps: {
        groupTitle: '',
      },
      render: ({ groupTitle, puck }) => (
        <FaqGroup groupTitle={groupTitle}>
          {/* TASK 5: subtle dropzone hint wrapper */}
          <div style={{ position: 'relative' }}>
            {puck.renderDropZone({
              zone: 'faqs',
              allow: ['FaqItem'],
            })}
          </div>
        </FaqGroup>
      ),
    },

    // ── VIDEO BLOCK ────────────────────────────────────────
    VideoBlock: {
      label: 'YouTube Video',
      fields: {
        videoUrl: {
          type: 'custom',
          label: 'YouTube Video URL',
          render: ({ value, onChange }: { value: string; onChange: (v: string) => void }) => (
            <VideoUrlField value={value ?? ''} onChange={onChange} label="YouTube Video URL" />
          ),
        },
        caption:     { type: 'text', contentEditable: true, label: 'Caption below video (optional)' },
        displaySize: {
          type: 'select',
          label: 'Display Size',
          options: [
            { label: 'Small  (480px)',     value: 'small'  },
            { label: 'Medium (640px)',     value: 'medium' },
            { label: 'Large  (800px)',     value: 'large'  },
            { label: 'Full Width',         value: 'full'   },
          ],
        },
      },
      defaultProps: {
        videoUrl: 'https://youtu.be/MmAnR4YAPv4',
        caption: '',
        displaySize: 'medium',
      },
      render: ({ videoUrl, caption, displaySize }) => (
        <VideoBlock
          videoUrl={videoUrl || ''}
          caption={caption || ''}
          displaySize={displaySize}
        />
      ),
    },

    // ── QUOTE BLOCK ────────────────────────────────────────
    QuoteBlock: {
      label: 'Pull Quote',
      fields: {
        quote:           richTextField({ label: 'Quote Text' }),
        attribution:     { type: 'text', contentEditable: true, label: 'Who Said It (optional)' },
        attributionRole: { type: 'text', contentEditable: true, label: 'Their Title or Role (optional)' },
        quoteStyle:      {
          type: 'select',
          label: 'Quote Style',
          options: [
            { label: 'Centered — large display quote', value: 'centered' },
            { label: 'Left-aligned callout bar',       value: 'left'     },
          ],
        },
        accentColor: {
          type: 'select',
          label: 'Accent Color',
          options: [
            { label: 'Brand Blue',    value: 'brand-blue' },
            { label: 'Emerald Green', value: 'emerald'    },
            { label: 'Amber Gold',    value: 'amber'      },
            { label: 'Dark Navy',     value: 'navy'       },
            { label: 'Slate Gray',    value: 'slate'      },
          ],
        },
      },
      defaultProps: {
        quote: 'The AutoPilotROI onboarding process made everything approachable — I was set up within 48 hours.',
        attribution: 'Michael R.',
        attributionRole: 'Member since 2024',
        quoteStyle: 'centered',
        accentColor: 'brand-blue',
      },
      render: ({ quote, attribution, attributionRole, quoteStyle, accentColor }) => (
        <QuoteBlock
          quote={quote}
          attribution={attribution || ''}
          attributionRole={attributionRole || ''}
          style={quoteStyle}
          accentColor={accentColor}
        />
      ),
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

    // ── PRICING CARD (Phase D enhanced) ─────────────────────
    PricingCard: {
      label: 'Pricing / Offer Card',
      fields: {
        _groupPlan:  fieldGroupDivider('— Plan Details'),
        planName:    { type: 'text', contentEditable: true, label: 'Plan Name (e.g. Starter, Advanced)' },
        planTagline: { type: 'text', contentEditable: true, label: 'Short Description' },
        priceDisplay:{ type: 'text', contentEditable: true, label: 'Price Text (e.g. $100 USDT minimum)' },
        _groupFeatures: fieldGroupDivider('— Features'),
        feature1:    { type: 'text', contentEditable: true, label: 'Feature 1 (leave blank to hide)' },
        feature2:    { type: 'text', contentEditable: true, label: 'Feature 2 (leave blank to hide)' },
        feature3:    { type: 'text', contentEditable: true, label: 'Feature 3 (leave blank to hide)' },
        feature4:    { type: 'text', contentEditable: true, label: 'Feature 4 (leave blank to hide)' },
        feature5:    { type: 'text', contentEditable: true, label: 'Feature 5 (leave blank to hide)' },
        feature6:    { type: 'text', contentEditable: true, label: 'Feature 6 (leave blank to hide)' },
        feature7:    { type: 'text', contentEditable: true, label: 'Feature 7 (leave blank to hide)' },
        feature8:    { type: 'text', contentEditable: true, label: 'Feature 8 (leave blank to hide)' },
        _groupCTA:   fieldGroupDivider('— CTA & Badges'),
        ctaLabel:    { type: 'text', contentEditable: true, label: 'Button Text' },
        ctaHref:     {
          type: 'custom',
          label: 'Button Destination',
          render: ({ value, onChange }: { value: string; onChange: (v: string) => void }) => (
            <LinkField value={value ?? ''} onChange={onChange} label="Button Destination" placeholder="/signup" />
          ),
        },
        badge:       { type: 'text', contentEditable: true, label: 'Highlight Badge (e.g. Most Popular — leave blank to hide)' },
        guaranteeBadge: { type: 'text', contentEditable: true, label: 'Guarantee Text (e.g. 30-day money-back guarantee — leave blank to hide)' },
        countdownText: { type: 'text', contentEditable: true, label: 'Urgency Text (e.g. Offer expires June 30 — STATIC display only, leave blank to hide)' },
        cardStyle:   {
          type: 'select',
          label: 'Card Style',
          options: [
            { label: 'Standard — white card',         value: 'standard'  },
            { label: 'Featured — premium dark blue',   value: 'featured'  },
          ],
        },
      },
      defaultProps: {
        planName:    'Starter',
        planTagline: 'Perfect for first-time investors exploring the Aurum ecosystem.',
        priceDisplay:'$100 USDT minimum',
        feature1:    'Activate the EX-AI Trading Bot',
        feature2:    'AI-managed 24/7 portfolio',
        feature3:    'Access to Aurum University training',
        feature4:    'Dedicated partner support',
        feature5:    '',
        feature6:    '',
        feature7:    '',
        feature8:    '',
        ctaLabel:    'Get Started →',
        ctaHref:     '/signup',
        badge:       '',
        guaranteeBadge: '',
        countdownText: '',
        cardStyle:   'standard',
      },
      render: ({ planName, planTagline, priceDisplay, feature1, feature2, feature3,
                 feature4, feature5, feature6, feature7, feature8,
                 ctaLabel, ctaHref, badge, guaranteeBadge, countdownText, cardStyle }) => {
        const features = [feature1, feature2, feature3, feature4, feature5, feature6, feature7, feature8]
          .filter(Boolean)
          .map(text => ({ text }))
        return (
          <div>
            <PricingCard
              planName={planName || ''}
              planTagline={planTagline || ''}
              priceDisplay={priceDisplay || ''}
              features={features}
              ctaLabel={ctaLabel || ''}
              ctaHref={ctaHref || '/signup'}
              badge={badge || ''}
              variant={cardStyle}
            />
            {/* Phase D: Guarantee badge */}
            {guaranteeBadge && (
              <div style={{
                textAlign: 'center', marginTop: '0.75rem',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.375rem',
              }}>
                <span style={{ fontSize: '1rem' }}>🛡️</span>
                <span style={{
                  fontSize: '0.75rem', fontWeight: 600,
                  color: '#059669', fontFamily: 'system-ui',
                }}>
                  {guaranteeBadge}
                </span>
              </div>
            )}
            {/* Phase D: Static countdown/urgency text */}
            {countdownText && (
              <div style={{
                textAlign: 'center', marginTop: '0.5rem',
                background: '#fef3c7', border: '1px solid #fde68a',
                borderRadius: '0.5rem', padding: '0.375rem 0.75rem',
              }}>
                <span style={{
                  fontSize: '0.6875rem', fontWeight: 600,
                  color: '#92400e', fontFamily: 'system-ui',
                }}>
                  ⏰ {countdownText}
                </span>
              </div>
            )}
          </div>
        )
      },
    },

    // ── ACTIVITY TICKER ────────────────────────────────────
    ActivityTicker: {
      label: 'Live Activity Feed',
      fields: {
        message1: { type: 'text', contentEditable: true, label: 'Message 1' },
        message2: { type: 'text', contentEditable: true, label: 'Message 2' },
        message3: { type: 'text', contentEditable: true, label: 'Message 3' },
        message4: { type: 'text', contentEditable: true, label: 'Message 4 (optional — leave blank to hide)' },
        message5: { type: 'text', contentEditable: true, label: 'Message 5 (optional — leave blank to hide)' },
        speed: {
          type: 'select',
          label: 'Rotation Speed',
          options: [
            { label: 'Slow   — one new message every 6 seconds',   value: 'slow'   },
            { label: 'Normal — one new message every 4 seconds',   value: 'normal' },
            { label: 'Fast   — one new message every 2.5 seconds', value: 'fast'   },
          ],
        },
        theme: {
          type: 'select',
          label: 'Color Theme',
          options: [
            { label: 'Emerald Green — live activity feel', value: 'emerald' },
            { label: 'Brand Blue — authority signal',      value: 'blue'    },
            { label: 'Neutral Gray — minimal',             value: 'neutral' },
          ],
        },
      },
      defaultProps: {
        message1: 'A new member just completed their readiness assessment',
        message2: 'Someone started the onboarding process this morning',
        message3: 'A partner was just notified of a new qualified lead',
        message4: 'A member activated the EX-AI Bot today',
        message5: 'Someone completed all onboarding steps',
        speed:    'normal',
        theme:    'emerald',
      },
      render: ({ message1, message2, message3, message4, message5, speed, theme }) => {
        const messages = [message1, message2, message3, message4, message5].filter(Boolean)
        return (
          <ActivityTicker
            messages={messages}
            speed={speed}
            theme={theme}
          />
        )
      },
    },

    // ── IMAGE BLOCK ────────────────────────────────────────
    ImageBlock: {
      label: 'Image Block',
      fields: {
        src: {
          type: 'custom',
          label: 'Image URL',
          render: ({ value, onChange }: { value: string; onChange: (v: string) => void }) => (
            <ImageUrlField value={value ?? ''} onChange={onChange} label="Image URL" />
          ),
        },
        alt:          { type: 'text', label: 'Alt Text (required for accessibility)' },
        maxWidth:     { type: 'number', label: 'Max Width (px)', min: 100, max: 1400 },
        borderRadius: { type: 'number', label: 'Corner Rounding (px)', min: 0, max: 50 },
      },
      defaultProps: {
        src: '',
        alt: 'Image',
        maxWidth: 800,
        borderRadius: 12,
      },
      render: ({ src, alt, maxWidth, borderRadius }) => {
        // PHASE D: Broken image detection
        const [broken, setBroken] = useState(false)
        // Reset broken state when src changes
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const prevSrc = useRef(src)
        if (prevSrc.current !== src) {
          prevSrc.current = src
          if (broken) setBroken(false)
        }

        if (!src) {
          return (
            <div style={{
              padding: '3rem 2rem',
              textAlign: 'center',
              background: '#f8fafc',
              borderRadius: `${borderRadius}px`,
              color: '#64748b',
              border: '2px dashed #cbd5e1',
            }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>🖼️</div>
              <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>No image set</div>
              <div style={{ fontSize: 12, color: '#94a3b8' }}>Paste an image URL in the right panel →</div>
            </div>
          )
        }

        if (broken) {
          return (
            <div style={{
              padding: '2.5rem 2rem',
              textAlign: 'center',
              background: '#fff5f5',
              borderRadius: `${borderRadius}px`,
              color: '#dc2626',
              border: '2px dashed #fca5a5',
            }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>⚠️</div>
              <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>Image failed to load</div>
              <div style={{ fontSize: 12, color: '#6b7280', wordBreak: 'break-all' }}>{src}</div>
              <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 6 }}>Check the URL is correct and publicly accessible</div>
            </div>
          )
        }

        return (
          <div style={{ maxWidth: `${maxWidth}px`, margin: '0 auto' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={alt}
              onError={() => setBroken(true)}
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: `${borderRadius}px`,
                display: 'block',
              }}
            />
          </div>
        )
      },
    },

    // ── MODAL BLOCK ──────────────────────────────────────────
    ModalBlock: {
      label: 'Modal / Popup Trigger',
      fields: {
        triggerLabel:   { type: 'text', contentEditable: true, label: 'Trigger Button Text' },
        modalTitle:     { type: 'text', contentEditable: true, label: 'Modal Title' },
        modalBody:      richTextField({ label: 'Modal Body Text' }),
        ctaLabel:       { type: 'text', contentEditable: true, label: 'CTA Button Text (leave blank to hide)' },
        ctaHref:        {
          type: 'custom',
          label: 'CTA Button Link',
          render: ({ value, onChange }: { value: string; onChange: (v: string) => void }) => (
            <LinkField value={value ?? ''} onChange={onChange} label="CTA Button Link" />
          ),
        },
        mediaType: {
          type: 'select',
          label: 'Media Type',
          options: [
            { label: 'None',     value: 'none' },
            { label: 'Image',    value: 'image' },
            { label: 'YouTube',  value: 'video' },
          ],
        },
        mediaUrl: {
          type: 'custom',
          label: 'Media URL',
          render: ({ value, onChange }: { value: string; onChange: (v: string) => void }) => (
            <ImageUrlField value={value ?? ''} onChange={onChange} label="Image or YouTube URL" />
          ),
        },
      },
      defaultProps: {
        triggerLabel: 'Learn More →',
        modalTitle: 'How AutoPilotROI Works',
        modalBody: 'AutoPilotROI connects you to the Aurum ecosystem with guided onboarding, AI-managed trading, and full support.',
        ctaLabel: 'Get Started →',
        ctaHref: '/signup',
        mediaUrl: '',
        mediaType: 'none',
      },
      render: ({ triggerLabel, modalTitle, modalBody, ctaLabel, ctaHref, mediaUrl, mediaType }) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [open, setOpen] = useState(false)

        // Extract YouTube ID for embed
        const ytMatch = mediaUrl?.match(/(?:youtu\.be\/|[?&]v=|\/embed\/)([a-zA-Z0-9_-]{11})/)
        const ytId = ytMatch?.[1]

        return (
          <>
            {/* Trigger button */}
            <button
              type="button"
              onClick={() => setOpen(true)}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.75rem 1.5rem', borderRadius: '0.625rem',
                border: '2px solid #1b61c9', background: 'transparent',
                color: '#1b61c9', fontSize: '1rem', fontWeight: 600,
                fontFamily: 'inherit', cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {triggerLabel}
            </button>

            {/* Modal overlay */}
            {open && (
              <div
                onClick={() => setOpen(false)}
                style={{
                  position: 'fixed', inset: 0, zIndex: 999999,
                  background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  padding: '1rem',
                  animation: 'fadeIn 0.2s ease',
                }}
              >
                <div
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    background: '#fff', borderRadius: '1rem',
                    maxWidth: '560px', width: '100%',
                    maxHeight: '85vh', overflow: 'auto',
                    boxShadow: '0 24px 64px rgba(0,0,0,0.2)',
                    animation: 'slideUp 0.25s ease',
                  }}
                >
                  {/* Header */}
                  <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '1.25rem 1.5rem', borderBottom: '1px solid #f1f5f9',
                  }}>
                    <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: 700, color: '#111827' }}>
                      {modalTitle}
                    </h3>
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      style={{
                        width: 32, height: 32, borderRadius: '50%',
                        border: 'none', background: '#f1f5f9',
                        fontSize: 16, cursor: 'pointer', color: '#64748b',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}
                    >
                      ✕
                    </button>
                  </div>

                  {/* Media */}
                  {mediaType === 'image' && mediaUrl && (
                    <div style={{ padding: '0 1.5rem' }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={mediaUrl} alt="" style={{
                        width: '100%', borderRadius: '0.5rem', marginTop: '0.75rem',
                      }} />
                    </div>
                  )}
                  {mediaType === 'video' && ytId && (
                    <div style={{ padding: '0 1.5rem', marginTop: '0.75rem' }}>
                      <div style={{ position: 'relative', paddingBottom: '56.25%', borderRadius: '0.5rem', overflow: 'hidden' }}>
                        <iframe
                          src={`https://www.youtube.com/embed/${ytId}?autoplay=0`}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Body */}
                  <div style={{
                    padding: '1.25rem 1.5rem',
                    fontSize: '0.9375rem', color: '#374151', lineHeight: 1.7,
                  }}>
                    {typeof modalBody === 'string'
                      ? <p style={{ margin: 0 }}>{modalBody}</p>
                      : <div dangerouslySetInnerHTML={{ __html: modalBody as unknown as string }} />
                    }
                  </div>

                  {/* CTA */}
                  {ctaLabel && ctaHref && (
                    <div style={{ padding: '0 1.5rem 1.5rem', display: 'flex', justifyContent: 'center' }}>
                      <a
                        href={ctaHref}
                        style={{
                          display: 'inline-flex', alignItems: 'center',
                          padding: '0.75rem 2rem', borderRadius: '0.625rem',
                          background: 'linear-gradient(135deg, #1b61c9 0%, #3b82f6 100%)',
                          color: '#fff', fontSize: '1rem', fontWeight: 600,
                          textDecoration: 'none', boxShadow: '0 4px 16px rgba(27,97,201,0.3)',
                        }}
                      >
                        {ctaLabel}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        )
      },
    },

    // ── POPUP CTA ──────────────────────────────────────────────
    PopupCTA: {
      label: 'Popup CTA Banner',
      fields: {
        headline:     { type: 'text', contentEditable: true, label: 'Headline' },
        body:         richTextField({ label: 'Body Text' }),
        ctaLabel:     { type: 'text', contentEditable: true, label: 'CTA Button Text' },
        ctaHref:      {
          type: 'custom',
          label: 'CTA Button Link',
          render: ({ value, onChange }: { value: string; onChange: (v: string) => void }) => (
            <LinkField value={value ?? ''} onChange={onChange} label="CTA Button Link" />
          ),
        },
        style: {
          type: 'select',
          label: 'Display Style',
          options: [
            { label: 'Centered Modal',   value: 'modal'  },
            { label: 'Slide-up Banner',  value: 'banner' },
          ],
        },
      },
      defaultProps: {
        headline: 'Ready to Start?',
        body: 'Join thousands of members who activated the EX-AI Bot and started growing their portfolio on autopilot.',
        ctaLabel: 'Begin Onboarding →',
        ctaHref: '/signup',
        style: 'banner',
      },
      render: ({ headline, body, ctaLabel, ctaHref, style: displayStyle }) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [visible, setVisible] = useState(false)

        if (displayStyle === 'banner') {
          return (
            <div style={{ position: 'relative' }}>
              {/* Trigger */}
              {!visible && (
                <button
                  type="button"
                  onClick={() => setVisible(true)}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.375rem',
                    padding: '0.5rem 1rem', borderRadius: '0.5rem',
                    border: '1.5px solid #10b981', background: '#ecfdf5',
                    color: '#065f46', fontSize: '0.875rem', fontWeight: 600,
                    cursor: 'pointer', fontFamily: 'inherit',
                  }}
                >
                  📢 Show Banner Preview
                </button>
              )}

              {/* Banner */}
              {visible && (
                <div style={{
                  background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                  borderRadius: '0.75rem', padding: '1.25rem 1.5rem',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  gap: '1rem', flexWrap: 'wrap',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
                  animation: 'slideUp 0.3s ease',
                }}>
                  <div style={{ flex: 1, minWidth: '200px' }}>
                    <div style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: '0.25rem' }}>
                      {headline}
                    </div>
                    <div style={{ fontSize: '0.8125rem', color: '#94a3b8', lineHeight: 1.5 }}>
                      {typeof body === 'string' ? body : ''}
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
                    <a
                      href={ctaHref}
                      style={{
                        display: 'inline-flex', padding: '0.625rem 1.25rem',
                        borderRadius: '0.5rem',
                        background: 'linear-gradient(135deg, #10b981, #34d399)',
                        color: '#fff', fontSize: '0.875rem', fontWeight: 600,
                        textDecoration: 'none', whiteSpace: 'nowrap',
                      }}
                    >
                      {ctaLabel}
                    </a>
                    <button
                      type="button"
                      onClick={() => setVisible(false)}
                      style={{
                        width: 28, height: 28, borderRadius: '50%',
                        border: '1px solid rgba(255,255,255,0.15)',
                        background: 'rgba(255,255,255,0.08)',
                        color: '#94a3b8', fontSize: 14, cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}
                    >
                      ✕
                    </button>
                  </div>
                </div>
              )}
            </div>
          )
        }

        // Modal style
        return (
          <div style={{ position: 'relative' }}>
            <button
              type="button"
              onClick={() => setVisible(true)}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.375rem',
                padding: '0.5rem 1rem', borderRadius: '0.5rem',
                border: '1.5px solid #8b5cf6', background: '#f5f3ff',
                color: '#5b21b6', fontSize: '0.875rem', fontWeight: 600,
                cursor: 'pointer', fontFamily: 'inherit',
              }}
            >
              📢 Show Popup Preview
            </button>

            {visible && (
              <div
                onClick={() => setVisible(false)}
                style={{
                  position: 'fixed', inset: 0, zIndex: 999999,
                  background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  padding: '1rem',
                  animation: 'fadeIn 0.2s ease',
                }}
              >
                <div
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                    borderRadius: '1rem', maxWidth: '480px', width: '100%',
                    padding: '2rem', textAlign: 'center',
                    boxShadow: '0 24px 64px rgba(0,0,0,0.3)',
                    animation: 'slideUp 0.25s ease',
                  }}
                >
                  <h3 style={{
                    margin: '0 0 0.75rem', fontSize: '1.25rem', fontWeight: 700,
                    color: '#fff',
                  }}>
                    {headline}
                  </h3>
                  <div style={{
                    fontSize: '0.9375rem', color: '#94a3b8',
                    lineHeight: 1.6, marginBottom: '1.25rem',
                  }}>
                    {typeof body === 'string' ? body : ''}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem' }}>
                    <a
                      href={ctaHref}
                      style={{
                        display: 'inline-flex', padding: '0.75rem 1.5rem',
                        borderRadius: '0.625rem',
                        background: 'linear-gradient(135deg, #10b981, #34d399)',
                        color: '#fff', fontSize: '1rem', fontWeight: 600,
                        textDecoration: 'none',
                        boxShadow: '0 4px 16px rgba(16,185,129,0.3)',
                      }}
                    >
                      {ctaLabel}
                    </a>
                    <button
                      type="button"
                      onClick={() => setVisible(false)}
                      style={{
                        padding: '0.75rem 1rem', borderRadius: '0.625rem',
                        border: '1px solid rgba(255,255,255,0.15)',
                        background: 'transparent', color: '#94a3b8',
                        fontSize: '0.875rem', cursor: 'pointer',
                        fontFamily: 'inherit',
                      }}
                    >
                      Maybe Later
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )
      },
    },

    // ── FORM BLOCK (Phase A — Lead Capture) ──────────────────
    FormBlock: {
      label: 'Lead Capture Form',
      fields: {
        formTitle:        { type: 'text', contentEditable: true, label: 'Form Title' },
        formDescription:  { type: 'text', contentEditable: true, label: 'Form Description (optional)' },
        nameLabel:        { type: 'text', label: 'Name Field Label' },
        namePlaceholder:  { type: 'text', label: 'Name Placeholder' },
        emailLabel:       { type: 'text', label: 'Email Field Label' },
        emailPlaceholder: { type: 'text', label: 'Email Placeholder' },
        showMessage: {
          type: 'select',
          label: 'Show Message Field?',
          options: [
            { label: 'No — name + email only', value: 'no'  },
            { label: 'Yes — add a message textarea', value: 'yes' },
          ],
        },
        messageLabel:       { type: 'text', label: 'Message Field Label' },
        messagePlaceholder: { type: 'text', label: 'Message Placeholder' },
        submitLabel:       { type: 'text', contentEditable: true, label: 'Submit Button Text' },
        successMessage:    { type: 'text', label: 'Success Message (shown after submit)' },
        formStyle: {
          type: 'select',
          label: 'Form Style',
          options: [
            { label: 'Card — standalone white card', value: 'card' },
            { label: 'Inline — no card wrapper',     value: 'inline' },
          ],
        },
      },
      defaultProps: {
        formTitle: 'Start Your Journey',
        formDescription: 'Enter your details and we will guide you through the next steps.',
        nameLabel: 'Full Name',
        namePlaceholder: 'John Smith',
        emailLabel: 'Email Address',
        emailPlaceholder: 'john@example.com',
        showMessage: 'no',
        messageLabel: 'Message',
        messagePlaceholder: 'Tell us about your goals...',
        submitLabel: 'Get Started →',
        successMessage: 'Thank you! We will be in touch shortly.',
        formStyle: 'card',
      },
      render: ({ formTitle, formDescription, nameLabel, namePlaceholder,
                 emailLabel, emailPlaceholder, showMessage, messageLabel,
                 messagePlaceholder, submitLabel, successMessage, formStyle }) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [submitted, setSubmitted] = useState(false)
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [submitting, setSubmitting] = useState(false)
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [error, setError] = useState('')
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [nameVal, setNameVal] = useState('')
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [emailVal, setEmailVal] = useState('')
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [msgVal, setMsgVal] = useState('')

        async function handleSubmit(e: React.FormEvent) {
          e.preventDefault()
          if (submitting) return
          setSubmitting(true)
          setError('')

          // Basic client-side email validation
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
          if (!emailRegex.test(emailVal.trim())) {
            setError('Please enter a valid email address.')
            setSubmitting(false)
            return
          }

          try {
            const res = await fetch('/api/leads', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                name: nameVal.trim(),
                email: emailVal.trim().toLowerCase(),
                ...(showMessage === 'yes' && msgVal.trim() ? { message: msgVal.trim() } : {}),
              }),
            })

            const data = await res.json()

            if (!res.ok) {
              setError(data.error || 'Something went wrong. Please try again.')
              setSubmitting(false)
              return
            }

            setSubmitting(false)
            setSubmitted(true)
          } catch {
            setError('Network error. Please check your connection and try again.')
            setSubmitting(false)
          }
        }

        const inputStyle: React.CSSProperties = {
          width: '100%', boxSizing: 'border-box',
          padding: '0.75rem 1rem', borderRadius: '0.625rem',
          border: '1.5px solid #e2e8f0', fontSize: '0.9375rem',
          fontFamily: 'inherit', color: '#111827',
          background: '#fff', outline: 'none',
          transition: 'border-color 0.15s ease',
        }

        const labelStyle: React.CSSProperties = {
          fontSize: '0.8125rem', fontWeight: 600,
          color: '#374151', display: 'block', marginBottom: '0.375rem',
        }

        const formContent = submitted ? (
          <div style={{
            textAlign: 'center', padding: '2rem',
            animation: 'fadeIn 0.3s ease',
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>✅</div>
            <div style={{
              fontSize: '1rem', color: '#059669', fontWeight: 600,
              marginBottom: '0.5rem',
            }}>
              {successMessage}
            </div>
            <div style={{ fontSize: '0.8125rem', color: '#6b7280' }}>
              We received your information and will follow up soon.
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {formTitle && (
              <h3 style={{
                margin: 0, fontSize: '1.25rem', fontWeight: 700,
                color: '#111827', fontFamily: 'var(--font-display)',
              }}>
                {formTitle}
              </h3>
            )}
            {formDescription && (
              <p style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280', lineHeight: 1.5 }}>
                {formDescription}
              </p>
            )}

            <div>
              <label style={labelStyle}>{nameLabel}</label>
              <input
                type="text"
                placeholder={namePlaceholder}
                required
                value={nameVal}
                onChange={(e) => setNameVal(e.target.value)}
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>{emailLabel}</label>
              <input
                type="email"
                placeholder={emailPlaceholder}
                required
                value={emailVal}
                onChange={(e) => setEmailVal(e.target.value)}
                style={inputStyle}
              />
            </div>

            {showMessage === 'yes' && (
              <div>
                <label style={labelStyle}>{messageLabel}</label>
                <textarea
                  placeholder={messagePlaceholder}
                  rows={3}
                  value={msgVal}
                  onChange={(e) => setMsgVal(e.target.value)}
                  style={{ ...inputStyle, resize: 'vertical' as const, minHeight: '4.5rem' }}
                />
              </div>
            )}

            {error && (
              <div style={{
                fontSize: '0.75rem', color: '#dc2626', fontWeight: 500,
                padding: '0.5rem 0.75rem', borderRadius: '0.375rem',
                background: '#fef2f2', border: '1px solid #fecaca',
              }}>
                ⚠ {error}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              style={{
                padding: '0.875rem 1.5rem', borderRadius: '0.625rem',
                border: 'none', fontSize: '1rem', fontWeight: 600,
                fontFamily: 'inherit', cursor: submitting ? 'not-allowed' : 'pointer',
                background: submitting
                  ? '#94a3b8'
                  : 'linear-gradient(135deg, #1b61c9 0%, #3b82f6 100%)',
                color: '#fff',
                boxShadow: '0 4px 16px rgba(27,97,201,0.25)',
                transition: 'all 0.2s ease',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
              }}
            >
              {submitting && (
                <span style={{
                  width: 14, height: 14,
                  border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff',
                  borderRadius: '50%', display: 'inline-block',
                  animation: 'spin 0.7s linear infinite',
                }} />
              )}
              {submitting ? 'Submitting...' : submitLabel}
            </button>
          </form>
        )

        if (formStyle === 'card') {
          return (
            <div style={{
              background: '#fff', borderRadius: '1rem',
              border: '1px solid rgba(24,29,38,0.06)',
              padding: '2rem',
              boxShadow: '0 4px 24px rgba(24,29,38,0.06)',
              maxWidth: '480px', margin: '0 auto',
            }}>
              {formContent}
            </div>
          )
        }

        return <div style={{ maxWidth: '480px', margin: '0 auto' }}>{formContent}</div>
      },
    },

    // ── FUNNEL STEPS (Phase B — Multi-step Process) ──────────
    FunnelSteps: {
      label: 'Funnel / Process Steps',
      fields: {
        stepTitle1: { type: 'text', contentEditable: true, label: 'Step 1 Title' },
        stepBody1:  { type: 'text', contentEditable: true, label: 'Step 1 Description' },
        stepTitle2: { type: 'text', contentEditable: true, label: 'Step 2 Title' },
        stepBody2:  { type: 'text', contentEditable: true, label: 'Step 2 Description' },
        stepTitle3: { type: 'text', contentEditable: true, label: 'Step 3 Title' },
        stepBody3:  { type: 'text', contentEditable: true, label: 'Step 3 Description' },
        stepTitle4: { type: 'text', contentEditable: true, label: 'Step 4 Title (leave blank to skip)' },
        stepBody4:  { type: 'text', contentEditable: true, label: 'Step 4 Description' },
        ctaLabel:   { type: 'text', contentEditable: true, label: 'CTA Button Text' },
        ctaHref:    {
          type: 'custom',
          label: 'CTA Button Link',
          render: ({ value, onChange }: { value: string; onChange: (v: string) => void }) => (
            <LinkField value={value ?? ''} onChange={onChange} label="CTA Button Link" />
          ),
        },
        style: {
          type: 'select',
          label: 'Layout Style',
          options: [
            { label: 'Horizontal — side by side',  value: 'horizontal' },
            { label: 'Vertical — stacked timeline', value: 'vertical'  },
          ],
        },
      },
      defaultProps: {
        stepTitle1: 'Complete Your Assessment',
        stepBody1: 'Answer a few questions about your financial goals and experience level.',
        stepTitle2: 'Set Up Your Wallet',
        stepBody2: 'Follow our guided setup to configure your USDT wallet securely.',
        stepTitle3: 'Activate the EX-AI Bot',
        stepBody3: 'Connect to the Aurum ecosystem and let AI manage your portfolio 24/7.',
        stepTitle4: '',
        stepBody4: '',
        ctaLabel: 'Start Now →',
        ctaHref: '/onboarding',
        style: 'horizontal',
      },
      render: ({ stepTitle1, stepBody1, stepTitle2, stepBody2, stepTitle3, stepBody3,
                 stepTitle4, stepBody4, ctaLabel, ctaHref, style: layoutStyle }) => {
        const steps = [
          { title: stepTitle1, body: stepBody1 },
          { title: stepTitle2, body: stepBody2 },
          { title: stepTitle3, body: stepBody3 },
          ...(stepTitle4 ? [{ title: stepTitle4, body: stepBody4 }] : []),
        ].filter(s => s.title)

        const isHorizontal = layoutStyle === 'horizontal'

        return (
          <div>
            <div style={{
              display: isHorizontal ? 'grid' : 'flex',
              gridTemplateColumns: isHorizontal ? `repeat(${Math.min(steps.length, 4)}, 1fr)` : undefined,
              flexDirection: isHorizontal ? undefined : 'column',
              gap: isHorizontal ? '1.5rem' : '0',
            }}>
              {steps.map((step, i) => (
                <div key={i} style={{
                  display: 'flex',
                  flexDirection: isHorizontal ? 'column' : 'row',
                  alignItems: isHorizontal ? 'center' : 'flex-start',
                  textAlign: isHorizontal ? 'center' : 'left',
                  gap: isHorizontal ? '0.75rem' : '1rem',
                  padding: isHorizontal ? '0' : '1.25rem 0',
                  borderBottom: !isHorizontal && i < steps.length - 1 ? '1px solid rgba(24,29,38,0.06)' : 'none',
                }}>
                  {/* Step number circle */}
                  <div style={{
                    width: '2.5rem', height: '2.5rem', borderRadius: '50%',
                    background: 'linear-gradient(135deg, #1b61c9, #3b82f6)',
                    color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 700, fontSize: '1rem', flexShrink: 0,
                    fontFamily: 'var(--font-display)',
                    boxShadow: '0 2px 8px rgba(27,97,201,0.25)',
                  }}>
                    {i + 1}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontWeight: 700, fontSize: '1rem', color: '#111827',
                      fontFamily: 'var(--font-display)', marginBottom: '0.25rem',
                    }}>
                      {step.title}
                    </div>
                    {step.body && (
                      <div style={{
                        fontSize: '0.875rem', color: '#6b7280', lineHeight: 1.5,
                      }}>
                        {step.body}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            {ctaLabel && ctaHref && (
              <div style={{
                textAlign: 'center', marginTop: '1.5rem',
              }}>
                <a
                  href={ctaHref}
                  style={{
                    display: 'inline-flex', alignItems: 'center',
                    padding: '0.75rem 2rem', borderRadius: '0.625rem',
                    background: 'linear-gradient(135deg, #1b61c9 0%, #3b82f6 100%)',
                    color: '#fff', fontSize: '1rem', fontWeight: 600,
                    textDecoration: 'none', boxShadow: '0 4px 16px rgba(27,97,201,0.3)',
                  }}
                >
                  {ctaLabel}
                </a>
              </div>
            )}
          </div>
        )
      },
    },

    // ── CTA STRIP (Phase E — Campaign-specific CTA variants) ─
    CTAStrip: {
      label: 'Campaign CTA Strip',
      fields: {
        eyebrow:   { type: 'text', contentEditable: true, label: 'Eyebrow Text (small label above headline)' },
        headline:  { type: 'text', contentEditable: true, label: 'Headline' },
        body:      { type: 'text', contentEditable: true, label: 'Body Text' },
        ctaLabel:  { type: 'text', contentEditable: true, label: 'Button Text' },
        ctaHref:   {
          type: 'custom',
          label: 'Button Link',
          render: ({ value, onChange }: { value: string; onChange: (v: string) => void }) => (
            <LinkField value={value ?? ''} onChange={onChange} label="Button Link" />
          ),
        },
        variant: {
          type: 'select',
          label: 'CTA Style',
          options: [
            { label: '🚀 Onboarding — blue gradient',     value: 'onboarding'  },
            { label: '🎬 Webinar — dark navy',             value: 'webinar'     },
            { label: '🛡️ Trust — emerald accent',           value: 'trust'       },
            { label: '⏰ Urgency — amber warning',          value: 'urgency'     },
            { label: '📥 Lead Magnet — violet accent',      value: 'lead-magnet' },
          ],
        },
      },
      defaultProps: {
        eyebrow: 'Limited Time',
        headline: 'Ready to Activate Your Portfolio?',
        body: 'Join thousands of members who trust AutoPilotROI to manage their investments with AI-powered precision.',
        ctaLabel: 'Start Onboarding →',
        ctaHref: '/signup',
        variant: 'onboarding',
      },
      render: ({ eyebrow, headline, body, ctaLabel, ctaHref, variant }) => {
        const variantStyles: Record<string, { bg: string; accent: string; btnBg: string; text: string; eyebrowColor: string }> = {
          onboarding: {
            bg: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)',
            accent: '#3b82f6', btnBg: 'linear-gradient(135deg, #1b61c9, #3b82f6)',
            text: '#e2e8f0', eyebrowColor: '#60a5fa',
          },
          webinar: {
            bg: 'linear-gradient(135deg, #0c0a1a 0%, #1a1040 100%)',
            accent: '#8b5cf6', btnBg: 'linear-gradient(135deg, #7c3aed, #a78bfa)',
            text: '#c4b5fd', eyebrowColor: '#a78bfa',
          },
          trust: {
            bg: 'linear-gradient(135deg, #022c22 0%, #064e3b 100%)',
            accent: '#10b981', btnBg: 'linear-gradient(135deg, #059669, #34d399)',
            text: '#a7f3d0', eyebrowColor: '#6ee7b7',
          },
          urgency: {
            bg: 'linear-gradient(135deg, #451a03 0%, #78350f 100%)',
            accent: '#f59e0b', btnBg: 'linear-gradient(135deg, #d97706, #fbbf24)',
            text: '#fde68a', eyebrowColor: '#fcd34d',
          },
          'lead-magnet': {
            bg: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)',
            accent: '#818cf8', btnBg: 'linear-gradient(135deg, #6366f1, #818cf8)',
            text: '#c7d2fe', eyebrowColor: '#a5b4fc',
          },
        }

        const s = variantStyles[variant] || variantStyles.onboarding

        return (
          <div style={{
            background: s.bg, borderRadius: '1rem',
            padding: '2rem 2.5rem',
            textAlign: 'center',
            boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
          }}>
            {eyebrow && (
              <div style={{
                fontSize: '0.6875rem', fontWeight: 700,
                color: s.eyebrowColor, letterSpacing: '0.1em',
                textTransform: 'uppercase', marginBottom: '0.5rem',
              }}>
                {eyebrow}
              </div>
            )}
            <h3 style={{
              margin: '0 0 0.625rem', fontSize: '1.375rem', fontWeight: 700,
              color: '#fff', fontFamily: 'var(--font-display)',
            }}>
              {headline}
            </h3>
            {body && (
              <p style={{
                margin: '0 0 1.25rem', fontSize: '0.9375rem',
                color: s.text, lineHeight: 1.6,
                maxWidth: '32rem', marginLeft: 'auto', marginRight: 'auto',
              }}>
                {body}
              </p>
            )}
            {ctaLabel && ctaHref && (
              <a
                href={ctaHref}
                style={{
                  display: 'inline-flex', alignItems: 'center',
                  padding: '0.75rem 2rem', borderRadius: '0.625rem',
                  background: s.btnBg, color: '#fff',
                  fontSize: '1rem', fontWeight: 600,
                  textDecoration: 'none',
                  boxShadow: `0 4px 16px rgba(0,0,0,0.25)`,
                  transition: 'transform 0.15s ease',
                }}
              >
                {ctaLabel}
              </a>
            )}
          </div>
        )
      },
    },

  },

  // ── Component Categories (sidebar grouping) ──────────────
  categories: {
    campaignEssentials: {
      title: '🚀 Campaign Essentials',
      components: ['HeroDark', 'CTABand', 'CTAStrip', 'PricingCard', 'FormBlock', 'ActivityTicker'],
      defaultExpanded: true,
    },
    heroes: {
      title: '🎯 Heroes & Page Banners',
      components: ['HeroDark', 'HeroBlue', 'PageHeaderWhite'],
      defaultExpanded: false,
    },
    conversionBlocks: {
      title: '🎯 Conversion & Lead Capture',
      components: ['FormBlock', 'CTAStrip', 'PopupCTA', 'ModalBlock', 'FunnelSteps'],
      defaultExpanded: false,
    },
    trustAndProof: {
      title: '🛡️ Trust & Proof',
      components: ['TestimonialCard', 'TrustSignalCard', 'QuoteBlock', 'StatRow', 'VideoBlock'],
      defaultExpanded: false,
    },
    layout: {
      title: '📦 Page Sections',
      components: ['SectionBox', 'SectionHeader', 'FeatureGrid', 'CardGrid', 'StepGroup', 'FunnelSteps'],
      defaultExpanded: false,
    },
    content: {
      title: '📝 Content Blocks',
      components: ['Step', 'ImageBlock', 'VideoBlock', 'QuoteBlock', 'ModalBlock'],
      defaultExpanded: false,
    },
    pricing: {
      title: '💰 Pricing & Offers',
      components: ['PricingCard'],
      defaultExpanded: false,
    },
    faqs: {
      title: '❓ FAQs',
      components: ['FaqGroup', 'FaqItem'],
      defaultExpanded: false,
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
      title:       { type: 'text',     label: 'Page Title (appears in browser tab)' },
      description: { type: 'textarea', label: 'Page Description (used by search engines)' },
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
