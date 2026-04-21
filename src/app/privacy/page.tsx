export const metadata = { title: 'Privacy Policy — AutopilotROI', description: 'How AutopilotROI collects, uses, and protects your personal information.' }

export default function PrivacyPage() {
  return (
    <div className="page-bg">
      <div className="sections-stack">

        {/* Header */}
        <section className="section-box">
          <div className="container-xl section-padding" style={{ maxWidth:'48rem' }}>
            <span style={{ display:'inline-block', background:'rgba(27,97,201,0.08)', color:'#1b61c9', border:'1px solid rgba(27,97,201,0.15)', borderRadius:'99px', padding:'0.375rem 1rem', fontSize:'var(--text-caption)', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'1.25rem' }}>Legal</span>
            <h1 className="text-display" style={{ color:'#181d26', marginBottom:'0.5rem' }}>Privacy Policy</h1>
            <p style={{ fontSize:'var(--text-body)', color:'var(--color-text-muted)' }}>Last updated: January 1, 2026</p>
          </div>
        </section>

        {/* Content */}
        <section className="section-box">
          <div className="container-xl section-padding">
            <div style={{ maxWidth:'48rem', margin:'0 auto', background:'#fff', border:'1px solid var(--color-border)', borderRadius:'var(--radius-card)', padding:'2.5rem 3rem' }}>
              <div style={{ color:'var(--color-text-weak)', lineHeight:1.85, fontSize:'var(--text-body)' }}>
                <h2 style={{ color:'#181d26', fontFamily:'var(--font-display)', fontWeight:700, marginTop:0, marginBottom:'0.75rem' }}>1. Information We Collect</h2>
                <p style={{ marginBottom:'1.5rem' }}>We collect information you provide directly — such as name and email address when you register — and information automatically collected through your use of the platform, including usage data and device information.</p>

                <h2 style={{ color:'#181d26', fontFamily:'var(--font-display)', fontWeight:700, marginBottom:'0.75rem' }}>2. How We Use Your Information</h2>
                <p style={{ marginBottom:'1.5rem' }}>We use your information to provide and improve the platform, send you relevant communications about your account and the Aurum ecosystem, and analyze platform usage to improve user experience.</p>

                <h2 style={{ color:'#181d26', fontFamily:'var(--font-display)', fontWeight:700, marginBottom:'0.75rem' }}>3. Information Sharing</h2>
                <p style={{ marginBottom:'1.5rem' }}>We do not sell your personal information. We may share information with your assigned partner, with service providers who assist in platform operations, and when required by law.</p>

                <h2 style={{ color:'#181d26', fontFamily:'var(--font-display)', fontWeight:700, marginBottom:'0.75rem' }}>4. Data Security</h2>
                <p style={{ marginBottom:'1.5rem' }}>We implement appropriate technical and organizational measures to protect your information. However, no method of transmission over the internet is 100% secure.</p>

                <h2 style={{ color:'#181d26', fontFamily:'var(--font-display)', fontWeight:700, marginBottom:'0.75rem' }}>5. Cookies</h2>
                <p style={{ marginBottom:'1.5rem' }}>We use cookies and similar technologies to maintain session state and analyze platform usage. You can control cookies through your browser settings.</p>

                <h2 style={{ color:'#181d26', fontFamily:'var(--font-display)', fontWeight:700, marginBottom:'0.75rem' }}>6. Your Rights</h2>
                <p style={{ marginBottom:'1.5rem' }}>You have the right to access, correct, or delete your personal information. To exercise these rights, contact us through the platform support channels.</p>

                <h2 style={{ color:'#181d26', fontFamily:'var(--font-display)', fontWeight:700, marginBottom:'0.75rem' }}>7. Contact</h2>
                <p>For privacy-related inquiries, please reach out through our support channels.</p>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}
