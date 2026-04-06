import { whyJoin } from '@/content/home'

export default function WhyJoin() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="mb-14">
          <p className="text-blue-600 text-sm font-semibold uppercase tracking-widest mb-3">{whyJoin.eyebrow}</p>
          <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-4 max-w-2xl">{whyJoin.headline}</h2>
          <p className="text-lg text-gray-500 max-w-2xl">{whyJoin.body}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {whyJoin.cards.map((card) => (
            <div
              key={card.id}
              className="bg-gray-50 hover:bg-blue-50 border border-gray-100 hover:border-blue-200 rounded-2xl p-6 transition-all group"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-2xl">{card.icon}</span>
                <span className="text-xs font-bold text-gray-300 group-hover:text-blue-200 transition-colors">{card.id}</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{card.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{card.body}</p>
              {card.badge && (
                <span className="inline-block mt-3 text-xs font-semibold text-blue-600 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-full">
                  {card.badge}
                </span>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
