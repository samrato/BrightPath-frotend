const Profile = require('../models/Profile');
const mongoose = require('mongoose');

// Create or update a profile
const upsertProfile = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid user ID format' });
    }

    const profile = await Profile.findOneAndUpdate(
      { user: userId },
      { ...req.body, user: userId }, // Merge body with userId
      { new: true, upsert: true }    // Return updated/new doc
    );

    res.status(200).json({ message: 'Profile saved successfully', profile });
  } catch (error) {
    res.status(500).json({ message: 'Error saving profile', error });
  }
};

// Get a user's profile
const getProfile = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid user ID format' });
    }

    const profile = await Profile.findOne({ user: userId });

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving profile', error });
  }
};

module.exports = { upsertProfile, getProfile };
