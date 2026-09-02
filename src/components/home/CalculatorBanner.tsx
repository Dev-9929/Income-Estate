'use client'

import React from 'react'

interface CalculatorBannerProps {
  onOpenCalculator?: () => void
}

export function CalculatorBanner({ onOpenCalculator }: CalculatorBannerProps) {
  return (
    <section
      className="section-padding calculator-section-new"
      id="calculator"
      style={{
        backgroundColor: '#FFFFFF',
        borderTop: '1px solid var(--border-color)',
        padding: '5rem 0',
      }}
    >
      <div className="container">
        <div
          className="calc-row-new"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '4rem',
          }}
        >
          <div className="calc-text-new" style={{ maxWidth: '800px' }}>
            <span className="editorial-tag">Yield Estimator</span>
            <h2 className="editorial-title">
              Calculate Your <em>Investment</em>
            </h2>
            <p
              className="calc-desc-new"
              style={{
                color: '#666666',
                fontSize: '0.95rem',
                lineHeight: 1.6,
                marginTop: '0.5rem',
              }}
            >
              We curate only those properties that generate measurable, documented returns. Every
              listing on our platform is verified for income potential before it ever reaches you.
            </p>
          </div>
          <div className="calc-btn-wrap-new">
            <button
              type="button"
              className="btn btn-outline btn-calc"
              id="btn-open-calc"
              onClick={() => {
                if (onOpenCalculator) {
                  onOpenCalculator()
                } else {
                  const calcModal = document.getElementById('calc-modal')
                  if (calcModal) {
                    calcModal.classList.add('active')
                  }
                }
              }}
              style={{
                borderColor: 'var(--primary)',
                color: 'var(--primary)',
                background: 'transparent',
                padding: '0.9rem 2.2rem',
                fontWeight: 700,
                fontSize: '0.85rem',
                borderWidth: '1.5px',
                borderRadius: '2px',
              }}
            >
              CALCULATE NOW
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
