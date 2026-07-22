import type { CollectionConfig } from 'payload'
import { isAdmin } from '../access/isAdmin.ts'
import { publicRead } from '../access/publicRead.ts'

export const WhyItMattersItems: CollectionConfig = {
  slug: 'why-it-matters-items',
  labels: { singular: 'Why It Matters Item', plural: 'Why It Matters Items' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'body'],
  },
  access: {
    read: publicRead,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'body', type: 'textarea', required: true },
    { name: 'bigStat', type: 'text', required: true },
    { name: 'statSub', type: 'text', required: true },
    { name: 'accent', type: 'select', required: true, options: ['red', 'gold'] },
  ],
}
