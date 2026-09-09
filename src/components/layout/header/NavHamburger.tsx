'use client'

import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'

interface NavHamburgerProps {
  isOpen: boolean
  onClick: () => void
  isScrolled?: boolean
  className?: string
}

export function NavHamburger({ isOpen, onClick, isScrolled = false, className = '' }: NavHamburgerProps) {
  const isDarkScrolled = isScrolled && !isOpen
  const line1Ref = useRef<HTMLSpanElement>(null)
  const line2Ref = useRef<HTMLSpanElement>(null)
  const line3Ref = useRef<HTMLSpanElement>(null)

  // GSAP Morphing to 'X' when open
  useEffect(() => {
    if (!line1Ref.current || !line2Ref.current || !line3Ref.current) return

    const tl = gsap.timeline({ defaults: { duration: 0.35, ease: 'power3.inOut' } })

    if (isOpen) {
      tl.to(line1Ref.current, { width: 26, y: 7, rotate: 45, backgroundColor: '#CCAF72' }, 0)
        .to(line2Ref.current, { opacity: 0, scaleX: 0 }, 0)
        .to(line3Ref.current, { width: 26, y: -7, rotate: -45, backgroundColor: '#CCAF72' }, 0)
    } else {
      tl.to(line1Ref.current, { width: 28, y: 0, rotate: 0, backgroundColor: isDarkScrolled ? '#061D15' : '#FFFFFF' }, 0)
        .to(line2Ref.current, { width: 20, opacity: 1, scaleX: 1, backgroundColor: isDarkScrolled ? '#061D15' : '#FFFFFF' }, 0)
        .to(line3Ref.current, { width: 12, y: 0, rotate: 0, backgroundColor: isDarkScrolled ? '#061D15' : '#FFFFFF' }, 0)
    }

    return () => {
      tl.kill()
    }
  }, [isOpen, isDarkScrolled])

  // GSAP Hover: All 3 lines expand to full width (28px)
  const handleMouseEnter = () => {
    if (!isOpen && line2Ref.current && line3Ref.current) {
      gsap.to([line2Ref.current, line3Ref.current], {
        width: 28,
        duration: 0.28,
        ease: 'power2.out',
      })
    }
  }

  // GSAP Mouse Leave: Restore cascade (Line 1: 28px, Line 2: 20px, Line 3: 12px)
  const handleMouseLeave = () => {
    if (!isOpen && line2Ref.current && line3Ref.current) {
      gsap.to(line2Ref.current, {
        width: 20,
        duration: 0.25,
        ease: 'power2.out',
      })
      gsap.to(line3Ref.current, {
        width: 12,
        duration: 0.25,
        ease: 'power2.out',
      })
    }
  }

  const barColor = isDarkScrolled ? '#061D15' : '#FFFFFF'

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label={isOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
      aria-expanded={isOpen}
      className={`group relative flex items-center justify-center w-11 h-11 bg-transparent border-none p-0 cursor-pointer focus:outline-none ${className}`}
    >
      <div className="relative w-7 h-4 flex flex-col justify-between items-center pointer-events-none">
        {/* Line 1 (Top) - Full width (28px) */}
        <span
          ref={line1Ref}
          className="h-[2px] rounded-full origin-center block transition-colors duration-200"
          style={{ width: 28, backgroundColor: barColor }}
        />
        {/* Line 2 (Middle) - Starts at 20px, expands to 28px on hover */}
        <span
          ref={line2Ref}
          className="h-[2px] rounded-full origin-center block transition-colors duration-200"
          style={{ width: 20, backgroundColor: barColor }}
        />
        {/* Line 3 (Bottom) - Starts at 12px, expands to 28px on hover */}
        <span
          ref={line3Ref}
          className="h-[2px] rounded-full origin-center block transition-colors duration-200"
          style={{ width: 12, backgroundColor: barColor }}
        />
      </div>
    </button>
  )
}
