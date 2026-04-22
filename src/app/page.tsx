'use client'

import VideoModal from '@/components/ui/VideoModal'
import {
  AutomationIcon,
  CardIcon,
  BankIcon,
  ExchangeIcon,
  OnboardingIcon,
  PartnerIcon,
} from '@/components/ui/Icons'
import {
  PageShell,
  SectionBox,
  SectionHeader,
  HeroDark,
  ProductPanel,
  FeatureCard,
  TestimonialCard,
  StatRow,
  Step,
  EcoCard,
  CTABand,
} from '@/components/sections'
import { useScrollReveal } from '@/lib/useScrollReveal'

// ════════════════════════════════════════════════════════════════
// HOME PAGE — assembled entirely from the OnePay section primitives.
// Use this as the canonical reference when building other pages.
// ════════════════════════════════════════════════════════════════
export default function HomePage() {
  useScrollReveal()

  return (
    <PageShell>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <HeroDark
        badge="✦ Powered by Aurum Ecosystem"
        title={
          <>
            Your Money,
            <br />
            <span style={{ color: '#93c5fd' }}>Working 24/7</span>
          </>
        }
        description="AutoPilotROI is your structured guide into the Aurum ecosystem — AI-powered crypto trading, a Visa crypto card, exchange, and Web3 neobank. Start with $100."
        ctas={[
          { label: 'Start Here →', href: '/signup', variant: 'primary' },
        ]}
        bullets={[
          { text: 'Start with $100 USDT' },
          { text: 'AI runs 24/7' },
          { text: 'Guided onboarding' },
        ]}
        visual={
          <VideoModal
            videoUrl="https://youtu.be/MmAnR4YAPv4"
            ctaLabel="Start Here →"
            ctaHref="/signup"
          >
            {/* Browser chrome card around the video thumbnail */}
            <div
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.18)',
                borderRadius: '1.25rem',
                overflow: 'hidden',
                backdropFilter: 'blur(8px)',
                cursor: 'pointer',
                transition: 'transform 200ms ease, box-shadow 200ms ease',
                boxShadow: '0 24px 64px rgba(0,0,0,0.35)',
              }}
              onMouseEnter={(e) => {
                ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'
                ;(e.currentTarget as HTMLElement).style.boxShadow = '0 32px 80px rgba(0,0,0,0.45)'
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLElement).style.transform = ''
                ;(e.currentTarget as HTMLElement).style.boxShadow = '0 24px 64px rgba(0,0,0,0.35)'
              }}
            >
              {/* Browser header */}
              <div
                style={{
                  background: 'rgba(255,255,255,0.07)',
                  borderBottom: '1px solid rgba(255,255,255,0.10)',
                  padding: '0.75rem 1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                {['#ff5f56', '#ffbd2e', '#27c93f'].map((c) => (
                  <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
                ))}
                <span
                  style={{
                    flex: 1,
                    textAlign: 'center',
                    fontSize: '0.75rem',
                    color: 'rgba(255,255,255,0.38)',
                    marginLeft: '-1.5rem',
                  }}
                >
                  app.autopilotroi.com
                </span>
              </div>

              {/* Video thumbnail */}
              <div style={{ position: 'relative', aspectRatio: '16/9' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://i.ytimg.com/vi/MmAnR4YAPv4/hqdefault.jpg"
                  alt="AutoPilotROI Overview Video"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.28)' }} />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <div
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '50%',
                      background: 'rgba(255,0,0,0.92)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 32px rgba(255,0,0,0.55)',
                    }}
                  >
                    <svg width="22" height="26" viewBox="0 0 22 26" fill="white">
                      <path d="M0 0L22 13L0 26V0Z" />
                    </svg>
                  </div>
                </div>
                <div
                  style={{
                    position: 'absolute',
                    bottom: '1rem',
                    left: 0,
                    right: 0,
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <span
                    style={{
                      background: 'rgba(0,0,0,0.55)',
                      backdropFilter: 'blur(6px)',
                      borderRadius: '99px',
                      padding: '0.375rem 1rem',
                      fontSize: '0.8125rem',
                      color: 'rgba(255,255,255,0.88)',
                      fontWeight: 500,
                      letterSpacing: '0.02em',
                    }}
                  >
                    ▶ Watch Overview
                  </span>
                </div>
              </div>
            </div>
          </VideoModal>
        }
      />

      {/* ── STATS ────────────────────────────────────────────── */}
      <SectionBox>
        <StatRow
          stats={[
            { value: 12000, suffix: '+', label: 'Members Onboarded' },
            { value: 47, suffix: '%', label: 'Avg. Portfolio Growth' },
            { value: 24, suffix: '/7', label: 'AI Bot Active Hours' },
            { value: 100, suffix: '+', label: 'Countries Supported' },
          ]}
        />
      </SectionBox>

      {/* ── FEATURES ─────────────────────────────────────────── */}
      <SectionBox variant="surface">
        <SectionHeader
          eyebrow="Why AutoPilotROI"
          title={
            <>
              Everything you need
              <br />
              to grow on autopilot
            </>
          }
        >
          From your first $100 to a fully active portfolio — we guide you through every step of the
          Aurum ecosystem.
        </SectionHeader>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: '1.25rem',
          }}
        >
          <FeatureCard
            icon={<AutomationIcon />}
            title="EX-AI Trading Bot"
            body="The AI analyzes global crypto markets 24/7 and executes trades automatically on Binance, Bybit, and KuCoin. You activate it once."
            color="#1b61c9"
            colorBg="rgba(27,97,201,0.10)"
          />
          <FeatureCard
            icon={<CardIcon />}
            title="Visa Crypto Card"
            body="Spend your earnings anywhere Visa is accepted. Your crypto balance powers your everyday purchases worldwide."
            color="#7c3aed"
            colorBg="rgba(124,58,237,0.10)"
          />
          <FeatureCard
            icon={<BankIcon />}
            title="Web3 Neobank"
            body="A full-featured digital bank built on blockchain infrastructure. IBAN accounts, cross-border transfers, DeFi integration."
            color="#0891b2"
            colorBg="rgba(8,145,178,0.10)"
          />
          <FeatureCard
            icon={<ExchangeIcon />}
            title="Crypto Exchange"
            body="Trade 200+ assets at competitive rates with institutional-grade liquidity and a clean, intuitive interface."
            color="#059669"
            colorBg="rgba(5,150,105,0.10)"
          />
          <FeatureCard
            icon={<OnboardingIcon />}
            title="Guided Onboarding"
            body="Step-by-step setup: wallet, VPN, USDT acquisition, Aurum account, and bot activation. Nothing gets skipped."
            color="#1b61c9"
            colorBg="rgba(27,97,201,0.10)"
          />
          <FeatureCard
            icon={<PartnerIcon />}
            title="Partner Program"
            body="Earn additional income by introducing others. 3-deep spillover model — your network grows even while you sleep."
            color="#d97706"
            colorBg="rgba(217,119,6,0.10)"
          />
        </div>
      </SectionBox>

      {/* ── HOW IT WORKS ─────────────────────────────────────── */}
      <SectionBox>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
            gap: '5rem',
            alignItems: 'center',
          }}
        >
          {/* Left — steps */}
          <div>
            <span
              className="badge badge-blue reveal"
              style={{ marginBottom: '1.25rem', display: 'inline-flex' }}
            >
              The Process
            </span>
            <h2
              className="text-display reveal reveal-delay-1"
              style={{ color: '#181d26', marginBottom: '3rem' }}
            >
              Up and running
              <br />
              in 3 days or less
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
              <Step
                num="1"
                title="Set up your infrastructure"
                body="Install Trust Wallet, activate a VPN, and acquire USDT from a major exchange. Your partner walks you through every click."
              />
              <Step
                num="2"
                title="Create your Aurum account"
                body="Register at Aurum, complete verification, fund your account with USDT, and select your subscription tier."
              />
              <Step
                num="3"
                title="Activate the AI bot & sit back"
                body="Turn on the EX-AI Bot. It begins scanning and trading automatically. Monitor your dashboard and withdraw whenever you choose."
              />
            </div>
          </div>

          {/* Right — Aurum bot dashboard */}
          <ProductPanel
            url="app.aurum.foundation"
            image={{ src: '/aurum-bot-dashboard.png', alt: 'Aurum EX-AI Bot Dashboard' }}
            status={{ label: 'EX-AI Bot · Live', meta: '24/7 Active' }}
          />
        </div>
      </SectionBox>

      {/* ── ECOSYSTEM ────────────────────────────────────────── */}
      <SectionBox variant="surface">
        <SectionHeader
          eyebrow="The Ecosystem"
          title={
            <>
              One ecosystem.
              <br />
              Four powerful products.
            </>
          }
          maxWidth="42rem"
        >
          Aurum Foundation has built a complete financial infrastructure stack. AutoPilotROI is your
          onboarding partner for all of it.
        </SectionHeader>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
            gap: '1.25rem',
          }}
        >
          <EcoCard
            icon={<AutomationIcon />}
            title="EX-AI Trading Bot"
            description="Fully automated 24/7 AI trading bot across Binance, Bybit, and KuCoin. Machine learning-powered market analysis."
            tag="LIVE"
            tagColor="#059669"
          />
          <EcoCard
            icon={<CardIcon />}
            title="Visa Crypto Card"
            description="Spend your crypto anywhere in the world. Linked to your Aurum balance. Physical and virtual card available."
            tag="LIVE"
            tagColor="#059669"
          />
          <EcoCard
            icon={<ExchangeIcon />}
            title="Crypto Exchange"
            description="Trade 200+ crypto assets with institutional liquidity. Low fees, deep order books, fast settlement."
            tag="LIVE"
            tagColor="#059669"
          />
          <EcoCard
            icon={<BankIcon />}
            title="Web3 Neobank"
            description="Digital banking on blockchain rails. IBAN accounts, cross-border transfers, DeFi access, multi-currency wallets."
            tag="LAUNCHING"
            tagColor="#7c3aed"
          />
        </div>
      </SectionBox>

      {/* ── SOCIAL PROOF ─────────────────────────────────────── */}
      <SectionBox variant="blue">
        <SectionHeader
          eyebrow="Members Speak"
          title={
            <>
              Real people.
              <br />
              Real returns.
            </>
          }
          badgeVariant="white"
          titleColor="#ffffff"
          maxWidth="40rem"
          marginBottom="3.5rem"
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            gap: '1.25rem',
          }}
        >
          <TestimonialCard
            quote="I was skeptical at first but my partner walked me through every step. Had my bot running in 2 days and already seeing consistent daily returns."
            author="Marcus T."
            role="Member since March 2025"
          />
          <TestimonialCard
            quote="The guided onboarding made all the difference. Never dealt with crypto before — now I have an active portfolio and the bot handles everything."
            author="Sandra K."
            role="Member since January 2025"
          />
          <TestimonialCard
            quote="What I appreciate most is the transparency. Everything is documented, every step is explained. This isn't some black box — you understand exactly what's happening."
            author="David R."
            role="Partner & Member"
          />
        </div>
      </SectionBox>

      {/* ── FINAL CTA ────────────────────────────────────────── */}
      <CTABand
        eyebrow="Ready to start?"
        title={
          <>
            Your AI portfolio
            <br />
            starts with $100
          </>
        }
        description="Join thousands of members who activated the EX-AI Bot and put their money to work around the clock. Your AutoPilotROI partner handles the entire setup."
        ctas={[
          { label: 'Begin Onboarding →', href: '/signup' },
          { label: 'Read FAQs', href: '/faqs', variant: 'ghost' },
        ]}
      />
    </PageShell>
  )
}
