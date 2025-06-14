const LearningPath = require('../models/LearningPath');
const Profile = require('../models/Profile');
const generateLearningPathFromProfile = require('../utils/generateLearningPath'); // Gemini-powered logic

// Generate a learning path using Gemini AI
const generateLearningPath = async (req, res) => {
  try {
    const { userId } = req.params;

    const profile = await Profile.findOne({ user: userId });
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    const modules = await generateLearningPathFromProfile(profile);

    const learningPath = new LearningPath({
      user: userId,
      modules,
    });

    await learningPath.save();
    res.status(201).json(learningPath);
  } catch (error) {
    console.error('Gemini AI error:', error.message);
    res.status(500).json({ message: 'Failed to generate learning path using Gemini AI', error: error.message });
  }
};

// Get all learning paths (optionally filtered by userId)
const getLearningPaths = async (req, res) => {
  try {
    const filter = req.query.userId ? { user: req.query.userId } : {};
    const paths = await LearningPath.find(filter).populate('user');
    res.status(200).json(paths);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching learning paths', error });
  }
};

// Get a single learning path by ID
const getLearningPathById = async (req, res) => {
  try {
    const path = await LearningPath.findById(req.params.id).populate('user');
    if (!path) return res.status(404).json({ message: 'Learning path not found' });
    res.status(200).json(path);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching learning path', error });
  }
};

// Update a learning path
const updateLearningPath = async (req, res) => {
  try {
    const path = await LearningPath.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!path) return res.status(404).json({ message: 'Learning path not found' });
    res.status(200).json(path);
  } catch (error) {
    res.status(500).json({ message: 'Error updating learning path', error });
  }
};

// Delete a learning path
const deleteLearningPath = async (req, res) => {
  try {
    const deleted = await LearningPath.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Learning path not found' });
    res.status(200).json({ message: 'Learning path deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting learning path', error });
  }
};

// Mark a module as completed
const markModuleCompleted = async (req, res) => {
  try {
    const { pathId, moduleIndex } = req.params;
    const path = await LearningPath.findById(pathId);

    if (!path || !path.modules[moduleIndex]) {
      return res.status(404).json({ message: 'Module not found' });
    }

    path.modules[moduleIndex].completed = true;
    await path.save();
    res.status(200).json(path);
  } catch (error) {
    res.status(500).json({ message: 'Error marking module as completed', error });
  }
};

module.exports = {
  generateLearningPath,
  getLearningPaths,
  getLearningPathById,
  updateLearningPath,
  deleteLearningPath,
  markModuleCompleted,
};
