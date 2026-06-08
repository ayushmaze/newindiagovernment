import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { mcpPlugin } from '@payloadcms/plugin-mcp'
import { en } from 'payload/i18n/en'
import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'

import { Articles } from './collections/Articles.ts'
import { Authors } from './collections/Authors.ts'
import { Categories } from './collections/Categories.ts'
import { Tags } from './collections/Tags.ts'
import { Media } from './collections/Media.ts'
import { Petitions } from './collections/Petitions.ts'
import { PetitionSignatures } from './collections/PetitionSignatures.ts'
import { Votes } from './collections/Votes.ts'
import { Voices } from './collections/Voices.ts'
import { TickerItems } from './collections/TickerItems.ts'
import { AdBanners } from './collections/AdBanners.ts'
import { NewsletterSubscribers } from './collections/NewsletterSubscribers.ts'
import { FactCheckSubmissions } from './collections/FactCheckSubmissions.ts'
import { NewsSource } from './collections/NewsSource.ts'
import { NewsItem } from './collections/NewsItem.ts'
import { Users } from './collections/Users.ts'
import { SiteSettings } from './globals/SiteSettings.ts'
import { Integrations } from './globals/Integrations.ts'
import { invalidateIntegrationsCache } from './lib/integrations.ts'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: 'users',
    meta: {
      titleSuffix: '— The New India Government',
      icons: [{ rel: 'icon', url: '/icons/favicon.svg' }],
    },
  },
  collections: [
    Articles,
    Authors,
    Categories,
    Tags,
    Media,
    Petitions,
    PetitionSignatures,
    Votes,
    Voices,
    TickerItems,
    AdBanners,
    NewsletterSubscribers,
    FactCheckSubmissions,
    NewsSource,
    NewsItem,
    Users,
  ],
  globals: [
    SiteSettings,
    {
      ...Integrations,
      hooks: {
        afterChange: [
          () => {
            invalidateIntegrationsCache()
          },
        ],
      },
    },
  ],
  editor: lexicalEditor({}),
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI ?? '',
    },
    // push:true auto-applies schema without migration files. Defaults to off
    // in production unless PAYLOAD_DB_PUSH=1 is set explicitly — used for the
    // first Render deploy when the DB is empty and no migration files exist.
    push:
      process.env.NODE_ENV !== 'production' ||
      process.env.PAYLOAD_DB_PUSH === '1',
  }),
  localization: {
    locales: ['en', 'hi'],
    defaultLocale: 'en',
    fallback: true,
  },
  secret: process.env.PAYLOAD_SECRET ?? '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  i18n: {
    supportedLanguages: { en },
  },
  sharp,
  upload: {
    limits: {
      fileSize: 10 * 1024 * 1024, // 10MB
    },
  },
  plugins: [
    mcpPlugin({
      collections: {
        articles: { enabled: { find: true, create: true, update: true, delete: false } },
        media: { enabled: { find: true, create: true, update: false, delete: false } },
        categories: { enabled: { find: true } },
        authors: { enabled: { find: true } },
        tags: { enabled: { find: true, create: true } },
        'ticker-items': { enabled: { find: true, create: true, update: true, delete: true } },
        voices: { enabled: { find: true, update: true } },
        petitions: { enabled: { find: true, create: true, update: true } },
        'fact-check-submissions': { enabled: { find: true, create: true, update: true } },
      },
    }),
  ],
})
