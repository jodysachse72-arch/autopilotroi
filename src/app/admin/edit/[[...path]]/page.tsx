'use client'

/**
 * Puck Visual Editor — Production Admin Route
 *
 * Features:
 * - Page switcher dropdown (all site pages)
 * - Responsive viewports (mobile / tablet / desktop)
 * - Iframe isolation for CSS encapsulation
 * - Dirty-state detection with beforeunload guard
 * - Publishing confidence signals: spinner, timestamp, persistent status bar
 * - Unsaved-changes indicator in header
 * - Navigation protection on page-switch when dirty
 */

import { useEffect, useState, useCallback, useMemo, useRef } from 'react'
import { Puck, blocksPlugin, type Data } from '@puckeditor/core'
import { puckConfig } from '@/puck.config'
import '@puckeditor/core/puck.css'

type PageEntry = { path: string; saved: boolean; updated_at: string | null }

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Format a Date as "May 20 at 3:41 AM" */
function formatSaveTime(date: Date): string {
  return date.toLocaleString('en-US', {
    month: 'short', day: 'numeric',
    hour: 'numeric', minute: '2-digit', hour12: true,
  })
}

// ── Global chrome suppression ─────────────────────────────────────────────────

// Hide global layout elements (Navbar, Footer, etc.) that leak from root layout
function useHideGlobalChrome() {
  useEffect(() => {
    document.body.classList.add('puck-editor-active')
    const selectors = ['nav', 'footer', '[data-announcement]', '.announcement-banner', '.smart-faq-bot', '[data-puck-edit-button]']
    const hidden: HTMLElement[] = []
    selectors.forEach((sel) => {
      document.querySelectorAll(sel).forEach((el) => {
        if (el.closest('[class*="Puck"]')) return
        const htmlEl = el as HTMLElement
        htmlEl.style.display = 'none'
        hidden.push(htmlEl)
      })
    })
    return () => {
      document.body.classList.remove('puck-editor-active')
      hidden.forEach((el) => { el.style.display = '' })
    }
  }, [])
}

// ── beforeunload guard ────────────────────────────────────────────────────────

function useBeforeUnloadGuard(isDirty: boolean) {
  useEffect(() => {
    if (!isDirty) return
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault()
      // Modern browsers show a generic message; the string is ignored but required
      e.returnValue = 'You have unsaved changes. Leave without publishing?'
    }
    window.addEventListener('beforeunload', handler)
    return () => window.removeEventListener('beforeunload', handler)
  }, [isDirty])
}

// ── Main component ────────────────────────────────────────────────────────────

