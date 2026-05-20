/**
 * Seed API — Populate puck_pages with default content for a given path
 *
 * POST /api/puck/seed?path=/   → seeds the given path with default Puck components
 *
 * This converts static page content into Puck JSON format so the editor
 * has something to show and edit. Called automatically by the editor when
 * a page has no saved content.
 *
 * WRITE PROTECTION
 * Requires the request header:
 *   x-puck-write-secret: <value of NEXT_PUBLIC_PUCK_WRITE_SECRET env var>
 *
 * NOTE: This is TEMPORARY stabilization protection.
 * Replace with Supabase session/role auth during the auth hardening sprint.
 * See: STATUS.md — P4, feature/api-layer branch.
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// ── Temporary write protection guard ────────────────────────────────────────
// NOTE: Temporary stabilization protection.
// Replace with Supabase session/role auth during the auth hardening sprint.
// See: STATUS.md — P4, feature/api-layer branch.
function requireWriteSecret(request: NextRequest): NextResponse | null {
  const secret = process.env.NEXT_PUBLIC_PUCK_WRITE_SECRET
  if (!secret) {
    console.error('[Seed API] NEXT_PUBLIC_PUCK_WRITE_SECRET is not set. Refusing seed operation.')
    return NextResponse.json(
      { error: 'Server misconfiguration: NEXT_PUBLIC_PUCK_WRITE_SECRET is not set.' },
      { status: 500 }
    )
  }
  const header = request.headers.get('x-puck-write-secret')
  if (!header || header !== secret) {
    return NextResponse.json(
      { error: 'Unauthorized: missing or incorrect x-puck-write-secret header.' },
      { status: 401 }
    )
  }
  return null
}
// ─────────────────────────────────────────────────────────────────────────────

function getWriteClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || (!serviceKey && !anonKey)) throw new Error('Missing Supabase env vars')
  return createClient(url, serviceKey || anonKey!, {
    auth: { persistSession: false },
  })
}

// Homepage Puck JSON — mirrors StaticHomePage.tsx exactly
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HOMEPAGE_SEED: any = {
  root: { props: { title: 'AutopilotROI — Home', description: 'AI-Powered Finance Onboarding Platform' } },
  content: [
    {
      type: 'HeroDark',
      props: {
        id: 'hero-dark-1',
        badge: '✦ Powered by Aurum Ecosystem',
        title: 'Your Money,',
        highlightedText: 'Working 24/7',
        description: 'AutoPilotROI is your structured guide into the Aurum ecosystem — AI-powered crypto trading, a Visa crypto card, exchange, and Web3 neobank. Start with $100.',
        ctaLabel: 'Start Here →',
        ctaHref: '/signup',
        bulletOne: 'Start with $100 USDT',
        bulletTwo: 'AI runs 24/7',
        bulletThree: 'Guided onboarding',
        videoUrl: 'https://youtu.be/MmAnR4YAPv4',
        videoThumb: 'https://i.ytimg.com/vi/MmAnR4YAPv4/hqdefault.jpg',
      },
    },
    // Stats in a white SectionBox
    {
      type: 'SectionBox',
      props: { id: 'stats-section', variant: 'white', padding: 'lg' },
    },
    // Features in a surface SectionBox
    {
      type: 'SectionBox',
      props: { id: 'features-section', variant: 'surface', padding: 'lg' },
    },
    // How it works in a white SectionBox
    {
      type: 'SectionBox',
      props: { id: 'process-section', variant: 'white', padding: 'lg' },
    },
    // Ecosystem in a surface SectionBox
    {
      type: 'SectionBox',
      props: { id: 'ecosystem-section', variant: 'surface', padding: 'lg' },
    },
    // Social proof in a blue SectionBox
    {
      type: 'SectionBox',
      props: { id: 'testimonials-section', variant: 'blue', padding: 'lg' },
    },
    // Final CTA
    {
      type: 'CTABand',
      props: {
        id: 'cta-final',
        eyebrow: 'Ready to start?',
        title: 'Your AI portfolio starts with $100',
        description: 'Join thousands of members who activated the EX-AI Bot and put their money to work around the clock. Your AutoPilotROI partner handles the entire setup.',
        ctaLabel: 'Begin Onboarding →',
        ctaHref: '/signup',
        secondaryLabel: 'Read FAQs',
        secondaryHref: '/faqs',
      },
    },
  ],
  // Nested zone content for SectionBox containers
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
          lead: 'From your first $100 to a fully active portfolio — we guide you through every step of the Aurum ecosystem.',
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
      { type: 'FeatureCard', props: { id: 'feature-1', title: 'EX-AI Trading Bot', body: 'The AI analyzes global crypto markets 24/7 and executes trades automatically on Binance, Bybit, and KuCoin. You activate it once.', color: '#1b61c9', colorBg: 'rgba(27,97,201,0.10)' } },
      { type: 'FeatureCard', props: { id: 'feature-2', title: 'Visa Crypto Card', body: 'Spend your earnings anywhere Visa is accepted. Your crypto balance powers your everyday purchases worldwide.', color: '#7c3aed', colorBg: 'rgba(124,58,237,0.10)' } },
      { type: 'FeatureCard', props: { id: 'feature-3', title: 'Web3 Neobank', body: 'A full-featured digital bank built on blockchain infrastructure. IBAN accounts, cross-border transfers, DeFi integration.', color: '#0891b2', colorBg: 'rgba(8,145,178,0.10)' } },
      { type: 'FeatureCard', props: { id: 'feature-4', title: 'Crypto Exchange', body: 'Trade 200+ assets at competitive rates with institutional-grade liquidity and a clean, intuitive interface.', color: '#059669', colorBg: 'rgba(5,150,105,0.10)' } },
      { type: 'FeatureCard', props: { id: 'feature-5', title: 'Guided Onboarding', body: 'Step-by-step setup: wallet, VPN, USDT acquisition, Aurum account, and bot activation. Nothing gets skipped.', color: '#1b61c9', colorBg: 'rgba(27,97,201,0.10)' } },
      { type: 'FeatureCard', props: { id: 'feature-6', title: 'Partner Program', body: 'Earn additional income by introducing others. 3-deep spillover model — your network grows even while you sleep.', color: '#d97706', colorBg: 'rgba(217,119,6,0.10)' } },
    ],
    'process-section:content': [
      {
        type: 'SectionHeader',
        props: { id: 'process-header', eyebrow: 'The Process', title: 'Up and running in 3 days or less', lead: '', align: 'left', badgeVariant: 'blue' },
      },
      {
        type: 'StepGroup',
        props: { id: 'steps-group' },
      },
    ],
    'steps-group:steps': [
      { type: 'Step', props: { id: 'step-1', num: '1', title: 'Set up your infrastructure', body: 'Install Trust Wallet, activate a VPN, and acquire USDT from a major exchange. Your partner walks you through every click.' } },
      { type: 'Step', props: { id: 'step-2', num: '2', title: 'Create your Aurum account', body: 'Register at Aurum, complete verification, fund your account with USDT, and select your subscription tier.' } },
      { type: 'Step', props: { id: 'step-3', num: '3', title: 'Activate the AI bot & sit back', body: 'Turn on the EX-AI Bot. It begins scanning and trading automatically. Monitor your dashboard and withdraw whenever you choose.' } },
    ],
    'ecosystem-section:content': [
      {
        type: 'SectionHeader',
        props: { id: 'ecosystem-header', eyebrow: 'The Ecosystem', title: 'One ecosystem. Four powerful products.', lead: 'Aurum Foundation has built a complete financial infrastructure stack. AutoPilotROI is your onboarding partner for all of it.', align: 'center', badgeVariant: 'blue' },
      },
      {
        type: 'CardGrid',
        props: { id: 'eco-grid', columns: '4' },
      },
    ],
    'eco-grid:cards': [
      { type: 'EcoCard', props: { id: 'eco-1', title: 'EX-AI Trading Bot', description: 'Fully automated 24/7 AI trading bot across Binance, Bybit, and KuCoin. Machine learning-powered market analysis.', tag: 'LIVE', tagColor: '#059669' } },
      { type: 'EcoCard', props: { id: 'eco-2', title: 'Visa Crypto Card', description: 'Spend your crypto anywhere in the world. Linked to your Aurum balance. Physical and virtual card available.', tag: 'LIVE', tagColor: '#059669' } },
      { type: 'EcoCard', props: { id: 'eco-3', title: 'Crypto Exchange', description: 'Trade 200+ crypto assets with institutional liquidity. Low fees, deep order books, fast settlement.', tag: 'LIVE', tagColor: '#059669' } },
      { type: 'EcoCard', props: { id: 'eco-4', title: 'Web3 Neobank', description: 'Digital banking on blockchain rails. IBAN accounts, cross-border transfers, DeFi access, multi-currency wallets.', tag: 'LAUNCHING', tagColor: '#7c3aed' } },
    ],
    'testimonials-section:content': [
      {
        type: 'SectionHeader',
        props: { id: 'social-header', eyebrow: 'Members Speak', title: 'Real people. Real returns.', lead: '', align: 'center', badgeVariant: 'white' },
      },
      {
        type: 'CardGrid',
        props: { id: 'testimonials-grid', columns: '3' },
      },
    ],
    'testimonials-grid:cards': [
      { type: 'TestimonialCard', props: { id: 'testimonial-1', quote: 'I was skeptical at first but my partner walked me through every step. Had my bot running in 2 days and already seeing consistent daily returns.', author: 'Marcus T.', role: 'Member since March 2025' } },
      { type: 'TestimonialCard', props: { id: 'testimonial-2', quote: 'The guided onboarding made all the difference. Never dealt with crypto before — now I have an active portfolio and the bot handles everything.', author: 'Sandra K.', role: 'Member since January 2025' } },
      { type: 'TestimonialCard', props: { id: 'testimonial-3', quote: "What I appreciate most is the transparency. Everything is documented, every step is explained. This isn't some black box — you understand exactly what's happening.", author: 'David R.', role: 'Partner & Member' } },
    ],
  },
}

export async function POST(request: NextRequest) {
  const authError = requireWriteSecret(request)
  if (authError) return authError

  const pagePath = request.nextUrl.searchParams.get('path') || '/'

  try {
    const supabase = getWriteClient()
    
    // Check if data already exists
    const { data: existing } = await supabase
      .from('puck_pages')
      .select('path')
      .eq('path', pagePath)
      .single()

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let seedData: any = HOMEPAGE_SEED

    // For non-homepage paths, create a minimal page structure
    if (pagePath !== '/') {
      seedData = {
        root: { props: { title: `Page: ${pagePath}`, description: '' } },
        content: [
          {
            type: 'HeroBlue',
            props: {
              id: 'hero-1',
              eyebrow: 'Page Title',
              title: pagePath.replace(/\//g, ' ').trim() || 'New Page',
              description: 'Edit this page content using the visual editor.',
              ctaLabel: '',
              ctaHref: '',
            },
          },
        ],
      }
    }

    const { error } = await supabase
      .from('puck_pages')
      .upsert(
        { path: pagePath, data: seedData, updated_at: new Date().toISOString() },
        { onConflict: 'path' }
      )

    if (error) {
      console.error('[Seed API] Error:', error)
      return NextResponse.json({ error: 'Failed to seed' }, { status: 500 })
    }

    return NextResponse.json({ 
      ok: true, 
      path: pagePath, 
      action: existing ? 'replaced' : 'created',
      componentCount: seedData.content.length,
    })
  } catch (err) {
    console.error('[Seed API] Error:', err)
    return NextResponse.json({ error: 'Failed to seed' }, { status: 500 })
  }
}
