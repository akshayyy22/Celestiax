"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic"; // Import dynamic to handle client-side rendering
import { useCryptoStore } from "@/app/hooks/useStore";

const GraphVisualization = dynamic(() => import("../../components/layout/3DGraphVisualization/Visualization"), { ssr: false });

const Home = () => {
  const { selectedCrypto } = useCryptoStore(); // Access Zustand store
  console.log(selectedCrypto);

  const [isClient, setIsClient] = useState(false); // State to check if we are on the client side

  useEffect(() => {
    // Ensure this is only run on the client side
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Return nothing or a loading spinner while waiting for the client-side rendering
  }

  // Now you can safely use components that rely on `window` and other client-side features
  return (
    <div>
      <GraphVisualization /> {/* This will only render on the client side */}
    </div>
  );
};

export default Home;
