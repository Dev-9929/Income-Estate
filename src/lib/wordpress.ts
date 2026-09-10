import { BlogPostItem, blogsListingData, getBlogBySlug } from '@/data/blogs-data'
import { PropertyListingItem, propertiesListingData, brandedResidencesListingData } from '@/data/properties-data'
import { PropertyCarouselItem, BrandedResidenceItem } from '@/data/home-data'
import {
  PropertyDetailItem,
  getPropertyDetailBySlug,
  propertiesDetailData,
} from '@/data/property-detail-data'

export interface WPSEOData {
  title?: string
  metaDesc?: string
  canonical?: string
  opengraphImage?: {
    sourceUrl?: string
  }
  schema?: {
    raw?: string
  }
}

export interface WPPropertyCategoryNode {
  name?: string
  slug?: string
}

export interface WPPropertyDetails {
  location?: string
  priceDisplay?: string
  totalUnits?: string
  annualRoi?: string
  startInvestLink?: string
  galleryImages?: {
    nodes?: Array<{
      sourceUrl?: string
      altText?: string
    }>
  }
}

export interface WPPropertyPage {
  titleAccent?: string
  heroLabel?: string
  propertyType?: string
  possession?: string
  projectScope?: string
  sizeArea?: string
  priceStarting?: string
  rentalYield?: string
  targetIrr?: string
  brochureFile?: { node?: { mediaItemUrl?: string; sourceUrl?: string } }
  brochureUrl?: string
  overviewTag?: string
  overviewHeading?: string
  overviewHeadingAccent?: string
  overviewText1?: string
  overviewText2?: string
  overviewFullStory?: Array<{ paragraph?: string }>
  overviewHighlights?: Array<{ highlight?: string }>
  locationDesc?: string
  mapEmbedUrl?: string
  heroImage?: { node?: { sourceUrl?: string; altText?: string } }
  mainImage?: { node?: { sourceUrl?: string; altText?: string } }
  thumbImage?: { node?: { sourceUrl?: string; altText?: string } }
  roiFrontImage?: { node?: { sourceUrl?: string; altText?: string } }
  roiBackImage?: { node?: { sourceUrl?: string; altText?: string } }
  facts?: Array<{ val?: string; lbl?: string }>
  gallery?: Array<{
    label?: string
    gridClass?: string
    image?: { node?: { sourceUrl?: string; altText?: string } }
  }>
  unitConfigurations?: Array<{
    type?: string
    size?: string
    price?: string
    paymentPlan?: string
  }>
  highlightsIntro?: string
  projectHighlights?: Array<{ highlight?: string }>
  roiMetrics?: Array<{ label?: string; val?: string; isGold?: boolean }>
  tenants?: Array<{ name?: string; detail?: string }>
  amenities?: Array<{ name?: string; iconType?: 'lease' | 'parking' | 'security' | 'view' | 'interior' | 'managed' | 'pool' | 'spa' }>
  videos?: Array<{
    id?: string
    title?: string
    category?: 'route' | 'drone' | 'walkthrough' | 'construction'
    categoryLabel?: string
    duration?: string
    posterImage?: { node?: { sourceUrl?: string; altText?: string } }
    videoUrl?: string
    description?: string
    waypoints?: Array<{ marker?: string; title?: string; desc?: string }>
  }>
  nearby?: Array<{ name?: string; dist?: string }>
  paymentPlan?: Array<{ milestone?: string; timeline?: string; percent?: string; isHighlight?: boolean }>
  constructionStages?: Array<{
    overlay?: string
    image?: { node?: { sourceUrl?: string; altText?: string } }
  }>
  faqs?: Array<{ question?: string; answer?: string }>
}

export interface WPPropertyNode {
  id: string
  databaseId?: number
  slug: string
  title: string
  date?: string
  content?: string
  featuredImage?: {
    node?: {
      sourceUrl?: string
      altText?: string
    }
  }
  propertyCategories?: {
    nodes?: WPPropertyCategoryNode[]
  }
  propertyDetails?: WPPropertyDetails
  propertyPage?: WPPropertyPage
  seo?: WPSEOData
}

