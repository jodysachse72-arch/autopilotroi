/**
 * plasmic-init-server.ts — Server-side Plasmic loader
 *
 * This file uses the react-server export of the Plasmic loader,
 * which is safe to call from Next.js Server Components and
 * generateMetadata functions.
 *
 * For client-side rendering (PlasmicRootProvider, PlasmicComponent),
 * continue using the main plasmic-init.ts.
 */

import { initPlasmicLoader } from '@plasmicapp/loader-nextjs/react-server'

export const PLASMIC_SERVER = initPlasmicLoader({
  projects: [
    {
      id: process.env.NEXT_PUBLIC_PLASMIC_PROJECT_ID!,
      token: process.env.NEXT_PUBLIC_PLASMIC_API_TOKEN!,
    },
  ],
  preview: process.env.NODE_ENV !== 'production',
})
