'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

function JoinContent() {
  const searchParams = useSearchParams()
  const refCode = searchParams.get('ref')
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (refCode) {
      try { localStorage.setItem('autopilotroi-ref', refCode); setSaved(true) } catch {}
    }
  }, [refCode])

  return (
    <div className="page-bg">
      <div className="sections-stack">
        {/* Hero */}
        <section className="section-box">
          <div className="container-xl section-padding" style={{ textAlign: 'center' }}>
            {refCode ? (
              <>
                <span style={{ display:'inline-block', background:'rgba(16,185,129,0.08)', color:'#059669', border:'1px solid rgba(16,185,129,0.2)', borderRadius:'99px', padding:'0.375rem 1rem', fontSize:'var(--text-caption)', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'1.5rem' }}>✓ Referral Code Recognized</span>
                <h1 className="text-display" style={{ color:'#181d26', marginBottom:'1.25rem' }}>
                  You&apos;ve been invited to<br /><span style={{ color:'#1b61c9' }}>Team AutoPilot ROI</span>
                </h1>
                <p className="text-body-lg" style={{ color:'var(--color-text-weak)', lineHeight:'var(--lh-relaxed)', maxWidth:'36rem', margin:'0 auto 2rem' }}>
                  A partner from our team shared this link with you. Your referral has been saved — when you complete onboarding, the right partner will be notified and credited.
                </p>
                <div style={{ display:'inline-block', background:'#f8fafc', border:'1px solid var(--color-border)', borderRadius:'var(--radius-card)', padding:'1.25rem 2rem', marginBottom:'2rem', minWidth:'16rem' }}>
                  <div style={{ fontSize:'var(--text-caption)', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.1em', color:'var(--color-text-muted)', marginBottom:'0.5rem' }}>Referral Code</div>
                  <div style={{ fontSize:'1.5rem', fontWeight:700, fontFamily:'monospace', letterSpacing:'0.12em', color:'#181d26' }}>{refCode}</div>
                  {saved && <div style={{ marginTop:'0.5rem', fontSize:'var(--text-caption)', fontWeight:600, color:'#059669' }}>✓ Saved to your session</div>}
                </div>
              </>
            ) : (
              <>
                <span style={{ display:'inline-block', background:'rgba(27,97,201,0.08)', color:'#1b61c9', border:'1px solid rgba(27,97,201,0.15)', borderRadius:'99px', padding:'0.375rem 1rem', fontSize:'var(--text-caption)', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'1.5rem' }}>Welcome</span>
                <h1 className="text-display" style={{ color:'#181d26', marginBottom:'1.25rem' }}>
                  Welcome to<br /><span style={{ color:'#1b61c9' }}>Team AutoPilot ROI</span>
                </h1>
                <p className="text-body-lg" style={{ color:'var(--color-text-weak)', lineHeight:'var(--lh-relaxed)', maxWidth:'36rem', margin:'0 auto 2rem' }}>
                  AutoPilot ROI is the structured onboarding system for the Aurum ecosystem. Start your journey with education, guided setup, and personal partner support.
                </p>
                <div style={{ display:'inline-block', background:'rgba(245,158,11,0.06)', border:'1px solid rgba(245,158,11,0.25)', borderRadius:'var(--radius-md)', padding:'0.875rem 1.5rem', marginBottom:'2rem', maxWidth:'28rem' }}>
                  <p style={{ fontSize:'var(--text-body)', color:'#d97706' }}><strong>No referral code detected.</strong> If someone sent you a link, make sure you&apos;re using the full URL they shared.</p>
                </div>
              </>
            )}
            <div style={{ display:'flex', flexWrap:'wrap', alignItems:'center', justifyContent:'center', gap:'0.875rem' }}>
              <Link href="/start" style={{ display:'inline-flex', alignItems:'center', background:'linear-gradient(135deg,#2563eb 0%,#1b61c9 100%)', color:'#fff', padding:'0.875rem 2rem', borderRadius:'var(--radius-btn)', fontFamily:'var(--font-display)', fontWeight:700, fontSize:'var(--text-body)', textDecoration:'none', boxShadow:'0 4px 16px rgba(27,97,201,0.4)' }}>Start Onboarding →</Link>
              <Link href="/university" style={{ display:'inline-flex', alignItems:'center', background:'#fff', border:'1.5px solid var(--color-border)', color:'#181d26', padding:'0.875rem 2rem', borderRadius:'var(--radius-btn)', fontFamily:'var(--font-display)', fontWeight:600, fontSize:'var(--text-body)', textDecoration:'none' }}>Explore University</Link>
            </div>
          </div>
        </section>

        {/* Feature cards */}
        <section className="section-box">
          <div className="container-xl section-padding">
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,18rem),1fr))', gap:'1.25rem', maxWidth:'56rem', margin:'0 auto' }}>
              {[
                { icon:'🎓', title:'Full Education', desc:'Videos, guides, and due diligence before you invest anything.' },
                { icon:'🤝', title:'Personal Support', desc:'A dedicated partner walks you through every step.' },
                { icon:'🔗', title:'Correct Placement', desc:"Your referral code ensures you're placed in the right team position." },
                { icon:'📊', title:'Readiness Score', desc:'Know exactly where you stand before committing.' },
              ].map(item => (
                <div key={item.title} style={{ background:'#fff', border:'1px solid var(--color-border)', borderRadius:'var(--radius-card)', padding:'1.5rem', transition:'box-shadow 200ms ease,transform 200ms ease' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow='var(--shadow-card-hover)'; (e.currentTarget as HTMLElement).style.transform='translateY(-2px)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow='none'; (e.currentTarget as HTMLElement).style.transform='translateY(0)' }}>
                  <div style={{ fontSize:'2rem', marginBottom:'0.75rem' }}>{item.icon}</div>
                  <h3 style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'var(--text-body-lg)', color:'#181d26', marginBottom:'0.5rem' }}>{item.title}</h3>
                  <p style={{ fontSize:'var(--text-body)', color:'var(--color-text-muted)', lineHeight:'var(--lh-relaxed)' }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default function JoinPage() {
  return (
    <Suspense fallback={<div className="page-bg" style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center' }}><div style={{ width:'2rem', height:'2rem', borderRadius:'50%', border:'2px solid #1b61c9', borderTopColor:'transparent' }} /></div>}>
      <JoinContent />
    </Suspense>
  )
}
