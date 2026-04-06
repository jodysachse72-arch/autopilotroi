import Link from 'next/link'
import { hero, stats, floatingCards, partnerStrip } from '@/content/home'

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-slate-50 via-blue-50 to-white overflow-hidden pt-16 pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[520px]">

          {/* Left: Copy */}
          <div className="py-12">
            <div className="inline-flex items-center gap-2 bg-white border border-blue-100 rounded-full px-4 py-1.5 text-xs font-medium text-blue-600 mb-6 shadow-sm">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
              {hero.badge}
            </div>

            <h1 className="text-5xl lg:text-6xl font-black text-gray-900 leading-[1.05] mb-6">
              {hero.headlineLine1}<br />
              {hero.headlineLine2}{' '}
              <span className="text-blue-600">{hero.headlineAccent}</span><br />
              <span className="text-yellow-500">{hero.headlineLine3}</span>
            </h1>

            <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-lg">
              {hero.subheadline}
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-12">
              <Link
                href={hero.primaryCta.href}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors shadow-md shadow-blue-200"
              >
                {hero.primaryCta.label}
              </Link>
              <Link
                href={hero.secondaryCta.href}
                className="flex items-center gap-2 text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                <span className="w-8 h-8 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-sm text-xs">▶</span>
                {hero.secondaryCta.label}
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-black text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Robot + floating cards */}
          <div className="relative hidden lg:flex items-end justify-center h-[520px]">
            {/* Floating cards */}
            <div className="absolute top-8 left-0 bg-white rounded-2xl shadow-xl p-4 border border-gray-100 min-w-[140px]">
              <div className="text-xs text-gray-500 font-medium mb-1">{floatingCards.botStatus.label}</div>
              <div className="text-green-600 font-bold text-sm">{floatingCards.botStatus.status}</div>
              <div className="text-xs text-gray-400">{floatingCards.botStatus.sub}</div>
            </div>

            <div className="absolute top-28 right-4 bg-white rounded-2xl shadow-xl p-4 border border-gray-100 min-w-[130px]">
              <div className="text-xs text-gray-500 font-medium mb-1">{floatingCards.readinessScore.label}</div>
              <div className="text-3xl font-black text-gray-900">{floatingCards.readinessScore.value}</div>
              <div className="text-xs text-gray-400">{floatingCards.readinessScore.sub}</div>
            </div>

            <div className="absolute bottom-32 left-4 bg-yellow-400 rounded-2xl shadow-xl p-4 min-w-[150px]">
              <div className="text-xs text-yellow-900 font-medium mb-1">{floatingCards.nextInQueue.label}</div>
              <div className="text-yellow-900 font-black text-lg">{floatingCards.nextInQueue.value}</div>
              <div className="text-xs text-yellow-800">{floatingCards.nextInQueue.sub}</div>
            </div>

            {/* Robot illustration placeholder */}
            <div className="w-64 h-72 bg-gradient-to-b from-blue-500 to-blue-700 rounded-3xl flex items-center justify-center shadow-2xl mb-8 relative">
              <div className="text-8xl">🤖</div>
              <div className="absolute -top-3 right-6 w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></div>
            </div>
          </div>

        </div>
      </div>

      {/* Partner strip */}
      <div className="border-t border-gray-100 bg-white/80 backdrop-blur-sm py-4 mt-8 overflow-hidden">
        <div className="flex items-center gap-3 px-4 mb-2">
          <span className="text-xs text-gray-400 uppercase tracking-widest whitespace-nowrap font-medium">
            {partnerStrip.label}
          </span>
        </div>
        <div className="flex gap-8 animate-none overflow-x-auto scrollbar-hide px-4 pb-1">
          {[...partnerStrip.partners, ...partnerStrip.partners].map((partner, i) => (
            <span key={i} className="whitespace-nowrap text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors cursor-default">
              {partner}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
