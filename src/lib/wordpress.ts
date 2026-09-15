import { BlogPostItem, blogsListingData, getBlogBySlug } from '@/data/blogs-data'
import { NewsPostItem, newsListingData, getNewsBySlug } from '@/data/news-data'
import { PropertyListingItem, propertiesListingData, brandedResidencesListingData } from '@/data/properties-data'
import {
  PropertyCarouselItem,
  BrandedResidenceItem,
  HomePageDynamicData,
  heroSlidesData,
  topStatsData,
  conceptPillarsData,
  timelineStepsData,
  testimonialsData,
  faqData,
} from '@/data/home-data'
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
  amenities?: Array<{ name?: string; iconType?: string }>
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
  paymentPlan?: Array<{ milestone?: string; timeline?: string; percent?: string; amount?: string; isHighlight?: boolean }>
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

export const GET_ALL_NEWS_ITEMS_QUERY = `
  query GetAllNewsItems {
    newsItems(first: 100, where: { orderby: { field: DATE, order: DESC } }) {
      nodes {
        title
        slug
        excerpt
        date
        content
        categories: newsCategories {
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

export const GET_NEWS_ITEM_BY_SLUG_QUERY = `
  query GetNewsItemBySlug($slug: ID!) {
    newsItem(id: $slug, idType: SLUG) {
      title
      slug
      excerpt
      date
      content
      categories: newsCategories {
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
`

export interface WPNewsItemsResponse {
  newsItems?: {
    nodes?: WPBlogPostNode[]
  }
}

export interface WPNewsItemBySlugResponse {
  newsItem?: WPBlogPostNode | null
}

export async function getAllLiveNewsPosts(): Promise<WPBlogPostNode[]> {
  try {
    // 1. First try querying WPGraphQL for Custom Post Type "newsItems"
    const newsData = await fetchGraphQL<WPNewsItemsResponse>(GET_ALL_NEWS_ITEMS_QUERY)
    const newsNodes = newsData?.newsItems?.nodes || []
    if (newsNodes.length > 0) {
      return newsNodes.filter((item) => item.slug)
    }

    // 2. Fallback to local structured news dataset if WP CPT has no posts or is pending
    return newsListingData.map((news) => ({
      title: news.title,
      slug: news.slug,
      excerpt: news.excerpt,
      date: news.date,
      content: news.contentHtml,
      categories: {
        nodes: [{ name: news.category, slug: news.category.toLowerCase().replace(/\s+/g, '-') }],
      },
      featuredImage: {
        node: {
          sourceUrl: news.image,
          altText: news.title,
        },
      },
    }))
  } catch (error) {
    console.error('Error fetching live WordPress news items:', error)
    return newsListingData.map((news) => ({
      title: news.title,
      slug: news.slug,
      excerpt: news.excerpt,
      date: news.date,
      content: news.contentHtml,
      categories: {
        nodes: [{ name: news.category, slug: news.category.toLowerCase().replace(/\s+/g, '-') }],
      },
      featuredImage: {
        node: {
          sourceUrl: news.image,
          altText: news.title,
        },
      },
    }))
  }
}

export async function getLiveNewsPostBySlug(slug: string): Promise<WPBlogPostNode | null> {
  if (!slug || slug.toLowerCase() === 'hello-world') return null

  try {
    // 1. Try fetching from WPGraphQL newsItem by slug
    const data = await fetchGraphQL<WPNewsItemBySlugResponse>(GET_NEWS_ITEM_BY_SLUG_QUERY, { slug })
    if (data?.newsItem) return data.newsItem

    // 2. Fallback to local news dataset
    const localNews = getNewsBySlug(slug)
    if (localNews) {
      return {
        title: localNews.title,
        slug: localNews.slug,
        excerpt: localNews.excerpt,
        date: localNews.date,
        content: localNews.contentHtml,
        categories: {
          nodes: [{ name: localNews.category, slug: localNews.category.toLowerCase().replace(/\s+/g, '-') }],
        },
        featuredImage: {
          node: {
            sourceUrl: localNews.image,
            altText: localNews.title,
          },
        },
      }
    }
    return null
  } catch (error) {
    console.error(`Error fetching WordPress news item with slug "${slug}":`, error)
    const localNews = getNewsBySlug(slug)
    if (localNews) {
      return {
        title: localNews.title,
        slug: localNews.slug,
        excerpt: localNews.excerpt,
        date: localNews.date,
        content: localNews.contentHtml,
        categories: {
          nodes: [{ name: localNews.category, slug: localNews.category.toLowerCase().replace(/\s+/g, '-') }],
        },
        featuredImage: {
          node: {
            sourceUrl: localNews.image,
            altText: localNews.title,
          },
        },
      }
    }
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
        locationDesc
        mapEmbedUrl
        paymentPlan {
          milestone
          timeline
          percent
          amount
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
  const isLiveWP = Boolean(page || details)
  const fallbackDetail = getPropertyDetailBySlug(node.slug) || propertiesDetailData['skyline-arcadia']
  const galleryNodes = details?.galleryImages?.nodes || []

  const wpTitle = node.title
  const rawTitleAccent = page?.titleAccent ?? (isLiveWP ? '' : fallbackDetail.titleAccent ?? '')
  const titleAlreadyContainsAccent =
    rawTitleAccent && wpTitle.toLowerCase().includes(rawTitleAccent.toLowerCase())

  const pageGallery = page?.gallery
  const galleryItems =
    pageGallery && pageGallery.length > 0
      ? pageGallery.map((g, idx) => ({
          image: g.image?.node?.sourceUrl || '',
          label: g.label || `Gallery Image ${idx + 1}`,
          gridClass: g.gridClass || `pd2-gi-${(idx % 6) + 1}`,
        })).filter((item) => Boolean(item.image))
      : galleryNodes.length > 0
      ? galleryNodes.map((img, idx) => ({
          image: img.sourceUrl || '',
          label: img.altText || `Gallery Image ${idx + 1}`,
          gridClass: `pd2-gi-${(idx % 6) + 1}`,
        })).filter((item) => Boolean(item.image))
      : isLiveWP
      ? []
      : fallbackDetail.gallery

  const heroImg =
    page?.heroImage?.node?.sourceUrl ||
    node.featuredImage?.node?.sourceUrl ||
    galleryNodes[0]?.sourceUrl ||
    (isLiveWP ? '' : fallbackDetail.heroImage)

  const mainImg = page?.mainImage?.node?.sourceUrl || galleryNodes[0]?.sourceUrl || (isLiveWP ? '' : fallbackDetail.mainImage)
  const thumbImg = page?.thumbImage?.node?.sourceUrl || galleryNodes[1]?.sourceUrl || (isLiveWP ? '' : fallbackDetail.thumbImage)
  const roiFrontImg = page?.roiFrontImage?.node?.sourceUrl || (isLiveWP ? '' : fallbackDetail.roiFrontImage)
  const roiBackImg = page?.roiBackImage?.node?.sourceUrl || (isLiveWP ? '' : fallbackDetail.roiBackImage)

  const factsItems =
    page?.facts && page.facts.length > 0
      ? page.facts.map((f) => ({ val: f.val || '', lbl: f.lbl || '' })).filter((f) => Boolean(f.val || f.lbl))
      : isLiveWP
      ? []
      : fallbackDetail.facts

  const roiMetricsItems =
    page?.roiMetrics && page.roiMetrics.length > 0
      ? page.roiMetrics.map((m) => ({ label: m.label || '', val: m.val || '', isGold: Boolean(m.isGold) }))
      : isLiveWP
      ? []
      : fallbackDetail.roiMetrics

  const tenantsItems =
    page?.tenants && page.tenants.length > 0
      ? page.tenants.map((t) => ({ name: t.name || '', detail: t.detail || '' }))
      : isLiveWP
      ? []
      : fallbackDetail.tenants

  const amenitiesItems =
    page?.amenities && page.amenities.length > 0
      ? page.amenities.map((a) => ({ name: a.name || '', iconType: a.iconType || a.name || 'lease' })).filter((a) => Boolean(a.name))
      : isLiveWP
      ? []
      : fallbackDetail.amenities

  const nearbyItems =
    page?.nearby && page.nearby.length > 0
      ? page.nearby.map((n) => ({ name: n.name || '', dist: n.dist || '' })).filter((n) => Boolean(n.name || n.dist))
      : isLiveWP
      ? []
      : fallbackDetail.nearby

  const paymentPlanItems =
    page?.paymentPlan && page.paymentPlan.length > 0
      ? page.paymentPlan.map((p) => ({
          milestone: p.milestone || '',
          timeline: p.timeline || '',
          percent: p.percent || '',
          amount: p.amount || '',
          isHighlight: Boolean(p.isHighlight),
        })).filter((p) => Boolean(p.milestone || p.timeline || p.percent || p.amount))
      : isLiveWP
      ? []
      : fallbackDetail.paymentPlan

  const constructionStagesItems =
    page?.constructionStages && page.constructionStages.length > 0
      ? page.constructionStages.map((cs) => ({
          image: cs.image?.node?.sourceUrl || '',
          overlay: cs.overlay || '',
        })).filter((cs) => Boolean(cs.image))
      : isLiveWP
      ? []
      : fallbackDetail.constructionStages

  const faqsItems =
    page?.faqs && page.faqs.length > 0
      ? page.faqs.map((faq) => ({ question: faq.question || '', answer: faq.answer || '' })).filter((f) => Boolean(f.question || f.answer))
      : isLiveWP
      ? []
      : fallbackDetail.faqs

  const unitConfigurationsItems =
    page?.unitConfigurations && page.unitConfigurations.length > 0
      ? page.unitConfigurations.map((u) => ({
          type: u.type || '',
          size: u.size || '',
          price: u.price || '',
          paymentPlan: u.paymentPlan || '',
        })).filter((u) => Boolean(u.type || u.size || u.price))
      : isLiveWP
      ? []
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
        })).filter((v) => Boolean(v.videoUrl || v.title))
      : isLiveWP
      ? []
      : fallbackDetail.videos

  const overviewFullStoryItems =
    page?.overviewFullStory && page.overviewFullStory.length > 0
      ? page.overviewFullStory.map((s) => s.paragraph || '').filter(Boolean)
      : isLiveWP
      ? []
      : fallbackDetail.overviewFullStory

  const overviewHighlightsItems =
    page?.overviewHighlights && page.overviewHighlights.length > 0
      ? page.overviewHighlights.map((h) => h.highlight || '').filter(Boolean)
      : isLiveWP
      ? []
      : fallbackDetail.overviewHighlights

  const projectHighlightsItems =
    page?.projectHighlights && page.projectHighlights.length > 0
      ? page.projectHighlights.map((h) => h.highlight || '').filter(Boolean)
      : isLiveWP
      ? []
      : fallbackDetail.projectHighlights

  const brochureUrl =
    page?.brochureFile?.node?.mediaItemUrl ||
    page?.brochureFile?.node?.sourceUrl ||
    page?.brochureUrl ||
    (isLiveWP ? '' : fallbackDetail.brochureUrl)

  const defaultBase = isLiveWP ? {} : fallbackDetail

  return {
    ...defaultBase,
    id: node.databaseId ? String(node.databaseId) : node.id,
    slug: node.slug,
    title: wpTitle,
    titleAccent: titleAlreadyContainsAccent ? '' : rawTitleAccent,
    heroLabel: page?.heroLabel ?? (isLiveWP ? '' : fallbackDetail.heroLabel),
    propertyType: page?.propertyType ?? (isLiveWP ? '' : fallbackDetail.propertyType),
    possession: page?.possession ?? (isLiveWP ? '' : fallbackDetail.possession),
    projectScope: page?.projectScope ?? (isLiveWP ? '' : fallbackDetail.projectScope),
    sizeArea: page?.sizeArea ?? (isLiveWP ? '' : fallbackDetail.sizeArea),
    location: details?.location ?? (isLiveWP ? '' : fallbackDetail.location),
    heroImage: heroImg,
    mainImage: mainImg,
    thumbImage: thumbImg,
    roiFrontImage: roiFrontImg,
    roiBackImage: roiBackImg,
    brochureUrl,
    priceStarting: page?.priceStarting || details?.priceDisplay || (isLiveWP ? '' : fallbackDetail.priceStarting),
    rentalYield: page?.rentalYield || details?.annualRoi || (isLiveWP ? '' : fallbackDetail.rentalYield),
    targetIrr: page?.targetIrr || (isLiveWP ? '' : fallbackDetail.targetIrr),
    overviewTag: page?.overviewTag || (isLiveWP ? '' : fallbackDetail.overviewTag),
    overviewHeading: page?.overviewHeading || (isLiveWP ? '' : fallbackDetail.overviewHeading),
    overviewHeadingAccent: page?.overviewHeadingAccent || (isLiveWP ? '' : fallbackDetail.overviewHeadingAccent),
    overviewText1: page?.overviewText1 || (isLiveWP ? '' : fallbackDetail.overviewText1),
    overviewText2: page?.overviewText2 || (isLiveWP ? '' : fallbackDetail.overviewText2),
    overviewFullStory: overviewFullStoryItems,
    overviewHighlights: overviewHighlightsItems,
    highlightsIntro: page?.highlightsIntro || (isLiveWP ? '' : fallbackDetail.highlightsIntro),
    projectHighlights: projectHighlightsItems,
    locationDesc: page?.locationDesc || (isLiveWP ? '' : fallbackDetail.locationDesc),
    mapEmbedUrl: page?.mapEmbedUrl || (isLiveWP ? '' : fallbackDetail.mapEmbedUrl),
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
    similarProperties: fallbackDetail.similarProperties || [],
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

// ----------------------------------------------------
// WORDPRESS PAGE QUERIES & HELPERS
// ----------------------------------------------------

export interface WPPageNode {
  id: string
  databaseId?: number
  title: string
  slug: string
  content?: string
  date?: string
  featuredImage?: {
    node?: {
      sourceUrl?: string
      altText?: string
    }
  }
  seo?: WPSEOData
}

export interface WPPageBySlugResponse {
  page?: WPPageNode | null
}

export const GET_WP_PAGE_BY_SLUG_QUERY = `
  query GetWPPageBySlug($id: ID!) {
    page(id: $id, idType: URI) {
      id
      databaseId
      title
      slug
      content
      date
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

export async function getWordPressPageBySlug(slug: string): Promise<WPPageNode | null> {
  try {
    const data = await fetchGraphQL<WPPageBySlugResponse>(GET_WP_PAGE_BY_SLUG_QUERY, { id: slug })
    if (data?.page) {
      return data.page
    }
  } catch (err) {
    console.warn(`WPGraphQL page fetch failed for slug "${slug}":`, err)
  }
  return null
}

export interface WPHomePageFields {
  heroSlides?: Array<{
    title?: string
    subtitle?: string
    ctaText?: string
    ctaLink?: string
    bgLeft?: string
    bgRight?: string
  }>
  topStats?: Array<{
    num?: string
    label?: string
    icon?: 'roi' | 'investment' | 'managed'
  }>
  conceptPillars?: Array<{
    num?: string
    title?: string
    description?: string
  }>
  processSteps?: Array<{
    num?: string
    title?: string
    description?: string
  }>
  testimonials?: Array<{
    quote?: string
    author?: string
    info?: string
  }>
  faqs?: Array<{
    question?: string
    answer?: string
  }>
}

export interface WPHomePageNode extends WPPageNode {
  homePage?: WPHomePageFields
}

export interface WPHomePageResponse {
  page?: WPHomePageNode | null
}

export const GET_HOME_PAGE_DATA_QUERY = `
  query GetHomePageData {
    page(id: "home", idType: URI) {
      id
      title
      slug
      homePage {
        heroSlides {
          title
          subtitle
          ctaText
          ctaLink
          bgLeft
          bgRight
        }
        topStats {
          num
          label
          icon
        }
        conceptPillars {
          num
          title
          description
        }
        processSteps {
          num
          title
          description
        }
        testimonials {
          quote
          author
          info
        }
        faqs {
          question
          answer
        }
      }
    }
  }
`

export async function getHomePageDynamicData(): Promise<HomePageDynamicData> {
  try {
    const data = await fetchGraphQL<WPHomePageResponse>(GET_HOME_PAGE_DATA_QUERY)
    const homeFields = data?.page?.homePage

    return {
      heroSlides:
        homeFields?.heroSlides && homeFields.heroSlides.length > 0
          ? homeFields.heroSlides.map((s, idx) => ({
              id: `slide-${idx + 1}`,
              title: s.title || 'RESIDENCE',
              subtitle: s.subtitle || '',
              ctaText: s.ctaText || 'Explore Projects',
              ctaLink: s.ctaLink || '#projects',
              bgLeft: s.bgLeft || '/assets/hero_resort.png',
              bgRight: s.bgRight || '/assets/wordpress_media/mansion_g5c9re.webp',
              bgLeftAlt: s.title || 'Resort Asset',
              bgRightAlt: 'Luxury Lifestyle',
            }))
          : heroSlidesData,
      topStats:
        homeFields?.topStats && homeFields.topStats.length > 0
          ? homeFields.topStats.map((st) => ({
              num: st.num || '',
              label: st.label || '',
              icon: (st.icon || 'roi') as 'roi' | 'investment' | 'managed',
            }))
          : topStatsData,
      conceptPillars:
        homeFields?.conceptPillars && homeFields.conceptPillars.length > 0
          ? homeFields.conceptPillars.map((cp) => ({
              num: cp.num || '01',
              title: cp.title || '',
              description: cp.description || '',
            }))
          : conceptPillarsData,
      processSteps:
        homeFields?.processSteps && homeFields.processSteps.length > 0
          ? homeFields.processSteps.map((ps) => ({
              num: ps.num || '01',
              title: ps.title || '',
              description: ps.description || '',
            }))
          : timelineStepsData,
      testimonials:
        homeFields?.testimonials && homeFields.testimonials.length > 0
          ? homeFields.testimonials.map((t, tIdx) => ({
              id: `t-${tIdx + 1}`,
              quote: t.quote || '',
              author: t.author || '',
              info: t.info || '',
            }))
          : testimonialsData,
      faqs:
        homeFields?.faqs && homeFields.faqs.length > 0
          ? homeFields.faqs.map((f, fIdx) => ({
              id: `faq-${fIdx + 1}`,
              question: f.question || '',
              answer: f.answer || '',
            }))
          : faqData,
    }
  } catch (error) {
    console.warn('WPGraphQL homePage fetch failed, using fallback home data:', error)
    return {
      heroSlides: heroSlidesData,
      topStats: topStatsData,
      conceptPillars: conceptPillarsData,
      processSteps: timelineStepsData,
      testimonials: testimonialsData,
      faqs: faqData,
    }
  }
}

/* ==========================================================================
   ABOUT US PAGE DYNAMIC DATA
   ========================================================================== */
export interface AboutPageDynamicData {
  storyTitle?: string
  storySubtitle?: string
  storyParagraphs?: string[]
  founders?: Array<{
    name: string
    photo: string
    bio: string
    quote?: string
  }>
  pillars?: Array<{
    num: string
    title: string
    description: string
  }>
}

export const GET_ABOUT_PAGE_DATA_QUERY = `
  query GetAboutPageData {
    page(id: "about", idType: URI) {
      aboutUsPage {
        storyTitle
        storySubtitle
        storyParagraphs {
          text
        }
        founders {
          name
          photo
          bio
          quote
        }
        pillars {
          num
          title
          description
        }
      }
    }
  }
`

export async function getAboutPageDynamicData(): Promise<AboutPageDynamicData> {
  try {
    const data = await fetchGraphQL<{ page?: { aboutUsPage?: any } }>(GET_ABOUT_PAGE_DATA_QUERY)
    const aboutFields = data?.page?.aboutUsPage

    return {
      storyTitle: aboutFields?.storyTitle || 'Our Story',
      storySubtitle:
        aboutFields?.storySubtitle ||
        'Every strong venture begins with a gap in the market and more importantly, the experience to recognize it.',
      storyParagraphs:
        aboutFields?.storyParagraphs && aboutFields.storyParagraphs.length > 0
          ? aboutFields.storyParagraphs.map((p: any) => p.text).filter(Boolean)
          : undefined,
      founders:
        aboutFields?.founders && aboutFields.founders.length > 0
          ? aboutFields.founders
          : undefined,
      pillars:
        aboutFields?.pillars && aboutFields.pillars.length > 0
          ? aboutFields.pillars
          : undefined,
    }
  } catch (error) {
    console.warn('WPGraphQL aboutUsPage fetch failed, using fallbacks:', error)
    return {}
  }
}

/* ==========================================================================
   HOW IT WORKS PAGE DYNAMIC DATA
   ========================================================================== */
export interface HowItWorksPageDynamicData {
  heroTitle?: string
  heroSubtitle?: string
  steps?: Array<{
    stepNum: string
    title: string
    description: string
    highlight?: string
  }>
}

export const GET_HOW_IT_WORKS_DATA_QUERY = `
  query GetHowItWorksPageData {
    page(id: "how-it-works", idType: URI) {
      howItWorksPage {
        heroTitle
        heroSubtitle
        steps {
          stepNum
          title
          description
          highlight
        }
      }
    }
  }
`

export async function getHowItWorksPageDynamicData(): Promise<HowItWorksPageDynamicData> {
  try {
    const data = await fetchGraphQL<{ page?: { howItWorksPage?: any } }>(GET_HOW_IT_WORKS_DATA_QUERY)
    const hiwFields = data?.page?.howItWorksPage

    return {
      heroTitle: hiwFields?.heroTitle || 'HOW IT WORKS',
      heroSubtitle: hiwFields?.heroSubtitle || undefined,
      steps: hiwFields?.steps && hiwFields.steps.length > 0 ? hiwFields.steps : undefined,
    }
  } catch (error) {
    console.warn('WPGraphQL howItWorksPage fetch failed, using fallbacks:', error)
    return {}
  }
}

/* ==========================================================================
   SERVICES PAGE DYNAMIC DATA
   ========================================================================== */
export interface ServiceItemData {
  title: string
  description: string
  features?: string[]
}

export interface ServicesPageDynamicData {
  heroTitle?: string
  heroSubtitle?: string
  investorServices?: ServiceItemData[]
  developerServices?: ServiceItemData[]
}

export const GET_SERVICES_PAGE_DATA_QUERY = `
  query GetServicesPageData {
    page(id: "services", idType: URI) {
      servicesPage {
        heroTitle
        heroSubtitle
        investorServices {
          title
          description
          features
        }
        developerServices {
          title
          description
          features
        }
      }
    }
  }
`

export async function getServicesPageDynamicData(): Promise<ServicesPageDynamicData> {
  try {
    const data = await fetchGraphQL<{ page?: { servicesPage?: any } }>(GET_SERVICES_PAGE_DATA_QUERY)
    const servFields = data?.page?.servicesPage

    return {
      heroTitle: servFields?.heroTitle || 'OUR SERVICES',
      heroSubtitle: servFields?.heroSubtitle || undefined,
      investorServices:
        servFields?.investorServices && servFields.investorServices.length > 0
          ? servFields.investorServices.map((s: any) => ({
              title: s.title || '',
              description: s.description || '',
              features: typeof s.features === 'string' ? s.features.split('\n').filter(Boolean) : [],
            }))
          : undefined,
      developerServices:
        servFields?.developerServices && servFields.developerServices.length > 0
          ? servFields.developerServices.map((s: any) => ({
              title: s.title || '',
              description: s.description || '',
              features: typeof s.features === 'string' ? s.features.split('\n').filter(Boolean) : [],
            }))
          : undefined,
    }
  } catch (error) {
    console.warn('WPGraphQL servicesPage fetch failed, using fallbacks:', error)
    return {}
  }
}

/* ==========================================================================
   CONTACT PAGE DYNAMIC DATA
   ========================================================================== */
export interface OfficeLocationData {
  city: string
  address: string
  phone: string
  email: string
}

export interface ContactPageDynamicData {
  heroTitle?: string
  heroSubtitle?: string
  offices?: OfficeLocationData[]
}

export const GET_CONTACT_PAGE_DATA_QUERY = `
  query GetContactPageData {
    page(id: "contact", idType: URI) {
      contactPage {
        heroTitle
        heroSubtitle
        offices {
          city
          address
          phone
          email
        }
      }
    }
  }
`

export async function getContactPageDynamicData(): Promise<ContactPageDynamicData> {
  try {
    const data = await fetchGraphQL<{ page?: { contactPage?: any } }>(GET_CONTACT_PAGE_DATA_QUERY)
    const contactFields = data?.page?.contactPage

    return {
      heroTitle: contactFields?.heroTitle || 'CONTACT US',
      heroSubtitle: contactFields?.heroSubtitle || undefined,
      offices:
        contactFields?.offices && contactFields.offices.length > 0 ? contactFields.offices : undefined,
    }
  } catch (error) {
    console.warn('WPGraphQL contactPage fetch failed, using fallbacks:', error)
    return {}
  }
}