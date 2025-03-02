// server.js
const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'build')));

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

// Passion discovery endpoint
app.post('/api/gemini/analyze-passion', async (req, res) => {
  try {
    const { answers } = req.body;

    // Create a prompt for Gemini based on user answers
    const prompt = `
      Based on the following quiz responses, identify this person's potential passions, interests, and career paths.
      Please analyze their answers to determine what fields might interest them the most.
      
      Quiz responses:
      ${answers.map(a => `Question ${a.questionNumber}: ${a.answer}`).join('\n')}
      
      Please provide a response in the following JSON format:
      {
        "passions": [
          {
            "name": "Example Passion",
            "description": "Brief description of why this passion fits them"
          }
        ],
        "explanation": "A paragraph explaining the analysis of their responses and how they led to these passions",
        "recommendations": [
          "Specific recommendation for how to explore Passion 1",
          "Specific recommendation for how to explore Passion 2",
          "General recommendation for personal growth"
        ]
      }
      
      Provide 3-5 passions and 3-5 recommendations. Be thoughtful and specific in your analysis.
    `;

    // Make API call to Gemini
    const result = await model.generateContent(prompt);
    const response = result.response;
    const textResponse = response.text();
    
    // Parse the JSON from the response
    // Note: In a production app, you would add error handling for invalid JSON
    const jsonResponseText = textResponse.trim();
    const jsonResponse = JSON.parse(jsonResponseText);
    
    // Return the results
    res.json(jsonResponse);
  } catch (error) {
    console.error('Error with Gemini API:', error);
    res.status(500).json({ 
      error: 'Failed to analyze responses',
      message: error.message 
    });
  }
});

// Serve React app for any other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});