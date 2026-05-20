# AutopilotROI — Technical Documentation

> **For developers and technical team members who need to understand the codebase.**
> Non-technical admins: use the in-app Admin Guide at `/admin/guide` instead.

---

## Architecture Overview

```
┌──────────────────────────────────────────┐
│              VERCEL (Hosting)             │
├──────────────────────────────────────────┤
│  Next.js 15 (App Router)                 │
│  ├── /app           → Pages & API routes │
│  ├── /components    → Reusable UI        │
│  └── /lib           → Business logic     │
├──────────────────────────────────────────┤
│  Supabase (Auth + Database)              │
│  Resend (Email)                          │
│  Cloudflare Turnstile (Bot Protection)   │
│  Plausible (Analytics)                   │
│  Sentry (Error Monitoring)               │
└──────────────────────────────────────────┘
```

## Project Structure

```
src/
├── app/
│   ├── page.tsx                    # Homepage
│   ├── layout.tsx                  # Root layout (fonts, providers, analytics)
│   ├── not-found.tsx               # Custom 404 page
│   ├── signup/                     # Lead capture + readiness quiz
│   ├── onboarding/                 # Tier-specific guided setup
│   ├── waiting-room/               # Post-assessment holding + education
│   ├── dashboard/                  # Partner Hub
│   │   ├── page.tsx                # Overview with pipeline funnel
│   │   ├── prospects/              # Lead list with filters
│   │   ├── performance/            # Analytics & milestones
│   │   ├── leaderboard/            # Gamified partner rankings
│   │   └── links/                  # Referral link generator + QR
│   ├── admin/                      # Admin Panel
│   │   ├── page.tsx                # Dashboard overview
│   │   ├── partners/               # Partner CRUD
│   │   ├── prospects/              # All leads management
│   │   ├── roadmap/                # Strategy & phase planning
│   │   ├── changelog/              # Feature changelog
│   │   ├── checklist/              # Launch readiness tracker
│   │   ├── features/               # Feature toggle panel
│   │   └── guide/                  # Non-tech admin guide
│   └── api/
│       ├── leads/                  # Lead creation + assessment
│       ├── notify/                 # Partner notification emails
│       ├── cron/re-engage/         # Daily drip email cron
│       ├── dashboard/leads/        # Partner dashboard data
│       └── admin/partners/         # Partner management API
├── components/
│   ├── layout/                     # Navbar, Footer, AnnouncementBanner
│   ├── sections/                   # Homepage sections, SocialProof, PersonalizedPath
│   └── ui/                         # Buttons, modals, VideoModal, SmartFaqBot, etc.
└── lib/
    ├── feature-flags.tsx           # Feature toggle system (React Context)
    ├── analytics.ts                # Plausible event tracking
    ├── email.ts                    # Resend email templates
    ├── drip-emails.ts              # 7-day drip sequence
    ├── partners.ts                 # Supabase partner operations
    ├── rate-limit.ts               # In-memory rate limiter
    └── experiments.ts              # A/B testing utility
```

## Feature Flag System

### How It Works
- **React Context** wraps the entire app via `FeatureFlagProvider` in `layout.tsx`
- **localStorage** persists flag state (survives page reloads)
- Every flag has rich metadata: label, description, why, whenToUse, risk level, phase

### Adding a New Feature Flag
1. Add the property to `FeatureFlags` interface in `src/lib/feature-flags.tsx`
2. Add a default value in `DEFAULT_FLAGS`
3. Add metadata in `FEATURE_META` (label, description, why, whenToUse, category, phase, risk)
4. Wrap the component with `{isEnabled('flagName') && <Component />}`

### Using Flags in Components
```tsx
import { useFeatureFlags } from '@/lib/feature-flags'

function MyComponent() {
  const { isEnabled } = useFeatureFlags()
  
  if (!isEnabled('myFeature')) return null
  return <div>Feature content</div>
}
```

## Email System

### Templates
- **Welcome email** (`src/lib/email.ts`) — Sent when a lead completes assessment
- **Partner notification** (`src/lib/email.ts`) — Sent to the assigned partner
- **Drip sequence** (`src/lib/drip-emails.ts`) — 5 emails over 7 days

