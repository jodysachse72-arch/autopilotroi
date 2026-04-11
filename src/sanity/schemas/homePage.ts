// Sanity schema: Homepage content
export const homePage = {
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    {
      name: 'heroHeadline',
      title: 'Hero Headline',
      type: 'string',
      description: 'Main headline on the homepage hero section',
    },
    {
      name: 'heroSubheadline',
      title: 'Hero Subheadline',
      type: 'text',
      rows: 3,
    },
    {
      name: 'heroVideoUrl',
      title: 'Hero Video URL',
      type: 'url',
      description: 'YouTube URL for the overview video (e.g. https://youtube.com/watch?v=...)',
    },
    {
      name: 'heroPrimaryCta',
      title: 'Primary CTA Label',
      type: 'string',
    },
    {
      name: 'heroSecondaryCta',
      title: 'Secondary CTA Label',
      type: 'string',
    },
    {
      name: 'investorPathTitle',
      title: 'Investor Path Title',
      type: 'string',
    },
    {
      name: 'investorPathDescription',
      title: 'Investor Path Description',
      type: 'text',
      rows: 3,
    },
    {
      name: 'partnerPathTitle',
      title: 'Partner Path Title',
      type: 'string',
    },
    {
      name: 'partnerPathDescription',
      title: 'Partner Path Description',
      type: 'text',
      rows: 3,
    },
    {
      name: 'statsBar',
      title: 'Stats Bar Numbers',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'value', title: 'Value', type: 'string' },
            { name: 'label', title: 'Label', type: 'string' },
          ],
        },
      ],
    },
    {
      name: 'finalCtaHeadline',
      title: 'Final CTA Headline',
      type: 'string',
    },
    {
      name: 'finalCtaDescription',
      title: 'Final CTA Description',
      type: 'text',
      rows: 2,
    },
  ],
}
