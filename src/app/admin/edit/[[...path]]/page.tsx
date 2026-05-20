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
import { Puck, blocksPlugin, type Data } from '@puckeditor/core'
import { puckConfig } from '@/puck.config'
import '@puckeditor/core/puck.css'

type PageEntry = { path: string; saved: boolean; updated_at: string | null }

// Hide global layout elements (Navbar, Footer, etc.) that leak from root layout
function useHideGlobalChrome() {
  useEffect(() => {
    // Add class to body to suppress global elements via CSS
    document.body.classList.add('puck-editor-active')
    // Also directly hide known global elements
    const selectors = ['nav', 'footer', '[data-announcement]', '.announcement-banner', '.smart-faq-bot', '[data-puck-edit-button]']
    const hidden: HTMLElement[] = []
    selectors.forEach((sel) => {
      document.querySelectorAll(sel).forEach((el) => {
        // Don't hide elements inside the Puck editor
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

export default function PuckEditorPage({
  params,
}: {
  params: Promise<{ path?: string[] }>
}) {
  const [pagePath, setPagePath] = useState<string>('')
  const [pathResolved, setPathResolved] = useState(false)
  const [initialData, setInitialData] = useState<Data | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saved' | 'error'>('idle')
  const [pages, setPages] = useState<PageEntry[]>([])
  const [newPagePath, setNewPagePath] = useState('')
  const [showNewPage, setShowNewPage] = useState(false)

  // Suppress global Navbar/Footer/Announcement from root layout
  useHideGlobalChrome()
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
  // Guard: do not fetch until params have resolved. Without this guard, the effect
  // fires immediately on mount with the default empty string, or worse, with '/'
  // before the real route path is known, causing the wrong page's data to load.
  useEffect(() => {
    if (!pagePath || !pathResolved) return
    setLoading(true)
    setSaveStatus('idle')

    fetch(`/api/puck?path=${encodeURIComponent(pagePath)}`)
      .then((res) => {
        if (res.ok) return res.json()
        return null
      })
      .then(async (data) => {
        if (data && data.content && data.content.length > 0) {
          // Existing content found
          setInitialData(data)
          setLoading(false)
        } else {
          // No content — auto-seed from defaults
          try {
            const seedRes = await fetch(`/api/puck/seed?path=${encodeURIComponent(pagePath)}`, {
              method: 'POST',
              headers: { 'x-puck-write-secret': process.env.NEXT_PUBLIC_PUCK_WRITE_SECRET || '' },
            })
            if (seedRes.ok) {
              // Re-fetch the seeded data
              const reloadRes = await fetch(`/api/puck?path=${encodeURIComponent(pagePath)}`)
              if (reloadRes.ok) {
                const seeded = await reloadRes.json()
                setInitialData(seeded)
                setLoading(false)
                return
              }
            }
          } catch {}
          // Fallback if seed fails
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

  // Publish handler
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
          ✅ Changes saved and published to the live site!
        </div>
      )}
      {saveStatus === 'error' && (
        <div style={{
          position: 'fixed', bottom: 24, right: 24, zIndex: 99999,
          background: '#dc2626', color: '#fff', padding: '12px 24px',
          borderRadius: 8, fontFamily: 'system-ui', fontSize: 14,
          fontWeight: 600, boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        }}>
          ❌ Save failed — please try again or refresh the page.
        </div>
      )}
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0 }
          to { transform: translateY(0); opacity: 1 }
        }
        /* Force reveal elements visible in Puck iframe — IntersectionObserver doesn't fire */
        .reveal {
          opacity: 1 !important;
          transform: none !important;
        }
        /* Ensure puck editor takes full viewport */
        .puck-editor-active .flex.min-h-screen {
          min-height: auto;
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
        plugins={[blocksPlugin()]}
        overrides={{
          // Inject site CSS into the iframe so all component classes render correctly
          iframe: ({ children, document: iframeDoc }) => {
            useEffect(() => {
              if (!iframeDoc) return
              // Already injected?
              if (iframeDoc.querySelector('[data-puck-site-css]')) return

              // Clone all <link rel="stylesheet"> and <style> elements from parent
              const parentDoc = window.document
              parentDoc.querySelectorAll('link[rel="stylesheet"], style').forEach((el) => {
                // Skip Puck's own CSS — we only want site styles
                if (el.getAttribute('href')?.includes('puck')) return
                const clone = el.cloneNode(true) as HTMLElement
                clone.setAttribute('data-puck-site-css', 'true')
                iframeDoc.head.appendChild(clone)
              })

              // Also inject Google Fonts used by the site
              const fontsLink = iframeDoc.createElement('link')
              fontsLink.rel = 'stylesheet'
              fontsLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=DM+Sans:wght@400;500;600;700&display=swap'
              fontsLink.setAttribute('data-puck-site-css', 'true')
              iframeDoc.head.appendChild(fontsLink)

              // Critical overrides for the editor iframe
              const overrideStyle = iframeDoc.createElement('style')
              overrideStyle.setAttribute('data-puck-site-css', 'true')
              overrideStyle.textContent = `
                /* Force reveal elements visible — IntersectionObserver doesn't fire in iframe */
                .reveal {
                  opacity: 1 !important;
                  transform: none !important;
                }
                /* Reset body for clean editor canvas */
                body {
                  background: #ffffff !important;
                  margin: 0;
                }
                /* Hide any stray nav/footer elements that shouldn't be in the canvas */
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

              {/* Saving indicator */}
              {saving && (
                <span style={{ fontSize: 13, color: '#6b7280', fontFamily: 'system-ui' }}>
                ⏳ Saving…
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
