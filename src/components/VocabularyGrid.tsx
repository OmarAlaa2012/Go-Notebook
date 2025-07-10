import React from 'react';
import { VocabularyWord } from '../types/vocabulary';
import WordCard from './WordCard';

interface VocabularyGridProps {
  words: VocabularyWord[];
  onDeleteWord?: (id: number) => void;
  showDelete?: boolean;
  title?: string;
}

export default function VocabularyGrid({ words, onDeleteWord, showDelete = false, title }: VocabularyGridProps) {
  if (words.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">📚</div>
        <h3 className="text-2xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
          No words yet!
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          Start building your vocabulary by adding your first word above.
        </p>
      </div>
    );
  }

  return (
    <div>
      {title && (
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          {title}
        </h2>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {words.map((word) => (
          <WordCard
            key={word.id}
            word={word}
            onDelete={onDeleteWord}
            showDelete={showDelete}
          />
        ))}
      </div>
    </div>
  );
}