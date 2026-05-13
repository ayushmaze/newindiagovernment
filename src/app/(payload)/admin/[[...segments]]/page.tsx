import { RootPage } from '@payloadcms/next/views'
import configPromise from '@payload-config'
import { importMap } from '../importMap.js'
import type { Metadata } from 'next'

type Args = {
  params: Promise<{ segments: string[] }>
  searchParams: Promise<{ [key: string]: string | string[] }>
}

export default function Page(args: Args) {
  return RootPage({ ...args, config: configPromise, importMap })
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { segments } = await params
  const path = segments?.join('/') ?? ''
  return {
    title: `Admin${path ? ` — ${path}` : ''} — The New India Government`,
  }
}
