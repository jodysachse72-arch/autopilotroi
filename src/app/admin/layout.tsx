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
          <header className="flex h-14 shrink-0 items-center gap-2 border-b bg-background px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/admin">Admin</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>{getPageTitle(pathname)}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <div className="ml-auto flex items-center gap-2">
              <Badge variant="outline" className="text-xs font-medium text-primary border-primary/30 bg-primary/5">
                Admin
              </Badge>
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
