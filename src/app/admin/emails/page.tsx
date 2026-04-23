'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Mail, Send, Clock, CheckCircle2 } from 'lucide-react'

const emails = [
  { id: 1, subject: 'Welcome to AutopilotROI',      recipient: 'New partners',       status: 'Sent',      opens: 87,  date: 'Apr 22' },
  { id: 2, subject: 'Your prospect has been assigned', recipient: 'Partners',         status: 'Sent',      opens: 42,  date: 'Apr 21' },
  { id: 3, subject: 'Readiness score available',     recipient: 'Prospects',          status: 'Sent',      opens: 134, date: 'Apr 20' },
  { id: 4, subject: 'Monthly partner report',         recipient: 'All partners',      status: 'Draft',     opens: 0,   date: 'Apr 19' },
  { id: 5, subject: 'Onboarding complete — next steps', recipient: 'Completed users', status: 'Scheduled', opens: 0,   date: 'Apr 25' },
]

const statusStyle: Record<string, string> = {
  Sent:      'bg-green-100 text-green-800',
  Draft:     'bg-gray-100 text-gray-600',
  Scheduled: 'bg-blue-100 text-blue-800',
}

export default function EmailsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Emails</h1>
          <p className="text-muted-foreground text-sm mt-1">View and manage platform email campaigns.</p>
        </div>
        <Button size="sm"><Mail className="mr-2 h-4 w-4" />Compose</Button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          { label: 'Sent',      value: '3',   icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Scheduled', value: '1',   icon: Clock,        color: 'text-blue-600',  bg: 'bg-blue-50' },
          { label: 'Total Opens',value: '263', icon: Mail,         color: 'text-purple-600',bg: 'bg-purple-50' },
        ].map(s => (
          <Card key={s.label}>
            <CardContent className="p-4 flex items-center gap-4">
              <div className={`rounded-lg p-2 ${s.bg}`}><s.icon className={`h-5 w-5 ${s.color}`} /></div>
              <div><p className="text-2xl font-bold">{s.value}</p><p className="text-xs text-muted-foreground">{s.label}</p></div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Subject</TableHead>
                <TableHead>Recipient</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Opens</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="w-16" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {emails.map(e => (
                <TableRow key={e.id}>
                  <TableCell className="font-medium text-sm">{e.subject}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{e.recipient}</TableCell>
                  <TableCell>
                    <Badge className={`text-xs ${statusStyle[e.status]}`} variant="outline">{e.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right text-sm font-medium">{e.opens > 0 ? e.opens : '—'}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{e.date}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" className="h-7 text-xs">
                      {e.status === 'Draft' ? <><Send className="mr-1 h-3 w-3" />Send</> : 'View'}
                    </Button>
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
