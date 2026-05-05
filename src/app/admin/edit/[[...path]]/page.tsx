'use client'

/**
 * Puck Visual Editor — Production Admin Route
 *
 * Features:
 * - Page switcher dropdown (all site pages)
 * - Responsive viewports (mobile / tablet / desktop)
 * - Iframe isolation for CSS encapsulation
 * - Auto-save indicator
 * - Proper publish flow with toast notifications
 */

import { useEffect, useState, useCallback, useMemo } from 'react'
import { Puck, type Data } from '@puckeditor/core'
import { puckConfig } from '@/puck.config'
import '@puckeditor/core/puck.css'

type PageEntry = { path: string; saved: boolean; updated_at: string | null }

export default function PuckEditorPage({
  params,
}: {
  params: Promise<{ path?: string[] }>
}) {
  const [pagePath, setPagePath] = useState<string>('/')
  const [initialData, setInitialData] = useState<Data | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saved' | 'error'>('idle')
  const [pages, setPages] = useState<PageEntry[]>([])
  const [newPagePath, setNewPagePath] = useState('')
  const [showNewPage, setShowNewPage] = useState(false)

  // Resolve page path from route params
  useEffect(() => {
    params.then((resolved) => {
      const path = resolved.path ? '/' + resolved.path.join('/') : '/'
      setPagePath(path)
    })
  }, [params])

  // Load pages list
  useEffect(() => {
    fetch('/api/puck?list=true')
      .then((r) => r.json())
      .then((data) => setPages(data || []))
      .catch(() => {})
  }, [saveStatus])

  // Load page data when path changes
  useEffect(() => {
    if (!pagePath) return
    setLoading(true)
    setSaveStatus('idle')

    fetch(`/api/puck?path=${encodeURIComponent(pagePath)}`)
      .then((res) => {
        if (res.ok) return res.json()
        return null
      })
      .then((data) => {
        setInitialData(data || { content: [], root: { props: { title: '' } } })
        setLoading(false)
      })
      .catch(() => {
        setInitialData({ content: [], root: { props: { title: '' } } })
        setLoading(false)
      })
  }, [pagePath])

  // Publish handler
  const handlePublish = useCallback(
    async (data: Data) => {
      setSaving(true)
      setSaveStatus('idle')
      try {
        const res = await fetch('/api/puck', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ path: pagePath, data }),
        })
        if (res.ok) {
          setSaveStatus('saved')
          setTimeout(() => setSaveStatus('idle'), 3000)
        } else {
          setSaveStatus('error')
        }
      } catch {
        setSaveStatus('error')
      } finally {
        setSaving(false)
      }
    },
    [pagePath]
  )

  // Navigate to different page
  const switchPage = useCallback((newPath: string) => {
    window.location.href = `/admin/edit${newPath === '/' ? '' : newPath}`
  }, [])

  // Create new page
  const createPage = useCallback(() => {
    if (!newPagePath) return
    const path = newPagePath.startsWith('/') ? newPagePath : `/${newPagePath}`
    setShowNewPage(false)
    setNewPagePath('')
    switchPage(path)
  }, [newPagePath, switchPage])

  // Viewports
  const viewports = useMemo(() => [
    { width: 360, height: 'auto' as const, label: '📱 Mobile', icon: '📱' },
    { width: 768, height: 'auto' as const, label: '📱 Tablet', icon: '📱' },
    { width: 1280, height: 'auto' as const, label: '🖥️ Desktop', icon: '🖥️' },
  ], [])

  // Loading state
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
          Loading editor for <strong>{pagePath}</strong>
        </p>
      </div>
    )
  }

  return (
    <>
      {/* Save status toast */}
      {saveStatus === 'saved' && (
        <div style={{
          position: 'fixed', bottom: 24, right: 24, zIndex: 99999,
          background: '#059669', color: '#fff', padding: '12px 24px',
          borderRadius: 8, fontFamily: 'system-ui', fontSize: 14,
          fontWeight: 600, boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          animation: 'slideUp 0.3s ease',
        }}>
          ✅ Page "{pagePath}" published successfully!
        </div>
      )}
      {saveStatus === 'error' && (
        <div style={{
          position: 'fixed', bottom: 24, right: 24, zIndex: 99999,
          background: '#dc2626', color: '#fff', padding: '12px 24px',
          borderRadius: 8, fontFamily: 'system-ui', fontSize: 14,
          fontWeight: 600, boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        }}>
          ❌ Failed to save. Check console.
        </div>
      )}
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0 }
          to { transform: translateY(0); opacity: 1 }
        }
      `}</style>

      <Puck
        config={puckConfig}
        data={initialData!}
        onPublish={handlePublish}
        headerTitle={`Editing: ${pagePath}`}
        headerPath={pagePath}
        viewports={viewports}
        iframe={{ enabled: true }}
        overrides={{
          headerActions: ({ children }) => (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {/* Page Switcher */}
              <select
                value={pagePath}
                onChange={(e) => switchPage(e.target.value)}
                style={{
                  padding: '6px 12px', borderRadius: 6,
                  border: '1px solid #d1d5db', fontSize: 13,
                  fontFamily: 'system-ui', background: '#fff',
                  cursor: 'pointer', minWidth: 160,
                }}
              >
                <optgroup label="Site Pages">
                  {pages.map((p) => (
                    <option key={p.path} value={p.path}>
                      {p.path === '/' ? '/ (Homepage)' : p.path}
                      {p.saved ? ' ✓' : ''}
                    </option>
                  ))}
                </optgroup>
              </select>

              {/* New Page */}
              {showNewPage ? (
                <div style={{ display: 'flex', gap: 4 }}>
                  <input
                    type="text"
                    placeholder="/new-page"
                    value={newPagePath}
                    onChange={(e) => setNewPagePath(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && createPage()}
                    style={{
                      padding: '6px 10px', borderRadius: 6,
                      border: '1px solid #d1d5db', fontSize: 13,
                      width: 140, fontFamily: 'system-ui',
                    }}
                    autoFocus
                  />
                  <button
                    onClick={createPage}
                    style={{
                      padding: '6px 12px', borderRadius: 6, border: 'none',
                      background: '#059669', color: '#fff', fontSize: 13,
                      cursor: 'pointer', fontWeight: 600,
                    }}
                  >
                    Create
                  </button>
                  <button
                    onClick={() => setShowNewPage(false)}
                    style={{
                      padding: '6px 8px', borderRadius: 6, border: '1px solid #d1d5db',
                      background: '#fff', fontSize: 13, cursor: 'pointer',
                    }}
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowNewPage(true)}
                  style={{
                    padding: '6px 12px', borderRadius: 6,
                    border: '1px solid #d1d5db', background: '#fff',
                    fontSize: 13, cursor: 'pointer', fontFamily: 'system-ui',
                    fontWeight: 500,
                  }}
                >
                  + New Page
                </button>
              )}

              {/* Preview link */}
              <a
                href={pagePath}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: '6px 12px', borderRadius: 6,
                  border: '1px solid #d1d5db', background: '#fff',
                  fontSize: 13, textDecoration: 'none', color: '#374151',
                  fontFamily: 'system-ui', fontWeight: 500,
                }}
              >
                👁 Preview
              </a>

              {/* Saving indicator */}
              {saving && (
                <span style={{ fontSize: 13, color: '#6b7280', fontFamily: 'system-ui' }}>
                  Saving...
                </span>
              )}

              {/* Default publish button */}
              {children}
            </div>
          ),
        }}
      />
    </>
  )
}
