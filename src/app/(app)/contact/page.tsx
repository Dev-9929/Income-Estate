'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { CalculatorModal } from '@/components/modals/CalculatorModal'

export default function ContactPage() {
  const [isCalcOpen, setIsCalcOpen] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
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
      await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          source: 'Contact Page Inquiry',
        }),
      })
    } catch (err) {
      console.warn('Inquiry submission fallback:', err)
    } finally {
      setIsSubmitting(false)
      setShowToast(true)
      setTimeout(() => {
        setShowToast(false)
        setFormData({ name: '', email: '', phone: '', message: '' })
      }, 3500)
    }
  }

  return (
    <div className="main-wrapper">
      {/* Header / Navigation */}
      <Header />

      {/* Hero Banner */}
      <section className="contact-hero">
        <h1 className="contact-hero-title">CONTACT US</h1>
      </section>

      {/* Main Contact Content */}
      <main className="container section-padding">
        {/* Breadcrumbs */}
        <nav className="breadcrumbs" aria-label="breadcrumb">
          <Link href="/">Home</Link>
          <span>&gt;</span>
          Contact Us
        </nav>

        <div className="contact-grid">
          {/* Left Column: Info & Map */}
          <div className="contact-info-col">
            <span className="contact-info-subtitle">Get In Touch</span>
            <h2 className="contact-info-title">
              HAVE QUESTIONS?<br />
              WE&apos;RE HERE TO HELP.
            </h2>
            <p className="contact-info-desc">
              Every investment decision deserves clarity. Our team works closely with you to identify
              the right opportunities, offering insights, structure, and a seamless experience at
              every step.
            </p>

            {/* Jaipur Office Card */}
            <div className="contact-info-card-luxury">
              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'start' }}>
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    background: 'rgba(197, 168, 128, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                    fill="none"
                    stroke="#CCAF72"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <h3 className="contact-detail-hdr" style={{ marginBottom: '0.5rem' }}>
                    Jaipur Office
                  </h3>
                  <p className="contact-detail-text">
                    2nd Floor 35/69, Rajat Path, Sector 3,<br />
                    Mansarovar, Jaipur, Rajasthan 302020
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Us On Card */}
            <div className="contact-info-card-luxury">
              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'start' }}>
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    background: 'rgba(197, 168, 128, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                    fill="none"
                    stroke="#CCAF72"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div>
                  <h3 className="contact-detail-hdr" style={{ marginBottom: '0.5rem' }}>
                    Contact Us On
                  </h3>
                  <p className="contact-detail-text">
                    Email:{' '}
                    <a
                      href="mailto:sales@income-estate.com"
                      style={{ color: 'var(--accent)', fontWeight: 600 }}
                    >
                      sales@income-estate.com
                    </a>
                    <br />
                    Phone:{' '}
                    <a
                      href="tel:+917665212212"
                      style={{ color: 'var(--accent)', fontWeight: 600 }}
                    >
                      +91 7665212212
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Google Map Embed */}
            <div className="contact-map-container">
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

          {/* Right Column: Lead Form */}
          <div className="contact-form-col">
            <h3 className="contact-form-title">LET&apos;S START THE CONVERSATION.</h3>
            <p className="contact-form-desc">
              Share your details and we&apos;ll get back to you with expert guidance.
            </p>

            <form className="lead-form" onSubmit={handleSubmit}>
              <div className="form-field-wrap">
                <input
                  type="text"
                  className="contact-form-input"
                  placeholder=" "
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                <label className="form-field-label">Full Name</label>
              </div>
              <div className="form-field-wrap">
                <input
                  type="email"
                  className="contact-form-input"
                  placeholder=" "
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                <label className="form-field-label">Email</label>
              </div>
              <div className="form-field-wrap">
                <input
                  type="tel"
                  className="contact-form-input"
                  placeholder=" "
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
                <label className="form-field-label">Phone</label>
              </div>
              <div className="form-field-wrap">
                <textarea
                  className="contact-form-input"
                  placeholder=" "
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
                <label className="form-field-label">Message</label>
              </div>
              <button type="submit" className="btn-contact-submit-luxury">
                Submit
              </button>
            </form>
          </div>
        </div>
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Interactive Calculator Modal */}
      <CalculatorModal isOpen={isCalcOpen} onClose={() => setIsCalcOpen(false)} />

      {/* Success Toast */}
      <div
        className="toast-msg"
        style={{
          display: showToast ? 'flex' : 'none',
          opacity: showToast ? 1 : 0,
          transform: showToast ? 'translate(-50%, 0)' : 'translate(-50%, 20px)',
          transition: 'all 0.3s ease',
        }}
      >
        <svg viewBox="0 0 24 24" strokeWidth="2.5">
          <path
            d="M22 11.08V12a10 10 0 1 1-5.93-9.14"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
        <span>Inquiry Submitted! Our advisor will call you shortly.</span>
      </div>
    </div>
  )
}
