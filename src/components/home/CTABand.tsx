import Link from 'next/link'

export default function CTABand() {
  return (
    <section
      className="section"
      style={{
        background: 'linear-gradient(135deg, var(--color-accent) 0%, #1550aa 100%)',
        color: '#ffffff',
      }}
    >
      <div
        className="container-content text-center"
        style={{ maxWidth: '44rem' }}
      >
        <span className="badge badge-dark mb-6 inline-flex">Ready to start?</span>
        <h2 className="text-display mb-6" style={{ color: '#ffffff' }}>
          Your AI portfolio
          <br />
          starts with $100
        </h2>
        <p
          className="text-body-lg mb-10 mx-auto"
          style={{
            color: 'rgba(255,255,255,0.8)',
            maxWidth: '36rem',
          }}
        >
          Join thousands of members who activated the EX-AI Bot and put their money
          to work around the clock. Your AutoPilotROI partner handles the entire setup.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/signup"
            className="btn btn-lg"
            style={{ backgroundColor: '#ffffff', color: 'var(--color-accent)' }}
          >
            Begin Onboarding →
          </Link>
          <Link href="/faqs" className="btn btn-ghost-light btn-lg">
            Read FAQs
          </Link>
        </div>
      </div>
    </section>
  )
}
