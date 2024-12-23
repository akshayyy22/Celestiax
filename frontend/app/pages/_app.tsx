// pages/_app.tsx
import React from 'react';
import { AppProps } from 'next/app';
import { ThemeProvider } from "next-themes";
import './global.css'

import Script from 'next/script';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
    return (
        <ThemeProvider attribute="class" defaultTheme="dark">
        <Component {...pageProps} />
      </ThemeProvider>
    );
};

export default MyApp;