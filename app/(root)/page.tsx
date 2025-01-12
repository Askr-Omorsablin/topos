import ButterflyEffect from '@/components/ButterflyEffect'
import HeroSection from '@/components/sections/HeroSection'
import VisionSection from '@/components/sections/VisionSection'
import ResearchHighlights from '@/components/sections/ResearchHighlights'
import ProductShowcase from '@/components/sections/ProductShowcase'


export default function Home() {
  return (
    <div className="relative min-h-screen bg-transparent">
      {/* 背景效果层 */}
      <div className="absolute inset-0" style={{ zIndex: 0 }}>
        {/* 主渐变背景 - 合并所有效果 */}
        <div className="absolute inset-0">
          {/* 基础渐变 */}
          <div className="absolute inset-0 bg-gradient-radial from-zinc-800/30 via-black to-black" />
          
          {/* 中央光晕 */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] 
            bg-gradient-radial from-zinc-700/20 via-purple-900/5 to-transparent 
            rounded-full blur-[100px] animate-pulse-slow" />
          
          {/* 额外的环境光 */}
          <div className="absolute inset-0 backdrop-blur-[60px] bg-black/5" />
        </div>
      </div>

      {/* 蝴蝶效果 - 直接使用，因为已经是 fixed 定位 */}
      <ButterflyEffect />

      {/* 内容层 */}
      <div className="relative" style={{ zIndex: 2 }}>
        {/* Hero Section */}
        <HeroSection />
        <VisionSection />
        <ResearchHighlights />
        <ProductShowcase />

      </div>
    </div>
  )
}
