import React from 'react'
import type { Metadata } from 'next'
import { generateWPSEOMetadata, YoastJsonLd } from '@/lib/seo'
import { getWordPressPageBySlug } from '@/lib/wordpress'
import { ServicesClient } from './ServicesClient'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://income-estate.com'
  const wpPage = (await getWordPressPageBySlug('services')) || (await getWordPressPageBySlug('our-services'))

  return generateWPSEOMetadata({
    seoData: wpPage?.seo,
    fallbackTitle: 'Our Services | Investor & Developer Advisory | Income Estate',
    fallbackDesc:
      'Strategic real estate solutions built around returns. B2C investor advisory, ROI-based search, licensing, and B2B developer project management & brand tie-ups.',
    fallbackCanonical: `${baseUrl}/services`,
  })
}

export default async function ServicesPage() {
  const wpPage = (await getWordPressPageBySlug('services')) || (await getWordPressPageBySlug('our-services'))

  return (
    <>
      <YoastJsonLd schemaRaw={wpPage?.seo?.schema?.raw} />
      <ServicesClient />
    </>
  )
}
