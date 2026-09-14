import React from 'react'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { searchProperties } from '@/lib/search'
import { PropertySearchResultsClient } from '@/components/properties/PropertySearchResultsClient'

export const revalidate = 60

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; q?: string }>
}): Promise<Metadata> {
  const resolvedParams = await searchParams
  const q = resolvedParams.search || resolvedParams.q || ''

  if (q) {
    return {
      title: `Search Results for "${q}" | Income Estate`,
      description: `Explore property investment results matching "${q}" on Income Estate.`,
    }
  }

  return {
    title: 'All Investment Properties | Income Estate',
  }
}

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; q?: string }>
}) {
  const resolvedParams = await searchParams
  const query = (resolvedParams.search || resolvedParams.q || '').trim()

  if (!query) {
    redirect('/roi-properties')
  }

  const searchData = searchProperties(query)

  return <PropertySearchResultsClient searchData={searchData} initialQuery={query} />
}
