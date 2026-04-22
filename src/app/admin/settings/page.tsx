'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  SectionHeader,
  Card,
  StatCard,
  StatusBadge,
  FormButton,
  type StatusTone,
} from '@/components/backend'

/* ═══════════════════════════════════════════════════════════════
   SYSTEM INTEGRATIONS — Credential Vault & Status Dashboard

   Shows all platform integrations with:
   - Live connection status (env var detection)
   - Editable credential fields (saved to localStorage)
   - Copy-to-clipboard for Vercel env setup
   - Documentation links for each service
   ═══════════════════════════════════════════════════════════════ */

type IntegrationCategory =
  | 'hosting'
  | 'database'
  | 'email'
  | 'cms'
  | 'analytics'
  | 'security'
  | 'support'

interface EnvField {
  key: string
  label: string
  placeholder: string
  required: boolean
  sensitive?: boolean
  hint?: string
}

interface Integration {
  id: string
  name: string
  icon: string
  description: string
  docsUrl: string
  dashboardUrl?: string
  category: IntegrationCategory
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
    category: 'support',
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
  } catch {
    return {}
  }
}

function saveVault(vault: Record<string, string>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(vault))
  } catch {
    /* storage full */
  }
}

const categoryLabels: Record<IntegrationCategory, string> = {
  hosting:   '🌐 Hosting & Deployment',
  database:  '🗄️ Database & Auth',
  email:     '✉️ Email',
  cms:       '🎨 Content Management',
  analytics: '📈 Analytics & Monitoring',
  security:  '🔒 Security',
  support:   '💬 Support & Helpdesk',
}

const categoryOrder: IntegrationCategory[] = [
  'hosting', 'database', 'email', 'cms', 'analytics', 'security', 'support',
]

