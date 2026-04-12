'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface Partner {
  id: string
  name: string
  email: string
  referral_code: string
  phone: string | null
  telegram: string | null
  is_active: boolean
  created_at: string
}

export default function AdminPartnersPage() {
  const [partners, setPartners] = useState<Partner[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', referral_code: '', phone: '', telegram: '' })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    fetchPartners()
  }, [])

  async function fetchPartners() {
    try {
      const res = await fetch('/api/admin/partners')
      if (res.ok) {
        const data = await res.json()
        setPartners(data.partners || [])
      }
    } catch {
      setError('Failed to load partners')
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')
    setSuccess('')

    try {
      const res = await fetch('/api/admin/partners', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Failed to create partner')
        setSaving(false)
        return
      }

      setSuccess(`Partner "${form.name}" created with code: ${form.referral_code}`)
      setForm({ name: '', email: '', referral_code: '', phone: '', telegram: '' })
      setShowForm(false)
      fetchPartners()
    } catch {
      setError('Network error')
    } finally {
      setSaving(false)
    }
  }

  async function toggleActive(partnerId: string, currentlyActive: boolean) {
    try {
      await fetch('/api/admin/partners', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: partnerId, is_active: !currentlyActive }),
      })
      fetchPartners()
    } catch {
      setError('Failed to update partner')
    }
  }

  return (
    <div className="min-h-screen bg-[#06122f]">
      {/* Header */}
      <div className="border-b border-white/10 bg-[linear-gradient(180deg,#0b1f57_0%,#06122f_100%)] px-6 py-12 lg:px-10">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-[var(--font-sora)] text-3xl font-bold text-white">Partner Management</h1>
              <p className="mt-2 text-blue-100/60">Add, manage, and track referral partners</p>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
            >
              {showForm ? 'Cancel' : '+ Add Partner'}
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 py-10 lg:px-10">
        {/* Messages */}
        {error && (
          <div className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-6 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-400">
            {success}
          </div>
        )}

        {/* Add Partner Form */}
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6"
          >
            <h2 className="mb-4 text-lg font-bold text-white">New Partner</h2>
            <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm text-blue-100/60">Full Name *</label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-blue-500"
                  placeholder="Jane Smith"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm text-blue-100/60">Email *</label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-blue-500"
                  placeholder="jane@email.com"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm text-blue-100/60">Referral Code *</label>
                <input
                  required
                  value={form.referral_code}
                  onChange={(e) => setForm({ ...form, referral_code: e.target.value.toLowerCase().replace(/[^a-z0-9-_]/g, '') })}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-blue-500"
                  placeholder="jane-smith"
                />
                <p className="mt-1 text-xs text-blue-100/40">Used in: autopilotroi.com/signup?ref={form.referral_code || 'code'}</p>
              </div>
              <div>
                <label className="mb-1 block text-sm text-blue-100/60">Phone</label>
                <input
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-blue-500"
                  placeholder="+1 555-123-4567"
                />
              </div>
              <div className="sm:col-span-2 flex justify-end">
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-xl bg-blue-600 px-8 py-3 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:opacity-60"
                >
                  {saving ? 'Creating...' : 'Create Partner'}
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Partners Table */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
          </div>
        ) : partners.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-12 text-center">
            <p className="text-blue-100/60">No partners yet. Click &quot;+ Add Partner&quot; to get started.</p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-white/10">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.03]">
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-blue-100/50">Partner</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-blue-100/50">Referral Code</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-blue-100/50">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-blue-100/50">Joined</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-blue-100/50">Actions</th>
                </tr>
              </thead>
              <tbody>
                {partners.map((p) => (
                  <tr key={p.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-white">{p.name}</div>
                      <div className="text-xs text-blue-100/50">{p.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <code className="rounded bg-blue-500/10 px-2 py-1 text-xs text-blue-400">{p.referral_code}</code>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
                        p.is_active
                          ? 'bg-emerald-500/10 text-emerald-400'
                          : 'bg-red-500/10 text-red-400'
                      }`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${p.is_active ? 'bg-emerald-400' : 'bg-red-400'}`} />
                        {p.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-blue-100/50">
                      {new Date(p.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => toggleActive(p.id, p.is_active)}
                        className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                          p.is_active
                            ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20'
                            : 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20'
                        }`}
                      >
                        {p.is_active ? 'Deactivate' : 'Reactivate'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
