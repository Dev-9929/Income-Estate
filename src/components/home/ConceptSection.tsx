'use client'

import React from 'react'
import { conceptPillarsData, ConceptPillar } from '@/data/home-data'

interface ConceptSectionProps {
  pillars?: ConceptPillar[]
}

export function ConceptSection({ pillars = conceptPillarsData }: ConceptSectionProps) {
  return (
    <section className="section-padding" id="concept">
      <div className="container">
        <div className="concept-editorial-grid">
          {/* Left Side: Overlapping Image Composition */}
          <div className="concept-img-composition">
            <img
              src="/assets/wordpress_media/arayvilla-scaled-1.webp"
              alt="Premium Fractional Resort Investment"
              className="concept-img-main"
            />
            <img
              src="/assets/wordpress_media/elegant-music-lounge-with-comfortable-seating.webp"
              alt="Luxury Resort Interior"
              className="concept-img-secondary"
            />
            <div className="concept-metric-badge">
              <span className="val">8.6%</span>
              <span className="lbl">AVERAGE ROI</span>
            </div>
          </div>

          {/* Right Side: Title, Description & Value Pillars List */}
          <div className="concept-right">
            <span className="editorial-tag">Built for Investors</span>
            <h2 className="editorial-title">
              Defined by Returns.<br />
              <em>Designed for Investors</em>
            </h2>
            <p className="concept-desc" style={{ marginBottom: '2rem' }}>
              We curate only those properties that deliver structured, measurable returns. Every
              opportunity is evaluated for income potential, stability, and long-term value before it
              reaches you.
            </p>

            <div className="concept-pillars-list">
              {pillars.map((pillar) => (
                <div key={pillar.num} className="concept-pillar-item">
                  <span className="concept-pillar-num">{pillar.num}</span>
                  <div className="concept-pillar-content">
                    <h3 className="concept-pillar-title">{pillar.title}</h3>
                    <p className="concept-pillar-desc">{pillar.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <a
              href="#contact"
              className="concept-btn-link"
              id="btn-discover-concept"
              style={{ marginTop: '2.5rem' }}
            >
              DISCOVER INCOME ESTATE
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
