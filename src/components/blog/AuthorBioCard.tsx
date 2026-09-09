import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export interface AuthorProfile {
  name: string
  role: string
  bio: string
  avatarUrl: string
  avatarAlt?: string
  linkedInUrl?: string
  aboutUrl?: string
}

export const defaultBlogAuthor: AuthorProfile = {
  name: 'Aman Duggal',
  role: 'Founder & CEO',
  bio: 'Aman Duggal is the Founder of Income Estate with over 22 years of experience in the Indian real estate industry. He specializes in investment advisory, property evaluation, land acquisition, and income-generating real estate opportunities. Through his insights, he helps investors make informed decisions focused on ROI, passive income, and long-term wealth creation.',
  avatarUrl: '/assets/authors/aman-duggal-avatar.png',
  avatarAlt: 'Aman Duggal - Founder & CEO of Income Estate',
  linkedInUrl: 'https://www.linkedin.com/in/aman-duggal-09886821/',
  aboutUrl: '/about',
}

export interface AuthorBioCardProps {
  author?: Partial<AuthorProfile>
  className?: string
}

export function AuthorBioCard({ author, className = '' }: AuthorBioCardProps) {
  const currentAuthor: AuthorProfile = {
    ...defaultBlogAuthor,
    ...author,
  }

  return (
    <aside
      className={`author-bio-card ${className}`.trim()}
      aria-label={`About ${currentAuthor.name}`}
    >
      <div className="author-avatar-wrap">
        <Image
          src={currentAuthor.avatarUrl}
          alt={currentAuthor.avatarAlt || currentAuthor.name}
          width={132}
          height={132}
          className="author-avatar-img"
          sizes="(max-width: 768px) 110px, 132px"
        />
      </div>

      <div className="author-content">
        <div className="author-header">
          <span className="author-kicker">AUTHOR</span>
          <h3 className="author-name">{currentAuthor.name}</h3>
          <p className="author-role">{currentAuthor.role}</p>
        </div>

        <p className="author-bio">{currentAuthor.bio}</p>

        <div className="author-actions">
          {currentAuthor.linkedInUrl && (
            <a
              href={currentAuthor.linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="author-linkedin-link"
              aria-label={`Connect with ${currentAuthor.name} on LinkedIn`}
            >
              <span className="linkedin-icon-box" aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  width="13"
                  height="13"
                  fill="currentColor"
                >
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.44 1.44 0 1 0-.01-2.88 1.44 1.44 0 0 0 .01 2.88m1.4 9.74v-8.37H5.06v8.37h2.8z" />
                </svg>
              </span>
              <span>Connect on LinkedIn</span>
            </a>
          )}

          {currentAuthor.aboutUrl && (
            <Link
              href={currentAuthor.aboutUrl}
              className="author-secondary-link"
            >
              <span>Our Leadership</span>
              <svg
                viewBox="0 0 24 24"
                width="13"
                height="13"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          )}
        </div>
      </div>
    </aside>
  )
}
