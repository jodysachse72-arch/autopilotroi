import Link from 'next/link'
import Logo from '@/components/ui/Logo'

/* ══════════════════════════════════════════════════════════════
   AUTH LAYOUT — Premium centered auth shell.
   Blue brand gradient background with pattern overlay.
   ══════════════════════════════════════════════════════════════ */

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #f0f4ff 0%, #eef2fa 40%, #e8f0fe 100%)',
      }}
    >
      {/* Background pattern */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 20%, rgba(27,97,201,0.08) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(45,127,249,0.06) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(27,97,201,0.03) 0%, transparent 70%)
          `,
        }}
      />

      {/* Grid pattern overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        aria-hidden
        style={{
          backgroundImage: `
            linear-gradient(rgba(27,97,201,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(27,97,201,1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Blue accent orbs */}
      <div
        className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(27,97,201,0.12) 0%, transparent 70%)', filter: 'blur(40px)' }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(45,127,249,0.10) 0%, transparent 70%)', filter: 'blur(40px)' }}
        aria-hidden
      />

      {/* Logo */}
      <Link href="/" className="relative mb-8 block">
        <Logo size={40} showText textColorClass="text-[#181d26]" />
      </Link>

      {/* Content card wrapper */}
      <div className="relative w-full max-w-md">
        {children}
      </div>

      {/* Footer note */}
      <p className="relative mt-8 text-xs text-center" style={{ color: 'rgba(4,14,32,0.40)' }}>
        © 2026 AutopilotROI · Independent onboarding platform for the Aurum ecosystem
      </p>
    </div>
  )
}
