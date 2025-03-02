import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../css/QuestionPage.css';

function QuestionPage({ questions, setAnswers, answers }) {
  const { questionNumber } = useParams();
  const navigate = useNavigate();
  const currentQuestionIndex = parseInt(questionNumber) - 1;
  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;

  if (!currentQuestion) {
    navigate('/end'); // If no more questions, navigate to the end page
    return null;
  }

  const handleAnswerChange = (answer) => {
    setAnswers({ ...answers, [`question${questionNumber}`]: answer });
  };

  const handleNext = () => {
    // Check if answer is selected
    if (!answers[`question${questionNumber}`]) {
      alert('Please select an answer before proceeding.');
      return;
    }
    
    const nextQuestionNumber = parseInt(questionNumber) + 1;
    if (nextQuestionNumber > totalQuestions) {
      navigate('/end');
    } else {
      navigate(`/question/${nextQuestionNumber}`);
    }
  };

  return (
    <div className="question-container">
      <div className="progress-bar">
        <div 
          className="progress" 
          style={{ width: `${(currentQuestionIndex / totalQuestions) * 100}%` }}
        ></div>
        <span className="progress-text">Question {questionNumber} of {totalQuestions}</span>
      </div>
      
      <h2>{currentQuestion.question}</h2>
      
      <div className="options-container">
        {currentQuestion.options.map((option) => (
          <div 
            key={option} 
            className={`option ${answers[`question${questionNumber}`] === option ? 'selected' : ''}`}
            onClick={() => handleAnswerChange(option)}
          >
            {option}
          </div>
        ))}
      </div>
      
      <button 
        className="next-button" 
        onClick={handleNext}
        disabled={!answers[`question${questionNumber}`]}
      >
        {parseInt(questionNumber) === totalQuestions ? 'Finish' : 'Next'}
      </button>
    </div>
  );
}

export default QuestionPage;