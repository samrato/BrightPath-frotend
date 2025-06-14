const mongoose = require('mongoose');

const LearningPathSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  modules: [{
    title: String,
    description: String,
    resourceLinks: [String],
    completed: { type: Boolean, default: false },
  }],
  generatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('LearningPath', LearningPathSchema);
