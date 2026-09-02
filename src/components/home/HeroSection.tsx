'use client'

import { motion, type Variants } from 'framer-motion'
import {
  Search,
  MapPin,
  Building,
  DollarSign,
  TrendingUp,
  ArrowRight,
  Play,
  ShieldCheck,
  Award,
  Sparkles,
} from 'lucide-react'
import { useState } from 'react'

export function HeroSection() {
  const [location, setLocation] = useState('Gurugram')
  const [propertyType, setPropertyType] = useState('Commercial')
  const [budget, setBudget] = useState('₹50L - ₹2Cr')
  const [yieldRate, setYieldRate] = useState('12% - 16%')

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section className="relative bg-gradient-to-b from-[#090D16] via-[#0D402B]/60 to-[#090D16] text-white pt-16 pb-24 px-6 overflow-hidden">
      {/* Golden Glowing Ambient Backgrounds */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-brand-gold/10 rounded-full blur-[150px] pointer-events-none -z-10" />
      <div className="absolute top-10 left-10 w-96 h-96 bg-[#0D402B] rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="text-center max-w-4xl mx-auto space-y-6"
        >
          {/* Gold Badge */}
          <motion.div variants={itemVariants} className="inline-flex items-center">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#0D402B]/90 border border-brand-gold/40 text-brand-gold text-xs font-semibold backdrop-blur-md shadow-lg shadow-black/30">
              <Award className="w-4 h-4 text-brand-gold" />
              <span>India's Premier Institutional Real Estate Asset Platform</span>
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1]"
          >
            Build Generational Wealth Through{' '}
            <span className="bg-gradient-to-r from-brand-gold via-amber-300 to-yellow-500 bg-clip-text text-transparent">
              Smart Real Estate
            </span>{' '}
            Investments.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed"
          >
            Access pre-vetted commercial hubs, luxury plotting, and high-yield properties with guaranteed rental returns & transparent legal ownership.
          </motion.p>

          {/* Dual CTAs */}
          <motion.div
            variants={itemVariants}
            className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="#properties"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-brand-gold via-amber-400 to-yellow-500 text-slate-950 font-bold text-base shadow-xl shadow-brand-gold/20 hover:shadow-brand-gold/40 hover:scale-[1.02] transition-all"
            >
              Explore Properties
              <ArrowRight className="w-5 h-5" />
            </a>

            <a
              href="#demo"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-[#0D402B]/70 text-white hover:bg-[#0D402B] font-semibold text-base border border-brand-gold/30 backdrop-blur-md transition-all hover:scale-[1.02]"
            >
              <Play className="w-4 h-4 fill-current text-brand-gold" />
              Watch Portfolio Overview
            </a>
          </motion.div>

          {/* Trust Highlights */}
          <motion.div
            variants={itemVariants}
            className="pt-2 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-medium"
          >
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-brand-gold" />
              <span>RERA Registered & Title Verified</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Direct Rental Income Payouts</span>
            </div>
            <div className="flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-amber-400" />
              <span>15%+ Projected Annual APY</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Interactive Search Bar Widget */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-14 max-w-5xl mx-auto"
        >
          <div className="p-4 sm:p-6 rounded-3xl bg-[#090D16]/90 backdrop-blur-2xl border border-brand-gold/30 shadow-2xl shadow-black/50">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              {/* Location Select */}
              <div className="p-3.5 rounded-xl bg-[#0D402B]/40 border border-slate-800 hover:border-brand-gold/50 transition-colors">
                <div className="flex items-center gap-2 text-xs font-semibold text-brand-gold mb-1">
                  <MapPin className="w-4 h-4" />
                  <span>LOCATION</span>
                </div>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-transparent text-sm font-semibold text-white focus:outline-none cursor-pointer"
                >
                  <option value="Gurugram" className="bg-slate-900 text-white">Gurugram (NCR)</option>
                  <option value="Bengaluru" className="bg-slate-900 text-white">Bengaluru (ORR)</option>
                  <option value="Mumbai" className="bg-slate-900 text-white">Mumbai (BKC)</option>
                  <option value="Goa" className="bg-slate-900 text-white">North Goa</option>
                  <option value="Noida" className="bg-slate-900 text-white">Noida Expressway</option>
                </select>
              </div>

              {/* Property Type Select */}
              <div className="p-3.5 rounded-xl bg-[#0D402B]/40 border border-slate-800 hover:border-brand-gold/50 transition-colors">
                <div className="flex items-center gap-2 text-xs font-semibold text-brand-gold mb-1">
                  <Building className="w-4 h-4" />
                  <span>PROPERTY TYPE</span>
                </div>
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full bg-transparent text-sm font-semibold text-white focus:outline-none cursor-pointer"
                >
                  <option value="Commercial" className="bg-slate-900 text-white">Commercial Office</option>
                  <option value="Residential" className="bg-slate-900 text-white">Residential Gold</option>
                  <option value="Plotting" className="bg-slate-900 text-white">High-Yield Land Plot</option>
                  <option value="Retail" className="bg-slate-900 text-white">Retail High Street</option>
                </select>
              </div>

              {/* Budget Range Select */}
              <div className="p-3.5 rounded-xl bg-[#0D402B]/40 border border-slate-800 hover:border-brand-gold/50 transition-colors">
                <div className="flex items-center gap-2 text-xs font-semibold text-brand-gold mb-1">
                  <DollarSign className="w-4 h-4" />
                  <span>BUDGET RANGE</span>
                </div>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full bg-transparent text-sm font-semibold text-white focus:outline-none cursor-pointer"
                >
                  <option value="₹25L - ₹50L" className="bg-slate-900 text-white">₹25 Lakhs - ₹50 Lakhs</option>
                  <option value="₹50L - ₹2Cr" className="bg-slate-900 text-white">₹50 Lakhs - ₹2 Crores</option>
                  <option value="₹2Cr - ₹5Cr" className="bg-slate-900 text-white">₹2 Crores - ₹5 Crores</option>
                  <option value="₹5Cr+" className="bg-slate-900 text-white">₹5 Crores +</option>
                </select>
              </div>

              {/* Expected Yield Select */}
              <div className="p-3.5 rounded-xl bg-[#0D402B]/40 border border-slate-800 hover:border-brand-gold/50 transition-colors">
                <div className="flex items-center gap-2 text-xs font-semibold text-brand-gold mb-1">
                  <TrendingUp className="w-4 h-4" />
                  <span>EXPECTED YIELD</span>
                </div>
                <select
                  value={yieldRate}
                  onChange={(e) => setYieldRate(e.target.value)}
                  className="w-full bg-transparent text-sm font-semibold text-white focus:outline-none cursor-pointer"
                >
                  <option value="10% - 12%" className="bg-slate-900 text-white">10% - 12% Annual Yield</option>
                  <option value="12% - 16%" className="bg-slate-900 text-white">12% - 16% Annual Yield</option>
                  <option value="16% - 20%" className="bg-slate-900 text-white">16% - 20% High Yield</option>
                </select>
              </div>
            </div>

            {/* Search Submit Button */}
            <a
              href="#properties"
              className="w-full inline-flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-brand-gold via-amber-400 to-yellow-500 text-slate-950 font-bold text-base shadow-lg shadow-brand-gold/20 hover:opacity-95 transition-all"
            >
              <Search className="w-5 h-5" />
              Find Verified Investment Opportunities
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
