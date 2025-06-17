# 📚 AI-Powered Learning Path Backend API

This is a RESTful backend built with **Node.js**, **Express.js**, and **MongoDB** that allows users to register, manage profiles, and receive personalized learning paths powered by **Gemini AI**.

## 🚀 Features

- 🔐 JWT Authentication (Login & Registration)
- 👤 User Profiles with grades, goals, preferences
- 🧠 AI-generated Learning Paths (Gemini API)
- ✅ Module Completion Tracking
- 📚 CRUD for Learning Paths
- 🔄 Protected Routes via Middleware
- 📦 Built with Mongoose & Express

---

## 🏗️ Project Structure

ontrollers/
│ ├── User.controllers.js
│ ├── learningPathController.js
│ └── profileController.js
│
├── models/
│ ├── User.js
│ ├── Profile.js
│ └── LearningPath.js
│
├── routes/
│ └── routes.js
│
├── middleware/
│ └── authMiddleware.js
│
├── utils/
│ └── generateLearningPath.js
│
├── .env
├── server.js
└── package.json