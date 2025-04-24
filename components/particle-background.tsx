"use client"

import { useEffect, useRef } from "react"

export default function ParticleBackground() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const particleCount = 20

    // Clear any existing particles
    container.innerHTML = ""

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div")
      particle.classList.add("particle")

      // Random size between 2px and 6px
      const size = Math.random() * 4 + 2
      particle.style.width = `${size}px`
      particle.style.height = `${size}px`

      // Random position
      particle.style.left = `${Math.random() * 100}%`
      particle.style.top = `${Math.random() * 100}%`

      // Random animation delay
      particle.style.animationDelay = `${Math.random() * 8}s`

      container.appendChild(particle)
    }

    return () => {
      container.innerHTML = ""
    }
  }, [])

  return <div ref={containerRef} className="particles" />
}
