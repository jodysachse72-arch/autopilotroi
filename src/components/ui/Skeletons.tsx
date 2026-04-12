/**
 * Reusable skeleton components for loading states.
 * Use these in loading.tsx files or as fallbacks for Suspense boundaries.
 */

export function SkeletonLine({ className = '' }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-lg bg-white/[0.06] ${className}`}
    />
  )
}

export function SkeletonCard() {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
      <div className="aspect-video animate-pulse bg-white/[0.06]" />
      <div className="space-y-3 p-5">
        <SkeletonLine className="h-4 w-3/4" />
        <SkeletonLine className="h-3 w-full" />
        <SkeletonLine className="h-3 w-2/3" />
      </div>
    </div>
  )
}

export function SkeletonVideoGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  )
}

export function SkeletonProductCard() {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6">
      <div className="mb-4 h-12 w-12 animate-pulse rounded-xl bg-white/[0.06]" />
      <SkeletonLine className="mb-3 h-5 w-1/2" />
      <SkeletonLine className="mb-2 h-3 w-full" />
      <SkeletonLine className="mb-2 h-3 w-4/5" />
      <SkeletonLine className="h-3 w-3/5" />
    </div>
  )
}

export function SkeletonHero() {
  return (
    <div className="relative overflow-hidden border-b border-white/10 bg-[linear-gradient(180deg,#0b1f57_0%,#06122f_100%)] px-6 py-16 lg:px-10">
      <div className="mx-auto max-w-4xl text-center space-y-4">
        <SkeletonLine className="mx-auto h-8 w-32" />
        <SkeletonLine className="mx-auto h-12 w-3/4" />
        <SkeletonLine className="mx-auto h-5 w-2/3" />
      </div>
    </div>
  )
}

export function SkeletonPage() {
  return (
    <div className="min-h-screen bg-[#06122f]">
      <SkeletonHero />
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
        <SkeletonVideoGrid />
      </div>
    </div>
  )
}
