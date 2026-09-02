'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { PreFooterCta } from '@/components/home/PreFooterCta'
import { CalculatorModal } from '@/components/modals/CalculatorModal'

export default function ServicesPage() {
  const [isCalcOpen, setIsCalcOpen] = useState(false)

  return (
    <div className="main-wrapper">
      {/* Header / Navigation */}
      <Header />

      {/* Hero Banner */}
      <section className="services-hero">
        <h1 className="services-hero-title">OUR SERVICES</h1>
      </section>

      {/* Main Services Layout */}
      <main className="container section-padding">
        {/* Breadcrumbs */}
        <nav className="breadcrumbs" aria-label="breadcrumb" style={{ marginBottom: '2rem' }}>
          <Link href="/">Home</Link>
          <span>&gt;</span>
          Our Services
        </nav>

        <div
          className="section-title-group center text-center"
          style={{ maxWidth: '800px', margin: '0 auto 5rem auto' }}
        >
          <span className="section-subtitle">Core Expertise</span>
          <h2 className="section-title">Investment Solutions We Provide</h2>
          <p className="section-desc">
            At Income Estate, we have built a structured ecosystem to simplify fractional resort
            investing. Here is how we bridge the gap between premium real estate assets and
            consistent returns.
          </p>
        </div>

        <div className="services-grid-main">
          {/* Service 1 */}
          <div className="service-card-expanded">
            <div className="service-icon-wrap">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="12" cy="12" r="10" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </div>
            <h3 className="service-title-expanded">1. Premium Asset Curation</h3>
            <p className="service-desc-expanded">
              We conduct extensive operational and legal due diligence to curate institutional-grade
              commercial resort assets. Our team evaluates micro-locations, developer histories, and
              regional tourist footfalls before listing any asset.
            </p>
            <ul className="service-bullets">
              <li>
                <svg viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
                Developer history checks
              </li>
              <li>
                <svg viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
                Micro-market yield modeling
              </li>
              <li>
                <svg viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
                Independent structural valuation
              </li>
            </ul>
          </div>

          {/* Service 2 */}
          <div className="service-card-expanded">
            <div className="service-icon-wrap">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <h3 className="service-title-expanded">2. Sale-Leaseback Engineering</h3>
            <p className="service-desc-expanded">
              Every project is wrapped in a professionally structured Sale-Leaseback (SLB) framework.
              This ensures that the resort developer remains legally committed to operating the
              property and paying out pre-defined rental distributions.
            </p>
            <ul className="service-bullets">
              <li>
                <svg viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
                Contractual rental guarantees
              </li>
              <li>
                <svg viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
                Inflation-indexed escalations
              </li>
              <li>
                <svg viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
                Clear legal title structures
              </li>
            </ul>
          </div>

          {/* Service 3 */}
          <div className="service-card-expanded">
            <div className="service-icon-wrap">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <h3 className="service-title-expanded">3. Developer-Led Operations</h3>
            <p className="service-desc-expanded">
              We oversee the post-purchase asset management, ensuring you enjoy a completely passive
              investment. The property maintenance, hospitality management, customer care, and
              occupancy mapping are handled fully by the developer.
            </p>
            <ul className="service-bullets">
              <li>
                <svg viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
                Complete hands-off ownership
              </li>
              <li>
                <svg viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
                Quarterly operational reports
              </li>
              <li>
                <svg viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
                Automated rental distributions
              </li>
            </ul>
          </div>

          {/* Service 4 */}
          <div className="service-card-expanded">
            <div className="service-icon-wrap">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
              </svg>
            </div>
            <h3 className="service-title-expanded">4. Exit & Secondary Market</h3>
            <p className="service-desc-expanded">
              We provide structured liquidity channels to make exiting your investments
              straightforward. Owners can list their fractional holdings on our secondary
              marketplace, trade with other verified members, or opt for bulk buyback windows.
            </p>
            <ul className="service-bullets">
              <li>
                <svg viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
                Secondary trading marketplace
              </li>
              <li>
                <svg viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
                Developer buyout options
              </li>
              <li>
                <svg viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
                Smooth SPV share transfer
              </li>
            </ul>
          </div>
        </div>

        {/* Safety Section inside Services */}
        <div className="safety-block">
          <div className="safety-left">
            <h2>Designed to Protect Your Capital</h2>
            <p>
              Real estate investments should bring peace of mind. We have designed four core
              compliance shields to ensure your fractional resort co-ownership is safe, secure, and
              fully transparent from day one.
            </p>
          </div>
          <div className="safety-right">
            <div className="safety-grid">
              <div className="safety-card">
                <h4 className="safety-card-title">RERA Registered</h4>
                <p className="safety-card-desc">
                  Every commercial resort project listed is fully RERA registered and vetted for clean
                  development timelines.
                </p>
              </div>
              <div className="safety-card">
                <h4 className="safety-card-title">SPV Protection</h4>
                <p className="safety-card-desc">
                  Properties are housed under individual, dedicated SPVs so investor assets are
                  legally separated and protected.
                </p>
              </div>
              <div className="safety-card">
                <h4 className="safety-card-title">Escrow Routing</h4>
                <p className="safety-card-desc">
                  All capital payments are routed directly through SEBI-registered escrow accounts to
                  ensure security of funds.
                </p>
              </div>
              <div className="safety-card">
                <h4 className="safety-card-title">NRI Compliance</h4>
                <p className="safety-card-desc">
                  All transactions are fully FEMA compliant with repatriation documentation processed
                  by our legal desk.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Pre-Footer CTA with Video */}
      <PreFooterCta />

      {/* Global Footer */}
      <Footer />

      {/* Interactive Calculator Modal */}
      <CalculatorModal isOpen={isCalcOpen} onClose={() => setIsCalcOpen(false)} />
    </div>
  )
}
