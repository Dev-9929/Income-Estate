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

/**
 * Maps Yoast SEO data from WPGraphQL into Next.js Metadata API format.
 */
export function generateWPSEOMetadata(options: SEOMetadataOptions): Metadata {
  const {
    seoData,
    fallbackTitle = 'Income Estate | Fractional Real Estate Investments',
    fallbackDesc = 'Invest in high-yield commercial real estate, branded residences, and luxury resorts with transparent monthly ROI.',
    fallbackCanonical = 'https://income-estate.com',
    fallbackImage = 'https://income-estate.com/assets/wordpress_media/Sale-Leaseback-Model.jpg',
  } = options

  const title = seoData?.title || fallbackTitle
  const description = seoData?.metaDesc || fallbackDesc
  const canonical = seoData?.canonical || fallbackCanonical
  const ogImage =
    (seoData && 'opengraphImage' in seoData && seoData.opengraphImage?.sourceUrl)
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
 * Renders raw JSON-LD schema provided by Yoast SEO (seo.schema.raw) inside a script tag.
 */
export function YoastJsonLd({ schemaRaw }: { schemaRaw?: string }) {
  if (!schemaRaw) return null

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: schemaRaw }}
    />
  )
}
