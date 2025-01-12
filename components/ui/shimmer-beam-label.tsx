"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface ShimmerBeamLabelProps {
  children: React.ReactNode;
  className?: string;
  shimmerColor?: string;
  shimmerDuration?: string;
}

export function ShimmerBeamLabel({ 
  children, 
  className,
  shimmerColor = "rgba(255,255,255,0.1)",
  shimmerDuration = "3s"
}: ShimmerBeamLabelProps) {
  return (
    <div className={cn(
      "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
      "relative inline-flex overflow-hidden rounded-full px-4 py-1.5 bg-white/5",
      "transition-all duration-500",
      className
    )}>
      {/* 闪光效果 */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(90deg, transparent, ${shimmerColor}, transparent)`,
          animation: `shimmer ${shimmerDuration} infinite`,
        }}
      />
      {/* 文本内容 */}
      <span className="relative text-xs font-light text-white/70">
        {children}
      </span>
      
      {/* 动画关键帧 */}
      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
} 