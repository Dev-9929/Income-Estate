import React from 'react'
import type { Metadata } from 'next'
import { generateWPSEOMetadata, YoastJsonLd } from '@/lib/seo'
import { getWordPressPageBySlug } from '@/lib/wordpress'
import { ContactClient } from './ContactClient'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://income-estate.com'
  const wpPage = (await getWordPressPageBySlug('contact')) || (await getWordPressPageBySlug('contact-us'))

  return generateWPSEOMetadata({
    seoData: wpPage?.seo,
    fallbackTitle: 'Contact Us | Schedule Investor Consultation | Income Estate',
    fallbackDesc:
      'Get in touch with the Income Estate investment advisory desk. Speak with real estate specialists in Jaipur & global office locations.',
    fallbackCanonical: `${baseUrl}/contact`,
  })
}

export default async function ContactPage() {
  const wpPage = (await getWordPressPageBySlug('contact')) || (await getWordPressPageBySlug('contact-us'))

  return (
    <>
      <YoastJsonLd schemaRaw={wpPage?.seo?.schema?.raw} />
      <ContactClient />
    </>
  )
}
