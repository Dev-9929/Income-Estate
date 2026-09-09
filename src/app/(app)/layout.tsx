import type { Metadata } from 'next'
import '../globals.css'
import '@/styles/income-estate.css'
import { CinematicIntro } from '@/components/layout/CinematicIntro'

export const metadata: Metadata = {
  title: 'Income Estate - Fractional Resort Investments & Stable Returns',
  description:
    'Income Estate - Earn high-yield stable monthly returns through curated fractional real estate investments in premium resorts.',
  icons: {
    icon: '/assets/wordpress_media/favicon-income.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif" }}>
        <CinematicIntro />
        {children}
      </body>
    </html>
  )
}

