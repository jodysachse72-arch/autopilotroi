// Sanity schema: Resources
export const resource = {
  name: 'resource',
  title: 'Resource',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Intro Presentations', value: 'intro' },
          { title: 'Product Information', value: 'product' },
          { title: 'Interviews & Q&A', value: 'interviews' },
          { title: 'Due Diligence', value: 'due-diligence' },
          { title: 'Partner Training', value: 'partner' },
          { title: 'Onboarding Tutorials', value: 'onboarding' },
        ],
        layout: 'dropdown',
      },
    },
    {
      name: 'type',
      title: 'Resource Type',
      type: 'string',
      options: {
        list: [
          { title: 'Video', value: 'video' },
          { title: 'PDF', value: 'pdf' },
          { title: 'Article', value: 'article' },
          { title: 'Link', value: 'link' },
        ],
      },
    },
    {
      name: 'url',
      title: 'URL',
      type: 'url',
    },
    {
      name: 'duration',
      title: 'Duration',
      type: 'string',
      description: 'e.g. "12 min" or "45 pages"',
    },
    {
      name: 'source',
      title: 'Source',
      type: 'string',
    },
    {
      name: 'badge',
      title: 'Badge',
      type: 'string',
      options: {
        list: [
          { title: 'New', value: 'New' },
          { title: 'Must Read', value: 'Must Read' },
          { title: 'Featured', value: 'Featured' },
          { title: 'None', value: '' },
        ],
      },
    },
    {
      name: 'note',
      title: 'Note',
      type: 'string',
      description: 'e.g. "Requires login"',
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
    },
  },
}
