import ContactPageClient from './ContactPageClient'

export const metadata = {
  title: 'Contact | AutopilotROI',
  description: 'Reach out to the AutopilotROI team with questions about Aurum, the partner program, or onboarding.',
}

const DEFAULT_CONTACT_DATA = {
  headline: 'Get in Touch',
  subheadline: 'Have questions about Aurum, the partner program, or onboarding? We\'re here to help.',
  email: 'support@autopilotroi.com',
  telegram: '@AutopilotROI',
  responseNote: 'Email: 24–48 hours · Telegram: typically within a few hours during business days.',
}

export default function ContactPage() {
  return <ContactPageClient data={DEFAULT_CONTACT_DATA} />
}
