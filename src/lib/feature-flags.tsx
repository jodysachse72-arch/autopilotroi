'use client'

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'

/* ═══════════════════════════════════════════════════════════════
   FEATURE FLAGS — Toggle features on/off from admin panel
   Persisted to localStorage, checked globally via React Context.

   HOW IT WORKS:
   Every feature has a toggle switch in /admin/features.
   When you flip a switch, the feature turns on or off instantly
   across the entire site — no deploy needed.

   For non-technical admins:
   Think of each toggle like a light switch for a feature.
   - ON (green) = the feature is live and visitors can see/use it
   - OFF (gray) = the feature is hidden, like it doesn't exist
   ═══════════════════════════════════════════════════════════════ */

export interface FeatureFlags {
  // Conversion features
  exitIntentPopup: boolean
  socialProof: boolean
  personalizedPaths: boolean
  trustCheck: boolean

  // Marketing features
  announcementBanner: boolean
  dripEmails: boolean

  // Support features
  liveChatWidget: boolean
  smartFaq: boolean

  // Analytics features
  videoTracking: boolean
  abTesting: boolean

  // Partner features
  partnerLeaderboard: boolean
  partnerSelfRegistration: boolean
  partnerPerformance: boolean

  // Communication features
  smsNotifications: boolean
  pushNotifications: boolean

  // System features
  maintenanceMode: boolean
  pwaInstallPrompt: boolean
}

const DEFAULT_FLAGS: FeatureFlags = {
  exitIntentPopup: true,
  socialProof: true,
  personalizedPaths: true,
  trustCheck: true,
  announcementBanner: true,
  dripEmails: true,
  liveChatWidget: true,
  smartFaq: true,
  videoTracking: true,
  abTesting: false,
  partnerLeaderboard: true,
  partnerSelfRegistration: false,
  partnerPerformance: true,
  smsNotifications: false,
  pushNotifications: false,
  maintenanceMode: false,
  pwaInstallPrompt: true,
}

export interface FeatureMeta {
  label: string
  description: string
  why: string
  whenToUse: string
  category: string
  phase: string
  risk: 'none' | 'low' | 'medium' | 'high'
}

