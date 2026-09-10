'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  Users,
  TrendingUp,
  Search,
  Building2,
  ShieldCheck,
  Layers,
  Compass,
  CheckCircle2,
  HardHat,
  Target,
  Crown,
  ArrowUpRight,
  Calculator,
} from 'lucide-react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { FaqSection } from '@/components/home/FaqSection'
import { PreFooterCta } from '@/components/home/PreFooterCta'
import { CalculatorModal } from '@/components/modals/CalculatorModal'

interface B2CServiceItem {
  id: string
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  badges?: string[]
}

interface B2BServiceItem {
  id: string
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
}

const B2C_SERVICES: B2CServiceItem[] = [
  {
    id: 'investment-consultation',
    icon: Users,
    title: 'Investment Consultation',
    description:
      'One-on-one advisory designed around your financial objectives, risk appetite, and investment horizon.',
  },
  {
    id: 'roi-based-advisory',
    icon: TrendingUp,
    title: 'ROI-Based Property Advisory',
    description:
      'We identify and present curated investment opportunities evaluated through yield analysis and lease structures.',
    badges: ['Yield Analysis', 'Revenue Potential'],
  },
  {
    id: 'search-feasibility',
    icon: Search,
    title: 'Search & Feasibility',
    description:
      'Detailed market research conducted before any investment decision. We evaluate location potential and income viability.',
  },
  {
    id: 'sales-land-procurement',
    icon: Building2,
    title: 'Sales & Land Procurement',
    description:
      'End-to-end support in acquiring the right asset. From sourcing to transaction structuring for maximum upside.',
  },
  {
    id: 'property-licensing',
    icon: ShieldCheck,
    title: 'Property Licensing',
    description:
      'We assist in managing licensing and regulatory processes, simplifying approvals and compliance requirements.',
  },
]

const B2B_SERVICES: B2BServiceItem[] = [
  {
    id: 'project-conceptualization',
    icon: Layers,
    title: 'Project Conceptualization',
    description:
      'Defining asset positioning and development strategy ensuring every project is structured around commercial viability.',
  },
  {
    id: 'project-consultancy',
    icon: Compass,
    title: 'Project Consultancy',
    description:
      'Strategic guidance across complete project lifecycle from planning and positioning to execution and delivery.',
  },
  {
    id: 'approvals-licensing',
    icon: CheckCircle2,
    title: 'Approvals & Licensing',
    description:
      'Managing end-to-end authority clearances and regulatory documentation allowing developers to move forward without delays.',
  },
  {
    id: 'development-management',
    icon: HardHat,
    title: 'Development Management',
    description:
      'Comprehensive oversight from groundbreaking to handover. Coordinating timelines, vendors, and quality benchmarks.',
  },
  {
    id: 'marketing-sales',
    icon: Target,
    title: 'Marketing & Sales',
    description:
      'Precision-led marketing tailored for investment-focused real estate to attract high-value clientele and hospitality buyers.',
  },
  {
    id: 'brand-tie-ups',
    icon: Crown,
    title: 'Brand Tie-Ups',
    description:
      'Defining asset positioning and development strategy ensuring every project is structured around commercial viability.',
  },
]

