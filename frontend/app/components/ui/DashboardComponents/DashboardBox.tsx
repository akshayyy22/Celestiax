// DashboardBox.tsx
"use client";
import { Box } from "@mui/material";
import { styled } from "@mui/system";
import { useTheme } from "@mui/material/styles";

const DashboardBox = styled(Box)(({ theme }) => ({
  backgroundColor: '#2d2d34',
  borderRadius: "1rem",
  boxShadow: "0.15rem 0.2rem 0.15rem 0.1rem rgba(0, 0, 0, .8)",
  overflow: "hidden", // Ensures that the content stays within the box and scrolling is controlled by the inner container
  
}));

export default DashboardBox;
