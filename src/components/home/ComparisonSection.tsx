'use client'

import React from 'react'

export function ComparisonSection() {
  return (
    <section className="section-padding comparison-section" id="compare-section">
      <div className="container">
        <div className="comparison-header-row">
          <h2 className="editorial-title">
            A New Way to Think About<br />
            <em>Property Ownership</em>
          </h2>
          <p>
            We curate only those properties that generate measurable, documented returns. Every
            listing on our platform is verified for income potential before it ever reaches you.
          </p>
        </div>

        <div className="comparison-grid">
          {/* Traditional Real Estate Column */}
          <div className="comp-col">
            <div className="comp-col-heading-wrap">
              <h3 className="comp-col-heading">Traditional Real Estate</h3>
            </div>
            <ul className="comp-list">
              {/* Item 1 */}
              <li className="comp-item-new">
                <div className="comp-icon-circle">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="22 17 13.5 8.5 8.5 13.5 2 7" />
                    <polyline points="16 17 22 17 22 11" />
                  </svg>
                </div>
                <div className="comp-text-wrap">
                  <h4 className="comp-item-title-new">Speculative Returns</h4>
                  <p className="comp-item-text-new">
                    Returns depend largely on market appreciation, not assured income.
                  </p>
                </div>
              </li>

              {/* Item 2 */}
              <li className="comp-item-new">
                <div className="comp-icon-circle">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <div className="comp-text-wrap">
                  <h4 className="comp-item-title-new">Self-Managed</h4>
                  <p className="comp-item-text-new">
                    Investors handle tenants, maintenance, and operations.
                  </p>
                </div>
              </li>

              {/* Item 3 */}
              <li className="comp-item-new">
                <div className="comp-icon-circle">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <div className="comp-text-wrap">
                  <h4 className="comp-item-title-new">Appreciation-Dependent</h4>
                  <p className="comp-item-text-new">
                    Earnings are realized only on resale or long-term holding.
                  </p>
                </div>
              </li>

              {/* Item 4 */}
              <li className="comp-item-new">
                <div className="comp-icon-circle">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
                  </svg>
                </div>
                <div className="comp-text-wrap">
                  <h4 className="comp-item-title-new">Opaque Returns</h4>
                  <p className="comp-item-text-new">
                    Limited clarity on actual rental yield and net ROI.
                  </p>
                </div>
              </li>

              {/* Item 5 */}
              <li className="comp-item-new">
                <div className="comp-icon-circle">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                </div>
                <div className="comp-text-wrap">
                  <h4 className="comp-item-title-new">Complex for NRIs</h4>
                  <p className="comp-item-text-new">
                    Remote property management can be challenging and time-intensive.
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Income Estate Column */}
          <div className="comp-col">
            <div className="comp-col-heading-wrap">
              <h3 className="comp-col-heading">Income Estate</h3>
              <span className="comp-badge-pill">OUR MODEL</span>
            </div>
            <ul className="comp-list">
              {/* Item 1 */}
              <li className="comp-item-new">
                <div className="comp-icon-circle">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                </div>
                <div className="comp-text-wrap">
                  <h4 className="comp-item-title-new">Assured ROI</h4>
                  <p className="comp-item-text-new">
                    Structured returns through Sale & Leaseback (SLB) agreements.
                  </p>
                </div>
              </li>

              {/* Item 2 */}
              <li className="comp-item-new">
                <div className="comp-icon-circle">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <polyline points="9 11 11 13 15 9" />
                  </svg>
                </div>
                <div className="comp-text-wrap">
                  <h4 className="comp-item-title-new">Builder-Managed</h4>
                  <p className="comp-item-text-new">
                    Developer handles leasing, operations, and upkeep.
                  </p>
                </div>
              </li>

              {/* Item 3 */}
              <li className="comp-item-new">
                <div className="comp-icon-circle">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="12" r="6" />
                    <circle cx="12" cy="12" r="2" />
                  </svg>
                </div>
                <div className="comp-text-wrap">
                  <h4 className="comp-item-title-new">Income-Focused Selection</h4>
                  <p className="comp-item-text-new">
                    Properties are chosen based on return potential, not just appreciation.
                  </p>
                </div>
              </li>

              {/* Item 4 */}
              <li className="comp-item-new">
                <div className="comp-icon-circle">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                    <line x1="8" y1="21" x2="16" y2="21" />
                    <line x1="12" y1="17" x2="12" y2="21" />
                  </svg>
                </div>
                <div className="comp-text-wrap">
                  <h4 className="comp-item-title-new">Transparent Returns</h4>
                  <p className="comp-item-text-new">
                    Clear visibility on ROI, lease terms, and payout structure.
                  </p>
                </div>
              </li>

              {/* Item 5 */}
              <li className="comp-item-new">
                <div className="comp-icon-circle">
                  <span
                    style={{
                      fontSize: '0.65rem',
                      fontWeight: 800,
                      fontFamily: 'var(--font-serif)',
                      color: 'var(--accent)',
                      lineHeight: 1,
                    }}
                  >
                    NRI
                  </span>
                </div>
                <div className="comp-text-wrap">
                  <h4 className="comp-item-title-new">NRI Desk Included</h4>
                  <p className="comp-item-text-new">
                    Dedicated support for smooth and remote investment experience.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
