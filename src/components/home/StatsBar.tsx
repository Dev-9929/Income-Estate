'use client'

import { motion } from 'framer-motion'
import { Building2, TrendingUp, Users, ShieldCheck } from 'lucide-react'

export function StatsBar() {
  const stats = [
    {
      icon: Building2,
      value: '₹500 Cr+',
      label: 'Asset Value Managed',
      description: 'Institutional grade commercial & luxury assets',
    },
    {
      icon: TrendingUp,
      value: '15.4%',
      label: 'Avg. Annual ROI',
      description: 'Rental yields combined with capital growth',
    },
    {
      icon: Users,
      value: '1,200+',
      label: 'Active Investors',
      description: 'High-net-worth individuals & family offices',
    },
    {
      icon: ShieldCheck,
      value: '100%',
      label: 'Verified Titles',
      description: 'RERA legal compliance & clear ownership',
    },
  ]

  return (
    <section className="bg-[#090D16] border-y border-brand-gold/20 py-16 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-6 rounded-2xl bg-gradient-to-b from-[#0D402B]/40 to-[#090D16] border border-brand-gold/25 hover:border-brand-gold/60 transition-all duration-300 group shadow-lg shadow-black/20"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-brand-gold/15 border border-brand-gold/30 flex items-center justify-center text-brand-gold group-hover:scale-110 transition-transform">
                  <stat.icon className="w-6 h-6" />
                </div>
                <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-full bg-brand-gold/10 text-brand-gold border border-brand-gold/20">
                  Verified
                </span>
              </div>

              <div className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-1 group-hover:text-brand-gold transition-colors">
                {stat.value}
              </div>

              <div className="text-sm font-bold text-slate-200 mb-1">
                {stat.label}
              </div>

              <p className="text-xs text-slate-400 font-normal leading-relaxed">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
