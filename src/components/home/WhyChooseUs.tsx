'use client'

import { motion } from 'framer-motion'
import { FileCheck2, DollarSign, MapPin, UserCheck, Sparkles, ShieldCheck } from 'lucide-react'

export function WhyChooseUs() {
  const bentoCards = [
    {
      title: '100% Verified Legal Documentation',
      description:
        'Every listed property undergoes rigorous 50-point legal checks, RERA clearance, and 30-year title verification by top real estate lawyers.',
      icon: FileCheck2,
      badge: 'Zero Risk Title',
      colSpan: 'lg:col-span-2',
      highlight: 'RERA Approved & Clear Ownership',
    },
    {
      title: 'Guaranteed Rental Yield Options',
      description:
        'Secure fixed monthly rental returns backed by institutional leases with leading MNC tenants and top commercial brands.',
      icon: DollarSign,
      badge: 'Up to 16% APY',
      colSpan: 'lg:col-span-1',
      highlight: 'Direct Monthly Payouts',
    },
    {
      title: 'Prime High-Growth Infrastructure Zones',
      description:
        'We strategically acquire land & commercial spaces near upcoming expressways, metro corridors, and international airports for maximum capital appreciation.',
      icon: MapPin,
      badge: 'High Appreciation',
      colSpan: 'lg:col-span-1',
      highlight: 'Future-Proof Locations',
    },
    {
      title: 'Dedicated Investment Advisor & Concierge',
      description:
        'Get a 1-on-1 private real estate wealth manager to assist with portfolio diversification, tax optimization, and seamless exit strategies.',
      icon: UserCheck,
      badge: 'Personal Manager',
      colSpan: 'lg:col-span-2',
      highlight: 'End-to-End Asset Management',
    },
  ]

  return (
    <section id="why-us" className="bg-[#07271B] text-white py-24 px-6 relative overflow-hidden">
      {/* Golden Glowing Ambient Light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-brand-gold/10 rounded-full blur-[140px] pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-gold/10 text-brand-gold text-xs font-semibold border border-brand-gold/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Institutional Real Estate Standards</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Why High-Net-Worth Investors Choose <span className="text-brand-gold">Income Estate</span>
          </h2>
          <p className="text-slate-300 text-base">
            Combining real estate security with modern wealth management for effortless passive income.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {bentoCards.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`p-8 rounded-3xl bg-[#090D16]/90 border border-brand-gold/30 hover:border-brand-gold/80 transition-all duration-300 shadow-2xl shadow-black/40 flex flex-col justify-between group ${card.colSpan}`}
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-brand-gold/15 border border-brand-gold/30 flex items-center justify-center text-brand-gold group-hover:scale-110 transition-transform">
                    <card.icon className="w-7 h-7" />
                  </div>
                  <span className="text-xs font-bold text-slate-950 bg-gradient-to-r from-brand-gold to-amber-400 px-3 py-1 rounded-full shadow-sm">
                    {card.badge}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-white group-hover:text-brand-gold transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed font-normal">
                    {card.description}
                  </p>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center gap-2 text-xs font-semibold text-brand-gold">
                <ShieldCheck className="w-4 h-4 text-brand-gold" />
                <span>{card.highlight}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
