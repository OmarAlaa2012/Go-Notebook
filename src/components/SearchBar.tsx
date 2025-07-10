import React from 'react';
import { Search, Sparkles } from 'lucide-react';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export default function SearchBar({ searchTerm, onSearchChange }: SearchBarProps) {
  return (
    <div className="mb-8 relative group">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative">
        <div className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-purple-500 transition-colors duration-300">
          <Search size={22} className="group-hover:scale-110 transition-transform duration-300" />
        </div>
        <div className="absolute right-6 top-1/2 transform -translate-y-1/2 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <Sparkles size={18} className="animate-pulse" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="🔍 Search words..."
          className="w-full pl-16 pr-16 py-6 border-2 border-gray-200/50 dark:border-gray-600/50 rounded-full focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all duration-500 bg-white/80 dark:bg-gray-700/80 backdrop-blur-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-lg font-medium hover:bg-white/90 dark:hover:bg-gray-700/90 hover:scale-[1.02] shadow-lg hover:shadow-2xl hover:shadow-purple-500/20"
        />
      </div>
    </div>
  );
}