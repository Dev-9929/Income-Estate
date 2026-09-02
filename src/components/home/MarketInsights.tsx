'use client'

import { motion } from 'framer-motion'
import { Newspaper, Calendar, ArrowRight, Layers } from 'lucide-react'
import Link from 'next/link'

export function MarketInsights() {
  const blogs = [
    {
      id: '1',
      title: 'Top 5 Upcoming Infrastructure Hubs for Real Estate Growth in 2026',
      excerpt:
        'Detailed analysis of new expressway corridors, metro expansions, and international airport hubs driving 20%+ property appreciation.',
      category: 'Market Trends',
      date: 'July 24, 2026',
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: '2',
      title: 'Commercial Office vs Residential Gold: Which Yields Higher Passive Returns?',
      excerpt:
        'A comprehensive breakdown comparing MNC commercial lease lock-ins vs luxury residential capital gains.',
      category: 'Investment Strategy',
      date: 'July 18, 2026',
      readTime: '7 min read',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: '3',
      title: 'Legal Checklist: 10 Critical Checks Before Acquiring Plotting Land',
      excerpt:
        'Essential legal guide covering RERA registration, land conversion certificates, encapsulation boundaries, and clear title deeds.',
      category: 'Legal Guide',
      date: 'July 10, 2026',
      readTime: '6 min read',
      image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=600&q=80',
    },
  ]

  return (
    <section id="insights" className="bg-[#07271B] text-white py-24 px-6 relative">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Title Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-800/80 pb-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-gold/10 text-brand-gold text-xs font-semibold border border-brand-gold/30">
              <Newspaper className="w-3.5 h-3.5" />
              <span>Real Estate & Wealth Intelligence</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Market Insights & <span className="text-brand-gold">Analysis</span>
            </h2>
            <p className="text-slate-300 text-base max-w-xl">
              Stay ahead with institutional research, market reports, and legal guides updated dynamically via Payload CMS.
            </p>
          </div>

          <Link
            href="/admin"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 border border-brand-gold/40 text-brand-gold font-bold text-sm hover:bg-slate-800 transition-colors"
          >
            <Layers className="w-4 h-4" />
            Manage via Payload CMS
          </Link>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.map((blog, idx) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="rounded-3xl bg-[#090D16]/90 border border-brand-gold/25 hover:border-brand-gold/70 overflow-hidden transition-all duration-300 group shadow-xl shadow-black/40 flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-slate-950/80 border border-brand-gold/40 text-brand-gold text-[11px] font-bold">
                    {blog.category}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-3 text-xs text-slate-400 font-medium">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-brand-gold" />
                      {blog.date}
                    </span>
                    <span>•</span>
                    <span>{blog.readTime}</span>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-brand-gold transition-colors line-clamp-2">
                    {blog.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                    {blog.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 text-sm font-bold text-brand-gold hover:text-white transition-colors"
                >
                  Read Full Insight
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
