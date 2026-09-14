import React from 'react'
import type { Metadata } from 'next'
import { getAllLiveNewsPosts } from '@/lib/wordpress'
import { generateWPSEOMetadata, YoastJsonLd } from '@/lib/seo'
import { NewsListingClient } from './NewsListingClient'

export const revalidate = 60 // Next.js ISR: Revalidate every 60 seconds

export async function generateMetadata(): Promise<Metadata> {
  const posts = await getAllLiveNewsPosts()
  const firstPost = posts[0]

  return generateWPSEOMetadata({
    seoData: firstPost?.seo,
    fallbackTitle: 'News | Income Estate',
    fallbackDesc:
      'Latest market news, RBI FEMA regulatory updates, luxury resort infrastructure developments, and fractional real estate insights.',
    fallbackCanonical: 'https://income-estate.com/news',
  })
}

export default async function NewsListingPage() {
  const posts = await getAllLiveNewsPosts()
  const schemaRaw = posts[0]?.seo?.schema?.raw

  return (
    <>
      <YoastJsonLd schemaRaw={schemaRaw} />
      <NewsListingClient initialPosts={posts} />
    </>
  )
}
