import React from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllWordPressProperties, getWordPressPageBySlug } from '@/lib/wordpress'
import { generateWPSEOMetadata, YoastJsonLd } from '@/lib/seo'
import { CategoryListingClient } from '@/components/properties/CategoryListingClient'
import { GenericPageClient } from '@/components/common/GenericPageClient'

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

  // 1. If it's a known property category
  if (VALID_CATEGORIES.includes(category as (typeof VALID_CATEGORIES)[number])) {
    const wpPage = await getWordPressPageBySlug(category)
    const title = `${formatCategoryTitle(category)} | Income Estate`
    const desc = `Explore curated ${formatCategoryTitle(category)} real estate investment opportunities yielding high monthly returns.`

    return generateWPSEOMetadata({
      seoData: wpPage?.seo,
      fallbackTitle: title,
      fallbackDesc: desc,
    })
  }

  // 2. Otherwise check if it's a dynamic WordPress Page (e.g. privacy-policy)
  const wpPage = await getWordPressPageBySlug(category)
  if (wpPage) {
    return generateWPSEOMetadata({
      seoData: wpPage.seo,
      fallbackTitle: `${wpPage.title} | Income Estate`,
    })
  }

  return {}
}

export default async function CategoryListingPage({
  params,
}: {
  params: Promise<{ category: string }>
}) {
  const { category } = await params

  // 1. Property category route
  if (VALID_CATEGORIES.includes(category as (typeof VALID_CATEGORIES)[number])) {
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

  // 2. Dynamic WordPress Page route (Privacy Policy, Terms, etc.)
  const wpPage = await getWordPressPageBySlug(category)
  if (wpPage) {
    return (
      <>
        <YoastJsonLd schemaRaw={wpPage.seo?.schema?.raw} />
        <GenericPageClient title={wpPage.title} content={wpPage.content} />
      </>
    )
  }

  notFound()
}
