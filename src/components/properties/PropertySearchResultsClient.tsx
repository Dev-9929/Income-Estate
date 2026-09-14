'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { PreFooterCta } from '@/components/home/PreFooterCta'
import { CalculatorModal } from '@/components/modals/CalculatorModal'
import { FaqSection } from '@/components/common/FaqSection'
import { SearchEngineResponse, SearchResultItem } from '@/lib/search'
import { propertyPageFaqs } from '@/data/properties-data'

interface PropertySearchResultsClientProps {
  searchData: SearchEngineResponse
  initialQuery: string
}

export function PropertySearchResultsClient({
  searchData,
  initialQuery,
}: PropertySearchResultsClientProps) {
  const [isCalcOpen, setIsCalcOpen] = useState(false)
  const [queryInput, setQueryInput] = useState(initialQuery)

  const results = searchData.results || []

  return (
    <div className="main-wrapper">
      <Header />

      {/* Hero Banner */}
      <section className="properties-hero">
        <h1 className="properties-hero-title">SEARCH RESULTS</h1>
      </section>

      {/* Catalog Body */}
      <main className="container section-padding">
        {/* Breadcrumbs */}
        <nav className="breadcrumbs" aria-label="breadcrumb">
          <Link href="/">Home</Link>
          <span>&gt;</span>
          <Link href="/roi-properties">Properties</Link>
          <span>&gt;</span>
          <span>Search Results</span>
        </nav>

        {/* Search Context Header */}
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span className="editorial-tag" style={{ color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '0.78rem', fontWeight: 700 }}>
                CURATED SEARCH
              </span>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 600, color: 'var(--primary)', marginTop: '0.2rem', marginBottom: '0.4rem' }}>
                Results for &ldquo;{initialQuery}&rdquo;
              </h2>
              <p style={{ color: '#666', fontSize: '0.9rem', margin: 0 }}>
                {searchData.totalResults > 0
                  ? `Found ${searchData.totalResults} matching investment ${searchData.totalResults === 1 ? 'property' : 'properties'} ranked by relevance.`
                  : 'No exact property matches found. Explore our trending portfolios below.'}
              </p>
            </div>

            <Link
              href="/roi-properties"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.82rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'var(--primary)',
                padding: '0.6rem 1.25rem',
                borderRadius: '6px',
                border: '1px solid var(--border-color)',
                backgroundColor: '#FFFFFF',
              }}
            >
              View All Properties
            </Link>
          </div>
        </div>

        {/* Properties Results Grid */}
        {results.length > 0 ? (
          <div className="catalog-grid" id="properties-search-grid">
            {results.map((item) => {
              const cat =
                item.category === 'branded-residences' || item.category === 'other-properties'
                  ? item.category
                  : 'roi-properties'
              const detailHref = `/${cat}/${item.slug}`
              return (
                <div key={item.id} className="catalog-card">
                  <Link href={detailHref}>
                    <div className="card-img-wrap">
                      <img src={item.image} alt={item.title} />
                    </div>
                  </Link>
                  <div className="catalog-card-body">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-100 text-amber-900">
                        {item.categoryLabel}
                      </span>
                      {item.yieldDisplay && (
                        <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                          {item.yieldDisplay}
                        </span>
                      )}
                    </div>
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
                      <div className="catalog-card-details-row" style={{ display: 'flex', gap: '3.5rem', width: '100%' }}>
                        <div className="catalog-card-detail-item">
                          <span className="catalog-card-detail-val">{item.investmentDisplay}</span>
                          <span className="catalog-card-detail-lbl">INVESTMENT</span>
                        </div>
                        {item.yieldDisplay && (
                          <div className="catalog-card-detail-item">
                            <span className="catalog-card-detail-val">{item.yieldDisplay}</span>
                            <span className="catalog-card-detail-lbl">ANNUAL YIELD</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="catalog-card-actions">
                      <Link href={detailHref} className="btn btn-catalog-invest">
                        VIEW PROPERTY
                      </Link>
                      <button
                        type="button"
                        className="btn btn-catalog-calc btn-calc"
                        onClick={() => setIsCalcOpen(true)}
                      >
                        CALCULATE YIELD
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          /* Empty State */
          <div
            style={{
              textAlign: 'center',
              padding: '4rem 2rem',
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              border: '1px solid var(--border-color)',
            }}
          >
            <h3 style={{ fontSize: '1.4rem', color: 'var(--primary)', marginBottom: '0.75rem' }}>
              No Properties Found Matching &ldquo;{initialQuery}&rdquo;
            </h3>
            <p style={{ color: '#666', maxWidth: '500px', margin: '0 auto 2rem auto', fontSize: '0.92rem' }}>
              Try searching with broader terms like &ldquo;Goa&rdquo;, &ldquo;Dubai&rdquo;, &ldquo;Commercial&rdquo;, or &ldquo;12% yield&rdquo;.
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              <Link href="/properties?search=Goa%20Luxury%20Resorts" className="btn btn-catalog-invest" style={{ fontSize: '0.8rem' }}>
                Goa Luxury Resorts
              </Link>
              <Link href="/properties?search=Pre-Leased%20Commercial" className="btn btn-catalog-invest" style={{ fontSize: '0.8rem' }}>
                Pre-Leased Commercial
              </Link>
              <Link href="/properties?search=Dubai%20Branded%20Residences" className="btn btn-catalog-invest" style={{ fontSize: '0.8rem' }}>
                Dubai Branded Residences
              </Link>
              <Link href="/properties?search=12%25%2B%20Net%20Annual%20Yield" className="btn btn-catalog-invest" style={{ fontSize: '0.8rem' }}>
                12%+ Annual Yield
              </Link>
            </div>
          </div>
        )}
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
