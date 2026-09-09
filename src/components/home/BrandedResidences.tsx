'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { brandedResidencesData, BrandedResidenceItem } from '@/data/home-data'

interface BrandedResidencesProps {
  residences?: BrandedResidenceItem[]
}

export function BrandedResidences({
  residences = brandedResidencesData,
}: BrandedResidencesProps) {
  const activeList = residences && residences.length > 0 ? residences : brandedResidencesData
  const totalItems = activeList.length

  // Tripled dataset for seamless continuous infinite looping
  const infiniteResidences = [
    ...activeList.map((r, i) => ({ ...r, uniqueId: `set1-${r.id}-${i}` })),
    ...activeList.map((r, i) => ({ ...r, uniqueId: `set2-${r.id}-${i}` })),
    ...activeList.map((r, i) => ({ ...r, uniqueId: `set3-${r.id}-${i}` })),
  ]

  const [currentIndex, setCurrentIndex] = useState(totalItems)
  const [isTransitioning, setIsTransitioning] = useState(true)
  const [visibleCards, setVisibleCards] = useState(2)
  const trackRef = useRef<HTMLDivElement>(null)

  const handlePrev = useCallback(() => {
    setIsTransitioning(true)
    setCurrentIndex((prev) => prev - 1)
  }, [])

  const handleNext = useCallback(() => {
    setIsTransitioning(true)
    setCurrentIndex((prev) => prev + 1)
  }, [])

  const handleTransitionEnd = () => {
    if (currentIndex >= totalItems * 2) {
      setIsTransitioning(false)
      setCurrentIndex(currentIndex - totalItems)
    } else if (currentIndex < totalItems) {
      setIsTransitioning(false)
      setCurrentIndex(currentIndex + totalItems)
    }
  }

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth
      const isMobile = screenWidth <= 992
      setVisibleCards(isMobile ? 1 : 2)

      const track = trackRef.current
      if (!track) return

      const parentWidth = track.parentElement?.offsetWidth || 1100
      let gap = 40
      let cardWidth = (parentWidth - gap) / 2

      if (isMobile) {
        gap = 32
        cardWidth = parentWidth
      }

      // Apply card flex sizes
      const cardElements = Array.from(track.children) as HTMLElement[]
      cardElements.forEach((card) => {
        card.style.flex = `0 0 ${cardWidth}px`
      })

      const offset = currentIndex * (cardWidth + gap)
      track.style.transform = `translateX(-${offset}px)`
      track.style.transition = isTransitioning
        ? 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)'
        : 'none'
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [currentIndex, isTransitioning, activeList.length])

  const normalizedIndex = ((currentIndex % totalItems) + totalItems) % totalItems
  const stepWidth = totalItems > 0 ? 100 / totalItems : 100
  const progressWidth = `${stepWidth}%`
  const progressLeft = `${(normalizedIndex / totalItems) * 100}%`

  return (
    <section
      className="section-padding branded-showcase-section"
      id="branded-residences-showcase"
    >
      <div className="container">
        {/* Section Title Group (Centered) */}
        <div
          className="section-title-group center text-center"
          style={{ maxWidth: '800px', margin: '0 auto 4rem auto' }}
        >
          <span className="editorial-tag">Curated Luxury</span>
          <h2 className="editorial-title">
            Branded <em>Residences</em>
          </h2>
          <p
            className="section-desc"
            style={{ color: '#666666', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}
          >
            Co-own premium, builder-managed luxury properties in exclusive neighborhoods. Experience
            institutional-grade real estate backed by stable lease returns.
          </p>
        </div>

        {/* Slider Carousel Wrapper */}
        <div className="branded-carousel-wrapper-new">
          <div
            className="branded-carousel-track"
            id="branded-carousel-track"
            ref={trackRef}
            onTransitionEnd={handleTransitionEnd}
          >
            {infiniteResidences.map((item) => (
              <div key={item.uniqueId} className="branded-card-new">
                <Link href={`/branded-residences/${item.slug || ''}`}>
                  <div className="branded-card-img-wrap">
                    <img src={item.image} alt={item.title} />
                    <div className="branded-card-gradient" />
                    <div className="branded-card-badge">{item.badge}</div>

                    <div className="branded-card-overlay">
                      <span className="branded-card-loc">{item.location}</span>
                      <h3 className="branded-card-title">{item.title}</h3>

                      <div className="branded-card-stats">
                        <div className="branded-card-stat">
                          <span className="val">{item.units}</span>
                          <span className="lbl">TOTAL UNITS</span>
                        </div>
                        <div className="branded-card-stat">
                          <span className="val">{item.yieldStrategy}</span>
                          <span className="lbl">YIELD STRATEGY</span>
                        </div>
                      </div>

                      <div className="branded-card-btn-link">EXPLORE PROPERTY &rarr;</div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Navigation Controls */}
        <div className="branded-slider-nav">
          <div className="branded-progress-container">
            <div
              className="branded-progress-bar"
              id="branded-progress-bar"
              style={{
                width: progressWidth,
                left: progressLeft,
                transition: 'all 0.3s ease',
              }}
            />
          </div>
          <div className="branded-arrows">
            <button
              type="button"
              className="branded-arrow-btn-new prev"
              id="branded-prev"
              aria-label="Previous branded property"
              onClick={handlePrev}
              style={{
                opacity: 1,
                pointerEvents: 'auto',
                cursor: 'pointer',
              }}
            >
              <svg viewBox="0 0 24 24">
                <path d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              className="branded-arrow-btn-new next"
              id="branded-next"
              aria-label="Next branded property"
              onClick={handleNext}
              style={{
                opacity: 1,
                pointerEvents: 'auto',
                cursor: 'pointer',
              }}
            >
              <svg viewBox="0 0 24 24">
                <path d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
