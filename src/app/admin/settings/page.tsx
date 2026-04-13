'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* ═══════════════════════════════════════════════════════════════
   SYSTEM INTEGRATIONS — Credential Vault & Status Dashboard
   
   Shows all platform integrations with:
   - Live connection status (env var detection)
   - Editable credential fields (saved to localStorage)
   - Copy-to-clipboard for Vercel env setup
   - Documentation links for each service
   ═══════════════════════════════════════════════════════════════ */

interface EnvField {
  key: string
  label: string
  placeholder: string
  required: boolean
  sensitive?: boolean // masks the value
  hint?: string
}

interface Integration {
  id: string
  name: string
  icon: string
  description: string
  docsUrl: string
  dashboardUrl?: string
  category: 'hosting' | 'database' | 'email' | 'cms' | 'analytics' | 'security'
  envFields: EnvField[]
}

const INTEGRATIONS: Integration[] = [
  {
    id: 'vercel',
    name: 'Vercel',
    icon: '▲',
    description: 'Hosting, CI/CD, and edge deployment. Auto-deploys on git push.',
    docsUrl: 'https://vercel.com/docs',
    dashboardUrl: 'https://vercel.com/dashboard',
    category: 'hosting',
    envFields: [
      { key: 'NEXT_PUBLIC_SITE_URL', label: 'Site URL', placeholder: 'https://autopilotroi.com', required: true, hint: 'Your production domain' },
      { key: 'VERCEL_URL', label: 'Vercel URL', placeholder: 'auto-detected by Vercel', required: false, hint: 'Auto-set by Vercel — usually not needed' },
    ],
  },
  {
    id: 'supabase',
    name: 'Supabase',
    icon: '⚡',
    description: 'PostgreSQL database, authentication, and realtime subscriptions.',
    docsUrl: 'https://supabase.com/docs',
    dashboardUrl: 'https://supabase.com/dashboard',
    category: 'database',
    envFields: [
      { key: 'NEXT_PUBLIC_SUPABASE_URL', label: 'Supabase URL', placeholder: 'https://xxxxx.supabase.co', required: true, hint: 'Project Settings → API → Project URL' },
      { key: 'NEXT_PUBLIC_SUPABASE_ANON_KEY', label: 'Anon Key', placeholder: 'eyJhbGciOiJIUzI1NiIs...', required: true, sensitive: true, hint: 'Project Settings → API → anon / public key' },
      { key: 'SUPABASE_SERVICE_ROLE_KEY', label: 'Service Role Key', placeholder: 'eyJhbGciOiJIUzI1NiIs...', required: true, sensitive: true, hint: '⚠ Server-side only. Project Settings → API → service_role / secret' },
    ],
  },
  {
    id: 'resend',
    name: 'Resend',
    icon: '✉️',
    description: 'Transactional email delivery for partner notifications and drip campaigns.',
    docsUrl: 'https://resend.com/docs',
    dashboardUrl: 'https://resend.com/emails',
    category: 'email',
    envFields: [
      { key: 'RESEND_API_KEY', label: 'API Key', placeholder: 're_xxxxxxxxxx', required: true, sensitive: true, hint: 'Resend Dashboard → API Keys' },
      { key: 'RESEND_FROM_EMAIL', label: 'From Address', placeholder: 'AutopilotROI <onboarding@yourdomain.com>', required: true, hint: 'Must use a verified domain in Resend' },
    ],
  },
  {
    id: 'sanity',
    name: 'Sanity CMS',
    icon: '🎨',
    description: 'Headless CMS for blog posts, pages, and university video content.',
    docsUrl: 'https://www.sanity.io/docs',
    dashboardUrl: 'https://www.sanity.io/manage',
    category: 'cms',
    envFields: [
      { key: 'NEXT_PUBLIC_SANITY_PROJECT_ID', label: 'Project ID', placeholder: 'gnd0za31', required: true, hint: 'Sanity → Manage → Project ID' },
      { key: 'NEXT_PUBLIC_SANITY_DATASET', label: 'Dataset', placeholder: 'production', required: false, hint: 'Usually "production"' },
      { key: 'SANITY_API_TOKEN', label: 'API Token', placeholder: 'skxxxxxxxxxx', required: false, sensitive: true, hint: 'Only needed for server-side writes' },
    ],
  },
  {
    id: 'plausible',
    name: 'Plausible Analytics',
    icon: '📊',
    description: 'Privacy-friendly, cookie-free analytics. No GDPR banners needed.',
    docsUrl: 'https://plausible.io/docs',
    dashboardUrl: 'https://plausible.io/sites',
    category: 'analytics',
    envFields: [
      { key: 'NEXT_PUBLIC_PLAUSIBLE_DOMAIN', label: 'Domain', placeholder: 'autopilotroi.com', required: true, hint: 'Must match the site added in Plausible' },
    ],
  },
  {
    id: 'sentry',
    name: 'Sentry',
    icon: '🛡️',
    description: 'Error monitoring and performance tracking for production.',
    docsUrl: 'https://docs.sentry.io/platforms/javascript/guides/nextjs/',
    dashboardUrl: 'https://sentry.io/organizations/',
    category: 'analytics',
    envFields: [
      { key: 'NEXT_PUBLIC_SENTRY_DSN', label: 'DSN', placeholder: 'https://xxxx@o12345.ingest.sentry.io/67890', required: true, sensitive: true, hint: 'Sentry → Settings → Client Keys (DSN)' },
      { key: 'SENTRY_AUTH_TOKEN', label: 'Auth Token', placeholder: 'sntrys_xxxx', required: false, sensitive: true, hint: 'Only for source map uploads' },
    ],
  },
  {
    id: 'turnstile',
    name: 'Cloudflare Turnstile',
    icon: '🤖',
    description: 'Invisible CAPTCHA — bot protection on signup forms.',
    docsUrl: 'https://developers.cloudflare.com/turnstile/',
    dashboardUrl: 'https://dash.cloudflare.com/',
    category: 'security',
    envFields: [
      { key: 'NEXT_PUBLIC_TURNSTILE_SITE_KEY', label: 'Site Key', placeholder: '0x4AAAAAAA...', required: true, hint: 'Cloudflare Dashboard → Turnstile → Site Key' },
      { key: 'TURNSTILE_SECRET_KEY', label: 'Secret Key', placeholder: '0x4AAAAAAA...', required: true, sensitive: true, hint: 'Cloudflare Dashboard → Turnstile → Secret Key' },
    ],
  },
  {
    id: 'thrivedesk',
    name: 'ThriveDesk',
    icon: '💬',
    description: 'Live chat widget for visitor support. Routes conversations to your helpdesk team.',
    docsUrl: 'https://docs.thrivedesk.com/',
    dashboardUrl: 'https://app.thrivedesk.com/',
    category: 'support' as Integration['category'],
    envFields: [
      { key: 'NEXT_PUBLIC_THRIVEDESK_WIDGET_ID', label: 'Widget ID', placeholder: 'wp_xxxxxxxxxx', required: true, hint: 'ThriveDesk → Settings → Assistant → Installation → Widget ID' },
    ],
  },
]

