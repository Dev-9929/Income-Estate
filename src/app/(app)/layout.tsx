import type { Metadata } from 'next'
import { Proza_Libre } from 'next/font/google'
import '../globals.css'
import '@/styles/income-estate.css'

const prozaLibre = Proza_Libre({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-proza',
  display: 'swap',
})

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
    <html lang="en" className={prozaLibre.variable}>
      <body className={prozaLibre.className} style={{ fontFamily: 'var(--font-proza), sans-serif' }}>
        {children}
      </body>
    </html>
  )
}
