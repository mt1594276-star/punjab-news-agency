'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen, Home, Library } from 'lucide-react';
import { Button } from './ui/button';

export function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-amber-900 via-amber-800 to-amber-900 shadow-2xl backdrop-blur-md border-b border-amber-700/50"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="bg-gradient-to-br from-amber-400 to-amber-600 p-2 rounded-lg shadow-lg group-hover:scale-110 transition-transform">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">
                Punjab News Agency
              </h1>
              <p className="text-xs text-amber-200">Your Trusted Source</p>
            </div>
          </Link>

          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 text-white hover:text-amber-200 transition-colors">
              <Home className="w-4 h-4" />
              <span className="hidden md:inline">Home</span>
            </Link>
            <Link href="/magazines" className="flex items-center gap-2 text-white hover:text-amber-200 transition-colors">
              <Library className="w-4 h-4" />
              <span className="hidden md:inline">Magazines</span>
            </Link>
            <Link 
              href="/admin/login" 
              className="flex items-center gap-2 text-white/40 hover:text-white/80 transition-colors"
              title="Settings"
            >
              <span className="text-lg leading-none">⚙</span>
            </Link>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
