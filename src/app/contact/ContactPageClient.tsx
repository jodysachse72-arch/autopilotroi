'use client'

import { useState } from 'react'

interface ContactData {
  headline: string
  subheadline: string
  email: string
  telegram: string
  responseNote: string
}

interface ContactPageClientProps {
  data: ContactData
}

export default function ContactPageClient({ data }: ContactPageClientProps) {
  const [formState, setFormState] = useState({
    name: '', email: '', subject: '', message: '',
  })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('submitting')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState),
      })
      if (res.ok) {
        setStatus('success')
        setFormState({ name: '', email: '', subject: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <main style={{ background: '#f8fafc', minHeight: '100vh', padding: '4rem 0 6rem' }}>
      {/* ── Hero ── */}
      <section style={{ textAlign: 'center', padding: '0 1rem 3rem' }}>
        <p style={{
          display: 'inline-block',
          background: 'rgba(27,97,201,0.09)',
          color: '#1b61c9',
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: '0.75rem',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          padding: '0.375rem 1rem',
          borderRadius: '99px',
          marginBottom: '1.25rem',
        }}>
          We're Here to Help
        </p>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          color: '#181d26',
          letterSpacing: '-0.03em',
          marginBottom: '1rem',
        }}>
          {data.headline}
        </h1>
        <p style={{
          fontSize: '1.125rem',
          color: 'rgba(24,29,38,0.60)',
          maxWidth: '560px',
          margin: '0 auto',
          lineHeight: 1.7,
        }}>
          {data.subheadline}
        </p>
      </section>

      {/* ── Grid: Quick Contact Cards + Form ── */}
      <div className="container-xl">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
          gap: '2rem',
          alignItems: 'start',
        }}>

          {/* ── Left: Contact Cards ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

            {/* Email Card */}
            <ContactCard
              icon="✉️"
              title="Email Support"
              value={data.email}
              action={`mailto:${data.email}`}
              actionLabel="Send Email"
            />

            {/* Telegram Card */}
            <ContactCard
              icon="💬"
              title="Telegram"
              value={data.telegram}
              action={`https://t.me/${data.telegram.replace('@','')}`}
              actionLabel="Open Telegram"
              external
            />

            {/* Response Note Card */}
            <div style={{
              background: '#ffffff',
              border: '1px solid #e0e2e6',
              borderRadius: '1.25rem',
              padding: '1.5rem',
            }}>
              <div style={{ display: 'flex', gap: '0.875rem', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '1.5rem', flexShrink: 0 }}>⏱️</span>
                <div>
                  <p style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: '1rem',
                    color: '#181d26',
                    marginBottom: '0.5rem',
                  }}>
                    Response Times
                  </p>
                  <p style={{ fontSize: '0.9rem', color: 'rgba(24,29,38,0.60)', lineHeight: 1.65 }}>
                    {data.responseNote}
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* ── Right: Contact Form ── */}
          <div style={{
            background: '#ffffff',
            border: '1px solid #e0e2e6',
            borderRadius: '1.5rem',
            padding: '2rem',
            boxShadow: '0 2px 16px rgba(0,0,0,0.04)',
          }}>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: '1.25rem',
              color: '#181d26',
              marginBottom: '0.375rem',
            }}>
              Send a Message
            </h2>
            <p style={{ fontSize: '0.875rem', color: 'rgba(24,29,38,0.55)', marginBottom: '1.5rem' }}>
              Fill in the form below and we'll get back to you within 24 hours.
            </p>

            {status === 'success' ? (
              <div style={{
                background: '#f0fdf4',
                border: '1px solid #86efac',
                borderRadius: '1rem',
                padding: '2rem',
                textAlign: 'center',
              }}>
                <p style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>✅</p>
                <p style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: '1.125rem',
                  color: '#16a34a',
                  marginBottom: '0.5rem',
                }}>
                  Message sent!
                </p>
                <p style={{ fontSize: '0.9rem', color: '#15803d' }}>
                  Thanks for reaching out. We'll be in touch shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <Field id="name"    label="Full Name"     type="text"  value={formState.name}    onChange={v => setFormState(p => ({ ...p, name: v }))}    required />
                  <Field id="email"   label="Email Address" type="email" value={formState.email}   onChange={v => setFormState(p => ({ ...p, email: v }))}   required />
                </div>
                <Field id="subject" label="Subject"       type="text"  value={formState.subject} onChange={v => setFormState(p => ({ ...p, subject: v }))} required />
                <TextareaField
                  id="message"
                  label="Message"
                  value={formState.message}
                  onChange={v => setFormState(p => ({ ...p, message: v }))}
                  rows={5}
                  required
                />

                {status === 'error' && (
                  <p style={{ color: '#dc2626', fontSize: '0.875rem', textAlign: 'center' }}>
                    Something went wrong. Please try again or email us directly.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '0.875rem 2rem',
                    borderRadius: '0.875rem',
                    background: status === 'submitting'
                      ? '#9ca3af'
                      : 'linear-gradient(135deg, #2563eb 0%, #1b61c9 100%)',
                    color: '#ffffff',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: '1rem',
                    border: 'none',
                    cursor: status === 'submitting' ? 'not-allowed' : 'pointer',
                    boxShadow: status === 'submitting'
                      ? 'none'
                      : '0 4px 16px rgba(27,97,201,0.38)',
                    transition: 'box-shadow 150ms ease, transform 150ms ease',
                    letterSpacing: '0.01em',
                  }}
                  onMouseEnter={e => {
                    if (status !== 'submitting') {
                      (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'
                      ;(e.currentTarget as HTMLElement).style.boxShadow = '0 6px 24px rgba(27,97,201,0.48)'
                    }
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
                    ;(e.currentTarget as HTMLElement).style.boxShadow = '0 4px 16px rgba(27,97,201,0.38)'
                  }}
                >
                  {status === 'submitting' ? 'Sending…' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

/* ── Contact Card ── */
function ContactCard({
  icon, title, value, action, actionLabel, external = false,
}: {
  icon: string; title: string; value: string;
  action: string; actionLabel: string; external?: boolean
}) {
  return (
    <div style={{
      background: '#ffffff',
      border: '1px solid #e0e2e6',
      borderRadius: '1.25rem',
      padding: '1.5rem',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
        <div style={{ display: 'flex', gap: '0.875rem', alignItems: 'center' }}>
          <span style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: '2.75rem', height: '2.75rem',
            background: 'rgba(27,97,201,0.08)',
            borderRadius: '0.75rem',
            fontSize: '1.25rem',
            flexShrink: 0,
          }}>
            {icon}
          </span>
          <div>
            <p style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(24,29,38,0.45)', marginBottom: '0.2rem' }}>
              {title}
            </p>
            <p style={{ fontSize: '0.9375rem', fontWeight: 600, color: '#181d26', fontFamily: 'var(--font-display)' }}>
              {value}
            </p>
          </div>
        </div>
        <a
          href={action}
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener noreferrer' : undefined}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '0.5rem 1rem',
            borderRadius: '0.625rem',
            border: '1.5px solid #1b61c9',
            color: '#1b61c9',
            fontFamily: 'var(--font-display)',
            fontWeight: 600,
            fontSize: '0.8125rem',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
            transition: 'background 150ms ease, color 150ms ease',
            flexShrink: 0,
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.background = '#1b61c9'
            ;(e.currentTarget as HTMLElement).style.color = '#fff'
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.background = 'transparent'
            ;(e.currentTarget as HTMLElement).style.color = '#1b61c9'
          }}
        >
          {actionLabel}
        </a>
      </div>
    </div>
  )
}

