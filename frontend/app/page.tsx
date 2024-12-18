// app/page.tsx
import React from 'react';
import { Box } from "@mui/material";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { themeSettings } from "./theme";

import Home from './pages/index';

const Page: React.FC = () => {
    const theme = useMemo(() => createTheme(themeSettings), []);
    return (
        <main>
            <Home />

        </main>
    );
};

export default Page;
