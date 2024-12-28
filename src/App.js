import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [quiz, setQuiz] = useState(null);
  const [quizId, setQuizId] = useState('');

  // Fetch quiz from backend using quizId
  const fetchQuiz = async () => {
    if (quizId) {
      try {
        const response = await fetch(`http://localhost:5000/quiz/${quizId}`);
        const data = await response.json();
        if (response.ok) {
          setQuiz(data);
        } else {
          console.error(data.message); // Error message from backend
        }
      } catch (error) {
        console.error('Error fetching quiz:', error);
      }
    }
  };

  // Fetch quiz when quizId is set
  useEffect(() => {
    if (quizId) {
      fetchQuiz();
    }
  }, [quizId]);

  return (
    <div className="App">
      <h2>View Quiz by ID</h2>
      <input
        type="text"
        placeholder="Enter Quiz ID"
        value={quizId}
        onChange={(e) => setQuizId(e.target.value)}  // Update quizId on input change
      />
      <button onClick={fetchQuiz}>Fetch Quiz</button>

      {/* Display quiz title and questions if the quiz is available */}
      {quiz && (
        <div>
          <h3>{quiz.title}</h3>
          {quiz.questions.map((question, index) => (
            <div key={index}>
              <h4>{question.question_text}</h4>
              <ul>
                {question.options.map((option, optIndex) => (
                  <li key={optIndex}>{option}</li>
                ))}
              </ul>
              <p>Correct answer: {question.options[question.correct_answer_index]}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
