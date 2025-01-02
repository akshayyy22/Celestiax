"use client";

import { cryptoIcons } from "./ui/icons";

type CryptoId = "bitcoin" | "ethereum" | "algorand" | "tron" |
  "litecoin" | "bitcoin-cash" | "dash" | "dogecoin" |
  "binance-smart-chain" | "polygon" | "avalanche";

interface Crypto {
  id: CryptoId;
  name: string;
  symbol: string;
}

interface CryptoIconProps {
  cryptoId: CryptoId; 
}

export function CryptoIcon({ cryptoId }: CryptoIconProps) {
  const Icon = cryptoIcons[cryptoId]; 

  if (!Icon) {
    return null; 
  }

  const iconColors: Record<CryptoId, string> = {
    bitcoin: "text-yellow-500",
    ethereum: "text-purple-400",
    algorand: "text-emerald-500",
    dash: "text-emerald-500",
    dogecoin: "text-emerald-500",
    "binance-smart-chain": "text-emerald-500",
    polygon: "text-emerald-500",
    avalanche: "text-emerald-500",
    "bitcoin-cash": "text-emerald-500",
    tron: "text-blue-500", 
    litecoin: "text-silver-500" 
  };

  return <Icon className={`w-4 h-4 ${iconColors[cryptoId]}`} />;
}

const isValidCryptoId = (id: string): id is CryptoId => {
  return [
    "bitcoin", "ethereum", "algorand", "tron", "litecoin", "bitcoin-cash", "dash",
    "dogecoin", "binance-smart-chain", "polygon", "avalanche"
  ].includes(id);
};

export function CrptoDropdown({ crypto }: { crypto: Crypto }) {
  if (isValidCryptoId(crypto.id)) {
    return (
      <div className="flex items-center gap-2">
        <CryptoIcon cryptoId={crypto.id} />
        <span>{crypto.name}</span>
        <span className="text-slate-400 text-sm">({crypto.symbol})</span>
      </div>
    );
  }

  return <div>Invalid Crypto</div>;
}
