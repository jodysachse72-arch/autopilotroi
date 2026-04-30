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
 *   https://autopilotroi.vercel.app/plasmic-host   (production / stable)
 *   http://localhost:3000/plasmic-host              (local dev)
 *
 * IMPORTANT: This page must be publicly accessible (no auth required).
 *
 * WHY NO PLASMIC LOADER HERE:
 * We deliberately do NOT import PLASMIC / initPlasmicLoader on this page.
 * The loader makes async API calls to Plasmic's CDN after mounting. When
 * those calls complete (or fail), the loader's internal state changes and
 * studio.js re-reads the component registry — finding it modified. This
 * causes the components to flash briefly and then disappear from the
 * Studio Components panel.
 *
 * Instead, we register components directly via @plasmicapp/host, which
 * writes to globalThis.__PlasmicComponentRegistry synchronously and
 * permanently. studio.js reads the same registry and the components
 * stay visible.
 */

import { PlasmicCanvasHost } from '@plasmicapp/loader-nextjs'
import { registerAllHostComponents } from '@/components/builder/plasmicHostRegistrations'

// Register synchronously at module load time — no async, no loader API calls.
registerAllHostComponents()

export default function PlasmicHostPage() {
  return <PlasmicCanvasHost />
}
