'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard, Users, UserCircle, FileEdit, Mail, ToggleLeft,
  Map, ClipboardList, CheckSquare, BookOpen, FolderOpen,
  ClipboardCheck, Settings, ExternalLink, ChevronRight, LogOut, Shield
} from 'lucide-react'

import {
  Sidebar, SidebarContent, SidebarFooter, SidebarGroup,
  SidebarGroupLabel, SidebarHeader, SidebarMenu,
  SidebarMenuButton, SidebarMenuItem, SidebarProvider,
  SidebarRail, SidebarTrigger,
} from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList,
  BreadcrumbPage, BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

const navItems = [
  { id: 'admin-dashboard',  label: 'Dashboard',       href: '/admin',             icon: LayoutDashboard, exact: true },
  { id: 'admin-partners',   label: 'Partners',        href: '/admin/partners',    icon: Users },
  { id: 'admin-prospects',  label: 'Prospects',       href: '/admin/prospects',   icon: UserCircle },
  { id: 'admin-cms',        label: 'Content Editor',  href: '/admin/cms',         icon: FileEdit },
  { id: 'admin-emails',     label: 'Emails',          href: '/admin/emails',      icon: Mail },
  { id: 'admin-features',   label: 'Feature Flags',   href: '/admin/features',    icon: ToggleLeft },
  { id: 'admin-roadmap',    label: 'Roadmap',         href: '/admin/roadmap',     icon: Map },
  { id: 'admin-changelog',  label: 'Changelog',       href: '/admin/changelog',   icon: ClipboardList },
  { id: 'admin-checklist',  label: 'Checklist',       href: '/admin/checklist',   icon: CheckSquare },
  { id: 'admin-guide',      label: 'Platform Guide',  href: '/admin/guide',       icon: BookOpen },
  { id: 'admin-resources',  label: 'Resources',       href: '/admin/resources',   icon: FolderOpen },
  { id: 'admin-audit',      label: 'Audit Log',       href: '/admin/audit',       icon: ClipboardCheck },
  { id: 'admin-settings',   label: 'Integrations',    href: '/admin/settings',    icon: Settings },
]

function isActive(pathname: string, href: string, exact?: boolean) {
  return exact ? pathname === href : pathname.startsWith(href)
}

function getPageTitle(pathname: string) {
  const item = navItems.find(n => isActive(pathname, n.href, n.exact))
  return item?.label ?? 'Admin'
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <div className="admin-shell">
      <SidebarProvider>
        <Sidebar collapsible="icon" variant="sidebar">
          {/* Brand Header */}
          <SidebarHeader className="border-b border-sidebar-border">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton size="lg" onClick={() => router.push('/admin')}>
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <Shield className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">AutopilotROI</span>
                    <span className="truncate text-xs text-sidebar-foreground/60">Admin Panel</span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>

          {/* Nav */}
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarMenu>
                {navItems.map((item) => {
                  const active = isActive(pathname, item.href, item.exact)
                  return (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton
                        isActive={active}
                        tooltip={item.label}
                        id={item.id}
                        onClick={() => router.push(item.href)}
                      >
                        <item.icon />
                        <span>{item.label}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>

          {/* Footer */}
          <SidebarFooter className="border-t border-sidebar-border">
            <SidebarMenu>
              <SidebarMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuButton size="lg">
                      <Avatar className="h-8 w-8 rounded-lg">
                        <AvatarFallback className="rounded-lg bg-primary text-primary-foreground text-xs">AD</AvatarFallback>
                      </Avatar>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">Admin</span>
                        <span className="truncate text-xs text-sidebar-foreground/60">admin@autopilotroi.com</span>
                      </div>
                      <ChevronRight className="ml-auto size-4" />
                    </SidebarMenuButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="top" align="start" className="w-56">
                    <DropdownMenuItem onClick={() => window.open('/', '_blank')}>
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View Site
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push('/login')}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
          <SidebarRail />
        </Sidebar>

        {/* Main content */}
        <div className="flex flex-1 flex-col min-h-screen overflow-hidden bg-[oklch(0.98_0_0)]">
          {/* Top bar */}
          <header
            className="flex h-[4.8rem] shrink-0 items-center justify-between border-b bg-background px-5 lg:px-8"
            style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}
          >
            <div className="flex items-center gap-3">
              <SidebarTrigger className="-ml-1" />
              <h1 className="text-lg font-bold" style={{ color: '#181d26', letterSpacing: '-0.02em' }}>
                System Administration
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <button
                className="hidden sm:flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11px] font-medium transition"
                style={{ border: '1px solid #e0e2e6', color: 'rgba(4,14,32,0.45)' }}
                title="Quick search (Cmd+K)"
              >
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <kbd className="font-mono">⌘K</kbd>
              </button>
              <button
                className="hidden sm:flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition"
                style={{ border: '1px solid #e0e2e6', color: '#1b61c9' }}
                title="Take a guided tour"
              >
                🗺️ Tour
              </button>
              <span
                id="admin-badge"
                className="rounded-full px-3 py-1 text-xs font-bold"
                style={{ background: 'rgba(239,68,68,0.10)', color: '#dc2626' }}
              >
                Admin
              </span>
            </div>
          </header>

          {/* Page content */}
          <main className="flex-1 overflow-auto p-4 sm:p-6">
            {children}
          </main>
        </div>
      </SidebarProvider>
    </div>
  )
}
