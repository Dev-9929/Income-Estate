import React from 'react'
import { notFound } from 'next/navigation'
import { getPropertyDetailBySlug, getAllPropertySlugs } from '@/data/property-detail-data'
import { PropertyDetailClient } from './PropertyDetailClient'

interface PropertyDetailPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  return getAllPropertySlugs().map((slug) => ({
    slug,
  }))
}

export default async function PropertyDetailPage({ params }: PropertyDetailPageProps) {
  const { slug } = await params
  const property = getPropertyDetailBySlug(slug)

  if (!property) {
    notFound()
  }

  return <PropertyDetailClient property={property} />
}
