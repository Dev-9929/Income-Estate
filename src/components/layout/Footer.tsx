'use client'

import React from 'react'
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Column 1 (Logo, description, CTA buttons) */}
          <div className="footer-logo-desc">
            <div
              className="logo-area"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '1.5rem',
              }}
            >
              <img
                src="/assets/wordpress_media/new-site-logo.svg"
                alt="Income Estate Footer Logo"
                style={{ height: '38px', width: 'auto', filter: 'none' }}
              />
            </div>
            <p
              style={{
                color: 'rgba(255, 255, 255, 0.75)',
                fontSize: '0.9rem',
                lineHeight: 1.65,
                marginBottom: '2.5rem',
                maxWidth: '480px',
              }}
            >
              At Income Estate, we don't just sell properties we curate income-generating assets
              designed to build long-term, generational wealth. Our platform focuses on opportunities
              that deliver structured returns, passive income, and financial clarity for modern
              investors.
            </p>
            <div className="footer-btn-group" style={{ display: 'flex', gap: '1rem' }}>
              <Link
                href="/contact"
                className="btn btn-calc"
                style={{
                  backgroundColor: '#222B28',
                  color: '#CCAF72',
                  border: '1.5px solid #222B28',
                  padding: '0.7rem 2rem',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  borderRadius: '2px',
                }}
              >
                BOOK A CALL
              </Link>
              <Link
                href="/roi-properties"
                className="btn btn-calc"
                style={{
                  backgroundColor: '#CCAF72',
                  color: '#121815',
                  border: '1.5px solid #CCAF72',
                  padding: '0.7rem 2rem',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  borderRadius: '2px',
                }}
              >
                INVEST
              </Link>
            </div>
          </div>

          {/* Column 2 (Properties) */}
          <div>
            <h3
              className="footer-title"
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '1.15rem',
                fontWeight: 700,
                color: '#FFFFFF',
                textTransform: 'none',
                marginBottom: '1.5rem',
                letterSpacing: '0.02em',
              }}
            >
              Properties
            </h3>
            <ul
              className="footer-links"
              style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
            >
              <li>
                <Link
                  href="/roi-properties"
                  style={{
                    color: 'rgba(255, 255, 255, 0.75)',
                    fontSize: '0.9rem',
                    transition: 'color 0.3s',
                  }}
                >
                  ROI Properties
                </Link>
              </li>
              <li>
                <Link
                  href="/branded-residences"
                  style={{
                    color: 'rgba(255, 255, 255, 0.75)',
                    fontSize: '0.9rem',
                    transition: 'color 0.3s',
                  }}
                >
                  Branded Residences
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  style={{
                    color: 'rgba(255, 255, 255, 0.75)',
                    fontSize: '0.9rem',
                    transition: 'color 0.3s',
                  }}
                >
                  Our Services
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 (Company) */}
          <div>
            <h3
              className="footer-title"
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '1.15rem',
                fontWeight: 700,
                color: '#FFFFFF',
                textTransform: 'none',
                marginBottom: '1.5rem',
                letterSpacing: '0.02em',
              }}
            >
              Company
            </h3>
            <ul
              className="footer-links"
              style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
            >
              <li>
                <Link
                  href="/about"
                  style={{
                    color: 'rgba(255, 255, 255, 0.75)',
                    fontSize: '0.9rem',
                    transition: 'color 0.3s',
                  }}
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/how-it-works"
                  style={{
                    color: 'rgba(255, 255, 255, 0.75)',
                    fontSize: '0.9rem',
                    transition: 'color 0.3s',
                  }}
                >
                  How it works
                </Link>
              </li>
              <li>
                <Link
                  href="/#calculator"
                  style={{
                    color: 'rgba(255, 255, 255, 0.75)',
                    fontSize: '0.9rem',
                    transition: 'color 0.3s',
                  }}
                >
                  ROI Calculator
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  style={{
                    color: 'rgba(255, 255, 255, 0.75)',
                    fontSize: '0.9rem',
                    transition: 'color 0.3s',
                  }}
                >
                  Contact us
                </Link>
              </li>
              <li>
                <Link
                  href="/blogs"
                  style={{
                    color: 'rgba(255, 255, 255, 0.75)',
                    fontSize: '0.9rem',
                    transition: 'color 0.3s',
                  }}
                >
                  Blogs
                </Link>
              </li>
              <li>
                <Link
                  href="/blogs"
                  style={{
                    color: 'rgba(255, 255, 255, 0.75)',
                    fontSize: '0.9rem',
                    transition: 'color 0.3s',
                  }}
                >
                  News
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & socials */}
        <div
          className="footer-bottom"
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            paddingTop: '2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1.5rem',
          }}
        >
          <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.85rem' }}>
            &copy; {new Date().getFullYear()} ITXIT Estates LLP &ndash; All rights reserved
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <span style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.8)', fontWeight: 600 }}>
              Follow me
            </span>

            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '36px',
                height: '36px',
                border: '1.5px solid rgba(255, 255, 255, 0.4)',
                borderRadius: '2px',
                color: '#FFFFFF',
                transition: 'all 0.3s',
              }}
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '36px',
                height: '36px',
                border: '1.5px solid rgba(255, 255, 255, 0.4)',
                borderRadius: '2px',
                color: '#FFFFFF',
                transition: 'all 0.3s',
              }}
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
