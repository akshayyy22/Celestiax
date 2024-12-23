"use client";

import { cryptoIcons } from "./ui/icons";

interface CryptoIconProps {
  cryptoId: string;
}

export function CryptoIcon({ cryptoId }: CryptoIconProps) {
  const Icon = cryptoIcons[cryptoId as keyof typeof cryptoIcons];
  
  if (!Icon) {
    return null;
  }

  const iconColors = {
    bitcoin: "text-yellow-500",
    ethereum: "text-purple-400",
    algorand: "text-emerald-500",
  };

  return <Icon className={`w-4 h-4 ${iconColors[cryptoId as keyof typeof cryptoIcons]}`} />;
}