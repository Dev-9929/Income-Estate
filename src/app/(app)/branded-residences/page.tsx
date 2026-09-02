'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { PreFooterCta } from '@/components/home/PreFooterCta'
import { CalculatorModal } from '@/components/modals/CalculatorModal'
import { brandedResidencesListingData, propertyPageFaqs } from '@/data/properties-data'

export default function BrandedResidencesPage() {
  const [isCalcOpen, setIsCalcOpen] = useState(false)
  const [openFaqIds, setOpenFaqIds] = useState<string[]>(['p-faq-2'])

  const toggleFaq = (id: string) => {
    setOpenFaqIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  return (
    <div className="main-wrapper">
      {/* Header / Navigation */}
      <Header />

      {/* Hero Banner */}
      <section className="properties-hero">
        <h1 className="properties-hero-title">BRANDED RESIDENCES</h1>
      </section>

      {/* Catalog Body */}
      <main className="container section-padding">
        {/* Breadcrumbs */}
        <nav className="breadcrumbs" aria-label="breadcrumb">
          <Link href="/">Home</Link>
          <span>&gt;</span>
          Branded Residences
        </nav>

        {/* Header Section */}
        <div className="catalog-header" style={{ marginBottom: '3rem' }}>
          <h1
            className="catalog-title"
            style={{
              fontFamily: 'var(--font-serif)',
              fontWeight: 500,
              color: 'var(--primary)',
              fontSize: '2.25rem',
              textAlign: 'center',
            }}
          >
            Branded Residences
          </h1>
        </div>

        {/* Properties Grid */}
        <div className="catalog-grid" id="properties-grid">
          {brandedResidencesListingData.map((item) => (
            <div key={item.id} className="catalog-card" id={`catalog-card-${item.id}`}>
              <Link href={`/properties/${item.slug}`}>
                <div className="card-img-wrap">
                  <img src={item.image} alt={item.title} />
                </div>
              </Link>
              <div className="catalog-card-body">
                <Link href={`/properties/${item.slug}`}>
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
                    {item.units && (
                      <div className="catalog-card-detail-item">
                        <span className="catalog-card-detail-val">{item.units}</span>
                        <span className="catalog-card-detail-lbl">TOTAL UNITS</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="catalog-card-actions">
                  <Link href={`/branded-residences`} className="btn btn-catalog-invest">
                    INVEST NOW
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
          ))}
        </div>
      </main>

      {/* FAQ Section */}
      <section className="section-padding faq-section" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="container faq-grid">
          <div className="faq-left">
            <h2
              className="faq-left-title"
              style={{
                fontFamily: 'var(--font-sans)',
                fontWeight: 700,
                color: 'var(--primary)',
                fontSize: '2.25rem',
                marginBottom: '1.5rem',
              }}
            >
              FAQ
            </h2>
            <p className="faq-left-desc" style={{ color: '#666666', fontSize: '0.95rem', lineHeight: 1.6 }}>
              Everything you need to know about us as brand.
            </p>
          </div>

          <div className="faq-accordion" id="faq-accordion-container">
            {propertyPageFaqs.map((faq) => {
              const isOpen = openFaqIds.includes(faq.id)
              return (
                <div key={faq.id} className={`faq-item ${isOpen ? 'active' : ''}`}>
                  <div
                    className="faq-header-row"
                    onClick={() => toggleFaq(faq.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    <span className="faq-question">{faq.question}</span>
                    <div className="faq-icon-btn">
                      <svg
                        viewBox="0 0 24 24"
                        style={{
                          transform: isOpen ? 'rotate(45deg)' : 'none',
                          transition: 'transform 0.3s ease',
                        }}
                      >
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    </div>
                  </div>
                  {isOpen && (
                    <div className="faq-answer" style={{ display: 'block' }}>
                      <div className="faq-answer-inner">
                        <p style={{ marginBottom: faq.bullets ? '0.75rem' : 0 }}>{faq.answer}</p>
                        {faq.bullets && (
                          <ul
                            style={{
                              listStyle: 'none',
                              paddingLeft: 0,
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '0.4rem',
                            }}
                          >
                            {faq.bullets.map((bullet, idx) => (
                              <li
                                key={idx}
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '0.5rem',
                                  fontWeight: 600,
                                  color: 'var(--primary)',
                                }}
                              >
                                <span
                                  style={{
                                    color: 'var(--accent)',
                                    fontSize: '1.2rem',
                                    lineHeight: 1,
                                  }}
                                >
                                  &bull;
                                </span>{' '}
                                {bullet}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Pre-Footer CTA */}
      <PreFooterCta />

      {/* Global Footer */}
      <Footer />

      {/* Interactive Calculator Modal */}
      <CalculatorModal isOpen={isCalcOpen} onClose={() => setIsCalcOpen(false)} />
    </div>
  )
}
