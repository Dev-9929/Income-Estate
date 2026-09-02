# PROJECT_CONTEXT.md — Income Estate Portal

## 1. Project Vision & Architecture
A high-converting, enterprise-grade Real Estate Investment Portal tailored for Non-Resident Indians (NRIs) and High-ROI institutional/fractional investors.

- **Frontend**: Next.js 15+ (App Router, Server Components by default, Tailwind CSS, Luxury Editorial Design System)
- **Target Backend (Headless)**: WordPress via WPGraphQL & Advanced Custom Fields (ACF Pro)
- **State & Caching**: Tagged On-Demand ISR Revalidation (`revalidateTag`) + Direct Webhooks
- **Performance Targets**: CLS = 0, LCP < 1.8s, Lighthouse Performance > 95, Strict A11y

```
┌─────────────────────────────────────────────────────────┐
│               HEADLESS WORDPRESS (CMS)                  │
│  • Custom Post Types: Properties, Blogs, Testimonials   │
│  • ACF Pro: Price, ROI, Specs, Location, Payment Plan   │
│  • WPGraphQL + WPGraphQL for ACF                        │
│  • Webhooks (Instant Cache Revalidation)               │
└───────────────────────────┬─────────────────────────────┘
                            │ (GraphQL over HTTPS)
                            ▼
┌─────────────────────────────────────────────────────────┐
│               NEXT.JS APP ROUTER (FRONTEND)             │
│  1. GraphQL Data Layer (Native Fetch + Tagged Caching)  │
│  2. TypeScript Adapter Layer (Strict WP -> UI Contract) │
│  3. Server Components (RSC) by default (SEO & CLS = 0)  │
│  4. Interactive Leaves (Filters, Currency, 3D Tour)     │
└─────────────────────────────────────────────────────────┘
```

---

## 2. Current Phase: DEEP UI / DESIGN & INTERACTIVE ENGINE (Priority #1)
Before any backend APIs or GraphQL connections are plugged in, we are building and polishing the complete UI/UX design:
- 100% pixel-perfect luxury editorial layouts.
- Reusable, modular React components driven by strict TypeScript interfaces (`src/types/property.ts`) and mock data (`src/data/properties.json`).
- Interactive client features: Multi-criteria faceted filter engine, real-time currency switcher (INR / USD / AED), interactive 3D tour modals, time-zone smart inquiry forms.

---

## 3. Comprehensive Feature Roadmap

### Phase 1: Data Contracts & Mock Schema (Completed)
- [x] Strict TypeScript models in `src/types/property.ts` (0 `any`, full ACF alignment).
- [x] Production mock dataset in `src/data/properties.json`.
- [x] Type-safe filter & query helpers in `src/lib/properties.ts`.

### Phase 2: Design & UI Polish / Component Suite (Active)
- [ ] Multi-criteria filter engine (Location, Property Type, Budget Range Slider, BHK, Minimum ROI %).
- [ ] Real-time Multi-Currency Switcher (INR ₹ / USD $ / AED).
- [ ] Interactive Media Components (3D Matterport modal, Drone video player, categorized photo gallery).
- [ ] NRI Time-Zone Smart Consultation Scheduler.
- [ ] Additional UI design sections, layouts, and responsive polish requested by user.

### Phase 3: Headless WPGraphQL Connection (Later Phase)
- [ ] Setup WPGraphQL client layer with native fetch and tagged ISR caching.
- [ ] Implement data adapters (`WPGraphQL Node -> UI Property Model`).
- [ ] On-demand revalidation webhook handler (`/api/revalidate`).

---

## 4. Current Status
- **Focus**: Deep UI / Design implementation and interactive frontend components.
- **Rules**: Zero backend calls, strict UI fidelity, modular clean architecture, zero CLS.
