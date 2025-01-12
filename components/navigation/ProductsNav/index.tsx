'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

const products = [
  {
    category: "Development",
    items: [
      {
        title: "Pathless",
        description: "AI-powered development assistant",
        icon: (
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        ),
        href: "/products/pathless"
      },
      {
        title: "Lambda'Plathless",
        description: "Serverless development framework",
        icon: (
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        ),
        href: "/products/lambda-plathless"
      }
    ]
  },
  {
    category: "Alignment",
    items: [
      {
        title: "Bifrost",
        description: "Bridge between different tech stacks",
        icon: (
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
        ),
        href: "/products/bifrost"
      }
    ]
  }
];

export function ProductsNav() {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const pathname = usePathname();

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 100);
  };

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <div 
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link 
        href="/products"
        className="flex items-center space-x-1 text-sm text-white/70 hover:text-white transition-colors"
      >
        <span>Products</span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </Link>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[520px] bg-black/95 backdrop-blur-sm border border-white/10 rounded-xl shadow-2xl"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="grid grid-cols-2 divide-x divide-white/10">
              {products.map((category, idx) => (
                <div key={idx} className="p-4">
                  <div className="px-3 py-2 text-sm font-medium text-white/40 uppercase tracking-wider">
                    {category.category}
                  </div>
                  <div className="space-y-2 mt-2">
                    {category.items.map((item, index) => (
                      <Link
                        key={index}
                        href={item.href}
                        className="flex items-start p-3 rounded-lg hover:bg-white/[0.02] transition-colors group"
                      >
                        <div className="shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 text-white/70 group-hover:text-white transition-colors">
                          {item.icon}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-white group-hover:text-white/90">
                            {item.title}
                          </div>
                          <div className="text-sm text-white/50">
                            {item.description}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 