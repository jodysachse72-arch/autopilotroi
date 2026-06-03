'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  Card,
  SectionHeader,
  EmptyState,
  DataTable,
  Toolbar,
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
  is_active: boolean
  created_at: string
}

export default function AdminPartnersPage() {
  const [partners, setPartners] = useState<Partner[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

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
      header: 'Aurum Referral ID',
      render: (p) => (
        p.referral_code ? (
          <code
            className="rounded px-2 py-1 text-xs font-medium"
            style={{ background: 'rgba(27,97,201,0.08)', color: '#1b61c9' }}
          >
            {p.referral_code}
          </code>
        ) : (
          <span className="text-xs" style={{ color: 'rgba(4,14,32,0.35)' }}>Not set</span>
        )
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
  ]

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <SectionHeader
        title="Partner Management"
        subtitle="Partners with role 'partner' in profiles. Managed via Supabase Auth."
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
            description="Partners are managed via Supabase Auth. Set a user's profile role to 'partner' to add them here."
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
