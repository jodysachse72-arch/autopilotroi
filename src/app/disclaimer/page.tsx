import Link from 'next/link'
import HomeCTABand from '@/components/home/CTABand'

export const metadata = {
  title: 'Earnings Disclaimer',
  description: 'Important earnings and investment risk disclaimer for AutoPilotROI users.',
}

export default function DisclaimerPage() {
  return (
    <>
      {/* Hero */}
      <section className="section section-alt" style={{ paddingBottom: '3rem' }}>
        <div className="container-content" style={{ maxWidth: '48rem' }}>
          <span className="badge mb-4 inline-flex">⚠️ Important Disclosure</span>
          <h1 className="text-display mb-4">Earnings Disclaimer</h1>
          <p className="text-body-lg" style={{ color: 'var(--color-fg-muted)' }}>
            Important earnings and investment risk disclaimer for AutoPilotROI users.
          </p>
        </div>
      </section>

      {/* Warning banner */}
      <div style={{ backgroundColor: '#fef2f2', borderTop: '1px solid #fecaca', borderBottom: '1px solid #fecaca' }}>
        <div className="container-content" style={{ maxWidth: '48rem', padding: '1.25rem var(--page-px)' }}>
          <p className="text-body" style={{ fontWeight: 600, color: '#991b1b', lineHeight: 'var(--lh-relaxed)', margin: 0 }}>
            ⚠️ AutoPilotROI is an independent onboarding platform. This site does not provide financial advice. All investments carry risk, including the risk of total loss. Returns referenced on this site are illustrative and not guaranteed. Never invest more than you can afford to lose.
          </p>
        </div>
      </div>

      {/* Content */}
      <section className="section section-surface" style={{ paddingTop: '3rem' }}>
        <div className="container-content" style={{ maxWidth: '48rem' }}>
          <p className="text-caption mb-8" style={{ color: 'var(--color-fg-faint)' }}>
            Last updated: January 1, 2026
          </p>

          <div className="card-flat" style={{ padding: '3rem' }}>
            <div style={{ color: 'var(--color-fg-muted)', lineHeight: 1.85, fontSize: 'var(--text-body)' }}>

              <h2 className="text-subheading mb-3" style={{ color: 'var(--color-fg)' }}>No Financial Advice</h2>
              <p style={{ marginBottom: '2rem' }}>AutoPilotROI is an onboarding and educational platform. Nothing on this website constitutes financial, investment, legal, or tax advice. We are not a registered broker, financial advisor, or investment manager.</p>

              <h2 className="text-subheading mb-3" style={{ color: 'var(--color-fg)' }}>Investment Risk</h2>
              <p style={{ marginBottom: '2rem' }}>All investments involve risk and possible loss of principal. Cryptocurrency and digital asset markets are highly volatile. Past performance of any trading strategy or product mentioned on this platform is not indicative of future results.</p>

              <h2 className="text-subheading mb-3" style={{ color: 'var(--color-fg)' }}>Illustrative Returns</h2>
              <p style={{ marginBottom: '2rem' }}>Any earnings figures, returns, or performance metrics shown on this platform are illustrative only. They are based on historical data or projections and are not guarantees of future performance. Individual results will vary significantly.</p>

              <h2 className="text-subheading mb-3" style={{ color: 'var(--color-fg)' }}>Independent Due Diligence</h2>
              <p style={{ marginBottom: '2rem' }}>Before making any investment decision, you should conduct your own research and seek independent financial advice from a qualified professional. Understand the full risk profile of any investment before committing capital.</p>

              <h2 className="text-subheading mb-3" style={{ color: 'var(--color-fg)' }}>Platform Independence</h2>
              <p style={{ marginBottom: '2rem' }}>AutoPilotROI is an independent platform and is not affiliated with, endorsed by, or representing the Aurum AI company or its subsidiaries. We provide onboarding support as an independent third-party service.</p>

              <h2 className="text-subheading mb-3" style={{ color: 'var(--color-fg)' }}>Regulatory Compliance</h2>
              <p>Users are responsible for ensuring their participation complies with all applicable laws and regulations in their jurisdiction. Some products and services may not be available in all regions.</p>

            </div>
          </div>
        </div>
      </section>

      <HomeCTABand />
    </>
  )
}
