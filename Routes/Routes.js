const { Router } = require("express");
const {
  RegisterUser,
  LoginUser,
} = require("../controllers/User.controllers");

const {
  generateLearningPath,
  getLearningPaths,
  getLearningPathById,
  updateLearningPath,
  deleteLearningPath,
  markModuleCompleted,
} = require("../controllers/learningPathController");

const {
  upsertProfile,
  getProfile,
} = require("../controllers/profileController");


const authMiddleware = require("../middleware/authMiddleware");

const routes = Router();

// 🔐 Auth Routes
routes.post("/register", RegisterUser);
routes.post("/login", LoginUser);

//  Profile Routes
routes.post("/profile/:userId",authMiddleware,  upsertProfile); // Create or update
routes.get("/profile/:userId",authMiddleware,  getProfile);     // Fetch profile

// AI Learning Path Routes
routes.post("/learning-paths/generate/:userId",authMiddleware,  generateLearningPath);

// Learning Path CRUD
routes.get("/learning-paths",authMiddleware,  getLearningPaths);             // All (optionally filtered)
routes.get("/learning-paths/:id",authMiddleware,  getLearningPathById);      // Single by ID
routes.put("/learning-paths/:id",authMiddleware,  updateLearningPath);       // Update
routes.delete("/learning-paths/:id",authMiddleware,  deleteLearningPath);    // Delete

//  Module Completion
routes.patch("/learning-paths/:pathId/modules/:moduleIndex/complete", authMiddleware, markModuleCompleted);

module.exports = routes;
