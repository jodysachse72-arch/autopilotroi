'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Card,
  SectionHeader,
  EmptyState,
  DataTable,
  StatusBadge,
  Toolbar,
  FormField,
  FormInput,
  FormRow,
  FormButton,
  type DataColumn,
} from '@/components/backend'

/* ─────────────────────────────────────────────
   ADMIN — Partner Management
   Refactored to use backend primitives.
   ───────────────────────────────────────────── */

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

interface PartnerForm {
  name: string
  email: string
  referral_code: string
  phone: string
  telegram: string
}

const EMPTY_FORM: PartnerForm = { name: '', email: '', referral_code: '', phone: '', telegram: '' }

export default function AdminPartnersPage() {
  const [partners, setPartners] = useState<Partner[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState<PartnerForm>(EMPTY_FORM)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const fetchPartners = useCallback(async () => {
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
  }, [])

  useEffect(() => {
    fetchPartners()
  }, [fetchPartners])

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
      setForm(EMPTY_FORM)
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

  const columns: DataColumn<Partner>[] = [
    {
      key: 'partner',
      header: 'Partner',
      render: (p) => (
        <div className="flex flex-col">
          <span className="text-sm font-semibold" style={{ color: '#181d26' }}>{p.name}</span>
          <span className="text-xs" style={{ color: 'rgba(4,14,32,0.5)' }}>{p.email}</span>
        </div>
      ),
    },
    {
      key: 'code',
      header: 'Referral Code',
      render: (p) => (
        <code
          className="rounded px-2 py-1 text-xs font-medium"
          style={{ background: 'rgba(27,97,201,0.08)', color: '#1b61c9' }}
        >
          {p.referral_code}
        </code>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (p) => (
        <StatusBadge tone={p.is_active ? 'green' : 'red'}>
          {p.is_active ? 'Active' : 'Inactive'}
        </StatusBadge>
      ),
    },
    {
      key: 'joined',
      header: 'Joined',
      render: (p) => (
        <span className="text-sm" style={{ color: 'rgba(4,14,32,0.55)' }}>
          {new Date(p.created_at).toLocaleDateString()}
        </span>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      align: 'right',
      render: (p) => (
        <FormButton
          variant={p.is_active ? 'danger' : 'secondary'}
          size="sm"
          onClick={() => toggleActive(p.id, p.is_active)}
        >
          {p.is_active ? 'Deactivate' : 'Reactivate'}
        </FormButton>
      ),
    },
  ]

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <SectionHeader
        title="Partner Management"
        subtitle="Add, manage, and track referral partners"
        actions={
          <FormButton
            variant={showForm ? 'secondary' : 'primary'}
            onClick={() => setShowForm((v) => !v)}
          >
            {showForm ? 'Cancel' : '+ Add Partner'}
          </FormButton>
        }
      />

      {/* Inline messages */}
      {error && (
        <div
          className="rounded-lg px-4 py-3 text-sm"
          style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#b91c1c' }}
          role="alert"
        >
          {error}
        </div>
      )}
      {success && (
        <div
          className="rounded-lg px-4 py-3 text-sm"
          style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', color: '#047857' }}
          role="status"
        >
          {success}
        </div>
      )}

      {/* New partner form */}
      <AnimatePresence initial={false}>
        {showForm && (
          <motion.div
            key="partner-form"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
          >
            <Card padding="lg">
              <h3 className="be-section-title mb-4">New Partner</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <FormRow>
                  <FormField label="Full Name" htmlFor="p-name" required>
                    <FormInput
                      id="p-name"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Jane Smith"
                    />
                  </FormField>
                  <FormField label="Email" htmlFor="p-email" required>
                    <FormInput
                      id="p-email"
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="jane@email.com"
                    />
                  </FormField>
                </FormRow>
                <FormRow>
                  <FormField
                    label="Referral Code"
                    htmlFor="p-code"
                    required
                    help={`Used in: autopilotroi.com/signup?ref=${form.referral_code || 'code'}`}
                  >
                    <FormInput
                      id="p-code"
                      required
                      value={form.referral_code}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          referral_code: e.target.value.toLowerCase().replace(/[^a-z0-9-_]/g, ''),
                        })
                      }
                      placeholder="jane-smith"
                    />
                  </FormField>
                  <FormField label="Phone" htmlFor="p-phone">
                    <FormInput
                      id="p-phone"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+1 555-123-4567"
                    />
                  </FormField>
                </FormRow>
                <div className="flex justify-end gap-2">
                  <FormButton variant="ghost" onClick={() => setShowForm(false)}>
                    Cancel
                  </FormButton>
                  <FormButton type="submit" loading={saving} variant="primary">
                    {saving ? 'Creating…' : 'Create Partner'}
                  </FormButton>
                </div>
              </form>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toolbar + count */}
      <Toolbar
        left={
          <span className="text-xs" style={{ color: 'rgba(4,14,32,0.55)' }}>
            {loading ? 'Loading…' : `${partners.length} partner${partners.length === 1 ? '' : 's'}`}
          </span>
        }
      />

      {/* Table */}
      {loading ? (
        <Card>
          <div className="flex items-center justify-center py-16">
            <div
              className="h-8 w-8 animate-spin rounded-full"
              style={{ border: '2px solid #1b61c9', borderTopColor: 'transparent' }}
            />
          </div>
        </Card>
      ) : partners.length === 0 ? (
        <Card>
          <EmptyState
            icon="🤝"
            title="No partners yet"
            description='Click "+ Add Partner" to invite your first referral partner.'
            action={
              <FormButton variant="primary" onClick={() => setShowForm(true)}>
                + Add Partner
              </FormButton>
            }
          />
        </Card>
      ) : (
        <DataTable
          columns={columns}
          rows={partners}
          rowKey={(p) => p.id}
          emptyState="No partners match your filters."
        />
      )}
    </div>
  )
}
