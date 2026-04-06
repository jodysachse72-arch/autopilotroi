// ─────────────────────────────────────────────
// /resources page content — full library
// CMS-ready: swap source for Supabase later
// ─────────────────────────────────────────────
import type { ResourceSection, SocialChannel, BackOfficeLink } from './types'

export const resourcesMeta = {
  gateBadge: '🔒 Gated Resource Library — Team AutoPilot Members Only',
  gateDescription: 'You have access because your partner confirmed your Aurum signup. Keep this page bookmarked — it\'s updated regularly by Barry.',
  gateStatus: 'Logged in as Team Member · Full Access',
  curatorName: 'Barry Goss',
  lastUpdated: 'March 10, 2026',
  headline: 'Everything you need.',
  subheadline: 'All in one place.',
  description: 'Curated by Barry Goss and updated regularly. Presentations, interviews, due diligence, training, partner program — the full Aurum resource stack.',
  stats: [
    { value: '6', label: 'Sections' },
    { value: '30+', label: 'Resources' },
    { value: 'Live', label: 'Always Updated' },
  ],
}

export const resourceSections: ResourceSection[] = [
  {
    id: 'intro',
    icon: '😲',
    label: 'Intro & Presentations',
    title: 'Intro & Presentations',
    count: 6,
    description: "Start here if you're new. Full product overview, business opportunity docs, and the CEO's vision.",
    updatedDate: '3-9-26',
    resources: [
      { icon: '▶️', type: 'Video', duration: '40:11', title: 'Product Overview Presentation (HP) — Full Aurum Walkthrough', source: 'YouTube · AURUM UNIVERSITY · START HERE', href: '#', badge: 'Start Here' },
      { icon: '📄', type: 'PDF Document', title: 'Business Opportunity — Overview PDF', source: 'bit.ly/aurum-opportunity', href: 'https://bit.ly/aurum-opportunity' },
      { icon: '▶️', type: 'Video', duration: '5:41', title: '5-Minute Aurum Overview', source: 'YouTube · Quick intro for sharing', href: '#' },
      { icon: '▶️', type: 'Video', duration: '4:32', title: 'The 1000 Millionaires Mission — CEO Bryan Benson', source: 'YouTube · "Tip of the Iceberg" Talk', href: '#' },
      { icon: '▶️', type: 'Video', duration: '40:55', title: 'Singapore Presentation — Bryan Benson', source: 'Vimeo · Full keynote presentation', href: '#' },
      { icon: '📝', type: 'Article', duration: '15:22', title: "The ABC's of Printing Money in Your Sleep", source: "Barry's Bullets on Substack", href: '#' },
    ],
  },
  {
    id: 'product',
    icon: 'ℹ️',
    label: 'Product Info',
    title: 'Product Info & Updates',
    count: 5,
    description: 'Bot comparisons, withdrawal mechanics, compounding examples, and latest updates from Bryan Benson.',
    resources: [
      { icon: '🤖', type: 'Guide', title: 'Which Aurum AI Bot is Right For You?', source: 'EX AI Bot vs EX AI Pro vs Zeus Bot comparison', href: '#' },
      { icon: '📊', type: 'Guide', title: 'How the -35% Withdrawal Fee Works (EX AI Bot)', source: 'Important: Read before withdrawing', href: '#', badge: 'Must Read' },
      { icon: '▶️', type: 'Video', duration: '12:06', title: 'Aurum Product Updates — Bryan Benson', source: 'YouTube · Latest platform updates', href: '#' },
      { icon: '▶️', type: 'Video', duration: '5:49', title: 'Daily Compound Interest Example', source: 'Vimeo · How compounding works in practice', href: '#' },
      { icon: '▶️', type: 'Video', duration: '6:14', title: 'EX AI Bot Plan A vs Plan B — Compounding Examples', source: 'YouTube + Vimeo · Side-by-side comparison', href: '#' },
    ],
  },
  {
    id: 'interviews',
    icon: '🗣️',
    label: 'Interviews',
    title: 'Interviews & Q&As',
    count: 4,
    description: 'CEO vision, roadmap discussions, and media interviews. Great for due diligence and sharing with prospects.',
    resources: [
      { icon: '▶️', type: 'Video', duration: '31:39', title: 'Aurum Roadmap, Exchange Launch & Future Vision', source: 'YouTube + Vimeo · Bryan Benson deep dive', href: '#' },
      { icon: '▶️', type: 'Video', title: 'Aurum CEO Vision and Q&A', source: 'Vimeo · Password: aurumgold', href: '#', note: 'Password: aurumgold' },
      { icon: '📰', type: 'Media · Article', title: 'Entrepreneur Magazine Interviews Bryan Benson', source: 'bit.ly/benson-emag · Press coverage', href: 'https://bit.ly/benson-emag' },
      { icon: '▶️', type: 'Video', duration: '21:11', title: 'Bryan Benson & Brent Fulfer, VC — In-Depth Interview', source: 'YouTube · Venture capital perspective on Aurum', href: '#' },
    ],
  },
  {
    id: 'diligence',
    icon: '🔍',
    label: 'Due Diligence',
    title: 'Due Diligence & Proof of Trading',
    count: 6,
    description: 'Independent verification, proof of trading, and critical analysis. Education precedes allocation.',
    resources: [
      { icon: '🔍', type: 'Video', duration: '11:57', title: 'Why Aurum — Due Diligence Briefing', source: 'YouTube · AURUM UNIVERSITY', href: '#', badge: 'Start Here' },
      { icon: '✅', type: 'Video', duration: '17:03', title: 'Are the EX AI Bot Profits Real?', source: 'YouTube · AURUM UNIVERSITY', href: '#' },
      { icon: '▶️', type: 'Video', duration: '47:08', title: 'Dubai Launch Debriefing — January 2026', source: 'YouTube + Vimeo · Full event recap', href: '#', badge: 'New' },
      { icon: '📊', type: 'Video', duration: '20:01', title: 'Proof of Trading with Ricky, Brad & Dino', source: 'YouTube + Vimeo · Live trading verification', href: '#' },
      { icon: '▶️', type: 'Video', duration: '8:22', title: 'Trading Legitimacy Talk', source: 'YouTube · AURUM UNIVERSITY', href: '#' },
      { icon: '▶️', type: 'Video', duration: '6:14', title: 'Getting Pitched on AI Trading Bots?', source: 'YouTube · How to evaluate AI bot claims', href: '#' },
    ],
  },
  {
    id: 'partner',
    icon: '💸',
    label: 'Partner Program',
    title: 'Partner Program',
    count: 5,
    description: 'Everything about how the compensation plan works. PDFs, video deep dives, and fast start training.',
    resources: [
      { icon: '📄', type: 'PDF · Comprehensive', title: 'Partner Program — Extensive PDF', source: 'bit.ly/aurum-partner · Full comp plan details', href: 'https://bit.ly/aurum-partner' },
      { icon: '📄', type: 'PDF · Quick Reference', title: 'Partner Program — Simplified PDF', source: 'bit.ly/aurum-partner-program · One-page overview', href: 'https://bit.ly/aurum-partner-program' },
      { icon: '▶️', type: 'Video', duration: '29:01', title: 'Aurum Compensation Plan Explained (with HP)', source: 'Vimeo · Full walkthrough of the comp plan', href: '#' },
      { icon: '▶️', type: 'Video', duration: '56:28', title: 'Fast Start Training (with HP)', source: 'Vimeo · New partner onboarding training', href: '#' },
      { icon: '▶️', type: 'Video', duration: '58:48', title: 'Comp Plan — Deep Drill Down (with Dino)', source: 'Vimeo · Advanced compensation deep dive', href: '#' },
    ],
  },
  {
    id: 'onboarding',
    icon: '🚀',
    label: 'Onboarding & Training',
    title: 'Onboarding & Training',
    count: 9,
    description: 'Platform tutorials, back office guides, compounding strategies, and MASTERY calls. For active members.',
    resources: [
      { icon: '📖', type: 'PDF Guide', title: "Aurum's Official Guide to Using the Platform", source: 'bit.ly/aurum-guide · Complete platform walkthrough', href: 'https://bit.ly/aurum-guide', badge: 'Start Here' },
      { icon: '▶️', type: 'Video', duration: '14:19', title: 'Back Office Tutorial — Full Walkthrough', source: 'Vimeo · Dashboard navigation guide', href: '#' },
      { icon: '▶️', type: 'Video', duration: '12:49', title: 'Packages & Percentages — Back Office Tour', source: 'YouTube · Which tier fits your investment', href: '#' },
      { icon: '▶️', type: 'Video', duration: '1:33:23', title: 'Team Training — Full Session', source: 'Vimeo · Complete team onboarding training', href: '#' },
      { icon: '🤖', type: 'Guide', title: 'How to Start the EX AI Pro and Zeus Bot(s)', source: 'Step-by-step activation guide', href: '#' },
      { icon: '▶️', type: 'Video', duration: '5:13', title: 'Compounding with the Aurum NeoBank Telegram App', source: 'YouTube · How to use the NeoBank for compounding', href: '#' },
      { icon: '💳', type: 'Guide · Article', title: 'How to Purchase & Use The Aurum Infinity Card', source: 'Visa Crypto Debit Card setup guide', href: '#', badge: 'New Feature' },
      { icon: '▶️', type: 'Video', duration: '27:45', title: 'To Compound? Or Not to Compound?', source: 'YouTube · Strategy discussion for active members', href: '#' },
      { icon: '▶️', type: 'Video', duration: '1:19', title: 'How to Activate Aurum Telegram Notifications Bot', source: 'YouTube · Real-time trade alerts setup', href: '#' },
    ],
  },
]

