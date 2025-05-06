import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import type React from "react"
import { JSX } from "react"
import { BlogProvider } from "./context/blogsContext"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Applift - Our Blogs",
  description: "Discover the latest insights and articles from APPLIFT",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>): JSX.Element {
  return (
    <html lang="en">
      <body className={inter.className}>
        <BlogProvider>
          {children}
        </BlogProvider>
      </body>
    </html>
  )
}
