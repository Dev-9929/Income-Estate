export interface NewsPostItem {
  id: string
  slug: string
  title: string
  category: 'MARKET NEWS' | 'POLICY & FEMA' | 'HOSPITALITY INSIGHTS' | 'INFRASTRUCTURE'
  date: string
  readTime: string
  author: string
  image: string
  excerpt: string
  contentHtml?: string
}

export const newsListingData: NewsPostItem[] = [
  {
    id: 'hospitality-real-estate-boom-2026',
    slug: 'hospitality-real-estate-boom-2026-nri-demand-surge',
    title: 'Hospitality Real Estate Demand Surges 28% as NRI Capital Flows into Resort Assets',
    category: 'MARKET NEWS',
    date: 'August 28, 2026',
    readTime: '4 min read',
    author: 'INCOME ESTATE NEWS DESK',
    image: '/assets/wordpress_media/Luxury-Resort-Investments.jpg',
    excerpt:
      'Institutional real estate reports show record inflows from non-resident Indian investors into high-yield resort leases and branded luxury residences across India.',
    contentHtml: `
      <p>The domestic commercial real estate sector is witnessing an unprecedented surge in institutional capital allocation, driven by non-resident Indian (NRI) investors seeking high-yield fractional resort titles and structured sale-leaseback (SLB) luxury properties.</p>
      
      <p>According to the latest quarterly institutional market report, hospitality real estate transactions recorded a <strong>28% year-on-year growth</strong> in Q2 2026, outperforming traditional commercial office spaces and high-density urban residential rentals.</p>

      <h2>Key Drivers of the Hospitality Asset Boom</h2>
      <p>Several macroeconomic and regulatory factors have converged to create an exceptionally lucrative environment for luxury resort investors:</p>

      <ul>
        <li><strong>Rising Average Daily Rates (ADR)</strong>: Top-tier destination resorts in Goa, Udaipur, Pushkar, and Jaipur recorded historic occupancy rates exceeding 76% during non-peak quarters.</li>
        <li><strong>Structured Repatriation Guarantees</strong>: Simplified FEMA rules and automated monthly lease distribution mechanisms via Special Purpose Vehicles (SPVs) have boosted investor confidence.</li>
        <li><strong>Inflation-Shielded Yields</strong>: Long-term leaseback contracts built with 15% rent escalation clauses every 3 years ensure real wealth preservation.</li>
      </ul>

      <blockquote>
        "Luxury hospitality assets have transitioned from emotional passion investments into core, income-generating portfolio anchors for HNIs and NRIs globally."
      </blockquote>

      <h2>Outlook for Q3 &amp; Beyond</h2>
      <p>Industry analysts project continued double-digit appreciation for prime leisure land corridors. Fractional resort investments starting from ₹25 Lakhs ticket sizes are expected to absorb a major share of retail NRI capital inflows in the coming fiscal year.</p>
    `,
  },
  {
    id: 'rbi-fema-policy-update-nri-investments',
    slug: 'rbi-fema-policy-update-simplified-repatriation-for-nri-investors',
    title: 'RBI & FEMA Policy Update: Simplified Repatriation Procedures for NRI Property Buyers',
    category: 'POLICY & FEMA',
    date: 'August 18, 2026',
    readTime: '5 min read',
    author: 'LEGAL & COMPLIANCE DESK',
    image: '/assets/wordpress_media/Rupee-Rising-Returns_.jpg',
    excerpt:
      'The Reserve Bank of India issues updated operational guidelines streamlining USD 1 Million annual repatriation limits and digital tax filings for non-resident investors.',
    contentHtml: `
      <p>In a significant regulatory advancement designed to enhance foreign direct investment in Indian real estate, the Reserve Bank of India (RBI) together with the Central Board of Direct Taxes (CBDT) has published updated procedural guidelines for non-resident investors.</p>

      <p>The new framework streamlines the outward remittance process under the Liberalised Remittance Scheme (LRS) and FEMA regulations, making lease rental yield repatriations faster and fully digital.</p>

      <h2>Major Highlights of the Updated Guidelines</h2>
      <ul>
        <li><strong>Automated 15CA/15CB Clearance</strong>: Authorized Dealer (AD Category-I) banks can now process 15CA and 15CB tax forms through synchronized online portals, reducing processing times from 14 days down to 48 hours.</li>
        <li><strong>Direct NRE Dividend Remittance</strong>: Yield distributions originating from legally registered Special Purpose Vehicles (SPVs) can be credited directly into NRE accounts without requiring redundant physical documentation.</li>
        <li><strong>Capital Gains Clarity</strong>: Clearer valuation protocols for fractional property sales ensure fair tax treatment under applicable Double Taxation Avoidance Agreements (DTAA).</li>
      </ul>

      <blockquote>
        "Digital integration across banking channels removes traditional friction points, giving global investors seamless access to their capital and earnings."
      </blockquote>
    `,
  },
  {
    id: 'goa-jaipur-infrastructure-expansion',
    slug: 'goa-jaipur-expressway-expansion-boosts-resort-land-values',
    title: 'Infrastructure Boom: New Highway & Airport Corridors Boost Resort Land Values by 22%',
    category: 'INFRASTRUCTURE',
    date: 'August 05, 2026',
    readTime: '6 min read',
    author: 'INFRASTRUCTURE RESEARCH DESK',
    image: '/assets/wordpress_media/Sale-Leaseback-Model.jpg',
    excerpt:
      'New expressway networks and regional airport expansions in Rajasthan and Western Ghats trigger rapid capital appreciation for destination hospitality projects.',
    contentHtml: `
      <p>Rapid execution of mega-infrastructure corridors across Rajasthan, Himachal Pradesh, and Goa is reshaping the valuation landscape for luxury resort developments and fractional real estate assets.</p>

      <p>Recent land acquisition records indicate a <strong>22% average capital value increase</strong> across prime tourism nodes connected by new high-speed expressways and regional airport hubs.</p>

      <h2>Key Infrastructure Projects Driving Value</h2>
      <ul>
        <li><strong>Delhi-Jaipur Super Expressway Extension</strong>: Reduced travel times between Delhi NCR and Jaipur to under 3.5 hours, sparking weekend tourism spikes and boosting resort occupancies.</li>
        <li><strong>Mopa &amp; Regional Airport Expansions</strong>: Direct international connectivity has increased foreign tourist arrivals to boutique resort properties.</li>
        <li><strong>Eco-Tourism Corridors</strong>: Gated resort land developments along scenic highways enjoy sustained demand from premium hospitality chains.</li>
      </ul>
    `,
  },
  {
    id: 'branded-residences-market-report',
    slug: 'luxury-branded-residences-outperform-traditional-condos-in-2026',
    title: 'Luxury Branded Residences Outperform Traditional Condos with 11.2% Average Lease Yields',
    category: 'HOSPITALITY INSIGHTS',
    date: 'July 25, 2026',
    readTime: '5 min read',
    author: 'HOSPITALITY ANALYTICS TEAM',
    image: '/assets/wordpress_media/mansion_g5c9re.webp',
    excerpt:
      'Hospitality analytics confirm that luxury properties partnered with recognized resort operators deliver significantly higher rental yields and secondary market liquidity.',
    contentHtml: `
      <p>A global study of hospitality real estate assets shows that properties branded by reputed hotel chains command a 30-35% price premium over unbranded developments while delivering higher recurring net yields to fractional owners.</p>

      <p>Institutional operators ensure professional guest management, active digital marketing, and rigorous property maintenance, directly translating into steady cash flows and asset longevity.</p>
    `,
  },
]

export const recentNewsData = [
  {
    title: 'Hospitality Real Estate Demand Surges 28% as NRI Capital Flows into Resort Assets',
    slug: 'hospitality-real-estate-boom-2026-nri-demand-surge',
    date: 'August 28, 2026',
  },
  {
    title: 'RBI & FEMA Policy Update: Simplified Repatriation Procedures for NRI Property Buyers',
    slug: 'rbi-fema-policy-update-simplified-repatriation-for-nri-investors',
    date: 'August 18, 2026',
  },
  {
    title: 'Infrastructure Boom: New Highway & Airport Corridors Boost Resort Land Values by 22%',
    slug: 'goa-jaipur-expressway-expansion-boosts-resort-land-values',
    date: 'August 05, 2026',
  },
  {
    title: 'Luxury Branded Residences Outperform Traditional Condos with 11.2% Average Lease Yields',
    slug: 'luxury-branded-residences-outperform-traditional-condos-in-2026',
    date: 'July 25, 2026',
  },
]

export function getNewsBySlug(slug: string): NewsPostItem | undefined {
  return newsListingData.find((n) => n.slug === slug)
}
