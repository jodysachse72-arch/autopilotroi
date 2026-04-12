// Sanity schema: Aurum University Videos
export const universityVideo = {
  name: 'universityVideo',
  title: 'University Video',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Video Title',
      type: 'string',
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: 'youtubeId',
      title: 'YouTube Video ID',
      type: 'string',
      description: 'The ID from the YouTube URL (e.g. "dQw4w9WgXcQ" from youtube.com/watch?v=dQw4w9WgXcQ)',
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Beginner', value: 'beginner' },
          { title: 'Product Info', value: 'product' },
          { title: 'Due Diligence', value: 'due-diligence' },
          { title: 'Partner Program', value: 'partner' },
          { title: 'Advanced', value: 'advanced' },
          { title: 'Onboarding', value: 'onboarding' },
        ],
        layout: 'dropdown',
      },
    },
    {
      name: 'duration',
      title: 'Duration',
      type: 'string',
      description: 'e.g. "12:34"',
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower number appears first',
    },
    {
      name: 'featured',
      title: 'Featured Video',
      type: 'boolean',
      description: 'Show as a recommended/pinned video',
      initialValue: false,
    },
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'featured',
    },
    prepare(selection: Record<string, unknown>) {
      const title = selection.title as string
      const subtitle = selection.subtitle as string
      const media = selection.media as boolean
      return {
        title: `${media ? '⭐ ' : ''}${title}`,
        subtitle: subtitle || 'Uncategorized',
      }
    },
  },
}
