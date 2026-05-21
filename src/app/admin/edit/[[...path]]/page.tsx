'use client'

/**
 * Puck Visual Editor — Production Admin Route
 *
 * Phase 0: Operator Safety Layer
 *
 * Features:
 * - Draft/Autosave system (30s debounce, draft_data column)
 * - Draft resume on editor load
 * - Draft preview in new tab
 * - Revision history with restore
 * - Pre-publish confirmation modal
 * - Outline section identity (sectionName labels)
 * - Enhanced trust polish (status indicators, error clarity)
 * - Page switcher dropdown (all site pages)
 * - Responsive viewports (mobile / tablet / desktop)
 * - Iframe isolation for CSS encapsulation
 * - Dirty-state detection with beforeunload guard
 * - Publishing confidence signals
 * - Navigation protection on page-switch when dirty
 */

import { useEffect, useState, useCallback, useMemo, useRef } from 'react'
import { Puck, blocksPlugin, type Data, usePuck } from '@puckeditor/core'
import { puckConfig } from '@/puck.config'
import '@puckeditor/core/puck.css'

type PageEntry = { path: string; saved: boolean; updated_at: string | null; has_draft?: boolean }
type Revision = { id: string; published_at: string; label: string }

// ── Constants ─────────────────────────────────────────────────────────────────
const AUTOSAVE_INTERVAL_MS = 30_000 // 30 seconds
const WRITE_SECRET = process.env.NEXT_PUBLIC_PUCK_WRITE_SECRET || ''

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Format a Date as "May 20, 3:41 AM" */
function formatSaveTime(date: Date): string {
  return date.toLocaleString('en-US', {
    month: 'short', day: 'numeric',
    hour: 'numeric', minute: '2-digit', hour12: true,
  })
}

