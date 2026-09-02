'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface HeroAsset {
  id: string
  slug: string
  name: string
  category: string
  yieldTag: string
  minInvestment: string
  bgImage: string
  alt: string
}

const HERO_ASSETS: HeroAsset[] = [
  {
    id: 'asset-skyline',
    slug: 'skyline-arcadia',
    name: 'Skyline Arcadia',
    category: 'Commercial & Retail Suites',
    yieldTag: '9.2% Assured Yield',
    minInvestment: '₹ 70 Lacs',
    bgImage: '/assets/wordpress_media/Project-Photo-9-Skyline-Arcadia-Jaipur-5442983_2000_1226.jpg',
    alt: 'Skyline Arcadia Commercial Destination',
  },
  {
    id: 'asset-turban',
    slug: 'turban-resort-chandwaji',
    name: 'Turban Resort',
    category: 'Operational SLB Eco-Resort',
    yieldTag: '10.5% Net Yield',
    minInvestment: '₹ 80 Lacs',
    bgImage: '/assets/wordpress_media/Turbun_Group_Resort_Reception_View_10.jpg.jpg',
    alt: 'Turban Resort Chandwaji',
  },
  {
    id: 'asset-aryaville',
    slug: 'aryaville',
    name: 'Aryaville Luxury Villas',
    category: 'Private Pool Wellness Estates',
    yieldTag: '14.2% Target IRR',
    minInvestment: '₹ 2.75 Cr',
    bgImage: '/assets/aryaville_resort.png',
    alt: 'Aryaville Luxury Pool Villas',
  },
]

interface HeroBannerProps {
  onOpenCalculator?: () => void
}

export function HeroBanner({ onOpenCalculator }: HeroBannerProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeAsset = HERO_ASSETS[activeIndex]

  const nextAsset = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % HERO_ASSETS.length)
  }, [])

  // Auto-cycle backdrop smoothly every 6.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      nextAsset()
    }, 6500)
    return () => clearInterval(timer)
  }, [nextAsset])

  return (
    <section className="lux-hero" id="hero-section">
      {/* Background Image Layer with Smooth Cross-Fade */}
      <div className="lux-hero-bg-wrapper">
        {HERO_ASSETS.map((asset, index) => {
          const isCurrent = index === activeIndex
          return (
            <div
              key={asset.id}
              className={`lux-hero-bg-layer ${isCurrent ? 'active' : ''}`}
              aria-hidden={!isCurrent}
            >
              <Image
                src={asset.bgImage}
                alt={asset.alt}
                fill
                priority={index === 0}
                quality={90}
                sizes="100vw"
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center 45%',
                }}
              />
            </div>
          )
        })}
        <div className="lux-hero-overlay" />
      </div>

      {/* Main Hero Content */}
      <div className="container lux-hero-container">
        <div className="lux-hero-content">
          {/* Tagline Pill */}
          <div className="lux-hero-pill">
            <span className="lux-pill-dot" />
            <span>FEMA-COMPLIANT INSTITUTIONAL REAL ESTATE</span>
          </div>

          {/* Editorial Headline */}
          <h1 className="lux-hero-title">
            Co-Own High-Yield Resorts<br />
            <em>&amp; Commercial Real Estate</em>
          </h1>

          {/* Subtitle */}
          <p className="lux-hero-subtitle">
            Earn <strong>8.5% to 14.5%</strong> passive annual cash flows backed by registered 5–9 year
            institutional leases. Transparent co-ownership tailored for modern global investors and NRIs.
          </p>

          {/* Dual Action CTAs */}
          <div className="lux-hero-actions">
            <Link href="/properties" className="lux-btn-primary" id="hero-btn-explore">
              <span>EXPLORE PROPERTIES</span>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z" />
              </svg>
            </Link>

            {onOpenCalculator ? (
              <button
                type="button"
                className="lux-btn-ghost"
                onClick={onOpenCalculator}
                id="hero-btn-calc"
              >
                <span>CALCULATE YIELD</span>
                <svg viewBox="0 0 24 24" width="15" height="15" stroke="currentColor" strokeWidth="2" fill="none">
                  <rect x="4" y="2" width="16" height="20" rx="2" />
                  <line x1="8" y1="6" x2="16" y2="6" />
                  <line x1="8" y1="10" x2="16" y2="10" />
                  <line x1="8" y1="14" x2="16" y2="14" />
                </svg>
              </button>
            ) : (
              <Link href="/how-it-works" className="lux-btn-ghost" id="hero-btn-how">
                <span>HOW IT WORKS</span>
              </Link>
            )}
          </div>
        </div>

        {/* Featured Assets Switcher Strip (Lightweight & Clean) */}
        <div className="lux-hero-bottom-bar">
          <div className="lux-hero-asset-tabs">
            {HERO_ASSETS.map((asset, index) => {
              const isSelected = index === activeIndex
              return (
                <button
                  key={asset.id}
                  type="button"
                  className={`lux-asset-tab ${isSelected ? 'active' : ''}`}
                  onClick={() => setActiveIndex(index)}
                  id={`hero-tab-${asset.slug}`}
                >
                  <div className="lux-tab-num">0{index + 1}</div>
                  <div className="lux-tab-info">
                    <div className="lux-tab-name">{asset.name}</div>
                    <div className="lux-tab-meta">
                      <span className="lux-tab-yield">{asset.yieldTag}</span>
                      <span className="lux-tab-sep">·</span>
                      <span className="lux-tab-min">{asset.minInvestment}</span>
                    </div>
                  </div>
                  <div className="lux-tab-progress" />
                </button>
              )
            })}
          </div>

          {/* Quick Metrics Bar */}
          <div className="lux-hero-metrics">
            <div className="lux-metric-item">
              <span className="lux-metric-val">₹50 Cr+</span>
              <span className="lux-metric-lbl">Assets Managed</span>
            </div>
            <div className="lux-metric-item">
              <span className="lux-metric-val">100%</span>
              <span className="lux-metric-lbl">Pre-Leased</span>
            </div>
            <div className="lux-metric-item">
              <span className="lux-metric-val">0%</span>
              <span className="lux-metric-lbl">Management Hassle</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
