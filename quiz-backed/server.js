const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Importing CORS for cross-origin requests
const app = express();

// Use CORS middleware to allow cross-origin requests
app.use(cors());
app.use(express.json()); // Middleware to parse JSON request bodies

// MongoDB connection (make sure MongoDB is running locally or on MongoDB Atlas)
mongoose.connect('mongodb://localhost:27017/quiz-maker', { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('MongoDB connection error:', err));

// Define a simple schema for quizzes
const quizSchema = new mongoose.Schema({
  title: String,
  questions: [{
    question_text: String,
    options: [String],
    correct_answer_index: Number,
  }],
});

const Quiz = mongoose.model('Quiz', quizSchema);

// API route to create a quiz
app.post('/create-quiz', async (req, res) => {
  try {
    const { title, questions } = req.body;
    
    // Create a new quiz document
    const newQuiz = new Quiz({ title, questions });

    // Save the quiz to the database
    await newQuiz.save();

    // Send success response with the quiz ID
    res.status(201).send({ message: 'Quiz created successfully', quizId: newQuiz._id });
  } catch (error) {
    res.status(500).send({ message: 'Error creating quiz', error });
  }
});

// Simple route to check if server is running
app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
// This route fetches a quiz by its ID
app.get('/quiz/:id', async (req, res) => {
    try {
      const quiz = await Quiz.findById(req.params.id);
      if (!quiz) {
        return res.status(404).send({ message: 'Quiz not found' });
      }
      res.status(200).json(quiz); // Return the quiz data
    } catch (error) {
      res.status(500).send({ message: 'Error retrieving quiz', error });
    }
  });
  