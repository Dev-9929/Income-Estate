'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { PreFooterCta } from '@/components/home/PreFooterCta'
import { CalculatorModal } from '@/components/modals/CalculatorModal'

export default function AboutPage() {
  const [isCalcOpen, setIsCalcOpen] = useState(false)

  return (
    <div className="main-wrapper">
      {/* Header / Navigation */}
      <Header />

      {/* Hero Banner */}
      <section className="about-hero">
        <h1 className="about-hero-title">ABOUT US</h1>
      </section>

      {/* Main Content */}
      <main className="container section-padding">
        {/* Breadcrumbs */}
        <nav className="breadcrumbs" aria-label="breadcrumb">
          <Link href="/">Home</Link>
          <span>&gt;</span>
          About Us
        </nav>

        {/* Our Story Section */}
        <section className="story-section">
          <h2 className="story-title">Our Story</h2>
          <p className="story-subtitle">
            Every strong venture begins with a gap in the market and more importantly, the experience
            to recognize it.
          </p>

          <p className="story-text">
            For years, real estate in India has been driven by speculation, fragmented information,
            and limited transparency, especially for investors seeking predictable returns. While
            opportunities existed, access to structured, income-generating assets remained limited.
          </p>
          <p className="story-text">
            Recognizing the gap through decades of experience, <strong>Aman Duggal</strong> and{' '}
            <strong>Vikram Swami</strong> came together to build a platform that redefines how real
            estate investments are approached.
          </p>
          <p className="story-text">The Income Estate was created to change that.</p>
          <p className="story-text">
            It was built on a single belief that investors deserve verified, income-generating real
            estate backed by real data. Simplifying how investors discover, evaluate, and access
            real estate investments bringing clarity, structure, and trust into a traditionally
            complex ecosystem.
          </p>
          <p className="story-text">
            Today, Income Estate is a focused, ROI-first focused platform delivered through a digital
            infrastructure that ensures equal access for investors anywhere in the world.
          </p>
        </section>

        {/* Our Founders Section */}
        <section className="founders-section">
          <h2 className="founders-title">Our Founders</h2>

          {/* Founder 1: Aman Duggal */}
          <div className="founder-card-container">
            <div className="founder-offset-bg" />
            <div className="founder-card-luxury">
              <div className="founder-img-wrap">
                <img src="/assets/wordpress_media/aman.jpeg" alt="Mr. Aman Duggal" />
              </div>
              <div className="founder-info">
                <h3 className="founder-name">Mr. Aman Duggal</h3>
                <p className="founder-bio">
                  With over 22 years of experience in the Indian real estate market, Aman brings a
                  deep understanding of property value, investor psychology, and market dynamics.
                </p>
                <p className="founder-bio">
                  His journey has been shaped not just by transactions, but by recognizing the
                  structural inefficiencies in how real estate is positioned for investors. His
                  philosophy is simple and clear:
                </p>
                <p className="founder-quote">
                  &ldquo;Real estate wealth is built on income, not speculation.&rdquo;
                </p>
              </div>
            </div>
          </div>

          {/* Founder 2: Vikram Swami */}
          <div className="founder-card-container">
            <div className="founder-offset-bg" />
            <div className="founder-card-luxury">
              <div className="founder-img-wrap">
                <img
                  src="/assets/wordpress_media/vikram-swami-new.jpg"
                  alt="Mr. Vikram Swami"
                />
              </div>
              <div className="founder-info">
                <h3 className="founder-name">Mr. Vikram Swami</h3>
                <p className="founder-bio">
                  With over 20 years of experience in the IT industry, Vikram has built and scaled
                  performance-driven digital ecosystems and user-centric platforms.
                </p>
                <p className="founder-bio">
                  His expertise lies in creating systems that bridge gaps between opportunity and
                  access. Observing the disconnect between high-quality real estate assets and
                  investor reach, he identified the need for a platform that delivers structured,
                  transparent access at scale.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Pillars Section */}
        <section className="pillars-section" style={{ display: 'block' }}>
          <h2 className="story-title" style={{ textAlign: 'center', marginBottom: '2rem' }}>
            Our Pillars
          </h2>

          <div className="pillars-grid-luxury">
            {/* Pillar 1 */}
            <div className="pillar-card-luxury">
              <div className="pillar-card-num">01</div>
              <h3 className="pillar-card-title">Income-First Approach</h3>
              <p className="pillar-card-desc">
                We prioritize returns over speculation, ensuring every opportunity is built around
                structured income potential.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="pillar-card-luxury">
              <div className="pillar-card-num">02</div>
              <h3 className="pillar-card-title">Verified Opportunities</h3>
              <p className="pillar-card-desc">
                Each property is evaluated for ROI, lease structure, and financial transparency
                before being presented to investors.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="pillar-card-luxury">
              <div className="pillar-card-num">03</div>
              <h3 className="pillar-card-title">Structured Investments</h3>
              <p className="pillar-card-desc">
                Our offerings are aligned with Sale & Leaseback models, enabling predictable and
                pre-defined returns.
              </p>
            </div>

            {/* Pillar 4 */}
            <div className="pillar-card-luxury">
              <div className="pillar-card-num">04</div>
              <h3 className="pillar-card-title">Transparency & Trust</h3>
              <p className="pillar-card-desc">
                We provide clear, data-backed insights, empowering investors to make informed
                decisions with confidence.
              </p>
            </div>

            {/* Pillar 5 */}
            <div className="pillar-card-luxury">
              <div className="pillar-card-num">05</div>
              <h3 className="pillar-card-title">Access Without Barriers</h3>
              <p className="pillar-card-desc">
                Through a digital-first platform, we ensure seamless access to investment
                opportunities for investors across geographies, including NRIs.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Pre-Footer CTA */}
      <PreFooterCta onConnect={() => setIsCalcOpen(true)} />

      {/* Global Footer */}
      <Footer />

      {/* Interactive Calculator Modal */}
      <CalculatorModal isOpen={isCalcOpen} onClose={() => setIsCalcOpen(false)} />
    </div>
  )
}
