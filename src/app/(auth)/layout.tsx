import Link from 'next/link'
import Logo from '@/components/ui/Logo'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      {/* Logo */}
      <Link href="/" className="mb-8">
        <Logo size={40} showText />
      </Link>

      {children}
    </div>
  )
}
