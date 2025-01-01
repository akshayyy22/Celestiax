// pages/_app.tsx
import React from 'react';
import { AppProps } from 'next/app';
import { ThemeProvider } from "next-themes";
import './global.css'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
    return (
        <ThemeProvider attribute="class" defaultTheme="dark">
        <Component {...pageProps} />
      </ThemeProvider>
    );
};

export default MyApp;