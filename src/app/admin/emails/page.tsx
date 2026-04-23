'use client'

import { SectionHeader, DataTable, StatusBadge } from '@/components/backend'
import type { DataColumn } from '@/components/backend'

interface EmailTemplate { id: string; name: string; subject: string; status: 'Active'|'Draft'|'Paused'; lastSent: string; opens: string }

const EMAILS: EmailTemplate[] = [
  { id:'1', name:'Welcome Email',         subject:'Welcome to AutopilotROI!',            status:'Active', lastSent:'Apr 22', opens:'64%' },
  { id:'2', name:'Assessment Reminder',   subject:'Complete your readiness assessment',   status:'Active', lastSent:'Apr 21', opens:'48%' },
  { id:'3', name:'Invitation to Join',    subject:'You\'re invited to become a partner',  status:'Active', lastSent:'Apr 20', opens:'71%' },
  { id:'4', name:'Onboarding Complete',   subject:'Congratulations! You\'re onboarded',  status:'Active', lastSent:'Apr 18', opens:'82%' },
  { id:'5', name:'Weekly Digest',         subject:'Your weekly AutopilotROI summary',     status:'Paused', lastSent:'Apr 14', opens:'35%' },
  { id:'6', name:'Re-engagement',         subject:'We miss you — come back!',            status:'Draft',  lastSent:'Never',  opens:'—'   },
]

const statusTone: Record<string, 'green'|'amber'|'neutral'> = { Active: 'green', Paused: 'amber', Draft: 'neutral' }

const columns: DataColumn<EmailTemplate>[] = [
  { key: 'name',     header: 'Template',  render: e => (
    <div>
      <p className="text-sm font-semibold" style={{ color: '#0f172a' }}>{e.name}</p>
      <p className="text-xs" style={{ color: 'rgba(15,23,42,0.50)' }}>{e.subject}</p>
    </div>
  )},
  { key: 'status',   header: 'Status',    render: e => <StatusBadge tone={statusTone[e.status]}>{e.status}</StatusBadge> },
  { key: 'lastSent', header: 'Last Sent', field: 'lastSent' },
  { key: 'opens',    header: 'Open Rate', render: e => <span className="text-sm font-semibold">{e.opens}</span>, align: 'right' },
  { key: 'actions',  header: '',          align: 'right', render: () => (
    <div className="flex gap-1.5">
      <button className="be-btn be-btn--sm be-btn--ghost">Edit</button>
      <button className="be-btn be-btn--sm be-btn--primary">Send</button>
    </div>
  )},
]

export default function EmailsPage() {
  return (
    <div className="space-y-5">
      <SectionHeader title="Email Templates" subtitle="Manage transactional and marketing emails"
        actions={<button className="be-btn be-btn--primary">+ New Template</button>} />
      <DataTable columns={columns} rows={EMAILS} rowKey={r => r.id} />
    </div>
  )
}
