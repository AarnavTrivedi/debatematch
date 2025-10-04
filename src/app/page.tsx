

"use client";

import { useEffect } from "react";
import DebateNavbar from "@/components/DebateMatch/DebateNavbar";
import DebateHero from "@/components/DebateMatch/DebateHero";
import CoachMarketplace from "@/components/DebateMatch/CoachMarketplace";
import SuccessStories from "@/components/DebateMatch/SuccessStories";
import DebateFAQ from "@/components/DebateMatch/DebateFAQ";
import Spotlight from "@/components/Marketing/Spotlight";
import Marquee from "@/components/Marketing/Marquee";
import Footer from "@/components/Marketing/Footer";

export default function LandingPage() {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    
    if (code) {
      console.log('🔄 OAUTH CODE DETECTED: Red  recting to auth callback');
      // Redirect OAuth codes to the proper callback handler
      window.location.href = `/auth/callback${window.location.search}`;
      return;
    }
  }, []);

  return (
    <main className="relative min-h-screen bg-white">
      
      <DebateNavbar />
      <DebateHero />
      <CoachMarketplace />
      <SuccessStories />
      <DebateFAQ />
      <Footer />
    </main>
  );
}