export interface WPPropertiesResponse {
  properties?: {
    nodes?: WPPropertyNode[]
  }
}

export interface WPPropertyCategoriesResponse {
  propertyCategories?: {
    nodes?: Array<{
      name?: string
      slug?: string
      properties?: {
        nodes?: WPPropertyNode[]
      }
    }>
  }
}

export interface WPPropertyBySlugResponse {
  property?: WPPropertyNode | null
}

export interface WPPostNode {
  id: string
  databaseId?: number
  slug: string
  title: string
  date: string
  excerpt?: string
  content?: string
  author?: {
    node?: {
      name?: string
    }
  }
  categories?: {
    nodes?: Array<{
      name?: string
      slug?: string
    }>
  }
  featuredImage?: {
    node?: {
      sourceUrl?: string
      altText?: string
    }
  }
}

export interface WPPostSEO {
  title?: string
  metaDesc?: string
  canonical?: string
  schema?: {
    raw?: string
  }
}

export interface WPBlogPostNode {
  title: string
  slug: string
  excerpt?: string
  date: string
  categories?: {
    nodes?: Array<{
      name?: string
      slug?: string
    }>
  }
  featuredImage?: {
    node?: {
      sourceUrl?: string
      altText?: string
    }
  }
  content?: string
  seo?: WPPostSEO
}

export interface WPAllBlogPostsResponse {
  posts?: {
    nodes?: WPBlogPostNode[]
  }
}

export interface WPBlogPostBySlugResponse {
  post?: WPBlogPostNode | null
}

export interface WPPostsResponse {
  posts?: {
    nodes?: WPPostNode[]
  }
}

export interface WPPostBySlugResponse {
  post?: WPPostNode | null
}

export async function fetchGraphQL<T>(
  query: string,
  variables: Record<string, unknown> = {}
): Promise<T> {
  const endpoint = process.env.NEXT_PUBLIC_WORDPRESS_API_URL

  if (!endpoint) {
    console.warn('NEXT_PUBLIC_WORDPRESS_API_URL is not defined in .env.local')
    return {} as T
  }

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, variables }),
      next: { revalidate: 60 }, // ISR revalidation every 60 seconds
    })

    if (!res.ok) {
      console.warn(`WordPress GraphQL HTTP ${res.status}: ${res.statusText}`)
      return {} as T
    }

    const json = await res.json()

    if (json.errors && json.errors.length > 0) {
      console.warn('WordPress GraphQL query notices:', json.errors[0]?.message || json.errors)
    }

    if (json.data) {
      return json.data as T
    }

    return {} as T
  } catch (err) {
    console.warn('WordPress GraphQL fetch failed, using fallback data:', err)
    return {} as T
  }
}

// ----------------------------------------------------
// BLOG QUERIES & HELPERS
// ----------------------------------------------------

export const GET_ALL_BLOG_POSTS_QUERY = `
  query GetAllBlogPosts {
    posts(first: 100, where: { orderby: { field: DATE, order: DESC } }) {
      nodes {
        title
        slug
        excerpt
        date
        categories {
          nodes {
            name
            slug
          }
        }
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        seo {
          title
          metaDesc
          canonical
          schema {
            raw
          }
        }
      }
    }
  }
`

export const GET_BLOG_POST_BY_SLUG_QUERY = `
  query GetBlogPostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      title
      slug
      excerpt
      date
      categories {
        nodes {
          name
          slug
        }
      }
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
      content
      seo {
        title
        metaDesc
        canonical
        schema {
          raw
        }
      }
    }
  }
`

export async function getAllLiveBlogPosts(): Promise<WPBlogPostNode[]> {
  try {
    const data = await fetchGraphQL<WPAllBlogPostsResponse>(GET_ALL_BLOG_POSTS_QUERY)
    const nodes = data?.posts?.nodes || []
    // Exclude "hello-world" default WordPress post as a safety net
    return nodes.filter((post) => post.slug && post.slug.toLowerCase() !== 'hello-world')
  } catch (error) {
    console.error('Error fetching live WordPress blog posts:', error)
    return []
  }
}

