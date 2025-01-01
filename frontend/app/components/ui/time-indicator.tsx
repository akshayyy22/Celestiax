"use client";

import { useEffect, useState } from "react";
import { cn } from "@/app/lib/utils";
import { useCryptoStore } from "@/app/hooks/useStore";

export function TimeIndicator() {
  const { selectedCrypto, cryptoTime, setCryptoTime } = useCryptoStore();
  const [mounted, setMounted] = useState(false);
  const [isBlinking, setIsBlinking] = useState(true);

  useEffect(() => {
    setMounted(true);

    const updateCryptoTime = () => {
      const now = new Date();
      setCryptoTime(
        now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };

    updateCryptoTime(); // Initial update
    const timer = setInterval(updateCryptoTime, 1000);
    const blinker = setInterval(() => {
      setIsBlinking((prev) => !prev);
    }, 500);

    return () => {
      clearInterval(timer);
      clearInterval(blinker);
    };
  }, [setCryptoTime]);

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
      <div
        className={cn(
          "relative flex items-center gap-2 rounded-lg px-3 py-1.5 shadow-sm transition-all duration-300 border-gray-600 bg-gray-800",
         
        )}
      >
        <div
          className={cn(
            "h-4 w-4 rounded-full transition-opacity duration-500 ease-in-out",
            isBlinking
              ? "bg-teal-400 opacity-100 shadow-[0_0_10px_rgba(56,189,248,0.8)]"
              : "bg-teal-400 opacity-20"
          )}
          aria-hidden="true"
        />
        <span className="font-medium text-lg text-gray-300 min-w-[85px]">
          {selectedCrypto}: {cryptoTime}
        </span>
      </div>
    </div>
  );
}
