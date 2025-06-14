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

const routes = Router();

// 🔐 Auth Routes
routes.post("/register", RegisterUser);
routes.post("/login", LoginUser);

//  Profile Routes
routes.post("/profile/:userId", upsertProfile); // Create or update
routes.get("/profile/:userId", getProfile);     // Fetch profile

// AI Learning Path Routes
routes.post("/learning-paths/generate/:userId", generateLearningPath);

// Learning Path CRUD
routes.get("/learning-paths", getLearningPaths);             // All (optionally filtered)
routes.get("/learning-paths/:id", getLearningPathById);      // Single by ID
routes.put("/learning-paths/:id", updateLearningPath);       // Update
routes.delete("/learning-paths/:id", deleteLearningPath);    // Delete

//  Module Completion
routes.patch("/learning-paths/:pathId/modules/:moduleIndex/complete", markModuleCompleted);

module.exports = routes;
