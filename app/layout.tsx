import "./globals.css"
import { Inter } from "next/font/google"
import Link from "next/link"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Hi from hanifanmoha!",
  description: "To test the limit and breakthrough",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white`}>
        {children}
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

