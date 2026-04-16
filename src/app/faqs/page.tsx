import FaqsPageClient from './FaqsPageClient'
import { getPublishedFaqsServer } from '@/lib/cms/server-adapter'
import type { CmsPost } from '@/lib/cms/types'

export const metadata = {
  title: 'FAQs | AutoPilot ROI',
  description: 'Common questions about Aurum, the AI bot, onboarding steps, and the partner program — answered clearly.',
}

export const revalidate = 60

// --- Hardcoded seed FAQs — shown if CMS has none yet ---
const HARDCODED_FAQS: CmsPost[] = [
  { id: 'h-1',  type: 'faq', slug: null, title: 'What is Aurum Foundation?',                body: null, body_html: '<p>Aurum Foundation is a decentralised AI-driven financial ecosystem that includes an automated cryptocurrency trading bot (EX-AI Bot), a Visa crypto debit card, a crypto exchange, and a Web3 neobank. AutoPilot ROI is the structured onboarding and support team for Aurum.</p>', meta: { category: 'basic' },          status: 'published', publish_at: null, sort_order: 1,  created_at: '', updated_at: '', created_by: null },
  { id: 'h-2',  type: 'faq', slug: null, title: 'What is the minimum investment to get started?', body: null, body_html: '<p>The minimum investment to activate the Aurum AI trading bot is $100 USDT (Tether). You can start with $100 and scale as you become comfortable.</p>', meta: { category: 'basic' }, status: 'published', publish_at: null, sort_order: 2,  created_at: '', updated_at: '', created_by: null },
  { id: 'h-3',  type: 'faq', slug: null, title: 'How does the AI trading bot work?',         body: null, body_html: '<p>The EX-AI Bot analyses global cryptocurrency markets 24/7 using machine learning. It executes trades automatically on Binance, Bybit, and KuCoin. You activate it once during onboarding, and it runs continuously.</p>', meta: { category: 'basic' }, status: 'published', publish_at: null, sort_order: 3,  created_at: '', updated_at: '', created_by: null },
  { id: 'h-4',  type: 'faq', slug: null, title: 'Is this risky? Can I lose my money?',       body: null, body_html: '<p>All investment carries risk. Cryptocurrency markets are volatile, and the AI bot does not guarantee specific returns. Only invest what you can afford to lose.</p>', meta: { category: 'basic' }, status: 'published', publish_at: null, sort_order: 4,  created_at: '', updated_at: '', created_by: null },
  { id: 'h-5',  type: 'faq', slug: null, title: 'Do I need any experience with crypto to join?', body: null, body_html: '<p>No experience is required. AutoPilot ROI and the onboarding guide walk you through every step from setting up a wallet to activating the bot.</p>', meta: { category: 'basic' }, status: 'published', publish_at: null, sort_order: 5,  created_at: '', updated_at: '', created_by: null },
  { id: 'h-6',  type: 'faq', slug: null, title: 'How long does onboarding take?',            body: null, body_html: '<p>Most members complete all onboarding steps within 1–3 days, including setting up Trust Wallet, a VPN, acquiring USDT, creating your Aurum account, and activating the bot.</p>', meta: { category: 'basic' }, status: 'published', publish_at: null, sort_order: 6,  created_at: '', updated_at: '', created_by: null },
  { id: 'h-7',  type: 'faq', slug: null, title: 'How does the Aurum spillover system work?', body: null, body_html: '<p>Aurum uses a 3-deep spillover model. Each partner has 3 direct positions. When those are filled, new members route to the next open position in your downline automatically.</p>', meta: { category: 'advanced' }, status: 'published', publish_at: null, sort_order: 7,  created_at: '', updated_at: '', created_by: null },
  { id: 'h-8',  type: 'faq', slug: null, title: 'How are returns paid out?',                 body: null, body_html: '<p>Returns from the AI bot are credited to your Aurum account balance. You can withdraw to your Trust Wallet in USDT or spend with the Visa crypto card.</p>', meta: { category: 'advanced' }, status: 'published', publish_at: null, sort_order: 8,  created_at: '', updated_at: '', created_by: null },
  { id: 'h-9',  type: 'faq', slug: null, title: 'Why do I need a VPN?',                     body: null, body_html: '<p>Aurum is not available in all countries due to regional restrictions. A VPN masks your location so you can access the platform. We recommend NordVPN or ExpressVPN.</p>', meta: { category: 'technical' }, status: 'published', publish_at: null, sort_order: 9,  created_at: '', updated_at: '', created_by: null },
  { id: 'h-10', type: 'faq', slug: null, title: 'Why do I need Trust Wallet?',               body: null, body_html: '<p>Trust Wallet is a self-custodial crypto wallet — meaning you control your own private keys. You use it to hold USDT before depositing into Aurum and to withdraw earnings.</p>', meta: { category: 'technical' }, status: 'published', publish_at: null, sort_order: 10, created_at: '', updated_at: '', created_by: null },
  { id: 'h-11', type: 'faq', slug: null, title: 'What is USDT and where do I buy it?',       body: null, body_html: '<p>USDT (Tether) is a stablecoin pegged to the US Dollar — 1 USDT ≈ $1 USD. You can purchase USDT on major exchanges like Binance, Coinbase, or Kraken.</p>', meta: { category: 'technical' }, status: 'published', publish_at: null, sort_order: 11, created_at: '', updated_at: '', created_by: null },
  { id: 'h-12', type: 'faq', slug: null, title: 'Can I become a partner?',                   body: null, body_html: '<p>Yes. After completing your own onboarding and activating your bot, you can opt into the Partner Program. Your AutoPilot ROI partner will walk you through the partner tools.</p>', meta: { category: 'partner' }, status: 'published', publish_at: null, sort_order: 12, created_at: '', updated_at: '', created_by: null },
  { id: 'h-13', type: 'faq', slug: null, title: 'What is the Partner Dashboard?',            body: null, body_html: '<p>The Partner Dashboard is live at /dashboard. Partners can track prospects, see readiness scores, tiers, onboarding status, and use a multi-type referral link generator with QR codes.</p>', meta: { category: 'partner' }, status: 'published', publish_at: null, sort_order: 13, created_at: '', updated_at: '', created_by: null },
]

export default async function FaqsPage() {
  const cmsFaqs = await getPublishedFaqsServer()
  const faqs = cmsFaqs.length > 0 ? cmsFaqs : HARDCODED_FAQS
  return <FaqsPageClient faqs={faqs} />
}
