/**
 * Plasmic Component Registry
 *
 * Every component listed here becomes a draggable block in Plasmic Studio.
 * Barry sees these in the left panel and can drop them onto any page.
 *
 * Call registerAllComponents(PLASMIC) once — typically in plasmic-host/page.tsx.
 *
 * To add a new block:
 * 1. Import your component
 * 2. Add a PLASMIC.registerComponent() call below
 * 3. Barry sees it immediately in the studio panel
 */

import type { NextJsPlasmicComponentLoader } from '@plasmicapp/loader-nextjs'
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

export function registerAllComponents(PLASMIC: NextJsPlasmicComponentLoader) {
  // ─────────────────────────────────────────────────────────────────
  // HERO
  // ─────────────────────────────────────────────────────────────────
  PLASMIC.registerComponent(HeroDark, {
    name: 'HeroDark',
    description: 'Full-width dark hero with badge, headline, description, bullets, and CTA buttons.',
    props: {
      badge:       { type: 'string', defaultValue: '✦ Powered by Aurum Ecosystem' },
      title:       { type: 'string', defaultValue: 'Your Money, Working 24/7' },
      description: { type: 'string', defaultValue: 'AutoPilotROI is your structured guide into the Aurum ecosystem.' },
    },
  })

  // ─────────────────────────────────────────────────────────────────
  // SECTION BOX
  // ─────────────────────────────────────────────────────────────────
  PLASMIC.registerComponent(SectionBox, {
    name: 'SectionBox',
    description: 'Page section container. Choose light, surface, or blue background.',
    props: {
      variant: {
        type: 'choice',
        options: ['default', 'surface', 'blue'],
        defaultValue: 'default',
      },
      children: { type: 'slot' },
    },
  })

  // ─────────────────────────────────────────────────────────────────
  // SECTION HEADER
  // ─────────────────────────────────────────────────────────────────
  PLASMIC.registerComponent(SectionHeader, {
    name: 'SectionHeader',
    description: 'Eyebrow label + headline + optional body copy for any section.',
    props: {
      eyebrow:  { type: 'string', defaultValue: 'Why AutoPilotROI' },
      title:    { type: 'string', defaultValue: 'Everything you need to grow on autopilot' },
      children: { type: 'slot' },
    },
  })

  // ─────────────────────────────────────────────────────────────────
  // STAT ROW
  // ─────────────────────────────────────────────────────────────────
  PLASMIC.registerComponent(StatRow, {
    name: 'StatRow',
    description: 'A row of animated count-up statistics.',
    props: {
      stats: {
        type: 'array',
        itemType: {
          type: 'object',
          fields: {
            value:  { type: 'number' },
            suffix: { type: 'string' },
            label:  { type: 'string' },
          },
        },
        defaultValue: [
          { value: 12000, suffix: '+', label: 'Members Onboarded' },
          { value: 47,    suffix: '%', label: 'Avg. Portfolio Growth' },
          { value: 24,    suffix: '/7', label: 'AI Bot Active Hours' },
          { value: 100,   suffix: '+', label: 'Countries Supported' },
        ],
      },
    },
  })

  // ─────────────────────────────────────────────────────────────────
  // FEATURE CARD
  // ─────────────────────────────────────────────────────────────────
  PLASMIC.registerComponent(FeatureCard, {
    name: 'FeatureCard',
    description: 'Icon + title + body card for features or benefits.',
    props: {
      title:   { type: 'string', defaultValue: 'EX-AI Trading Bot' },
      body:    { type: 'string', defaultValue: 'The AI analyzes global crypto markets 24/7.' },
      color:   { type: 'color',  defaultValue: '#1b61c9' },
      colorBg: { type: 'color',  defaultValue: 'rgba(27,97,201,0.10)' },
    },
  })

  // ─────────────────────────────────────────────────────────────────
  // ECOSYSTEM CARD
  // ─────────────────────────────────────────────────────────────────
  PLASMIC.registerComponent(EcoCard, {
    name: 'EcoCard',
    description: 'Product card for the Aurum ecosystem overview section.',
    props: {
      title:       { type: 'string', defaultValue: 'EX-AI Trading Bot' },
      description: { type: 'string', defaultValue: 'Fully automated 24/7 AI trading bot.' },
      tag:         { type: 'string', defaultValue: 'LIVE' },
      tagColor:    { type: 'color',  defaultValue: '#059669' },
    },
  })

  // ─────────────────────────────────────────────────────────────────
  // TESTIMONIAL CARD
  // ─────────────────────────────────────────────────────────────────
  PLASMIC.registerComponent(TestimonialCard, {
    name: 'TestimonialCard',
    description: 'Quote + author name + role testimonial card.',
    props: {
      quote:  { type: 'string', defaultValue: 'I was skeptical at first — the results speak for themselves.' },
      author: { type: 'string', defaultValue: 'Marcus T.' },
      role:   { type: 'string', defaultValue: 'Member since 2025' },
    },
  })

  // ─────────────────────────────────────────────────────────────────
  // PROCESS STEP
  // ─────────────────────────────────────────────────────────────────
  PLASMIC.registerComponent(Step, {
    name: 'Step',
    description: 'Numbered step for the "How it works" section.',
    props: {
      num:   { type: 'string', defaultValue: '1' },
      title: { type: 'string', defaultValue: 'Set up your infrastructure' },
      body:  { type: 'string', defaultValue: 'Install Trust Wallet, activate a VPN, and acquire USDT.' },
    },
  })

  // ─────────────────────────────────────────────────────────────────
  // CTA BAND
  // ─────────────────────────────────────────────────────────────────
  PLASMIC.registerComponent(CTABand, {
    name: 'CTABand',
    description: 'Full-width call-to-action banner with headline, description, and buttons.',
    props: {
      eyebrow:     { type: 'string', defaultValue: 'Ready to start?' },
      description: { type: 'string', defaultValue: 'Join thousands of members who activated the EX-AI Bot.' },
    },
  })
}
