import {
  PageShell,
  SectionBox,
  HeroBlue,
  CTABand,
} from '@/components/sections'
import {
  AutomationIcon,
  EcosystemIcon,
  PartnerIcon,
  BankIcon,
  CardIcon,
  TrendingUpIcon,
  CheckCircleIcon,
} from '@/components/ui/Icons'

export const metadata = {
  title: 'Executive Summary | AutoPilot ROI',
  description:
    'Understand the Aurum ecosystem before you join \u2014 AI trading bots, crypto card, exchange, and neobank explained simply.',
}

type Product = {
  title: string
  description: string
  borderColor: string
  iconBg: string
  iconColor: string
  Icon: React.ComponentType<{ className?: string }>
}

type Section = {
  id: string
  title: string
  Icon: React.ComponentType<{ className?: string }>
  accent: string
  body: string[]
  products?: Product[]
  callout?: string
  calloutType?: 'warning' | 'info' | 'success'
}

const SECTIONS: Section[] = [
  {
    id: 'how-bot-works',
    title: 'How the AI Trading Bot Works',
    Icon: AutomationIcon,
    accent: '#1b61c9',
    body: [
      'The EX-AI Bot analyses global cryptocurrency markets around the clock using machine learning algorithms. It executes trades automatically on Binance, Bybit, and KuCoin \u2014 the world\u0027s largest crypto exchanges.',
      'Once you fund and activate your bot, it generates returns and distributes them to your account on a regular basis. You do not need trading experience. The system is fully automated.',
      'Returns are illustrative and vary by market conditions. Regular performance reports are published for members.',
    ],
    callout: 'All investment carries risk. Bot returns are not guaranteed. Never invest more than you can afford to lose.',
    calloutType: 'warning',
  },
  {
    id: 'ecosystem',
    title: 'The Complete Ecosystem',
    Icon: EcosystemIcon,
    accent: '#0891b2',
    body: [
      'More than a trading bot. It is a complete financial infrastructure for the decentralised economy.',
    ],
    products: [
      {
        title: 'EX-AI Bot',
        description: 'Automated cryptocurrency trading on the world\u0027s top exchanges. BTC, ETH, USDT and more \u2014 live 24/7.',
        borderColor: '#bfdbfe',
        iconBg: 'rgba(27,97,201,0.08)',
        iconColor: '#1b61c9',
        Icon: AutomationIcon,
      },
      {
        title: 'Visa Crypto Card',
        description: 'Spend your crypto earnings anywhere Visa is accepted \u2014 80M+ merchants globally.',
        borderColor: '#fecaca',
        iconBg: 'rgba(239,68,68,0.08)',
        iconColor: '#dc2626',
        Icon: CardIcon,
      },
      {
        title: 'Gold RWA Trading',
        description: 'Tokenised real-world gold from African suppliers with AI-driven trading and physical delivery options.',
        borderColor: '#fde68a',
        iconBg: 'rgba(217,119,6,0.08)',
        iconColor: '#b45309',
        Icon: TrendingUpIcon,
      },
      {
        title: 'Zeus AI & Web3 NeoBank',
        description: 'Manage crypto and fiat in one account with Swift, SEPA transfers, and 24/7 support.',
        borderColor: '#ddd6fe',
        iconBg: 'rgba(109,40,217,0.08)',
        iconColor: '#6d28d9',
        Icon: BankIcon,
      },
    ],
  },
  {
    id: 'spillover',
    title: 'The Spillover Model',
    Icon: PartnerIcon,
    accent: '#059669',
    body: [
      'A 3-deep spillover referral model. Each partner has three direct positions beneath them. When those three positions are filled, new members who join through the team automatically "spill" into the next available position in the downline.',
      'This means that as the team grows, members benefit from activity they did not personally generate. Your downline builds from the momentum of the entire team.',
    ],
    callout: 'AutoPilot ROI exists specifically to make sure every new member is correctly placed in the spillover structure with full partner support.',
    calloutType: 'success',
  },
]

