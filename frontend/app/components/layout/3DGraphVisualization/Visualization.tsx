

"use client";

import ForceGraph3D from "3d-force-graph";
import React, { useEffect, useState } from "react";
import {
    Scene,
    WebGLRenderer,
    PerspectiveCamera,

    SphereGeometry,
    MeshStandardMaterial,
    Mesh,

    Raycaster,
    Vector2,

} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { fetchBitcoinTransactions , fetchEthereumTransactions , fetchAlgorandTransactions } from "@/app/api/api";
import { BitcoinTransaction } from "@/app/types/types";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { useCryptoStore } from "@/app/hooks/useStore";
import coinConfigs from "@/app/types/coinUtils";
import { TimeIndicator } from "../../ui/time-indicator";
import  SearchBar  from "@/app/components/ui/SearchBar";
let mouseX = 0;
let mouseY = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

const GraphVisualization: React.FC = () => {
    const [transactions, setTransactions] = useState<BitcoinTransaction[]>([]);
    const [graphData, setGraphData] = useState<any>(null);
    const { selectedCrypto, setSelectedCrypto } = useCryptoStore() as {
        selectedCrypto: keyof typeof coinConfigs;
        setSelectedCrypto: (value: keyof typeof coinConfigs) => void;
    };
    const handleSearch = (query: string) => {
        console.log('Searching for:', query);
        // Implement your search logic here
      };
    
    let renderer: WebGLRenderer;
    let camera: PerspectiveCamera;
    let scene: Scene;
    let controls: OrbitControls;
    const raycaster = new Raycaster();
    const mouse = new Vector2();

    useEffect(() => {
        loadTransactions();
    }, [selectedCrypto]);

    const loadTransactions = async () => {
        try {
            const config = coinConfigs[selectedCrypto];
            const transactions = await config.fetchTransactions();

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
                const currentLayerNodes = nodes.filter((n : any) => n.group === i + 1);
                const nextLayerNodes = nodes.filter((n : any) => n.group === i + 2);

                currentLayerNodes.forEach((sourceNode : any) => {
                    nextLayerNodes.forEach((targetNode : any) => {
                        links.push({ source: sourceNode.id, target: targetNode.id });
                    });
                });
            }

            setGraphData({ nodes, links });
        } catch (error) {
            console.error(`Error loading ${selectedCrypto} transactions:`, error);
        }
    };

    const renderGraph = () => {
        const container = document.getElementById("3d-graph");
        if (!container || !graphData) return;
    
        const config = coinConfigs[selectedCrypto];
        const Graph = ForceGraph3D()(container)
            .backgroundColor("#000003")
            .graphData({ nodes: [], links: [] }) // Start with an empty graph
            .nodeLabel(config.nodeLabel)
            .nodeThreeObject((node: any) => {
                const geometry = new SphereGeometry(1.5);
                const material = new MeshStandardMaterial({
                    color: config.nodeColor,
                    emissive: config.nodeColor,
                    emissiveIntensity: 0.7,
                });
                const sphere = new Mesh(geometry, material);
                sphere.position.set(node.x, node.y, node.z);
                sphere.userData = { ...node.data };
                return sphere;
            })
            .linkColor(() => "#888888")
            .linkWidth(0.5)
            .linkOpacity(0.5);
    
        const bloomPass = new UnrealBloomPass(
            new Vector2(window.innerWidth, window.innerHeight),
            1.5,
            0.4,
            0.85
        );
        bloomPass.strength = 1.2;
        bloomPass.radius = 0.4;
        bloomPass.threshold = 0.1;
    
        Graph.postProcessingComposer().addPass(bloomPass);
    
        // Gradually add nodes and links
        let nodes = [...graphData.nodes];
        let links = [...graphData.links];
        let currentNodes: any[] = [];
        let currentLinks: any[] = [];
    
        const addDataStep = () => {
            if (nodes.length > 0) {
                currentNodes.push(nodes.shift()!);
                Graph.graphData({ nodes: currentNodes, links: currentLinks });
            }
    
            if (links.length > 0) {
                currentLinks.push(links.shift()!);
                Graph.graphData({ nodes: currentNodes, links: currentLinks });
            }
    
            if (nodes.length > 0 || links.length > 0) {
                requestAnimationFrame(addDataStep);
            }
        };
    
        addDataStep();
    };
    

    useEffect(() => {
        if (graphData) renderGraph();
    }, [graphData]);

    return (
        <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
            <div style={{ position: "absolute", top: "10px", left: "10px", zIndex: 10 }}>
                      <TimeIndicator />
            </div>
            <div style={{ position: "absolute", top: "10px", right: "10px", zIndex: 10 }}>
               
            <SearchBar onSearch={handleSearch} />

            </div>


            <div id="3d-graph" style={{ width: "100%", height: "100%" }}></div>
        </div>
    );
};

export default GraphVisualization;
