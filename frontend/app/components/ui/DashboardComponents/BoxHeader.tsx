import { Box, Typography } from "@mui/material";
import React from "react";
import FlexBetween from "./FlexBetween";

type Props = {
  title: string;
  sideText: string;
  subtitle?: string;
  icon?: React.ReactNode;
};

const BoxHeader = ({ icon, title, subtitle, sideText }: Props) => {
  return (
    <FlexBetween style={{ color: "#c2c5ce", margin: "1.5rem 1rem 0 1rem" }}>
      <FlexBetween>
        {icon}
        <Box width="100%">
          <Typography
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "14px",
              fontWeight: 600,
              marginBottom: "-0.1rem",
            }}
          >
            {title}
          </Typography>
          <Typography
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "10px",
              fontWeight: 400,
              color: "#8f929b",
            }}
          >
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      <Typography
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize: "12px",
          fontWeight: 700,
          color: "#f2b455",
        }}
      >
        {sideText}
      </Typography>
    </FlexBetween>
  );
};

export default BoxHeader;