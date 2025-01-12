'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import ResearchOverview from '@/components/sections/ResearchOverview';
import { AnimatedBorderCard } from '@/components/ui/animated-border-card';
import { ResearchCard } from '@/components/ui/research-card';
import { cn } from '@/lib/utils';
 
import image5 from '@/public/5.jpg'
import image6 from '@/public/6.jpg'
import image8 from '@/public/8.jpg'
import image3 from '@/public/3.jpg'
import image10 from '@/public/10.jpg'
import image11 from '@/public/11.jpg'
import image12 from '@/public/12.jpg'

export default function ResearchPage() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const universeScrollRef = useRef<HTMLDivElement>(null);
  const pixelScrollRef = useRef<HTMLDivElement>(null);
  const vectorScrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = (type: string) => {
    const [section, direction] = type.split('-');
    let container;
    
    switch(section) {
      case 'universe':
        container = universeScrollRef.current;
        break;
      case 'pixel':
        container = pixelScrollRef.current;
        break;
      case 'vector':
        container = vectorScrollRef.current;
        break;
      default:
        return;
    }
    
    if (!container) return;
    
    const scrollAmount = 420;
    const scrollTo = direction === 'left'
      ? container.scrollLeft - scrollAmount
      : container.scrollLeft + scrollAmount;
    
    container.scrollTo({
      left: scrollTo,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    return () => {
      const cleanupLeaderLines = () => {
        const elements = document.querySelectorAll('.leader-line, .leader-line-layer');
        elements.forEach(el => el.remove());

        const svgContainer = document.querySelector('body > .leader-line');
        if (svgContainer) {
          svgContainer.remove();
        }
      };

      cleanupLeaderLines();
      setTimeout(cleanupLeaderLines, 100);
    };
  }, []);

  return (
    <div className="min-h-screen research-page">
      <section className="py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col items-center space-y-6 mb-16">
              <h2 className="text-6xl text-white">Researching in</h2>
            </div>

            {/* Research Overview Component */}
            <ResearchOverview />

            {/* Research Mission Section */}
            <div className="mt-32 text-center space-y-16">
              <h3 className="text-4xl font-light text-white/90 tracking-tight">
                We believe our research can finally achieve that
              </h3>
              
              <div className="grid gap-8 md:grid-cols-2">
                <AnimatedBorderCard 
                  highlightColor="rgba(6, 182, 212, 0.15)"
                  className="backdrop-blur-xl backdrop-saturate-150"
                >
                  <div className="flex flex-col gap-6">
                    <div className="flex items-start gap-4">
                      <div className="shrink-0">
                        <div className="relative">
                          <div className="absolute -inset-3 bg-cyan-500/20 rounded-xl blur-lg"></div>
                          <div className="relative rounded-xl bg-gradient-to-b from-cyan-500/20 to-cyan-500/0 p-3">
                            <svg className="h-7 w-7 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <h4 className="text-2xl font-medium text-white">Pathless</h4>
                        <div className="h-px w-12 bg-gradient-to-r from-cyan-500/50 to-transparent"></div>
                      </div>
                    </div>
                    <p className="text-xl text-white/70 leading-relaxed pl-[60px]">
                      The Human can focus on the purpose, and don't need to care about the planning and execution of the path.
                    </p>
                  </div>
                </AnimatedBorderCard>

                <AnimatedBorderCard 
                  highlightColor="rgba(245, 158, 11, 0.15)"
                  className="backdrop-blur-xl backdrop-saturate-150"
                >
                  <div className="flex flex-col gap-6">
                    <div className="flex items-start gap-4">
                      <div className="shrink-0">
                        <div className="relative">
                          <div className="absolute -inset-3 bg-amber-500/20 rounded-xl blur-lg"></div>
                          <div className="relative rounded-xl bg-gradient-to-b from-amber-500/20 to-amber-500/0 p-3">
                            <svg className="h-7 w-7 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <h4 className="text-2xl font-medium text-white">Erudite</h4>
                        <div className="h-px w-12 bg-gradient-to-r from-amber-500/50 to-transparent"></div>
                      </div>
                    </div>
                    <p className="text-xl text-white/70 leading-relaxed pl-[60px]">
                      The Human opportunity to stand shoulder to shoulder with the times. Know same as the best of the race knows.
                    </p>
                  </div>
                </AnimatedBorderCard>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Universe Model Section */}
      <div className="mt-40">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-16">
              <div>
                <h2 className="text-4xl font-extralight text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70 mb-6 tracking-wide">
                  Universe Model
                </h2>
                <p className="text-base text-white/40 font-light tracking-wide">
                  Understanding the fundamental mechanics of the universe.
                </p>
              </div>
              
              <div className="flex space-x-4">
                <button 
                  onClick={() => handleScroll('universe-left')}
                  className={cn(
                    "p-4 rounded-full border border-white/10",
                    "transition-all duration-300",
                    "hover:bg-white hover:border-transparent",
                    "group"
                  )}
                >
                  <svg 
                    width="16" 
                    height="16" 
                    viewBox="0 0 16 16" 
                    fill="none"
                    className="text-white/70 group-hover:text-black transition-colors duration-300"
                  >
                    <path 
                      d="M10 12L6 8L10 4" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <button 
                  onClick={() => handleScroll('universe-right')}
                  className={cn(
                    "p-4 rounded-full border border-white/10",
                    "transition-all duration-300",
                    "hover:bg-white hover:border-transparent",
                    "group"
                  )}
                >
                  <svg 
                    width="16" 
                    height="16" 
                    viewBox="0 0 16 16" 
                    fill="none"
                    className="text-white/70 group-hover:text-black transition-colors duration-300"
                  >
                    <path 
                      d="M6 12L10 8L6 4" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="relative w-screen -ml-[calc((100vw-100%)/2)]">
              <div 
                ref={universeScrollRef}
                className="flex space-x-6 overflow-hidden pl-4 md:pl-[max(1rem,calc((100vw-80rem)/2))]"
              >
                {[
                  {
                    title: "Clock Universe",
                    description: "A deterministic approach to understanding universal mechanics",
                    image: image12,
                    color: "from-cyan-500"
                  },
                  {
                    title: "Variational Method",
                    description: "Mathematical framework for optimization in physical systems",
                    image: image11,
                    color: "from-purple-500"
                  }
                ].map((item, index) => (
                  <ResearchCard key={index} {...item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pixel World Model Section */}
      <div className="mt-40">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-16">
              <div>
                <h2 className="text-4xl font-extralight text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70 mb-6 tracking-wide">
                  Pixel World Model
                </h2>
                <p className="text-base text-white/40 font-light tracking-wide">
                  Direct perception and processing of pixel-level information.
                </p>
              </div>
              
              <div className="flex space-x-4">
                <button 
                  onClick={() => handleScroll('pixel-left')}
                  className={cn(
                    "p-4 rounded-full border border-white/10",
                    "transition-all duration-300",
                    "hover:bg-white hover:border-transparent",
                    "group"
                  )}
                >
                  <svg 
                    width="16" 
                    height="16" 
                    viewBox="0 0 16 16" 
                    fill="none"
                    className="text-white/70 group-hover:text-black transition-colors duration-300"
                  >
                    <path 
                      d="M10 12L6 8L10 4" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <button 
                  onClick={() => handleScroll('pixel-right')}
                  className={cn(
                    "p-4 rounded-full border border-white/10",
                    "transition-all duration-300",
                    "hover:bg-white hover:border-transparent",
                    "group"
                  )}
                >
                  <svg 
                    width="16" 
                    height="16" 
                    viewBox="0 0 16 16" 
                    fill="none"
                    className="text-white/70 group-hover:text-black transition-colors duration-300"
                  >
                    <path 
                      d="M6 12L10 8L6 4" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="relative w-screen -ml-[calc((100vw-100%)/2)]">
              <div 
                ref={pixelScrollRef}
                className="flex space-x-6 overflow-hidden pl-4 md:pl-[max(1rem,calc((100vw-80rem)/2))]"
              >
                {[
                  {
                    title: "LLM-Transless",
                    description: "Direct perception without transformation layers",
                    image: image10,
                    color: "from-blue-500"
                  },
                  {
                    title: "Internal World Model",
                    description: "Explanless: Understanding without explicit explanations",
                    image: image3,
                    color: "from-amber-500"
                  },
                  {
                    title: "LLM-Pathless",
                    description: "Direct goal achievement without explicit path planning",
                    image: image8,
                    color: "from-emerald-500"
                  },
                  {
                    title: "Markov-Manageless",
                    description: "Self-organizing systems without explicit management",
                    image: image5,
                    color: "from-rose-500"
                  }
                ].map((item, index) => (
                  <ResearchCard key={index} {...item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Vector World Model Section */}
      <div className="mt-40 mb-40">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-16">
              <div>
                <h2 className="text-4xl font-extralight text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70 mb-6 tracking-wide">
                  Vector World Model
                </h2>
                <p className="text-base text-white/40 font-light tracking-wide">
                  Fundamental architecture for understanding reality.
                </p>
              </div>
              
              <div className="flex space-x-4">
                <button 
                  onClick={() => handleScroll('vector-left')}
                  className={cn(
                    "p-4 rounded-full border border-white/10",
                    "transition-all duration-300",
                    "hover:bg-white hover:border-transparent",
                    "group"
                  )}
                >
                  <svg 
                    width="16" 
                    height="16" 
                    viewBox="0 0 16 16" 
                    fill="none"
                    className="text-white/70 group-hover:text-black transition-colors duration-300"
                  >
                    <path 
                      d="M10 12L6 8L10 4" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <button 
                  onClick={() => handleScroll('vector-right')}
                  className={cn(
                    "p-4 rounded-full border border-white/10",
                    "transition-all duration-300",
                    "hover:bg-white hover:border-transparent",
                    "group"
                  )}
                >
                  <svg 
                    width="16" 
                    height="16" 
                    viewBox="0 0 16 16" 
                    fill="none"
                    className="text-white/70 group-hover:text-black transition-colors duration-300"
                  >
                    <path 
                      d="M6 12L10 8L6 4" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="relative w-screen -ml-[calc((100vw-100%)/2)]">
              <div 
                ref={vectorScrollRef}
                className="flex space-x-6 overflow-hidden pl-4 md:pl-[max(1rem,calc((100vw-80rem)/2))]"
              >
                {[
                  {
                    title: "World Model Structure",
                    description: "Fundamental architecture for understanding and representing reality through vector spaces",
                    image: image6,
                    color: "from-indigo-500"
                  }
                ].map((item, index) => (
                  <ResearchCard key={index} {...item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 如果需要更大的间距，可以添加一个额外的空白区域 */}
      <div className="h-20"></div>
    </div>
  )
} 