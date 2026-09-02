'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { PreFooterCta } from '@/components/home/PreFooterCta'
import { CalculatorModal } from '@/components/modals/CalculatorModal'

export default function NriDeskPage() {
  const [isCalcOpen, setIsCalcOpen] = useState(false)

  return (
    <div className="main-wrapper">
      {/* Header / Navigation */}
      <Header />

      {/* Hero Banner */}
      <section className="nri-hero">
        <h1 className="nri-hero-title">NRI INVESTMENTS DESK</h1>
      </section>

      {/* Main Content */}
      <main className="container section-padding">
        {/* Breadcrumbs */}
        <nav className="breadcrumbs" aria-label="breadcrumb" style={{ marginBottom: '2rem' }}>
          <Link href="/">Home</Link>
          <span>&gt;</span>
          NRI Desk
        </nav>

        <div
          className="section-title-group center text-center"
          style={{ maxWidth: '800px', margin: '0 auto 5rem auto' }}
        >
          <span className="section-subtitle">Dedicated Foreign desk</span>
          <h2 className="section-title">Seamless Global Co-Ownership</h2>
          <p className="section-desc">
            Investing in Indian real estate from abroad should be simple. Our dedicated NRI desk
            provides end-to-end support to ensure your transactions are seamless, compliant, and
            highly secure.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="nri-benefits-grid">
          {/* Card 1 */}
          <div className="nri-benefit-card">
            <div className="nri-benefit-icon">
              <svg
                viewBox="0 0 24 24"
                width={26}
                height={26}
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <h3 className="nri-benefit-title">FEMA & Tax Compliance</h3>
            <p className="nri-benefit-desc">
              We structure all investments to meet Foreign Exchange Management Act (FEMA)
              guidelines. Our team manages NRE/NRO transfers, repatriation certificates (15CA/15CB),
              and PAN card setups.
            </p>
          </div>

          {/* Card 2 */}
          <div className="nri-benefit-card">
            <div className="nri-benefit-icon">
              <svg
                viewBox="0 0 24 24"
                width={26}
                height={26}
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M12 2a10 10 0 0 1 10 10c0 5.523-4.477 10-10 10S2 17.523 2 12A10 10 0 0 1 12 2z" />
                <path d="M12 6v6l4 2" />
              </svg>
            </div>
            <h3 className="nri-benefit-title">Repatriable Yields</h3>
            <p className="nri-benefit-desc">
              Enjoy hands-off monthly or quarterly rental yield distributions sent directly to your
              NRE or NRO accounts, fully repatated to your local country in compliance with the RBI
              guidelines.
            </p>
          </div>

          {/* Card 3 */}
          <div className="nri-benefit-card">
            <div className="nri-benefit-icon">
              <svg
                viewBox="0 0 24 24"
                width={26}
                height={26}
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
              </svg>
            </div>
            <h3 className="nri-benefit-title">Personalized Advisor Desk</h3>
            <p className="nri-benefit-desc">
              Access direct, dedicated NRI advisors who coordinate timelines and process paperless
              documentation globally, catering to USA, Europe, Canada, and Middle East time zones.
            </p>
          </div>
        </div>

        {/* Timeline Flow */}
        <div className="nri-flow-section">
          <div className="nri-flow-title-group">
            <h2>Your Investment & Repatriation Timeline</h2>
            <p>A transparent, structured legal flow designed for global investors.</p>
          </div>
          <div className="nri-steps-grid">
            {/* Step 1 */}
            <div className="nri-step-card">
              <div className="nri-step-num">01</div>
              <h4 className="nri-step-title">NRE/NRO Remittance</h4>
              <p className="nri-step-desc">
                Transfer investment capital via international bank wire from NRE or NRO account
                directly to our SEBI-registered escrow account.
              </p>
            </div>

            {/* Step 2 */}
            <div className="nri-step-card">
              <div className="nri-step-num">02</div>
              <h4 className="nri-step-title">SPV Registration</h4>
              <p className="nri-step-desc">
                Your fractional co-ownership shares in the property&apos;s dedicated SPV are officially
                recorded, and digital share certificates are issued.
              </p>
            </div>

            {/* Step 3 */}
            <div className="nri-step-card">
              <div className="nri-step-num">03</div>
              <h4 className="nri-step-title">Rental Payouts</h4>
              <p className="nri-step-desc">
                Quarterly or monthly rental revenues are calculated and distributed by the SPV
                directly to your NRO/NRE account.
              </p>
            </div>

            {/* Step 4 */}
            <div className="nri-step-card">
              <div className="nri-step-num">04</div>
              <h4 className="nri-step-title">Easy Repatriation</h4>
              <p className="nri-step-desc">
                Our legal desk coordinates tax certifications (15CA/CB) to facilitate outward
                repatriation of rental yields and capital gains.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Pre-Footer CTA */}
      <PreFooterCta />

      {/* Global Footer */}
      <Footer />

      {/* Interactive Calculator Modal */}
      <CalculatorModal isOpen={isCalcOpen} onClose={() => setIsCalcOpen(false)} />
    </div>
  )
}
