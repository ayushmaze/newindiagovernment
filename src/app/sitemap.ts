import type { MetadataRoute } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'

// Sitemap pulls from Payload. Force dynamic so Next doesn't try to
// pre-render it at `next build` time (when Postgres isn't available
// inside the Docker build container on Render).
export const dynamic = 'force-dynamic'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: new Date(), changeFrequency: 'hourly', priority: 1 },
    { url: `${siteUrl}/promises`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${siteUrl}/quiz`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${siteUrl}/cockroach-janta-party`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${siteUrl}/petitions`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${siteUrl}/voices`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.7 },
    { url: `${siteUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${siteUrl}/search`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.4 },
  ]

  try {
    const payload = await getPayload({ config })

    const [articlesResult, petitionsResult, categoriesResult] = await Promise.all([
      payload.find({
        collection: 'articles',
        where: { status: { equals: 'published' } },
        limit: 1000,
        depth: 0,
      }),
      payload.find({
        collection: 'petitions',
        where: { status: { not_equals: 'draft' } },
        limit: 200,
        depth: 0,
      }),
      payload.find({
        collection: 'categories',
        limit: 50,
        depth: 0,
      }),
    ])

    const articlePages: MetadataRoute.Sitemap = articlesResult.docs.map((a) => ({
      url: `${siteUrl}/article/${(a as unknown as { slug: string }).slug}`,
      lastModified: new Date((a as unknown as { updatedAt?: string }).updatedAt ?? Date.now()),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    }))

    const petitionPages: MetadataRoute.Sitemap = petitionsResult.docs.map((p) => ({
      url: `${siteUrl}/petition/${(p as unknown as { slug: string }).slug}`,
      lastModified: new Date((p as unknown as { updatedAt?: string }).updatedAt ?? Date.now()),
      changeFrequency: 'daily' as const,
      priority: 0.75,
    }))

    const categoryPages: MetadataRoute.Sitemap = categoriesResult.docs.map((c) => ({
      url: `${siteUrl}/category/${(c as unknown as { slug: string }).slug}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.7,
    }))

    return [...staticPages, ...articlePages, ...petitionPages, ...categoryPages]
  } catch {
    return staticPages
  }
}
