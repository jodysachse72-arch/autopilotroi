import Link from 'next/link'

export const metadata = {
  title: 'Aurum University | AutoPilot ROI',
  description:
    'Structured video learning for Aurum Foundation members — from beginner to advanced.',
}

export default function UniversityPage() {
  return (
    <div className="min-h-screen bg-[#06122f]">
      <div className="relative overflow-hidden border-b border-white/10 bg-[linear-gradient(180deg,#0b1f57_0%,#06122f_100%)] px-6 py-16 lg:px-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,rgba(59,130,246,0.15),transparent_60%)]" />
        <div className="relative mx-auto max-w-4xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/15 px-4 py-2 text-sm font-medium text-blue-200">
            🎓 Aurum University
          </div>
          <h1 className="font-[var(--font-sora)] text-5xl font-semibold tracking-[-0.055em] text-white sm:text-6xl">
            Aurum University
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-blue-100/80">
            Structured video learning for new and existing Aurum members — from wallet setup to
            advanced bot strategy.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-6 py-16 lg:px-10 text-center">
        <div className="rounded-[2rem] border border-white/15 bg-white/6 p-12 backdrop-blur-sm">
          <div className="text-5xl">🚧</div>
          <h2 className="mt-6 font-[var(--font-sora)] text-3xl font-semibold text-white">
            Coming in Phase 2
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-lg leading-8 text-blue-100/75">
            Aurum University is being built as a full video learning hub with structured playlists
            for beginners through to advanced partners. For now, each onboarding step includes an
            embedded Aurum University video.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/start"
              className="rounded-xl border border-blue-300/40 bg-[linear-gradient(180deg,#3b82f6_0%,#2563eb_100%)] px-7 py-3 text-base font-medium text-white shadow-[0_14px_30px_rgba(37,99,235,0.35)] transition hover:brightness-110"
            >
              Begin Onboarding →
            </Link>
            <Link
              href="/resources"
              className="rounded-xl border border-white/20 bg-white/10 px-7 py-3 text-base font-medium text-white backdrop-blur-md transition hover:bg-white/15"
            >
              Browse Resources
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
