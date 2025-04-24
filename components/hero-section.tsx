"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import ParticleBackground from "@/components/particle-background";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToHowItWorks = () => {
    const element = document.getElementById("how-it-works");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    // Set initial state for animation elements
    const animateElements =
      containerRef.current?.querySelectorAll(".animate-on-scroll");
    animateElements?.forEach((el) => {
      el.classList.add("opacity-0", "translate-y-4");
    });

    // Create the observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // When element is visible, add the animation class and remove the initial state
            entry.target.classList.remove("opacity-0", "translate-y-4");
            entry.target.classList.add("opacity-100", "translate-y-0");
            // Once the animation is complete, we don't need to observe it anymore
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    // Start observing elements
    animateElements?.forEach((el) => observer.observe(el));

    return () => {
      animateElements?.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <ParticleBackground />

      <div
        ref={containerRef}
        className="container mx-auto px-4 md:px-6 py-12 md:py-24 lg:py-32 relative z-10"
      >
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Logo/Title */}
          <div className="mb-6">
            <div className="inline-flex items-center justify-center">
              <div className="relative w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl rotate-12 shadow-lg">
                <div className="absolute inset-1 bg-black rounded-xl flex items-center justify-center">
                  <span className="text-2xl md:text-3xl font-bold text-white">
                    S
                  </span>
                </div>
              </div>
              <h2 className="ml-4 text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-blue-500 bg-clip-text text-transparent">
                SmartDesk
              </h2>
            </div>
          </div>

          <h1 className="animate-on-scroll transition-all duration-700 delay-100 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-r from-blue-400 via-purple-400 to-blue-500 bg-clip-text text-transparent">
            Revolutionize Your IT Support Experience
          </h1>

          <p className="animate-on-scroll transition-all duration-700 delay-300 text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
            Effortless ticket submission and resolution with SmartDesk.
          </p>

          <div className="animate-on-scroll transition-all duration-700 delay-500 flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/submit">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full px-8 h-14 text-lg shadow-glow"
              >
                Submit a Request <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>

            <Button
              variant="outline"
              size="lg"
              onClick={scrollToHowItWorks}
              className="border-gray-700 text-primary font-bold hover:bg-gray-800/50 rounded-full px-8 h-14 text-lg backdrop-blur-sm"
            >
              How It Works
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center">
          <div className="w-1 h-2 bg-white/50 rounded-full mt-1 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}
