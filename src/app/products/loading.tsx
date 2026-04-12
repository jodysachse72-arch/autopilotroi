import { SkeletonHero, SkeletonProductCard } from '@/components/ui/Skeletons'

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#06122f]">
      <SkeletonHero />
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
        <div className="grid gap-6 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonProductCard key={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
