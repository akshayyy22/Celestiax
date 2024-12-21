"use client";

import { useEffect, useState } from "react";
import { cn } from "@/app/lib/utils";

export function TimeIndicator() {
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState("");
  const [isBlinking, setIsBlinking] = useState(true);

  useEffect(() => {
    setMounted(true);
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };

    updateTime(); // Initial update
    const timer = setInterval(updateTime, 1000);
    const blinker = setInterval(() => {
      setIsBlinking((prev) => !prev);
    }, 500);

    return () => {
      clearInterval(timer);
      clearInterval(blinker);
    };
  }, []);

  // Don't render anything until after mounting to prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="flex items-center gap-2">
        <div className="relative flex h-[34px] w-[120px] items-center gap-2 rounded-lg border bg-background px-3 py-1.5">
          <div className="animate-pulse bg-muted-foreground/20 h-4 w-20 rounded" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <div className="relative flex items-center gap-2 rounded-lg border bg-background px-3 py-1.5">
        <span className="font-medium min-w-[85px]">{time}</span>
        <div
          className={cn(
            "h-2 w-2 rounded-full bg-primary transition-opacity duration-200",
            isBlinking ? "opacity-100" : "opacity-0"
          )}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}