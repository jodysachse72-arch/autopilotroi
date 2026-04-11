// Sanity schema: Site Settings
export const siteSettings = {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    {
      name: 'announcementText',
      title: 'Announcement Banner Text',
      type: 'string',
      description: 'Leave empty to hide the banner',
    },
    {
      name: 'announcementCta',
      title: 'Announcement CTA Label',
      type: 'string',
    },
    {
      name: 'announcementCtaHref',
      title: 'Announcement CTA URL',
      type: 'url',
    },
    {
      name: 'footerTagline',
      title: 'Footer Tagline',
      type: 'string',
    },
    {
      name: 'copyrightText',
      title: 'Copyright Text',
      type: 'string',
    },
  ],
  preview: {
    select: { title: 'announcementText' },
    prepare() {
      return { title: 'Site Settings' }
    },
  },
}
