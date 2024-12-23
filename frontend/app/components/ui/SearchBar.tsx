import React from 'react';
import { Search, Loader } from 'lucide-react';
import { useCryptoStore } from '@/app/hooks/useStore'; // Update with your zustand store path

interface SearchBarProps {
  onSearch: (crypto: string, time: string) => void;
  isLoading?: boolean;
}

export default function SearchBar({ onSearch, isLoading = false }: SearchBarProps) {
  const { selectedCrypto, cryptoTime, setSelectedCrypto, setCryptoTime } = useCryptoStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCrypto.trim()) {
      onSearch(selectedCrypto.trim(), cryptoTime.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="relative group">
        <input
          type="text"
          value={selectedCrypto}
          onChange={(e) => setSelectedCrypto(e.target.value)}
          placeholder="Search crypto ID..."
          className="w-64 px-4 py-2 pr-10 text-sm bg-black/40 border border-purple-500/30 rounded-lg 
                   text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50
                   transition-all duration-300 backdrop-blur-sm"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 text-purple-400 
                   hover:text-purple-300 transition-colors duration-200"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader className="w-5 h-5 animate-spin" />
          ) : (
            <Search className="w-5 h-5" />
          )}
        </button>
      </div>
      
    </form>
  );
}