export async function getLiveBlogPostBySlug(slug: string): Promise<WPBlogPostNode | null> {
  if (!slug || slug.toLowerCase() === 'hello-world') return null

  try {
    const data = await fetchGraphQL<WPBlogPostBySlugResponse>(GET_BLOG_POST_BY_SLUG_QUERY, { slug })
    return data?.post || null
  } catch (error) {
    console.error(`Error fetching WordPress blog post with slug "${slug}":`, error)
    return null
  }
}

export const GET_ALL_POSTS_QUERY = `
  query GetAllPosts {
    posts(first: 100, where: { orderby: { field: DATE, order: DESC } }) {
      nodes {
        id
        databaseId
        slug
        title
        date
        excerpt
        content
        author {
          node {
            name
          }
        }
        categories {
          nodes {
            name
            slug
          }
        }
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
  }
`

export const GET_POST_BY_SLUG_QUERY = `
  query GetPostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      id
      databaseId
      slug
      title
      date
      excerpt
      content
      author {
        node {
          name
        }
      }
      categories {
        nodes {
          name
          slug
        }
      }
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
    }
  }
`

export function formatPostDate(rawDate?: string): string {
  if (!rawDate) return 'June 15, 2026'
  try {
    const d = new Date(rawDate)
    if (isNaN(d.getTime())) return rawDate
    return d.toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' })
  } catch {
    return rawDate
  }
}

export function calculateReadTime(text?: string): string {
  if (!text) return '5 min read'
  const cleanText = text.replace(/<[^>]*>/g, '').trim()
  const words = cleanText.split(/\s+/).filter(Boolean).length
  const minutes = Math.max(1, Math.ceil(words / 200))
  return `${minutes} min read`
}

export function cleanExcerpt(rawExcerpt?: string): string {
  if (!rawExcerpt) return ''
  return rawExcerpt.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim()
}

export function mapWPPostToBlogPostItem(post: WPPostNode): BlogPostItem {
  const catName = post.categories?.nodes?.[0]?.name?.toUpperCase() || 'FRACTIONAL GUIDE'

  return {
    id: post.databaseId ? String(post.databaseId) : post.id,
    slug: post.slug,
    title: post.title,
    category: catName as BlogPostItem['category'],
    date: formatPostDate(post.date),
    readTime: calculateReadTime(post.content || post.excerpt),
    author: post.author?.node?.name ? post.author.node.name.toUpperCase() : 'INCOME ESTATE RESEARCH DESK',
    image: post.featuredImage?.node?.sourceUrl || '/assets/wordpress_media/Sale-Leaseback-Model.jpg',
    excerpt: cleanExcerpt(post.excerpt) || cleanExcerpt(post.content)?.substring(0, 160) + '...',
    contentHtml: post.content || post.excerpt || '',
  }
}

export async function getAllWordPressPosts(): Promise<BlogPostItem[]> {
  try {
    const data = await fetchGraphQL<WPPostsResponse>(GET_ALL_POSTS_QUERY)
    const nodes = data?.posts?.nodes || []
    if (nodes.length === 0) {
      return blogsListingData
    }
    const wpPosts = nodes.map(mapWPPostToBlogPostItem)

    const combinedSlugs = new Set(wpPosts.map((p) => p.slug))
    const extraMockPosts = blogsListingData.filter((p) => !combinedSlugs.has(p.slug))

    return [...wpPosts, ...extraMockPosts]
  } catch (error) {
    console.warn('WPGraphQL fetch failed, falling back to static mock data:', error)
    return blogsListingData
  }
}

export async function getWordPressPostBySlug(slug: string): Promise<BlogPostItem | undefined> {
  try {
    const data = await fetchGraphQL<WPPostBySlugResponse>(GET_POST_BY_SLUG_QUERY, { slug })
    if (data?.post) {
      return mapWPPostToBlogPostItem(data.post)
    }
  } catch (error) {
    console.warn(`WPGraphQL fetch failed for slug "${slug}", checking static mock data:`, error)
  }
  return getBlogBySlug(slug)
}

// ----------------------------------------------------
// PROPERTY QUERIES & HELPERS
// ----------------------------------------------------

