import React, { useState } from 'react';
import { Plus, Sparkles } from 'lucide-react';
import { VocabularyWord } from '../types/vocabulary';

interface AddWordFormProps {
  onAddWord: (word: Omit<VocabularyWord, 'id' | 'dateAdded'>) => void;
}

export default function AddWordForm({ onAddWord }: AddWordFormProps) {
  const [formData, setFormData] = useState({
    word: '',
    meaning: '',
    example: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.word.trim() && formData.meaning.trim()) {
      onAddWord({
        word: formData.word.trim(),
        meaning: formData.meaning.trim(),
        example: formData.example.trim() || undefined
      });
      setFormData({ word: '', meaning: '', example: '' });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-white/80 to-purple-50/80 dark:from-gray-800/80 dark:to-purple-900/20 backdrop-blur-xl rounded-3xl p-8 mb-8 border border-white/20 dark:border-gray-700/50 hover:border-purple-400/50 dark:hover:border-purple-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20 group">
      {/* Liquid glass effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-3xl"></div>
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-400/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
      
      <h3 className="relative text-2xl font-bold mb-8 text-gray-800 dark:text-white flex items-center gap-3">
        <div className="p-2 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl shadow-lg">
          <Plus size={24} className="text-white group-hover:rotate-180 transition-transform duration-500" />
        </div>
        Add New Word
        <Sparkles size={20} className="text-purple-500 animate-pulse ml-auto" />
      </h3>
      
      <form onSubmit={handleSubmit} className="relative space-y-6">
        <div className="group/input">
          <label htmlFor="word" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wider">
            Word
          </label>
          <input
            type="text"
            id="word"
            name="word"
            value={formData.word}
            onChange={handleChange}
            required
            placeholder="Enter the word"
            className="w-full px-6 py-4 border-2 border-gray-200/50 dark:border-gray-600/50 rounded-2xl focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all duration-500 bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-lg font-medium hover:bg-white/90 dark:hover:bg-gray-700/90 group-hover/input:scale-[1.02]"
          />
        </div>

        <div className="group/input">
          <label htmlFor="meaning" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wider">
            Meaning
          </label>
          <textarea
            id="meaning"
            name="meaning"
            value={formData.meaning}
            onChange={handleChange}
            required
            placeholder="Enter the meaning or definition"
            rows={3}
            className="w-full px-6 py-4 border-2 border-gray-200/50 dark:border-gray-600/50 rounded-2xl focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all duration-500 bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-vertical text-lg font-medium hover:bg-white/90 dark:hover:bg-gray-700/90 group-hover/input:scale-[1.02]"
          />
        </div>

        <div className="group/input">
          <label htmlFor="example" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wider">
            Example (optional)
          </label>
          <textarea
            id="example"
            name="example"
            value={formData.example}
            onChange={handleChange}
            placeholder="Enter an example sentence"
            rows={2}
            className="w-full px-6 py-4 border-2 border-gray-200/50 dark:border-gray-600/50 rounded-2xl focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all duration-500 bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-vertical text-lg font-medium hover:bg-white/90 dark:hover:bg-gray-700/90 group-hover/input:scale-[1.02]"
          />
        </div>

        <button
          type="submit"
          className="relative w-full bg-gradient-to-r from-purple-600 via-blue-600 to-purple-700 text-white py-4 px-8 rounded-2xl font-bold text-lg hover:from-purple-700 hover:via-blue-700 hover:to-purple-800 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/30 focus:ring-4 focus:ring-purple-500/20 overflow-hidden group/btn"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500"></div>
          <span className="relative flex items-center justify-center gap-2">
            <Plus size={20} className="group-hover/btn:rotate-180 transition-transform duration-500" />
          Add Word
          </span>
        </button>
      </form>
    </div>
  );
}