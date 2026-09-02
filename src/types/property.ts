/**
 * Property Data Contracts & Headless ACF / WPGraphQL Schema Definitions
 * Enterprise-grade, strictly-typed models for Real Estate Assets, ROI Projections, and Filter Criteria.
 */

export type SupportedCurrency = 'INR' | 'USD' | 'AED'

export type PropertyCategory = 'villa' | 'apartment' | 'resort-unit' | 'commercial' | 'plot'

export type InvestmentStructure = 'fractional-spv' | 'sole-ownership' | 'slb-leased' | 'co-ownership'

export type PossessionStatus = 'ready-to-move' | 'under-construction' | 'pre-launch'

export type FurnishingStatus = 'fully-furnished' | 'semi-furnished' | 'bare-shell'

export interface MultiCurrencyPrice {
  inr: number // Numeric value in INR for range filtering & sorting
  usd: number // Derived/fixed USD value
  aed: number // Derived/fixed AED value
  formattedInr: string // e.g. "₹ 70 Lacs" or "₹ 2.75 Cr"
  formattedUsd: string // e.g. "$84,000"
  formattedAed: string // e.g. "AED 310,000"
}

export interface RoiMetrics {
  rentalYieldPercent: number // e.g. 9.2 (representing 9.2% annual net yield)
  targetIrrPercent: number // e.g. 14.5 (representing 14.5% projected IRR)
  leaseDurationYears: number // e.g. 5 (5-year locked-in corporate lease)
  estimatedMonthlyPayoutInr: number // e.g. 53500
  tenantName: string // e.g. "Lemon Tree Hotels" / "Turban Hospitality"
  tenantProfile: string // e.g. "Institutional Hospitality Operator"
  lockInPeriod: string // e.g. "3 Years"
  payoutFrequency: 'monthly' | 'quarterly' | 'annually'
}

export interface PropertySpecs {
  bhk: number // e.g. 1, 2, 3, 4, 5 (0 for commercial/studio/plot)
  carpetAreaSqFt: number // e.g. 650
  superAreaSqFt: number // e.g. 920
  bathrooms: number // e.g. 2
  floorNumber: string // e.g. "Ground + 1" or "4th of 12"
  furnishing: FurnishingStatus
  possessionStatus: PossessionStatus
  possessionDate: string // e.g. "Dec 2026" or "Immediate"
  ownershipType: InvestmentStructure
  unitsAvailable: number // e.g. 8
  reraRegistrationNumber: string // e.g. "RAJ/P/2023/1892"
}

export interface MediaGalleryItem {
  url: string
  title: string
  alt: string
  category?: 'interior' | 'exterior' | 'aerial' | 'amenity' | 'floorplan'
}

export interface PropertyMedia {
  heroImage: string
  thumbnailImage: string
  gallery: MediaGalleryItem[]
  droneVideoUrl?: string
  virtualTour3dUrl?: string
  brochurePdfUrl?: string
}

export interface LandmarkNode {
  name: string
  distance: string // e.g. "12 Mins" or "4.5 Km"
  type: 'transit' | 'airport' | 'hospital' | 'commercial-hub' | 'highway'
}

export interface LocationData {
  city: string // e.g. "Jaipur", "Dubai", "Goa"
  state: string
  country: string
  microMarket: string // e.g. "Patrakar Colony", "Chandwaji", "Business Bay"
  fullAddress: string
  latitude: number
  longitude: number
  mapEmbedUrl: string
  nearbyLandmarks: LandmarkNode[]
}

export interface PropertyAmenity {
  id: string
  name: string
  iconKey: string
  category: 'lifestyle' | 'security' | 'wellness' | 'convenience' | 'legal'
}

export interface PaymentMilestone {
  milestone: string
  timeline: string
  percentage: number
  isHighlighted?: boolean
}

export interface ConstructionUpdate {
  stage: string
  title: string
  progressPercent: number
  status: 'completed' | 'in-progress' | 'upcoming'
  imageUrl: string
  updateDate: string
}

export interface PropertyFaq {
  question: string
  answer: string
  category?: string
}

export interface Property {
  id: string
  slug: string
  title: string
  titleAccent?: string
  tagline: string
  category: PropertyCategory
  isFeatured: boolean
  isNriRecommended: boolean
  badges: string[] // e.g. ["Pre-Leased", "FEMA Compliant", "Guaranteed Yield"]
  price: MultiCurrencyPrice
  roi: RoiMetrics
  specs: PropertySpecs
  media: PropertyMedia
  location: LocationData
  overview: {
    heading: string
    subheading?: string
    paragraphs: string[]
    keyHighlights: string[]
  }
  amenities: PropertyAmenity[]
  paymentPlan: PaymentMilestone[]
  constructionUpdates: ConstructionUpdate[]
  faqs: PropertyFaq[]
  similarPropertySlugs: string[]
  meta: {
    seoTitle: string
    seoDescription: string
    canonicalUrl?: string
  }
}

/**
 * Filter and Search State Contracts for the Property Showcase Engine
 */
export interface PropertyFilterState {
  searchQuery: string
  selectedLocations: string[]
  selectedCategories: PropertyCategory[]
  selectedBhk: number[]
  priceRange: [number, number] // [min, max] in INR
  minYield: number // Minimum expected annual yield %
  possessionStatuses: PossessionStatus[]
  investmentStructures: InvestmentStructure[]
  sortBy: 'price-asc' | 'price-desc' | 'yield-desc' | 'featured' | 'newest'
  activeCurrency: SupportedCurrency
}
