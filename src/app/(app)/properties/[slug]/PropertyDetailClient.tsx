'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { CalculatorModal } from '@/components/modals/CalculatorModal'
import { PropertyDetailItem } from '@/data/property-detail-data'

interface PropertyDetailClientProps {
  property: PropertyDetailItem
}

export function PropertyDetailClient({ property }: PropertyDetailClientProps) {
  const [isCalcOpen, setIsCalcOpen] = useState(false)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0)
  const [showToast, setShowToast] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: '₹ 70L – ₹ 1 Cr',
    message: '',
  })

  const toggleFaq = (index: number) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.name,
          email: formData.email,
          phone: formData.phone,
          budget: formData.interest,
          message: formData.message,
          source: `Property Detail: ${property.title} ${property.titleAccent || ''}`.trim(),
        }),
      })
    } catch (err) {
      console.warn('Property inquiry submission fallback:', err)
    } finally {
      setShowToast(true)
      setTimeout(() => {
        setShowToast(false)
        setFormData({
          name: '',
          email: '',
          phone: '',
          interest: '₹ 70L – ₹ 1 Cr',
          message: '',
        })
      }, 4000)
    }
  }

  return (
    <div className="pd2">
      {/* ============================================================
           FULL-SCREEN CINEMATIC HERO
      ============================================================ */}
      <section className="pd2-hero" id="top">
        {/* Background Image */}
        <div className="pd2-hero-bg">
          <Image
            src={property.heroImage}
            alt={property.title}
            fill
            priority
            sizes="100vw"
            style={{ objectFit: 'cover', objectPosition: 'center 40%' }}
          />
        </div>

        {/* Global Navigation Header */}
        <Header />

        {/* Breadcrumbs Row */}
        <div className="container pd2-breadcrumb-wrap">
          <nav className="pd2-breadcrumb" aria-label="breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep">›</span>
            <Link href="/properties">Properties</Link>
            <span className="sep">›</span>
            <span className="cur">{property.title} {property.titleAccent || ''}</span>
          </nav>
        </div>

        {/* Hero Bottom Content */}
        <div className="pd2-hero-body">
          <div className="pd2-hero-text">
            <div className="pd2-hero-label">{property.heroLabel}</div>
            <h1 className="pd2-hero-name">
              {property.title}
              {property.titleAccent && (
                <>
                  <br />
                  <em>{property.titleAccent}</em>
                </>
              )}
            </h1>
            <div className="pd2-hero-sub">
              <svg viewBox="0 0 24 24" width="14" height="14">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
              {property.location}
            </div>
          </div>

          <div className="pd2-hero-stats">
            <div className="pd2-hs-item">
              <span className="pd2-hs-val">{property.priceStarting}</span>
              <span className="pd2-hs-lbl">Starting Investment</span>
            </div>
            <div className="pd2-hs-item">
              <span className="pd2-hs-val" style={{ color: 'var(--accent)' }}>{property.rentalYield}</span>
              <span className="pd2-hs-lbl">Rental Yield</span>
            </div>
            <div className="pd2-hs-item">
              <span className="pd2-hs-val" style={{ color: 'var(--accent)' }}>{property.targetIrr}</span>
              <span className="pd2-hs-lbl">Target IRR</span>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="pd2-scroll-hint" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="18" height="18" strokeWidth="1.5" fill="none" stroke="currentColor">
            <path d="M12 5v14M5 12l7 7 7-7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Scroll
        </div>
      </section>

      {/* ============================================================
           EDITORIAL INTRO — IMAGE + TEXT
      ============================================================ */}
      <section className="pd2-intro">
        <div className="pd2-intro-inner">
          <div className="pd2-intro-left">
            <div className="pd2-tag-line">{property.overviewTag}</div>
            <h2 className="pd2-intro-heading">
              {property.overviewHeading}<br />
              <em>{property.overviewHeadingAccent}</em>
            </h2>
            <p className="pd2-intro-text">{property.overviewText1}</p>
            <p className="pd2-intro-text">{property.overviewText2}</p>
            <div className="pd2-intro-actions">
              <a href="#enquire" className="pd2-btn-dark">
                Register Interest
                <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                  <path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z" />
                </svg>
              </a>
              <a href="#gallery" className="pd2-btn-ghost">View Gallery</a>
            </div>
          </div>

          <div className="pd2-intro-right">
            <div className="pd2-intro-price-tag">
              <span className="amt">{property.priceStarting}</span>
              <span className="lbl">Starts From</span>
            </div>
            <img
              className="pd2-intro-img-main"
              src={property.mainImage}
              alt={`${property.title} Interior View`}
            />
            <img
              className="pd2-intro-img-thumb"
              src={property.thumbImage}
              alt={`${property.title} Detail`}
            />
          </div>
        </div>
      </section>

      {/* ============================================================
           FACTS STRIP — DARK BAR
      ============================================================ */}
      <div className="pd2-facts-strip">
        <div className="pd2-facts-inner">
          {property.facts.map((fact, idx) => (
            <div key={idx} className="pd2-fact">
              <span className="pd2-fact-val">{fact.val}</span>
              <span className="pd2-fact-lbl">{fact.lbl}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ============================================================
           GALLERY — EDITORIAL BENTO GRID
      ============================================================ */}
      <section className="pd2-gallery" id="gallery">
        <div className="pd2-gallery-header">
          <div>
            <div className="pd2-tag-line">Visual Tour</div>
            <h2 className="pd2-gallery-heading">Interiors & Architecture</h2>
          </div>
          <p className="pd2-gallery-desc">Professionally designed spaces blending hospitality, commerce, and premium modern architecture.</p>
        </div>

        <div className="pd2-gallery-grid">
          {property.gallery.map((item, idx) => (
            <div key={idx} className={`pd2-gi ${item.gridClass}`}>
              <img src={item.image} alt={item.label} />
              <div className="pd2-gi-label">{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================
           ROI DEEP DIVE SECTION
      ============================================================ */}
      <section className="pd2-roi-section">
        <div className="pd2-roi-inner">
          <div className="pd2-roi-left">
            <div className="pd2-tag-line">Investment Analysis</div>
            <h2 className="pd2-intro-heading pd2-roi-heading">
              Returns that<br />
              <em>Speak for Themselves</em>
            </h2>
            <p className="pd2-intro-text" style={{ marginTop: '1.5rem' }}>
              {property.title} delivers structured, guaranteed rental income from the very first month of
              investment — backed by institutional-grade tenants and a legally binding lease agreement.
            </p>

            <div className="pd2-roi-metrics">
              {property.roiMetrics.map((metric, idx) => (
                <div key={idx} className="pd2-roi-row">
                  <span className="pd2-roi-row-label">{metric.label}</span>
                  <span className={`pd2-roi-row-val ${metric.isGold ? 'gold' : ''}`}>
                    {metric.val}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pd2-roi-right">
            <div className="pd2-roi-img-stack">
              <img
                className="pd2-roi-img-front"
                src={property.roiFrontImage}
                alt="Building Entrance"
              />
              <img
                className="pd2-roi-img-back"
                src={property.roiBackImage}
                alt="Location Overview"
              />
            </div>

            <div className="pd2-roi-tenant-box">
              <div className="pd2-roi-tenant-title">Operational Tenants & Structure</div>
              <div className="pd2-tenants-list">
                {property.tenants.map((t, idx) => (
                  <div key={idx} className="pd2-tenant-row">
                    <span className="pd2-tenant-name">{t.name}</span>
                    <span className="pd2-tenant-detail">{t.detail}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
           AMENITIES — HOVER GRID
      ============================================================ */}
      <section className="pd2-amenities">
        <div className="pd2-amenities-inner">
          <div className="pd2-amenities-header">
            <div>
              <div className="pd2-tag-line">Property Features</div>
              <h2 className="pd2-amenities-heading">Premium <span className="pd2-desktop-br"><br /></span>Amenities</h2>
            </div>
            <p className="pd2-amenities-desc">
              Hover over any feature to discover what makes this property stand out in its micro-market.
            </p>
          </div>

          <div className="pd2-amenities-grid">
            {property.amenities.map((amenity, idx) => (
              <div key={idx} className="pd2-amenity">
                <div className="pd2-amenity-icon">
                  {amenity.iconType === 'lease' && (
                    <svg viewBox="0 0 24 24">
                      <path d="M2.5 19h19v2h-19zm19.57-9.36c-.21-.8-1.04-1.28-1.84-1.06L14.92 10l-6.9-6.43-1.93.51 4.14 7.17-4.97 1.33-1.97-1.54-1.45.39 2.59 4.49L21 11.49c.81-.23 1.28-1.05 1.07-1.85z" />
                    </svg>
                  )}
                  {amenity.iconType === 'parking' && (
                    <svg viewBox="0 0 24 24">
                      <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5S16.67 13 17.5 13s1.5.67 1.5 1.5S18.33 16 17.5 16zM5 11l1.5-4.5h11L19 11H5z" />
                    </svg>
                  )}
                  {amenity.iconType === 'security' && (
                    <svg viewBox="0 0 24 24">
                      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 4l5 2.18V11c0 3.5-2.33 6.79-5 7.93C9.33 17.79 7 14.5 7 11V7.18L12 5z" />
                    </svg>
                  )}
                  {amenity.iconType === 'view' && (
                    <svg viewBox="0 0 24 24">
                      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                    </svg>
                  )}
                  {amenity.iconType === 'interior' && (
                    <svg viewBox="0 0 24 24">
                      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z" />
                    </svg>
                  )}
                  {amenity.iconType === 'managed' && (
                    <svg viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-6h2v6zm0-8h-2V7h2v2z" />
                    </svg>
                  )}
                  {amenity.iconType === 'pool' && (
                    <svg viewBox="0 0 24 24">
                      <path d="M21 16v-2c-2.24 0-3.76-1.5-6-1.5s-3.76 1.5-6 1.5-3.76-1.5-6-1.5v2c1.76 0 3.24 1.5 5 1.5s3.24-1.5 5-1.5 3.24 1.5 5 1.5 3.24-1.5 5-1.5zm0 4v-2c-2.24 0-3.76-1.5-6-1.5s-3.76 1.5-6 1.5-3.76-1.5-6-1.5v2c1.76 0 3.24 1.5 5 1.5s3.24-1.5 5-1.5 3.24 1.5 5 1.5 3.24-1.5 5-1.5zM6.5 9A2.5 2.5 0 1 0 4 6.5 2.5 2.5 0 0 0 6.5 9z" />
                    </svg>
                  )}
                  {amenity.iconType === 'spa' && (
                    <svg viewBox="0 0 24 24">
                      <path d="M12 2a9 9 0 0 0-9 9c0 4.97 4.03 9 9 9s9-4.03 9-9a9 9 0 0 0-9-9zm0 16a7 7 0 1 1 0-14 7 7 0 0 1 0 14z" />
                    </svg>
                  )}
                </div>
                <span className="pd2-amenity-name">{amenity.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
           LOCATION — CARDS + MAP
      ============================================================ */}
      <section className="pd2-location">
        <div className="pd2-location-inner">
          <div className="pd2-location-top">
            <div>
              <div className="pd2-tag-line">Micro-Market</div>
              <h2 className="pd2-location-heading">Prime Location,<br />Strategic Connectivity</h2>
            </div>
            <p className="pd2-location-desc">{property.locationDesc}</p>
          </div>

          <div className="pd2-map-and-cards">
            <div className="pd2-map-wrap">
              <iframe
                src={property.mapEmbedUrl}
                allowFullScreen
                loading="lazy"
                title={`${property.title} Location Map`}
              />
            </div>

            <div className="pd2-nearby-stack">
              {property.nearby.map((place, idx) => (
                <div key={idx} className="pd2-nearby-item">
                  <div className="pd2-nearby-name">{place.name}</div>
                  <div className="pd2-nearby-dist">{place.dist}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
           PAYMENT PLAN — DARK TABLE
      ============================================================ */}
      <section className="pd2-payment">
        <div className="pd2-payment-inner">
          <div className="pd2-payment-left">
            <div className="pd2-tag-line" style={{ color: 'rgba(255,255,255,0.45)' }}>Flexible Milestones</div>
            <h2 className="pd2-payment-heading">Structured<br />Payment Plan</h2>
            <p className="pd2-payment-desc">
              A clear, milestone-linked payment schedule that aligns with the project&apos;s delivery timeline — no
              hidden costs, no surprises.
            </p>
            <a href="#enquire" className="pd2-payment-cta">
              Download Brochure
              <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
                <path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z" />
              </svg>
            </a>
          </div>

          <div>
            <table className="pd2-payment-table">
              <thead>
                <tr>
                  <th>Milestone</th>
                  <th>Timeline</th>
                  <th style={{ textAlign: 'right' }}>%</th>
                </tr>
              </thead>
              <tbody>
                {property.paymentPlan.map((item, idx) => (
                  <tr key={idx} className={item.isHighlight ? 'first-row' : ''}>
                    <td>{item.milestone}</td>
                    <td>{item.timeline}</td>
                    <td
                      style={{
                        textAlign: 'right',
                        fontFamily: 'var(--font-serif)',
                        fontSize: '1.35rem',
                        fontWeight: 600,
                        color: 'var(--accent)',
                      }}
                    >
                      {item.percent}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ============================================================
           CONSTRUCTION STATUS
      ============================================================ */}
      <section className="pd2-construction">
        <div className="pd2-construction-inner">
          <div className="pd2-construction-header">
            <div>
              <div className="pd2-tag-line">Live Updates</div>
              <h2 className="pd2-construction-heading">Construction Progress</h2>
            </div>
            <p className="pd2-construction-desc">
              Asset developments are inspected regularly with verified third-party site audits and zero development risk.
            </p>
          </div>

          <div className="pd2-construction-grid">
            {property.constructionStages.map((stage, idx) => (
              <div key={idx} className="pd2-const-item">
                <img src={stage.image} alt={`Construction Stage ${idx + 1}`} />
                <div className="pd2-const-overlay">{stage.overlay}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
           ENQUIRY SECTION — FULL WIDTH EDITORIAL
      ============================================================ */}
      <section className="pd2-enquire" id="enquire">
        <div className="pd2-enquire-inner">
          <div className="pd2-enquire-left">
            <div className="pd2-tag-line">Get in Touch</div>
            <h2 className="pd2-enquire-heading">
              Ready to Invest<br />
              in <em>{property.title} {property.titleAccent || ''}?</em>
            </h2>
            <p className="pd2-enquire-text">
              Our dedicated investment advisors are available to walk you through yield projections, ownership
              structure, NRI investment guidelines, and the complete acquisition process — with zero obligation.
            </p>

            <a
              href="https://wa.me/917665212212"
              target="_blank"
              rel="noreferrer"
              className="pd2-wa-btn"
            >
              <svg viewBox="0 0 24 24" width="18" height="18">
                <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.333 4.993L2 22l5.233-1.371a9.936 9.936 0 0 0 4.777 1.224h.005c5.505 0 9.99-4.478 9.99-9.985C22.005 6.477 17.517 2 12.012 2z" />
              </svg>
              WhatsApp Our Advisor
            </a>

            <div className="pd2-trust-row">
              <div className="pd2-trust-item">
                <div className="pd2-trust-val">₹50<span>Cr+</span></div>
                <div className="pd2-trust-desc">Assets Managed</div>
              </div>
              <div className="pd2-trust-item">
                <div className="pd2-trust-val">200<span>+</span></div>
                <div className="pd2-trust-desc">Happy Investors</div>
              </div>
              <div className="pd2-trust-item">
                <div className="pd2-trust-val">5<span>+ Yrs</span></div>
                <div className="pd2-trust-desc">Track Record</div>
              </div>
            </div>
          </div>

          <div className="pd2-form">
            <div className="pd2-form-title">Request Information</div>
            <form onSubmit={handleSubmit}>
              <div className="pd2-input-row">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="pd2-input"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="pd2-input"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div className="pd2-input-row">
                <input
                  type="tel"
                  placeholder="Phone / WhatsApp"
                  className="pd2-input"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
                <select
                  className="pd2-input"
                  value={formData.interest}
                  onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                  style={{ cursor: 'pointer' }}
                >
                  <option>₹ 70L – ₹ 1 Cr</option>
                  <option>₹ 1 Cr – ₹ 2 Cr</option>
                  <option>₹ 2 Cr – ₹ 5 Cr</option>
                  <option>₹ 5 Cr+</option>
                </select>
              </div>
              <textarea
                placeholder="Your message or specific questions..."
                className="pd2-input pd2-textarea"
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
              <button type="submit" className="pd2-submit">
                Submit Request
                <svg viewBox="0 0 24 24" width="14" height="14">
                  <path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ============================================================
           OTHER PROPERTIES
      ============================================================ */}
      <section className="pd2-others">
        <div className="pd2-others-inner">
          <div className="pd2-others-head">
            <div>
              <div className="pd2-tag-line">Our Portfolio</div>
              <h2 className="pd2-others-title">Similar Opportunities</h2>
            </div>
            <Link href="/properties" className="pd2-see-all">View All Properties</Link>
          </div>

          <div className="pd2-others-grid">
            {property.similarProperties.map((other, idx) => (
              <Link href={`/properties/${other.slug}`} key={idx} className="pd2-other-card">
                <div className="pd2-other-card-img">
                  <img src={other.image} alt={other.title} />
                </div>
                <div className="pd2-other-card-body">
                  <div className="pd2-other-card-name">{other.title}</div>
                  <div className="pd2-other-card-price">{other.price}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
           FAQ
      ============================================================ */}
      <section className="pd2-faq">
        <div className="pd2-faq-inner">
          <div className="pd2-faq-left">
            <div className="pd2-tag-line">Answers</div>
            <h2 className="pd2-faq-heading">Investment<br />FAQs</h2>
            <p className="pd2-faq-desc">
              Everything you need to know about fractional co-ownership, returns, and NRI compliance at {property.title}.
            </p>
          </div>

          <div className="pd2-faq-list">
            {property.faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx
              return (
                <div key={idx} className="pd2-faq-row">
                  <button
                    className={`pd2-faq-q-btn ${isOpen ? 'open' : ''}`}
                    onClick={() => toggleFaq(idx)}
                  >
                    {faq.question}
                    <span className="pd2-faq-q-icon">
                      <svg viewBox="0 0 24 24">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    </span>
                  </button>
                  <div className={`pd2-faq-ans ${isOpen ? 'show' : ''}`}>
                    <div className="pd2-faq-ans-inner">{faq.answer}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ============================================================
           FULL-WIDTH CTA BANNER
      ============================================================ */}
      <div className="pd2-cta-banner">
        <img
          src={property.heroImage}
          alt="CTA Background"
        />
        <div className="pd2-cta-content">
          <h2>A New Way to Think About<br />Property Ownership</h2>
          <p>
            We curate only those properties that generate measurable, documented returns. Every listing is
            verified for income potential before it reaches you.
          </p>
          <Link href="/contact" className="pd2-cta-btn">Connect with Our Expert</Link>
        </div>
      </div>

      {/* ============================================================
           GLOBAL FOOTER
      ============================================================ */}
      <Footer />

      {/* Toast message for inquiry */}
      {showToast && (
        <div
          className="toast-msg show"
          style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            backgroundColor: '#121815',
            color: '#FFFFFF',
            padding: '1rem 1.5rem',
            borderRadius: '4px',
            border: '1px solid var(--accent)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
          }}
        >
          <svg viewBox="0 0 24 24" width="20" height="20" stroke="var(--accent)" strokeWidth="2.5" fill="none">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" strokeLinecap="round" strokeLinejoin="round" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
          <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>
            Inquiry Submitted! Our advisor will call you shortly.
          </span>
        </div>
      )}

      {/* Calculator Modal */}
      <CalculatorModal isOpen={isCalcOpen} onClose={() => setIsCalcOpen(false)} />
    </div>
  )
}
