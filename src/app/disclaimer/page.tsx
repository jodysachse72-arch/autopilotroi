export const metadata = { title: 'Earnings Disclaimer — AutopilotROI', description: 'Important earnings and investment risk disclaimer for AutopilotROI users.' }

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen" style={{ background: '#f8fafc' }}>
      <section className="px-6 py-16 lg:px-10" style={{ background: '#fff', borderBottom: '1px solid #e0e2e6' }}>
        <div className="mx-auto max-w-3xl">
          <span className="inline-block rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] mb-4"
            style={{ background: 'rgba(239,68,68,0.08)', color: '#dc2626', border: '1px solid rgba(239,68,68,0.15)' }}>
            ⚠️ Important Disclosure
          </span>
          <h1 className="text-3xl font-bold mb-3" style={{ color: '#181d26', letterSpacing: '-0.02em' }}>Earnings Disclaimer</h1>
          <p className="text-sm" style={{ color: 'rgba(4,14,32,0.45)' }}>Last updated: January 1, 2026</p>
        </div>
      </section>

      {/* Warning banner */}
      <div className="px-6 py-5 lg:px-10" style={{ background: '#fef2f2', borderBottom: '1px solid #fecaca' }}>
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-semibold" style={{ color: '#991b1b' }}>
            ⚠️ AutopilotROI is an independent onboarding platform. This site does not provide financial advice. All investments carry risk, including the risk of total loss. Returns referenced on this site are illustrative and not guaranteed. Never invest more than you can afford to lose.
          </p>
        </div>
      </div>

      <section className="px-6 py-14 lg:px-10">
        <div className="mx-auto max-w-3xl rounded-2xl p-8 lg:p-12" style={{ background: '#fff', border: '1px solid #e0e2e6' }}>
          <div className="prose prose-slate max-w-none" style={{ color: 'rgba(4,14,32,0.75)', lineHeight: 1.8 }}>
            <h2 style={{ color: '#181d26', fontWeight: 700, marginTop: '0' }}>No Financial Advice</h2>
            <p>AutopilotROI is an onboarding and educational platform. Nothing on this website constitutes financial, investment, legal, or tax advice. We are not a registered broker, financial advisor, or investment manager.</p>

            <h2 style={{ color: '#181d26', fontWeight: 700, marginTop: '1.5rem' }}>Investment Risk</h2>
            <p>All investments involve risk and possible loss of principal. Cryptocurrency and digital asset markets are highly volatile. Past performance of any trading strategy or product mentioned on this platform is not indicative of future results.</p>

            <h2 style={{ color: '#181d26', fontWeight: 700, marginTop: '1.5rem' }}>Illustrative Returns</h2>
            <p>Any earnings figures, returns, or performance metrics shown on this platform are illustrative only. They are based on historical data or projections and are not guarantees of future performance. Individual results will vary significantly.</p>

            <h2 style={{ color: '#181d26', fontWeight: 700, marginTop: '1.5rem' }}>Independent Due Diligence</h2>
            <p>Before making any investment decision, you should conduct your own research and seek independent financial advice from a qualified professional. Understand the full risk profile of any investment before committing capital.</p>

            <h2 style={{ color: '#181d26', fontWeight: 700, marginTop: '1.5rem' }}>Platform Independence</h2>
            <p>AutopilotROI is an independent platform and is not affiliated with, endorsed by, or representing the Aurum AI company or its subsidiaries. We provide onboarding support as an independent third-party service.</p>

            <h2 style={{ color: '#181d26', fontWeight: 700, marginTop: '1.5rem' }}>Regulatory Compliance</h2>
            <p>Users are responsible for ensuring their participation complies with all applicable laws and regulations in their jurisdiction. Some products and services may not be available in all regions.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
