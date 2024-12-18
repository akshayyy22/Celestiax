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

        // Add sequential IDs and map timestamps correctly
        const processedData = data.map((transaction, index) => ({
          ...transaction,
          
          id: index + 1, // Start ID from 1
          time: transaction.block?.timestamp?.time || "N/A", // Safely access nested timestamp
        }));

        setBitcoinTransactions(processedData);
      } catch (error) {
        console.error("Error fetching Bitcoin transactions:", error);
      }
    };
    fetchData();
  }, []);

  const bitcoinColumns = [
    { 
      field: "id", 
      headerName: "ID", 
      flex: 0.2,
    },
    { field: "hash", headerName: "Hash", flex: 1 },
    { field: "input_value", headerName: "Input Value (Satoshis)", flex: 0.5 },
    { field: "output_value", headerName: "Output Value (Satoshis)", flex: 0.5 },
    { field: "fee_value", headerName: "Fee (Satoshis)", flex: 0.5 },
    { 
      field: "time", 
      headerName: "Timestamp (UTC)", 
      flex: 1,
    },
  ];

  return (
    <>
      <DashboardBox gridArea="g">
        <BoxHeader title="Bitcoin Transactions" sideText="Latest Updates" />
        <Box
          mt="1rem"
          p="0 0.5rem"
          height="300px"
          minHeight="300px"
          sx={{
            overflowY: "auto",
            overflowX: "hidden",
            "& .MuiDataGrid-root": {
              color: "#d1d3da",
              borderColor: "#48494e",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: `1px solid #48494e !important`,
            },
            "& .MuiDataGrid-columnHeaders": {
              borderBottom: `1px solid #48494e !important`,
            },
            "& .MuiDataGrid-columnSeparator": {
              visibility: "hidden",
            },
          }}
        >
          <DataGrid
            columnHeaderHeight={25}
            rowHeight={35}
            rows={bitcoinTransactions}
            columns={bitcoinColumns}
            getRowId={(row) => row.id} // Unique ID from mapped data
            autoHeight={false}
            hideFooter
            disableColumnMenu
          />
        </Box>
      </DashboardBox>
    </>
  );
};

export default Row3;
