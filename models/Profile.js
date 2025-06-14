const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  careerGoal: { type: String, required: true },
  grades: {
    math: Number,
    science: Number,
    english: Number,
    other: String,
  },
  studyTimePerWeek: Number,
  learningPreferences: {
    type: [String], // e.g., ['video', 'text', 'interactive']
    default: [],
  },
}, { timestamps: true });

module.exports = mongoose.model('Profile', ProfileSchema);
