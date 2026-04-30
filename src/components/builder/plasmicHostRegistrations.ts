/**
 * Plasmic Host Registrations (direct host API)
 *
 * This file registers components using @plasmicapp/host's registerComponent
 * directly, WITHOUT importing initPlasmicLoader / PLASMIC.
 *
 * WHY: initPlasmicLoader declares `__plasmicData` on the page. When the
 * Plasmic Studio canvas script (studio.js) also declares `__plasmicData`
 * inside the same iframe, the browser throws:
 *   "SyntaxError: Identifier '__plasmicData' has already been declared"
 * — which silently kills the studio bridge and prevents components from
 * appearing in the insert panel.
 *
 * Using the host API directly avoids this collision entirely.
 */

import { registerComponent } from '@plasmicapp/host'

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

export function registerAllHostComponents() {
  registerComponent(HeroDark, {
    name: 'HeroDark',
    importPath: '@/components/sections',
    isDefaultExport: true,
    description: 'Full-width dark hero with badge, headline, description, bullets, and CTA buttons.',
    props: {
      badge:       { type: 'string', defaultValue: '✦ Powered by Aurum Ecosystem' },
      title:       { type: 'string', defaultValue: 'Your Money, Working 24/7' },
      description: { type: 'string', defaultValue: 'AutoPilotROI is your structured guide into the Aurum ecosystem.' },
    },
  })

  registerComponent(SectionBox, {
    name: 'SectionBox',
    importPath: '@/components/sections',
    isDefaultExport: true,
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

  registerComponent(SectionHeader, {
    name: 'SectionHeader',
    importPath: '@/components/sections',
    isDefaultExport: true,
    description: 'Eyebrow label + headline + optional body copy for any section.',
    props: {
      eyebrow:  { type: 'string', defaultValue: 'Why AutoPilotROI' },
      title:    { type: 'string', defaultValue: 'Everything you need to grow on autopilot' },
      children: { type: 'slot' },
    },
  })

  registerComponent(StatRow, {
    name: 'StatRow',
    importPath: '@/components/sections',
    isDefaultExport: true,
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

  registerComponent(FeatureCard, {
    name: 'FeatureCard',
    importPath: '@/components/sections',
    isDefaultExport: true,
    description: 'Icon + title + body card for features or benefits.',
    props: {
      title:   { type: 'string', defaultValue: 'EX-AI Trading Bot' },
      body:    { type: 'string', defaultValue: 'The AI analyzes global crypto markets 24/7.' },
      color:   { type: 'color',  defaultValue: '#1b61c9' },
      colorBg: { type: 'color',  defaultValue: 'rgba(27,97,201,0.10)' },
    },
  })

  registerComponent(EcoCard, {
    name: 'EcoCard',
    importPath: '@/components/sections',
    isDefaultExport: true,
    description: 'Product card for the Aurum ecosystem overview section.',
    props: {
      title:       { type: 'string', defaultValue: 'EX-AI Trading Bot' },
      description: { type: 'string', defaultValue: 'Fully automated 24/7 AI trading bot.' },
      tag:         { type: 'string', defaultValue: 'LIVE' },
      tagColor:    { type: 'color',  defaultValue: '#059669' },
    },
  })

  registerComponent(TestimonialCard, {
    name: 'TestimonialCard',
    importPath: '@/components/sections',
    isDefaultExport: true,
    description: 'Quote + author name + role testimonial card.',
    props: {
      quote:  { type: 'string', defaultValue: 'I was skeptical at first — the results speak for themselves.' },
      author: { type: 'string', defaultValue: 'Marcus T.' },
      role:   { type: 'string', defaultValue: 'Member since 2025' },
    },
  })

  registerComponent(Step, {
    name: 'Step',
    importPath: '@/components/sections',
    isDefaultExport: true,
    description: 'Numbered step for the "How it works" section.',
    props: {
      num:   { type: 'string', defaultValue: '1' },
      title: { type: 'string', defaultValue: 'Set up your infrastructure' },
      body:  { type: 'string', defaultValue: 'Install Trust Wallet, activate a VPN, and acquire USDT.' },
    },
  })

  registerComponent(CTABand, {
    name: 'CTABand',
    importPath: '@/components/sections',
    isDefaultExport: true,
    description: 'Full-width call-to-action banner with headline, description, and buttons.',
    props: {
      eyebrow:     { type: 'string', defaultValue: 'Ready to start?' },
      description: { type: 'string', defaultValue: 'Join thousands of members who activated the EX-AI Bot.' },
    },
  })
}
