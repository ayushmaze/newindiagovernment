import type { CollectionConfig } from 'payload'

export const Votes: CollectionConfig = {
  slug: 'votes',
  admin: {
    useAsTitle: 'option',
    defaultColumns: ['option', 'voterHash', 'ipCountry', 'createdAt'],
  },
  access: {
    read: ({ req }) => req.user?.role === 'admin',
    create: () => true,
    update: () => false,
    delete: ({ req }) => req.user?.role === 'admin',
  },
  fields: [
    {
      name: 'option',
      type: 'select',
      required: true,
      options: [
        { label: 'YES, time for change', value: 'yes-time-for-change' },
        { label: 'NO, current is fine', value: 'no-current-fine' },
        { label: 'UNDECIDED', value: 'undecided' },
      ],
    },
    { name: 'voterHash', type: 'text', unique: true, required: true },
    { name: 'userAgent', type: 'text' },
    {
      name: 'ipCountry',
      type: 'text',
      admin: { description: 'Country derived from IP (not raw IP stored)' },
    },
  ],
}
