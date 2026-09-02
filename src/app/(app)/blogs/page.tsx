'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { PreFooterCta } from '@/components/home/PreFooterCta'
import { CalculatorModal } from '@/components/modals/CalculatorModal'
import { blogsListingData, BlogPostItem } from '@/data/blogs-data'

const categories = [
  'ALL',
  'FRACTIONAL GUIDE',
  'RESORT ASSETS',
  'TAX & LEGAL',
  'MARKET TRENDS',
]

export default function BlogsPage() {
  const [isCalcOpen, setIsCalcOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState('ALL')
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const filteredBlogs =
    activeCategory === 'ALL'
      ? blogsListingData
      : blogsListingData.filter((blog) => blog.category === activeCategory)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setTimeout(() => {
        setSubscribed(false)
        setEmail('')
      }, 3500)
    }
  }

  return (
    <div className="main-wrapper">
      {/* Header / Navigation */}
      <Header />

      {/* Hero Banner */}
      <section className="blogs-hero">
        <h1 className="blogs-hero-title">INSIGHTS & BLOGS</h1>
      </section>

      {/* Blogs Layout */}
      <main className="container section-padding">
        {/* Breadcrumbs */}
        <nav className="breadcrumbs" aria-label="breadcrumb" style={{ marginBottom: '2rem' }}>
          <Link href="/">Home</Link>
          <span>&gt;</span>
          Blogs & Insights
        </nav>

        {/* Category Filters */}
        <div className="blog-filters">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`blog-filter-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Blogs Grid */}
        <div className="blogs-grid-main">
          {filteredBlogs.map((blog) => (
            <article key={blog.id} className="blog-card">
              <div className="blog-card-img-wrap" style={{ height: '220px', position: 'relative' }}>
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{ objectFit: 'cover' }}
                />
                <span
                  style={{
                    position: 'absolute',
                    top: '1rem',
                    left: '1rem',
                    backgroundColor: 'var(--accent)',
                    color: 'var(--primary)',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    padding: '0.3rem 0.8rem',
                    borderRadius: '2px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    zIndex: 2,
                  }}
                >
                  {blog.category}
                </span>
              </div>
              <div className="blog-card-body">
                <div className="blog-card-meta">
                  <span>{blog.date}</span>
                  <span>&bull;</span>
                  <span>{blog.readTime}</span>
                </div>
                <h3 className="blog-card-title">
                  <Link href={`/blogs/${blog.slug}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                    {blog.title}
                  </Link>
                </h3>
                <p className="blog-card-desc">{blog.excerpt}</p>
                <Link href={`/blogs/${blog.slug}`} className="blog-card-link">
                  READ MORE
                  <svg
                    viewBox="0 0 24 24"
                    width="14"
                    height="14"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter Subscription Section */}
        <section className="newsletter-section">
          <h3 className="newsletter-title">Subscribe to our Insights</h3>
          <p className="newsletter-desc">
            Stay updated with institutional fractional trends, market yield updates, and exclusive off-market
            resort asset launches delivered to your inbox.
          </p>
          <form className="newsletter-form" onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="ENTER YOUR EMAIL"
              className="newsletter-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="newsletter-btn">
              {subscribed ? 'SUBSCRIBED!' : 'SUBSCRIBE'}
            </button>
          </form>
        </section>
      </main>

      {/* Pre-Footer CTA */}
      <PreFooterCta onConnect={() => setIsCalcOpen(true)} />

      {/* Footer */}
      <Footer />

      {/* Calculator Modal */}
      <CalculatorModal isOpen={isCalcOpen} onClose={() => setIsCalcOpen(false)} />
    </div>
  )
}
