export interface HeroSlide {
  id: string
  title: string
  subtitle: string
  ctaText: string
  ctaLink: string
  bgLeft: string
  bgRight: string
  bgLeftAlt: string
  bgRightAlt: string
}

export const heroSlidesData: HeroSlide[] = [
  {
    id: 'slide-1',
    title: 'RESIDENCE',
    subtitle: 'Introducing a New Way to Co-Own Luxury Properties',
    ctaText: 'Explore Projects',
    ctaLink: '#projects',
    bgLeft: '/assets/hero_resort.png',
    bgRight: '/assets/wordpress_media/elegant-music-lounge-with-comfortable-seating.webp',
    bgLeftAlt: 'Premium Resort Asset',
    bgRightAlt: 'Luxury Lounge Lifestyle',
  },
  {
    id: 'slide-2',
    title: 'YIELD',
    subtitle: 'Earn Assured High-Yield Passive Rental Income',
    ctaText: 'The Concept',
    ctaLink: '#concept',
    bgLeft: '/assets/wordpress_media/Turbun_Group_Resort_Reception_View_08.jpg.jpg',
    bgRight: '/assets/wordpress_media/HNIs-Are-Shifting-Toward.jpg',
    bgLeftAlt: 'Boutique Hotel Lobby Asset',
    bgRightAlt: 'HNI Resort Lifestyle',
  },
  {
    id: 'slide-3',
    title: 'ESTATE',
    subtitle: 'FEMA-Compliant Structured Co-Ownership for NRIs',
    ctaText: 'Calculate Yield',
    ctaLink: '#calculator',
    bgLeft: '/assets/wordpress_media/arayvilla-scaled-1.webp',
    bgRight: '/assets/wordpress_media/mansion_g5c9re.webp',
    bgLeftAlt: 'Aryaville Resort Asset',
    bgRightAlt: 'Waterfront Mansion Life',
  },
]

export interface TopStatItem {
  num: string
  label: string
  icon: 'roi' | 'investment' | 'managed'
}

export const topStatsData: TopStatItem[] = [
  {
    num: '6-15%',
    label: 'AVERAGE ANNUAL ROI',
    icon: 'roi',
  },
  {
    num: '30Lakh+',
    label: 'STARTING INVESTMENT',
    icon: 'investment',
  },
  {
    num: '100%',
    label: 'END-TO-END MANAGED',
    icon: 'managed',
  },
]

export interface ConceptPillar {
  num: string
  title: string
  description: string
}

export const conceptPillarsData: ConceptPillar[] = [
  {
    num: '01',
    title: 'Verified ROI',
    description:
      'Every property is evaluated for real, data-backed returns, ensuring complete transparency.',
  },
  {
    num: '02',
    title: 'Structured Model',
    description:
      'All investments structured under Sale & Leaseback (SLB) agreements for predictable payouts.',
  },
  {
    num: '03',
    title: 'Developer-Managed',
    description:
      'Post-investment management is fully handled by developer partners for a passive experience.',
  },
  {
    num: '04',
    title: 'NRI Friendly',
    description:
      'FEMA-compliant, repatriation-ready investments with dedicated NRI advisory support desks.',
  },
]

export interface PropertyCarouselItem {
  id: string
  title: string
  price: string
  image: string
  slug: string
}

export const propertiesCarouselData: PropertyCarouselItem[] = [
  {
    id: 'card-aryaville',
    title: 'Aryaville',
    price: 'Starting from ₹ 2.75 Cr',
    image: '/assets/wordpress_media/arayvilla-scaled-1.webp',
    slug: 'aryaville',
  },
  {
    id: 'card-greenz',
    title: 'Greenz by Danube',
    price: 'Starting from AED 3.5 Million',
    image: '/assets/wordpress_media/Backyard-Landscaping-Ideas-Landscape-Art.webp',
    slug: 'greenz-by-danube',
  },
  {
    id: 'card-turban',
    title: 'Turban Resort',
    price: 'Starting from ₹ 1.50 Cr',
    image: '/assets/wordpress_media/Turbun_Group_Resort_Reception_View_08.jpg.jpg',
    slug: 'turban-resort',
  },
  {
    id: 'card-london-street',
    title: 'London Street',
    price: 'Starting from ₹ 1.00 Cr',
    image: '/assets/wordpress_media/Backyard-Landscaping-Ideas-Landscape-Art.webp',
    slug: 'london-street',
  },
  {
    id: 'card-turban-chandwaji',
    title: 'Turban Resort Chandwaji',
    price: 'Starting from ₹ 80 Lacs',
    image: '/assets/wordpress_media/Turbun_Group_Resort_Reception_View_10.jpg.jpg',
    slug: 'turban-resort-chandwaji',
  },
]

