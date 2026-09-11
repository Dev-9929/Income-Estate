import React from 'react'
import type { Metadata } from 'next'
import { generateWPSEOMetadata, YoastJsonLd } from '@/lib/seo'
import { getWordPressPageBySlug } from '@/lib/wordpress'
import { AboutClient } from './AboutClient'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://income-estate.com'
  const wpPage = (await getWordPressPageBySlug('about')) || (await getWordPressPageBySlug('about-us'))

  return generateWPSEOMetadata({
    seoData: wpPage?.seo,
    fallbackTitle: 'About Us | Founders & Pillars | Income Estate',
    fallbackDesc:
      'Discover the vision behind Income Estate, founded by Mr. Aman Duggal & Mr. Vikram Swami to deliver transparent, pre-leased high-yield real estate investments.',
    fallbackCanonical: `${baseUrl}/about`,
  })
}

export default async function AboutPage() {
  const wpPage = (await getWordPressPageBySlug('about')) || (await getWordPressPageBySlug('about-us'))

  return (
    <>
      <YoastJsonLd schemaRaw={wpPage?.seo?.schema?.raw} />
      <AboutClient />
    </>
  )
}
