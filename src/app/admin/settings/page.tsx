'use client'

import { SectionHeader, Card, StatusBadge } from '@/components/backend'

const integrations = [
  { name: 'Supabase',  icon: '🗄️', description: 'PostgreSQL database, authentication, and real-time subscriptions.', status: 'Connected', category: 'Database'    },
  { name: 'Vercel',    icon: '▲',   description: 'Hosting, deployments, serverless functions, and analytics.',         status: 'Connected', category: 'Hosting'     },
  { name: 'SendGrid',  icon: '📧',  description: 'Transactional email delivery for all platform notifications.',       status: 'Connected', category: 'Email'       },
  { name: 'Stripe',    icon: '💳',  description: 'Payment processing and commission payouts for partners.',            status: 'Pending',   category: 'Payments'    },
  { name: 'OpenAI',    icon: '🤖',  description: 'AI-powered prospect scoring and coaching recommendations.',          status: 'Pending',   category: 'AI'          },
  { name: 'Sentry',    icon: '🔍',  description: 'Error tracking, performance monitoring, and alerting.',              status: 'Not set up',category: 'Monitoring'  },
  { name: 'Resend',    icon: '✉️',  description: 'Modern email API as an alternative to SendGrid.',                   status: 'Not set up',category: 'Email'       },
  { name: 'Mixpanel',  icon: '📊',  description: 'Product analytics and user behaviour tracking.',                    status: 'Not set up',category: 'Analytics'   },
]

const statusTone: Record<string, 'green'|'amber'|'neutral'> = {
  'Connected': 'green', 'Pending': 'amber', 'Not set up': 'neutral',
}

export default function SettingsPage() {
  return (
    <div className="space-y-5">
      <SectionHeader title="Integrations" subtitle="Manage platform services and third-party connections" />
      <div className="grid gap-4 sm:grid-cols-2">
        {integrations.map(int => (
          <Card key={int.name}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl text-xl shrink-0"
                  style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }} aria-hidden>
                  {int.icon}
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold" style={{ color: '#0f172a' }}>{int.name}</p>
                  <p className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: 'rgba(15,23,42,0.40)' }}>
                    {int.category}
                  </p>
                </div>
              </div>
              <StatusBadge tone={statusTone[int.status]} className="shrink-0">{int.status}</StatusBadge>
            </div>
            <p className="mt-3 text-xs leading-relaxed" style={{ color: 'rgba(15,23,42,0.55)' }}>{int.description}</p>
            <div className="mt-4 flex gap-2">
              <button className="be-btn be-btn--sm be-btn--ghost">Configure</button>
              {int.status !== 'Connected' && (
                <button className="be-btn be-btn--sm be-btn--primary">Connect</button>
              )}
              {int.status === 'Connected' && (
                <button className="be-btn be-btn--sm be-btn--danger">Disconnect</button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
