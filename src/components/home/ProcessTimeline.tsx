'use client'

import React from 'react'
import { timelineStepsData, TimelineStep } from '@/data/home-data'

interface ProcessTimelineProps {
  steps?: TimelineStep[]
}

export function ProcessTimeline({ steps = timelineStepsData }: ProcessTimelineProps) {
  return (
    <section
      className="section-padding"
      id="how-it-works"
      style={{
        backgroundColor: '#FFFFFF',
        borderTop: '1px solid var(--border-color)',
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div
          className="section-title-group center text-center"
          style={{ maxWidth: '800px', margin: '0 auto 5rem auto' }}
        >
          <span className="editorial-tag">Simple Process</span>
          <h2 className="editorial-title">
            From Discovery to<br />
            <em>Assured Returns</em>
          </h2>
          <p
            className="section-desc"
            style={{ color: '#666666', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}
          >
            Explore curated investment opportunities backed by structured returns. Every property is
            evaluated for ROI, lease structure, and long-term value before it reaches you.
          </p>
        </div>

        {/* Timeline Steps Track */}
        <div className="timeline-track-wrap">
          <div className="timeline-grid">
            {steps.map((step) => (
              <div key={step.num} className="timeline-node" id={`step-${step.num}`}>
                <div className="timeline-num">{step.num}</div>
                <h3 className="timeline-node-title">{step.title}</h3>
                <p className="timeline-node-desc">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