const CALLOUT_STYLES = {
  warning: { borderColor: '#fde68a', background: '#fffbeb', color: '#b45309' },
  info:    { borderColor: '#bfdbfe', background: '#eff6ff', color: '#1d4ed8' },
  success: { borderColor: '#a7f3d0', background: '#ecfdf5', color: '#047857' },
}

export default function SummaryPage() {
  return (
    <PageShell>
      <HeroBlue
        eyebrow="Executive Summary"
        title={<>What is the<br />Aurum Ecosystem?</>}
        description="A decentralised AI-driven financial platform that combines automated trading bots, a crypto debit card, a crypto exchange, and a Web3 neobank into one ecosystem. AutoPilot ROI is your guided entry point."
      />

      <SectionBox variant="white" padding="lg">
        <div style={{ maxWidth: '52rem', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {SECTIONS.map(section => (
            <section
              key={section.id}
              id={section.id}
              style={{
                background: '#fff',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-card)',
                padding: '2rem',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                scrollMarginTop: '6rem',
              }}
            >
              <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '3rem',
                  height: '3rem',
                  borderRadius: '0.75rem',
                  background: section.accent + '14',
                  border: '1px solid ' + section.accent + '33',
                  color: section.accent,
                  flexShrink: 0,
                }}>
                  <section.Icon className="w-7 h-7" />
                </div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h2)', fontWeight: 700, color: '#181d26', letterSpacing: '-0.02em', margin: 0 }}>
                  {section.title}
                </h2>
              </div>

              {section.body.map((para, i) => (
                <p key={i} style={{ fontSize: '0.95rem', lineHeight: 1.7, color: 'rgba(4,14,32,0.65)', marginBottom: '1rem' }}>
                  {para}
                </p>
              ))}

              {section.products && (
                <div style={{
                  marginTop: '1.5rem',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 16rem), 1fr))',
                  gap: '1rem',
                }}>
                  {section.products.map(product => (
                    <div key={product.title} style={{
                      borderRadius: '0.75rem',
                      padding: '1.25rem',
                      border: '1px solid ' + product.borderColor,
                      background: '#fafbff',
                      transition: 'box-shadow 200ms ease',
                    }}>
                      <div style={{
                        marginBottom: '0.75rem',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '2.5rem',
                        height: '2.5rem',
                        borderRadius: '0.5rem',
                        background: product.iconBg,
                        color: product.iconColor,
                      }}>
                        <product.Icon className="w-5 h-5" />
                      </div>
                      <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-body-lg)', color: '#181d26', margin: '0 0 0.5rem' }}>
                        {product.title}
                      </h3>
                      <p style={{ fontSize: 'var(--text-body)', lineHeight: 1.6, color: 'rgba(4,14,32,0.6)', margin: 0 }}>
                        {product.description}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {section.callout && section.calloutType && (
                <div style={{
                  marginTop: '1.5rem',
                  borderRadius: '0.75rem',
                  border: '1px solid',
                  padding: '1rem 1.25rem',
                  fontSize: 'var(--text-body)',
                  lineHeight: 1.6,
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.625rem',
                  ...CALLOUT_STYLES[section.calloutType],
                }}>
                  <span style={{ marginTop: '0.125rem', flexShrink: 0 }}>
                    <CheckCircleIcon className="w-4 h-4" />
                  </span>
                  <span>{section.callout}</span>
                </div>
              )}
            </section>
          ))}
        </div>
      </SectionBox>

      <CTABand
        eyebrow="Ready to get started?"
        title={<>You\u2019ve seen the system.<br />Now run the playbook.</>}
        description="Now that you understand the ecosystem, your next step is to work through the AutoPilot ROI onboarding guide with your dedicated partner."
        ctas={[
          { label: 'Begin onboarding \u2192', href: '/signup' },
          { label: 'View resources', href: '/resources', variant: 'ghost' },
        ]}
      />
    </PageShell>
  )
}
