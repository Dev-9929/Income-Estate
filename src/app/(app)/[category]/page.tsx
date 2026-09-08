import React from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllWordPressProperties } from '@/lib/wordpress'
import { generateWPSEOMetadata } from '@/lib/seo'
import { CategoryListingClient } from '@/components/properties/CategoryListingClient'

export const revalidate = 60 // ISR revalidation every 60 seconds

const VALID_CATEGORIES = ['roi-properties', 'branded-residences', 'other-properties'] as const

export async function generateStaticParams() {
  return VALID_CATEGORIES.map((category) => ({
    category,
  }))
}

function formatCategoryTitle(categorySlug: string): string {
  const formatted = categorySlug.replace(/-/g, ' ')
  return formatted.charAt(0).toUpperCase() + formatted.slice(1)
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>
}): Promise<Metadata> {
  const { category } = await params
  if (!VALID_CATEGORIES.includes(category as (typeof VALID_CATEGORIES)[number])) {
    return {}
  }

  const title = `${formatCategoryTitle(category)} | Income Estate`
  const desc = `Explore curated ${formatCategoryTitle(category)} real estate investment opportunities yielding high monthly returns.`

  return generateWPSEOMetadata({
    fallbackTitle: title,
    fallbackDesc: desc,
  })
}

export default async function CategoryListingPage({
  params,
}: {
  params: Promise<{ category: string }>
}) {
  const { category } = await params

  if (!VALID_CATEGORIES.includes(category as (typeof VALID_CATEGORIES)[number])) {
    notFound()
  }

  const properties = await getAllWordPressProperties(category)
  const categoryTitle = formatCategoryTitle(category)

  return (
    <CategoryListingClient
      categorySlug={category}
      categoryTitle={categoryTitle}
      properties={properties}
    />
  )
}
