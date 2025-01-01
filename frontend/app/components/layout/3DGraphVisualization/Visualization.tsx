"use client";
import React, { useEffect, useState } from "react";
import ForceGraph3D from "3d-force-graph";
import { SphereGeometry, MeshStandardMaterial, Mesh, Vector2 } from "three";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { useCryptoStore } from "@/app/hooks/useStore";
import { fetchWalletTransactions } from "@/app/api/api";
import coinConfigs from "@/app/types/coinUtils";
import {
  SearchBitcoinTransaction,
  SearchEthereumTransaction,
  SearchTronTransaction,
} from "@/app/types/types";
import { TimeIndicator } from "../../ui/time-indicator";
import SearchBar from "@/app/components/ui/SearchBar";
import Loader from "@/app/components/ui/loader";
import Load from "@/app/components/ui/load";

const GraphVisualization: React.FC = () => {
  const [searchMode, setSearchMode] = useState(false);
  const { selectedCrypto, setSelectedCrypto } = useCryptoStore() as {
    selectedCrypto: keyof typeof coinConfigs;
    setSelectedCrypto: (crypto: keyof typeof coinConfigs) => void;
  };
  const [graphData, setGraphData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [noTransactionsFound, setNoTransactionsFound] = useState(false);

  useEffect(() => { 
    // Load selectedCrypto from local storage on mount
    if (typeof window !== "undefined") {
        const storedCrypto = localStorage.getItem("selectedCrypto"); 
        if (storedCrypto) { 
            setSelectedCrypto(storedCrypto as keyof typeof coinConfigs); 
        }
    }
}, []); 

useEffect(() => { 
    // Save selectedCrypto to local storage whenever it changes
    if (typeof window !== "undefined" && selectedCrypto) { 
        localStorage.setItem("selectedCrypto", selectedCrypto); 
    } 
}, [selectedCrypto]); 


  const handleSearch = async (walletId: string) => {
    setIsLoading(true);
    setNoTransactionsFound(false);

    try {
      const blockchain = selectedCrypto;
      const fetchedTransactions = await fetchWalletTransactions(
        blockchain,
        walletId
      );
      const transactions = fetchedTransactions.Ok.data.items;

      if (
        transactions &&
        Array.isArray(transactions) &&
        transactions.length > 0
      ) {
        setSearchMode(true);
        setNoTransactionsFound(false);
        processSearchTransactions(transactions);
      } else {
        setNoTransactionsFound(true);
      }
    } catch (error) {
      console.error(
        `Error fetching transactions for wallet ID ${walletId}:`,
        error
      );
      setNoTransactionsFound(true);
    } finally {
      setIsLoading(false);
    }
  };

  const loadTransactions = async () => {
    if (searchMode) return;
    setIsLoading(true);

    try {
      const config = coinConfigs[selectedCrypto];
      const transactions = await config.fetchTransactions(selectedCrypto, "");
      processTransactions(transactions as any[]);
    } catch (error) {
      setNoTransactionsFound(true);
    } finally {
      setIsLoading(false);
    }
  };

  const processSearchTransactions = (
    transactions: (
      | SearchBitcoinTransaction
      | SearchEthereumTransaction
      | SearchTronTransaction
    )[]
  ) => {
    const layers = Math.ceil(Math.sqrt(transactions.length));
    const nodesPerLayer = Math.ceil(transactions.length / layers);

    const nodes: any = transactions.map((tx, index) => {
      const layerIndex = Math.floor(index / nodesPerLayer);
      const positionInLayer = index % nodesPerLayer;

      return {
        id: tx.transactionHash,
        name: `Transaction ${index + 1}`,
        group: layerIndex + 1,
        x: positionInLayer * 20 - (nodesPerLayer * 20) / 2,
        y: 0,
        z: layerIndex * 50,
        label: `
                    Transaction ID: ${tx.transactionId} <br />
                    Mined in Block Hash: ${tx.minedInBlockHash} <br />
                    Mined in Block Height: ${tx.minedInBlockHeight} <br />
                    Timestamp: ${new Date(
                      tx.timestamp * 1000
                    ).toLocaleString()} <br />
                    Senders: ${tx.senders
                      .map((s) => `${s.address} (${s.amount})`)
                      .join(", ")} <br />
                    Recipients: ${tx.recipients
                      .map((r) => `${r.address} (${r.amount})`)
                      .join(", ")} <br />
                `,
      };
    });

    const links: any = [];
    for (let i = 0; i < layers - 1; i++) {
      const currentLayerNodes = nodes.filter((n: any) => n.group === i + 1);
      const nextLayerNodes = nodes.filter((n: any) => n.group === i + 2);

      currentLayerNodes.forEach((sourceNode: any) => {
        nextLayerNodes.forEach((targetNode: any) => {
          links.push({ source: sourceNode.id, target: targetNode.id });
        });
      });
    }

    setGraphData({ nodes, links });
  };

  const processTransactions = (transactions: any[]) => {
    const layers = Math.ceil(Math.sqrt(transactions.length));
    const nodesPerLayer = Math.ceil(transactions.length / layers);

    const nodes = transactions.map((tx: any, index: number) => {
      const layerIndex = Math.floor(index / nodesPerLayer);
      const positionInLayer = index % nodesPerLayer;

      return {
        id: tx.hash || tx.txId,
        name: `Transaction ${index + 1}`,
        group: layerIndex + 1,
        x: positionInLayer * 20 - (nodesPerLayer * 20) / 2,
        y: 0,
        z: layerIndex * 50,
        data: tx,
      };
    });

    const links: any = [];
    for (let i = 0; i < layers - 1; i++) {
      const currentLayerNodes = nodes.filter((n: any) => n.group === i + 1);
      const nextLayerNodes = nodes.filter((n: any) => n.group === i + 2);

      currentLayerNodes.forEach((sourceNode: any) => {
        nextLayerNodes.forEach((targetNode: any) => {
          links.push({ source: sourceNode.id, target: targetNode.id });
        });
      });
    }

    setGraphData({ nodes, links });
  };

  const renderGraph = (updatedGraphData: any) => {
    const container = document.getElementById("3d-graph");
    if (!container || !updatedGraphData) return;

    const config = coinConfigs[selectedCrypto];
    const Graph = new ForceGraph3D(container)
      .backgroundColor("#000003")
      .graphData({ nodes: [], links: [] })
      .nodeLabel((node: any) => node.label || config.nodeLabel(node))
      .nodeThreeObject((node: any) => {
        const geometry = new SphereGeometry(2, 16, 16);
        const material = new MeshStandardMaterial({
          color: config.nodeColor,
          emissive: config.nodeColor,
          emissiveIntensity: 1,
          transparent: true,
          opacity: 0.9,
        });
        const sphere = new Mesh(geometry, material);
        sphere.userData = { ...node.data };

        // Add pulsating animation effect
        const scaleFactor = Math.sin(Date.now() / 500) * 0.5 + 1.5;
        sphere.scale.set(scaleFactor, scaleFactor, scaleFactor);

        return sphere;
      })
      .linkDirectionalParticles(4) // Add particles moving along the links
      .linkDirectionalParticleWidth(0.5)
      .linkDirectionalParticleColor(() => "#ffffff")
      .linkColor(() => "#8888ff")
      .linkWidth((link: any) => Math.log(link.value || 1) * 0.5)
      .linkCurveRotation(Math.PI / 6) // Add a curve to the links
      .linkOpacity(0.8);

    // Use a spherical layout for nodes
    const phi = (1 + Math.sqrt(5)) / 2; // Golden ratio
    updatedGraphData.nodes.forEach((node: any, i: any) => {
      const radius = 100 + Math.random() * 100; // Random radius for variation
      const angle = 2 * Math.PI * (i / phi);
      node.x = radius * Math.cos(angle);
      node.y = radius * Math.sin(angle);
      node.z = (Math.random() - 0.5) * 200; // Random z-depth
    });

    // Add a glow effect to the scene
    const bloomPass = new UnrealBloomPass(
      new Vector2(window.innerWidth, window.innerHeight),
      1.5,
      0.8,
      0.3
    );
    Graph.postProcessingComposer().addPass(bloomPass);

    // Dynamically batch-add nodes and links with animations
    let nodes = [...updatedGraphData.nodes];
    let links = [...updatedGraphData.links];
    let currentNodes: any[] = [];
    let currentLinks: any[] = [];
    const batchSize = 50; // Number of nodes/links to add in each batch
    const delay = 300; // Delay in milliseconds between batches

    const addDataStep = () => {
      if (nodes.length > 0) {
        currentNodes.push(...nodes.splice(0, batchSize));
        Graph.graphData({ nodes: currentNodes, links: currentLinks });
      }

      if (links.length > 0) {
        currentLinks.push(...links.splice(0, batchSize));
        Graph.graphData({ nodes: currentNodes, links: currentLinks });
      }

      if (nodes.length > 0 || links.length > 0) {
        setTimeout(addDataStep, delay); // Recursive call with delay
      }
    };

    addDataStep();
  };

  useEffect(() => {
    loadTransactions();
  }, [selectedCrypto]);

  useEffect(() => {
    if (graphData) {
      renderGraph(graphData);
    }
  }, [graphData]);

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
          <div
            style={{
              position: "absolute",
              top: "10px",
              left: "10px",
              zIndex: 10,
            }}
          >
            <TimeIndicator />
          </div>
          <div
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              zIndex: 10,
            }}
          >
            <SearchBar onSearch={handleSearch} />
          </div>

          {noTransactionsFound && (
            <div
              style={{
                position: "relative",
                color: "white",
                textAlign: "center",
              }}
            >
              <Load />
            </div>
          )}

          <div id="3d-graph" style={{ width: "100%", height: "100%" }}></div>
        </div>
      )}
    </div>
  );
};

export default GraphVisualization;
