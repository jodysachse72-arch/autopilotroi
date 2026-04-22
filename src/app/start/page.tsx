import Link from 'next/link'
import {
  PageShell,
  SectionBox,
  SectionHeader,
  HeroBlue,
  CTABand,
} from '@/components/sections'
import {
  BankIcon,
  SecurityIcon,
  ExchangeIcon,
  OnboardingIcon,
  AutomationIcon,
  CheckCircleIcon,
  PartnerIcon,
  AcademyIcon,
  PlayCircleIcon,
  SparkleIcon,
  FlagIcon,
} from '@/components/ui/Icons'

/* ═══════════════════════════════════════════════════════════════
   START PAGE — Long-form onboarding narrative
   Read once, do once. Six chapters, written out.
   ═══════════════════════════════════════════════════════════════ */

interface Instruction {
  text: string
  warning?: string
  tip?: string
}

interface Chapter {
  id: number
  Icon: React.ComponentType<{ className?: string; strokeWidth?: number }>
  accent: string
  accentBg: string
  title: string
  subtitle: string
  why?: string
  warning?: string
  videoLabel?: string
  videoNote?: string
  link?: { label: string; href: string; external?: boolean }
  instructions: Instruction[]
}

const chapters: Chapter[] = [
  {
    id: 1,
    Icon: BankIcon,
    accent: '#1b61c9',
    accentBg: 'rgba(27,97,201,0.08)',
    title: 'Set up Trust Wallet',
    subtitle: 'Your self-custodial crypto wallet',
    why: 'Trust Wallet is a self-custodial wallet — meaning you control your own funds with a private seed phrase. You need it to hold USDT and interact with the Aurum platform.',
    warning: 'Never share your 12-word seed phrase with anyone — including your AutoPilot ROI partner. Anyone who asks for it is a scammer.',
    videoLabel: 'Aurum University · Step 1',
    videoNote: 'How to set up Trust Wallet correctly',
    link: { label: 'Download Trust Wallet (official site)', href: 'https://trustwallet.com', external: true },
    instructions: [
      { text: 'Download Trust Wallet from the official App Store or Google Play. Ensure the developer is "Six Days LLC" — do not download unofficial versions.' },
      {
        text: 'Open the app and select "Create a new wallet". Write down your 12-word recovery phrase on paper — not your phone.',
        warning: 'If you lose your seed phrase, you lose access to your funds permanently.',
      },
      { text: 'Confirm your seed phrase in the app to verify you wrote it correctly.' },
      {
        text: 'Add USDT (TRC20) to your wallet. In Trust Wallet, tap the "+" icon and search for "USDT TRC20". Enable it.',
        tip: 'Always use USDT on the TRC20 network for Aurum deposits — it has the lowest fees.',
      },
    ],
  },
  {
    id: 2,
    Icon: SecurityIcon,
    accent: '#7c3aed',
    accentBg: 'rgba(124,58,237,0.08)',
    title: 'Set up a paid VPN',
    subtitle: 'Required to access the Aurum platform',
    why: 'Aurum is geo-restricted in some regions. A VPN lets you connect from a supported jurisdiction. This is a requirement, not optional.',
    warning: 'Never use a free VPN for financial applications. Free VPNs can log your data and expose your accounts. Use a paid, reputable provider.',
    videoLabel: 'Aurum University · Step 2',
    videoNote: 'VPN setup guide for Aurum access',
    link: { label: 'Get NordVPN — recommended provider', href: 'https://nordvpn.com', external: true },
    instructions: [
      { text: 'Download NordVPN or ExpressVPN from their official website. Both have mobile and desktop apps.' },
      { text: 'Create an account and start your subscription — both have money-back guarantees.' },
      { text: 'Connect to a server in a supported country (USA, UK, or Germany typically work well).' },
      {
        text: 'Keep the VPN connected whenever you access the Aurum platform.',
        tip: 'Set the VPN to connect automatically on startup so you never forget.',
      },
    ],
  },
  {
    id: 3,
    Icon: ExchangeIcon,
    accent: '#059669',
    accentBg: 'rgba(5,150,105,0.08)',
    title: 'Acquire USDT',
    subtitle: 'Purchase Tether (USDT) to fund your bot',
    why: 'USDT is a stablecoin (1 USDT ≈ $1 USD). Aurum requires USDT for deposits. It is the safest and most stable way to fund your account without volatility risk.',
    warning: 'Only use the TRC20 (Tron) network to send USDT to Aurum. Sending on the wrong network will result in lost funds.',
    videoLabel: 'Aurum University · Step 3',
    videoNote: 'How to buy and transfer USDT safely',
    instructions: [
      { text: 'The minimum to activate the Aurum bot is $100 USDT. Most members start with $500–$1,000.' },
      { text: 'Purchase USDT on a reputable exchange — Binance, Kraken, or Coinbase are recommended. Use your bank card or a bank transfer.' },
      {
        text: 'Withdraw your USDT to your Trust Wallet. Select the TRC20 network when withdrawing.',
        warning: 'Confirm TRC20 network twice before sending. Wrong network = lost funds.',
      },
      { text: 'Verify the transaction arrived in Trust Wallet by checking your TRC20 USDT balance before moving on.' },
    ],
  },
  {
    id: 4,
    Icon: OnboardingIcon,
    accent: '#d97706',
    accentBg: 'rgba(217,119,6,0.08)',
    title: 'Create your Aurum account',
    subtitle: 'Register on Aurum Foundation with your referral code',
    warning: 'You must use the referral link provided by your AutoPilot ROI partner. Creating an account without one will mean you are placed incorrectly in the structure and may lose spillover benefits.',
    videoLabel: 'Aurum University · Step 4',
    videoNote: 'Creating your Aurum account step by step',
    link: { label: 'Contact your partner for your referral link', href: '#partner-help' },
    instructions: [
      { text: 'Ensure your VPN is active and connected to a supported country before visiting the Aurum website.' },
      {
        text: 'Click the referral link provided by your AutoPilot ROI partner. This link contains your partner\u0027s referral code.',
        warning: 'Do not create an account from the main Aurum website without a referral link.',
      },
      { text: 'Complete the registration form. Use your real name and a secure email address. Save your password in a password manager.' },
      { text: 'Verify your email address by clicking the link in the confirmation email from Aurum.' },
      { text: 'Log in to your new Aurum account and confirm your referral code is visible in your back office.' },
    ],
  },
  {
    id: 5,
    Icon: AutomationIcon,
    accent: '#0891b2',
    accentBg: 'rgba(8,145,178,0.08)',
    title: 'Fund and activate the bot',
    subtitle: 'Deposit USDT and start the EX-AI Trading Bot',
    why: 'Funding your Aurum account activates the EX-AI Bot, which begins automated trading on Binance, Bybit, and KuCoin. Returns are generated and credited to your Aurum balance.',
    warning: 'Only use the TRC20 USDT deposit address shown in your Aurum back office. Do not deposit directly from an exchange — always send from Trust Wallet.',
    videoLabel: 'Aurum University · Step 5',
    videoNote: 'How to fund your Aurum account and activate the AI bot',
    instructions: [
      { text: 'Log in to your Aurum back office. Navigate to "Deposit" or "Fund Account".' },
      {
        text: 'Copy the TRC20 USDT deposit address shown in your Aurum account.',
        warning: 'Re-check the first and last 4 characters of the address before sending.',
      },
      { text: 'Open Trust Wallet and send your USDT to the Aurum deposit address using the TRC20 network.' },
      { text: 'Wait for the deposit to confirm on-chain (usually 1–5 minutes). Your Aurum balance will update.' },
      {
        text: 'Once funded, activate the EX-AI Bot from your back office. Your bot will begin trading automatically.',
        tip: 'Take a screenshot of your bot activation confirmation for your records.',
      },
    ],
  },
  {
    id: 6,
    Icon: CheckCircleIcon,
    accent: '#dc2626',
    accentBg: 'rgba(220,38,38,0.08)',
    title: 'Confirm your placement',
    subtitle: 'Verify with your partner that everything is correct',
    why: 'Referral confirmation ensures you are placed in the correct position within the AutoPilot ROI spillover structure and that your partner is notified of your successful onboarding.',
    videoLabel: 'Aurum University · Step 6',
    videoNote: 'Confirming your referral and team placement',
    instructions: [
      { text: 'In your Aurum back office, find your referral information and copy your upline partner\u0027s referral code.' },
      { text: 'Message your AutoPilot ROI partner directly to confirm everything looks correct on their end.' },
      { text: 'Your partner will confirm your placement in the spillover tree and guide you to the Resources section for next steps.' },
      {
        text: 'Bookmark the AutoPilot ROI Resources page — it is your ongoing hub for education, updates, and community.',
        tip: 'If you are joining the Partner Program, your partner will now walk you through the referral tools.',
      },
    ],
  },
]

