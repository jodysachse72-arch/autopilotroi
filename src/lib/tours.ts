import type { TourStep } from '@/components/ui/GuidedTour'

/* ═══════════════════════════════════════════════════════════════
   TOUR CONFIGURATIONS
   Extracted from layouts so they can be reused, lazy-loaded,
   and edited without touching layout files.
   ═══════════════════════════════════════════════════════════════ */

export const ADMIN_TOUR: TourStep[] = [
  { target: null, title: 'Welcome to Admin Panel', content: 'This is the nerve center of AutopilotROI. From here you control every feature, manage partners, track prospects, and monitor system health.', icon: '🛡️', position: 'center' },
  { target: '#admin-dashboard',  title: 'Admin Dashboard',      content: 'High-level overview — total signups, active partners, conversion rates, and system health.', icon: '📊', position: 'right', actionHint: 'Start your day here' },
  { target: '#admin-partners',   title: 'Partner Management',   content: 'Add, edit, activate, or deactivate partners. Each gets a unique referral code.', icon: '🤝', position: 'right', actionHint: 'Onboard new team leaders here' },
  { target: '#admin-prospects',  title: 'Prospect Pipeline',    content: 'Every person who enters the funnel with readiness score and tier (🌱 Guided, ⚡ Ready, 🚀 Advanced).', icon: '👥', position: 'right' },
  { target: '#admin-features',   title: 'Feature Flags',        content: 'Turn any feature ON or OFF instantly — no code deploy needed. Each flag has a tooltip explaining its purpose.', icon: '🎛️', position: 'right', actionHint: 'Every toggle takes effect immediately across the site' },
  { target: '#admin-strategy',   title: 'Strategy Roadmap',     content: 'See the competitive analysis, cost breakdown, and full phase roadmap.', icon: '🗺️', position: 'right' },
  { target: '#admin-changelog',  title: 'Changelog',            content: 'A living document of every feature, fix, and improvement shipped — organized by date.', icon: '📝', position: 'right', actionHint: 'Share this with stakeholders to show progress' },
  { target: '#admin-checklist',  title: 'Launch Checklist',     content: 'Pre-launch readiness checklist. Go through each item before going live.', icon: '✅', position: 'right' },
  { target: '#admin-guide',      title: 'Platform Guide',       content: 'Interactive documentation for non-technical users. Share with team members who need to understand the platform.', icon: '📖', position: 'right' },
  { target: '#admin-cms',        title: 'Content Editor',       content: 'Edit all website content — headlines, blog posts, FAQs, and videos. Changes are instant.', icon: '✏️', position: 'right' },
  { target: null, title: 'You\'re in Control', content: 'That\'s the full admin tour.\n\n• Feature Flags = instant ON/OFF\n• Checklist = miss nothing\n• Guide = share with the team\n\nYou can replay this tour anytime. 🎯', icon: '🏆', position: 'center' },
]

export const PARTNER_TOUR: TourStep[] = [
  {
    target: null,
    title: 'Welcome to Partner Hub',
    content: 'This is your command center for tracking referrals, monitoring performance, and growing your team.\n\nLet\'s take a quick look around — it\'ll take less than 60 seconds.',
    icon: '🚀',
    position: 'center',
  },
  { target: '#nav-overview',    title: 'Dashboard Overview',    content: 'Your home base. See total prospects, conversion rates, and recent activity at a glance.', icon: '📊', position: 'right', actionHint: 'Start your day here' },
  { target: '#nav-prospects',   title: 'Your Prospects',        content: 'Everyone who signed up through your referral link appears here with readiness score and onboarding status.', icon: '👥', position: 'right', actionHint: 'Follow up with high-score prospects' },
  { target: '#nav-performance', title: 'Performance Analytics', content: 'Deep-dive into your referral performance — click-through rates, conversion funnels, and top content.', icon: '📈', position: 'right' },
  { target: '#nav-leaderboard', title: 'Team Leaderboard',      content: 'See how you rank among other partners. Top performers earn bonus rewards.', icon: '🏆', position: 'right', actionHint: 'Gamification drives healthy competition' },
  { target: '#nav-links',       title: 'Your Referral Links',   content: 'Generate Hot, Cold, and page-specific referral links. Each is tracked — share on social or direct message.', icon: '🔗', position: 'right', actionHint: 'Use Cold links for outreach, Hot links for ready prospects' },
  { target: '#nav-videos',      title: 'Partner Videos',        content: 'Training videos covering sales techniques, product knowledge, and social media strategy.', icon: '🎬', position: 'right' },
  { target: '#nav-resources',   title: 'Gated Resources',       content: 'Access marketing materials, downloadable guides, and partner-exclusive content.', icon: '📚', position: 'right' },
  { target: '#nav-settings',    title: 'Profile Settings',      content: 'Update your profile, social links, notification preferences, and security settings.', icon: '⚙️', position: 'right' },
  { target: '#partner-badge',   title: 'Your Role Badge',       content: 'This badge shows your current role and access level. As you grow, you\'ll unlock more features.', icon: '🏅', position: 'bottom' },
  { target: null, title: 'You\'re All Set!', content: 'That\'s the full tour. You can replay this anytime from the dashboard header.\n\nNow go share your referral link and start building! 💪', icon: '🎯', position: 'center' },
]
