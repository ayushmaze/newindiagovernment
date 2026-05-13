import type { CollectionConfig } from 'payload'

export const Voices: CollectionConfig = {
  slug: 'voices',
  admin: {
    useAsTitle: 'displayName',
    defaultColumns: ['displayName', 'voteOption', 'status', 'createdAt'],
  },
  access: {
    read: ({ req }) => req.user?.role === 'admin' || req.user?.role === 'moderator',
    create: () => true,
    update: ({ req }) =>
      req.user?.role === 'admin' || req.user?.role === 'moderator',
    delete: ({ req }) => req.user?.role === 'admin',
  },
  fields: [
    { name: 'text', type: 'textarea', required: true, maxLength: 1000 },
    {
      name: 'displayName',
      type: 'text',
      admin: { description: 'Optional — defaults to "Anonymous"' },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'pending',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Approved', value: 'approved' },
        { label: 'Rejected', value: 'rejected' },
      ],
    },
    {
      name: 'voteOption',
      type: 'select',
      options: [
        { label: 'YES, time for change', value: 'yes-time-for-change' },
        { label: 'NO, current is fine', value: 'no-current-fine' },
        { label: 'UNDECIDED', value: 'undecided' },
      ],
    },
  ],
}
