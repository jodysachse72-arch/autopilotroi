export const metadata = {
  title: 'Earnings Disclaimer | AutoPilot ROI',
  description: 'Important earnings and risk disclaimer for AutoPilot ROI and related ecosystem products.',
}

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <div className="relative overflow-hidden border-b border-[var(--border-primary)] bg-[var(--bg-section)] px-6 py-16 lg:px-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.15),transparent_60%)]" />
        <div className="relative mx-auto max-w-3xl text-center">
          <h1 className="font-[var(--font-sora)] text-4xl font-bold text-[var(--text-primary)]">Earnings &amp; Risk Disclaimer</h1>
          <p className="mt-4 text-[var(--text-tertiary)]">Last updated: April 12, 2026</p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-6 py-16 lg:px-10">
        <div className="prose max-w-none space-y-8 text-[var(--text-secondary)] [&_h2]:text-[var(--text-primary)] [&_h2]:font-[var(--font-sora)] [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mt-10 [&_h2]:mb-4 [&_strong]:text-[var(--text-primary)]">

          {/* Critical Warning Banner */}
          <div className="rounded-xl border border-amber-400/30 bg-amber-400/10 p-6 text-amber-200 text-base leading-relaxed">
            <p className="font-bold text-amber-300 mb-2">⚠️ Important Notice</p>
            <p>
              The information on this website is for educational and informational purposes only.
              It is not financial advice. All investments carry risk, including the risk of total
              loss of capital. <strong>Never invest more than you can afford to lose.</strong>
            </p>
          </div>

          <h2>No Guarantee of Earnings</h2>
          <p>
            AutoPilot ROI does not guarantee any specific income, returns, or financial results
            from the use of this Platform or any referenced products and services. Any earnings
            figures, income examples, or performance results mentioned are illustrative only and
            should not be considered as a promise or guarantee of earnings.
          </p>

          <h2>Third-Party Products</h2>
          <p>
            AutoPilot ROI is an independent onboarding platform. We are not the operator, issuer,
            or administrator of any financial product, trading bot, exchange, card, or banking
            service referenced on this Platform. These products are operated by third parties.
            We do not control their performance, returns, or operations.
          </p>

          <h2>Cryptocurrency Risk</h2>
          <p>Cryptocurrency investments involve significant risks, including but not limited to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Market volatility:</strong> Crypto prices can fluctuate dramatically in short periods.</li>
            <li><strong>Regulatory risk:</strong> Regulations vary by jurisdiction and may change without notice.</li>
            <li><strong>Technology risk:</strong> Smart contracts, exchanges, and wallets can be subject to bugs, hacks, or failures.</li>
            <li><strong>Liquidity risk:</strong> You may not be able to sell or withdraw at desired prices or times.</li>
            <li><strong>Total loss:</strong> You could lose your entire investment.</li>
          </ul>

          <h2>Referral Compensation</h2>
          <p>
            The referral/partner program discussed on this Platform is operated by third parties.
            Any commissions, bonuses, or compensation are subject to the terms and conditions of
            those third-party programs. AutoPilot ROI does not guarantee any referral earnings.
          </p>

          <h2>Due Diligence</h2>
          <p>
            You are solely responsible for conducting your own due diligence before making any
            investment decisions. We strongly recommend consulting with a qualified financial
            advisor, tax professional, and/or legal counsel before investing in any cryptocurrency
            or digital asset product.
          </p>

          <h2>Past Performance</h2>
          <p>
            Past performance of any product, trading bot, or investment strategy is not indicative
            of future results. Historical returns do not guarantee future performance.
          </p>

          <h2>Jurisdictional Restrictions</h2>
          <p>
            The products and services referenced on this Platform may not be available or legal
            in all jurisdictions. It is your responsibility to ensure compliance with the laws
            and regulations of your jurisdiction before participating.
          </p>
        </div>
      </div>
    </div>
  )
}
