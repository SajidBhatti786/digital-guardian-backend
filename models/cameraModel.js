const mongoose = require('mongoose');

const PhotoSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  childId: {
    type: mongoose.Schema.Types.ObjectId, // Assuming you're using MongoDB ObjectId for child IDs
    ref: 'Child', // Reference to the Child model if you have one
    required: true,
  },
});

const Camera = mongoose.model('Photo', PhotoSchema);

module.exports = Camera;