### Drip Email Schedule
| Day | Template | Subject | Strategy |
|-----|----------|---------|----------|
| 1 | `day1` | "Your partner is reviewing your profile" | Welcome + score |
| 2 | `day2` | "3 videos to get you started" | Education |
| 3 | `day3` | "Quick question for you" | Engagement |
| 5 | `day5` | "Others are already seeing results" | Social proof |
| 7 | `day7` | "Last call: your spot is being reassigned" | Urgency |

### Cron Job
- Endpoint: `/api/cron/re-engage`
- Schedule: Daily at 9am UTC
- Vercel config: `vercel.json` → `crons`
- Protected by `CRON_SECRET` bearer token

## Database Schema (Supabase)

### `leads` table
| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| name | text | Lead's full name |
| email | text | Lead's email (unique) |
| phone | text | Optional phone number |
| score | integer | Readiness score (0-100) |
| tier | text | beginner/intermediate/advanced |
| referred_by | text | Partner's referral code |
| onboarding_status | text | new/assessed/invited/onboarding/active |
| drip_emails_sent | jsonb | Array of template keys already sent |
| last_seen_at | timestamptz | Last activity timestamp |
| created_at | timestamptz | Signup timestamp |

### `partners` table
| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| name | text | Partner name |
| email | text | Partner email |
| referral_code | text | Unique code (e.g., "jody") |
| phone | text | Optional phone |
| telegram | text | Optional Telegram handle |
| is_active | boolean | Active/deactivated status |
| notification_preferences | jsonb | Email/Telegram notification prefs |

## Environment Variables

### Required for Production
```env
NEXT_PUBLIC_SUPABASE_URL=         # Supabase project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=    # Supabase anonymous key
SUPABASE_SERVICE_ROLE_KEY=         # Supabase service role key (server only)
RESEND_API_KEY=                    # Resend email API key
RESEND_FROM_EMAIL=                 # Verified sender email
NEXT_PUBLIC_SITE_URL=              # Production URL (https://autopilotroi.com)
```

### Optional
```env
NEXT_PUBLIC_TURNSTILE_SITE_KEY=    # Cloudflare Turnstile (bot protection)
TURNSTILE_SECRET_KEY=              # Cloudflare Turnstile server key
CRON_SECRET=                       # Bearer token for cron endpoints
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=      # Plausible analytics domain
NEXT_PUBLIC_SENTRY_DSN=            # Sentry error monitoring DSN
NEXT_PUBLIC_THRIVEDESK_WIDGET_ID=  # ThriveDesk chat widget ID
```

## Build & Deploy

### Local Development
```bash
npm install
npm run dev          # Start dev server on :3000
```

### Production Build
```bash
npm run build        # TypeScript check + static generation
npm start            # Serve production build locally
```

### Deployment (Vercel)
- Push to `main` branch → auto-deploys
- Environment variables configured in Vercel dashboard
- Cron jobs configured via `vercel.json`

## Security Headers

Configured in `next.config.ts`:
- **Content-Security-Policy** — Whitelists YouTube, Cloudflare, Plausible, Sentry, Supabase
- **Strict-Transport-Security** (HSTS) — Forces HTTPS
- **X-Frame-Options: DENY** — Prevents clickjacking
- **X-Content-Type-Options: nosniff** — Prevents MIME sniffing
- **Permissions-Policy** — Restricts camera, mic, geolocation

## Phases

| Phase | Status | Focus |
|-------|--------|-------|
| Phase 1: LAUNCH | ✅ Complete | Core funnel, auth, email, security |
| Phase 2: GROWTH | ✅ Complete | Social proof, drip emails, partner tools, admin ecosystem |
| Phase 3: SCALE | 🔄 In Progress | Leaderboards, FAQ bot, documentation, SMS/push stubs |
| Phase 4: INTELLIGENCE | 📋 Planned | AI chatbot (LLM), predictive scoring, cohort analytics |
| Phase 5: ENTERPRISE | 📋 Planned | Multi-org support, white-label, API marketplace |
