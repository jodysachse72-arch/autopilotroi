'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

/* ═══════════════════════════════════════════════════════════════
   PARTNER REFERRAL LINK GENERATOR
   Generate, copy, and share referral links with QR code
   ═══════════════════════════════════════════════════════════════ */

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://autopilotroi.com'

export default function ReferralLinksPage() {
  const [refCode, setRefCode] = useState('')
  const [copied, setCopied] = useState<string | null>(null)

  const signupUrl = `${SITE_URL}/signup${refCode ? `?ref=${refCode}` : ''}`

  const shareLinks = [
    {
      name: 'WhatsApp',
      url: `https://wa.me/?text=${encodeURIComponent(`Check out AutopilotROI — AI-managed finance platform: ${signupUrl}`)}`,
      color: 'bg-emerald-600 hover:bg-emerald-500',
      icon: '💬',
    },
    {
      name: 'Telegram',
      url: `https://t.me/share/url?url=${encodeURIComponent(signupUrl)}&text=${encodeURIComponent('Check out AutopilotROI — AI-managed finance platform')}`,
      color: 'bg-blue-500 hover:bg-blue-400',
      icon: '✈️',
    },
    {
      name: 'X / Twitter',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent('Check out AutopilotROI — AI-managed finance platform')}&url=${encodeURIComponent(signupUrl)}`,
      color: 'bg-gray-700 hover:bg-gray-600',
      icon: '🐦',
    },
    {
      name: 'Email',
      url: `mailto:?subject=${encodeURIComponent('Check out AutopilotROI')}&body=${encodeURIComponent(`I wanted to share this with you — AutopilotROI is an AI-managed finance platform:\n\n${signupUrl}`)}`,
      color: 'bg-white/10 hover:bg-white/20',
      icon: '📧',
    },
  ]

  async function copyToClipboard(text: string, label: string) {
    await navigator.clipboard.writeText(text)
    setCopied(label)
    setTimeout(() => setCopied(null), 2000)
  }

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(signupUrl)}&bgcolor=06122f&color=ffffff&format=png`

  return (
    <div className="min-h-screen bg-[#06122f]">
      <div className="border-b border-white/10 bg-[linear-gradient(180deg,#0b1f57_0%,#06122f_100%)] px-6 py-12 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-[var(--font-sora)] text-3xl font-bold text-white sm:text-4xl">
            Referral Link Generator
          </h1>
          <p className="mt-3 text-blue-100/50">
            Generate your personalized referral link, copy it, or share directly to social media.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-6 py-10 lg:px-10 space-y-8">
        {/* Referral Code Input */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <label className="block text-sm font-medium text-white mb-2">Your Referral Code</label>
          <input
            type="text"
            value={refCode}
            onChange={(e) => setRefCode(e.target.value.toLowerCase().replace(/[^a-z0-9-_]/g, ''))}
            placeholder="e.g. jody, partner123"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-white placeholder:text-white/30 outline-none focus:border-blue-500 transition text-lg"
          />
        </div>

        {/* Generated Link */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-blue-400/20 bg-blue-500/5 p-6"
        >
          <label className="block text-sm font-medium text-blue-300/60 mb-2">Your Referral Link</label>
          <div className="flex items-center gap-3">
            <code className="flex-1 rounded-xl bg-black/30 px-4 py-3.5 text-sm text-blue-400 overflow-x-auto">
              {signupUrl}
            </code>
            <button
              onClick={() => copyToClipboard(signupUrl, 'link')}
              className="shrink-0 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-500"
            >
              {copied === 'link' ? '✓ Copied!' : 'Copy'}
            </button>
          </div>
        </motion.div>

        {/* QR Code */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h3 className="text-sm font-medium text-white mb-4">QR Code</h3>
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <div className="rounded-xl border border-white/10 bg-black p-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={qrCodeUrl} alt="Referral QR Code" width={200} height={200} className="rounded-lg" />
            </div>
            <div className="flex-1 space-y-3 text-center sm:text-left">
              <p className="text-sm text-white/50">
                Prospects can scan this QR code to go directly to your referral signup page.
              </p>
              <a
                href={qrCodeUrl}
                download={`autopilotroi-qr-${refCode || 'default'}.png`}
                className="inline-block rounded-xl bg-white/5 px-5 py-2.5 text-sm text-white transition hover:bg-white/10"
              >
                Download QR Code
              </a>
            </div>
          </div>
        </div>

        {/* Social Share */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h3 className="text-sm font-medium text-white mb-4">Share Directly</h3>
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
        </div>

        {/* Quick Message Templates */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h3 className="text-sm font-medium text-white mb-4">Message Templates</h3>
          <div className="space-y-3">
            {[
              `Hey! I've been using AutopilotROI for AI-managed finance and thought you'd find it interesting. Takes 2 minutes to get your readiness score: ${signupUrl}`,
              `Wanted to share this with you — AutopilotROI has a free assessment that shows where you stand with crypto/fintech tools. No commitment: ${signupUrl}`,
              `Check this out — I took a quick quiz about AI finance readiness and found it really insightful. Takes 2 min: ${signupUrl}`,
            ].map((msg, i) => (
              <div
                key={i}
                className="group flex items-start gap-3 rounded-xl bg-white/[0.02] px-4 py-3 hover:bg-white/[0.04] transition cursor-pointer"
                onClick={() => copyToClipboard(msg, `msg-${i}`)}
              >
                <p className="flex-1 text-sm text-white/60">{msg}</p>
                <button className="shrink-0 mt-1 text-xs text-blue-400 opacity-0 group-hover:opacity-100 transition">
                  {copied === `msg-${i}` ? '✓' : 'Copy'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
