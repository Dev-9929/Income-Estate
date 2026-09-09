'use client'

import React, { useState, useEffect } from 'react'
import { NavSearch } from './header/NavSearch'
import { NavLogo } from './header/NavLogo'
import { NavHamburger } from './header/NavHamburger'
import { FullScreenMenu } from './header/FullScreenMenu'

export interface HeaderProps {
  onOpenConsultation?: () => void
  className?: string
}

export function Header({ onOpenConsultation, className = '' }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Scroll listener for sticky header transition
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-400 ease-out ${
          isScrolled
            ? 'bg-[#FAF9F6]/95 backdrop-blur-2xl border-b border-[#061D15]/10 shadow-sm py-3.5'
            : 'bg-transparent py-6 md:py-8'
        } ${className}`}
      >
        <div className="w-full px-6 sm:px-10 md:px-14 lg:px-20">
          <div className="flex items-center justify-between relative">
            {/* Left: Pure Minimalist Search Icon (No circle bg, expands smoothly on hover/click) */}
            <div className="flex-1 flex items-center justify-start z-10">
              <NavSearch isScrolled={isScrolled} />
            </div>

            {/* Center: Brand Logo (Always perfectly centered) */}
            <div className="absolute left-1/2 -translate-x-1/2 z-10 flex items-center justify-center">
              <NavLogo isScrolled={isScrolled} />
            </div>

            {/* Right: Pure Minimalist Hamburger Lines (No circle bg, no box shadow) */}
            <div className="flex-1 flex items-center justify-end z-10">
              <NavHamburger
                isOpen={isMenuOpen}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                isScrolled={isScrolled}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Full-Screen Architectural Curtain Overlay Menu */}
      <FullScreenMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onOpenConsultation={onOpenConsultation}
      />
    </>
  )
}
