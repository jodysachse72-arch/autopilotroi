import Link from 'next/link'
import { brand, footer } from '@/content/shared'

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 py-10 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">

        {/* Brand */}
        <Link href={brand.logoHref} className="flex items-center gap-2">
          <div className="w-7 h-7 bg-blue-600 rounded-md flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
              <path d="M9 2L14 7H10V12H8V7H4L9 2Z" fill="white"/>
              <path d="M4 12H14V14H4V12Z" fill="white" opacity="0.7"/>
            </svg>
          </div>
          <span className="text-white font-semibold text-sm">{brand.name}</span>
        </Link>

        {/* Nav links */}
        <div className="flex flex-wrap items-center justify-center gap-5">
          {footer.links.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm hover:text-white transition-colors">
              {item.label}
            </Link>
          ))}
        </div>

        {/* Copyright */}
        <p className="text-xs text-gray-500 text-center">{footer.copyright}</p>

      </div>
    </footer>
  )
}
