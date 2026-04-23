'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search, UserPlus } from 'lucide-react'

const prospects = [
  { id: 1, name: 'John Doe',      email: 'john@example.com',    score: 42, status: 'Unassigned', partner: null,         date: '2 min ago' },
  { id: 2, name: 'Emma Brown',    email: 'emma@example.com',    score: 18, status: 'Unassigned', partner: null,         date: '15 min ago' },
  { id: 3, name: 'Mike Johnson',  email: 'mike@example.com',    score: 73, status: 'Unassigned', partner: null,         date: '1 hour ago' },
  { id: 4, name: 'Lisa Park',     email: 'lisa@example.com',    score: 85, status: 'Assigned',   partner: 'Sarah Chen', date: '3 hours ago' },
  { id: 5, name: 'Carlos Ruiz',   email: 'carlos@example.com',  score: 31, status: 'Completed',  partner: 'James Wu',   date: 'Apr 21' },
  { id: 6, name: 'Nina Kowalski', email: 'nina@example.com',    score: 67, status: 'Assigned',   partner: 'Marcus Lee', date: 'Apr 20' },
]

const statusStyle: Record<string, string> = {
  Unassigned: 'bg-orange-100 text-orange-800',
  Assigned:   'bg-blue-100 text-blue-800',
  Completed:  'bg-green-100 text-green-800',
}

function scoreColor(score: number) {
  if (score >= 70) return 'bg-green-100 text-green-800'
  if (score >= 40) return 'bg-amber-100 text-amber-800'
  return 'bg-red-100 text-red-800'
}

export default function ProspectsPage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const filtered = prospects.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.email.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'all' || p.status.toLowerCase() === statusFilter
    return matchSearch && matchStatus
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Prospects</h1>
        <p className="text-muted-foreground text-sm mt-1">Filter, triage, and assign incoming prospects.</p>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[200px] max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search prospects..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v ?? 'all')}>
              <SelectTrigger className="w-36">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="unassigned">Unassigned</SelectItem>
                <SelectItem value="assigned">Assigned</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
            <Badge variant="outline" className="text-muted-foreground">{filtered.length} prospects</Badge>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Prospect</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Partner</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="w-20" />
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
                    <Badge className={`text-xs font-bold ${scoreColor(p.score)}`} variant="outline">
                      {p.score}/100
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={`text-xs ${statusStyle[p.status]}`} variant="outline">{p.status}</Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {p.partner ?? <span className="text-orange-500 font-medium">Unassigned</span>}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{p.date}</TableCell>
                  <TableCell>
                    {p.status === 'Unassigned' && (
                      <Button size="sm" className="h-7 text-xs">
                        <UserPlus className="mr-1 h-3 w-3" />
                        Assign
                      </Button>
                    )}
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
