'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Building2,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Send,
} from 'lucide-react'

export function Footer() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
      setEmail('')
    }
  }

  return (
    <footer id="contact" className="bg-[#090D16] text-white pt-20 pb-12 px-6 border-t border-brand-gold/20 relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-brand-gold/10 rounded-full blur-[160px] pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        {/* High-Converting Lead Capture Card */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#0D402B] via-[#07271B] to-[#0D402B] border border-brand-gold/40 shadow-2xl shadow-black/50 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center lg:text-left max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/10 text-brand-gold text-xs font-semibold border border-brand-gold/30">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Private Consultation Request</span>
            </div>
            <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Ready to Start Growing Your <span className="text-brand-gold">Income Estate</span>?
            </h3>
            <p className="text-slate-300 text-sm font-normal">
              Book a 1-on-1 private strategy session with our real estate wealth advisors. Receive personalized high-yield property proposals directly.
            </p>
          </div>

          {/* Lead Capture Form */}
          <form onSubmit={handleSubmit} className="w-full lg:w-auto flex-1 max-w-md space-y-3">
            {submitted ? (
              <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-sm font-bold text-center flex items-center justify-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                Thank you! Our investment team will contact you within 2 hours.
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row items-center gap-2">
                <div className="relative w-full">
                  <Mail className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-brand-gold transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-brand-gold via-amber-400 to-yellow-500 text-slate-950 font-bold text-sm hover:opacity-95 transition-opacity"
                >
                  Get Proposal
                  <Send className="w-4 h-4" />
                </button>
              </div>
            )}
          </form>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 text-slate-300">
          {/* Brand Column (2 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-gold p-[1px]">
                <div className="w-full h-full bg-[#0D402B] rounded-[11px] flex items-center justify-center text-brand-gold font-bold">
                  <Building2 className="w-5 h-5" />
                </div>
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                Income Estate
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm font-normal">
              Institutional real estate asset management platform. Specializing in Grade-A commercial yields, high-appreciation land plotting, and luxury residential portfolios.
            </p>
            <div className="pt-2 flex items-center gap-4 text-xs font-semibold text-brand-gold">
              <span>RERA Approved</span>
              <span>•</span>
              <span>Title Verified</span>
              <span>•</span>
              <span>100% Legal Guarantee</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Properties</h4>
            <ul className="space-y-2 text-xs font-medium text-slate-400">
              <li><a href="#properties" className="hover:text-brand-gold transition-colors">Commercial Tech Parks</a></li>
              <li><a href="#properties" className="hover:text-brand-gold transition-colors">Luxury Seafacing Villas</a></li>
              <li><a href="#properties" className="hover:text-brand-gold transition-colors">High-Yield Plotting</a></li>
              <li><a href="#properties" className="hover:text-brand-gold transition-colors">Retail High Street</a></li>
            </ul>
          </div>

          {/* Platform Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Platform</h4>
            <ul className="space-y-2 text-xs font-medium text-slate-400">
              <li><a href="#roi-calculator" className="hover:text-brand-gold transition-colors">ROI Calculator</a></li>
              <li><a href="#why-us" className="hover:text-brand-gold transition-colors">Why Choose Us</a></li>
              <li><a href="#insights" className="hover:text-brand-gold transition-colors">Market Insights</a></li>
              <li><Link href="/admin" className="hover:text-brand-gold transition-colors">Payload CMS Admin</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Head Office</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                <span>Level 14, DLF Cyber City, Phase-2, Gurugram, HR - 122002</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-gold shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-gold shrink-0" />
                <span>invest@incomeestate.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Disclaimer & Copyright */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-normal">
          <p>© {new Date().getFullYear()} Income Estate Technologies Pvt. Ltd. All rights reserved.</p>
          <div className="flex items-center gap-6 text-slate-400">
            <a href="#privacy" className="hover:text-brand-gold transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-brand-gold transition-colors">Terms of Service</a>
            <a href="#disclaimer" className="hover:text-brand-gold transition-colors">RERA Disclaimer</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