export const FEATURE_META: Record<keyof FeatureFlags, FeatureMeta> = {
  exitIntentPopup: {
    label: 'Exit-Intent Popup',
    description: 'Shows an email capture popup when a visitor moves their mouse toward the browser close/back button (desktop) or after 45 seconds of inactivity (mobile).',
    why: 'Captures leads who would otherwise leave forever. Industry average: recovers 3-5% of abandoning visitors as email leads.',
    whenToUse: 'Keep ON once you have real traffic. Turn OFF if you\'re getting complaints about it being annoying, or during a live demo.',
    category: 'Conversion',
    phase: 'Phase 2',
    risk: 'low',
  },
  socialProof: {
    label: 'Social Proof Section',
    description: 'Shows rotating testimonials, a live activity ticker ("Someone from Texas just completed..."), star ratings, and trust badges (2,400+ members, 94% completion rate) on the homepage.',
    why: 'People trust what other people trust. Social proof increases conversion rates by 15-30% on average. The activity ticker creates urgency without being pushy.',
    whenToUse: 'Keep ON always. Only turn OFF if testimonials become outdated or you need to update them.',
    category: 'Conversion',
    phase: 'Phase 2',
    risk: 'none',
  },
  personalizedPaths: {
    label: 'Personalized Onboarding Paths',
    description: 'After taking the readiness quiz, users see a recommended step-by-step path customized to their experience level (Beginner, Intermediate, or Advanced). Beginners see hand-holding guides; Advanced users skip straight to strategy.',
    why: 'A one-size-fits-all onboarding loses both beginners (too overwhelming) and experts (too basic). Personalization increases completion rates by 40%+.',
    whenToUse: 'Keep ON always. This is core functionality.',
    category: 'Conversion',
    phase: 'Phase 2',
    risk: 'none',
  },
  trustCheck: {
    label: 'Trust Check Tool',
    description: 'A free, interactive 5-question quiz at /evaluate that lets visitors evaluate ANY crypto/income opportunity using the same framework AutopilotROI used to evaluate Aurum Foundation. Produces a 0-50 Trust Score with breakdown and pattern detection.',
    why: 'Builds massive trust by showing transparency. People searching "is [X] a scam" find this tool, use it, and see that Aurum scores well because it has real products. Best top-of-funnel lead magnet in the space.',
    whenToUse: 'Keep ON always. This is your strongest trust-building tool. The only reason to turn it off would be during a major redesign of the scoring logic.',
    category: 'Conversion',
    phase: 'Phase 3',
    risk: 'none',
  },
  announcementBanner: {
    label: 'Announcement Banner',
    description: 'A thin banner at the very top of every page. Use it for time-sensitive messages like "Scheduled maintenance tonight 9pm-11pm" or "New feature: Check out our Partner Tools!"',
    why: 'Global announcements that every visitor sees. Better than email for urgent, site-wide messages.',
    whenToUse: 'Turn ON when you have something to announce. Turn OFF when the announcement is stale — a permanent banner trains visitors to ignore it.',
    category: 'Marketing',
    phase: 'Phase 1',
    risk: 'none',
  },
  dripEmails: {
    label: 'Drip Email Sequence',
    description: 'Automatically sends a series of 5 emails over 7 days to leads who completed their assessment but haven\'t connected with their partner yet. Day 1: welcome. Day 2: education. Day 3: check-in. Day 5: social proof. Day 7: urgency.',
    why: 'Most leads don\'t convert on the first visit. Drip emails keep you top-of-mind and nudge them back. Average ROI of drip campaigns: $36 for every $1 spent.',
    whenToUse: 'Keep ON once email is configured (Resend API key). Turn OFF if you\'re getting spam complaints or deliverability issues.',
    category: 'Marketing',
    phase: 'Phase 2',
    risk: 'low',
  },
  liveChatWidget: {
    label: 'Live Chat Widget',
    description: 'A chat bubble in the bottom-right corner of the site powered by ThriveDesk. Visitors can ask questions and get routed to support.',
    why: 'Reduces friction for visitors who have questions but don\'t want to email. Chat-based support converts 3x better than email-only.',
    whenToUse: 'Turn ON only when someone is available to respond. A chat widget with no one answering is worse than no widget at all.',
    category: 'Support',
    phase: 'Phase 1',
    risk: 'low',
  },
  smartFaq: {
    label: 'Smart FAQ Bot',
    description: 'An AI-powered FAQ assistant that answers common questions instantly without needing a human. Handles "How much do I need to start?", "Is this safe?", "How do trading bots work?" and similar questions.',
    why: 'Answers 80% of visitor questions instantly, 24/7. Reduces partner workload and prevents leads from leaving because they couldn\'t find answers.',
    whenToUse: 'Keep ON always. This works without any API costs — it uses a local knowledge base, not ChatGPT.',
    category: 'Support',
    phase: 'Phase 3',
    risk: 'none',
  },
  videoTracking: {
    label: 'Video Milestone Tracking',
    description: 'Tracks how much of each YouTube video a visitor watches (25%, 50%, 75%, 100% milestones). Data appears in your Plausible analytics dashboard.',
    why: 'Know which videos engage people and which they skip. If 80% of viewers drop off at 25%, the video needs fixing. If they all finish, it\'s working.',
    whenToUse: 'Keep ON always. It runs silently with zero impact on performance.',
    category: 'Analytics',
    phase: 'Phase 1',
    risk: 'none',
  },
  abTesting: {
    label: 'A/B Testing',
    description: 'Randomly shows different versions of button text, headlines, or CTAs to different visitors, then tracks which version gets more clicks. Example: "Get Started Free" vs "Take the Quiz →"',
    why: 'Small copy changes can improve conversion by 10-30%. But you need enough traffic (500+ visitors/week) for results to be meaningful.',
    whenToUse: 'Turn ON once you have consistent weekly traffic. OFF during launch — you want a stable experience first.',
    category: 'Analytics',
    phase: 'Phase 1',
    risk: 'low',
  },
  partnerLeaderboard: {
    label: 'Partner Leaderboard',
    description: 'Shows a ranked list of top-performing partners with badges and milestones. Partners can see their rank and what they need to reach the next level.',
    why: 'Gamification drives competitive behavior. Top partners will push harder to stay on top, and newer partners will work to climb the ranks.',
    whenToUse: 'Turn ON once you have 5+ active partners. With fewer, it feels empty. Turn OFF if partners complain about public ranking.',
    category: 'Partner',
    phase: 'Phase 3',
    risk: 'low',
  },
  partnerSelfRegistration: {
    label: 'Partner Self-Registration',
    description: 'Allows new partners to sign up on their own through a public form at /join, instead of requiring manual admin setup. Includes referral code generation and email verification.',
    why: 'Removes the bottleneck of manual partner onboarding. Scales from 5 partners to 500 without extra admin work.',
    whenToUse: 'Turn OFF during early launch — you want to vet partners manually first. Turn ON once your partner program is proven and you want to scale.',
    category: 'Partner',
    phase: 'Phase 3',
    risk: 'medium',
  },
  partnerPerformance: {
    label: 'Partner Performance Dashboard',
    description: 'Analytics page inside the Partner Hub showing weekly lead charts, top referral sources, conversion metrics, and gamified milestones.',
    why: 'Partners who can see their impact stay motivated. Partners who can\'t see results assume nothing is working and disengage.',
    whenToUse: 'Keep ON always. Transparency builds trust with your partner network.',
    category: 'Partner',
    phase: 'Phase 2',
    risk: 'none',
  },
  smsNotifications: {
    label: 'SMS Notifications (Twilio)',
    description: 'Send text message notifications to partners when they get a new lead, and to prospects as reminders. Requires a Twilio account ($20+/month + per-message costs).',
    why: 'SMS open rates are 98% vs 20% for email. But it costs real money per message and requires phone number collection + opt-in compliance.',
    whenToUse: 'Turn ON only after you have 50+ active leads AND a Twilio account configured. Before that, email is sufficient and free.',
    category: 'Communication',
    phase: 'Phase 3',
    risk: 'medium',
  },
  pushNotifications: {
    label: 'Push Notifications (PWA)',
    description: 'Browser push notifications for returning visitors. Can remind them to complete onboarding or alert partners to new leads.',
    why: 'Free to send (unlike SMS) and more immediate than email. But opt-in rates are only ~5%, so don\'t rely on it as your primary channel.',
    whenToUse: 'Turn ON as an experiment once you have 100+ monthly visitors. Keep OFF until then — the permission prompt can annoy early visitors.',
    category: 'Communication',
    phase: 'Phase 3',
    risk: 'low',
  },
  maintenanceMode: {
    label: '🚧 Maintenance Mode',
    description: 'Shows a "We\'re Upgrading" page to ALL visitors except admins. The entire site becomes inaccessible. Admin panel (/admin/*) still works.',
    why: 'Use during database migrations, major updates, or when something is broken and you need time to fix it.',
    whenToUse: 'Turn ON only when absolutely necessary. Every minute of maintenance mode = lost visitors and leads. Turn OFF as soon as the work is done.',
    category: 'System',
    phase: 'Phase 1',
    risk: 'high',
  },
  pwaInstallPrompt: {
    label: '📱 PWA Install Prompt',
    description: 'Shows an "Add to Home Screen" prompt so users can install AutopilotROI as an app on their phone or desktop.',
    why: 'PWA (Progressive Web App) lets users bookmark the site as a native-feeling app with offline support and faster loading. Great for engagement.',
    whenToUse: 'Turn ON when the platform is stable and you want users to install it as an app. Turn OFF during development or if the install prompt gets annoying.',
    category: 'System',
    phase: 'Phase 2',
    risk: 'none',
  },
}

