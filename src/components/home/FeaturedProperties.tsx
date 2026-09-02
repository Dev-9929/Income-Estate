'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, TrendingUp, ArrowUpRight, Building2, CheckCircle2 } from 'lucide-react'
import Image from 'next/image'

export function FeaturedProperties() {
  const [activeTab, setActiveTab] = useState('All')

  const properties = [
    {
      id: '1',
      title: 'Cyber Towers Tech Park',
      category: 'Commercial',
      location: 'Golf Course Extension, Gurugram',
      price: '₹1.25 Cr',
      minInvestment: '₹25 Lakhs',
      expectedRoi: '15.8% APY',
      occupancy: '100% Leased to MNC',
      image: '/assets/images/prop_commercial.png',
      badge: 'High Rental Yield',
    },
    {
      id: '2',
      title: 'The Sovereign Estate Penthouses',
      category: 'Residential Gold',
      location: 'Worli Sea Face, Mumbai',
      price: '₹3.80 Cr',
      minInvestment: '₹50 Lakhs',
      expectedRoi: '13.5% APY',
      occupancy: 'Fully Managed Luxury',
      image: '/assets/images/prop_villa.png',
      badge: 'Prime Seafacing',
    },
    {
      id: '3',
      title: 'Greenfield Smart Township Plots',
      category: 'High-Yield Plotting',
      location: 'Noida-Greater Noida Expressway',
      price: '₹65 Lakhs',
      minInvestment: '₹15 Lakhs',
      expectedRoi: '18.2% APY',
      occupancy: 'High Growth Corridor',
      image: '/assets/images/prop_plots.png',
      badge: 'Rapid Capital Gain',
    },
  ]

  const filteredProperties =
    activeTab === 'All'
      ? properties
      : properties.filter((p) => p.category.toLowerCase().includes(activeTab.toLowerCase()))

  return (
    <section id="properties" className="bg-[#090D16] text-white py-24 px-6 relative">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Title Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-800 pb-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/10 text-brand-gold text-xs font-semibold border border-brand-gold/30">
              <Building2 className="w-3.5 h-3.5" />
              <span>Handpicked Asset Portfolio</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Featured Premium <span className="text-brand-gold">Properties</span>
            </h2>
            <p className="text-slate-400 text-base max-w-xl">
              RERA-approved high-yield commercial & luxury real estate assets backed by legal title guarantees.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-slate-900 border border-slate-800">
            {['All', 'Commercial', 'Residential Gold', 'High-Yield Plotting'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-brand-gold to-amber-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map((prop, idx) => (
            <motion.div
              key={prop.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="rounded-3xl bg-[#0D402B]/30 border border-brand-gold/25 hover:border-brand-gold/70 overflow-hidden transition-all duration-300 group hover:-translate-y-1.5 shadow-xl shadow-black/40 flex flex-col justify-between"
            >
              <div>
                {/* Image Container with Zoom Effect */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={prop.image}
                    alt={prop.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090D16] via-transparent to-transparent opacity-80" />

                  {/* Top Badge */}
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-brand-gold/40 text-brand-gold text-[11px] font-bold">
                    {prop.badge}
                  </div>

                  {/* Category Pill */}
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-brand-green/90 text-white text-[11px] font-bold border border-emerald-500/40">
                    {prop.category}
                  </div>

                  {/* Location Info */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center gap-1.5 text-slate-200 text-xs font-medium">
                    <MapPin className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                    <span className="truncate">{prop.location}</span>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-bold text-white group-hover:text-brand-gold transition-colors line-clamp-1">
                    {prop.title}
                  </h3>

                  {/* Key Stats Row */}
                  <div className="grid grid-cols-2 gap-3 p-3 rounded-2xl bg-[#090D16]/80 border border-slate-800">
                    <div>
                      <div className="text-[11px] text-slate-400 font-medium">Total Price</div>
                      <div className="text-base font-extrabold text-white">{prop.price}</div>
                    </div>
                    <div>
                      <div className="text-[11px] text-slate-400 font-medium">Expected Yield</div>
                      <div className="text-base font-extrabold text-emerald-400 flex items-center gap-1">
                        <TrendingUp className="w-3.5 h-3.5" />
                        {prop.expectedRoi}
                      </div>
                    </div>
                  </div>

                  {/* Additional Highlights */}
                  <div className="space-y-1.5 text-xs text-slate-300">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Min Investment:</span>
                      <span className="font-semibold text-white">{prop.minInvestment}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Status:</span>
                      <span className="font-semibold text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        {prop.occupancy}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Action Footer */}
              <div className="p-6 pt-0">
                <a
                  href="#contact"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-brand-gold via-amber-400 to-yellow-500 text-slate-950 font-bold text-sm hover:opacity-95 transition-opacity"
                >
                  View Property Details
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