const STORAGE_KEY = 'autopilot-integrations-vault'

function loadVault(): Record<string, string> {
  if (typeof window === 'undefined') return {}
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
  } catch { return {} }
}

function saveVault(vault: Record<string, string>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(vault))
  } catch { /* storage full */ }
}

const categoryLabels: Record<string, string> = {
  hosting: '🌐 Hosting & Deployment',
  database: '🗄️ Database & Auth',
  email: '✉️ Email',
  cms: '🎨 Content Management',
  analytics: '📈 Analytics & Monitoring',
  security: '🔒 Security',
  support: '💬 Support & Helpdesk',
}

const categoryOrder = ['hosting', 'database', 'email', 'cms', 'analytics', 'security', 'support']

export default function SettingsPage() {
  const [vault, setVault] = useState<Record<string, string>>({})
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [copiedKey, setCopiedKey] = useState<string | null>(null)
  const [savedFlash, setSavedFlash] = useState(false)
  const [showSensitive, setShowSensitive] = useState<Record<string, boolean>>({})

  useEffect(() => { setVault(loadVault()) }, [])

  const updateField = useCallback((key: string, value: string) => {
    setVault(prev => {
      const next = { ...prev, [key]: value }
      saveVault(next)
      return next
    })
  }, [])

  function copyToClipboard(key: string, value: string) {
    navigator.clipboard.writeText(value)
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  function copyAllAsEnv(integration: Integration) {
    const lines = integration.envFields
      .map(f => `${f.key}=${vault[f.key] || f.placeholder}`)
      .join('\n')
    navigator.clipboard.writeText(lines)
    setSavedFlash(true)
    setTimeout(() => setSavedFlash(false), 2000)
  }

  function toggleSensitive(key: string) {
    setShowSensitive(prev => ({ ...prev, [key]: !prev[key] }))
  }

  // Group integrations by category
  const grouped = categoryOrder.map(cat => ({
    category: cat,
    label: categoryLabels[cat],
    items: INTEGRATIONS.filter(i => i.category === cat),
  })).filter(g => g.items.length > 0)

  // Calculate overall status
  const totalRequired = INTEGRATIONS.flatMap(i => i.envFields.filter(f => f.required)).length
  const configuredCount = INTEGRATIONS.flatMap(i => i.envFields.filter(f => f.required && vault[f.key])).length

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-[var(--font-sora)] text-3xl font-bold text-[var(--text-primary)] tracking-tight">
          System Integrations
        </h1>
        <p className="mt-2 text-[var(--text-muted)]">
          Manage API keys, project IDs, and integration credentials. Values are saved locally in your browser.
        </p>
      </motion.div>

      {/* Status Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="grid gap-4 sm:grid-cols-3"
      >
        <div className="rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-card)] p-5 text-center">
          <div className="text-3xl font-bold text-[var(--text-primary)]">{INTEGRATIONS.length}</div>
          <div className="text-sm text-[var(--text-muted)]">Services</div>
        </div>
        <div className="rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-card)] p-5 text-center">
          <div className={`text-3xl font-bold ${configuredCount === totalRequired ? 'text-emerald-400' : 'text-amber-400'}`}>
            {configuredCount}/{totalRequired}
          </div>
          <div className="text-sm text-[var(--text-muted)]">Required Fields Set</div>
        </div>
        <div className="rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-card)] p-5 text-center">
          <div className="text-3xl font-bold text-blue-400">
            {Math.round((configuredCount / totalRequired) * 100) || 0}%
          </div>
          <div className="text-sm text-[var(--text-muted)]">Setup Complete</div>
        </div>
      </motion.div>

      {/* Integration Groups */}
      {grouped.map((group, gi) => (
        <motion.div
          key={group.category}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 + gi * 0.05 }}
        >
          <h2 className="mb-4 font-[var(--font-sora)] text-lg font-bold text-[var(--text-primary)]">
            {group.label}
          </h2>
          <div className="space-y-3">
            {group.items.map((integration) => {
              const isExpanded = expandedId === integration.id
              const requiredFields = integration.envFields.filter(f => f.required)
              const configuredFields = requiredFields.filter(f => vault[f.key])
              const allConfigured = configuredFields.length === requiredFields.length && requiredFields.length > 0

              return (
                <div
                  key={integration.id}
                  className={`rounded-2xl border transition-colors ${
                    isExpanded
                      ? 'border-blue-500/30 bg-blue-500/[0.03]'
                      : 'border-[var(--border-primary)] bg-[var(--bg-card)]'
                  }`}
                >
                  {/* Collapsed header */}
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : integration.id)}
                    className="flex w-full items-center gap-4 p-5 text-left"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-xl">
                      {integration.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold text-[var(--text-primary)]">{integration.name}</h3>
                        <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                          allConfigured
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : 'bg-amber-500/20 text-amber-400'
                        }`}>
                          {allConfigured ? '● Connected' : `${configuredFields.length}/${requiredFields.length} Set`}
                        </span>
                      </div>
                      <p className="text-sm text-[var(--text-muted)] truncate">{integration.description}</p>
                    </div>
                    <svg
                      className={`h-5 w-5 text-[var(--text-muted)] transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                      fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Expanded fields */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-[var(--border-primary)] px-5 pb-5 pt-4 space-y-4">
                          {integration.envFields.map((field) => (
                            <div key={field.key}>
                              <div className="flex items-center justify-between mb-1.5">
                                <label className="text-sm font-semibold text-[var(--text-secondary)]">
                                  {field.label}
                                  {field.required && <span className="ml-1 text-red-400">*</span>}
                                </label>
                                <code className="text-[10px] font-mono text-[var(--text-muted)] bg-white/5 px-2 py-0.5 rounded">
                                  {field.key}
                                </code>
                              </div>
                              <div className="flex gap-2">
                                <div className="relative flex-1">
                                  <input
                                    type={field.sensitive && !showSensitive[field.key] ? 'password' : 'text'}
                                    value={vault[field.key] || ''}
                                    onChange={(e) => updateField(field.key, e.target.value)}
                                    placeholder={field.placeholder}
                                    className="w-full rounded-lg border border-[var(--border-primary)] bg-[var(--bg-body)] px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)]/40 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-mono transition"
                                  />
                                  {field.sensitive && (
                                    <button
                                      onClick={() => toggleSensitive(field.key)}
                                      className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition"
                                      title={showSensitive[field.key] ? 'Hide' : 'Show'}
                                    >
                                      {showSensitive[field.key] ? '🙈' : '👁️'}
                                    </button>
                                  )}
                                </div>
                                <button
                                  onClick={() => copyToClipboard(field.key, vault[field.key] || '')}
                                  disabled={!vault[field.key]}
                                  className={`flex-shrink-0 rounded-lg px-3 py-2 text-xs font-medium transition ${
                                    copiedKey === field.key
                                      ? 'bg-emerald-500/20 text-emerald-400'
                                      : 'bg-white/10 text-[var(--text-muted)] hover:bg-white/15 hover:text-[var(--text-primary)] disabled:opacity-30 disabled:cursor-not-allowed'
                                  }`}
                                >
                                  {copiedKey === field.key ? '✓' : '📋'}
                                </button>
                              </div>
                              {field.hint && (
                                <p className="mt-1 text-[11px] text-[var(--text-muted)]/60">{field.hint}</p>
                              )}
                            </div>
                          ))}

                          {/* Action buttons */}
                          <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-[var(--border-primary)]">
                            <button
                              onClick={() => copyAllAsEnv(integration)}
                              className={`rounded-lg px-4 py-2 text-xs font-semibold transition ${
                                savedFlash
                                  ? 'bg-emerald-500/20 text-emerald-400'
                                  : 'bg-blue-500/15 text-blue-400 hover:bg-blue-500/25'
                              }`}
                            >
                              {savedFlash ? '✓ Copied!' : '📋 Copy All as .env'}
                            </button>
                            {integration.dashboardUrl && (
                              <a
                                href={integration.dashboardUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-lg bg-white/5 px-4 py-2 text-xs font-medium text-[var(--text-muted)] hover:bg-white/10 hover:text-[var(--text-primary)] transition"
                              >
                                Open Dashboard ↗
                              </a>
                            )}
                            <a
                              href={integration.docsUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="rounded-lg bg-white/5 px-4 py-2 text-xs font-medium text-[var(--text-muted)] hover:bg-white/10 hover:text-[var(--text-primary)] transition"
                            >
                              Docs ↗
                            </a>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </motion.div>
      ))}

      {/* Environment Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-card)] p-6"
      >
        <h2 className="mb-4 font-[var(--font-sora)] text-lg font-bold text-[var(--text-primary)]">
          💡 How This Works
        </h2>
        <div className="space-y-3 text-sm text-[var(--text-muted)]">
          <p>
            <strong className="text-[var(--text-secondary)]">Saved locally</strong> — Your credentials are stored in your browser&apos;s localStorage. They are NOT sent to any server.
          </p>
          <p>
            <strong className="text-[var(--text-secondary)]">For Vercel deployment</strong> — Use the &quot;Copy All as .env&quot; button to copy your credentials, then paste them into your Vercel project&apos;s Environment Variables settings.
          </p>
          <p>
            <strong className="text-[var(--text-secondary)]">Required fields</strong> — Fields marked with <span className="text-red-400">*</span> are required for that integration to function. Optional fields add extra functionality.
          </p>
        </div>
      </motion.div>
    </div>
  )
}
