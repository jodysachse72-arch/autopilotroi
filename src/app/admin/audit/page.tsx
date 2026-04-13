'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'

/* ═══════════════════════════════════════════════════════════════
   ADMIN AUDIT LOG — Tracks who changed what, when
   Stores events in localStorage (moves to Supabase in production)
   ═══════════════════════════════════════════════════════════════ */

export interface AuditEvent {
  id: string
  timestamp: string
  actor: string        // email or name
  action: string       // 'toggle_feature' | 'edit_banner' | 'add_partner' | etc.
  category: string     // 'feature' | 'partner' | 'system' | 'auth'
  detail: string       // human-readable description
}

const STORAGE_KEY = 'autopilotroi-audit-log'

// Seed demo data on first visit
const DEMO_EVENTS: AuditEvent[] = [
  { id: '1', timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(), actor: 'admin@autopilotroi.com', action: 'toggle_feature', category: 'feature', detail: 'Turned ON "Announcement Banner"' },
  { id: '2', timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), actor: 'admin@autopilotroi.com', action: 'edit_banner', category: 'feature', detail: 'Updated banner message to "Welcome to AutopilotROI!"' },
  { id: '3', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), actor: 'admin@autopilotroi.com', action: 'add_partner', category: 'partner', detail: 'Added partner "Demo Partner" (partner@autopilotroi.com)' },
  { id: '4', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(), actor: 'admin@autopilotroi.com', action: 'toggle_feature', category: 'feature', detail: 'Turned OFF "Exit Intent Popup"' },
  { id: '5', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(), actor: 'admin@autopilotroi.com', action: 'login', category: 'auth', detail: 'Admin login from 192.168.1.1' },
  { id: '6', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), actor: 'system', action: 'deploy', category: 'system', detail: 'Deployment to Vercel production (commit 552c6e7)' },
  { id: '7', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(), actor: 'admin@autopilotroi.com', action: 'toggle_feature', category: 'feature', detail: 'Turned ON "Social Proof Notifications"' },
  { id: '8', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), actor: 'admin@autopilotroi.com', action: 'update_settings', category: 'system', detail: 'Updated Supabase credentials in Integration Vault' },
]

const categoryConfig: Record<string, { label: string; color: string; icon: string }> = {
  feature: { label: 'Feature', color: 'text-blue-400 bg-blue-500/15', icon: '🎛️' },
  partner: { label: 'Partner', color: 'text-emerald-400 bg-emerald-500/15', icon: '🤝' },
  auth:    { label: 'Auth', color: 'text-amber-400 bg-amber-500/15', icon: '🔑' },
  system:  { label: 'System', color: 'text-purple-400 bg-purple-500/15', icon: '⚙️' },
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  return `${days}d ago`
}

export default function AuditLogPage() {
  const [events, setEvents] = useState<AuditEvent[]>([])
  const [filterCategory, setFilterCategory] = useState('all')
  const [search, setSearch] = useState('')

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        setEvents(JSON.parse(saved))
      } else {
        // Seed demo data
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DEMO_EVENTS))
        setEvents(DEMO_EVENTS)
      }
    } catch {
      setEvents(DEMO_EVENTS)
    }
  }, [])

  const clearLog = useCallback(() => {
    if (confirm('Clear all audit log entries?')) {
      localStorage.removeItem(STORAGE_KEY)
      setEvents([])
    }
  }, [])

  let filtered = filterCategory === 'all' ? events : events.filter(e => e.category === filterCategory)
  if (search) {
    const q = search.toLowerCase()
    filtered = filtered.filter(e =>
      e.detail.toLowerCase().includes(q) ||
      e.actor.toLowerCase().includes(q) ||
      e.action.toLowerCase().includes(q)
    )
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-[var(--font-sora)] text-3xl font-bold text-[var(--text-primary)]">
          Audit Log
        </h1>
        <p className="mt-2 text-sm text-[var(--text-muted)]">
          Track who changed what, when. {events.length} events recorded.
        </p>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="flex flex-wrap items-center gap-3"
      >
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search events..."
          className="flex-1 min-w-[200px] rounded-xl border border-[var(--border-primary)] bg-[var(--bg-card)] px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none focus:border-blue-500 transition"
        />
        <div className="flex gap-2">
          {['all', ...Object.keys(categoryConfig)].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                filterCategory === cat
                  ? 'bg-blue-600 text-white'
                  : 'border border-[var(--border-primary)] bg-[var(--bg-card)] text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)]'
              }`}
            >
              {cat === 'all' ? 'All' : categoryConfig[cat]?.label || cat}
            </button>
          ))}
        </div>
        <button
          onClick={clearLog}
          className="rounded-lg border border-red-400/30 px-3 py-1.5 text-xs font-medium text-red-400 hover:bg-red-500/10 transition"
        >
          Clear Log
        </button>
      </motion.div>

      {/* Events */}
      <div className="space-y-2">
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-card)] p-12 text-center">
            <span className="text-4xl">📋</span>
            <p className="mt-3 text-sm text-[var(--text-muted)]">No events {search ? 'matching your search' : 'recorded yet'}</p>
          </div>
        ) : (
          filtered.map((event, i) => {
            const config = categoryConfig[event.category] || categoryConfig.system
            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.03 }}
                className="flex items-start gap-4 rounded-xl border border-[var(--border-primary)] bg-[var(--bg-card)] px-5 py-4 hover:bg-[var(--bg-card-hover)] transition"
              >
                <span className="mt-0.5 text-lg">{config.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[var(--text-primary)]">{event.detail}</p>
                  <div className="mt-1 flex flex-wrap items-center gap-2 text-[10px]">
                    <span className={`rounded-full px-2 py-0.5 font-semibold ${config.color}`}>
                      {config.label}
                    </span>
                    <span className="text-[var(--text-muted)]">by {event.actor}</span>
                    <span className="text-[var(--text-muted)]">•</span>
                    <span className="text-[var(--text-muted)]">{timeAgo(event.timestamp)}</span>
                  </div>
                </div>
              </motion.div>
            )
          })
        )}
      </div>
    </div>
  )
}

/* ── Helper: Log an audit event from anywhere ── */
export function logAuditEvent(event: Omit<AuditEvent, 'id' | 'timestamp'>) {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    const events: AuditEvent[] = saved ? JSON.parse(saved) : []
    events.unshift({
      ...event,
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
    })
    // Keep max 200 events
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events.slice(0, 200)))
  } catch { /* storage full */ }
}
