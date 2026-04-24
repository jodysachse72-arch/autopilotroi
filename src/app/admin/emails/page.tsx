'use client'

import { Mail, Send, Clock, CheckCircle2 } from 'lucide-react'

const emails = [
  { id: 1, subject: 'Welcome to AutopilotROI',         recipient: 'New partners',      status: 'Sent',      opens: 87,  date: 'Apr 22' },
  { id: 2, subject: 'Your prospect has been assigned',  recipient: 'Partners',          status: 'Sent',      opens: 42,  date: 'Apr 21' },
  { id: 3, subject: 'Readiness score available',        recipient: 'Prospects',         status: 'Sent',      opens: 134, date: 'Apr 20' },
  { id: 4, subject: 'Monthly partner report',           recipient: 'All partners',      status: 'Draft',     opens: 0,   date: 'Apr 19' },
  { id: 5, subject: 'Onboarding complete — next steps', recipient: 'Completed users',   status: 'Scheduled', opens: 0,   date: 'Apr 25' },
]

const statusPill: Record<string, string> = {
  Sent:      'adm-pill adm-pill--green',
  Draft:     'adm-pill adm-pill--gray',
  Scheduled: 'adm-pill adm-pill--blue',
}

const emailStats = [
  { label: 'Sent',        value: '3',   icon: CheckCircle2, iconBg: 'rgba(22,163,74,0.10)',   iconColor: '#16a34a' },
  { label: 'Scheduled',   value: '1',   icon: Clock,        iconBg: 'rgba(27,97,201,0.10)',   iconColor: '#1b61c9' },
  { label: 'Total Opens', value: '263', icon: Mail,         iconBg: 'rgba(124,58,237,0.10)',  iconColor: '#7c3aed' },
]

export default function EmailsPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div className="adm-page-header">
        <div>
          <h1 className="adm-page-title">Emails</h1>
          <p className="adm-page-subtitle">View and manage platform email campaigns.</p>
        </div>
        <div className="adm-page-actions">
          <button className="adm-btn adm-btn--primary">
            <Mail size={15} />
            Compose
          </button>
        </div>
      </div>

      {/* Email Stats */}
      <div className="adm-three-col">
        {emailStats.map(s => (
          <div key={s.label} className="adm-card" style={{ display: 'flex', alignItems: 'center', gap: 16, padding: 16 }}>
            <div className="adm-stat-icon" style={{ background: s.iconBg, color: s.iconColor }}>
              <s.icon size={20} />
            </div>
            <div>
              <div className="adm-stat-value" style={{ fontSize: 22 }}>{s.value}</div>
              <div className="adm-stat-label" style={{ marginTop: 2 }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="adm-table-wrap">
        <table className="adm-table">
          <thead>
            <tr>
              <th>Subject</th>
              <th>Recipient</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Opens</th>
              <th>Date</th>
              <th style={{ width: 80 }}></th>
            </tr>
          </thead>
          <tbody>
            {emails.map(e => (
              <tr key={e.id}>
                <td style={{ fontWeight: 500, color: '#0f172a' }}>{e.subject}</td>
                <td style={{ color: '#94a3b8', fontSize: 12.5 }}>{e.recipient}</td>
                <td>
                  <span className={statusPill[e.status]}>{e.status}</span>
                </td>
                <td style={{ textAlign: 'right', fontWeight: 600 }}>{e.opens > 0 ? e.opens : '—'}</td>
                <td style={{ color: '#94a3b8', fontSize: 12.5 }}>{e.date}</td>
                <td>
                  <button className="adm-btn adm-btn--ghost adm-btn--sm" style={{ gap: 4 }}>
                    {e.status === 'Draft' ? <><Send size={12} />Send</> : 'View'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
