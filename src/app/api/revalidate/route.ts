import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    let body: Record<string, unknown> = {}

    try {
      body = await request.json()
    } catch {
      // Body may be empty if params are sent via query string
    }

    const secret =
      (body.secret as string) ||
      searchParams.get('secret') ||
      request.headers.get('x-revalidate-secret')

    const expectedSecret =
      process.env.WORDPRESS_REVALIDATE_SECRET ||
      process.env.REVALIDATION_SECRET ||
      'income_estate_secret_token'

    if (!secret || secret !== expectedSecret) {
      return NextResponse.json(
        { message: 'Invalid revalidation secret token' },
        { status: 401 }
      )
    }

    const path = (body.path as string) || searchParams.get('path')
    const category = (body.category as string) || searchParams.get('category')
    const slug = (body.slug as string) || searchParams.get('slug')

    const revalidatedPaths: string[] = []

    if (path) {
      revalidatePath(path)
      revalidatedPaths.push(path)
    }

    if (slug) {
      const catPath = `/properties/${category || 'roi-properties'}/${slug}`
      const directPath = `/properties/${slug}`
      revalidatePath(catPath)
      revalidatePath(directPath)
      revalidatedPaths.push(catPath, directPath)
    }

    if (category) {
      const categoryPath = `/properties/${category}`
      revalidatePath(categoryPath)
      revalidatedPaths.push(categoryPath)
    }

    // Always revalidate main properties index and homepage when triggered
    revalidatePath('/properties')
    revalidatePath('/')
    revalidatedPaths.push('/properties', '/')

    return NextResponse.json({
      revalidated: true,
      paths: Array.from(new Set(revalidatedPaths)),
      now: Date.now(),
    })
  } catch (error) {
    console.error('Error handling revalidation webhook:', error)
    return NextResponse.json(
      { message: 'Error revalidating path', error: (error as Error).message },
      { status: 500 }
    )
  }
}
