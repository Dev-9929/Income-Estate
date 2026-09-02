export interface MegaMenuLink {
  title: string
  desc: string
  href: string
}

export interface MegaMenuData {
  tag: string
  heading: string
  description: string
  image: string
  links: MegaMenuLink[]
}

export interface NavItem {
  id: string
  label: string
  href: string
  megaMenu?: MegaMenuData
  megaMenuAlign?: 'left' | 'right'
}

export const conceptMegaMenu: MegaMenuData = {
  tag: 'The Concept',
  heading: 'Fractional Ownership',
  description: 'Co-own premium income-generating holiday resorts and earn stable returns.',
  image: '/assets/wordpress_media/elegant-music-lounge-with-comfortable-seating.webp',
  links: [
    {
      title: 'About Us',
      desc: 'Who we are, our mission, and transparent fractional investment team.',
      href: '/about',
    },
    {
      title: 'How It Works',
      desc: 'Step-by-step process of co-ownership, yields, and exit strategy.',
      href: '/how-it-works',
    },
    {
      title: 'Our Services',
      desc: 'Property management, rent distribution, tax support & concierge.',
      href: '/services',
    },
  ],
}

export const resourcesMegaMenu: MegaMenuData = {
  tag: 'Resources',
  heading: 'Calculators & Guides',
  description: 'Empower your choices with financial estimation and expert insights.',
  image: '/assets/wordpress_media/mansion_g5c9re.webp',
  links: [
    {
      title: 'ROI Calculator',
      desc: 'Estimate your monthly yields, capital appreciation, and returns.',
      href: '/#calculator',
    },
    {
      title: 'Blogs & Insights',
      desc: 'Insights, articles, and expert guides on real estate investing.',
      href: '/blogs',
    },
    {
      title: 'News & Updates',
      desc: 'Latest news on resort fractional share regulations and growth.',
      href: '/blogs',
    },
  ],
}

// Left wing navigation links
export const leftNavItems: NavItem[] = [
  {
    id: 'link-concept',
    label: 'The Concept',
    href: '#',
    megaMenu: conceptMegaMenu,
    megaMenuAlign: 'left',
  },
  {
    id: 'link-roi-properties',
    label: 'ROI Properties',
    href: '/properties',
  },
  {
    id: 'link-branded-residences',
    label: 'Branded Residences',
    href: '/branded-residences',
  },
]

// Right wing navigation links
export const rightNavItems: NavItem[] = [
  {
    id: 'link-resources',
    label: 'Resources',
    href: '#',
    megaMenu: resourcesMegaMenu,
    megaMenuAlign: 'right',
  },
  {
    id: 'link-contact',
    label: 'Contact Us',
    href: '/contact',
  },
]
