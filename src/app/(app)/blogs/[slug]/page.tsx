import React from 'react'
import { notFound } from 'next/navigation'
import { getWordPressPostBySlug, getAllWordPressPosts } from '@/lib/wordpress'
import { BlogDetailClient } from './BlogDetailClient'

export const revalidate = 60 // Next.js ISR: Revalidate every 60 seconds

interface BlogDetailPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const posts = await getAllWordPressPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params
  const blog = await getWordPressPostBySlug(slug)

  if (!blog) {
    notFound()
  }

  return <BlogDetailClient blog={blog} />
}
