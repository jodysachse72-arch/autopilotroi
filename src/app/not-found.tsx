'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

const glitchMessages = [
  "Looks like this page went to the moon... without us.",
  "Our AI searched everywhere. Even checked under the blockchain.",
  "Error 404: Page not found. Probably running on autopilot somewhere.",
  "This page is more lost than my first crypto seed phrase.",
  "The algorithm said it was here. The algorithm was wrong.",
  "Houston, we have a 404. Requesting coordinates.",
]

const funFacts = [
  "Fun fact: The first 404 error came from Room 404 at CERN. True story.",
  "While you're here... did you know AI bots don't actually sleep?",
  "This page costs $0 to maintain. That's the only good thing about it.",
  "You found the secret page. Just kidding. It doesn't exist.",
  "Plot twist: Maybe the real page was the friends we made along the way.",
]

export default function NotFound() {
  const [messageIndex, setMessageIndex] = useState(0)
  const [factIndex, setFactIndex] = useState(0)
  const [glitch, setGlitch] = useState(false)

  useEffect(() => {
    setMessageIndex(Math.floor(Math.random() * glitchMessages.length))
    setFactIndex(Math.floor(Math.random() * funFacts.length))
  }, [])

  // Periodic glitch effect
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true)
      setTimeout(() => setGlitch(false), 200)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#06122f]">
      {/* Grid background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Dramatic glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-red-500/5 blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-lg px-6 text-center">
        {/* Giant 404 with glitch */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="relative mb-6"
        >
          <h1
            className={`font-[var(--font-sora)] text-[8rem] font-black leading-none tracking-tighter transition-all duration-100 ${
              glitch
                ? 'text-red-500 translate-x-1 skew-x-2'
                : 'bg-gradient-to-b from-white to-white/30 bg-clip-text text-transparent'
            }`}
          >
            404
          </h1>
          {/* Glitch shadow */}
          {glitch && (
            <span className="absolute inset-0 font-[var(--font-sora)] text-[8rem] font-black leading-none tracking-tighter text-cyan-400/50 -translate-x-1 -skew-x-1">
              404
            </span>
          )}
        </motion.div>

        {/* Animated robot face */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 text-6xl"
        >
          <motion.span
            animate={{ rotateZ: [0, -5, 5, -3, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="inline-block"
          >
            🤖
          </motion.span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="font-[var(--font-sora)] text-2xl font-bold text-white"
        >
          Page Not Found
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-3 text-lg text-blue-100/50"
        >
          {glitchMessages[messageIndex]}
        </motion.p>

        {/* Fun fact card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 rounded-xl border border-white/5 bg-white/[0.02] px-6 py-4"
        >
          <p className="text-sm text-white/30 italic">
            {funFacts[factIndex]}
          </p>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <Link
            href="/"
            className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
          >
            ← Back to Safety
          </Link>
          <Link
            href="/signup"
            className="rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/10"
          >
            Take the Quiz Instead
          </Link>
        </motion.div>

        {/* Terminal-style error */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-10 rounded-lg bg-black/40 p-4 font-mono text-xs text-left border border-white/5"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
            <span className="ml-2 text-white/20">autopilot-terminal</span>
          </div>
          <div className="space-y-1 text-white/30">
            <p><span className="text-emerald-400">$</span> find / -name &quot;this-page&quot;</p>
            <p className="text-red-400/60">Error: No such file or directory</p>
            <p><span className="text-emerald-400">$</span> echo &quot;Well, that&apos;s awkward.&quot;</p>
            <p>Well, that&apos;s awkward.</p>
            <p><span className="text-emerald-400">$</span> <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.8, repeat: Infinity }} className="inline-block w-2 h-3.5 bg-emerald-400/50" /></p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
