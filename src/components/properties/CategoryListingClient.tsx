'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { PreFooterCta } from '@/components/home/PreFooterCta'
import { CalculatorModal } from '@/components/modals/CalculatorModal'
import { FaqSection } from '@/components/common/FaqSection'
import { PropertyListingItem, propertyPageFaqs } from '@/data/properties-data'

interface CategoryListingClientProps {
  categorySlug: string
  categoryTitle: string
  properties: PropertyListingItem[]
}

export function CategoryListingClient({
  categorySlug,
  categoryTitle,
  properties,
}: CategoryListingClientProps) {
  const [isCalcOpen, setIsCalcOpen] = useState(false)

  return (
    <div className="main-wrapper">
      <Header />

      {/* Hero Banner */}
      <section className="properties-hero">
        <h1 className="properties-hero-title">{categoryTitle.toUpperCase()}</h1>
      </section>

      {/* Catalog Body */}
      <main className="container section-padding">
        {/* Breadcrumbs */}
        <nav className="breadcrumbs" aria-label="breadcrumb">
          <Link href="/">Home</Link>
          <span>&gt;</span>
          <span>{categoryTitle}</span>
        </nav>



        {/* Properties Grid */}
        <div className="catalog-grid" id="properties-grid">
          {properties.map((item) => {
            const cat = item.category || categorySlug
            const detailHref = `/${cat}/${item.slug}`
            return (
              <div key={item.id} className="catalog-card" id={`catalog-card-${item.id}`}>
                <Link href={detailHref}>
                  <div className="card-img-wrap">
                    <img src={item.image} alt={item.title} />
                  </div>
                </Link>
                <div className="catalog-card-body">
                  <Link href={detailHref}>
                    <h3 className="catalog-card-title">{item.title}</h3>
                  </Link>
                  <div className="catalog-card-location">
                    <svg viewBox="0 0 24 24">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <span>{item.location}</span>
                  </div>
                  <div className="catalog-card-details">
                    <div
                      className="catalog-card-details-row"
                      style={{ display: 'flex', gap: '3.5rem', width: '100%' }}
                    >
                      <div className="catalog-card-detail-item">
                        <span className="catalog-card-detail-val">{item.investment}</span>
                        <span className="catalog-card-detail-lbl">INVESTMENT</span>
                      </div>
                      {item.roi && (
                        <div className="catalog-card-detail-item">
                          <span className="catalog-card-detail-val">{item.roi}</span>
                          <span className="catalog-card-detail-lbl">ANNUAL ROI</span>
                        </div>
                      )}
                      {item.units && (
                        <div className="catalog-card-detail-item">
                          <span className="catalog-card-detail-val">{item.units}</span>
                          <span className="catalog-card-detail-lbl">TOTAL UNITS</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="catalog-card-actions">
                    <Link href={detailHref} className="btn btn-catalog-invest">
                      START INVEST
                    </Link>
                    <button
                      type="button"
                      className="btn btn-catalog-calc btn-calc"
                      onClick={() => setIsCalcOpen(true)}
                    >
                      CALCULATE INVESTMENT
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </main>

      {/* Properties FAQ Section */}
      <FaqSection
        tag="Got Questions?"
        title={
          <>
            Frequently<br />
            Asked <em>Questions</em>
          </>
        }
        description="Everything you need to know about fractional investments, returns, and property compliance."
        faqs={propertyPageFaqs}
        backgroundColor="#FFFFFF"
        id="faq"
      />

      <PreFooterCta />
      <Footer />
      <CalculatorModal isOpen={isCalcOpen} onClose={() => setIsCalcOpen(false)} />
    </div>
  )
}
