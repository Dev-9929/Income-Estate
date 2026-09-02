'use client'

import React from 'react'

export function PhilosophySection() {
  return (
    <section
      className="section-padding philosophy-section"
      id="philosophy"
      style={{
        backgroundColor: '#FAF9F6',
        borderTop: '1px solid #EAE7E0',
        padding: '6rem 0',
      }}
    >
      <div className="container philosophy-grid">
        {/* Left side: Brand story */}
        <div className="philosophy-left">
          <span className="editorial-tag">Our Philosophy</span>
          <h2 className="editorial-title">
            Architects of<br />
            <em>Passive Wealth</em>
          </h2>
          <p
            className="philosophy-desc"
            style={{
              fontSize: '1.05rem',
              lineHeight: 1.7,
              color: 'var(--text-dark)',
              margin: '2rem 0 1.5rem 0',
              fontFamily: 'var(--font-serif)',
            }}
          >
            At Income Estate, we believe property co-ownership should be as effortless as it is
            rewarding. We select and manage premium resort and branded estate assets so you don't
            have to deal with typical landlord hassles.
          </p>
          <p
            className="philosophy-text"
            style={{
              fontSize: '0.92rem',
              lineHeight: 1.65,
              color: 'var(--text-muted)',
              marginBottom: '2rem',
            }}
          >
            Traditional real estate often binds capital and demands direct operational management.
            Our co-ownership model frees you from maintenance, tax administration, and tenancy
            disputes while delivering institutional-grade, data-backed monthly rental yields
            directly to your account.
          </p>
          <div
            className="philosophy-signature"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.5rem',
              borderTop: '1px solid #EAE7E0',
              paddingTop: '1.5rem',
            }}
          >
            <div
              className="signature-line"
              style={{ width: '45px', height: '1px', backgroundColor: 'var(--accent)' }}
            />
            <span
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '0.88rem',
                fontStyle: 'italic',
                letterSpacing: '0.05em',
                color: 'var(--primary)',
              }}
            >
              Curating Generational Yields
            </span>
          </div>
        </div>

        {/* Right side: Visual portrait stack */}
        <div className="philosophy-right">
          <div className="philosophy-img-stack">
            <div className="philosophy-img-frame">
              <img
                src="/assets/wordpress_media/HNIs-Are-Shifting-Toward.jpg"
                alt="Luxury Real Estate Portfolio"
                className="phil-img"
              />
            </div>
            <div className="philosophy-img-frame-accent">
              {/* decorative frame border */}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
