"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic"; 
import { useCryptoStore } from "@/app/hooks/useStore";

const GraphVisualization = dynamic(() => import("../../components/layout/3DGraphVisualization/Visualization"), { ssr: false });

const Home = () => {
  const { selectedCrypto } = useCryptoStore(); 
  console.log(selectedCrypto);

  const [isClient, setIsClient] = useState(false); 

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; 
  }

  return (
    <div>
      <GraphVisualization /> 
    </div>
  );
};

export default Home;
