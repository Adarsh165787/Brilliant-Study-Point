const express = require('express');
const auth = require('../middleware/auth');
const Subject = require('../models/Subject');

const router = express.Router();

// Get subject details
router.get('/detail/:id', auth, async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id);
    res.json(subject);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get subjects by class
router.get('/:class', auth, async (req, res) => {
  try {
    const subjects = await Subject.find({ class: req.params.class });
    res.json(subjects);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;