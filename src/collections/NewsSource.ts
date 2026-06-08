import type { Access, CollectionConfig } from 'payload'

/**
 * NewsSource — a configurable feed the news-pipeline ingests from.
 *
 * Each source is an RSS/Atom feed (or, later, an API endpoint). The
 * `leaning` field drives editorial routing: items from sources tagged
 * `godi-leaning` that fail the evidence check are routed to the hard-debunk
 * path; others are routed to the neutral explainer path.
 *
 * Manage these from /admin → News Sources. Only admins/editors can edit.
 */

const isStaff: Access = ({ req }) => {
  const role = (req.user as { role?: string } | null)?.role
  return Boolean(role && ['admin', 'editor'].includes(role))
}

export const NewsSource: CollectionConfig = {
  slug: 'news-sources',
  labels: { singular: 'News Source', plural: 'News Sources' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'leaning', 'active', 'lastFetchedAt'],
    group: 'News Pipeline',
  },
  access: {
    read: isStaff,
    create: isStaff,
    update: isStaff,
    delete: isStaff,
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      name: 'feedUrl',
      type: 'text',
      required: true,
      admin: { description: 'RSS/Atom feed URL' },
    },
    { name: 'homepage', type: 'text', admin: { description: 'Outlet homepage (for attribution)' } },
    {
      name: 'leaning',
      type: 'select',
      required: true,
      defaultValue: 'neutral',
      options: [
        { label: 'Neutral / Wire', value: 'neutral' },
        { label: 'Independent / Fact-check', value: 'independent' },
        { label: 'Government-leaning ("Godi")', value: 'godi-leaning' },
      ],
      admin: { description: 'Drives debunk routing for failed claims' },
    },
    { name: 'active', type: 'checkbox', defaultValue: true },
    {
      name: 'maxPerRun',
      type: 'number',
      defaultValue: 10,
      admin: { description: 'Max items to pull from this feed per pipeline run' },
    },
    {
      name: 'lastFetchedAt',
      type: 'date',
      admin: { readOnly: true, description: 'Set automatically by the pipeline' },
    },
    { name: 'notes', type: 'textarea' },
  ],
}
