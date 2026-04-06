import { testimonials } from '@/content/home'

export default function Testimonials() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-14">
          <p className="text-blue-600 text-sm font-semibold uppercase tracking-widest mb-3">{testimonials.eyebrow}</p>
          <h2 className="text-4xl font-black text-gray-900 mb-2">{testimonials.headline}</h2>
          <p className="text-lg text-gray-500">{testimonials.subheadline}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.items.map((item) => (
            <div key={item.name} className="bg-gray-50 border border-gray-100 rounded-2xl p-6">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400">★</span>
                ))}
              </div>
              <p className="text-gray-700 leading-relaxed mb-6 italic">&ldquo;{item.quote}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  {item.initials}
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">{item.name}</div>
                  <div className="text-gray-400 text-xs">{item.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
