import "./globals.css"
import { Inter } from "next/font/google"
import Link from "next/link"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Hi from hanifanmoha!",
  description: "A showcase of my work and thoughts",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white`}>
        <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm z-50 border-b border-gray-200">
          <nav className="max-w-screen-xl mx-auto px-6">
            <div className="flex h-14 items-center justify-between">
              <div className="flex items-center gap-8">
                <Link href="/" className="flex items-center">
                  <span className="text-lg font-bold text-gray-800">Portfolio</span>
                </Link>
                <div className="flex items-center gap-6">
                  <Link href="/" className="text-sm text-gray-600 hover:text-gray-900">
                    About
                  </Link>
                  <Link href="/projects" className="text-sm text-gray-600 hover:text-gray-900">
                    Projects
                  </Link>
                  <Link href="/blog" className="text-sm text-gray-600 hover:text-gray-900">
                    Blog
                  </Link>
                </div>
              </div>
            </div>
          </nav>
        </header>
        <main className="max-w-screen-xl mx-auto px-6 pt-24 pb-16">{children}</main>
        <footer className="border-t border-gray-200">
          <div className="max-w-screen-xl mx-auto px-6 py-4">
            <p className="text-center text-sm text-gray-500 flex items-center justify-center gap-1.5">
              © 2024. Built using
              <svg
                fill="currentColor"
                viewBox="0 0 40 20"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="h-5 w-8"
              >
                <path d="M23.3919 0H32.9188C36.7819 0 39.9136 3.13165 39.9136 6.99475V16.0805H36.0006V6.99475C36.0006 6.90167 35.9969 6.80925 35.9898 6.71766L26.4628 16.079C26.4949 16.08 26.5272 16.0805 26.5595 16.0805H36.0006V19.7762H26.5595C22.6964 19.7762 19.4788 16.6139 19.4788 12.7508V3.68923H23.3919V0Z"></path>
                <path d="M13.7688 19.0956L0 3.68759H5.53933L13.6231 12.7337V3.68759H17.7535V17.5746C17.7535 19.6705 15.1654 20.6584 13.7688 19.0956Z"></path>
              </svg>
              and Vercel
              <svg className="h-5 w-5" viewBox="0 0 76 65" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" fill="currentColor" />
              </svg>
            </p>
          </div>
        </footer>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-3XK3Y21QCP" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-3XK3Y21QCP');
          `}
        </Script>
      </body>
    </html>
  )
}

