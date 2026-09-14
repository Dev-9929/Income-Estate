import { redirect, notFound } from 'next/navigation'
import { getPropertyDetailBySlug } from '@/data/property-detail-data'
import propertiesRaw from '@/data/properties.json'

export interface PropertySlugRedirectProps {
  params: Promise<{ slug: string }>
}

export default async function PropertySlugRedirectPage({ params }: PropertySlugRedirectProps) {
  const { slug } = await params

  if (!slug) {
    redirect('/roi-properties')
  }

  // 1. Check detail data dataset
  const detail = getPropertyDetailBySlug(slug)
  if (detail) {
    const isBranded =
      slug.includes('danube') ||
      slug.includes('lamborghini') ||
      detail.heroLabel?.toLowerCase().includes('branded') ||
      detail.propertyType?.toLowerCase().includes('residential')
    const category = isBranded ? 'branded-residences' : 'roi-properties'
    redirect(`/${category}/${slug}`)
  }

  // 2. Check raw properties dataset
  const rawProp = (propertiesRaw as any[]).find((p) => p.slug === slug || p.id === slug)
  if (rawProp) {
    const isBranded = rawProp.category === 'branded' || rawProp.category === 'branded-residences'
    const category = isBranded ? 'branded-residences' : 'roi-properties'
    redirect(`/${category}/${slug}`)
  }

  // If slug doesn't exist anywhere
  notFound()
}
