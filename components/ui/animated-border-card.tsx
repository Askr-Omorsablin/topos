'use client';

import { cn } from "@/lib/utils";
import React from "react";

interface AnimatedBorderCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  containerClassName?: string;
  duration?: number;
  className?: string;
  borderClassName?: string;
  highlightColor?: string;
}

export const AnimatedBorderCard = ({
  children,
  className,
  containerClassName,
  duration = 4,
  borderClassName,
  highlightColor = "rgba(0, 149, 255, 0.1)",
  ...props
}: AnimatedBorderCardProps) => {
  return (
    <div className={cn("relative h-full", containerClassName)} {...props}>
      <div
        className="absolute -inset-[1px] rounded-3xl opacity-75"
        style={{
          background: `linear-gradient(var(--border-angle), ${highlightColor}, transparent 40%, transparent 60%, ${highlightColor})`,
          animation: `border-rotate ${duration}s linear infinite`,
        }}
      />
      
      <div 
        className="absolute -inset-[1px] rounded-3xl blur-sm"
        style={{
          background: `linear-gradient(var(--border-angle), ${highlightColor}, transparent 40%, transparent 60%, ${highlightColor})`,
          animation: `border-rotate ${duration}s linear infinite`,
        }}
      />
      
      <div className={cn(
        "relative h-full rounded-3xl bg-[#0A0A0A] p-8 z-[1] backdrop-blur-3xl",
        className
      )}>
        {children}
      </div>
    </div>
  );
}; 