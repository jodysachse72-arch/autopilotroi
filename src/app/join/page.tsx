'use client'

import { useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import {
  PageShell,
  SectionBox,
  HeroBlue,
  CTABand,
} from '@/components/sections'
import {
  AcademyIcon,
  PartnerIcon,
  CheckCircleIcon,
  GrowthIcon,
} from '@/components/ui/Icons'

const FEATURES = [
  { Icon: AcademyIcon,      title: 'Full education',   desc: 'Videos, guides, and due diligence before you invest anything.', accent: '#1b61c9' },
  { Icon: PartnerIcon,      title: 'Personal support', desc: 'A dedicated partner walks you through every step.',             accent: '#0891b2' },
  { Icon: CheckCircleIcon,  title: 'Correct placement', desc: 'Your referral code ensures you\u0027re placed in the right team position.', accent: '#059669' },
  { Icon: GrowthIcon,       title: 'Readiness score',  desc: 'Know exactly where you stand before committing.',                accent: '#d97706' },
]

function JoinContent() {
  const searchParams = useSearchParams()
  const refCode = searchParams.get('ref')

  useEffect(() => {
    if (refCode) {
      try { localStorage.setItem('autopilotroi-ref', refCode) } catch {}
    }
  }, [refCode])

  // Wrapped in Suspense for client-only useSearchParams,
  // so we can show the saved indicator whenever a refCode is present.
  const saved = !!refCode

  return (
    <PageShell>
      <HeroBlue
        eyebrow={refCode ? 'Referral code recognized' : 'Welcome'}
        title={refCode
          ? <>You&apos;ve been invited to<br />Team AutoPilot ROI.</>
          : <>Welcome to<br />Team AutoPilot ROI.</>}
        description={refCode
          ? 'A partner from our team shared this link with you. Your referral has been saved \u2014 when you complete onboarding, the right partner will be notified and credited.'
          : 'AutoPilot ROI is the structured onboarding system for the Aurum ecosystem. Start your journey with education, guided setup, and personal partner support.'}
        ctas={[
          { label: 'Start onboarding \u2192', href: '/start' },
          { label: 'Explore Aurum University', href: '/university', variant: 'ghost' },
        ]}
      />

      {/* Referral code receipt or no-referral notice */}
      <SectionBox variant="white" padding="lg">
        <div style={{ maxWidth: '40rem', margin: '0 auto', textAlign: 'center' }}>
          {refCode ? (
            <div style={{
              display: 'inline-flex',
              flexDirection: 'column',
              alignItems: 'center',
              background: '#f8fafc',
              border: '1px solid var(--color-border)',
              borderRadius: '1rem',
              padding: '1.5rem 2.5rem',
              minWidth: '18rem',
            }}>
              <div style={{ fontSize: '0.6875rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-text-muted)', marginBottom: '0.5rem', fontFamily: 'var(--font-display)' }}>
                Referral code
              </div>
              <div style={{ fontFamily: 'monospace', fontSize: '1.625rem', fontWeight: 700, letterSpacing: '0.12em', color: '#181d26' }}>
                {refCode}
              </div>
              {saved && (
                <div style={{ marginTop: '0.625rem', display: 'inline-flex', alignItems: 'center', gap: '0.375rem', fontSize: 'var(--text-caption)', fontWeight: 600, color: '#059669' }}>
                  <CheckCircleIcon className="w-4 h-4" /> Saved to your session
                </div>
              )}
            </div>
          ) : (
            <div style={{
              background: 'rgba(245,158,11,0.06)',
              border: '1px solid rgba(245,158,11,0.25)',
              borderRadius: '0.875rem',
              padding: '1rem 1.25rem',
              maxWidth: '32rem',
              margin: '0 auto',
            }}>
              <p style={{ fontSize: 'var(--text-body)', color: '#92400e', margin: 0, lineHeight: 1.55 }}>
                <strong>No referral code detected.</strong> If someone sent you a link, make sure you&apos;re using the full URL they shared.
              </p>
            </div>
          )}
        </div>
      </SectionBox>

      {/* Features */}
      <SectionBox variant="surface" padding="lg">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 18rem), 1fr))',
          gap: '1.25rem',
          maxWidth: '60rem',
          margin: '0 auto',
        }}>
          {FEATURES.map((f) => (
            <div key={f.title} style={{
              background: '#ffffff',
              border: '1px solid var(--color-border)',
              borderRadius: '1rem',
              padding: '1.5rem',
            }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                width: '2.5rem', height: '2.5rem',
                borderRadius: '0.625rem',
                background: f.accent + '14',
                color: f.accent,
                marginBottom: '0.875rem',
              }}>
                <f.Icon className="w-5 h-5" />
              </span>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-body-lg)', color: '#181d26', marginBottom: '0.5rem' }}>
                {f.title}
              </h3>
              <p style={{ fontSize: 'var(--text-body)', color: 'var(--color-text-weak)', lineHeight: 1.6, margin: 0 }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </SectionBox>

      <CTABand
        eyebrow="Ready when you are"
        title={<>Start with $100 in Trust Wallet.<br />Your partner is on standby.</>}
        description="The whole onboarding takes 30\u201345 focused minutes. We\u2019ll walk you through every step."
        ctas={[
          { label: 'Begin Chapter 1 \u2192', href: '/start' },
          { label: 'Read the FAQs', href: '/faqs', variant: 'ghost' },
        ]}
      />
    </PageShell>
  )
}

export default function JoinPage() {
  return (
    <Suspense fallback={<div className="page-bg" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div style={{ width: '2rem', height: '2rem', borderRadius: '50%', border: '2px solid #1b61c9', borderTopColor: 'transparent' }} /></div>}>
      <JoinContent />
    </Suspense>
  )
}
