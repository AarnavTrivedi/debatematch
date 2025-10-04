"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Spotlight from "@/components/Marketing/Spotlight";
import Mission from "@/components/Marketing/Mission";
import Footer from "@/components/Marketing/Footer";

export default function MissionPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="relative min-h-screen bg-white">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-50/50 via-green-50/30 to-cyan-50/40" />
      <div className="fixed inset-0 notebook-lines opacity-30" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100/20 via-transparent to-green-100/20" />
      
      <Spotlight />
      
      {/* Same Header Structure as Main Page */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/90 backdrop-blur-xl border-b border-gray-200/50"
            : "bg-white/50 backdrop-blur-sm"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <span className="text-xl font-black text-gray-900 tracking-tight">
                <span className="text-green-600">prep</span><span className="text-blue-600">sy :)</span>
              </span>
            </Link>

            {/* Minimal Navigation - Just Home and Mission */}
            <nav className="hidden md:flex items-center gap-8">
              <Link
                href="/"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 hover:scale-[1.02] transform"
              >
                Home
              </Link>
              <span className="text-blue-600 font-medium border-b-2 border-blue-600 pb-1">
                Mission
              </span>
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-4">
              <Link
                href="/dashboard/home"
                className="inline-flex items-center justify-center px-5 py-2 text-sm font-bold text-white bg-green-600 hover:bg-green-700 rounded-xl shadow-[0_4px_0_0_rgba(22,101,52,0.8)] hover:shadow-green-500/25 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5"
              >
                get started
              </Link>
            </div>

            {/* Mobile Menu - Simple */}
            <div className="md:hidden flex items-center gap-4">
              <Link
                href="/"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
              >
                Home
              </Link>
              <span className="text-blue-600 font-medium border-b-2 border-blue-600 pb-1">
                Mission
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Mission Content */}
      <div className="relative z-10 pt-16">
        <Mission />
      </div>
      
      {/* Footer */}
      <div className="relative z-10">
        <Footer />
      </div>
    </main>
  );
}
