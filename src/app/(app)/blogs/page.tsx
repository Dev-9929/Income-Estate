import React from 'react'
import type { Metadata } from 'next'
import { getAllLiveBlogPosts } from '@/lib/wordpress'
import { generateWPSEOMetadata, YoastJsonLd } from '@/lib/seo'
import { BlogListingClient } from './BlogListingClient'

export const revalidate = 60 // Next.js ISR: Revalidate every 60 seconds

export async function generateMetadata(): Promise<Metadata> {
  const posts = await getAllLiveBlogPosts()
  const firstPost = posts[0]

  return generateWPSEOMetadata({
    seoData: firstPost?.seo,
    fallbackTitle: 'Blogs & Insights | Income Estate',
    fallbackDesc:
      'Explore expert analysis, research guides, and market trends on fractional real estate investments and high-ROI hospitality assets.',
    fallbackCanonical: 'https://income-estate.com/blogs',
  })
}

export default async function BlogListingPage() {
  const posts = await getAllLiveBlogPosts()
  const schemaRaw = posts[0]?.seo?.schema?.raw

  return (
    <>
      <YoastJsonLd schemaRaw={schemaRaw} />
      <BlogListingClient initialPosts={posts} />
    </>
  )
}
