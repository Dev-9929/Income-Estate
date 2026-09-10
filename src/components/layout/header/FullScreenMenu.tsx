'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import gsap from 'gsap'
import { 
  ArrowUpRight, 
  Calculator, 
  PhoneCall, 
  MapPin, 
  MessageSquare, 
  ShieldCheck, 
  Search,
  X
} from 'lucide-react'
import { NavLogo } from './NavLogo'

interface FullScreenMenuProps {
  isOpen: boolean
  onClose: () => void
  onOpenConsultation?: () => void
}

interface NavLinkItem {
  id: string
  number: string
  title: string
  subtitle?: string
  href: string
  image: string
}

const MENU_ITEMS: NavLinkItem[] = [
  {
    id: 'roi',
    number: '01',
    title: 'ROI Properties',
    subtitle: 'Pre-leased luxury resort assets yielding up to 12.4% net annual returns',
    href: '/roi-properties',
    image: '/assets/wordpress_media/mansion_g5c9re.webp',
  },
  {
    id: 'branded',
    number: '02',
    title: 'Branded Residences',
    subtitle: 'Co-own 5-star hospitality keys with complimentary annual vacation stays',
    href: '/branded-residences',
    image: '/assets/wordpress_media/elegant-music-lounge-with-comfortable-seating.webp',
  },
  {
    id: 'other',
    number: '03',
    title: 'Other Properties',
    subtitle: 'High-capitalization commercial floors, bespoke villas, and gated estate land',
    href: '/other-properties',
    image: '/assets/wordpress_media/mansion_g5c9re.webp',
  },
  {
    id: 'concept',
    number: '04',
    title: 'How It Works',
    subtitle: 'Institutional SPV fractional framework, deed registration & monthly dividends',
    href: '/how-it-works',
    image: '/assets/wordpress_media/elegant-music-lounge-with-comfortable-seating.webp',
  },
  {
    id: 'about',
    number: '05',
    title: 'About Us',
    subtitle: 'Our founding vision, leadership team, and institutional real estate heritage',
    href: '/about',
    image: '/assets/wordpress_media/mansion_g5c9re.webp',
  },
  {
    id: 'services',
    number: '06',
    title: 'Our Services',
    subtitle: 'Asset management, automated dividend distributions, legal diligence & exit liquidity',
    href: '/services',
    image: '/assets/wordpress_media/elegant-music-lounge-with-comfortable-seating.webp',
  },
  {
    id: 'insights',
    number: '07',
    title: 'Blogs',
    subtitle: 'Institutional whitepapers, fractional property laws, and hospitality growth trends',
    href: '/blogs',
    image: '/assets/wordpress_media/mansion_g5c9re.webp',
  },
  {
    id: 'contact',
    number: '08',
    title: 'Contact Us',
    subtitle: 'Schedule an executive briefing with our principal asset managers',
    href: '/contact',
    image: '/assets/wordpress_media/elegant-music-lounge-with-comfortable-seating.webp',
  },
]