export interface BrandedResidenceItem {
  id: string
  title: string
  location: string
  badge: string
  image: string
  units: string
  yieldStrategy: string
  slug: string
}

export const brandedResidencesData: BrandedResidenceItem[] = [
  {
    id: 'branded-skyline',
    title: 'Skyline Arcadia',
    location: 'JAIPUR, INDIA · NEAR PATRAKAR COLONY',
    badge: '₹ 70 LACS MIN.',
    image: '/assets/wordpress_media/Project-Photo-9-Skyline-Arcadia-Jaipur-5442983_2000_1226.jpg',
    units: '8+',
    yieldStrategy: 'SLB-Leased',
    slug: 'skyline-arcadia',
  },
  {
    id: 'branded-greenz',
    title: 'Greenz by Danube',
    location: 'DUBAI, UAE · PRIME LOCATION',
    badge: 'AED 3.5 M MIN.',
    image: '/assets/wordpress_media/Backyard-Landscaping-Ideas-Landscape-Art.webp',
    units: '12+',
    yieldStrategy: 'Assured ROI',
    slug: 'greenz-by-danube',
  },
  {
    id: 'branded-alhambra',
    title: 'Alhambra Villa',
    location: 'MARRAKECH, MOROCCO · EXCLUSIVE RESORT',
    badge: '€ 1.20 M MIN.',
    image: '/assets/wordpress_media/elegant-music-lounge-with-comfortable-seating.webp',
    units: '6+',
    yieldStrategy: 'High Yield',
    slug: 'alhambra-villa',
  },
  {
    id: 'branded-marina',
    title: 'Marina View Residences',
    location: 'SINGAPORE · WATERFRONT LUXURY',
    badge: 'SGD 2.80 M MIN.',
    image: '/assets/wordpress_media/mansion_g5c9re.webp',
    units: '10+',
    yieldStrategy: 'SLB Guaranteed',
    slug: 'marina-view-residences',
  },
]

export interface InvestmentTier {
  id: string
  tag: string
  title: string
  startingSize: string
  assuredYield: string
  isRecommended?: boolean
  features: string[]
}

export const investmentTiersData: InvestmentTier[] = [
  {
    id: 'tier-1',
    tag: 'Tier 01 · Resort Suite',
    title: 'Resort Share',
    startingSize: '₹ 30 Lakhs',
    assuredYield: '8.6% p.a.',
    isRecommended: false,
    features: [
      'Co-own premium boutique holiday resorts',
      'Sale & Leaseback model with verified payouts',
      'Fully developer-managed operations',
    ],
  },
  {
    id: 'tier-2',
    tag: 'Tier 02 · Branded Estate',
    title: 'Branded Suite',
    startingSize: '₹ 50 Lakhs',
    assuredYield: '9.5% p.a.',
    isRecommended: true,
    features: [
      'Co-own five-star hospitality suite keys',
      'Higher ROI yield with capital growth potential',
      'Complimentary room-nights utility usage',
    ],
  },
  {
    id: 'tier-3',
    tag: 'Tier 03 · Luxury Villa',
    title: 'Waterfront Villa',
    startingSize: '₹ 1.2 Crore',
    assuredYield: '11.0% p.a.',
    isRecommended: false,
    features: [
      'Co-own ultra-luxury estate waterfront villas',
      'Highest yield tier with custom repatriation setup',
      'Dedicated premium NRI concierge desk support',
    ],
  },
]

export interface TimelineStep {
  num: string
  title: string
  description: string
}

