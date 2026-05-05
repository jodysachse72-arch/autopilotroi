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

// ─────────────────────────────────────────────────────────────────
// Puck Config
// ─────────────────────────────────────────────────────────────────

type Components = {
  HeroDark: HeroDarkProps
  SectionBox: SectionBoxProps
  SectionHeader: SectionHeaderProps
  StatRow: StatRowProps
  FeatureCard: FeatureCardProps
  EcoCard: EcoCardProps
  TestimonialCard: TestimonialCardProps
  Step: StepProps
  CTABand: CTABandProps
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
  },
}
