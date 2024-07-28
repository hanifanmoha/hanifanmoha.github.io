import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import './globals.css'
import 'github-markdown-css/github-markdown-dark.css'
import GoogleAnalytics from '@/components/GoogleAnalytics'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Mohamad Hanifan',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <GoogleAnalytics />
        <main className='main-container'>{children}</main>
      </body>
    </html>
  )
}
