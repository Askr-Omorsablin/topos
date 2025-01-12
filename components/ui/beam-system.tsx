"use client";

import * as React from "react";
import { Beam } from "./animated-beam";
import { ShimmerBeamLabel } from "./shimmer-beam-label";
import { cn } from "@/lib/utils";

export interface BeamConnection {
  id: string;
  from: React.RefObject<HTMLElement>;
  to: React.RefObject<HTMLElement>;
  isActive: boolean;
  delay?: number;
  label?: string;
}

interface BeamSystemProps {
  connections: BeamConnection[];
  className?: string;
}

export function BeamSystem({ connections, className }: BeamSystemProps) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    // 给DOM一些时间来渲染
    const timer = setTimeout(() => {
      setMounted(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {connections.map((connection) => (
        <React.Fragment key={connection.id}>
          <Beam
            fromRef={connection.from}
            toRef={connection.to}
            isActive={connection.isActive}
            className={className}
            label={connection.label as string | undefined}
            delay={connection.delay}
          />
        </React.Fragment>
      ))}
    </>
  );
} 