"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface CurvedBeamProps {
  fromRef: React.RefObject<HTMLElement>;
  toRef: React.RefObject<HTMLElement>;
  className?: string;
  isActive?: boolean;
  delay?: number;
  startSocket?: 'top' | 'right' | 'bottom' | 'left';
  endSocket?: 'top' | 'right' | 'bottom' | 'left';
}

export function CurvedBeam({
  fromRef,
  toRef,
  className,
  isActive = false,
  delay = 0,
  startSocket = 'right',
  endSocket = 'bottom'
}: CurvedBeamProps) {
  const beamRef = React.useRef<LeaderLine | null>(null);
  const lineRef = React.useRef<LeaderLine | null>(null);
  const initialized = React.useRef(false);

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
    
    // 确保只初始化一次
    if (initialized.current) return;
    
    const timer = setTimeout(() => {
      if (!fromRef.current || !toRef.current) return;

      const initBeam = async () => {
        try {
          const LeaderLine = await import('leader-line-new');
          
          // 基础曲线路径
          lineRef.current = new LeaderLine.default(
            fromRef.current as Element,
            toRef.current as Element,
            {
              color: 'rgba(40, 40, 40, 0.6)',
              size: 2,
              path: 'arc',
              startSocket,
              endSocket,
              startSocketGravity: 200,
              endSocketGravity: 200,
              gradient: false,
              endPlug: 'behind',
              startPlug: 'behind',
            }
          );

          const dashConfig = getDynamicDash();
          
          beamRef.current = new LeaderLine.default(
            fromRef.current as Element,
            toRef.current as Element,
            {
              path: 'arc',
              startSocket,
              endSocket,
              startSocketGravity: 200,
              endSocketGravity: 200,
              endPlug: 'behind',
              startPlug: 'behind',
              size: isActive ? 3 : 2,
              gradient: true,
              color: isActive 
                ? ['rgba(236, 72, 153, 0.8)', 'rgba(168, 85, 247, 0.8)'] as any
                : ['rgba(249, 115, 22, 0.8)', 'rgba(168, 85, 247, 0.8)'] as any,
              dash: dashConfig,
              dropShadow: {
                dx: 0,
                dy: 0,
                blur: 8,
                color: 'rgba(168, 85, 247, 0.5)',
              },
            }
          );
          
          initialized.current = true;
        } catch (error) {
          console.error('Failed to initialize curved beam:', error);
        }
      };

      initBeam();
    }, delay);

    return () => {
      clearTimeout(timer);
      try {
        // 安全地移除元素
        if (lineRef.current?.remove) {
          try {
            lineRef.current.remove();
          } catch (e) {
            console.warn('Failed to remove line:', e);
          }
          lineRef.current = null;
        }
        
        if (beamRef.current?.remove) {
          try {
            beamRef.current.remove();
          } catch (e) {
            console.warn('Failed to remove beam:', e);
          }
          beamRef.current = null;
        }
      } catch (error) {
        console.warn('Cleanup error:', error);
      }
      initialized.current = false;
    };
  }, [fromRef, toRef, isActive, delay, startSocket, endSocket]);

  return null;
} 