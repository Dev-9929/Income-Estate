import React from 'react'
import { getAllWordPressPosts } from '@/lib/wordpress'
import { BlogsClient } from './BlogsClient'

export const revalidate = 60 // Next.js ISR: Revalidate every 60 seconds

export default async function BlogsPage() {
  const posts = await getAllWordPressPosts()

  return <BlogsClient initialPosts={posts} />
}
