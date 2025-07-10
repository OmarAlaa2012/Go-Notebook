import React, { useState } from 'react';

export default function AssistantPage() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Hello! I am your AI assistant. How can I help you today?' }
  ]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([...messages, { sender: 'user', text: input }]);
    try {
      // Call your backend proxy instead of Google API directly
      let aiText = '';
      try {
        const response = await fetch('http://localhost:3001/api/gemini', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt: input })
        });
        const data = await response.json();
        aiText = data.text || "Sorry, I couldn't answer that.";
      } catch (err) {
        aiText = "Sorry, there was an error contacting the AI proxy server.";
      }
      setMessages(msgs => [...msgs, { sender: 'ai', text: aiText }]);
    } catch (err) {
      setMessages(msgs => [...msgs, { sender: 'ai', text: "Sorry, there was an error contacting the AI API." }]);
    }
    setInput('');
  };

  return (
    <div className="max-w-5xl mx-auto bg-white/80 dark:bg-gray-900/80 rounded-3xl shadow-xl p-8 mt-8 min-h-[70vh] flex flex-col">
      <h2 className="text-3xl font-bold mb-4 text-center text-gradient bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">AI Assistant</h2>
      <div className="flex-1 overflow-y-auto mb-4 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.sender === 'ai' ? 'justify-start' : 'justify-end'}`}>
            <div className={`px-4 py-2 rounded-2xl max-w-2xl ${msg.sender === 'ai' ? 'bg-blue-100 dark:bg-blue-800 text-gray-800 dark:text-white' : 'bg-purple-200 dark:bg-purple-700 text-gray-900 dark:text-white'}`}>{msg.text}</div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSend} className="flex gap-2">
        <input
          className="flex-1 px-4 py-2 rounded-2xl border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button type="submit" className="px-6 py-2 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold shadow-md hover:scale-105 transition-transform">Send</button>
      </form>
    </div>
  );
}
