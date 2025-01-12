'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const products = [
  {
    title: "Pathless Lambda",
    description: "AI-powered development assistant",
    href: "/products/pathless"
  },
  {
    title: "Plathless Scaffold",
    description: "Serverless development framework",
    href: "/products/lambda-plathless"
  },
  {
    title: "Bifrost",
    description: "Bridge between different tech stacks",
    href: "/products/bifrost"
  }
]

export default function ProductShowcase() {
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
              Our Solutions
            </h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto font-light">
              Discover our innovative products designed to empower developers and businesses.
            </p>
          </motion.div>

          {/* 产品展示网格 */}
          <div className="grid md:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="group relative"
              >
                <Link href={product.href} className="block p-8 bg-white/[0.02] border border-white/10 rounded-2xl 
                  hover:bg-white/[0.03] transition-colors duration-300">
                  <div className="space-y-6">
                    <h3 className="text-2xl font-light text-white/90">{product.title}</h3>
                    <p className="text-lg text-white/60">{product.description}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
} 