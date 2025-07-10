export interface VocabularyWord {
  id: number;
  word: string;
  meaning: string;
  example?: string;
  dateAdded: string;
}

export type PageType = 'words' | 'functions' | 'symbols' | 'assistant';

export interface VocabularyStats {
  totalWords: number;
  todayWords: number;
}