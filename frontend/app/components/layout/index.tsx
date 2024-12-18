import { Box, useMediaQuery } from "@mui/material";
import Row3 from "./Dashboard/row";

const gridTemplateLargeScreens = `
  "g "
  "g "
  "g "
`;

const gridTemplateSmallScreens = `
  "g"
  "g"
  "g"

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
      <Row3 />
    </Box>
  );
};

export default Dashboard;
