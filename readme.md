Online Quiz Maker
Online Quiz Maker is a web application that allows users to create, manage, and participate in quizzes. The application consists of a backend server built with Node.js and Express, connected to a MongoDB database, and a frontend built with React.

Features
Create Quizzes: Users can create quizzes by adding questions and answer options.
Manage Quizzes: Admin users can manage their created quizzes.
Interactive UI: User-friendly interface to input quiz details and see results.
Tech Stack
Frontend: React
Backend: Node.js, Express
Database: MongoDB
Authentication: (Optional) JWT (for user authentication, if implemented)
Installation
Follow these steps to set up the project on your local machine.

1. Clone the Repository
Start by cloning the repository to your local machine:

bash
Copy code
git clone https://github.com/your-username/Quiz_maker.git
cd Quiz_maker
2. Set Up the Backend
Navigate to the backend folder (if it is in a separate directory(Backed code for the application)):

bash
Copy code
cd backend
Install the required dependencies:

bash
Copy code
npm install
Set up the database connection (Make sure MongoDB is running on your local machine or use a remote MongoDB service like MongoDB Atlas).

Run the backend server:

bash
Copy code
npm start
The server will start on http://localhost:5000.

3. Set Up the Frontend
Navigate to the frontend folder:

bash
Copy code
cd frontend
Install the required dependencies:

bash
Copy code
npm install
Start the React development server:

bash
Copy code
npm start
The frontend will start on http://localhost:3000.

Usage
Open your browser and navigate to http://localhost:3000 to start interacting with the frontend.
Use the form on the frontend to create and manage your quizzes. When a quiz is created, it will be saved in the MongoDB database.
The backend API (http://localhost:5000) handles requests related to quiz creation and management.
API Endpoints
POST /create-quiz
Create a new quiz with a list of questions.

Request Body:

json
Copy code
{
  "title": "Sample Quiz",
  "questions": [
    {
      "question_text": "How many colors are there in a Rainbow",
      "options": ["3", "4", "7", "6"],
      "correct_answer_index": 2
    },
    {
      "question_text": "What is 3 + 8?",
      "options": ["11", "7", "8", "9"],
      "correct_answer_index": 0
    }
  ]
}
Response:

json
Copy code
{
  "message": "Quiz created successfully",
  "quizId": "676f702fc4c9e9a0f7cc061d"
}
Contact
If you have any questions or need further assistance, feel free to contact me at [shirishanagati123@gmail.com].