/** Format relative time like "2 minutes ago" */
function formatRelativeTime(dateStr: string): string {
  const now = Date.now()
  const then = new Date(dateStr).getTime()
  const diffSec = Math.floor((now - then) / 1000)
  if (diffSec < 60) return 'just now'
  if (diffSec < 3600) return `${Math.floor(diffSec / 60)} min ago`
  if (diffSec < 86400) return `${Math.floor(diffSec / 3600)} hours ago`
  return `${Math.floor(diffSec / 86400)} days ago`
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

// ── Outline Section Labels Component ──────────────────────────────────────────
// Uses usePuck() to read current editor data and extract sectionName values
// for display in the outline panel.

function OutlineWithLabels({ children }: { children: React.ReactNode }) {
  // Access current Puck data to extract section names
  let sectionNames: Record<string, string> = {}
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { appState } = usePuck()
    if (appState?.data?.content) {
      for (const item of appState.data.content) {
        if (item.type === 'SectionBox' && item.props?.id) {
          const name = (item.props as Record<string, unknown>).sectionName as string || item.props.id
          sectionNames[item.props.id] = name
        }
      }
    }
  } catch {
    // usePuck may not be available in all contexts
  }

  const nameCount = Object.keys(sectionNames).length
  const nameList = Object.values(sectionNames)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Tip banner */}
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

      {/* Section name quick reference */}
      {nameCount > 0 && (
        <div style={{
          padding: '6px 12px',
          fontSize: 10,
          fontFamily: 'system-ui',
          borderBottom: '1px solid #f1f5f9',
          background: '#f8fafc',
          flexShrink: 0,
        }}>
          <div style={{
            fontWeight: 700, color: '#374151', marginBottom: 3,
            textTransform: 'uppercase', letterSpacing: '0.05em',
          }}>
            Sections on this page:
          </div>
          {nameList.map((name, i) => (
            <div key={i} style={{
              color: '#6b7280', lineHeight: 1.5,
              display: 'flex', alignItems: 'center', gap: 4,
            }}>
              <span style={{ color: '#1b61c9', fontSize: 9 }}>●</span>
              {name}
            </div>
          ))}
        </div>
      )}

      {/* Default outline tree */}
      <div style={{ flex: 1, overflow: 'auto' }}>
        {children}
      </div>
    </div>
  )
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

  // Draft/Autosave state
  const [draftStatus, setDraftStatus]   = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')
  const [lastDraftAt, setLastDraftAt]   = useState<Date | null>(null)
  const [resumedDraft, setResumedDraft] = useState(false)

  // Revision history state
  const [showHistory, setShowHistory]   = useState(false)
  const [revisions, setRevisions]       = useState<Revision[]>([])
  const [loadingRevisions, setLoadingRevisions] = useState(false)
  const [restoringId, setRestoringId]   = useState<string | null>(null)
  const [showRestoreConfirm, setShowRestoreConfirm] = useState<Revision | null>(null)

  // Pre-publish confirmation
  const [showPublishConfirm, setShowPublishConfirm] = useState(false)
  const [pendingPublishData, setPendingPublishData] = useState<Data | null>(null)

  // Refs for synchronous closure-safe access
  const isDirtyRef = useRef(false)
  const latestDataRef = useRef<Data | null>(null)
  const autosaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

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

  // Load page data — check for draft first, auto-seed if empty
  useEffect(() => {
    if (!pagePath || !pathResolved) return
    setLoading(true)
    setSaveStatus('idle')
    setIsDirty(false)
    isDirtyRef.current = false
    setResumedDraft(false)

    // Try loading with draft awareness
    fetch(`/api/puck?path=${encodeURIComponent(pagePath)}&draft=true`)
      .then((res) => {
        if (res.ok) return res.json()
        return null
      })
      .then(async (result) => {
        if (result?.data) {
          setInitialData(result.data)
          if (result.isDraft) {
            setResumedDraft(true)
            setIsDirty(true)
            isDirtyRef.current = true
          }
          setLoading(false)
          return
        }

        // No draft response — try standard load
        const stdRes = await fetch(`/api/puck?path=${encodeURIComponent(pagePath)}`)
        if (stdRes.ok) {
          const stdData = await stdRes.json()
          if (stdData?.content && stdData.content.length > 0) {
            // Remove internal flag before passing to editor
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { _hasDraft, ...cleanData } = stdData
            setInitialData(cleanData)
            setLoading(false)
            return
          }
        }

        // Auto-seed if empty
        try {
          const seedRes = await fetch(`/api/puck/seed?path=${encodeURIComponent(pagePath)}`, {
            method: 'POST',
            headers: { 'x-puck-write-secret': WRITE_SECRET },
          })
          if (seedRes.ok) {
            const reloadRes = await fetch(`/api/puck?path=${encodeURIComponent(pagePath)}`)
            if (reloadRes.ok) {
              const seeded = await reloadRes.json()
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              const { _hasDraft: _h, ...cleanSeeded } = seeded
              setInitialData(cleanSeeded)
              setLoading(false)
              return
            }
          }
        } catch {}
        setInitialData({ content: [], root: { props: { title: '' } } })
        setLoading(false)
      })
      .catch(() => {
        setInitialData({ content: [], root: { props: { title: '' } } })
        setLoading(false)
      })
  }, [pagePath, pathResolved])

  // ── Autosave system ──────────────────────────────────────────────
  const saveDraft = useCallback(async () => {
    const data = latestDataRef.current
    if (!data || !pagePath || !isDirtyRef.current) return

    setDraftStatus('saving')
    try {
      const res = await fetch('/api/puck?draft=true', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-puck-write-secret': WRITE_SECRET,
        },
        body: JSON.stringify({ path: pagePath, data }),
      })
      if (res.ok) {
        setDraftStatus('saved')
        setLastDraftAt(new Date())
      } else {
        setDraftStatus('error')
      }
    } catch {
      setDraftStatus('error')
    }
  }, [pagePath])

  // Schedule autosave on dirty change
  const scheduleAutosave = useCallback(() => {
    if (autosaveTimerRef.current) {
      clearTimeout(autosaveTimerRef.current)
    }
    autosaveTimerRef.current = setTimeout(() => {
      saveDraft()
    }, AUTOSAVE_INTERVAL_MS)
  }, [saveDraft])

  // Cleanup autosave timer on unmount
  useEffect(() => {
    return () => {
      if (autosaveTimerRef.current) {
        clearTimeout(autosaveTimerRef.current)
      }
    }
  }, [])

  // Reset page to default content
  const resetToDefault = useCallback(async () => {
    setShowResetConfirm(false)
    setLoading(true)
    try {
      await fetch(`/api/puck/seed?path=${encodeURIComponent(pagePath)}`, {
        method: 'POST',
        headers: { 'x-puck-write-secret': WRITE_SECRET },
      })
      window.location.reload()
    } catch {
      setLoading(false)
    }
  }, [pagePath])

  // ── Publish handler — shows confirmation first ──
  const requestPublish = useCallback((data: Data) => {
    setPendingPublishData(data)
    setShowPublishConfirm(true)
  }, [])

  const confirmPublish = useCallback(async () => {
    const data = pendingPublishData
    setShowPublishConfirm(false)
    if (!data) return

    setSaving(true)
    setSaveStatus('idle')

    // Cancel any pending autosave
    if (autosaveTimerRef.current) {
      clearTimeout(autosaveTimerRef.current)
      autosaveTimerRef.current = null
    }

    try {
      const res = await fetch('/api/puck', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-puck-write-secret': WRITE_SECRET,
        },
        body: JSON.stringify({ path: pagePath, data }),
      })
      if (res.ok) {
        setSaveStatus('saved')
        setLastSavedAt(new Date())
        setIsDirty(false)
        isDirtyRef.current = false
        setResumedDraft(false)
        setDraftStatus('idle')
        setLastDraftAt(null)
        setTimeout(() => setSaveStatus('idle'), 5000)
      } else {
        setSaveStatus('error')
      }
    } catch {
      setSaveStatus('error')
    } finally {
      setSaving(false)
      setPendingPublishData(null)
    }
  }, [pagePath, pendingPublishData])

  // onChange handler — marks content as dirty + schedules autosave
  const handleChange = useCallback((data: Data) => {
    latestDataRef.current = data
    if (!isDirtyRef.current) {
      isDirtyRef.current = true
      setIsDirty(true)
    }
    scheduleAutosave()
  }, [scheduleAutosave])

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
  const createPage = useCallback(async () => {
    if (!newPagePath) return
    const path = newPagePath.startsWith('/') ? newPagePath : `/${newPagePath}`
    setShowNewPage(false)
    setNewPagePath('')

    if (selectedTemplate && selectedTemplate !== 'blank') {
      try {
        await fetch(
          `/api/puck/seed?path=${encodeURIComponent(path)}&template=${encodeURIComponent(selectedTemplate)}`,
          {
            method: 'POST',
            headers: { 'x-puck-write-secret': WRITE_SECRET },
          }
        )
      } catch {}
    }

    switchPage(path)
  }, [newPagePath, selectedTemplate, switchPage])

  // ── Revision history ──────────────────────────────────────────────
  const loadRevisions = useCallback(async () => {
    setLoadingRevisions(true)
    try {
      const res = await fetch(`/api/puck?path=${encodeURIComponent(pagePath)}&revisions=true`)
      if (res.ok) {
        const data = await res.json()
        setRevisions(data || [])
      }
    } catch {}
    setLoadingRevisions(false)
  }, [pagePath])

  const openHistory = useCallback(() => {
    setShowHistory(true)
    loadRevisions()
  }, [loadRevisions])

  const restoreRevision = useCallback(async (revision: Revision) => {
    setShowRestoreConfirm(null)
    setRestoringId(revision.id)
    try {
      const res = await fetch(`/api/puck?restore=${encodeURIComponent(revision.id)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-puck-write-secret': WRITE_SECRET,
        },
        body: JSON.stringify({ path: pagePath }),
      })
      if (res.ok) {
        // Reload the editor to show restored content
        window.location.reload()
      }
    } catch {}
    setRestoringId(null)
  }, [pagePath])

  // Manual save draft button
  const manualSaveDraft = useCallback(async () => {
    await saveDraft()
  }, [saveDraft])

  // Viewports
  const viewports = useMemo(() => [
    { width: 360, height: 'auto' as const, label: '📱 Mobile', icon: '📱' },
    { width: 768, height: 'auto' as const, label: '📱 Tablet', icon: '📱' },
    { width: 1280, height: 'auto' as const, label: '🖥️ Desktop', icon: '🖥️' },
  ], [])

  // Count sections for publish confirmation
  const sectionCount = initialData?.content?.length ?? 0

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
        <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
          Checking for unsaved drafts…
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
        @keyframes pulse   { 0%, 100% { opacity: 1 } 50% { opacity: 0.5 } }
        .reveal { opacity: 1 !important; transform: none !important; }
        .puck-editor-active .flex.min-h-screen { min-height: auto; }
      `}</style>

      {/* ── Draft resumed banner ────────────────────────────────── */}
      {resumedDraft && (
        <div style={{
          position: 'fixed', top: 60, left: '50%', transform: 'translateX(-50%)',
          zIndex: 2147483647,
          background: '#1e40af', color: '#fff',
          padding: '10px 20px', borderRadius: 8,
          fontFamily: 'system-ui', fontSize: 13, fontWeight: 600,
          boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
          animation: 'slideUp 0.3s ease',
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <span>📝</span>
          <span>Resuming your unsaved draft. Publish when ready, or keep editing.</span>
          <button
            onClick={() => setResumedDraft(false)}
            style={{
              background: 'rgba(255,255,255,0.2)', border: 'none', color: '#fff',
              borderRadius: 4, padding: '2px 8px', cursor: 'pointer', fontSize: 12,
              marginLeft: 8,
            }}
          >
            ✕
          </button>
        </div>
      )}

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
          <span>Publish failed — check your connection and try again.</span>
        </div>
      )}

      {/* ── Draft save error toast ──────────────────────────────── */}
      {draftStatus === 'error' && (
        <div style={{
          position: 'fixed', bottom: 16, right: 16, zIndex: 2147483646,
          background: '#f59e0b', color: '#78350f',
          padding: '8px 14px', borderRadius: 8,
          fontFamily: 'system-ui', fontSize: 12, fontWeight: 600,
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          animation: 'slideUp 0.25s ease',
        }}>
          ⚠️ Draft autosave failed — your work is still in the editor, but not saved to server yet.
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

      {/* ── Pre-publish confirmation modal ──────────────────────── */}
      {showPublishConfirm && (
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
            animation: 'slideUp 0.2s ease',
          }}>
            <div style={{ fontSize: 28, marginBottom: 12 }}>🚀</div>
            <h3 style={{ margin: '0 0 8px', fontSize: 17, fontWeight: 700, color: '#111827' }}>
              Publish changes?
            </h3>
            <div style={{ margin: '0 0 20px', fontSize: 14, color: '#6b7280', lineHeight: 1.8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <span style={{ fontSize: 11, color: '#9ca3af' }}>Page:</span>
                <strong style={{ color: '#111827' }}>{pagePath === '/' ? 'Homepage' : pagePath}</strong>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <span style={{ fontSize: 11, color: '#9ca3af' }}>Sections:</span>
                <span>{sectionCount} section{sectionCount !== 1 ? 's' : ''}</span>
              </div>
              {lastSavedAt && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 11, color: '#9ca3af' }}>Last published:</span>
                  <span>{formatSaveTime(lastSavedAt)}</span>
                </div>
              )}
              <div style={{
                marginTop: 12, padding: '8px 12px', borderRadius: 6,
                background: '#f0f9ff', border: '1px solid #bae6fd',
                fontSize: 12, color: '#0369a1',
              }}>
                Changes will be visible to visitors within 30–60 seconds.
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <button
                onClick={() => { setShowPublishConfirm(false); setPendingPublishData(null) }}
                style={{
                  padding: '8px 16px', borderRadius: 6, border: '1px solid #d1d5db',
                  background: '#fff', fontSize: 14, cursor: 'pointer', fontWeight: 500,
                }}
              >
                Cancel
              </button>
              <button
                onClick={confirmPublish}
                style={{
                  padding: '8px 18px', borderRadius: 6, border: 'none',
                  background: 'linear-gradient(180deg, #2d7ff9 0%, #1b61c9 100%)',
                  color: '#fff', fontSize: 14,
                  cursor: 'pointer', fontWeight: 700,
                  boxShadow: '0 2px 8px rgba(27,97,201,0.3)',
                }}
              >
                Publish Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Revision history modal ──────────────────────────────── */}
      {showHistory && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 2147483647,
          background: 'rgba(0,0,0,0.45)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{
            background: '#fff', borderRadius: 12, padding: '24px 28px',
            maxWidth: 500, width: '90%', maxHeight: '80vh',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
            fontFamily: 'system-ui',
            animation: 'slideUp 0.2s ease',
            display: 'flex', flexDirection: 'column',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: '#111827' }}>
                📜 Revision History
              </h3>
              <button
                onClick={() => setShowHistory(false)}
                style={{
                  background: 'none', border: 'none', fontSize: 18,
                  cursor: 'pointer', color: '#9ca3af', padding: '4px 8px',
                }}
              >
                ✕
              </button>
            </div>

            <p style={{ margin: '0 0 16px', fontSize: 13, color: '#6b7280' }}>
              Each publish creates a snapshot. Restore any previous version below.
            </p>

            <div style={{ flex: 1, overflow: 'auto' }}>
              {loadingRevisions ? (
                <div style={{ textAlign: 'center', padding: 24, color: '#9ca3af' }}>
                  Loading revisions…
                </div>
              ) : revisions.length === 0 ? (
                <div style={{
                  textAlign: 'center', padding: 24, color: '#9ca3af',
                  background: '#f8fafc', borderRadius: 8,
                }}>
                  <div style={{ fontSize: 32, marginBottom: 8 }}>📭</div>
                  No revisions yet. Revisions are created each time you publish.
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {revisions.map((rev) => (
                    <div key={rev.id} style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '10px 12px', borderRadius: 8,
                      border: '1px solid #e5e7eb', background: '#fafafa',
                    }}>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: '#111827' }}>
                          {rev.label || 'Published'}
                        </div>
                        <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 2 }}>
                          {new Date(rev.published_at).toLocaleString('en-US', {
                            month: 'short', day: 'numeric', year: 'numeric',
                            hour: 'numeric', minute: '2-digit', hour12: true,
                          })}
                          {' · '}
                          {formatRelativeTime(rev.published_at)}
                        </div>
                      </div>
                      <button
                        onClick={() => setShowRestoreConfirm(rev)}
                        disabled={restoringId === rev.id}
                        style={{
                          padding: '6px 14px', borderRadius: 6,
                          border: '1px solid #d1d5db', background: '#fff',
                          fontSize: 12, cursor: 'pointer', fontWeight: 600,
                          color: '#374151',
                          opacity: restoringId === rev.id ? 0.5 : 1,
                        }}
                      >
                        {restoringId === rev.id ? 'Restoring…' : 'Restore'}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Restore confirmation modal ──────────────────────────── */}
      {showRestoreConfirm && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 2147483648,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{
            background: '#fff', borderRadius: 12, padding: '24px 28px',
            maxWidth: 400, width: '90%',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
            fontFamily: 'system-ui',
          }}>
            <div style={{ fontSize: 28, marginBottom: 12 }}>↩️</div>
            <h3 style={{ margin: '0 0 8px', fontSize: 16, fontWeight: 700, color: '#111827' }}>
              Restore this version?
            </h3>
            <p style={{ margin: '0 0 16px', fontSize: 13, color: '#6b7280', lineHeight: 1.6 }}>
              This will replace the published page with the version from:{' '}
              <strong>{showRestoreConfirm.label}</strong>
              <br /><br />
              Your current version will be auto-saved as a snapshot before restoring, so you can undo this.
            </p>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <button
                onClick={() => setShowRestoreConfirm(null)}
                style={{
                  padding: '8px 14px', borderRadius: 6, border: '1px solid #d1d5db',
                  background: '#fff', fontSize: 13, cursor: 'pointer', fontWeight: 500,
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => restoreRevision(showRestoreConfirm)}
                style={{
                  padding: '8px 14px', borderRadius: 6, border: 'none',
                  background: '#1b61c9', color: '#fff', fontSize: 13,
                  cursor: 'pointer', fontWeight: 600,
                }}
              >
                Restore this version
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Puck editor ─────────────────────────────────────────── */}
      <Puck
        config={puckConfig}
        data={initialData!}
        onPublish={requestPublish}
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

          // ── Outline with section labels ───────────────────────
          outline: ({ children }) => (
            <OutlineWithLabels>{children}</OutlineWithLabels>
          ),

          headerActions: ({ children }) => (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>

              {/* ── Row 1: Controls ──────────────────────────────── */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>

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
                        {p.has_draft ? ' 📝' : ''}
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

                {/* Preview Draft */}
                <a
                  href={`/admin/preview${pagePath === '/' ? '' : pagePath}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Preview your current draft exactly as visitors would see it"
                  style={{
                    padding: '6px 12px', borderRadius: 6,
                    border: '1px solid #d1d5db', background: '#fff',
                    fontSize: 13, textDecoration: 'none', color: '#374151',
                    fontFamily: 'system-ui', fontWeight: 500,
                  }}
                >
                  👁 Preview Draft ↗
                </a>

                {/* History */}
                <button
                  onClick={openHistory}
                  title="View and restore previous versions of this page"
                  style={{
                    padding: '6px 12px', borderRadius: 6,
                    border: '1px solid #d1d5db', background: '#fff',
                    fontSize: 13, cursor: 'pointer', fontFamily: 'system-ui',
                    fontWeight: 500, color: '#374151',
                  }}
                >
                  📜 History
                </button>

                {/* Save Draft (manual) */}
                <button
                  onClick={manualSaveDraft}
                  disabled={!isDirty || draftStatus === 'saving'}
                  title="Save your current work without publishing"
                  style={{
                    padding: '6px 12px', borderRadius: 6,
                    border: '1px solid #d1d5db', background: isDirty ? '#f0f9ff' : '#fff',
                    fontSize: 13, cursor: isDirty ? 'pointer' : 'default',
                    fontFamily: 'system-ui', fontWeight: 500,
                    color: isDirty ? '#0369a1' : '#9ca3af',
                    opacity: isDirty ? 1 : 0.6,
                  }}
                >
                  💾 Save Draft
                </button>

                {/* Divider */}
                <span style={{ width: 1, height: 20, background: '#e5e7eb', flexShrink: 0 }} />

                {/* Reset */}
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

                {/* Publishing spinner */}
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

                {/* Published indicator */}
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

              {/* ── Row 2: Status bar ───────────────────────────────── */}
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '4px 0 2px',
                borderTop: '1px solid rgba(0,0,0,0.06)',
                marginTop: 4,
                fontSize: 11,
                fontFamily: 'system-ui',
                gap: 12,
              }}>
                {/* Left: publish + draft state */}
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

                {/* Center: draft autosave status */}
                <span style={{
                  display: 'flex', alignItems: 'center', gap: 4,
                  color: draftStatus === 'saving' ? '#0369a1' : '#9ca3af',
                  fontSize: 10,
                }}>
                  {draftStatus === 'saving' && (
                    <>
                      <span style={{
                        width: 8, height: 8,
                        border: '1.5px solid #bae6fd', borderTopColor: '#0369a1',
                        borderRadius: '50%', display: 'inline-block',
                        animation: 'spin 0.7s linear infinite',
                      }} />
                      Saving draft…
                    </>
                  )}
                  {draftStatus === 'saved' && lastDraftAt && (
                    <>
                      <span style={{ color: '#059669' }}>✓</span>
                      Draft saved {formatSaveTime(lastDraftAt)}
                    </>
                  )}
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
