'use client'

import React, { useState } from 'react'
import { testimonialsData, TestimonialItem } from '@/data/home-data'

interface TestimonialsSectionProps {
  testimonials?: TestimonialItem[]
}

export function TestimonialsSection({
  testimonials = testimonialsData,
}: TestimonialsSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFading, setIsFading] = useState(false)

  const currentItem = testimonials[currentIndex] || testimonials[0]

  const handlePrev = () => {
    setIsFading(true)
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
      setIsFading(false)
    }, 200)
  }

  const handleNext = () => {
    setIsFading(true)
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
      setIsFading(false)
    }, 200)
  }

  return (
    <section className="section-padding social-proof" id="investors">
      <div className="container social-proof-container-new">
        {/* Section Header */}
        <div className="sp-header-new">
          <span className="sp-subtitle-new">INVESTOR TRUST</span>
          <h2 className="sp-title-new">WHAT OUR INVESTORS SAY</h2>
        </div>

        {/* Testimonial Slider Centered */}
        <div className="testimonial-slider-new">
          {/* Large quote watermark decoration */}
          <div className="sp-quote-mark-new">&ldquo;</div>

          {/* Testimonial Quote Text */}
          <blockquote
            className="sp-quote-block-new"
            style={{
              opacity: isFading ? 0 : 1,
              transition: 'opacity 0.25s ease',
            }}
          >
            <span className="testimonial-quote-text">{currentItem.quote}</span>
          </blockquote>

          {/* Author details */}
          <div
            className="sp-author-info-new"
            style={{
              opacity: isFading ? 0 : 1,
              transition: 'opacity 0.25s ease',
            }}
          >
            <p className="testimonial-author-name-new">{currentItem.author}</p>
            <p className="testimonial-author-info-new">{currentItem.info}</p>
          </div>

          {/* Floating Carousel Navigation Controls */}
          <div className="testimonial-arrows-new">
            <button
              type="button"
              className="testimonial-arrow-btn testimonial-nav-btn prev"
              aria-label="Previous testimonial"
              onClick={handlePrev}
            >
              <svg viewBox="0 0 24 24">
                <path d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              className="testimonial-arrow-btn testimonial-nav-btn next"
              aria-label="Next testimonial"
              onClick={handleNext}
            >
              <svg viewBox="0 0 24 24">
                <path d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Separator Line */}
        <div className="sp-divider-new" />

        {/* Horizontal Stats Row */}
        <div className="stats-row-new">
          <div className="stat-item-new">
            <h3>₹ 48 CR+</h3>
            <p>Capital Deployed</p>
          </div>
          <div className="stat-item-new">
            <h3>200+</h3>
            <p>Active Investors</p>
          </div>
          <div className="stat-item-new">
            <h3>96%</h3>
            <p>Investor Retention</p>
          </div>
        </div>
      </div>
    </section>
  )
}
