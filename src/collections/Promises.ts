import type { CollectionConfig } from 'payload'
import { isAdmin } from '../access/isAdmin.ts'
import { publicRead } from '../access/publicRead.ts'

export const Promises: CollectionConfig = {
  slug: 'promises',
  labels: { singular: 'Promise', plural: 'Promises' },
  admin: {
    useAsTitle: 'promise',
    defaultColumns: ['promise', 'category', 'verdict', 'progress'],
  },
  access: {
    read: publicRead,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    { name: 'promise', type: 'text', required: true, admin: { description: 'The headline promise as it was sold to the public' } },
    {
      type: 'row',
      fields: [
        { name: 'attribution', type: 'text', required: true, admin: { description: 'Who said it / where, and roughly when' } },
        { name: 'year', type: 'text', required: true },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'category',
          type: 'select',
          required: true,
          options: [
            'Jobs', 'Economy', 'Farmers', 'Cities', 'Water', 'Environment', 'Money',
            'Energy', 'Sanitation', 'Digital', 'Health', 'Welfare', 'Education', 'Governance'
          ]
        },
        {
          name: 'verdict',
          type: 'select',
          required: true,
          options: [
            { label: 'Broken', value: 'broken' },
            { label: 'Jumla', value: 'jumla' },
            { label: 'Delayed', value: 'delayed' },
            { label: 'Partially Met', value: 'partial' },
            { label: 'On Track (Kept)', value: 'kept' },
          ]
        },
        { name: 'progress', type: 'number', required: true, min: 0, max: 100, admin: { description: '0-100 progress against the headline claim' } },
      ],
    },
    { name: 'reality', type: 'textarea', required: true, admin: { description: 'What the data actually shows' } },
    { name: 'punchline', type: 'textarea', required: true, admin: { description: 'One-line punch for share cards' } },
    {
      name: 'sources',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'url', type: 'text', required: true },
      ],
    },
  ],
}
