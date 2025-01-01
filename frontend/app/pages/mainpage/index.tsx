"use client";
import GraphVisualization from "../../components/layout/3DGraphVisualization/Visualization";
import { useCryptoStore } from "@/app/hooks/useStore";
import dynamic from 'next/dynamic'; // Step 1: Import dynamic

const Home = () => {
  const { selectedCrypto } = useCryptoStore(); // Access Zustand store
  console.log(selectedCrypto);
  
  const CryptoSelector = dynamic(() => import('@/app/components/CryptoButton'), { ssr: false });

  return (
        <GraphVisualization />
  );
};

export default Home;
