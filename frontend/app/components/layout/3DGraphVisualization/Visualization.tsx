"use client";

import ForceGraph3D from "3d-force-graph";
import React, { useEffect, useState } from "react";
import {
    Scene,
    WebGLRenderer,
    PerspectiveCamera,
    AmbientLight,
    DirectionalLight,
    Color,
    Fog,
    Raycaster,
    Vector2,
    Points,
    PointsMaterial,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Float32BufferAttribute } from "three";
import * as THREE from "three";
import { fetchBitcoinTransactions } from "@/app/api/api";
import { BitcoinTransaction } from "@/app/types/types";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";

let mouseX = 0;
let mouseY = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

const GraphVisualization: React.FC = () => {
    const [transactions, setTransactions] = useState<BitcoinTransaction[]>([]);
    const [graphData, setGraphData] = useState<any>(null);
    let renderer: WebGLRenderer;
    let camera: PerspectiveCamera;
    let scene: Scene;
    let controls: OrbitControls;
    const raycaster = new Raycaster();
    const mouse = new Vector2();

    useEffect(() => {
 
        loadTransactions();

        return () => {
            
        };
    }, []);

    const loadTransactions = async () => {
        try {
            const response = await fetchBitcoinTransactions();
            console.log("Fetched transactions:", response);
            const txData: BitcoinTransaction[] = response;
    
            // Group transactions into layers (you can adjust this logic)
            const layers = Math.ceil(Math.sqrt(txData.length)); // Approximate square root for number of layers
            const nodesPerLayer = Math.ceil(txData.length / layers);
    
            const nodes = txData.map((tx, index) => {
                const layerIndex = Math.floor(index / nodesPerLayer);
                const positionInLayer = index % nodesPerLayer;
                const layerSpacing = 50; // Distance between layers
                const nodeSpacing = 20; // Distance between nodes in a layer
    
                return {
                    id: tx.hash,
                    name: `Transaction ${tx.index}`,
                    group: layerIndex + 1,
                    value: tx.output_value,
                    x: positionInLayer * nodeSpacing - (nodesPerLayer * nodeSpacing) / 2,
                    y: 0, // Keep y-axis consistent for all nodes in this version
                    z: layerIndex * layerSpacing,
                    data: tx,
                };
            });
    
            const links : any = [];
            for (let i = 0; i < layers - 1; i++) {
                const currentLayerNodes = nodes.filter((n) => n.group === i + 1);
                const nextLayerNodes = nodes.filter((n) => n.group === i + 2);
    
                currentLayerNodes.forEach((sourceNode) => {
                    nextLayerNodes.forEach((targetNode) => {
                        links.push({
                            source: sourceNode.id,
                            target: targetNode.id,
                        });
                    });
                });
            }
    
            setGraphData({ nodes, links });
        } catch (error) {
            console.error("Error loading transactions:", error);
        }
    };
    

    const renderGraph = () => {
        const container = document.getElementById("3d-graph");
        if (!container || !graphData) {
            console.error("3D Graph container or graph data not ready!");
            return;
        }
    
        const Graph = ForceGraph3D()(container)
            .backgroundColor("#000003")
            .graphData(graphData)
            .nodeLabel((node: any) => `
                <div>
                    <strong>Hash:</strong> ${node.data?.hash || "N/A"} <br />
                    <strong>Inputs:</strong> ${node.data?.input_value_usd || "N/A"} <br />
                    <strong>Outputs:</strong> ${node.data?.output_value || "N/A"} <br />
                </div>
            `)
            .nodeThreeObject((node: any) => {
                const geometry = new THREE.SphereGeometry(1.5); // Smaller nodes
                const material = new THREE.MeshStandardMaterial({
                    color: node.color || "#00ff00", // Neural network-style color
                    emissive: node.color || "#00ff00",
                    emissiveIntensity: 0.7,
                });
                const sphere = new THREE.Mesh(geometry, material);
                sphere.position.set(node.x, node.y, node.z);
                sphere.userData = { ...node.data };
                return sphere;
            })
            .linkColor(() => "#888888") // Subtle link color
            .linkWidth(0.5) // Thin links
            .linkOpacity(0.5); // Semi-transparent links
    
        const bloomPass = new UnrealBloomPass(
            new Vector2(window.innerWidth, window.innerHeight),
            1.5,
            0.4,
            0.85
        );
        bloomPass.strength = 1.2; // Adjusted for a neural network
        bloomPass.radius = 0.4;
        bloomPass.threshold = 0.1;
    
        Graph.postProcessingComposer().addPass(bloomPass);
    };
    

    useEffect(() => {
        if (graphData) {
            console.log("Graph Data:", graphData);
            renderGraph();
        }
    }, [graphData]);

    

    return (
        <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
            <div id="3d-graph" style={{ width: "100%", height: "100%" }}></div>
        </div>
    );
};

export default GraphVisualization;
