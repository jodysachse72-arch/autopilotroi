export const metadata = { title: 'Terms of Service — AutopilotROI', description: 'Terms and conditions for using the AutopilotROI platform.' }

export default function TermsPage() {
  return (
    <div className="min-h-screen" style={{ background: '#f8fafc' }}>
      {/* Hero */}
      <section className="px-6 py-16 lg:px-10" style={{ background: '#fff', borderBottom: '1px solid #e0e2e6' }}>
        <div className="mx-auto max-w-3xl">
          <span className="inline-block rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] mb-4"
            style={{ background: 'rgba(27,97,201,0.08)', color: '#1b61c9', border: '1px solid rgba(27,97,201,0.15)' }}>
            Legal
          </span>
          <h1 className="text-3xl font-bold mb-3" style={{ color: '#181d26', letterSpacing: '-0.02em' }}>Terms of Service</h1>
          <p className="text-sm" style={{ color: 'rgba(4,14,32,0.45)' }}>Last updated: January 1, 2026</p>
        </div>
      </section>

      {/* Content */}
      <section className="px-6 py-14 lg:px-10">
        <div className="mx-auto max-w-3xl rounded-2xl p-8 lg:p-12" style={{ background: '#fff', border: '1px solid #e0e2e6' }}>
          <div className="prose prose-slate max-w-none" style={{ color: 'rgba(4,14,32,0.75)', lineHeight: 1.8 }}>
            <h2 style={{ color: '#181d26', fontWeight: 700, marginTop: '1.5rem' }}>1. Acceptance of Terms</h2>
            <p>By accessing or using AutopilotROI, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree, please do not use the platform.</p>

            <h2 style={{ color: '#181d26', fontWeight: 700, marginTop: '1.5rem' }}>2. Platform Description</h2>
            <p>AutopilotROI is an independent onboarding and education platform for the Aurum AI ecosystem. We are not a financial advisor, broker, or investment firm. Nothing on this platform constitutes financial advice.</p>

            <h2 style={{ color: '#181d26', fontWeight: 700, marginTop: '1.5rem' }}>3. User Responsibilities</h2>
            <p>You agree to provide accurate information when creating an account, not to misuse the platform or its referral systems, and to comply with all applicable laws and regulations in your jurisdiction.</p>

            <h2 style={{ color: '#181d26', fontWeight: 700, marginTop: '1.5rem' }}>4. Investment Risk Disclosure</h2>
            <p>All investments carry risk, including the potential loss of principal. Past performance is not indicative of future results. Never invest more than you can afford to lose. Please review our full <a href="/disclaimer" style={{ color: '#1b61c9' }}>Earnings Disclaimer</a>.</p>

            <h2 style={{ color: '#181d26', fontWeight: 700, marginTop: '1.5rem' }}>5. Intellectual Property</h2>
            <p>All content, trademarks, logos, and materials on this platform are the property of AutopilotROI or its licensors. Unauthorized use is prohibited.</p>

            <h2 style={{ color: '#181d26', fontWeight: 700, marginTop: '1.5rem' }}>6. Privacy</h2>
            <p>Your use of the platform is governed by our <a href="/privacy" style={{ color: '#1b61c9' }}>Privacy Policy</a>, which is incorporated into these terms by reference.</p>

            <h2 style={{ color: '#181d26', fontWeight: 700, marginTop: '1.5rem' }}>7. Limitation of Liability</h2>
            <p>To the maximum extent permitted by law, AutopilotROI shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the platform.</p>

            <h2 style={{ color: '#181d26', fontWeight: 700, marginTop: '1.5rem' }}>8. Changes to Terms</h2>
            <p>We reserve the right to modify these terms at any time. Continued use of the platform after changes constitutes acceptance of the new terms.</p>

            <h2 style={{ color: '#181d26', fontWeight: 700, marginTop: '1.5rem' }}>9. Contact</h2>
            <p>For questions about these terms, please contact us through the platform support channels.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
