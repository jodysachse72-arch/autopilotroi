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
// TEMPLATE 4: onboarding-page
//   HeroBlue → 5-step process → FAQ → CTA
// ─────────────────────────────────────────────────────────────────────────────

const ONBOARDING_PAGE: PuckData = {
  root: { props: { title: 'Getting Started — AutoPilotROI', description: 'Step-by-step guide to setting up your AI trading portfolio with Aurum.' } },
  content: [
    { type: 'HeroBlue', props: { id: 'ob-hero', eyebrow: 'Getting Started', title: 'Your setup guide — from zero to active portfolio.', description: 'Follow these steps and your AI trading bot will be live within 72 hours. Your partner supports you at every stage.', ctaLabel: '', ctaHref: '' } },
    { type: 'SectionBox', props: { id: 'ob-steps-section', sectionName: 'Onboarding Steps (5 Steps)', variant: 'white', padding: 'lg' } },
    { type: 'SectionBox', props: { id: 'ob-faq-section', sectionName: 'Onboarding FAQs', variant: 'surface', padding: 'lg' } },
    { type: 'CTABand', props: { id: 'ob-cta', eyebrow: 'Ready to begin?', title: 'Start your onboarding now', description: 'Your dedicated partner will walk you through every step. No experience required.', ctaLabel: 'Begin Setup →', ctaHref: '/signup', secondaryLabel: 'Read FAQs', secondaryHref: '/faqs' } },
  ],
  zones: {
    'ob-steps-section:content': [
      { type: 'SectionHeader', props: { id: 'ob-steps-header', eyebrow: 'The Process', title: 'Five steps to your active portfolio', lead: 'Each step takes less than 30 minutes. Your partner guides you through everything.', align: 'left', badgeVariant: 'blue' } },
      { type: 'StepGroup', props: { id: 'ob-steps-group' } },
    ],
    'ob-steps-group:steps': [
      { type: 'Step', props: { id: 'ob-step-1', num: '1', title: 'Install Trust Wallet', body: 'Download Trust Wallet on your phone. This is your secure crypto wallet — your partner sends you the direct link.' } },
      { type: 'Step', props: { id: 'ob-step-2', num: '2', title: 'Set up a VPN', body: 'Download and activate a VPN app. This ensures secure, unrestricted access to all Aurum platform services worldwide.' } },
      { type: 'Step', props: { id: 'ob-step-3', num: '3', title: 'Acquire USDT', body: 'Purchase USDT (Tether) from a major exchange like Binance or Coinbase. Transfer it to your Trust Wallet.' } },
      { type: 'Step', props: { id: 'ob-step-4', num: '4', title: 'Create your Aurum account', body: 'Register at Aurum, complete verification, and fund your account with USDT. Select your subscription tier.' } },
      { type: 'Step', props: { id: 'ob-step-5', num: '5', title: 'Activate the EX-AI Bot', body: 'Turn on the AI trading bot. It begins scanning markets and executing trades automatically. Monitor your dashboard anytime.' } },
    ],
    'ob-faq-section:content': [
      { type: 'SectionHeader', props: { id: 'ob-faq-header', eyebrow: 'Common Questions', title: 'Onboarding FAQ', lead: '', align: 'left', badgeVariant: 'blue' } },
      { type: 'FaqGroup', props: { id: 'ob-faq-group', groupTitle: '' } },
    ],
    'ob-faq-group:faqs': [
      { type: 'FaqItem', props: { id: 'ob-faq-1', question: 'How long does the full setup take?', answer: 'Most members complete all five steps within 48–72 hours. Your partner schedules sessions around your availability.', openByDefault: 'yes' } },
      { type: 'FaqItem', props: { id: 'ob-faq-2', question: 'Do I need crypto experience?', answer: 'No. The guided onboarding covers everything from scratch — wallet setup, VPN, USDT purchase, and bot activation.', openByDefault: 'no' } },
      { type: 'FaqItem', props: { id: 'ob-faq-3', question: 'What is the minimum investment?', answer: 'The minimum to activate the EX-AI trading bot is $100 USDT. You can scale your investment at any time.', openByDefault: 'no' } },
    ],
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// TEMPLATE 5: webinar-landing
//   HeroDark (event-focused) → VideoBlock → Benefits → Testimonials → CTA
// ─────────────────────────────────────────────────────────────────────────────

const WEBINAR_LANDING: PuckData = {
  root: { props: { title: 'Live Masterclass — AutoPilotROI', description: 'Join our live session on AI-powered crypto investing with the Aurum ecosystem.' } },
  content: [
    { type: 'HeroDark', props: { id: 'web-hero', badge: '🔴 Live Event', title: 'Free Masterclass:', highlightedText: 'AI Crypto Investing', description: 'Join us for a live walkthrough of the Aurum ecosystem. See the AI bot in action, understand the onboarding process, and get your questions answered — live.', ctaLabel: 'Reserve My Spot →', ctaHref: '/signup', secondaryCtaLabel: 'Watch Replay', secondaryCtaHref: '#replay', bulletOne: 'Free — no card required', bulletTwo: 'See the bot trade live', bulletThree: 'Q&A with experts', videoUrl: '', videoThumb: '' } },
    { type: 'SectionBox', props: { id: 'web-video-section', sectionName: 'Video Preview / Replay', variant: 'white', padding: 'lg' } },
    { type: 'SectionBox', props: { id: 'web-benefits-section', sectionName: 'What You Will Learn', variant: 'surface', padding: 'lg' } },
    { type: 'SectionBox', props: { id: 'web-proof-section', sectionName: 'Attendee Feedback', variant: 'blue', padding: 'lg' } },
    { type: 'CTABand', props: { id: 'web-cta', eyebrow: 'Limited spots', title: 'Register for the next session', description: 'Each masterclass is limited to 50 attendees for an interactive Q&A experience. Claim your spot now.', ctaLabel: 'Register Free →', ctaHref: '/signup', secondaryLabel: '', secondaryHref: '' } },
  ],
  zones: {
    'web-video-section:content': [
      { type: 'SectionHeader', props: { id: 'web-video-header', eyebrow: 'Preview', title: 'Watch a previous session', lead: '', align: 'center', badgeVariant: 'blue' } },
      { type: 'VideoBlock', props: { id: 'web-video', videoUrl: 'https://youtu.be/MmAnR4YAPv4', caption: 'Previous masterclass recording', displaySize: 'large' } },
    ],
    'web-benefits-section:content': [
      { type: 'SectionHeader', props: { id: 'web-benefits-header', eyebrow: 'What You\'ll Learn', title: 'Three key takeaways from every session', lead: '', align: 'center', badgeVariant: 'blue' } },
      { type: 'FeatureGrid', props: { id: 'web-benefits-grid' } },
    ],
    'web-benefits-grid:cards': [
      { type: 'FeatureCard', props: { id: 'web-benefit-1', title: 'How AI Trading Works', body: 'See exactly how the EX-AI Bot analyzes markets, executes trades, and compounds returns — with live dashboard walkthroughs.', colorPreset: 'brand-blue' } },
      { type: 'FeatureCard', props: { id: 'web-benefit-2', title: 'The Full Onboarding Process', body: 'Understand every step from wallet setup to bot activation. Leave the session with a clear action plan.', colorPreset: 'emerald' } },
      { type: 'FeatureCard', props: { id: 'web-benefit-3', title: 'Real Member Results', body: 'Hear directly from members who started with $100 and see their actual portfolio growth over time.', colorPreset: 'violet' } },
    ],
    'web-proof-section:content': [
      { type: 'SectionHeader', props: { id: 'web-proof-header', eyebrow: 'Attendee Feedback', title: 'What past attendees say', lead: '', align: 'center', badgeVariant: 'white' } },
      { type: 'CardGrid', props: { id: 'web-testimonials-grid' } },
    ],
    'web-testimonials-grid:cards': [
      { type: 'TestimonialCard', props: { id: 'web-testimonial-1', quote: 'I was on the fence for weeks. The masterclass gave me the confidence to start — seeing the bot trade live was the turning point.', author: 'Elena M.', role: 'Masterclass Attendee', starRating: '5', memberInitials: 'EM' } },
      { type: 'TestimonialCard', props: { id: 'web-testimonial-2', quote: 'Best 45 minutes I spent this month. Clear, no-hype presentation. Signed up the same evening.', author: 'James K.', role: 'Now Active Member', starRating: '5', memberInitials: 'JK' } },
    ],
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// TEMPLATE 6: comparison-page
//   PageHeaderWhite → Advantages grid → Trust signals → Testimonials → CTA
// ─────────────────────────────────────────────────────────────────────────────

const COMPARISON_PAGE: PuckData = {
  root: { props: { title: 'Why AutoPilotROI — AutoPilotROI', description: 'See why AutoPilotROI is the trusted choice for AI-powered crypto investing.' } },
  content: [
    { type: 'PageHeaderWhite', props: { id: 'comp-hero', badge: 'Why Us', title: 'Not all onboarding platforms', highlightedText: 'are created equal.', description1: 'AutoPilotROI is the only guided onboarding platform for the full Aurum ecosystem — combining AI trading, crypto cards, exchange access, and neobanking in one structured experience.', description2: '', cta1Label: 'Start Here →', cta1Href: '/signup', cta2Label: 'See Products →', cta2Href: '/products' } },
    { type: 'SectionBox', props: { id: 'comp-advantages', sectionName: 'Key Advantages (6 Cards)', variant: 'surface', padding: 'lg' } },
    { type: 'SectionBox', props: { id: 'comp-trust', sectionName: 'Trust Signals', variant: 'white', padding: 'lg' } },
    { type: 'SectionBox', props: { id: 'comp-testimonials', sectionName: 'Member Testimonials', variant: 'blue', padding: 'lg' } },
    { type: 'CTABand', props: { id: 'comp-cta', eyebrow: 'Convinced?', title: 'Start your portfolio today', description: 'Join 12,000+ members who chose AutoPilotROI for their crypto journey.', ctaLabel: 'Get Started →', ctaHref: '/signup', secondaryLabel: 'Read FAQs', secondaryHref: '/faqs' } },
  ],
  zones: {
    'comp-advantages:content': [
      { type: 'SectionHeader', props: { id: 'comp-adv-header', eyebrow: 'Advantages', title: 'Six reasons members choose AutoPilotROI', lead: '', align: 'center', badgeVariant: 'blue' } },
      { type: 'FeatureGrid', props: { id: 'comp-adv-grid' } },
    ],
    'comp-adv-grid:cards': [
      { type: 'FeatureCard', props: { id: 'comp-adv-1', title: 'Guided Setup (Not DIY)', body: 'Every member gets a dedicated partner who walks them through the entire process — no guesswork, no confusion.', colorPreset: 'brand-blue' } },
      { type: 'FeatureCard', props: { id: 'comp-adv-2', title: 'AI-Powered Trading', body: 'The EX-AI Bot trades 24/7 using machine learning. You activate it once — it runs continuously.', colorPreset: 'emerald' } },
      { type: 'FeatureCard', props: { id: 'comp-adv-3', title: 'Full Ecosystem Access', body: 'Trading bot, Visa card, exchange, and neobank — all from one platform, one onboarding flow.', colorPreset: 'violet' } },
      { type: 'FeatureCard', props: { id: 'comp-adv-4', title: 'Low Entry Barrier', body: 'Start with just $100 USDT. No minimum lock-in periods. Withdraw your profits at any time.', colorPreset: 'amber' } },
      { type: 'FeatureCard', props: { id: 'comp-adv-5', title: 'Transparent Operations', body: 'Every trade is visible in your dashboard. Full documentation. No hidden fees or opaque processes.', colorPreset: 'brand-blue' } },
      { type: 'FeatureCard', props: { id: 'comp-adv-6', title: 'Partner Income Program', body: 'Earn by introducing others. 3-deep spillover structure — your network compounds while you sleep.', colorPreset: 'rose' } },
    ],
    'comp-trust:content': [
      { type: 'SectionHeader', props: { id: 'comp-trust-header', eyebrow: 'Trust', title: 'Built on transparency and compliance', lead: '', align: 'center', badgeVariant: 'blue' } },
      { type: 'CardGrid', props: { id: 'comp-trust-grid' } },
    ],
    'comp-trust-grid:cards': [
      { type: 'TrustSignalCard', props: { id: 'comp-trust-1', iconName: 'BankIcon', title: 'Legally Registered', body: 'Aurum Foundation Limited is an officially registered financial technology company with verifiable credentials.' } },
      { type: 'TrustSignalCard', props: { id: 'comp-trust-2', iconName: 'SecurityIcon', title: 'Exchange-Level Security', body: 'Your funds are secured with multi-signature wallets, 2FA enforcement, and institutional-grade custody.' } },
      { type: 'TrustSignalCard', props: { id: 'comp-trust-3', iconName: 'DataIcon', title: 'Full Dashboard Access', body: 'Track every trade, every return, every fee — in real time from your personal member dashboard.' } },
    ],
    'comp-testimonials:content': [
      { type: 'SectionHeader', props: { id: 'comp-test-header', eyebrow: 'Members Speak', title: 'Why they chose us', lead: '', align: 'center', badgeVariant: 'white' } },
      { type: 'CardGrid', props: { id: 'comp-test-grid' } },
    ],
    'comp-test-grid:cards': [
      { type: 'TestimonialCard', props: { id: 'comp-test-1', quote: 'I looked at three different platforms. AutoPilotROI was the only one with real partner support and a clear, guided process.', author: 'Rachel F.', role: 'Member since April 2025', starRating: '5', memberInitials: 'RF' } },
      { type: 'TestimonialCard', props: { id: 'comp-test-2', quote: 'The ecosystem approach is what sold me. One login, four products, one onboarding flow. Nothing else comes close.', author: 'Carlos M.', role: 'Growth Tier Member', starRating: '5', memberInitials: 'CM' } },
    ],
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// TEMPLATE 7: trust-proof-page
//   HeroBlue → Trust Cards → Quote → Video → Stats → CTA
// ─────────────────────────────────────────────────────────────────────────────

const TRUST_PROOF_PAGE: PuckData = {
  root: { props: { title: 'Trust & Transparency — AutoPilotROI', description: 'See the evidence behind AutoPilotROI and the Aurum ecosystem.' } },
  content: [
    { type: 'HeroBlue', props: { id: 'trust-hero', eyebrow: 'Trust & Transparency', title: 'See the proof. Make your decision.', description: 'We believe in full transparency. Explore the evidence, credentials, and member results that back AutoPilotROI.', ctaLabel: '', ctaHref: '' } },
    { type: 'SectionBox', props: { id: 'trust-signals-section', sectionName: 'Trust Signal Cards', variant: 'white', padding: 'lg' } },
    { type: 'QuoteBlock', props: { id: 'trust-quote', quote: 'I did my due diligence for three weeks before committing. Every claim checked out — the registration, the bot performance, the partner support. That level of transparency is rare.', attribution: 'Michael R.', attributionRole: 'Member since December 2024', quoteStyle: 'centered', accentColor: 'brand-blue' } },
    { type: 'SectionBox', props: { id: 'trust-video-section', sectionName: 'Video Evidence', variant: 'surface', padding: 'lg' } },
    { type: 'SectionBox', props: { id: 'trust-stats-section', sectionName: 'Key Numbers', variant: 'white', padding: 'lg' } },
    { type: 'CTABand', props: { id: 'trust-cta', eyebrow: 'Satisfied?', title: 'Start with confidence', description: 'Your first step is risk-free. Start with $100 USDT and see the platform in action for yourself.', ctaLabel: 'Start Here →', ctaHref: '/signup', secondaryLabel: 'Talk to a Partner', secondaryHref: '/join' } },
  ],
  zones: {
    'trust-signals-section:content': [
      { type: 'SectionHeader', props: { id: 'trust-cards-header', eyebrow: 'Credentials', title: 'Why you can trust AutoPilotROI', lead: '', align: 'center', badgeVariant: 'blue' } },
      { type: 'CardGrid', props: { id: 'trust-cards-grid' } },
    ],
    'trust-cards-grid:cards': [
      { type: 'TrustSignalCard', props: { id: 'trust-card-1', iconName: 'BankIcon', title: 'Legally Incorporated', body: 'Aurum Foundation Limited is a registered financial technology company with publicly verifiable corporate records.' } },
      { type: 'TrustSignalCard', props: { id: 'trust-card-2', iconName: 'SecurityIcon', title: 'Multi-Exchange Security', body: 'Funds are deployed across Binance, Bybit, and KuCoin with multi-signature wallets and institutional custody.' } },
      { type: 'TrustSignalCard', props: { id: 'trust-card-3', iconName: 'DataIcon', title: 'Real-Time Dashboard', body: 'Every trade, every return, every fee — visible in real time from your personal member dashboard.' } },
      { type: 'TrustSignalCard', props: { id: 'trust-card-4', iconName: 'PartnerIcon', title: 'Dedicated Partner Support', body: 'Every member is assigned a personal onboarding partner who walks you through the entire setup process.' } },
    ],
    'trust-video-section:content': [
      { type: 'SectionHeader', props: { id: 'trust-video-header', eyebrow: 'See It In Action', title: 'Watch the platform overview', lead: '', align: 'center', badgeVariant: 'blue' } },
      { type: 'VideoBlock', props: { id: 'trust-video', videoUrl: 'https://youtu.be/MmAnR4YAPv4', caption: 'Full platform walkthrough', displaySize: 'large' } },
    ],
    'trust-stats-section:content': [
      { type: 'StatRow', props: { id: 'trust-stats', stats: [{ value: 12000, suffix: '+', label: 'Members Onboarded' }, { value: 47, suffix: '%', label: 'Avg. Portfolio Growth' }, { value: 100, suffix: '+', label: 'Countries' }, { value: 3, suffix: ' yrs', label: 'Platform Operational' }] } },
    ],
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// TEMPLATE 8: cta-landing
//   HeroDark (single CTA) → 3 benefits → Featured PricingCard → CTA
// ─────────────────────────────────────────────────────────────────────────────

const CTA_LANDING: PuckData = {
  root: { props: { title: 'Get Started — AutoPilotROI', description: 'Take action now — activate your AI trading portfolio with AutoPilotROI.' } },
  content: [
    { type: 'HeroDark', props: { id: 'cta-hero', badge: '⚡ Limited Availability', title: 'Activate Your', highlightedText: 'AI Portfolio Today', description: 'AutoPilotROI members are earning while they sleep. The EX-AI Bot trades 24/7 across three major exchanges. Start with just $100 USDT.', ctaLabel: 'Start Now →', ctaHref: '/signup', secondaryCtaLabel: '', secondaryCtaHref: '', bulletOne: '$100 minimum entry', bulletTwo: 'Partner-guided setup', bulletThree: 'Withdraw anytime', videoUrl: '', videoThumb: '' } },
    { type: 'SectionBox', props: { id: 'cta-benefits-section', sectionName: 'Key Benefits', variant: 'surface', padding: 'lg' } },
    { type: 'SectionBox', props: { id: 'cta-offer-section', sectionName: 'The Offer', variant: 'white', padding: 'xl' } },
    { type: 'CTABand', props: { id: 'cta-final', eyebrow: 'Don\'t wait', title: 'Your portfolio is waiting', description: 'Every day you wait is a day the AI isn\'t working for you. Start your onboarding now.', ctaLabel: 'Activate Now →', ctaHref: '/signup', secondaryLabel: '', secondaryHref: '' } },
  ],
  zones: {
    'cta-benefits-section:content': [
      { type: 'SectionHeader', props: { id: 'cta-benefits-header', eyebrow: 'Why Now', title: 'Three reasons to start today', lead: '', align: 'center', badgeVariant: 'blue' } },
      { type: 'FeatureGrid', props: { id: 'cta-benefits-grid' } },
    ],
    'cta-benefits-grid:cards': [
      { type: 'FeatureCard', props: { id: 'cta-benefit-1', title: 'AI Trades While You Sleep', body: 'The EX-AI Bot never stops. It scans markets 24/7, executing trades with precision across three exchanges.', colorPreset: 'brand-blue' } },
      { type: 'FeatureCard', props: { id: 'cta-benefit-2', title: 'Zero Experience Needed', body: 'Your dedicated partner handles the full setup. From wallet creation to bot activation — you just follow along.', colorPreset: 'emerald' } },
      { type: 'FeatureCard', props: { id: 'cta-benefit-3', title: 'Start Small, Scale Anytime', body: 'Begin with $100 USDT. See the results. Then scale at your own pace — no pressure, no lock-in.', colorPreset: 'amber' } },
    ],
    'cta-offer-section:content': [
      { type: 'SectionHeader', props: { id: 'cta-offer-header', eyebrow: 'Your Entry Point', title: 'Everything included from day one', lead: '', align: 'center', badgeVariant: 'blue' } },
      { type: 'CardGrid', props: { id: 'cta-offer-grid' } },
    ],
    'cta-offer-grid:cards': [
      { type: 'PricingCard', props: { id: 'cta-offer-card', planName: 'Full Access', planTagline: 'Everything you need to start earning with AI.', priceDisplay: 'From $100 USDT', feature1: 'EX-AI Bot activation', feature2: 'AI-managed 24/7 trading', feature3: 'Personal partner support', feature4: 'Aurum University training', feature5: 'Full dashboard access', feature6: 'Withdraw profits anytime', feature7: '', feature8: '', ctaLabel: 'Activate Now →', ctaHref: '/signup', badge: '✓ Most Popular', cardStyle: 'featured' } },
    ],
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// TEMPLATE 9: campaign-funnel
//   HeroDark → Ticker → Stats → Benefits → Quote → Pricing (3 tiers) → FAQ → CTA
// ─────────────────────────────────────────────────────────────────────────────

const CAMPAIGN_FUNNEL: PuckData = {
  root: { props: { title: 'Campaign — AutoPilotROI', description: 'Your complete guide to AI-powered crypto investing with the Aurum ecosystem.' } },
  content: [
    { type: 'HeroDark', props: { id: 'fun-hero', badge: '✦ Exclusive Campaign', title: 'Your Money,', highlightedText: 'On Autopilot', description: 'AutoPilotROI members activate the EX-AI Bot and earn while they sleep. Start with $100. Full partner support included.', ctaLabel: 'Claim My Spot →', ctaHref: '/signup', secondaryCtaLabel: 'See how it works', secondaryCtaHref: '#how-it-works', bulletOne: '$100 minimum entry', bulletTwo: 'AI trades 24/7', bulletThree: 'Withdraw anytime', videoUrl: '', videoThumb: '' } },
    { type: 'ActivityTicker', props: { id: 'fun-ticker', message1: 'A new member just activated their AI trading bot', message2: 'Someone completed their onboarding today', message3: 'A partner earned their first referral commission', message4: 'A member scaled their investment to Growth tier', message5: '', speed: 'normal', theme: 'emerald' } },
    { type: 'SectionBox', props: { id: 'fun-stats-section', sectionName: 'Social Proof Stats', variant: 'white', padding: 'lg' } },
    { type: 'SectionBox', props: { id: 'fun-benefits-section', sectionName: 'Key Benefits Grid', variant: 'surface', padding: 'lg' } },
    { type: 'QuoteBlock', props: { id: 'fun-quote', quote: 'I started with $100 just to test it. Within a month, I was confident enough to scale to $1,000. The partner support made all the difference.', attribution: 'Lisa J.', attributionRole: 'Growth Tier Member', quoteStyle: 'centered', accentColor: 'brand-blue' } },
    { type: 'SectionBox', props: { id: 'fun-pricing-section', sectionName: 'Investment Tiers', variant: 'white', padding: 'xl' } },
    { type: 'SectionBox', props: { id: 'fun-faq-section', sectionName: 'Campaign FAQ', variant: 'surface', padding: 'lg' } },
    { type: 'CTABand', props: { id: 'fun-cta', eyebrow: 'Ready?', title: 'Your AI portfolio starts today', description: 'Join thousands of members who activated the EX-AI Bot. Your partner handles the entire setup.', ctaLabel: 'Start My Portfolio →', ctaHref: '/signup', secondaryLabel: 'Contact a Partner', secondaryHref: '/join' } },
  ],
  zones: {
    'fun-stats-section:content': [
      { type: 'StatRow', props: { id: 'fun-stats', stats: [{ value: 12000, suffix: '+', label: 'Active Members' }, { value: 47, suffix: '%', label: 'Avg. Growth' }, { value: 24, suffix: '/7', label: 'AI Uptime' }, { value: 100, suffix: '+', label: 'Countries' }] } },
    ],
    'fun-benefits-section:content': [
      { type: 'SectionHeader', props: { id: 'fun-benefits-header', eyebrow: 'Why AutoPilotROI', title: 'Everything you need in one platform', lead: '', align: 'center', badgeVariant: 'blue' } },
      { type: 'FeatureGrid', props: { id: 'fun-benefits-grid' } },
    ],
    'fun-benefits-grid:cards': [
      { type: 'FeatureCard', props: { id: 'fun-ben-1', title: '24/7 AI Trading', body: 'The EX-AI Bot executes trades around the clock across Binance, Bybit, and KuCoin.', colorPreset: 'brand-blue' } },
      { type: 'FeatureCard', props: { id: 'fun-ben-2', title: 'Guided Onboarding', body: 'Your personal partner walks you through every step — from wallet to bot activation.', colorPreset: 'emerald' } },
      { type: 'FeatureCard', props: { id: 'fun-ben-3', title: 'Full Ecosystem', body: 'Trading bot, Visa card, exchange, and neobank — all accessible through one platform.', colorPreset: 'violet' } },
    ],
    'fun-pricing-section:content': [
      { type: 'SectionHeader', props: { id: 'fun-pricing-header', eyebrow: 'Choose Your Level', title: 'Start where you are — scale when ready', lead: 'All plans include full bot access, partner support, and Aurum University training.', align: 'center', badgeVariant: 'blue' } },
      { type: 'CardGrid', props: { id: 'fun-pricing-grid' } },
    ],
    'fun-pricing-grid:cards': [
      { type: 'PricingCard', props: { id: 'fun-price-1', planName: 'Starter', planTagline: 'Test the platform with minimal commitment.', priceDisplay: '$100 USDT', feature1: 'EX-AI Bot activation', feature2: 'AI-managed trading', feature3: 'Partner support', feature4: 'University access', feature5: '', feature6: '', feature7: '', feature8: '', ctaLabel: 'Start with $100 →', ctaHref: '/signup', badge: '', cardStyle: 'standard' } },
      { type: 'PricingCard', props: { id: 'fun-price-2', planName: 'Growth', planTagline: 'Maximize compounding returns.', priceDisplay: '$500–$2,500', feature1: 'All Starter features', feature2: 'Higher compounding tier', feature3: 'Multi-exchange deployment', feature4: 'Priority partner access', feature5: 'Advanced analytics', feature6: '', feature7: '', feature8: '', ctaLabel: 'Go Growth →', ctaHref: '/signup', badge: '⭐ Most Popular', cardStyle: 'featured' } },
      { type: 'PricingCard', props: { id: 'fun-price-3', planName: 'Advanced', planTagline: 'Full ecosystem access.', priceDisplay: '$2,500+', feature1: 'All Growth features', feature2: 'Visa Crypto Card', feature3: 'Neobank access', feature4: 'Partner income', feature5: 'VIP onboarding', feature6: '', feature7: '', feature8: '', ctaLabel: 'Go Advanced →', ctaHref: '/signup', badge: '', cardStyle: 'standard' } },
    ],
    'fun-faq-section:content': [
      { type: 'SectionHeader', props: { id: 'fun-faq-header', eyebrow: 'Questions?', title: 'Frequently asked questions', lead: '', align: 'left', badgeVariant: 'blue' } },
      { type: 'FaqGroup', props: { id: 'fun-faq-group', groupTitle: '' } },
    ],
    'fun-faq-group:faqs': [
      { type: 'FaqItem', props: { id: 'fun-faq-1', question: 'How does the AI bot work?', answer: 'The EX-AI Bot uses machine learning to analyze crypto markets 24/7, executing trades automatically across multiple exchanges.', openByDefault: 'yes' } },
      { type: 'FaqItem', props: { id: 'fun-faq-2', question: 'Can I withdraw my profits?', answer: 'Yes. You can withdraw your profits at any time. There are no lock-in periods or hidden withdrawal restrictions.', openByDefault: 'no' } },
      { type: 'FaqItem', props: { id: 'fun-faq-3', question: 'What if I have no crypto experience?', answer: 'No problem. Your partner guides you through everything — from creating a wallet to activating the trading bot.', openByDefault: 'no' } },
    ],
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// Template registry
// ─────────────────────────────────────────────────────────────────────────────

export const TEMPLATE_REGISTRY: Record<string, { label: string; description: string; data: PuckData }> = {
  'homepage-standard': {
    label: '🏠 Homepage Standard',
    description: 'Hero → Stats → Features → How It Works → Testimonials → CTA',
    data: HOMEPAGE_STANDARD,
  },
  'product-page': {
    label: '📦 Product Page',
    description: 'HeroBlue → Trust Stats → Product Cards → Pricing → FAQ → CTA',
    data: PRODUCT_PAGE,
  },
  'campaign-landing': {
    label: '🎯 Campaign Landing',
    description: 'HeroDark → Video → Benefits → Social Proof → Pricing Offer → CTA',
    data: CAMPAIGN_LANDING,
  },
  'onboarding-page': {
    label: '🚶 Onboarding Guide',
    description: 'HeroBlue → 5-Step Process → FAQ → CTA',
    data: ONBOARDING_PAGE,
  },
  'webinar-landing': {
    label: '🎬 Webinar / Masterclass',
    description: 'HeroDark (event) → Video → Benefits → Attendee Proof → CTA',
    data: WEBINAR_LANDING,
  },
  'comparison-page': {
    label: '⚖️ Comparison / Why Us',
    description: 'PageHeader → Advantages → Trust Signals → Testimonials → CTA',
    data: COMPARISON_PAGE,
  },
  'trust-proof-page': {
    label: '🛡️ Trust & Proof',
    description: 'HeroBlue → Trust Cards → Quote → Video → Stats → CTA',
    data: TRUST_PROOF_PAGE,
  },
  'cta-landing': {
    label: '⚡ Direct CTA Landing',
    description: 'HeroDark (single CTA) → Benefits → Featured Offer → CTA',
    data: CTA_LANDING,
  },
  'campaign-funnel': {
    label: '🔥 Full Campaign Funnel',
    description: 'Hero → Ticker → Stats → Benefits → Quote → Pricing → FAQ → CTA',
    data: CAMPAIGN_FUNNEL,
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

