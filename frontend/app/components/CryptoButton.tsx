"use client";

import { useRouter } from "next/navigation"; // Import Next.js router
import { useEffect } from "react";
import { Button } from "@/app/components/ui/button";
import { CryptoDropdown } from "./CrptoDropdown";
import { LineChart, TrendingUp } from "lucide-react";
import { Card } from "@/app/components/ui/card";
import { useCryptoStore } from "@/app/hooks/useStore"; // Import Zustand store
import { useDebounce } from "use-debounce"; // Import use-debounce

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

interface CryptoSelectorProps {
  setLoading: (isLoading: boolean) => void;
}

export default function CryptoSelector({ setLoading }: CryptoSelectorProps) {
  const router = useRouter();
  const { selectedCrypto, setSelectedCrypto } = useCryptoStore(); 
  const [debouncedSelectedCrypto] = useDebounce(selectedCrypto, 300);

  
  const handleVisualize = async () => {
    setLoading(true); 
    await new Promise((resolve) => setTimeout(resolve, 2000)); 
    router.push("/pages/mainpage"); 
    setLoading(false); 
  };

  return (
    <Card className="p-8 bg-slate-900/40 border-indigo-500/20 backdrop-blur-xl shadow-2xl">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-100 mb-2 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-indigo-400" />
          Market Visualization
        </h2>
        <p className="flex text-slate-400 items-start justify-start">
          Select a cryptocurrency to visualize market trends as interactive nodes and connections
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <CryptoDropdown value={selectedCrypto as CryptoId} onValueChange={setSelectedCrypto} /> 
        <Button
          onClick={handleVisualize}
          className="w-full sm:w-auto flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg shadow-indigo-500/20 transition-all duration-200"
        >
          <LineChart className="w-4 h-4" />
          Visualize Interactive Nodes
        </Button>
      </div>
    </Card>
  );
}
