import type { Access, CollectionConfig } from 'payload'

/**
 * NewsItem — one ingested story in the pipeline queue.
 *
 * Lifecycle:
 *   new → researching → drafted (article created, awaiting your review)
 *        → published (you approved) | rejected (you dismissed) | error
 *
 * The pipeline writes these; the admin app reads the queue, shows the
 * verdict, and lets you publish/reject. `dedupeKey` prevents the same story
 * (or the same story across outlets) from being processed twice.
 */

const isStaff: Access = ({ req }) => {
  const role = (req.user as { role?: string } | null)?.role
  return Boolean(role && ['admin', 'editor', 'moderator'].includes(role))
}

export const NewsItem: CollectionConfig = {
  slug: 'news-items',
  labels: { singular: 'News Item', plural: 'News Queue' },
  admin: {
    useAsTitle: 'sourceTitle',
    defaultColumns: ['sourceTitle', 'sourceName', 'verdict', 'status', 'createdAt'],
    group: 'News Pipeline',
  },
  access: {
    read: isStaff,
    create: isStaff,
    update: isStaff,
    delete: isStaff,
  },
  fields: [
    { name: 'sourceTitle', type: 'text', required: true, admin: { description: 'Original headline' } },
    { name: 'sourceUrl', type: 'text', required: true },
    { name: 'sourceName', type: 'text', admin: { description: 'Outlet name (denormalised)' } },
    { name: 'source', type: 'relationship', relationTo: 'news-sources' },
    {
      name: 'dedupeKey',
      type: 'text',
      index: true,
      admin: { readOnly: true, description: 'Hash used to avoid reprocessing duplicates' },
    },
    { name: 'summary', type: 'textarea', admin: { description: 'Feed summary / excerpt' } },
    { name: 'publishedAtSource', type: 'date' },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Researching', value: 'researching' },
        { label: 'Drafted — review me', value: 'drafted' },
        { label: 'Published', value: 'published' },
        { label: 'Rejected', value: 'rejected' },
        { label: 'Error', value: 'error' },
      ],
    },
    {
      name: 'verdict',
      type: 'select',
      defaultValue: 'pending',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'True', value: 'true' },
        { label: 'Mostly true', value: 'mostly-true' },
        { label: 'Mixed', value: 'mixed' },
        { label: 'Misleading', value: 'misleading' },
        { label: 'False', value: 'false' },
        { label: 'Unverifiable', value: 'unverifiable' },
      ],
    },
    {
      name: 'route',
      type: 'select',
      admin: { description: 'Which writing path the verdict triggered', readOnly: true },
      options: [
        { label: 'Original explainer', value: 'explainer' },
        { label: 'Hard debunk', value: 'debunk' },
      ],
    },
    {
      name: 'confidence',
      type: 'select',
      options: [
        { label: 'Low', value: 'low' },
        { label: 'Medium', value: 'medium' },
        { label: 'High', value: 'high' },
      ],
    },
    {
      name: 'linkedArticle',
      type: 'relationship',
      relationTo: 'articles',
      admin: { description: 'The draft the pipeline generated' },
    },
    {
      name: 'pipelineLog',
      type: 'textarea',
      admin: { readOnly: true, description: 'Research notes / errors from the run' },
    },
    { name: 'reviewedBy', type: 'relationship', relationTo: 'users', admin: { readOnly: true } },
  ],
}
