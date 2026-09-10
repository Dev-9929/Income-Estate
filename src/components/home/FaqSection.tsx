'use client'

import React, { useState } from 'react'
import { faqData } from '@/data/home-data'

export interface FaqSectionItem {
  id?: string
  question: string
  answer: string
  bullets?: string[]
}

export interface FaqSectionProps {
  tag?: string
  title?: React.ReactNode
  description?: string
  faqs?: FaqSectionItem[]
  id?: string
  className?: string
  backgroundColor?: string
  defaultOpenIndex?: number
}

export function FaqSection({
  tag = 'Got Questions?',
  title = (
    <>
      Frequently<br />
      Asked <em>Questions</em>
    </>
  ),
  description = 'Everything you need to know about our fractional real estate platform, returns, and compliance.',
  faqs = faqData,
  id = 'faq',
  className = '',
  backgroundColor,
  defaultOpenIndex = 0,
}: FaqSectionProps) {
  const [openIds, setOpenIds] = useState<string[]>(() => {
    if (faqs && faqs.length > 0 && defaultOpenIndex >= 0 && defaultOpenIndex < faqs.length) {
      return [faqs[defaultOpenIndex]?.id || `faq-${defaultOpenIndex}`]
    }
    return []
  })

  const toggleFaq = (faqId: string) => {
    setOpenIds((prev) =>
      prev.includes(faqId) ? prev.filter((item) => item !== faqId) : [...prev, faqId]
    )
  }

  return (
    <section
      className={`section-padding faq-section ${className}`.trim()}
      id={id}
      style={backgroundColor ? { backgroundColor } : undefined}
    >
      <div className="container faq-grid">
        {/* Sticky Left Editorial Title */}
        <div className="faq-left">
          <div className="faq-sticky-container">
            {tag && <span className="editorial-tag">{tag}</span>}
            <h2 className="editorial-title">{title}</h2>
            {description && <p className="faq-left-desc">{description}</p>}
          </div>
        </div>

        {/* FAQ Accordion Items */}
        <div className="faq-accordion" id={`${id}-accordion-container`}>
          {faqs.map((faq, idx) => {
            const itemId = faq.id || `faq-${idx}`
            const isOpen = openIds.includes(itemId)

            return (
              <div key={itemId} className={`faq-item ${isOpen ? 'active' : ''}`}>
                <div
                  className="faq-header-row"
                  onClick={() => toggleFaq(itemId)}
                  style={{ cursor: 'pointer' }}
                  role="button"
                  aria-expanded={isOpen}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      toggleFaq(itemId)
                    }
                  }}
                >
                  <span className="faq-question">{faq.question}</span>
                  <div className="faq-icon-btn" aria-hidden="true">
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
                    <div className="faq-answer-inner">
                      <p style={{ marginBottom: faq.bullets && faq.bullets.length > 0 ? '0.75rem' : 0 }}>
                        {faq.answer}
                      </p>
                      {faq.bullets && faq.bullets.length > 0 && (
                        <ul
                          className="faq-bullets-list"
                          style={{
                            listStyle: 'none',
                            paddingLeft: 0,
                            margin: 0,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.45rem',
                          }}
                        >
                          {faq.bullets.map((bullet, bIdx) => (
                            <li
                              key={bIdx}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.6rem',
                                color: 'var(--primary)',
                                fontWeight: 500,
                                fontSize: '0.88rem',
                              }}
                            >
                              <span
                                style={{
                                  color: 'var(--accent)',
                                  fontSize: '1.2rem',
                                  lineHeight: 1,
                                }}
                              >
                                •
                              </span>
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
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
