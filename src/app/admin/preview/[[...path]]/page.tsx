'use client'

/**
 * Draft Preview Page
 *
 * Renders the current draft (or published) content exactly as visitors would see it,
 * with a subtle preview banner at the top. Used by the "Preview Draft" button in the editor.
 *
 * URL: /admin/preview/[[...path]]
 *
 * SAFETY:
 *   - Read-only — no write operations
 *   - noindex meta — search engines won't index previews
 *   - Uses draft_data if available, falls back to published data
 *   - Preview banner is clearly visible but non-intrusive
 */

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import PuckPageRenderer from '@/components/puck/PuckPageRenderer'
import type { Data } from '@puckeditor/core'

export default function PreviewPage() {
  const params = useParams()
  const pathSegments = params.path as string[] | undefined
  const pagePath = pathSegments ? '/' + pathSegments.join('/') : '/'

  const [data, setData] = useState<Data | null>(null)
  const [isDraft, setIsDraft] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Add noindex meta tag
    const meta = document.createElement('meta')
    meta.name = 'robots'
    meta.content = 'noindex, nofollow'
    document.head.appendChild(meta)

    return () => {
      document.head.removeChild(meta)
    }
  }, [])

  useEffect(() => {
    setLoading(true)
    setError(null)

    fetch(`/api/puck?path=${encodeURIComponent(pagePath)}&preview=true`)
      .then((res) => {
        if (!res.ok) throw new Error('Page not found')
        return res.json()
      })
      .then((result) => {
        if (result?.data) {
          setData(result.data)
          setIsDraft(result.isDraft ?? false)
        } else {
          setError('No content found for this page.')
        }
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message || 'Failed to load preview.')
        setLoading(false)
      })
  }, [pagePath])

  if (loading) {
    return (
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', height: '100vh', fontFamily: 'system-ui',
        background: '#f8fafc', gap: '1rem',
      }}>
        <div style={{
          width: 40, height: 40, border: '3px solid #e2e8f0',
          borderTopColor: '#3b82f6', borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
        <p style={{ fontSize: '1rem', color: '#64748b' }}>
          Loading preview for <strong>{pagePath}</strong>
        </p>
      </div>
    )
  }

  if (error) {
    return (
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', height: '100vh', fontFamily: 'system-ui',
        background: '#f8fafc', gap: '1rem',
      }}>
        <div style={{ fontSize: 48 }}>⚠️</div>
        <p style={{ fontSize: '1rem', color: '#64748b' }}>{error}</p>
        <a href={`/admin/edit${pagePath === '/' ? '' : pagePath}`}
          style={{ color: '#3b82f6', textDecoration: 'underline' }}>
          Back to editor
        </a>
      </div>
    )
  }

  return (
    <>
      {/* Preview banner */}
      <div style={{
        position: 'sticky',
        top: 0,
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.75rem',
        padding: '8px 16px',
        background: isDraft
          ? 'linear-gradient(90deg, #fef3c7 0%, #fde68a 100%)'
          : 'linear-gradient(90deg, #dcfce7 0%, #bbf7d0 100%)',
        borderBottom: isDraft
          ? '1px solid #f59e0b'
          : '1px solid #22c55e',
        fontFamily: 'system-ui',
        fontSize: '13px',
        fontWeight: 600,
        color: isDraft ? '#92400e' : '#166534',
      }}>
        <span>{isDraft ? '📝' : '✅'}</span>
        <span>
          {isDraft
            ? 'PREVIEW — You are viewing an unpublished draft. This is not visible to visitors.'
            : 'PREVIEW — You are viewing the published version. This is what visitors see.'}
        </span>
        <a
          href={`/admin/edit${pagePath === '/' ? '' : pagePath}`}
          style={{
            padding: '4px 12px',
            borderRadius: 6,
            background: isDraft ? '#92400e' : '#166534',
            color: '#fff',
            textDecoration: 'none',
            fontSize: 12,
            fontWeight: 600,
          }}
        >
          ← Back to Editor
        </a>
      </div>

      {/* Page content */}
      <PuckPageRenderer
        data={data!}
        fallback={
          <div style={{
            padding: '4rem 2rem', textAlign: 'center',
            fontFamily: 'system-ui', color: '#64748b',
          }}>
            <p>This page has no content to preview.</p>
          </div>
        }
      />
    </>
  )
}
