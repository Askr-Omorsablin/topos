'use client'

import { motion } from 'framer-motion'

const visionCards = [
  {
    title: "Pathless",
    description: "Focus on Goals, Not Paths",
    detail: "The Human can focus on the purpose, and don't need to care about the planning and execution of the path."
  },
  {
    title: "Erudite",
    description: "Knowledge at Your Fingertips",
    detail: "The Human opportunity to stand shoulder to shoulder with the times. Know same as the best of the race knows."
  },
  {
    title: "AI-Driven",
    description: "Intelligent Execution",
    detail: "Let AI handle the complexity of implementation while humans focus on innovation and creativity."
  }
]

export default function VisionSection() {
  return (
    <section className="py-32 relative">
      {/* 背景效果 */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/50 to-black" />
      </div>

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
              Reshaping the Future of Development
            </h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto font-light">
              We believe in a future where human potential is unleashed through the seamless integration of AI and human intelligence.
            </p>
          </motion.div>

          {/* 卡片网格 */}
          <div className="grid md:grid-cols-3 gap-8">
            {visionCards.map((card, index) => (
              <motion.div
                key={card.title}
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
                    <div className="space-y-2">
                      <h3 className="text-2xl font-light text-white/90">{card.title}</h3>
                      <p className="text-lg text-white/60">{card.description}</p>
                    </div>
                    <div className="h-px w-12 bg-white/10" />
                    <p className="text-white/40 font-light leading-relaxed">
                      {card.detail}
                    </p>
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