import React from 'react'
import { notFound } from 'next/navigation'
import { getBlogBySlug, blogsListingData } from '@/data/blogs-data'
import { BlogDetailClient } from './BlogDetailClient'

interface BlogDetailPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  return blogsListingData.map((post) => ({
    slug: post.slug,
  }))
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params
  const blog = getBlogBySlug(slug)

  if (!blog) {
    notFound()
  }

  return <BlogDetailClient blog={blog} />
}
