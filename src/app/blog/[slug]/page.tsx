import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPostBySlugServer, getPublishedBlogsServer } from '@/lib/cms/server-adapter'

export const revalidate = 60

// Pre-generate known slugs at build time
export async function generateStaticParams() {
  try {
    const posts = await getPublishedBlogsServer()
    return posts
      .filter(p => p.slug)
      .map(p => ({ slug: p.slug! }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPostBySlugServer(slug)
  if (!post) return { title: 'Post Not Found | AutoPilot ROI' }
  return {
    title: `${post.title} | AutoPilot ROI`,
    description: post.meta?.excerpt as string | undefined,
  }
}

function formatDate(dateStr?: string | null): string {
  if (!dateStr) return ''
  try { return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) }
  catch { return dateStr }
}

const CATEGORY_COLORS: Record<string, { bg: string; color: string }> = {
  'education':         { bg: 'rgba(27,97,201,0.08)',  color: '#1b61c9' },
  'product-updates':   { bg: 'rgba(124,58,237,0.08)', color: '#7c3aed' },
  'announcements':     { bg: 'rgba(16,185,129,0.08)', color: '#059669' },
  'partner-resources': { bg: 'rgba(245,158,11,0.08)', color: '#d97706' },
  'market-insights':   { bg: 'rgba(6,182,212,0.08)',  color: '#0891b2' },
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPostBySlugServer(slug)

  if (!post) notFound()

  const cat = post.meta?.category as string | undefined
  const cc = (cat && CATEGORY_COLORS[cat]) || { bg: 'rgba(4,14,32,0.06)', color: 'rgba(4,14,32,0.55)' }
  const author = post.meta?.author as string | undefined
  const publishedAt = (post.meta?.publishedAt as string | undefined) ?? post.publish_at
  const excerpt = post.meta?.excerpt as string | undefined

  return (
    <div className="min-h-screen" style={{ background: '#f8fafc' }}>

      {/* Header bar */}
      <div style={{ background: '#fff', borderBottom: '1px solid #e0e2e6' }} className="px-6 py-4">
        <div className="mx-auto max-w-4xl">
          <Link href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium transition-colors hover:text-[#1b61c9]"
            style={{ color: 'rgba(4,14,32,0.50)' }}>
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Back to Blog
          </Link>
        </div>
      </div>

      {/* Article */}
      <article className="mx-auto max-w-4xl px-6 py-12 lg:px-10">

        {/* Meta header */}
        <div className="mb-8">
          {cat && (
            <span className="inline-block rounded-full px-4 py-1.5 text-xs font-bold capitalize mb-5"
              style={{ background: cc.bg, color: cc.color, border: `1px solid ${cc.color}20` }}>
              {cat.replace(/-/g, ' ')}
            </span>
          )}

          <h1 className="text-3xl font-bold lg:text-4xl xl:text-5xl mb-6"
            style={{ color: '#181d26', letterSpacing: '-0.03em', lineHeight: 1.15 }}>
            {post.title}
          </h1>

          {excerpt && (
            <p className="text-lg leading-relaxed mb-6" style={{ color: 'rgba(4,14,32,0.60)' }}>
              {excerpt}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-4 pb-6 text-sm"
            style={{ color: 'rgba(4,14,32,0.45)', borderBottom: '1px solid #e0e2e6' }}>
            {author && (
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full font-bold text-xs text-white"
                  style={{ background: '#1b61c9' }}>
                  {author.charAt(0)}
                </div>
                <span className="font-medium" style={{ color: '#181d26' }}>{author}</span>
              </div>
            )}
            {publishedAt && (
              <>
                <span>·</span>
                <span>{formatDate(publishedAt)}</span>
              </>
            )}
          </div>
        </div>

        {/* Rich content body */}
        {post.body_html ? (
          <div
            className="cms-content"
            dangerouslySetInnerHTML={{ __html: post.body_html }}
          />
        ) : (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-8 text-center">
            <div className="text-3xl mb-3">✍️</div>
            <p className="text-sm font-medium text-amber-800">
              This post is available in the Content Editor but full article text hasn&apos;t been written yet.
            </p>
            <p className="mt-2 text-xs text-amber-700">
              Visit <strong>Admin → Content Editor</strong> to add the full article body.
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="mt-16 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between pt-8"
          style={{ borderTop: '1px solid #e0e2e6' }}>
          <Link href="/blog"
            className="inline-flex items-center gap-2 rounded-xl border border-[#e0e2e6] bg-white px-5 py-2.5 text-sm font-semibold transition hover:border-[#1b61c9] hover:text-[#1b61c9]"
            style={{ color: '#181d26' }}>
            ← All Posts
          </Link>
          <Link href="/signup"
            className="inline-flex items-center rounded-xl px-6 py-2.5 text-sm font-bold text-white transition hover:opacity-90"
            style={{ background: '#1b61c9' }}>
            Begin Onboarding →
          </Link>
        </div>
      </article>
    </div>
  )
}
