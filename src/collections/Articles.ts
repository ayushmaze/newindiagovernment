import type { CollectionConfig } from 'payload'
import { publicRead } from '../access/publicRead.ts'
import { isAdminOrEditor } from '../access/isAdminOrEditor.ts'
import { revalidateAfterChange } from '../hooks/revalidateAfterChange.ts'

export const Articles: CollectionConfig = {
  slug: 'articles',
  labels: { singular: 'Article', plural: 'Articles' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'status', 'publishedAt'],
  },
  access: {
    read: publicRead,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: ({ req }) => req.user?.role === 'admin',
  },
  versions: {
    drafts: { autosave: true },
  },
  hooks: {
    afterChange: [revalidateAfterChange('article')],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      maxLength: 180,
      localized: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: { description: 'kebab-case, auto-generated from title if blank' },
    },
    {
      name: 'kicker',
      type: 'text',
      maxLength: 60,
      localized: true,
      admin: { description: 'Short uppercase tag like FACT-CHECK or INVESTIGATION' },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
      maxLength: 320,
      localized: true,
    },
    { name: 'heroImage', type: 'upload', relationTo: 'media', required: false },
    {
      name: 'body',
      type: 'richText',
      localized: true,
    },
    { name: 'category', type: 'relationship', relationTo: 'categories', required: true },
    { name: 'tags', type: 'relationship', relationTo: 'tags', hasMany: true },
    { name: 'author', type: 'relationship', relationTo: 'authors', required: true },
    {
      name: 'credibilityScore',
      type: 'number',
      min: 0,
      max: 10,
      admin: { description: '0=fully misleading, 10=fully accurate. Shows in ticker.' },
    },
    {
      name: 'sources',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'url', type: 'text', required: true },
      ],
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'Show in homepage center hero' },
    },
    {
      name: 'placement',
      type: 'select',
      defaultValue: 'feed',
      options: ['feed', 'homepage-left', 'homepage-right', 'homepage-hero'],
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: ['draft', 'published', 'archived'],
    },
    { name: 'publishedAt', type: 'date' },
    {
      name: 'seo',
      type: 'group',
      fields: [
        { name: 'metaTitle', type: 'text', localized: true },
        { name: 'metaDescription', type: 'textarea', localized: true },
        { name: 'ogImage', type: 'upload', relationTo: 'media' },
      ],
    },
  ],
}
