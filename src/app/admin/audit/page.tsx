'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { motion } from 'framer-motion'
import {
  SectionHeader,
  Card,
  Toolbar,
  FilterPill,
  StatusBadge,
  EmptyState,
  FormInput,
  FormButton,
  type StatusTone,
} from '@/components/backend'

/* ═══════════════════════════════════════════════════════════════
   ADMIN AUDIT LOG — Tracks who changed what, when
   Stores events in localStorage (moves to Supabase in production)
   ═══════════════════════════════════════════════════════════════ */

export interface AuditEvent {
  id: string
  timestamp: string
  actor: string
  action: string
  category: 'feature' | 'partner' | 'auth' | 'system' | string
  detail: string
}

const STORAGE_KEY = 'autopilotroi-audit-log'

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

const categoryConfig: Record<string, { label: string; tone: StatusTone; icon: string }> = {
  feature: { label: 'Feature', tone: 'blue',   icon: '🎛️' },
  partner: { label: 'Partner', tone: 'green',  icon: '🤝' },
  auth:    { label: 'Auth',    tone: 'amber',  icon: '🔑' },
  system:  { label: 'System',  tone: 'purple', icon: '⚙️' },
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

const FILTER_KEYS = ['all', 'feature', 'partner', 'auth', 'system'] as const
type FilterKey = (typeof FILTER_KEYS)[number]

export default function AuditLogPage() {
  const [events, setEvents] = useState<AuditEvent[]>([])
  const [filterCategory, setFilterCategory] = useState<FilterKey>('all')
  const [search, setSearch] = useState('')

  useEffect(() => {
    let next = DEMO_EVENTS
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        next = JSON.parse(saved) as AuditEvent[]
      } else {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DEMO_EVENTS))
      }
    } catch {
      /* fall back to demo */
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing local state to a localStorage snapshot on mount
    setEvents(next)
  }, [])

  const clearLog = useCallback(() => {
    if (confirm('Clear all audit log entries?')) {
      localStorage.removeItem(STORAGE_KEY)
      setEvents([])
    }
  }, [])

  const filtered = useMemo(() => {
    let rows = filterCategory === 'all' ? events : events.filter((e) => e.category === filterCategory)
    if (search) {
      const q = search.toLowerCase()
      rows = rows.filter(
        (e) =>
          e.detail.toLowerCase().includes(q) ||
          e.actor.toLowerCase().includes(q) ||
          e.action.toLowerCase().includes(q)
      )
    }
    return rows
  }, [events, filterCategory, search])

  const categoryCount = (k: FilterKey) =>
    k === 'all' ? events.length : events.filter((e) => e.category === k).length

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <SectionHeader
        title="Audit Log"
        subtitle={`Track who changed what, when — ${events.length} event${events.length === 1 ? '' : 's'} recorded`}
        actions={
          <FormButton variant="danger" size="sm" onClick={clearLog}>
            Clear Log
          </FormButton>
        }
      />

      <div className="flex flex-col gap-3">
        <FormInput
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search events, actors, or actions…"
          aria-label="Search audit log"
        />

        <Toolbar
          left={
            <>
              {FILTER_KEYS.map((cat) => (
                <FilterPill
                  key={cat}
                  label={cat === 'all' ? 'All' : categoryConfig[cat]?.label || cat}
                  count={categoryCount(cat)}
                  active={filterCategory === cat}
                  onClick={() => setFilterCategory(cat)}
                />
              ))}
            </>
          }
        />
      </div>

      {filtered.length === 0 ? (
        <Card>
          <EmptyState
            icon="📋"
            title={search ? 'No events match your search' : 'No events recorded yet'}
            description={search ? 'Try adjusting your search or filter.' : 'Events will appear here as activity occurs.'}
          />
        </Card>
      ) : (
        <div className="space-y-2">
          {filtered.map((event, i) => {
            const config = categoryConfig[event.category] || categoryConfig.system
            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: Math.min(i * 0.02, 0.2) }}
              >
                <Card className="!p-0">
                  <div className="flex items-start gap-4 px-5 py-4">
                    <span className="mt-0.5 text-lg" aria-hidden>{config.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm" style={{ color: '#181d26' }}>{event.detail}</p>
                      <div className="mt-1.5 flex flex-wrap items-center gap-2 text-[11px]">
                        <StatusBadge tone={config.tone}>{config.label}</StatusBadge>
                        <span style={{ color: 'rgba(4,14,32,0.5)' }}>by {event.actor}</span>
                        <span style={{ color: 'rgba(4,14,32,0.35)' }}>•</span>
                        <span style={{ color: 'rgba(4,14,32,0.5)' }}>{timeAgo(event.timestamp)}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </div>
      )}
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
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events.slice(0, 200)))
  } catch {
    /* storage full */
  }
}
