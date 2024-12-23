"use client";

import { useRouter } from "next/navigation"; // Import Next.js router
import { useState, useEffect } from "react";
import { Button } from "@/app/components/ui/button";
import { CryptoDropdown } from "./CrptoDropdown";
import { LineChart, TrendingUp } from "lucide-react";
import { Card } from "@/app/components/ui/card";
import { useCryptoStore } from "@/app/hooks/useStore"; // Import Zustand store
import { useDebounce } from "use-debounce"; // Import use-debounce

export default function CryptoSelector() {
  const router = useRouter(); // Initialize router
  const { selectedCrypto, setSelectedCrypto } = useCryptoStore(); // Use Zustand to get state and setter
  const [debouncedSelectedCrypto] = useDebounce(selectedCrypto, 300);

  // Effect to fetch data whenever the debounced selected crypto changes
  useEffect(() => {
    if (debouncedSelectedCrypto) {
      fetchData(debouncedSelectedCrypto); // Call your data fetching function
    }
  }, [debouncedSelectedCrypto]);

  const fetchData = async (crypto: string) => {
    // Replace this with your actual API call or data fetching logic
    console.log(`Fetching data for ${crypto}`);
  };

  const handleVisualize = () => {
    console.log(`Visualizing ${selectedCrypto} data`);
    router.push("/pages/mainpage"); // Navigate to the Home page
  };

  return (
    <Card className="p-8 bg-slate-900/40 border-indigo-500/20 backdrop-blur-xl shadow-2xl">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-100 mb-2 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-indigo-400" />
          Market Analysis
        </h2>
        <p className="text-slate-400">Select a cryptocurrency to visualize market trends and patterns</p>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <CryptoDropdown value={selectedCrypto} onValueChange={setSelectedCrypto} /> {/* Use Zustand's setter */}
        
        <Button 
          onClick={handleVisualize} 
          className="w-full sm:w-auto flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg shadow-indigo-500/20 transition-all duration-200"
        >
          <LineChart className="w-4 h-4" />
          Generate Visualization
        </Button>
      </div>
    </Card>
  );
}
