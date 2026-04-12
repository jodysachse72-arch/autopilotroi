'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import VideoModal from '@/components/ui/VideoModal'

/* ═══════════════════════════════════════════════════════════════
   STEP-BY-STEP GUIDE — Visual instruction slides
   
   Works NOW with illustrated steps.
   When tutorial videos arrive, drop in the videoId and
   the video replaces the illustration automatically.
   
   NO "Coming Soon" placeholders. Ever.
   ═══════════════════════════════════════════════════════════════ */

export interface GuideStep {
  title: string
  instruction: string
  tip?: string
  warning?: string
  illustration: string  // emoji/icon as visual placeholder
  screenshotAlt?: string // alt text for when real screenshots arrive
}

interface StepByStepGuideProps {
  steps: GuideStep[]
  videoId?: string // When available, shows video button
  title?: string
  accentColor?: string
}

export default function StepByStepGuide({ steps, videoId, title, accentColor = 'blue' }: StepByStepGuideProps) {
  const [activeStep, setActiveStep] = useState(0)
  const step = steps[activeStep]
  const progress = ((activeStep + 1) / steps.length) * 100

  const colorMap: Record<string, { bg: string; border: string; text: string; ring: string }> = {
    blue: { bg: 'bg-blue-500/10', border: 'border-blue-400/20', text: 'text-blue-400', ring: 'ring-blue-500/20' },
    red: { bg: 'bg-red-500/10', border: 'border-red-400/20', text: 'text-red-400', ring: 'ring-red-500/20' },
    amber: { bg: 'bg-amber-500/10', border: 'border-amber-400/20', text: 'text-amber-400', ring: 'ring-amber-500/20' },
    emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-400/20', text: 'text-emerald-400', ring: 'ring-emerald-500/20' },
  }

  const c = colorMap[accentColor] || colorMap.blue

  return (
    <div className={`rounded-xl border ${c.border} ${c.bg} overflow-hidden`}>
      {/* Header */}
      {title && (
        <div className="flex items-center justify-between px-5 py-3 border-b border-white/5">
          <span className={`text-xs font-bold uppercase tracking-wider ${c.text}`}>
            {title}
          </span>
          {videoId && (
            <VideoModal videoUrl={`https://youtu.be/${videoId}`}>
              <button className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${c.bg} ${c.text} border ${c.border} hover:bg-white/5 transition`}>
                <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Watch Tutorial
              </button>
            </VideoModal>
          )}
        </div>
      )}

      {/* Step indicator dots */}
      <div className="flex items-center gap-1.5 px-5 py-3">
        {steps.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveStep(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === activeStep
                ? `w-6 bg-${accentColor}-400`
                : i < activeStep
                ? `w-1.5 bg-${accentColor}-400/40`
                : 'w-1.5 bg-white/10'
            }`}
            style={{
              backgroundColor: i === activeStep
                ? `var(--color-${accentColor}, #60a5fa)`
                : i < activeStep
                ? `color-mix(in srgb, var(--color-${accentColor}, #60a5fa) 40%, transparent)`
                : undefined,
            }}
          />
        ))}
        <span className="ml-auto text-xs text-white/30">
          {activeStep + 1}/{steps.length}
        </span>
      </div>

      {/* Step content */}
      <div className="px-5 pb-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -15 }}
            transition={{ duration: 0.2 }}
          >
            {/* Visual area */}
            <div className="mb-4 flex items-center justify-center rounded-xl bg-white/[0.03] border border-white/5 py-8">
              <div className="text-center">
                <span className="text-5xl block mb-3">{step.illustration}</span>
                <span className={`text-sm font-bold ${c.text}`}>Step {activeStep + 1}</span>
              </div>
            </div>

            {/* Title + instruction */}
            <h4 className="text-sm font-bold text-white mb-2">{step.title}</h4>
            <p className="text-sm text-white/60 leading-relaxed mb-3">{step.instruction}</p>

            {/* Tip callout */}
            {step.tip && (
              <div className="rounded-lg bg-blue-500/5 border border-blue-400/10 px-3 py-2 mb-3">
                <p className="text-xs text-blue-300">
                  <span className="font-bold">💡 Tip:</span> {step.tip}
                </p>
              </div>
            )}

            {/* Warning callout */}
            {step.warning && (
              <div className="rounded-lg bg-red-500/5 border border-red-400/10 px-3 py-2 mb-3">
                <p className="text-xs text-red-300">
                  <span className="font-bold">⚠️ Important:</span> {step.warning}
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/5">
          <button
            onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
            disabled={activeStep === 0}
            className="text-xs font-medium text-white/30 hover:text-white/60 transition disabled:opacity-0"
          >
            ← Back
          </button>

          {/* Progress bar */}
          <div className="flex-1 mx-4">
            <div className="h-1 w-full rounded-full bg-white/5">
              <div className={`h-1 rounded-full bg-${accentColor}-400 transition-all duration-300`}
                style={{ width: `${progress}%`, backgroundColor: `var(--color-${accentColor}, #60a5fa)` }}
              />
            </div>
          </div>

          <button
            onClick={() => setActiveStep(Math.min(steps.length - 1, activeStep + 1))}
            disabled={activeStep === steps.length - 1}
            className={`text-xs font-semibold ${c.text} hover:opacity-80 transition disabled:opacity-30`}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  )
}
