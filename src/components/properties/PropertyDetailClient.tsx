'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { PreFooterCta } from '@/components/home/PreFooterCta'
import { CalculatorModal } from '@/components/modals/CalculatorModal'
import { PropertyOverviewModal } from '@/components/modals/PropertyOverviewModal'
import { FaqSection } from '@/components/common/FaqSection'
import { PropertyDetailItem } from '@/data/property-detail-data'
import { executeRecaptchaToken } from '@/lib/recaptcha'

interface PropertyDetailClientProps {
  property: PropertyDetailItem
  categorySlug?: string
}

export function PropertyDetailClient({ property, categorySlug = 'roi-properties' }: PropertyDetailClientProps) {
  const [isCalcOpen, setIsCalcOpen] = useState(false)
  const [isOverviewOpen, setIsOverviewOpen] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmittedSuccess, setIsSubmittedSuccess] = useState(false)
  const [honeypot, setHoneypot] = useState('')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [activeVideoIdx, setActiveVideoIdx] = useState(0)
  const [isPlayingVideo, setIsPlayingVideo] = useState(false)
  const videoRef = useRef<HTMLVideoElement | null>(null)

  const handleSelectVideo = (idx: number) => {
    setActiveVideoIdx(idx)
    setIsPlayingVideo(false)
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }

  const handleTogglePlay = () => {
    if (!videoRef.current) return
    if (isPlayingVideo) {
      videoRef.current.pause()
      setIsPlayingVideo(false)
    } else {
      videoRef.current.play()
      setIsPlayingVideo(true)
    }
  }

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: '₹ 70L – ₹ 1 Cr',
    message: '',
  })

  const handlePrevLightbox = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation()
    setLightboxIndex((prev) => (prev !== null ? (prev === 0 ? property.gallery.length - 1 : prev - 1) : null))
  }, [property.gallery.length])

  const handleNextLightbox = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation()
    setLightboxIndex((prev) => (prev !== null ? (prev === property.gallery.length - 1 ? 0 : prev + 1) : null))
  }, [property.gallery.length])

  useEffect(() => {
    if (lightboxIndex === null) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxIndex(null)
      } else if (e.key === 'ArrowLeft') {
        handlePrevLightbox()
      } else if (e.key === 'ArrowRight') {
        handleNextLightbox()
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [lightboxIndex, handlePrevLightbox, handleNextLightbox])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const token = await executeRecaptchaToken('property_inquiry')
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
          honeypot,
          recaptchaToken: token,
        }),
      })
      setIsSubmittedSuccess(true)
    } catch (err) {
      console.warn('Property inquiry submission fallback:', err)
    } finally {
      setIsSubmitting(false)
      setShowToast(true)
      setHoneypot('')
      setFormData({
        name: '',
        email: '',
        phone: '',
        interest: '₹ 70L – ₹ 1 Cr',
        message: '',
      })
      setTimeout(() => {
        setShowToast(false)
      }, 3500)
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

          {/* Glassmorphic Property Specifications & Price Card */}
          {(() => {
            const propertyType =
              property.propertyType ||
              property.facts.find((f) => /type|category/i.test(f.lbl))?.val ||
              'Commercial Office'

            const possession =
              property.possession ||
              property.facts.find((f) => /possession|status|date/i.test(f.lbl))?.val ||
              'Ready to Buy'

            const projectScope =
              property.projectScope ||
              property.facts.find((f) => /unit|tower|key|villa/i.test(f.lbl))?.val ||
              '8 Exclusive Units'

            const sizeArea =
              property.sizeArea ||
              property.facts.find((f) => /area|size|sqyd|sq\.?\s*ft|acre|bigha/i.test(f.lbl))?.val ||
              '1100 SqYd'

            const hasYield = Boolean(
              property.rentalYield && property.rentalYield.trim() !== '' && property.rentalYield !== '-'
            )

            return (
              <div className="pd2-hero-stats">
                <div className="pd2-hs-grid">
                  <div className="pd2-hs-cell">
                    <span className="pd2-hs-lbl">Property Type</span>
                    <span className="pd2-hs-val-sm">{propertyType}</span>
                  </div>
                  <div className="pd2-hs-cell">
                    <span className="pd2-hs-lbl">Possession</span>
                    <span className="pd2-hs-val-sm">{possession}</span>
                  </div>
                  <div className="pd2-hs-cell">
                    <span className="pd2-hs-lbl">About Project</span>
                    <span className="pd2-hs-val-sm">{projectScope}</span>
                  </div>
                  <div className="pd2-hs-cell">
                    <span className="pd2-hs-lbl">Land Area / Size</span>
                    <span className="pd2-hs-val-sm">{sizeArea}</span>
                  </div>
                </div>

                <div className="pd2-hs-bottom">
                  <div className="pd2-hs-price">
                    <span className="pd2-hs-lbl">Starting From</span>
                    <span className="pd2-hs-val">{property.priceStarting}</span>
                  </div>
                  {hasYield && (
                    <div className="pd2-hs-yield">
                      <span className="pd2-hs-lbl">Rental Yield</span>
                      <span className="pd2-hs-val" style={{ color: 'var(--accent)' }}>
                        {property.rentalYield}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )
          })()}
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

            {/* Conditional "Read More..." link (shows if content > 500 chars/words or has full story) */}
            {(() => {
              const fullStory = property.overviewFullStory || []
              const allText = [
                ...fullStory,
                property.overviewText1,
                property.overviewText2,
              ]
                .filter(Boolean)
                .join(' ')

              const totalWords = allText.trim().split(/\s+/).filter(Boolean).length
              const totalChars = allText.length

              // Condition: Show Read More only if content exceeds 250 threshold or has extended story
              const shouldShowReadMore =
                totalChars > 250 || totalWords > 50 || fullStory.length > 1

              if (!shouldShowReadMore) return null

              return (
                <div>
                  <button
                    type="button"
                    className="pd2-readmore-link"
                    onClick={() => setIsOverviewOpen(true)}
                  >
                    Read More...
                  </button>
                </div>
              )
            })()}

            <div className="pd2-intro-actions">
              <a
                href={property.brochureUrl || '#enquire'}
                download={property.brochureUrl ? `${property.slug}-brochure.pdf` : undefined}
                className="pd2-btn-dark"
              >
                <span>Download Brochure</span>
                <svg
                  viewBox="0 0 24 24"
                  width="14"
                  height="14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
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
           FACTS STRIP — SPECIFICATIONS & SNAPSHOT
      ============================================================ */}
      <div className="pd2-facts-strip">
        <div className="pd2-facts-inner">
          <div className="pd2-fact-lead">
            <span className="pd2-fact-lead-tag">At a Glance</span>
            <h3 className="pd2-fact-lead-title">Key Specifications</h3>
          </div>
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
            <div
              key={idx}
              className={`pd2-gi ${item.gridClass}`}
              onClick={() => setLightboxIndex(idx)}
              role="button"
              tabIndex={0}
              aria-label={`View full screen image of ${item.label}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  setLightboxIndex(idx)
                }
              }}
            >
              <img src={item.image} alt={item.label} />
              <div className="pd2-gi-zoom">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                  <path d="M12 10h-2v2H9v-2H7V9h2V7h1v2h2v1z" />
                </svg>
              </div>
              <div className="pd2-gi-label">{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================
           SPACE & PRICING (UNIT CONFIGURATIONS)
      ============================================================ */}
      {property.unitConfigurations && property.unitConfigurations.length > 0 && (
        <section className="pd2-pricing" id="pricing">
          <div className="pd2-pricing-inner">
            <div className="pd2-pricing-header">
              <div className="pd2-tag-line pd2-tag-line-center">Space & Pricing</div>
              <h2 className="pd2-pricing-heading">
                {property.title} {property.titleAccent || ''} Price
              </h2>
              <div className="pd2-pricing-accent-bar" aria-hidden="true" />
            </div>

            <div className="pd2-pricing-card">
              <div className="pd2-pricing-table-wrap">
                <table className="pd2-pricing-table">
                  <thead>
                    <tr>
                      <th>
                        <span className="pd2-th-flex">
                          <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true">
                            <path d="M7 13c1.66 0 3-1.34 3-3S8.66 7 7 7s-3 1.34-3 3 1.34 3 3 3zm12-6h-8v7H3V5H1v15h2v-3h18v3h2v-9c0-2.21-1.79-4-4-4z" />
                          </svg>
                          TYPE / BHK
                        </span>
                      </th>
                      <th>
                        <span className="pd2-th-flex">
                          <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true">
                            <path d="M3 3v18h18V3H3zm16 16H5V5h14v14zM7 7h4v2H7V7zm6 0h4v2h-4V7zm-6 4h4v2H7v-2zm6 0h4v2h-4v-2zm-6 4h4v2H7v-2zm6 0h4v2h-4v-2z" />
                          </svg>
                          UNIT SIZE
                        </span>
                      </th>
                      <th>
                        <span className="pd2-th-flex">
                          <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true">
                            <path d="M13.66 7C13.1 5.82 11.9 5 10.5 5H6V3h12v2h-3.26c.48.58.84 1.26 1.05 2H18v2h-2.02c-.25 2.8-2.61 5-5.48 5h-.73l6.73 7H13.8L7.33 14H6v-2h4.5c1.93 0 3.5-1.57 3.5-3.5 0-.17-.02-.34-.05-.5H6V7h7.66z" />
                          </svg>
                          UNIT PRICE
                        </span>
                      </th>
                      <th>
                        <span className="pd2-th-flex">
                          <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true">
                            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM7 10h10v2H7zm0-3h10v2H7zm0 6h7v2H7z" />
                          </svg>
                          PAYMENT PLAN
                        </span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {property.unitConfigurations.map((unit, idx) => (
                      <tr key={idx}>
                        <td className="pd2-td-type">
                          <div className="pd2-unit-type-cell">
                            <span className="pd2-unit-icon" aria-hidden="true">
                              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                                <path d="M7 13c1.66 0 3-1.34 3-3S8.66 7 7 7s-3 1.34-3 3 1.34 3 3 3zm12-6h-8v7H3V5H1v15h2v-3h18v3h2v-9c0-2.21-1.79-4-4-4z" />
                              </svg>
                            </span>
                            <span className="pd2-unit-title">{unit.type}</span>
                          </div>
                        </td>
                        <td className="pd2-td-size">
                          <span className="pd2-unit-size-val">{unit.size}</span>
                        </td>
                        <td className="pd2-td-price">
                          <span className="pd2-unit-price-val">{unit.price}</span>
                        </td>
                        <td className="pd2-td-plan">
                          <span className="pd2-unit-plan-val">{unit.paymentPlan || 'Flexible'}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Bottom Action Bar */}
            <div className="pd2-pricing-actions">
              <a href="#enquire" className="pd2-pricing-btn">
                <span>GET IN TOUCH</span>
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                  <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>

              <div className="pd2-pricing-divider" aria-hidden="true">
                <span className="pd2-pricing-divider-line" />
                <span className="pd2-pricing-divider-text">OR</span>
                <span className="pd2-pricing-divider-line" />
              </div>

              <a href="tel:+917665212212" className="pd2-pricing-call-pill">
                <div className="pd2-pricing-call-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                  </svg>
                </div>
                <div className="pd2-pricing-call-content">
                  <span className="pd2-pricing-call-lbl">SPEAK WITH EXPERT</span>
                  <span className="pd2-pricing-call-num">+91 76652 12212</span>
                </div>
              </a>
            </div>
          </div>
        </section>
      )}

      {/* ============================================================
           PROPERTY VIDEOS & VIRTUAL TOUR (CLEAN REFERENCE DESIGN)
      ============================================================ */}
      {property.videos && property.videos.length > 0 && (
        <section className="pd2-vtour-section" id="video-tour">
          <div className="pd2-vtour-inner">
            <div className="pd2-vtour-header">
              <div className="pd2-tag-line pd2-tag-line-center">Virtual Tour</div>
              <h2 className="pd2-vtour-heading">
                The Journey &amp; <em>Virtual Tour</em>
              </h2>
              <p className="pd2-vtour-desc">
                Explore verified on-ground highway transit connectivity, 360° aerial drone perspectives, and sample villa walkthroughs.
              </p>
            </div>

            {(() => {
              const currentVideo = property.videos[activeVideoIdx] || property.videos[0]
              return (
                <div className="pd2-vtour-layout">
                  {/* Left Column: Big Main Video Player */}
                  <div className="pd2-vtour-main">
                    <div className="pd2-vtour-screen">
                      <video
                        key={currentVideo.id}
                        controls
                        playsInline
                        preload="metadata"
                        poster={currentVideo.posterImage}
                        src={currentVideo.videoUrl}
                        className="pd2-vtour-player"
                      >
                        <source src={currentVideo.videoUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  </div>

                  {/* Right Column: Clean Playlist Cards */}
                  <div className="pd2-vtour-playlist">
                    {property.videos.map((vid, idx) => {
                      const isActive = idx === activeVideoIdx
                      return (
                        <button
                          key={vid.id}
                          type="button"
                          className={`pd2-vtour-card ${isActive ? 'active' : ''}`}
                          onClick={() => setActiveVideoIdx(idx)}
                        >
                          <div className="pd2-vtour-card-thumb">
                            <img src={vid.posterImage} alt={vid.title} />
                            <span className="pd2-vtour-card-play" aria-hidden="true">
                              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            </span>
                          </div>
                          <div className="pd2-vtour-card-info">
                            <h3 className="pd2-vtour-card-title">{vid.title}</h3>
                            <span className="pd2-vtour-card-subtitle">{vid.categoryLabel} &bull; {vid.duration}</span>
                            <span className="pd2-vtour-card-desc">{vid.description}</span>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>
              )
            })()}
          </div>
        </section>
      )}

      {/* ============================================================
           PROJECT HIGHLIGHTS SECTION
      ============================================================ */}
      <section className="pd2-roi-section pd2-highlights-section" id="highlights">
        <div className="pd2-roi-inner">
          <div className="pd2-roi-left">
            <div className="pd2-tag-line">Key Advantages</div>
            <h2 className="pd2-intro-heading pd2-highlights-heading">
              Project Highlights
            </h2>
            <p className="pd2-intro-text" style={{ marginTop: '1.25rem' }}>
              {property.highlightsIntro ||
                `${property.title} delivers structured value, premium connectivity, and an exceptional lifestyle backed by verified legal ownership and institutional development standards.`}
            </p>

            <div className="pd2-highlights-list">
              {(property.projectHighlights || property.overviewHighlights || []).map((highlight, idx) => (
                <div key={idx} className="pd2-highlight-row">
                  <span className="pd2-highlight-check" aria-hidden="true">
                    <svg
                      viewBox="0 0 24 24"
                      width="18"
                      height="18"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <span className="pd2-highlight-text">{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pd2-roi-right">
            <div className="pd2-roi-img-stack">
              <img
                className="pd2-roi-img-front"
                src={property.roiFrontImage}
                alt={`${property.title} Architecture`}
              />
              <img
                className="pd2-roi-img-back"
                src={property.roiBackImage}
                alt={`${property.title} Grounds Overview`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
           AMENITIES — HOVER GRID
      ============================================================ */}
      <section className="pd2-amenities" id="amenities">
        <div className="pd2-amenities-inner">
          <div className="pd2-amenities-header">
            <div>
              <div className="pd2-tag-line">Property Features</div>
              <h2 className="pd2-amenities-heading">Premium Amenities</h2>
            </div>
            <p className="pd2-amenities-desc">
              Curated world-class features and lifestyle privileges crafted for discerning residents and high-yield investors.
            </p>
          </div>

          <div className="pd2-amenities-grid">
            {property.amenities.map((amenity, idx) => (
              <div key={idx} className="pd2-amenity">
                <div className="pd2-amenity-icon" aria-hidden="true">
                  {amenity.iconType === 'lease' && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <path d="M9 15l2 2 4-4" />
                    </svg>
                  )}
                  {amenity.iconType === 'parking' && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="4" />
                      <path d="M9 17V7h4a3 3 0 0 1 0 6H9" />
                    </svg>
                  )}
                  {amenity.iconType === 'security' && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      <path d="M9 12l2 2 4-4" />
                    </svg>
                  )}
                  {amenity.iconType === 'view' && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                  {amenity.iconType === 'interior' && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 19v2M18 19v2" />
                      <path d="M4 11a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-5z" />
                      <path d="M4 14h16" />
                    </svg>
                  )}
                  {amenity.iconType === 'managed' && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 18H6a2 2 0 0 1-2-2c0-4 4-6 8-6s8 2 8 6a2 2 0 0 1-2 2z" />
                      <path d="M12 6V4" />
                      <path d="M10 4h4" />
                      <path d="M2 20h20" />
                    </svg>
                  )}
                  {amenity.iconType === 'pool' && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 17c2.5 0 3.5-1.5 6-1.5s3.5 1.5 6 1.5 3.5-1.5 6-1.5" />
                      <path d="M2 21c2.5 0 3.5-1.5 6-1.5s3.5 1.5 6 1.5 3.5-1.5 6-1.5" />
                      <circle cx="15" cy="7" r="3" />
                      <path d="M12 13l3-3 4 2" />
                    </svg>
                  )}
                  {amenity.iconType === 'spa' && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 3c-2 4-5 7-9 8 3 3 6 4 9 4s6-1 9-4c-4-1-7-4-9-8z" />
                      <path d="M12 15c-3 2-6 3-9 3 2 2 5 3 9 3s7-1 9-3c-3 0-6-1-9-3z" />
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
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.301-.15-1.781-.878-2.057-.978-.276-.1-.477-.15-.678.15-.2.301-.778.978-.954 1.179-.176.2-.351.226-.652.075-.301-.15-1.272-.469-2.423-1.496-.896-.799-1.501-1.786-1.677-2.087-.176-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.176.2-.301.3-.502.1-.2.05-.376-.025-.526-.075-.15-.678-1.632-.929-2.235-.245-.588-.493-.508-.678-.517-.176-.009-.376-.01-.577-.01-.201 0-.527.075-.803.376s-1.054 1.029-1.054 2.509 1.079 2.91 1.229 3.111c.15.201 2.124 3.243 5.145 4.549.719.311 1.28.497 1.718.636.723.23 1.38.197 1.9-.12.58-.354 1.781-1.028 2.032-1.781.251-.753.251-1.398.176-1.524-.076-.126-.276-.201-.577-.351z" />
                <path d="M12.004 2C6.48 2 2 6.478 2 12.002c0 1.935.553 3.743 1.516 5.275L2 22l4.873-1.488a9.957 9.957 0 0 0 5.131 1.49h.004c5.524 0 10.004-4.478 10.004-10.002C22.008 6.478 17.528 2 12.004 2zm0 18.003h-.003a8.006 8.006 0 0 1-4.08-1.116l-.293-.174-3.033.926.942-2.956-.191-.303a8.007 8.007 0 0 1-1.341-4.378C4.004 7.584 7.586 4 12.004 4c2.133 0 4.138.831 5.646 2.339A7.947 7.947 0 0 1 20.008 12c0 4.418-3.582 8.003-8.004 8.003z" />
              </svg>
              <span>WhatsApp Our Advisor</span>
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

          <div className="pd2-form-card">
            <div className="pd2-form-header">
              <span className="pd2-form-tag">Request Information</span>
              <h3 className="pd2-form-heading">Connect With Investment Desk</h3>
            </div>
            {isSubmittedSuccess ? (
              <div style={{ textAlign: 'center', padding: '3rem 1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: 'rgba(212, 175, 106, 0.15)', color: 'var(--accent, #D4AF6A)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                  <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 style={{ fontFamily: 'var(--font-serif, "DM Sans", sans-serif)', fontSize: '1.4rem', fontWeight: 600, color: 'var(--primary, #061D15)', marginBottom: '0.5rem' }}>
                  Inquiry Received!
                </h3>
                <p style={{ color: 'var(--text-muted, #6E6862)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.5rem', maxWidth: '380px' }}>
                  Thank you for your interest in {property.title}. Our investment desk has received your details and will get in touch shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setIsSubmittedSuccess(false)}
                  style={{
                    padding: '0.65rem 1.25rem',
                    borderRadius: '4px',
                    border: '1px solid var(--accent, #D4AF6A)',
                    backgroundColor: 'transparent',
                    color: 'var(--primary, #061D15)',
                    fontWeight: 700,
                    fontSize: '0.78rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    cursor: 'pointer'
                  }}
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="pd2-form-body">
                <input
                  type="text"
                  name="website_confirm"
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
                <div className="pd2-input-row">
                  <div className="pd2-input-field">
                    <label className="pd2-input-label">Full Name <span className="pd2-req">*</span></label>
                    <input
                      type="text"
                      placeholder="e.g. Vikram Sharma"
                      className="pd2-input"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="pd2-input-field">
                    <label className="pd2-input-label">Email Address <span className="pd2-req">*</span></label>
                    <input
                      type="email"
                      placeholder="e.g. vikram@example.com"
                      className="pd2-input"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="pd2-input-row">
                  <div className="pd2-input-field">
                    <label className="pd2-input-label">Phone / WhatsApp <span className="pd2-req">*</span></label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      className="pd2-input"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </div>
                  <div className="pd2-input-field">
                    <label className="pd2-input-label">Investment Range</label>
                    <select
                      className="pd2-input pd2-select"
                      value={formData.interest}
                      onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                    >
                      <option>₹ 70L – ₹ 1 Cr</option>
                      <option>₹ 1 Cr – ₹ 2 Cr</option>
                      <option>₹ 2 Cr – ₹ 5 Cr</option>
                      <option>₹ 5 Cr+</option>
                    </select>
                  </div>
                </div>
                <div className="pd2-input-field">
                  <label className="pd2-input-label">Message / Specific Questions</label>
                  <textarea
                    placeholder="Tell us about your investment horizon or preferred villa type..."
                    className="pd2-input pd2-textarea"
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>
                <button type="submit" disabled={isSubmitting} className="pd2-submit" style={{ opacity: isSubmitting ? 0.7 : 1 }}>
                  <span>{isSubmitting ? 'SUBMITTING...' : 'SUBMIT ENQUIRY'}</span>
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                    <path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z" />
                  </svg>
                </button>
              </form>
            )}
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
            <Link href={`/${categorySlug}`} className="pd2-see-all">View All Properties</Link>
          </div>

          <div className="pd2-others-grid">
            {property.similarProperties.map((other, idx) => (
              <Link href={`/${categorySlug}/${other.slug}`} key={idx} className="pd2-other-card">
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
           FAQ (Unified Global Section)
      ============================================================ */}
      <FaqSection
        tag="Answers"
        title={
          <>
            Investment<br />
            <em>FAQs</em>
          </>
        }
        description={`Everything you need to know about fractional co-ownership, returns, and NRI compliance at ${property.title}.`}
        faqs={property.faqs.map((faq, idx) => ({
          id: `prop-faq-${idx}`,
          question: faq.question,
          answer: faq.answer,
        }))}
        id="faq"
        backgroundColor="#FFFFFF"
      />



      {/* Pre-Footer CTA */}
      <PreFooterCta onConnect={() => setIsCalcOpen(true)} />

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

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div
          className="pd2-lightbox-overlay"
          onClick={() => setLightboxIndex(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Image gallery lightbox"
        >
          <div className="pd2-lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="pd2-lightbox-close"
              onClick={() => setLightboxIndex(null)}
              aria-label="Close image viewer"
            >
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              </svg>
            </button>

            <div className="pd2-lightbox-counter">
              {lightboxIndex + 1} / {property.gallery.length}
            </div>

            <button
              className="pd2-lightbox-nav pd2-lightbox-prev"
              onClick={handlePrevLightbox}
              aria-label="Previous image"
            >
              <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
              </svg>
            </button>

            <div className="pd2-lightbox-stage">
              <img
                src={property.gallery[lightboxIndex].image}
                alt={property.gallery[lightboxIndex].label}
                className="pd2-lightbox-img"
              />
              <div className="pd2-lightbox-caption">
                {property.gallery[lightboxIndex].label}
              </div>
            </div>

            <button
              className="pd2-lightbox-nav pd2-lightbox-next"
              onClick={handleNextLightbox}
              aria-label="Next image"
            >
              <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Calculator Modal */}
      <CalculatorModal isOpen={isCalcOpen} onClose={() => setIsCalcOpen(false)} />

      {/* Full Overview Modal */}
      <PropertyOverviewModal
        isOpen={isOverviewOpen}
        onClose={() => setIsOverviewOpen(false)}
        title={property.title}
        titleAccent={property.titleAccent}
        tag={property.overviewTag || 'Project Overview'}
        paragraphs={
          property.overviewFullStory && property.overviewFullStory.length > 0
            ? property.overviewFullStory
            : [property.overviewText1, property.overviewText2]
        }
        highlights={property.overviewHighlights || []}
      />
    </div>
  )
}
