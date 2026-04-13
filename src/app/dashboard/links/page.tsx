'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'

/* ═══════════════════════════════════════════════════════════════
   PARTNER REFERRAL LINK GENERATOR v2
   Three link variants: Hot (signup), Cold (homepage), Specific Page
   QR code with destination selector
   ═══════════════════════════════════════════════════════════════ */

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://autopilotroi.com'

type LinkType = 'cold' | 'hot' | 'specific'

interface PageOption {
  label: string
  path: string
}

const FRONTEND_PAGES: PageOption[] = [
  { label: 'Homepage', path: '/' },
  { label: 'Calculator', path: '/calculator' },
  { label: 'Products', path: '/products' },
  { label: 'FAQs', path: '/faqs' },
  { label: 'Media', path: '/media' },
  { label: 'University', path: '/university' },
  { label: 'Resources', path: '/resources' },
  { label: 'Summary', path: '/summary' },
  { label: 'Evaluate', path: '/evaluate' },
  { label: 'Join', path: '/join' },
  { label: 'Orientation', path: '/orientation' },
]

const LINK_TYPES: { key: LinkType; label: string; icon: string; desc: string; color: string }[] = [
  {
    key: 'cold',
    label: 'Cold Prospect',
    icon: '❄️',
    desc: 'Sends to homepage — best for cold outreach',
    color: 'border-cyan-400/30 bg-cyan-500/10',
  },
  {
    key: 'hot',
    label: 'Hot Prospect',
    icon: '🔥',
    desc: 'Sends directly to signup — for warm leads',
    color: 'border-orange-400/30 bg-orange-500/10',
  },
  {
    key: 'specific',
    label: 'Specific Page',
    icon: '📄',
    desc: 'Send to any page — targeted outreach',
    color: 'border-purple-400/30 bg-purple-500/10',
  },
]

type QrDestination = 'signup' | 'home' | 'selected'

