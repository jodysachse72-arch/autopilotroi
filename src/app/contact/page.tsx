import contactData from '../../../content/pages/contact.json'
import ContactPageClient from './ContactPageClient'

export const metadata = {
  title: 'Contact | AutopilotROI',
  description: 'Reach out to the AutopilotROI team with questions about Aurum, the partner program, or onboarding.',
}

export default function ContactPage() {
  return <ContactPageClient data={contactData} />
}
