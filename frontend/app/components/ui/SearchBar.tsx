

import React, { useState } from 'react';
import { Search, Loader } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
}

export default function SearchBar({ onSearch, isLoading = false }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="relative group">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search Wallet ID"
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
      {/* Search results animation container */}
      <div className="absolute top-full left-0 right-0 mt-2 bg-black/80 border border-purple-500/30 
                    rounded-lg backdrop-blur-sm hidden group-focus-within:block">
        {/* Add search results here */}
      </div>
    </form>
  );
}
