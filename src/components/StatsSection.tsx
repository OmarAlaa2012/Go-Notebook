import React from 'react';
import { TrendingUp, Calendar, Sparkles } from 'lucide-react';
import { VocabularyStats } from '../types/vocabulary';

interface StatsSectionProps {
  stats: VocabularyStats;
}

export default function StatsSection({ stats }: StatsSectionProps) {
  return (
    <div className="flex justify-center gap-8 mb-12 flex-wrap">
      <div className="relative bg-gradient-to-br from-white/90 to-purple-50/90 dark:from-gray-800/90 dark:to-purple-900/20 backdrop-blur-xl p-8 rounded-3xl shadow-2xl text-center min-w-[180px] border border-white/20 dark:border-gray-700/50 hover:scale-105 transition-all duration-500 group overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-3xl"></div>
        <div className="absolute -top-10 -right-10 w-20 h-20 bg-purple-400/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-1000"></div>
        
        <div className="relative flex items-center justify-center mb-3">
          <div className="p-3 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl shadow-lg">
            <TrendingUp size={24} className="text-white group-hover:scale-110 transition-transform duration-300" />
          </div>
        </div>
        <div className="relative text-4xl font-bold text-purple-600 dark:text-purple-400 mb-3 group-hover:scale-110 transition-transform duration-300">
          {stats.totalWords}
        </div>
        <div className="relative text-gray-600 dark:text-gray-300 text-sm font-bold uppercase tracking-wider">
          Total Words
        </div>
        <Sparkles size={16} className="absolute top-4 right-4 text-purple-400 opacity-0 group-hover:opacity-100 animate-pulse transition-opacity duration-500" />
      </div>
      
      <div className="relative bg-gradient-to-br from-white/90 to-blue-50/90 dark:from-gray-800/90 dark:to-blue-900/20 backdrop-blur-xl p-8 rounded-3xl shadow-2xl text-center min-w-[180px] border border-white/20 dark:border-gray-700/50 hover:scale-105 transition-all duration-500 group overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-3xl"></div>
        <div className="absolute -top-10 -right-10 w-20 h-20 bg-blue-400/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-1000"></div>
        
        <div className="relative flex items-center justify-center mb-3">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg">
            <Calendar size={24} className="text-white group-hover:scale-110 transition-transform duration-300" />
          </div>
        </div>
        <div className="relative text-4xl font-bold text-blue-600 dark:text-blue-400 mb-3 group-hover:scale-110 transition-transform duration-300">
          {stats.todayWords}
        </div>
        <div className="relative text-gray-600 dark:text-gray-300 text-sm font-bold uppercase tracking-wider">
          Added Today
        </div>
        <Sparkles size={16} className="absolute top-4 right-4 text-blue-400 opacity-0 group-hover:opacity-100 animate-pulse transition-opacity duration-500" />
      </div>
    </div>
  );
}