const prereqs = [
  { Icon: BankIcon,        label: 'A phone or laptop',          detail: 'For Trust Wallet + your Aurum back office.' },
  { Icon: SecurityIcon,    label: 'A paid VPN subscription',    detail: 'Free VPNs aren\u0027t safe for finance — budget ~$5/mo.' },
  { Icon: ExchangeIcon,    label: '$100 USDT minimum',          detail: 'Most members start with $500–$1,000 in the COMFORT tier.' },
  { Icon: PartnerIcon,     label: 'Your partner\u0027s referral link', detail: 'Without it you\u0027re placed wrong and lose spillover.' },
  { Icon: SparkleIcon,     label: '30–45 minutes, undistracted', detail: 'Don\u0027t rush wallet setup. Quiet room, full attention.' },
]

export default function StartPage() {
  return (
    <PageShell>

      {/* ── 1. HERO ── */}
      <HeroBlue
        eyebrow="Guided onboarding"
        title={<>From your first $100<br />to an active bot.</>}
        description="Six chapters. Read them through once, then do them in order. Your AutoPilot ROI partner is on the other end of every step if you get stuck."
        ctas={[
          { label: 'Start with Chapter 1 ↓', href: '#chapter-1' },
          { label: 'Watch on Aurum University', href: '/university', variant: 'ghost' },
        ]}
      />

      {/* ── 2. WHAT YOU'LL NEED ── */}
      <SectionBox variant="white" padding="lg">
        <SectionHeader
          eyebrow="Before you start"
          title={<>Five things to have ready.</>}
          align="left"
          maxWidth="42rem"
          marginBottom="2.5rem"
        >
          Gather these now and the rest of the journey takes about 30–45 minutes from end to end.
        </SectionHeader>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 14rem), 1fr))',
          gap: '1rem',
        }}>
          {prereqs.map((p, i) => (
            <div key={i} style={{
              background: '#f8fafc',
              border: '1px solid var(--color-border-light)',
              borderRadius: '0.875rem',
              padding: '1.25rem',
            }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                width: '2.25rem', height: '2.25rem',
                borderRadius: '0.5rem',
                background: 'rgba(27,97,201,0.08)',
                color: '#1b61c9',
                marginBottom: '0.75rem',
              }}>
                <p.Icon className="w-5 h-5" />
              </span>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-body)',
                fontWeight: 700,
                color: '#181d26',
                marginBottom: '0.25rem',
              }}>
                {p.label}
              </div>
              <p style={{ fontSize: '0.875rem', lineHeight: 1.55, color: 'var(--color-text-weak)', margin: 0 }}>
                {p.detail}
              </p>
            </div>
          ))}
        </div>
      </SectionBox>

      {/* ── 3. SIX CHAPTERS ── */}
      {chapters.map((ch, idx) => {
        const variant = idx % 2 === 0 ? 'surface' : 'white'
        const next = chapters[idx + 1]
        return (
          <SectionBox key={ch.id} id={`chapter-${ch.id}`} variant={variant} padding="lg">
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 18rem) minmax(0, 1fr)',
              gap: '3rem',
              alignItems: 'start',
            }}>

              {/* LEFT: Chapter header */}
              <div style={{ position: 'sticky', top: '6rem' }}>
                <div style={{
                  fontSize: 'var(--text-caption)',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: ch.accent,
                  fontFamily: 'var(--font-display)',
                  marginBottom: '0.75rem',
                }}>
                  Chapter {String(ch.id).padStart(2, '0')} of 06
                </div>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  width: '4rem', height: '4rem',
                  borderRadius: '1rem',
                  background: ch.accentBg,
                  color: ch.accent,
                  marginBottom: '1.25rem',
                }}>
                  <ch.Icon className="w-8 h-8" strokeWidth={1.5} />
                </span>
                <h2 className="text-display-sm" style={{
                  color: '#181d26',
                  marginBottom: '0.5rem',
                  fontFamily: 'var(--font-display)',
                }}>
                  {ch.title}
                </h2>
                <p style={{ fontSize: 'var(--text-body)', color: 'var(--color-text-weak)', lineHeight: 1.5, margin: 0 }}>
                  {ch.subtitle}
                </p>

                {/* Aurum U video link */}
                {ch.videoLabel && (
                  <Link
                    href="/university"
                    style={{
                      display: 'flex', alignItems: 'center', gap: '0.75rem',
                      marginTop: '1.5rem',
                      background: '#ffffff',
                      border: '1px solid var(--color-border)',
                      borderRadius: '0.75rem',
                      padding: '0.875rem 1rem',
                      textDecoration: 'none',
                      transition: 'border-color 150ms ease, box-shadow 150ms ease',
                    }}
                  >
                    <span style={{
                      flexShrink: 0,
                      width: '2.25rem', height: '2.25rem',
                      borderRadius: '0.5rem',
                      background: ch.accentBg,
                      color: ch.accent,
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <PlayCircleIcon className="w-5 h-5" />
                    </span>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: ch.accent, letterSpacing: '0.06em', textTransform: 'uppercase', fontFamily: 'var(--font-display)' }}>
                        {ch.videoLabel}
                      </div>
                      <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#181d26', marginTop: '0.125rem' }}>
                        {ch.videoNote}
                      </div>
                    </div>
                  </Link>
                )}
              </div>

              {/* RIGHT: Narrative content */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

                {ch.why && (
                  <div style={{
                    background: ch.accentBg,
                    border: `1px solid ${ch.accent}33`,
                    borderRadius: '0.875rem',
                    padding: '1.125rem 1.25rem',
                    display: 'flex',
                    gap: '0.75rem',
                    alignItems: 'flex-start',
                  }}>
                    <span style={{ flexShrink: 0, color: ch.accent, marginTop: '0.125rem' }}>
                      <SparkleIcon className="w-5 h-5" />
                    </span>
                    <div>
                      <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: ch.accent, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.25rem', fontFamily: 'var(--font-display)' }}>
                        Why this step
                      </div>
                      <p style={{ fontSize: 'var(--text-body)', lineHeight: 1.6, color: '#181d26', margin: 0 }}>
                        {ch.why}
                      </p>
                    </div>
                  </div>
                )}

                {ch.warning && (
                  <div style={{
                    background: 'rgba(245,158,11,0.08)',
                    border: '1px solid rgba(245,158,11,0.28)',
                    borderRadius: '0.875rem',
                    padding: '1.125rem 1.25rem',
                    display: 'flex',
                    gap: '0.75rem',
                    alignItems: 'flex-start',
                    color: '#92400e',
                  }}>
                    <span style={{ flexShrink: 0, marginTop: '0.125rem' }}>
                      <FlagIcon className="w-5 h-5" />
                    </span>
                    <div>
                      <div style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.25rem', fontFamily: 'var(--font-display)' }}>
                        Important
                      </div>
                      <p style={{ fontSize: 'var(--text-body)', lineHeight: 1.6, margin: 0 }}>
                        {ch.warning}
                      </p>
                    </div>
                  </div>
                )}

                {/* Numbered prose instructions */}
                <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {ch.instructions.map((ins, i) => (
                    <li key={i} style={{ display: 'flex', gap: '1rem' }}>
                      <span style={{
                        flexShrink: 0,
                        width: '2rem', height: '2rem',
                        borderRadius: '50%',
                        background: ch.accent,
                        color: '#ffffff',
                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                        fontFamily: 'var(--font-display)',
                        fontWeight: 800,
                        fontSize: '0.875rem',
                      }}>
                        {i + 1}
                      </span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontSize: '1rem', lineHeight: 1.65, color: '#181d26', margin: 0 }}>
                          {ins.text}
                        </p>
                        {ins.warning && (
                          <div style={{
                            marginTop: '0.625rem',
                            background: 'rgba(245,158,11,0.07)',
                            border: '1px solid rgba(245,158,11,0.22)',
                            borderRadius: '0.5rem',
                            padding: '0.5rem 0.75rem',
                            fontSize: '0.8125rem',
                            color: '#92400e',
                            lineHeight: 1.5,
                          }}>
                            <strong>Watch out:</strong> {ins.warning}
                          </div>
                        )}
                        {ins.tip && (
                          <div style={{
                            marginTop: '0.625rem',
                            background: 'rgba(8,145,178,0.06)',
                            border: '1px solid rgba(8,145,178,0.22)',
                            borderRadius: '0.5rem',
                            padding: '0.5rem 0.75rem',
                            fontSize: '0.8125rem',
                            color: '#0e7490',
                            lineHeight: 1.5,
                          }}>
                            <strong>Tip:</strong> {ins.tip}
                          </div>
                        )}
                      </div>
                    </li>
                  ))}
                </ol>

                {ch.link && (
                  <Link
                    href={ch.link.href}
                    {...(ch.link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                      alignSelf: 'flex-start',
                      background: ch.accent,
                      color: '#ffffff',
                      padding: '0.75rem 1.25rem',
                      borderRadius: 'var(--radius-btn)',
                      fontFamily: 'var(--font-display)',
                      fontWeight: 700,
                      fontSize: 'var(--text-body)',
                      textDecoration: 'none',
                      transition: 'transform 150ms ease, box-shadow 150ms ease',
                      boxShadow: `0 4px 16px ${ch.accentBg}`,
                    }}
                  >
                    {ch.link.label} →
                  </Link>
                )}

                {/* "Next up" footer */}
                {next && (
                  <div style={{
                    marginTop: '0.5rem',
                    paddingTop: '1.25rem',
                    borderTop: '1px solid var(--color-border-light)',
                  }}>
                    <Link
                      href={`#chapter-${next.id}`}
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                        fontSize: 'var(--text-body)',
                        fontWeight: 600,
                        color: 'var(--color-text-weak)',
                        textDecoration: 'none',
                        fontFamily: 'var(--font-display)',
                      }}
                    >
                      <span style={{ fontSize: '0.6875rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>
                        Next →
                      </span>
                      Chapter {next.id}: {next.title}
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </SectionBox>
        )
      })}

      {/* ── 4. PARTNER HELP / "STUCK" SECTION ── */}
      <SectionBox variant="white" padding="lg" id="partner-help">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 22rem), 1fr))',
          gap: '1.25rem',
        }}>
          <div style={{
            background: '#f8fafc',
            border: '1px solid var(--color-border-light)',
            borderRadius: '1rem',
            padding: '2rem',
          }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              width: '3rem', height: '3rem',
              borderRadius: '0.75rem',
              background: 'rgba(27,97,201,0.08)',
              color: '#1b61c9',
              marginBottom: '1rem',
            }}>
              <PartnerIcon className="w-6 h-6" />
            </span>
            <h3 className="text-display-sm" style={{ color: '#181d26', marginBottom: '0.625rem' }}>
              Stuck on a step?
            </h3>
            <p style={{ fontSize: 'var(--text-body)', color: 'var(--color-text-weak)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Your AutoPilot ROI partner is your single point of contact. They\u0027ve walked dozens of new members through this exact path — message them before you guess.
            </p>
            <Link
              href="/faqs"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                background: '#1b61c9',
                color: '#ffffff',
                padding: '0.75rem 1.25rem',
                borderRadius: 'var(--radius-btn)',
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: 'var(--text-body)',
                textDecoration: 'none',
              }}
            >
              Read the FAQs first →
            </Link>
          </div>

          <div style={{
            background: '#f8fafc',
            border: '1px solid var(--color-border-light)',
            borderRadius: '1rem',
            padding: '2rem',
          }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              width: '3rem', height: '3rem',
              borderRadius: '0.75rem',
              background: 'rgba(217,119,6,0.08)',
              color: '#d97706',
              marginBottom: '1rem',
            }}>
              <AcademyIcon className="w-6 h-6" />
            </span>
            <h3 className="text-display-sm" style={{ color: '#181d26', marginBottom: '0.625rem' }}>
              Want to watch first?
            </h3>
            <p style={{ fontSize: 'var(--text-body)', color: 'var(--color-text-weak)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Every chapter has a matching Aurum University video. Some people prefer to watch the whole series end-to-end before doing anything.
            </p>
            <Link
              href="/university"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                background: '#d97706',
                color: '#ffffff',
                padding: '0.75rem 1.25rem',
                borderRadius: 'var(--radius-btn)',
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: 'var(--text-body)',
                textDecoration: 'none',
              }}
            >
              Open Aurum University →
            </Link>
          </div>
        </div>
      </SectionBox>

      {/* ── 5. CLOSING CTA ── */}
      <CTABand
        eyebrow="Done with all six chapters?"
        title={<>Welcome to the team.<br />Now turn it into income.</>}
        description="Your bot is trading. Confirm placement with your partner, then dive into the resources hub to learn the referral side."
        ctas={[
          { label: 'Open the Resources hub →', href: '/resources' },
          { label: 'Estimate your returns', href: '/calculator', variant: 'ghost' },
        ]}
      />

    </PageShell>
  )
}
