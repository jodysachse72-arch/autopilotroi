export const metadata = {
  title: 'Privacy Policy | AutoPilot ROI',
  description: 'How AutoPilot ROI collects, uses, and protects your personal information.',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <div className="relative overflow-hidden border-b border-[var(--border-primary)] bg-[var(--bg-section)] px-6 py-16 lg:px-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.15),transparent_60%)]" />
        <div className="relative mx-auto max-w-3xl text-center">
          <h1 className="font-[var(--font-sora)] text-4xl font-bold text-[var(--text-primary)]">Privacy Policy</h1>
          <p className="mt-4 text-[var(--text-tertiary)]">Last updated: April 12, 2026</p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-6 py-16 lg:px-10">
        <div className="prose max-w-none space-y-8 text-[var(--text-secondary)] [&_h2]:text-[var(--text-primary)] [&_h2]:font-[var(--font-sora)] [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mt-10 [&_h2]:mb-4 [&_strong]:text-[var(--text-primary)]">

          <h2>1. Information We Collect</h2>
          <p>We collect the following information when you use AutoPilot ROI:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Personal Information:</strong> Name and email address provided during signup.</li>
            <li><strong>Assessment Data:</strong> Readiness quiz answers and scores.</li>
            <li><strong>Referral Data:</strong> Partner referral codes used during signup.</li>
            <li><strong>Usage Data:</strong> Pages visited, video watch progress, and interaction patterns (via privacy-friendly analytics).</li>
          </ul>

          <h2>2. How We Use Your Information</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>To provide the onboarding and education experience.</li>
            <li>To assess your readiness level and personalize onboarding content.</li>
            <li>To notify your referring partner so they can guide your setup.</li>
            <li>To send you welcome and onboarding emails.</li>
            <li>To improve the Platform and user experience.</li>
          </ul>

          <h2>3. Data Sharing</h2>
          <p>
            We share your information only with:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Your Referring Partner:</strong> Name, email, readiness score, and tier to facilitate onboarding.</li>
            <li><strong>Service Providers:</strong> Supabase (database), Resend (email), Cloudflare (security), Plausible (analytics).</li>
          </ul>
          <p>We do not sell your personal data to third parties.</p>

          <h2>4. Data Storage &amp; Security</h2>
          <p>
            Your data is stored in Supabase (PostgreSQL). We use row-level security, encrypted
            connections, and service role keys to protect your information. Email communications
            are sent via Resend with TLS encryption.
          </p>

          <h2>5. Analytics</h2>
          <p>
            We use Plausible Analytics, a privacy-friendly analytics tool that does not use cookies
            and does not collect personally identifiable information. No cookie consent banner is required.
          </p>

          <h2>6. Your Rights</h2>
          <p>You have the right to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Request access to your personal data.</li>
            <li>Request correction or deletion of your data.</li>
            <li>Withdraw consent for communications at any time.</li>
          </ul>
          <p>
            To exercise these rights, email{' '}
            <a href="mailto:privacy@autopilotroi.com" className="text-blue-400 underline">privacy@autopilotroi.com</a>.
          </p>

          <h2>7. Data Retention</h2>
          <p>
            We retain your personal information for as long as your account is active or as needed
            to provide services. You may request deletion at any time.
          </p>

          <h2>8. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy periodically. Changes will be posted on this page
            with an updated date. Your continued use of the Platform after changes constitutes
            acceptance of the updated policy.
          </p>
        </div>
      </div>
    </div>
  )
}
