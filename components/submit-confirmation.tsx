"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import Footer from "@/components/footer"

export default function SubmitConfirmation() {
  const router = useRouter()
  const [countdown, setCountdown] = useState(3)
  const [showConfetti, setShowConfetti] = useState(true)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          // Navigate programmatically
          router.push("/")
        }
        return prev - 1
      })
    }, 1000)

    // Hide confetti after 2.5 seconds
    const confettiTimer = setTimeout(() => {
      setShowConfetti(false)
    }, 2500)

    return () => {
      clearInterval(timer)
      clearTimeout(confettiTimer)
    }
  }, [router])

  const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <div className="flex-grow flex items-center justify-center p-4 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-green-500/10 rounded-full filter blur-[100px]"></div>
        </div>

        {/* Confetti animation */}
        {showConfetti && (
          <div className="absolute inset-0 z-0 overflow-hidden">
            {[...Array(30)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-confetti"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `-5%`,
                  width: `${Math.random() * 10 + 5}px`,
                  height: `${Math.random() * 10 + 5}px`,
                  background: `${["#4f46e5", "#8b5cf6", "#06b6d4", "#10b981", "#3b82f6"][Math.floor(Math.random() * 5)]}`,
                  borderRadius: `${Math.random() > 0.5 ? "50%" : "0"}`,
                  transform: `rotate(${Math.random() * 360}deg)`,
                  animationDuration: `${Math.random() * 3 + 2}s`,
                  animationDelay: `${Math.random() * 2}s`,
                }}
              />
            ))}
          </div>
        )}

        <div className="max-w-md w-full text-center space-y-6 bg-gray-900/70 p-8 rounded-xl border border-gray-800 shadow-2xl backdrop-blur-md gradient-border relative z-10">
          <div className="mx-auto w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center">
            <CheckCircle className="h-12 w-12 text-green-500" />
          </div>

          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            Request Submitted!
          </h1>

          <p className="text-gray-300">
            Thank you for your submission. Our team will review your request and get back to you shortly.
          </p>

          <div className="pt-4">
            <p className="text-sm text-gray-500 mb-4">Redirecting to home in {countdown} seconds...</p>

            <Button
              onClick={handleHomeClick}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 h-12 shadow-glow"
            >
              Return to Home
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}
