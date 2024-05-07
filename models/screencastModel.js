const mongoose = require('mongoose');

const ScreenSchema = new mongoose.Schema({
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

const Screen = mongoose.model('Screen', ScreenSchema);

module.exports = Screen;
