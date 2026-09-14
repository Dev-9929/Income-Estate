import propertiesRaw from '@/data/properties.json'
import { propertiesDetailData } from '@/data/property-detail-data'

export interface SearchResultItem {
  id: string
  title: string
  slug: string
  category: 'roi-properties' | 'branded-residences' | 'other-properties' | string
  categoryLabel: string
  location: string
  city: string
  yieldDisplay?: string
  numericYield?: number
  investmentDisplay?: string
  image: string
  score: number
  matchedField?: string
}

export interface SearchEngineResponse {
  query: string
  totalResults: number
  results: SearchResultItem[]
  parsedCriteria?: {
    minYield?: number
    maxYield?: number
    city?: string
    category?: string
  }
}

// Levenshtein distance for fuzzy matching typos (e.g., oberio -> oberoi, dubaii -> dubai)
function levenshteinDistance(a: string, b: string): number {
  if (a.length === 0) return b.length
  if (b.length === 0) return a.length

  const matrix: number[][] = []

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i]
  }

  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1]
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          Math.min(
            matrix[i][j - 1] + 1, // insertion
            matrix[i - 1][j] + 1 // deletion
          )
        )
      }
    }
  }

  return matrix[b.length][a.length]
}

// Check fuzzy match between target string and token
function isFuzzyMatch(target: string, token: string, maxDist: number = 2): boolean {
  if (token.length < 3) return false
  const words = target.toLowerCase().split(/\s+/)
  for (const w of words) {
    if (Math.abs(w.length - token.length) <= maxDist) {
      if (levenshteinDistance(w, token.toLowerCase()) <= maxDist) {
        return true
      }
    }
  }
  return false
}

// Extract numeric yield / ROI condition out of query string
function extractYieldCriteria(rawQuery: string): { minYield?: number; maxYield?: number } {
  const q = rawQuery.toLowerCase()

  // Match e.g. "12%+", "above 10%", "min 10%", "12.4% yield", "10%-15%"
  const rangeMatch = q.match(/(\d+(?:\.\d+)?)\s*%\s*-\s*(\d+(?:\.\d+)?)\s*%?/)
  if (rangeMatch) {
    return {
      minYield: parseFloat(rangeMatch[1]),
      maxYield: parseFloat(rangeMatch[2]),
    }
  }

  const plusMatch = q.match(/(\d+(?:\.\d+)?)\s*%\s*\+/)
  if (plusMatch) {
    return { minYield: parseFloat(plusMatch[1]) }
  }

  const aboveMatch = q.match(/(?:above|greater|more than|min|minimum)\s*(\d+(?:\.\d+)?)\s*%?/)
  if (aboveMatch) {
    return { minYield: parseFloat(aboveMatch[1]) }
  }

  const standalonePercent = q.match(/(\d+(?:\.\d+)?)\s*%/)
  if (standalonePercent) {
    return { minYield: parseFloat(standalonePercent[1]) }
  }

  return {}
}

