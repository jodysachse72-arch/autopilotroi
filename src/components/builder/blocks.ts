/**
 * Builder.io Custom Component Registry
 *
 * Every component listed here becomes a draggable block in Builder.io's
 * visual editor. Barry can pick any of these from the left panel,
 * drop them onto the page, and edit the props inline.
 *
 * To add a new block: import the component and add an entry below.
 */

interface RegisteredComponent {
  name: string
  friendlyName?: string
  description?: string
  inputs?: Array<{
    name: string
    type: string
    defaultValue?: unknown
    enum?: string[]
    subFields?: Array<{ name: string; type: string; defaultValue?: unknown }>
    allowedFileTypes?: string[]
    [key: string]: unknown
  }>
}

// We use dynamic registration — components are loaded at runtime
// via string paths resolved through Next.js. Builder.io matches
// the `name` field to the component registered in BuilderContent.tsx.

export const BUILDER_BLOCKS: RegisteredComponent[] = [
  // ─────────────────────────────────────────────────────────────────
  // HERO
  // ─────────────────────────────────────────────────────────────────
  {
    name: 'HeroDark',
    friendlyName: '🦸 Hero (Dark)',
    description: 'Full-width dark hero with badge, headline, description, bullets, and CTA buttons.',
    inputs: [
      { name: 'badge', type: 'string', defaultValue: '✦ Powered by Aurum Ecosystem' },
      { name: 'title', type: 'string', defaultValue: 'Your Money, Working 24/7' },
      { name: 'description', type: 'longText', defaultValue: 'AutoPilotROI is your structured guide into the Aurum ecosystem.' },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  // SECTION WRAPPERS
  // ─────────────────────────────────────────────────────────────────
  {
    name: 'SectionBox',
    friendlyName: '📦 Section Box',
    description: 'Container for any section. Choose light, surface, or blue background.',
    inputs: [
      {
        name: 'variant',
        type: 'string',
        enum: ['default', 'surface', 'blue'],
        defaultValue: 'default',
      },
    ],
  },

  {
    name: 'SectionHeader',
    friendlyName: '📝 Section Header',
    description: 'Eyebrow label + headline + optional body copy for any section.',
    inputs: [
      { name: 'eyebrow', type: 'string', defaultValue: 'Why AutoPilotROI' },
      { name: 'title', type: 'string', defaultValue: 'Everything you need to grow on autopilot' },
      { name: 'body', type: 'longText', defaultValue: '' },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  // STATS
  // ─────────────────────────────────────────────────────────────────
  {
    name: 'StatRow',
    friendlyName: '📊 Stats Bar',
    description: 'A row of animated count-up statistics. Add as many stat items as needed.',
    inputs: [
      {
        name: 'stats',
        type: 'list',
        subFields: [
          { name: 'value', type: 'number', defaultValue: 12000 },
          { name: 'suffix', type: 'string', defaultValue: '+' },
          { name: 'label', type: 'string', defaultValue: 'Members Onboarded' },
        ],
        defaultValue: [
          { value: 12000, suffix: '+', label: 'Members Onboarded' },
          { value: 47, suffix: '%', label: 'Avg. Portfolio Growth' },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  // FEATURE CARDS
  // ─────────────────────────────────────────────────────────────────
  {
    name: 'FeatureCard',
    friendlyName: '🃏 Feature Card',
    description: 'Icon + title + body card for features or benefits.',
    inputs: [
      { name: 'title', type: 'string', defaultValue: 'EX-AI Trading Bot' },
      { name: 'body', type: 'longText', defaultValue: 'The AI analyzes global crypto markets 24/7 and executes trades automatically.' },
      { name: 'color', type: 'color', defaultValue: '#1b61c9' },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  // ECOSYSTEM CARDS
  // ─────────────────────────────────────────────────────────────────
  {
    name: 'EcoCard',
    friendlyName: '🌐 Ecosystem Card',
    description: 'Product card for the Aurum ecosystem overview section.',
    inputs: [
      { name: 'title', type: 'string', defaultValue: 'EX-AI Trading Bot' },
      { name: 'description', type: 'longText', defaultValue: 'Fully automated 24/7 AI trading bot.' },
      { name: 'tag', type: 'string', defaultValue: 'LIVE' },
      { name: 'tagColor', type: 'color', defaultValue: '#059669' },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  // TESTIMONIALS
  // ─────────────────────────────────────────────────────────────────
  {
    name: 'TestimonialCard',
    friendlyName: '💬 Testimonial',
    description: 'Quote + author name + role.',
    inputs: [
      { name: 'quote', type: 'longText', defaultValue: 'I was skeptical at first but the results speak for themselves.' },
      { name: 'author', type: 'string', defaultValue: 'Marcus T.' },
      { name: 'role', type: 'string', defaultValue: 'Member since 2025' },
      { name: 'avatar', type: 'file', allowedFileTypes: ['jpeg', 'jpg', 'png', 'webp'] },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  // PROCESS STEPS
  // ─────────────────────────────────────────────────────────────────
  {
    name: 'Step',
    friendlyName: '🔢 Process Step',
    description: 'Numbered step with title and body for the "How it works" section.',
    inputs: [
      { name: 'num', type: 'string', defaultValue: '1' },
      { name: 'title', type: 'string', defaultValue: 'Set up your infrastructure' },
      { name: 'body', type: 'longText', defaultValue: 'Install Trust Wallet, activate a VPN, and acquire USDT.' },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  // CTA BAND
  // ─────────────────────────────────────────────────────────────────
  {
    name: 'CTABand',
    friendlyName: '🚀 CTA Banner',
    description: 'Full-width call-to-action banner with headline, description, and buttons.',
    inputs: [
      { name: 'eyebrow', type: 'string', defaultValue: 'Ready to start?' },
      { name: 'title', type: 'string', defaultValue: 'Your AI portfolio starts with $100' },
      { name: 'description', type: 'longText', defaultValue: 'Join thousands of members who activated the EX-AI Bot.' },
      {
        name: 'primaryLabel', type: 'string', defaultValue: 'Begin Onboarding →',
      },
      {
        name: 'primaryHref', type: 'string', defaultValue: '/signup',
      },
      {
        name: 'secondaryLabel', type: 'string', defaultValue: 'Read FAQs',
      },
      {
        name: 'secondaryHref', type: 'string', defaultValue: '/faqs',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  // RICH TEXT / FREE CONTENT
  // ─────────────────────────────────────────────────────────────────
  {
    name: 'RichText',
    friendlyName: '✏️ Rich Text Block',
    description: 'Freely editable paragraph, heading, or any HTML content.',
    inputs: [
      { name: 'content', type: 'richText', defaultValue: '<p>Edit this text...</p>' },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  // IMAGE
  // ─────────────────────────────────────────────────────────────────
  {
    name: 'ImageBlock',
    friendlyName: '🖼️ Image',
    description: 'Responsive image block. Upload any image from the media library.',
    inputs: [
      { name: 'src', type: 'file', allowedFileTypes: ['jpeg', 'jpg', 'png', 'svg', 'webp', 'gif'] },
      { name: 'alt', type: 'string', defaultValue: '' },
      { name: 'width', type: 'number', defaultValue: 800 },
      { name: 'height', type: 'number', defaultValue: 450 },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  // VIDEO EMBED
  // ─────────────────────────────────────────────────────────────────
  {
    name: 'VideoEmbed',
    friendlyName: '▶️ Video Embed',
    description: 'YouTube or Vimeo embed with optional autoplay.',
    inputs: [
      { name: 'url', type: 'string', defaultValue: 'https://youtu.be/MmAnR4YAPv4' },
      { name: 'title', type: 'string', defaultValue: 'AutoPilotROI Overview' },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  // SPACER
  // ─────────────────────────────────────────────────────────────────
  {
    name: 'Spacer',
    friendlyName: '↕️ Spacer',
    description: 'Adds vertical whitespace between sections.',
    inputs: [
      { name: 'height', type: 'string', enum: ['sm', 'md', 'lg', 'xl'], defaultValue: 'md' },
    ],
  },
]
