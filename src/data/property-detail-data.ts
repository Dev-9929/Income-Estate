export interface PropertyFact {
  val: string
  lbl: string
}

export interface GalleryItem {
  image: string
  label: string
  gridClass: string
}

export interface RoiMetric {
  label: string
  val: string
  isGold?: boolean
}

export interface TenantInfo {
  name: string
  detail: string
}

export interface AmenityItem {
  name: string
  iconType: 'lease' | 'parking' | 'security' | 'view' | 'interior' | 'managed' | 'pool' | 'spa'
}

export interface NearbyLocation {
  name: string
  dist: string
}

export interface PaymentMilestone {
  milestone: string
  timeline: string
  percent: string
  isHighlight?: boolean
}

export interface ConstructionStage {
  image: string
  overlay: string
}

export interface PropertyDetailItem {
  id: string
  slug: string
  title: string
  titleAccent?: string
  heroLabel: string
  location: string
  heroImage: string
  priceStarting: string
  rentalYield: string
  targetIrr: string
  overviewTag: string
  overviewHeading: string
  overviewHeadingAccent: string
  overviewText1: string
  overviewText2: string
  mainImage: string
  thumbImage: string
  facts: PropertyFact[]
  gallery: GalleryItem[]
  roiMetrics: RoiMetric[]
  tenants: TenantInfo[]
  roiFrontImage: string
  roiBackImage: string
  amenities: AmenityItem[]
  locationDesc: string
  mapEmbedUrl: string
  nearby: NearbyLocation[]
  paymentPlan: PaymentMilestone[]
  constructionStages: ConstructionStage[]
  faqs: { question: string; answer: string }[]
  similarProperties: {
    slug: string
    title: string
    price: string
    image: string
  }[]
}

