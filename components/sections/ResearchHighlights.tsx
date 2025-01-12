'use client'

import { motion } from 'framer-motion'

const researchHighlights = [
  {
    title: "Universe Model",
    description: "Understanding the fundamental mechanics of the universe through deterministic and variational methods."
  },
  {
    title: "Pixel World Model",
    description: "Direct perception and processing of pixel-level information without transformation layers."
  },
  {
    title: "Vector World Model",
    description: "Fundamental architecture for understanding and representing reality through vector spaces."
  }
]

export default function ResearchHighlights() {
  return (
    <section className="py-32 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* 标题部分 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-6 mb-24"
          >
            <h2 className="text-4xl md:text-5xl font-extralight text-white/90">
              Cutting-Edge Research
            </h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto font-light">
              Explore our groundbreaking research that is reshaping the future of technology and human understanding.
            </p>
          </motion.div>

          {/* 研究亮点网格 */}
          <div className="grid md:grid-cols-3 gap-8">
            {researchHighlights.map((highlight, index) => (
              <motion.div
                key={highlight.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="group relative"
              >
                <div className="absolute -inset-0.5 bg-white/10 rounded-2xl opacity-0 group-hover:opacity-100 
                  transition-opacity duration-300 blur" />
                <div className="relative p-8 bg-white/[0.02] border border-white/10 rounded-2xl 
                  hover:bg-white/[0.03] transition-colors duration-300">
                  <div className="space-y-6">
                    <h3 className="text-2xl font-light text-white/90">{highlight.title}</h3>
                    <p className="text-lg text-white/60">{highlight.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
} 