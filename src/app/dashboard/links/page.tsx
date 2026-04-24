'use client'

import { useCallback, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import {
  SectionHeader,
  Card,
  FormField,
  FormInput,
  FormSelect,
  FormButton,
} from '@/components/backend'

/* ─────────────────────────────────────────────────────────────────
   PARTNER · REFERRAL LINKS  (/dashboard/links)
   Three link variants: Hot (signup), Cold (homepage), Specific Page
   QR code with destination selector + share buttons + templates.
   ───────────────────────────────────────────────────────────────── */

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://autopilotroi.com'

type LinkType      = 'cold' | 'hot' | 'specific'
type QrDestination = 'signup' | 'home' | 'selected'

interface PageOption { label: string; path: string }

const FRONTEND_PAGES: PageOption[] = [
  { label: 'Homepage',    path: '/' },
  { label: 'Calculator',  path: '/calculator' },
  { label: 'Products',    path: '/products' },
  { label: 'FAQs',        path: '/faqs' },
  { label: 'Media',       path: '/media' },
  { label: 'University',  path: '/university' },
  { label: 'Resources',   path: '/resources' },
  { label: 'Summary',     path: '/summary' },
  { label: 'Evaluate',    path: '/evaluate' },
  { label: 'Join',        path: '/join' },
  { label: 'Orientation', path: '/orientation' },
]

interface LinkTypeMeta {
  key:   LinkType
  label: string
  icon:  string
  desc:  string
  ring:  string
  bg:    string
}

const LINK_TYPES: LinkTypeMeta[] = [
  { key: 'cold',     label: 'Cold prospect', icon: '❄️', desc: 'Sends to homepage — best for cold outreach',  ring: 'ring-cyan-300/50',   bg: 'border-cyan-200 bg-cyan-50/40' },
  { key: 'hot',      label: 'Hot prospect',  icon: '🔥', desc: 'Sends directly to signup — for warm leads',   ring: 'ring-orange-300/50', bg: 'border-orange-200 bg-orange-50/40' },
  { key: 'specific', label: 'Specific page', icon: '🔄', desc: 'Send to any page — targeted outreach',        ring: 'ring-purple-300/50', bg: 'border-purple-200 bg-purple-50/40' },
]

export default function ReferralLinksPage() {
  const [refCode, setRefCode]           = useState('')
  const [linkType, setLinkType]         = useState<LinkType>('cold')
  const [selectedPage, setSelectedPage] = useState('/calculator')
  const [copied, setCopied]             = useState<string | null>(null)
  const [qrDest, setQrDest]             = useState<QrDestination>('home')

  const referralUrl = useMemo(() => {
    const ref = refCode ? `?ref=${refCode}` : ''
    switch (linkType) {
      case 'hot':      return `${SITE_URL}/signup${ref}`
      case 'cold':     return `${SITE_URL}/${ref}`
      case 'specific': return `${SITE_URL}${selectedPage}${ref}`
    }
  }, [refCode, linkType, selectedPage])

  const qrTargetUrl = useMemo(() => {
    const ref = refCode ? `?ref=${refCode}` : ''
    switch (qrDest) {
      case 'signup':   return `${SITE_URL}/signup${ref}`
      case 'home':     return `${SITE_URL}/${ref}`
      case 'selected': return `${SITE_URL}${selectedPage}${ref}`
    }
  }, [refCode, qrDest, selectedPage])

  const qrCodeApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(qrTargetUrl)}&bgcolor=ffffff&color=0f172a&format=png`

  const shareLinks = useMemo(() => [
    {
      name: 'WhatsApp',
      url:  `https://wa.me/?text=${encodeURIComponent(`Check out AutopilotROI — AI-managed finance platform: ${referralUrl}`)}`,
      cls:  'bg-emerald-600 hover:bg-emerald-500 text-white',
      icon: '💬',
    },
    {
      name: 'Telegram',
      url:  `https://t.me/share/url?url=${encodeURIComponent(referralUrl)}&text=${encodeURIComponent('Check out AutopilotROI — AI-managed finance platform')}`,
      cls:  'bg-blue-500 hover:bg-blue-400 text-white',
      icon: '✈️',
    },
    {
      name: 'X / Twitter',
      url:  `https://twitter.com/intent/tweet?text=${encodeURIComponent('Check out AutopilotROI — AI-managed finance platform')}&url=${encodeURIComponent(referralUrl)}`,
      cls:  'bg-gray-900 hover:bg-gray-700 text-white',
      icon: '🐦',
    },
    {
      name: 'Email',
      url:  `mailto:?subject=${encodeURIComponent('Check out AutopilotROI')}&body=${encodeURIComponent(`I wanted to share this with you — AutopilotROI is an AI-managed finance platform:\n\n${referralUrl}`)}`,
      cls:  'bg-[#f8fafc] hover:bg-[#e8edf5] text-[#181d26] border border-[#e0e2e6]',
      icon: '📧',
    },
  ], [referralUrl])

  const copyToClipboard = useCallback(async (text: string, label: string) => {
    await navigator.clipboard.writeText(text)
    setCopied(label)
    setTimeout(() => setCopied(null), 2000)
  }, [])

  const activeLinkMeta = LINK_TYPES.find(t => t.key === linkType)!

  const messageTemplates = useMemo(() => [
    `Hey! I've been using AutopilotROI for AI-managed finance and thought you'd find it interesting. Takes 2 minutes to get your readiness score: ${referralUrl}`,
    `Wanted to share this with you — AutopilotROI has a free assessment that shows where you stand with crypto/fintech tools. No commitment: ${referralUrl}`,
    `Check this out — I took a quick quiz about AI finance readiness and found it really insightful. Takes 2 min: ${referralUrl}`,
  ], [referralUrl])

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <SectionHeader
        title="Referral link generator"
        subtitle="Generate your personalized referral link, share it, or download a QR code."
      />

      {/* Referral code input */}
      <Card padding="lg">
        <FormField label="Your referral code" htmlFor="ref-code">
          <FormInput
            id="ref-code"
            type="text"
            value={refCode}
            onChange={(e) => setRefCode(e.target.value.toLowerCase().replace(/[^a-z0-9-_]/g, ''))}
            placeholder="e.g. jody, partner123, 12345"
          />
        </FormField>
      </Card>

      {/* Link type selector */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-[rgba(4,14,32,0.45)] uppercase tracking-wider">
          Link type
        </h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {LINK_TYPES.map((type) => {
            const isActive = linkType === type.key
            return (
              <button
                key={type.key}
                onClick={() => setLinkType(type.key)}
                className={`relative rounded-2xl border p-4 text-left transition-all ${
                  isActive
                    ? `${type.bg} ring-1 ${type.ring} scale-[1.02]`
                    : 'border-[#e0e2e6] bg-white hover:bg-[#f8fafc]'
                }`}
              >
                {isActive && (
                  <span className="absolute top-3 right-3 text-xs font-bold text-blue-600">✓ Active</span>
                )}
                <span className="text-2xl">{type.icon}</span>
                <h3 className="mt-2 font-semibold text-[#181d26] text-sm">{type.label}</h3>
                <p className="mt-1 text-xs text-[rgba(4,14,32,0.55)]">{type.desc}</p>
              </button>
            )
          })}
        </div>
      </div>

      {/* Specific page dropdown */}
      {linkType === 'specific' && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <Card padding="lg" className="border-purple-200 bg-purple-50/30">
            <FormField label="Select destination page" htmlFor="dest-page">
              <FormSelect
                id="dest-page"
                value={selectedPage}
                onChange={(e) => setSelectedPage(e.target.value)}
              >
                {FRONTEND_PAGES.map((page) => (
                  <option key={page.path} value={page.path}>
                    {page.label} — {SITE_URL}{page.path}
                  </option>
                ))}
              </FormSelect>
            </FormField>
          </Card>
        </motion.div>
      )}

      {/* Generated link display */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
        <Card padding="lg" className={activeLinkMeta.bg}>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">{activeLinkMeta.icon}</span>
            <label className="text-sm font-medium text-[#181d26]">
              {activeLinkMeta.label} link
            </label>
          </div>
          <div className="flex items-center gap-3">
            <code className="flex-1 rounded-xl bg-white border border-[#e0e2e6] px-4 py-3.5 text-sm text-[#1b61c9] overflow-x-auto">
              {referralUrl}
            </code>
            <FormButton
              variant="primary"
              onClick={() => copyToClipboard(referralUrl, 'link')}
            >
              {copied === 'link' ? '✓ Copied!' : 'Copy'}
            </FormButton>
          </div>
        </Card>
      </motion.div>

      {/* All links quick copy */}
      {refCode && (
        <Card padding="lg">
          <h3 className="text-sm font-semibold text-[rgba(4,14,32,0.45)] uppercase tracking-wider mb-4">
            All your links — quick copy
          </h3>
          <div className="space-y-3">
            {[
              { icon: '❄️', label: 'Cold (Homepage)', url: `${SITE_URL}/?ref=${refCode}` },
              { icon: '🔥', label: 'Hot (Signup)',     url: `${SITE_URL}/signup?ref=${refCode}` },
              ...(linkType === 'specific'
                ? [{ icon: '🔄', label: `Page (${selectedPage})`, url: `${SITE_URL}${selectedPage}?ref=${refCode}` }]
                : []),
            ].map((link) => (
              <div
                key={link.label}
                className="group flex items-center gap-3 rounded-xl bg-[#f8fafc] px-4 py-3 hover:bg-[#e8edf5] transition cursor-pointer"
                onClick={() => copyToClipboard(link.url, link.label)}
              >
                <span>{link.icon}</span>
                <span className="text-xs font-medium text-[#181d26] w-32 shrink-0">{link.label}</span>
                <code className="flex-1 text-xs text-[rgba(4,14,32,0.55)] truncate">{link.url}</code>
                <span className="text-xs text-blue-600 opacity-0 group-hover:opacity-100 transition font-semibold">
                  {copied === link.label ? '✓' : 'Copy'}
                </span>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* QR code */}
      <Card padding="lg">
        <h3 className="text-sm font-semibold text-[rgba(4,14,32,0.45)] uppercase tracking-wider mb-4">
          QR code
        </h3>

        <div className="mb-5">
          <label className="block text-xs text-[rgba(4,14,32,0.55)] mb-2">QR code destination</label>
          <div className="flex flex-wrap gap-2">
            {(
              [
                { key: 'home',     label: '❄️ Homepage',      desc: 'autopilotroi.com' },
                { key: 'signup',   label: '🔥 Signup',        desc: 'autopilotroi.com/signup' },
                ...(linkType === 'specific'
                  ? [{ key: 'selected' as const, label: '🔄 Selected page', desc: selectedPage }]
                  : []),
              ] as { key: QrDestination; label: string; desc: string }[]
            ).map((opt) => (
              <FormButton
                key={opt.key}
                variant={qrDest === opt.key ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setQrDest(opt.key)}
              >
                {opt.label}
              </FormButton>
            ))}
          </div>
          <p className="mt-2 text-xs text-[rgba(4,14,32,0.45)]">
            Points to: <span className="text-[#1b61c9]">{qrTargetUrl}</span>
          </p>
        </div>

        <div className="flex flex-col items-center gap-5 sm:flex-row">
          <div className="rounded-xl border border-[#e0e2e6] bg-white p-4 relative overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={qrCodeApiUrl}
              alt="Referral QR code"
              width={200}
              height={200}
              className="rounded-lg"
              crossOrigin="anonymous"
              onError={(e) => {
                const target = e.currentTarget
                target.style.display = 'none'
                const fallback = target.nextElementSibling as HTMLElement | null
                if (fallback) fallback.style.display = 'flex'
              }}
            />
            <div className="hidden w-[200px] h-[200px] items-center justify-center rounded-lg border border-dashed border-[#e0e2e6] text-center">
              <div>
                <span className="text-3xl">📱</span>
                <p className="mt-2 text-xs text-[rgba(4,14,32,0.45)]">QR preview loading…<br/>Use download below</p>
              </div>
            </div>
          </div>

          <div className="flex-1 space-y-3 text-center sm:text-left">
            <p className="text-sm text-[rgba(4,14,32,0.65)]">
              Prospects can scan this QR code to go directly to your referral page. Print it on
              business cards, flyers, or share in presentations.
            </p>
            <a
              href={qrCodeApiUrl}
              download={`autopilotroi-qr-${refCode || 'default'}-${qrDest}.png`}
              className="inline-flex items-center gap-2 rounded-xl bg-[#f8fafc] px-5 py-2.5 text-sm font-medium text-[#181d26] transition hover:bg-[#e8edf5] border border-[#e0e2e6]"
            >
              ⬇️ Download QR code
            </a>
          </div>
        </div>
      </Card>

      {/* Social share */}
      <Card padding="lg">
        <h3 className="text-sm font-semibold text-[rgba(4,14,32,0.45)] uppercase tracking-wider mb-4">
          Share directly
        </h3>
        <p className="text-xs text-[rgba(4,14,32,0.55)] mb-4">
          Sharing your <strong className="text-[#181d26]">{activeLinkMeta.label}</strong> link: <span className="text-[#1b61c9]">{referralUrl}</span>
        </p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {shareLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-medium transition ${link.cls}`}
            >
              <span>{link.icon}</span>
              {link.name}
            </a>
          ))}
        </div>
      </Card>

      {/* Message templates */}
      <Card padding="lg">
        <h3 className="text-sm font-semibold text-[rgba(4,14,32,0.45)] uppercase tracking-wider mb-4">
          Message templates
        </h3>
        <div className="space-y-3">
          {messageTemplates.map((msg, i) => (
            <div
              key={i}
              className="group flex items-start gap-3 rounded-xl bg-[#f8fafc] px-4 py-3 hover:bg-[#e8edf5] transition cursor-pointer"
              onClick={() => copyToClipboard(msg, `msg-${i}`)}
            >
              <p className="flex-1 text-sm text-[rgba(4,14,32,0.70)]">{msg}</p>
              <button className="shrink-0 mt-1 text-xs text-blue-600 opacity-0 group-hover:opacity-100 transition font-semibold">
                {copied === `msg-${i}` ? '✓' : 'Copy'}
              </button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
