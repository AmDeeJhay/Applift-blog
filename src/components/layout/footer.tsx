"use client"
import Link from "next/link"
import { Phone, Mail, Linkedin, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-gray-200">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          {/* Logo */}
          <div className="mb-6 md:mb-0">
            <Link href="/" className="flex items-center">
              <div className="relative w-16 h-16 bg-blue-600 rounded-md flex items-center justify-center">
                <span className="text-white text-2xl font-bold">A</span>
              </div>
              <span className="ml-2 font-bold text-xl text-blue-600">APPLIFT</span>
            </Link>
          </div>

          {/* Contact CTA */}
          <div className="text-right">
            <p className="text-sm text-gray-600 mb-1">Want to grab a virtual Coffee and Talk about your Project?</p>
            <h3 className="text-3xl font-bold">Reach out To Us</h3>
          </div>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center py-4">
          <div className="flex items-center mb-4 md:mb-0">
            <Phone size={18} className="text-gray-600 mr-2" />
            <div>
              <p className="text-sm">+234 234 674 908</p>
              <p className="text-sm">+234 564 674 905</p>
            </div>
          </div>

          <div className="flex items-center mb-4 md:mb-0">
            <Mail size={18} className="text-gray-600 mr-2" />
            <p className="text-sm">Applift.org@gmail.com</p>
          </div>

          <div className="flex items-center mb-4 md:mb-0">
            <Linkedin size={18} className="text-gray-600 mr-2" />
            <p className="text-sm">Applift Technologies Limited</p>
          </div>

          <div className="flex items-center">
            <Twitter size={18} className="text-gray-600 mr-2" />
            <p className="text-sm">Applift Technology Lmtd</p>
          </div>
        </div>

        <div className="border-t border-gray-200 my-6"></div>

        {/* Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 hover:text-gray-900 text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/who-we-are" className="text-gray-600 hover:text-gray-900 text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-gray-600 hover:text-gray-900 text-sm">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/our-people" className="text-gray-600 hover:text-gray-900 text-sm">
                  Our People
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="text-gray-600 hover:text-gray-900 text-sm">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="text-gray-600 hover:text-gray-900 text-sm">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Services</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/services/frontend" className="text-gray-600 hover:text-gray-900 text-sm">
                  Frontend Web Development
                </Link>
              </li>
              <li>
                <Link href="/services/backend" className="text-gray-600 hover:text-gray-900 text-sm">
                  Backend Web Development
                </Link>
              </li>
              <li>
                <Link href="/services/ui-ux" className="text-gray-600 hover:text-gray-900 text-sm">
                  UI/UX Designs
                </Link>
              </li>
              <li>
                <Link href="/services/product-design" className="text-gray-600 hover:text-gray-900 text-sm">
                  Product Design
                </Link>
              </li>
              <li>
                <Link href="/services/product-launch" className="text-gray-600 hover:text-gray-900 text-sm">
                  Product Launch
                </Link>
              </li>
              <li>
                <Link href="/services/full-cycle" className="text-gray-600 hover:text-gray-900 text-sm">
                  Full Cycle Software Development
                </Link>
              </li>
              <li>
                <Link href="/services/ui-audit" className="text-gray-600 hover:text-gray-900 text-sm">
                  User Interface Audit
                </Link>
              </li>
              <li>
                <Link href="/services/uraas" className="text-gray-600 hover:text-gray-900 text-sm">
                  User Research as a Service (URAAS)
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-gray-900 text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-600 hover:text-gray-900 text-sm">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-gray-600 hover:text-gray-900 text-sm">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="text-gray-600 hover:text-gray-900 text-sm">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex items-center justify-end space-x-4">
            <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                  fill="white"
                />
              </svg>
            </div>
            <div className="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L4 7.4V16.6L12 22L20 16.6V7.4L12 2Z" fill="white" />
                <path d="M12 15L8 9H16L12 15Z" fill="#FFD700" />
              </svg>
            </div>
            <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                  fill="white"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
