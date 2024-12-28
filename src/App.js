/*import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;*/
import React, { useState } from 'react';
import './App.css';

// Functional component to create and manage a quiz
const QuizCreator = () => {
  // State to hold the quiz questions and answers
  // Initial state has one question with 4 empty answer options and a correct answer index set to 0 (default)
  const [questions, setQuestions] = useState([{ question: '', options: ['', '', '', ''], correct: 0 }]);

  // Handler function to update the state when input values change
  const handleChange = (index, field, value) => {
    // Create a new array based on the current state of questions
    const newQuestions = [...questions];
    const handleAddQuestion = () => {
      setQuestions([...questions, { question: '', options: ['', '', '', ''], correct: 0 }]);
    };
    
    const handleRemoveQuestion = (index) => {
      const newQuestions = questions.filter((_, i) => i !== index);
      setQuestions(newQuestions);
    };
    const handleSubmit = async () => {
      // Basic validation to check if each question is filled
      const isValid = questions.every((q) => {
        return q.question && q.options.every((opt) => opt) && q.correct !== undefined;
      });
    
      if (!isValid) {
        alert('Please fill out all fields before submitting.');
        return;
      }
    
      // Proceed with API call if valid
    };
    const [loading, setLoading] = useState(false);
const [error, setError] = useState('');

const handleSubmit = async () => {
  setLoading(true);
  setError('');
  try {
    const response = await fetch('http://localhost:5000/create-quiz', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'Sample Quiz', questions }),
    });
    const data = await response.json();
    console.log('Quiz Created:', data);
  } catch (err) {
    setError('Error creating quiz');
  } finally {
    setLoading(false);
  }
};


    // Update the respective field based on whether it's a question, option, or correct answer
    if (field === 'question') newQuestions[index].question = value;  // Update question text
    else if (field === 'correct') newQuestions[index].correct = value; // Update the correct answer index
    else newQuestions[index].options[field] = value;  // Update answer option text

    // Update the state with the modified question list
    setQuestions(newQuestions);
  };

  // Handler function to submit the quiz data to the backend server
  const handleSubmit = async () => {
    try {
      // Send POST request to save the quiz to the backend API (running locally on port 5000)
      const response = await fetch('http://localhost:5000/create-quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',  // Send JSON data
        },
        body: JSON.stringify({ title: 'Sample Quiz', questions }),  // Send the quiz title and questions
      });
      
      // Parse the response from the server and log it
      const data = await response.json();
      console.log('Quiz Created:', data);  // Log the response (e.g., success message and quiz ID)
    } catch (error) {
      // Log any error that occurs during the submission
      console.error('Error creating quiz:', error);
    }
  };

  return (
    <div className="App">
      <h2>Create a Quiz</h2>

      {/* Loop over the questions and render input fields for each */}
      {questions.map((q, index) => (
        <div key={index}>
          {/* Input field for the question text */}
          <input
            type="text"
            placeholder="Enter Question"
            value={q.question}
            onChange={(e) => handleChange(index, 'question', e.target.value)} // Update question text on change
          />

          {/* Loop over answer options and render input fields for each */}
          {q.options.map((option, optIndex) => (
            <div key={optIndex}>
              {/* Input fields for options */}
              <input
                type="text"
                placeholder={`Option ${optIndex + 1}`}
                value={option}
                onChange={(e) => handleChange(index, optIndex, e.target.value)}  // Update option text on change
              />
            </div>
          ))}

          {/* Dropdown to select which answer is correct */}
          <select
            onChange={(e) => handleChange(index, 'correct', e.target.value)} // Update correct answer index on change
            value={q.correct}
          >
            {/* Map over options and display the correct option index */}
            {q.options.map((_, idx) => (
              <option key={idx} value={idx}>
                Correct Option: {idx + 1}
              </option>
            ))}
          </select>
        </div>
      ))}

      {/* Button to submit the quiz */}
      <button onClick={handleSubmit}>Create Quiz</button>
    </div>
  );
};

// Export the QuizCreator component to be used in other files
export default QuizCreator;