export function FullScreenMenu({ isOpen, onClose, onOpenConsultation }: FullScreenMenuProps) {
  const [activeItem, setActiveItem] = useState<NavLinkItem>(MENU_ITEMS[0])
  const [isRendered, setIsRendered] = useState(false)
  const isClosingRef = useRef(false)

  const curtainLayer1Ref = useRef<HTMLDivElement>(null)
  const curtainLayer2Ref = useRef<HTMLDivElement>(null)
  const contentContainerRef = useRef<HTMLDivElement>(null)
  const previewImgRef = useRef<HTMLDivElement>(null)

  // Manage mount / unmount lifecycle for smooth exit animation
  useEffect(() => {
    if (isOpen) {
      setIsRendered(true)
      isClosingRef.current = false
      document.body.style.overflow = 'hidden'
    }
  }, [isOpen])

  // GSAP Entrance Timeline
  useEffect(() => {
    if (!isRendered || isClosingRef.current) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.inOut' } })

      // 1. Dual-curtain drop wipe
      tl.set([curtainLayer1Ref.current, curtainLayer2Ref.current], { yPercent: -100 })
        .to(curtainLayer1Ref.current, { yPercent: 0, duration: 0.65 }, 0)
        .to(curtainLayer2Ref.current, { yPercent: 0, duration: 0.75 }, 0.08)

      // 2. Reveal top header bar
      tl.fromTo(
        '.gsap-menu-header',
        { y: -25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' },
        0.4
      )

      // 3. Stagger masked editorial typography lines
      tl.fromTo(
        '.gsap-title-reveal',
        { yPercent: 100, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          stagger: 0.04,
          duration: 0.55,
          ease: 'power3.out',
        },
        0.35
      )

      // 4. Reveal left column preview card & concierge
      tl.fromTo(
        '.gsap-left-col',
        { y: 35, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, ease: 'power3.out' },
        0.4
      )

      // 5. Reveal action buttons & bottom footer
      tl.fromTo(
        ['.gsap-action-cta', '.gsap-footer-bar'],
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.45, ease: 'power3.out' },
        0.5
      )
    }, contentContainerRef)

    return () => ctx.revert()
  }, [isRendered])

  // Smooth GSAP Exit Animation
  const handleTriggerClose = () => {
    if (isClosingRef.current || !contentContainerRef.current) return
    isClosingRef.current = true

    const tl = gsap.timeline({
      defaults: { ease: 'power4.inOut' },
      onComplete: () => {
        setIsRendered(false)
        isClosingRef.current = false
        document.body.style.overflow = ''
        onClose()
      },
    })

    // Fade and slide down titles slightly
    tl.to('.gsap-title-reveal', {
      yPercent: -100,
      opacity: 0,
      stagger: 0.02,
      duration: 0.25,
      ease: 'power2.in',
    })
      .to(['.gsap-left-col', '.gsap-action-cta', '.gsap-menu-header'], {
        opacity: 0,
        y: -15,
        duration: 0.2,
      }, 0.1)
      .to(curtainLayer2Ref.current, { yPercent: -100, duration: 0.55 }, 0.15)
      .to(curtainLayer1Ref.current, { yPercent: -100, duration: 0.5 }, 0.25)
  }

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isRendered && !isClosingRef.current) {
        handleTriggerClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isRendered])

  // GSAP Image Cross-Fade on Hover
  const handleItemHover = (item: NavLinkItem) => {
    if (activeItem.id === item.id) return
    setActiveItem(item)

    if (previewImgRef.current) {
      gsap.fromTo(
        previewImgRef.current,
        { opacity: 0.4, scale: 1.05 },
        { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' }
      )
    }
  }

  const handleConsultation = () => {
    handleTriggerClose()
    if (onOpenConsultation) {
      onOpenConsultation()
    } else {
      window.location.href = '/contact'
    }
  }

  if (!isRendered) return null

  return (
    <div
      ref={contentContainerRef}
      id="fullscreen-navigation-curtain"
      role="dialog"
      aria-modal="true"
      aria-label="Navigation Menu"
      className="fixed inset-0 z-[9999] overflow-hidden"
    >
      {/* GSAP Curtain Layer 1: Luxury Gold/Emerald Tint */}
      <div
        ref={curtainLayer1Ref}
        className="absolute inset-0 bg-gradient-to-b from-[#CCAF72]/30 via-[#0D402B] to-[#040D0A] z-0"
      />

      {/* GSAP Curtain Layer 2: Deep Obsidian Velvet Master Panel */}
      <div
        ref={curtainLayer2Ref}
        className="absolute inset-0 bg-[#040D0A] text-white flex flex-col justify-between overflow-y-auto overflow-x-hidden selection:bg-[#CCAF72] selection:text-[#040D0A] z-10"
      >
        {/* Ambient atmospheric lighting */}
        <div className="absolute top-0 right-1/4 w-[750px] h-[650px] bg-emerald-950/25 rounded-full blur-[180px] pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-[600px] h-[600px] bg-[#CCAF72]/10 rounded-full blur-[180px] pointer-events-none" />

        {/* Top Anchor Header Bar */}
        <div className="gsap-menu-header relative z-20 w-full border-b border-white/10 bg-[#040D0A]/85 backdrop-blur-2xl">
          <div className="w-full px-6 sm:px-10 md:px-14 lg:px-20 py-6 flex items-center justify-between">
            {/* Left Search quick launcher */}
            <Link
              href="/properties"
              onClick={handleTriggerClose}
              className="group flex items-center gap-3 px-4 py-2.5 rounded-full border border-white/15 bg-white/5 hover:border-[#CCAF72] hover:bg-white/10 transition-all text-xs tracking-widest uppercase font-medium text-white/80"
            >
              <Search className="w-3.5 h-3.5 text-[#CCAF72] transition-transform group-hover:scale-110" />
              <span className="hidden sm:inline">Explore Portfolios</span>
            </Link>

            {/* Center Logo */}
            <div className="absolute left-1/2 -translate-x-1/2">
              <NavLogo isLight={true} onClick={handleTriggerClose} />
            </div>

            {/* Right Close Trigger */}
            <button
              type="button"
              onClick={handleTriggerClose}
              aria-label="Close menu"
              className="group flex items-center gap-2.5 px-4 py-2.5 rounded-full border border-white/20 bg-white/5 hover:border-[#CCAF72] hover:bg-white/10 text-white transition-all focus:outline-none cursor-pointer"
            >
              <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-white/80 group-hover:text-[#CCAF72] transition-colors">
                Close
              </span>
              <X className="w-4 h-4 text-white/80 group-hover:text-[#CCAF72] transition-transform duration-300 group-hover:rotate-90" />
            </button>
          </div>
        </div>

        {/* Main Editorial Body: Robust 2-Column Luxury Layout */}
        <div className="relative z-10 flex-1 w-full px-6 sm:px-10 md:px-14 lg:px-20 py-8 lg:py-12 flex flex-col justify-center">
          <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-stretch justify-between gap-10 lg:gap-16">
            
            {/* Left Column: Dynamic Asset Preview & Investor Concierge (42% Width) */}
            <div className="gsap-left-col hidden lg:flex lg:w-[40%] xl:w-[38%] flex-col justify-between gap-6">
              {/* Dynamic Image Preview Card */}
              <div
                ref={previewImgRef}
                className="relative h-[360px] w-full rounded-2xl overflow-hidden border border-white/15 bg-white/5 shadow-2xl group"
              >
                <Image
                  key={activeItem.image + activeItem.id}
                  src={activeItem.image}
                  alt={activeItem.title}
                  fill
                  className="object-cover"
                  sizes="550px"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#040D0A] via-[#040D0A]/30 to-transparent" />

                {/* Active Card Content */}
                <div className="absolute bottom-5 left-5 right-5">
                  <span className="text-xs font-mono text-[#CCAF72] tracking-wider uppercase">
                    Spotlight Selection
                  </span>
                  <h3 className="text-xl font-medium tracking-tight text-white mt-0.5 mb-1.5">
                    {activeItem.title}
                  </h3>
                  <p className="text-xs text-white/70 leading-relaxed line-clamp-2">
                    {activeItem.subtitle}
                  </p>
                </div>
              </div>

              {/* Concierge & Global Advisory Desk */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-md flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-[0.2em] text-[#CCAF72]">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Private Client Desk</span>
                  </div>
                  <p className="text-xs text-white/80 font-light">
                    Speak directly with our senior investment architects.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href="tel:+919876543210"
                    className="p-3 rounded-full border border-white/15 bg-white/5 hover:border-[#CCAF72] hover:bg-[#CCAF72] hover:text-[#040D0A] text-white transition-all shadow-md"
                    aria-label="Call Private Desk"
                  >
                    <PhoneCall className="w-4 h-4" />
                  </a>
                  <a
                    href="https://wa.me/919876543210"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500 hover:text-white text-emerald-400 transition-all shadow-md"
                    aria-label="WhatsApp Concierge"
                  >
                    <MessageSquare className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Editorial Navigation Items & CTAs (58% Width) */}
            <div className="w-full lg:w-[58%] xl:w-[60%] flex flex-col justify-between">
              <div>
                <span className="block text-[11px] font-bold uppercase tracking-[0.25em] text-[#CCAF72] mb-3">
                  Investment Portfolios &amp; Information
                </span>

                <div className="divide-y divide-white/10">
                  {MENU_ITEMS.map((item) => (
                    <div key={item.id} className="overflow-hidden pr-[10px]">
                      <div className="gsap-title-reveal pr-[10px]">
                        <Link
                          href={item.href}
                          onClick={handleTriggerClose}
                          onMouseEnter={() => handleItemHover(item)}
                          className="group flex items-center justify-between py-3.5 sm:py-4 pr-2 transition-all"
                        >
                          <div className="flex items-center gap-4 sm:gap-6 min-w-0">
                            <span className="text-xs sm:text-sm font-mono text-white/30 group-hover:text-[#CCAF72] transition-colors w-6 flex-shrink-0">
                              {item.number}
                            </span>
                            <div className="min-w-0">
                              <h2 className="text-xl sm:text-2xl md:text-3xl font-light tracking-tight text-white/90 group-hover:text-white group-hover:translate-x-2 transition-all duration-300 truncate">
                                {item.title}
                              </h2>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 flex-shrink-0 ml-4">
                            <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/40 group-hover:border-[#CCAF72] group-hover:text-[#CCAF72] group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-all">
                              <ArrowUpRight className="w-4 h-4" />
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons: Full Width, Non-overlapping */}
              <div className="gsap-action-cta pt-6 sm:pt-8 flex flex-col sm:flex-row items-center gap-4 w-full">
                <button
                  type="button"
                  onClick={handleConsultation}
                  className="w-full sm:flex-1 py-4 px-6 rounded-full bg-[#D4AF6A] hover:bg-[#C5A880] text-[#061D15] font-bold text-xs uppercase tracking-widest border border-[#D4AF6A] hover:border-[#C5A880] shadow-[0_4px_24px_rgba(212,175,106,0.25)] hover:shadow-[0_8px_30px_rgba(212,175,106,0.4)] transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5 cursor-pointer"
                >
                  <span className="whitespace-nowrap">Book Private Consultation</span>
                  <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                </button>

                <Link
                  href="/#calculator"
                  onClick={handleTriggerClose}
                  className="w-full sm:flex-1 py-4 px-6 rounded-full border border-white/20 bg-white/5 hover:border-[#CCAF72] hover:bg-white/10 text-white font-medium text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2"
                >
                  <Calculator className="w-4 h-4 text-[#CCAF72]" />
                  <span className="whitespace-nowrap">Launch ROI Calculator</span>
                </Link>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Bar: Compliance & Locations */}
        <div className="gsap-footer-bar relative z-10 w-full border-t border-white/10 bg-[#040D0A]/90 py-4 px-6 sm:px-10 md:px-14 lg:px-20 text-[11px] text-white/40">
          <div className="w-full max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#CCAF72]" />
              <span>Jaipur • Dubai • Goa • Verified Institutional Assets</span>
            </div>
            <p>
              © 2026 Income Estate. All Rights Reserved. RERA Registered &amp; FEMA Repatriation Compliant.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
