"use client";

import React, { useEffect, useState } from "react";
import ForceGraph3D from "3d-force-graph";
import { SphereGeometry, MeshStandardMaterial, Mesh, Vector2 } from "three";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { useCryptoStore } from "@/app/hooks/useStore";
import { fetchWalletTransactions } from "@/app/api/api";
import coinConfigs from "@/app/types/coinUtils";
import { BitcoinTransaction } from "@/app/types/types";
import { SearchBitcoinTransaction, SearchEthereumTransaction } from "@/app/types/types";
import { TimeIndicator } from "../../ui/time-indicator";
import SearchBar from "@/app/components/ui/SearchBar";

const GraphVisualization: React.FC = () => {
    const [transactions, setTransactions] = useState<BitcoinTransaction[]>([]);
    const [searchMode, setSearchMode] = useState(false); // Track whether search mode is active
    const { selectedCrypto } = useCryptoStore() as {
        selectedCrypto: keyof typeof coinConfigs;
    };
    const [graphData, setGraphData] = useState<any>(null);

    const handleSearch = async (walletId: string) => {
        try {
            const blockchain = selectedCrypto;
            const fetchedTransactions = await fetchWalletTransactions(blockchain, walletId);

            if (fetchedTransactions?.data?.items && Array.isArray(fetchedTransactions.data.items)) {
                setSearchMode(true); // Enable search mode
                processSearchTransactions(fetchedTransactions.data.items);
            } else {
                console.error("Fetched transactions are not in the expected format:", fetchedTransactions);
            }
        } catch (error) {
            console.error(`Error fetching transactions for wallet ID ${walletId}:`, error);
        }
    };

    const loadTransactions = async () => {
        if (searchMode) return; // Prevent fetching transactions during search mode
        try {
            const config = coinConfigs[selectedCrypto];
            const transactions = await config.fetchTransactions();
            processTransactions(transactions);
        } catch (error) {
            console.error(`Error loading ${selectedCrypto} transactions:`, error);
        }
    };

    const processSearchTransactions = (transactions: (SearchBitcoinTransaction | SearchEthereumTransaction)[]) => {
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
                    Transaction ID: ${tx.transactionId}
                    Mined in Block Hash: ${tx.minedInBlockHash}
                    Mined in Block Height: ${tx.minedInBlockHeight}
                    Timestamp: ${new Date(tx.timestamp * 1000).toLocaleString()}
                    Senders: ${tx.senders.map(s => `${s.address} (${s.amount})`).join(", ")}
                    Recipients: ${tx.recipients.map(r => `${r.address} (${r.amount})`).join(", ")}
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

        setGraphData({ nodes, links }); // Update graph data for search
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
        const Graph = ForceGraph3D()(container)
            .backgroundColor("#000003")
            .graphData({ nodes: [], links: [] }) // Start with an empty graph
            .nodeLabel((node: any) => node.label || config.nodeLabel(node)) // Use detailed label for search nodes
            .nodeThreeObject((node: any) => {
                const geometry = new SphereGeometry(1, 8, 8);
                const material = new MeshStandardMaterial({
                    color: config.nodeColor,
                    emissive: config.nodeColor,
                    emissiveIntensity: 0.5,
                });
                const sphere = new Mesh(geometry, material);
                sphere.userData = { ...node.data };
                return sphere;
            })
            .linkColor(() => "#888888")
            .linkWidth(0.3)
            .linkOpacity(0.5);

        const bloomPass = new UnrealBloomPass(
            new Vector2(window.innerWidth, window.innerHeight),
            1.2,
            0.4,
            0.8
        );
        Graph.postProcessingComposer().addPass(bloomPass);

        Graph.graphData(updatedGraphData);

        // Gradual rendering with delays
        let nodes = [...graphData.nodes];
        let links = [...graphData.links];
        let currentNodes: any[] = [];
        let currentLinks: any[] = [];
        const batchSize = 20; // Number of nodes/links to add in each batch
        const delay = 500; // Delay in milliseconds between batches
    
        const addDataStep = () => {
            if (nodes.length > 0) {
                currentNodes.push(...nodes.splice(0, batchSize)); // Add batch of nodes
                Graph.graphData({ nodes: currentNodes, links: currentLinks });
            }
    
            if (links.length > 0) {
                currentLinks.push(...links.splice(0, batchSize)); // Add batch of links
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
        if (searchMode) {
            renderGraph(graphData);
        } else if (graphData) {
            renderGraph(graphData);
        }
    }, [searchMode, graphData]);

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
