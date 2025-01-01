"use client";
import GraphVisualization from "../../components/layout/3DGraphVisualization/Visualization";
import { useCryptoStore } from "@/app/hooks/useStore";

const Home = () => {
  const { selectedCrypto } = useCryptoStore(); // Access Zustand store
  console.log(selectedCrypto);
  
  return (
        <GraphVisualization />
  );
};

export default Home;
