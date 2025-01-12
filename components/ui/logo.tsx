"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";

export function Logo({ className }: { className?: string }) {
  return (
    <Link 
      href="/" 
      className={cn(
        "text-2xl text-white",
        "font-light tracking-widest",
        "hover:opacity-80",
        "transition-opacity duration-300",
        className
      )}
    >
      TOPOS
    </Link>
  );
} 