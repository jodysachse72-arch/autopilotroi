export const homeMockup = {
  hero: {
    eyebrow: 'Product-led finance platform',
    title: ['A Smarter Entry Point', 'Into AI-Driven Finance'],
    description:
      'Automated performance, digital banking, crypto tools, and guided onboarding built into one product experience.',
    primaryCta: { label: 'Watch Overview', href: '/start' },
    secondaryCta: { label: 'How It Works', href: '#how-it-works' },
    accountValue: '$24,529.00',
    accountLabel: 'Illustrative seven-day system value',
    metrics: [
      ['Yield engine', '+18.4%'],
      ['Transfers', '12 queued'],
      ['Accounts', '4 connected'],
    ],
    navItems: ['Dashboard', 'Automation', 'Cards', 'Exchange', 'Banking'],
  },
  features: [
    {
      title: 'AI Automation',
      description: 'Automated performance, with advanced crypto-fintech tools.',
    },
    {
      title: 'Digital Banking',
      description: 'Pull control of your funds with modern banking features.',
    },
    {
      title: 'Crypto Infrastructure',
      description: 'Access and manage the tools of the new financial system.',
    },
  ],
  productSuite: {
    eyebrow: 'Our Product Suite',
    description:
      'A single product family designed to turn the homepage promise into actual platform surfaces.',
    cards: [
      {
        title: 'BOTS',
        description: 'Automated trading strategies that work 24/7 for you.',
        accent: 'AI execution',
        tone: 'from-sky-500/45 via-blue-700/35 to-slate-950',
      },
      {
        title: 'CRYPTO CARD',
        description: 'Spend your digital assets anywhere, anytime.',
        accent: 'Card utility',
        tone: 'from-cyan-300/55 via-blue-500/25 to-slate-950',
      },
      {
        title: 'EXCHANGE',
        description: 'Buy, sell, and manage crypto with low fees.',
        accent: 'Market access',
        tone: 'from-blue-400/45 via-indigo-700/25 to-slate-950',
      },
      {
        title: 'NEO BANK',
        description: 'Seamless fiat and crypto banking in one secure app.',
        accent: 'Unified accounts',
        tone: 'from-slate-300/35 via-blue-400/20 to-slate-950',
      },
    ],
    ctaLabel: 'Learn More',
  },
  steps: {
    eyebrow: 'Action Steps',
    title: 'Register Your AutopilotROI Account',
    description:
      'Follow these steps to unlock access to the onboarding system and begin your setup.',
    items: [
      {
        step: 'Step 1',
        title: 'Click “Get Started”',
        description: 'Press the button below to begin your registration.',
      },
      {
        step: 'Step 2',
        title: 'Create Your Free Account',
        description: 'Enter your details and create a secure account.',
      },
      {
        step: 'Step 3',
        title: 'Verify & Log In',
        description: 'Check your email to verify, then log in to your account.',
      },
      {
        step: 'Step 4',
        title: 'Access Your Dashboard',
        description: 'You are now inside your tools and ready to begin onboarding.',
      },
    ],
    checklist: ['Quick & Easy', 'Secure', 'Get Started in Minutes'],
  },
  finalCta: {
    title: 'Ready to Take the Next Step?',
    description:
      'The visual direction is now aligned to a real product homepage. The next phase is turning each section into live product flows.',
    primaryCta: { label: 'Get Started', href: '/start' },
    secondaryCta: { label: 'Explore Resources', href: '/resources' },
  },
} as const
