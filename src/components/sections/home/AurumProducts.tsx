import { aurumProducts } from '@/content/home'

export default function AurumProducts() {
  return (
    <section className="py-24 bg-gradient-to-br from-blue-700 via-blue-600 to-blue-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          <div>
            <p className="text-blue-200 text-sm font-semibold uppercase tracking-widest mb-3">{aurumProducts.eyebrow}</p>
            <h2 className="text-4xl lg:text-5xl font-black leading-tight mb-6 whitespace-pre-line">
              {aurumProducts.headline}
            </h2>
            <p className="text-blue-100 text-lg leading-relaxed">{aurumProducts.subheadline}</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {aurumProducts.products.map((product) => (
              <div key={product.title} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5 hover:bg-white/15 transition-colors">
                <span className="text-2xl mb-3 block">{product.icon}</span>
                <h3 className="font-bold text-white mb-2 text-sm">{product.title}</h3>
                <p className="text-blue-100 text-sm leading-relaxed">{product.body}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
