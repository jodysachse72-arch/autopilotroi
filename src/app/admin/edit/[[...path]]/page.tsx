'use client'

/**
 * Puck Visual Editor — Admin Route
 *
 * Visit /admin/edit to visually edit pages.
 * Visit /admin/edit/pricing to edit the /pricing page, etc.
 *
 * - Loads saved page data from the API
 * - Renders the Puck editor with your existing components
 * - Saves page data as JSON back to the API
 */

import { useEffect, useState, useCallback } from 'react'
import { Puck, type Data } from '@puckeditor/core'
import { puckConfig } from '@/puck.config'
import '@puckeditor/core/puck.css'

// Override admin layout chrome — Puck needs full viewport
const fullscreenStyle = `
  .admin-sidebar, .admin-topbar, nav[class*="admin"],
  header, footer, [class*="Navbar"], [class*="Footer"],
  [class*="announcement"], [class*="SmartFaq"] {
    display: none !important;
  }
  .admin-main, main, [class*="admin-content"] {
    margin: 0 !important;
    padding: 0 !important;
    max-width: 100% !important;
    width: 100vw !important;
  }
  body {
    overflow: hidden !important;
  }
`

export default function PuckEditorPage({
  params,
}: {
  params: Promise<{ path?: string[] }>
}) {
  const [pagePath, setPagePath] = useState<string>('/')
  const [initialData, setInitialData] = useState<Data | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  // Resolve the page path from route params
  useEffect(() => {
    params.then((resolved) => {
      const path = resolved.path ? '/' + resolved.path.join('/') : '/'
      setPagePath(path)
    })
  }, [params])

  // Load existing page data
  useEffect(() => {
    if (!pagePath) return

    fetch(`/api/puck?path=${encodeURIComponent(pagePath)}`)
      .then((res) => {
        if (res.ok) return res.json()
        return null
      })
      .then((data) => {
        setInitialData(data || { content: [], root: { props: {} } })
        setLoading(false)
      })
      .catch(() => {
        setInitialData({ content: [], root: { props: {} } })
        setLoading(false)
      })
  }, [pagePath])

  // Save page data to the API
  const handlePublish = useCallback(
    async (data: Data) => {
      setSaving(true)
      try {
        const res = await fetch('/api/puck', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ path: pagePath, data }),
        })
        if (res.ok) {
          alert(`✅ Page "${pagePath}" saved successfully!`)
        } else {
          alert('❌ Failed to save. Check the console for details.')
        }
      } catch (err) {
        console.error('Save error:', err)
        alert('❌ Network error while saving.')
      } finally {
        setSaving(false)
      }
    },
    [pagePath]
  )

  if (loading) {
    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: fullscreenStyle }} />
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          fontFamily: 'system-ui',
          fontSize: '1.25rem',
          color: '#666',
          background: '#fafafa',
        }}>
          Loading editor for <strong style={{ marginLeft: '0.5ch' }}>{pagePath}</strong>…
        </div>
      </>
    )
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: fullscreenStyle }} />
      <Puck
        config={puckConfig}
        data={initialData!}
        onPublish={handlePublish}
        headerTitle={`Editing: ${pagePath}`}
      />
    </>
  )
}
