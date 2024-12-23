"use client";

import { useScroll } from "@/app/hooks/use-scroll";
import { Sparkles } from "lucide-react";

export function SwipeUpIndicator() {
  const hasScrolled = useScroll();

  if (hasScrolled) return null;

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center">
      {/* Cosmic particles */}
      <div className="absolute inset-0 w-40 h-40 -translate-y-1/2">
        <div className="absolute w-2 h-2 bg-primary/30 rounded-full animate-float-1 left-4 top-8" />
        <div className="absolute w-1.5 h-1.5 bg-primary/20 rounded-full animate-float-2 right-8 top-4" />
        <div className="absolute w-1 h-1 bg-primary/10 rounded-full animate-float-3 left-8 top-2" />
      </div>

      {/* Main indicator */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-radial from-primary/20 to-transparent rounded-full blur-xl group-hover:from-primary/30 transition-all duration-500" />
        <div className="relative p-4 rounded-full bg-gradient-to-b from-primary/5 to-primary/10 backdrop-blur-sm border border-primary/10 group-hover:border-primary/20 transition-all duration-500">
          <Sparkles className="w-6 h-6 text-primary/80 group-hover:text-primary transition-colors duration-500" />
        </div>
      </div>

      {/* Pulse rings */}
      <div className="absolute inset-0 animate-pulse-ring" />
      <div className="absolute inset-0 animate-pulse-ring animation-delay-300" />
      
      {/* Label */}
      <span className="mt-6 text-xs text-primary/40 tracking-widest uppercase animate-pulse">
        Scroll to Explore
      </span>
    </div>
  );
}
