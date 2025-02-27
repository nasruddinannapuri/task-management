# MERN Task Management App

A simple and efficient Task Management application built using the MERN (MongoDB, Express.js, React, Node.js) stack. This app allows users to create, track, and manage tasks efficiently.

## Features

- **Task Creation**: Add tasks with a title, description, priority, and deadline.
- **Task Categorization**: Tasks can be marked as **To Do, In Progress, or Completed**.
- **Priority Levels**: Tasks can have Low, Medium, or High priority.
- **Task Filtering & Search**: Search tasks by project name.
- **Task Status Summary**: Displays the number of expired, active, and completed tasks.

## Tech Stack

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **State Management**: React Hooks
- **Other Tools**: Axios, Mongoose

## Installation

### Prerequisites
- Node.js installed
- MongoDB installed and running

### Steps to Run

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/task-management-app.git
   cd task-management-app
2. Install dependencies for both frontend and backend:

cd client
npm install
cd ../server
npm install
3. Set up environment variables in .env (server folder):
MONGO_URI=your_mongodb_connection_string
PORT=5173
4. Start the backend server:
cd server
npm start
5. Start the frontend server:
cd client
npm start
6. Open the app in your browser:

http://localhost:5173/


7. Future Enhancements
User authentication and authorization
Drag-and-drop task reordering
Notifications and reminders for deadlines
Dark mode
