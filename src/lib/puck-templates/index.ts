/**
 * CMS Page Template Registry
 *
 * Governed pre-approved page layouts for the AutoPilotROI CMS.
 * Templates are pure Puck JSON data — no new components, no new layout systems.
 *
 * Each template uses ONLY approved components from puck.config.tsx.
 * Each SectionBox has a sectionName for orientation.
 * Copy is realistic but clearly placeholder-ready.
 *
 * Templates are injected via:
 *   POST /api/puck/seed?path=/new-page&template=campaign-landing
 *
 * GOVERNANCE:
 *   - No raw colors
 *   - No custom layout controls
 *   - No components outside approved registry
 *   - Templates must NOT overwrite existing content without explicit ?force=true
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PuckData = any

// ─────────────────────────────────────────────────────────────────────────────
// TEMPLATE 1: homepage-standard
//   Hero → Stats → Features/Benefits → How It Works → Testimonials → CTA
// ─────────────────────────────────────────────────────────────────────────────

const HOMEPAGE_STANDARD: PuckData = {
  root: {
    props: {
      title: 'AutoPilotROI — Home',
      description: 'Your structured guide into AI-powered crypto investing with the Aurum ecosystem.',
    },
  },
  content: [
    {
      type: 'HeroDark',
      props: {
        id: 'hero-1',
        badge: '✦ Powered by Aurum Ecosystem',
        title: 'Your Money,',
        highlightedText: 'Working 24/7',
        description:
          'AutoPilotROI is your structured guide into the Aurum ecosystem — AI-powered crypto trading, a Visa crypto card, exchange, and Web3 neobank. Start with $100.',
        ctaLabel: 'Start Here →',
        ctaHref: '/signup',
        bulletOne: 'Start with $100 USDT',
        bulletTwo: 'AI runs 24/7',
        bulletThree: 'Guided onboarding',
        videoUrl: 'https://youtu.be/MmAnR4YAPv4',
        videoThumb: 'https://i.ytimg.com/vi/MmAnR4YAPv4/hqdefault.jpg',
      },
    },
    {
      type: 'SectionBox',
      props: {
        id: 'stats-section',
        sectionName: 'Stats Bar (12,000+ Members etc.)',
        variant: 'white',
        padding: 'lg',
      },
    },
    {
      type: 'SectionBox',
      props: {
        id: 'features-section',
        sectionName: 'Features / Benefits',
        variant: 'surface',
        padding: 'lg',
      },
    },
    {
      type: 'SectionBox',
      props: {
        id: 'process-section',
        sectionName: 'How It Works (3 Steps)',
        variant: 'white',
        padding: 'lg',
      },
    },
    {
      type: 'SectionBox',
      props: {
        id: 'testimonials-section',
        sectionName: 'Testimonials (Social Proof)',
        variant: 'blue',
        padding: 'lg',
      },
    },
    {
      type: 'CTABand',
      props: {
        id: 'cta-final',
        eyebrow: 'Ready to start?',
        title: 'Your AI portfolio starts with $100',
        description:
          'Join thousands of members who activated the EX-AI Bot and put their money to work around the clock.',
        ctaLabel: 'Begin Onboarding →',
        ctaHref: '/signup',
        secondaryLabel: 'Read FAQs',
        secondaryHref: '/faqs',
      },
    },
  ],
  zones: {
    'stats-section:content': [
      {
        type: 'StatRow',
        props: {
          id: 'stat-row-1',
          stats: [
            { value: 12000, suffix: '+', label: 'Members Onboarded' },
            { value: 47, suffix: '%', label: 'Avg. Portfolio Growth' },
            { value: 24, suffix: '/7', label: 'AI Bot Active Hours' },
            { value: 100, suffix: '+', label: 'Countries Supported' },
          ],
        },
      },
    ],
    'features-section:content': [
      {
        type: 'SectionHeader',
        props: {
          id: 'features-header',
          eyebrow: 'Why AutoPilotROI',
          title: 'Everything you need to grow on autopilot',
          lead: 'From your first $100 to a fully active portfolio — we guide you through every step.',
          align: 'center',
          badgeVariant: 'blue',
        },
      },
      {
        type: 'FeatureGrid',
        props: { id: 'features-grid', columns: '3' },
      },
    ],
    'features-grid:cards': [
      {
        type: 'FeatureCard',
        props: {
          id: 'feature-1',
          title: 'EX-AI Trading Bot',
          body: 'The AI analyzes global crypto markets 24/7 and executes trades automatically across Binance, Bybit, and KuCoin.',
          color: '#1b61c9',
          colorBg: 'rgba(27,97,201,0.10)',
        },
      },
      {
        type: 'FeatureCard',
        props: {
          id: 'feature-2',
          title: 'Visa Crypto Card',
          body: 'Spend your earnings anywhere Visa is accepted. Your crypto balance powers your everyday purchases worldwide.',
          color: '#7c3aed',
          colorBg: 'rgba(124,58,237,0.10)',
        },
      },
      {
        type: 'FeatureCard',
        props: {
          id: 'feature-3',
          title: 'Guided Onboarding',
          body: 'Step-by-step setup: wallet, VPN, USDT acquisition, Aurum account, and bot activation. Nothing gets skipped.',
          color: '#059669',
          colorBg: 'rgba(5,150,105,0.10)',
        },
      },
    ],
    'process-section:content': [
      {
        type: 'SectionHeader',
        props: {
          id: 'process-header',
          eyebrow: 'The Process',
          title: 'Up and running in 3 days or less',
          lead: '',
          align: 'left',
          badgeVariant: 'blue',
        },
      },
      {
        type: 'StepGroup',
        props: { id: 'steps-group' },
      },
    ],
    'steps-group:steps': [
      {
        type: 'Step',
        props: {
          id: 'step-1',
          num: '1',
          title: 'Set up your infrastructure',
          body: 'Install Trust Wallet, activate a VPN, and acquire USDT. Your partner walks you through every click.',
        },
      },
      {
        type: 'Step',
        props: {
          id: 'step-2',
          num: '2',
          title: 'Create your Aurum account',
          body: 'Register, complete verification, fund your account with USDT, and select your subscription tier.',
        },
      },
      {
        type: 'Step',
        props: {
          id: 'step-3',
          num: '3',
          title: 'Activate the AI bot & sit back',
          body: 'Turn on the EX-AI Bot. It begins scanning and trading automatically. Monitor your dashboard anytime.',
        },
      },
    ],
    'testimonials-section:content': [
      {
        type: 'SectionHeader',
        props: {
          id: 'testimonials-header',
          eyebrow: 'Members Speak',
          title: 'Real people. Real results.',
          lead: '',
          align: 'center',
          badgeVariant: 'white',
        },
      },
      {
        type: 'CardGrid',
        props: { id: 'testimonials-grid', columns: '3' },
      },
    ],
    'testimonials-grid:cards': [
      {
        type: 'TestimonialCard',
        props: {
          id: 'testimonial-1',
          quote:
            'I was skeptical at first but my partner walked me through every step. Had my bot running in 2 days.',
          author: 'Marcus T.',
          role: 'Member since March 2025',
          starRating: '5',
          memberInitials: 'MT',
        },
      },
      {
        type: 'TestimonialCard',
        props: {
          id: 'testimonial-2',
          quote:
            'The guided onboarding made all the difference. Never dealt with crypto before — now I have an active portfolio.',
          author: 'Sandra K.',
          role: 'Member since January 2025',
          starRating: '5',
          memberInitials: 'SK',
        },
      },
      {
        type: 'TestimonialCard',
        props: {
          id: 'testimonial-3',
          quote:
            "What I appreciate most is the transparency. Everything is documented, every step is explained.",
          author: 'David R.',
          role: 'Partner & Member',
          starRating: '5',
          memberInitials: 'DR',
        },
      },
    ],
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// TEMPLATE 2: product-page
//   HeroBlue → Trust/Stats → Product Cards → Pricing → FAQ → CTA
// ─────────────────────────────────────────────────────────────────────────────

const PRODUCT_PAGE: PuckData = {
  root: {
    props: {
      title: 'Products — AutoPilotROI',
      description: 'Explore the full Aurum ecosystem — AI trading bot, Visa crypto card, exchange, and neobank.',
    },
  },
  content: [
    {
      type: 'HeroBlue',
      props: {
        id: 'hero-1',
        eyebrow: 'The Aurum Ecosystem',
        title: 'Four products. One complete financial platform.',
        description:
          'From AI-powered trading to a blockchain-based neobank — AutoPilotROI is your onboarding partner for the entire Aurum stack.',
        ctaLabel: 'Get Started →',
        ctaHref: '/signup',
      },
    },
    {
      type: 'SectionBox',
      props: {
        id: 'trust-section',
        sectionName: 'Trust / Key Stats',
        variant: 'white',
        padding: 'lg',
      },
    },
    {
      type: 'SectionBox',
      props: {
        id: 'products-section',
        sectionName: 'Product Cards (Ecosystem)',
        variant: 'surface',
        padding: 'lg',
      },
    },
    {
      type: 'SectionBox',
      props: {
        id: 'pricing-section',
        sectionName: 'Pricing / Investment Tiers',
        variant: 'white',
        padding: 'xl',
      },
    },
    {
      type: 'SectionBox',
      props: {
        id: 'faq-section',
        sectionName: 'FAQ — Common Questions',
        variant: 'surface',
        padding: 'lg',
      },
    },
    {
      type: 'CTABand',
      props: {
        id: 'cta-final',
        eyebrow: 'Ready to activate?',
        title: 'Start your AI portfolio today',
        description:
          'Minimum $100 USDT. Your partner handles the full setup — wallet, exchange, and bot activation.',
        ctaLabel: 'Create My Account →',
        ctaHref: '/signup',
        secondaryLabel: 'Talk to a Partner',
        secondaryHref: '/join',
      },
    },
  ],
  zones: {
    'trust-section:content': [
      {
        type: 'StatRow',
        props: {
          id: 'trust-stats',
          stats: [
            { value: 12000, suffix: '+', label: 'Active Members' },
            { value: 4, suffix: '', label: 'Ecosystem Products' },
            { value: 100, suffix: '+', label: 'Countries Supported' },
            { value: 24, suffix: '/7', label: 'AI Bot Uptime' },
          ],
        },
      },
    ],
    'products-section:content': [
      {
        type: 'SectionHeader',
        props: {
          id: 'products-header',
          eyebrow: 'The Full Stack',
          title: 'One ecosystem. Four powerful products.',
          lead: 'Each product works independently — and even better together.',
          align: 'center',
          badgeVariant: 'blue',
        },
      },
      {
        type: 'CardGrid',
        props: { id: 'eco-grid', columns: '4' },
      },
    ],
    'eco-grid:cards': [
      {
        type: 'EcoCard',
        props: {
          id: 'eco-1',
          title: 'EX-AI Trading Bot',
          description:
            'Fully automated 24/7 AI trading across Binance, Bybit, and KuCoin. Machine learning-powered market analysis.',
          tag: 'LIVE',
          tagColor: '#059669',
        },
      },
      {
        type: 'EcoCard',
        props: {
          id: 'eco-2',
          title: 'Visa Crypto Card',
          description:
            'Spend your crypto anywhere in the world. Physical and virtual card linked to your Aurum balance.',
          tag: 'LIVE',
          tagColor: '#059669',
        },
      },
      {
        type: 'EcoCard',
        props: {
          id: 'eco-3',
          title: 'Crypto Exchange',
          description: '200+ crypto assets. Institutional liquidity. Low fees and fast settlement.',
          tag: 'LIVE',
          tagColor: '#059669',
        },
      },
      {
        type: 'EcoCard',
        props: {
          id: 'eco-4',
          title: 'Web3 Neobank',
          description: 'IBAN accounts, cross-border transfers, DeFi access, multi-currency wallets.',
          tag: 'LAUNCHING',
          tagColor: '#7c3aed',
        },
      },
    ],
    'pricing-section:content': [
      {
        type: 'SectionHeader',
        props: {
          id: 'pricing-header',
          eyebrow: 'Investment Tiers',
          title: 'Start where you are. Scale as you grow.',
          lead: 'All plans include full AI bot access, partner support, and Aurum University training.',
          align: 'center',
          badgeVariant: 'blue',
        },
      },
      {
        type: 'CardGrid',
        props: { id: 'pricing-grid', columns: '3' },
      },
    ],
    'pricing-grid:cards': [
      {
        type: 'PricingCard',
        props: {
          id: 'price-starter',
          planName: 'Starter',
          planTagline: 'Perfect for first-time investors exploring AI trading.',
          priceDisplay: '$100 USDT minimum',
          feature1: 'EX-AI Bot activation',
          feature2: 'AI-managed 24/7 trading',
          feature3: 'Aurum University access',
          feature4: 'Partner support included',
          feature5: '',
          feature6: '',
          feature7: '',
          feature8: '',
          ctaLabel: 'Start with $100 →',
          ctaHref: '/signup',
          badge: '',
          cardStyle: 'standard',
        },
      },
      {
        type: 'PricingCard',
        props: {
          id: 'price-growth',
          planName: 'Growth',
          planTagline: 'For investors ready to maximize their compounding potential.',
          priceDisplay: '$500–$2,500 USDT',
          feature1: 'All Starter features',
          feature2: 'Higher compounding returns',
          feature3: 'Priority partner access',
          feature4: 'Multi-exchange bot deployment',
          feature5: 'Advanced dashboard analytics',
          feature6: '',
          feature7: '',
          feature8: '',
          ctaLabel: 'Activate Growth Plan →',
          ctaHref: '/signup',
          badge: '⭐ Most Popular',
          cardStyle: 'featured',
        },
      },
      {
        type: 'PricingCard',
        props: {
          id: 'price-advanced',
          planName: 'Advanced',
          planTagline: 'Maximum capital deployment across the full Aurum ecosystem.',
          priceDisplay: '$2,500+ USDT',
          feature1: 'All Growth features',
          feature2: 'Full ecosystem access',
          feature3: 'Visa Crypto Card (physical)',
          feature4: 'Neobank account access',
          feature5: 'Partner income eligibility',
          feature6: 'Dedicated onboarding specialist',
          feature7: '',
          feature8: '',
          ctaLabel: 'Go Advanced →',
          ctaHref: '/signup',
          badge: '',
          cardStyle: 'standard',
        },
      },
    ],
    'faq-section:content': [
      {
        type: 'SectionHeader',
        props: {
          id: 'faq-header',
          eyebrow: 'Common Questions',
          title: 'Everything you need to know before starting',
          lead: '',
          align: 'left',
          badgeVariant: 'blue',
        },
      },
      {
        type: 'FaqGroup',
        props: { id: 'faq-group-1', groupTitle: '' },
      },
    ],
    'faq-group-1:faqs': [
      {
        type: 'FaqItem',
        props: {
          id: 'faq-1',
          question: 'What is the minimum investment to get started?',
          answer:
            'The minimum investment to activate the Aurum AI trading bot is $100 USDT (Tether). You can start with $100 and scale your investment as you become comfortable with the platform.',
          openByDefault: 'yes',
        },
      },
      {
        type: 'FaqItem',
        props: {
          id: 'faq-2',
          question: 'Do I need any crypto experience?',
          answer:
            'No prior experience is required. Your AutoPilotROI partner will walk you through every step — from setting up your wallet to activating the AI bot. The process takes 2–3 days on average.',
          openByDefault: 'no',
        },
      },
      {
        type: 'FaqItem',
        props: {
          id: 'faq-3',
          question: 'Is my investment safe?',
          answer:
            'The AI bot trades using your funds directly on your connected exchange accounts (Binance, Bybit, or KuCoin). You retain full control of your funds at all times. AutoPilotROI never takes custody of your assets.',
          openByDefault: 'no',
        },
      },
    ],
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// TEMPLATE 3: campaign-landing
//   HeroDark → Video → Benefits → Quote → ActivityTicker → Pricing → CTA
// ─────────────────────────────────────────────────────────────────────────────

const CAMPAIGN_LANDING: PuckData = {
  root: {
    props: {
      title: 'Start Your AI Portfolio — AutoPilotROI',
      description: 'Activate the EX-AI trading bot with as little as $100 USDT. Fully guided by your AutoPilotROI partner.',
    },
  },
  content: [
    {
      type: 'HeroDark',
      props: {
        id: 'hero-1',
        badge: '✦ Limited onboarding slots available',
        title: 'Put Your Money',
        highlightedText: 'On Autopilot',
        description:
          "The Aurum EX-AI Bot trades crypto 24/7 on your behalf. You don't need experience — just $100 USDT and a partner who guides every step.",
        ctaLabel: 'Claim My Spot →',
        ctaHref: '/signup',
        bulletOne: '$100 USDT minimum',
        bulletTwo: 'No experience needed',
        bulletThree: 'Full partner support',
        videoUrl: 'https://youtu.be/MmAnR4YAPv4',
        videoThumb: 'https://i.ytimg.com/vi/MmAnR4YAPv4/hqdefault.jpg',
      },
    },
    {
      type: 'SectionBox',
      props: {
        id: 'video-section',
        sectionName: 'Explainer Video',
        variant: 'white',
        padding: 'lg',
      },
    },
    {
      type: 'SectionBox',
      props: {
        id: 'benefits-section',
        sectionName: 'Key Benefits (Features)',
        variant: 'surface',
        padding: 'lg',
      },
    },
    {
      type: 'SectionBox',
      props: {
        id: 'social-proof-section',
        sectionName: 'Social Proof (Quote + Activity Feed)',
        variant: 'white',
        padding: 'lg',
      },
    },
    {
      type: 'SectionBox',
      props: {
        id: 'offer-section',
        sectionName: 'Offer / Pricing Card',
        variant: 'surface',
        padding: 'xl',
      },
    },
    {
      type: 'CTABand',
      props: {
        id: 'cta-final',
        eyebrow: 'The clock is running',
        title: 'Your money is working or it is sitting idle',
        description:
          'Every day without the AI bot is a day of missed compounding. Start with $100 and let the system work for you.',
        ctaLabel: 'Start Today →',
        ctaHref: '/signup',
        secondaryLabel: 'Still have questions?',
        secondaryHref: '/faqs',
      },
    },
  ],
  zones: {
    'video-section:content': [
      {
        type: 'SectionHeader',
        props: {
          id: 'video-header',
          eyebrow: 'See How It Works',
          title: 'Watch the full overview',
          lead: "Two minutes. You'll understand exactly what the bot does and why it works.",
          align: 'center',
          badgeVariant: 'blue',
        },
      },
      {
        type: 'VideoBlock',
        props: {
          id: 'explainer-video',
          videoUrl: 'https://youtu.be/MmAnR4YAPv4',
          caption: 'AutoPilotROI — Full Platform Overview',
          displaySize: 'large',
        },
      },
    ],
    'benefits-section:content': [
      {
        type: 'SectionHeader',
        props: {
          id: 'benefits-header',
          eyebrow: 'Why It Works',
          title: "The AI does what humans can't",
          lead: 'Markets move 24 hours a day. A human investor sleeps. The EX-AI Bot never does.',
          align: 'center',
          badgeVariant: 'blue',
        },
      },
      {
        type: 'FeatureGrid',
        props: { id: 'benefits-grid', columns: '3' },
      },
    ],
    'benefits-grid:cards': [
      {
        type: 'FeatureCard',
        props: {
          id: 'benefit-1',
          title: '24/7 Automated Trading',
          body: 'The bot scans global crypto markets around the clock and executes high-probability trades — without emotion, without delay.',
          color: '#1b61c9',
          colorBg: 'rgba(27,97,201,0.10)',
        },
      },
      {
        type: 'FeatureCard',
        props: {
          id: 'benefit-2',
          title: 'You Stay in Control',
          body: 'Your funds stay in your own exchange account. You can withdraw at any time. AutoPilotROI never holds your money.',
          color: '#059669',
          colorBg: 'rgba(5,150,105,0.10)',
        },
      },
      {
        type: 'FeatureCard',
        props: {
          id: 'benefit-3',
          title: 'Guided from Day One',
          body: 'Your partner walks you through every step — wallet setup, USDT acquisition, Aurum registration, and bot activation.',
          color: '#7c3aed',
          colorBg: 'rgba(124,58,237,0.10)',
        },
      },
    ],
    'social-proof-section:content': [
      {
        type: 'QuoteBlock',
        props: {
          id: 'member-quote',
          quote:
            'I had my bot running within 48 hours. The onboarding process was clearer than anything I expected from a crypto platform.',
          attribution: 'James W.',
          attributionRole: 'Member since February 2025',
          quoteStyle: 'centered',
          accentColor: 'brand-blue',
        },
      },
      {
        type: 'ActivityTicker',
        props: {
          id: 'activity-feed',
          message1: 'A new member just completed their readiness assessment',
          message2: 'Someone from the US activated the EX-AI Bot this morning',
          message3: 'A partner was just notified of a new qualified lead',
          message4: 'A member completed all onboarding steps today',
          message5: 'Someone started their Aurum University training',
          speed: 'normal',
          theme: 'emerald',
        },
      },
    ],
    'offer-section:content': [
      {
        type: 'SectionHeader',
        props: {
          id: 'offer-header',
          eyebrow: 'Get Started Today',
          title: 'One plan. Everything included.',
          lead: 'Your partner handles full setup. You activate the bot and let it run.',
          align: 'center',
          badgeVariant: 'blue',
        },
      },
      {
        type: 'CardGrid',
        props: { id: 'offer-card-grid', columns: '1' },
      },
    ],
    'offer-card-grid:cards': [
      {
        type: 'PricingCard',
        props: {
          id: 'campaign-offer',
          planName: 'Aurum AI Starter',
          planTagline: 'Full platform access. Partner support. Start with just $100 USDT.',
          priceDisplay: '$100 USDT minimum',
          feature1: 'EX-AI Bot activated on your account',
          feature2: 'AI-managed 24/7 crypto trading',
          feature3: 'Aurum University full training access',
          feature4: 'Personal partner support throughout',
          feature5: 'Withdraw profits at any time',
          feature6: 'Upgrade your investment level anytime',
          feature7: '',
          feature8: '',
          ctaLabel: 'Claim My Spot →',
          ctaHref: '/signup',
          badge: '✓ Partner Supported Setup',
          cardStyle: 'featured',
        },
      },
    ],
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// Template registry
// ─────────────────────────────────────────────────────────────────────────────

export const TEMPLATE_REGISTRY: Record<string, { label: string; description: string; data: PuckData }> = {
  'homepage-standard': {
    label: 'Homepage Standard',
    description: 'Hero → Stats → Features → How It Works → Testimonials → CTA',
    data: HOMEPAGE_STANDARD,
  },
  'product-page': {
    label: 'Product Page',
    description: 'HeroBlue → Trust Stats → Product Cards → Pricing → FAQ → CTA',
    data: PRODUCT_PAGE,
  },
  'campaign-landing': {
    label: 'Campaign Landing Page',
    description: 'HeroDark → Video → Benefits → Social Proof → Pricing Offer → CTA',
    data: CAMPAIGN_LANDING,
  },
}

/** Get template names for use in UI selectors */
export const TEMPLATE_NAMES = Object.keys(TEMPLATE_REGISTRY) as Array<keyof typeof TEMPLATE_REGISTRY>

/** Resolve a template by name — returns null if not found */
export function resolveTemplate(name: string): PuckData | null {
  return TEMPLATE_REGISTRY[name]?.data ?? null
}

/** Returns template metadata without the full data (for API responses) */
export function listTemplates() {
  return Object.entries(TEMPLATE_REGISTRY).map(([key, { label, description }]) => ({
    key,
    label,
    description,
  }))
}
