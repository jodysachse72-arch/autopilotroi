// ─────────────────────────────────────────────
// Homepage content — all copy in one place
// CMS-ready: swap source for Supabase later
// ─────────────────────────────────────────────
import type { StatItem, AdvantageCard, JourneyStep, TeamBenefit, Testimonial } from './types'

export const hero = {
  badge: 'Team AutoPilot ROI · Official Aurum Onboarding',
  headlineLine1: 'The guided gateway',
  headlineLine2: 'into',
  headlineAccent: 'AI-managed',
  headlineLine3: 'finance.',
  subheadline:
    "Don't navigate Aurum alone. Team AutoPilot ROI educates you first, places you in an active growing downline, and walks you through every step with personal support.",
  primaryCta: { label: 'Find My Spot in the Queue →', href: '/start' },
  secondaryCta: { label: 'Watch Overview', href: '#' },
}

export const stats: StatItem[] = [
  { value: '2,400+', label: 'Active Members' },
  { value: '40+', label: 'Countries' },
  { value: '3-Deep', label: 'Spillover System' },
  { value: 'Auto', label: 'Downline Building' },
]

export const floatingCards = {
  botStatus: { label: 'AI Bot Status', status: 'Live ✓', sub: 'Trading 24/7' },
  readinessScore: { label: 'Your Score', value: '72', sub: 'Ready ✓' },
  nextInQueue: { label: 'Next in Queue', value: 'YOU →', sub: 'Spot available' },
}

export const partnerStrip = {
  label: 'Powered by',
  partners: [
    'Binance', 'Bybit', 'KuCoin', 'HTX',
    'Visa Crypto Card', 'Gold RWA Trading', 'EX-AI Bot',
    'Zeus AI Bot', 'Web3 NeoBank', 'Aurum Foundation',
  ],
}

export const whyJoin = {
  eyebrow: 'Why Team AutoPilot ROI',
  headline: "Joining through us isn't just easier — it's smarter.",
  body: "When you join Aurum directly you're on your own. When you join through Team AutoPilot ROI, you enter a structured, educated, team-backed pathway that builds your downline automatically.",
  cards: [
    {
      id: '01',
      icon: '🔗',
      title: 'Automatic Downline Building',
      body: "Our 3-deep spillover model means once your levels fill, new signups auto-route to the next person in your downline. Your team grows even while you sleep.",
      badge: 'Our #1 Advantage',
    },
    {
      id: '02',
      icon: '🎓',
      title: 'Education Before Investment',
      body: 'Aurum University walks you through every video and resource before you commit. Full clarity, zero pressure — you decide when you\'re ready.',
    },
    {
      id: '03',
      icon: '✅',
      title: 'Correct Referral Attribution',
      body: 'Your referral code follows you through every step. Partners get notified instantly and the right person gets credit — always.',
    },
    {
      id: '04',
      icon: '🤝',
      title: 'Partner Approval System',
      body: "Your partner personally reviews your profile and walks you through Aurum signup with your referral code. Never handed a link and left alone.",
    },
    {
      id: '05',
      icon: '📊',
      title: 'Partner Dashboard',
      body: 'Partners see every prospect, their readiness score, journey stage, and can approve or message them from one clean dashboard.',
    },
    {
      id: '06',
      icon: '🌍',
      title: 'A Real Global Team',
      body: '2,400+ members across 40+ countries — all onboarded through this same structured system. You\'re joining a team actively building around you.',
    },
  ] as AdvantageCard[],
}

export const aurumProducts = {
  eyebrow: 'Powered by Aurum',
  headline: 'AI-managed finance\nis the future.',
  subheadline:
    "Aurum's EX-AI Bot analyzes global crypto markets 24/7, executes trades automatically, and credits returns — no experience required. Team AutoPilot ROI is your structured path in.",
  products: [
    {
      icon: '🤖',
      title: 'AI Trading Bot — 24/7 Automation',
      body: 'The EX-AI Bot trades BTC, ETH, USDT and more across Binance, Bybit, and KuCoin automatically, around the clock.',
    },
    {
      icon: '💳',
      title: 'Visa Crypto Debit Card',
      body: 'Spend your crypto earnings anywhere Visa is accepted — 80M+ merchants globally. No conversion needed.',
    },
    {
      icon: '🥇',
      title: 'Gold RWA Trading — New in 2026',
      body: 'Tokenized real-world gold from African suppliers at ~30% below spot. AI-driven trading, physical delivery option.',
    },
    {
      icon: '🏦',
      title: 'Web3 NeoBank',
      body: 'Manage crypto and fiat in one account with Swift, SEPA, real-time portfolio tracking, and 24/7 support.',
    },
  ],
}

