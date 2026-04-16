export const metadata = { title: 'Privacy Policy — AutopilotROI', description: 'How AutopilotROI collects, uses, and protects your personal information.' }

export default function PrivacyPage() {
  return (
    <div className="min-h-screen" style={{ background: '#f8fafc' }}>
      <section className="px-6 py-16 lg:px-10" style={{ background: '#fff', borderBottom: '1px solid #e0e2e6' }}>
        <div className="mx-auto max-w-3xl">
          <span className="inline-block rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] mb-4"
            style={{ background: 'rgba(27,97,201,0.08)', color: '#1b61c9', border: '1px solid rgba(27,97,201,0.15)' }}>
            Legal
          </span>
          <h1 className="text-3xl font-bold mb-3" style={{ color: '#181d26', letterSpacing: '-0.02em' }}>Privacy Policy</h1>
          <p className="text-sm" style={{ color: 'rgba(4,14,32,0.45)' }}>Last updated: January 1, 2026</p>
        </div>
      </section>

      <section className="px-6 py-14 lg:px-10">
        <div className="mx-auto max-w-3xl rounded-2xl p-8 lg:p-12" style={{ background: '#fff', border: '1px solid #e0e2e6' }}>
          <div className="prose prose-slate max-w-none" style={{ color: 'rgba(4,14,32,0.75)', lineHeight: 1.8 }}>
            <h2 style={{ color: '#181d26', fontWeight: 700, marginTop: '1.5rem' }}>1. Information We Collect</h2>
            <p>We collect information you provide directly — such as name and email address when you register — and information automatically collected through your use of the platform, including usage data and device information.</p>

            <h2 style={{ color: '#181d26', fontWeight: 700, marginTop: '1.5rem' }}>2. How We Use Your Information</h2>
            <p>We use your information to provide and improve the platform, send you relevant communications about your account and the Aurum ecosystem, and analyze platform usage to improve user experience.</p>

            <h2 style={{ color: '#181d26', fontWeight: 700, marginTop: '1.5rem' }}>3. Information Sharing</h2>
            <p>We do not sell your personal information. We may share information with your assigned partner, with service providers who assist in platform operations, and when required by law.</p>

            <h2 style={{ color: '#181d26', fontWeight: 700, marginTop: '1.5rem' }}>4. Data Security</h2>
            <p>We implement appropriate technical and organizational measures to protect your information. However, no method of transmission over the internet is 100% secure.</p>

            <h2 style={{ color: '#181d26', fontWeight: 700, marginTop: '1.5rem' }}>5. Cookies</h2>
            <p>We use cookies and similar technologies to maintain session state and analyze platform usage. You can control cookies through your browser settings.</p>

            <h2 style={{ color: '#181d26', fontWeight: 700, marginTop: '1.5rem' }}>6. Your Rights</h2>
            <p>You have the right to access, correct, or delete your personal information. To exercise these rights, contact us through the platform support channels.</p>

            <h2 style={{ color: '#181d26', fontWeight: 700, marginTop: '1.5rem' }}>7. Contact</h2>
            <p>For privacy-related inquiries, please reach out through our support channels.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
