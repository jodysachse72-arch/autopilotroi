'use client'

import { useState } from 'react'
import { Search, UserPlus } from 'lucide-react'

const prospects = [
  { id: 1, name: 'John Doe',      email: 'john@example.com',   score: 42, status: 'Unassigned', partner: null,         date: '2 min ago' },
  { id: 2, name: 'Emma Brown',    email: 'emma@example.com',   score: 18, status: 'Unassigned', partner: null,         date: '15 min ago' },
  { id: 3, name: 'Mike Johnson',  email: 'mike@example.com',   score: 73, status: 'Unassigned', partner: null,         date: '1 hour ago' },
  { id: 4, name: 'Lisa Park',     email: 'lisa@example.com',   score: 85, status: 'Assigned',   partner: 'Sarah Chen', date: '3 hours ago' },
  { id: 5, name: 'Carlos Ruiz',   email: 'carlos@example.com', score: 31, status: 'Completed',  partner: 'James Wu',   date: 'Apr 21' },
  { id: 6, name: 'Nina Kowalski', email: 'nina@example.com',   score: 67, status: 'Assigned',   partner: 'Marcus Lee', date: 'Apr 20' },
]

const statusPill: Record<string, string> = {
  Unassigned: 'adm-pill adm-pill--amber',
  Assigned:   'adm-pill adm-pill--blue',
  Completed:  'adm-pill adm-pill--green',
}

function scoreClass(score: number) {
  if (score >= 70) return 'adm-score adm-score--high'
  if (score >= 40) return 'adm-score adm-score--medium'
  return 'adm-score adm-score--low'
}

export default function ProspectsPage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const filtered = prospects.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.email.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'all' || p.status.toLowerCase() === statusFilter
    return matchSearch && matchStatus
  })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div className="adm-page-header">
        <div>
          <h1 className="adm-page-title">Prospects</h1>
          <p className="adm-page-subtitle">Filter, triage, and assign incoming prospects.</p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="adm-toolbar">
        <div className="adm-toolbar-left">
          <div className="adm-search-wrap">
            <Search size={15} className="adm-search-icon" />
            <input
              className="adm-input"
              placeholder="Search prospects..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <select
            className="adm-select"
            style={{ width: 140 }}
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="unassigned">Unassigned</option>
            <option value="assigned">Assigned</option>
            <option value="completed">Completed</option>
          </select>
          <span className="adm-pill adm-pill--gray">{filtered.length} prospects</span>
        </div>
      </div>

      {/* Table */}
      <div className="adm-table-wrap">
        <table className="adm-table">
          <thead>
            <tr>
              <th>Prospect</th>
              <th>Score</th>
              <th>Status</th>
              <th>Partner</th>
              <th>Date</th>
              <th style={{ width: 90 }}></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p.id}>
                <td>
                  <div style={{ fontWeight: 500, color: '#0f172a', fontSize: 13.5 }}>{p.name}</div>
                  <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 1 }}>{p.email}</div>
                </td>
                <td>
                  <span className={scoreClass(p.score)}>{p.score}/100</span>
                </td>
                <td>
                  <span className={statusPill[p.status]}>{p.status}</span>
                </td>
                <td style={{ fontSize: 12.5 }}>
                  {p.partner
                    ? <span style={{ color: '#334155' }}>{p.partner}</span>
                    : <span style={{ color: '#ea580c', fontWeight: 600 }}>Unassigned</span>
                  }
                </td>
                <td style={{ color: '#94a3b8', fontSize: 12.5 }}>{p.date}</td>
                <td>
                  {p.status === 'Unassigned' && (
                    <button className="adm-btn adm-btn--primary adm-btn--sm" style={{ gap: 4 }}>
                      <UserPlus size={12} />
                      Assign
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