export default function ReferralLinksPage() {
  const [refCode, setRefCode] = useState('')
  const [linkType, setLinkType] = useState<LinkType>('cold')
  const [selectedPage, setSelectedPage] = useState('/calculator')
  const [copied, setCopied] = useState<string | null>(null)
  const [qrDest, setQrDest] = useState<QrDestination>('home')

  /* ── Build referral URL based on link type ── */
  const referralUrl = useMemo(() => {
    const ref = refCode ? `?ref=${refCode}` : ''
    switch (linkType) {
      case 'hot':
        return `${SITE_URL}/signup${ref}`
      case 'cold':
        return `${SITE_URL}/${ref}`
      case 'specific':
        return `${SITE_URL}${selectedPage}${ref}`
    }
  }, [refCode, linkType, selectedPage])

  /* ── Build QR URL based on QR destination selector ── */
  const qrTargetUrl = useMemo(() => {
    const ref = refCode ? `?ref=${refCode}` : ''
    switch (qrDest) {
      case 'signup':
        return `${SITE_URL}/signup${ref}`
      case 'home':
        return `${SITE_URL}/${ref}`
      case 'selected':
        return `${SITE_URL}${selectedPage}${ref}`
    }
  }, [refCode, qrDest, selectedPage])

  const qrCodeApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(qrTargetUrl)}&bgcolor=06122f&color=ffffff&format=png`

  const shareLinks = [
    {
      name: 'WhatsApp',
      url: `https://wa.me/?text=${encodeURIComponent(`Check out AutopilotROI — AI-managed finance platform: ${referralUrl}`)}`,
      color: 'bg-emerald-600 hover:bg-emerald-500',
      icon: '💬',
    },
    {
      name: 'Telegram',
      url: `https://t.me/share/url?url=${encodeURIComponent(referralUrl)}&text=${encodeURIComponent('Check out AutopilotROI — AI-managed finance platform')}`,
      color: 'bg-blue-500 hover:bg-blue-400',
      icon: '✈️',
    },
    {
      name: 'X / Twitter',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent('Check out AutopilotROI — AI-managed finance platform')}&url=${encodeURIComponent(referralUrl)}`,
      color: 'bg-gray-700 hover:bg-gray-600',
      icon: '🐦',
    },
    {
      name: 'Email',
      url: `mailto:?subject=${encodeURIComponent('Check out AutopilotROI')}&body=${encodeURIComponent(`I wanted to share this with you — AutopilotROI is an AI-managed finance platform:\n\n${referralUrl}`)}`,
      color: 'bg-white/10 hover:bg-white/20',
      icon: '📧',
    },
  ]

  async function copyToClipboard(text: string, label: string) {
    await navigator.clipboard.writeText(text)
    setCopied(label)
    setTimeout(() => setCopied(null), 2000)
  }

  const activeLinkMeta = LINK_TYPES.find((t) => t.key === linkType)!

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-[var(--font-sora)] text-3xl font-bold text-[var(--text-primary)]">
          Referral Link Generator
        </h1>
        <p className="mt-2 text-sm text-[var(--text-tertiary)]">
          Generate your personalized referral link, share it, or download a QR code.
        </p>
      </motion.div>

      {/* Referral Code Input */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-card)] p-6"
      >
        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
          Your Referral Code
        </label>
        <input
          type="text"
          value={refCode}
          onChange={(e) => setRefCode(e.target.value.toLowerCase().replace(/[^a-z0-9-_]/g, ''))}
          placeholder="e.g. jody, partner123, 12345"
          className="w-full rounded-xl border border-[var(--border-primary)] bg-transparent px-4 py-3.5 text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none focus:border-blue-500 transition text-lg"
        />
      </motion.div>

      {/* Link Type Selector */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-3"
      >
        <h2 className="text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider">
          Link Type
        </h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {LINK_TYPES.map((type) => (
            <button
              key={type.key}
              onClick={() => setLinkType(type.key)}
              className={`relative rounded-2xl border p-4 text-left transition-all ${
                linkType === type.key
                  ? `${type.color} ring-1 ring-blue-400/40 scale-[1.02]`
                  : 'border-[var(--border-primary)] bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)]'
              }`}
            >
              {linkType === type.key && (
                <span className="absolute top-3 right-3 text-xs font-bold text-blue-400">✓ Active</span>
              )}
              <span className="text-2xl">{type.icon}</span>
              <h3 className="mt-2 font-semibold text-[var(--text-primary)] text-sm">{type.label}</h3>
              <p className="mt-1 text-xs text-[var(--text-tertiary)]">{type.desc}</p>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Specific Page Dropdown — only shown when 'specific' is selected */}
      {linkType === 'specific' && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="rounded-2xl border border-purple-400/20 bg-purple-500/5 p-6"
        >
          <label className="block text-sm font-medium text-purple-300/80 mb-2">
            Select Destination Page
          </label>
          <select
            value={selectedPage}
            onChange={(e) => setSelectedPage(e.target.value)}
            className="w-full rounded-xl border border-[var(--border-primary)] bg-[var(--bg-card)] px-4 py-3 text-sm text-[var(--text-primary)] outline-none focus:border-blue-500"
          >
            {FRONTEND_PAGES.map((page) => (
              <option key={page.path} value={page.path}>
                {page.label} — {SITE_URL}{page.path}
              </option>
            ))}
          </select>
        </motion.div>
      )}

      {/* Generated Link Display */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className={`rounded-2xl border p-6 ${activeLinkMeta.color}`}
      >
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg">{activeLinkMeta.icon}</span>
          <label className="text-sm font-medium text-[var(--text-secondary)]">
            {activeLinkMeta.label} Link
          </label>
        </div>
        <div className="flex items-center gap-3">
          <code className="flex-1 rounded-xl bg-black/30 px-4 py-3.5 text-sm text-blue-400 overflow-x-auto scrollbar-hide">
            {referralUrl}
          </code>
          <button
            onClick={() => copyToClipboard(referralUrl, 'link')}
            className="shrink-0 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-500"
          >
            {copied === 'link' ? '✓ Copied!' : 'Copy'}
          </button>
        </div>
      </motion.div>

      {/* All 3 links at a glance (quick copy) */}
      {refCode && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-card)] p-6"
        >
          <h3 className="text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-4">
            All Your Links — Quick Copy
          </h3>
          <div className="space-y-3">
            {[
              { icon: '❄️', label: 'Cold (Homepage)', url: `${SITE_URL}/?ref=${refCode}` },
              { icon: '🔥', label: 'Hot (Signup)', url: `${SITE_URL}/signup?ref=${refCode}` },
              ...(linkType === 'specific'
                ? [{ icon: '📄', label: `Page (${selectedPage})`, url: `${SITE_URL}${selectedPage}?ref=${refCode}` }]
                : []),
            ].map((link) => (
              <div
                key={link.label}
                className="group flex items-center gap-3 rounded-xl bg-white/[0.02] px-4 py-3 hover:bg-white/[0.05] transition cursor-pointer"
                onClick={() => copyToClipboard(link.url, link.label)}
              >
                <span>{link.icon}</span>
                <span className="text-xs font-medium text-[var(--text-secondary)] w-32 shrink-0">
                  {link.label}
                </span>
                <code className="flex-1 text-xs text-[var(--text-tertiary)] truncate">{link.url}</code>
                <span className="text-xs text-blue-400 opacity-0 group-hover:opacity-100 transition font-semibold">
                  {copied === link.label ? '✓' : 'Copy'}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* QR Code with Destination Selector */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-card)] p-6"
      >
        <h3 className="text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-4">
          QR Code
        </h3>

        {/* Destination selector */}
        <div className="mb-5">
          <label className="block text-xs text-[var(--text-tertiary)] mb-2">
            QR Code Destination
          </label>
          <div className="flex flex-wrap gap-2">
            {(
              [
                { key: 'home' as const, label: '❄️ Homepage', desc: 'autopilotroi.com' },
                { key: 'signup' as const, label: '🔥 Signup', desc: 'autopilotroi.com/signup' },
                ...(linkType === 'specific'
                  ? [{ key: 'selected' as const, label: '📄 Selected Page', desc: selectedPage }]
                  : []),
              ] as { key: QrDestination; label: string; desc: string }[]
            ).map((opt) => (
              <button
                key={opt.key}
                onClick={() => setQrDest(opt.key)}
                className={`rounded-xl px-4 py-2.5 text-xs font-medium transition ${
                  qrDest === opt.key
                    ? 'bg-blue-600 text-white'
                    : 'border border-[var(--border-primary)] bg-transparent text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)]'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <p className="mt-2 text-xs text-[var(--text-muted)]">
            Points to: <span className="text-blue-400">{qrTargetUrl}</span>
          </p>
        </div>

        <div className="flex flex-col items-center gap-5 sm:flex-row">
          <div className="rounded-xl border border-[var(--border-primary)] bg-black/30 p-4 relative overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={qrCodeApiUrl}
              alt="Referral QR Code"
              width={200}
              height={200}
              className="rounded-lg"
              crossOrigin="anonymous"
              onError={(e) => {
                // Hide broken image, show fallback
                const target = e.currentTarget
                target.style.display = 'none'
                const fallback = target.nextElementSibling as HTMLElement
                if (fallback) fallback.style.display = 'flex'
              }}
            />
            {/* Fallback placeholder */}
            <div
              className="hidden w-[200px] h-[200px] items-center justify-center rounded-lg border border-dashed border-white/20 text-center"
            >
              <div>
                <span className="text-3xl">📱</span>
                <p className="mt-2 text-xs text-[var(--text-muted)]">QR preview loading…<br/>Use download below</p>
              </div>
            </div>
          </div>

          <div className="flex-1 space-y-3 text-center sm:text-left">
            <p className="text-sm text-[var(--text-tertiary)]">
              Prospects can scan this QR code to go directly to your referral page. Print it on
              business cards, flyers, or share in presentations.
            </p>
            <a
              href={qrCodeApiUrl}
              download={`autopilotroi-qr-${refCode || 'default'}-${qrDest}.png`}
              className="inline-flex items-center gap-2 rounded-xl bg-white/5 px-5 py-2.5 text-sm text-[var(--text-primary)] transition hover:bg-white/10 border border-[var(--border-primary)]"
            >
              ⬇️ Download QR Code
            </a>
          </div>
        </div>
      </motion.div>

      {/* Social Share */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-card)] p-6"
      >
        <h3 className="text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-4">
          Share Directly
        </h3>
        <p className="text-xs text-[var(--text-tertiary)] mb-4">
          Sharing your <strong>{activeLinkMeta.label}</strong> link: <span className="text-blue-400">{referralUrl}</span>
        </p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {shareLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-medium text-white transition ${link.color}`}
            >
              <span>{link.icon}</span>
              {link.name}
            </a>
          ))}
        </div>
      </motion.div>

      {/* Quick Message Templates */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-card)] p-6"
      >
        <h3 className="text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-4">
          Message Templates
        </h3>
        <div className="space-y-3">
          {[
            `Hey! I've been using AutopilotROI for AI-managed finance and thought you'd find it interesting. Takes 2 minutes to get your readiness score: ${referralUrl}`,
            `Wanted to share this with you — AutopilotROI has a free assessment that shows where you stand with crypto/fintech tools. No commitment: ${referralUrl}`,
            `Check this out — I took a quick quiz about AI finance readiness and found it really insightful. Takes 2 min: ${referralUrl}`,
          ].map((msg, i) => (
            <div
              key={i}
              className="group flex items-start gap-3 rounded-xl bg-white/[0.02] px-4 py-3 hover:bg-white/[0.04] transition cursor-pointer"
              onClick={() => copyToClipboard(msg, `msg-${i}`)}
            >
              <p className="flex-1 text-sm text-[var(--text-tertiary)]">{msg}</p>
              <button className="shrink-0 mt-1 text-xs text-blue-400 opacity-0 group-hover:opacity-100 transition font-semibold">
                {copied === `msg-${i}` ? '✓' : 'Copy'}
              </button>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
