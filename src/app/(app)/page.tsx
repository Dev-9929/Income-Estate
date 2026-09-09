import React from 'react'
import { getHomeRoiProperties, getHomeBrandedResidences } from '@/lib/wordpress'
import { HomePageClient } from '@/components/home/HomePageClient'

export const revalidate = 60 // ISR revalidation every 60 seconds

export default async function Home() {
  const roiProperties = await getHomeRoiProperties()
  const brandedResidences = await getHomeBrandedResidences()

  return (
    <HomePageClient
      roiProperties={roiProperties}
      brandedResidences={brandedResidences}
    />
  )
}