/* ── Text Input Field ── */
function Field({
  id, label, type, value, onChange, required,
}: {
  id: string; label: string; type: string;
  value: string; onChange: (v: string) => void; required?: boolean
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
      <label
        htmlFor={id}
        style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'rgba(24,29,38,0.70)', fontFamily: 'var(--font-display)' }}
      >
        {label} {required && <span style={{ color: '#1b61c9' }}>*</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        required={required}
        style={{
          padding: '0.6875rem 0.9375rem',
          borderRadius: '0.625rem',
          border: '1.5px solid #e0e2e6',
          fontSize: '0.9375rem',
          color: '#181d26',
          fontFamily: 'var(--font-body)',
          outline: 'none',
          transition: 'border-color 150ms ease',
          background: '#f8fafc',
          width: '100%',
          boxSizing: 'border-box',
        }}
        onFocus={e => { (e.currentTarget as HTMLElement).style.borderColor = '#1b61c9' }}
        onBlur={e  => { (e.currentTarget as HTMLElement).style.borderColor = '#e0e2e6' }}
      />
    </div>
  )
}

/* ── Textarea Field ── */
function TextareaField({
  id, label, value, onChange, rows, required,
}: {
  id: string; label: string; value: string;
  onChange: (v: string) => void; rows?: number; required?: boolean
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
      <label
        htmlFor={id}
        style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'rgba(24,29,38,0.70)', fontFamily: 'var(--font-display)' }}
      >
        {label} {required && <span style={{ color: '#1b61c9' }}>*</span>}
      </label>
      <textarea
        id={id}
        value={value}
        onChange={e => onChange(e.target.value)}
        required={required}
        rows={rows ?? 4}
        style={{
          padding: '0.6875rem 0.9375rem',
          borderRadius: '0.625rem',
          border: '1.5px solid #e0e2e6',
          fontSize: '0.9375rem',
          color: '#181d26',
          fontFamily: 'var(--font-body)',
          outline: 'none',
          transition: 'border-color 150ms ease',
          background: '#f8fafc',
          width: '100%',
          boxSizing: 'border-box',
          resize: 'vertical',
          lineHeight: 1.6,
        }}
        onFocus={e => { (e.currentTarget as HTMLElement).style.borderColor = '#1b61c9' }}
        onBlur={e  => { (e.currentTarget as HTMLElement).style.borderColor = '#e0e2e6' }}
      />
    </div>
  )
}
