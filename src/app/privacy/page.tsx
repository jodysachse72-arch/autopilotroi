import Link from 'next/link'
import HomeCTABand from '@/components/home/CTABand'

export const metadata = {
  title: 'Privacy Policy',
  description: 'How AutoPilotROI collects, uses, and protects your personal information.',
}

export default function PrivacyPage() {
  return (
    <>
      {/* Hero */}
      <section className="section section-alt" style={{ paddingBottom: '3rem' }}>
        <div className="container-content" style={{ maxWidth: '48rem' }}>
          <span className="badge mb-4 inline-flex">Legal</span>
          <h1 className="text-display mb-4">Privacy Policy</h1>
          <p className="text-body-lg" style={{ color: 'var(--color-fg-muted)' }}>
            How AutoPilotROI collects, uses, and protects your personal information.
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

              <h2 className="text-subheading mb-3" style={{ color: 'var(--color-fg)' }}>1. Information We Collect</h2>
              <p style={{ marginBottom: '2rem' }}>We collect information you provide directly — such as name and email address when you register — and information automatically collected through your use of the platform, including usage data and device information.</p>

              <h2 className="text-subheading mb-3" style={{ color: 'var(--color-fg)' }}>2. How We Use Your Information</h2>
              <p style={{ marginBottom: '2rem' }}>We use your information to provide and improve the platform, send you relevant communications about your account and the Aurum ecosystem, and analyze platform usage to improve user experience.</p>

              <h2 className="text-subheading mb-3" style={{ color: 'var(--color-fg)' }}>3. Information Sharing</h2>
              <p style={{ marginBottom: '2rem' }}>We do not sell your personal information. We may share information with your assigned partner, with service providers who assist in platform operations, and when required by law.</p>

              <h2 className="text-subheading mb-3" style={{ color: 'var(--color-fg)' }}>4. Data Security</h2>
              <p style={{ marginBottom: '2rem' }}>We implement appropriate technical and organizational measures to protect your information. However, no method of transmission over the internet is 100% secure.</p>

              <h2 className="text-subheading mb-3" style={{ color: 'var(--color-fg)' }}>5. Cookies</h2>
              <p style={{ marginBottom: '2rem' }}>We use cookies and similar technologies to maintain session state and analyze platform usage. You can control cookies through your browser settings.</p>

              <h2 className="text-subheading mb-3" style={{ color: 'var(--color-fg)' }}>6. Your Rights</h2>
              <p style={{ marginBottom: '2rem' }}>You have the right to access, correct, or delete your personal information. To exercise these rights, contact us through the platform support channels.</p>

              <h2 className="text-subheading mb-3" style={{ color: 'var(--color-fg)' }}>7. Contact</h2>
              <p>For privacy-related inquiries, please reach out through our support channels or visit our <Link href="/faqs" style={{ color: 'var(--color-accent)', textDecoration: 'underline' }}>FAQs page</Link>.</p>

            </div>
          </div>
        </div>
      </section>

      <HomeCTABand />
    </>
  )
}
