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
    <div className="mx-auto max-w-5xl space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-[var(--font-sora)] text-3xl font-bold text-[#181d26]">Partner Management</h1>
          <p className="mt-2 text-[rgba(4,14,32,0.55)]">Add, manage, and track referral partners</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="rounded-xl bg-[#1b61c9] px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          {showForm ? 'Cancel' : '+ Add Partner'}
        </button>
      </div>

      {/* Messages */}
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}
      {success && (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          {success}
        </div>
      )}

      {/* Add Partner Form */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-[#e0e2e6] bg-white p-6"
        >
          <h2 className="mb-4 text-lg font-bold text-[#181d26]">New Partner</h2>
          <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-[rgba(4,14,32,0.69)]">Full Name *</label>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-xl border border-[#e0e2e6] bg-[#f8fafc] px-4 py-3 text-[#181d26] outline-none focus:border-[#1b61c9] transition"
                placeholder="Jane Smith"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-[rgba(4,14,32,0.69)]">Email *</label>
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-xl border border-[#e0e2e6] bg-[#f8fafc] px-4 py-3 text-[#181d26] outline-none focus:border-[#1b61c9] transition"
                placeholder="jane@email.com"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-[rgba(4,14,32,0.69)]">Referral Code *</label>
              <input
                required
                value={form.referral_code}
                onChange={(e) => setForm({ ...form, referral_code: e.target.value.toLowerCase().replace(/[^a-z0-9-_]/g, '') })}
                className="w-full rounded-xl border border-[#e0e2e6] bg-[#f8fafc] px-4 py-3 text-[#181d26] outline-none focus:border-[#1b61c9] transition"
                placeholder="jane-smith"
              />
              <p className="mt-1 text-xs text-[rgba(4,14,32,0.45)]">Used in: autopilotroi.com/signup?ref={form.referral_code || 'code'}</p>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-[rgba(4,14,32,0.69)]">Phone</label>
              <input
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full rounded-xl border border-[#e0e2e6] bg-[#f8fafc] px-4 py-3 text-[#181d26] outline-none focus:border-[#1b61c9] transition"
                placeholder="+1 555-123-4567"
              />
            </div>
            <div className="sm:col-span-2 flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="rounded-xl bg-[#1b61c9] px-8 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
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
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#1b61c9] border-t-transparent" />
        </div>
      ) : partners.length === 0 ? (
        <div className="rounded-2xl border border-[#e0e2e6] bg-white p-12 text-center">
          <p className="text-[rgba(4,14,32,0.55)]">No partners yet. Click &quot;+ Add Partner&quot; to get started.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-[#e0e2e6] bg-white">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#e0e2e6] bg-[#f8fafc]">
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[rgba(4,14,32,0.45)]">Partner</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[rgba(4,14,32,0.45)]">Referral Code</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[rgba(4,14,32,0.45)]">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[rgba(4,14,32,0.45)]">Joined</th>
                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-[rgba(4,14,32,0.45)]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {partners.map((p) => (
                <tr key={p.id} className="border-b border-[#f0f2f5] hover:bg-[#f8fafc] transition-colors">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-[#181d26]">{p.name}</div>
                    <div className="text-xs text-[rgba(4,14,32,0.45)]">{p.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    <code className="rounded bg-blue-50 px-2 py-1 text-xs text-[#1b61c9] font-medium">{p.referral_code}</code>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
                      p.is_active
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${p.is_active ? 'bg-emerald-500' : 'bg-red-500'}`} />
                      {p.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-[rgba(4,14,32,0.55)]">
                    {new Date(p.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => toggleActive(p.id, p.is_active)}
                      className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                        p.is_active
                          ? 'bg-red-100 text-red-700 hover:bg-red-200'
                          : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
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
  )
}
