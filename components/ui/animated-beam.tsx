"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ShimmerBeamLabel } from "./shimmer-beam-label";

// 添加 debounce 工具函数
function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export interface BeamProps {
  fromRef: React.RefObject<HTMLElement>;
  toRef: React.RefObject<HTMLElement>;
  className?: string;
  isActive: boolean;
  label?: string;
  delay?: number;
}

export function Beam({
  fromRef,
  toRef,
  className,
  isActive = false,
  delay = 0,
  label
}: BeamProps) {
  const beamRef = React.useRef<any>(null);
  const lineRef = React.useRef<any>(null);
  const labelRef = React.useRef<HTMLDivElement>(null);

  // 创建一个动态变化的 dash 配置
  const getDynamicDash = () => ({
    len: 50,
    gap: 380,
    animation: {
      duration: 2000,
      timing: [0.8, 1.5, 2.2, 3.0]
    }
  });

  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    
    if (!fromRef.current || !toRef.current) {
      console.warn('Beam: Invalid refs');
      return;
    }

    const initBeam = async () => {
      try {
        const LeaderLine = await import('leader-line-new');
        
        // 基础路径
        lineRef.current = new LeaderLine.default(
          fromRef.current!,
          toRef.current!,
          {
            color: 'rgba(40, 40, 40, 0.6)',
            size: 2,
            path: 'straight',
            startSocket: 'right',
            endSocket: 'left',
            gradient: false,
            endPlug: 'behind',
            startPlug: 'behind',
          }
        );

        // 延迟创建光束效果
        setTimeout(() => {
          const dashConfig = getDynamicDash();
          
          beamRef.current = new LeaderLine.default(
            fromRef.current!,
            toRef.current!,
            {
              path: 'straight',
              startSocket: 'right',
              endSocket: 'left',
              endPlug: 'behind',
              startPlug: 'behind',
              size: isActive ? 3 : 2,
              color: isActive ? 'rgba(99, 102, 241, 0.8)' : 'rgba(56, 189, 248, 0.8)',
              dash: dashConfig,
              dropShadow: {
                dx: 0,
                dy: 0,
                blur: 8,
                color: 'rgba(56, 189, 248, 0.5)',
              },
            }
          );
        }, delay);

        // 计算标签位置
        if (fromRef.current && toRef.current && labelRef.current) {
          const start = fromRef.current.getBoundingClientRect();
          const end = toRef.current.getBoundingClientRect();
          const midX = (start.left + end.left) / 2;
          const midY = (start.top + end.top) / 2;
          
          labelRef.current.style.transform = `translate(${midX}px, ${midY}px)`;
        }

        // 防抖的位置更新
        const debouncedUpdate = debounce(() => {
          if (!fromRef.current || !toRef.current) return;

          requestAnimationFrame(() => {
            try {
              if (lineRef.current?.position) {
                lineRef.current.position();
              }
              if (beamRef.current?.position) {
                beamRef.current.position();
              }
            } catch (error) {
              console.warn('Failed to update beam position:', error);
            }
          });
        }, 100);

        window.addEventListener('resize', debouncedUpdate);
        window.addEventListener('scroll', debouncedUpdate);

        return () => {
          if (lineRef.current) lineRef.current.remove();
          if (beamRef.current) beamRef.current.remove();
          window.removeEventListener('resize', debouncedUpdate);
          window.removeEventListener('scroll', debouncedUpdate);
        };
      } catch (error) {
        console.error('Failed to initialize beam:', error);
      }
    };

    initBeam();
  }, [fromRef, toRef, isActive, delay]);

  // 处理激活状态变化
  React.useEffect(() => {
    if (!beamRef.current) return;
    
    const dashConfig = getDynamicDash();
    
    beamRef.current.setOptions({
      color: isActive ? 'rgba(99, 102, 241, 0.8)' : 'rgba(56, 189, 248, 0.8)',
      size: isActive ? 3 : 2,
      dash: dashConfig
    });
  }, [isActive]);

  return label ? (
    <div 
      ref={labelRef}
      className={cn(
        "absolute transform -translate-x-1/2 -translate-y-1/2 px-4 py-1.5 rounded-full bg-black/50 backdrop-blur-sm text-sm text-white/70 pointer-events-none",
        isActive ? "opacity-100" : "opacity-60"
      )}
    >
      {label}
    </div>
  ) : null;
}