const STORAGE_KEY = 'autopilotroi-feature-flags'

interface FeatureFlagContextType {
  flags: FeatureFlags
  setFlag: (key: keyof FeatureFlags, value: boolean) => void
  isEnabled: (key: keyof FeatureFlags) => boolean
}

const FeatureFlagContext = createContext<FeatureFlagContextType>({
  flags: DEFAULT_FLAGS,
  setFlag: () => {},
  isEnabled: () => false,
})

export function FeatureFlagProvider({ children }: { children: ReactNode }) {
  const [flags, setFlags] = useState<FeatureFlags>(DEFAULT_FLAGS)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        setFlags({ ...DEFAULT_FLAGS, ...parsed })
      }
    } catch { /* use defaults */ }
    setLoaded(true)
  }, [])

  const setFlag = useCallback((key: keyof FeatureFlags, value: boolean) => {
    setFlags((prev) => {
      const next = { ...prev, [key]: value }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      return next
    })
  }, [])

  const isEnabled = useCallback((key: keyof FeatureFlags) => {
    return flags[key]
  }, [flags])

  if (!loaded) return null

  return (
    <FeatureFlagContext.Provider value={{ flags, setFlag, isEnabled }}>
      {children}
    </FeatureFlagContext.Provider>
  )
}

export function useFeatureFlags() {
  return useContext(FeatureFlagContext)
}
