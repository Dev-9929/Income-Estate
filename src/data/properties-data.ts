export interface PropertyListingItem {
  id: string
  title: string
  location: string
  investment: string
  units?: string
  roi?: string
  image: string
  slug: string
  category: string
}

export const propertiesListingData: PropertyListingItem[] = [
  {
    id: 'turban-resort-chandwaji',
    title: 'TURBAN RESORT CHANDWAJI',
    location: 'JAIPUR-DELHI ROAD',
    investment: '₹ 80 LACS.',
    image: '/assets/wordpress_media/Turbun_Group_Resort_Reception_View_08.jpg.jpg',
    slug: 'turban-resort-chandwaji',
    category: 'resort',
  },
  {
    id: 'london-street',
    title: 'LONDON STREET',
    location: 'CHANDWAJI, ARAVALI HILLS',
    investment: '₹ 1 CR.',
    units: '42+',
    image: '/assets/wordpress_media/Backyard-Landscaping-Ideas-Landscape-Art.webp',
    slug: 'london-street',
    category: 'resort',
  },
  {
    id: 'turban-group-resort',
    title: 'TURBAN GROUP RESORT',
    location: 'PUSHKAR',
    investment: '₹ 1.4 CR.',
    roi: '9.2%',
    image: '/assets/wordpress_media/Turbun_Group_Resort_Reception_View_10.jpg.jpg',
    slug: 'turban-group-resort',
    category: 'resort',
  },
  {
    id: 'aryaville',
    title: 'ARYAVILLE',
    location: 'DELHI ROAD',
    investment: '₹ 2.75 CR',
    roi: '7%',
    image: '/assets/wordpress_media/arayvilla-scaled-1.webp',
    slug: 'aryaville',
    category: 'resort',
  },
]

export interface PropertyFaqItem {
  id: string
  question: string
  answer: string
  bullets?: string[]
  isOpenDefault?: boolean
}

export const propertyPageFaqs: PropertyFaqItem[] = [
  {
    id: 'p-faq-1',
    question: 'Can I Sell Or Redeem My Property Shares At Any Time?',
    answer:
      'Yes, you can sell or redeem your property shares through our secondary marketplace, which provides liquidity for your fractional holdings, or during the pre-defined exit window organized by the asset manager. Additionally, we hold properties through a Special Purpose Vehicle (SPV) structure to ensure clean transfer of ownership.',
  },
  {
    id: 'p-faq-2',
    question: 'How Is ROI Calculated And Presented?',
    answer:
      'ROI is calculated based on the actual monthly rental income distributed to fractional owners, combined with the projected long-term capital appreciation of the property, verified by periodic third-party valuations.',
    bullets: ['High potential appreciation', 'Asset light models', 'Cash flow yield'],
    isOpenDefault: true,
  },
  {
    id: 'p-faq-3',
    question: 'Are These Properties Debt-Free Or Not?',
    answer:
      'Yes, all properties listed on Income Estate are 100% debt-free. We acquire the assets completely with equity from fractional investors, eliminating interest-rate risks or foreclosure hazards.',
  },
  {
    id: 'p-faq-4',
    question: 'Is There An Exit Option Available?',
    answer:
      'Yes, there is an exit option available. Every property has a pre-determined liquidity event or exit window (typically between year 3 to 5), allowing investors to vote on selling the entire asset to institutional buyers.',
  },
  {
    id: 'p-faq-5',
    question: 'How Do I Get Started?',
    answer:
      'To get started, simply browse our curated properties, select your preferred investment, complete your quick digital KYC, sign the co-ownership agreement, and transfer your funds to start earning yield immediately.',
  },
]

export const brandedResidencesListingData: PropertyListingItem[] = [
  {
    id: 'skyline-arcadia',
    title: 'SKYLINE ARCADIA',
    location: 'NEAR PATRAKAR COLONY',
    investment: '₹ 70 LACS.',
    units: '8+',
    image:
      '/assets/wordpress_media/Project-Photo-9-Skyline-Arcadia-Jaipur-5442983_2000_1226.jpg',
    slug: 'skyline-arcadia',
    category: 'branded',
  },
  {
    id: 'greenz-danube',
    title: 'GREENZ BY DANUBE',
    location: 'DUBAI, UAE',
    investment: 'AED 3.5 M',
    units: '12+',
    image: '/assets/wordpress_media/Backyard-Landscaping-Ideas-Landscape-Art.webp',
    slug: 'greenz-danube',
    category: 'branded',
  },
]

