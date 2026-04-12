import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'AutopilotROI',
    short_name: 'AutopilotROI',
    description: 'AI-Driven Finance — The structured onboarding platform for the Aurum ecosystem.',
    start_url: '/',
    display: 'standalone',
    background_color: '#06122f',
    theme_color: '#06122f',
    orientation: 'portrait-primary',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  }
}
