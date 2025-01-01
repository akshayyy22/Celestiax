import { NextConfig } from 'next';

const config: NextConfig = {
  // Your existing config here

  eslint: {
    ignoreDuringBuilds: true, // Disable ESLint checks during build
  },
};

export default config;
