import Link from 'next/link'

export const metadata = {
  title: 'Terms of Service | AutoPilot ROI',
  description: 'Terms and conditions for using the AutoPilot ROI platform.',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <div className="relative overflow-hidden border-b border-[var(--border-primary)] bg-[var(--bg-section)] px-6 py-16 lg:px-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.15),transparent_60%)]" />
        <div className="relative mx-auto max-w-3xl text-center">
          <h1 className="font-[var(--font-sora)] text-4xl font-bold text-[var(--text-primary)]">Terms of Service</h1>
          <p className="mt-4 text-[var(--text-tertiary)]">Last updated: April 12, 2026</p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-6 py-16 lg:px-10">
        <div className="prose max-w-none space-y-8 text-[var(--text-secondary)] [&_h2]:text-[var(--text-primary)] [&_h2]:font-[var(--font-sora)] [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-[var(--text-primary)] [&_h3]:font-semibold [&_h3]:mt-6 [&_h3]:mb-2 [&_strong]:text-[var(--text-primary)] [&_a]:text-blue-400 [&_a]:underline">

          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing or using the AutoPilot ROI website (&quot;autopilotroi.com&quot;) and any related services
            (collectively, the &quot;Platform&quot;), you agree to be bound by these Terms of Service. If you do not
            agree to these terms, do not use the Platform.
          </p>

          <h2>2. Description of Service</h2>
          <p>
            AutoPilot ROI is an independent onboarding and educational platform. We provide educational
            materials, readiness assessments, and guided onboarding resources to help prospective members
            understand the Aurum ecosystem before making any investment decisions.
          </p>
          <p>
            <strong>AutoPilot ROI does not handle, process, or custody any funds.</strong> All financial
            transactions, account creation, and investment activity take place on third-party platforms
            that are not operated by AutoPilot ROI.
          </p>

          <h2>3. Not Financial Advice</h2>
          <p>
            Nothing on this Platform constitutes financial, investment, tax, or legal advice. All content
            is for informational and educational purposes only. You should consult qualified professionals
            before making any investment decisions. Past performance is not indicative of future results.
          </p>

          <h2>4. User Accounts &amp; Data</h2>
          <p>
            When you submit your name and email through the Platform, you consent to the collection and
            use of this information as described in our{' '}
            <Link href="/privacy">Privacy Policy</Link>. You represent that the information
            you provide is accurate and that you are at least 18 years of age.
          </p>

          <h2>5. Referral System</h2>
          <p>
            AutoPilot ROI uses a referral-based onboarding model. Partners who refer new members may
            receive benefits through the third-party ecosystem&apos;s compensation plan. AutoPilot ROI does
            not control, guarantee, or administer any compensation or returns.
          </p>

          <h2>6. Risk Acknowledgement</h2>
          <p>
            Cryptocurrency and digital asset investments carry significant risk, including the risk of
            total loss. By using this Platform, you acknowledge that:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>All investment carries risk. Returns are never guaranteed.</li>
            <li>You should never invest more than you can afford to lose.</li>
            <li>Cryptocurrency markets are volatile and unpredictable.</li>
            <li>AutoPilot ROI makes no guarantees regarding returns from any product or service.</li>
          </ul>

          <h2>7. Intellectual Property</h2>
          <p>
            All content on this Platform, including text, graphics, logos, and software, is the property
            of AutoPilot ROI or its content suppliers and is protected by intellectual property laws.
          </p>

          <h2>8. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, AutoPilot ROI shall not be liable for any indirect,
            incidental, special, consequential, or punitive damages arising from your use of the Platform
            or any investment decisions made based on content provided herein.
          </p>

          <h2>9. Modifications</h2>
          <p>
            We reserve the right to modify these Terms at any time. Changes will be posted on this page
            with an updated &quot;Last updated&quot; date. Your continued use of the Platform after changes
            constitutes acceptance of the new Terms.
          </p>

          <h2>10. Contact</h2>
          <p>
            For questions about these Terms, contact us at{' '}
            <a href="mailto:support@autopilotroi.com">support@autopilotroi.com</a>.
          </p>
        </div>
      </div>
    </div>
  )
}
