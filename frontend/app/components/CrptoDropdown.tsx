"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { CryptoIcon } from "./CryptoIcon";

// Define the CryptoId type to restrict the value to certain strings
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
  | "avalanche";

// Update the CryptoDropdownProps to specify CryptoId type for value and onValueChange
interface CryptoDropdownProps {
  value: CryptoId; // Ensure value is a valid CryptoId
  onValueChange: (value: CryptoId) => void; // onValueChange should accept a CryptoId
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
          { id: "avalanche", name: "Avalanche", symbol: "AAVE" },
        ].map((crypto) => (
          <SelectItem
            key={crypto.id}
            value={crypto.id} // The value is set to the id, which is a CryptoId
            className="text-slate-100 focus:bg-indigo-600 cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <CryptoIcon cryptoId={crypto.id as CryptoId} /> {/* Type cast here if necessary */}
              <span>{crypto.name}</span>
              <span className="text-slate-400 text-sm">({crypto.symbol})</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
