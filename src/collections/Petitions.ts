import type { CollectionConfig } from 'payload'
import { publicRead } from '../access/publicRead.ts'
import { isAdminOrEditor } from '../access/isAdminOrEditor.ts'
import { revalidateAfterChange } from '../hooks/revalidateAfterChange.ts'

export const Petitions: CollectionConfig = {
  slug: 'petitions',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'target', 'currentSignatures', 'goalSignatures', 'status'],
  },
  access: {
    read: publicRead,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: ({ req }) => req.user?.role === 'admin',
  },
  hooks: {
    afterChange: [revalidateAfterChange('petition')],
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    { name: 'summary', type: 'textarea', required: true },
    { name: 'body', type: 'richText' },
    {
      name: 'target',
      type: 'text',
      admin: { description: 'e.g. "Prime Minister\'s Office"' },
    },
    { name: 'goalSignatures', type: 'number', required: true, defaultValue: 1000 },
    {
      name: 'currentSignatures',
      type: 'number',
      defaultValue: 0,
      admin: { description: 'Auto-updated by signature hook' },
    },
    { name: 'heroImage', type: 'upload', relationTo: 'media' },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'active',
      options: ['active', 'closed', 'draft'],
    },
    { name: 'createdBy', type: 'relationship', relationTo: 'users' },
  ],
}
