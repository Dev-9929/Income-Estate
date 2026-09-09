'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { PreFooterCta } from '@/components/home/PreFooterCta'
import { CalculatorModal } from '@/components/modals/CalculatorModal'
import { WPBlogPostNode, formatPostDate, calculateReadTime, cleanExcerpt } from '@/lib/wordpress'

interface BlogListingClientProps {
  initialPosts: WPBlogPostNode[]
}

export function BlogListingClient({ initialPosts }: BlogListingClientProps) {
  const [isCalcOpen, setIsCalcOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState('ALL')
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  // Dynamically extract unique categories from the live posts, keeping them clean & uppercase
  const categories = useMemo(() => {
    const catsSet = new Set<string>()
    initialPosts.forEach((post) => {
      post.categories?.nodes?.forEach((cat) => {
        if (cat.name) catsSet.add(cat.name.toUpperCase())
      })
    })
    const catsArray = Array.from(catsSet)
    return ['ALL', ...(catsArray.length > 0 ? catsArray : ['FRACTIONAL GUIDE', 'RESORT ASSETS', 'TAX & LEGAL', 'MARKET TRENDS'])]
  }, [initialPosts])

  const filteredBlogs = useMemo(() => {
    if (activeCategory === 'ALL') return initialPosts
    return initialPosts.filter((blog) => {
      return blog.categories?.nodes?.some(
        (cat) => cat.name?.toUpperCase() === activeCategory
      )
    })
  }, [activeCategory, initialPosts])

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
        <h1 className="blogs-hero-title">INSIGHTS &amp; BLOGS</h1>
      </section>

      {/* Blogs Layout */}
      <main className="container section-padding">
        {/* Breadcrumbs */}
        <nav className="breadcrumbs" aria-label="breadcrumb" style={{ marginBottom: '2rem' }}>
          <Link href="/">Home</Link>
          <span>&gt;</span>
          Blogs &amp; Insights
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
          {filteredBlogs.map((blog) => {
            const imageUrl =
              blog.featuredImage?.node?.sourceUrl || '/assets/wordpress_media/Sale-Leaseback-Model.jpg'
            const postCategory =
              blog.categories?.nodes?.[0]?.name?.toUpperCase() || 'FRACTIONAL GUIDE'
            const formattedDate = formatPostDate(blog.date)
            const readTime = calculateReadTime(blog.excerpt)
            const excerptText = cleanExcerpt(blog.excerpt)

            return (
              <article key={blog.slug} className="blog-card">
                <div className="blog-card-img-wrap" style={{ height: '220px', position: 'relative' }}>
                  <Image
                    src={imageUrl}
                    alt={blog.featuredImage?.node?.altText || blog.title}
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
                    {postCategory}
                  </span>
                </div>
                <div className="blog-card-body">
                  <div className="blog-card-meta">
                    <span>{formattedDate}</span>
                    <span>&bull;</span>
                    <span>{readTime}</span>
                  </div>
                  <h3 className="blog-card-title">
                    <Link href={`/blogs/${blog.slug}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                      {blog.title}
                    </Link>
                  </h3>
                  <p className="blog-card-desc">{excerptText}</p>
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
            )
          })}
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
