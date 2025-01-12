'use client'

import Link from 'next/link';
import ButterflyEffect from '@/components/ButterflyEffect';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export default function ProductsPage() {
  console.log('[Page] ProductsPage rendering')
  
  const products = [
    {
      title: "Pathless Lambda",
      description: "Create an API in seconds with non-symbolic implementation cloud service",
      href: "/products/pathless",
      gradient: "from-blue-400 to-purple-400",
      features: [
        "Non-symbolic Implementation",
        "Rapid API Creation",
        "Deep Learning Integration"
      ]
    },
    {
      title: "Plathless Scaffold",
      description: "Next-generation full-stack framework for AI collaboration and rapid prototyping",
      href: "/products/lambda-plathless",
      gradient: "from-blue-400 via-purple-400 to-blue-400",
      features: [
        "Hybrid Development",
        "AI Collaboration",
        "Recursive Architecture"
      ]
    },
    {
      title: "Bifrost",
      description: "Deep alignment system for transcending traditional phonetic language translation",
      href: "/products/bifrost",
      gradient: "from-emerald-400 via-amber-400 to-emerald-400",
      features: [
        "Phonetic Language",
        "State Transformation",
        "Recursive Structure"
      ]
    }
  ];

  return (
    <div className="min-h-screen relative">
      {/* 背景层 */}
      <div className="fixed inset-0 w-full h-full overflow-hidden">
        <div className="absolute inset-0 z-[1]">
          <ButterflyEffect />
        </div>
        <div className="absolute inset-0 backdrop-blur-[100px] bg-black/20 z-[3]" />
      </div>
      
      {/* 内容层 */}
      <div className="relative z-[4]">
        {/* Hero Section */}
        <section className="py-32">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-7xl font-bold tracking-tight mb-8">
                  <span className="block text-white mb-2">
                    Our Products
                  </span>
                  <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400">
                    Build the Future
                  </span>
                </h1>
                
                <p className="text-xl text-white/60 font-light max-w-3xl mx-auto mb-12">
                  Discover our suite of innovative tools designed to revolutionize development workflows and enhance productivity.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Products Grid Section */}
        <section className="py-20 bg-black/30">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
                {products.map((product, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link 
                      href={product.href}
                      className="block p-8 rounded-2xl border border-white/10 
                        hover:bg-white/[0.02] transition-all duration-300
                        backdrop-blur-sm bg-white/[0.01]
                        group"
                    >
                      <h2 className={cn(
                        "text-3xl font-medium mb-4",
                        "bg-clip-text text-transparent",
                        "bg-gradient-to-r",
                        product.gradient
                      )}>
                        {product.title}
                      </h2>
                      <p className="text-white/60 group-hover:text-white/80 transition-colors text-lg mb-6">
                        {product.description}
                      </p>
                      <ul className="space-y-3">
                        {product.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-3 text-white/50 group-hover:text-white/70 transition-colors">
                            <svg className="w-5 h-5 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-32">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-20">
                <h2 className="text-4xl font-medium text-white mb-6">Why Choose Our Products</h2>
                <p className="text-xl text-white/60 max-w-2xl mx-auto">
                  Our products are designed with modern development challenges in mind, offering unique solutions for every need.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    title: "AI-Powered Development",
                    description: "Leverage the power of AI to accelerate your development process and improve code quality.",
                    icon: "🤖"
                  },
                  {
                    title: "Seamless Integration",
                    description: "Easy integration with existing workflows and tools for a smooth development experience.",
                    icon: "🔄"
                  },
                  {
                    title: "Future-Proof Architecture",
                    description: "Built with scalability and maintainability in mind, ready for future challenges.",
                    icon: "🏗️"
                  },
                  {
                    title: "Developer Experience",
                    description: "Intuitive interfaces and comprehensive documentation for the best developer experience.",
                    icon: "💻"
                  },
                  {
                    title: "Community Driven",
                    description: "Active community support and regular updates based on developer feedback.",
                    icon: "👥"
                  },
                  {
                    title: "Enterprise Ready",
                    description: "Production-grade solutions that meet enterprise security and scalability requirements.",
                    icon: "🏢"
                  }
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative group p-8 rounded-2xl border border-white/10 bg-white/[0.01] backdrop-blur-sm"
                  >
                    <span className="text-4xl mb-4 block">{benefit.icon}</span>
                    <h3 className="text-xl font-medium text-white mb-3">{benefit.title}</h3>
                    <p className="text-white/60">{benefit.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-medium text-white mb-6">
                Ready to Transform Your Development Workflow?
              </h2>
              <p className="text-xl text-white/60 mb-12">
                Join thousands of developers who are already building the future with our tools.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <Link 
                  href="/contact"
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 
                    text-white font-medium hover:from-blue-600 hover:to-purple-600 
                    transition-all duration-300 hover:scale-105"
                >
                  Get Started
                </Link>
                <Link
                  href="/documentation"
                  className="px-8 py-4 rounded-xl border border-white/10 text-white/90 
                    hover:bg-white/[0.02] transition-all duration-300"
                >
                  View Documentation
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
} 