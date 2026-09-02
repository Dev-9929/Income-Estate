'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { PreFooterCta } from '@/components/home/PreFooterCta'
import { CalculatorModal } from '@/components/modals/CalculatorModal'
import { BlogPostItem, recentArticlesData } from '@/data/blogs-data'

interface BlogDetailClientProps {
  blog: BlogPostItem
}

export function BlogDetailClient({ blog }: BlogDetailClientProps) {
  const [isCalcOpen, setIsCalcOpen] = useState(false)
  const [sidebarEmail, setSidebarEmail] = useState('')
  const [sidebarSubscribed, setSidebarSubscribed] = useState(false)

  const handleSidebarSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (sidebarEmail) {
      setSidebarSubscribed(true)
      setTimeout(() => {
        setSidebarSubscribed(false)
        setSidebarEmail('')
      }, 3000)
    }
  }

  return (
    <div className="main-wrapper">
      {/* Header / Navigation */}
      <Header />

      {/* Article Editorial Header */}
      <section
        className="article-header"
        style={{
          backgroundImage: `linear-gradient(rgba(18, 24, 21, 0.8), rgba(18, 24, 21, 0.98)), url('${blog.image}')`,
        }}
      >
        <div className="container article-header-content">
          <span className="article-category">{blog.category}</span>
          <h1 className="article-title">{blog.title}</h1>
          <div className="article-meta">
            BY {blog.author} &bull; {blog.date.toUpperCase()} &bull; {blog.readTime.toUpperCase()}
          </div>
        </div>
      </section>

      {/* Article Body & Layout */}
      <main className="container section-padding">
        {/* Breadcrumbs */}
        <nav className="breadcrumbs" aria-label="breadcrumb" style={{ marginBottom: '2.5rem' }}>
          <Link href="/">Home</Link>
          <span>&gt;</span>
          <Link href="/blogs">Blogs</Link>
          <span>&gt;</span>
          {blog.title}
        </nav>

        <div className="article-layout">
          {/* Left Column: Article Body */}
          <article
            className="article-body"
            dangerouslySetInnerHTML={{ __html: blog.contentHtml || blog.excerpt }}
          />

          {/* Right Column: Sidebar */}
          <aside className="article-sidebar">
            {/* Widget 1: Sidebar Newsletter */}
            <div className="article-sidebar-widget sidebar-newsletter">
              <h4>SUBSCRIBE TO INSIGHTS</h4>
              <p>
                Get notified when we publish new resort investment guides, NRI compliance timelines, and tax
                advice.
              </p>
              <form className="sidebar-newsletter-form" onSubmit={handleSidebarSubscribe}>
                <input
                  type="email"
                  placeholder="EMAIL ADDRESS"
                  value={sidebarEmail}
                  onChange={(e) => setSidebarEmail(e.target.value)}
                  required
                />
                <button type="submit">
                  {sidebarSubscribed ? 'SUBSCRIBED!' : 'SUBSCRIBE'}
                </button>
              </form>
            </div>

            {/* Widget 2: Recent Posts */}
            <div className="article-sidebar-widget">
              <h4 className="widget-title">RECENT ARTICLES</h4>
              <ul className="recent-posts-list">
                {recentArticlesData.map((item, idx) => (
                  <li key={idx} className="recent-post-item">
                    <Link href={`/blogs/${item.slug}`} className="recent-post-title">
                      {item.title}
                    </Link>
                    <span className="recent-post-date">{item.date}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
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
