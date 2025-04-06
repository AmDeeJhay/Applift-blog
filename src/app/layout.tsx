import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import type React from "react"
import { JSX } from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "APPLIFT - Our Blogs",
  description: "Discover the latest insights and articles from APPLIFT",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>): JSX.Element {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

