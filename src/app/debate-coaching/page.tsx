"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { CursorProvider } from "@/components/ui/interactive-cursor";
import { EnhancedHeader } from "@/components/ui/enhanced-header";
import { GenerationalHero } from "@/components/ui/generational-hero";
import { InteractiveButton } from "@/components/ui/interactive-button";
import { GlassCard } from "@/components/ui/glass-card";
import { Star, Trophy, Users, Award, Target, Zap } from "lucide-react";

const DebateCoachingPage = () => {
  return (
    <CursorProvider>
      <div className="min-h-screen">
        {/* Enhanced Header */}
        <EnhancedHeader />

        {/* Generational Hero Section */}
        <GenerationalHero />

      {/* Enhanced Programs Section */}
      <section className="relative py-24 bg-gradient-to-br from-slate-50 via-white to-purple-50/30 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-10 right-10 w-64 h-64 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"
            animate={{
              y: [0, -30, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Transform Your Debate Journey
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Choose from our world-class coaching programs designed to take you from beginner to champion
            </p>
          </motion.div>

          {/* Programs Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: <Target className="w-8 h-8" />,
                title: "Debate Fundamentals",
                description: "Build strong foundations with expert guidance tailored for beginners",
                features: ["Core argument structure", "Research techniques", "Speaking confidence", "Tournament basics"],
                color: "from-blue-500 to-cyan-500"
              },
              {
                icon: <Trophy className="w-8 h-8" />,
                title: "Circuit Prep",
                description: "Compete at regional and national tournaments with advanced strategies",
                features: ["Advanced case writing", "Cross-examination mastery", "Tournament strategy", "Performance analysis"],
                color: "from-purple-500 to-pink-500"
              },
              {
                icon: <Award className="w-8 h-8" />,
                title: "Elite Championship",
                description: "Reach the pinnacle of debate - TOC and National Championships",
                features: ["Elite-level coaching", "1-on-1 mentorship", "Tournament circuit", "Scholarship guidance"],
                color: "from-emerald-500 to-teal-500"
              }
            ].map((program, index) => (
              <motion.div
                key={program.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <GlassCard className="p-8 h-full" glow>
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${program.color} flex items-center justify-center text-white mb-6 shadow-lg`}>
                    {program.icon}
              </div>
              
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {program.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {program.description}
                  </p>
                  
                  <ul className="space-y-3 mb-8">
                    {program.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-gray-700">
                        <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <InteractiveButton 
                    variant="primary" 
                    size="md" 
                    href="#programs"
                    className="w-full justify-center"
                  >
                    Learn More
                  </InteractiveButton>
                </GlassCard>
              </motion.div>
            ))}
                  </div>

          {/* Main CTA Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <GlassCard className="p-12 text-center" glow>
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center shadow-2xl">
                  <Zap className="w-10 h-10 text-white" />
                </div>
              </div>

              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Ready to Dominate Debate?
              </h3>
              
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                Join hundreds of students who've transformed their debate careers with our proven coaching methods. 
                From tournament wins to college scholarships - we'll help you achieve your goals.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <InteractiveButton 
                  variant="primary" 
                  size="lg" 
                  href="#programs"
                  shimmer
                >
                  Start Your Journey
                </InteractiveButton>
                <InteractiveButton 
                  variant="secondary" 
                  size="lg" 
                  href="#consultation"
                >
                  Book Consultation
                </InteractiveButton>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="relative py-24 bg-white overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            className="absolute bottom-10 left-10 w-80 h-80 bg-gradient-to-r from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl"
            animate={{
              x: [0, 30, 0],
              y: [0, -20, 0]
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              How DebateMatch Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              From first connection to championship success - here's how we transform debate careers
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                step: "01",
                title: "Match & Connect",
                description: "Our AI-powered matching system connects you with the perfect coach or student based on goals, experience, and learning style.",
                icon: <Users className="w-8 h-8" />
              },
              {
                step: "02", 
                title: "Personalized Training",
                description: "Work with expert coaches using proven methodologies. Track progress, analyze performance, and refine strategies.",
                icon: <Target className="w-8 h-8" />
              },
              {
                step: "03",
                title: "Achieve Success",
                description: "Win tournaments, earn scholarships, and gain admission to top colleges. Join our community of champions.",
                icon: <Trophy className="w-8 h-8" />
              }
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="relative mb-8">
                  <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white shadow-2xl">
                    {item.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg">
                    {item.step}
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {item.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Consultation Section */}
      <section id="consultation" className="relative py-24 bg-gradient-to-br from-blue-50 via-white to-purple-50/30 overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Get Your Personalized Plan
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Schedule a free consultation to create a coaching plan tailored specifically to your goals and ambitions
            </p>
          </motion.div>

          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <GlassCard className="p-10 text-center" glow>
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center shadow-2xl">
                    <Users className="w-8 h-8 text-white" />
                  </div>
          </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Free Consultation
                </h3>
                
                <div className="mb-6">
                  <span className="text-5xl font-bold text-gray-900">$0</span>
                  <span className="text-gray-600 ml-2">USD</span>
              </div>
                
                <div className="space-y-4 text-left text-gray-700 mb-8">
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span>Personalized coaching strategy based on your goals</span>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span>Expert assessment of your current skill level</span>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span>Custom program recommendations and pricing</span>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span>Q&A session with our expert team</span>
                  </div>
              </div>

                <InteractiveButton 
                  variant="primary" 
                  size="lg" 
                href="/pricing"
                  className="w-full justify-center"
                  shimmer
                >
                  Book Your Free Call
                </InteractiveButton>
              </GlassCard>
            </motion.div>
          </div>

        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold">DM</span>
                </div>
                <span className="text-2xl font-black">DebateMatch</span>
              </div>
              <p className="text-gray-300 leading-relaxed mb-6 max-w-md">
                The ultimate debate marketplace connecting students, coaches, and judges. 
                Transform your debate journey with world-class coaching and proven results.
              </p>
              <div className="flex space-x-4">
                <InteractiveButton variant="primary" size="sm" href="/get-started">
                  Get Started
                </InteractiveButton>
                <InteractiveButton variant="ghost" size="sm" href="/research-guide">
                  Free Resources
                </InteractiveButton>
              </div>
            </div>
            
            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <div className="space-y-3">
                <Link href="/students" className="block text-gray-300 hover:text-white transition-colors">For Students</Link>
                <Link href="/coaches" className="block text-gray-300 hover:text-white transition-colors">For Coaches</Link>
                <Link href="/judges" className="block text-gray-300 hover:text-white transition-colors">For Judges</Link>
                <Link href="#how-it-works" className="block text-gray-300 hover:text-white transition-colors">How It Works</Link>
              </div>
            </div>
            
            {/* Support */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <div className="space-y-3">
                <Link href="/pricing" className="block text-gray-300 hover:text-white transition-colors">Pricing</Link>
                <Link href="/terms" className="block text-gray-300 hover:text-white transition-colors">Terms</Link>
                <Link href="/privacy" className="block text-gray-300 hover:text-white transition-colors">Privacy</Link>
                <div className="text-gray-300">
                  <p>support@debatematch.com</p>
                  <p>+1 (555) 123-4567</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">
                © 2024 DebateMatch. All rights reserved. Built by champions, for champions.
              </p>
              <div className="flex items-center space-x-6 mt-4 md:mt-0">
                <span className="text-gray-400 text-sm">Made with ❤️ for the debate community</span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Sticky CTA */}
      <motion.div 
        className="fixed bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-xl border-t border-gray-200/50 shadow-2xl lg:hidden z-50"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, delay: 2 }}
      >
        <InteractiveButton 
          variant="primary" 
          size="lg"
          href="/get-started"
          className="w-full justify-center text-lg py-4"
          shimmer
        >
          Start Your Debate Journey
        </InteractiveButton>
      </motion.div>
    </div>
    </CursorProvider>
  );
};

export default DebateCoachingPage;