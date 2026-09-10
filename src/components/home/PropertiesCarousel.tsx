'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { propertiesCarouselData, PropertyCarouselItem } from '@/data/home-data'

interface PropertiesCarouselProps {
  properties?: PropertyCarouselItem[]
}

export function PropertiesCarousel({
  properties = propertiesCarouselData,
}: PropertiesCarouselProps) {
  // Filter out any non-ROI properties to ensure strict ROI category isolation
  const roiProperties = properties.filter(
    (p) => p.category !== 'branded' && p.slug !== 'greenz-by-danube'
  )
  const totalItems = roiProperties.length

  // Tripled dataset for seamless infinite looping without rewinding
  const infiniteProperties = [
    ...roiProperties.map((p, i) => ({ ...p, uniqueId: `set1-${p.id}-${i}` })),
    ...roiProperties.map((p, i) => ({ ...p, uniqueId: `set2-${p.id}-${i}` })),
    ...roiProperties.map((p, i) => ({ ...p, uniqueId: `set3-${p.id}-${i}` })),
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

  // Touch & swipe handling for mobile devices
  const touchStartX = useRef<number>(0)
  const touchEndX = useRef<number>(0)
  const touchStartY = useRef<number>(0)
  const touchEndY = useRef<number>(0)
  const isSwiping = useRef<boolean>(false)

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX
    touchStartY.current = e.targetTouches[0].clientY
    touchEndX.current = e.targetTouches[0].clientX
    touchEndY.current = e.targetTouches[0].clientY
    isSwiping.current = true
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isSwiping.current) return
    touchEndX.current = e.targetTouches[0].clientX
    touchEndY.current = e.targetTouches[0].clientY
  }

  const handleTouchEnd = () => {
    if (!isSwiping.current) return
    isSwiping.current = false
    const diffX = touchStartX.current - touchEndX.current
    const diffY = Math.abs(touchStartY.current - touchEndY.current)

    if (Math.abs(diffX) > 40 && Math.abs(diffX) > diffY) {
      if (diffX > 0) {
        handleNext()
      } else {
        handlePrev()
      }
    }
  }

  // Calculate layout dimensions and synchronize card widths across all screen sizes
  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth
      const isMobile = screenWidth <= 768
      const isTablet = screenWidth > 768 && screenWidth <= 992
      setVisibleCards(isMobile ? 1 : 2)

      const track = trackRef.current
      if (!track) return

      const parentWidth =
        track.parentElement?.getBoundingClientRect().width ||
        track.parentElement?.offsetWidth ||
        360
      const cardElements = Array.from(track.children) as HTMLElement[]

      let cardWidth = 360
      let gap = 28

      if (isMobile) {
        gap = 16
        cardWidth = Math.floor(parentWidth)
        track.style.gap = `${gap}px`

        cardElements.forEach((card) => {
          card.style.flex = `0 0 ${cardWidth}px`
          card.style.width = `${cardWidth}px`
          card.style.maxWidth = `${cardWidth}px`
          card.style.minWidth = `${cardWidth}px`
        })
      } else if (isTablet) {
        gap = 24
        cardWidth = Math.floor((parentWidth - gap) / 2)
        track.style.gap = `${gap}px`

        cardElements.forEach((card) => {
          card.style.flex = `0 0 ${cardWidth}px`
          card.style.width = `${cardWidth}px`
          card.style.maxWidth = `${cardWidth}px`
          card.style.minWidth = `${cardWidth}px`
        })
      } else {
        // Desktop: active card expands, other cards maintain 360px
        gap = 28
        track.style.gap = `${gap}px`

        cardElements.forEach((card, idx) => {
          const isActive = idx === currentIndex
          const width = isActive ? 550 : 360
          card.style.flex = `0 0 ${width}px`
          card.style.width = `${width}px`
          card.style.maxWidth = `${width}px`
          card.style.minWidth = `${width}px`
        })
      }

      let offset = 0
      if (isMobile || isTablet) {
        offset = currentIndex * (cardWidth + gap)
      } else {
        offset = currentIndex * (360 + gap)
      }

      track.style.transform = `translateX(-${offset}px)`
      track.style.transition = isTransitioning
        ? 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)'
        : 'none'
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [currentIndex, isTransitioning])

  const normalizedIndex = ((currentIndex % totalItems) + totalItems) % totalItems
  const stepWidth = totalItems > 0 ? 100 / totalItems : 100
  const progressWidth = `${stepWidth}%`
  const progressLeft = `${(normalizedIndex / totalItems) * 100}%`

  return (
    <section className="section-padding carousel-section" id="projects">
      <div className="container">
        <div className="carousel-container">
          {/* Left Intro Column */}
          <div className="carousel-intro">
            <span className="editorial-tag">Curated Yield</span>
            <h2 className="editorial-title">
              ROI<br />
              <em>Properties</em>
            </h2>
            <p style={{ marginBottom: '2rem' }}>
              We curate investment properties designed to deliver consistent income and long-term
              value.
            </p>
            <Link
              href="/roi-properties"
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
          <div
            className="carousel-slider-area"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="carousel-track"
              id="home-carousel-track"
              ref={trackRef}
              onTransitionEnd={handleTransitionEnd}
            >
              {infiniteProperties.map((item, idx) => (
                <div
                  key={item.uniqueId}
                  className={`property-card ${idx === currentIndex ? 'active-card' : ''}`}
                  id={item.id}
                >
                  <Link href={`/${item.category || 'roi-properties'}/${item.slug}`}>
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
                opacity: 1,
                cursor: 'pointer',
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
                opacity: 1,
                cursor: 'pointer',
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
