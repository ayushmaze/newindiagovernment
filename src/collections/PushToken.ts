import type { Access, CollectionConfig } from 'payload'

/**
 * PushToken — an Expo push token registered by the admin app (Phase 4).
 *
 * The pipeline notifies every active token when new drafts are ready. Tokens
 * are registered via /api/admin/register-push by a logged-in admin/editor.
 */

const isStaff: Access = ({ req }) => {
  const role = (req.user as { role?: string } | null)?.role
  return Boolean(role && ['admin', 'editor'].includes(role))
}

export const PushToken: CollectionConfig = {
  slug: 'push-tokens',
  labels: { singular: 'Push Token', plural: 'Push Tokens' },
  admin: {
    useAsTitle: 'label',
    defaultColumns: ['label', 'platform', 'active', 'createdAt'],
    group: 'News Pipeline',
  },
  access: { read: isStaff, create: isStaff, update: isStaff, delete: isStaff },
  fields: [
    { name: 'token', type: 'text', required: true, index: true, admin: { description: 'Expo push token' } },
    { name: 'label', type: 'text', admin: { description: 'Device label (e.g. "Ayush Pixel")' } },
    {
      name: 'platform',
      type: 'select',
      options: [
        { label: 'Android', value: 'android' },
        { label: 'iOS', value: 'ios' },
        { label: 'Web', value: 'web' },
      ],
    },
    { name: 'active', type: 'checkbox', defaultValue: true },
    { name: 'owner', type: 'relationship', relationTo: 'users', admin: { readOnly: true } },
  ],
}
