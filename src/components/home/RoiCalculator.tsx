'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calculator, TrendingUp, DollarSign, Calendar, ArrowRight } from 'lucide-react'

export function RoiCalculator() {
  const [investment, setInvestment] = useState(2500000) // ₹25 Lakhs
  const [years, setYears] = useState(5) // 5 Years
  const [roiRate, setRoiRate] = useState(14) // 14% APY

  // Calculations
  const totalReturn = investment * Math.pow(1 + roiRate / 100, years)
  const netProfit = totalReturn - investment
  const monthlyRentalEst = (investment * 0.09) / 12 // ~9% rental yield annually

  const formatCurrency = (val: number) => {
    if (val >= 10000000) {
      return `₹${(val / 10000000).toFixed(2)} Cr`
    }
    if (val >= 100000) {
      return `₹${(val / 100000).toFixed(2)} Lakhs`
    }
    return `₹${Math.round(val).toLocaleString('en-IN')}`
  }

  return (
    <section id="roi-calculator" className="bg-[#090D16] text-white py-24 px-6 relative">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Title Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-gold/10 text-brand-gold text-xs font-semibold border border-brand-gold/30">
            <Calculator className="w-3.5 h-3.5" />
            <span>Interactive Yield Estimator</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Calculate Your Wealth <span className="text-brand-gold">Growth</span>
          </h2>
          <p className="text-slate-400 text-base">
            See how your capital compounds over time with property appreciation and rental income payouts.
          </p>
        </div>

        {/* Calculator Main Box */}
        <div className="max-w-5xl mx-auto p-6 sm:p-10 rounded-3xl bg-[#0D402B]/30 border border-brand-gold/30 shadow-2xl shadow-black/50 backdrop-blur-xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Controls Sliders (7 Cols) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Slider 1: Investment Amount */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-300 font-semibold flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-brand-gold" />
                  Initial Investment Amount
                </span>
                <span className="text-xl font-extrabold text-brand-gold">
                  {formatCurrency(investment)}
                </span>
              </div>
              <input
                type="range"
                min={1000000}
                max={50000000}
                step={500000}
                value={investment}
                onChange={(e) => setInvestment(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-brand-gold"
              />
              <div className="flex justify-between text-[11px] text-slate-500">
                <span>₹10 Lakhs</span>
                <span>₹5 Crores</span>
              </div>
            </div>

            {/* Slider 2: Investment Duration */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-300 font-semibold flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-brand-gold" />
                  Holding Duration
                </span>
                <span className="text-xl font-extrabold text-brand-gold">
                  {years} {years === 1 ? 'Year' : 'Years'}
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={15}
                step={1}
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-brand-gold"
              />
              <div className="flex justify-between text-[11px] text-slate-500">
                <span>1 Year</span>
                <span>15 Years</span>
              </div>
            </div>

            {/* Slider 3: Expected ROI Rate */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-300 font-semibold flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-brand-gold" />
                  Target Annual Growth Rate (APY)
                </span>
                <span className="text-xl font-extrabold text-brand-gold">
                  {roiRate}% APY
                </span>
              </div>
              <input
                type="range"
                min={8}
                max={22}
                step={1}
                value={roiRate}
                onChange={(e) => setRoiRate(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-brand-gold"
              />
              <div className="flex justify-between text-[11px] text-slate-500">
                <span>8% Conservative</span>
                <span>22% High Yield</span>
              </div>
            </div>
          </div>

          {/* Right Summary Display Card (5 Cols) */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-[#090D16] border border-brand-gold/40 shadow-xl space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="text-xs font-bold uppercase tracking-widest text-slate-400">
                Projected Portfolio Wealth
              </div>

              <div>
                <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                  {formatCurrency(totalReturn)}
                </div>
                <div className="text-xs text-emerald-400 font-bold mt-1">
                  +{formatCurrency(netProfit)} Estimated Profit
                </div>
              </div>

              {/* Progress Visual Bar */}
              <div className="space-y-1.5 pt-2">
                <div className="flex justify-between text-xs text-slate-400 font-medium">
                  <span>Initial Capital ({Math.round((investment / totalReturn) * 100)}%)</span>
                  <span>Profit Gain ({Math.round((netProfit / totalReturn) * 100)}%)</span>
                </div>
                <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden flex">
                  <div
                    style={{ width: `${(investment / totalReturn) * 100}%` }}
                    className="h-full bg-slate-600"
                  />
                  <div
                    style={{ width: `${(netProfit / totalReturn) * 100}%` }}
                    className="h-full bg-gradient-to-r from-brand-gold to-amber-500"
                  />
                </div>
              </div>

              {/* Monthly Rental Breakdown */}
              <div className="p-3.5 rounded-xl bg-[#0D402B]/40 border border-slate-800 space-y-1">
                <div className="text-[11px] text-slate-400 font-medium">Estimated Monthly Rental Payout</div>
                <div className="text-lg font-extrabold text-brand-gold">
                  {formatCurrency(monthlyRentalEst)} / month
                </div>
              </div>
            </div>

            <a
              href="#contact"
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-brand-gold via-amber-400 to-yellow-500 text-slate-950 font-bold text-sm hover:opacity-95 transition-opacity shadow-lg shadow-brand-gold/20"
            >
              Lock In This Return
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
