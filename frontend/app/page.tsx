"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import WorldMap from "@/app/components/worldmapdemo";
import HeaderDemo from "./components/header";
import CryptoSelector from "@/app/components/CryptoButton";
import { useCryptoStore } from "@/app/hooks/useStore";
import Loader from "@/app/components/ui/loader"; // Import Loader component

const Page: React.FC = () => {
  const { selectedCrypto } = useCryptoStore(); // Access the selectedCrypto from Zustand store
  const [isLoading, setIsLoading] = useState(false); // Manage loading state

  return (
    <main>
      {isLoading && (
        <Loader/>
      )}

      {/* Header Section */}
      <HeaderDemo />

      {/* World Map Section */}
      <div className="py-40 bg-black dark:bg-black">
        <WorldMap />
      </div>

      <div className="py-4 p-6">
        <CryptoSelector setLoading={setIsLoading} />
      </div>
    </main>
  );
};

export default Page;
