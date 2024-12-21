import DashboardBox from "@/app/components/ui/DashboardComponents/DashboardBox";
import BoxHeader from "@/app/components/ui/DashboardComponents/BoxHeader";

import { useTheme } from "@mui/material";
import { useMemo } from "react";


const Row1 = () => {

  return (
    <>

      <DashboardBox gridArea="c">
        <BoxHeader
          title="Revenue Month by Month"
          subtitle="graph representing the revenue month by month"
          sideText="+4%"
        />
      
      </DashboardBox>
    </>
  );
};

export default Row1;