export const GET_ALL_PROPERTIES_QUERY = `
  query GetAllProperties {
    properties(first: 100, where: { orderby: { field: DATE, order: DESC } }) {
      nodes {
        id
        databaseId
        slug
        title
        date
        content
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        propertyCategories {
          nodes {
            name
            slug
          }
        }
        propertyDetails {
          location
          priceDisplay
          totalUnits
          annualRoi
          startInvestLink
          galleryImages {
            nodes {
              sourceUrl
              altText
            }
          }
        }
        seo {
          title
          metaDesc
          canonical
          opengraphImage {
            sourceUrl
          }
          schema {
            raw
          }
        }
      }
    }
  }
`

export const GET_PROPERTIES_BY_CATEGORY_QUERY = `
  query GetPropertiesByCategory($categorySlug: [String]) {
    propertyCategories(where: { slug: $categorySlug }) {
      nodes {
        name
        slug
        properties {
          nodes {
            id
            databaseId
            slug
            title
            date
            content
            featuredImage {
              node {
                sourceUrl
                altText
              }
            }
            propertyCategories {
              nodes {
                name
                slug
              }
            }
            propertyDetails {
              location
              priceDisplay
              totalUnits
              annualRoi
              startInvestLink
              galleryImages {
                nodes {
                  sourceUrl
                  altText
                }
              }
            }
            seo {
              title
              metaDesc
              canonical
              opengraphImage {
                sourceUrl
              }
              schema {
                raw
              }
            }
          }
        }
      }
    }
  }
`

export const GET_PROPERTY_BY_SLUG_QUERY = `
  query GetPropertyBySlug($slug: ID!) {
    property(id: $slug, idType: SLUG) {
      id
      databaseId
      slug
      title
      date
      content
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
      propertyCategories {
        nodes {
          name
          slug
        }
      }
      propertyDetails {
        location
        priceDisplay
        totalUnits
        annualRoi
        startInvestLink
        galleryImages {
          nodes {
            sourceUrl
            altText
          }
        }
      }
      propertyPage {
        titleAccent
        heroLabel
        propertyType
        possession
        projectScope
        sizeArea
        priceStarting
        rentalYield
        targetIrr
        brochureFile {
          node {
            mediaItemUrl
            sourceUrl
          }
        }
        brochureUrl
        overviewTag
        overviewHeading
        overviewHeadingAccent
        overviewText1
        overviewText2
        overviewFullStory {
          paragraph
        }
        overviewHighlights {
          highlight
        }
        locationDesc
        mapEmbedUrl
        heroImage {
          node {
            sourceUrl
            altText
          }
        }
        mainImage {
          node {
            sourceUrl
            altText
          }
        }
        thumbImage {
          node {
            sourceUrl
            altText
          }
        }
        roiFrontImage {
          node {
            sourceUrl
            altText
          }
        }
        roiBackImage {
          node {
            sourceUrl
            altText
          }
        }
        facts {
          val
          lbl
        }
        gallery {
          label
          gridClass
          image {
            node {
              sourceUrl
              altText
            }
          }
        }
        unitConfigurations {
          type
          size
          price
          paymentPlan
        }
        highlightsIntro
        projectHighlights {
          highlight
        }
        roiMetrics {
          label
          val
          isGold
        }
        tenants {
          name
          detail
        }
        amenities {
          name
          iconType
        }
        videos {
          id
          title
          category
          categoryLabel
          duration
          videoUrl
          description
          posterImage {
            node {
              sourceUrl
              altText
            }
          }
          waypoints {
            marker
            title
            desc
          }
        }
        nearby {
          name
          dist
        }
        paymentPlan {
          milestone
          timeline
          percent
          isHighlight
        }
        constructionStages {
          overlay
          image {
            node {
              sourceUrl
              altText
            }
          }
        }
        faqs {
          question
          answer
        }
      }
      seo {
        title
        metaDesc
        canonical
        opengraphImage {
          sourceUrl
        }
        schema {
          raw
        }
      }
    }
  }
`

