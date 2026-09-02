'use client'

import React from 'react'

interface PreFooterCtaProps {
  onConnect?: () => void
}

export function PreFooterCta({ onConnect }: PreFooterCtaProps) {
  return (
    <section className="pre-footer-cta" id="contact">
      <div className="pre-footer-bg">
        <video autoPlay muted loop playsInline className="cta-video-bg">
          <source src="/assets/wordpress_media/cta-video.mp4" type="video/mp4" />
          <source src="/assets/video/cta-video.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="pre-footer-content">
        <span className="editorial-tag" style={{ color: 'var(--accent)', marginBottom: '1rem' }}>
          Get in Touch
        </span>
        <h2
          className="editorial-title"
          style={{
            fontSize: 'clamp(2rem, 3.5vw, 3rem)',
            fontWeight: 500,
            color: '#FFFFFF',
            textTransform: 'none',
            marginBottom: '1.5rem',
          }}
        >
          A New Way to Think About<br />
          <em>Property Ownership</em>
        </h2>
        <p
          className="pre-footer-desc"
          style={{
            maxWidth: '800px',
            margin: '0 auto 2.5rem auto',
            fontSize: '0.95rem',
            lineHeight: 1.6,
            opacity: 0.9,
          }}
        >
          We curate only those properties that generate measurable, documented returns. Every listing
          on our platform is verified for income potential before it ever reaches you.
        </p>
        <button
          type="button"
          className="btn btn-calc"
          onClick={() => {
            if (onConnect) {
              onConnect()
            } else {
              window.location.href = '/contact'
            }
          }}
          style={{
            backgroundColor: '#FFFFFF',
            color: '#121815',
            border: 'none',
            padding: '0.9rem 2.5rem',
            fontWeight: 700,
            fontSize: '0.85rem',
            borderRadius: '2px',
          }}
        >
          CONNECT WITH OUR EXPERT
        </button>
      </div>
    </section>
  )
}
