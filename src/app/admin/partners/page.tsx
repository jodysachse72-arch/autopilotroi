'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Search, Plus, MoreHorizontal, Users } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

const partners = [
  { id: 1, name: 'Sarah Chen',    email: 'sarah@example.com',  status: 'Active',   prospects: 12, conversions: 8,  joined: 'Jan 15, 2026' },
  { id: 2, name: 'Marcus Lee',    email: 'marcus@example.com', status: 'Active',   prospects: 7,  conversions: 5,  joined: 'Feb 3, 2026' },
  { id: 3, name: 'Priya Patel',   email: 'priya@example.com',  status: 'Pending',  prospects: 3,  conversions: 0,  joined: 'Mar 20, 2026' },
  { id: 4, name: 'James Wu',      email: 'james@example.com',  status: 'Active',   prospects: 19, conversions: 14, joined: 'Nov 28, 2025' },
  { id: 5, name: 'Alicia Torres', email: 'alicia@example.com', status: 'Inactive', prospects: 2,  conversions: 1,  joined: 'Apr 1, 2026' },
]

const statusStyle: Record<string, string> = {
  Active:   'bg-green-100 text-green-800',
  Pending:  'bg-amber-100 text-amber-800',
  Inactive: 'bg-gray-100 text-gray-600',
}

export default function PartnersPage() {
  const [search, setSearch] = useState('')
  const filtered = partners.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.email.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Partners</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage your active referral partner accounts.</p>
        </div>
        <Button size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Add Partner
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search partners..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <Badge variant="outline" className="text-muted-foreground">{filtered.length} partners</Badge>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Partner</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Prospects</TableHead>
                <TableHead className="text-right">Conversions</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="w-10" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(p => (
                <TableRow key={p.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium text-sm">{p.name}</p>
                      <p className="text-xs text-muted-foreground">{p.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={`text-xs ${statusStyle[p.status]}`} variant="outline">{p.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right font-medium">{p.prospects}</TableCell>
                  <TableCell className="text-right font-medium">{p.conversions}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{p.joined}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View profile</DropdownMenuItem>
                        <DropdownMenuItem>Edit partner</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Deactivate</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
