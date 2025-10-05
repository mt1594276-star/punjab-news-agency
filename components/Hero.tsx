'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import Link from 'next/link';
import { Scene } from './3d/Scene';
import { FloatingElements } from './3d/FloatingElements';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-amber-300/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-orange-300/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <FloatingElements />
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-medium"
            >
              <Sparkles className="w-4 h-4" />
              Digital Magazine Platform
            </motion.div>

            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight">
                Welcome to{' '}
                <span className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
                  Punjab News Agency
                </span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Discover the latest news, stories, and insights from Punjab. 
                Access our digital magazine collection anytime, anywhere.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link href="/magazines">
                <Button size="lg" className="gap-2 shadow-xl">
                  Explore Magazines
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/admin">
                <Button size="lg" variant="outline" className="shadow-lg">
                  Upload Content
                </Button>
              </Link>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-3 gap-6 pt-8"
            >
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-4 rounded-xl border border-amber-200">
                <p className="text-3xl font-bold text-amber-600">500+</p>
                <p className="text-sm text-gray-600 mt-1">Magazine Issues</p>
              </div>
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-4 rounded-xl border border-amber-200">
                <p className="text-3xl font-bold text-amber-600">50K+</p>
                <p className="text-sm text-gray-600 mt-1">Active Readers</p>
              </div>
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-4 rounded-xl border border-amber-200">
                <p className="text-3xl font-bold text-amber-600">24/7</p>
                <p className="text-sm text-gray-600 mt-1">Access</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Image/3D Scene */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="h-[600px] relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-amber-200/30 to-orange-200/30 rounded-3xl blur-2xl" />
            <div className="relative h-full rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center">
              {/* Decorative Image/Pattern */}
              <div className="absolute inset-0 opacity-20">
                <svg className="w-full h-full" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
                    </pattern>
                  </defs>
                  <rect width="400" height="400" fill="url(#grid)" className="text-amber-600"/>
                </svg>
              </div>
              
              {/* Magazine Stack Illustration */}
              <div className="relative z-10">
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                    rotateY: [0, 5, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Magazine Stack */}
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="absolute w-64 h-80 bg-gradient-to-br from-amber-600 to-orange-700 rounded-2xl shadow-2xl"
                      style={{
                        transform: `translateZ(${-i * 20}px) translateX(${i * 10}px) translateY(${i * 10}px) rotateZ(${i * 3}deg)`,
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 - i * 0.2 }}
                      transition={{ delay: i * 0.2 }}
                    >
                      <div className="p-6 h-full flex flex-col justify-between">
                        <div>
                          <div className="w-12 h-12 bg-white/20 rounded-lg mb-4" />
                          <div className="space-y-2">
                            <div className="h-3 bg-white/30 rounded w-3/4" />
                            <div className="h-3 bg-white/20 rounded w-1/2" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="h-2 bg-white/20 rounded" />
                          <div className="h-2 bg-white/20 rounded w-5/6" />
                          <div className="h-2 bg-white/20 rounded w-4/6" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
              
              {/* Floating Elements */}
              <motion.div
                className="absolute top-10 right-10 w-16 h-16 bg-amber-400/30 rounded-full blur-xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
              />
              <motion.div
                className="absolute bottom-10 left-10 w-20 h-20 bg-orange-400/30 rounded-full blur-xl"
                animate={{
                  scale: [1.2, 1, 1.2],
                  opacity: [0.6, 0.3, 0.6],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
