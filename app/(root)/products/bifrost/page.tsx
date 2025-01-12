'use client';

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function BifrostPage() {
  return (
    <div className="min-h-screen relative">
      {/* 背景效果 */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[120px]"></div>
        <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[120px]"></div>
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-full h-[800px] bg-gradient-to-b from-emerald-500/3 via-amber-500/3 to-transparent blur-[100px]"></div>
      </div>

      <section className="relative pt-32 lg:pt-40 pb-20 lg:pb-24">
        {/* Hero Section */}
        <div className="container mx-auto px-4 mb-32">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h1 className="text-6xl lg:text-8xl font-bold tracking-tight mb-8">
                <span className="block text-white mb-2">
                  Bifrost
                </span>
                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-amber-400 to-emerald-400">
                  Deep Alignment
                </span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-white/60 font-light max-w-3xl mx-auto mb-12">
                Bifrost transcends traditional translation by aligning phonetic languages at a deep structural level.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                {[
                  { text: 'Phonetic Language', icon: '🔤' },
                  { text: 'State Transformation', icon: '🔄' },
                  { text: 'Recursive Structure', icon: '🔁' }
                ].map((tag, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative group"
                  >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/20 to-amber-500/20 
                      rounded-full blur opacity-0 group-hover:opacity-100 transition duration-300">
                    </div>
                    <div className="relative px-6 py-3 rounded-full bg-black/30 backdrop-blur-sm 
                      border border-white/[0.08] hover:border-white/20 transition-colors">
                      <span className="flex items-center gap-3 text-white/90 text-base font-medium">
                        <span className="text-xl">{tag.icon}</span>
                        <span>{tag.text}</span>
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Button 
                  className="w-full sm:w-auto px-8 py-6 rounded-2xl bg-gradient-to-r from-emerald-500/90 to-amber-500/90 
                    text-white text-lg font-medium
                    hover:from-emerald-600/90 hover:to-amber-600/90
                    transition-all duration-300 hover:scale-[1.02]
                    shadow-lg shadow-emerald-500/10"
                >
                  Join Waiting List
                </Button>
                <a 
                  href="https://github.com/your-repo" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white/60 hover:text-white/90 transition-colors"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" clipRule="evenodd" />
                  </svg>
                  <span>Star on GitHub</span>
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Features Section */}
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Phonetic Language",
                  description: "State transformation in any phonetic language",
                  icon: "🔤",
                  gradient: "from-emerald-500/10 to-amber-500/10"
                },
                {
                  title: "State Transformation",
                  description: "Transform states with operations to achieve new language states",
                  icon: "🔄",
                  gradient: "from-amber-500/10 to-emerald-500/10"
                },
                {
                  title: "Recursive Structure",
                  description: "Recursive modification of states and operations",
                  icon: "🔁",
                  gradient: "from-emerald-500/10 to-amber-500/10"
                },
                {
                  title: "Formal Description",
                  description: "Formalize language structures with category theory",
                  icon: "📚",
                  gradient: "from-amber-500/10 to-emerald-500/10"
                },
                {
                  title: "Universal Proof",
                  description: "Prove universality through state transformation and recursion",
                  icon: "🌐",
                  gradient: "from-emerald-500/10 to-amber-500/10"
                },
                {
                  title: "Homomorphic Mapping",
                  description: "Construct homomorphic mappings between different languages",
                  icon: "🔗",
                  gradient: "from-amber-500/10 to-emerald-500/10"
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative group h-full"
                >
                  <div className={`absolute -inset-0.5 bg-gradient-to-r ${feature.gradient} rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-300`}></div>
                  <div className="relative h-full p-8 bg-[#1a1a1a]/80 backdrop-blur-xl rounded-xl border border-white/5">
                    <div className="flex flex-col h-full">
                      <span className="text-4xl mb-6">{feature.icon}</span>
                      <h3 className="text-xl font-medium text-white mb-4">{feature.title}</h3>
                      <p className="text-white/60 text-base leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 