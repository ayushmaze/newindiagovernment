import type { CollectionConfig } from 'payload'
import { isAdmin } from '../access/isAdmin.ts'
import { publicRead } from '../access/publicRead.ts'

export const LiesVsTruthItems: CollectionConfig = {
  slug: 'lies-vs-truth-items',
  labels: { singular: 'Lies vs Truth Item', plural: 'Lies vs Truth Items' },
  admin: {
    useAsTitle: 'claim',
    defaultColumns: ['claim', 'source', 'reality'],
  },
  access: {
    read: publicRead,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    { name: 'claim', type: 'textarea', required: true, admin: { description: 'The original claim being made' } },
    { name: 'source', type: 'text', required: true, admin: { description: 'Who said it / where (e.g., "Government briefing · Q1 2026")' } },
    { name: 'reality', type: 'textarea', required: true, admin: { description: 'What the evidence actually shows' } },
    { name: 'evidence', type: 'text', required: true, admin: { description: 'Short evidence tag (e.g., "NSO · CMIE")' } },
  ],
}
