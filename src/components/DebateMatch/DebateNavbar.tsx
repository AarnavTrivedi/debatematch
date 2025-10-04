"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function DebateNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const smoothScrollTo = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      const headerHeight = 80; // Account for fixed header
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setMobileMenuOpen(false);
  };

  const smoothScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-xl border-b border-gray-200"
          : "bg-white/90 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button onClick={smoothScrollToTop} className="flex items-center gap-3 group">
            <span className="text-xl font-black tracking-tight">
              <span className="text-[#01459f]">Debate</span><span className="text-gray-900">match</span>
            </span>
          </button>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/students"
              className="text-gray-600 hover:text-blue-500 font-medium transition-colors duration-200"
            >
              For Students
            </Link>
            <Link
              href="/coaches"
              className="text-gray-600 hover:text-blue-500 font-medium transition-colors duration-200"
            >
              For Coaches
            </Link>
            <Link
              href="/judges"
              className="text-gray-600 hover:text-blue-500 font-medium transition-colors duration-200"
            >
              For Judges
            </Link>
            <button
              onClick={() => smoothScrollTo('how-it-works')}
              className="text-gray-600 hover:text-blue-500 font-medium transition-colors duration-200"
            >
              How It Works
            </button>
            <button
              onClick={() => smoothScrollTo('pricing')}
              className="text-gray-600 hover:text-blue-500 font-medium transition-colors duration-200"
            >
              Pricing
            </button>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/login"
              className="text-gray-600 hover:text-blue-500 font-medium transition-colors duration-200"
            >
              Login
            </Link>
            <Link
              href="/get-started"
              className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-bold text-white bg-blue-500 hover:bg-blue-600 rounded-xl transition-colors duration-200"
            >
              Get Started
            </Link>
          </div>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden relative w-6 h-6 text-gray-600 focus:outline-none"
            aria-label="Toggle menu"
          >
            <span
              className={`absolute left-0 top-0 w-6 h-0.5 bg-gray-600 transform transition-all duration-300 ${
                mobileMenuOpen ? "rotate-45 translate-y-2.5" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-2.5 w-6 h-0.5 bg-gray-600 transition-all duration-300 ${
                mobileMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-5 w-6 h-0.5 bg-gray-600 transform transition-all duration-300 ${
                mobileMenuOpen ? "-rotate-45 -translate-y-2.5" : ""
              }`}
            />
          </button>
        </div>

        <div
          className={`md:hidden transition-all duration-300 overflow-hidden ${
            mobileMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="py-4 space-y-4 border-t border-gray-200 bg-white/95 backdrop-blur-sm rounded-b-lg">
            <button
              onClick={() => smoothScrollTo('features')}
              className="block w-full text-left text-gray-600 hover:text-blue-500 font-medium transition-colors duration-200"
            >
              Coaching Features
            </button>
            <button
              onClick={() => smoothScrollTo('demo')}
              className="block w-full text-left text-gray-600 hover:text-blue-500 font-medium transition-colors duration-200"
            >
              Live Demo
            </button>
            <button
              onClick={() => smoothScrollTo('testimonials')}
              className="block w-full text-left text-gray-600 hover:text-blue-500 font-medium transition-colors duration-200"
            >
              Success Stories
            </button>
            <button
              onClick={() => smoothScrollTo('pricing')}
              className="block w-full text-left text-gray-600 hover:text-blue-500 font-medium transition-colors duration-200"
            >
              Coaching Plans
            </button>
            <Link
              href="/coaches"
              className="block text-gray-600 hover:text-blue-500 font-medium transition-colors duration-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              Become a Coach
            </Link>
            <div className="pt-4 border-t border-gray-200 space-y-3 px-4">
              <Link
                href="/login"
                className="block text-gray-600 hover:text-blue-500 font-medium transition-colors duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign In
              </Link>
              <Link
                href="/get-started"
                className="block w-full text-center px-6 py-3 text-sm font-bold text-white bg-blue-500 hover:bg-blue-600 rounded-xl transition-colors duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                Start Coaching
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
