"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useMobile } from "@/hooks/use-mobile"

export default function Navbar() {
  const pathname = usePathname()
  const isMobile = useMobile()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/80 backdrop-blur-md py-3 shadow-lg" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <span className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            SmartDesk
          </span>
        </Link>

        {isMobile ? (
          <>
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>

            {isMenuOpen && (
              <div className="fixed inset-0 top-16 bg-black/95 backdrop-blur-md z-40 flex flex-col items-center pt-10">
                <nav className="flex flex-col items-center space-y-6 text-lg">
                  <Link
                    href="/"
                    className={`text-gray-300 hover:text-white transition-colors ${
                      pathname === "/" ? "text-white font-medium" : ""
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Home
                  </Link>
                  <button
                    onClick={() => scrollToSection("how-it-works")}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    How It Works
                  </button>
                  <Link
                    href="/submit"
                    className={`text-gray-300 hover:text-white transition-colors ${
                      pathname === "/submit" ? "text-white font-medium" : ""
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Submit a Request
                  </Link>
                </nav>
              </div>
            )}
          </>
        ) : (
          <nav className="flex items-center space-x-8">
            <Link
              href="/"
              className={`text-gray-300 hover:text-white transition-colors ${
                pathname === "/" ? "text-white font-medium" : ""
              }`}
            >
              Home
            </Link>
            <button
              onClick={() => scrollToSection("how-it-works")}
              className="text-gray-300 hover:text-white transition-colors"
            >
              How It Works
            </button>
            <Link
              href="/submit"
              className={`bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-full transition-colors ${
                pathname === "/submit" ? "font-medium" : ""
              }`}
            >
              Submit a Request
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}
