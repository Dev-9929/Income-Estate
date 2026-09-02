'use client'

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { propertiesCarouselData, PropertyCarouselItem } from '@/data/home-data'

interface PropertiesCarouselProps {
  properties?: PropertyCarouselItem[]
}

export function PropertiesCarousel({
  properties = propertiesCarouselData,
}: PropertiesCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visibleCards, setVisibleCards] = useState(2)
  const trackRef = useRef<HTMLDivElement>(null)

  const maxSlides = Math.max(0, properties.length - visibleCards)

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxSlides, prev + 1))
  }

  // Calculate layout dimensions and apply styles
  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth
      const isMobile = screenWidth <= 768
      setVisibleCards(isMobile ? 1 : 2)

      const track = trackRef.current
      if (!track) return

      const parentWidth = track.parentElement?.offsetWidth || 800
      let cardWidth = 360
      let gap = 28

      if (isMobile) {
        cardWidth = parentWidth
        gap = 28
      } else if (screenWidth <= 992) {
        cardWidth = 340
        gap = 28
      }

      const offset = currentIndex * (cardWidth + gap)
      track.style.transform = `translateX(-${offset}px)`
      track.style.transition = 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)'
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [currentIndex])

  const totalSteps = maxSlides + 1
  const stepWidth = totalSteps > 0 ? 100 / totalSteps : 100
  const progressWidth = `${stepWidth}%`
  const progressLeft = `${currentIndex * stepWidth}%`

  return (
    <section className="section-padding carousel-section" id="projects">
      <div className="container">
        <div className="carousel-container">
          {/* Left Intro Column */}
          <div className="carousel-intro">
            <span className="editorial-tag">Curated Yield</span>
            <h2 className="editorial-title">
              ROI<br />
              <em>Residences</em>
            </h2>
            <p style={{ marginBottom: '2rem' }}>
              We curate investment properties designed to deliver consistent income and long-term
              value.
            </p>
            <Link
              href="/properties"
              className="btn btn-outline"
              id="carousel-invest-now"
              style={{
                padding: '0.8rem 2.2rem',
                fontWeight: 700,
                fontSize: '0.85rem',
                borderColor: 'var(--primary)',
                color: 'var(--primary)',
                borderWidth: '1.5px',
                borderRadius: '2px',
              }}
            >
              INVEST NOW
            </Link>
          </div>

          {/* Slider Track Area */}
          <div className="carousel-slider-area">
            <div className="carousel-track" id="home-carousel-track" ref={trackRef}>
              {properties.map((item, idx) => (
                <div
                  key={item.id}
                  className={`property-card ${idx === currentIndex ? 'active-card' : ''}`}
                  id={item.id}
                >
                  <Link href={`/properties/${item.slug}`}>
                    <div className="card-img-wrap">
                      <img src={item.image} alt={item.title} />
                      <div className="card-gradient-overlay" />
                      <div className="card-overlay-content">
                        <h3 className="card-overlay-title">{item.title}</h3>
                        <div className="card-overlay-badge-wrap">
                          <span className="card-overlay-badge">{item.price}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Slider Controls */}
        <div className="slider-nav">
          <div className="slider-progress-container">
            <div
              className="slider-progress-bar"
              id="home-slider-progress-bar"
              style={{
                width: progressWidth,
                left: progressLeft,
                transition: 'all 0.3s ease',
              }}
            />
          </div>
          <div className="slider-arrows">
            <button
              type="button"
              className="slider-arrow prev"
              aria-label="Previous property"
              onClick={handlePrev}
              style={{
                opacity: currentIndex === 0 ? 0.35 : 1,
                cursor: currentIndex === 0 ? 'not-allowed' : 'pointer',
              }}
            >
              <svg viewBox="0 0 24 24" strokeWidth="2.5">
                <path d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              className="slider-arrow next"
              aria-label="Next property"
              onClick={handleNext}
              style={{
                opacity: currentIndex >= maxSlides ? 0.35 : 1,
                cursor: currentIndex >= maxSlides ? 'not-allowed' : 'pointer',
              }}
            >
              <svg viewBox="0 0 24 24" strokeWidth="2.5">
                <path d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
