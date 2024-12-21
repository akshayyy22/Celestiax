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

//css
// @tailwind base;
// @tailwind components;
// @tailwind utilities;

// :root {
//   --foreground-rgb: 0, 0, 0;
//   --background-start-rgb: 214, 219, 220;
//   --background-end-rgb: 255, 255, 255;
// }

// @media (prefers-color-scheme: dark) {
//   :root {
//     --foreground-rgb: 255, 255, 255;
//     --background-start-rgb: 0, 0, 0;
//     --background-end-rgb: 0, 0, 0;
//   }
// }

// @layer base {
//   :root {
//     --background: 240 10% 4%;
//     --foreground: 0 0% 98%;
//     --card: 240 10% 4%;
//     --card-foreground: 0 0% 98%;
//     --popover: 240 10% 4%;
//     --popover-foreground: 0 0% 98%;
//     --primary: 220 100% 90%;
//     --primary-foreground: 240 10% 4%;
//     --secondary: 240 4% 16%;
//     --secondary-foreground: 0 0% 98%;
//     --muted: 240 4% 16%;
//     --muted-foreground: 240 5% 65%;
//     --accent: 240 4% 16%;
//     --accent-foreground: 0 0% 98%;
//     --destructive: 0 62.8% 30.6%;
//     --destructive-foreground: 0 0% 98%;
//     --border: 240 4% 16%;
//     --input: 240 4% 16%;
//     --ring: 240 5% 65%;
//   }
// }

// @layer base {
//   * {
//     @apply border-border;
//   }
//   body {
//     @apply bg-background text-foreground;
//   }
// }

// @layer utilities {
//   .animation-delay-300 {
//     animation-delay: 300ms;
//   }

//   .animate-float-1 {
//     animation: float1 4s infinite;
//   }

//   .animate-float-2 {
//     animation: float2 5s infinite;
//   }

//   .animate-float-3 {
//     animation: float3 6s infinite;
//   }

//   .animate-pulse-ring {
//     animation: pulseRing 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
//   }
// }

// @keyframes float1 {
//   0%, 100% {
//     transform: translateY(0) translateX(0);
//   }
//   50% {
//     transform: translateY(-10px) translateX(5px);
//   }
// }

// @keyframes float2 {
//   0%, 100% {
//     transform: translateY(0) translateX(0);
//   }
//   50% {
//     transform: translateY(-15px) translateX(-5px);
//   }
// }

// @keyframes float3 {
//   0%, 100% {
//     transform: translateY(0) translateX(0);
//   }
//   50% {
//     transform: translateY(-8px) translateX(8px);
//   }
// }

// @keyframes pulseRing {
//   0% {
//     transform: scale(0.8);
//     opacity: 0;
//   }
//   50% {
//     opacity: 0.1;
//   }
//   100% {
//     transform: scale(1.5);
//     opacity: 0;
//   }
// }