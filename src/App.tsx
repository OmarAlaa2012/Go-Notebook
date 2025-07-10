import React, { useState, useMemo } from 'react';
import { VocabularyWord, PageType } from './types/vocabulary';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useTheme } from './hooks/useTheme';
import { goVocabulary } from './data/goVocabulary';
import { functionVocabulary } from './data/functionVocabulary';
import { symbolsVocabulary } from './data/symbolsVocabulary';
import Header from './components/Header';
import StatsSection from './components/StatsSection';
import AddWordForm from './components/AddWordForm';
import SearchBar from './components/SearchBar';
import VocabularyGrid from './components/VocabularyGrid';
import AssistantPage from './components/AssistantPage';

function App() {
  const [customWords, setCustomWords] = useLocalStorage<VocabularyWord[]>('customVocabulary', []);
  const [currentPage, setCurrentPage] = useLocalStorage<PageType>('currentPage', 'words');
  const [searchTerm, setSearchTerm] = useState('');
  const { isDarkMode, toggleTheme } = useTheme();

  // Combine custom words with Go vocabulary for the words page
  const allWords = useMemo(() => [...customWords, ...goVocabulary], [customWords]);

  // Filter words based on search term
  const filteredWords = useMemo(() => {
    let wordsToFilter: VocabularyWord[];
    if (currentPage === 'words') {
      wordsToFilter = allWords;
    } else if (currentPage === 'functions') {
      wordsToFilter = functionVocabulary;
    } else if (currentPage === 'symbols') {
      wordsToFilter = symbolsVocabulary;
    } else {
      wordsToFilter = [];
    }
    if (!searchTerm) return wordsToFilter;
    const searchLower = searchTerm.toLowerCase();
    return wordsToFilter.filter(word =>
      word.word.toLowerCase().includes(searchLower) ||
      word.meaning.toLowerCase().includes(searchLower) ||
      (word.example && word.example.toLowerCase().includes(searchLower))
    );
  }, [allWords, functionVocabulary, symbolsVocabulary, searchTerm, currentPage]);

  // Calculate stats
  const stats = useMemo(() => {
    const today = new Date().toLocaleDateString();
    const todayWords = customWords.filter(word => word.dateAdded === today).length;
    
    return {
      totalWords: customWords.length,
      todayWords
    };
  }, [customWords]);

  const handleAddWord = (wordData: Omit<VocabularyWord, 'id' | 'dateAdded'>) => {
    const newWord: VocabularyWord = {
      ...wordData,
      id: Date.now(),
      dateAdded: new Date().toLocaleDateString()
    };
    
    setCustomWords(prev => [newWord, ...prev]);
  };

  const handleDeleteWord = (id: number) => {
    setCustomWords(prev => prev.filter(word => word.id !== id));
  };

  const handlePageChange = (page: PageType) => {
    setCurrentPage(page);
    setSearchTerm(''); // Clear search when switching pages
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/30 to-blue-50/30 dark:from-[#131313] dark:via-[#121212] dark:to-[#131313] transition-all duration-500 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 -right-40 w-80 h-80 bg-blue-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute -bottom-40 left-1/2 w-80 h-80 bg-indigo-300/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>
      
      <div className="max-w-7xl mx-auto">
        <Header
          isDarkMode={isDarkMode}
          onToggleTheme={toggleTheme}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
        
        <main className="relative p-8">
          {currentPage === 'words' && (
            <>
              <StatsSection stats={stats} />
              <AddWordForm onAddWord={handleAddWord} />
            </>
          )}
          
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />
          
          {currentPage === 'assistant' ? (
            <AssistantPage />
          ) : (
            <VocabularyGrid
              words={filteredWords}
              onDeleteWord={currentPage === 'words' ? handleDeleteWord : undefined}
              showDelete={currentPage === 'words'}
              title={
                currentPage === 'functions'
                  ? 'Go Functions Reference'
                  : currentPage === 'symbols'
                  ? 'Symbols, Operators & Quotes Reference'
                  : undefined
              }
            />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;