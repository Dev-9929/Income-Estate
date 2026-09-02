'use client'

import React from 'react'
import { topStatsData, TopStatItem } from '@/data/home-data'

interface TopStatsBarProps {
  stats?: TopStatItem[]
}

export function TopStatsBar({ stats = topStatsData }: TopStatsBarProps) {
  const renderIcon = (type: TopStatItem['icon']) => {
    switch (type) {
      case 'roi':
        return (
          <svg
            className="top-stat-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <line x1="18" y1="20" x2="18" y2="10" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="12" y1="20" x2="12" y2="4" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="6" y1="20" x2="6" y2="14" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M3 20h18" strokeLinecap="round" strokeLinejoin="round" />
            <polyline points="12 4 18 10 21 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )
      case 'investment':
        return (
          <svg
            className="top-stat-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path
              d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <polyline
              points="3.27 6.96 12 12.01 20.73 6.96"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <line
              x1="12"
              y1="22.08"
              x2="12"
              y2="12"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )
      case 'managed':
        return (
          <svg
            className="top-stat-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path
              d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="m9 11 2 2 4-4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )
      default:
        return null
    }
  }

  return (
    <section className="top-stats-bar">
      <div className="container top-stats-grid">
        {stats.map((stat, idx) => (
          <div key={idx} className="top-stat-item">
            {renderIcon(stat.icon)}
            <span className="top-stat-num">{stat.num}</span>
            <span className="top-stat-label">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
