import { Property, PropertyFilterState, SupportedCurrency } from '@/types/property'
import propertiesRaw from '@/data/properties.json'

const propertiesData: Property[] = propertiesRaw as Property[]

/**
 * Fetch all properties from mock storage / headless WP GraphQL bridge
 */
export function getAllProperties(): Property[] {
  return propertiesData
}

/**
 * Get single property by URL slug
 */
export function getPropertyBySlug(slug: string): Property | undefined {
  return propertiesData.find((p) => p.slug === slug)
}

/**
 * Fetch all featured properties for hero/homepage carousel
 */
export function getFeaturedProperties(): Property[] {
  return propertiesData.filter((p) => p.isFeatured)
}

/**
 * Get all available property slugs for Next.js generateStaticParams
 */
export function getAllPropertySlugs(): string[] {
  return propertiesData.map((p) => p.slug)
}

/**
 * Format numeric value according to selected currency
 */
export function formatCurrencyValue(
  price: Property['price'],
  currency: SupportedCurrency
): string {
  switch (currency) {
    case 'USD':
      return price.formattedUsd
    case 'AED':
      return price.formattedAed
    case 'INR':
    default:
      return price.formattedInr
  }
}

/**
 * Client/Server filter engine for faceted multi-criteria property searches
 */
export function filterProperties(
  properties: Property[],
  filters: Partial<PropertyFilterState>
): Property[] {
  return properties.filter((prop) => {
    // 1. Search text query (Title, micro-market, tagline)
    if (filters.searchQuery && filters.searchQuery.trim() !== '') {
      const q = filters.searchQuery.toLowerCase()
      const matchesSearch =
        prop.title.toLowerCase().includes(q) ||
        prop.location.microMarket.toLowerCase().includes(q) ||
        prop.location.city.toLowerCase().includes(q) ||
        prop.tagline.toLowerCase().includes(q)
      if (!matchesSearch) return false
    }

    // 2. Location filter
    if (filters.selectedLocations && filters.selectedLocations.length > 0) {
      if (!filters.selectedLocations.includes(prop.location.city)) {
        return false
      }
    }

    // 3. Category filter (villa, apartment, commercial, resort-unit)
    if (filters.selectedCategories && filters.selectedCategories.length > 0) {
      if (!filters.selectedCategories.includes(prop.category)) {
        return false
      }
    }

    // 4. BHK filter
    if (filters.selectedBhk && filters.selectedBhk.length > 0) {
      if (!filters.selectedBhk.includes(prop.specs.bhk)) {
        return false
      }
    }

    // 5. Price Range (in INR)
    if (filters.priceRange) {
      const [minPrice, maxPrice] = filters.priceRange
      if (prop.price.inr < minPrice || prop.price.inr > maxPrice) {
        return false
      }
    }

    // 6. Minimum Expected ROI %
    if (filters.minYield !== undefined && filters.minYield > 0) {
      if (prop.roi.rentalYieldPercent < filters.minYield) {
        return false
      }
    }

    // 7. Possession status
    if (filters.possessionStatuses && filters.possessionStatuses.length > 0) {
      if (!filters.possessionStatuses.includes(prop.specs.possessionStatus)) {
        return false
      }
    }

    return true
  })
}
