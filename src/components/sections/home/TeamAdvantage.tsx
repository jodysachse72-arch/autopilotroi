import { teamAdvantage } from '@/content/home'

export default function TeamAdvantage() {
  return (
    <section className="py-24 bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-blue-400 text-sm font-semibold uppercase tracking-widest mb-3">{teamAdvantage.eyebrow}</p>
            <h2 className="text-4xl lg:text-5xl font-black leading-tight mb-4 whitespace-pre-line">{teamAdvantage.headline}</h2>
            <p className="text-gray-400 text-lg leading-relaxed">{teamAdvantage.subheadline}</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {teamAdvantage.benefits.map((benefit) => (
              <div key={benefit.title} className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/8 transition-colors">
                <span className="text-xl mb-3 block">{benefit.icon}</span>
                <h3 className="font-bold text-white mb-2 text-sm">{benefit.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{benefit.body}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
