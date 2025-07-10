import React from 'react';
import { Moon, Sun, Book, Code, Sparkles, Quote, Bot } from 'lucide-react';
import { PageType } from '../types/vocabulary';

interface HeaderProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
  currentPage: PageType;
  onPageChange: (page: PageType) => void;
}

export default function Header({ isDarkMode, onToggleTheme, currentPage, onPageChange }: HeaderProps) {
  return (
    <header className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 text-white py-12 px-6 min-h-[40vh] flex flex-col justify-center">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-300/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight relative z-10">
          <span className="inline-flex items-center gap-3">
            <Sparkles className="w-12 h-12 text-yellow-300 animate-pulse" />
            Vocabulary Notebook
            <Sparkles className="w-12 h-12 text-yellow-300 animate-pulse delay-500" />
          </span>
        </h1>
        <p className="text-xl opacity-90 font-medium relative z-10 animate-fade-in">
          Build your vocabulary one word at a time
        </p>
      </div>
      {/* Navigation buttons */}
      <div className="absolute top-8 left-8 flex gap-4 z-20">
        <button
          onClick={() => onPageChange('words')}
          className={`group flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold transition-all duration-500 backdrop-blur-md border border-white/20 hover:scale-105 hover:shadow-2xl ${
            currentPage === 'words'
              ? 'bg-white/30 text-white shadow-2xl shadow-white/20'
              : 'bg-white/10 text-white/90 hover:bg-white/20 hover:text-white'
          }`}
        >
          <Book size={20} className="group-hover:rotate-12 transition-transform duration-300" />
          <span className="font-bold">Words</span>
        </button>
        <button
          onClick={() => onPageChange('functions')}
          className={`group flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold transition-all duration-500 backdrop-blur-md border border-white/20 hover:scale-105 hover:shadow-2xl ${
            currentPage === 'functions'
              ? 'bg-white/30 text-white shadow-2xl shadow-white/20'
              : 'bg-white/10 text-white/90 hover:bg-white/20 hover:text-white'
          }`}
        >
          <Code size={20} className="group-hover:rotate-12 transition-transform duration-300" />
          <span className="font-bold">Functions</span>
        </button>
        <button
          onClick={() => onPageChange('symbols')}
          className={`group flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold transition-all duration-500 backdrop-blur-md border border-white/20 hover:scale-105 hover:shadow-2xl ${
            currentPage === 'symbols'
              ? 'bg-white/30 text-white shadow-2xl shadow-white/20'
              : 'bg-white/10 text-white/90 hover:bg-white/20 hover:text-white'
          }`}
        >
          <Quote size={20} className="group-hover:rotate-12 transition-transform duration-300" />
          <span className="font-bold">Symbols</span>
        </button>
        <button
          onClick={() => onPageChange('assistant')}
          className={`group flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold transition-all duration-500 backdrop-blur-md border border-white/20 hover:scale-105 hover:shadow-2xl ${
            currentPage === 'assistant'
              ? 'bg-white/30 text-white shadow-2xl shadow-white/20'
              : 'bg-white/10 text-white/90 hover:bg-white/20 hover:text-white'
          }`}
        >
          <Bot size={20} className="group-hover:rotate-12 transition-transform duration-300" />
          <span className="font-bold">AI Assistant</span>
        </button>
      </div>
      {/* Theme toggle button */}
      <button
        onClick={onToggleTheme}
        className="absolute top-8 right-8 p-4 rounded-2xl bg-white/10 hover:bg-white/20 transition-all duration-500 group backdrop-blur-md border border-white/20 hover:scale-110 hover:shadow-2xl z-20"
        aria-label="Toggle theme"
      >
        {isDarkMode ? (
          <Sun size={24} className="text-yellow-300 group-hover:rotate-180 transition-transform duration-500" />
        ) : (
          <Moon size={24} className="text-blue-200 group-hover:rotate-180 transition-transform duration-500" />
        )}
      </button>
    </header>
  );
}