'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Building2, PhoneCall, Menu, X, ArrowRight } from 'lucide-react'

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-[#090D16]/85 backdrop-blur-xl border-b border-brand-gold/20 shadow-lg shadow-black/20">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Brand Logo with Gold Crest */}
        <Link href="/" className="flex items-center gap-3.5 group">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-brand-gold via-amber-400 to-yellow-600 p-[1px] shadow-md shadow-brand-gold/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#0D402B] rounded-[10px] flex items-center justify-center text-brand-gold">
              <Building2 className="w-6 h-6 stroke-[2.2]" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-xl tracking-tight text-white flex items-center gap-1.5">
              Income Estate
              <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse" />
            </span>
            <span className="text-[10px] tracking-widest uppercase text-brand-gold font-semibold">
              Wealth & Real Estate
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a href="#properties" className="hover:text-brand-gold transition-colors">
            Properties
          </a>
          <a href="#plans" className="hover:text-brand-gold transition-colors">
            Investment Plans
          </a>
          <a href="#roi-calculator" className="hover:text-brand-gold transition-colors">
            ROI Calculator
          </a>
          <a href="#why-us" className="hover:text-brand-gold transition-colors">
            Why Us
          </a>
          <a href="#insights" className="hover:text-brand-gold transition-colors">
            Insights
          </a>
          <Link href="/admin" className="text-white hover:text-brand-gold transition-colors flex items-center gap-1.5 font-semibold">
            Payload CMS
          </Link>
        </nav>

        {/* Action CTAs */}
        <div className="hidden sm:flex items-center gap-4">
          <a
            href="tel:+919876543210"
            className="flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-brand-gold transition-colors px-3 py-2"
          >
            <PhoneCall className="w-3.5 h-3.5 text-brand-gold" />
            <span>+91 98765 43210</span>
          </a>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-gold via-amber-400 to-yellow-500 text-slate-950 font-bold text-sm hover:shadow-lg hover:shadow-brand-gold/25 transition-all transform hover:-translate-y-0.5"
          >
            Schedule Consultation
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-slate-300 hover:text-white rounded-lg bg-slate-900 border border-slate-800"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#090D16] border-b border-brand-gold/30 px-6 py-6 space-y-4 text-slate-200">
          <a
            href="#properties"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base hover:text-brand-gold"
          >
            Properties
          </a>
          <a
            href="#plans"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base hover:text-brand-gold"
          >
            Investment Plans
          </a>
          <a
            href="#roi-calculator"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base hover:text-brand-gold"
          >
            ROI Calculator
          </a>
          <a
            href="#why-us"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base hover:text-brand-gold"
          >
            Why Us
          </a>
          <a
            href="#insights"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base hover:text-brand-gold"
          >
            Insights
          </a>
          <Link
            href="/admin"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-semibold text-brand-gold"
          >
            Payload CMS Admin
          </Link>

          <div className="pt-4 border-t border-slate-800 space-y-3">
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-brand-gold text-slate-950 font-bold"
            >
              Schedule Consultation
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
