'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'

interface HeaderProps {
  onOpenConsultation?: () => void
}

export function Header({ onOpenConsultation }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  // Scroll listener for sticky header background
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 992) {
        setMobileMenuOpen(false)
        setActiveDropdown(null)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const toggleMobileMenu = (e: React.MouseEvent) => {
    e.stopPropagation()
    setMobileMenuOpen((prev) => {
      if (prev) {
        setActiveDropdown(null)
      }
      return !prev
    })
  }

  const handleDropdownClick = (e: React.MouseEvent, dropdownId: string) => {
    if (window.innerWidth <= 992) {
      e.preventDefault()
      e.stopPropagation()
      setActiveDropdown((prev) => (prev === dropdownId ? null : dropdownId))
    }
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
    setActiveDropdown(null)
  }

  const handleConsultationClick = () => {
    closeMobileMenu()
    if (onOpenConsultation) {
      onOpenConsultation()
    } else {
      window.location.href = '/contact'
    }
  }

  return (
    <header className={`header ${isScrolled ? 'scroll-shadow' : ''}`}>
      <div className="container nav-container">
        {/* Left Side (Desktop: CTA + Left Links) */}
        <div className="nav-left-col">
          <div className="nav-cta">
            <button
              type="button"
              className="btn btn-outline btn-calc"
              id="btn-header-consultation"
              onClick={handleConsultationClick}
            >
              Book Consultation
            </button>
          </div>
          <ul className="nav-links-left">
            <li
              className={`nav-item-dropdown megamenu-item ${activeDropdown === 'concept' ? 'active' : ''}`}
            >
              <a
                href="#"
                className="nav-link"
                id="link-concept"
                onClick={(e) => handleDropdownClick(e, 'concept')}
              >
                The Concept <span className="arrow">&#9662;</span>
              </a>
              <div className="megamenu align-left">
                <div className="megamenu-content">
                  <div className="megamenu-left">
                    <img
                      src="/assets/wordpress_media/elegant-music-lounge-with-comfortable-seating.webp"
                      alt="Luxury Fractional Vacation Concept"
                    />
                    <div className="megamenu-image-overlay">
                      <span className="megamenu-tag">The Concept</span>
                      <h4>Fractional Ownership</h4>
                      <p>Co-own premium income-generating holiday resorts and earn stable returns.</p>
                    </div>
                  </div>
                  <div className="megamenu-right">
                    <ul className="megamenu-links">
                      <li>
                        <Link href="/about" onClick={closeMobileMenu}>
                          <span className="link-title">About Us</span>
                          <span className="link-desc">
                            Who we are, our mission, and transparent fractional investment team.
                          </span>
                        </Link>
                      </li>
                      <li>
                        <Link href="/how-it-works" onClick={closeMobileMenu}>
                          <span className="link-title">How It Works</span>
                          <span className="link-desc">
                            Step-by-step process of co-ownership, yields, and exit strategy.
                          </span>
                        </Link>
                      </li>
                      <li>
                        <Link href="/services" onClick={closeMobileMenu}>
                          <span className="link-title">Our Services</span>
                          <span className="link-desc">
                            Property management, rent distribution, tax support & concierge.
                          </span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <Link href="/properties" className="nav-link" id="link-roi-properties" onClick={closeMobileMenu}>
                ROI Properties
              </Link>
            </li>
          </ul>
        </div>

        {/* Centered Brand Logo */}
        <Link href="/" className="logo-area" id="nav-logo-link" onClick={closeMobileMenu}>
          <img
            src="/assets/wordpress_media/new-site-logo.svg"
            alt="Income Estate Logo"
            className="logo-img"
          />
        </Link>

        {/* Right Side (Desktop: Right Links) */}
        <div className="nav-right-col">
          <ul className="nav-links-right">
            <li>
              <Link href="/branded-residences" className="nav-link" id="link-branded-residences" onClick={closeMobileMenu}>
                Branded Residences
              </Link>
            </li>
            <li
              className={`nav-item-dropdown megamenu-item ${activeDropdown === 'resources' ? 'active' : ''}`}
            >
              <a
                href="#"
                className="nav-link"
                id="link-resources"
                onClick={(e) => handleDropdownClick(e, 'resources')}
              >
                Resources <span className="arrow">&#9662;</span>
              </a>
              <div className="megamenu align-right">
                <div className="megamenu-content">
                  <div className="megamenu-left">
                    <img
                      src="/assets/wordpress_media/mansion_g5c9re.webp"
                      alt="Investment Resources"
                    />
                    <div className="megamenu-image-overlay">
                      <span className="megamenu-tag">Resources</span>
                      <h4>Calculators & Guides</h4>
                      <p>Empower your choices with financial estimation and expert insights.</p>
                    </div>
                  </div>
                  <div className="megamenu-right">
                    <ul className="megamenu-links">
                      <li>
                        <Link href="/#calculator" onClick={closeMobileMenu}>
                          <span className="link-title">ROI Calculator</span>
                          <span className="link-desc">
                            Estimate your monthly yields, capital appreciation, and returns.
                          </span>
                        </Link>
                      </li>
                      <li>
                        <Link href="/blogs" onClick={closeMobileMenu}>
                          <span className="link-title">Blogs</span>
                          <span className="link-desc">
                            Insights, articles, and expert guides on real estate investing.
                          </span>
                        </Link>
                      </li>
                      <li>
                        <Link href="/blogs" onClick={closeMobileMenu}>
                          <span className="link-title">News & Updates</span>
                          <span className="link-desc">
                            Latest news on resort fractional share regulations and growth.
                          </span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <Link href="/contact" className="nav-link" id="link-contact" onClick={closeMobileMenu}>
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Mobile Hamburger Toggle Button (Right Side on Mobile) */}
        <button
          className={`mobile-nav-toggle ${mobileMenuOpen ? 'active' : ''}`}
          aria-label="Toggle Navigation"
          id="mobile-toggle"
          onClick={toggleMobileMenu}
          type="button"
        >
          <span />
          <span />
          <span />
        </button>

        {/* Mobile Slide-Over Drawer & Backdrop */}
        {mobileMenuOpen && (
          <>
            <div
              className="mobile-menu-backdrop"
              onClick={closeMobileMenu}
              aria-hidden="true"
            />
            <div className="mobile-drawer-wrapper active">
              {/* Mobile Drawer Header */}
              <div className="mobile-drawer-top">
                <Link href="/" onClick={closeMobileMenu} className="mobile-drawer-logo">
                  <img
                    src="/assets/wordpress_media/new-site-logo.svg"
                    alt="Income Estate"
                    className="drawer-logo-img"
                  />
                </Link>
                <button
                  type="button"
                  className="mobile-drawer-close"
                  onClick={closeMobileMenu}
                  aria-label="Close Menu"
                >
                  <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              {/* Mobile Drawer Menu Links */}
              <div className="mobile-drawer-content">
                <div className="mobile-drawer-nav">
                  {/* Item 1: The Concept (Accordion) */}
                  <div className={`mobile-nav-item ${activeDropdown === 'concept' ? 'active' : ''}`}>
                    <button
                      type="button"
                      className="mobile-nav-btn"
                      onClick={(e) => handleDropdownClick(e, 'concept')}
                    >
                      <span>The Concept</span>
                      <span className="arrow">&#9662;</span>
                    </button>
                    {activeDropdown === 'concept' && (
                      <div className="mobile-sub-menu">
                        <Link href="/about" onClick={closeMobileMenu}>About Us</Link>
                        <Link href="/how-it-works" onClick={closeMobileMenu}>How It Works</Link>
                        <Link href="/services" onClick={closeMobileMenu}>Our Services</Link>
                      </div>
                    )}
                  </div>

                  {/* Item 2: ROI Properties */}
                  <div className="mobile-nav-item">
                    <Link href="/properties" className="mobile-nav-link" onClick={closeMobileMenu}>
                      ROI Properties
                    </Link>
                  </div>

                  {/* Item 3: Branded Residences */}
                  <div className="mobile-nav-item">
                    <Link href="/branded-residences" className="mobile-nav-link" onClick={closeMobileMenu}>
                      Branded Residences
                    </Link>
                  </div>

                  {/* Item 4: Resources (Accordion) */}
                  <div className={`mobile-nav-item ${activeDropdown === 'resources' ? 'active' : ''}`}>
                    <button
                      type="button"
                      className="mobile-nav-btn"
                      onClick={(e) => handleDropdownClick(e, 'resources')}
                    >
                      <span>Resources</span>
                      <span className="arrow">&#9662;</span>
                    </button>
                    {activeDropdown === 'resources' && (
                      <div className="mobile-sub-menu">
                        <Link href="/#calculator" onClick={closeMobileMenu}>ROI Calculator</Link>
                        <Link href="/blogs" onClick={closeMobileMenu}>Blogs</Link>
                        <Link href="/blogs" onClick={closeMobileMenu}>News &amp; Updates</Link>
                      </div>
                    )}
                  </div>

                  {/* Item 5: Contact Us */}
                  <div className="mobile-nav-item">
                    <Link href="/contact" className="mobile-nav-link" onClick={closeMobileMenu}>
                      Contact Us
                    </Link>
                  </div>
                </div>
              </div>

              {/* Mobile Drawer Bottom CTA */}
              <div className="mobile-drawer-bottom">
                <button
                  type="button"
                  className="btn-mobile-consultation"
                  onClick={handleConsultationClick}
                >
                  Book Consultation
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  )
}
