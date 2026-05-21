'use client'

/**
 * PuckPageRenderer
 *
 * Renders stored Puck JSON using the registered puckConfig.
 * This is the ONLY place in the public site that calls @puckeditor/core's
 * Render component. It wraps the render in an error boundary so a
 * single component failure cannot white-screen the page.
 *
 * Usage:
 *   import PuckPageRenderer from '@/components/puck/PuckPageRenderer'
 *   <PuckPageRenderer data={puckData} />
 *
 * Governance: Do NOT expose this to the CMS editor component list.
 * This is infrastructure — not a content block.
 */

import { Render, type Data } from '@puckeditor/core'
import { puckConfig } from '@/puck.config'
import { Component, type ReactNode } from 'react'
import '@puckeditor/core/puck.css'

// ── Error boundary ───────────────────────────────────────────────
// Prevents a single block render failure from crashing the entire page.

interface ErrorBoundaryState { hasError: boolean; error?: Error }

class PuckRenderErrorBoundary extends Component<
  { children: ReactNode; fallback?: ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: ReactNode; fallback?: ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: { componentStack: string }) {
    console.error('[PuckPageRenderer] Render error:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? null
    }
    return this.props.children
  }
}

// ── Main renderer ────────────────────────────────────────────────

interface PuckPageRendererProps {
  data: Data
  fallback?: ReactNode
}

export default function PuckPageRenderer({ data, fallback }: PuckPageRendererProps) {
  if (!data || !data.content || data.content.length === 0) {
    return <>{fallback ?? null}</>
  }

  return (
    <PuckRenderErrorBoundary fallback={fallback}>
      <Render config={puckConfig} data={data} />
    </PuckRenderErrorBoundary>
  )
}
