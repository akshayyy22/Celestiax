"use client";

import React from "react";

interface CryptoButtonProps {
  coins: string[];
  onSelect: (coin: string) => void;
}

const CryptoButton: React.FC<CryptoButtonProps> = ({ coins, onSelect }) => {
  return (
    <div className="flex space-x-4 p-4">
      {coins.map((coin) => (
        <button
          key={coin}
          className="bg-gradient-to-r from-blue-500 to-green-500 text-white font-bold py-2 px-4 rounded"
          onClick={() => onSelect(coin)}
        >
          {coin}
        </button>
      ))}
    </div>
  );
};

export default CryptoButton;
