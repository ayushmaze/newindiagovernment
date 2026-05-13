import type { CollectionConfig } from 'payload'
import { isAdmin } from '../access/isAdmin.ts'
import { publicRead } from '../access/publicRead.ts'

export const TickerItems: CollectionConfig = {
  slug: 'ticker-items',
  admin: {
    useAsTitle: 'claim',
    defaultColumns: ['claim', 'credibilityScore', 'verdict', 'active', 'order'],
  },
  access: {
    read: publicRead,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    { name: 'claim', type: 'text', required: true },
    {
      name: 'verdict',
      type: 'select',
      required: true,
      options: [
        { label: 'Misleading', value: 'misleading' },
        { label: 'False', value: 'false' },
        { label: 'Mostly False', value: 'mostly-false' },
        { label: 'Mixed', value: 'mixed' },
        { label: 'True', value: 'true' },
      ],
    },
    {
      name: 'credibilityScore',
      type: 'number',
      required: true,
      min: 0,
      max: 10,
      admin: { description: '0=fully misleading, 10=fully accurate' },
    },
    { name: 'linkedArticle', type: 'relationship', relationTo: 'articles' },
    { name: 'active', type: 'checkbox', defaultValue: true },
    { name: 'order', type: 'number', defaultValue: 0 },
  ],
}
