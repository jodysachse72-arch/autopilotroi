import { announcementBanner } from '@/content/shared'
import Link from 'next/link'

export default function AnnouncementBanner() {
  return (
    <div className="bg-blue-600 text-white text-sm py-2 px-4 text-center">
      <span className="mr-1">{announcementBanner.emoji}</span>
      {announcementBanner.text}{' '}
      <Link href={announcementBanner.ctaHref} className="font-semibold underline underline-offset-2 hover:text-blue-100 transition-colors">
        →{announcementBanner.ctaLabel}
      </Link>
    </div>
  )
}
