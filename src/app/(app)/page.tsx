import React from 'react'
import type { Metadata } from 'next'
import { getHomeRoiProperties, getHomeBrandedResidences } from '@/lib/wordpress'
import { generateWPSEOMetadata, YoastJsonLd } from '@/lib/seo'
import { HomePageClient } from '@/components/home/HomePageClient'

export const revalidate = 60 // ISR revalidation every 60 seconds

export async function generateMetadata(): Promise<Metadata> {
  return generateWPSEOMetadata({
    fallbackTitle: 'Income Estate | Fractional Real Estate & Pre-Leased High ROI Resort Assets',
    fallbackDesc:
      'Co-own institutional quality resorts, commercial floors, and luxury branded residences in India with structured monthly rental yields up to 12.4%.',
  })
}

export default async function Home() {
  const roiProperties = await getHomeRoiProperties()
  const brandedResidences = await getHomeBrandedResidences()

  return (
    <>
      <YoastJsonLd />
      <HomePageClient
        roiProperties={roiProperties}
        brandedResidences={brandedResidences}
      />
    </>
  )
}
