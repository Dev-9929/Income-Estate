'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { PreFooterCta } from '@/components/home/PreFooterCta'
import { CalculatorModal } from '@/components/modals/CalculatorModal'

interface GenericPageClientProps {
  title: string
  content?: string
}

export function GenericPageClient({ title, content }: GenericPageClientProps) {
  const [isCalcOpen, setIsCalcOpen] = useState(false)

  return (
    <div className="main-wrapper">
      <Header />

      {/* Hero Banner */}
      <section className="about-hero">
        <h1 className="about-hero-title">{title.toUpperCase()}</h1>
      </section>

      {/* Main Content */}
      <main className="container section-padding">
        {/* Breadcrumbs */}
        <nav className="breadcrumbs" aria-label="breadcrumb" style={{ marginBottom: '2rem' }}>
          <Link href="/">Home</Link>
          <span>&gt;</span>
          <span>{title}</span>
        </nav>

        {content ? (
          <article
            className="prose max-w-none prose-emerald"
            style={{
              color: 'var(--primary, #061D15)',
              lineHeight: 1.8,
              fontSize: '1rem',
            }}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        ) : (
          <div style={{ padding: '3rem 0', textAlign: 'center', color: 'var(--text-muted, #6E6862)' }}>
            <p>Content for this page is being curated in WordPress Admin.</p>
          </div>
        )}
      </main>

      <PreFooterCta onConnect={() => setIsCalcOpen(true)} />
      <Footer />
      <CalculatorModal isOpen={isCalcOpen} onClose={() => setIsCalcOpen(false)} />
    </div>
  )
}
