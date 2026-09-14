'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { PreFooterCta } from '@/components/home/PreFooterCta'
import { CalculatorModal } from '@/components/modals/CalculatorModal'
import { AboutPageDynamicData } from '@/lib/wordpress'

interface AboutClientProps {
  aboutData?: AboutPageDynamicData
}

export function AboutClient({ aboutData }: AboutClientProps) {
  const [isCalcOpen, setIsCalcOpen] = useState(false)

  const storyTitle = aboutData?.storyTitle || 'Our Story'
  const storySubtitle =
    aboutData?.storySubtitle ||
    'Every strong venture begins with a gap in the market and more importantly, the experience to recognize it.'

  const storyParagraphs = aboutData?.storyParagraphs || [
    'For years, real estate in India has been driven by speculation, fragmented information, and limited transparency, especially for investors seeking predictable returns. While opportunities existed, access to structured, income-generating assets remained limited.',
    'Recognizing the gap through decades of experience, Aman Duggal and Vikram Swami came together to build a platform that redefines how real estate investments are approached.',
    'The Income Estate was created to change that.',
    'It was built on a single belief that investors deserve verified, income-generating real estate backed by real data. Simplifying how investors discover, evaluate, and access real estate investments bringing clarity, structure, and trust into a traditionally complex ecosystem.',
    'Today, Income Estate is a focused, ROI-first focused platform delivered through a digital infrastructure that ensures equal access for investors anywhere in the world.',
  ]

  const founders = aboutData?.founders || [
    {
      name: 'Mr. Aman Duggal',
      photo: '/assets/wordpress_media/aman.jpeg',
      bio: 'With over 22 years of experience in the Indian real estate market, Aman brings a deep understanding of property value, investor psychology, and market dynamics.\nHis journey has been shaped not just by transactions, but by recognizing the structural inefficiencies in how real estate is positioned for investors. His philosophy is simple and clear:',
      quote: 'Real estate wealth is built on income, not speculation.',
    },
    {
      name: 'Mr. Vikram Swami',
      photo: '/assets/wordpress_media/vikram-swami-new.jpg',
      bio: 'With over 20 years of experience in the IT industry, Vikram has built and scaled performance-driven digital ecosystems and user-centric platforms.\nHis expertise lies in creating systems that bridge gaps between opportunity and access. Observing the disconnect between high-quality real estate assets and investor reach, he identified the need for a platform that delivers structured, transparent access at scale.',
    },
  ]

  const pillars = aboutData?.pillars || [
    {
      num: '01',
      title: 'Income-First Approach',
      description:
        'We prioritize returns over speculation, ensuring every opportunity is built around structured income potential.',
    },
    {
      num: '02',
      title: 'Verified Opportunities',
      description:
        'Each property is evaluated for ROI, lease structure, and financial transparency before being presented to investors.',
    },
    {
      num: '03',
      title: 'Structured Investments',
      description:
        'Our offerings are aligned with Sale & Leaseback models, enabling predictable and pre-defined returns.',
    },
    {
      num: '04',
      title: 'Transparency & Trust',
      description:
        'We provide clear, data-backed insights, empowering investors to make informed decisions with confidence.',
    },
    {
      num: '05',
      title: 'Access Without Barriers',
      description:
        'Through a digital-first platform, we ensure seamless access to investment opportunities for investors across geographies, including NRIs.',
    },
  ]

  return (
    <div className="main-wrapper">
      {/* Header / Navigation */}
      <Header />

      {/* Hero Banner */}
      <section className="about-hero">
        <h1 className="about-hero-title">ABOUT US</h1>
      </section>

      {/* Main Content */}
      <main className="container section-padding">
        {/* Breadcrumbs */}
        <nav className="breadcrumbs" aria-label="breadcrumb">
          <Link href="/">Home</Link>
          <span>&gt;</span>
          About Us
        </nav>

        {/* Our Story Section */}
        <section className="story-section">
          <h2 className="story-title">{storyTitle}</h2>
          <p className="story-subtitle">{storySubtitle}</p>

          {storyParagraphs.map((para, idx) => (
            <p key={idx} className="story-text">
              {para}
            </p>
          ))}
        </section>

        {/* Our Founders Section */}
        <section className="founders-section">
          <h2 className="founders-title">Our Founders</h2>

          {founders.map((founder, idx) => (
            <div key={idx} className="founder-card-container">
              <div className="founder-offset-bg" />
              <div className="founder-card-luxury">
                <div className="founder-img-wrap">
                  <img src={founder.photo} alt={founder.name} />
                </div>
                <div className="founder-info">
                  <h3 className="founder-name">{founder.name}</h3>
                  {founder.bio.split('\n').map((bPara, bIdx) => (
                    <p key={bIdx} className="founder-bio">
                      {bPara}
                    </p>
                  ))}
                  {founder.quote && (
                    <p className="founder-quote">&ldquo;{founder.quote}&rdquo;</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Our Pillars Section */}
        <section className="pillars-section" style={{ display: 'block' }}>
          <h2 className="story-title" style={{ textAlign: 'center', marginBottom: '2rem' }}>
            Our Pillars
          </h2>

          <div className="pillars-grid-luxury">
            {pillars.map((pillar, idx) => (
              <div key={idx} className="pillar-card-luxury">
                <div className="pillar-card-num">{pillar.num}</div>
                <h3 className="pillar-card-title">{pillar.title}</h3>
                <p className="pillar-card-desc">{pillar.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Pre-Footer CTA */}
      <PreFooterCta onConnect={() => setIsCalcOpen(true)} />

      {/* Global Footer */}
      <Footer />

      {/* Interactive Calculator Modal */}
      <CalculatorModal isOpen={isCalcOpen} onClose={() => setIsCalcOpen(false)} />
    </div>
  )
}
