/**
 * Reusable Section Seeds — Pre-built operational blocks for the AutoPuck section library.
 *
 * These are curated building blocks that operators can drop into any page.
 * Each seed is a complete SectionBox with nested content, ready to insert.
 *
 * GOVERNANCE:
 *   - Uses ONLY approved components from puck.config.tsx
 *   - No raw colors, no custom layout
 *   - Realistic AutoPilotROI copy (editable by operator after insertion)
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SectionSeed = {
  name: string
  category: string
  data: Record<string, unknown>
}

export const SECTION_SEEDS: SectionSeed[] = [
  // ─── HERO SECTIONS ───────────────────────────────────────────────

  {
    name: 'Hero — Campaign Launch (Dark)',
    category: 'hero',
    data: {
      type: 'HeroDark',
      props: {
        id: 'seed-hero-dark-1',
        badge: '✦ Limited Time Offer',
        title: 'Your Money,',
        highlightedText: 'Working 24/7',
        description: 'Start your journey with AutoPilotROI — AI-powered crypto trading managed for you. Begin with just $100 USDT.',
        ctaLabel: 'Start Now →',
        ctaHref: '/signup',
        bulletOne: 'Start with $100 USDT',
        bulletTwo: 'AI runs 24/7',
        bulletThree: 'Guided onboarding',
        videoUrl: '',
        videoThumb: '',
      },
    },
  },

  {
    name: 'Hero — Trust & Authority (Blue)',
    category: 'hero',
    data: {
      type: 'HeroBlue',
      props: {
        id: 'seed-hero-blue-1',
        eyebrow: 'Trusted by 12,000+ Members',
        title: 'Built on Transparency',
        description: 'AutoPilotROI is your structured guide into the Aurum ecosystem — with real compliance, real results, and real support.',
        ctaLabel: 'See Our Proof →',
        ctaHref: '/trust',
      },
    },
  },

  // ─── CTA SECTIONS ────────────────────────────────────────────────

  {
    name: 'CTA Strip — Onboarding (Blue)',
    category: 'cta',
    data: {
      type: 'SectionBox',
      props: {
        id: 'seed-cta-onboard-section',
        sectionName: 'CTA — Start Onboarding',
        variant: 'navy',
        padding: 'lg',
      },
      zones: {
        'seed-cta-onboard-section:content': [
          {
            type: 'CTAStrip',
            props: {
              id: 'seed-cta-onboard-strip',
              eyebrow: 'Get Started Today',
              headline: 'Ready to Activate Your Portfolio?',
              body: 'Join thousands of members who trust AutoPilotROI to manage their investments with AI-powered precision.',
              ctaLabel: 'Start Onboarding →',
              ctaHref: '/signup',
              variant: 'onboarding',
            },
          },
        ],
      },
    },
  },

  {
    name: 'CTA Strip — Urgency / Limited Offer',
    category: 'cta',
    data: {
      type: 'SectionBox',
      props: {
        id: 'seed-cta-urgency-section',
        sectionName: 'CTA — Urgency Offer',
        variant: 'white',
        padding: 'lg',
      },
      zones: {
        'seed-cta-urgency-section:content': [
          {
            type: 'CTAStrip',
            props: {
              id: 'seed-cta-urgency-strip',
              eyebrow: 'Limited Time',
              headline: 'Lock In Your Spot Before Prices Increase',
              body: 'Early members get priority access to new features and dedicated onboarding support.',
              ctaLabel: 'Claim Your Spot →',
              ctaHref: '/signup',
              variant: 'urgency',
            },
          },
        ],
      },
    },
  },

  // ─── TRUST & PROOF ───────────────────────────────────────────────

  {
    name: 'Trust — Social Proof (3 Testimonials)',
    category: 'trust',
    data: {
      type: 'SectionBox',
      props: {
        id: 'seed-trust-testimonials',
        sectionName: 'Member Testimonials',
        variant: 'surface',
        padding: 'lg',
      },
      zones: {
        'seed-trust-testimonials:content': [
          {
            type: 'SectionHeader',
            props: {
              id: 'seed-trust-header',
              title: 'What Our Members Say',
              subtitle: 'Real stories from real AutoPilotROI members.',
              alignment: 'center',
            },
          },
          {
            type: 'CardGrid',
            props: {
              id: 'seed-trust-grid',
              columns: '3',
            },
            zones: {
              'seed-trust-grid:cards': [
                {
                  type: 'TestimonialCard',
                  props: {
                    id: 'seed-testimonial-1',
                    quote: 'I was skeptical at first, but the onboarding process made everything approachable. Results speak for themselves.',
                    author: 'Marcus T.',
                    role: 'Member since 2024',
                    company: '',
                    starRating: '5',
                    memberInitials: 'MT',
                    avatarUrl: '',
                    cardStyle: 'featured',
                  },
                },
                {
                  type: 'TestimonialCard',
                  props: {
                    id: 'seed-testimonial-2',
                    quote: 'The transparency is what sold me. I can see exactly what the bot is doing with my portfolio at any time.',
                    author: 'Sarah L.',
                    role: 'Member since 2025',
                    company: '',
                    starRating: '5',
                    memberInitials: 'SL',
                    avatarUrl: '',
                    cardStyle: 'standard',
                  },
                },
                {
                  type: 'TestimonialCard',
                  props: {
                    id: 'seed-testimonial-3',
                    quote: 'Started with $100 just to test. Now I recommend it to everyone in my network. The AI does the heavy lifting.',
                    author: 'James K.',
                    role: 'Partner since 2024',
                    company: '',
                    starRating: '5',
                    memberInitials: 'JK',
                    avatarUrl: '',
                    cardStyle: 'standard',
                  },
                },
              ],
            },
          },
        ],
      },
    },
  },

  {
    name: 'Trust — Stats Bar',
    category: 'trust',
    data: {
      type: 'SectionBox',
      props: {
        id: 'seed-stats-section',
        sectionName: 'Stats Bar',
        variant: 'white',
        padding: 'lg',
      },
      zones: {
        'seed-stats-section:content': [
          {
            type: 'StatRow',
            props: {
              id: 'seed-stats-row',
              stat1Label: 'Active Members',
              stat1Value: '12,000+',
              stat2Label: 'Countries',
              stat2Value: '45+',
              stat3Label: 'Portfolio Uptime',
              stat3Value: '99.9%',
              stat4Label: 'Min. Investment',
              stat4Value: '$100',
            },
          },
        ],
      },
    },
  },

  // ─── PRICING ─────────────────────────────────────────────────────

  {
    name: 'Pricing — Featured Offer',
    category: 'pricing',
    data: {
      type: 'SectionBox',
      props: {
        id: 'seed-pricing-section',
        sectionName: 'Pricing — Featured Offer',
        variant: 'surface',
        padding: 'xl',
      },
      zones: {
        'seed-pricing-section:content': [
          {
            type: 'SectionHeader',
            props: {
              id: 'seed-pricing-header',
              title: 'Choose Your Plan',
              subtitle: 'Start small and scale as you grow. No lock-in contracts.',
              alignment: 'center',
            },
          },
          {
            type: 'PricingCard',
            props: {
              id: 'seed-pricing-card-1',
              planName: 'Starter',
              planTagline: 'Perfect for first-time investors.',
              priceDisplay: '$100 USDT minimum',
              feature1: 'Activate the EX-AI Trading Bot',
              feature2: 'AI-managed 24/7 portfolio',
              feature3: 'Access to Aurum University',
              feature4: 'Dedicated support',
              feature5: '',
              feature6: '',
              feature7: '',
              feature8: '',
              ctaLabel: 'Get Started →',
              ctaHref: '/signup',
              badge: 'Most Popular',
              guaranteeBadge: '30-day satisfaction guarantee',
              countdownText: '',
              cardStyle: 'featured',
            },
          },
        ],
      },
    },
  },

  // ─── CONTENT SECTIONS ────────────────────────────────────────────

  {
    name: 'Onboarding — 3-Step Funnel',
    category: 'content',
    data: {
      type: 'SectionBox',
      props: {
        id: 'seed-onboarding-section',
        sectionName: 'How to Get Started',
        variant: 'white',
        padding: 'lg',
      },
      zones: {
        'seed-onboarding-section:content': [
          {
            type: 'SectionHeader',
            props: {
              id: 'seed-onboarding-header',
              title: 'Get Started in 3 Simple Steps',
              subtitle: 'Our guided onboarding makes it easy to begin.',
              alignment: 'center',
            },
          },
          {
            type: 'FunnelSteps',
            props: {
              id: 'seed-funnel-steps',
              stepTitle1: 'Complete Your Assessment',
              stepBody1: 'Answer a few questions about your financial goals and experience level.',
              stepTitle2: 'Set Up Your Wallet',
              stepBody2: 'Follow our guided setup to configure your USDT wallet securely.',
              stepTitle3: 'Activate the EX-AI Bot',
              stepBody3: 'Connect to the Aurum ecosystem and let AI manage your portfolio 24/7.',
              stepTitle4: '',
              stepBody4: '',
              ctaLabel: 'Start Onboarding →',
              ctaHref: '/onboarding',
              style: 'horizontal',
            },
          },
        ],
      },
    },
  },

  {
    name: 'Benefits — 3-Column Features',
    category: 'content',
    data: {
      type: 'SectionBox',
      props: {
        id: 'seed-benefits-section',
        sectionName: 'Key Benefits',
        variant: 'white',
        padding: 'lg',
      },
      zones: {
        'seed-benefits-section:content': [
          {
            type: 'SectionHeader',
            props: {
              id: 'seed-benefits-header',
              title: 'Why Choose AutoPilotROI?',
              subtitle: 'Everything you need to succeed with AI-powered investing.',
              alignment: 'center',
            },
          },
          {
            type: 'FeatureGrid',
            props: {
              id: 'seed-benefits-grid',
              columns: '3',
            },
            zones: {
              'seed-benefits-grid:features': [
                {
                  type: 'FeatureCard',
                  props: {
                    id: 'seed-feature-1',
                    icon: 'Zap',
                    iconColorPreset: 'brand-blue',
                    title: 'AI-Powered Trading',
                    description: 'The EX-AI bot manages your portfolio 24/7 with advanced algorithms.',
                  },
                },
                {
                  type: 'FeatureCard',
                  props: {
                    id: 'seed-feature-2',
                    icon: 'Shield',
                    iconColorPreset: 'emerald',
                    title: 'Secure & Transparent',
                    description: 'Full visibility into your portfolio with enterprise-grade security.',
                  },
                },
                {
                  type: 'FeatureCard',
                  props: {
                    id: 'seed-feature-3',
                    icon: 'Users',
                    iconColorPreset: 'violet',
                    title: 'Community Support',
                    description: 'Join 12,000+ members with dedicated onboarding and partner support.',
                  },
                },
              ],
            },
          },
        ],
      },
    },
  },

  // ─── LEAD CAPTURE ────────────────────────────────────────────────

  {
    name: 'Lead Capture — Card Form',
    category: 'cta',
    data: {
      type: 'SectionBox',
      props: {
        id: 'seed-lead-section',
        sectionName: 'Lead Capture Form',
        variant: 'surface',
        padding: 'lg',
      },
      zones: {
        'seed-lead-section:content': [
          {
            type: 'FormBlock',
            props: {
              id: 'seed-form-block',
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
          },
        ],
      },
    },
  },

  // ─── FAQ ─────────────────────────────────────────────────────────

  {
    name: 'FAQ — Common Questions',
    category: 'faq',
    data: {
      type: 'SectionBox',
      props: {
        id: 'seed-faq-section',
        sectionName: 'Frequently Asked Questions',
        variant: 'white',
        padding: 'lg',
      },
      zones: {
        'seed-faq-section:content': [
          {
            type: 'SectionHeader',
            props: {
              id: 'seed-faq-header',
              title: 'Frequently Asked Questions',
              subtitle: 'Answers to the most common questions about AutoPilotROI.',
              alignment: 'center',
            },
          },
          {
            type: 'FaqGroup',
            props: {
              id: 'seed-faq-group',
            },
            zones: {
              'seed-faq-group:items': [
                {
                  type: 'FaqItem',
                  props: {
                    id: 'seed-faq-1',
                    question: 'What is the minimum investment to get started?',
                    answer: 'You can start with as little as $100 USDT. This is enough to activate the EX-AI Trading Bot and begin earning.',
                  },
                },
                {
                  type: 'FaqItem',
                  props: {
                    id: 'seed-faq-2',
                    question: 'How does the EX-AI Trading Bot work?',
                    answer: 'The bot uses advanced AI algorithms to trade cryptocurrency markets 24/7 on your behalf, optimizing for consistent returns.',
                  },
                },
                {
                  type: 'FaqItem',
                  props: {
                    id: 'seed-faq-3',
                    question: 'Is my investment secure?',
                    answer: 'Yes. Your funds remain in your own wallet. The bot only has trading authority — never withdrawal access. All operations are transparent.',
                  },
                },
              ],
            },
          },
        ],
      },
    },
  },

  {
    name: 'Webinar — Registration Block',
    category: 'cta',
    data: {
      type: 'SectionBox',
      props: {
        id: 'seed-webinar-section',
        sectionName: 'Webinar Registration',
        variant: 'navy',
        padding: 'lg',
      },
      zones: {
        'seed-webinar-section:content': [
          {
            type: 'CTAStrip',
            props: {
              id: 'seed-webinar-strip',
              eyebrow: 'Live Event',
              headline: 'Free Masterclass: AI-Powered Investing 101',
              body: 'Learn how to leverage the Aurum ecosystem to build passive income with AI trading. Limited seats available.',
              ctaLabel: 'Reserve Your Seat →',
              ctaHref: '/webinar',
              variant: 'webinar',
            },
          },
        ],
      },
    },
  },
]
