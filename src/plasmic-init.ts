'use client'

/**
 * plasmic-init.ts — Client-side Plasmic loader
 *
 * Single source of truth for the client-side Plasmic loader instance.
 * Import PLASMIC wherever you need to render Plasmic content in client
 * components (PlasmicRootProvider, PlasmicComponent).
 *
 * For server-side data fetching (Server Components, generateMetadata),
 * use plasmic-init-server.ts instead.
 *
 * TO SET UP:
 * 1. Go to studio.plasmic.app → your project → Settings → API Tokens
 * 2. Copy your Project ID and Public API Token
 * 3. Paste them in .env.local:
 *    NEXT_PUBLIC_PLASMIC_PROJECT_ID=your-project-id
 *    NEXT_PUBLIC_PLASMIC_API_TOKEN=your-token
 */

import { initPlasmicLoader } from '@plasmicapp/loader-nextjs'
import { registerAllComponents } from '@/components/builder/plasmicComponents'

export const PLASMIC = initPlasmicLoader({
  projects: [
    {
      id: process.env.NEXT_PUBLIC_PLASMIC_PROJECT_ID!,
      token: process.env.NEXT_PUBLIC_PLASMIC_API_TOKEN!,
    },
  ],
  preview: process.env.NODE_ENV !== 'production',
})

// Register all custom code components once at init time.
registerAllComponents(PLASMIC)
