/**
 * Readiness Assessment Scoring Algorithm
 * ─────────────────────────────────────────
 * Each question has weighted points.
 * Final score is normalized to 0–100.
 * Tier: 0–35 = Beginner, 36–70 = Intermediate, 71–100 = Advanced
 */

export interface ReadinessQuestion {
  key: string
  question: string
  description: string
  options: { label: string; value: string; points: number }[]
  weight: number // multiplier for this question's importance
}

export const READINESS_QUESTIONS: ReadinessQuestion[] = [
  {
    key: 'crypto_wallets',
    question: 'How familiar are you with crypto wallets?',
    description: 'E.g. MetaMask, Trust Wallet, Ledger',
    weight: 1.5,
    options: [
      { label: 'Never used one', value: 'none', points: 0 },
      { label: 'I\'ve heard of them but never set one up', value: 'aware', points: 1 },
      { label: 'I have one but rarely use it', value: 'basic', points: 2 },
      { label: 'I use wallets regularly', value: 'advanced', points: 3 },
    ],
  },
  {
    key: 'vpn_usage',
    question: 'Do you currently use a VPN?',
    description: 'A VPN is required for certain platform features',
    weight: 1.0,
    options: [
      { label: 'What\'s a VPN?', value: 'none', points: 0 },
      { label: 'I know what it is but don\'t use one', value: 'aware', points: 1 },
      { label: 'I have one but don\'t use it often', value: 'basic', points: 2 },
      { label: 'I use a VPN regularly', value: 'advanced', points: 3 },
    ],
  },
  {
    key: 'stablecoins',
    question: 'How familiar are you with USDT / stablecoins?',
    description: 'Stablecoins like USDT are used for deposits and transactions',
    weight: 1.5,
    options: [
      { label: 'Never heard of them', value: 'none', points: 0 },
      { label: 'I\'ve heard the term but don\'t know how they work', value: 'aware', points: 1 },
      { label: 'I understand them but haven\'t bought any', value: 'basic', points: 2 },
      { label: 'I own and use stablecoins', value: 'advanced', points: 3 },
    ],
  },
  {
    key: 'exchange_experience',
    question: 'Have you used a cryptocurrency exchange?',
    description: 'E.g. Coinbase, Binance, Kraken, Bybit',
    weight: 1.5,
    options: [
      { label: 'Never', value: 'none', points: 0 },
      { label: 'I\'ve created an account but never traded', value: 'aware', points: 1 },
      { label: 'I\'ve made a few trades', value: 'basic', points: 2 },
      { label: 'I trade regularly', value: 'advanced', points: 3 },
    ],
  },
  {
    key: 'investment_comfort',
    question: 'How comfortable are you with investing?',
    description: 'Any type of investing — stocks, crypto, real estate, etc.',
    weight: 1.0,
    options: [
      { label: 'I\'ve never invested anything', value: 'none', points: 0 },
      { label: 'I\'ve thought about it but haven\'t started', value: 'aware', points: 1 },
      { label: 'I have some investments', value: 'basic', points: 2 },
      { label: 'I actively manage a portfolio', value: 'advanced', points: 3 },
    ],
  },
  {
    key: 'defi_knowledge',
    question: 'How familiar are you with DeFi / Web3?',
    description: 'Decentralized finance, yield farming, liquidity pools, etc.',
    weight: 1.0,
    options: [
      { label: 'No idea what that means', value: 'none', points: 0 },
      { label: 'I\'ve heard the terms', value: 'aware', points: 1 },
      { label: 'I understand the basics', value: 'basic', points: 2 },
      { label: 'I actively participate in DeFi', value: 'advanced', points: 3 },
    ],
  },
  {
    key: 'tech_comfort',
    question: 'How would you rate your general tech comfort?',
    description: 'Installing apps, managing accounts, security practices',
    weight: 0.8,
    options: [
      { label: 'I struggle with technology', value: 'none', points: 0 },
      { label: 'I can handle the basics', value: 'aware', points: 1 },
      { label: 'I\'m comfortable with most tech', value: 'basic', points: 2 },
      { label: 'I\'m very tech-savvy', value: 'advanced', points: 3 },
    ],
  },
  {
    key: 'time_commitment',
    question: 'How much time can you dedicate to learning the platform?',
    description: 'The onboarding process includes training materials and setup steps',
    weight: 0.7,
    options: [
      { label: 'Very limited — just want it to work', value: 'none', points: 1 },
      { label: '30 minutes per week', value: 'aware', points: 2 },
      { label: '1–2 hours per week', value: 'basic', points: 2 },
      { label: 'Whatever it takes to learn it properly', value: 'advanced', points: 3 },
    ],
  },
]

export type ReadinessTier = 'beginner' | 'intermediate' | 'advanced'

export interface ReadinessResult {
  score: number // 0–100
  tier: ReadinessTier
  tierLabel: string
  tierDescription: string
}

export function calculateReadiness(
  answers: Record<string, string>
): ReadinessResult {
  let totalWeightedPoints = 0
  let maxWeightedPoints = 0

  for (const question of READINESS_QUESTIONS) {
    const answer = answers[question.key]
    const option = question.options.find((o) => o.value === answer)
    const maxOption = question.options.reduce(
      (max, o) => (o.points > max.points ? o : max),
      question.options[0]
    )

    totalWeightedPoints += (option?.points ?? 0) * question.weight
    maxWeightedPoints += maxOption.points * question.weight
  }

  const score =
    maxWeightedPoints > 0
      ? Math.round((totalWeightedPoints / maxWeightedPoints) * 100)
      : 0

  let tier: ReadinessTier
  let tierLabel: string
  let tierDescription: string

  if (score <= 35) {
    tier = 'beginner'
    tierLabel = 'Beginner'
    tierDescription =
      'No worries! Your partner will walk you through everything step by step. The onboarding process covers all the basics.'
  } else if (score <= 70) {
    tier = 'intermediate'
    tierLabel = 'Intermediate'
    tierDescription =
      'You\'ve got a solid foundation. Your partner will help fill in the gaps and get you set up quickly.'
  } else {
    tier = 'advanced'
    tierLabel = 'Advanced'
    tierDescription =
      'You know your way around. Your partner will fast-track your setup and get you earning faster.'
  }

  return { score, tier, tierLabel, tierDescription }
}
