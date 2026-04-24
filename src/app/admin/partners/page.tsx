'use client'

import { useState } from 'react'
import { Plus, Search } from 'lucide-react'

const partners = [
  { id: 1, name: 'Sarah Chen',    email: 'sarah@example.com',  status: 'Active',   prospects: 12, conversions: 8,  joined: 'Jan 15, 2026' },
  { id: 2, name: 'Marcus Lee',    email: 'marcus@example.com', status: 'Active',   prospects: 7,  conversions: 5,  joined: 'Feb 3, 2026' },
  { id: 3, name: 'Priya Patel',   email: 'priya@example.com',  status: 'Pending',  prospects: 3,  conversions: 0,  joined: 'Mar 20, 2026' },
  { id: 4, name: 'James Wu',      email: 'james@example.com',  status: 'Active',   prospects: 19, conversions: 14, joined: 'Nov 28, 2025' },
  { id: 5, name: 'Alicia Torres', email: 'alicia@example.com', status: 'Inactive', prospects: 2,  conversions: 1,  joined: 'Apr 1, 2026' },
]

const statusPill: Record<string, string> = {
  Active:   'adm-pill adm-pill--green',
  Pending:  'adm-pill adm-pill--amber',
  Inactive: 'adm-pill adm-pill--gray',
}

export default function PartnersPage() {
  const [search, setSearch] = useState('')
  const filtered = partners.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.email.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div className="adm-page-header">
        <div>
          <h1 className="adm-page-title">Partners</h1>
          <p className="adm-page-subtitle">Manage your active referral partner accounts.</p>
        </div>
        <div className="adm-page-actions">
          <button className="adm-btn adm-btn--primary">
            <Plus size={15} />
            Add Partner
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="adm-toolbar">
        <div className="adm-toolbar-left">
          <div className="adm-search-wrap">
            <Search size={15} className="adm-search-icon" />
            <input
              className="adm-input"
              placeholder="Search partners..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <span className="adm-pill adm-pill--gray">{filtered.length} partners</span>
        </div>
      </div>

      {/* Table */}
      <div className="adm-table-wrap">
        <table className="adm-table">
          <thead>
            <tr>
              <th>Partner</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Prospects</th>
              <th style={{ textAlign: 'right' }}>Conversions</th>
              <th>Joined</th>
              <th style={{ width: 140 }}></th>
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
                  <span className={statusPill[p.status]}>{p.status}</span>
                </td>
                <td style={{ textAlign: 'right', fontWeight: 600 }}>{p.prospects}</td>
                <td style={{ textAlign: 'right', fontWeight: 600 }}>{p.conversions}</td>
                <td style={{ color: '#94a3b8', fontSize: 12.5 }}>{p.joined}</td>
                <td>
                  <div className="adm-row-actions">
                    <button className="adm-row-action-btn">View</button>
                    <button className="adm-row-action-btn">Edit</button>
                    <button className="adm-row-action-btn adm-row-action-btn--danger">Deactivate</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
