import { NextRequest, NextResponse } from 'next/server'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const { revalidateTag } = (await import('next/cache')) as any

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')
  const tag = req.nextUrl.searchParams.get('tag')

  if (!secret || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!tag) {
    return NextResponse.json({ error: 'Missing tag' }, { status: 400 })
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  revalidateTag(tag)
  return NextResponse.json({ revalidated: true, tag })
}
