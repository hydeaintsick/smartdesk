import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import HeroSection from "@/components/hero-section";
import ProcessAnimation from "@/components/process-animation";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <HeroSection />

      {/* How It Works Section */}
      <section
        id="how-it-works"
        className="py-24 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto relative overflow-hidden"
      >
        {/* Background elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 right-0 w-1/3 h-1/3 bg-blue-600/10 rounded-full filter blur-[100px]"></div>
          <div className="absolute bottom-1/4 left-0 w-1/3 h-1/3 bg-purple-600/10 rounded-full filter blur-[100px]"></div>
        </div>

        <div className="text-center mb-16 relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-cyan-500 to-blue-500 bg-clip-text text-transparent">
            How It Works
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Our streamlined process ensures your IT issues are resolved quickly
            and efficiently
          </p>
        </div>

        <ProcessAnimation />
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to transform your IT support experience?
          </h2>
          <p className="text-gray-400 mb-8 text-lg">
            Join the future of IT support with SmartDesk's AI-enhanced platform.
          </p>
          <Link href="/submit">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full px-8"
            >
              Submit a Request <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
