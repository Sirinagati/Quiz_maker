const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import CORS
const app = express();

// Use CORS middleware to allow cross-origin requests
app.use(cors());
app.use(express.json()); // Middleware to parse JSON request bodies

// MongoDB connection (assuming MongoDB is installed and running locally)
mongoose.connect('mongodb://localhost:27017/quiz-maker', { useNewUrlParser: true, useUnifiedTopology: true })
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
    const newQuiz = new Quiz({ title, questions });
    await newQuiz.save();
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
