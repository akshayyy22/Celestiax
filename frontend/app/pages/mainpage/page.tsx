"use client";
import { GlobeDemo } from "../../components/Globedemo";
import Dashboard from "../../components/layout/Dashboard";
import { useTheme } from "@mui/material/styles";
import GraphVisualization from "../../components/layout/3DGraphVisualization/Visualization";
import { useCryptoStore } from "@/app/hooks/useStore";

const Home = () => {
  const { palette } = useTheme();
  const { selectedCrypto } = useCryptoStore(); // Access Zustand store
  console.log(selectedCrypto);
  
  return (
    // <div
    //   style={{
    //     width: "100%", // Full viewport width
    //     backgroundColor: palette.background.default || "#000", // Theme background or fallback
    //     overflowX: "hidden", // Prevents horizontal scrolling
    //   }}
    // >
    //   <div
    //     style={{
    //       position: "relative", // Relative for child absolute positioning
    //       top: 0,
    //       left: 0,
    //       right: 0,
    //       bottom: 0,
    //       zIndex: 1, // Lower z-index for the background
    //     }}
    //   >
    //     <GlobeDemo />
    //   </div>
    //   <div
    //     style={{
    //       position: "absolute",
    //       top: 500,
    //       left: 5,
    //       right: 0,
    //       bottom: 1,
    //       zIndex: 2, // Higher z-index for the overlay
    //       pointerEvents: "auto", // Allows interactions with GlobeDemo (if needed)
    //     }}
    //   >
    //     <Dashboard />
    //   </div>
    //   <div
    //     style={{
    //       width: "100%",
    //       minHeight: "100vh", // Ensure full screen height for visualization
    //       display: "flex", // Center align visualization
    //       justifyContent: "center",
    //       alignItems: "center",
    //     }}
    //   >
        <GraphVisualization />
    //   </div>
      
    // </div>
  );
};

export default Home;