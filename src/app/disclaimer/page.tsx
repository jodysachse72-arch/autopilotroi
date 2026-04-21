export const metadata = { title: 'Earnings Disclaimer — AutopilotROI', description: 'Important earnings and investment risk disclaimer for AutopilotROI users.' }

export default function DisclaimerPage() {
  return (
    <div className="page-bg">
      <div className="sections-stack">

        {/* Header */}
        <section className="section-box">
          <div className="container-xl section-padding" style={{ maxWidth:'48rem' }}>
            <span style={{ display:'inline-block', background:'rgba(239,68,68,0.08)', color:'#dc2626', border:'1px solid rgba(239,68,68,0.15)', borderRadius:'99px', padding:'0.375rem 1rem', fontSize:'var(--text-caption)', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'1.25rem' }}>
              ⚠️ Important Disclosure
            </span>
            <h1 className="text-display" style={{ color:'#181d26', marginBottom:'0.5rem' }}>Earnings Disclaimer</h1>
            <p style={{ fontSize:'var(--text-body)', color:'var(--color-text-muted)' }}>Last updated: January 1, 2026</p>
          </div>
        </section>

        {/* Warning banner */}
        <div style={{ background:'#fef2f2', borderTop:'1px solid #fecaca', borderBottom:'1px solid #fecaca' }}>
          <div className="container-xl" style={{ padding:'1.25rem 1.5rem', maxWidth:'48rem' }}>
            <p style={{ fontSize:'var(--text-body)', fontWeight:600, color:'#991b1b', lineHeight:'var(--lh-relaxed)' }}>
              ⚠️ AutopilotROI is an independent onboarding platform. This site does not provide financial advice. All investments carry risk, including the risk of total loss. Returns referenced on this site are illustrative and not guaranteed. Never invest more than you can afford to lose.
            </p>
          </div>
        </div>

        {/* Content */}
        <section className="section-box">
          <div className="container-xl section-padding">
            <div style={{ maxWidth:'48rem', margin:'0 auto', background:'#fff', border:'1px solid var(--color-border)', borderRadius:'var(--radius-card)', padding:'2.5rem 3rem' }}>
              <div style={{ color:'var(--color-text-weak)', lineHeight:1.85, fontSize:'var(--text-body)' }}>
                <h2 style={{ color:'#181d26', fontFamily:'var(--font-display)', fontWeight:700, marginTop:0, marginBottom:'0.75rem' }}>No Financial Advice</h2>
                <p style={{ marginBottom:'1.5rem' }}>AutopilotROI is an onboarding and educational platform. Nothing on this website constitutes financial, investment, legal, or tax advice. We are not a registered broker, financial advisor, or investment manager.</p>

                <h2 style={{ color:'#181d26', fontFamily:'var(--font-display)', fontWeight:700, marginBottom:'0.75rem' }}>Investment Risk</h2>
                <p style={{ marginBottom:'1.5rem' }}>All investments involve risk and possible loss of principal. Cryptocurrency and digital asset markets are highly volatile. Past performance of any trading strategy or product mentioned on this platform is not indicative of future results.</p>

                <h2 style={{ color:'#181d26', fontFamily:'var(--font-display)', fontWeight:700, marginBottom:'0.75rem' }}>Illustrative Returns</h2>
                <p style={{ marginBottom:'1.5rem' }}>Any earnings figures, returns, or performance metrics shown on this platform are illustrative only. They are based on historical data or projections and are not guarantees of future performance. Individual results will vary significantly.</p>

                <h2 style={{ color:'#181d26', fontFamily:'var(--font-display)', fontWeight:700, marginBottom:'0.75rem' }}>Independent Due Diligence</h2>
                <p style={{ marginBottom:'1.5rem' }}>Before making any investment decision, you should conduct your own research and seek independent financial advice from a qualified professional. Understand the full risk profile of any investment before committing capital.</p>

                <h2 style={{ color:'#181d26', fontFamily:'var(--font-display)', fontWeight:700, marginBottom:'0.75rem' }}>Platform Independence</h2>
                <p style={{ marginBottom:'1.5rem' }}>AutopilotROI is an independent platform and is not affiliated with, endorsed by, or representing the Aurum AI company or its subsidiaries. We provide onboarding support as an independent third-party service.</p>

                <h2 style={{ color:'#181d26', fontFamily:'var(--font-display)', fontWeight:700, marginBottom:'0.75rem' }}>Regulatory Compliance</h2>
                <p>Users are responsible for ensuring their participation complies with all applicable laws and regulations in their jurisdiction. Some products and services may not be available in all regions.</p>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}
