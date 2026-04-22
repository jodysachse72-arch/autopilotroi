import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPostBySlugServer, getPublishedBlogsServer } from '@/lib/cms/server-adapter'
import { PageShell, SectionBox } from '@/components/sections'

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
    title: post.title + ' | AutoPilot ROI',
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
    <PageShell>
      {/* Back nav bar */}
      <div style={{ background: '#ffffff', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container-xl" style={{ padding: '1rem 1.5rem' }}>
          <Link
            href="/blog"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              fontSize: 'var(--text-body)', fontWeight: 500,
              color: 'var(--color-text-muted)',
              textDecoration: 'none',
              transition: 'color 150ms ease',
            }}
          >
            <svg style={{ width: '1rem', height: '1rem' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Back to Blog
          </Link>
        </div>
      </div>

      {/* Article */}
      <SectionBox variant="white" padding="lg">
        <article style={{ maxWidth: '48rem', margin: '0 auto' }}>

          {/* Meta header */}
          <div style={{ marginBottom: '2rem' }}>
            {cat && (
              <span style={{
                display: 'inline-block',
                background: cc.bg,
                color: cc.color,
                border: '1px solid ' + cc.color + '25',
                borderRadius: '99px',
                padding: '0.375rem 1rem',
                fontSize: 'var(--text-caption)',
                fontWeight: 700,
                textTransform: 'capitalize',
                marginBottom: '1.25rem',
              }}>
                {cat.replace(/-/g, ' ')}
              </span>
            )}

            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
              fontWeight: 800,
              color: '#181d26',
              letterSpacing: '-0.03em',
              lineHeight: 1.15,
              marginBottom: '1.25rem',
            }}>
              {post.title}
            </h1>

            {excerpt && (
              <p style={{
                fontSize: 'var(--text-body-lg)',
                lineHeight: 'var(--lh-relaxed)',
                color: 'var(--color-text-weak)',
                marginBottom: '1.5rem',
              }}>
                {excerpt}
              </p>
            )}

            <div style={{
              display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.75rem',
              paddingBottom: '1.5rem',
              color: 'var(--color-text-muted)',
              borderBottom: '1px solid var(--color-border)',
              fontSize: 'var(--text-body)',
            }}>
              {author && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    width: '2rem', height: '2rem',
                    borderRadius: '50%',
                    background: '#1b61c9',
                    fontFamily: 'var(--font-display)', fontWeight: 700,
                    fontSize: 'var(--text-caption)', color: '#fff',
                  }}>
                    {author.charAt(0)}
                  </div>
                  <span style={{ fontWeight: 600, color: '#181d26' }}>{author}</span>
                </div>
              )}
              {publishedAt && (
                <>
                  <span>\u00b7</span>
                  <span>{formatDate(publishedAt)}</span>
                </>
              )}
            </div>
          </div>

          {/* Rich content body */}
          {post.body_html ? (
            <div className="cms-content" dangerouslySetInnerHTML={{ __html: post.body_html }} />
          ) : (
            <div style={{
              background: 'rgba(245,158,11,0.06)',
              border: '1px solid rgba(245,158,11,0.25)',
              borderRadius: 'var(--radius-card)',
              padding: '2rem',
              textAlign: 'center',
            }}>
              <p style={{ fontSize: 'var(--text-body)', fontWeight: 600, color: '#92400e' }}>
                This post is available in the Content Editor but full article text hasn&apos;t been written yet.
              </p>
              <p style={{ marginTop: '0.5rem', fontSize: 'var(--text-caption)', color: '#b45309' }}>
                Visit <strong>Admin \u2192 Content Editor</strong> to add the full article body.
              </p>
            </div>
          )}

          {/* Article footer */}
          <div style={{
            display: 'flex', flexWrap: 'wrap', gap: '0.875rem',
            alignItems: 'center', justifyContent: 'space-between',
            marginTop: '4rem', paddingTop: '2rem',
            borderTop: '1px solid var(--color-border)',
          }}>
            <Link href="/blog" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.375rem',
              padding: '0.6875rem 1.25rem',
              background: '#ffffff',
              border: '1.5px solid var(--color-border)',
              borderRadius: 'var(--radius-btn)',
              fontFamily: 'var(--font-display)', fontWeight: 600,
              fontSize: 'var(--text-body)',
              color: '#181d26',
              textDecoration: 'none',
              transition: 'border-color 150ms ease',
            }}>
              \u2190 All Posts
            </Link>
            <Link href="/signup" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.375rem',
              padding: '0.6875rem 1.5rem',
              background: 'linear-gradient(135deg, #2563eb 0%, #1b61c9 100%)',
              borderRadius: 'var(--radius-btn)',
              fontFamily: 'var(--font-display)', fontWeight: 700,
              fontSize: 'var(--text-body)',
              color: '#ffffff',
              textDecoration: 'none',
              boxShadow: '0 4px 16px rgba(27,97,201,0.35)',
            }}>
              Begin Onboarding \u2192
            </Link>
          </div>
        </article>
      </SectionBox>
    </PageShell>
  )
}
