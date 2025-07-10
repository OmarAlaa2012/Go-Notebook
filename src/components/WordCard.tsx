import React from 'react';
import { Trash2, Calendar, Code2, Sparkles } from 'lucide-react';
import { VocabularyWord } from '../types/vocabulary';

interface WordCardProps {
  word: VocabularyWord;
  onDelete?: (id: number) => void;
  showDelete?: boolean;
}

export default function WordCard({ word, onDelete, showDelete = false }: WordCardProps) {
  const handleDelete = () => {
    if (onDelete && window.confirm('Are you sure you want to delete this word?')) {
      onDelete(word.id);
    }
  };

  return (
    <div className="relative bg-gradient-to-br from-white/90 to-gray-50/90 dark:from-gray-800/90 dark:to-gray-900/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 rounded-3xl p-8 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20 hover:scale-105 hover:border-purple-400/50 dark:hover:border-purple-500/50 overflow-hidden group">
      {/* Liquid glass effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-3xl"></div>
      <div className="absolute -top-20 -right-20 w-32 h-32 bg-purple-400/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
      <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-blue-400/20 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-1000 delay-200"></div>
      
      {/* Animated gradient border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 group-hover:h-2 transition-all duration-500"></div>
      
      {/* Floating sparkles */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <Sparkles size={16} className="text-purple-400 animate-pulse" />
      </div>
      
      <div className="relative flex justify-between items-start mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 bg-gray-100/50 dark:bg-gray-700/50 px-3 py-1 rounded-full backdrop-blur-sm">
          <Calendar size={14} className="text-purple-500" />
          <span className="font-medium">{word.dateAdded}</span>
        </div>
        {showDelete && onDelete && (
          <button
            onClick={handleDelete}
            className="opacity-0 group-hover:opacity-100 transition-all duration-500 p-3 rounded-2xl bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white hover:scale-110 transform shadow-lg hover:shadow-red-500/30"
            aria-label="Delete word"
          >
            <Trash2 size={18} className="hover:rotate-12 transition-transform duration-300" />
          </button>
        )}
      </div>

      <h3 className="relative text-3xl font-bold text-gray-800 dark:text-white mb-4 capitalize group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-500">
        {word.word}
      </h3>

      <p className="relative text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-6 font-medium">
        {word.meaning}
      </p>

      {word.example && (
        <div className="relative bg-gradient-to-r from-gray-900/95 to-gray-800/95 dark:from-gray-900/95 dark:to-black/95 p-6 rounded-2xl border border-gray-700/50 overflow-hidden group/code">
          {/* Code background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
              backgroundSize: '20px 20px'
            }}></div>
          </div>
          
          {/* Code header */}
          <div className="relative flex items-center gap-2 mb-3 pb-2 border-b border-gray-700/50">
            <Code2 size={16} className="text-green-400" />
            <span className="text-green-400 text-sm font-mono font-bold">Example</span>
            <div className="flex gap-1 ml-auto">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
          </div>
          
          {/* Code content */}
          <div className="relative font-mono text-sm leading-relaxed">
            <span className="text-gray-400">// </span>
            <span className="text-blue-400 italic">{word.example}</span>
          </div>
          
          {/* Hover glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover/code:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
        </div>
      )}
    </div>
  );
}