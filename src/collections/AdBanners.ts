import type { CollectionConfig } from 'payload'
import { isAdmin } from '../access/isAdmin.ts'
import { publicRead } from '../access/publicRead.ts'

export const AdBanners: CollectionConfig = {
  slug: 'ad-banners',
  admin: {
    useAsTitle: 'label',
    defaultColumns: ['label', 'placement', 'active'],
  },
  access: {
    read: publicRead,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    { name: 'label', type: 'text', required: true },
    { name: 'image', type: 'upload', relationTo: 'media' },
    { name: 'link', type: 'text' },
    {
      name: 'placement',
      type: 'select',
      required: true,
      options: [
        { label: 'Homepage Left', value: 'homepage-left' },
        { label: 'Homepage Right', value: 'homepage-right' },
        { label: 'Article Inline', value: 'article-inline' },
      ],
    },
    { name: 'active', type: 'checkbox', defaultValue: true },
  ],
}
