const fetch = require('node-fetch') || globalThis.fetch;

const SUPABASE_SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR6d3FvbXR5ZWJ0dmJqZWFvbm1nIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTk0MDM1MSwiZXhwIjoyMDkxNTE2MzUxfQ.UGpYZY_DPejMCGDbzs8m8Zuh_84ELts6MNagJYf3Fog';

const trustReasons = [
  { iconName: 'BankIcon', title: 'Legally Registered in Hong Kong', body: 'Aurum Foundation Limited was officially incorporated in Hong Kong on November 7, 2024 under the Companies Ordinance — one of the world\'s most respected regulatory environments for fintech. Certificate No. 77289699-000-11-24-6.' },
  { iconName: 'SecurityIcon', title: '3 International Licenses', body: 'Aurum holds three internationally recognized operating licenses, allowing it to legally offer financial services and crypto-related products to clients globally. This is not a grey-market operation.' },
  { iconName: 'GrowthIcon', title: 'Leadership With Proven Track Records', body: 'CEO Bryan Benson previously led Binance\'s expansion across Latin America and worked at Morgan Stanley. Co-founder Drei Menza leads AI trading strategy. These are not anonymous founders — they are public, verified, and accountable.' },
  { iconName: 'EcosystemIcon', title: 'Covered by Major Media', body: 'Aurum has been featured across Forbes, Entrepreneur, Benzinga, Cointelegraph, Bitcoin.com, Crypto.news, Binance, Bitget, and MEXC — independently recognized as institutional-grade financial infrastructure.' },
  { iconName: 'PartnerIcon', title: 'Exchange Partnerships', body: 'Aurum operates under formal contracts with leading exchanges including Binance, Bybit, and KuCoin. These are legally binding, compliance-reviewed agreements — not informal affiliate relationships.' },
  { iconName: 'DataIcon', title: 'We Did the Homework So You Don\'t Have To', body: 'Before recommending Aurum to anyone, we independently verified the registration, leadership backgrounds, license numbers, and media coverage. We would not stake our reputation — or yours — on something we hadn\'t fully vetted.' },
];

const STATS = [
  { num: '18K+',  label: 'Active Partners Worldwide' },
  { num: '$30M',  label: 'Assets Under Management' },
  { num: '3',     label: 'International Licenses' },
  { num: '2024',  label: 'Founded & Incorporated' },
];

const products = [
  { id: 'bots', name: 'EX-AI Trading Bot', tagline: 'AI-Managed Liquidity Engine', description: 'Machine-learning algorithms execute trades 24/7 across Binance, Bybit, and KuCoin — detecting mid-term opportunities and rebalancing in real time. Zero manual input required.', features: [{ value: '24/7 automated execution' }, { value: 'Multi-exchange arbitrage' }, { value: 'AI-optimized entry/exit' }, { value: 'Real-time portfolio rebalancing' }], badge: 'Flagship', badgeColor: '#1b61c9', iconName: 'AutomationIcon', image: '/product-bots.png' },
  { id: 'zeus', name: 'Zeus AI Bot', tagline: 'Institutional-Grade Capital Growth', description: 'Higher-tier liquidity management with advanced algorithmic strategies. Zeus operates with larger capital pools for institutional-grade execution and priority support.', features: [{ value: 'Advanced algorithmic strategies' }, { value: 'Higher capital tier entry' }, { value: 'Institutional-grade execution' }, { value: 'Priority support channel' }], badge: 'Pro Tier', badgeColor: '#7c3aed', iconName: 'GrowthIcon', image: '' },
  { id: 'flash-loans', name: 'Flash Loans', tagline: 'Instant DeFi Capital Access', description: 'Access instant capital through DeFi flash loan mechanisms. Designed for short-duration, high-volume transactions within a single block — no collateral required.', features: [{ value: 'Instantaneous execution' }, { value: 'No collateral required' }, { value: 'DeFi-native architecture' }, { value: 'Smart contract secured' }], badge: '', badgeColor: '', iconName: 'DataIcon', image: '' },
  { id: 'exchange', name: 'Aurum Exchange', tagline: 'Next-Gen Crypto Exchange', description: 'A full-featured cryptocurrency exchange with deep liquidity, advanced order types, institutional-grade security, and seamless ecosystem integration.', features: [{ value: 'Deep liquidity pools' }, { value: 'Advanced order types' }, { value: 'Institutional-grade security' }, { value: '200+ trading pairs' }], badge: '', badgeColor: '', iconName: 'ExchangeIcon', image: '/product-exchange.png' },
  { id: 'neobank', name: 'NeoBank', tagline: 'Web 3.0 Banking Infrastructure', description: 'A Web 3.0 bank for secure, private management of crypto and fiat assets. Seamless integration between traditional and decentralised finance — one app, one account.', features: [{ value: 'Crypto + fiat unified' }, { value: 'Store, earn, and spend' }, { value: 'Global SWIFT & SEPA' }, { value: 'Privacy-first design' }], badge: 'Coming Soon', badgeColor: '#0ea5e9', iconName: 'BankIcon', image: '/product-neobank.png' },
  { id: 'cards', name: 'Crypto Cards', tagline: 'Spend Crypto Anywhere', description: 'Premium crypto debit cards powered by Visa. Spend your crypto earnings at 80M+ merchants globally, withdraw from ATMs, and manage everything from your app.', features: [{ value: 'Visa-powered cards' }, { value: '4 tiers: Nova → Infinity' }, { value: 'ATM withdrawals worldwide' }, { value: 'Instant crypto-to-fiat' }], badge: '', badgeColor: '', iconName: 'CardIcon', image: '/product-card.png' },
  { id: 'token', name: 'AUR Token', tagline: 'Ecosystem Utility Token', description: 'The native utility token powering the entire ecosystem. Used for governance voting, staking rewards, fee discounts, and premium feature access across all products.', features: [{ value: 'Governance voting rights' }, { value: 'Staking rewards' }, { value: 'Fee discounts across platform' }, { value: 'Premium tier access' }], badge: '', badgeColor: '', iconName: 'EcosystemIcon', image: '' },
  { id: 'subscription', name: 'Subscription Tiers', tagline: 'All-Access Membership', description: 'Membership tiers that unlock progressive levels of the ecosystem. From basic bot access to full-suite institutional features and partner program access.', features: [{ value: 'Tiered membership levels' }, { value: 'Progressive feature unlock' }, { value: 'Partner program access' }, { value: 'Priority support channels' }], badge: '', badgeColor: '', iconName: 'PartnerIcon', image: '' },
];

