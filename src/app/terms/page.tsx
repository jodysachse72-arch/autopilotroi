import Link from 'next/link'
import HomeCTABand from '@/components/home/CTABand'

export const metadata = {
  title: 'Terms of Service',
  description: 'Terms and conditions for using the AutoPilotROI platform.',
}

export default function TermsPage() {
  return (
    <>
      {/* Hero */}
      <section className="section section-alt" style={{ paddingBottom: '3rem' }}>
        <div className="container-content" style={{ maxWidth: '48rem' }}>
          <span className="badge mb-4 inline-flex">Legal</span>
          <h1 className="text-display mb-4">Terms of Service</h1>
          <p className="text-body-lg" style={{ color: 'var(--color-fg-muted)' }}>
            Terms and conditions for using the AutoPilotROI platform.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="section section-surface" style={{ paddingTop: '3rem' }}>
        <div className="container-content" style={{ maxWidth: '48rem' }}>
          <p className="text-caption mb-8" style={{ color: 'var(--color-fg-faint)' }}>
            Last updated: January 1, 2026
          </p>

          <div className="card-flat" style={{ padding: '3rem' }}>
            <div style={{ color: 'var(--color-fg-muted)', lineHeight: 1.85, fontSize: 'var(--text-body)' }}>

              <h2 className="text-subheading mb-3" style={{ color: 'var(--color-fg)' }}>1. Acceptance of Terms</h2>
              <p style={{ marginBottom: '2rem' }}>By accessing or using AutoPilotROI, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree, please do not use the platform.</p>

              <h2 className="text-subheading mb-3" style={{ color: 'var(--color-fg)' }}>2. Platform Description</h2>
              <p style={{ marginBottom: '2rem' }}>AutoPilotROI is an independent onboarding and education platform for the Aurum AI ecosystem. We are not a financial advisor, broker, or investment firm. Nothing on this platform constitutes financial advice.</p>

              <h2 className="text-subheading mb-3" style={{ color: 'var(--color-fg)' }}>3. User Responsibilities</h2>
              <p style={{ marginBottom: '2rem' }}>You agree to provide accurate information when creating an account, not to misuse the platform or its referral systems, and to comply with all applicable laws and regulations in your jurisdiction.</p>

              <h2 className="text-subheading mb-3" style={{ color: 'var(--color-fg)' }}>4. Investment Risk Disclosure</h2>
              <p style={{ marginBottom: '2rem' }}>All investments carry risk, including the potential loss of principal. Past performance is not indicative of future results. Never invest more than you can afford to lose. Please review our full <Link href="/disclaimer" style={{ color: 'var(--color-accent)', textDecoration: 'underline' }}>Earnings Disclaimer</Link>.</p>

              <h2 className="text-subheading mb-3" style={{ color: 'var(--color-fg)' }}>5. Intellectual Property</h2>
              <p style={{ marginBottom: '2rem' }}>All content, trademarks, logos, and materials on this platform are the property of AutoPilotROI or its licensors. Unauthorized use is prohibited.</p>

              <h2 className="text-subheading mb-3" style={{ color: 'var(--color-fg)' }}>6. Privacy</h2>
              <p style={{ marginBottom: '2rem' }}>Your use of the platform is governed by our <Link href="/privacy" style={{ color: 'var(--color-accent)', textDecoration: 'underline' }}>Privacy Policy</Link>, which is incorporated into these terms by reference.</p>

              <h2 className="text-subheading mb-3" style={{ color: 'var(--color-fg)' }}>7. Limitation of Liability</h2>
              <p style={{ marginBottom: '2rem' }}>To the maximum extent permitted by law, AutoPilotROI shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the platform.</p>

              <h2 className="text-subheading mb-3" style={{ color: 'var(--color-fg)' }}>8. Changes to Terms</h2>
              <p style={{ marginBottom: '2rem' }}>We reserve the right to modify these terms at any time. Continued use of the platform after changes constitutes acceptance of the new terms.</p>

              <h2 className="text-subheading mb-3" style={{ color: 'var(--color-fg)' }}>9. Contact</h2>
              <p>For questions about these terms, please contact us through the platform support channels.</p>

            </div>
          </div>
        </div>
      </section>

      <HomeCTABand />
    </>
  )
}
