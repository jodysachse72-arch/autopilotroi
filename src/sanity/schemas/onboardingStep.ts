// Sanity schema: Onboarding Steps
export const onboardingStep = {
  name: 'onboardingStep',
  title: 'Onboarding Step',
  type: 'document',
  fields: [
    {
      name: 'stepNumber',
      title: 'Step Number',
      type: 'number',
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: 'title',
      title: 'Step Title',
      type: 'string',
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: 'subtitle',
      title: 'Short Description',
      type: 'string',
    },
    {
      name: 'videoUrl',
      title: 'Embedded Video URL',
      type: 'url',
      description: 'YouTube or Vimeo URL for this step',
    },
    {
      name: 'videoLabel',
      title: 'Video Label',
      type: 'string',
    },
    {
      name: 'warningText',
      title: 'Warning Box Text',
      type: 'text',
      rows: 2,
      description: 'Shown in yellow warning box if set',
    },
    {
      name: 'whyText',
      title: '"Why?" Info Box Text',
      type: 'text',
      rows: 2,
      description: 'Shown in blue info box if set',
    },
    {
      name: 'instructions',
      title: 'Step Instructions',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'text',
              title: 'Instruction Text',
              type: 'string',
            },
            {
              name: 'warning',
              title: 'Warning (optional)',
              type: 'string',
            },
            {
              name: 'tip',
              title: 'Tip (optional)',
              type: 'string',
            },
          ],
          preview: {
            select: { title: 'text' },
          },
        },
      ],
    },
    {
      name: 'externalLink',
      title: 'External Link',
      type: 'object',
      fields: [
        { name: 'label', title: 'Link Label', type: 'string' },
        { name: 'url', title: 'URL', type: 'url' },
      ],
    },
  ],
  orderings: [
    {
      title: 'Step Order',
      name: 'stepNumberAsc',
      by: [{ field: 'stepNumber', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'stepNumber',
    },
    prepare(selection: Record<string, unknown>) {
      return { title: `Step ${selection.subtitle}: ${selection.title}` }
    },
  },
}
