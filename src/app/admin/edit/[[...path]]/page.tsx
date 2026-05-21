'use client'

/**
 * Puck Visual Editor — Production Admin Route
 *
 * Features:
 * - Page switcher dropdown (all site pages)
 * - Responsive viewports (mobile / tablet / desktop)
 * - Iframe isolation for CSS encapsulation
 * - Dirty-state detection with beforeunload guard
 * - Publishing confidence signals: spinner, timestamp, status pill
 * - Unsaved-changes indicator in header bar
 * - Navigation protection on page-switch when dirty
 * - Cache-awareness note on Preview link
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
      e.returnValue = 'You have unpublished changes. Leave without publishing?'
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
  const [showResetConfirm, setShowResetConfirm] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState('blank')

  // Ref for synchronous closure-safe dirty check
  const isDirtyRef = useRef(false)

  useHideGlobalChrome()
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
    setShowResetConfirm(false)
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
          setTimeout(() => setSaveStatus('idle'), 5000)
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

  // onChange handler — marks content as dirty on first change
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

  // Create new page — seeds from selected template before navigating
  const createPage = useCallback(async () => {
    if (!newPagePath) return
    const path = newPagePath.startsWith('/') ? newPagePath : `/${newPagePath}`
    setShowNewPage(false)
    setNewPagePath('')

    // Seed with template (or blank) before navigating
    // Always uses ?force=false (default) since this is a NEW page — no existing content
    if (selectedTemplate && selectedTemplate !== 'blank') {
      try {
        await fetch(
          `/api/puck/seed?path=${encodeURIComponent(path)}&template=${encodeURIComponent(selectedTemplate)}`,
          {
            method: 'POST',
            headers: { 'x-puck-write-secret': process.env.NEXT_PUBLIC_PUCK_WRITE_SECRET || '' },
          }
        )
      } catch {
        // If seed fails, navigate anyway — editor will seed blank fallback
      }
    }

    switchPage(path)
  }, [newPagePath, selectedTemplate, switchPage])

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
          position: 'fixed', top: 60, right: 16, zIndex: 2147483647,
          background: '#059669', color: '#fff',
          padding: '10px 18px', borderRadius: 8,
          fontFamily: 'system-ui', fontSize: 13, fontWeight: 600,
          boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
          animation: 'slideUp 0.25s ease',
          display: 'flex', alignItems: 'center', gap: 8,
          pointerEvents: 'none',
        }}>
          <span>✅</span>
          <span>Published! Changes are live. (Allow 30–60s for page cache to refresh.)</span>
        </div>
      )}

      {/* ── Save error toast ────────────────────────────────────── */}
      {saveStatus === 'error' && (
        <div style={{
          position: 'fixed', top: 60, right: 16, zIndex: 2147483647,
          background: '#dc2626', color: '#fff',
          padding: '10px 18px', borderRadius: 8,
          fontFamily: 'system-ui', fontSize: 13, fontWeight: 600,
          boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
          animation: 'slideUp 0.25s ease',
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <span>❌</span>
          <span>Publish failed — please try again or refresh the page.</span>
        </div>
      )}

      {/* ── Reset confirmation modal ────────────────────────────── */}
      {showResetConfirm && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 2147483647,
          background: 'rgba(0,0,0,0.45)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{
            background: '#fff', borderRadius: 12, padding: '28px 32px',
            maxWidth: 420, width: '90%',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
            fontFamily: 'system-ui',
          }}>
            <div style={{ fontSize: 28, marginBottom: 12 }}>⚠️</div>
            <h3 style={{ margin: '0 0 8px', fontSize: 17, fontWeight: 700, color: '#111827' }}>
              Reset page to defaults?
            </h3>
            <p style={{ margin: '0 0 20px', fontSize: 14, color: '#6b7280', lineHeight: 1.6 }}>
              This will replace all your current edits with the original default content.
              <strong style={{ color: '#dc2626' }}> This cannot be undone.</strong>
              <br /><br />
              If you want to keep a copy of your current content first, close this dialog
              and run <code style={{ background: '#f1f5f9', padding: '2px 5px', borderRadius: 3, fontSize: 12 }}>npm run puck:backup</code> before resetting.
            </p>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <button
                onClick={() => setShowResetConfirm(false)}
                style={{
                  padding: '8px 16px', borderRadius: 6, border: '1px solid #d1d5db',
                  background: '#fff', fontSize: 14, cursor: 'pointer', fontWeight: 500,
                }}
              >
                Cancel — keep my edits
              </button>
              <button
                onClick={resetToDefault}
                style={{
                  padding: '8px 16px', borderRadius: 6, border: 'none',
                  background: '#dc2626', color: '#fff', fontSize: 14,
                  cursor: 'pointer', fontWeight: 600,
                }}
              >
                Yes, reset to defaults
              </button>
            </div>
          </div>
        </div>
      )}

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
          // Inject site CSS into the iframe
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

          // ── Section name badge on canvas ──────────────────────
          // Shows a floating label on Content Sections when hovered/selected.
          // Since componentOverlay does not receive instance props, we show
          // the component type label — the sectionName is visible in the
          // right-hand fields panel when the section is selected.
          componentOverlay: ({ children, componentType, isSelected, hover }) => {
            const isSectionBox = componentType === 'SectionBox'
            if (!isSectionBox) return <>{children}</>
            const visible = isSelected || hover
            return (
              <div style={{ position: 'relative' }}>
                {children}
                {visible && (
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 100,
                    pointerEvents: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    padding: '4px 8px',
                    background: isSelected
                      ? 'rgba(27,97,201,0.12)'
                      : 'rgba(27,97,201,0.06)',
                    borderTop: isSelected
                      ? '2px solid rgba(27,97,201,0.6)'
                      : '2px solid rgba(27,97,201,0.25)',
                  }}>
                    <span style={{
                      fontSize: 10,
                      fontWeight: 600,
                      letterSpacing: '0.05em',
                      color: '#1b61c9',
                      fontFamily: 'system-ui',
                      textTransform: 'uppercase',
                      background: 'rgba(255,255,255,0.85)',
                      padding: '2px 7px',
                      borderRadius: 99,
                      border: '1px solid rgba(27,97,201,0.2)',
                    }}>
                      Content Section — click to edit, check right panel for name
                    </span>
                  </div>
                )}
              </div>
            )
          },

          // ── Outline discovery guide ───────────────────────────
          // Wraps the default layer tree with a one-line tip so Barry
          // knows to click each section to reveal its name.
          outline: ({ children }) => (
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{
                padding: '8px 12px 6px',
                fontSize: 11,
                color: '#6b7280',
                fontFamily: 'system-ui',
                lineHeight: 1.4,
                borderBottom: '1px solid #f1f5f9',
                background: '#fafafa',
                flexShrink: 0,
              }}>
                💡 Click any section to see its name and fields in the right panel.
              </div>
              <div style={{ flex: 1, overflow: 'auto' }}>
                {children}
              </div>
            </div>
          ),

          headerActions: ({ children }) => (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>

              {/* ── Row 1: Controls ──────────────────────────────── */}
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
                  <div style={{ display: 'flex', gap: 4, flexDirection: 'column' }}>
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
                    {/* Template selector */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ fontSize: 11, color: '#6b7280', fontFamily: 'system-ui', whiteSpace: 'nowrap' }}>
                        Start from:
                      </span>
                      <select
                        value={selectedTemplate}
                        onChange={(e) => setSelectedTemplate(e.target.value)}
                        style={{
                          padding: '4px 8px', borderRadius: 5,
                          border: '1px solid #d1d5db', fontSize: 12,
                          fontFamily: 'system-ui', background: '#fff',
                          cursor: 'pointer', flex: 1,
                        }}
                      >
                        <option value="blank">⬜ Blank page</option>
                        <option value="homepage-standard">🏠 Homepage layout</option>
                        <option value="product-page">📦 Product page layout</option>
                        <option value="campaign-landing">🎯 Campaign landing layout</option>
                      </select>
                    </div>
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

                {/* Preview link — with cache caveat */}
                <a
                  href={pagePath}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Opens the live page in a new tab. After publishing, allow 30–60 seconds for the page to refresh."
                  style={{
                    padding: '6px 12px', borderRadius: 6,
                    border: '1px solid #d1d5db', background: '#fff',
                    fontSize: 13, textDecoration: 'none', color: '#374151',
                    fontFamily: 'system-ui', fontWeight: 500,
                  }}
                >
                  👁 View live page ↗
                </a>

                {/* Divider before danger zone */}
                <span style={{ width: 1, height: 20, background: '#e5e7eb', flexShrink: 0 }} />

                {/* Reset — moved to a less prominent position, opens confirm modal */}
                <button
                  onClick={() => setShowResetConfirm(true)}
                  style={{
                    padding: '6px 10px', borderRadius: 6,
                    border: '1px solid #e5e7eb', background: '#fff',
                    fontSize: 12, cursor: 'pointer', color: '#9ca3af',
                    fontFamily: 'system-ui', fontWeight: 400,
                  }}
                  title="Reset this page to its original default content"
                >
                  ↺ Reset
                </button>

                {/* Saving spinner */}
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

                {/* Unsaved-changes pill */}
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

                {/* Saved indicator in header */}
                {!isDirty && lastSavedAt && !saving && (
                  <span style={{
                    fontSize: 11, fontFamily: 'system-ui', color: '#166534',
                    whiteSpace: 'nowrap',
                    animation: 'fadeIn 0.3s ease',
                  }}>
                    ✓ Published {formatSaveTime(lastSavedAt)}
                  </span>
                )}

                {/* Puck's own Publish button */}
                {children}
              </div>

              {/* ── Row 2: Status bar inside header ──────────────── */}
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '4px 0 2px',
                borderTop: '1px solid rgba(0,0,0,0.06)',
                marginTop: 4,
                fontSize: 11,
                fontFamily: 'system-ui',
                gap: 12,
              }}>
                {/* Left: publish state */}
                <span style={{
                  display: 'flex', alignItems: 'center', gap: 5,
                  color: isDirty ? '#92400e' : (lastSavedAt ? '#166534' : '#9ca3af'),
                  fontWeight: isDirty ? 600 : 400,
                }}>
                  <span style={{
                    width: 6, height: 6, borderRadius: '50%', flexShrink: 0,
                    background: isDirty ? '#f59e0b' : (lastSavedAt ? '#22c55e' : '#d1d5db'),
                    display: 'inline-block',
                    boxShadow: isDirty ? '0 0 0 2px rgba(245,158,11,0.2)' : 'none',
                  }} />
                  {isDirty
                    ? 'Unpublished changes — click Publish to go live'
                    : lastSavedAt
                      ? `All changes published · Last: ${formatSaveTime(lastSavedAt)}`
                      : 'No changes yet'}
                </span>

                {/* Right: backup tip */}
                <span style={{ color: '#9ca3af', whiteSpace: 'nowrap' }}>
                  Tip: run{' '}
                  <code style={{ fontFamily: 'monospace', background: 'rgba(0,0,0,0.04)', padding: '1px 4px', borderRadius: 3 }}>
                    npm run puck:backup
                  </code>
                  {' '}before large sessions
                </span>
              </div>
            </div>
          ),
        }}
      />
    </>
  )
}
