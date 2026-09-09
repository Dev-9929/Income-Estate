'use client'

import React, { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'

// Authentic brand vector paths extracted directly from official Income Estate brand asset
const BUILDING_PATH =
  'M19.4044 36.8154H11.4288V29.0869L19.4044 22.502V36.8154ZM30.3439 21.0547L32.1544 19.5273H41.4874V25.4893H28.9572V30.6494H43.7042V36.8154H21.0587V21.1367L26.2394 16.8594L30.3439 21.0547ZM19.4044 21.8057L11.4288 28.3926V27.5273L19.4044 19.8418V21.8057ZM19.4044 19.082L11.4288 26.7676V8.60938L19.4044 1.90735e-06V19.082ZM28.9572 15.832V18.8477L26.2892 16.1201L21.0587 20.4395V18.248L26.4015 13.1006V13.0859L28.9572 15.832ZM31.3116 19.5273L30.3859 20.3086L29.6222 19.5273H31.3116ZM40.4884 7.5625L35.3605 12.1514L28.9572 10.0029V15.041L26.423 12.3184L21.0587 17.4873V1.90735e-06L40.4884 7.5625ZM43.1759 14.7754L39.3195 13.4805L43.1759 10.2266V14.7754ZM43.1759 8.60938V9.5127L38.715 13.2773L35.9474 12.3486L41.0519 7.78223L43.1759 8.60938Z'

const ARROW_PATH =
  'M26.2687 16.481L0 38.2054L26.4094 12.7009L30.3796 16.9667L41.9895 6.62708L38.4839 5.81756L50.0354 2.41758L44.7278 12.5049L43.9746 9.23163L30.3655 20.6764L26.2687 16.481Z'

// Authentic brand vector lettering for "INCOME"
const INCOME_PATH =
  'M77.4463 7.98438C78.495 7.98442 79.3679 8.13876 80.0576 8.44141V9.82129C79.2622 9.37781 78.389 9.16016 77.4316 9.16016C76.1577 9.16019 75.1301 9.58204 74.3418 10.4336C73.5534 11.2853 73.1592 12.4189 73.1592 13.8408C73.1592 15.2625 73.5248 16.262 74.2637 17.0645C75.0027 17.8668 75.9744 18.2685 77.1709 18.2686C78.2831 18.2686 79.2481 18.022 80.0576 17.5293V18.7822C79.2411 19.2116 78.2198 19.4297 77.002 19.4297C75.4254 19.4296 74.1651 18.9227 73.2148 17.9092C72.2648 16.8956 71.793 15.5649 71.793 13.918C71.793 12.1442 72.3287 10.7151 73.3916 9.62402C74.4545 8.53314 75.8063 7.98438 77.4463 7.98438ZM87.54 7.98438C89.0674 7.98438 90.2992 8.49793 91.2354 9.52539C92.1716 10.5531 92.6367 11.9051 92.6367 13.5664C92.6367 15.3755 92.1575 16.8047 91.2002 17.8535C90.2429 18.9021 88.9621 19.4296 87.3574 19.4297C85.7878 19.4297 84.5272 18.9165 83.584 17.8818C82.6407 16.8471 82.1689 15.5021 82.1689 13.8408C82.1689 12.0599 82.648 10.6381 83.6123 9.5752C84.5767 8.51229 85.8859 7.9844 87.54 7.98438ZM56.2012 19.2471H54.9062V8.17383H56.2012V19.2471ZM67.1328 16.8535C67.3651 17.2125 67.5136 17.459 67.584 17.5928H67.6113C67.5621 17.276 67.5342 16.734 67.5342 15.9668V8.16699H68.8291V19.2471H67.2383L61.5371 10.4199C61.3963 10.2017 61.2761 9.96903 61.1846 9.72266H61.1357C61.178 9.96197 61.1992 10.4689 61.1992 11.2432V19.2402H59.9033V8.16699H61.5859L67.1328 16.8535ZM100.731 15.8965C100.992 16.4876 101.161 16.9309 101.238 17.2266H101.288C101.506 16.6213 101.69 16.1638 101.823 15.8682L105.293 8.17383H106.912V19.2471H105.61V11.8203C105.61 11.2362 105.645 10.5184 105.716 9.66699H105.688C105.561 10.1665 105.455 10.5252 105.356 10.7363L101.569 19.2471H100.936L97.1631 10.7998C97.0575 10.5535 96.9446 10.1736 96.832 9.66699H96.8037C96.8459 10.1105 96.8672 10.8357 96.8672 11.835V19.2471H95.6143V8.17383H97.332L100.731 15.8965ZM116.226 9.34961H111.903V13.0312H115.901V14.2002H111.903V18.0781H116.472V19.2471H110.601V8.17383H116.226V9.34961ZM87.4561 9.16016C86.2946 9.16016 85.3512 9.58226 84.6191 10.4199C83.8942 11.2575 83.5274 12.3623 83.5273 13.7207C83.5273 15.0793 83.8799 16.185 84.5908 17.0156C85.3018 17.8462 86.2241 18.2617 87.3574 18.2617C88.5751 18.2617 89.5327 17.8676 90.2295 17.0723C90.9264 16.2768 91.2783 15.1712 91.2783 13.7422C91.2783 12.3135 90.9404 11.1521 90.2578 10.3496C89.575 9.55417 88.6379 9.15234 87.4482 9.15234L87.4561 9.16016Z'

// Authentic brand vector lettering for "ESTATE"
const ESTATE_PATH =
  'M67.042 24.2451C68.1326 24.2451 68.928 24.3784 69.4277 24.6387V26.0967C68.7732 25.6462 67.9358 25.4131 66.9082 25.4131C66.6266 25.4131 66.3443 25.4415 66.0557 25.5049C65.7742 25.5612 65.5211 25.6603 65.2959 25.7939C65.0777 25.9277 64.8947 26.1035 64.7539 26.3076C64.6131 26.5188 64.543 26.7794 64.543 27.082C64.543 27.3633 64.5919 27.6095 64.6973 27.8135C64.8029 28.0176 64.958 28.208 65.1621 28.377C65.3662 28.5459 65.6194 28.7153 65.915 28.8701C66.2106 29.032 66.5556 29.2075 66.9355 29.3975C67.3297 29.5946 67.7105 29.7994 68.0625 30.0176C68.4143 30.2357 68.7307 30.475 68.998 30.7354C69.2655 30.9958 69.477 31.2916 69.6318 31.6084C69.7866 31.9251 69.8642 32.2909 69.8643 32.7061C69.8643 33.255 69.7591 33.7127 69.541 34.0928C69.3229 34.4728 69.0407 34.7753 68.6748 35.0146C68.3088 35.254 67.8935 35.4237 67.4219 35.5293C66.9502 35.6349 66.4498 35.6836 65.9219 35.6836C65.746 35.6836 65.5276 35.6697 65.2744 35.6416C65.0141 35.6134 64.7537 35.5709 64.4863 35.5146C64.2188 35.4583 63.9649 35.395 63.7256 35.3105C63.4865 35.2331 63.2962 35.1415 63.1484 35.043L63.1768 35.0576V33.5303C63.3527 33.6851 63.5644 33.8257 63.8037 33.9453C64.05 34.072 64.3037 34.1704 64.5781 34.2549C64.8455 34.3393 65.1201 34.4029 65.3945 34.4521C65.6689 34.5014 65.9221 34.5224 66.1543 34.5225C66.9496 34.5225 67.5482 34.3746 67.9424 34.0791C68.3365 33.7835 68.5341 33.3539 68.5342 32.7979C68.5342 32.5023 68.4706 32.2418 68.3369 32.0166C68.2032 31.7984 68.0271 31.5941 67.7949 31.4111C67.5627 31.2282 67.2883 31.0517 66.9717 30.8828C66.6549 30.7139 66.3162 30.5385 65.9502 30.3555C65.5631 30.1584 65.2041 29.9608 64.8662 29.7637C64.5284 29.5666 64.2395 29.3418 63.9932 29.1025C63.7468 28.8632 63.55 28.5881 63.4092 28.2783C63.2684 27.9757 63.1982 27.6094 63.1982 27.2012C63.1983 26.6945 63.3111 26.2578 63.5293 25.8848C63.7474 25.512 64.0426 25.2021 64.4014 24.9629C64.7604 24.7236 65.1762 24.5406 65.6338 24.4209C66.0913 24.3012 66.5633 24.2451 67.042 24.2451ZM105.328 25.6104H101.006V29.292H105.004V30.4609H101.006V34.3389H105.574V35.5078H99.7041V24.4346H105.328V25.6104ZM60.5234 25.6104H56.2012V29.292H60.1992V30.4609H56.2012V34.3389H60.7695V35.5078H54.8984V24.4346H60.5234V25.6104ZM89.3418 35.5078H87.9062L86.7305 32.4033H82.0352L80.9307 35.5078H79.4873L83.7314 24.4346H85.0762L89.3418 35.5078ZM79.4375 25.6035H76.2422V35.501H74.9463V25.6035H71.7578V24.4277H79.4375V25.6035ZM97.1768 25.6035H93.9814V35.501H92.6855V25.6035H89.4971V24.4277H97.1768V25.6035ZM84.3721 25.7793C84.3228 26.096 84.2596 26.3426 84.1963 26.5186L82.4717 31.2354H86.3086L84.5693 26.5186C84.513 26.3637 84.4567 26.1171 84.4004 25.7793H84.3721Z'

export function CinematicIntro() {
  const [isVisible, setIsVisible] = useState(true)
  const curtainRef = useRef<HTMLDivElement>(null)
  const logoWrapperRef = useRef<HTMLDivElement>(null)
  const buildingRef = useRef<SVGPathElement>(null)
  const incomeRef = useRef<SVGPathElement>(null)
  const estateRef = useRef<SVGPathElement>(null)
  const arrowRef = useRef<SVGPathElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)

  useEffect(() => {
    // Lock scroll during intro
    document.body.style.overflow = 'hidden'

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = ''
          setIsVisible(false)
        },
      })
      timelineRef.current = tl

      // Phase 1: Logo (Building Pillars + Refined Authentic Words) smoothly enters onto the black page
      tl.to(
        logoWrapperRef.current,
        {
          opacity: 1,
          duration: 0.1,
        },
        0.05
      )

      tl.fromTo(
        buildingRef.current,
        { opacity: 0, y: 16, scale: 0.95, transformOrigin: 'center' },
        { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'power3.out' },
        0.15
      )

      tl.fromTo(
        incomeRef.current,
        { opacity: 0, x: -14 },
        { opacity: 1, x: 0, duration: 0.65, ease: 'power3.out' },
        0.25
      )

      tl.fromTo(
        estateRef.current,
        { opacity: 0, x: -14 },
        { opacity: 1, x: 0, duration: 0.65, ease: 'power3.out' },
        0.35
      )

      // Phase 2: LAST OF ALL - Golden Growth Arrow shoots in across the building
      tl.fromTo(
        arrowRef.current,
        { opacity: 0, x: -55, y: 55, scale: 0.6, transformOrigin: 'bottom left' },
        {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.75,
          ease: 'back.out(1.4)',
        },
        0.85
      )

      // Phase 3: Arrow impact bloom & golden ambient flare
      tl.fromTo(
        glowRef.current,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 0.45,
          scale: 1.15,
          duration: 0.35,
          yoyo: true,
          repeat: 1,
          ease: 'sine.inOut',
        },
        1.1
      )

      // Phase 4: Gentle majestic hold
      tl.to(
        logoWrapperRef.current,
        {
          scale: 1.03,
          duration: 0.5,
          ease: 'sine.inOut',
        },
        1.25
      )

      // Phase 5: Logo fades out with slight float
      tl.to(
        logoWrapperRef.current,
        {
          opacity: 0,
          y: -14,
          scale: 1.06,
          duration: 0.35,
          ease: 'power2.in',
        },
        1.75
      )

      // Phase 6: Dark curtain sweeps UP revealing the website hero
      tl.to(
        curtainRef.current,
        {
          yPercent: -100,
          duration: 0.75,
          ease: 'power4.inOut',
        },
        1.95
      )
    }, curtainRef)

    // Key listener to skip on Escape / Space / Enter
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
        if (timelineRef.current) {
          timelineRef.current.timeScale(4)
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      ctx.revert()
      document.body.style.overflow = ''
    }
  }, [])

  // Fast forward to instant finish on click
  const handleSkip = () => {
    if (timelineRef.current) {
      timelineRef.current.timeScale(4)
    }
  }

  if (!isVisible) return null

  return (
    <div
      ref={curtainRef}
      id="cinematic-startup-presentation"
      onClick={handleSkip}
      className="fixed inset-0 z-[999999] bg-[#040D0A] flex flex-col items-center justify-center cursor-pointer select-none overflow-hidden"
      aria-label="Click anywhere to skip intro"
    >
      {/* Dynamic Golden Flare Bloom - triggered on arrow landing */}
      <div
        ref={glowRef}
        className="absolute w-[450px] h-[450px] bg-[#D4AF6A]/20 rounded-full blur-[140px] pointer-events-none opacity-0"
        style={{ opacity: 0 }}
      />
      <div className="absolute w-[500px] h-[500px] bg-emerald-950/20 rounded-full blur-[160px] pointer-events-none" />

      {/* Pure Logo Presentation Container - Starts with opacity 0 to guarantee ZERO initial flash */}
      <div
        ref={logoWrapperRef}
        className="relative z-10 flex items-center justify-center pointer-events-none px-6"
        style={{ opacity: 0 }}
      >
        {/* Authentic Brand Vector Logo - Clean, Compact, Mathematically Proportioned */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 117 39"
          fill="none"
          className="w-[280px] sm:w-[360px] md:w-[420px] max-w-[85vw] h-auto drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)]"
        >
          {/* Building Pillars - Pure White, emerges first on black page */}
          <path
            ref={buildingRef}
            d={BUILDING_PATH}
            fill="#FFFFFF"
            style={{ opacity: 0 }}
          />

          {/* INCOME - Authentic Vector Lettering in Crisp White */}
          <path
            ref={incomeRef}
            d={INCOME_PATH}
            fill="#FFFFFF"
            style={{ opacity: 0 }}
          />

          {/* ESTATE - Authentic Vector Lettering in Warm Gold */}
          <path
            ref={estateRef}
            d={ESTATE_PATH}
            fill="#D4AF6A"
            style={{ opacity: 0 }}
          />

          {/* Golden Growth Vector Arrow - Comes in LAST at the end */}
          <path
            ref={arrowRef}
            d={ARROW_PATH}
            fill="#D4AF6A"
            style={{ opacity: 0 }}
          />
        </svg>
      </div>
    </div>
  )
}
