import Link from 'next/link'
import { cn } from '@/lib/utils'

export default function JoinUs() {
  return (
    <section className="relative py-60 overflow-hidden">
      {/* 背景雾气效果 */}
      <div className="absolute inset-0">
        {/* 基础渐变背景 */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 via-transparent to-transparent" />
        
        {/* 雾气效果层 */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.05),transparent_70%)] blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(139,92,246,0.08),transparent_50%)] blur-2xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(139,92,246,0.06),transparent_60%)] blur-2xl" />
      </div>

      {/* 动态心跳背景效果 */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* 多层渐变光晕 */}
        <div className="absolute w-[800px] h-[800px] animate-heartbeat">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/[0.06] to-blue-500/[0.06] rounded-full blur-3xl" />
        </div>
        <div className="absolute w-[600px] h-[600px] animate-heartbeat-slow">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/[0.04] to-purple-500/[0.04] rounded-full blur-3xl" />
        </div>
        <div className="absolute w-[400px] h-[400px] animate-heartbeat-delayed">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/[0.08] to-blue-500/[0.08] rounded-full blur-3xl" />
        </div>
      </div>

      {/* 额外的装饰性雾气 */}
      <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-purple-500/[0.03] to-transparent blur-3xl" />
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-purple-500/[0.03] to-transparent blur-3xl" />

      {/* 主要内容 */}
      <div className="container relative mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-16">
          {/* 标题区域 */}
          <div className="space-y-8">
            <h2 className="text-4xl sm:text-5xl font-extralight text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70 tracking-wider">
              Join Our Mission
            </h2>
            <p className="text-base text-white/40 font-light max-w-xl mx-auto leading-relaxed tracking-wide">
              Invest in the future of exploration and discovery. Be part of a team that's redefining the boundaries of human potential.
            </p>
          </div>

          {/* 按钮组 */}
          <div className="flex items-center justify-center space-x-8 pt-16">
            <Link
              href="/join"
              className={cn(
                "group relative px-8 py-3",
                "rounded-full",
                "bg-gradient-to-r from-purple-600 to-blue-600",
                "border border-white/10",
                "hover:from-purple-500 hover:to-blue-500",
                "transition-all duration-500",
                "shadow-[0_0_30px_rgba(139,92,246,0.3)]",
                "hover:shadow-[0_0_40px_rgba(139,92,246,0.4)]"
              )}
            >
              <span className="relative text-sm font-light text-white tracking-wider">
                Become GP/LP
              </span>
            </Link>

            <Link
              href="/contact"
              className={cn(
                "px-8 py-3 rounded-full",
                "text-sm font-light text-white/90",
                "border border-white/20",
                "hover:bg-white/5",
                "transition-all duration-500",
                "tracking-wider"
              )}
            >
              Contact Us
            </Link>
          </div>

          {/* 底部装饰线 */}
          <div className="pt-24">
            <div className="w-24 h-px mx-auto bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  )
} 