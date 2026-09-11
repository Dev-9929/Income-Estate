import React from 'react'
import type { Metadata } from 'next'
import { generateWPSEOMetadata, YoastJsonLd } from '@/lib/seo'
import { getWordPressPageBySlug } from '@/lib/wordpress'
import { HowItWorksClient } from './HowItWorksClient'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://income-estate.com'
  const wpPage = await getWordPressPageBySlug('how-it-works')

  return generateWPSEOMetadata({
    seoData: wpPage?.seo,
    fallbackTitle: 'How It Works | Fractional Real Estate Investment Process | Income Estate',
    fallbackDesc:
      'Learn how fractional resort & commercial property co-ownership works step by step — from exploration and consultation to escrow payouts and secondary marketplace exit.',
    fallbackCanonical: `${baseUrl}/how-it-works`,
  })
}

export default async function HowItWorksPage() {
  const wpPage = await getWordPressPageBySlug('how-it-works')

  return (
    <>
      <YoastJsonLd schemaRaw={wpPage?.seo?.schema?.raw} />
      <HowItWorksClient />
    </>
  )
}
