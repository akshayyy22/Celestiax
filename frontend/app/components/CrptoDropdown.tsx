"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { CryptoIcon } from "./CryptoIcon";
import { useCryptoStore } from "@/app/hooks/useStore"; // Import Zustand store

interface CryptoDropdownProps {
  value: string;
  onValueChange: (value: string) => void;
}

export function CryptoDropdown({ value, onValueChange }: CryptoDropdownProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-full sm:w-[280px] bg-slate-800/80 border-indigo-400/30 text-slate-100 hover:bg-slate-800 focus:ring-indigo-500/50 transition-all duration-200">
        <SelectValue placeholder="Select cryptocurrency" />
      </SelectTrigger>
      <SelectContent className="bg-slate-800 border-indigo-400/30">
        {[
          { id: "bitcoin", name: "Bitcoin", symbol: "BTC" },
          { id: "ethereum", name: "Ethereum", symbol: "ETH" },
          { id: "algorand", name: "Algorand", symbol: "ALGO" },
          { id: "tron", name: "Tron", symbol: "TRX" },
          { id: "litecoin", name: "Litecoin", symbol: "LTC" },
          { id: "bitcoin-cash", name: "Bitcoin Cash", symbol: "BTC" },
          { id: "dash", name: "Dash", symbol: "DASH" },
          { id: "dogecoin", name: "Doge", symbol: "DOGE" },
          { id: "binance-smart-chain", name: "BNB Smart Chain", symbol: "BNB" },
          { id: "polygon", name: "Polygon", symbol: "MATIC" },
          { id: "avalanche ", name: "Avalanche", symbol: "AAVE" },
         
        ].map((crypto) => (
          <SelectItem
            key={crypto.id}
            value={crypto.id}
            className="text-slate-100 focus:bg-indigo-600 cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <CryptoIcon cryptoId={crypto.id} />
              <span>{crypto.name}</span>
              <span className="text-slate-400 text-sm">({crypto.symbol})</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
