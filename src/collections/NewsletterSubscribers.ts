import type { CollectionConfig } from 'payload'
import { isAdmin } from '../access/isAdmin.ts'

export const NewsletterSubscribers: CollectionConfig = {
  slug: 'newsletter-subscribers',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'source', 'confirmedAt', 'createdAt'],
  },
  access: {
    read: isAdmin,
    create: () => true,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    { name: 'email', type: 'email', required: true, unique: true },
    { name: 'confirmedAt', type: 'date' },
    { name: 'unsubscribedAt', type: 'date' },
    {
      name: 'source',
      type: 'text',
      admin: { description: 'Where the signup came from (e.g. homepage, article)' },
    },
  ],
}
