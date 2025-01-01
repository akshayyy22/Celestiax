# CelestiaX Cryptocurrency Visualization

CelestiaX is a real-time cryptocurrency transaction visualization platform that enables users to explore dynamic visualizations of cryptocurrency transactions as a neural network. The platform offers interactive features such as transaction search by wallet ID, cryptocurrency selection, and detailed node interactions.




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

CelestiaX is designed to showcase the latest cryptocurrency transactions in a visually compelling manner. Users can interact with a neural network-style visualization where each node represents a transaction. The system provides an option to search wallet IDs and view detailed transaction data for specific cryptocurrencies like Bitcoin, Ethereum, and Solana.

Key Features:
- **Real-Time Neural Network Visualization**: Transactions are visualized as interconnected nodes with dynamic updates.
- **Search Functionality**: Users can search for a specific wallet ID and view corresponding transaction details.
- **Cryptocurrency Selection**: Filter and visualize the last 200 transactions for a selected cryptocurrency.
- **Detailed Interaction**: Hover over nodes to display transaction details such as wallet addresses and amounts.


## Tech Stack

### Frontend:
- **Next.js**: Framework for building the frontend with React and TypeScript.
- **Three.js / React Three Fiber**: For rendering 3D neural network visualizations.
- **3D Force Graph**: Library for creating interactive, force-directed graph visualizations.
- **Tailwind CSS**: A utility-first CSS framework for styling.

### Backend:
- **Rust**: Backend programming language for high performance.
- **Actix Web**: Framework for building APIs and handling requests.
- **Tokio**: Asynchronous runtime enabling real-time data handling.
- **Redis**: Used for Pub/Sub messaging and caching.
- **Docker**: For containerization and deployment.


## File Structure




## Features

1. 3D Neural Network Visualization

    -  Transactions appear as interconnected nodes, dynamically updated in real time.
    - Uses 3D Force Graph and Three.js for rendering.

2. Transaction Search
    - Users can search by wallet ID for the selected cryptocurrency and view transaction details.

3. Cryptocurrency Selection
    - Filter the last 200 transactions for cryptocurrencies like Bitcoin, Ethereum, Solana, and others.

4. Interactive Nodes
    - Hover over nodes to reveal details such as wallet addresses, amounts, and timestamps.








## Model Architecture











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




## Usage
  - Select a cryptocurrency from the dropdown menu.
  - View the latest 200 transactions as nodes in the visualization.
  - Hover over a node to see transaction details.
  - Use the search bar to find transaction details for a specific wallet ID.



## Contributing
We welcome contributions to the CelestiaX project! To contribute:

1. Fork the repository.
2. Create a new branch (git checkout -b feature-branch).
3. Make your changes and commit them (git commit -am 'Add feature').
4. Push to your fork (git push origin feature-branch).
5. Open a pull request.





## License
This project is licensed under the [MIT License](LICENSE).