export default function ServicesPage() {
  const [isCalcOpen, setIsCalcOpen] = useState(false)

  return (
    <div className="main-wrapper">
      {/* Header */}
      <Header />

      {/* Hero Banner with Content */}
      <section className="services-editorial-hero">
        <div className="container">
          {/* Breadcrumbs */}
          <nav className="breadcrumbs" aria-label="breadcrumb">
            <Link href="/">Home</Link>
            <span>&gt;</span>
            <span className="text-accent">Our Services</span>
          </nav>

          <span className="services-hero-tag">OUR SERVICES</span>

          <h1 className="services-hero-h1">
            Strategic Real Estate Solutions <em>Built Around</em> Returns
          </h1>

          <p className="services-hero-lead">
            Income Estate operates across the full spectrum of real estate investment from the
            first conversation to the final return. Every service is structured around one
            principle: <strong>Capital should work harder.</strong>
          </p>

          <div className="services-hero-btn-group">
            <Link href="/contact" className="services-hero-btn-primary">
              <span>Book Consultation</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>

            <button
              type="button"
              onClick={() => setIsCalcOpen(true)}
              className="services-hero-btn-secondary"
            >
              <Calculator className="w-4 h-4 text-accent" />
              <span>ROI Calculator</span>
            </button>
          </div>
        </div>
      </section>

      {/* Statement Section */}
      <section className="services-statement-sec">
        <div className="container">
          <div className="services-statement-grid">
            <div>
              <h2 className="services-statement-title">
                We Combine Market Intelligence, Development Expertise, And Investment Strategy.
              </h2>
            </div>
            <div>
              <p className="services-statement-desc">
                Every service is structured around creating opportunities that deliver long-term
                value, structured income, and scalable growth. We don&apos;t just find properties;
                we build financial futures.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 1: B2C Services ("For Investors & Asset Buyers") */}
      <section className="services-b2c-sec">
        <div className="container">
          <div className="services-sec-header">
            <span className="services-sec-tag">B2C SERVICES</span>
            <h2 className="services-sec-title">For Investors &amp; Asset Buyers</h2>
            <p className="services-sec-desc">
              Designed for HNIs, NRIs, and investors seeking income-generating real estate
              opportunities through rigorous data-backed strategies.
            </p>
          </div>

          {/* 3x2 Grid for B2C */}
          <div className="services-grid-b2c">
            {B2C_SERVICES.map((item) => {
              const IconComp = item.icon
              return (
                <div key={item.id} className="services-card-b2c">
                  <div>
                    <div className="services-card-icon-wrap">
                      <IconComp className="w-6 h-6" />
                    </div>

                    <h3 className="services-card-title">{item.title}</h3>
                    <p className="services-card-desc">{item.description}</p>
                  </div>

                  {item.badges && (
                    <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {item.badges.map((badge) => (
                        <div
                          key={badge}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            fontSize: '0.85rem',
                            fontWeight: 600,
                            color: 'var(--primary)',
                          }}
                        >
                          <span
                            style={{
                              width: '8px',
                              height: '8px',
                              borderRadius: '50%',
                              backgroundColor: 'var(--accent)',
                              display: 'inline-block',
                            }}
                          />
                          <span>{badge}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}

            {/* 6th Slot: Handshake Feature Card (matches Screenshot 2) */}
            <div className="services-card-visual">
              <Image
                src="/assets/wordpress_media/elegant-music-lounge-with-comfortable-seating.webp"
                alt="Partnership Alignment"
                fill
                style={{ objectFit: 'cover' }}
              />
              <div className="services-visual-overlay">
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.15em',
                    color: 'var(--accent)',
                    marginBottom: '0.5rem',
                  }}
                >
                  DEAL GOVERNANCE
                </span>
                <h4 style={{ fontSize: '1.25rem', fontWeight: 600, margin: 0 }}>
                  Structured Execution &amp; Trust
                </h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: B2B Services ("For Developers, Brands & Landowners") */}
      <section className="services-b2b-sec">
        <div className="container">
          <div className="services-sec-header">
            <span className="services-sec-tag">B2B SERVICES</span>
            <h2 className="services-sec-title">For Developers, Brands &amp; Landowners</h2>
            <p className="services-sec-desc">
              Strategic consulting and execution services designed to build scalable, investment-ready
              real estate assets with a focus on commercial viability.
            </p>
          </div>

          {/* 3x2 Grid for B2B (matches Screenshot 3) */}
          <div className="services-grid-b2b">
            {B2B_SERVICES.map((item) => {
              const IconComp = item.icon
              return (
                <div key={item.id} className="services-card-b2b">
                  <div className="services-card-b2b-icon-wrap">
                    <IconComp className="w-5 h-5" />
                  </div>

                  <h3 className="services-card-title">{item.title}</h3>
                  <p className="services-card-desc">{item.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Global Unified FAQ Section */}
      <FaqSection
        tag="Services Advisory FAQ"
        title={
          <>
            Frequently<br />
            Asked <em>Questions</em>
          </>
        }
        description="Clear answers regarding our investor advisory, developer consulting frameworks, and transaction execution."
      />

      {/* Pre-Footer Call to Action */}
      <PreFooterCta onConnect={() => setIsCalcOpen(true)} />

      {/* Global Footer */}
      <Footer />

      {/* Interactive ROI Calculator Modal */}
      <CalculatorModal isOpen={isCalcOpen} onClose={() => setIsCalcOpen(false)} />
    </div>
  )
}