export default function PuckEditorPage({
  params,
}: {
  params: Promise<{ path?: string[] }>
}) {
  const [pagePath, setPagePath]         = useState<string>('')
  const [pathResolved, setPathResolved] = useState(false)
  const [initialData, setInitialData]   = useState<Data | null>(null)
  const [loading, setLoading]           = useState(true)
  const [saving, setSaving]             = useState(false)
  const [saveStatus, setSaveStatus]     = useState<'idle' | 'saved' | 'error'>('idle')
  const [lastSavedAt, setLastSavedAt]   = useState<Date | null>(null)
  const [isDirty, setIsDirty]           = useState(false)
  const [pages, setPages]               = useState<PageEntry[]>([])
  const [newPagePath, setNewPagePath]   = useState('')
  const [showNewPage, setShowNewPage]   = useState(false)

  // Track whether a change has been made since the last publish
  // We use a ref so the Puck onChange callback always reads the latest value
  const isDirtyRef = useRef(false)

  // Suppress global Navbar/Footer/Announcement from root layout
  useHideGlobalChrome()

  // Warn on tab close / browser navigation when dirty
  useBeforeUnloadGuard(isDirty)

  // Resolve page path from route params
  useEffect(() => {
    params.then((resolved) => {
      const path = resolved.path ? '/' + resolved.path.join('/') : '/'
      setPagePath(path)
      setPathResolved(true)
    })
  }, [params])

  // Load pages list
  useEffect(() => {
    fetch('/api/puck?list=true')
      .then((r) => r.json())
      .then((data) => setPages(data || []))
      .catch(() => {})
  }, [saveStatus])

  // Load page data — auto-seed if empty
  useEffect(() => {
    if (!pagePath || !pathResolved) return
    setLoading(true)
    setSaveStatus('idle')
    setIsDirty(false)
    isDirtyRef.current = false

    fetch(`/api/puck?path=${encodeURIComponent(pagePath)}`)
      .then((res) => {
        if (res.ok) return res.json()
        return null
      })
      .then(async (data) => {
        if (data && data.content && data.content.length > 0) {
          setInitialData(data)
          setLoading(false)
        } else {
          try {
            const seedRes = await fetch(`/api/puck/seed?path=${encodeURIComponent(pagePath)}`, {
              method: 'POST',
              headers: { 'x-puck-write-secret': process.env.NEXT_PUBLIC_PUCK_WRITE_SECRET || '' },
            })
            if (seedRes.ok) {
              const reloadRes = await fetch(`/api/puck?path=${encodeURIComponent(pagePath)}`)
              if (reloadRes.ok) {
                const seeded = await reloadRes.json()
                setInitialData(seeded)
                setLoading(false)
                return
              }
            }
          } catch {}
          setInitialData({ content: [], root: { props: { title: '' } } })
          setLoading(false)
        }
      })
      .catch(() => {
        setInitialData({ content: [], root: { props: { title: '' } } })
        setLoading(false)
      })
  }, [pagePath, pathResolved])

  // Reset page to default content
  const resetToDefault = useCallback(async () => {
    if (!confirm('Reset this page to default content? Current edits will be lost.')) return
    setLoading(true)
    try {
      await fetch(`/api/puck/seed?path=${encodeURIComponent(pagePath)}`, {
        method: 'POST',
        headers: { 'x-puck-write-secret': process.env.NEXT_PUBLIC_PUCK_WRITE_SECRET || '' },
      })
      window.location.reload()
    } catch {
      setLoading(false)
    }
  }, [pagePath])

  // Publish handler — clears dirty state on success
  const handlePublish = useCallback(
    async (data: Data) => {
      setSaving(true)
      setSaveStatus('idle')
      try {
        const res = await fetch('/api/puck', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-puck-write-secret': process.env.NEXT_PUBLIC_PUCK_WRITE_SECRET || '',
          },
          body: JSON.stringify({ path: pagePath, data }),
        })
        if (res.ok) {
          setSaveStatus('saved')
          setLastSavedAt(new Date())
          setIsDirty(false)
          isDirtyRef.current = false
          setTimeout(() => setSaveStatus('idle'), 4000)
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

  // onChange handler — marks content as dirty
  const handleChange = useCallback((_data: Data) => {
    if (!isDirtyRef.current) {
      isDirtyRef.current = true
      setIsDirty(true)
    }
  }, [])

  // Navigate to different page — guard against unsaved changes
  const switchPage = useCallback((newPath: string) => {
    if (isDirtyRef.current) {
      const confirmed = window.confirm(
        'You have unpublished changes on this page.\n\nLeave without publishing?'
      )
      if (!confirmed) return
    }
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
      {/* ── Global animation styles ─────────────────────────────── */}
      <style>{`
        @keyframes spin    { to { transform: rotate(360deg) } }
        @keyframes slideUp { from { transform: translateY(16px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
        @keyframes fadeIn  { from { opacity: 0 } to { opacity: 1 } }
        .reveal { opacity: 1 !important; transform: none !important; }
        .puck-editor-active .flex.min-h-screen { min-height: auto; }
      `}</style>

      {/* ── Save success toast ──────────────────────────────────── */}
      {saveStatus === 'saved' && (
        <div style={{
          position: 'fixed', bottom: 24, right: 24, zIndex: 99999,
          background: '#059669', color: '#fff',
          padding: '12px 20px', borderRadius: 8,
          fontFamily: 'system-ui', fontSize: 14, fontWeight: 600,
          boxShadow: '0 4px 16px rgba(0,0,0,0.18)',
          animation: 'slideUp 0.25s ease',
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <span style={{ fontSize: 16 }}>✅</span>
          <span>Published successfully — changes are live!</span>
        </div>
      )}

      {/* ── Save error toast ────────────────────────────────────── */}
      {saveStatus === 'error' && (
        <div style={{
          position: 'fixed', bottom: 24, right: 24, zIndex: 99999,
          background: '#dc2626', color: '#fff',
          padding: '12px 20px', borderRadius: 8,
          fontFamily: 'system-ui', fontSize: 14, fontWeight: 600,
          boxShadow: '0 4px 16px rgba(0,0,0,0.18)',
          animation: 'slideUp 0.25s ease',
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <span style={{ fontSize: 16 }}>❌</span>
          <span>Publish failed — please try again or refresh.</span>
        </div>
      )}

      {/* ── Persistent status bar ───────────────────────────────── */}
      {/* Shows last-saved timestamp + unsaved-changes warning below the editor header */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 99990,
        background: isDirty ? '#fffbeb' : '#f0fdf4',
        borderTop: `1px solid ${isDirty ? '#fde68a' : '#bbf7d0'}`,
        padding: '6px 20px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        fontFamily: 'system-ui', fontSize: 12,
        transition: 'background 0.3s ease, border-color 0.3s ease',
      }}>
        {/* Left: dirty indicator */}
        <span style={{
          color: isDirty ? '#92400e' : '#166534',
          fontWeight: isDirty ? 600 : 400,
          display: 'flex', alignItems: 'center', gap: 6,
        }}>
          {isDirty ? (
            <>
              <span style={{
                width: 7, height: 7, borderRadius: '50%',
                background: '#f59e0b', display: 'inline-block',
                boxShadow: '0 0 0 2px rgba(245,158,11,0.25)',
              }} />
              Unpublished changes — click Publish to go live
            </>
          ) : lastSavedAt ? (
            <>
              <span style={{
                width: 7, height: 7, borderRadius: '50%',
                background: '#22c55e', display: 'inline-block',
              }} />
              All changes published
            </>
          ) : (
            <>
              <span style={{
                width: 7, height: 7, borderRadius: '50%',
                background: '#94a3b8', display: 'inline-block',
              }} />
              No changes yet
            </>
          )}
        </span>

        {/* Right: last saved timestamp + backup tip */}
        <span style={{ color: '#6b7280', display: 'flex', alignItems: 'center', gap: 16 }}>
          {lastSavedAt && (
            <span>
              Last published: <strong style={{ color: '#374151' }}>{formatSaveTime(lastSavedAt)}</strong>
            </span>
          )}
          <span style={{ color: '#9ca3af', fontStyle: 'italic' }}>
            Tip: run <code style={{ fontFamily: 'monospace', background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>npm run puck:backup</code> before large editing sessions
          </span>
        </span>
      </div>

      {/* ── Puck editor ─────────────────────────────────────────── */}
      <Puck
        config={puckConfig}
        data={initialData!}
        onPublish={handlePublish}
        onChange={handleChange}
        headerTitle={`Editing: ${pagePath}`}
        headerPath={pagePath}
        viewports={viewports}
        iframe={{ enabled: true }}
        plugins={[blocksPlugin()]}
        overrides={{
          // Inject site CSS into the iframe so all component classes render correctly
          iframe: ({ children, document: iframeDoc }) => {
            useEffect(() => {
              if (!iframeDoc) return
              if (iframeDoc.querySelector('[data-puck-site-css]')) return

              const parentDoc = window.document
              parentDoc.querySelectorAll('link[rel="stylesheet"], style').forEach((el) => {
                if (el.getAttribute('href')?.includes('puck')) return
                const clone = el.cloneNode(true) as HTMLElement
                clone.setAttribute('data-puck-site-css', 'true')
                iframeDoc.head.appendChild(clone)
              })

              const fontsLink = iframeDoc.createElement('link')
              fontsLink.rel = 'stylesheet'
              fontsLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=DM+Sans:wght@400;500;600;700&display=swap'
              fontsLink.setAttribute('data-puck-site-css', 'true')
              iframeDoc.head.appendChild(fontsLink)

              const overrideStyle = iframeDoc.createElement('style')
              overrideStyle.setAttribute('data-puck-site-css', 'true')
              overrideStyle.textContent = `
                .reveal { opacity: 1 !important; transform: none !important; }
                body { background: #ffffff !important; margin: 0; }
                body > nav, body > footer { display: none !important; }
              `
              iframeDoc.head.appendChild(overrideStyle)
            }, [iframeDoc])
            return <>{children}</>
          },

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

              {/* Reset to defaults */}
              <button
                onClick={resetToDefault}
                style={{
                  padding: '6px 12px', borderRadius: 6,
                  border: '1px solid #fca5a5', background: '#fff7f7',
                  fontSize: 13, cursor: 'pointer', color: '#dc2626',
                  fontFamily: 'system-ui', fontWeight: 500,
                }}
                title="Reset this page to its original default content — this cannot be undone"
              >
                ↺ Reset to defaults
              </button>

              {/* Saving spinner — shown during active save only */}
              {saving && (
                <span style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  fontSize: 13, color: '#6b7280', fontFamily: 'system-ui',
                }}>
                  <span style={{
                    width: 13, height: 13,
                    border: '2px solid #e2e8f0',
                    borderTopColor: '#3b82f6',
                    borderRadius: '50%',
                    display: 'inline-block',
                    animation: 'spin 0.7s linear infinite',
                    flexShrink: 0,
                  }} />
                  Publishing…
                </span>
              )}

              {/* Unsaved-changes pill — subtle header badge */}
              {isDirty && !saving && (
                <span style={{
                  fontSize: 11, fontWeight: 600, fontFamily: 'system-ui',
                  background: '#fef3c7', color: '#92400e',
                  border: '1px solid #fde68a',
                  borderRadius: 99, padding: '3px 9px',
                  whiteSpace: 'nowrap',
                  animation: 'fadeIn 0.2s ease',
                }}>
                  ● Unpublished
                </span>
              )}

              {/* Default Puck publish button */}
              {children}
            </div>
          ),
        }}
      />
    </>
  )
}
