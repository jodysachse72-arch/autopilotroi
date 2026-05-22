import { PageShell, SectionBox, HeroBlue, CTABand } from '@/components/sections'

export const metadata = { title: 'Terms of Service — AutopilotROI', description: 'Terms and conditions for using the AutopilotROI platform.' }

const h2Style = { color: '#181d26', fontFamily: 'var(--font-display)', fontWeight: 700 as const, marginBottom: '0.75rem' }
const pStyle = { marginBottom: '1.5rem' }

export default function TermsPage() {
  return (
    <PageShell>

      {/* ── HERO ── */}
      <HeroBlue
        eyebrow="Legal"
        title={<>Terms of Service</>}
        description="Terms and conditions for using the AutopilotROI platform."
      />

      {/* ── CONTENT ── */}
      <SectionBox variant="white" padding="lg">
        <div style={{ maxWidth: '48rem', margin: '0 auto' }}>

          {/* Last-updated subtitle */}
          <p style={{ fontSize: 'var(--text-body)', color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
            Last updated: January 1, 2026
          </p>

          <div style={{ background: '#fff', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-card)', padding: '2.5rem 3rem' }}>
            <div style={{ color: 'var(--color-text-weak)', lineHeight: 1.85, fontSize: 'var(--text-body)' }}>

              <h2 style={{ ...h2Style, marginTop: 0 }}>1. Acceptance of Terms</h2>
              <p style={pStyle}>By accessing or using AutopilotROI, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree, please do not use the platform.</p>

              <h2 style={h2Style}>2. Platform Description</h2>
              <p style={pStyle}>AutopilotROI is an independent onboarding and education platform for the Aurum AI ecosystem. We are not a financial advisor, broker, or investment firm. Nothing on this platform constitutes financial advice.</p>

              <h2 style={h2Style}>3. User Responsibilities</h2>
              <p style={pStyle}>You agree to provide accurate information when creating an account, not to misuse the platform or its referral systems, and to comply with all applicable laws and regulations in your jurisdiction.</p>

              <h2 style={h2Style}>4. Investment Risk Disclosure</h2>
              <p style={pStyle}>All investments carry risk, including the potential loss of principal. Past performance is not indicative of future results. Never invest more than you can afford to lose. Please review our full <a href="/disclaimer" style={{ color: '#1b61c9' }}>Earnings Disclaimer</a>.</p>

              <h2 style={h2Style}>5. Intellectual Property</h2>
              <p style={pStyle}>All content, trademarks, logos, and materials on this platform are the property of AutopilotROI or its licensors. Unauthorized use is prohibited.</p>

              <h2 style={h2Style}>6. Privacy</h2>
              <p style={pStyle}>Your use of the platform is governed by our <a href="/privacy" style={{ color: '#1b61c9' }}>Privacy Policy</a>, which is incorporated into these terms by reference.</p>

              <h2 style={h2Style}>7. Limitation of Liability</h2>
              <p style={pStyle}>To the maximum extent permitted by law, AutopilotROI shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the platform.</p>

              <h2 style={h2Style}>8. Changes to Terms</h2>
              <p style={pStyle}>We reserve the right to modify these terms at any time. Continued use of the platform after changes constitutes acceptance of the new terms.</p>

              <h2 style={h2Style}>9. Contact</h2>
              <p>For questions about these terms, please contact us through the platform support channels.</p>

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