export const journey = {
  eyebrow: 'The Path In',
  headline: 'Four steps from curious\nto confident.',
  subheadline:
    'A guided pathway so you always know exactly what to do next — and exactly where you stand in the process.',
  steps: [
    {
      number: '1',
      title: 'Take the Orientation',
      body: '8 quick questions about your background, goals, and experience. Under 5 minutes.',
    },
    {
      number: '2',
      title: 'Get Your Readiness Score',
      body: 'Personalised score — Beginner, Exploring, Ready, or Partner Potential — with a tailored next-step plan.',
    },
    {
      number: '3',
      title: 'Aurum University',
      body: '16 structured videos, due diligence reports, and FAQs. Learn everything before committing a dollar.',
    },
    {
      number: '4',
      title: 'Join with Support',
      body: 'Your partner walks you through Aurum signup with the correct referral code. Placed in the right spot.',
    },
  ] as JourneyStep[],
}

export const readinessScore = {
  eyebrow: 'Know Before You Commit',
  headline: 'Your Readiness Score tells you exactly where you stand.',
  body: "Our orientation quiz analyses your crypto experience, capital range, and goals. In 5 minutes you know your category and your personalised next-step plan.",
  cta: { label: 'Take the Free Orientation →', href: '/start' },
  tiers: [
    { label: 'Beginner', range: '0–39' },
    { label: 'Exploring', range: '40–59' },
    { label: 'Ready', range: '60–79' },
    { label: 'Partner+', range: '80–100' },
  ],
  exampleScore: { value: '72', label: 'Ready' },
}

export const spillover = {
  headline: 'How the Spillover Works',
  description:
    'Once your 3 direct levels fill, new team signups automatically route to the next open position — building your network from activity you didn\'t personally generate.',
}

export const teamAdvantage = {
  eyebrow: 'The Team Advantage',
  headline: 'Your team builds\naround you.',
  subheadline:
    "What makes AutoPilot ROI fundamentally different from joining Aurum directly. You benefit from the whole team's growth — not just your own referrals.",
  benefits: [
    {
      icon: '🔒',
      title: 'Partners own their referrals',
      body: 'The system never reassigns leads. Your referral is yours permanently with full tracking and instant notifications.',
    },
    {
      icon: '⚡',
      title: 'Automatic queue routing',
      body: 'No spreadsheets, no manual tracking. The system assigns the correct referral code automatically and notifies the right partner instantly.',
    },
    {
      icon: '📬',
      title: 'Instant partner notifications',
      body: 'Every time a new signup enters your line, your partner dashboard updates and you get notified to reach out personally.',
    },
    {
      icon: '📊',
      title: 'Full dashboard visibility',
      body: "See every prospect's readiness score, journey stage, and status in real time. Approve, message, or release their Aurum invite link directly.",
    },
  ] as TeamBenefit[],
}

export const testimonials = {
  eyebrow: 'Member Stories',
  headline: 'Real people. Real results.',
  subheadline: 'From 40+ countries, onboarded the structured way.',
  items: [
    {
      initials: 'MT',
      name: 'Maria T.',
      location: 'New Zealand · Level 2 Member',
      quote:
        'I tried to join Aurum directly and got completely lost. AutoPilot ROI walked me through everything step by step. I actually understood what I was getting into before I invested a cent.',
    },
    {
      initials: 'JO',
      name: 'James O.',
      location: 'United Kingdom · Partner Level',
      quote:
        "The downline structure sold me. I've had 3 people placed in my downline from spillover I didn't personally generate. The team is genuinely building around me.",
    },
    {
      initials: 'AK',
      name: 'Amara K.',
      location: 'Ghana · Ready Level',
      quote:
        'The Aurum Visa card was proof enough — I\'m spending my crypto earnings at the grocery store. The education hub made me confident before I ever deposited anything.',
    },
  ] as Testimonial[],
}

export const finalCta = {
  headline: 'Your Spot Is Waiting',
  subheadline: 'Find out where you fit\nin 5 minutes.',
  body: 'Take the free orientation. Get your Readiness Score. Your referring partner will walk you through the rest — personally.',
  primaryCta: { label: 'Start My Orientation →', href: '/start' },
  secondaryCta: { label: 'Watch the Overview', href: '#' },
}
