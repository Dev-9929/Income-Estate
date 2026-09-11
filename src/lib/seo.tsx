import React from 'react'
import type { Metadata } from 'next'
import { WPSEOData, WPPostSEO } from './wordpress'

export interface SEOMetadataOptions {
  seoData?: WPSEOData | WPPostSEO | null
  fallbackTitle?: string
  fallbackDesc?: string
  fallbackCanonical?: string
  fallbackImage?: string
}

const DEFAULT_BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'https://income-estate.com'

/**
 * Maps Yoast SEO data from WPGraphQL into Next.js Metadata API format.
 */
export function generateWPSEOMetadata(options: SEOMetadataOptions = {}): Metadata {
  const {
    seoData,
    fallbackTitle = 'Income Estate | Pre-Leased Real Estate & High ROI Investments',
    fallbackDesc = 'Curated fractional resort and commercial real estate investments yielding up to 12.4% net annual returns for NRIs & institutional investors.',
    fallbackCanonical = DEFAULT_BASE_URL,
    fallbackImage = `${DEFAULT_BASE_URL}/assets/wordpress_media/Sale-Leaseback-Model.jpg`,
  } = options

  const title = seoData?.title || fallbackTitle
  const description = seoData?.metaDesc || fallbackDesc
  const canonical = seoData?.canonical || fallbackCanonical
  const ogImage =
    seoData && 'opengraphImage' in seoData && seoData.opengraphImage?.sourceUrl
      ? seoData.opengraphImage.sourceUrl
      : fallbackImage

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: 'Income Estate',
      images: ogImage ? [{ url: ogImage }] : [],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ogImage ? [ogImage] : [],
    },
  }
}

/**
 * Fallback Organization JSON-LD Schema for Google Knowledge Graph
 */
export function OrganizationJsonLd() {
  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: 'Income Estate',
    url: DEFAULT_BASE_URL,
    logo: `${DEFAULT_BASE_URL}/assets/wordpress_media/new-site-logo.svg`,
    description:
      'Income Estate curates high-yield pre-leased resort assets and commercial real estate for structured investor returns.',
    sameAs: [],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
    />
  )
}

/**
 * Renders raw JSON-LD schema provided by Yoast SEO (seo.schema.raw) inside a script tag.
 * Fallback to Organization JSON-LD if no Yoast schema is present.
 */
export function YoastJsonLd({ schemaRaw }: { schemaRaw?: string }) {
  if (!schemaRaw) {
    return <OrganizationJsonLd />
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: schemaRaw }}
    />
  )
}
