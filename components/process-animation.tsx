"use client"

import { useEffect, useRef, useState } from "react"
import { CheckCircle, FileText, Lightbulb, MessageSquare, Send, ChevronLeft, ChevronRight } from "lucide-react"

const steps = [
  {
    icon: <FileText className="h-10 w-10 text-blue-400" />,
    title: "Submit Your Request",
    description: "Fill out our intuitive form with your IT issue or request details.",
    number: "01",
  },
  {
    icon: <MessageSquare className="h-10 w-10 text-purple-400" />,
    title: "Qualification",
    description: "Our AI analyzes your request and gathers necessary information.",
    number: "02",
  },
  {
    icon: <Lightbulb className="h-10 w-10 text-cyan-400" />,
    title: "Development",
    description: "Our team works on implementing the solution to your request.",
    number: "03",
  },
  {
    icon: <CheckCircle className="h-10 w-10 text-green-400" />,
    title: "Resolution",
    description: "Your issue is resolved with the optimal solution.",
    number: "04",
  },
  {
    icon: <Send className="h-10 w-10 text-blue-400" />,
    title: "Notification",
    description: "Receive updates throughout the process and final resolution.",
    number: "05",
  },
]

export default function ProcessAnimation() {
  const carouselRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [showControls, setShowControls] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setShowControls(window.innerWidth >= 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const scrollToCard = (index: number) => {
    if (!carouselRef.current) return

    const cards = carouselRef.current.querySelectorAll(".carousel-card")
    if (cards[index]) {
      cards[index].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      })
      setActiveIndex(index)
    }
  }

  const handleScroll = () => {
    if (!carouselRef.current) return

    const cards = carouselRef.current.querySelectorAll(".carousel-card")
    const containerLeft = carouselRef.current.getBoundingClientRect().left
    const containerWidth = carouselRef.current.clientWidth
    const containerCenter = containerLeft + containerWidth / 2

    let closestIndex = 0
    let closestDistance = Number.POSITIVE_INFINITY

    cards.forEach((card, index) => {
      const cardRect = card.getBoundingClientRect()
      const cardCenter = cardRect.left + cardRect.width / 2
      const distance = Math.abs(containerCenter - cardCenter)

      if (distance < closestDistance) {
        closestDistance = distance
        closestIndex = index
      }
    })

    setActiveIndex(closestIndex)
  }

  const scrollPrev = () => {
    if (activeIndex > 0) {
      scrollToCard(activeIndex - 1)
    }
  }

  const scrollNext = () => {
    if (activeIndex < steps.length - 1) {
      scrollToCard(activeIndex + 1)
    }
  }

  return (
    <div className="relative">
      {/* Apple-style carousel */}
      <div
        ref={carouselRef}
        className="carousel-container flex overflow-x-auto py-12 px-4 snap-x snap-mandatory scroll-smooth"
        onScroll={handleScroll}
      >
        {steps.map((step, index) => (
          <div
            key={index}
            className={`carousel-card flex-shrink-0 w-full md:w-[350px] mx-4 p-6 process-card rounded-2xl ${
              activeIndex === index ? "ring-2 ring-blue-500/30" : ""
            }`}
          >
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-start mb-6">
                <div className="icon-container p-4 rounded-xl">{step.icon}</div>
                <span className="step-number text-3xl font-bold">{step.number}</span>
              </div>
              <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {step.title}
              </h3>
              <p className="text-gray-400 flex-grow">{step.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation controls */}
      {showControls && (
        <div className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 flex justify-between px-4 pointer-events-none">
          <button
            onClick={scrollPrev}
            className={`p-3 rounded-full bg-gray-900/80 backdrop-blur-sm border border-gray-800 text-white pointer-events-auto transition-opacity ${
              activeIndex === 0 ? "opacity-50 cursor-not-allowed" : "opacity-100 hover:bg-gray-800"
            }`}
            disabled={activeIndex === 0}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={scrollNext}
            className={`p-3 rounded-full bg-gray-900/80 backdrop-blur-sm border border-gray-800 text-white pointer-events-auto transition-opacity ${
              activeIndex === steps.length - 1 ? "opacity-50 cursor-not-allowed" : "opacity-100 hover:bg-gray-800"
            }`}
            disabled={activeIndex === steps.length - 1}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}

      {/* Indicators */}
      <div className="flex justify-center space-x-2 mt-6">
        {steps.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToCard(index)}
            className={`carousel-indicator h-1.5 rounded-full transition-all ${
              activeIndex === index ? "active" : "w-4 bg-gray-700"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
