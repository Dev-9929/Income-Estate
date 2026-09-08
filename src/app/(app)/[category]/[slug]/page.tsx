import React from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getWordPressPropertyBySlug } from '@/lib/wordpress'
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

  return (
    <>
      <YoastJsonLd schemaRaw={res.node?.seo?.schema?.raw} />
      <PropertyDetailClient property={res.detail} categorySlug={category} />
    </>
  )
}
