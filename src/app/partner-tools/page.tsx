'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  PageShell,
  SectionBox,
  HeroBlue,
  CTABand,
} from '@/components/sections'
import { CheckCircleIcon, SparkleIcon, PartnerIcon } from '@/components/ui/Icons'

const inputStyle: React.CSSProperties = {
  width: '100%',
  borderRadius: 'var(--radius-md)',
  border: '1.5px solid var(--color-border)',
  padding: '0.9375rem 1.25rem',
  fontSize: 'var(--text-body)',
  color: '#181d26',
  background: '#fff',
  outline: 'none',
  fontFamily: 'var(--font-body)',
  transition: 'border-color 150ms ease',
}

const STEPS = [
  { step: '1', title: 'Get your code',         desc: 'Log into your Aurum backoffice and copy your referral code or username.' },
  { step: '2', title: 'Generate your link',    desc: 'Paste the code above \u2014 your unique URL is generated instantly.' },
  { step: '3', title: 'Share with prospects',  desc: 'Send the link to anyone interested. When they click it, your code is automatically saved.' },
  { step: '4', title: 'They start onboarding', desc: 'Your prospect goes through the AutoPilot ROI onboarding flow \u2014 attributed to you.' },
]

export default function PartnerToolsPage() {
  const [code, setCode] = useState('')
  const [copied, setCopied] = useState(false)

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://autopilotroi.com'
  const referralUrl = code.trim() ? baseUrl + '/join?ref=' + encodeURIComponent(code.trim()) : ''

  function handleCopy() {
    if (!referralUrl) return
    navigator.clipboard.writeText(referralUrl).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    })
  }

  return (
    <PageShell>
      <HeroBlue
        eyebrow="Partner Tools"
        title={<>Referral Link Generator</>}
        description="Enter your Aurum backoffice referral code to generate your personalized onboarding URL. Share it with prospects \u2014 they\u2019ll be attributed to you automatically."
      />

      {/* Generator + How it works */}
      <SectionBox variant="white" padding="lg">
        <div style={{ maxWidth: '40rem', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

          {/* Generator card */}
          <div style={{ background: '#fff', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-card)', padding: '2rem' }}>
            <label style={{ display: 'block', fontSize: 'var(--text-caption)', fontWeight: 700, color: '#181d26', marginBottom: '0.625rem', textTransform: 'uppercase', letterSpacing: '0.06em', fontFamily: 'var(--font-display)' }}>
              Your Aurum Referral Code
            </label>
            <input
              type="text"
              value={code}
              onChange={e => setCode(e.target.value)}
              placeholder="e.g. BARRY123 or your Aurum username"
              style={inputStyle}
              onFocus={e => (e.target.style.borderColor = '#1b61c9')}
              onBlur={e => (e.target.style.borderColor = 'var(--color-border)')}
            />

            {referralUrl && (
              <div style={{ marginTop: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: 'var(--text-caption)', fontWeight: 700, color: '#181d26', marginBottom: '0.625rem', textTransform: 'uppercase', letterSpacing: '0.06em', fontFamily: 'var(--font-display)' }}>
                  Your Referral URL
                </label>
                <div style={{ display: 'flex', alignItems: 'stretch', gap: '0.625rem' }}>
                  <div style={{ flex: 1, overflow: 'hidden', borderRadius: 'var(--radius-md)', padding: '0.875rem 1rem', background: 'rgba(27,97,201,0.05)', border: '1px solid rgba(27,97,201,0.2)' }}>
                    <p style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: 'var(--text-body)', fontFamily: 'monospace', color: '#1b61c9' }}>{referralUrl}</p>
                  </div>
                  <button
                    onClick={handleCopy}
                    style={{
                      flexShrink: 0,
                      borderRadius: 'var(--radius-btn)',
                      padding: '0 1.5rem',
                      fontSize: 'var(--text-body)',
                      fontFamily: 'var(--font-display)',
                      fontWeight: 700,
                      color: '#fff',
                      background: copied ? '#059669' : '#1b61c9',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'background 200ms ease',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.375rem',
                    }}
                  >
                    {copied ? (<><CheckCircleIcon className="w-4 h-4" /> Copied!</>) : 'Copy'}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* How it works */}
          <div style={{ background: '#fff', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-card)', padding: '2rem' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-body-lg)', color: '#181d26', marginBottom: '1.5rem' }}>How it works</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {STEPS.map(item => (
                <div key={item.step} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '2rem', height: '2rem', flexShrink: 0, borderRadius: '50%', background: '#1b61c9', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-caption)', color: '#fff' }}>{item.step}</span>
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-body)', color: '#181d26', marginBottom: '0.25rem' }}>{item.title}</h3>
                    <p style={{ fontSize: 'var(--text-body)', color: 'var(--color-text-muted)', lineHeight: 'var(--lh-relaxed)' }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Info note */}
          <div style={{ background: 'rgba(27,97,201,0.05)', border: '1px solid rgba(27,97,201,0.15)', borderRadius: 'var(--radius-md)', padding: '1rem 1.25rem', display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
            <span style={{ flexShrink: 0, color: '#1b61c9', marginTop: '0.125rem' }}>
              <SparkleIcon className="w-5 h-5" />
            </span>
            <p style={{ fontSize: 'var(--text-body)', color: '#1b61c9', lineHeight: 'var(--lh-relaxed)', margin: 0 }}>
              <strong>Note:</strong> Your referral code comes from the Aurum backoffice \u2014 not from AutoPilot ROI. If you don&apos;t have one yet, reach out to your upline partner.
            </p>
          </div>

          <div style={{ textAlign: 'center', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
            <PartnerIcon className="w-4 h-4" />
            <Link href="/dashboard/links" style={{ fontSize: 'var(--text-body)', fontWeight: 600, color: '#1b61c9', textDecoration: 'none' }}>
              Go to Partner Dashboard for advanced link tracking \u2192
            </Link>
          </div>
        </div>
      </SectionBox>

      <CTABand
        eyebrow="Ready to grow your team?"
        title={<>Send your link.<br />Track every signup.</>}
        description="Every prospect who clicks your URL is locked to your code. The dashboard tracks impressions, click-throughs, and completions."
        ctas={[
          { label: 'Open dashboard \u2192', href: '/dashboard/links' },
          { label: 'Read partner playbook', href: '/university', variant: 'ghost' },
        ]}
      />
    </PageShell>
  )
}
