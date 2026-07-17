import Link from 'next/link'

export default function CTABand({ variant = 'aurum' }: { variant?: 'aurum' | 'ai-finance' }) {
  return (
    <section
      style={{
        background: 'linear-gradient(135deg, #050d28 0%, #0c1f6e 40%, #1550aa 100%)',
        borderRadius: 'var(--radius-section, 1.125rem)',
        overflow: 'hidden',
        position: 'relative',
        margin: '0',
      }}
    >
      {/* Atmospheric overlay */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute', left: '50%', top: '-30%',
          width: '50vmax', height: '50vmax', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(27,97,201,0.30) 0%, transparent 55%)',
          transform: 'translateX(-50%)',
        }} />
        {/* Grain */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.75\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'1\'/%3E%3C/svg%3E")',
          backgroundRepeat: 'repeat',
          backgroundSize: '180px 180px',
          opacity: 0.02,
          mixBlendMode: 'overlay' as const,
        }} />
      </div>

      <div
        className="container-content text-center"
        style={{
          maxWidth: '44rem',
          position: 'relative',
          zIndex: 1,
          paddingTop: 'var(--section-py)',
          paddingBottom: 'var(--section-py)',
        }}
      >
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            borderRadius: '99px',
            border: '1px solid rgba(255,255,255,0.18)',
            background: 'rgba(255,255,255,0.08)',
            padding: '0.375rem 0.875rem',
            fontSize: 'var(--text-caption)',
            fontFamily: 'var(--font-display)',
            fontWeight: 600,
            textTransform: 'uppercase' as const,
            letterSpacing: 'var(--ls-wide)',
            color: 'rgba(255,255,255,0.72)',
            marginBottom: '1.5rem',
          }}
        >
          Ready to start?
        </span>
        <h2 className="text-display mb-6" style={{ color: '#ffffff' }}>
          {variant === 'ai-finance' ? 'Your AI finance journey' : 'Your AI portfolio'}
          <br />
          {variant === 'ai-finance' ? 'starts with clarity' : 'starts with $100'}
        </h2>
        <p
          className="text-body-lg mb-10 mx-auto"
          style={{
            color: 'rgba(255,255,255,0.78)',
            maxWidth: '36rem',
          }}
        >
          {variant === 'ai-finance'
            ? 'Explore what AI-managed finance can make possible, compare providers on your terms, and move forward with guided support.'
            : 'Join thousands of members who activated the EX-AI Bot and put their money to work around the clock. Your AutoPilotROI partner handles the entire setup.'}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/signup"
            className="btn btn-lg shimmer-hover"
            style={{ backgroundColor: '#ffffff', color: 'var(--color-accent)' }}
          >
            {variant === 'ai-finance' ? 'Explore AI Finance →' : 'Begin Onboarding →'}
          </Link>
          <Link
            href="/faqs"
            className="btn btn-lg shimmer-hover"
            style={{
              backgroundColor: 'rgba(255,255,255,0.08)',
              color: '#ffffff',
              border: '1px solid rgba(255,255,255,0.18)',
            }}
          >
            Read FAQs
          </Link>
        </div>
      </div>
    </section>
  )
}
