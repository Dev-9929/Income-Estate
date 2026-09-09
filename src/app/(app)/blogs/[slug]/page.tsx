import React from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import {
  getLiveBlogPostBySlug,
  getAllLiveBlogPosts,
} from '@/lib/wordpress'
import { generateWPSEOMetadata, YoastJsonLd } from '@/lib/seo'
import { BlogDetailClient } from './BlogDetailClient'

export const revalidate = 60 // Next.js ISR: Revalidate every 60 seconds

interface BlogDetailPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const posts = await getAllLiveBlogPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getLiveBlogPostBySlug(slug)

  if (!post) {
    return generateWPSEOMetadata({
      fallbackTitle: 'Article Not Found | Income Estate',
      fallbackDesc: 'The requested article could not be found.',
    })
  }

  const imageUrl = post.featuredImage?.node?.sourceUrl

  return generateWPSEOMetadata({
    seoData: post.seo,
    fallbackTitle: `${post.title} | Income Estate`,
    fallbackDesc:
      post.excerpt?.replace(/<[^>]*>/g, '').trim().substring(0, 160) ||
      'Insights on high-yield real estate investments.',
    fallbackCanonical: `https://income-estate.com/blogs/${post.slug}`,
    fallbackImage: imageUrl,
  })
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params
  const post = await getLiveBlogPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const allPosts = await getAllLiveBlogPosts()
  const recentPosts = allPosts.filter((p) => p.slug !== slug).slice(0, 4)

  return (
    <>
      <YoastJsonLd schemaRaw={post.seo?.schema?.raw} />
      <BlogDetailClient blog={post} recentPosts={recentPosts} />
    </>
  )
}