export const propertiesDetailData: Record<string, PropertyDetailItem> = {
  'skyline-arcadia': {
    id: 'skyline-arcadia',
    slug: 'skyline-arcadia',
    title: 'Skyline',
    titleAccent: 'Arcadia',
    heroLabel: 'Premium Commercial Investment',
    location: 'Near Patrakar Colony, Jaipur, Rajasthan',
    heroImage: '/assets/wordpress_media/Project-Photo-9-Skyline-Arcadia-Jaipur-5442983_2000_1226.jpg',
    priceStarting: '₹ 70 L',
    rentalYield: '9.0%',
    targetIrr: '12.0%',
    overviewTag: 'Project Overview',
    overviewHeading: 'A Commercial Landmark',
    overviewHeadingAccent: 'Built for Investors',
    overviewText1:
      'Strategically located in the heart of Jaipur, Skyline Arcadia is a thoughtfully planned mixed-use commercial destination that blends modern business infrastructure with hospitality and lifestyle-driven spaces. Designed for evolving urban investment needs, it delivers consistent returns from day one.',
    overviewText2:
      'The development features premium retail showrooms, coworking zones, and hospitality suites — all within a professionally managed ecosystem where investors receive passive, structured rental income without lifting a finger.',
    mainImage: '/assets/wordpress_media/Project-Photo-3-Skyline-Arcadia-Jaipur-5442983_2000_1217.jpg',
    thumbImage: '/assets/wordpress_media/Project-Photo-6-Skyline-Arcadia-Jaipur-5442983_868_1600.jpg',
    facts: [
      { val: 'Ready', lbl: 'Possession Status' },
      { val: '8+', lbl: 'Total Units Available' },
      { val: '1100', lbl: 'Plot Area (SqYd)' },
      { val: '5 Yr', lbl: 'Lease Guarantee' },
      { val: 'Office', lbl: 'Unit Type' },
    ],
    gallery: [
      {
        image: '/assets/wordpress_media/Project-Photo-2-Skyline-Arcadia-Jaipur-5442983_1067_1600.jpg',
        label: 'Grand Elevation & Facade',
        gridClass: 'pd2-gi-1',
      },
      {
        image: '/assets/wordpress_media/1767445680167-g1.jpg',
        label: 'Premium Retail Showroom',
        gridClass: 'pd2-gi-2',
      },
      {
        image: '/assets/wordpress_media/arayvilla-scaled-1.webp',
        label: 'Regenta Hotel Suite',
        gridClass: 'pd2-gi-3',
      },
      {
        image: '/assets/wordpress_media/Project-Photo-10-Skyline-Arcadia-Jaipur-5442983_1700_1600.jpg',
        label: 'Architectural Details',
        gridClass: 'pd2-gi-4',
      },
      {
        image: '/assets/wordpress_media/Project-Photo-5-Skyline-Arcadia-Jaipur-5442983_880_1600.jpg',
        label: 'Executive Office Floor',
        gridClass: 'pd2-gi-5',
      },
      {
        image: '/assets/wordpress_media/Floor-Plan-17-Skyline-Arcadia-Jaipur-5442983_1200_1600.jpg',
        label: 'Unit Floor Plan',
        gridClass: 'pd2-gi-6',
      },
    ],
    roiMetrics: [
      { label: 'Gross Rental Yield', val: '9.0%', isGold: true },
      { label: 'Target IRR (Yield + Appreciation)', val: '12.0%', isGold: true },
      { label: 'Guaranteed Lease Duration', val: '5 Years' },
      { label: 'Starting Investment Size', val: '₹ 70 Lacs' },
      { label: 'Management Model', val: '100% Hands-Free' },
    ],
    tenants: [
      { name: 'Regenta Hotels', detail: 'Floors 2–4 · 40 Hotel Rooms' },
      { name: 'Hobnob Coworks', detail: 'Floor 1 · Premium Coworking Hub' },
    ],
    roiFrontImage: '/assets/wordpress_media/Project-Photo-9-Skyline-Arcadia-Jaipur-5442983_2000_1226.jpg',
    roiBackImage: '/assets/wordpress_media/Location-Plan-11-Skyline-Arcadia-Jaipur-5442983_1735_1600.jpg',
    amenities: [
      { name: '5-Year Lease Guarantee', iconType: 'lease' },
      { name: 'Ample Basement Parking', iconType: 'parking' },
      { name: '24/7 Security & CCTV', iconType: 'security' },
      { name: 'Panoramic City View', iconType: 'view' },
      { name: 'Hotel-Grade Interiors', iconType: 'interior' },
      { name: 'Managed Operations', iconType: 'managed' },
    ],
    locationDesc:
      "Near Patrakar Colony, Jaipur — one of the city's fastest-growing commercial corridors with excellent road connectivity, dense residential catchment, and direct access to major transit nodes.",
    mapEmbedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3558.077977464132!2d75.7628173!3d26.8833987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db444b04f7ec1%3A0xa94f927cfa024e03!2sPatrakar%20Colony%2C%20Mansarovar%2C%20Jaipur!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
    nearby: [
      { name: 'Jaipur International Airport', dist: '12.5 KM · ~22 min drive' },
      { name: 'Jaipur Junction Railway Station', dist: '9 KM · ~18 min drive' },
      { name: 'Mansarovar Commercial Hub', dist: '1.5 KM · 4 min walk' },
      { name: 'Pink City Main Bazaar Area', dist: '8 KM · ~15 min drive' },
      { name: 'Patrakar Colony Metro Node', dist: 'Immediate vicinity' },
    ],
    paymentPlan: [
      { milestone: 'Booking Token', timeline: 'On Booking', percent: '10%', isHighlight: true },
      { milestone: '1st Installment', timeline: 'July 2024', percent: '10%' },
      { milestone: '2nd Installment', timeline: 'October 2024', percent: '10%' },
      { milestone: '3rd Installment', timeline: 'January 2025', percent: '10%' },
      { milestone: '4th Installment', timeline: 'April 2025', percent: '10%' },
      { milestone: '5th Installment', timeline: 'July 2025', percent: '10%' },
      { milestone: '6th Installment', timeline: 'October 2025', percent: '10%' },
      { milestone: '7th Installment', timeline: 'January 2026', percent: '10%' },
      { milestone: 'Final — On Registration', timeline: 'April 2026', percent: '20%', isHighlight: true },
    ],
    constructionStages: [
      {
        image: '/assets/wordpress_media/WhatsApp-Image-2026-06-08-at-4.12.17-PM.jpeg',
        overlay: 'Site — June 2026',
      },
      {
        image: '/assets/wordpress_media/WhatsApp-Image-2026-06-08-at-4.14.25-PM-1.jpeg',
        overlay: 'Structural Progress',
      },
      {
        image: '/assets/wordpress_media/WhatsApp-Image-2026-06-08-at-4.14.25-PM.jpeg',
        overlay: 'Facade Completion',
      },
      {
        image: '/assets/wordpress_media/stbq5oqq95hjjahdefvq.webp',
        overlay: 'Interior Finishing',
      },
    ],
    faqs: [
      {
        question: 'What is the rental yield structure?',
        answer:
          'Regenta Hotel operates floors 2-4 (40 rooms) and Hobnob Coworks operates Floor 1, distributing structured, steady rental payouts directly to co-owners every month under a 5-year leaseback model at ~9% gross yield.',
      },
      {
        question: 'Can NRIs invest in this property?',
        answer:
          'Yes. NRIs can invest through their NRE/NRO accounts under FEMA guidelines. Our dedicated NRI desk handles all documentation, repatriation processes, and cross-border tax compliance.',
      },
      {
        question: 'How is fractional ownership legally structured?',
        answer:
          "Each investor's fractional title is registered under a Special Purpose Vehicle (SPV) or directly in the land registry, ensuring full asset-backed legal security and clear exit rights.",
      },
      {
        question: 'Can I exit before the lease period ends?',
        answer:
          'Yes — after the short initial lock-in period, fractional shares can be transferred via our secondary marketplace or private sale. Full liquidity support is provided.',
      },
      {
        question: 'Who manages the day-to-day operations?',
        answer:
          'All property management, maintenance, tenant coordination, and rental collection is handled by our professional asset management partners — your investment is 100% hands-free.',
      },
    ],
    similarProperties: [
      {
        slug: 'turban-resort-chandwaji',
        title: 'Turban Group Resort',
        price: 'Starting From ₹ 80 LACS.',
        image: '/assets/wordpress_media/Turbun_Group_Resort_Reception_View_08.jpg.jpg',
      },
      {
        slug: 'aryaville',
        title: 'Aryaville Resort',
        price: 'Starting From ₹ 2.75 CR.',
        image: '/assets/wordpress_media/arayvilla-scaled-1.webp',
      },
      {
        slug: 'london-street',
        title: 'London Street',
        price: 'Starting From ₹ 1 CR.',
        image: '/assets/wordpress_media/Backyard-Landscaping-Ideas-Landscape-Art.webp',
      },
    ],
  },
  'turban-resort-chandwaji': {
    id: 'turban-resort-chandwaji',
    slug: 'turban-resort-chandwaji',
    title: 'Turban Resort',
    titleAccent: 'Chandwaji',
    heroLabel: 'Luxury Hospitality Fractional Asset',
    location: 'Jaipur-Delhi Highway, Rajasthan',
    heroImage: '/assets/wordpress_media/Turbun_Group_Resort_Reception_View_08.jpg.jpg',
    priceStarting: '₹ 80 L',
    rentalYield: '9.2%',
    targetIrr: '14.5%',
    overviewTag: 'Hospitality Co-Ownership',
    overviewHeading: 'A High-Yield Luxury Destination',
    overviewHeadingAccent: 'On Delhi-Jaipur Express Corridor',
    overviewText1:
      'Turban Resort Chandwaji is a bespoke destination resort nestled against the Aravali foothills on the busy Delhi-Jaipur highway, attracting weekend leisure getaways, corporate conferences, and luxury destination weddings.',
    overviewText2:
      'Backed by 15-year Sale & Leaseback agreements with guaranteed minimum returns and quarterly operational bonus distributions, investors enjoy consistent cash flows and complimentary owner stays.',
    mainImage: '/assets/wordpress_media/Turbun_Group_Resort_Reception_View_08.jpg.jpg',
    thumbImage: '/assets/wordpress_media/Turbun_Group_Resort_Reception_View_10.jpg.jpg',
    facts: [
      { val: 'Operational', lbl: 'Current Status' },
      { val: '40+', lbl: 'Resort Keys' },
      { val: '5 Acres', lbl: 'Estate Grounds' },
      { val: '15 Yr', lbl: 'SLB Leaseback' },
      { val: 'Hospitality', lbl: 'Asset Category' },
    ],
    gallery: [
      {
        image: '/assets/wordpress_media/Turbun_Group_Resort_Reception_View_08.jpg.jpg',
        label: 'Grand Lobby Reception',
        gridClass: 'pd2-gi-1',
      },
      {
        image: '/assets/wordpress_media/Turbun_Group_Resort_Reception_View_10.jpg.jpg',
        label: 'Presidential Villa Suite',
        gridClass: 'pd2-gi-2',
      },
      {
        image: '/assets/wordpress_media/arayvilla-scaled-1.webp',
        label: 'Courtyard Pool View',
        gridClass: 'pd2-gi-3',
      },
      {
        image: '/assets/wordpress_media/Backyard-Landscaping-Ideas-Landscape-Art.webp',
        label: 'Lush Landscaped Lawns',
        gridClass: 'pd2-gi-4',
      },
      {
        image: '/assets/wordpress_media/elegant-music-lounge-with-comfortable-seating.webp',
        label: 'Music & Banquet Lounge',
        gridClass: 'pd2-gi-5',
      },
      {
        image: '/assets/wordpress_media/HNIs-Are-Shifting-Toward.jpg',
        label: 'Fine Dining Restaurant',
        gridClass: 'pd2-gi-6',
      },
    ],
    roiMetrics: [
      { label: 'Gross Annual Rental Yield', val: '9.2%', isGold: true },
      { label: 'Target 5-Year IRR', val: '14.5%', isGold: true },
      { label: 'Operator Lease Duration', val: '15 Years' },
      { label: 'Minimum Investment Ticket', val: '₹ 80 Lacs' },
      { label: 'Free Owner Holiday Nights', val: '14 Days / Year' },
    ],
    tenants: [
      { name: 'Turban Hospitality Group', detail: '15-Year Master SLB Lease Contract' },
      { name: 'Amber Banquets & Lawns', detail: 'Destination Wedding Operations' },
    ],
    roiFrontImage: '/assets/wordpress_media/Turbun_Group_Resort_Reception_View_10.jpg.jpg',
    roiBackImage: '/assets/wordpress_media/Backyard-Landscaping-Ideas-Landscape-Art.webp',
    amenities: [
      { name: '15-Year Lease Guarantee', iconType: 'lease' },
      { name: 'Temperature Controlled Pool', iconType: 'pool' },
      { name: '24/7 Security & Concierge', iconType: 'security' },
      { name: 'Aravali Hill Scenic Views', iconType: 'view' },
      { name: 'Ayurvedic Spa & Wellness', iconType: 'spa' },
      { name: 'Fully Hands-Off Management', iconType: 'managed' },
    ],
    locationDesc:
      'Positioned along the Delhi-Jaipur National Highway corridor, within 35 minutes of Jaipur Airport and easily accessible to over 30 million NCR tourists seeking destination retreats.',
    mapEmbedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3558.077977464132!2d75.7628173!3d26.8833987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db444b04f7ec1%3A0xa94f927cfa024e03!2sPatrakar%20Colony%2C%20Mansarovar%2C%20Jaipur!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
    nearby: [
      { name: 'Delhi-Jaipur Expressway Toll', dist: '5 KM · 5 min drive' },
      { name: 'Kukas Industrial & Tech Hub', dist: '12 KM · 12 min drive' },
      { name: 'Amer Fort Tourism Heritage Zone', dist: '22 KM · 25 min drive' },
      { name: 'Jaipur International Airport', dist: '38 KM · 40 min drive' },
    ],
    paymentPlan: [
      { milestone: 'Initial Token Advance', timeline: 'Immediate', percent: '15%', isHighlight: true },
      { milestone: 'SPV Share Allotment', timeline: 'Within 30 Days', percent: '35%' },
      { milestone: 'SLB Execution & Registration', timeline: 'Within 60 Days', percent: '50%', isHighlight: true },
    ],
    constructionStages: [
      {
        image: '/assets/wordpress_media/Turbun_Group_Resort_Reception_View_08.jpg.jpg',
        overlay: 'Lobby Completed',
      },
      {
        image: '/assets/wordpress_media/Turbun_Group_Resort_Reception_View_10.jpg.jpg',
        overlay: 'Villas Fully Operational',
      },
      {
        image: '/assets/wordpress_media/Backyard-Landscaping-Ideas-Landscape-Art.webp',
        overlay: 'Landscaped Grounds Ready',
      },
      {
        image: '/assets/wordpress_media/arayvilla-scaled-1.webp',
        overlay: 'Guest Services Live',
      },
    ],
    faqs: [
      {
        question: 'How are rental payouts transferred?',
        answer:
          'Lease payouts are credited directly to each fractional owner’s registered bank account on the 5th of every calendar month, accompanied by detailed operational financial statements.',
      },
      {
        question: 'Can I spend my vacation in the resort?',
        answer:
          'Yes. As a co-owner, you receive up to 14 complimentary luxury stay nights per year with VIP concierge privileges for your family.',
      },
      {
        question: 'What is the exit horizon for this asset?',
        answer:
          'Investors can trade fractional shares on our secondary liquidity desk at any time after 12 months, or participate in the institutional buyout vote scheduled at year 5.',
      },
    ],
    similarProperties: [
      {
        slug: 'skyline-arcadia',
        title: 'Skyline Arcadia',
        price: 'Starting From ₹ 70 LACS.',
        image: '/assets/wordpress_media/Project-Photo-9-Skyline-Arcadia-Jaipur-5442983_2000_1226.jpg',
      },
      {
        slug: 'london-street',
        title: 'London Street',
        price: 'Starting From ₹ 1 CR.',
        image: '/assets/wordpress_media/Backyard-Landscaping-Ideas-Landscape-Art.webp',
      },
      {
        slug: 'aryaville',
        title: 'Aryaville Resort',
        price: 'Starting From ₹ 2.75 CR.',
        image: '/assets/wordpress_media/arayvilla-scaled-1.webp',
      },
    ],
  },
  'london-street': {
    id: 'london-street',
    slug: 'london-street',
    title: 'London',
    titleAccent: 'Street',
    heroLabel: 'European Themed Luxury Villas',
    location: 'Chandwaji, Aravali Hills, Rajasthan',
    heroImage: '/assets/wordpress_media/Backyard-Landscaping-Ideas-Landscape-Art.webp',
    priceStarting: '₹ 1 CR',
    rentalYield: '8.8%',
    targetIrr: '13.8%',
    overviewTag: 'Themed Luxury Villas',
    overviewHeading: 'British Architecture in',
    overviewHeadingAccent: 'The Heart of the Aravalis',
    overviewText1:
      'London Street is a themed luxury villa enclave designed with classic English cobblestone pathways, boutique clubhouses, and private heated plunge pools. Positioned for discerning luxury holidaymakers.',
    overviewText2:
      'Managed under an exclusive hospitality operator with guaranteed rental distribution, investors benefit from high wedding-season banquet rentals and steady weekend tourism yields.',
    mainImage: '/assets/wordpress_media/Backyard-Landscaping-Ideas-Landscape-Art.webp',
    thumbImage: '/assets/wordpress_media/mansion_g5c9re.webp',
    facts: [
      { val: 'Under Constr.', lbl: 'Possession: 2026' },
      { val: '42+', lbl: 'Luxury Villas' },
      { val: '12 Acres', lbl: 'Total Area' },
      { val: '10 Yr', lbl: 'SLB Leaseback' },
      { val: 'Villas', lbl: 'Asset Category' },
    ],
    gallery: [
      {
        image: '/assets/wordpress_media/Backyard-Landscaping-Ideas-Landscape-Art.webp',
        label: 'Private Villa Lawns',
        gridClass: 'pd2-gi-1',
      },
      {
        image: '/assets/wordpress_media/mansion_g5c9re.webp',
        label: 'Waterfront Estate Facade',
        gridClass: 'pd2-gi-2',
      },
      {
        image: '/assets/wordpress_media/elegant-music-lounge-with-comfortable-seating.webp',
        label: 'Clubhouse & Lounge',
        gridClass: 'pd2-gi-3',
      },
      {
        image: '/assets/wordpress_media/Turbun_Group_Resort_Reception_View_08.jpg.jpg',
        label: 'Arrival Pavilion',
        gridClass: 'pd2-gi-4',
      },
      {
        image: '/assets/wordpress_media/arayvilla-scaled-1.webp',
        label: 'Luxury Bedroom Suite',
        gridClass: 'pd2-gi-5',
      },
      {
        image: '/assets/wordpress_media/HNIs-Are-Shifting-Toward.jpg',
        label: 'European Bistro',
        gridClass: 'pd2-gi-6',
      },
    ],
    roiMetrics: [
      { label: 'Gross Annual Rental Yield', val: '8.8%', isGold: true },
      { label: 'Target IRR', val: '13.8%', isGold: true },
      { label: 'Lease Term', val: '10 Years' },
      { label: 'Starting Investment Size', val: '₹ 1.0 Crore' },
      { label: 'Free Owner Holiday Nights', val: '18 Days / Year' },
    ],
    tenants: [
      { name: 'Heritage Leisure Resorts LLP', detail: '10-Year Fully Serviced SLB Contract' },
      { name: 'Crown Culinary & Spa', detail: 'F&B and Wellness Brand Partner' },
    ],
    roiFrontImage: '/assets/wordpress_media/mansion_g5c9re.webp',
    roiBackImage: '/assets/wordpress_media/Backyard-Landscaping-Ideas-Landscape-Art.webp',
    amenities: [
      { name: '10-Year Lease Guarantee', iconType: 'lease' },
      { name: 'Private Plunge Pools', iconType: 'pool' },
      { name: '24/7 Gated Security', iconType: 'security' },
      { name: 'Aravali Panoramic Views', iconType: 'view' },
      { name: 'European Themed Decor', iconType: 'interior' },
      { name: 'Bespoke Concierge', iconType: 'managed' },
    ],
    locationDesc:
      'Situated in scenic Chandwaji with rapid access to the upcoming Delhi-Mumbai Expressway connector and surrounding nature reserves.',
    mapEmbedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3558.077977464132!2d75.7628173!3d26.8833987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db444b04f7ec1%3A0xa94f927cfa024e03!2sPatrakar%20Colony%2C%20Mansarovar%2C%20Jaipur!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
    nearby: [
      { name: 'Aravali Eco Park', dist: '3 KM · 4 min drive' },
      { name: 'Jaipur City Center', dist: '28 KM · 30 min drive' },
      { name: 'Jaipur International Airport', dist: '42 KM · 45 min drive' },
    ],
    paymentPlan: [
      { milestone: 'Booking Token', timeline: 'On Booking', percent: '10%', isHighlight: true },
      { milestone: 'Plinth Completion', timeline: 'Within 60 Days', percent: '20%' },
      { milestone: 'Villa Structure Complete', timeline: 'Within 120 Days', percent: '30%' },
      { milestone: 'Finishing & Fitout', timeline: 'Within 180 Days', percent: '20%' },
      { milestone: 'Handover & First Payout', timeline: 'On Registration', percent: '20%', isHighlight: true },
    ],
    constructionStages: [
      {
        image: '/assets/wordpress_media/WhatsApp-Image-2026-06-08-at-4.12.17-PM.jpeg',
        overlay: 'Roads & Utilities Laid',
      },
      {
        image: '/assets/wordpress_media/WhatsApp-Image-2026-06-08-at-4.14.25-PM-1.jpeg',
        overlay: 'Phase 1 Villas Framing',
      },
      {
        image: '/assets/wordpress_media/WhatsApp-Image-2026-06-08-at-4.14.25-PM.jpeg',
        overlay: 'Clubhouse Roof Casting',
      },
      {
        image: '/assets/wordpress_media/stbq5oqq95hjjahdefvq.webp',
        overlay: 'Sample Villa Ready',
      },
    ],
    faqs: [
      {
        question: 'What are the expected quarterly distributions?',
        answer:
          'Under the 8.8% leaseback agreement, payouts occur quarterly with financial statements issued by verified third-party auditors.',
      },
      {
        question: 'Is maintenance included in the agreement?',
        answer:
          'Yes, 100% of upkeep, gardening, painting, pool sanitation, and operational maintenance is managed by the hospitality brand without any deduction from investor payouts.',
      },
    ],
    similarProperties: [
      {
        slug: 'turban-resort-chandwaji',
        title: 'Turban Resort Chandwaji',
        price: 'Starting From ₹ 80 LACS.',
        image: '/assets/wordpress_media/Turbun_Group_Resort_Reception_View_08.jpg.jpg',
      },
      {
        slug: 'skyline-arcadia',
        title: 'Skyline Arcadia',
        price: 'Starting From ₹ 70 LACS.',
        image: '/assets/wordpress_media/Project-Photo-9-Skyline-Arcadia-Jaipur-5442983_2000_1226.jpg',
      },
    ],
  },
}

export function getPropertyDetailBySlug(slug: string): PropertyDetailItem | undefined {
  return propertiesDetailData[slug] || propertiesDetailData['skyline-arcadia']
}

export function getAllPropertySlugs(): string[] {
  return ['skyline-arcadia', 'turban-resort-chandwaji', 'london-street', 'turban-group-resort', 'aryaville', 'greenz-danube']
}
