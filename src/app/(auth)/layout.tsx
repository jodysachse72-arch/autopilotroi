import Link from 'next/link'
import Logo from '@/components/ui/Logo'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-12"
      style={{ background: '#f8fafc' }}
    >
      {/* Logo */}
      <Link href="/" className="mb-8 block">
        <Logo size={38} showText textColorClass="text-[#181d26]" />
      </Link>

      {children}

      {/* Footer note */}
      <p className="mt-8 text-xs text-center" style={{ color: 'rgba(4,14,32,0.35)' }}>
        © 2026 AutopilotROI · Independent onboarding platform for the Aurum ecosystem
      </p>
    </div>
  )
}
