'use client'

import React, { useEffect, useCallback } from 'react'

export interface PropertyOverviewModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  titleAccent?: string
  tag?: string
  paragraphs: string[]
  highlights?: string[]
}

export function PropertyOverviewModal({
  isOpen,
  onClose,
  title,
  titleAccent,
  tag = 'Project Overview',
  paragraphs,
  highlights = [],
}: PropertyOverviewModalProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    },
    [onClose]
  )

  useEffect(() => {
    if (!isOpen) return

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, handleKeyDown])

  if (!isOpen) return null

  return (
    <div
      className="pd2-overview-overlay active"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="overview-modal-title"
    >
      <div
        className="pd2-overview-modal-box"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="pd2-overview-modal-header">
          <div className="pd2-overview-modal-tag">{tag}</div>
          <h2 id="overview-modal-title" className="pd2-overview-modal-title">
            {title} {titleAccent && <em>{titleAccent}</em>}
          </h2>
          <button
            type="button"
            className="pd2-overview-modal-close"
            onClick={onClose}
            aria-label="Close overview modal"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="pd2-overview-modal-body">
          {paragraphs.map((para, idx) => (
            <p key={idx} className="pd2-overview-modal-p">
              {para}
            </p>
          ))}

          {highlights.length > 0 && (
            <div className="pd2-overview-highlights-wrap">
              <div className="pd2-overview-highlights-title">Key Project Highlights</div>
              <div className="pd2-overview-highlights-grid">
                {highlights.map((hl, idx) => (
                  <div key={idx} className="pd2-overview-hl-item">
                    <svg
                      className="pd2-overview-hl-icon"
                      viewBox="0 0 24 24"
                      width="18"
                      height="18"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                    <span>{hl}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="pd2-overview-modal-footer">
          <a
            href="#enquire"
            className="pd2-overview-cta"
            onClick={onClose}
          >
            Register Interest
            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
              <path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}
