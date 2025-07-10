// Simple Node.js Express proxy for Gemini API
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || 'YOUR_API_KEY_HERE';

app.post('/api/gemini', async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: 'No prompt provided' });

  // Try Gemini 1.5 Pro Preview first
  let url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-preview-0409:generateContent?key=${GEMINI_API_KEY}`;
  const body = {
    contents: [
      {
        parts: [
          { text: prompt }
        ]
      }
    ]
  };
  let aiText = '';
  let data;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    data = await response.json();
    if (data && data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0].text) {
      aiText = data.candidates[0].content.parts[0].text;
    }
  } catch (err) {
    aiText = '';
  }
  // If 1.5 preview fails, try Gemini 1.0 Pro
  if (!aiText) {
    url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;
    try {
      const response2 = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      data = await response2.json();
      if (data && data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0].text) {
        aiText = data.candidates[0].content.parts[0].text;
      }
    } catch (err2) {
      aiText = '';
    }
  }
  if (!aiText) {
    return res.status(500).json({ error: 'Gemini API error' });
  }
  res.json({ text: aiText });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`AI proxy server running on port ${PORT}`);
});
