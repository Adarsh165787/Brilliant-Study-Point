const mongoose = require('mongoose');

const SubjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  class: {
    type: Number,
    required: true,
    min: 6,
    max: 12,
  },
  chapters: [{
    title: String,
    content: String, // dummy content
    videoUrl: String, // dummy
  }],
});

module.exports = mongoose.model('Subject', SubjectSchema);