import DashboardBox from "@/app/components/ui/DashboardComponents/DashboardBox";
import BoxHeader from "@/app/components/ui/DashboardComponents/BoxHeader";

import { useTheme } from "@mui/material";
import { useMemo } from "react";


const Row2 = () => {

  return (
    <>

<DashboardBox gridArea="f">
        <BoxHeader title="Product Prices vs Expenses" sideText="+4%" />
      
      </DashboardBox>
    </>
  );
};

export default Row2;
