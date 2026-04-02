# 🧠 SigmaGPT — AI Chat Application

SigmaGPT is an AI-powered chat application built using the MERN stack (MongoDB, Express.js, React.js, Node.js), powered by Google Gemini AI.

## 🚀 Features

### ✅ Chat with AI
- Real-time conversation powered by **Google Gemini 2.5 Flash**
- Messages are displayed with smooth typewriter animation
- Full conversation history sent on every message for context-aware replies

### ✅ Persistent Chat History
- Each chat thread is stored in **MongoDB**
- Continue old conversations anytime
- Threads sorted by last updated

### ✅ Modern UI
- Responsive design built with React and CSS
- Custom dropdown, loader animations, and dark theme

## 🧩 Tech Stack

| Area | Technology |
|---|---|
| Frontend | React.js, JSX, Context API, React Router |
| Backend | Node.js, Express.js |
| Database | MongoDB (Mongoose) |
| Styling | CSS / Font Awesome |
| AI Integration | Google Gemini API (gemini-2.5-flash) |

## ⚙️ Setup & Installation

### 1. Clone the repo
git clone https://github.com/your-username/SigmaGPT.git
cd SigmaGPT

### 2. Install dependencies
cd backend && npm install
cd ../frontend && npm install

### 3. Configure environment variables
Create a `.env` file in the `/backend` folder:
GEMINI_API_KEY=your_gemini_api_key_here
MONGO_URI=your_mongodb_connection_string
PORT=8080

Get your free Gemini API key at: https://aistudio.google.com/apikey

### 4. Run the app
# Backend
cd backend && node server.js

# Frontend
cd frontend && npm run dev

## 🎯 Learning Objectives

This project demonstrates:
- Full-stack MERN integration
- Chat-based UI architecture
- Google Gemini API integration
- Conversation history management
- State separation for streaming responses
- Markdown rendering in React

## 📌 Future Improvements
- Real-time streaming responses (SSE/WebSockets)
- Authentication & user accounts
- Chat export
- Message search
- Rate limiting & caching
- Support for multiple AI models

Rate limiting & caching
