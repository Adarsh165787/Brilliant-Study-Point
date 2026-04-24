const express = require('express');
const auth = require('../middleware/auth');
const User = require('../models/User');

const router = express.Router();

// Get user profile
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    const userData = user.toObject();
    // Convert Map to object for JSON serialization
    if (userData.progress instanceof Map) {
      userData.progress = Object.fromEntries(userData.progress);
    }
    res.json(userData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get all students (for teachers)
router.get('/students', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user.role !== 'teacher') {
      return res.status(403).json({ msg: 'Access denied' });
    }
    const students = await User.find({ role: 'student' }).select('-password');
    // Convert students to plain objects and convert Map progress to object
    const studentsData = students.map(student => {
      const studentObj = student.toObject();
      if (studentObj.progress instanceof Map) {
        studentObj.progress = Object.fromEntries(studentObj.progress);
      }
      return studentObj;
    });
    res.json(studentsData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Update progress
router.put('/progress', auth, async (req, res) => {
  const { subject, completedChapters } = req.body;
  try {
    const user = await User.findById(req.user.id);
    if (!user.progress.has(subject)) {
      // Fetch subject to get total chapters
      const Subject = require('../models/Subject');
      const subjectData = await Subject.findOne({ name: subject, class: user.class });
      user.progress.set(subject, { completedChapters: [], totalChapters: subjectData ? subjectData.chapters.length : 0, percentage: 0 });
    }
    const progress = user.progress.get(subject);
    progress.completedChapters = completedChapters;
    progress.percentage = progress.totalChapters > 0 ? (completedChapters.length / progress.totalChapters) * 100 : 0;
    await user.save();
    res.json(user.progress);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;