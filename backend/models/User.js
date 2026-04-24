const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['student', 'teacher'],
    default: 'student',
  },
  class: {
    type: Number,
    required: function() { return this.role === 'student'; },
    min: 6,
    max: 12,
  },
  progress: {
    type: Map,
    of: {
      completedChapters: [String],
      totalChapters: Number,
      percentage: Number,
    },
    default: {},
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', UserSchema);