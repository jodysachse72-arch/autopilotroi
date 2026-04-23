import Link from 'next/link'
import Logo from '@/components/ui/Logo'
import '@/styles/backend.css'

/* ══════════════════════════════════════════════════════════════
   AUTH LAYOUT — premium centered shell.
   .be-shell is here so form primitives pick up backend.css styles.
   ══════════════════════════════════════════════════════════════ */

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="be-shell min-h-screen flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #f0f4ff 0%, #eef2fa 40%, #e8f0fe 100%)' }}>

      {/* Background orbs */}
      <div className="pointer-events-none absolute inset-0" aria-hidden style={{
        backgroundImage: `
          radial-gradient(circle at 20% 20%, rgba(27,97,201,0.09) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(45,127,249,0.07) 0%, transparent 50%)
        `,
      }} />
      <div className="pointer-events-none absolute inset-0 opacity-[0.022]" aria-hidden style={{
        backgroundImage: `linear-gradient(rgba(27,97,201,1) 1px, transparent 1px), linear-gradient(90deg, rgba(27,97,201,1) 1px, transparent 1px)`,
        backgroundSize: '40px 40px',
      }} />
      <div className="pointer-events-none absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full" aria-hidden
        style={{ background: 'radial-gradient(circle, rgba(27,97,201,0.10) 0%, transparent 70%)', filter: 'blur(60px)' }} />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[400px] w-[400px] rounded-full" aria-hidden
        style={{ background: 'radial-gradient(circle, rgba(45,127,249,0.08) 0%, transparent 70%)', filter: 'blur(60px)' }} />

      {/* Logo */}
      <Link href="/" className="relative mb-8 block">
        <Logo size={40} showText textColorClass="text-[#0f172a]" />
      </Link>

      {/* Card wrapper */}
      <div className="relative w-full max-w-md">{children}</div>

      {/* Footer */}
      <p className="relative mt-8 text-xs text-center" style={{ color: 'rgba(15,23,42,0.38)' }}>
        © 2026 AutopilotROI · AI-powered partner onboarding
      </p>
    </div>
  )
}
