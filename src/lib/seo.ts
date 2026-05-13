import type { Metadata } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
const siteName = 'The New India Government'

export function generateArticleMetadata({
  title,
  description,
  ogImage,
  publishedAt,
  author,
}: {
  title: string
  description: string
  ogImage?: string
  publishedAt?: string
  author?: string
}): Metadata {
  return {
    title: `${title} | ${siteName}`,
    description,
    openGraph: {
      title,
      description,
      siteName,
      type: 'article',
      publishedTime: publishedAt,
      authors: author ? [author] : undefined,
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630 }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  }
}

export function generateBaseMetadata(page?: string): Metadata {
  return {
    title: page ? `${page} | ${siteName}` : siteName,
    description:
      'Revealing facts the government hides. Independent fact-checking and citizen journalism for a better India.',
    metadataBase: new URL(siteUrl),
    openGraph: {
      siteName,
      locale: 'en_IN',
      type: 'website',
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: siteUrl,
    },
  }
}
