import { NextResponse } from 'next/server'
import { searchProperties } from '@/lib/search'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q') || searchParams.get('query') || searchParams.get('search') || ''

    const searchResponse = searchProperties(query)

    return NextResponse.json(searchResponse, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
      },
    })
  } catch (error) {
    console.error('Property search API error:', error)
    return NextResponse.json(
      {
        query: '',
        totalResults: 0,
        results: [],
        error: 'Failed to process search query',
      },
      { status: 500 }
    )
  }
}
