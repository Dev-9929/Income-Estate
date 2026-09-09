import React from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getWordPressPropertyBySlug, getAllWordPressProperties } from '@/lib/wordpress'
import { generateWPSEOMetadata, YoastJsonLd } from '@/lib/seo'
import { getAllPropertySlugs } from '@/data/property-detail-data'
import { PropertyDetailClient } from '@/components/properties/PropertyDetailClient'

export const revalidate = 60 // ISR revalidation every 60 seconds

const VALID_CATEGORIES = ['roi-properties', 'branded-residences', 'other-properties'] as const

export async function generateStaticParams() {
  const slugs = getAllPropertySlugs()
  const params: Array<{ category: string; slug: string }> = []

  VALID_CATEGORIES.forEach((category) => {
    slugs.forEach((slug) => {
      params.push({ category, slug })
    })
  })

  return params
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>
}): Promise<Metadata> {
  const { category, slug } = await params

  if (!VALID_CATEGORIES.includes(category as (typeof VALID_CATEGORIES)[number])) {
    return {}
  }

  const res = await getWordPressPropertyBySlug(slug)
  if (!res) {
    return generateWPSEOMetadata({
      fallbackTitle: 'Property Not Found | Income Estate',
    })
  }

  const { detail, node } = res
  const title = `${detail.title} ${detail.titleAccent || ''} | Income Estate`
  const desc = `${detail.title} in ${detail.location} - ${detail.priceStarting} starting investment.`

  return generateWPSEOMetadata({
    seoData: node?.seo,
    fallbackTitle: title,
    fallbackDesc: desc,
    fallbackImage: detail.heroImage,
  })
}

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>
}) {
  const { category, slug } = await params

  if (!VALID_CATEGORIES.includes(category as (typeof VALID_CATEGORIES)[number])) {
    notFound()
  }

  const res = await getWordPressPropertyBySlug(slug)
  if (!res) {
    notFound()
  }

  // Fetch properties belonging ONLY to this category
  const categoryListing = await getAllWordPressProperties(category)

  // Filter out the current property so it doesn't show itself under "Similar Opportunities"
  const categorySimilar = categoryListing
    .filter((p) => p.slug !== slug)
    .map((p) => ({
      slug: p.slug,
      title: p.title,
      price: p.investment
        ? p.investment.toUpperCase().startsWith('STARTING')
          ? p.investment
          : `STARTING FROM ${p.investment}`
        : 'STARTING FROM ₹ 70 LACS.',
      image: p.image,
    }))

  const detailWithCategorySimilar = {
    ...res.detail,
    similarProperties: categorySimilar,
  }

  return (
    <>
      <YoastJsonLd schemaRaw={res.node?.seo?.schema?.raw} />
      <PropertyDetailClient property={detailWithCategorySimilar} categorySlug={category} />
    </>
  )
}