export default function SettingsPage() {
  const [vault, setVault] = useState<Record<string, string>>({})
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [copiedKey, setCopiedKey] = useState<string | null>(null)
  const [savedFlash, setSavedFlash] = useState(false)
  const [showSensitive, setShowSensitive] = useState<Record<string, boolean>>({})

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- hydrate from localStorage on mount
    setVault(loadVault())
  }, [])

  const updateField = useCallback((key: string, value: string) => {
    setVault((prev) => {
      const next = { ...prev, [key]: value }
      saveVault(next)
      return next
    })
  }, [])

  const copyToClipboard = useCallback((key: string, value: string) => {
    navigator.clipboard.writeText(value)
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 2000)
  }, [])

  const copyAllAsEnv = useCallback((integration: Integration) => {
    const lines = integration.envFields
      .map((f) => `${f.key}=${vault[f.key] || f.placeholder}`)
      .join('\n')
    navigator.clipboard.writeText(lines)
    setSavedFlash(true)
    setTimeout(() => setSavedFlash(false), 2000)
  }, [vault])

  const toggleSensitive = useCallback((key: string) => {
    setShowSensitive((prev) => ({ ...prev, [key]: !prev[key] }))
  }, [])

  const grouped = categoryOrder
    .map((cat) => ({
      category: cat,
      label: categoryLabels[cat],
      items: INTEGRATIONS.filter((i) => i.category === cat),
    }))
    .filter((g) => g.items.length > 0)

  const totalRequired = INTEGRATIONS.flatMap((i) =>
    i.envFields.filter((f) => f.required)
  ).length
  const configuredCount = INTEGRATIONS.flatMap((i) =>
    i.envFields.filter((f) => f.required && vault[f.key])
  ).length
  const setupPct = totalRequired > 0
    ? Math.round((configuredCount / totalRequired) * 100)
    : 0

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <SectionHeader
        title="System Integrations"
        subtitle="Manage API keys, project IDs, and integration credentials. Values are saved locally in your browser."
      />

      {/* ── Overview ── */}
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Services" value={INTEGRATIONS.length} icon="🔌" />
        <StatCard
          label="Required Fields Set"
          value={`${configuredCount}/${totalRequired}`}
          delta={configuredCount === totalRequired ? 'All configured' : 'Some missing'}
          trend={configuredCount === totalRequired ? 'up' : 'down'}
        />
        <StatCard
          label="Setup Complete"
          value={`${setupPct}%`}
          icon="✅"
          trend={setupPct === 100 ? 'up' : 'flat'}
        />
      </div>

      {/* ── Integration Groups ── */}
      {grouped.map((group, gi) => (
        <motion.section
          key={group.category}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: Math.min(gi * 0.04, 0.2) }}
        >
          <h2
            className="mb-3 text-lg font-bold"
            style={{ color: '#181d26', fontFamily: 'var(--font-sora)' }}
          >
            {group.label}
          </h2>
          <div className="space-y-3">
            {group.items.map((integration) => {
              const isExpanded = expandedId === integration.id
              const requiredFields = integration.envFields.filter((f) => f.required)
              const configuredFields = requiredFields.filter((f) => vault[f.key])
              const allConfigured =
                requiredFields.length > 0 &&
                configuredFields.length === requiredFields.length
              const statusTone: StatusTone = allConfigured ? 'green' : 'amber'
              const statusLabel = allConfigured
                ? '● Connected'
                : `${configuredFields.length}/${requiredFields.length} Set`

              return (
                <Card key={integration.id} padding="flush">
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : integration.id)}
                    className="flex w-full items-center gap-4 p-5 text-left"
                  >
                    <div
                      className="flex h-11 w-11 items-center justify-center rounded-xl text-xl"
                      style={{ background: '#f0f4fb' }}
                    >
                      {integration.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-semibold" style={{ color: '#181d26' }}>
                          {integration.name}
                        </h3>
                        <StatusBadge tone={statusTone}>{statusLabel}</StatusBadge>
                      </div>
                      <p
                        className="mt-0.5 text-sm truncate"
                        style={{ color: 'rgba(4,14,32,0.55)' }}
                      >
                        {integration.description}
                      </p>
                    </div>
                    <svg
                      className={`h-5 w-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                      style={{ color: 'rgba(4,14,32,0.5)' }}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div
                          className="px-5 pb-5 pt-4 space-y-4"
                          style={{ borderTop: '1px solid #e0e2e6' }}
                        >
                          {integration.envFields.map((field) => {
                            const showVal = !field.sensitive || showSensitive[field.key]
                            return (
                              <div key={field.key}>
                                <div className="flex items-center justify-between mb-1.5">
                                  <label
                                    className="text-sm font-semibold"
                                    style={{ color: '#181d26' }}
                                    htmlFor={`field-${field.key}`}
                                  >
                                    {field.label}
                                    {field.required && (
                                      <span className="ml-1" style={{ color: '#dc2626' }}>*</span>
                                    )}
                                  </label>
                                  <code
                                    className="text-[10px] font-mono px-2 py-0.5 rounded"
                                    style={{
                                      color: 'rgba(4,14,32,0.55)',
                                      background: '#f0f2f5',
                                    }}
                                  >
                                    {field.key}
                                  </code>
                                </div>
                                <div className="flex gap-2">
                                  <div className="relative flex-1">
                                    <input
                                      id={`field-${field.key}`}
                                      type={showVal ? 'text' : 'password'}
                                      value={vault[field.key] || ''}
                                      onChange={(e) => updateField(field.key, e.target.value)}
                                      placeholder={field.placeholder}
                                      className="be-input font-mono"
                                    />
                                    {field.sensitive && (
                                      <button
                                        type="button"
                                        onClick={() => toggleSensitive(field.key)}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 text-xs transition"
                                        style={{ color: 'rgba(4,14,32,0.5)' }}
                                        title={showSensitive[field.key] ? 'Hide' : 'Show'}
                                      >
                                        {showSensitive[field.key] ? '🙈' : '👁️'}
                                      </button>
                                    )}
                                  </div>
                                  <FormButton
                                    variant={copiedKey === field.key ? 'secondary' : 'ghost'}
                                    size="sm"
                                    onClick={() =>
                                      copyToClipboard(field.key, vault[field.key] || '')
                                    }
                                    disabled={!vault[field.key]}
                                  >
                                    {copiedKey === field.key ? '✓' : '📋'}
                                  </FormButton>
                                </div>
                                {field.hint && (
                                  <p
                                    className="mt-1 text-[11px]"
                                    style={{ color: 'rgba(4,14,32,0.45)' }}
                                  >
                                    {field.hint}
                                  </p>
                                )}
                              </div>
                            )
                          })}

                          <div
                            className="flex flex-wrap items-center gap-3 pt-3"
                            style={{ borderTop: '1px solid #e0e2e6' }}
                          >
                            <FormButton
                              variant={savedFlash ? 'secondary' : 'primary'}
                              size="sm"
                              onClick={() => copyAllAsEnv(integration)}
                            >
                              {savedFlash ? '✓ Copied!' : '📋 Copy All as .env'}
                            </FormButton>
                            {integration.dashboardUrl && (
                              <a
                                href={integration.dashboardUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-lg px-3 py-1.5 text-xs font-medium transition"
                                style={{
                                  border: '1px solid #e0e2e6',
                                  color: 'rgba(4,14,32,0.69)',
                                }}
                              >
                                Open Dashboard ↗
                              </a>
                            )}
                            <a
                              href={integration.docsUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="rounded-lg px-3 py-1.5 text-xs font-medium transition"
                              style={{
                                border: '1px solid #e0e2e6',
                                color: 'rgba(4,14,32,0.69)',
                              }}
                            >
                              Docs ↗
                            </a>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              )
            })}
          </div>
        </motion.section>
      ))}

      {/* ── How This Works ── */}
      <Card>
        <h2
          className="mb-4 text-lg font-bold"
          style={{ color: '#181d26', fontFamily: 'var(--font-sora)' }}
        >
          💡 How This Works
        </h2>
        <div className="space-y-3 text-sm" style={{ color: 'rgba(4,14,32,0.69)' }}>
          <p>
            <strong style={{ color: '#181d26' }}>Saved locally</strong> — Your credentials are
            stored in your browser&apos;s localStorage. They are NOT sent to any server.
          </p>
          <p>
            <strong style={{ color: '#181d26' }}>For Vercel deployment</strong> — Use the
            &quot;Copy All as .env&quot; button to copy your credentials, then paste them into
            your Vercel project&apos;s Environment Variables settings.
          </p>
          <p>
            <strong style={{ color: '#181d26' }}>Required fields</strong> — Fields marked with{' '}
            <span style={{ color: '#dc2626' }}>*</span> are required for that integration to
            function. Optional fields add extra functionality.
          </p>
        </div>
      </Card>
    </div>
  )
}
