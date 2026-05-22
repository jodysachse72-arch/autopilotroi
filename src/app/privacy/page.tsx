import { PageShell, SectionBox, HeroBlue, CTABand } from '@/components/sections'

export const metadata = { title: 'Privacy Policy — AutopilotROI', description: 'How AutopilotROI collects, uses, and protects your personal information.' }

const h2Style = { color: '#181d26', fontFamily: 'var(--font-display)', fontWeight: 700 as const, marginBottom: '0.75rem' }
const pStyle = { marginBottom: '1.5rem' }

export default function PrivacyPage() {
  return (
    <PageShell>

      {/* ── HERO ── */}
      <HeroBlue
        eyebrow="Legal"
        title={<>Privacy Policy</>}
        description="How AutopilotROI collects, uses, and protects your personal information."
      />

      {/* ── CONTENT ── */}
      <SectionBox variant="white" padding="lg">
        <div style={{ maxWidth: '48rem', margin: '0 auto' }}>

          {/* Last-updated subtitle */}
          <p style={{ fontSize: 'var(--text-body)', color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
            Last updated: January 1, 2026
          </p>

          <div style={{ background: '#fff', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-card)', padding: '2.5rem 3rem' }}>
            <div style={{ color: 'var(--color-text-weak)', lineHeight: 1.85, fontSize: 'var(--text-body)' }}>

              <h2 style={{ ...h2Style, marginTop: 0 }}>1. Information We Collect</h2>
              <p style={pStyle}>We collect information you provide directly — such as name and email address when you register — and information automatically collected through your use of the platform, including usage data and device information.</p>

              <h2 style={h2Style}>2. How We Use Your Information</h2>
              <p style={pStyle}>We use your information to provide and improve the platform, send you relevant communications about your account and the Aurum ecosystem, and analyze platform usage to improve user experience.</p>

              <h2 style={h2Style}>3. Information Sharing</h2>
              <p style={pStyle}>We do not sell your personal information. We may share information with your assigned partner, with service providers who assist in platform operations, and when required by law.</p>

              <h2 style={h2Style}>4. Data Security</h2>
              <p style={pStyle}>We implement appropriate technical and organizational measures to protect your information. However, no method of transmission over the internet is 100% secure.</p>

              <h2 style={h2Style}>5. Cookies</h2>
              <p style={pStyle}>We use cookies and similar technologies to maintain session state and analyze platform usage. You can control cookies through your browser settings.</p>

              <h2 style={h2Style}>6. Your Rights</h2>
              <p style={pStyle}>You have the right to access, correct, or delete your personal information. To exercise these rights, contact us through the platform support channels.</p>

              <h2 style={h2Style}>7. Contact</h2>
              <p>For privacy-related inquiries, please reach out through our support channels.</p>

            </div>
          </div>
        </div>
      </SectionBox>

      {/* ── CTA ── */}
      <CTABand
        eyebrow="Have questions?"
        title={<>We&rsquo;re here to help.</>}
        description="Browse our knowledge base or start your onboarding journey today."
        ctas={[
          { label: 'Read FAQs', href: '/faqs' },
          { label: 'Get started →', href: '/start', variant: 'ghost' },
        ]}
      />

    </PageShell>
  )
}
