'use client'

import React from 'react'

interface HeroBannerProps {
  title?: React.ReactNode
  eyebrow?: string
  videoSrc?: string
}

export function HeroBanner({
  title,
  eyebrow = 'FEMA-COMPLIANT INSTITUTIONAL REAL ESTATE',
  videoSrc = '/assets/video/Home-banner-video.mp4',
}: HeroBannerProps) {
  const handleScrollDown = () => {
    const nextSection = document.getElementById('top-stats-section') || document.querySelector('.top-stats-bar')
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.scrollBy({ top: window.innerHeight * 0.85, behavior: 'smooth' })
    }
  }

  return (
    <section className="cinematic-video-hero" id="hero-section">
      {/* Background Fullscreen Video Layer */}
      <div className="cinematic-video-wrapper">
        <video
          className="cinematic-bg-video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
        <div className="cinematic-video-overlay" />
      </div>

      {/* Centered Luxury Editorial Content */}
      <div className="cinematic-hero-container">
        <div className="cinematic-hero-content">
          {/* Subtle Luxury Eyebrow */}
          {eyebrow && (
            <div className="cinematic-hero-eyebrow">
              <span className="eyebrow-line left" />
              <span className="eyebrow-text">{eyebrow}</span>
              <span className="eyebrow-line right" />
            </div>
          )}

          {/* Masterpiece Editorial Heading */}
          <h1 className="cinematic-hero-title">
            {title || (
              <>
                <span className="title-line-1">Co-Own High-Yield Resorts</span>
                <span className="title-line-2">&amp; Commercial Real Estate</span>
              </>
            )}
          </h1>
        </div>
      </div>

      {/* Ultra-Refined Scroll Indicator */}
      <div className="cinematic-scroll-indicator" onClick={handleScrollDown} role="button" tabIndex={0} aria-label="Scroll down">
        <span className="scroll-text">EXPLORE</span>
        <div className="scroll-mouse">
          <div className="scroll-wheel" />
        </div>
      </div>
    </section>
  )
}
