'use client'

import React, { useState } from 'react'
import { faqData, FaqItem } from '@/data/home-data'

interface FaqSectionProps {
  faqs?: FaqItem[]
}

export function FaqSection({ faqs = faqData }: FaqSectionProps) {
  const [openIds, setOpenIds] = useState<string[]>(['faq-2'])

  const toggleFaq = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  return (
    <section className="section-padding faq-section" id="services">
      <div className="container faq-grid">
        {/* Sticky Left Title */}
        <div className="faq-left">
          <div className="faq-sticky-container">
            <span className="editorial-tag">Got Questions?</span>
            <h2 className="editorial-title">
              Frequently<br />
              Asked <em>Questions</em>
            </h2>
            <p className="faq-left-desc">
              Everything you need to know about our fractional real estate platform, returns, and
              compliance.
            </p>
          </div>
        </div>

        {/* FAQ Accordion Items */}
        <div className="faq-accordion" id="faq-accordion-container">
          {faqs.map((faq) => {
            const isOpen = openIds.includes(faq.id)
            return (
              <div key={faq.id} className={`faq-item ${isOpen ? 'active' : ''}`}>
                <div
                  className="faq-header-row"
                  onClick={() => toggleFaq(faq.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <span className="faq-question">{faq.question}</span>
                  <div className="faq-icon-btn">
                    <svg
                      viewBox="0 0 24 24"
                      style={{
                        transform: isOpen ? 'rotate(45deg)' : 'none',
                        transition: 'transform 0.3s ease',
                      }}
                    >
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </div>
                </div>
                {isOpen && (
                  <div className="faq-answer" style={{ display: 'block' }}>
                    <div className="faq-answer-inner">{faq.answer}</div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
