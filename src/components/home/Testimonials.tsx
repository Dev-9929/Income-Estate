'use client'

import { motion } from 'framer-motion'
import { Star, ShieldCheck, Quote } from 'lucide-react'

export function Testimonials() {
  const reviews = [
    {
      name: 'Vikramaditya Sharma',
      role: 'Managing Director, Tech Ventures',
      location: 'Gurugram',
      portfolio: '₹2.5 Cr Invested',
      roi: '16.2% APY',
      comment:
        'Income Estate simplified commercial property investment for me. The 50-point legal title verification gave me complete peace of mind, and rental payouts arrive on the 1st of every month without fail.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    },
    {
      name: 'Ananya Deshmukh',
      role: 'Senior Consultant & Angel Investor',
      location: 'Mumbai',
      portfolio: '₹1.8 Cr Invested',
      roi: '14.8% APY',
      comment:
        'Finding pre-leased Grade-A office spaces used to be impossible without brokers. Income Estate provided institutional access with complete legal transparency and automated tax reporting.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    },
    {
      name: 'Rajesh Nair',
      role: 'NRIs Investor',
      location: 'Dubai, UAE',
      portfolio: '₹4.0 Cr Invested',
      roi: '17.1% APY',
      comment:
        'As an NRI living in Dubai, managing real estate back in India was stressful. Income Estate handled legal due diligence, tenant management, and monthly wire transfers seamlessly.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    },
  ]

  return (
    <section className="bg-[#090D16] text-white py-24 px-6 relative">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Title Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-gold/10 text-brand-gold text-xs font-semibold border border-brand-gold/30">
            <Quote className="w-3.5 h-3.5" />
            <span>Investor Trust & Reviews</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Hear From Our <span className="text-brand-gold">Investors</span>
          </h2>
          <p className="text-slate-400 text-base">
            Trusted by HNIs, NRIs, and institutional investors to build long-term passive real estate income.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-8 rounded-3xl bg-[#0D402B]/30 border border-brand-gold/25 hover:border-brand-gold/70 transition-all duration-300 shadow-xl shadow-black/40 flex flex-col justify-between group"
            >
              <div className="space-y-6">
                {/* Rating Stars & Verified Badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                    <ShieldCheck className="w-3 h-3" />
                    Verified Investor
                  </span>
                </div>

                <p className="text-sm text-slate-200 leading-relaxed italic font-normal">
                  "{rev.comment}"
                </p>
              </div>

              {/* Author & Portfolio Info */}
              <div className="pt-6 mt-6 border-t border-slate-800 flex items-center gap-4">
                <img
                  src={rev.avatar}
                  alt={rev.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-brand-gold/50"
                />
                <div>
                  <div className="text-sm font-bold text-white group-hover:text-brand-gold transition-colors">
                    {rev.name}
                  </div>
                  <div className="text-xs text-slate-400 font-medium">{rev.role}</div>
                  <div className="text-[11px] text-brand-gold font-semibold mt-0.5">
                    {rev.portfolio} • {rev.roi}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
