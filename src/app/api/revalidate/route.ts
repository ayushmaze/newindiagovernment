import { NextRequest, NextResponse } from 'next/server'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const { revalidateTag, revalidatePath } = (await import('next/cache')) as any

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')
  const tag = req.nextUrl.searchParams.get('tag')
  const path = req.nextUrl.searchParams.get('path')

  if (!secret || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!tag && !path) {
    return NextResponse.json({ error: 'Missing tag or path' }, { status: 400 })
  }

  if (tag) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    revalidateTag(tag)
  }
  
  if (path) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    revalidatePath(path)
  }

  // Always revalidate the homepage since it aggregates data from most collections
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  revalidatePath('/')

  return NextResponse.json({ revalidated: true, tag, path })
}
