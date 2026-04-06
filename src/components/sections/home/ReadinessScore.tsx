import Link from 'next/link'
import { readinessScore } from '@/content/home'

export default function ReadinessScore() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          <div>
            <p className="text-blue-600 text-sm font-semibold uppercase tracking-widest mb-3">{readinessScore.eyebrow}</p>
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6">{readinessScore.headline}</h2>
            <p className="text-lg text-gray-500 leading-relaxed mb-8">{readinessScore.body}</p>
            <Link
              href={readinessScore.cta.href}
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              {readinessScore.cta.label}
            </Link>
          </div>

          {/* Score visual */}
          <div className="bg-gray-50 border border-gray-100 rounded-3xl p-8">
            <div className="flex items-center justify-between mb-6">
              <span className="text-sm font-semibold text-gray-500">Readiness Score</span>
              <div className="text-right">
                <div className="text-5xl font-black text-gray-900">{readinessScore.exampleScore.value}</div>
                <div className="text-blue-600 font-semibold text-sm">{readinessScore.exampleScore.label}</div>
              </div>
            </div>

            {/* Score bar */}
            <div className="flex rounded-full overflow-hidden h-3 mb-6 bg-gray-200">
              <div className="bg-gray-300 flex-1" />
              <div className="bg-blue-300 flex-1" />
              <div className="bg-blue-500 flex-1" />
              <div className="bg-blue-700 flex-1" />
            </div>

            {/* Tiers */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {readinessScore.tiers.map((tier, i) => (
                <div
                  key={tier.label}
                  className={`text-center rounded-xl p-3 ${
                    tier.label === readinessScore.exampleScore.label
                      ? 'bg-blue-600 text-white'
                      : 'bg-white border border-gray-200 text-gray-600'
                  }`}
                >
                  <div className="font-bold text-sm">{tier.label}</div>
                  <div className={`text-xs ${tier.label === readinessScore.exampleScore.label ? 'text-blue-100' : 'text-gray-400'}`}>
                    {tier.range}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
