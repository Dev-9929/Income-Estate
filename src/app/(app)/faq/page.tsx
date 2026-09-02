'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { PreFooterCta } from '@/components/home/PreFooterCta'
import { CalculatorModal } from '@/components/modals/CalculatorModal'

interface FaqCategoryItem {
  id: string
  question: string
  answer: string
}

interface FaqCategory {
  id: string
  name: string
  items: FaqCategoryItem[]
}

const faqCategories: FaqCategory[] = [
  {
    id: 'legal',
    name: 'LEGAL & STRUCTURE',
    items: [
      {
        id: 'legal-1',
        question: 'What legal structure is used to hold the properties?',
        answer:
          'Each resort property is owned by a specific Special Purpose Vehicle (SPV), usually incorporated as a Private Limited Company or LLP. When you invest, you are allotted shares/units in the SPV corresponding to your ownership percentage, which legally represents your proportional title to the physical resort asset.',
      },
      {
        id: 'legal-2',
        question: 'Is the resort property RERA registered?',
        answer:
          "Yes, all the under-construction or newly completed developer resort properties listed on our platform are fully registered under the respective State's Real Estate Regulatory Authority (RERA) to ensure complete compliance and clean development timelines.",
      },
    ],
  },
  {
    id: 'yields',
    name: 'PAYOUTS & YIELDS',
    items: [
      {
        id: 'yields-1',
        question: 'How and when are rental yields distributed?',
        answer:
          "Under the Sale-Leaseback (SLB) framework, the resort operator pays a fixed/variable lease rent to the SPV. These rental proceeds, after operational expenses and taxes, are distributed directly to the investors' bank accounts on a monthly or quarterly basis.",
      },
      {
        id: 'yields-2',
        question: 'Is the rental income subject to TDS or other taxes?',
        answer:
          'Yes, lease rentals distributed by the SPV are subject to standard Tax Deducted at Source (TDS) regulations as per the Income Tax Act. For Indian residents, this is typically deducted at 10%, while NRIs are taxed based on their withholding tax slab or Double Taxation Avoidance Agreements (DTAA).',
      },
    ],
  },
  {
    id: 'exits',
    name: 'EXIT OPTIONS',
    items: [
      {
        id: 'exits-1',
        question: 'Can I sell my fractional resort shares before the lease ends?',
        answer:
          'Yes, you can exit your investment in three ways: listing your units on our online secondary marketplace for sale to other verified members, utilizing developer buyout clauses after a lock-in period, or during asset liquidation windows where the entire resort is sold to institutional buyers.',
      },
      {
        id: 'exits-2',
        question: 'Is there a minimum lock-in period for investments?',
        answer:
          'To maintain stability in operations, properties generally have a lock-in period of 12 to 24 months, after which secondary transfers are allowed.',
      },
    ],
  },
  {
    id: 'nri',
    name: 'NRI INVESTMENTS',
    items: [
      {
        id: 'nri-1',
        question: 'Can non-resident investors (NRIs) invest in fractional resort units?',
        answer:
          'Yes, NRIs can legally invest in fractional real estate assets. Transactions are fully compliant with Foreign Exchange Management Act (FEMA) guidelines. Investors can use funds from NRE/NRO accounts to make payments.',
      },
      {
        id: 'nri-2',
        question: 'How does repatriation of rental yield and sale proceeds work?',
        answer:
          'Rental distributions can be repatated through NRE accounts or NRO accounts subject to the limits specified by FEMA. Capital gains upon sale of the fractional units are repatriable after deduction of taxes and compliance certificates are filed by our advisory desk.',
      },
    ],
  },
]

export default function FaqPage() {
  const [activeCategory, setActiveCategory] = useState('legal')
  const [openIds, setOpenIds] = useState<string[]>(['legal-1'])
  const [isCalcOpen, setIsCalcOpen] = useState(false)

  const toggleFaq = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  const currentCategoryData =
    faqCategories.find((cat) => cat.id === activeCategory) || faqCategories[0]

  return (
    <div className="main-wrapper">
      {/* Header / Navigation */}
      <Header />

      {/* Hero Banner */}
      <section className="faq-hero">
        <h1 className="faq-hero-title">FREQUENTLY ASKED QUESTIONS</h1>
      </section>

      {/* Main FAQ Layout */}
      <main className="container section-padding">
        {/* Breadcrumbs */}
        <nav className="breadcrumbs" aria-label="breadcrumb" style={{ marginBottom: '2rem' }}>
          <Link href="/">Home</Link>
          <span>&gt;</span>
          FAQ
        </nav>

        {/* FAQ Category Tabs */}
        <div className="faq-tabs">
          {faqCategories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              className={`faq-tab-btn ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => {
                setActiveCategory(cat.id)
                if (cat.items[0]) {
                  setOpenIds([cat.items[0].id])
                }
              }}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* FAQ Accordions Wrap */}
        <div className="faq-items-wrap">
          <div className="faq-category-group active" id={`faq-group-${activeCategory}`}>
            {currentCategoryData.items.map((item) => {
              const isOpen = openIds.includes(item.id)
              return (
                <div key={item.id} className={`faq-item ${isOpen ? 'active' : ''}`}>
                  <div
                    className="faq-header-row"
                    onClick={() => toggleFaq(item.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    <span className="faq-question">{item.question}</span>
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
                      <div className="faq-answer-inner">{item.answer}</div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </main>

      {/* Pre-Footer CTA */}
      <PreFooterCta />

      {/* Global Footer */}
      <Footer />

      {/* Interactive Calculator Modal */}
      <CalculatorModal isOpen={isCalcOpen} onClose={() => setIsCalcOpen(false)} />
    </div>
  )
}
