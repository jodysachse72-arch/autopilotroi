'use client'

import { motion } from 'framer-motion'

const STEPS = [
  {
    num: '01',
    title: 'Set up your infrastructure',
    description: 'Install Trust Wallet, activate a VPN, and acquire USDT from a major exchange. Your partner walks you through every click.',
  },
  {
    num: '02',
    title: 'Create your Aurum account',
    description: 'Register at Aurum, complete verification, fund your account with USDT, and select your subscription tier.',
  },
  {
    num: '03',
    title: 'Activate the AI bot & sit back',
    description: 'Turn on the EX-AI Bot. It begins scanning and trading automatically. Monitor your dashboard and withdraw whenever you choose.',
  },
] as const

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      style={{
        margin: '1.5rem var(--page-px, 1.5rem)',
      }}
    >
      <div
        style={{
          backgroundColor: 'var(--color-surface)',
          borderRadius: 'var(--radius-section, 1.125rem)',
          border: '1px solid var(--color-border)',
          padding: 'var(--section-py) clamp(1.5rem, 4vw, 3.5rem)',
        }}
      >
        <div style={{ maxWidth: 'var(--container)', margin: '0 auto' }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left: steps */}
            <div>
              <motion.span
                className="badge mb-6 inline-flex"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
              >
                The Process
              </motion.span>
              <motion.h2
                className="text-display mb-10"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.06 }}
              >
                Up and running
                <br />
                in 3 days or less
              </motion.h2>

              <div className="flex flex-col gap-10">
                {STEPS.map((step, i) => (
                  <motion.div
                    key={step.num}
                    className="flex gap-5"
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-30px' }}
                    transition={{ duration: 0.45, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div
                      className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-caption font-bold"
                      style={{
                        backgroundColor: 'var(--color-fg)',
                        color: 'var(--color-bg)',
                        fontFamily: 'var(--font-display)',
                      }}
                    >
                      {step.num}
                    </div>
                    <div>
                      <h3 className="text-subheading mb-2">{step.title}</h3>
                      <p className="text-body" style={{ color: 'var(--color-fg-muted)' }}>
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right: product visual */}
            <motion.div
              className="rounded-2xl overflow-hidden"
              style={{
                backgroundColor: 'var(--color-fg)',
                padding: '2rem',
              }}
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                className="rounded-xl overflow-hidden"
                style={{
                  backgroundColor: '#1a1a2e',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                {/* Browser chrome */}
                <div
                  className="flex items-center gap-2 px-4 py-3"
                  style={{
                    borderBottom: '1px solid rgba(255,255,255,0.06)',
                    backgroundColor: 'rgba(255,255,255,0.03)',
                  }}
                >
                  <div className="flex gap-1.5">
                    {['#ff5f56', '#ffbd2e', '#27c93f'].map((c) => (
                      <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
                    ))}
                  </div>
                  <span className="text-caption ml-4" style={{ color: 'rgba(255,255,255,0.3)' }}>
                    app.aurum.foundation
                  </span>
                </div>

                {/* Dashboard mockup */}
                <div className="p-6" style={{ minHeight: '280px' }}>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <p className="text-caption" style={{ color: 'rgba(255,255,255,0.4)' }}>EX-AI Bot</p>
                      <p className="text-subheading" style={{ color: '#ffffff', fontWeight: 700 }}>Live · Trading</p>
                    </div>
                    <div
                      className="px-3 py-1.5 rounded-full text-caption font-semibold"
                      style={{ backgroundColor: 'rgba(5,150,105,0.2)', color: '#34d399' }}
                    >
                      ● Active 24/7
                    </div>
                  </div>

                  {/* Chart bars */}
                  <div className="flex items-end gap-2 mt-4" style={{ height: '120px' }}>
                    {[40, 65, 55, 80, 70, 90, 75, 85, 60, 95, 80, 70].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-t"
                        style={{
                          height: `${h}%`,
                          backgroundColor: i === 9 ? 'var(--color-accent)' : 'rgba(27,97,201,0.3)',
                          transition: 'height 0.5s ease',
                        }}
                      />
                    ))}
                  </div>
                  <div className="flex justify-between mt-3">
                    <span className="text-caption" style={{ color: 'rgba(255,255,255,0.3)' }}>Jan</span>
                    <span className="text-caption" style={{ color: 'rgba(255,255,255,0.3)' }}>Dec</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
