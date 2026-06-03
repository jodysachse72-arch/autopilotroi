'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import Logo from '@/components/ui/Logo'
import Turnstile from '@/components/ui/Turnstile'
import { CheckCircleIcon } from '@/components/ui/Icons'

/* ═══════════════════════════════════════════════════════════════
   CONTACT US — public contact form.
   Matches the premium-light styling of /signup.
   Submits to /api/contact → Supabase contact_messages table.
   ThriveDesk dual-write is handled server-side (stubbed until key).
   ═══════════════════════════════════════════════════════════════ */

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ''

export default function ContactPage() {
  const [name, setName]                     = useState('')
  const [email, setEmail]                   = useState('')
  const [subject, setSubject]               = useState('')
  const [message, setMessage]               = useState('')
  const [error, setError]                   = useState('')
  const [loading, setLoading]               = useState(false)
  const [success, setSuccess]               = useState(false)
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
  const handleTurnstile = useCallback((token: string) => setTurnstileToken(token), [])

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message, turnstileToken }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Something went wrong')
        setLoading(false)
        return
      }
      setSuccess(true)
    } catch {
      setError('Network error. Please try again.')
      setLoading(false)
    }
  }, [name, email, subject, message, turnstileToken])

  const submitDisabled = loading || (TURNSTILE_SITE_KEY ? !turnstileToken : false)

  if (success) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'clamp(3rem, 8vw, 5rem) var(--page-px)',
          background: 'var(--color-bg)',
        }}
      >
        <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '28rem', textAlign: 'center' }}>
          <div style={{ marginBottom: '2rem' }}>
            <Link href="/" style={{ display: 'inline-block' }}>
              <Logo size={38} showText />
            </Link>
          </div>
          <div
            style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-card)',
              padding: 'clamp(2rem, 5vw, 3rem)',
              boxShadow: 'var(--shadow-card)',
            }}
          >
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '3.5rem',
                height: '3.5rem',
                borderRadius: '50%',
                background: 'rgba(16,185,129,0.1)',
                marginBottom: '1.25rem',
                color: 'var(--color-success)',
              }}
            >
              <CheckCircleIcon className="w-7 h-7" />
            </span>
            <h1
              className="text-heading"
              style={{ color: 'var(--color-text)', marginBottom: '0.5rem' }}
            >
              Message Sent!
            </h1>
            <p
              className="text-body"
              style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}
            >
              Thank you for reaching out. We&apos;ll get back to you as soon as possible.
            </p>
            <Link
              href="/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontWeight: 600,
                color: 'var(--color-accent)',
                fontSize: 'var(--text-body)',
              }}
              className="hover:underline"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(3rem, 8vw, 5rem) var(--page-px)',
        background: 'var(--color-bg)',
      }}
    >
      <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '28rem' }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Link href="/" style={{ display: 'inline-block' }}>
            <Logo size={38} showText />
          </Link>
        </div>

        {/* Premium form card */}
        <div style={{
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-card)',
          padding: 'clamp(1.75rem, 5vw, 2.5rem)',
          boxShadow: 'var(--shadow-card)',
        }}>
          <h1
            className="text-heading"
            style={{ color: 'var(--color-text)', textAlign: 'center', marginBottom: '0.5rem' }}
          >
            Contact Us
          </h1>
          <p
            className="text-body"
            style={{ color: 'var(--color-text-muted)', textAlign: 'center', marginBottom: '2rem' }}
          >
            Have a question or want to learn more? Drop us a message.
          </p>

          {/* Scoped styles for focus/placeholder */}
          <style>{`
            .contact-input {
              outline: none;
              transition: border-color 150ms ease, box-shadow 150ms ease;
            }
            .contact-input:focus {
              border-color: var(--color-accent);
              box-shadow: 0 0 0 3px rgba(27,97,201,0.12);
            }
            .contact-input::placeholder {
              color: var(--color-text-muted);
            }
            #contact-submit:not(:disabled):hover {
              background: var(--color-accent-hover) !important;
            }
          `}</style>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

            {/* Full Name */}
            <div>
              <label
                htmlFor="contact-name"
                style={{
                  display: 'block',
                  marginBottom: '0.375rem',
                  fontSize: 'var(--text-caption)',
                  fontWeight: 600,
                  color: 'var(--color-text-weak)',
                }}
              >
                Full Name{' '}
                <span style={{ color: 'var(--color-error)' }} aria-hidden>*</span>
              </label>
              <input
                id="contact-name"
                className="contact-input"
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Your full name"
                autoComplete="name"
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '0.75rem 1rem',
                  fontSize: 'var(--text-body)',
                  fontFamily: 'var(--font-body)',
                  color: 'var(--color-text)',
                  background: 'var(--color-surface-alt)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                }}
              />
            </div>

            {/* Email Address */}
            <div>
              <label
                htmlFor="contact-email"
                style={{
                  display: 'block',
                  marginBottom: '0.375rem',
                  fontSize: 'var(--text-caption)',
                  fontWeight: 600,
                  color: 'var(--color-text-weak)',
                }}
              >
                Email Address{' '}
                <span style={{ color: 'var(--color-error)' }} aria-hidden>*</span>
              </label>
              <input
                id="contact-email"
                className="contact-input"
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@email.com"
                autoComplete="email"
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '0.75rem 1rem',
                  fontSize: 'var(--text-body)',
                  fontFamily: 'var(--font-body)',
                  color: 'var(--color-text)',
                  background: 'var(--color-surface-alt)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                }}
              />
            </div>

            {/* Subject (optional) */}
            <div>
              <label
                htmlFor="contact-subject"
                style={{
                  display: 'block',
                  marginBottom: '0.375rem',
                  fontSize: 'var(--text-caption)',
                  fontWeight: 600,
                  color: 'var(--color-text-weak)',
                }}
              >
                Subject <span style={{ fontWeight: 400, color: 'var(--color-text-muted)' }}>(optional)</span>
              </label>
              <input
                id="contact-subject"
                className="contact-input"
                type="text"
                value={subject}
                onChange={e => setSubject(e.target.value)}
                placeholder="e.g. Partnership inquiry, Technical question"
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '0.75rem 1rem',
                  fontSize: 'var(--text-body)',
                  fontFamily: 'var(--font-body)',
                  color: 'var(--color-text)',
                  background: 'var(--color-surface-alt)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                }}
              />
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="contact-message"
                style={{
                  display: 'block',
                  marginBottom: '0.375rem',
                  fontSize: 'var(--text-caption)',
                  fontWeight: 600,
                  color: 'var(--color-text-weak)',
                }}
              >
                Message{' '}
                <span style={{ color: 'var(--color-error)' }} aria-hidden>*</span>
              </label>
              <textarea
                id="contact-message"
                className="contact-input"
                required
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="How can we help you?"
                rows={5}
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '0.75rem 1rem',
                  fontSize: 'var(--text-body)',
                  fontFamily: 'var(--font-body)',
                  color: 'var(--color-text)',
                  background: 'var(--color-surface-alt)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  resize: 'vertical',
                  minHeight: '7rem',
                }}
              />
            </div>

            {error && (
              <div
                style={{
                  borderRadius: 'var(--radius-md)',
                  padding: '0.75rem 1rem',
                  fontSize: 'var(--text-caption)',
                  background: 'rgba(220,38,38,0.08)',
                  border: '1px solid rgba(220,38,38,0.25)',
                  color: 'var(--color-error)',
                }}
                role="alert"
              >
                {error}
              </div>
            )}

            {TURNSTILE_SITE_KEY && (
              <Turnstile
                siteKey={TURNSTILE_SITE_KEY}
                onVerify={handleTurnstile}
                onExpire={() => setTurnstileToken(null)}
                theme="light"
              />
            )}

            <button
              id="contact-submit"
              type="submit"
              disabled={submitDisabled}
              aria-busy={loading || undefined}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                width: '100%',
                padding: '0.875rem 1.5rem',
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: 'var(--text-body)',
                color: '#ffffff',
                background: 'var(--color-accent)',
                border: 'none',
                borderRadius: 'var(--radius-btn)',
                cursor: submitDisabled ? 'not-allowed' : 'pointer',
                opacity: submitDisabled ? 0.6 : 1,
                transition: 'background 150ms ease, opacity 150ms ease',
              }}
            >
              {loading && (
                <span
                  aria-hidden
                  style={{
                    display: 'inline-block',
                    width: '0.75rem',
                    height: '0.75rem',
                    borderRadius: '50%',
                    border: '2px solid rgba(255,255,255,0.3)',
                    borderTopColor: '#ffffff',
                    animation: 'spin 0.75s linear infinite',
                    flexShrink: 0,
                  }}
                />
              )}
              {loading ? 'Sending…' : 'Send Message →'}
            </button>
          </form>
        </div>

        {/* Trust-point reassurance row */}
        <div style={{
          marginTop: '1.25rem',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '0.5rem 1.5rem',
        }}>
          {(['We respond within 24h', 'No spam, ever', 'Your data is secure'] as const).map(t => (
            <span
              key={t}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.375rem',
                fontSize: 'var(--text-caption)',
                color: 'var(--color-text-muted)',
              }}
            >
              <span style={{ color: 'var(--color-success)', display: 'inline-flex' }}>
                <CheckCircleIcon className="w-3.5 h-3.5" />
              </span>
              {t}
            </span>
          ))}
        </div>

      </div>
    </div>
  )
}