export function mapWPPropertyToPropertyListingItem(node: WPPropertyNode): PropertyListingItem {
  const details = node.propertyDetails
  const categorySlug = node.propertyCategories?.nodes?.[0]?.slug || 'roi-properties'
  const image =
    node.featuredImage?.node?.sourceUrl ||
    details?.galleryImages?.nodes?.[0]?.sourceUrl ||
    '/assets/wordpress_media/Project-Photo-9-Skyline-Arcadia-Jaipur-5442983_2000_1226.jpg'

  return {
    id: node.databaseId ? String(node.databaseId) : node.id,
    title: node.title,
    location: details?.location || 'Jaipur, Rajasthan',
    investment: details?.priceDisplay || '₹ 70 LACS.',
    units: details?.totalUnits || '8+',
    roi: details?.annualRoi || '9.0%',
    image,
    slug: node.slug,
    category: categorySlug,
  }
}

export function mapWPPropertyToPropertyDetailItem(node: WPPropertyNode): PropertyDetailItem {
  const details = node.propertyDetails
  const page = node.propertyPage
  const fallbackDetail = getPropertyDetailBySlug(node.slug) || propertiesDetailData['skyline-arcadia']
  const galleryNodes = details?.galleryImages?.nodes || []

  const wpTitle = node.title
  const rawTitleAccent = page?.titleAccent ?? fallbackDetail.titleAccent ?? ''
  const titleAlreadyContainsAccent =
    rawTitleAccent && wpTitle.toLowerCase().includes(rawTitleAccent.toLowerCase())

  const pageGallery = page?.gallery
  const galleryItems =
    pageGallery && pageGallery.length > 0
      ? pageGallery.map((g, idx) => ({
          image: g.image?.node?.sourceUrl || fallbackDetail.gallery[idx % fallbackDetail.gallery.length]?.image || '',
          label: g.label || `Gallery Image ${idx + 1}`,
          gridClass: g.gridClass || `pd2-gi-${(idx % 6) + 1}`,
        }))
      : galleryNodes.length > 0
      ? galleryNodes.map((img, idx) => ({
          image: img.sourceUrl || fallbackDetail.gallery[idx % fallbackDetail.gallery.length]?.image || '',
          label: img.altText || `Gallery Image ${idx + 1}`,
          gridClass: `pd2-gi-${(idx % 6) + 1}`,
        }))
      : fallbackDetail.gallery

  const heroImg =
    page?.heroImage?.node?.sourceUrl ||
    node.featuredImage?.node?.sourceUrl ||
    galleryNodes[0]?.sourceUrl ||
    fallbackDetail.heroImage

  const mainImg = page?.mainImage?.node?.sourceUrl || galleryNodes[0]?.sourceUrl || fallbackDetail.mainImage
  const thumbImg = page?.thumbImage?.node?.sourceUrl || galleryNodes[1]?.sourceUrl || fallbackDetail.thumbImage
  const roiFrontImg = page?.roiFrontImage?.node?.sourceUrl || fallbackDetail.roiFrontImage
  const roiBackImg = page?.roiBackImage?.node?.sourceUrl || fallbackDetail.roiBackImage

  const factsItems =
    page?.facts && page.facts.length > 0
      ? page.facts.map((f) => ({ val: f.val || '', lbl: f.lbl || '' }))
      : fallbackDetail.facts

  const roiMetricsItems =
    page?.roiMetrics && page.roiMetrics.length > 0
      ? page.roiMetrics.map((m) => ({ label: m.label || '', val: m.val || '', isGold: Boolean(m.isGold) }))
      : fallbackDetail.roiMetrics

  const tenantsItems =
    page?.tenants && page.tenants.length > 0
      ? page.tenants.map((t) => ({ name: t.name || '', detail: t.detail || '' }))
      : fallbackDetail.tenants

  const amenitiesItems =
    page?.amenities && page.amenities.length > 0
      ? page.amenities.map((a) => ({ name: a.name || '', iconType: (a.iconType || 'lease') as any }))
      : fallbackDetail.amenities

  const nearbyItems =
    page?.nearby && page.nearby.length > 0
      ? page.nearby.map((n) => ({ name: n.name || '', dist: n.dist || '' }))
      : fallbackDetail.nearby

  const paymentPlanItems =
    page?.paymentPlan && page.paymentPlan.length > 0
      ? page.paymentPlan.map((p) => ({
          milestone: p.milestone || '',
          timeline: p.timeline || '',
          percent: p.percent || '',
          isHighlight: Boolean(p.isHighlight),
        }))
      : fallbackDetail.paymentPlan

  const constructionStagesItems =
    page?.constructionStages && page.constructionStages.length > 0
      ? page.constructionStages.map((cs) => ({
          image: cs.image?.node?.sourceUrl || '',
          overlay: cs.overlay || '',
        }))
      : fallbackDetail.constructionStages

  const faqsItems =
    page?.faqs && page.faqs.length > 0
      ? page.faqs.map((faq) => ({ question: faq.question || '', answer: faq.answer || '' }))
      : fallbackDetail.faqs

  const unitConfigurationsItems =
    page?.unitConfigurations && page.unitConfigurations.length > 0
      ? page.unitConfigurations.map((u) => ({
          type: u.type || '',
          size: u.size || '',
          price: u.price || '',
          paymentPlan: u.paymentPlan || '',
        }))
      : fallbackDetail.unitConfigurations

  const videosItems =
    page?.videos && page.videos.length > 0
      ? page.videos.map((v, vIdx) => ({
          id: v.id || `video-${vIdx}`,
          title: v.title || '',
          category: (v.category || 'route') as 'route' | 'drone' | 'walkthrough' | 'construction',
          categoryLabel: v.categoryLabel || '',
          duration: v.duration || '',
          posterImage: v.posterImage?.node?.sourceUrl || '',
          videoUrl: v.videoUrl || '',
          description: v.description || '',
          waypoints: v.waypoints?.map((w) => ({
            marker: w.marker || '',
            title: w.title || '',
            desc: w.desc || '',
          })),
        }))
      : fallbackDetail.videos

  const overviewFullStoryItems =
    page?.overviewFullStory && page.overviewFullStory.length > 0
      ? page.overviewFullStory.map((s) => s.paragraph || '').filter(Boolean)
      : fallbackDetail.overviewFullStory

  const overviewHighlightsItems =
    page?.overviewHighlights && page.overviewHighlights.length > 0
      ? page.overviewHighlights.map((h) => h.highlight || '').filter(Boolean)
      : fallbackDetail.overviewHighlights

  const projectHighlightsItems =
    page?.projectHighlights && page.projectHighlights.length > 0
      ? page.projectHighlights.map((h) => h.highlight || '').filter(Boolean)
      : fallbackDetail.projectHighlights

  const brochureUrl =
    page?.brochureFile?.node?.mediaItemUrl ||
    page?.brochureFile?.node?.sourceUrl ||
    page?.brochureUrl ||
    fallbackDetail.brochureUrl

  return {
    ...fallbackDetail,
    id: node.databaseId ? String(node.databaseId) : node.id,
    slug: node.slug,
    title: wpTitle,
    titleAccent: titleAlreadyContainsAccent ? '' : rawTitleAccent,
    heroLabel: page?.heroLabel || fallbackDetail.heroLabel,
    propertyType: page?.propertyType || fallbackDetail.propertyType,
    possession: page?.possession || fallbackDetail.possession,
    projectScope: page?.projectScope || fallbackDetail.projectScope,
    sizeArea: page?.sizeArea || fallbackDetail.sizeArea,
    location: details?.location || fallbackDetail.location,
    heroImage: heroImg,
    mainImage: mainImg,
    thumbImage: thumbImg,
    roiFrontImage: roiFrontImg,
    roiBackImage: roiBackImg,
    brochureUrl,
    priceStarting: page?.priceStarting || details?.priceDisplay || fallbackDetail.priceStarting,
    rentalYield: page?.rentalYield || details?.annualRoi || fallbackDetail.rentalYield,
    targetIrr: page?.targetIrr || fallbackDetail.targetIrr,
    overviewTag: page?.overviewTag || fallbackDetail.overviewTag,
    overviewHeading: page?.overviewHeading || fallbackDetail.overviewHeading,
    overviewHeadingAccent: page?.overviewHeadingAccent || fallbackDetail.overviewHeadingAccent,
    overviewText1: page?.overviewText1 || fallbackDetail.overviewText1,
    overviewText2: page?.overviewText2 || fallbackDetail.overviewText2,
    overviewFullStory: overviewFullStoryItems,
    overviewHighlights: overviewHighlightsItems,
    highlightsIntro: page?.highlightsIntro || fallbackDetail.highlightsIntro,
    projectHighlights: projectHighlightsItems,
    locationDesc: page?.locationDesc || fallbackDetail.locationDesc,
    mapEmbedUrl: page?.mapEmbedUrl || fallbackDetail.mapEmbedUrl,
    facts: factsItems,
    gallery: galleryItems,
    unitConfigurations: unitConfigurationsItems,
    roiMetrics: roiMetricsItems,
    tenants: tenantsItems,
    amenities: amenitiesItems,
    videos: videosItems,
    nearby: nearbyItems,
    paymentPlan: paymentPlanItems,
    constructionStages: constructionStagesItems,
    faqs: faqsItems,
  }
}

