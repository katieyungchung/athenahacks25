import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/WelcomePage.css';

function WelcomePage() {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/question/1'); // Navigate to the first question
  };

  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <h1>Discover Your Passions</h1>
        <p className="tagline">Find what drives you and unlock new possibilities</p>
        
        <div className="quiz-info">
          <div className="info-item">
            <span className="info-number">10</span>
            <span className="info-text">Questions</span>
          </div>
          <div className="info-item">
            <span className="info-number">5</span>
            <span className="info-text">Minutes</span>
          </div>
          <div className="info-item">
            <span className="info-number">∞</span>
            <span className="info-text">Insights</span>
          </div>
        </div>
        
        <p className="description">
          This quiz uses AI to analyze your preferences and suggest potential 
          passions that align with your personality and interests. It's a starting 
          point for your journey of self-discovery.
        </p>
        
        <button className="start-button" onClick={handleStart}>
          Start Quiz
        </button>
      </div>
    </div>
  );
}

export default WelcomePage;