"use client";
import DashboardBox from "@/app/components/ui/DashboardComponents/DashboardBox";
import BoxHeader from "@/app/components/ui/DashboardComponents/BoxHeader";
import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { fetchBitcoinTransactions } from "@/app/api/api";
import { BitcoinTransaction } from "@/app/types/types";

const Row3 = () => {
  const [bitcoinTransactions, setBitcoinTransactions] = useState<BitcoinTransaction[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchBitcoinTransactions();

        const processedData = data.map((transaction, index) => ({
          ...transaction,
          id: index + 1,
          time: transaction.block?.timestamp?.time || "N/A",
        }));

        setBitcoinTransactions(processedData);
      } catch (error) {
        console.error("Error fetching Bitcoin transactions:", error);
      }
    };
    fetchData();
  }, []);

  const bitcoinColumns = [
    { field: "id", headerName: "ID", flex: 0.2 },
    { field: "hash", headerName: "Hash", flex: 1 },
    { field: "input_value", headerName: "Input Value (Satoshis)", flex: 0.5 },
    { field: "output_value", headerName: "Output Value (Satoshis)", flex: 0.5 },
    { field: "fee_value", headerName: "Fee (Satoshis)", flex: 0.5 },
    { field: "time", headerName: "Timestamp (UTC)", flex: 1 },
  ];

  return (
    <DashboardBox gridArea="g">
      <BoxHeader title="Bitcoin Transactions" sideText="Latest Updates" />
      <Box
        mt="1rem"
        p="1rem"
        height="350px"
        sx={{
          background: "radial-gradient(circle at top left, #1d1e2f, #0b0b17)",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.8)",
          borderRadius: "12px",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* Stellar Animation */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 60%)",
            animation: "moveGlow 15s linear infinite",
            pointerEvents: "none",
            opacity: 0.3,
          }}
        />
     <DataGrid
  columnHeaderHeight={30}
  rowHeight={40}
  rows={bitcoinTransactions}
  columns={bitcoinColumns}
  getRowId={(row) => row.id}
  autoHeight={false}
  hideFooter
  disableColumnMenu
  sx={{
    "& .MuiDataGrid-root": {
      color: "#ffffff", // Grid text color
      borderColor: "#48494e", // Outer border color
    },
    "& .MuiDataGrid-cell": {
      borderBottom: "1px solid rgba(255, 255, 255, 0.2) !important",
      fontSize: "0.9rem",
      color: "#e0e0e0", // Cell text color
    },
    "& .MuiDataGrid-columnHeaders": {
      backgroundColor: "rgba(0, 0, 0, 0.8) !important", // Dark column header background
      borderBottom: "1px solid rgba(255, 255, 255, 0.2) !important",
      color: "#d1d1d1 !important", // Header text color
      fontSize: "0.85rem",
    },
    "& .MuiDataGrid-columnHeadersInner": {
      backgroundColor: "rgba(0, 0, 0, 0.8) !important", // Ensures the inner header has the same color
    },
    "& .MuiDataGrid-columnSeparator": {
      visibility: "visible",
      color: "rgba(255, 255, 255, 0.2) !important", // Separator color
    },
    "& .MuiDataGrid-columnHeaderTitle": {
      color: "#d1d1d1 !important", // Ensures header titles are styled correctly
    },
    "& .MuiDataGrid-virtualScroller": {
      backgroundColor: "transparent", // Grid scroller background
    },
    "& .MuiDataGrid-footerContainer": {
      backgroundColor: "rgba(0, 0, 0, 0.8) !important", // Footer styling (if applicable)
    },
  }}
/>

      </Box>
    </DashboardBox>
  );
};

export default Row3;
