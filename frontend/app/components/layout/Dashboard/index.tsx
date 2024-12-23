import { Box, useMediaQuery } from "@mui/material";
import Row3 from "./row3";
import Row1 from "./row1";
import Row2 from "./row2";

const gridTemplateLargeScreens = `
  "g . c"
  "g . f"
  "g . j"
`;

const gridTemplateSmallScreens = `
  "g"
  "c"
  "f"
  "j"
`;


const Dashboard = () => {
  const isAboveMediumScreens = useMediaQuery("(min-width: 1200px)");

  return (
    <Box
      width="100%"
      height="100%"
      display="grid"
      gap="1.5rem"
      sx={
        isAboveMediumScreens
          ? {
              gridTemplateColumns: "repeat(2, minmax(370px, 1fr))",
              gridTemplateRows: "repeat(10, minmax(60px, 1fr))",
              gridTemplateAreas: gridTemplateLargeScreens,
            }
          : {
              gridAutoColumns: "1fr",
              gridAutoRows: "80px",
              gridTemplateAreas: gridTemplateSmallScreens,
            }
      }
    >
      {/* <Row1 />
      <Row2 /> */}
      <Row3 />
    </Box>
  );
};

export default Dashboard;
