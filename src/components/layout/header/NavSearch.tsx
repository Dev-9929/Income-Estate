'use client'

import React, { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Search, X, ArrowRight, TrendingUp } from 'lucide-react'
import gsap from 'gsap'

interface NavSearchProps {
  isScrolled?: boolean
  isLightHeader?: boolean
  className?: string
}

const TRENDING_SEARCHES = [
  'Goa Luxury Resorts',
  'Pre-Leased Commercial',
  'Dubai Branded Residences',
  '12%+ Net Annual Yield',
]

export function NavSearch({ isScrolled = false, isLightHeader = false, className = '' }: NavSearchProps) {
  const router = useRouter()
  const [isHovered, setIsHovered] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const isExpanded = isHovered || isFocused || query.length > 0

  // GSAP Smooth Expansion Animation
  useEffect(() => {
    if (!formRef.current) return

    const targetWidth = isExpanded ? (window.innerWidth < 640 ? 280 : 360) : 44

    gsap.to(formRef.current, {
      width: targetWidth,
      duration: 0.4,
      ease: isExpanded ? 'power3.out' : 'power3.inOut',
    })

    if (inputRef.current) {
      if (isExpanded) {
        gsap.fromTo(
          inputRef.current,
          { opacity: 0, x: -6 },
          { opacity: 1, x: 0, duration: 0.25, delay: 0.1, ease: 'power2.out' }
        )
      } else {
        gsap.to(inputRef.current, { opacity: 0, duration: 0.15 })
      }
    }
  }, [isExpanded])

  // GSAP Stagger Dropdown Animation
  useEffect(() => {
    if (isFocused && dropdownRef.current) {
      const items = dropdownRef.current.querySelectorAll('.trending-item')
      gsap.fromTo(
        dropdownRef.current,
        { opacity: 0, y: -8, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: 'power3.out' }
      )
      gsap.fromTo(
        items,
        { opacity: 0, y: 6 },
        { opacity: 1, y: 0, duration: 0.2, stagger: 0.03, delay: 0.05, ease: 'power2.out' }
      )
    }
  }, [isFocused])

  // Click outside to collapse
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsFocused(false)
        setIsHovered(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return
    router.push(`/properties?search=${encodeURIComponent(query.trim())}`)
    setIsFocused(false)
    setIsHovered(false)
  }

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion)
    router.push(`/properties?search=${encodeURIComponent(suggestion)}`)
    setIsFocused(false)
    setIsHovered(false)
  }

  const isDarkScrolled = isScrolled && !isLightHeader
  const iconColor = isDarkScrolled ? '#061D15' : '#FFFFFF'

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        if (!isFocused && !query) {
          setIsHovered(false)
        }
      }}
      className={`relative flex items-center ${className}`}
    >
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        onClick={() => {
          if (!isExpanded) {
            setIsFocused(true)
            setTimeout(() => inputRef.current?.focus(), 50)
          }
        }}
        style={{ width: 44 }}
        className={`group relative flex items-center h-11 rounded-full transition-all duration-300 overflow-hidden ${
          isExpanded
            ? isDarkScrolled
              ? 'bg-white/95 border border-[#061D15]/30 shadow-lg px-4'
              : 'bg-black/75 border border-[#CCAF72]/60 backdrop-blur-2xl shadow-xl px-4'
            : 'bg-transparent border-none shadow-none justify-center cursor-pointer'
        }`}
      >
        {/* Clean Search Icon Button - Zero circular background or shadow when idle */}
        <button
          type="button"
          aria-label="Search properties"
          onClick={() => {
            if (!isExpanded) {
              setIsFocused(true)
              setTimeout(() => inputRef.current?.focus(), 50)
            } else if (query.trim()) {
              router.push(`/properties?search=${encodeURIComponent(query.trim())}`)
            }
          }}
          className="flex-shrink-0 flex items-center justify-center w-7 h-7 bg-transparent border-none p-0 focus:outline-none"
        >
          <Search
            className="w-5 h-5 transition-transform duration-300 group-hover:scale-110"
            color={isExpanded ? (isDarkScrolled ? '#061D15' : '#CCAF72') : iconColor}
            strokeWidth={2}
          />
        </button>

        {/* Expanding Search Input */}
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          placeholder="Search resorts, branded villas, yields..."
          className={`bg-transparent outline-none text-xs md:text-sm font-light tracking-wide ml-2.5 flex-1 min-w-0 ${
            isDarkScrolled
              ? 'text-[#061D15] placeholder:text-slate-400'
              : 'text-white placeholder:text-white/40'
          } ${isExpanded ? 'pointer-events-auto' : 'pointer-events-none'}`}
        />

        {/* Clear query button */}
        {isExpanded && query && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              setQuery('')
              inputRef.current?.focus()
            }}
            className={`p-1 rounded-full transition-colors mr-1 ${
              isDarkScrolled ? 'text-slate-500 hover:bg-slate-200' : 'text-white/60 hover:bg-white/10'
            }`}
            aria-label="Clear search"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}

        {/* Submit arrow button when typing */}
        {isExpanded && query.trim().length > 0 && (
          <button
            type="submit"
            className="flex-shrink-0 w-7 h-7 rounded-full bg-[#CCAF72] hover:bg-amber-400 text-[#061D15] flex items-center justify-center transition-transform hover:scale-105 shadow-md"
            aria-label="Submit search"
          >
            <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>
        )}
      </form>

      {/* Floating Suggestions Dropdown */}
      {isFocused && (
        <div
          ref={dropdownRef}
          className={`absolute top-full left-0 mt-3 w-80 md:w-96 rounded-2xl p-4 shadow-2xl border backdrop-blur-2xl z-50 ${
            isDarkScrolled
              ? 'bg-white/95 border-slate-200 text-[#061D15]'
              : 'bg-[#061D15]/95 border-white/15 text-white shadow-[0_16px_40px_rgba(0,0,0,0.6)]'
          }`}
        >
          <div className="flex items-center gap-2 text-[11px] font-semibold tracking-widest uppercase text-[#CCAF72] mb-2.5 px-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Trending Portfolios</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {TRENDING_SEARCHES.map((item) => (
              <button
                key={item}
                type="button"
                onMouseDown={() => handleSuggestionClick(item)}
                className={`trending-item text-xs px-3 py-1.5 rounded-lg transition-all text-left font-normal ${
                  isDarkScrolled
                    ? 'bg-slate-100 hover:bg-amber-50 hover:text-amber-800 text-slate-700'
                    : 'bg-white/10 hover:bg-[#CCAF72]/20 hover:text-[#CCAF72] text-white/80 border border-white/5 hover:border-[#CCAF72]/40'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
