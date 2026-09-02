'use client'

import { motion } from 'framer-motion'
import { UserCheck, SearchCheck, FileSignature, Wallet, ArrowRight } from 'lucide-react'

export function InvestmentProcess() {
  const steps = [
    {
      step: '01',
      title: 'Consultation & Profiling',
      description:
        'Meet your dedicated wealth manager to outline your investment horizon, risk preference, and targeted yield goals.',
      icon: UserCheck,
    },
    {
      step: '02',
      title: 'Selection & Due Diligence',
      description:
        'Select pre-vetted RERA properties and inspect 50-point legal title reports verified by top advocates.',
      icon: SearchCheck,
    },
    {
      step: '03',
      title: 'Seamless Acquisition',
      description:
        'Complete digital documentation, fractional or full ownership registration with full legal transparency.',
      icon: FileSignature,
    },
    {
      step: '04',
      title: 'Regular Rental Payouts',
      description:
        'Receive automated monthly rental yields directly into your bank account while your property appreciates.',
      icon: Wallet,
    },
  ]

  return (
    <section className="bg-[#07271B] text-white py-24 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Title Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-gold/10 text-brand-gold text-xs font-semibold border border-brand-gold/30">
            <span>Seamless 4-Step Journey</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            How Investing Works With <span className="text-brand-gold">Income Estate</span>
          </h2>
          <p className="text-slate-300 text-base">
            From initial consultation to monthly rental payouts in four clear, transparent steps.
          </p>
        </div>

        {/* Sequence Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-6 rounded-3xl bg-[#090D16]/90 border border-brand-gold/30 hover:border-brand-gold/80 transition-all duration-300 relative group shadow-xl shadow-black/40 flex flex-col justify-between"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-brand-gold/15 border border-brand-gold/30 flex items-center justify-center text-brand-gold group-hover:scale-110 transition-transform">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <span className="text-2xl font-black text-brand-gold/40 group-hover:text-brand-gold transition-colors font-mono">
                    {item.step}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white group-hover:text-brand-gold transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>
              </div>

              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 z-10 text-brand-gold/40">
                  <ArrowRight className="w-6 h-6" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
