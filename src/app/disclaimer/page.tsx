import { PageShell, SectionBox, HeroBlue, CTABand } from '@/components/sections'

export const metadata = { title: 'Earnings Disclaimer — AutopilotROI', description: 'Important earnings and investment risk disclaimer for AutopilotROI users.' }

const h2Style = { color: '#181d26', fontFamily: 'var(--font-display)', fontWeight: 700 as const, marginBottom: '0.75rem' }
const pStyle = { marginBottom: '1.5rem' }

export default function DisclaimerPage() {
  return (
    <PageShell>

      {/* ── HERO ── */}
      <HeroBlue
        eyebrow="⚠️ Important Disclosure"
        title={<>Earnings Disclaimer</>}
        description="Important earnings and investment risk disclaimer for AutopilotROI users."
      />

      {/* ── WARNING BANNER ── */}
      <SectionBox variant="white" padding="none">
        <div style={{ background: '#fef2f2', borderTop: '1px solid #fecaca', borderBottom: '1px solid #fecaca' }}>
          <div style={{ padding: '1.25rem 1.5rem', maxWidth: '48rem', margin: '0 auto' }}>
            <p style={{ fontSize: 'var(--text-body)', fontWeight: 600, color: '#991b1b', lineHeight: 'var(--lh-relaxed)', margin: 0 }}>
              ⚠️ AutopilotROI is an independent onboarding platform. This site does not provide financial advice. All investments carry risk, including the risk of total loss. Returns referenced on this site are illustrative and not guaranteed. Never invest more than you can afford to lose.
            </p>
          </div>
        </div>
      </SectionBox>

      {/* ── CONTENT ── */}
      <SectionBox variant="white" padding="lg">
        <div style={{ maxWidth: '48rem', margin: '0 auto' }}>

          {/* Last-updated subtitle */}
          <p style={{ fontSize: 'var(--text-body)', color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
            Last updated: January 1, 2026
          </p>

          <div style={{ background: '#fff', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-card)', padding: '2.5rem 3rem' }}>
            <div style={{ color: 'var(--color-text-weak)', lineHeight: 1.85, fontSize: 'var(--text-body)' }}>

              <h2 style={{ ...h2Style, marginTop: 0 }}>No Financial Advice</h2>
              <p style={pStyle}>AutopilotROI is an onboarding and educational platform. Nothing on this website constitutes financial, investment, legal, or tax advice. We are not a registered broker, financial advisor, or investment manager.</p>

              <h2 style={h2Style}>Investment Risk</h2>
              <p style={pStyle}>All investments involve risk and possible loss of principal. Cryptocurrency and digital asset markets are highly volatile. Past performance of any trading strategy or product mentioned on this platform is not indicative of future results.</p>

              <h2 style={h2Style}>Illustrative Returns</h2>
              <p style={pStyle}>Any earnings figures, returns, or performance metrics shown on this platform are illustrative only. They are based on historical data or projections and are not guarantees of future performance. Individual results will vary significantly.</p>

              <h2 style={h2Style}>Independent Due Diligence</h2>
              <p style={pStyle}>Before making any investment decision, you should conduct your own research and seek independent financial advice from a qualified professional. Understand the full risk profile of any investment before committing capital.</p>

              <h2 style={h2Style}>Platform Independence</h2>
              <p style={pStyle}>AutopilotROI is an independent platform and is not affiliated with, endorsed by, or representing the Aurum AI company or its subsidiaries. We provide onboarding support as an independent third-party service.</p>

              <h2 style={h2Style}>Regulatory Compliance</h2>
              <p>Users are responsible for ensuring their participation complies with all applicable laws and regulations in their jurisdiction. Some products and services may not be available in all regions.</p>

            </div>
          </div>
        </div>
      </SectionBox>

      {/* ── CTA ── */}
      <CTABand
        eyebrow="Have questions?"
        title={<>We&rsquo;re here to help.</>}
        description="Browse our knowledge base or start your onboarding journey today."
        ctas={[
          { label: 'Read FAQs', href: '/faqs' },
          { label: 'Get started →', href: '/start', variant: 'ghost' },
        ]}
      />

    </PageShell>
  )
}
