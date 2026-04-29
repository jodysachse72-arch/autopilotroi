'use client'

/**
 * plasmic-init.ts
 *
 * Single source of truth for the Plasmic loader instance.
 * Import PLASMIC wherever you need to fetch or render Plasmic content.
 *
 * TO SET UP:
 * 1. Go to studio.plasmic.app → your project → Settings (gear icon) → API Tokens
 * 2. Copy your Project ID and Public API Token
 * 3. Paste them in .env.local:
 *    NEXT_PUBLIC_PLASMIC_PROJECT_ID=your-project-id
 *    NEXT_PUBLIC_PLASMIC_API_TOKEN=your-token
 *
 * PREVIEW MODE:
 * Set preview: true during development so you see unpublished changes.
 * Set preview: false for production (only sees published content).
 */

import { initPlasmicLoader } from '@plasmicapp/loader-nextjs'

export const PLASMIC = initPlasmicLoader({
  projects: [
    {
      id: process.env.NEXT_PUBLIC_PLASMIC_PROJECT_ID!,
      token: process.env.NEXT_PUBLIC_PLASMIC_API_TOKEN!,
    },
  ],
  // In preview mode Barry sees unpublished draft changes in real-time.
  // In production this should be false so only published content appears.
  preview: process.env.NODE_ENV !== 'production',
})
