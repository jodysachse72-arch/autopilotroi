'use client'

import { useState } from 'react'
import Link from 'next/link'

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
    <div className="page-bg">
      <div className="sections-stack">

        {/* Hero */}
        <section className="section-box">
          <div className="container-xl section-padding" style={{ textAlign:'center' }}>
            <span style={{ display:'inline-block', background:'rgba(27,97,201,0.08)', color:'#1b61c9', border:'1px solid rgba(27,97,201,0.15)', borderRadius:'99px', padding:'0.375rem 1rem', fontSize:'var(--text-caption)', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'1.25rem' }}>
              🔗 Partner Tools
            </span>
            <h1 className="text-display" style={{ color:'#181d26', marginBottom:'1rem' }}>Referral Link Generator</h1>
            <p className="text-body-lg" style={{ color:'var(--color-text-weak)', lineHeight:'var(--lh-relaxed)', maxWidth:'36rem', margin:'0 auto' }}>
              Enter your Aurum backoffice referral code to generate your personalized onboarding URL. Share it with prospects — they&apos;ll be attributed to you automatically.
            </p>
          </div>
        </section>

        {/* Tools */}
        <section className="section-box">
          <div className="container-xl section-padding">
            <div style={{ maxWidth:'40rem', margin:'0 auto', display:'flex', flexDirection:'column', gap:'1.25rem' }}>

              {/* Generator card */}
              <div style={{ background:'#fff', border:'1px solid var(--color-border)', borderRadius:'var(--radius-card)', padding:'2rem' }}>
                <label style={{ display:'block', fontSize:'var(--text-caption)', fontWeight:700, color:'#181d26', marginBottom:'0.625rem', textTransform:'uppercase', letterSpacing:'0.06em', fontFamily:'var(--font-display)' }}>
                  Your Aurum Referral Code
                </label>
                <input
                  type="text" value={code} onChange={e => setCode(e.target.value)}
                  placeholder="e.g. BARRY123 or your Aurum username"
                  style={inputStyle}
                  onFocus={e => (e.target.style.borderColor = '#1b61c9')}
                  onBlur={e  => (e.target.style.borderColor = 'var(--color-border)')}
                />

                {referralUrl && (
                  <div style={{ marginTop:'1.5rem' }}>
                    <label style={{ display:'block', fontSize:'var(--text-caption)', fontWeight:700, color:'#181d26', marginBottom:'0.625rem', textTransform:'uppercase', letterSpacing:'0.06em', fontFamily:'var(--font-display)' }}>
                      Your Referral URL
                    </label>
                    <div style={{ display:'flex', alignItems:'stretch', gap:'0.625rem' }}>
                      <div style={{ flex:1, overflow:'hidden', borderRadius:'var(--radius-md)', padding:'0.875rem 1rem', background:'rgba(27,97,201,0.05)', border:'1px solid rgba(27,97,201,0.2)' }}>
                        <p style={{ overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', fontSize:'var(--text-body)', fontFamily:'monospace', color:'#1b61c9' }}>{referralUrl}</p>
                      </div>
                      <button onClick={handleCopy}
                        style={{ flexShrink:0, borderRadius:'var(--radius-btn)', padding:'0 1.5rem', fontSize:'var(--text-body)', fontFamily:'var(--font-display)', fontWeight:700, color:'#fff', background: copied ? '#059669' : '#1b61c9', border:'none', cursor:'pointer', transition:'background 200ms ease' }}>
                        {copied ? '✓ Copied!' : 'Copy'}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* How it works */}
              <div style={{ background:'#fff', border:'1px solid var(--color-border)', borderRadius:'var(--radius-card)', padding:'2rem' }}>
                <h2 style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'var(--text-body-lg)', color:'#181d26', marginBottom:'1.5rem' }}>How it works</h2>
                <div style={{ display:'flex', flexDirection:'column', gap:'1.25rem' }}>
                  {[
                    { step:'1', title:'Get your code', desc:'Log into your Aurum backoffice and copy your referral code or username.' },
                    { step:'2', title:'Generate your link', desc:'Paste the code above — your unique URL is generated instantly.' },
                    { step:'3', title:'Share with prospects', desc:'Send the link to anyone interested. When they click it, your code is automatically saved.' },
                    { step:'4', title:'They start onboarding', desc:'Your prospect goes through the AutoPilot ROI onboarding flow — attributed to you.' },
                  ].map(item => (
                    <div key={item.step} style={{ display:'flex', gap:'1rem', alignItems:'flex-start' }}>
                      <span style={{ display:'flex', alignItems:'center', justifyContent:'center', width:'2rem', height:'2rem', flexShrink:0, borderRadius:'50%', background:'#1b61c9', fontFamily:'var(--font-display)', fontWeight:700, fontSize:'var(--text-caption)', color:'#fff' }}>{item.step}</span>
                      <div>
                        <h3 style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'var(--text-body)', color:'#181d26', marginBottom:'0.25rem' }}>{item.title}</h3>
                        <p style={{ fontSize:'var(--text-body)', color:'var(--color-text-muted)', lineHeight:'var(--lh-relaxed)' }}>{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Info note */}
              <div style={{ background:'rgba(27,97,201,0.05)', border:'1px solid rgba(27,97,201,0.15)', borderRadius:'var(--radius-md)', padding:'1rem 1.25rem' }}>
                <p style={{ fontSize:'var(--text-body)', color:'#1b61c9', lineHeight:'var(--lh-relaxed)' }}>
                  <strong>💡 Note:</strong> Your referral code comes from the Aurum backoffice — not from AutoPilot ROI. If you don&apos;t have one yet, reach out to your upline partner.
                </p>
              </div>

              <div style={{ textAlign:'center' }}>
                <Link href="/dashboard/links" style={{ fontSize:'var(--text-body)', fontWeight:600, color:'#1b61c9', textDecoration:'none' }}>
                  Go to Partner Dashboard for advanced link tracking →
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
