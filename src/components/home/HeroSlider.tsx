'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { heroSlidesData, HeroSlide } from '@/data/home-data'

interface HeroSliderProps {
  slides?: HeroSlide[]
}

export function HeroSlider({ slides = heroSlidesData }: HeroSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }, [slides.length])

  // Autoplay rotation every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide()
    }, 5000)
    return () => clearInterval(timer)
  }, [nextSlide])

  return (
    <section className="hero-slider" id="hero-section">
      <div className="slider-wrapper">
        {slides.map((slide, index) => {
          const isActive = index === currentSlide
          return (
            <div
              key={slide.id}
              className={`hero-slide ${isActive ? 'active' : ''}`}
            >
              {/* Background split left & right */}
              <div className="hero-slide-bg-split">
                <div className="hero-bg-left">
                  <img
                    src={slide.bgLeft}
                    alt={slide.bgLeftAlt}
                  />
                </div>
                <div className="hero-bg-right">
                  <img
                    src={slide.bgRight}
                    alt={slide.bgRightAlt}
                  />
                </div>
              </div>

              {/* Text Content Overlay */}
              <div className="container hero-slide-container">
                <div className="hero-slide-content">
                  <h1 className="hero-title">{slide.title}</h1>
                  <p className="hero-subtitle">{slide.subtitle}</p>
                  <div className="hero-actions">
                    <a href={slide.ctaLink} className="hero-btn">
                      {slide.ctaText}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Slider Navigation Dots Controls */}
      <div className="hero-slider-controls">
        <div className="hero-slider-dots">
          {slides.map((_, idx) => (
            <button
              key={idx}
              type="button"
              aria-label={`Slide ${idx + 1}`}
              className={`hero-slider-dot ${idx === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(idx)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
