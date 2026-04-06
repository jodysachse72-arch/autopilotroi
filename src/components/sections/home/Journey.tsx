import { journey } from '@/content/home'

export default function Journey() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-14">
          <p className="text-blue-600 text-sm font-semibold uppercase tracking-widest mb-3">{journey.eyebrow}</p>
          <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-4 whitespace-pre-line">{journey.headline}</h2>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">{journey.subheadline}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {journey.steps.map((step, index) => (
            <div key={step.number} className="relative">
              {/* Connector line */}
              {index < journey.steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-blue-200 z-0" style={{width: 'calc(100% - 2rem)'}} />
              )}
              <div className="relative z-10 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center font-black text-lg mb-4 shadow-lg shadow-blue-200">
                  {step.number}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{step.body}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
