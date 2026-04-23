'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Users, Handshake, UserCircle, CheckCircle2, TrendingUp,
  Clock, AlertTriangle, ArrowRight, BarChart2, FileEdit,
  Map, ClipboardList, CheckSquare
} from 'lucide-react'

const stats = [
  { label: 'Total Users',           value: '142', delta: '+12 this week',  icon: Users,       color: 'text-blue-600',   bg: 'bg-blue-50' },
  { label: 'Active Partners',        value: '23',  delta: '+3 this month',  icon: Handshake,   color: 'text-amber-600',  bg: 'bg-amber-50' },
  { label: 'Pending Prospects',      value: '8',   delta: '5 unassigned',   icon: UserCircle,  color: 'text-orange-600', bg: 'bg-orange-50' },
  { label: 'Completed Onboardings',  value: '97',  delta: '98% conversion', icon: CheckCircle2,color: 'text-green-600',  bg: 'bg-green-50' },
]

const recentActivity = [
  { user: 'alex@example.com',    action: 'New prospect signed up',           time: '2 min ago' },
  { user: 'sarah@example.com',   action: 'Readiness assessment completed',   time: '15 min ago' },
  { user: 'james@example.com',   action: 'Partner promoted to Active',       time: '1 hour ago' },
  { user: 'maria@example.com',   action: 'Onboarding completed',             time: '3 hours ago' },
  { user: 'lisa@example.com',    action: 'New prospect signed up',           time: '5 hours ago' },
]

const unassignedProspects = [
  { name: 'John Doe',    email: 'john@example.com',  score: 42 },
  { name: 'Emma Brown',  email: 'emma@example.com',  score: 18 },
  { name: 'Mike Johnson',email: 'mike@example.com',  score: 73 },
]

const quickActions = [
  { label: 'Manage Partners',   desc: 'Add, edit, and manage referral partners',   href: '/admin/partners',   icon: Handshake },
  { label: 'Prospect Queue',    desc: 'View, filter, and assign incoming prospects', href: '/admin/prospects',  icon: UserCircle },
  { label: 'CMS Studio',        desc: 'Edit homepage, blog, and university content', href: '/admin/cms',        icon: FileEdit },
  { label: 'Strategy & Roadmap',desc: 'Competitive analysis, cost savings, phase plan',href: '/admin/roadmap', icon: Map },
  { label: 'Changelog',         desc: 'Complete history of everything built',        href: '/admin/changelog',  icon: ClipboardList },
  { label: 'Launch Checklist',  desc: 'Interactive pre-launch and phase checklists', href: '/admin/checklist',  icon: CheckSquare },
]

function scoreColor(score: number) {
  if (score >= 70) return 'bg-green-100 text-green-800'
  if (score >= 40) return 'bg-amber-100 text-amber-800'
  return 'bg-red-100 text-red-800'
}

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">System Administration</h1>
        <p className="text-muted-foreground text-sm mt-1">Manage partners, content, and platform settings.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">{s.label}</span>
                <div className={`rounded-lg p-2 ${s.bg}`}>
                  <s.icon className={`h-4 w-4 ${s.color}`} />
                </div>
              </div>
              <div className="mt-3 text-3xl font-bold tracking-tight">{s.value}</div>
              <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 text-green-500" />
                {s.delta}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Activity + Prospects */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Activity */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-base font-semibold">Recent Activity</CardTitle>
            <Link href="/admin/audit" className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline">
              View all <ArrowRight className="ml-1 h-3 w-3" />
            </Link>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {recentActivity.map((a, i) => (
                <div key={i} className="flex items-start gap-3 px-5 py-3">
                  <div className="mt-0.5 h-2 w-2 rounded-full bg-primary/70 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{a.action}</p>
                    <p className="text-xs text-muted-foreground">{a.user}</p>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">{a.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Unassigned Prospects */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              <CardTitle className="text-base font-semibold">Unassigned Prospects</CardTitle>
            </div>
            <Link href="/admin/prospects" className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline">
              View all <ArrowRight className="ml-1 h-3 w-3" />
            </Link>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {unassignedProspects.map((p) => (
                <div key={p.name} className="flex items-center gap-3 px-5 py-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{p.name}</p>
                    <p className="text-xs text-muted-foreground">{p.email}</p>
                  </div>
                  <Badge className={`text-xs font-bold ${scoreColor(p.score)}`} variant="outline">
                    {p.score}/100
                  </Badge>
                  <Button size="sm" className="h-7 text-xs">Assign</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-base font-semibold mb-3">Quick Actions</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {quickActions.map((q) => (
            <Link key={q.label} href={q.href} className="group block">
              <Card className="h-full transition-colors hover:border-primary/40 hover:bg-accent/30">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                      <q.icon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold group-hover:text-primary transition-colors">{q.label}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{q.desc}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
