import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN || '',

  // Only enable in production
  enabled: process.env.NODE_ENV === 'production' && !!process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Performance monitoring — sample 10% of transactions
  tracesSampleRate: 0.1,

  // Don't send PII
  sendDefaultPii: false,

  // Environment tag
  environment: process.env.NODE_ENV,

  // Filter out noisy errors
  ignoreErrors: [
    'ResizeObserver loop',
    'Non-Error promise rejection',
    'Loading chunk',
    'ChunkLoadError',
  ],
})