export function searchProperties(rawQuery: string): SearchEngineResponse {
  const query = (rawQuery || '').trim()

  if (!query) {
    return { query: '', totalResults: 0, results: [] }
  }

  const lowerQuery = query.toLowerCase()
  const yieldCriteria = extractYieldCriteria(query)
  const tokens = lowerQuery
    .replace(/[^\w\s%]/g, '')
    .split(/\s+/)
    .filter((t) => t.length > 1 && !['the', 'and', 'for', 'in', 'of', 'with', 'by', 'net', 'annual', 'yield'].includes(t))

  // Combine raw properties.json with propertiesDetailData
  const combinedMap = new Map<string, any>()

  for (const item of propertiesRaw as any[]) {
    if (item.slug) {
      combinedMap.set(item.slug, { ...item })
    }
  }

  for (const [slug, detail] of Object.entries(propertiesDetailData)) {
    const existing = combinedMap.get(slug) || {}
    const parsedYield = parseFloat(detail.rentalYield || detail.targetIrr || '0') || 0
    
    combinedMap.set(slug, {
      ...existing,
      id: detail.id || existing.id || slug,
      slug: detail.slug || existing.slug || slug,
      title: existing.title || `${detail.title} ${detail.titleAccent || ''}`.trim(),
      category: existing.category || (detail.propertyType?.toLowerCase().includes('residential') ? 'branded' : 'commercial'),
      location: existing.location || {
        city: detail.location.includes('Gurugram') ? 'Gurugram' : detail.location.includes('Jaipur') ? 'Jaipur' : detail.location.includes('Dubai') ? 'Dubai' : 'India',
        microMarket: detail.location,
        fullAddress: detail.location,
      },
      roi: existing.roi || {
        rentalYieldPercent: parsedYield,
        targetIrrPercent: parseFloat(detail.targetIrr || '0') || 0,
      },
      price: existing.price || {
        formattedInr: detail.priceStarting,
      },
      media: existing.media || {
        heroImage: detail.heroImage || detail.mainImage,
      },
      extraSearchText: [
        detail.overviewHeading,
        detail.overviewHeadingAccent,
        detail.overviewText1,
        detail.overviewText2,
        ...(detail.overviewFullStory || []),
        ...(detail.overviewHighlights || []),
        ...(detail.projectHighlights || []),
      ].filter(Boolean).join(' '),
    })
  }

  const resultsWithScore: SearchResultItem[] = []

  for (const item of combinedMap.values()) {
    let score = 0
    const titleLower = (item.title || '').toLowerCase()
    const taglineLower = (item.tagline || '').toLowerCase()
    const titleAccentLower = (item.titleAccent || '').toLowerCase()
    const cityLower = (item.location?.city || '').toLowerCase()
    const microMarketLower = (item.location?.microMarket || '').toLowerCase()
    const fullAddressLower = (item.location?.fullAddress || '').toLowerCase()
    const categoryLower = (item.category || '').toLowerCase()
    const badgesLower = (item.badges || []).join(' ').toLowerCase()
    const tenantLower = (item.roi?.tenantName || '').toLowerCase()
    const tenantProfileLower = (item.roi?.tenantProfile || '').toLowerCase()
    const extraSearchTextLower = (item.extraSearchText || '').toLowerCase()
    const numericYield = item.roi?.rentalYieldPercent || item.roi?.targetIrrPercent || 0

    // 1. Preset Trending Chips Exact / Special Handlers
    if (lowerQuery.includes('goa luxury resort') || lowerQuery.includes('goa')) {
      if (cityLower.includes('goa') || fullAddressLower.includes('goa') || microMarketLower.includes('goa')) {
        score += 90
      } else if (categoryLower.includes('resort') || titleLower.includes('resort')) {
        score += 60
      }
    }

    if (lowerQuery.includes('dubai branded') || lowerQuery.includes('dubai')) {
      if (cityLower.includes('dubai') || fullAddressLower.includes('dubai')) {
        score += 85
      }
    }

    if (lowerQuery.includes('pre-leased commercial') || lowerQuery.includes('commercial')) {
      if (categoryLower.includes('commercial') || badgesLower.includes('pre-leased') || tenantProfileLower.includes('leaseback')) {
        score += 80
      }
    }

    if (lowerQuery.includes('branded residence') || lowerQuery.includes('branded')) {
      if (categoryLower.includes('branded') || categoryLower.includes('residence') || titleLower.includes('lamborghini') || titleLower.includes('danube') || titleLower.includes('oberoi')) {
        score += 80
      }
    }

    // 2. Numeric Yield Condition Filter
    if (yieldCriteria.minYield !== undefined) {
      if (numericYield >= yieldCriteria.minYield) {
        score += 80
      } else if (numericYield >= yieldCriteria.minYield - 2.5) {
        // High yield assets close to target
        score += 45
      } else {
        score -= 20
      }
    }

    // 3. Exact Title / Brand Name Matches
    if (titleLower === lowerQuery) {
      score += 100
    } else if (titleLower.includes(lowerQuery)) {
      score += 85
    }

    // 4. City / Micro-Market Match
    if (cityLower.includes(lowerQuery) || microMarketLower.includes(lowerQuery)) {
      score += 65
    }

    // 5. Developer / Brand Matching (Lamborghini, Danube, Oberoi, Turban, Aryaville, Skyline, Manohar)
    const brandKeywords = ['lamborghini', 'danube', 'oberoi', 'turban', 'aryaville', 'skyline', 'manohar']
    for (const brand of brandKeywords) {
      if (
        (lowerQuery.includes(brand) || isFuzzyMatch(lowerQuery, brand, 2)) &&
        (titleLower.includes(brand) || taglineLower.includes(brand) || extraSearchTextLower.includes(brand))
      ) {
        score += 80
      }
    }

    // 6. Token Level Matching & Fuzzy Typo Handling
    for (const token of tokens) {
      if (token.endsWith('%') || !isNaN(Number(token))) continue

      if (titleLower.includes(token)) score += 25
      else if (cityLower.includes(token) || microMarketLower.includes(token)) score += 20
      else if (categoryLower.includes(token)) score += 20
      else if (taglineLower.includes(token) || titleAccentLower.includes(token)) score += 15
      else if (badgesLower.includes(token)) score += 15
      else if (extraSearchTextLower.includes(token)) score += 15
      else if (tenantLower.includes(token)) score += 10
      else if (
        isFuzzyMatch(titleLower, token, 2) ||
        isFuzzyMatch(cityLower, token, 2) ||
        isFuzzyMatch(extraSearchTextLower, token, 2)
      ) {
        score += 20
      }
    }

    // Determine appropriate category slug & label
    let mappedCategory = 'roi-properties'
    let categoryLabel = 'ROI Property'

    if (categoryLower.includes('branded') || titleLower.includes('lamborghini') || titleLower.includes('danube') || titleLower.includes('oberoi')) {
      mappedCategory = 'branded-residences'
      categoryLabel = 'Branded Residence'
    } else if (categoryLower.includes('commercial')) {
      mappedCategory = 'roi-properties'
      categoryLabel = 'Pre-Leased Commercial'
    } else if (categoryLower.includes('resort')) {
      mappedCategory = 'roi-properties'
      categoryLabel = 'Resort Asset'
    }

    if (score > 15) {
      const microMarket = item.location?.microMarket || ''
      const city = item.location?.city || 'India'
      let displayLocation = city
      if (microMarket) {
        if (microMarket.toLowerCase().endsWith(city.toLowerCase())) {
          displayLocation = microMarket
        } else {
          displayLocation = `${microMarket}, ${city}`
        }
      }

      resultsWithScore.push({
        id: item.id || item.slug,
        title: item.title,
        slug: item.slug,
        category: mappedCategory,
        categoryLabel,
        location: displayLocation,
        city,
        yieldDisplay: numericYield ? `${numericYield}% Yield` : undefined,
        numericYield,
        investmentDisplay: item.price?.formattedInr || item.price?.formattedAed || item.price?.formattedUsd || 'On Request',
        image: item.media?.heroImage || item.media?.thumbnailImage || '/assets/wordpress_media/arayvilla-scaled-1.webp',
        score,
      })
    }
  }

  // Sort descending by score
  resultsWithScore.sort((a, b) => b.score - a.score)

  return {
    query,
    totalResults: resultsWithScore.length,
    results: resultsWithScore,
    parsedCriteria: yieldCriteria,
  }
}

