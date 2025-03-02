import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/EndPage.css';

function EndPage({ answers, setResults }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Format answers data to include question text for better context
      const formattedAnswers = Object.entries(answers).map(([key, value]) => {
        const questionNumber = parseInt(key.replace('question', ''));
        return {
          questionNumber,
          answer: value
        };
      });

      const response = await axios.post('/api/gemini/analyze-passion', { answers: formattedAnswers });
      
      // Store results in state
      setResults(response.data);
      
      // Navigate to results page
      navigate('/results');
    } catch (error) {
      console.error('Error submitting answers:', error);
      setError('There was an error processing your results. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="end-container">
      <h1>Quiz Completed!</h1>
      <p>Thank you for taking the time to complete our Passion Discovery Quiz.</p>
      <p>Click the button below to analyze your responses and discover your passions!</p>
      
      {error && <div className="error-message">{error}</div>}
      
      <button 
        className="submit-button" 
        onClick={handleSubmit}
        disabled={isLoading}
      >
        {isLoading ? 'Analyzing your responses...' : 'Discover My Passions'}
      </button>
      
      <div className="disclaimer">
        <p>Your answers will be analyzed by AI to suggest potential passions and interests. 
        This is meant as a starting point for self-discovery, not a definitive assessment.</p>
      </div>
    </div>
  );
}

export default EndPage;