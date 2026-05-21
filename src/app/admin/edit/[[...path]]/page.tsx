'use client'

/**
 * Puck Visual Editor — Production Admin Route
 *
 * Phase 0: Operator Safety Layer
 * Phase 1: Campaign Velocity
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
 * - Page duplication system
 * - 9-template selector with descriptions
 */

import { useEffect, useState, useCallback, useMemo, useRef } from 'react'
import { Puck, blocksPlugin, type Data, usePuck } from '@puckeditor/core'
import { puckConfig } from '@/puck.config'
import '@puckeditor/core/puck.css'

type PageEntry = { path: string; saved: boolean; updated_at: string | null; has_draft?: boolean }
type Revision = { id: string; published_at: string; label: string }
type SavedSection = { id: string; name: string; category: string; created_at: string }
type SectionCategory = { key: string; label: string }

// Template registry metadata — all 15 templates
const TEMPLATE_OPTIONS = [
  { value: 'blank', label: '⬜ Blank page', desc: 'Empty page — add sections manually' },
  { value: 'homepage-standard', label: '🏠 Homepage Standard', desc: 'Hero → Stats → Features → Steps → Testimonials → CTA' },
  { value: 'product-page', label: '📦 Product Page', desc: 'HeroBlue → Stats → Product Cards → Pricing → FAQ → CTA' },
  { value: 'campaign-landing', label: '🎯 Campaign Landing', desc: 'HeroDark → Video → Benefits → Proof → Pricing → CTA' },
  { value: 'onboarding-page', label: '🚶 Onboarding Guide', desc: 'HeroBlue → 5-Step Process → FAQ → CTA' },
  { value: 'webinar-landing', label: '🎬 Webinar / Masterclass', desc: 'HeroDark event → Video → Benefits → Attendee Proof → CTA' },
  { value: 'comparison-page', label: '⚖️ Comparison / Why Us', desc: 'PageHeader → Advantages → Trust Signals → Testimonials → CTA' },
  { value: 'trust-proof-page', label: '🛡️ Trust & Proof', desc: 'HeroBlue → Trust Cards → Quote → Video → Stats → CTA' },
  { value: 'cta-landing', label: '⚡ Direct CTA Landing', desc: 'HeroDark → 3 Benefits → Featured Offer → CTA' },
  { value: 'campaign-funnel', label: '🔥 Full Campaign Funnel', desc: 'Hero → Ticker → Stats → Benefits → Quote → Pricing → FAQ → CTA' },
  { value: 'webinar-registration', label: '📋 Webinar Registration', desc: 'CTAStrip → FunnelSteps → FormBlock → Urgency CTA' },
  { value: 'lead-magnet-page', label: '📥 Lead Magnet / Free Resource', desc: 'Hero → Features → FormBlock → Testimonials → CTA' },
  { value: 'pricing-offer-page', label: '💰 Pricing / Offer Comparison', desc: 'PageHeader → 3 PricingCards → FAQ → Testimonials → CTA' },
  { value: 'consultation-booking', label: '📞 Consultation / Book a Call', desc: 'Hero → FunnelSteps (vertical) → Quote → FormBlock → CTA' },
  { value: 'onboarding-funnel', label: '🚀 Onboarding Funnel', desc: 'HeroBlue → 4-Step FunnelSteps → Features → Stats → Testimonials → CTA' },
  { value: 'trust-authority-page', label: '🏛️ Trust / Authority Landing', desc: 'HeroBlue → Stats → TrustSignals → Quote → Testimonials → CTA' },
]

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
  // Access current Puck data to extract section names and full content structure
  let sectionNames: Record<string, string> = {}
  let totalComponents = 0
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { appState } = usePuck()
    if (appState?.data?.content) {
      totalComponents = appState.data.content.length
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
        💡 Click sections to edit. Drop FAQ items <em>inside</em> a FAQ Section.
      </div>

      {/* PHASE B: Improved section map with numbered entries and component count */}
      {totalComponents > 0 && (
        <div style={{
          padding: '6px 12px 8px',
          fontSize: 10,
          fontFamily: 'system-ui',
          borderBottom: '1px solid #f1f5f9',
          background: '#f8fafc',
          flexShrink: 0,
        }}>
          <div style={{
            fontWeight: 700, color: '#374151', marginBottom: 4,
            textTransform: 'uppercase', letterSpacing: '0.05em',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <span>Page map</span>
            <span style={{
              fontSize: 9, fontWeight: 600, color: '#6b7280',
              background: '#e5e7eb', borderRadius: 99, padding: '1px 6px',
              textTransform: 'none', letterSpacing: 0,
            }}>
              {totalComponents} top-level
            </span>
          </div>
          {nameCount > 0 ? (
            nameList.map((name, i) => (
              <div key={i} style={{
                color: '#374151', lineHeight: 1.6,
                display: 'flex', alignItems: 'center', gap: 5,
              }}>
                <span style={{
                  color: '#fff', fontSize: 8, fontWeight: 700,
                  background: '#1b61c9', borderRadius: 99,
                  width: 14, height: 14, display: 'inline-flex',
                  alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>{i + 1}</span>
                <span style={{ fontWeight: 500 }}>{name}</span>
              </div>
            ))
          ) : (
            <div style={{ color: '#9ca3af', fontStyle: 'italic' }}>
              No named sections — add sectionName to SectionBox props
            </div>
          )}
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

  // Page duplication state
  const [showDuplicate, setShowDuplicate] = useState(false)
  const [duplicatePath, setDuplicatePath] = useState('')
  const [duplicating, setDuplicating]   = useState(false)

  // PHASE E: auto-suggest duplicate path based on current page
  const suggestDuplicatePath = useCallback(() => {
    if (pagePath === '/') return '/homepage-copy'
    return `${pagePath}-copy`
  }, [pagePath])

  // PHASE A: Saved Section Library state
  const [showSectionLibrary, setShowSectionLibrary] = useState(false)
  const [savedSections, setSavedSections] = useState<SavedSection[]>([])
  const [sectionCategories, setSectionCategories] = useState<SectionCategory[]>([])
  const [activeSectionCategory, setActiveSectionCategory] = useState('all')
  const [loadingSections, setLoadingSections] = useState(false)
  const [savingSectionName, setSavingSectionName] = useState('')
  const [savingSectionCategory, setSavingSectionCategory] = useState('content')
  const [showSaveSection, setShowSaveSection] = useState(false)
  const [sectionSaveStatus, setSectionSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')

  // PHASE A: Load saved sections
  const loadSections = useCallback(async () => {
    setLoadingSections(true)
    try {
      const res = await fetch('/api/puck/sections')
      if (res.ok) {
        const json = await res.json()
        setSavedSections(json.sections || [])
        setSectionCategories(json.categories || [])
      }
    } catch (e) {
      console.error('[Sections] Load failed:', e)
    }
    setLoadingSections(false)
  }, [])

  // PHASE A: Insert a saved section into current page
  const insertSavedSection = useCallback(async (sectionId: string) => {
    try {
      const res = await fetch(`/api/puck/sections?id=${sectionId}&full=true`)
      if (!res.ok) return
      const json = await res.json()
      if (json.section?.data) {
        // Store the section data for the InsertSectionHelper to pick up
        pendingInsertRef.current = json.section.data
        // Force a re-render to trigger the helper
        setShowSectionLibrary(false)
      }
    } catch (e) {
      console.error('[Sections] Insert failed:', e)
    }
  }, [])
  const pendingInsertRef = useRef<unknown>(null)

  // FIX 2+3 — one-time orientation banners (from URL params, dismissed in-memory)
  const [templateBanner, setTemplateBanner] = useState<string | null>(null)
  const [duplicateBanner, setDuplicateBanner] = useState<string | null>(null)

  // FIX 4 — styled dirty-page-switch modal (replaces window.confirm)
  const [showSwitchConfirm, setShowSwitchConfirm] = useState(false)
  const [pendingSwitchPath, setPendingSwitchPath]  = useState<string | null>(null)


  const saveSectionRef = useRef<(() => void) | null>(null)

  // Refs for synchronous closure-safe access
  const isDirtyRef = useRef(false)
  const latestDataRef = useRef<Data | null>(null)
  const autosaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useHideGlobalChrome()
  useBeforeUnloadGuard(isDirty)

  // PHASE F: Keyboard shortcuts for operator momentum
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      // Escape closes any open modal
      if (e.key === 'Escape') {
        if (showSectionLibrary) { setShowSectionLibrary(false); return }
        if (showSaveSection) { setShowSaveSection(false); setSectionSaveStatus('idle'); return }
        if (showHistory) { setShowHistory(false); return }
        if (showDuplicate) { setShowDuplicate(false); return }
        if (showNewPage) { setShowNewPage(false); return }
        if (showResetConfirm) { setShowResetConfirm(false); return }
        if (showSwitchConfirm) { setShowSwitchConfirm(false); setPendingSwitchPath(null); return }
        if (showPublishConfirm) { setShowPublishConfirm(false); return }
      }
      // Ctrl+Shift+S → manual save draft
      if (e.ctrlKey && e.shiftKey && e.key === 'S') {
        e.preventDefault()
        if (isDirty) manualSaveDraft()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showSectionLibrary, showSaveSection, showHistory, showDuplicate, showNewPage, showResetConfirm, showSwitchConfirm, showPublishConfirm, isDirty])

  // Resolve page path from route params
  // FIX 2+3: read ?fromTemplate and ?duplicatedFrom URL params for one-time banners
  useEffect(() => {
    params.then((resolved) => {
      const path = resolved.path ? '/' + resolved.path.join('/') : '/'
      setPagePath(path)
      setPathResolved(true)
    })
    // Read orientation params from URL (client-side only, no SSR concern)
    const searchParams = new URLSearchParams(window.location.search)
    const fromTemplate = searchParams.get('fromTemplate')
    const fromDuplicate = searchParams.get('duplicatedFrom')
    if (fromTemplate) {
      const tmpl = TEMPLATE_OPTIONS.find(t => t.value === fromTemplate)
      setTemplateBanner(tmpl ? tmpl.label : fromTemplate)
      // Clean the param from the URL without a page reload
      const cleanUrl = window.location.pathname
      window.history.replaceState({}, '', cleanUrl)
    }
    if (fromDuplicate) {
      setDuplicateBanner(fromDuplicate)
      const cleanUrl = window.location.pathname
      window.history.replaceState({}, '', cleanUrl)
    }
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

  // FIX 1: Reset page — must pass ?force=true so seed actually overwrites existing content
  const resetToDefault = useCallback(async () => {
    setShowResetConfirm(false)
    setLoading(true)
    try {
      await fetch(`/api/puck/seed?path=${encodeURIComponent(pagePath)}&force=true`, {
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

  // FIX 4: styled modal replaces window.confirm for dirty-page-switch
  const switchPage = useCallback((newPath: string) => {
    if (isDirtyRef.current) {
      setPendingSwitchPath(newPath)
      setShowSwitchConfirm(true)
      return
    }
    window.location.href = `/admin/edit${newPath === '/' ? '' : newPath}`
  }, [])

  const confirmSwitchPage = useCallback(() => {
    if (!pendingSwitchPath) return
    setShowSwitchConfirm(false)
    const path = pendingSwitchPath
    setPendingSwitchPath(null)
    window.location.href = `/admin/edit${path === '/' ? '' : path}`
  }, [pendingSwitchPath])

  // Create new page
  // FIX 2: navigate with ?fromTemplate= so new page shows orientation banner
  const createPage = useCallback(async () => {
    if (!newPagePath) return
    const path = newPagePath.startsWith('/') ? newPagePath : `/${newPagePath}`
    setShowNewPage(false)
    setNewPagePath('')
    const templateUsed = selectedTemplate !== 'blank' ? selectedTemplate : null

    if (templateUsed) {
      try {
        await fetch(
          `/api/puck/seed?path=${encodeURIComponent(path)}&template=${encodeURIComponent(templateUsed)}`,
          {
            method: 'POST',
            headers: { 'x-puck-write-secret': WRITE_SECRET },
          }
        )
      } catch {}
    }

    // Navigate directly (bypass switchPage's dirty-check — this is a new page creation)
    const suffix = templateUsed ? `?fromTemplate=${encodeURIComponent(templateUsed)}` : ''
    window.location.href = `/admin/edit${path}${suffix}`
  }, [newPagePath, selectedTemplate])

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

  // ── Page duplication ──────────────────────────────────────────────
  const duplicatePage = useCallback(async () => {
    if (!duplicatePath) return
    const targetPath = duplicatePath.startsWith('/') ? duplicatePath : `/${duplicatePath}`
    setDuplicating(true)
    try {
      const res = await fetch('/api/puck?duplicate=true', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-puck-write-secret': WRITE_SECRET,
        },
        body: JSON.stringify({ sourcePath: pagePath, targetPath }),
      })
      const result = await res.json()
      if (res.ok && result.ok) {
        setShowDuplicate(false)
        setDuplicatePath('')
        // FIX 3: Navigate with ?duplicatedFrom param so new page shows orientation banner
        const sourceForBanner = encodeURIComponent(pagePath)
        window.location.href = `/admin/edit${targetPath}?duplicatedFrom=${sourceForBanner}`
      } else {
        alert(result.error || 'Failed to duplicate page')
      }
    } catch {
      alert('Network error — could not duplicate page')
    }
    setDuplicating(false)
  }, [pagePath, duplicatePath])

  // Viewports
  const viewports = useMemo(() => [
    { width: 360, height: 'auto' as const, label: '📱 Mobile (360px)', icon: '📱' },
    { width: 768, height: 'auto' as const, label: '📱 Tablet (768px)', icon: '📱' },
    { width: 1280, height: 'auto' as const, label: '🖥️ Desktop (1280px)', icon: '🖥️' },
  ], [])

  // Count sections for publish confirmation
  const sectionCount = initialData?.content?.length ?? 0

  // PHASE F: Premium loading screen
  if (loading) {
    return (
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', height: '100vh', fontFamily: 'system-ui',
        background: 'linear-gradient(180deg, #f8fafc 0%, #f0f4f8 100%)', gap: '1rem',
      }}>
        <div style={{
          width: 44, height: 44, border: '3px solid #e2e8f0',
          borderTopColor: '#1b61c9', borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '1rem', color: '#374151', fontWeight: 600, margin: '0 0 4px' }}>
            AutoPuck Editor
          </p>
          <p style={{ fontSize: '0.85rem', color: '#6b7280', margin: 0 }}>
            Loading <strong>{pagePath === '/' ? 'Homepage' : pagePath}</strong>
          </p>
        </div>
        <p style={{ fontSize: '0.75rem', color: '#9ca3af', margin: 0 }}>
          Checking for drafts…
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

      {/* ── FIX 2: Template load orientation banner ──────────────── */}
      {templateBanner && (
        <div style={{
          position: 'fixed', top: 60, left: '50%', transform: 'translateX(-50%)',
          zIndex: 2147483647,
          background: '#92400e', color: '#fef3c7',
          padding: '10px 20px', borderRadius: 8,
          fontFamily: 'system-ui', fontSize: 13, fontWeight: 600,
          boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
          animation: 'slideUp 0.3s ease',
          display: 'flex', alignItems: 'center', gap: 8,
          maxWidth: 560, textAlign: 'left',
        }}>
          <span>📄</span>
          <span>
            Loaded from <strong>{templateBanner}</strong> template.
            Review all sections and update copy before publishing.
          </span>
          <button
            onClick={() => setTemplateBanner(null)}
            style={{
              background: 'rgba(255,255,255,0.2)', border: 'none', color: '#fef3c7',
              borderRadius: 4, padding: '2px 8px', cursor: 'pointer', fontSize: 12,
              marginLeft: 8, flexShrink: 0,
            }}
          >
            ✕
          </button>
        </div>
      )}

      {/* ── FIX 3: Duplication orientation banner ────────────────── */}
      {duplicateBanner && (
        <div style={{
          position: 'fixed', top: 60, left: '50%', transform: 'translateX(-50%)',
          zIndex: 2147483647,
          background: '#1e40af', color: '#dbeafe',
          padding: '10px 20px', borderRadius: 8,
          fontFamily: 'system-ui', fontSize: 13, fontWeight: 600,
          boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
          animation: 'slideUp 0.3s ease',
          display: 'flex', alignItems: 'center', gap: 8,
          maxWidth: 520,
        }}>
          <span>📋</span>
          <span>
            Duplicated from <strong>{duplicateBanner}</strong>.
            You are now editing the copy — update content before publishing.
          </span>
          <button
            onClick={() => setDuplicateBanner(null)}
            style={{
              background: 'rgba(255,255,255,0.2)', border: 'none', color: '#dbeafe',
              borderRadius: 4, padding: '2px 8px', cursor: 'pointer', fontSize: 12,
              marginLeft: 8, flexShrink: 0,
            }}
          >
            ✕
          </button>
        </div>
      )}

      {/* ── FIX 4: Styled dirty-page-switch confirmation modal ───── */}
      {showSwitchConfirm && (
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
            <div style={{ fontSize: 28, marginBottom: 12 }}>⚠️</div>
            <h3 style={{ margin: '0 0 8px', fontSize: 17, fontWeight: 700, color: '#111827' }}>
              Leave without publishing?
            </h3>
            <p style={{ margin: '0 0 20px', fontSize: 14, color: '#6b7280', lineHeight: 1.6 }}>
              You have <strong>unpublished changes</strong> on this page.
              If you leave now, your edits will remain as a draft — but won't go live.
              <br /><br />
              Your autosaved draft will still be here when you return.
            </p>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <button
                onClick={() => { setShowSwitchConfirm(false); setPendingSwitchPath(null) }}
                style={{
                  padding: '8px 16px', borderRadius: 6, border: '1px solid #d1d5db',
                  background: '#fff', fontSize: 14, cursor: 'pointer', fontWeight: 500,
                }}
              >
                Stay on this page
              </button>
              <button
                onClick={confirmSwitchPage}
                style={{
                  padding: '8px 18px', borderRadius: 6, border: 'none',
                  background: '#374151', color: '#fff', fontSize: 14,
                  cursor: 'pointer', fontWeight: 700,
                }}
              >
                Leave without publishing
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Save success toast ──────────────────────────────────── */}
      {saveStatus === 'saved' && (
        <div style={{
          position: 'fixed', top: 60, right: 16, zIndex: 2147483647,
          background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
          color: '#fff',
          padding: '12px 20px', borderRadius: 10,
          fontFamily: 'system-ui', fontSize: 13, fontWeight: 600,
          boxShadow: '0 8px 24px rgba(5,150,105,0.35)',
          animation: 'slideUp 0.25s ease',
          display: 'flex', alignItems: 'center', gap: 10,
          pointerEvents: 'none',
        }}>
          <span style={{ fontSize: 18 }}>✅</span>
          <div>
            <div>Published successfully</div>
            <div style={{ fontSize: 11, fontWeight: 400, opacity: 0.85, marginTop: 2 }}>
              {pagePath === '/' ? 'Homepage' : pagePath} is now live. Allow 30–60s for cache refresh.
            </div>
          </div>
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
              {/* TASK 4: Mobile viewport reminder — Phase F enhanced */}
              <div style={{
                marginTop: 8, padding: '8px 12px', borderRadius: 8,
                background: '#eff6ff', border: '1.5px solid #bfdbfe',
                fontSize: 12, color: '#1e40af',
                display: 'flex', alignItems: 'flex-start', gap: 8,
              }}>
                <span style={{ fontSize: 16, lineHeight: 1 }}>📱</span>
                <div>
                  <div style={{ fontWeight: 600, marginBottom: 2 }}>Mobile Preview Check</div>
                  <span style={{ color: '#3b82f6' }}>Use the viewport buttons (360px / 768px / 1280px) in the top toolbar to verify your page looks great on all devices.</span>
                </div>
              </div>
              {/* Phase E: Recovery reassurance */}
              <div style={{
                marginTop: 6, padding: '6px 12px', borderRadius: 6,
                background: '#f0fdf4', border: '1px solid #bbf7d0',
                fontSize: 11, color: '#15803d',
                display: 'flex', alignItems: 'center', gap: 6,
              }}>
                <span>🔄</span>
                <span>Your previous version is auto-saved. You can restore it anytime from the version history.</span>
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

      {/* ── Duplicate page modal ─────────────────────────────────── */}
      {showDuplicate && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 2147483647,
          background: 'rgba(0,0,0,0.45)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{
            background: '#fff', borderRadius: 12, padding: '28px 32px',
            maxWidth: 440, width: '90%',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
            fontFamily: 'system-ui',
            animation: 'slideUp 0.2s ease',
          }}>
            <div style={{ fontSize: 28, marginBottom: 12 }}>📋</div>
            <h3 style={{ margin: '0 0 8px', fontSize: 17, fontWeight: 700, color: '#111827' }}>
              Duplicate this page
            </h3>
            <p style={{ margin: '0 0 16px', fontSize: 13, color: '#6b7280', lineHeight: 1.6 }}>
              Create a copy of <strong>{pagePath === '/' ? 'Homepage' : pagePath}</strong> with all sections and content preserved.
              The new page will open immediately in the editor.
            </p>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 6 }}>
                New page path:
              </label>
              <input
                type="text"
                placeholder="/campaign-summer"
                value={duplicatePath}
                onChange={(e) => setDuplicatePath(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && duplicatePage()}
                style={{
                  width: '100%', padding: '10px 14px', borderRadius: 8,
                  border: '1px solid #d1d5db', fontSize: 14,
                  fontFamily: 'system-ui', boxSizing: 'border-box',
                }}
                autoFocus
              />
              <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 4 }}>
                Examples: /campaign-summer, /crypto-masterclass, /aurum-special
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <button
                onClick={() => { setShowDuplicate(false); setDuplicatePath('') }}
                style={{
                  padding: '8px 16px', borderRadius: 6, border: '1px solid #d1d5db',
                  background: '#fff', fontSize: 14, cursor: 'pointer', fontWeight: 500,
                }}
              >
                Cancel
              </button>
              <button
                onClick={duplicatePage}
                disabled={!duplicatePath || duplicating}
                style={{
                  padding: '8px 18px', borderRadius: 6, border: 'none',
                  background: duplicatePath ? 'linear-gradient(180deg, #059669 0%, #047857 100%)' : '#d1d5db',
                  color: '#fff', fontSize: 14,
                  cursor: duplicatePath ? 'pointer' : 'default', fontWeight: 700,
                  boxShadow: duplicatePath ? '0 2px 8px rgba(5,150,105,0.3)' : 'none',
                  opacity: duplicating ? 0.6 : 1,
                }}
              >
                {duplicating ? 'Duplicating…' : '📋 Duplicate & Open'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── TASK 4: Editor sidebar field readability ───────────────── */}
      <style>{`
        /*
         * Force ALL Puck sidebar text/textarea/select inputs to use safe dark text.
         * Puck's CSS modules hash class names (e.g. _Input-input_bsxfo_26) but we
         * target by attribute substring match for resilience across versions.
         *
         * Problem: when editing HeroDark (white text), the sidebar contentEditable
         * inputs inherit color: #fff, making text invisible on white background.
         *
         * Fix: force dark text and white bg on all input elements in the host page.
         * This does NOT affect iframe rendering (public frontend).
         */

        /* Puck sidebar inputs — force readable */
        [class*="_Input-input_"] {
          color: #1f2937 !important;
          background-color: #ffffff !important;
        }
        [class*="_Input-input_"]::selection {
          background: rgba(59, 130, 246, 0.25) !important;
          color: #111827 !important;
        }

        /* Puck RichText editor in sidebar — force readable */
        [class*="_RichTextEditor--editor_"] .ProseMirror {
          color: #1f2937 !important;
          background: #ffffff !important;
        }
        [class*="_RichTextEditor--editor_"] .ProseMirror ::selection {
          background: rgba(59, 130, 246, 0.25) !important;
          color: #111827 !important;
        }

        /* Puck field labels — ensure visible */
        [class*="_FieldLabel_"] {
          color: #374151 !important;
        }

        /* Puck select dropdowns — force readable */
        [class*="_Input-input_"] option {
          color: #1f2937 !important;
          background: #ffffff !important;
        }
      `}</style>

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

                /* ─── INLINE EDITING — clearer focus states ─── */
                [contenteditable]:hover {
                  outline: 2px dashed rgba(27,97,201,0.25) !important;
                  outline-offset: 2px;
                  cursor: text;
                  border-radius: 4px;
                }
                [contenteditable]:focus {
                  outline: 2px solid rgba(27,97,201,0.5) !important;
                  outline-offset: 2px;
                  border-radius: 4px;
                  background: rgba(27,97,201,0.03) !important;
                }
                [contenteditable]::selection {
                  background: rgba(27,97,201,0.18);
                }

                /* ─── PHASE B: CTA / Button inline affordance ─── */
                a[href]:not([contenteditable]):hover,
                button:not([contenteditable]):hover {
                  outline: 2px solid rgba(34,197,94,0.5) !important;
                  outline-offset: 2px;
                  border-radius: 6px;
                  cursor: pointer;
                }
                a[href]:not([contenteditable]) {
                  transition: outline 0.15s ease, outline-offset 0.15s ease;
                }

                /* ─── PHASE C: Media inline hover affordance ─── */
                img:not([data-puck-ignore]):hover {
                  outline: 2px dashed rgba(139,92,246,0.4) !important;
                  outline-offset: 2px;
                  border-radius: 8px;
                  cursor: pointer;
                }

                /* ─── PHASE D: DropZone insertion clarity ─── */
                [data-puck-dropzone]:empty {
                  min-height: 80px;
                  border: 2px dashed #e2e8f0;
                  border-radius: 8px;
                  background: repeating-linear-gradient(
                    -45deg,
                    transparent,
                    transparent 8px,
                    rgba(226,232,240,0.3) 8px,
                    rgba(226,232,240,0.3) 16px
                  );
                  transition: border-color 0.2s ease, background 0.2s ease;
                }
                [data-puck-dropzone]:empty:hover {
                  border-color: #93c5fd;
                  background: rgba(219,234,254,0.15);
                }

                /* ─── PHASE G: Smooth transitions for all interactive elements ─── */
                [data-puck-component] {
                  transition: outline 0.15s ease, box-shadow 0.15s ease, opacity 0.15s ease;
                }
                [data-puck-component]:hover {
                  outline: 1px solid rgba(27,97,201,0.12);
                  outline-offset: 0;
                  border-radius: 4px;
                }
                [data-puck-component][data-puck-selected] {
                  outline: 2px solid rgba(27,97,201,0.4) !important;
                  box-shadow: 0 0 0 4px rgba(27,97,201,0.08);
                  border-radius: 4px;
                }

                /* ─── PHASE D: Drag reorder confidence ─── */
                [data-puck-component][data-puck-dragging] {
                  opacity: 0.5 !important;
                  outline: 2px dashed #3b82f6 !important;
                  box-shadow: 0 0 0 6px rgba(59,130,246,0.08) !important;
                }
                [data-puck-dropzone] [data-puck-drop-indicator] {
                  background: linear-gradient(90deg, transparent 0%, #3b82f6 15%, #3b82f6 85%, transparent 100%) !important;
                  height: 3px !important;
                  border-radius: 2px;
                  box-shadow: 0 0 8px rgba(59,130,246,0.3);
                }

                /* ─── PHASE F: Long page section orientation ─── */
                [data-puck-component][data-puck-selected] {
                  scroll-margin-top: 80px;
                }

                /* ─── PHASE G: Smoother scroll behavior ─── */
                html { scroll-behavior: smooth; }
              `
              iframeDoc.head.appendChild(overrideStyle)
            }, [iframeDoc])
            return <>{children}</>
          },

          // ── PHASE A: Contextual section controls on canvas ──────────────
          componentOverlay: ({ children, componentType, isSelected, hover }) => {
            const isSectionBox = componentType === 'SectionBox'
            const isHero = componentType === 'HeroDark' || componentType === 'HeroBlue'
            const isCTA = componentType === 'CTABand'
            const showOverlay = isSectionBox || isHero || isCTA

            // For non-primary types, show a subtle type badge on hover
            if (!showOverlay) {
              return (
                <div style={{ position: 'relative' }}>
                  {children}
                  {(isSelected || hover) && (
                    <div style={{
                      position: 'absolute', top: 2, right: 8, zIndex: 100,
                      pointerEvents: 'none',
                    }}>
                      <span style={{
                        fontSize: 9, fontWeight: 600, color: '#6b7280',
                        fontFamily: 'system-ui', textTransform: 'uppercase',
                        background: 'rgba(255,255,255,0.92)',
                        padding: '1px 6px', borderRadius: 99,
                        border: '1px solid rgba(0,0,0,0.08)',
                        letterSpacing: '0.04em',
                      }}>
                        {componentType.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                    </div>
                  )}
                </div>
              )
            }

            const visible = isSelected || hover

            // Read the actual sectionName from the component's data
            let displayName = isHero ? 'Hero' : isCTA ? 'CTA' : 'Section'
            try {
              // eslint-disable-next-line react-hooks/rules-of-hooks
              const { appState } = usePuck()
              if (appState?.data?.content && isSectionBox) {
                for (const item of appState.data.content) {
                  if (item.type === 'SectionBox') {
                    const sn = (item.props as Record<string, unknown>).sectionName as string
                    if (sn) { displayName = sn; break }
                  }
                }
              }
            } catch { /* usePuck not available */ }

            const labelIcon = isHero ? '🎯' : isCTA ? '📢' : '📦'

            return (
              <div style={{ position: 'relative' }}>
                {children}
                {visible && (
                  <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, zIndex: 100,
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '4px 8px',
                    background: isSelected
                      ? 'rgba(27,97,201,0.12)'
                      : 'rgba(27,97,201,0.06)',
                    borderTop: isSelected
                      ? '2px solid rgba(27,97,201,0.6)'
                      : '2px solid rgba(27,97,201,0.25)',
                    transition: 'background 0.15s ease',
                    pointerEvents: isSelected ? 'auto' : 'none',
                  }}>
                    {/* Left: Section label */}
                    <span style={{
                      fontSize: 10, fontWeight: 600, letterSpacing: '0.05em',
                      color: '#1b61c9', fontFamily: 'system-ui', textTransform: 'uppercase',
                      background: 'rgba(255,255,255,0.92)', padding: '2px 8px',
                      borderRadius: 99, border: '1px solid rgba(27,97,201,0.2)',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                      pointerEvents: 'none',
                    }}>
                      {labelIcon} {displayName}
                    </span>

                    {/* Right: Quick action buttons (only when selected) */}
                    {isSelected && isSectionBox && (
                      <div style={{
                        display: 'flex', gap: 4, alignItems: 'center',
                      }}>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            loadSections()
                            setSectionSaveStatus('idle')
                            setSavingSectionName('')
                            setShowSaveSection(true)
                          }}
                          title="Save this section to your library"
                          style={{
                            padding: '2px 8px', borderRadius: 99, border: '1px solid rgba(27,97,201,0.25)',
                            background: 'rgba(255,255,255,0.95)', fontSize: 10, fontWeight: 600,
                            color: '#1b61c9', cursor: 'pointer', fontFamily: 'system-ui',
                            display: 'flex', alignItems: 'center', gap: 3,
                            boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                            transition: 'background 0.15s ease',
                          }}
                          onMouseEnter={(e) => { e.currentTarget.style.background = '#eff6ff' }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.95)' }}
                        >
                          💾 Save
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            loadSections()
                            setShowSectionLibrary(true)
                          }}
                          title="Insert a section from your library"
                          style={{
                            padding: '2px 8px', borderRadius: 99, border: '1px solid rgba(22,163,74,0.25)',
                            background: 'rgba(255,255,255,0.95)', fontSize: 10, fontWeight: 600,
                            color: '#166534', cursor: 'pointer', fontFamily: 'system-ui',
                            display: 'flex', alignItems: 'center', gap: 3,
                            boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                            transition: 'background 0.15s ease',
                          }}
                          onMouseEnter={(e) => { e.currentTarget.style.background = '#f0fdf4' }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.95)' }}
                        >
                          📦 Library
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          },

          // ── Outline with section labels ───────────────────────
          outline: ({ children }) => (
            <OutlineWithLabels>{children}</OutlineWithLabels>
          ),

          headerActions: ({ children }) => {
            // PHASE A/B: Inner component that has usePuck() access
            function PuckContextHelpers() {
              // eslint-disable-next-line react-hooks/rules-of-hooks
              const { appState, dispatch } = usePuck()

              // PHASE A: Register save section callback
              // eslint-disable-next-line react-hooks/rules-of-hooks
              useEffect(() => {
                saveSectionRef.current = async () => {
                  if (!appState?.data?.content?.length) return
                  setSectionSaveStatus('saving')
                  try {
                    // Save all top-level content as the section data
                    const sectionData = {
                      content: appState.data.content,
                      zones: (appState.data as Record<string, unknown>).zones || {},
                    }
                    const writeSecret = process.env.NEXT_PUBLIC_PUCK_WRITE_SECRET || ''
                    const res = await fetch('/api/puck/sections', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                        'x-puck-write-secret': writeSecret,
                      },
                      body: JSON.stringify({
                        name: savingSectionName,
                        category: savingSectionCategory,
                        data: sectionData,
                      }),
                    })
                    if (res.ok) {
                      setSectionSaveStatus('saved')
                    } else {
                      setSectionSaveStatus('error')
                    }
                  } catch {
                    setSectionSaveStatus('error')
                  }
                }
              }, [appState])

              // PHASE A: Handle pending section insert
              // eslint-disable-next-line react-hooks/rules-of-hooks
              useEffect(() => {
                if (pendingInsertRef.current && appState?.data) {
                  const sectionData = pendingInsertRef.current as { content?: unknown[]; zones?: Record<string, unknown> }
                  pendingInsertRef.current = null

                  if (sectionData.content && Array.isArray(sectionData.content)) {
                    // Generate new IDs for the inserted content to avoid collisions
                    const newContent = [...appState.data.content]
                    const existingZones = ((appState.data as Record<string, unknown>).zones || {}) as Record<string, unknown>
                    const newZones = { ...existingZones }

                    for (const item of sectionData.content) {
                      const typedItem = item as Record<string, unknown>
                      const oldId = (typedItem.props as Record<string, unknown>)?.id as string
                      const newId = `${typedItem.type}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`
                      const newItem = {
                        ...typedItem,
                        props: { ...(typedItem.props as Record<string, unknown>), id: newId },
                      }
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      newContent.push(newItem as any)

                      // Copy zone data if the section has nested zones
                      if (oldId && sectionData.zones) {
                        for (const [zoneKey, zoneData] of Object.entries(sectionData.zones)) {
                          if (zoneKey.startsWith(`${oldId}:`)) {
                            const newZoneKey = zoneKey.replace(oldId, newId)
                            newZones[newZoneKey] = zoneData
                          }
                        }
                      }
                    }

                    dispatch({
                      type: 'set',
                      state: {
                        ...appState,
                        data: {
                          ...appState.data,
                          content: newContent,
                          zones: newZones,
                        } as Data,
                      },
                    })
                  }
                }
              })

              return null // Invisible helper — just registers callbacks and handles effects
            }

            return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              <PuckContextHelpers />

              {/* ── Row 1: Controls ──────────────────────────────── */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>

                {/* Page Switcher — PHASE E: improved grouping */}
                {(() => {
                  const published = pages.filter(p => p.saved)
                  const draftsOnly = pages.filter(p => !p.saved && p.has_draft)
                  const empty = pages.filter(p => !p.saved && !p.has_draft)
                  return (
                    <select
                      value={pagePath}
                      onChange={(e) => switchPage(e.target.value)}
                      style={{
                        padding: '6px 12px', borderRadius: 6,
                        border: '1px solid #d1d5db', fontSize: 13,
                        fontFamily: 'system-ui', background: '#fff',
                        cursor: 'pointer', minWidth: 180,
                      }}
                    >
                      {published.length > 0 && (
                        <optgroup label="● Published">
                          {published.map((p) => (
                            <option key={p.path} value={p.path}>
                              {p.path === '/' ? '/ (Homepage)' : p.path}
                              {p.has_draft ? ' ✎' : ''}
                            </option>
                          ))}
                        </optgroup>
                      )}
                      {draftsOnly.length > 0 && (
                        <optgroup label="✎ Drafts">
                          {draftsOnly.map((p) => (
                            <option key={p.path} value={p.path}>
                              {p.path} ✎
                            </option>
                          ))}
                        </optgroup>
                      )}
                      {empty.length > 0 && (
                        <optgroup label="○ Not started">
                          {empty.map((p) => (
                            <option key={p.path} value={p.path}>
                              {p.path}
                            </option>
                          ))}
                        </optgroup>
                      )}
                    </select>
                  )
                })()}

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
                    {/* TASK 3: Template description shown below selector */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ fontSize: 11, color: '#6b7280', fontFamily: 'system-ui', whiteSpace: 'nowrap' }}>
                        Template:
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
                        {TEMPLATE_OPTIONS.map((t) => (
                          <option key={t.value} value={t.value}>
                            {t.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    {/* Template description visible below selector */}
                    {selectedTemplate !== 'blank' && (() => {
                      const tmpl = TEMPLATE_OPTIONS.find(t => t.value === selectedTemplate)
                      return tmpl ? (
                        <div style={{
                          fontSize: 11, color: '#374151',
                          background: '#f0f9ff',
                          border: '1px solid #bae6fd',
                          borderRadius: 5, padding: '5px 8px',
                          fontFamily: 'system-ui', lineHeight: 1.4,
                          marginTop: 2,
                        }}>
                          <span style={{ fontWeight: 600, color: '#0369a1' }}>Flow: </span>
                          {tmpl.desc}
                        </div>
                      ) : null
                    })()}
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

                {/* Duplicate Page */}
                <button
                  onClick={() => { setDuplicatePath(suggestDuplicatePath()); setShowDuplicate(true) }}
                  title="Create a copy of this page for a new campaign"
                  style={{
                    padding: '6px 12px', borderRadius: 6,
                    border: '1px solid #d1d5db', background: '#fff',
                    fontSize: 13, cursor: 'pointer', fontFamily: 'system-ui',
                    fontWeight: 500, color: '#374151',
                  }}
                >
                  📋 Duplicate
                </button>

                {/* PHASE A: Section Library */}
                <button
                  onClick={() => { loadSections(); setShowSectionLibrary(true) }}
                  title="Browse and insert reusable campaign sections"
                  style={{
                    padding: '6px 12px', borderRadius: 6,
                    border: '1px solid #d1d5db', background: '#f0fdf4',
                    fontSize: 13, cursor: 'pointer', fontFamily: 'system-ui',
                    fontWeight: 500, color: '#166534',
                  }}
                >
                  📦 Sections
                </button>

                {/* PHASE A: Save Current Page as Reusable Section */}
                <button
                  onClick={() => { loadSections(); setSectionSaveStatus('idle'); setSavingSectionName(''); setShowSaveSection(true) }}
                  title="Save this page's sections as a reusable template"
                  style={{
                    padding: '6px 12px', borderRadius: 6,
                    border: '1px solid #d1d5db', background: '#fff',
                    fontSize: 13, cursor: 'pointer', fontFamily: 'system-ui',
                    fontWeight: 500, color: '#374151',
                  }}
                >
                  💾 Save Section
                </button>

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

                {/* Right: keyboard shortcuts */}
                <span style={{ color: '#9ca3af', whiteSpace: 'nowrap', display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                  <span>
                    <kbd style={{ fontFamily: 'system-ui', background: 'rgba(0,0,0,0.05)', padding: '1px 5px', borderRadius: 3, fontSize: 10, border: '1px solid rgba(0,0,0,0.08)' }}>Ctrl+Z</kbd>
                    {' '}undo
                  </span>
                  <span style={{ color: '#d1d5db' }}>·</span>
                  <span>
                    <kbd style={{ fontFamily: 'system-ui', background: 'rgba(0,0,0,0.05)', padding: '1px 5px', borderRadius: 3, fontSize: 10, border: '1px solid rgba(0,0,0,0.08)' }}>Ctrl+Y</kbd>
                    {' '}redo
                  </span>
                  <span style={{ color: '#d1d5db' }}>·</span>
                  <span>
                    <kbd style={{ fontFamily: 'system-ui', background: 'rgba(0,0,0,0.05)', padding: '1px 5px', borderRadius: 3, fontSize: 10, border: '1px solid rgba(0,0,0,0.08)' }}>Ctrl+Shift+S</kbd>
                    {' '}save draft
                  </span>
                  <span style={{ color: '#d1d5db' }}>·</span>
                  <span>
                    <kbd style={{ fontFamily: 'system-ui', background: 'rgba(0,0,0,0.05)', padding: '1px 5px', borderRadius: 3, fontSize: 10, border: '1px solid rgba(0,0,0,0.08)' }}>Esc</kbd>
                    {' '}close
                  </span>
                </span>
              </div>
            </div>
          )},
        }}
       />

      {/* ── PHASE A: Section Library Modal ────────────────────────── */}
      {showSectionLibrary && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 2147483647,
          background: 'rgba(0,0,0,0.45)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{
            background: '#fff', borderRadius: 12, padding: '24px 28px',
            maxWidth: 560, width: '92%', maxHeight: '80vh',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
            fontFamily: 'system-ui',
            animation: 'slideUp 0.2s ease',
            display: 'flex', flexDirection: 'column',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexShrink: 0 }}>
              <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: '#111827' }}>
                📦 Section Library
              </h3>
              <button
                onClick={() => setShowSectionLibrary(false)}
                style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: '#6b7280', padding: 4 }}
              >
                ✕
              </button>
            </div>

            {/* Category tabs */}
            <div style={{
              display: 'flex', gap: 4, flexWrap: 'wrap',
              marginBottom: 14, flexShrink: 0,
            }}>
              <button
                onClick={() => setActiveSectionCategory('all')}
                style={{
                  padding: '4px 10px', borderRadius: 99, fontSize: 11, fontWeight: 600,
                  border: activeSectionCategory === 'all' ? '1px solid #1b61c9' : '1px solid #e5e7eb',
                  background: activeSectionCategory === 'all' ? '#eff6ff' : '#fff',
                  color: activeSectionCategory === 'all' ? '#1b61c9' : '#6b7280',
                  cursor: 'pointer',
                }}
              >
                All
              </button>
              {sectionCategories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setActiveSectionCategory(cat.key)}
                  style={{
                    padding: '4px 10px', borderRadius: 99, fontSize: 11, fontWeight: 600,
                    border: activeSectionCategory === cat.key ? '1px solid #1b61c9' : '1px solid #e5e7eb',
                    background: activeSectionCategory === cat.key ? '#eff6ff' : '#fff',
                    color: activeSectionCategory === cat.key ? '#1b61c9' : '#6b7280',
                    cursor: 'pointer',
                  }}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Section list */}
            <div style={{ flex: 1, overflow: 'auto', minHeight: 100 }}>
              {loadingSections ? (
                <div style={{ textAlign: 'center', padding: '2rem', color: '#9ca3af' }}>
                  Loading sections…
                </div>
              ) : (() => {
                const filtered = activeSectionCategory === 'all'
                  ? savedSections
                  : savedSections.filter(s => s.category === activeSectionCategory)
                return filtered.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '2rem', color: '#9ca3af' }}>
                    <div style={{ fontSize: 28, marginBottom: 8 }}>📭</div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#6b7280', marginBottom: 4 }}>No saved sections yet</div>
                    <div style={{ fontSize: 11 }}>
                      Save sections from your pages using the &quot;Save as Reusable&quot; option in the Sections menu.
                    </div>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {filtered.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => insertSavedSection(s.id)}
                        style={{
                          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                          padding: '10px 14px', borderRadius: 8,
                          border: '1px solid #e5e7eb', background: '#fff',
                          cursor: 'pointer', textAlign: 'left',
                          transition: 'border-color 0.15s, background 0.15s',
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#1b61c9'; e.currentTarget.style.background = '#f8faff' }}
                        onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#e5e7eb'; e.currentTarget.style.background = '#fff' }}
                      >
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 600, color: '#111827' }}>
                            {s.name}
                          </div>
                          <div style={{ fontSize: 10, color: '#9ca3af', marginTop: 2 }}>
                            {sectionCategories.find(c => c.key === s.category)?.label || s.category}
                            {' · '}
                            {new Date(s.created_at).toLocaleDateString()}
                          </div>
                        </div>
                        <span style={{ fontSize: 11, color: '#1b61c9', fontWeight: 600 }}>+ Insert</span>
                      </button>
                    ))}
                  </div>
                )
              })()}
            </div>

            <div style={{
              marginTop: 14, paddingTop: 12,
              borderTop: '1px solid #f1f5f9',
              fontSize: 11, color: '#9ca3af', textAlign: 'center',
            }}>
              Sections are inserted at the end of the page. Drag to reorder after inserting.
            </div>
          </div>
        </div>
      )}

      {/* ── PHASE A: Save Section Modal ───────────────────────────── */}
      {showSaveSection && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 2147483647,
          background: 'rgba(0,0,0,0.45)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{
            background: '#fff', borderRadius: 12, padding: '24px 28px',
            maxWidth: 420, width: '90%',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
            fontFamily: 'system-ui',
            animation: 'slideUp 0.2s ease',
          }}>
            <h3 style={{ margin: '0 0 12px', fontSize: 17, fontWeight: 700, color: '#111827' }}>
              📦 Save Section to Library
            </h3>
            <p style={{ fontSize: 13, color: '#6b7280', margin: '0 0 16px', lineHeight: 1.5 }}>
              Save the currently selected section as a reusable template you can insert into any page.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
              <input
                type="text"
                placeholder="Section name (e.g. 'Hero — Webinar Launch')"
                value={savingSectionName}
                onChange={(e) => setSavingSectionName(e.target.value)}
                style={{
                  padding: '8px 12px', borderRadius: 6, border: '1px solid #d1d5db',
                  fontSize: 13, fontFamily: 'system-ui',
                }}
                autoFocus
              />
              <select
                value={savingSectionCategory}
                onChange={(e) => setSavingSectionCategory(e.target.value)}
                style={{
                  padding: '8px 12px', borderRadius: 6, border: '1px solid #d1d5db',
                  fontSize: 13, fontFamily: 'system-ui', background: '#fff',
                }}
              >
                {sectionCategories.map((cat) => (
                  <option key={cat.key} value={cat.key}>{cat.label}</option>
                ))}
              </select>
            </div>
            {sectionSaveStatus === 'saved' && (
              <div style={{
                marginBottom: 12, padding: '8px 12px', borderRadius: 6,
                background: '#f0fdf4', border: '1px solid #bbf7d0',
                fontSize: 12, color: '#166534',
              }}>
                ✅ Section saved to library!
              </div>
            )}
            {sectionSaveStatus === 'error' && (
              <div style={{
                marginBottom: 12, padding: '8px 12px', borderRadius: 6,
                background: '#fef2f2', border: '1px solid #fecaca',
                fontSize: 12, color: '#dc2626',
              }}>
                ❌ Failed to save section. Try again.
              </div>
            )}
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <button
                onClick={() => { setShowSaveSection(false); setSectionSaveStatus('idle'); setSavingSectionName('') }}
                style={{
                  padding: '8px 16px', borderRadius: 6, border: '1px solid #d1d5db',
                  background: '#fff', fontSize: 14, cursor: 'pointer', fontWeight: 500,
                }}
              >
                {sectionSaveStatus === 'saved' ? 'Done' : 'Cancel'}
              </button>
              {sectionSaveStatus !== 'saved' && (
                <button
                  onClick={() => {
                    // The SaveSectionHelper component handles the actual save
                    // via saveSectionFromEditor callback
                    if (saveSectionRef.current) {
                      saveSectionRef.current()
                    }
                  }}
                  disabled={!savingSectionName.trim() || sectionSaveStatus === 'saving'}
                  style={{
                    padding: '8px 18px', borderRadius: 6, border: 'none',
                    background: savingSectionName.trim()
                      ? 'linear-gradient(180deg, #059669 0%, #047857 100%)'
                      : '#d1d5db',
                    color: '#fff', fontSize: 14, cursor: savingSectionName.trim() ? 'pointer' : 'default',
                    fontWeight: 700, opacity: sectionSaveStatus === 'saving' ? 0.7 : 1,
                  }}
                >
                  {sectionSaveStatus === 'saving' ? 'Saving…' : 'Save Section'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
