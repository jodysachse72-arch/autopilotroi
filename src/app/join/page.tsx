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
    <div className="min-h-screen" style={{ background: '#f8fafc' }}>
      {/* Hero */}
      <section className="px-6 py-24 lg:px-10" style={{ background: '#fff', borderBottom: '1px solid #e0e2e6' }}>
        <div className="mx-auto max-w-2xl text-center">
          {refCode ? (
            <>
              <span className="inline-block rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] mb-6"
                style={{ background: 'rgba(16,185,129,0.08)', color: '#059669', border: '1px solid rgba(16,185,129,0.2)' }}>
                ✓ Referral Code Recognized
              </span>
              <h1 className="text-4xl font-bold mb-5" style={{ color: '#181d26', letterSpacing: '-0.03em' }}>
                You&apos;ve been invited to<br />
                <span style={{ color: '#1b61c9' }}>Team AutoPilot ROI</span>
              </h1>
              <p className="text-lg mb-8" style={{ color: 'rgba(4,14,32,0.55)', lineHeight: 1.7 }}>
                A partner from our team shared this link with you. Your referral has been saved — when you complete onboarding, the right partner will be notified and credited.
              </p>
              {/* Referral card */}
              <div className="mx-auto max-w-sm rounded-2xl p-6 mb-8" style={{ background: '#f8fafc', border: '1px solid #e0e2e6' }}>
                <div className="text-xs font-bold uppercase tracking-[0.12em] mb-2" style={{ color: 'rgba(4,14,32,0.4)' }}>Referral Code</div>
                <div className="text-2xl font-bold" style={{ color: '#181d26', fontFamily: 'monospace', letterSpacing: '0.1em' }}>{refCode}</div>
                {saved && <div className="mt-2 text-xs font-semibold" style={{ color: '#059669' }}>✓ Saved to your session</div>}
              </div>
            </>
          ) : (
            <>
              <span className="inline-block rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] mb-6"
                style={{ background: 'rgba(27,97,201,0.08)', color: '#1b61c9', border: '1px solid rgba(27,97,201,0.15)' }}>
                Welcome
              </span>
              <h1 className="text-4xl font-bold mb-5" style={{ color: '#181d26', letterSpacing: '-0.03em' }}>
                Welcome to<br /><span style={{ color: '#1b61c9' }}>Team AutoPilot ROI</span>
              </h1>
              <p className="text-lg mb-8" style={{ color: 'rgba(4,14,32,0.55)', lineHeight: 1.7 }}>
                AutoPilot ROI is the structured onboarding system for the Aurum ecosystem. Start your journey with education, guided setup, and personal partner support.
              </p>
              <div className="mx-auto max-w-sm rounded-xl p-4 mb-8" style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.25)' }}>
                <p className="text-sm" style={{ color: '#d97706' }}>
                  <strong>No referral code detected.</strong> If someone sent you a link, make sure you&apos;re using the full URL they shared. You can still explore the site freely.
                </p>
              </div>
            </>
          )}

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/start" className="rounded-xl px-8 py-3.5 font-bold text-white transition hover:opacity-90" style={{ background: '#1b61c9' }}>
              Start Onboarding →
            </Link>
            <Link href="/university" className="rounded-xl px-8 py-3.5 font-bold transition hover:shadow" style={{ background: '#fff', border: '1px solid #e0e2e6', color: '#181d26' }}>
              Explore University
            </Link>
          </div>
        </div>
      </section>

      {/* What you get */}
      <section className="px-6 py-16 lg:px-10">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-5 sm:grid-cols-2">
            {[
              { icon: '🎓', title: 'Full Education', desc: 'Videos, guides, and due diligence before you invest anything.' },
              { icon: '🤝', title: 'Personal Support', desc: 'A dedicated partner walks you through every step.' },
              { icon: '🔗', title: 'Correct Placement', desc: 'Your referral code ensures you\'re placed in the right team position.' },
              { icon: '📊', title: 'Readiness Score', desc: 'Know exactly where you stand before committing.' },
            ].map(item => (
              <div key={item.title} className="rounded-2xl p-6 transition-shadow hover:shadow-[0_8px_24px_rgba(27,97,201,0.08)]" style={{ background: '#fff', border: '1px solid #e0e2e6' }}>
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="text-lg font-bold mb-2" style={{ color: '#181d26' }}>{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(4,14,32,0.55)' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default function JoinPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center" style={{ background: '#f8fafc' }}><div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" /></div>}>
      <JoinContent />
    </Suspense>
  )
}
