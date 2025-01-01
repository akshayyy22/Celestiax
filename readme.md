# CelestiaX Cryptocurrency Visualization

CelestiaX is a real-time cryptocurrency transaction visualization platform that enables users to explore dynamic visualizations of cryptocurrency transactions across various blockchains. This project showcases the latest transactions on a 3D globe, with customizable node properties for different cryptocurrencies, including `Bitcoin`, `Ethereum`, `Solana`, and others.


## Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [File Structure](#file-structure)
- [Model Architecture](#model-architecture)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

CelestiaX allows real-time tracking and visualization of cryptocurrency transactions, including popular coins like Bitcoin, Ethereum, Solana, and more. The system integrates with a backend built in Rust using Actix Web and Redis for efficient, real-time data streaming. The frontend is built with Next.js, React, and TypeScript, showcasing dynamic 3D visualizations of cryptocurrency transactions across a globe.

Key Features:
- **Real-Time Visualization**: Watch cryptocurrency transactions as they happen on a 3D globe.
- **Interactive Node Network**: View nodes representing transactions, with real-time updates.
- **Blockchain Filters**: Filter and view transactions from specific cryptocurrencies (Bitcoin, Ethereum, Solana, etc.).
- **Customizable Visualization**: Customize node colors and labels per blockchain.
- **Post-Processing Effects**: Apply bloom effects to enhance the visual appearance of transactions.

## Tech Stack

### Frontend:
- **Next.js**: Framework for building the frontend with React and TypeScript.
- **Material-UI (MUI)**: A library for building responsive UI components.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **WebSocket / SSE**: For real-time data push from backend to frontend.

### Backend:
- **Rust**: Backend language for high performance and memory safety.
- **Actix Web**: Web framework for building APIs and handling requests in Rust.
- **Tokio**: Asynchronous runtime for Rust, enabling real-time data handling.
- **Redis**: Pub/Sub messaging for real-time communication between the backend and frontend.
- **Docker**: Containerization to streamline deployment.

### Data Visualization:
- **WebSocket / SSE**: For real-time data push from backend to frontend.

## File Structure

/frontend
  ├── /app
  │   ├── /components
  │   │   ├── /3DGraphVisualization
  │   │   │   └── Visualization.tsx
  │   │   ├── /Dashboard
  │   │   │   ├── Row1.tsx
  │   │   │   ├── Row2.tsx
  │   │   │   ├── Row3.tsx
  │   │   │   └── index.tsx
  │   │   ├── /ui
  │   │   │   ├── CryptoButton.tsx
  │   │   │   ├── Globedemo.tsx
  │   │   │   ├── Header.tsx
  │   │   │   └── WorldMapDemo.tsx
  │   ├── /pages
  │   │   ├── _app.tsx
  │   │   └── index.tsx
  │   ├── /types
  │   │   └── types.d.tsx
  │   ├── /api
  │   │   ├── constant.ts
  │   │   └── api.ts
  │   ├── /hooks
  │   │   ├── useStore.ts
  │   │   ├── use-scroll.ts
  │   │   └── useWebSocket.ts
  ├── global.css
  ├── page.tsx
  ├── layout.tsx

/backend
  ├── /src
  │   ├── /api
  │   │   ├── /handlers
  │   │   │   ├── bitcoin.rs
  │   │   │   └── mod.rs
  │   │   ├── /models
  │   │   │   ├── bitcoin.rs
  │   │   │   └── mod.rs
  │   │   └── routes.rs
  │   ├── /services
  │   │   ├── websocket.rs
  │   │   ├── pubsub.rs
  │   │   └── crypto_api.rs
  │   ├── /redis
  │   │   ├── mod.rs
  │   │   └── publisher.rs
  │   ├── /utils
  │   │   ├── config.rs
  │   │   ├── logger.rs
  │   │   └── errors.rs
  │   ├── main.rs
  │   └── lib.rs
  ├── Dockerfile
  ├── Cargo.toml
  ├── .env
  └── README.md







## Model Architecture

### Frontend
1. **3D Globe Rendering**: The core of the visualization. It renders a dynamic 3D globe using `Three.js` with support for real-time updates (Bitcoin, Ethereum transactions). This is powered by `React Three Fiber` for smooth React integration.
2. **Graph Visualization**: Uses `3d-force-graph` to visualize cryptocurrency transaction data as nodes on the globe, representing transactions from different cryptocurrencies. Nodes and links can be dynamically updated.
3. **Real-Time Communication**: `WebSocket` or `SSE` is used to push transaction data from the backend to the frontend in real time.

### Backend
1. **Real-Time Data Generation**: The backend simulates cryptocurrency transactions using `Actix Web` to serve data to clients. It also uses `Redis` for real-time communication with the frontend via `WebSocket` or `SSE`.
2. **API Layer**: Exposes API endpoints to fetch cryptocurrency transactions and handle custom filters for different blockchains (Bitcoin, Ethereum, etc.).
3. **Data Simulation & Streaming**: The backend leverages `Tokio` for asynchronous operations to simulate transactions and stream them to the frontend.

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/celestiax.git
   cd celestiax

2. **Install Frontend Dependencies:**
    ```bash
    cd frontend
    npm install


3. **Install Backend Dependencies::**
    ```bash
    cd backend
    cargo build


4. **Run the Project:**

    *Start the backend:*
    ```bash
    cargo run 

 

    *Start the frontend:*
    ```bash
        npm run dev


5. **Open the app in your browser at**

    *http://localhost:3000*