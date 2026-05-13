import type { CollectionConfig, CollectionAfterChangeHook } from 'payload'

const updatePetitionCount: CollectionAfterChangeHook = async ({ doc, req }) => {
  const { payload } = req
  const petitionId =
    typeof doc.petition === 'object' ? doc.petition?.id : doc.petition

  if (!petitionId) return doc

  try {
    const { totalDocs } = await payload.find({
      collection: 'petition-signatures',
      where: {
        petition: { equals: petitionId },
        verified: { equals: true },
      },
      limit: 0,
      depth: 0,
    })

    await payload.update({
      collection: 'petitions',
      id: petitionId,
      data: { currentSignatures: totalDocs },
    })
  } catch {
    // Non-critical
  }

  return doc
}

export const PetitionSignatures: CollectionConfig = {
  slug: 'petition-signatures',
  admin: {
    useAsTitle: 'firstName',
    defaultColumns: ['firstName', 'lastName', 'city', 'petition', 'verified', 'createdAt'],
  },
  access: {
    read: ({ req }) => req.user?.role === 'admin' || req.user?.role === 'moderator',
    create: () => true,
    update: ({ req }) => req.user?.role === 'admin' || req.user?.role === 'moderator',
    delete: ({ req }) => req.user?.role === 'admin',
  },
  hooks: {
    afterChange: [updatePetitionCount],
  },
  fields: [
    { name: 'petition', type: 'relationship', relationTo: 'petitions', required: true },
    { name: 'firstName', type: 'text', required: true },
    { name: 'lastName', type: 'text', required: true },
    { name: 'city', type: 'text' },
    { name: 'country', type: 'text', defaultValue: 'India' },
    {
      name: 'voterHash',
      type: 'text',
      unique: true,
      admin: { description: 'SHA-256 of petition+IP+UA. Used for dedup.' },
    },
    {
      name: 'comment',
      type: 'textarea',
      admin: { description: 'Optional public comment from signer' },
    },
    {
      name: 'displayPublic',
      type: 'checkbox',
      defaultValue: true,
      admin: { description: 'Show name/city/comment on petition page' },
    },
    {
      name: 'verified',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
}
