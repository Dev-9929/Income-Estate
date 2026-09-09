'use client'

import React, { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useRouter } from 'next/navigation'
import { Search, X, ArrowRight, TrendingUp } from 'lucide-react'
import gsap from 'gsap'

interface NavSearchProps {
  isScrolled?: boolean
  isLightHeader?: boolean
  isMobileOpen?: boolean
  onMobileToggle?: (isOpen: boolean) => void
  className?: string
}

const TRENDING_SEARCHES = [
  'Goa Luxury Resorts',
  'Pre-Leased Commercial',
  'Dubai Branded Residences',
  '12%+ Net Annual Yield',
]

export function NavSearch({
  isScrolled = false,
  isLightHeader = false,
  isMobileOpen = false,
  onMobileToggle,
  className = '',
}: NavSearchProps) {
  const router = useRouter()
  const [isHovered, setIsHovered] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [internalMobileOpen, setInternalMobileOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [mounted, setMounted] = useState(false)

  const desktopInputRef = useRef<HTMLInputElement>(null)
  const mobileInputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const desktopFormRef = useRef<HTMLFormElement>(null)
  const desktopDropdownRef = useRef<HTMLDivElement>(null)
  const mobileDrawerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const mobileOpen = onMobileToggle ? isMobileOpen : internalMobileOpen

  const setMobileOpenState = (open: boolean) => {
    if (onMobileToggle) {
      onMobileToggle(open)
    } else {
      setInternalMobileOpen(open)
    }
  }

  // Desktop inline expansion state
  const isExpanded = isHovered || isFocused || query.length > 0

  const isMobileViewport = () => typeof window !== 'undefined' && window.innerWidth < 768

  // Desktop GSAP Smooth Expansion
  useEffect(() => {
    if (!desktopFormRef.current || isMobileViewport()) return

    const targetWidth = isExpanded ? 360 : 44

    gsap.to(desktopFormRef.current, {
      width: targetWidth,
      duration: 0.4,
      ease: isExpanded ? 'power3.out' : 'power3.inOut',
    })

    if (desktopInputRef.current) {
      if (isExpanded) {
        gsap.fromTo(
          desktopInputRef.current,
          { opacity: 0, x: -6 },
          { opacity: 1, x: 0, duration: 0.25, delay: 0.1, ease: 'power2.out' }
        )
      } else {
        gsap.to(desktopInputRef.current, { opacity: 0, duration: 0.15 })
      }
    }
  }, [isExpanded])

  // Desktop GSAP Stagger Dropdown
  useEffect(() => {
    if (isFocused && desktopDropdownRef.current && !isMobileViewport()) {
      const items = desktopDropdownRef.current.querySelectorAll('.trending-item')
      gsap.fromTo(
        desktopDropdownRef.current,
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

  // Mobile Drawer GSAP Slide Down & Body Lock
  useEffect(() => {
    if (mobileOpen && mobileDrawerRef.current) {
      document.body.style.overflow = 'hidden'
      gsap.fromTo(
        mobileDrawerRef.current,
        { yPercent: -100, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.35, ease: 'power3.out' }
      )
      setTimeout(() => mobileInputRef.current?.focus(), 80)
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  // Click outside to collapse desktop search
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
    setMobileOpenState(false)
  }

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion)
    router.push(`/properties?search=${encodeURIComponent(suggestion)}`)
    setIsFocused(false)
    setIsHovered(false)
    setMobileOpenState(false)
  }

  const handleSearchIconClick = () => {
    if (isMobileViewport()) {
      setMobileOpenState(true)
    } else {
      setIsFocused(true)
      setTimeout(() => desktopInputRef.current?.focus(), 50)
    }
  }

  const isDarkScrolled = isScrolled && !isLightHeader
  const iconColor = isDarkScrolled ? '#061D15' : '#FFFFFF'

  return (
    <>
      {/* =========================================================================
          DESKTOP SEARCH (>= 768px): Inline GSAP Expansion without touching center logo
          ========================================================================= */}
      <div
        ref={containerRef}
        onMouseEnter={() => {
          if (!isMobileViewport()) setIsHovered(true)
        }}
        onMouseLeave={() => {
          if (!isFocused && !query) {
            setIsHovered(false)
          }
        }}
        className={`relative items-center ${className}`}
      >
        <form
          ref={desktopFormRef}
          onSubmit={handleSubmit}
          onClick={handleSearchIconClick}
          style={{ width: 44 }}
          className={`group relative flex items-center h-11 rounded-full transition-colors duration-300 overflow-hidden ${
            isExpanded
              ? isDarkScrolled
                ? 'bg-white/95 border border-[#061D15]/30 shadow-lg px-4 hidden md:flex'
                : 'bg-black/80 border border-[#CCAF72]/60 backdrop-blur-2xl shadow-xl px-4 hidden md:flex'
              : 'bg-transparent border-none shadow-none justify-center cursor-pointer flex'
          }`}
        >
          {/* Search Icon button */}
          <button
            type="button"
            aria-label="Search properties"
            onClick={handleSearchIconClick}
            className="flex-shrink-0 flex items-center justify-center w-7 h-7 bg-transparent border-none p-0 focus:outline-none cursor-pointer"
          >
            <Search
              className="w-5 h-5 transition-transform duration-300 group-hover:scale-110"
              color={isExpanded ? (isDarkScrolled ? '#061D15' : '#CCAF72') : iconColor}
              strokeWidth={2}
            />
          </button>

          {/* Desktop Input */}
          <input
            ref={desktopInputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            placeholder="Search resorts, branded villas, yields..."
            className={`hidden md:block bg-transparent outline-none text-xs md:text-sm font-light tracking-wide ml-2.5 flex-1 min-w-0 ${
              isDarkScrolled
                ? 'text-[#061D15] placeholder:text-slate-400'
                : 'text-white placeholder:text-white/40'
            } ${isExpanded ? 'pointer-events-auto' : 'pointer-events-none'}`}
          />

          {/* Clear button */}
          {isExpanded && query && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                setQuery('')
                desktopInputRef.current?.focus()
              }}
              className={`p-1 rounded-full transition-colors mr-1 ${
                isDarkScrolled ? 'text-slate-500 hover:bg-slate-200' : 'text-white/60 hover:bg-white/10'
              }`}
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Submit arrow button */}
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

        {/* Desktop Suggestions Dropdown */}
        {isFocused && (
          <div
            ref={desktopDropdownRef}
            className={`hidden md:block absolute top-full left-0 mt-3 w-80 md:w-96 rounded-2xl p-4 shadow-2xl border backdrop-blur-2xl z-50 ${
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

      {/* =========================================================================
          MOBILE & TABLET FULL-WIDTH SEARCH PORTAL (< 768px):
          Mounted directly on document.body at z-[99999] so NOTHING in header can overlap!
          ========================================================================= */}
      {mobileOpen && mounted && createPortal(
        <div className="fixed inset-0 z-[99999] md:hidden">
          {/* Frosted Dark Backdrop */}
          <div
            onClick={() => setMobileOpenState(false)}
            className="absolute inset-0 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200"
          />

          {/* Top Full-Width Floating Search Sheet with Solid #040D0A Background */}
          <div
            ref={mobileDrawerRef}
            className="relative z-10 w-full bg-[#040D0A] border-b border-white/15 px-4 pt-5 pb-5 shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
          >
            <div className="flex items-center gap-3">
              {/* Search Pill Input */}
              <form
                onSubmit={handleSubmit}
                className="flex-1 flex items-center h-12 rounded-full border border-[#CCAF72] bg-white/[0.07] px-4 gap-2.5 shadow-inner"
              >
                <Search className="w-4 h-4 text-[#CCAF72] flex-shrink-0" />
                <input
                  ref={mobileInputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search resorts, villas, yield..."
                  className="bg-transparent outline-none text-sm text-white placeholder:text-white/40 flex-1 min-w-0 font-light"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => {
                      setQuery('')
                      mobileInputRef.current?.focus()
                    }}
                    className="p-1 text-white/60 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
                <button
                  type="submit"
                  className="w-7 h-7 rounded-full bg-[#CCAF72] text-[#040D0A] flex items-center justify-center flex-shrink-0 shadow-md"
                >
                  <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </button>
              </form>

              {/* Cancel Button */}
              <button
                type="button"
                onClick={() => setMobileOpenState(false)}
                className="text-xs uppercase tracking-widest font-bold text-[#CCAF72] hover:text-white transition-colors px-2 py-2 cursor-pointer"
              >
                Cancel
              </button>
            </div>

            {/* Popular Searches */}
            <div className="mt-4 pt-3 border-t border-white/10">
              <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-widest text-[#CCAF72] mb-2 px-1">
                <TrendingUp className="w-3 h-3" />
                <span>Popular Searches</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {TRENDING_SEARCHES.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => handleSuggestionClick(item)}
                    className="text-xs px-3 py-1.5 rounded-full bg-white/10 text-white/90 border border-white/10 hover:border-[#CCAF72]/40 active:bg-[#CCAF72]/20 active:text-[#CCAF72] transition-colors"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  )
}
