'use client'

import React, { useState } from 'react'
import { Header } from '@/components/layout/Header'
import { HeroBanner } from '@/components/home/HeroBanner'
import { TopStatsBar } from '@/components/home/TopStatsBar'
import { ConceptSection } from '@/components/home/ConceptSection'
import { PhilosophySection } from '@/components/home/PhilosophySection'
import { PropertiesCarousel } from '@/components/home/PropertiesCarousel'
import { BrandedResidences } from '@/components/home/BrandedResidences'
import { CalculatorBanner } from '@/components/home/CalculatorBanner'
import { ComparisonSection } from '@/components/home/ComparisonSection'
import { ProcessTimeline } from '@/components/home/ProcessTimeline'
import { TestimonialsSection } from '@/components/home/TestimonialsSection'
import { FaqSection } from '@/components/home/FaqSection'
import { PreFooterCta } from '@/components/home/PreFooterCta'
import { Footer } from '@/components/layout/Footer'
import { CalculatorModal } from '@/components/modals/CalculatorModal'

export default function Home() {
  const [isCalcOpen, setIsCalcOpen] = useState(false)

  return (
    <div className="main-wrapper">
      {/* Header / Navigation */}
      <Header />

      {/* Section 1: Modern Luxury Cinematic Video Hero Banner */}
      <HeroBanner />

      {/* Section 2: Top Stats Bar */}
      <TopStatsBar />

      {/* Section 3: Built for Investors & Value Pillars */}
      <ConceptSection />

      {/* Section 4: Philosophy Section */}
      <PhilosophySection />

      {/* Section 5: Properties Carousel */}
      <PropertiesCarousel />

      {/* Section 6: Branded Residences Showcase */}
      <BrandedResidences />

      {/* Section 7: Calculator CTA Banner */}
      <CalculatorBanner onOpenCalculator={() => setIsCalcOpen(true)} />

      {/* Section 8: Traditional Real Estate vs Income Estate Comparison */}
      <ComparisonSection />

      {/* Section 9: Simple Process Timeline */}
      <ProcessTimeline />

      {/* Section 11: Investor Trust & Testimonials */}
      <TestimonialsSection />

      {/* Section 12: Frequently Asked Questions */}
      <FaqSection />

      {/* Section 13: Video Background Pre-Footer CTA */}
      <PreFooterCta />

      {/* Section 14: Global Footer */}
      <Footer />

      {/* Interactive Calculator Modal */}
      <CalculatorModal isOpen={isCalcOpen} onClose={() => setIsCalcOpen(false)} />
    </div>
  )
}
