import React from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import {
  getLiveNewsPostBySlug,
  getAllLiveNewsPosts,
} from '@/lib/wordpress'
import { generateWPSEOMetadata, YoastJsonLd } from '@/lib/seo'
import { NewsDetailClient } from './NewsDetailClient'

export const revalidate = 60 // Next.js ISR: Revalidate every 60 seconds

interface NewsDetailPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const posts = await getAllLiveNewsPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: NewsDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getLiveNewsPostBySlug(slug)

  if (!post) {
    return generateWPSEOMetadata({
      fallbackTitle: 'News Article Not Found | Income Estate',
      fallbackDesc: 'The requested news article could not be found.',
    })
  }

  const imageUrl = post.featuredImage?.node?.sourceUrl

  return generateWPSEOMetadata({
    seoData: post.seo,
    fallbackTitle: `${post.title} | Income Estate News`,
    fallbackDesc:
      post.excerpt?.replace(/<[^>]*>/g, '').trim().substring(0, 160) ||
      'Real estate news and market updates.',
    fallbackCanonical: `https://income-estate.com/news/${post.slug}`,
    fallbackImage: imageUrl,
  })
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { slug } = await params
  const post = await getLiveNewsPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const allPosts = await getAllLiveNewsPosts()
  const recentPosts = allPosts.filter((p) => p.slug !== slug).slice(0, 4)

  return (
    <>
      <YoastJsonLd schemaRaw={post.seo?.schema?.raw} />
      <NewsDetailClient news={post} recentNews={recentPosts} />
    </>
  )
}
