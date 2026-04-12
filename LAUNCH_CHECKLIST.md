# 🚀 AutopilotROI — Pre-Launch Checklist

> **Status:** In Progress  
> **Target Launch:** TBD  
> **Last Updated:** April 12, 2026

---

## 🔴 Critical — Must Complete Before Go-Live

### 1. Environment Variables (Vercel)
Go to **Vercel Dashboard → Project → Settings → Environment Variables** and set all of these:

| Variable | Where to Get It | Status |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase Dashboard → Settings → API | ✅ Set |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Same location | ✅ Set |
| `SUPABASE_SERVICE_ROLE_KEY` | Same location (never expose client-side) | ✅ Set |
| `RESEND_API_KEY` | [resend.com/api-keys](https://resend.com/api-keys) | ✅ Set |
| `NEXT_PUBLIC_SITE_URL` | Your production URL (e.g. `https://autopilotroi.com`) | ✅ Set |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | [dash.cloudflare.com → Turnstile](https://dash.cloudflare.com) | ⬜ Needed |
| `TURNSTILE_SECRET_KEY` | Same — server-side secret | ⬜ Needed |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Your domain (e.g. `autopilotroi.com`) | ✅ Set |
| `NEXT_PUBLIC_SENTRY_DSN` | [sentry.io → Project → Client Keys](https://sentry.io) | ⬜ Optional |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity dashboard | ✅ Set |
| `NEXT_PUBLIC_SANITY_DATASET` | Sanity dashboard | ✅ Set |
| `CRON_SECRET` | Generate a random string for cron auth | ⬜ Needed |

### 2. Database Migrations
Run these SQL scripts in **Supabase Dashboard → SQL Editor**:

- [ ] `supabase/migrations/001_leads_table.sql` — Creates the `leads` table
- [ ] `supabase/migrations/002_partners_table.sql` — Creates `partners` table + adds `last_seen_at` and `video_progress` to leads

### 3. Insert Your Partner Record
After running the migration, add yourself as the first partner:
```sql
INSERT INTO partners (name, email, referral_code)
VALUES ('Jody Sachse', 'your-email@domain.com', 'jody');
```
This maps `autopilotroi.com/signup?ref=jody` → your email for partner notifications.

### 4. Domain & DNS Configuration
- [ ] Point `autopilotroi.com` A/CNAME record to Vercel
- [ ] Verify domain in Vercel project settings
- [ ] Enable automatic HTTPS (Vercel does this by default)
- [ ] Add domain to Resend for custom `from` address
- [ ] Add domain to Plausible for analytics tracking
- [ ] Add domain to Cloudflare Turnstile allowed origins

### 5. Turnstile Bot Protection Setup
1. Go to [dash.cloudflare.com](https://dash.cloudflare.com) → **Turnstile**
2. Click **Add Site** → hostname: `autopilotroi.com`
3. Choose **Managed** challenge type
4. Copy **Site Key** → `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
5. Copy **Secret Key** → `TURNSTILE_SECRET_KEY`

### 6. Email Testing
- [ ] Submit a test lead at `/signup`
- [ ] Verify prospect welcome email arrives with unsubscribe link
- [ ] Verify partner notification email arrives (requires partner record)
- [ ] Check email renders correctly on Gmail, Outlook, Apple Mail
- [ ] Check emails on mobile
- [ ] Verify "Explore University" and "View in Dashboard" links work

---

## 🟡 Important — Should Complete Before Launch

### 7. Plausible Analytics
1. Create account at [plausible.io](https://plausible.io)
2. Add site: `autopilotroi.com`
3. Verify tracking fires (check dashboard for live visitors)
4. Set up goals: `signup_submitted`, `quiz_completed`, `video_watched`, `cta_clicked`

### 8. Sentry Error Monitoring
1. Create project at [sentry.io](https://sentry.io) (free: 5K events/mo)
2. Choose **Next.js** platform
3. Copy DSN → `NEXT_PUBLIC_SENTRY_DSN`
4. Deploy and trigger a test error to verify

### 9. Resend Domain Verification
1. Go to [resend.com/domains](https://resend.com/domains)
2. Add `autopilotroi.com`
3. Configure DNS records (SPF, DKIM, DMARC)
4. Update `RESEND_FROM_EMAIL=AutopilotROI <noreply@autopilotroi.com>`

### 10. Social Preview Testing
- [ ] Test OG image on [opengraph.xyz](https://opengraph.xyz)
- [ ] Share link in WhatsApp/Telegram — verify preview card
- [ ] Verify `/og-image.png` loads at production URL

### 11. Mobile Testing
- [ ] iPhone Safari (iOS 16+)
- [ ] Android Chrome
- [ ] Hamburger menu opens/closes
- [ ] Video modals on touch devices
- [ ] Signup form + Turnstile on mobile
- [ ] Products cards at 375px, 768px, 1024px

### 12. SEO Verification
- [ ] Visit `/sitemap.xml` — all public pages listed
- [ ] Visit `/robots.txt` — admin/API routes blocked
- [ ] Submit sitemap to Google Search Console
- [ ] Verify `<title>` and `<meta description>` on all pages
- [ ] Run Lighthouse SEO audit (target 90+)

### 13. PWA & Favicon Verification
- [ ] Visit `/manifest.webmanifest` — renders correctly
- [ ] Favicon shows in browser tab (SVG icon)
- [ ] Apple Touch icon works on iOS "Add to Home Screen"
- [ ] Android PWA install prompt appears

### 14. Loading States Verification
- [ ] Navigate to `/media` — skeleton shimmer shows before content
- [ ] Navigate to `/university` — skeleton shimmer shows
- [ ] Navigate to `/products` — product card skeletons show
- [ ] No blank white flash on any page transition

### 15. Email Compliance (CAN-SPAM)
- [ ] All outgoing emails include unsubscribe link ✅ (built in)
- [ ] All emails include `List-Unsubscribe` header ✅ (built in)
- [ ] Privacy Policy link in email footer ✅ (built in)
- [ ] Verify unsubscribe mailto link works
- [ ] Consider adding proper `/unsubscribe` page if volume grows

---

## 🟢 Post-Launch — First Week

### 16. Partner Dashboard
- [ ] Build partner login (Supabase Auth)
- [ ] Build `/dashboard/prospects` — partner's leads with scores
- [ ] Build referral link generator
- [ ] Add lead status tracking (assessed → contacted → active)

### 17. Drip Email Re-engagement
The cron endpoint is stubbed at `/api/cron/re-engage`. Wire up:
- [ ] 24 hours: "Your partner is reviewing your profile"
- [ ] 48 hours: "While you wait, here are 3 videos you haven't watched"
- [ ] 72 hours: "Reply to schedule a call with your partner"
- [ ] Set `CRON_SECRET` env var for auth
- [ ] Verify `vercel.json` cron deploys correctly

### 18. Content Management
- [ ] Connect University page to Sanity CMS
- [ ] Connect Blog to Sanity
- [ ] Set up Sanity webhook → ISR revalidation

### 19. Security Hardening
- [x] Content Security Policy headers in `next.config.ts` ✅ (built)
- [ ] Rate limit `/api/leads/assess` and `/api/notify`
- [ ] Supabase RLS for partner-scoped data access
- [ ] Enable Supabase audit logs
- [ ] Rotate any exposed credentials

### 20. Performance Optimization
- [ ] Lighthouse audit: all pages 90+ on Performance, A11y, SEO, Best Practices
- [ ] Next.js image optimization for product images
- [ ] CDN caching headers for static assets
- [ ] Check Vercel Edge deployment regions

### 21. Backup & Recovery
- [ ] Enable Supabase Point-in-Time Recovery (Pro plan)
- [ ] Or set up daily `pg_dump` export to S3/Cloudflare R2
- [ ] Test restore procedure at least once before launch
- [ ] Document recovery runbook

---

## 📋 Environment Variable Template

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production

# Resend Email
RESEND_API_KEY=
# RESEND_FROM_EMAIL=AutopilotROI <noreply@autopilotroi.com>

# Cloudflare Turnstile
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=

# Analytics & Monitoring
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=autopilotroi.com
NEXT_PUBLIC_SENTRY_DSN=

# Site
NEXT_PUBLIC_SITE_URL=https://autopilotroi.com

# Cron
CRON_SECRET=

# Support Widget
NEXT_PUBLIC_THRIVEDESK_WIDGET_ID=placeholder
```

---

## 🧪 End-to-End Test Procedure

1. **Open** `autopilotroi.com` — homepage loads, favicon shows, video plays
2. **Check** `/sitemap.xml` and `/robots.txt` — correct content
3. **Click** "Start Here" → `/signup` — skeleton loads then form
4. **Enter** name + email + Turnstile → submits successfully
5. **Complete** readiness quiz → `/orientation`
6. **Redirected** to `/waiting-room` — thumbnails load, progress tracks
7. **Check email** — prospect welcome with unsubscribe link ✅
8. **Check partner email** — notification with score ✅
9. **Return** to `/signup` — auto-redirects to `/waiting-room`
10. **Try** `/signup?ref=jody` — referral preserved
11. **Visit** all pages — products, summary, university, media, resources, faqs
12. **Check** `/terms`, `/privacy`, `/disclaimer` — all render with footer links
13. **Test** mobile at 375px — hamburger menu, cards stack, forms work
14. **Share** homepage link on social — OG card shows correctly
15. **Right-click** browser tab — favicon is visible
16. **Trigger** `/api/cron/re-engage` manually — returns count of stale leads
