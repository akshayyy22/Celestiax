"use client";

import { cryptoIcons } from "./ui/icons";

type CryptoId = 
  | "bitcoin"
  | "ethereum"
  | "algorand"
  | "tron"
  | "litecoin"
  | "bitcoin-cash"
  | "dash"
  | "dogecoin"
  | "binance-smart-chain"
  | "polygon"
  | "avalanche"; // Define valid crypto IDs

interface CryptoIconProps {
  cryptoId: CryptoId; // Use the defined type for cryptoId
}

// Function to get a random color from a predefined list
const getRandomColor = (): string => {
  const colors = [
    "text-yellow-500",
    "text-purple-400",
    "text-emerald-500",
    "text-blue-500",
    "text-red-500",
    "text-orange-500",
    "text-pink-500",
    "text-gray-500",
    "text-teal-500",
    "text-indigo-500",
  ];
  
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};

export function CryptoIcon({ cryptoId }: CryptoIconProps) {
  const Icon = cryptoIcons[cryptoId]; // No need for type assertion

  if (!Icon) {
    return null; // Return null if Icon does not exist
  }

  // Get a random color for the icon
  const iconColor = getRandomColor();

  return <Icon className={`w-4 h-4 ${iconColor}`} />;
}
