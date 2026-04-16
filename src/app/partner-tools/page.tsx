'use client'

import { useState } from 'react'
import Link from 'next/link'

const inputStyle: React.CSSProperties = {
  width: '100%', borderRadius: '10px', border: '1.5px solid #e0e2e6',
  padding: '0.75rem 1rem', fontSize: '0.95rem', color: '#181d26',
  background: '#fff', outline: 'none', transition: 'border-color 0.15s',
}

export default function PartnerToolsPage() {
  const [code, setCode] = useState('')
  const [copied, setCopied] = useState(false)

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://autopilotroi.com'
  const referralUrl = code.trim() ? `${baseUrl}/join?ref=${encodeURIComponent(code.trim())}` : ''

  function handleCopy() {
    if (!referralUrl) return
    navigator.clipboard.writeText(referralUrl).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2500) })
  }

  return (
    <div className="min-h-screen" style={{ background: '#f8fafc' }}>
      {/* Hero */}
      <section className="px-6 py-16 lg:px-10" style={{ background: '#fff', borderBottom: '1px solid #e0e2e6' }}>
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] mb-4"
            style={{ background: 'rgba(27,97,201,0.08)', color: '#1b61c9', border: '1px solid rgba(27,97,201,0.15)' }}>
            🔗 Partner Tools
          </span>
          <h1 className="text-4xl font-bold mb-4" style={{ color: '#181d26', letterSpacing: '-0.03em' }}>Referral Link Generator</h1>
          <p className="text-lg max-w-xl mx-auto" style={{ color: 'rgba(4,14,32,0.55)', lineHeight: 1.7 }}>
            Enter your Aurum backoffice referral code to generate your personalized onboarding URL. Share it with prospects — they&apos;ll be attributed to you automatically.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-2xl px-6 py-12 lg:px-10 space-y-6">
        {/* Generator */}
        <div className="rounded-2xl p-8" style={{ background: '#fff', border: '1px solid #e0e2e6' }}>
          <label className="block text-sm font-bold mb-2" style={{ color: '#181d26' }}>Your Aurum Referral Code</label>
          <input type="text" value={code} onChange={e => setCode(e.target.value)}
            placeholder="e.g. BARRY123 or your Aurum username"
            style={{ ...inputStyle, fontSize: '1rem', padding: '0.9rem 1rem' }}
            onFocus={e => (e.target.style.borderColor = '#1b61c9')}
            onBlur={e  => (e.target.style.borderColor = '#e0e2e6')}
          />

          {referralUrl && (
            <div className="mt-6">
              <label className="block text-sm font-bold mb-2" style={{ color: '#181d26' }}>Your Referral URL</label>
              <div className="flex items-stretch gap-2">
                <div className="flex-1 overflow-hidden rounded-xl px-4 py-3" style={{ background: 'rgba(27,97,201,0.05)', border: '1px solid rgba(27,97,201,0.2)' }}>
                  <p className="truncate text-sm font-mono" style={{ color: '#1b61c9' }}>{referralUrl}</p>
                </div>
                <button onClick={handleCopy}
                  className="shrink-0 rounded-xl px-6 py-3 text-sm font-bold text-white transition"
                  style={{ background: copied ? '#059669' : '#1b61c9' }}
                  onMouseEnter={e => !copied && ((e.currentTarget as HTMLButtonElement).style.background = '#254fad')}
                  onMouseLeave={e => !copied && ((e.currentTarget as HTMLButtonElement).style.background = '#1b61c9')}>
                  {copied ? '✓ Copied!' : 'Copy'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* How it works */}
        <div className="rounded-2xl p-8" style={{ background: '#fff', border: '1px solid #e0e2e6' }}>
          <h2 className="text-xl font-bold mb-6" style={{ color: '#181d26' }}>How it works</h2>
          <div className="space-y-5">
            {[
              { step: '1', title: 'Get your code', desc: 'Log into your Aurum backoffice and copy your referral code or username.' },
              { step: '2', title: 'Generate your link', desc: 'Paste the code above — your unique URL is generated instantly.' },
              { step: '3', title: 'Share with prospects', desc: 'Send the link to anyone interested. When they click it, your code is automatically saved.' },
              { step: '4', title: 'They start onboarding', desc: 'Your prospect goes through the AutoPilot ROI onboarding flow — attributed to you.' },
            ].map(item => (
              <div key={item.step} className="flex gap-4 items-start">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white" style={{ background: '#1b61c9' }}>
                  {item.step}
                </span>
                <div>
                  <h3 className="text-sm font-bold mb-0.5" style={{ color: '#181d26' }}>{item.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(4,14,32,0.55)' }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Note */}
        <div className="rounded-xl px-5 py-4" style={{ background: 'rgba(27,97,201,0.05)', border: '1px solid rgba(27,97,201,0.15)' }}>
          <p className="text-sm leading-relaxed" style={{ color: '#1b61c9' }}>
            <strong>💡 Note:</strong> Your referral code comes from the Aurum backoffice — not from AutoPilot ROI. If you don&apos;t have one yet, reach out to your upline partner. The code ensures proper placement in the team structure.
          </p>
        </div>

        <div className="text-center pt-2">
          <Link href="/dashboard/links" className="text-sm font-semibold" style={{ color: '#1b61c9' }}>
            Go to Partner Dashboard for advanced link tracking →
          </Link>
        </div>
      </div>
    </div>
  )
}
