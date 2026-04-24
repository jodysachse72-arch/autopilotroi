'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Users, Handshake, UserCircle, CheckCircle2, TrendingUp,
  ArrowRight, FileEdit, Map, ClipboardList, CheckSquare
} from 'lucide-react'

const stats = [
  { label: 'Total Users',          value: '142', delta: '+12 this week',  icon: Users,        iconBg: 'rgba(27,97,201,0.10)',  iconColor: '#1b61c9' },
  { label: 'Active Partners',       value: '23',  delta: '+3 this month',  icon: Handshake,    iconBg: 'rgba(202,138,4,0.10)',  iconColor: '#ca8a04' },
  { label: 'Pending Prospects',     value: '8',   delta: '5 unassigned',   icon: UserCircle,   iconBg: 'rgba(234,88,12,0.10)',  iconColor: '#ea580c' },
  { label: 'Completed Onboardings', value: '97',  delta: '98% conversion', icon: CheckCircle2, iconBg: 'rgba(22,163,74,0.10)',  iconColor: '#16a34a' },
]

const recentActivity = [
  { user: 'alex@example.com',  action: 'New prospect signed up',         time: '2 min ago' },
  { user: 'sarah@example.com', action: 'Readiness assessment completed', time: '15 min ago' },
  { user: 'james@example.com', action: 'Partner promoted to Active',     time: '1 hour ago' },
  { user: 'maria@example.com', action: 'Onboarding completed',           time: '3 hours ago' },
  { user: 'lisa@example.com',  action: 'New prospect signed up',         time: '5 hours ago' },
]

const unassignedProspects = [
  { name: 'John Doe',     email: 'john@example.com', score: 42 },
  { name: 'Emma Brown',   email: 'emma@example.com', score: 18 },
  { name: 'Mike Johnson', email: 'mike@example.com', score: 73 },
]

const quickActions = [
  { label: 'Manage Partners',    desc: 'Add, edit, and manage referral partners',       href: '/admin/partners',  icon: Handshake },
  { label: 'Prospect Queue',     desc: 'View, filter, and assign incoming prospects',   href: '/admin/prospects', icon: UserCircle },
  { label: 'CMS Studio',         desc: 'Edit homepage, blog, and university content',   href: '/admin/cms',       icon: FileEdit },
  { label: 'Strategy & Roadmap', desc: 'Competitive analysis, cost savings, phase plan',href: '/admin/roadmap',   icon: Map },
  { label: 'Changelog',          desc: 'Complete history of everything built',          href: '/admin/changelog', icon: ClipboardList },
  { label: 'Launch Checklist',   desc: 'Interactive pre-launch and phase checklists',   href: '/admin/checklist', icon: CheckSquare },
]

function scoreClass(score: number) {
  if (score >= 70) return 'adm-score adm-score--high'
  if (score >= 40) return 'adm-score adm-score--medium'
  return 'adm-score adm-score--low'
}

export default function AdminDashboard() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

      {/* Page Header */}
      <div className="adm-page-header">
        <div>
          <h1 className="adm-page-title">System Administration</h1>
          <p className="adm-page-subtitle">Manage partners, content, and platform settings.</p>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="adm-stat-grid">
        {stats.map(s => (
          <div key={s.label} className="adm-card" style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <span className="adm-stat-label">{s.label}</span>
              <div className="adm-stat-icon" style={{ background: s.iconBg, color: s.iconColor }}>
                <s.icon size={18} />
              </div>
            </div>
            <div className="adm-stat-value">{s.value}</div>
            <div className="adm-stat-delta" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <TrendingUp size={11} color="#16a34a" />
              {s.delta}
            </div>
          </div>
        ))}
      </div>

      {/* Activity + Prospects */}
      <div className="adm-two-col">
        {/* Recent Activity */}
        <div className="adm-card adm-card--flush">
          <div className="adm-card-header">
            <span className="adm-card-subtitle">Recent Activity</span>
            <Link href="/admin/audit" style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, fontWeight: 600, color: '#1b61c9', textDecoration: 'none' }}>
              View all <ArrowRight size={12} />
            </Link>
          </div>
          <div>
            {recentActivity.map((a, i) => (
              <div key={i} className="adm-activity-item">
                <div className="adm-activity-dot" />
                <div className="adm-activity-body">
                  <div className="adm-activity-action">{a.action}</div>
                  <div className="adm-activity-user">{a.user}</div>
                </div>
                <span className="adm-activity-time">{a.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Unassigned Prospects */}
        <div className="adm-card adm-card--flush">
          <div className="adm-card-header">
            <span className="adm-card-subtitle">⚠️ Unassigned Prospects</span>
            <Link href="/admin/prospects" style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, fontWeight: 600, color: '#1b61c9', textDecoration: 'none' }}>
              View all <ArrowRight size={12} />
            </Link>
          </div>
          <div>
            {unassignedProspects.map(p => (
              <div key={p.name} className="adm-activity-item" style={{ alignItems: 'center' }}>
                <div className="adm-activity-body">
                  <div className="adm-activity-action">{p.name}</div>
                  <div className="adm-activity-user">{p.email}</div>
                </div>
                <span className={scoreClass(p.score)} style={{ marginRight: 8 }}>{p.score}/100</span>
                <button className="adm-btn adm-btn--primary adm-btn--sm">Assign</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="adm-section-heading">Quick Actions</h2>
        <div className="adm-three-col">
          {quickActions.map(q => (
            <Link key={q.label} href={q.href} className="adm-action-card">
              <div className="adm-action-icon">
                <q.icon size={18} />
              </div>
              <div>
                <div className="adm-action-label">{q.label}</div>
                <div className="adm-action-desc">{q.desc}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

    </div>
  )
}
