'use client'

import React, { useState, useEffect } from 'react'
import { ArrowUp } from 'lucide-react'

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 350) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    // Initial check
    toggleVisibility()

    window.addEventListener('scroll', toggleVisibility, { passive: true })
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  if (!isVisible) return null

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-[#040D0A] text-[#D4AF6A] border border-[#D4AF6A]/50 shadow-[0_10px_30px_rgba(0,0,0,0.6)] flex items-center justify-center transition-all duration-300 hover:bg-[#D4AF6A] hover:text-[#061D15] hover:border-[#D4AF6A] hover:scale-110 active:scale-95 cursor-pointer"
    >
      <ArrowUp className="w-5 h-5 stroke-[2.5]" />
    </button>
  )
}