export async function getAllWordPressProperties(categorySlug?: string): Promise<PropertyListingItem[]> {
  try {
    if (categorySlug && categorySlug !== 'all') {
      const data = await fetchGraphQL<WPPropertyCategoriesResponse>(GET_PROPERTIES_BY_CATEGORY_QUERY, {
        categorySlug: [categorySlug],
      })
      const categoryNodes = data?.propertyCategories?.nodes || []
      const propertyNodes = categoryNodes[0]?.properties?.nodes || []
      if (propertyNodes.length > 0) {
        return propertyNodes.map(mapWPPropertyToPropertyListingItem)
      }
    } else {
      const data = await fetchGraphQL<WPPropertiesResponse>(GET_ALL_PROPERTIES_QUERY)
      const nodes = data?.properties?.nodes || []
      if (nodes.length > 0) {
        return nodes.map(mapWPPropertyToPropertyListingItem)
      }
    }
  } catch (error) {
    console.warn(`WPGraphQL properties fetch failed for category "${categorySlug}", using static data:`, error)
  }

  if (categorySlug === 'branded-residences' || categorySlug === 'branded') {
    return brandedResidencesListingData
  }
  return propertiesListingData
}

export async function getWordPressPropertyBySlug(
  slug: string
): Promise<{ detail: PropertyDetailItem; node?: WPPropertyNode } | undefined> {
  try {
    const data = await fetchGraphQL<WPPropertyBySlugResponse>(GET_PROPERTY_BY_SLUG_QUERY, { slug })
    if (data?.property) {
      return {
        detail: mapWPPropertyToPropertyDetailItem(data.property),
        node: data.property,
      }
    }
  } catch (error) {
    console.warn(`WPGraphQL property fetch failed for slug "${slug}", using static mock data:`, error)
  }

  const staticDetail = getPropertyDetailBySlug(slug)
  if (staticDetail) {
    return { detail: staticDetail }
  }
  return undefined
}

export async function getHomeRoiProperties(): Promise<PropertyCarouselItem[]> {
  const wpProperties = await getAllWordPressProperties('roi-properties')
  return wpProperties.map((p) => ({
    id: p.id,
    title: p.title,
    price: p.investment
      ? p.investment.toUpperCase().startsWith('STARTING')
        ? p.investment
        : `Starting from ${p.investment}`
      : 'Starting from ₹ 70 LACS.',
    image: p.image,
    slug: p.slug,
    category: 'roi-properties',
  }))
}

export async function getHomeBrandedResidences(): Promise<BrandedResidenceItem[]> {
  const wpProperties = await getAllWordPressProperties('branded-residences')
  return wpProperties.map((p) => ({
    id: p.id,
    title: p.title,
    location: p.location || 'Jaipur, India',
    badge: p.investment ? (p.investment.toUpperCase().includes('MIN') ? p.investment : `${p.investment} MIN.`) : '₹ 70 LACS MIN.',
    image: p.image,
    units: p.units || '8+',
    yieldStrategy: p.roi ? `${p.roi} Assured ROI` : 'SLB-Leased',
    slug: p.slug,
  }))
}