const zones = {
  'zone-trust': trustReasons.map((r, i) => ({ type: 'TrustSignalCard', props: { ...r, id: `TrustSignalCard-${i}` } })),
  'zone-stats': STATS.map((s, i) => ({ type: 'StatRow', props: { num: s.num, label: s.label, id: `StatRow-${i}` } })),
  'zone-products': products.map((p, i) => ({ type: 'ProductCard', props: { ...p, id: `ProductCard-${i}` } }))
};

const puckData = {
  content: [
    {
      type: 'PageHeaderWhite',
      props: {
        badge: 'What Is Aurum',
        title: 'A Complete Financial Ecosystem',
        highlightedText: 'Built on AI and Blockchain',
        description1: 'Aurum Foundation is a legally registered financial technology company headquartered in Hong Kong. They combine AI-driven trading bots, a full-featured cryptocurrency exchange, a Web 3.0 NeoBank, and crypto debit cards into a single, unified ecosystem — designed to let everyday people participate in institutional-grade capital management.',
        description2: 'The core product is the EX-AI Bot — an AI-powered liquidity management system that trades 24/7 across Binance, Bybit, and KuCoin without requiring manual input. Members choose a subscription tier, deposit USDC or USDT, and the bot generates returns around the clock. The wider ecosystem — exchange, NeoBank, cards, and AUR token — all plug into the same back office.',
        cta1Label: 'Start Here →',
        cta1Href: '/signup',
        cta2Label: 'Calculate Your Returns →',
        cta2Href: '/calculator',
        id: 'header-products'
      }
    },
    {
      type: 'SectionBox',
      props: {
        variant: 'blue',
        padding: 'lg',
        id: 'box-stats'
      }
    },
    {
      type: 'SectionHeader',
      props: {
        badge: 'Our Vetting Process',
        title: 'Why We Chose Aurum',
        description: 'We don\'t recommend platforms we haven\'t thoroughly investigated. Here is exactly what we looked at — and what we found — before endorsing Aurum to our network.',
        align: 'center',
        id: 'header-trust'
      }
    },
    {
      type: 'SectionBox',
      props: {
        variant: 'white',
        padding: 'none',
        id: 'box-trust'
      }
    },
    {
      type: 'SectionHeader',
      props: {
        title: 'The Aurum Product Suite',
        description: 'Eight integrated products — from AI trading bots to a full Web 3.0 bank — all connected through a single back office and powered by the AUR token.',
        align: 'center',
        id: 'header-suite'
      }
    },
    {
      type: 'SectionBox',
      props: {
        variant: 'surface',
        padding: 'none',
        id: 'box-products'
      }
    },
    {
      type: 'CTABand',
      props: {
        title: 'Ready to Get Started?',
        description: 'Complete the onboarding process and start exploring the full ecosystem with guided support from your partner.',
        cta1Label: 'Start Here →',
        cta1Href: '/signup',
        cta2Label: 'Calculate Your Returns',
        cta2Href: '/calculator',
        id: 'cta-products'
      }
    }
  ],
  root: { props: {} },
  zones: {
    'box-stats:content': zones['zone-stats'],
    'box-trust:content': zones['zone-trust'],
    'box-products:content': zones['zone-products']
  }
};

const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://dzwqomtyebtvbjeaonmg.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY_LOCAL = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR6d3FvbXR5ZWJ0dmJqZWFvbm1nIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTk0MDM1MSwiZXhwIjoyMDkxNTE2MzUxfQ.UGpYZY_DPejMCGDbzs8m8Zuh_84ELts6MNagJYf3Fog';

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY_LOCAL, {
  auth: { persistSession: false },
});

async function seed() {
  console.log('Inserting Puck data directly into Supabase for /products...');
  const { error } = await supabase
    .from('puck_pages')
    .upsert({ path: '/products', data: puckData }, { onConflict: 'path' });

  if (error) {
    console.error('Failed:', error);
  } else {
    console.log('Success!');
  }
}

seed().catch(console.error);
