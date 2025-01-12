'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-6 max-w-4xl mx-auto"
      >
        {/* 主标语 */}
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-extralight tracking-tight">
          <span className="block text-white/90">
            Enable Human Focus
          </span>
          <span className="block text-white/80">
            on Exploration
          </span>
        </h1>

        {/* 副标语 */}
        <p className="text-xl md:text-2xl text-white/60 font-light max-w-2xl mx-auto leading-relaxed">
        Don&apos;t need to care about the planning and execution of the path. & Know same as the best of the race knowsn
        </p>

        {/* CTA按钮组 */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
          <Link 
            href="/research"
            className="group relative px-8 py-4 rounded-full bg-white/[0.05] border border-white/10 
              hover:bg-white/[0.1] transition-all duration-300"
          >
            <span className="relative z-10 text-white/90 font-light">
              Explore Research
            </span>
            <div className="absolute inset-0 rounded-full bg-white/5 
              opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
          </Link>

          <Link 
            href="/products"
            className="group relative px-8 py-4 rounded-full bg-white/10
              hover:bg-white/15 transition-all duration-300"
          >
            <span className="relative z-10 text-white font-light">
              View Products
            </span>
          </Link>
        </div>
      </motion.div>

      {/* 向下滚动指示器 */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-white/40 text-sm">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-5 h-5"
          >
            <svg 
              className="text-white/40" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M19 14l-7 7m0 0l-7-7m7 7V3" 
              />
            </svg>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
} 