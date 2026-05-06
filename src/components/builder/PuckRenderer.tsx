'use client'

/**
 * PuckRenderer — Renders saved Puck page data on the live site.
 *
 * Usage:
 *   <PuckRenderer data={savedPageData} />
 *
 * This renders the exact same components (HeroDark, SectionBox, etc.)
 * but in read-only mode with the saved content.
 */

import { Render, type Data } from '@puckeditor/core'
import { puckConfig } from '@/puck.config'
import { useScrollReveal } from '@/lib/useScrollReveal'

export default function PuckRenderer({ data }: { data: Data }) {
  // Activate scroll-reveal animations so .reveal elements become visible
  useScrollReveal()
  return <Render config={puckConfig} data={data} />
}
