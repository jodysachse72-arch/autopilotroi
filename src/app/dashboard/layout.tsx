'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard, Users, Trophy, TrendingUp, Link2,
  FolderOpen, PlayCircle, Settings, ChevronRight,
  ExternalLink, LogOut, Briefcase
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
  { id: 'dash-home',        label: 'Dashboard',    href: '/dashboard',              icon: LayoutDashboard, exact: true },
  { id: 'dash-prospects',   label: 'My Prospects', href: '/dashboard/prospects',    icon: Users },
  { id: 'dash-leaderboard', label: 'Leaderboard',  href: '/dashboard/leaderboard',  icon: Trophy },
  { id: 'dash-performance', label: 'Performance',  href: '/dashboard/performance',  icon: TrendingUp },
  { id: 'dash-links',       label: 'My Links',     href: '/dashboard/links',        icon: Link2 },
  { id: 'dash-resources',   label: 'Resources',    href: '/dashboard/resources',    icon: FolderOpen },
  { id: 'dash-videos',      label: 'Videos',       href: '/dashboard/videos',       icon: PlayCircle },
  { id: 'dash-settings',    label: 'Settings',     href: '/dashboard/settings',     icon: Settings },
]

function isActive(pathname: string, href: string, exact?: boolean) {
  return exact ? pathname === href : pathname.startsWith(href)
}

function getPageTitle(pathname: string) {
  const item = navItems.find(n => isActive(pathname, n.href, n.exact))
  return item?.label ?? 'Dashboard'
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <div className="dashboard-shell">
      <SidebarProvider>
        <Sidebar collapsible="icon" variant="sidebar">
          {/* Brand */}
          <SidebarHeader className="border-b border-sidebar-border">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton size="lg" onClick={() => router.push('/dashboard')}>
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <Briefcase className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">AutopilotROI</span>
                    <span className="truncate text-xs text-sidebar-foreground/60">Partner Portal</span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>

          {/* Nav */}
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Partner Tools</SidebarGroupLabel>
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
                        <AvatarFallback className="rounded-lg bg-primary text-primary-foreground text-xs">PT</AvatarFallback>
                      </Avatar>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">Partner</span>
                        <span className="truncate text-xs text-sidebar-foreground/60">partner@example.com</span>
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

        {/* Main */}
        <div className="flex flex-1 flex-col min-h-screen overflow-hidden bg-[oklch(0.98_0_0)]">
          <header className="flex h-14 shrink-0 items-center gap-2 border-b bg-background px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/dashboard">Portal</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>{getPageTitle(pathname)}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <div className="ml-auto">
              <Badge variant="outline" className="text-xs font-medium text-primary border-primary/30 bg-primary/5">
                Partner
              </Badge>
            </div>
          </header>
          <main className="flex-1 overflow-auto p-4 sm:p-6">
            {children}
          </main>
        </div>
      </SidebarProvider>
    </div>
  )
}
