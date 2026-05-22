# ThriveDesk Integration

## Overview

AutoPilotROI uses ThriveDesk as its customer support and contact management system. The integration sends signup and orientation data to ThriveDesk so that partners and support staff can follow up with new leads.

## Architecture

```
Signup Form (/signup)
    ↓ (name, email, ref code)
Orientation Quiz (/orientation)
    ↓ (readiness tier, score)
    ↓
src/lib/integrations/thrivedesk.ts
    ↓ (normalized payload)
ThriveDesk API (v2)
    → Creates/updates contact
    → Optionally opens a conversation
```

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `THRIVEDESK_API_KEY` | Yes | API key for server-side ThriveDesk API calls. Obtain from ThriveDesk Settings → API. |
| `THRIVEDESK_INBOX_ID` | No | Inbox ID for auto-creating conversations. If omitted, only contacts are created. |
| `THRIVEDESK_API_URL` | No | Custom API base URL. Defaults to `https://api.thrivedesk.com/v2`. |
| `NEXT_PUBLIC_THRIVEDESK_WIDGET_ID` | No | Widget ID for the embedded ThriveDesk chat widget (already configured in `layout.tsx`). |

## Setup Instructions

1. **Get API Key**: Log in to ThriveDesk → Settings → API → Generate new key
2. **Add to `.env.local`**:
   ```
   THRIVEDESK_API_KEY=your_api_key_here
   THRIVEDESK_INBOX_ID=your_inbox_id_here
   ```
3. **For Vercel**: Add the same variables in Project Settings → Environment Variables

## Usage

```typescript
import { submitToThriveDesk } from '@/lib/integrations/thrivedesk'

const result = await submitToThriveDesk({
  name: 'John Doe',
  email: 'john@example.com',
  referralCode: 'ABC123',
  readinessTier: 'intermediate',
  readinessScore: 72,
})

if (result.success) {
  console.log('Contact created:', result.contactId)
} else {
  console.warn('ThriveDesk submission failed:', result.error)
}
```

## Fail-Safe Behavior

- If `THRIVEDESK_API_KEY` is not set, the adapter logs a warning and returns `{ success: false }` without throwing
- If the API call fails, the error is logged and a safe result is returned
- The adapter never blocks the user's signup or orientation flow
- All errors are logged with `[ThriveDesk]` prefix for easy filtering

## Custom Fields

The adapter sends the following custom fields to ThriveDesk contacts:

| Field | Description |
|-------|-------------|
| `referral_code` | The partner referral code used during signup |
| `readiness_tier` | Result of orientation quiz: `beginner`, `intermediate`, or `advanced` |
| `readiness_score` | Numeric readiness score (0-100) |
| `source` | Always `autopilotroi-onboarding` |

## Widget Integration

The ThriveDesk chat widget is already embedded in `src/app/layout.tsx`. It loads when `NEXT_PUBLIC_THRIVEDESK_WIDGET_ID` is set and not equal to `'placeholder'`.