export const socialChannels: SocialChannel[] = [
  { icon: '💬', platform: 'Telegram — English', handle: 't.me/aurum_eng', href: 'https://t.me/aurum_eng' },
  { icon: '▶️', platform: 'YouTube', handle: '@Aurum_foundation', href: 'https://youtube.com/@Aurum_foundation' },
  { icon: '📸', platform: 'Instagram', handle: '@aurum_foundation', href: 'https://instagram.com/aurum_foundation' },
  { icon: '𝕏', platform: 'X / Twitter', handle: '@aurum_ecosystem', href: 'https://x.com/aurum_ecosystem' },
  { icon: '💼', platform: 'LinkedIn', handle: 'Aurum Official', href: '#' },
  { icon: '🎓', platform: 'MASTERY Calls', handle: 'Shane Morand · Chief Network Dev Officer', href: '#' },
]

export const backOfficeLinks: BackOfficeLink[] = [
  { icon: '🔐', title: 'Aurum Dashboard / Back Office Login', href: 'https://backoffice.aurum.foundation/auth/log-in' },
  { icon: '❓', title: 'Aurum FAQs — Back Office', href: 'https://backoffice.aurum.foundation/faq' },
  { icon: '🛟', title: 'Telegram Support Team', href: 'https://t.me/aurumsupport_team' },
  { icon: '🏦', title: 'NeoBank Telegram Bot — Crypto Visa Card & Zeus', href: 'https://t.me/aurumneobankbot' },
]
