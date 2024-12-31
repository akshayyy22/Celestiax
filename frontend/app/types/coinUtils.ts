import { fetchBitcoinTransactions, fetchEthereumTransactions, fetchAlgorandTransactions , fetchWalletTransactions } from "@/app/api/api";

const coinConfigs = {
    bitcoin: {
        fetchTransactions: fetchBitcoinTransactions,
        nodeLabel: (node: any) => `
            <div>
                <strong>Hash:</strong> ${node.data?.hash || "N/A"} <br />
                <strong>Block Height:</strong> ${node.data?.block?.height || "N/A"} <br />
                <strong>Timestamp:</strong> ${node.data?.block?.timestamp?.time || "N/A"} UTC <br />
                <strong>Inputs (USD):</strong> $${node.data?.input_value_usd.toFixed(2) || "N/A"} <br />
                <strong>Input Count:</strong> ${node.data?.input_count || "N/A"} <br />
                <strong>Output Count:</strong> ${node.data?.output_count || "N/A"} <br />
                <strong>Output Value:</strong> ${node.data?.output_value || "N/A"} <br />
                <strong>Transaction Fee:</strong> $${node.data?.fee_value_usd.toFixed(2) || "N/A"} (${node.data?.fee_value_decimal} Satoshis) <br />
                <strong>Mined Value:</strong> ${node.data?.mined_value || "N/A"} <br />
                <strong>Mined Value (Decimal):</strong> ${node.data?.mined_value_decimal || "N/A"} <br />
                <strong>Transaction Size:</strong> ${node.data?.tx_size || "N/A"} bytes<br />
                <strong>Transaction Version:</strong> ${node.data?.tx_version || "N/A"}<br />
                <strong>Transaction Vsize:</strong> ${node.data?.tx_vsize || "N/A"}<br />
                <strong>Transaction Weight:</strong> ${node.data?.tx_weight || "N/A"}<br />
                <strong>Coinbase Transaction:</strong> ${node.data?.tx_coinbase ? 'Yes' : 'No'}<br />
                <strong>Locktime:</strong> ${node.data?.tx_locktime || "N/A"}<br />
            </div>
        `,
        nodeColor: "#f2a900", // Gold-orange for Bitcoin
    },
    ethereum: {
        fetchTransactions: fetchEthereumTransactions,
        nodeLabel: (node: any) => `
            <div>
                <strong>Transaction Hash:</strong> ${node.data?.hash || "N/A"} <br />
                <strong>Block Height:</strong> ${node.data?.block?.height || "N/A"} <br />
                <strong>Timestamp:</strong> ${node.data?.block?.timestamp?.time || "N/A"} UTC <br />
                <strong>From Address:</strong> ${node.data?.address?.address || "N/A"} <br />
                <strong>To Address:</strong> ${node.data?.to?.address || "N/A"} <br />
                <strong>Gas Used:</strong> ${node.data?.gas || "N/A"} <br />
                <strong>Gas Price:</strong> ${node.data?.gas_price || "N/A"} Gwei<br />
                <strong>Gas Value (USD):</strong> $${node.data?.gas_value_usd.toFixed(2) || "N/A"}<br />
                <strong>Transaction Fee Payer:</strong> ${node.data?.fee_payer || "N/A"} <br />
                <strong>Success:</strong> ${node.data?.success ? 'Yes' : 'No'}<br />
                <strong>Error:</strong> ${node.data?.error || "None"}<br />
            </div>
        `,
        nodeColor: "#627eea", // Blue-violet for Ethereum
    },
    algorand: {
        fetchTransactions: fetchAlgorandTransactions,
        nodeLabel: (node: any) => `
            <div>
                <strong>Transaction Hash:</strong> ${node.data?.hash || "N/A"} <br />
                <strong>Block Height:</strong> ${node.data?.block?.height || "N/A"} <br />
                <strong>Timestamp:</strong> ${node.data?.block?.timestamp?.time || "N/A"} UTC <br />
                <strong>Sender Address:</strong> ${node.data?.sender?.address || "N/A"} <br />
                <strong>Token Name:</strong> ${node.data?.currency?.name || "N/A"} <br />
                <strong>Token ID:</strong> ${node.data?.currency?.tokenId || "N/A"} <br />
                <strong>Amount Transferred:</strong> ${(node.data?.amount / Math.pow(10, node.data?.currency.decimals)).toFixed(node.data.currency.decimals) || "N/A"} ${node.data.currency.symbol} <br />
                <strong>Fee:</strong> ${(node.data?.fee / 1e6).toFixed(6) || "N/A"} Algos<br /> <!-- Assuming fee is in microAlgos -->
                <strong>Error Message:</strong> ${node.data.poolerror || "None"}<br />
            </div>
        `,
        nodeColor: "#00aa99", // Teal for Algorand
    },  
    tron : {
        fetchTransactions: fetchWalletTransactions,
        nodeLabel: (node: any) => '' ,
        nodeColor: "#eb0029" // Red for Tron
    },
    litecoin : {
        fetchTransactions: fetchWalletTransactions,
        nodeLabel: (node: any) => '' ,
        nodeColor: "#bfbbbb" // Silver for Litecoin
    },
    "bitcoin-cash" : {
        fetchTransactions: fetchWalletTransactions,
        nodeLabel: (node: any) => '' ,
        nodeColor: "#8dc351" // Green for Bitcoin Cash
    },
    dash : {
        fetchTransactions: fetchWalletTransactions,
        nodeLabel: (node: any) => '' ,
        nodeColor: "#1c75bc" // Blue for Dash
    },
    dogecoin : {
        fetchTransactions: fetchWalletTransactions,
        nodeLabel: (node: any) => '' ,
        nodeColor: "#c3a634" // Gold-brown for Dogecoin
    },
    "binance-smart-chain" : {
        fetchTransactions: fetchWalletTransactions,
        nodeLabel: (node: any) => '' ,
        nodeColor: "#f3ba2f" // Yellow for Binance Smart Chain

    },
    polygon : {
        fetchTransactions: fetchWalletTransactions,
        nodeLabel: (node: any) => '' ,
        nodeColor: "#8247e5"  // Purple for Polygon

    },
    avalanche : {
        fetchTransactions: fetchWalletTransactions,
        nodeLabel: (node: any) => '' ,
        nodeColor: "#e84142" // Red for Avalanche


    },
};

export default coinConfigs;

