'use client'

import Link from 'next/link'
import { useState } from 'react'
import { startMeta, progressSteps, onboardingSteps, congratsMessage } from '@/content/start'

export default function StartPage() {
  const [completedSteps, setCompletedSteps] = useState<number[]>([1, 2])
  const [showCongrats, setShowCongrats] = useState(false)

  const toggleStep = (id: number) => {
    setCompletedSteps((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    )
    if (id === 6) setShowCongrats(true)
  }

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Page header */}
      <div className="bg-white border-b border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-blue-600 text-sm font-semibold uppercase tracking-widest mb-3">{startMeta.badge}</p>
          <h1 className="text-4xl lg:text-5xl font-black text-gray-900 mb-4">{startMeta.headline}</h1>
          <p className="text-lg text-gray-500 max-w-2xl">{startMeta.subheadline}</p>

          {/* Progress bar */}
          <div className="flex items-center gap-2 mt-8 overflow-x-auto pb-2">
            {progressSteps.map((step, i) => (
              <div key={step.label} className="flex items-center gap-2">
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap ${
                  step.status === 'complete' ? 'bg-green-100 text-green-700' :
                  step.status === 'current' ? 'bg-blue-600 text-white' :
                  'bg-gray-100 text-gray-400'
                }`}>
                  {step.status === 'complete' && <span>✓</span>}
                  {step.label}
                </div>
                {i < progressSteps.length - 1 && (
                  <div className="w-6 h-px bg-gray-200 shrink-0" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">

          {/* Steps */}
          <div className="lg:col-span-2 space-y-6">
            {onboardingSteps.map((step) => {
              const isComplete = completedSteps.includes(step.id)
              const isLocked = step.status === 'locked' && !completedSteps.includes(step.id - 1) && step.id > 3

              return (
                <div
                  key={step.id}
                  className={`bg-white border rounded-2xl overflow-hidden transition-all ${
                    isComplete ? 'border-green-200' :
                    step.status === 'current' ? 'border-blue-300 shadow-md shadow-blue-50' :
                    'border-gray-100'
                  }`}
                >
                  {/* Step header */}
                  <div className={`px-6 py-5 flex items-start justify-between gap-4 ${
                    isComplete ? 'bg-green-50' :
                    step.status === 'current' ? 'bg-blue-50' :
                    'bg-white'
                  }`}>
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm shrink-0 ${
                        isComplete ? 'bg-green-500 text-white' :
                        step.status === 'current' ? 'bg-blue-600 text-white' :
                        'bg-gray-100 text-gray-400'
                      }`}>
                        {isComplete ? '✓' : step.symbol}
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-gray-400 mb-0.5">Step {step.id}</div>
                        <h2 className="font-bold text-gray-900">{step.title}</h2>
                        <p className="text-sm text-gray-500">{step.subtitle}</p>
                      </div>
                    </div>
                    {isComplete && (
                      <span className="shrink-0 text-xs font-semibold text-green-600 bg-green-100 px-2.5 py-1 rounded-full">✓ Done</span>
                    )}
                    {step.status === 'locked' && !isComplete && (
                      <span className="shrink-0 text-xs font-semibold text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full">🔒 Next</span>
                    )}
                    {step.status === 'current' && (
                      <span className="shrink-0 text-xs font-semibold text-blue-600 bg-blue-100 px-2.5 py-1 rounded-full">In Progress</span>
                    )}
                  </div>

                  {/* Step body */}
                  <div className="px-6 pb-6 pt-5 space-y-5">

                    {step.videoLabel && (
                      <div className="bg-gray-900 text-white rounded-xl p-4 flex items-center gap-3">
                        <span className="text-2xl">📹</span>
                        <div>
                          <div className="text-xs text-gray-400 font-medium">{step.videoLabel}</div>
                          <div className="text-sm font-semibold">{step.videoNote}</div>
                        </div>
                      </div>
                    )}

                    {step.warning && (
                      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
                        ⚠️ {step.warning}
                      </div>
                    )}

                    {step.why && (
                      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-blue-800">
                        <span className="font-semibold">ℹ️ Why?</span> {step.why}
                      </div>
                    )}

                    {step.link && (
                      <Link
                        href={step.link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm border border-blue-200 bg-blue-50 rounded-xl px-4 py-3 hover:bg-blue-100 transition-colors"
                      >
                        🔗 {step.link.label} →
                      </Link>
                    )}

                    {/* Instructions */}
                    <ol className="space-y-4">
                      {step.instructions.map((instruction, i) => (
                        <li key={i} className="flex gap-3">
                          <span className="w-6 h-6 bg-gray-100 text-gray-600 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                            {i + 1}
                          </span>
                          <div className="text-sm text-gray-700 leading-relaxed">
                            {instruction.text}
                            {instruction.warning && (
                              <div className="mt-2 text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 text-xs">
                                ⚠️ {instruction.warning}
                              </div>
                            )}
                            {instruction.tip && (
                              <div className="mt-2 text-blue-700 bg-blue-50 rounded-lg px-3 py-2 text-xs">
                                💡 {instruction.tip}
                              </div>
                            )}
                          </div>
                        </li>
                      ))}
                    </ol>

                    {step.resources && step.resources.length > 0 && (
                      <div className="space-y-2">
                        {step.resources.map((resource) => (
                          <Link
                            key={resource.title}
                            href={resource.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 border border-gray-100 rounded-xl p-3 hover:border-blue-200 hover:bg-blue-50 transition-colors group"
                          >
                            <span className="text-xl">{resource.icon}</span>
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-semibold text-gray-900 truncate">{resource.title}</div>
                              <div className="text-xs text-gray-400">{resource.source}</div>
                            </div>
                            <span className="text-blue-400 group-hover:text-blue-600 text-sm">→</span>
                          </Link>
                        ))}
                      </div>
                    )}

                    {/* Complete button */}
                    <button
                      onClick={() => toggleStep(step.id)}
                      className={`w-full py-3 rounded-xl font-semibold text-sm transition-colors ${
                        isComplete
                          ? 'bg-green-100 text-green-700 hover:bg-green-200'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      {isComplete
                        ? `✓ ${step.id === 6 ? 'Confirmed!' : 'Step Complete'}`
                        : step.id === 6
                        ? "I've Confirmed with My Partner ✦"
                        : `My ${step.title.split(' ')[step.title.split(' ').length - 1]} is Ready ✓`
                      }
                    </button>
                  </div>
                </div>
              )
            })}

            {/* Congrats */}
            {showCongrats && (
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-2xl p-8 text-center">
                <h2 className="text-3xl font-black mb-3">{congratsMessage.headline}</h2>
                <p className="text-blue-100 mb-6">{congratsMessage.body}</p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <Link href={congratsMessage.cta.href} className="bg-white text-blue-700 font-bold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors">
                    {congratsMessage.cta.label}
                  </Link>
                  <Link href={congratsMessage.secondaryCta.href} className="text-blue-100 hover:text-white font-medium underline underline-offset-2">
                    {congratsMessage.secondaryCta.label}
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Your Steps summary */}
            <div className="bg-white border border-gray-100 rounded-2xl p-5 sticky top-24">
              <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wide">Your Steps</h3>
              <div className="space-y-2">
                {onboardingSteps.map((step) => {
                  const done = completedSteps.includes(step.id)
                  return (
                    <div key={step.id} className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm ${
                      done ? 'bg-green-50 text-green-700' :
                      step.status === 'current' ? 'bg-blue-50 text-blue-700' :
                      'text-gray-400'
                    }`}>
                      <span className="font-bold">{done ? '✓' : step.symbol}</span>
                      <div>
                        <div className="font-semibold">{step.title}</div>
                        <div className="text-xs opacity-70">{step.subtitle}</div>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="mt-5 pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-500 mb-3">{startMeta.partnerNote}</p>
                <Link
                  href={startMeta.partnerCta.href}
                  className="block text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-4 py-2.5 rounded-xl transition-colors"
                >
                  {startMeta.partnerCta.label}
                </Link>
              </div>
            </div>

            {/* University note */}
            <div className="bg-gray-900 text-white rounded-2xl p-5">
              <div className="text-2xl mb-2">📹</div>
              <h3 className="font-bold mb-2 text-sm">Aurum University</h3>
              <p className="text-gray-400 text-xs leading-relaxed">{startMeta.universityNote}</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
