'use client'

import React, { useState, useEffect } from 'react'

interface CalculatorModalProps {
  isOpen?: boolean
  onClose?: () => void
}

export function CalculatorModal({ isOpen = false, onClose }: CalculatorModalProps) {
  const [active, setActive] = useState(isOpen)
  const [amountVal, setAmountVal] = useState(140)
  const [showToast, setShowToast] = useState(false)

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

  const handleClose = () => {
    setActive(false)
    if (onClose) onClose()
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowToast(true)
    setTimeout(() => {
      setShowToast(false)
      handleClose()
    }, 2500)
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
            <form className="modal-calc-form lead-form" onSubmit={handleSubmit}>
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

              <div style={{ marginTop: '1.5rem' }}>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: '100%', textTransform: 'uppercase' }}
                >
                  Register Interest
                </button>
              </div>
            </form>
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
