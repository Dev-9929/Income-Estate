'use client'

import React, { useState, useEffect } from 'react'
import { executeRecaptchaToken } from '@/lib/recaptcha'

interface CalculatorModalProps {
  isOpen?: boolean
  onClose?: () => void
}

export function CalculatorModal({ isOpen = false, onClose }: CalculatorModalProps) {
  const [active, setActive] = useState(isOpen)
  const [amountVal, setAmountVal] = useState(140)
  const [showToast, setShowToast] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showContactFields, setShowContactFields] = useState(false)
  const [honeypot, setHoneypot] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
  })

  useEffect(() => {
    setActive(isOpen)
  }, [isOpen])

  // Calculate yield
  const formatAmount = (val: number) => {
    if (val >= 100) {
      return `₹ ${(val / 100).toFixed(2)} Cr`
    }
    return `₹ ${val} Lakhs`
  }

  const annualYieldRate = 0.0915 // ~9.15% average
  const totalInvestmentRupees = amountVal * 100000
  const monthlyYield = (totalInvestmentRupees * annualYieldRate) / 12
  const monthlyYieldText = `₹ ${(monthlyYield / 100000).toFixed(2)} L`

  const [isSubmittedSuccess, setIsSubmittedSuccess] = useState(false)

  const handleClose = () => {
    setActive(false)
    setShowContactFields(false)
    setIsSubmittedSuccess(false)
    if (onClose) onClose()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!showContactFields) {
      setShowContactFields(true)
      return
    }

    setIsSubmitting(true)
    try {
      const token = await executeRecaptchaToken('calculator_modal')
      await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.name || 'Interested Investor',
          email: formData.email || 'not-provided@income-estate.com',
          phone: formData.phone,
          budget: formatAmount(amountVal),
          message: `Calculated Yield: ${monthlyYieldText}/mo for ${formatAmount(amountVal)} investment.`,
          source: 'Yield Estimator Calculator Modal',
          honeypot,
          recaptchaToken: token,
        }),
      })
      setIsSubmittedSuccess(true)
    } catch (err) {
      console.warn('Calculator submission fallback:', err)
    } finally {
      setIsSubmitting(false)
      setShowToast(true)
      setTimeout(() => {
        setShowToast(false)
        setHoneypot('')
        setFormData({ name: '', phone: '', email: '' })
      }, 3000)
    }
  }

  return (
    <>
      <div
        className={`modal-overlay ${active ? 'active' : ''}`}
        id="calc-modal"
        onClick={(e) => {
          if (e.target === e.currentTarget) handleClose()
        }}
        style={{
          display: active ? 'flex' : 'none',
        }}
      >
        <div className="modal-box">
          <button
            type="button"
            className="modal-close"
            aria-label="Close modal"
            onClick={handleClose}
          >
            &times;
          </button>
          <div className="modal-header">
            <h3 className="modal-title">Yield Estimator</h3>
          </div>
          <div className="modal-body">
            {isSubmittedSuccess ? (
              <div style={{ textAlign: 'center', padding: '2rem 1rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: 'rgba(212, 175, 106, 0.15)', color: 'var(--accent, #D4AF6A)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                  <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h4 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--primary, #061D15)', marginBottom: '0.4rem' }}>
                  Calculation Saved & Inquiry Sent!
                </h4>
                <p style={{ color: 'var(--text-muted, #6E6862)', fontSize: '0.88rem', lineHeight: 1.5, marginBottom: '1.5rem', maxWidth: '320px' }}>
                  Our financial structuring team will send you a detailed investment yield report based on your selected parameters.
                </p>
                <button
                  type="button"
                  onClick={handleClose}
                  className="modal-submit-btn"
                  style={{ width: 'auto', padding: '0.75rem 2rem' }}
                >
                  CLOSE
                </button>
              </div>
            ) : (
              <form className="modal-calc-form lead-form" onSubmit={handleSubmit}>
              <input
                type="text"
                name="website_confirm"
                style={{ display: 'none' }}
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
              />

              <div className="calc-range-group">
                <div className="calc-range-label-row">
                  <label htmlFor="calc-amount">Investment Size</label>
                  <span id="amount-text" className="text-accent">
                    {formatAmount(amountVal)}
                  </span>
                </div>
                <input
                  type="range"
                  id="calc-amount"
                  min="10"
                  max="500"
                  step="10"
                  value={amountVal}
                  onChange={(e) => setAmountVal(Number(e.target.value))}
                  className="calc-range-input"
                />
              </div>

              <div className="calc-results">
                <div className="calc-res-node">
                  <span id="res-yield" className="calc-res-val">
                    {monthlyYieldText}
                  </span>
                  <p className="calc-res-lbl">Estimated Monthly Yield</p>
                </div>
                <div className="calc-res-node">
                  <span id="res-irr" className="calc-res-val">
                    12.0%
                  </span>
                  <p className="calc-res-lbl">Target IRR (Yield + Gain)</p>
                </div>
              </div>

              {showContactFields && (
                <div style={{ marginTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  <input
                    type="text"
                    required
                    placeholder="Your Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.75rem 0.9rem',
                      borderRadius: '4px',
                      border: '1px solid #222B28',
                      backgroundColor: '#090D16',
                      color: '#FFFFFF',
                      fontSize: '0.88rem',
                    }}
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.75rem 0.9rem',
                      borderRadius: '4px',
                      border: '1px solid #222B28',
                      backgroundColor: '#090D16',
                      color: '#FFFFFF',
                      fontSize: '0.88rem',
                    }}
                  />
                </div>
              )}

              <div style={{ marginTop: '1.5rem' }}>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary"
                  style={{ width: '100%', textTransform: 'uppercase' }}
                >
                  {isSubmitting
                    ? 'Submitting...'
                    : showContactFields
                    ? 'Confirm & Register Interest'
                    : 'Register Interest'}
                </button>
              </div>
            </form>
            )}
          </div>
        </div>
      </div>

      {/* Success Toast Message */}
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
    </>
  )
}
