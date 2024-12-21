"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import WorldMap from "@/app/components/WorldMapDemo";
import HeaderDemo from "./components/Header";
import CryptoButton from "@/app/components/CryptoButton";

const Page: React.FC = () => {

  const [selectedCoin, setSelectedCoin] = useState<string>("bitcoin");

  const coins = ["bitcoin", "ethereum", "algorand"];

  return (
    <main>
      {/* Header Section */}
     <HeaderDemo/>

     <div className="py-4">
        <CryptoButton coins={coins} onSelect={setSelectedCoin} />
      </div>


      {/* World Map Section */}
      <div className="py-40 bg-black dark:bg-black">
        <WorldMap />
      </div>
    </main>
  );
};

export default Page;
