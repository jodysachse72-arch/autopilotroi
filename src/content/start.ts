// ─────────────────────────────────────────────
// /start page content — onboarding steps
// CMS-ready: swap source for Supabase later
// ─────────────────────────────────────────────
import type { OnboardingStep } from './types'

export const startMeta = {
  badge: 'Step-by-Step Onboarding',
  headline: 'Your path into Aurum starts here.',
  subheadline:
    "Follow each step in order. Watch Barry's video, then follow the written steps alongside it. Your partner is with you the whole way.",
  partnerCta: { label: 'Contact My Partner →', href: '#' },
  partnerNote: "Your partner is here for every step — not just to get you in, but to support you as an active member.",
  universityNote: "Each step links to Barry's exact Aurum University video. Watch first, then follow the written instructions.",
}

export const progressSteps = [
  { label: 'Orientation', status: 'complete' },
  { label: 'Score', status: 'complete' },
  { label: 'Get Started', status: 'current' },
  { label: 'University', status: 'locked' },
  { label: 'Live in Aurum', status: 'locked' },
]

export const onboardingSteps: OnboardingStep[] = [
  {
    id: 1,
    symbol: '✓',
    title: 'Get Trust Wallet',
    subtitle: 'Your non-custodial crypto wallet — you own your keys',
    status: 'complete',
    why: 'Aurum operates in DeFi — you need a self-custody wallet to move USDT into your account. Trust Wallet is free, takes 5 minutes, iOS & Android. You own your funds, nobody else has access.',
    link: { label: 'Download Trust Wallet — trustwallet.com · iOS & Android · Free', href: 'https://trustwallet.com' },
    instructions: [
      { text: 'Download from App Store or Google Play — Blue shield icon. Only from official app stores — never a third-party link.' },
      {
        text: 'Create wallet & write down your 12-word seed phrase — This is your master key. Write it on paper, store safely. Never share with anyone — ever.',
        warning: 'Lose this = lose your funds permanently. No recovery exists.',
      },
      { text: 'Enable USDT (TRC-20) in your wallet — Search USDT in the token list and add TRC-20. This is the version Aurum uses for deposits.' },
    ],
  },
  {
    id: 2,
    symbol: '✓',
    title: 'Set Up Your VPN',
    subtitle: 'Required for US & Canada users to access Aurum',
    status: 'complete',
    warning: 'US & Canada users: Aurum requires a VPN while US regulatory licensing is finalized. Route through UK or Mexico — both work reliably. Legal and widely used.',
    tip: 'Outside US/Canada? Skip straight to Step 3.',
    instructions: [
      { text: 'Download NordVPN or ExpressVPN — Both work for Aurum. NordVPN has a trial period to test first.' },
      { text: 'Connect to a UK or Mexico server — UK servers are most stable for Aurum. Keep VPN on during all setup and transactions.', tip: 'Keep VPN active during account creation and all deposits.' },
    ],
  },
  {
    id: 3,
    symbol: '3',
    title: 'Get USDT into Trust Wallet',
    subtitle: 'Fund your wallet before creating your Aurum account',
    status: 'current',
    why: 'Aurum deposits use USDT (Tether) — a stablecoin pegged to USD. It doesn\'t fluctuate like Bitcoin. Minimum deposit is $100 USDT. Have your amount ready before creating your account.',
    instructions: [
      { text: 'Buy USDT on Coinbase, Kraken, or Binance — Create account, verify identity, purchase your USDT amount. Minimum $100.' },
      {
        text: 'Send USDT to your Trust Wallet (TRC-20 address) — Copy your Trust Wallet TRC-20 address. Paste it in the exchange withdrawal. Double-check before confirming.',
        warning: 'Always send a $1–$5 test transaction first to confirm the address.',
      },
      { text: 'Wait for confirmation (5–15 minutes) — TRC-20 is fast. USDT appears in Trust Wallet once confirmed. Ready for Step 4.' },
    ],
  },
  {
    id: 4,
    symbol: '4',
    title: 'Create Your Aurum Account',
    subtitle: "Use your partner's referral link — critical for correct attribution",
    status: 'locked',
    warning: "Do NOT sign up without your referral code. Your partner's referral link must be used at signup — without it you'll be placed under the wrong person and it cannot be changed later. Your partner will give you the exact link.",
    videoLabel: 'Aurum University · START HERE',
    videoNote: 'Product Overview Presentation — Full Aurum Walkthrough · 40:11 · Watch before signing up',
    link: { label: 'Aurum Back Office — Create Account', href: 'https://app.aurfrn.com/register' },
    instructions: [
      { text: 'Get your personal referral link from your partner — Your partner sends a unique signup URL that automatically tags your account correctly. Use this — don\'t go to Aurum directly.' },
      { text: 'Sign up with VPN active (US/Canada only) — Make sure VPN is connected to UK or Mexico before clicking the referral link and completing signup.' },
      { text: 'Complete KYC / identity verification — Have your ID ready. Basic verification — usually takes a few minutes.' },
      { text: 'Explore your back office dashboard — Familiarise yourself before depositing. Watch the Back Office Tutorial (14:19) in Resources.', tip: 'Resource: Back Office Tutorial → in your Resource Library' },
    ],
  },
  {
    id: 5,
    symbol: '5',
    title: 'Fund Your Account & Activate the Bot',
    subtitle: 'Deposit USDT and get the EX AI Bot trading — your money starts working',
    status: 'locked',
    videoLabel: 'Aurum University · US & Canada Setup',
    videoNote: 'Aurum Account Registration + EX AI Bot Activation (U.S. & Canada) — Screencast Tutorial · 12:37 · Step-by-step walkthrough',
    tip: 'Which bot is right for you? Aurum has EX AI Bot, EX AI Pro, and Zeus Bot. EX AI Bot is the standard starting point. Your partner can advise which tier fits your capital range and goals.',
    instructions: [
      {
        text: 'Deposit USDT: Trust Wallet → Aurum back office — Find the deposit section in your dashboard, copy the Aurum deposit address, send USDT from Trust Wallet. Minimum $100.',
        warning: 'Test with a small amount first. Always double-check the deposit address.',
      },
      { text: 'Choose your package / tier — Match your deposit amount to a tier. Higher tiers = higher monthly return percentages. See Packages & Percentages guide in Resources.' },
      { text: 'Activate the EX AI Bot — Once funded, activate your bot. It begins trading immediately — 24/7, across Binance, Bybit, and KuCoin automatically.' },
      { text: 'Set up Telegram notifications — Connect the Aurum Telegram bot for real-time trade notifications and balance updates to your phone.', tip: 'Tutorial: Aurum Telegram Notifications (1:19) → in Resources' },
    ],
    resources: [
      { icon: '🤖', type: 'Guide', title: 'Which Aurum AI Bot is Right For You?', source: 'Guide to choosing EX AI Bot, EX AI Pro & Zeus Bot', href: '#' },
      { icon: '📊', type: 'Video', duration: '12:49', title: 'Packages & Percentages — Back Office Tour', source: 'YouTube · AURUM UNIVERSITY', href: '#' },
    ],
  },
  {
    id: 6,
    symbol: '✦',
    title: 'Confirm with Your Partner',
    subtitle: "Let your partner know you're live — they'll confirm and unlock full Resources access",
    status: 'locked',
    why: "Your partner confirms you signed up under the correct referral code. This unlocks the full gated Resource Library and places you correctly in the team downline. Your partner also connects you to MASTERY calls and community channels.",
    instructions: [
      { text: "Message your partner — \"I'm in and my bot is active\" — Your partner verifies your account in the dashboard. One message is all it takes." },
      { text: 'Partner confirms — Resource Library unlocks — Full access to all gated resources: PDFs, training videos, due diligence docs, and Aurum social links.' },
      { text: 'Join the Aurum community channels — Your partner shares Telegram channels and upcoming MASTERY calls with Shane Morand — the real ongoing education.' },
    ],
    resources: [
      { icon: '💬', type: 'Telegram', title: 'Aurum Telegram — English Community', source: 't.me/aurum_eng · Official channel', href: 'https://t.me/aurum_eng' },
      { icon: '🏦', type: 'Telegram', title: 'Aurum NeoBank Telegram Bot', source: 't.me/aurumneobankbot · Crypto Visa Card & Zeus Bots', href: 'https://t.me/aurumneobankbot' },
      { icon: '🎓', type: 'YouTube', title: 'MASTERY Calls — Shane Morand', source: 'YouTube · Chief Network Development Officer', href: '#' },
    ],
  },
]

export const congratsMessage = {
  headline: "🎉 You're officially in Aurum!",
  body: "Your bot is live, your referral is correct, and your partner has confirmed you're part of Team AutoPilot ROI. Welcome.",
  cta: { label: '→ Access Resource Library', href: '/resources' },
  secondaryCta: { label: 'Aurum University', href: '/university' },
}
