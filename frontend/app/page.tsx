"use client";

import React, { useState } from "react";

import CryptoSelector from "@/app/components/CryptoButton";
import Loader from "@/app/components/ui/loader"; // Import Loader component

import VisualizationsCount from "@/app/components/ui/visualizations-count";
import ExampleGenerations from "./components/ui/example-generations";
import Footer from "./components/ui/footer";

const Page: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false); // Manage loading state

  return (
    <main>
      {isLoading && <Loader />}
      <div className="flex min-h-screen flex-col items-center justify-center gap-7 pt-20 pb-8 mx-auto">
        <div className="flex flex-col items-center justify-center text-center mx-auto w-full max-w-7xl">
          <div className="w-full space-y-5 duration-1000 ease-in-out animate-in fade-in slide-in-from-top-5">
            <VisualizationsCount />
            <h1 className="mt-5 text-4xl md:text-7xl font-bold text-center">
              <div
                className="bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-500 bg-opacity-50"
              >
                Celestiax
              </div>
            </h1>
            <p className="font-normal text-lg text-neutral-300 max-w-xl text-center mx-auto px-8">
              Explore real-time, interactive visualizations of global cryptocurrency 
              transactions and blockchain activity with Celestiax.
            </p>
            <div className="py-4 p-6">
              <CryptoSelector setLoading={setIsLoading} />
            </div>
            <div className="px-8 max-w-7xl mx-auto">
              <ExampleGenerations />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default Page;
