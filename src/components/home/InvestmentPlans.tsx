'use client'

import React from 'react'
import { investmentTiersData, InvestmentTier } from '@/data/home-data'

interface InvestmentPlansProps {
  tiers?: InvestmentTier[]
}

export function InvestmentPlans({ tiers = investmentTiersData }: InvestmentPlansProps) {
  return (
    <section
      className="section-padding tiers-section"
      id="investment-plans"
      style={{
        backgroundColor: '#F8F6F0',
        borderTop: '1px solid #EAE7E0',
        padding: '6rem 0',
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div
          className="section-title-group center text-center"
          style={{ maxWidth: '800px', margin: '0 auto 4rem auto' }}
        >
          <span className="editorial-tag">Structured Yields</span>
          <h2 className="editorial-title">
            Investment Plans<br />
            <em>& Portfolio Tiers</em>
          </h2>
          <p className="section-desc">
            Choose from our curated fractional investment tiers designed to align with your financial
            goals, featuring secured developer leases and pre-defined exit options.
          </p>
        </div>

        {/* Tiers Grid */}
        <div
          className="tiers-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.5rem',
          }}
        >
          {tiers.map((tier) => {
            if (tier.isRecommended) {
              return (
                <div
                  key={tier.id}
                  className="tier-card recommended"
                  style={{
                    background: 'var(--primary)',
                    border: '1px solid var(--accent)',
                    borderRadius: '2px',
                    padding: '3rem 2.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'var(--transition-smooth)',
                    boxShadow: 'var(--shadow-lg)',
                    position: 'relative',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      top: '1.25rem',
                      right: '1.5rem',
                      background: 'var(--accent)',
                      color: 'var(--primary)',
                      fontSize: '0.65rem',
                      fontWeight: 700,
                      padding: '0.35rem 0.85rem',
                      borderRadius: '30px',
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                    }}
                  >
                    RECOMMENDED
                  </div>
                  <div style={{ marginBottom: '2rem' }}>
                    <span
                      className="editorial-tag"
                      style={{
                        fontSize: '0.72rem',
                        color: 'var(--accent)',
                        marginBottom: '0.5rem',
                        display: 'block',
                      }}
                    >
                      {tier.tag}
                    </span>
                    <h3
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '1.5rem',
                        fontWeight: 500,
                        color: '#FFFFFF',
                        margin: 0,
                      }}
                    >
                      {tier.title}
                    </h3>
                  </div>
                  <div
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      padding: '1.5rem',
                      borderRadius: '2px',
                      marginBottom: '2rem',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '0.75rem',
                      }}
                    >
                      <span style={{ fontSize: '0.82rem', color: 'rgba(255, 255, 255, 0.65)' }}>
                        Starting Size
                      </span>
                      <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#FFFFFF' }}>
                        {tier.startingSize}
                      </span>
                    </div>
                    <div style={{ display: 'flex', justifyItems: 'space-between', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '0.82rem', color: 'rgba(255, 255, 255, 0.65)' }}>
                        Assured Yield
                      </span>
                      <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent)' }}>
                        {tier.assuredYield}
                      </span>
                    </div>
                  </div>
                  <ul
                    style={{
                      listStyle: 'none',
                      padding: 0,
                      margin: '0 0 2.5rem 0',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.85rem',
                      fontSize: '0.85rem',
                      color: 'rgba(255, 255, 255, 0.7)',
                    }}
                  >
                    {tier.features.map((feat, idx) => (
                      <li key={idx} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                        <svg
                          viewBox="0 0 24 24"
                          width="16"
                          height="16"
                          fill="none"
                          stroke="var(--accent)"
                          strokeWidth="2.5"
                          style={{ marginTop: '0.15rem', flexShrink: 0 }}
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        {feat}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#contact"
                    className="btn"
                    style={{
                      marginTop: 'auto',
                      backgroundColor: 'var(--accent)',
                      color: 'var(--primary)',
                      borderRadius: '2px',
                      padding: '0.8rem 1.5rem',
                      textAlign: 'center',
                      fontWeight: 700,
                      border: 'none',
                    }}
                  >
                    INQUIRE NOW
                  </a>
                </div>
              )
            }

            return (
              <div
                key={tier.id}
                className="tier-card"
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #EAE7E0',
                  borderRadius: '2px',
                  padding: '3rem 2.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'var(--transition-smooth)',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <div style={{ marginBottom: '2rem' }}>
                  <span
                    className="editorial-tag"
                    style={{
                      fontSize: '0.72rem',
                      color: 'var(--accent)',
                      marginBottom: '0.5rem',
                      display: 'block',
                    }}
                  >
                    {tier.tag}
                  </span>
                  <h3
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.5rem',
                      fontWeight: 500,
                      color: 'var(--primary)',
                      margin: 0,
                    }}
                  >
                    {tier.title}
                  </h3>
                </div>
                <div
                  style={{
                    backgroundColor: '#FAF9F6',
                    border: '1px solid #EFF2F1',
                    padding: '1.5rem',
                    borderRadius: '2px',
                    marginBottom: '2rem',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '0.75rem',
                    }}
                  >
                    <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                      Starting Size
                    </span>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary)' }}>
                      {tier.startingSize}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                      Assured Yield
                    </span>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent)' }}>
                      {tier.assuredYield}
                    </span>
                  </div>
                </div>
                <ul
                  style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: '0 0 2.5rem 0',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.85rem',
                    fontSize: '0.85rem',
                    color: 'var(--text-muted)',
                  }}
                >
                  {tier.features.map((feat, idx) => (
                    <li key={idx} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                      <svg
                        viewBox="0 0 24 24"
                        width="16"
                        height="16"
                        fill="none"
                        stroke="var(--accent)"
                        strokeWidth="2.5"
                        style={{ marginTop: '0.15rem', flexShrink: 0 }}
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {feat}
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className="btn btn-outline"
                  style={{
                    marginTop: 'auto',
                    borderColor: 'var(--primary)',
                    color: 'var(--primary)',
                    borderRadius: '2px',
                    padding: '0.8rem 1.5rem',
                    textAlign: 'center',
                  }}
                >
                  INQUIRE NOW
                </a>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
