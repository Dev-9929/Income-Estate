'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { PreFooterCta } from '@/components/home/PreFooterCta'
import { CalculatorModal } from '@/components/modals/CalculatorModal'
import { WPBlogPostNode, formatPostDate, calculateReadTime } from '@/lib/wordpress'
import { AuthorBioCard } from '@/components/blog/AuthorBioCard'

interface NewsDetailClientProps {
  news: WPBlogPostNode
  recentNews: WPBlogPostNode[]
}

// Sanitizer & table wrapper for news article HTML
function processArticleHtml(html?: string): string {
  if (!html) return ''
  let sanitized = html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/on\w+="[^"]*"/gi, '')
    .replace(/on\w+='[^']*'/gi, '')
    .replace(/javascript:/gi, '')

  sanitized = sanitized.replace(
    /(<table\b[^>]*>[\s\S]*?<\/table>)/gi,
    '<div class="article-table-wrapper">$1</div>'
  )

  return sanitized
}

export function NewsDetailClient({ news, recentNews }: NewsDetailClientProps) {
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

  const imageUrl =
    news.featuredImage?.node?.sourceUrl || '/assets/wordpress_media/Luxury-Resort-Investments.jpg'
  const categoryName =
    news.categories?.nodes?.[0]?.name?.toUpperCase() || 'MARKET NEWS'
  const formattedDate = formatPostDate(news.date)
  const readTime = calculateReadTime(news.content || news.excerpt)
  const processedContent = processArticleHtml(news.content || news.excerpt)

  return (
    <div className="main-wrapper">
      {/* Header / Navigation */}
      <Header />

      {/* News Article Editorial Header Banner */}
      <section className="article-header">
        <div className="article-header-bg">
          <Image
            src={imageUrl}
            alt={news.featuredImage?.node?.altText || news.title}
            fill
            priority
            className="article-header-img"
            sizes="100vw"
          />
          <div className="article-header-overlay" />
        </div>

        <div className="container article-header-content">
          <span className="article-category">{categoryName}</span>
          <h1 className="article-title">{news.title}</h1>
          <div className="article-meta">
            BY INCOME ESTATE NEWS DESK &bull; {formattedDate.toUpperCase()} &bull; {readTime.toUpperCase()}
          </div>
        </div>
      </section>

      {/* Article Body & Layout */}
      <main className="container section-padding">
        {/* Breadcrumbs */}
        <nav className="breadcrumbs" aria-label="breadcrumb" style={{ marginBottom: '2.5rem' }}>
          <Link href="/">Home</Link>
          <span>&gt;</span>
          <Link href="/news">News</Link>
          <span>&gt;</span>
          {news.title}
        </nav>

        <div className="article-layout">
          {/* Left Column: Article Body & Author Section */}
          <div className="article-main-col">
            <article
              className="article-body prose prose-lg max-w-none prose-headings:font-sans prose-headings:text-primary prose-a:text-primary prose-table:border-collapse"
              dangerouslySetInnerHTML={{ __html: processedContent }}
            />
            <AuthorBioCard />
          </div>

          {/* Right Column: Sidebar */}
          <aside className="article-sidebar">
            {/* Widget 1: Sidebar Newsletter */}
            <div className="article-sidebar-widget sidebar-newsletter">
              <h4>SUBSCRIBE TO NEWS UPDATES</h4>
              <p>
                Get real-time news alerts on RBI policy changes, FEMA repatriation updates, and high-yield hospitality asset releases.
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

            {/* Widget 2: Recent News */}
            {recentNews.length > 0 && (
              <div className="article-sidebar-widget">
                <h4 className="widget-title">RECENT NEWS</h4>
                <ul className="recent-posts-list">
                  {recentNews.map((item) => (
                    <li key={item.slug} className="recent-post-item">
                      <Link href={`/news/${item.slug}`} className="recent-post-title">
                        {item.title}
                      </Link>
                      <span className="recent-post-date">{formatPostDate(item.date)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
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
