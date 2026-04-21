export const metadata = { title: 'Terms of Service — AutopilotROI', description: 'Terms and conditions for using the AutopilotROI platform.' }

export default function TermsPage() {
  return (
    <div className="page-bg">
      <div className="sections-stack">

        {/* Header */}
        <section className="section-box">
          <div className="container-xl section-padding" style={{ maxWidth:'48rem' }}>
            <span style={{ display:'inline-block', background:'rgba(27,97,201,0.08)', color:'#1b61c9', border:'1px solid rgba(27,97,201,0.15)', borderRadius:'99px', padding:'0.375rem 1rem', fontSize:'var(--text-caption)', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'1.25rem' }}>Legal</span>
            <h1 className="text-display" style={{ color:'#181d26', marginBottom:'0.5rem' }}>Terms of Service</h1>
            <p style={{ fontSize:'var(--text-body)', color:'var(--color-text-muted)' }}>Last updated: January 1, 2026</p>
          </div>
        </section>

        {/* Content */}
        <section className="section-box">
          <div className="container-xl section-padding">
            <div style={{ maxWidth:'48rem', margin:'0 auto', background:'#fff', border:'1px solid var(--color-border)', borderRadius:'var(--radius-card)', padding:'2.5rem 3rem' }}>
              <div style={{ color:'var(--color-text-weak)', lineHeight:1.85, fontSize:'var(--text-body)' }}>
                <h2 style={{ color:'#181d26', fontFamily:'var(--font-display)', fontWeight:700, marginTop:0, marginBottom:'0.75rem' }}>1. Acceptance of Terms</h2>
                <p style={{ marginBottom:'1.5rem' }}>By accessing or using AutopilotROI, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree, please do not use the platform.</p>

                <h2 style={{ color:'#181d26', fontFamily:'var(--font-display)', fontWeight:700, marginBottom:'0.75rem' }}>2. Platform Description</h2>
                <p style={{ marginBottom:'1.5rem' }}>AutopilotROI is an independent onboarding and education platform for the Aurum AI ecosystem. We are not a financial advisor, broker, or investment firm. Nothing on this platform constitutes financial advice.</p>

                <h2 style={{ color:'#181d26', fontFamily:'var(--font-display)', fontWeight:700, marginBottom:'0.75rem' }}>3. User Responsibilities</h2>
                <p style={{ marginBottom:'1.5rem' }}>You agree to provide accurate information when creating an account, not to misuse the platform or its referral systems, and to comply with all applicable laws and regulations in your jurisdiction.</p>

                <h2 style={{ color:'#181d26', fontFamily:'var(--font-display)', fontWeight:700, marginBottom:'0.75rem' }}>4. Investment Risk Disclosure</h2>
                <p style={{ marginBottom:'1.5rem' }}>All investments carry risk, including the potential loss of principal. Past performance is not indicative of future results. Never invest more than you can afford to lose. Please review our full <a href="/disclaimer" style={{ color:'#1b61c9' }}>Earnings Disclaimer</a>.</p>

                <h2 style={{ color:'#181d26', fontFamily:'var(--font-display)', fontWeight:700, marginBottom:'0.75rem' }}>5. Intellectual Property</h2>
                <p style={{ marginBottom:'1.5rem' }}>All content, trademarks, logos, and materials on this platform are the property of AutopilotROI or its licensors. Unauthorized use is prohibited.</p>

                <h2 style={{ color:'#181d26', fontFamily:'var(--font-display)', fontWeight:700, marginBottom:'0.75rem' }}>6. Privacy</h2>
                <p style={{ marginBottom:'1.5rem' }}>Your use of the platform is governed by our <a href="/privacy" style={{ color:'#1b61c9' }}>Privacy Policy</a>, which is incorporated into these terms by reference.</p>

                <h2 style={{ color:'#181d26', fontFamily:'var(--font-display)', fontWeight:700, marginBottom:'0.75rem' }}>7. Limitation of Liability</h2>
                <p style={{ marginBottom:'1.5rem' }}>To the maximum extent permitted by law, AutopilotROI shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the platform.</p>

                <h2 style={{ color:'#181d26', fontFamily:'var(--font-display)', fontWeight:700, marginBottom:'0.75rem' }}>8. Changes to Terms</h2>
                <p style={{ marginBottom:'1.5rem' }}>We reserve the right to modify these terms at any time. Continued use of the platform after changes constitutes acceptance of the new terms.</p>

                <h2 style={{ color:'#181d26', fontFamily:'var(--font-display)', fontWeight:700, marginBottom:'0.75rem' }}>9. Contact</h2>
                <p>For questions about these terms, please contact us through the platform support channels.</p>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}
