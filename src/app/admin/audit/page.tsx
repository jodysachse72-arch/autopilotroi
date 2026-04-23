'use client'

import { SectionHeader, DataTable, StatusBadge } from '@/components/backend'
import type { DataColumn } from '@/components/backend'

interface AuditEntry { id: string; time: string; user: string; action: string; detail: string; ip: string }

const ENTRIES: AuditEntry[] = [
  { id:'1',  time:'2026-04-22 14:32',  user:'admin@autopilotroi.com',   action:'Partner promoted',   detail:'Marcus Johnson → Gold tier',          ip:'192.168.1.10' },
  { id:'2',  time:'2026-04-22 13:18',  user:'admin@autopilotroi.com',   action:'Prospect assigned',  detail:'Alex Turner → Sarah Chen',            ip:'192.168.1.10' },
  { id:'3',  time:'2026-04-22 11:05',  user:'sarah@email.com',          action:'Assessment submitted',detail:'Score: 78/100',                        ip:'203.0.113.42'  },
  { id:'4',  time:'2026-04-22 09:47',  user:'admin@autopilotroi.com',   action:'Feature flag toggled',detail:'university_modules → enabled',         ip:'192.168.1.10' },
  { id:'5',  time:'2026-04-21 17:22',  user:'jessica@email.com',        action:'Onboarding completed',detail:'Partner: Jessica Martinez',            ip:'198.51.100.5'  },
  { id:'6',  time:'2026-04-21 15:10',  user:'admin@autopilotroi.com',   action:'Email sent',         detail:'Weekly digest → 23 partners',          ip:'192.168.1.10' },
  { id:'7',  time:'2026-04-21 10:33',  user:'ryan@email.com',           action:'Login',              detail:'Successful sign-in',                   ip:'172.16.254.1'  },
  { id:'8',  time:'2026-04-20 19:55',  user:'admin@autopilotroi.com',   action:'Content published',  detail:'CMS: University Modules section',       ip:'192.168.1.10' },
  { id:'9',  time:'2026-04-20 14:08',  user:'admin@autopilotroi.com',   action:'Partner added',      detail:'Ryan Thompson onboarded',              ip:'192.168.1.10' },
  { id:'10', time:'2026-04-19 08:22',  user:'system',                   action:'Cron job',           detail:'Assessment reminders sent (14 users)', ip:'—'            },
]

const actionTone: Record<string, 'blue'|'green'|'amber'|'neutral'> = {
  'Partner promoted':   'green',
  'Prospect assigned':  'blue',
  'Assessment submitted':'blue',
  'Feature flag toggled':'amber',
  'Onboarding completed':'green',
  'Email sent':         'neutral',
  'Login':              'neutral',
  'Content published':  'green',
  'Partner added':      'green',
  'Cron job':           'neutral',
}

const columns: DataColumn<AuditEntry>[] = [
  { key: 'time',   header: 'Time',   render: e => <span className="text-xs font-mono" style={{ color: 'rgba(15,23,42,0.55)' }}>{e.time}</span> },
  { key: 'user',   header: 'User',   render: e => <span className="text-xs" style={{ color: '#334155' }}>{e.user}</span> },
  { key: 'action', header: 'Action', render: e => <StatusBadge tone={actionTone[e.action] ?? 'neutral'}>{e.action}</StatusBadge> },
  { key: 'detail', header: 'Detail', render: e => <span className="text-xs" style={{ color: '#334155' }}>{e.detail}</span> },
  { key: 'ip',     header: 'IP',     render: e => <span className="text-xs font-mono" style={{ color: 'rgba(15,23,42,0.45)' }}>{e.ip}</span>, align: 'right' },
]

export default function AuditPage() {
  return (
    <div className="space-y-5">
      <SectionHeader title="Audit Log" subtitle="Every admin and system action, fully logged"
        actions={<button className="be-btn be-btn--ghost">Export CSV</button>} />
      <DataTable columns={columns} rows={ENTRIES} rowKey={r => r.id} />
    </div>
  )
}
