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

export interface VideoWaypoint {
  marker: string
  title: string
  desc: string
}

export interface PropertyVideoItem {
  id: string
  title: string
  category: 'route' | 'drone' | 'walkthrough' | 'construction'
  categoryLabel: string
  duration: string
  posterImage: string
  videoUrl: string
  description: string
  waypoints?: VideoWaypoint[]
}

export interface UnitConfiguration {
  type: string
  size: string
  price: string
  paymentPlan?: string
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
  rentalYield?: string
  targetIrr?: string
  propertyType?: string
  possession?: string
  projectScope?: string
  sizeArea?: string
  overviewTag: string
  overviewHeading: string
  overviewHeadingAccent: string
  overviewText1: string
  overviewText2: string
  overviewFullStory?: string[]
  overviewHighlights?: string[]
  projectHighlights?: string[]
  highlightsIntro?: string
  mainImage: string
  thumbImage: string
  facts: PropertyFact[]
  gallery: GalleryItem[]
  unitConfigurations?: UnitConfiguration[]
  roiMetrics: RoiMetric[]
  tenants: TenantInfo[]
  roiFrontImage: string
  roiBackImage: string
  amenities: AmenityItem[]
  videos?: PropertyVideoItem[]
  brochureUrl?: string
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
    priceStarting: 'From ₹ 70 LACS.',
    rentalYield: '9.0%',
    targetIrr: '12.0%',
    propertyType: 'Commercial Office',
    possession: 'Ready to Buy',
    projectScope: '8 Exclusive Units',
    sizeArea: '1100 SqYd (Bigha)',
    overviewTag: 'Project Overview',
    overviewHeading: 'A Commercial Landmark',
    overviewHeadingAccent: 'Built for Investors',
    overviewText1:
      'Strategically located in the heart of Jaipur, Skyline Arcadia is a thoughtfully planned mixed-use commercial destination that blends modern business infrastructure with hospitality and lifestyle-driven spaces. Designed for evolving urban investment needs, it delivers consistent returns from day one.',
    overviewText2:
      'The development features premium retail showrooms, coworking zones, and hospitality suites — all within a professionally managed ecosystem where investors receive passive, structured rental income without lifting a finger.',
    overviewFullStory: [
      'Strategically located in Jaipur, Skyline Arcadia is a thoughtfully planned mixed-use commercial destination that blends modern business infrastructure with hospitality and lifestyle-driven spaces. Designed to cater to evolving urban and investment needs, the project combines retail, office, and studio environments within a professionally managed ecosystem.',
      'Spread across a well-developed commercial layout, the project features premium retail showrooms, office spaces, coworking zones, and hospitality suites, creating a dynamic environment for businesses, investors, and visitors alike. The development focuses on convenience, sustainability, and long-term value, supported by modern architecture and functional design planning.',
      'A key highlight of Skyline Arcadia is its strong tenant ecosystem and operational occupancy. The 2nd to 4th floors are leased to Regenta Hotel, operating 40 well-appointed rooms that bring hospitality value and consistent visitor footfall to the property. The 1st floor houses Hobnob Coworks, serving startups, freelancers, and modern businesses with flexible workspace solutions. The ground floor is occupied by Punjab National Bank (PNB) across a 2,900 sq. ft. double-height space, generating a monthly rental income of ₹2.20 lakhs while adding institutional credibility and long-term stability to the development.',
      'The project also emphasizes sustainable and future-oriented infrastructure with features such as solar-powered common areas, EV-friendly planning, rainwater harvesting provisions, and 24/7 utility support. Lifestyle additions such as rooftop dining and integrated commercial experiences further enhance the overall appeal of the development.',
    ],
    overviewHighlights: [
      '5-Year Guaranteed Lease Structure with Predictable Monthly Yields',
      'Institutional Tenants: PNB (₹2.20L/mo), Regenta Hotel & Hobnob Coworks',
      'Reserved Parking Facilities & Ample Basement Zones',
      'Earthquake-Resistant RCC Structure with Safety Compliance',
      'Solar Energy Integration for Common Building Utilities',
      '24/7 CCTV Surveillance & Advanced Security Monitoring',
      'Gated Community-Style Commercial Access & Controlled Entry',
      'Rooftop Dining & Lifestyle Amenities for Enhanced Footfall',
    ],
    highlightsIntro:
      'Skyline Arcadia combines prime urban connectivity, pre-leased institutional tenants, and modern infrastructure to deliver predictable value and superior operational benefits.',
    projectHighlights: [
      'High-Footfall Commercial Corridor Near Patrakar Colony, Mansarovar',
      '5-Year Guaranteed Lease Structure with Predictable Monthly Yields',
      'Tier-1 Institutional Tenants: Punjab National Bank, Regenta & Hobnob',
      'Double-Height Retail Showrooms & Grade-A Flexible Workspaces',
      'Solar Energy Integration for Common Utilities & Reduced Overheads',
      'Dedicated Multi-Level Basement Parking & High-Speed Elevators',
      'Integrated Rooftop Dining & Lifestyle Customer Footfall Hub',
      '100% Hands-Free Fully Managed Commercial Asset Operations',
    ],
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
    unitConfigurations: [
      {
        type: 'Retail Showroom (Ground Floor)',
        size: '2,900 SQ.FT',
        price: '₹ 2.45 Cr',
        paymentPlan: '50:50 Flexi',
      },
      {
        type: 'Corporate Office Suite (1st Floor)',
        size: '1,100 SQ.FT',
        price: '₹ 95.00 Lacs',
        paymentPlan: '30:40:30',
      },
      {
        type: 'Boutique Studio Suite (2nd–4th Floor)',
        size: '750 SQ.FT',
        price: '₹ 70.00 Lacs',
        paymentPlan: 'Construction Linked',
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
    videos: [
      {
        id: 'skyline-route',
        title: 'Approach & Connectivity Drive-Through',
        category: 'route',
        categoryLabel: 'Route & Approach',
        duration: '1:45 Min',
        posterImage: '/assets/wordpress_media/Project-Photo-9-Skyline-Arcadia-Jaipur-5442983_2000_1226.jpg',
        videoUrl: '/assets/video/Home-banner-video.mp4',
        description: 'Experience the smooth driving approach from Mansarovar Metro and Ajmer Road directly into Skyline Arcadia’s commercial promenade.',
        waypoints: [
          { marker: '0 KM', title: 'Ajmer Expressway Junction', desc: 'Direct 6-lane signal-free arterial flow' },
          { marker: '1.2 KM', title: 'Patrakar Colony Avenue', desc: 'High-density commercial & retail high-street' },
          { marker: 'At Site', title: 'Grand Commercial Portico', desc: 'Reserved basement entrance & drop-off concourse' },
        ],
      },
      {
        id: 'skyline-drone',
        title: '360° Aerial Drone & Catchment Overview',
        category: 'drone',
        categoryLabel: 'Aerial Drone Tour',
        duration: '2:15 Min',
        posterImage: '/assets/wordpress_media/Project-Photo-3-Skyline-Arcadia-Jaipur-5442983_2000_1217.jpg',
        videoUrl: '/assets/video/cta-video.mp4',
        description: 'A comprehensive bird’s-eye perspective capturing the dense urban catchment, adjacent luxury residential enclaves, and future transit corridor.',
      },
      {
        id: 'skyline-walkthrough',
        title: 'Boutique Office & Regenta Suites Walkthrough',
        category: 'walkthrough',
        categoryLabel: 'Interior Walkthrough',
        duration: '2:40 Min',
        posterImage: '/assets/wordpress_media/1767445680167-g1.jpg',
        videoUrl: '/assets/video/Home-banner-video.mp4',
        description: 'Step inside the double-height retail showrooms, Hobnob cowork spaces, and fully furnished Regenta Hotel operational floors.',
      },
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
    priceStarting: 'From ₹ 80 LACS.',
    rentalYield: '9.2%',
    targetIrr: '14.5%',
    propertyType: 'Hospitality Resort',
    possession: 'Operational',
    projectScope: '40+ Resort Keys',
    sizeArea: '5 Acres Estate',
    overviewTag: 'Hospitality Co-Ownership',
    overviewHeading: 'A High-Yield Luxury Destination',
    overviewHeadingAccent: 'On Delhi-Jaipur Express Corridor',
    overviewText1:
      'Turban Resort Chandwaji is a bespoke destination resort nestled against the Aravali foothills on the busy Delhi-Jaipur highway, attracting weekend leisure getaways, corporate conferences, and luxury destination weddings.',
    overviewText2:
      'Backed by 15-year Sale & Leaseback agreements with guaranteed minimum returns and quarterly operational bonus distributions, investors enjoy consistent cash flows and complimentary owner stays.',
    highlightsIntro:
      'Turban Resort Chandwaji blends highway accessibility, destination wedding hospitality, and guaranteed long-term lease cash flows nestled in the scenic Aravalis.',
    projectHighlights: [
      'Strategic Destination Resort on Delhi-Jaipur Express Highway',
      '15-Year Institutional Sale & Leaseback Agreement',
      'High Weekend Leisure Footfall & Luxury Wedding Banqueting',
      'Fully Operational Luxury Villa Suites & Grand Arrival Lobby',
      'Temperature Controlled Pools, Signature Spa & Multi-Cuisine Dining',
      '14 Days Free Owner Holiday Stays Every Year with VIP Concierge',
      '100% Asset-Backed Fractional Co-Ownership SPV Title',
      'Guaranteed Monthly Direct Bank Distribution Payouts',
    ],
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
    unitConfigurations: [
      {
        type: 'Aravali Heritage Cottage Suite',
        size: '650 SQ.FT',
        price: '₹ 80.00 Lacs',
        paymentPlan: 'Guaranteed SLB',
      },
      {
        type: 'Private Pool Pavilion Villa',
        size: '1,250 SQ.FT',
        price: '₹ 1.45 Cr',
        paymentPlan: 'Guaranteed SLB',
      },
      {
        type: 'Presidential Royal Chalet',
        size: '2,100 SQ.FT',
        price: '₹ 2.20 Cr',
        paymentPlan: 'Guaranteed SLB',
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
    priceStarting: 'From ₹ 1 CR.',
    rentalYield: '8.8%',
    targetIrr: '13.8%',
    propertyType: 'European Themed Villas',
    possession: 'Possession 2026',
    projectScope: '42+ Luxury Villas',
    sizeArea: '12 Acres Enclave',
    overviewTag: 'Themed Luxury Villas',
    overviewHeading: 'British Architecture in',
    overviewHeadingAccent: 'The Heart of the Aravalis',
    overviewText1:
      'London Street is a themed luxury villa enclave designed with classic English cobblestone pathways, boutique clubhouses, and private heated plunge pools. Positioned for discerning luxury holidaymakers.',
    overviewText2:
      'Managed under an exclusive hospitality operator with guaranteed rental distribution, investors benefit from high wedding-season banquet rentals and steady weekend tourism yields.',
    highlightsIntro:
      'London Street delivers an exceptional blend of English architectural heritage, scenic hill enclave privacy, and guaranteed hospitality-driven cash flows.',
    projectHighlights: [
      'Prime Location in Chandwaji with Panoramic Aravali Foothill Views',
      'Direct Access & High Visibility on Delhi-Jaipur National Highway Corridor',
      '10-Year Assured Leaseback with Complete Maintenance & Asset Management',
      'Private Heated Plunge Pools & Signature English Landscaped Gardens',
      'Gated Luxury Community with 24/7 Multi-Tiered Security & Concierge',
      'Boutique Clubhouse, Spa, Fine-Dining European Bistro & Banquet Lawns',
      '18 Days Complimentary Annual Vacation Stays for Owners',
      'Clear Freehold Title with 100% RERA & Legal Transparency',
    ],
    mainImage: '/assets/wordpress_media/Backyard-Landscaping-Ideas-Landscape-Art.webp',
    thumbImage: '/assets/wordpress_media/mansion_g5c9re.webp',
    facts: [
      { val: '2026', lbl: 'Possession Status' },
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
    unitConfigurations: [
      {
        type: '3 BHK Cotswold Luxury Villa',
        size: '2,800 SQ.FT',
        price: '₹ 1.25 Cr',
        paymentPlan: '40:60 SLB',
      },
      {
        type: '4 BHK Kensington Signature Villa',
        size: '3,600 SQ.FT',
        price: '₹ 1.85 Cr',
        paymentPlan: '40:60 SLB',
      },
      {
        type: '5 BHK Mayfair Royal Estate',
        size: '4,800 SQ.FT',
        price: '₹ 2.60 Cr',
        paymentPlan: '30:30:40',
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
    videos: [
      {
        id: 'london-route',
        title: 'Delhi-Jaipur Highway to Doorstep Experience',
        category: 'route',
        categoryLabel: 'Route & Approach',
        duration: '2:05 Min',
        posterImage: '/assets/wordpress_media/Backyard-Landscaping-Ideas-Landscape-Art.webp',
        videoUrl: '/assets/video/Home-banner-video.mp4',
        description: 'Trace the scenic drive from Delhi-Jaipur NH-48 through peaceful Chandwaji foothill roads straight to the cobblestone gates of London Street.',
        waypoints: [
          { marker: '0 KM', title: 'Delhi-Jaipur NH-48 Highway', desc: 'Fast expressway transit from NCR & Jaipur' },
          { marker: '3.5 KM', title: 'Scenic Aravali Foothill Road', desc: 'Tree-lined smooth 4-lane access corridor' },
          { marker: 'At Gate', title: 'English Estate Main Gatehouse', desc: 'Private 24/7 security checkpoint & cobblestone avenue' },
        ],
      },
      {
        id: 'london-drone',
        title: 'Aerial Valley & 12-Acre Estate Drone Tour',
        category: 'drone',
        categoryLabel: 'Aerial Drone Tour',
        duration: '1:50 Min',
        posterImage: '/assets/wordpress_media/mansion_g5c9re.webp',
        videoUrl: '/assets/video/cta-video.mp4',
        description: 'Hover across 12 lush acres of private landscaped grounds, English chalets, private plunge pools, and uninterrupted Aravali mountain views.',
      },
      {
        id: 'london-walkthrough',
        title: 'Sample Private Pool Villa Walkthrough',
        category: 'walkthrough',
        categoryLabel: 'Sample Villa Tour',
        duration: '3:10 Min',
        posterImage: '/assets/wordpress_media/Turbun_Group_Resort_Reception_View_10.jpg.jpg',
        videoUrl: '/assets/video/Home-banner-video.mp4',
        description: 'A walkthrough inside the European-themed villa: double-height living lounge, heated private plunge pool deck, and master cottage suites.',
      },
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
  'tonino-lamborghini-residences': {
    id: 'tonino-lamborghini-residences',
    slug: 'tonino-lamborghini-residences',
    title: 'Tonino Lamborghini',
    titleAccent: 'Residences Arcadia',
    heroLabel: 'Ultra-Luxury Branded Residences',
    location: 'Sector 58, Golf Course Extension Road, Gurugram',
    heroImage: '/assets/hero_resort.png',
    priceStarting: 'From ₹ 23.10 Crore',
    rentalYield: '',
    targetIrr: '',
    propertyType: 'Residential Flats',
    possession: 'Sep 2033',
    projectScope: '2 Tower - 240 Unit',
    sizeArea: '5500 – 8500 Sq. Ft.',
    overviewTag: 'Exclusive Living',
    overviewHeading: 'Architectural Grandeur',
    overviewHeadingAccent: 'With Italian Heritage',
    overviewText1:
      'Tonino Lamborghini Residences Arcadia brings world-class Italian craftsmanship and luxury branded living to the prestigious Sector 58 corridor in Gurugram.',
    overviewText2:
      'Featuring ultra-low density living with only two residences per floor, private elevator lobbies, and panoramic Aravali vistas, this development redefines super-luxury living.',
    overviewFullStory: [
      'Oberoi Realty marks its highly anticipated entry into the NCR residential market with an iconic ultra-luxury development in Sector 58, Gurugram. Spread across approximately 15 acres, this landmark project is designed to redefine luxury living through a rare combination of scale, privacy, and exclusivity.',
      'The development features seven elegant high-rise towers rising up to 40 storeys, with only 190 residences planned in Phase 1. Designed with an ultra-low-density philosophy, each floor accommodates just two residences, creating the feel of a private residence level and offering unmatched privacy for homeowners.',
      'Offering expansive 4.5 BHK and 5.5 BHK residences ranging from approximately 5,500 sq. ft. to 8,500 sq. ft., the project caters to discerning individuals and families who seek generous living spaces, premium specifications, and a truly elevated lifestyle. Every aspect of the development has been thoughtfully planned to deliver a seamless blend of luxury, comfort, and sophistication.',
      'Strategically located in Sector 58, Gurugram, the project enjoys excellent connectivity to Golf Course Road, Golf Course Extension Road, Dwarka Expressway, Faridabad Road, and South Delhi, placing residents within easy reach of major business hubs, lifestyle destinations, educational institutions, and healthcare facilities.',
      "As Oberoi Realty's first residential offering in NCR, combined with its highly limited inventory and exceptional location, this development is positioned to become one of Gurugram's most prestigious residential addresses and a landmark opportunity for luxury homebuyers and investors alike.",
    ],
    overviewHighlights: [
      'First Residential Development by Oberoi Realty in NCR',
      '15 Acres of Ultra-Luxury Development',
      'Limited to 190 Residences in Phase 1',
      '7 Iconic High-Rise Towers',
      'G+40 Storey Architecture',
      'Ultra-Low Density Planning',
      'Only 2 Residences Per Floor',
      'Large Format Luxury Residences',
      'Prime Sector 58, Gurugram Location',
      'Seamless Connectivity to Golf Course Road & South Delhi',
    ],
    highlightsIntro:
      'Tonino Lamborghini Residences Arcadia delivers unprecedented low-density luxury, Italian architectural prestige, and unparalleled connectivity to Gurugram’s most coveted corridors.',
    projectHighlights: [
      'Direct Access to Golf Course Road',
      'Easy Connectivity to Golf Course Extension Road',
      'Seamless Access to Dwarka Expressway',
      'Well Connected to South Delhi',
      'Convenient Access to Faridabad Road',
      'Close to Leading Schools & Healthcare Facilities',
      'Surrounded by Premium Residential Communities',
      'Near Major Corporate & Commercial Hubs',
    ],
    mainImage: '/assets/wordpress_media/mansion_g5c9re.webp',
    thumbImage: '/assets/wordpress_media/elegant-music-lounge-with-comfortable-seating.webp',
    facts: [
      { val: 'Sep 2033', lbl: 'Possession Date' },
      { val: '240', lbl: 'Total Units (2 Towers)' },
      { val: '32 Acres', lbl: 'Total Land Area' },
      { val: 'Ultra-Luxury', lbl: 'Specification Grade' },
      { val: 'Residential', lbl: 'Asset Category' },
    ],
    gallery: [
      {
        image: '/assets/hero_resort.png',
        label: 'Grand Facade & Sky Lounge',
        gridClass: 'pd2-gi-1',
      },
      {
        image: '/assets/wordpress_media/mansion_g5c9re.webp',
        label: 'Waterfront Estate Facade',
        gridClass: 'pd2-gi-2',
      },
      {
        image: '/assets/wordpress_media/elegant-music-lounge-with-comfortable-seating.webp',
        label: 'Private Residents Club',
        gridClass: 'pd2-gi-3',
      },
      {
        image: '/assets/wordpress_media/HNIs-Are-Shifting-Toward.jpg',
        label: 'High-Ceiling Italian Living Room',
        gridClass: 'pd2-gi-4',
      },
      {
        image: '/assets/wordpress_media/Backyard-Landscaping-Ideas-Landscape-Art.webp',
        label: 'Manicured Zen Courtyards',
        gridClass: 'pd2-gi-5',
      },
      {
        image: '/assets/wordpress_media/Turbun_Group_Resort_Reception_View_08.jpg.jpg',
        label: 'Grand Arrival Atrium',
        gridClass: 'pd2-gi-6',
      },
    ],
    unitConfigurations: [
      {
        type: '4.5 BHK Ultra-Luxury Residence',
        size: '5,500 SQ.FT',
        price: '₹ 23.10 Cr',
        paymentPlan: '30:30:40',
      },
      {
        type: '5.5 BHK Grand Sky Penthouse',
        size: '8,500 SQ.FT',
        price: '₹ 32.50 Cr',
        paymentPlan: '30:30:40',
      },
    ],
    roiMetrics: [
      { label: 'Unit Configurations', val: '4.5 & 5.5 BHK' },
      { label: 'Starting Price', val: '₹ 23.10 Cr' },
      { label: 'Floor Density', val: '2 Units / Floor', isGold: true },
      { label: 'Total Land Parcel', val: '32 Acres' },
    ],
    tenants: [
      { name: 'Tonino Lamborghini Hospitality', detail: 'Managed Concierge & Club' },
      { name: 'Private Residents Club', detail: 'Dedicated Dining & Spa' },
    ],
    roiFrontImage: '/assets/wordpress_media/mansion_g5c9re.webp',
    roiBackImage: '/assets/wordpress_media/Backyard-Landscaping-Ideas-Landscape-Art.webp',
    amenities: [
      { name: 'Private Concierge', iconType: 'managed' },
      { name: 'Dedicated Covered Parking', iconType: 'parking' },
      { name: '24/7 Security & CCTV', iconType: 'security' },
      { name: 'Panoramic Golf Views', iconType: 'view' },
      { name: 'Italian Designer Interiors', iconType: 'interior' },
      { name: 'Olympic-Length Pool', iconType: 'pool' },
      { name: 'Signature Spa & Wellness', iconType: 'spa' },
      { name: 'Assured Rental Lease', iconType: 'lease' },
    ],
    videos: [
      {
        id: 'tl-route',
        title: 'Golf Course Extension Road to Private Concourse',
        category: 'route',
        categoryLabel: 'Route & Approach',
        duration: '1:55 Min',
        posterImage: '/assets/wordpress_media/Backyard-Landscaping-Ideas-Landscape-Art.webp',
        videoUrl: '/assets/video/Home-banner-video.mp4',
        description: 'Experience the drive through Gurugram’s prime Golf Course Extension corridor into Sector 58’s exclusive branded residences sanctuary.',
        waypoints: [
          { marker: '0 KM', title: 'Golf Course Extension Road', desc: 'Prime Gurugram arterial connecting Cyber City' },
          { marker: '0.8 KM', title: 'Grand Hyatt Corridor', desc: 'Luxury institutional and hospitality micro-market' },
          { marker: 'At Lobby', title: 'Tonino Lamborghini Portico', desc: 'Private valet concourse & double-height foyer' },
        ],
      },
      {
        id: 'tl-drone',
        title: 'Panoramic Golf Views & Tower Aerial Flight',
        category: 'drone',
        categoryLabel: 'Aerial Drone Tour',
        duration: '2:25 Min',
        posterImage: '/assets/wordpress_media/mansion_g5c9re.webp',
        videoUrl: '/assets/video/cta-video.mp4',
        description: 'Ascend over Sector 58 to take in panoramic horizon vistas, lush green golf fairways, and architectural facade detailing.',
      },
      {
        id: 'tl-walkthrough',
        title: 'Ultra-Luxury 5.5 BHK Show Residence Tour',
        category: 'walkthrough',
        categoryLabel: 'Residence Walkthrough',
        duration: '3:45 Min',
        posterImage: '/assets/wordpress_media/1767445680167-g1.jpg',
        videoUrl: '/assets/video/Home-banner-video.mp4',
        description: 'Immerse yourself in Italian craftsmanship, expansive wrap-around balconies, motorized home automation, and bespoke Tonino club amenities.',
      },
    ],
    locationDesc:
      'Situated in Sector 58, Golf Course Extension Road, Gurugram, offering seamless connectivity to Cyber City, Rapid Metro, and Delhi International Airport.',
    mapEmbedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112343.83758368551!2d77.036573!3d28.406935!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d226a2c264c11%3A0xe54d90e0b3d88190!2sSector%2058%2C%20Gurugram%2C%20Haryana!5e0!3m2!1sen!2sin!4v1700000000000',
    nearby: [
      { name: 'Golf Course Road Extension', dist: '2 Min Drive' },
      { name: 'Grand Hyatt Gurgaon', dist: '5 Min Drive' },
      { name: 'Cyber Hub / DLF Phase 2', dist: '15 Min Drive' },
      { name: 'IGI International Airport', dist: '30 Min Drive' },
    ],
    paymentPlan: [
      { milestone: 'Booking Token', timeline: 'On Booking', percent: '10%', isHighlight: true },
      { milestone: '1st Installment', timeline: 'Within 30 Days', percent: '15%' },
      { milestone: 'Completion of Plinth', timeline: 'Milestone 1', percent: '15%' },
      { milestone: 'Superstructure Completion', timeline: 'Milestone 2', percent: '25%' },
      { milestone: 'Finishing & Handover', timeline: 'Possession', percent: '35%' },
    ],
    constructionStages: [
      {
        image: '/assets/wordpress_media/Project-Photo-3-Skyline-Arcadia-Jaipur-5442983_2000_1217.jpg',
        overlay: 'Excavation & Shoring (Active)',
      },
      {
        image: '/assets/wordpress_media/Project-Photo-9-Skyline-Arcadia-Jaipur-5442983_2000_1226.jpg',
        overlay: 'Piling & Foundation Stage',
      },
    ],
    faqs: [
      {
        question: 'What is the configuration of these residences?',
        answer:
          'The project features ultra-luxury 4.5 BHK (Approx. 5,500 Sq. Ft.) and 5.5 BHK (Approx. 8,500 Sq. Ft.) residences with double-height ceiling living areas and expansive private balconies.',
      },
      {
        question: 'Is this project approved under RERA?',
        answer:
          'Yes, the project is completely RERA registered with all environmental and development approvals in place.',
      },
      {
        question: 'Can NRIs purchase through FEMA channels?',
        answer:
          'Yes, 100% compliant with RBI and FEMA guidelines for non-resident investors with direct NRE/NRO repatriation pathways.',
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
    ],
  },
}

export function getPropertyDetailBySlug(slug: string): PropertyDetailItem | undefined {
  return propertiesDetailData[slug] || propertiesDetailData['skyline-arcadia']
}

export function getAllPropertySlugs(): string[] {
  return [
    'skyline-arcadia',
    'turban-resort-chandwaji',
    'london-street',
    'tonino-lamborghini-residences',
    'turban-group-resort',
    'aryaville',
    'greenz-danube',
  ]
}
