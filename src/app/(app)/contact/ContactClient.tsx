'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { PreFooterCta } from '@/components/home/PreFooterCta'
import { CalculatorModal } from '@/components/modals/CalculatorModal'
import { executeRecaptchaToken } from '@/lib/recaptcha'

export function ContactClient() {
  const [isCalcOpen, setIsCalcOpen] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmittedSuccess, setIsSubmittedSuccess] = useState(false)
  const [honeypot, setHoneypot] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const token = await executeRecaptchaToken('contact_form')
      await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          source: 'Contact Page Inquiry',
          honeypot,
          recaptchaToken: token,
        }),
      })
      setIsSubmittedSuccess(true)
    } catch (err) {
      console.warn('Inquiry submission fallback:', err)
    } finally {
      setIsSubmitting(false)
      setShowToast(true)
      setFormData({ name: '', email: '', phone: '', message: '' })
      setHoneypot('')
      setTimeout(() => {
        setShowToast(false)
      }, 3500)
    }
  }

  return (
    <div className="main-wrapper" style={{ backgroundColor: 'var(--bg-neutral, #F8F6F0)', minHeight: '100vh' }}>
      {/* Header / Navigation */}
      <Header />

      {/* Hero Banner */}
      <section className="contact-hero">
        <h1 className="contact-hero-title">CONTACT US</h1>
      </section>

      {/* Main Contact Content */}
      <main className="container section-padding">
        {/* Breadcrumbs */}
        <nav className="breadcrumbs" aria-label="breadcrumb" style={{ marginBottom: '1.75rem' }}>
          <Link href="/">Home</Link>
          <span>&gt;</span>
          <span>Contact Us</span>
        </nav>

        <div className="contact-grid" style={{ alignItems: 'start' }}>
          {/* Left Column: Info & Map */}
          <div className="contact-info-col">
            <span
              className="editorial-tag"
              style={{
                display: 'inline-block',
                fontSize: '0.8rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.18em',
                color: 'var(--accent, #D4AF6A)',
                marginBottom: '0.75rem',
              }}
            >
              Get In Touch
            </span>

            {/* Title matching site's editorial typography */}
            <h1
              className="editorial-title"
              style={{
                fontFamily: 'var(--font-serif, "DM Sans", sans-serif)',
                fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
                fontWeight: 400,
                color: 'var(--primary, #061D15)',
                lineHeight: 1.18,
                letterSpacing: '-0.02em',
                marginBottom: '1.25rem',
                textTransform: 'none',
              }}
            >
              Have Questions?<br />
              <em style={{ fontStyle: 'italic', color: 'var(--accent, #D4AF6A)', fontWeight: 400 }}>
                We&apos;re Here
              </em>{' '}
              to Help.
            </h1>

            <p
              style={{
                color: 'var(--text-muted, #6E6862)',
                fontSize: '0.95rem',
                lineHeight: 1.7,
                marginBottom: '2.5rem',
                maxWidth: '520px',
              }}
            >
              Every investment decision deserves clarity. Our team works closely with you to identify
              the right opportunities, offering insights, structure, and a seamless experience at every step.
            </p>

            {/* Jaipur Office Card */}
            <div
              style={{
                backgroundColor: 'var(--bg-card, #FFFFFF)',
                border: '1px solid var(--border-color, #EAE7E0)',
                borderRadius: '8px',
                padding: '1.75rem',
                marginBottom: '1.25rem',
                boxShadow: 'var(--shadow-sm, 0 4px 12px rgba(18, 24, 21, 0.03))',
                transition: 'all 0.3s ease',
              }}
            >
              <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '8px',
                    background: 'rgba(212, 175, 106, 0.12)',
                    border: '1px solid rgba(212, 175, 106, 0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="22"
                    height="22"
                    fill="none"
                    stroke="var(--accent, #D4AF6A)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-sans, "DM Sans", sans-serif)',
                      fontSize: '0.95rem',
                      fontWeight: 700,
                      color: 'var(--primary, #061D15)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                      marginBottom: '0.4rem',
                    }}
                  >
                    Jaipur Office
                  </h3>
                  <p
                    style={{
                      color: 'var(--text-muted, #6E6862)',
                      fontSize: '0.9rem',
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    2nd Floor 35/69, Rajat Path, Sector 3,<br />
                    Mansarovar, Jaipur, Rajasthan 302020
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Us On Card */}
            <div
              style={{
                backgroundColor: 'var(--bg-card, #FFFFFF)',
                border: '1px solid var(--border-color, #EAE7E0)',
                borderRadius: '8px',
                padding: '1.75rem',
                marginBottom: '2rem',
                boxShadow: 'var(--shadow-sm, 0 4px 12px rgba(18, 24, 21, 0.03))',
                transition: 'all 0.3s ease',
              }}
            >
              <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '8px',
                    background: 'rgba(212, 175, 106, 0.12)',
                    border: '1px solid rgba(212, 175, 106, 0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="22"
                    height="22"
                    fill="none"
                    stroke="var(--accent, #D4AF6A)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-sans, "DM Sans", sans-serif)',
                      fontSize: '0.95rem',
                      fontWeight: 700,
                      color: 'var(--primary, #061D15)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                      marginBottom: '0.4rem',
                    }}
                  >
                    Contact Us On
                  </h3>
                  <p
                    style={{
                      color: 'var(--text-muted, #6E6862)',
                      fontSize: '0.9rem',
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    Email:{' '}
                    <a
                      href="mailto:sales@income-estate.com"
                      style={{ color: 'var(--accent, #D4AF6A)', fontWeight: 600 }}
                    >
                      sales@income-estate.com
                    </a>
                    <br />
                    Phone:{' '}
                    <a
                      href="tel:+917665212212"
                      style={{ color: 'var(--accent, #D4AF6A)', fontWeight: 600 }}
                    >
                      +91 7665212212
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Google Map Embed */}
            <div
              style={{
                borderRadius: '8px',
                border: '1px solid var(--border-color, #EAE7E0)',
                overflow: 'hidden',
                height: '320px',
                width: '100%',
                boxShadow: 'var(--shadow-sm, 0 4px 12px rgba(18, 24, 21, 0.03))',
              }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.1160351221583!2d75.7533036762391!3d26.836267876694676!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db5dc7818e9bd%3A0xc3cf3388c5ef9c8!2sRajat%20Path%2C%20Mansarovar%2C%20Jaipur%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1718874676839!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Income Estate Jaipur Office"
              />
            </div>
          </div>

          {/* Right Column: Lead Form Card matching Site's Light Luxury Theme */}
          <div
            style={{
              backgroundColor: 'var(--bg-card, #FFFFFF)',
              border: '1px solid var(--border-color, #EAE7E0)',
              borderRadius: '12px',
              padding: '2.75rem 2.5rem',
              boxShadow: 'var(--shadow-md, 0 12px 30px rgba(18, 24, 21, 0.06))',
            }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-serif, "DM Sans", sans-serif)',
                fontSize: '1.4rem',
                fontWeight: 600,
                color: 'var(--primary, #061D15)',
                marginBottom: '0.4rem',
                letterSpacing: '-0.01em',
              }}
            >
              Let&apos;s Start the{' '}
              <em style={{ fontStyle: 'italic', color: 'var(--accent, #D4AF6A)' }}>Conversation.</em>
            </h2>
            <p
              style={{
                color: 'var(--text-muted, #6E6862)',
                fontSize: '0.9rem',
                lineHeight: 1.55,
                marginBottom: '2rem',
              }}
            >
              Share your details and we&apos;ll get back to you with expert guidance.
            </p>

            {isSubmittedSuccess ? (
              <div
                style={{
                  textAlign: 'center',
                  padding: '2.5rem 1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(212, 175, 106, 0.15)',
                    color: 'var(--accent, #D4AF6A)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.25rem',
                  }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="36"
                    height="36"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-serif, "DM Sans", sans-serif)',
                    fontSize: '1.5rem',
                    fontWeight: 600,
                    color: 'var(--primary, #061D15)',
                    marginBottom: '0.5rem',
                  }}
                >
                  Inquiry Submitted Successfully!
                </h3>
                <p
                  style={{
                    color: 'var(--text-muted, #6E6862)',
                    fontSize: '0.95rem',
                    lineHeight: 1.6,
                    marginBottom: '1.75rem',
                    maxWidth: '400px',
                  }}
                >
                  Thank you for reaching out. Your details have been received in our system, and our investment advisor will contact you shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setIsSubmittedSuccess(false)}
                  style={{
                    padding: '0.75rem 1.5rem',
                    borderRadius: '6px',
                    border: '1px solid var(--accent, #D4AF6A)',
                    backgroundColor: 'transparent',
                    color: 'var(--primary, #061D15)',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--accent, #D4AF6A)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent'
                  }}
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <input
                  type="text"
                  name="website_confirm"
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      color: 'var(--primary, #061D15)',
                      marginBottom: '0.4rem',
                    }}
                  >
                    Full Name <span style={{ color: 'var(--accent, #D4AF6A)' }}>*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.85rem 1rem',
                      borderRadius: '6px',
                      border: '1px solid var(--border-color, #EAE7E0)',
                      backgroundColor: 'var(--bg-neutral, #FAF9F6)',
                      color: 'var(--text-dark, #111A16)',
                      fontSize: '0.92rem',
                      outline: 'none',
                      transition: 'border-color 0.25s, background-color 0.25s',
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = 'var(--accent, #D4AF6A)'
                      e.currentTarget.style.backgroundColor = '#FFFFFF'
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border-color, #EAE7E0)'
                      e.currentTarget.style.backgroundColor = 'var(--bg-neutral, #FAF9F6)'
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      color: 'var(--primary, #061D15)',
                      marginBottom: '0.4rem',
                    }}
                  >
                    Email <span style={{ color: 'var(--accent, #D4AF6A)' }}>*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.85rem 1rem',
                      borderRadius: '6px',
                      border: '1px solid var(--border-color, #EAE7E0)',
                      backgroundColor: 'var(--bg-neutral, #FAF9F6)',
                      color: 'var(--text-dark, #111A16)',
                      fontSize: '0.92rem',
                      outline: 'none',
                      transition: 'border-color 0.25s, background-color 0.25s',
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = 'var(--accent, #D4AF6A)'
                      e.currentTarget.style.backgroundColor = '#FFFFFF'
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border-color, #EAE7E0)'
                      e.currentTarget.style.backgroundColor = 'var(--bg-neutral, #FAF9F6)'
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      color: 'var(--primary, #061D15)',
                      marginBottom: '0.4rem',
                    }}
                  >
                    Phone <span style={{ color: 'var(--accent, #D4AF6A)' }}>*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="Enter your contact number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.85rem 1rem',
                      borderRadius: '6px',
                      border: '1px solid var(--border-color, #EAE7E0)',
                      backgroundColor: 'var(--bg-neutral, #FAF9F6)',
                      color: 'var(--text-dark, #111A16)',
                      fontSize: '0.92rem',
                      outline: 'none',
                      transition: 'border-color 0.25s, background-color 0.25s',
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = 'var(--accent, #D4AF6A)'
                      e.currentTarget.style.backgroundColor = '#FFFFFF'
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border-color, #EAE7E0)'
                      e.currentTarget.style.backgroundColor = 'var(--bg-neutral, #FAF9F6)'
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      color: 'var(--primary, #061D15)',
                      marginBottom: '0.4rem',
                    }}
                  >
                    Message <span style={{ color: 'var(--accent, #D4AF6A)' }}>*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="How can our investment team help you?"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.85rem 1rem',
                      borderRadius: '6px',
                      border: '1px solid var(--border-color, #EAE7E0)',
                      backgroundColor: 'var(--bg-neutral, #FAF9F6)',
                      color: 'var(--text-dark, #111A16)',
                      fontSize: '0.92rem',
                      outline: 'none',
                      resize: 'none',
                      transition: 'border-color 0.25s, background-color 0.25s',
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = 'var(--accent, #D4AF6A)'
                      e.currentTarget.style.backgroundColor = '#FFFFFF'
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border-color, #EAE7E0)'
                      e.currentTarget.style.backgroundColor = 'var(--bg-neutral, #FAF9F6)'
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    marginTop: '0.5rem',
                    width: '100%',
                    backgroundColor: 'var(--accent, #D4AF6A)',
                    color: 'var(--primary, #061D15)',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '1rem',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    boxShadow: '0 4px 14px rgba(212, 175, 106, 0.3)',
                    transition: 'background-color 0.25s, transform 0.25s',
                    opacity: isSubmitting ? 0.7 : 1,
                  }}
                  onMouseEnter={(e) => {
                    if (!isSubmitting) {
                      e.currentTarget.style.backgroundColor = 'var(--accent-hover, #C5A880)'
                      e.currentTarget.style.transform = 'translateY(-1px)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSubmitting) {
                      e.currentTarget.style.backgroundColor = 'var(--accent, #D4AF6A)'
                      e.currentTarget.style.transform = 'translateY(0)'
                    }
                  }}
                >
                  {isSubmitting ? 'SUBMITTING...' : 'SUBMIT INQUIRY'}
                </button>
              </form>
            )}
          </div>
        </div>
      </main>

      {/* Pre-Footer CTA */}
      <PreFooterCta onConnect={() => setIsCalcOpen(true)} />

      {/* Global Footer */}
      <Footer />

      {/* Interactive Calculator Modal */}
      <CalculatorModal isOpen={isCalcOpen} onClose={() => setIsCalcOpen(false)} />

      {/* Toast */}
      {showToast && (
        <div
          className="toast-msg"
          style={{
            display: 'flex',
            position: 'fixed',
            bottom: '2rem',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 9999,
            backgroundColor: 'var(--primary, #061D15)',
            color: '#FFFFFF',
            padding: '1rem 1.75rem',
            borderRadius: '6px',
            boxShadow: 'var(--shadow-lg)',
            alignItems: 'center',
            gap: '0.75rem',
            fontSize: '0.9rem',
          }}
        >
          <svg viewBox="0 0 24 24" width="20" height="20" stroke="#D4AF6A" strokeWidth="2.5" fill="none">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span>Inquiry Submitted! Our advisor will call you shortly.</span>
        </div>
      )}
    </div>
  )
}
