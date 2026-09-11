'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { PreFooterCta } from '@/components/home/PreFooterCta'
import { CalculatorModal } from '@/components/modals/CalculatorModal'

interface StepDetail {
  num: string
  label: string
  badge: string
  title: string
  desc: string
  image: string
  checklist: string[]
}

const stepsData: StepDetail[] = [
  {
    num: '01',
    label: 'Explore',
    badge: 'Step 01',
    title: 'Explore Curated Properties',
    desc: 'Browse income-generating resort and commercial properties pre-verified for real returns. Check complete financial statements, projected yields, and developer agreements.',
    image: '/assets/turban_resort.png',
    checklist: [
      'Curated High-Yield Assets',
      'Pre-Verified SLB Returns',
      'Detailed Financial Forecasts',
      'Transparent Project Audits',
    ],
  },
  {
    num: '02',
    label: 'Consult',
    badge: 'Step 02',
    title: 'Schedule A Call with us',
    desc: 'Connect with our team to review ROI and lease terms, understand builder commitments, schedule property visit (physical/virtual) and evaluate risk and returns.',
    image: '/assets/advisor.png',
    checklist: [
      '1-on-1 Advisor Session',
      'Dedicated NRI Desk',
      'Virtual or Site Visits',
      'FEMA Compliance Guide',
    ],
  },
  {
    num: '03',
    label: 'Invest',
    badge: 'Step 03',
    title: 'Make Payment & Own',
    desc: 'Proceed with documentation, direct bank payment to builder, and finalizing the co-ownership agreement. Our legal team guides you through a smooth, fully escrow-routed process.',
    image: '/assets/london_street.png',
    checklist: [
      'Digital KYC Check',
      'Escrow-Routed Payouts',
      'Registered Sale Deed',
      'Co-ownership Certificate',
    ],
  },
  {
    num: '04',
    label: 'Earn',
    badge: 'Step 04',
    title: 'Earn Assured Monthly Returns',
    desc: 'Start receiving pre-defined returns under Sale & Leaseback (SLB) agreements, completely managed by the developer. No tenant problems, no upkeep issues.',
    image: '/assets/aryaville_resort.png',
    checklist: [
      'Direct Monthly Payouts',
      'Real-Time Dashboard',
      'Zero Landlord Worry',
      'End-to-end Property Upkeep',
    ],
  },
  {
    num: '05',
    label: 'Hold & Exit',
    badge: 'Step 05',
    title: 'Hold or Exit Anytime',
    desc: 'Hold your fractional shares to continuously earn passive yield, or exit easily via co-ownership transfer, secondary marketplace listing, or predefined exit windows.',
    image: '/assets/skyline_arcade.png',
    checklist: [
      'Secondary Marketplace Exit',
      'Asset Liquidation Windows',
      'Flexible Tenure Models',
      'Audited Capital Appreciation',
    ],
  },
]

export function HowItWorksClient() {
  const [activeStep, setActiveStep] = useState(1)
  const [isCalcOpen, setIsCalcOpen] = useState(false)

  const currentStepData = stepsData[activeStep - 1] || stepsData[0]

  return (
    <div className="main-wrapper">
      {/* Header / Navigation */}
      <Header />

      {/* Hero Banner */}
      <section className="how-it-works-hero">
        <h1 className="how-it-works-hero-title">HOW IT WORKS</h1>
      </section>

      {/* Main Content */}
      <main className="container section-padding">
        {/* Breadcrumbs */}
        <nav className="breadcrumbs" aria-label="breadcrumb">
          <Link href="/">Home</Link>
          <span>&gt;</span>
          How it Works
        </nav>

        {/* Horizontal Interactive Steps Navigation */}
        <div className="steps-tabs-container">
          <div className="steps-timeline-line" />

          {stepsData.map((step, idx) => (
            <div
              key={step.num}
              className={`step-tab ${activeStep === idx + 1 ? 'active' : ''}`}
              onClick={() => setActiveStep(idx + 1)}
              style={{ cursor: 'pointer' }}
            >
              <div className="step-tab-num">{step.num}</div>
              <span className="step-tab-label">{step.label}</span>
            </div>
          ))}
        </div>

        {/* Steps Content Panels */}
        <div className="steps-content-container">
          <div className="step-panel active" id={`step-panel-${activeStep}`}>
            <div className="step-panel-inner">
              <div className="step-panel-text">
                <span className="step-badge">{currentStepData.badge}</span>
                <h2 className="step-panel-title">{currentStepData.title}</h2>
                <p className="step-panel-desc">{currentStepData.desc}</p>
                <ul className="step-checklist">
                  {currentStepData.checklist.map((item, idx) => (
                    <li key={idx}>
                      <svg viewBox="0 0 24 24">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="step-panel-visual">
                <img src={currentStepData.image} alt={currentStepData.title} />
              </div>
            </div>
          </div>
        </div>

        {/* Trust & Security Panel */}
        <section className="trust-section">
          <div className="trust-header">
            <h2 className="trust-title">Security &amp; Trust framework</h2>
            <p className="trust-subtitle">
              Your fractional property investment is secured by clear legal protections, escrow
              routing, and FEMA compliance desks.
            </p>
          </div>
          <div className="trust-grid">
            {/* Card 1 */}
            <div className="trust-card">
              <div className="trust-icon-wrap">
                <svg viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="1.5">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              <h3 className="trust-card-title">ESCROW ROUTED FUNDS</h3>
              <p className="trust-card-desc">
                All transactions are managed through bank escrow accounts. Capital is strictly
                released under milestone registration and RERA audits.
              </p>
            </div>

            {/* Card 2 */}
            <div className="trust-card">
              <div className="trust-icon-wrap">
                <svg viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </div>
              <h3 className="trust-card-title">FEMA &amp; NRI REPATRIATION</h3>
              <p className="trust-card-desc">
                Structured pathways for seamless international transactions, NRE/NRO repatriation,
                and complete FEMA compliance audits.
              </p>
            </div>

            {/* Card 3 */}
            <div className="trust-card">
              <div className="trust-icon-wrap">
                <svg viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="1.5">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
              </div>
              <h3 className="trust-card-title">LEGAL TRUSTEE CUSTODY</h3>
              <p className="trust-card-desc">
                Independent title trustees audit and register co-ownership, ensuring legal title
                custody and protection of fractional shares.
              </p>
            </div>
          </div>
        </section>
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
