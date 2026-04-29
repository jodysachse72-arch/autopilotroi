'use client'

/**
 * /plasmic-host — Plasmic Studio Preview Host
 *
 * When Barry opens the visual editor at studio.plasmic.app, the studio
 * renders this page inside an iframe. This page bootstraps the Plasmic
 * canvas so Barry can see his real AutopilotROI components in the panel.
 *
 * SET THIS URL IN PLASMIC:
 * Plasmic Studio → your project → Settings → Edit → App Host URL:
 *   https://your-vercel-url.vercel.app/plasmic-host   (staging)
 *   https://autopilotroi.com/plasmic-host             (production)
 * 
 * Also works locally:
 *   http://localhost:3000/plasmic-host
 *
 * IMPORTANT: This page must be publicly accessible (no auth required).
 */

import { PlasmicCanvasHost } from '@plasmicapp/loader-nextjs'
import { PLASMIC } from '@/plasmic-init'
import { registerAllComponents } from '@/components/builder/plasmicComponents'

registerAllComponents(PLASMIC)

export default function PlasmicHostPage() {
  return <PlasmicCanvasHost />
}