export const timelineStepsData: TimelineStep[] = [
  {
    num: '01',
    title: 'Discover Opportunities',
    description:
      'Explore curated investment-ready properties with clear insights on ROI, lease terms, and investment potential.',
  },
  {
    num: '02',
    title: 'Evaluate Returns',
    description:
      'Review detailed information including: Assured ROI (SLB-based), Lease structure, Property fundamentals and make decisions backed by real data, not assumptions.',
  },
  {
    num: '03',
    title: 'Invest with Confidence',
    description:
      'Our team guides you through Property selection, Documentation and Transaction process; ensuring a smooth and transparent experience.',
  },
  {
    num: '04',
    title: 'Earn Assured Returns',
    description:
      'Start receiving pre-defined returns under SLB agreements, while the builder manages operations.',
  },
]

export interface TestimonialItem {
  id: string
  quote: string
  author: string
  info: string
}

export const testimonialsData: TestimonialItem[] = [
  {
    id: 't-1',
    quote:
      'The rental yield has been 8.6% — better than promised. More importantly, I haven’t had to deal with a single tenant issue, maintenance call, or tax headache in two years. Their team handles everything.',
    author: 'Arjun Kapoor',
    info: 'Toronto, Canada · Invested ₹ 3.5 Cr',
  },
  {
    id: 't-2',
    quote:
      'I bought a unit in Hyderabad from Income Estate and my experience has been very smooth. From the documentation to the customer support, everything was top-notch. Highly recommend them for anyone looking for hassle-free real estate returns.',
    author: 'Rajesh Srinivasan',
    info: 'VP Engineering, Tech Corp · Invested ₹ 45 Lakhs',
  },
  {
    id: 't-3',
    quote:
      'As an NRI, finding trusted real estate management is difficult. Income Estate has solved that. The monthly payouts are regular, and the dashboard provides complete clarity on my fractional holdings.',
    author: 'Priya Sharma',
    info: 'London, UK · Invested ₹ 1.2 Cr',
  },
]

export interface FaqItem {
  id: string
  question: string
  answer: string
  isOpenDefault?: boolean
}

export const faqData: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'What is Income Estate?',
    answer:
      'Income Estate is a premium real estate investment platform that allows you to buy fractional shares of high-yield properties, starting from a low ticket size, and earn monthly rental returns along with capital appreciation.',
  },
  {
    id: 'faq-2',
    question: 'How is rental income calculated and distributed?',
    answer:
      "Rental income is collected from property managers/operators, pooled, and distributed proportionally to investors' bank accounts monthly based on their ownership share.",
    isOpenDefault: true,
  },
  {
    id: 'faq-3',
    question: 'What is the minimum investment amount?',
    answer:
      'The minimum investment amount varies by property but typically starts from ₹ 10 Lakhs to ₹ 15 Lakhs for prime resort and commercial projects.',
  },
  {
    id: 'faq-4',
    question: 'How do I track my investments?',
    answer:
      'You will get access to an investor dashboard where you can see monthly payouts, property documents, performance reports, and appreciation updates in real-time.',
  },
  {
    id: 'faq-5',
    question: 'Do you guarantee rental returns?',
    answer:
      'While returns are backed by long-term lease agreements with reputable operators, we provide detailed historical returns and projected yield bands rather than absolute guarantees, as per market standards.',
  },
  {
    id: 'faq-6',
    question: 'Is there any lock-in period for my investment?',
    answer:
      'Typically, there is a lock-in period of 1 to 2 years to ensure stability, after which you can list your fractional share on our secondary marketplace or opt for exit options.',
  },
  {
    id: 'faq-7',
    question: 'What happens if the property is vacant?',
    answer:
      'Our projects are leased to professional operators under minimum guarantee models or pooled rental agreements, which significantly reduces individual vacancy risk by sharing returns across all units.',
  },
  {
    id: 'faq-8',
    question: 'How do I sell or exit my investment?',
    answer:
      'You can exit by listing your share on our secondary marketplace, selling it back to the platform during pre-defined exit windows, or participating in a complete property sale when investors vote to exit.',
  },
]


