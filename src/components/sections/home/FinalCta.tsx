import Link from 'next/link'
import { finalCta } from '@/content/home'

export default function FinalCta() {
  return (
    <section className="py-24 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        <h2 className="text-4xl lg:text-5xl font-black mb-4">{finalCta.headline}</h2>
        <p className="text-xl font-bold text-blue-100 mb-3 whitespace-pre-line">{finalCta.subheadline}</p>
        <p className="text-blue-200 text-lg mb-10">{finalCta.body}</p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href={finalCta.primaryCta.href}
            className="bg-white text-blue-700 hover:bg-blue-50 font-bold px-8 py-4 rounded-xl transition-colors shadow-lg"
          >
            {finalCta.primaryCta.label}
          </Link>
          <Link
            href={finalCta.secondaryCta.href}
            className="text-blue-100 hover:text-white font-medium transition-colors underline underline-offset-2"
          >
            {finalCta.secondaryCta.label}
          </Link>
        </div>

      </div>
    </section>
  )
}
