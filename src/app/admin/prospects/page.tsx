'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

const allProspects = [
  { id: '1', name: 'Alex Thompson', email: 'alex@example.com', tier: 'beginner', score: 15, status: 'new', assignedTo: null, date: '2026-04-11' },
  { id: '2', name: 'Sarah Chen', email: 'sarah@example.com', tier: 'beginner', score: 28, status: 'assessed', assignedTo: 'Barry Goss', date: '2026-04-10' },
  { id: '3', name: 'James Wilson', email: 'james@example.com', tier: 'intermediate', score: 55, status: 'invited', assignedTo: 'Barry Goss', date: '2026-04-09' },
  { id: '4', name: 'Maria Garcia', email: 'maria@example.com', tier: 'advanced', score: 85, status: 'onboarding', assignedTo: 'Demo Partner', date: '2026-04-08' },
  { id: '5', name: 'John Doe', email: 'john@example.com', tier: 'intermediate', score: 42, status: 'new', assignedTo: null, date: '2026-04-11' },
  { id: '6', name: 'Emma Brown', email: 'emma@example.com', tier: 'beginner', score: 18, status: 'new', assignedTo: null, date: '2026-04-11' },
  { id: '7', name: 'Mike Johnson', email: 'mike@example.com', tier: 'advanced', score: 73, status: 'assessed', assignedTo: null, date: '2026-04-10' },
  { id: '8', name: 'Lisa Park', email: 'lisa@example.com', tier: 'intermediate', score: 62, status: 'active', assignedTo: 'Jane Smith', date: '2026-04-07' },
]

const tierBadge: Record<string, string> = {
  beginner: 'bg-amber-500/15 text-amber-300 border-amber-400/30',
  intermediate: 'bg-blue-500/15 text-blue-300 border-blue-400/30',
  advanced: 'bg-emerald-500/15 text-emerald-300 border-emerald-400/30',
}

const statusBadge: Record<string, string> = {
  new: 'bg-purple-500/15 text-purple-300',
  assessed: 'bg-amber-500/15 text-amber-300',
  invited: 'bg-blue-500/15 text-blue-300',
  onboarding: 'bg-cyan-500/15 text-cyan-300',
  active: 'bg-emerald-500/15 text-emerald-300',
}

export default function AdminProspectsPage() {
  const [filter, setFilter] = useState('all')
  const [assignFilter, setAssignFilter] = useState('all')

  let filtered = filter === 'all'
    ? allProspects
    : allProspects.filter((p) => p.status === filter)

  if (assignFilter === 'unassigned') {
    filtered = filtered.filter((p) => !p.assignedTo)
  } else if (assignFilter === 'assigned') {
    filtered = filtered.filter((p) => !!p.assignedTo)
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <h2 className="font-[var(--font-sora)] text-2xl font-bold text-[var(--text-primary)]">
        All Prospects
      </h2>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="flex gap-2">
          {['all', 'new', 'assessed', 'invited', 'onboarding', 'active'].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium capitalize transition ${
                filter === s
                  ? 'bg-red-500 text-white'
                  : 'border border-[var(--border-primary)] bg-[var(--bg-card)] text-[var(--text-secondary)]'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        <div className="flex gap-2 border-l border-[var(--border-primary)] pl-3">
          {['all', 'unassigned', 'assigned'].map((s) => (
            <button
              key={s}
              onClick={() => setAssignFilter(s)}
              className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium capitalize transition ${
                assignFilter === s
                  ? 'bg-red-500 text-white'
                  : 'border border-[var(--border-primary)] bg-[var(--bg-card)] text-[var(--text-secondary)]'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-card)] overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--border-primary)] text-left text-[var(--text-muted)]">
              <th className="px-6 py-3 font-medium">Name</th>
              <th className="px-6 py-3 font-medium">Tier</th>
              <th className="px-6 py-3 font-medium">Score</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium">Assigned To</th>
              <th className="px-6 py-3 font-medium">Date</th>
              <th className="px-6 py-3 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <motion.tr
                key={p.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="border-b border-[var(--border-primary)] transition hover:bg-[var(--bg-card-hover)]"
              >
                <td className="px-6 py-4">
                  <div className="font-medium text-[var(--text-primary)]">{p.name}</div>
                  <div className="text-xs text-[var(--text-muted)]">{p.email}</div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-block rounded-full border px-2.5 py-0.5 text-xs font-semibold capitalize ${tierBadge[p.tier]}`}>
                    {p.tier}
                  </span>
                </td>
                <td className="px-6 py-4 font-mono text-[var(--text-primary)]">{p.score}/100</td>
                <td className="px-6 py-4">
                  <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${statusBadge[p.status]}`}>
                    {p.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-[var(--text-secondary)]">
                  {p.assignedTo || (
                    <span className="text-amber-400 text-xs font-medium">⚠ Unassigned</span>
                  )}
                </td>
                <td className="px-6 py-4 text-[var(--text-muted)]">{p.date}</td>
                <td className="px-6 py-4">
                  <button className="rounded-lg bg-blue-500/15 px-3 py-1.5 text-xs font-semibold text-blue-400 transition hover:bg-blue-500/25">
                    {p.assignedTo ? 'View' : 'Assign'}
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
