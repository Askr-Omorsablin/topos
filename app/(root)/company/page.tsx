'use client'
import { useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import JoinUs from '@/components/sections/JoinUs'
import { cn } from '@/lib/utils'
import image1 from '@/public/1.jpg'
import image2 from '@/public/2.jpg'
import image3 from '@/public/3.jpg'
import image4 from '@/public/4.jpg'
import image5 from '@/public/5.jpg'
import image6 from '@/public/6.jpg'
import image8 from '@/public/8.jpg'
import image9 from '@/public/9.jpg'
import image10 from '@/public/10.jpg'
import image11 from '@/public/11.jpg'
import image12 from '@/public/12.jpg'

export default function CompanyPage() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [scrollPosition, setScrollPosition] = useState(0)

  const handleScroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current
    if (!container) return

    const cardWidth = 500 // 增加卡片宽度
    const gap = 24 // 卡片间距
    const scrollAmount = cardWidth + gap
    
    if (direction === 'left') {
      const newPosition = Math.max(0, scrollPosition - scrollAmount)
      container.scrollTo({
        left: newPosition,
        behavior: 'smooth'
      })
      setScrollPosition(newPosition)
    } else {
      const maxScroll = container.scrollWidth - container.clientWidth
      const newPosition = Math.min(maxScroll, scrollPosition + scrollAmount)
      container.scrollTo({
        left: newPosition,
        behavior: 'smooth'
      })
      setScrollPosition(newPosition)
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center text-center px-4 overflow-hidden">
        {/* 动态背景层 */}
        <div className="absolute inset-0">
          {/* 主渐变背景 */}
          <div className="absolute inset-0 bg-gradient-to-b from-purple-500/[0.05] via-transparent to-transparent animate-gradient" />
          
          {/* 光晕效果 */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),transparent_50%)]" />
          
          {/* 动态网格 */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_100%)]" />
        </div>

        {/* 内容区域 */}
        <div className="relative max-w-4xl mx-auto space-y-16">
          {/* 标题组 */}
          <div className="space-y-6">
            <div className="inline-block">
              <span className="text-sm uppercase tracking-[0.2em] text-purple-300/70 font-light">
                Welcome to Topos
              </span>
            </div>
            <h1 className="text-6xl sm:text-7xl md:text-8xl font-extralight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-white/70 tracking-tight">
                About
              </span>
            </h1>
          </div>

          {/* 描述文本 */}
          <div className="relative">
            <p className="text-lg sm:text-xl text-white/50 font-light leading-relaxed max-w-2xl mx-auto tracking-wide">
              Topos is a research, development, and incubation institution composed of 
              <span className="text-white/80"> researchers</span>,
              <span className="text-white/80"> managers</span>, and
              <span className="text-white/80"> AI executors</span>. 
              <span className="block mt-4 text-white/60">
                Our mission is to enable humans to focus on exploration, discovery, and understanding.
              </span>
            </p>
          </div>

          {/* 装饰线条 */}
          <div className="w-px h-24 bg-gradient-to-b from-white/20 to-transparent mx-auto" />
        </div>

        {/* 底部渐变遮罩 */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
      </section>



      {/* Mission Section - 增加间距 */}
      <section className="py-60 relative overflow-hidden">
        {/* 背景效果 */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/[0.03] via-blue-500/[0.02] to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.05),transparent_50%)]" />
        
        <div className="container mx-auto px-4 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="max-w-xl">
              <h2 className="text-4xl font-extralight text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70 mb-8 tracking-wide">
                Our Mission
              </h2>
              <p className="text-lg text-white/40 font-light mb-16 tracking-wide">
                Mission: Enable humans to focus on exploration, discovery, and understanding
              </p>
              
              <div className="space-y-16">
                {[
                  {
                    id: "PMF",
                    title: "Product Market Fit",
                    description: "Explorers only need to focus on PMF",
                    color: "from-purple-500/20"
                  },
                  {
                    id: "TSF",
                    title: "Technology Scarce Fit",
                    description: "Explorers only need to focus on TSF",
                    color: "from-blue-500/20"
                  },
                  {
                    id: "DDF",
                    title: "Discovery Defect Fit",
                    description: "Explorers only need to focus on DDF",
                    color: "from-emerald-500/20"
                  }
                ].map((item, index) => (
                  <div 
                    key={item.id}
                    className="relative pl-12"
                  >
                    {/* 连接线 */}
                    {index !== 2 && (
                      <div className="absolute left-[1.125rem] top-10 w-px h-16 bg-gradient-to-b from-white/20 to-transparent" />
                    )}
                    
                    {/* 序号圆圈 */}
                    <div className={`absolute left-0 top-0 w-9 h-9 rounded-full bg-gradient-to-br ${item.color} to-transparent border border-white/10 flex items-center justify-center`}>
                      <span className="text-sm text-white/70">{index + 1}</span>
                    </div>
                    
                    {/* 内容 */}
                    <div>
                      <h4 className="text-lg font-light text-white/90 mb-2">
                        {item.title}
                      </h4>
                      <p className="text-white/70">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* 右侧图片添加悬浮效果 */}
            <div className="relative w-full h-[700px] rounded-3xl overflow-hidden group">
              <Image
                src={image9}
                alt="Abstract visualization"
                fill
                className="object-cover transform transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-blue-500/30 opacity-60 group-hover:opacity-40 transition-opacity duration-700" />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section - 增加间距 */}
      <section className="py-60 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-16">
              <div>
                <h2 className="text-4xl font-extralight text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70 mb-6 tracking-wide">
                  Our Values
                </h2>
                <p className="text-base text-white/40 font-light tracking-wide">
                  Our values guide our exploration direction.
                </p>
              </div>
              
              {/* Navigation Buttons */}
              <div className="flex space-x-4">
                <button 
                  onClick={() => handleScroll('left')}
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
                  onClick={() => handleScroll('right')}
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

            {/* Cards Container */}
            <div className="relative w-screen -ml-[calc((100vw-100%)/2)]">
              <div 
                ref={scrollContainerRef}
                className="flex space-x-6 overflow-hidden pl-4 md:pl-[max(1rem,calc((100vw-80rem)/2))]"
              >
                {[
                  {
                    tag: "Value",
                    title: "Every day is both the first and last day",
                    image: image2,
                    color: "from-purple-500"
                  },
                  {
                    tag: "Value",
                    title: "Explorers First",
                    image: image3,
                    color: "from-yellow-500"
                  },
                  {
                    tag: "Value",
                    title: "Value comes from exploration and practice",
                    image: image4,
                    color: "from-blue-500"
                  },
                  {
                    tag: "Value",
                    title: "Focus on value, not price",
                    image: image5,
                    color: "from-orange-500"
                  },
                  {
                    tag: "Value",
                    title: "Reality Oriented",
                    image: image6,
                    color: "from-pink-500"
                  }
                ].map((item, index) => (
                  <div 
                    key={index}
                    className="relative w-[400px] flex-none aspect-[10/16] bg-black rounded-2xl overflow-hidden"
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    
                    <div className="absolute inset-0 p-8 flex flex-col">
                      <span className="text-sm text-white/90 mb-2">{item.tag}</span>
                      <h3 className="text-2xl font-light text-white mt-auto">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Structure Section - 增加间距 */}
      <section className="py-60 relative overflow-hidden">
        {/* 背景效果 - 使用更微妙的渐变 */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/[0.02] to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03),transparent_70%)]" />
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-7xl mx-auto">
            {/* 标题部分 - 更简洁的设计 */}
            <div className="flex flex-col space-y-6 mb-24">
              <div className="space-y-4">
                <h2 className="text-7xl font-light text-white">Structure</h2>
                <p className="text-xl text-white/80 font-light">
                  Topos is a team composed of research and management personnel and the Pathless System
                </p>
              </div>
            </div>

            {/* Organization Mode */}
            <div className="relative mb-40">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                {/* Human Roles */}
                <div className="space-y-8 group">
                  <h3 className="text-3xl font-light text-white mb-8 group-hover:text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70 transition-all duration-500">
                    Human Roles
                  </h3>
                  <div className="grid gap-6">
                    <div className="group/card p-8 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-sm hover:bg-white/[0.04] transition-all duration-500">
                      <div className="flex items-center space-x-8">
                        <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-purple-500/30 to-blue-500/30 border border-purple-500/30 flex items-center justify-center group-hover/card:scale-110 transition-transform duration-500">
                          <span className="text-xl text-white/90">R</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-xl font-light text-white mb-2 group-hover/card:text-transparent group-hover/card:bg-clip-text group-hover/card:bg-gradient-to-r group-hover/card:from-white group-hover/card:to-white/70">
                            Research Personnel
                          </h4>
                          <p className="text-white/70">Practitioners of exploration and discovery, responsible for exploration direction and hypothesis validation</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-sm">
                      <div className="flex items-center space-x-8">
                        <div className="flex-shrink-0 w-16 h-16 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
                          <span className="text-xl text-white/90">M</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-xl font-light text-white mb-2">Management Personnel</h4>
                          <p className="text-white/70">Designers of exploration paths, responsible for resource allocation and path planning</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* System Role */}
                <div className="space-y-8 group">
                  <h3 className="text-3xl font-light text-white mb-8 group-hover:text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70 transition-all duration-500">
                    System Role
                  </h3>
                  <div className="relative p-8 rounded-2xl overflow-hidden group-hover:scale-[1.02] transition-all duration-500">
                    {/* 背景动画效果 */}
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent)] group-hover:scale-110 transition-transform duration-500" />
                    
                    <div className="relative flex items-center space-x-8">
                      <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500/30 to-blue-500/30 border border-emerald-500/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                        <span className="text-xl text-white/90">P</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-light text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/70">
                          Pathless System
                        </h4>
                        <p className="text-white/70 mb-4">Executor of exploration processes, AI-driven systematic methodology</p>
                        <div className="space-y-3 text-sm text-white/60">
                          <p className="flex items-center space-x-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50" />
                            <span>Automate exploration processes</span>
                          </p>
                          <p className="flex items-center space-x-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50" />
                            <span>Data-driven decision support</span>
                          </p>
                          <p className="flex items-center space-x-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50" />
                            <span>Continuous optimization of exploration paths</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Investment Structure */}
            <div className="relative p-12 rounded-3xl overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.03] via-purple-500/[0.03] to-rose-500/[0.03] opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.02),transparent_70%)] group-hover:scale-110 transition-transform duration-700" />
              
              <div className="relative mb-12">
                <h3 className="text-3xl font-light text-white mb-12">Investment Structure</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                  <div className="space-y-8">
                    <p className="text-xl text-white/70">
                      Structure in Investment firm - Limited Partnership Investment Institution
                    </p>
                    <p className="text-lg text-white/60">
                      Viewing exploration, time, and effort as investments, with role positioning determined by depth of involvement
                    </p>

                    <div className="relative">
                      <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-amber-500/30 to-rose-500/30" />
                      
                      <div className="space-y-12">
                        <div className="relative pl-16">
                          <div className="absolute left-0 top-0 w-12 h-12 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
                            <span className="text-white/90">GP</span>
                          </div>
                          <h4 className="text-xl font-light text-white mb-2">General Partner</h4>
                          <p className="text-white/70">Deep involvement in exploration, responsible for core direction and key decisions</p>
                        </div>

                        <div className="relative pl-16">
                          <div className="absolute left-0 top-0 w-12 h-12 rounded-full bg-rose-500/20 border border-rose-500/30 flex items-center justify-center">
                            <span className="text-white/90">LP</span>
                          </div>
                          <h4 className="text-xl font-light text-white mb-2">Limited Partner</h4>
                          <p className="text-white/70">Specific domain participation, focused on concrete exploration directions</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                    <Image
                      src={image8}
                      alt="Investment"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-purple-500/30" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Join Us Section */}
      <JoinUs />
    </div>
  )
} 