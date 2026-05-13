import type { CollectionConfig } from 'payload'
import { isAdmin } from '../access/isAdmin.ts'
import { publicRead } from '../access/publicRead.ts'

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'description'],
  },
  access: {
    read: publicRead,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    { name: 'description', type: 'textarea' },
    {
      name: 'accentColor',
      type: 'text',
      defaultValue: '#BCA5C7',
      admin: { description: 'Hex color for category accent' },
    },
  ],
}
