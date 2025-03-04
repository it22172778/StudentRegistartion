const express = require('express');
const { registerStudent, loginStudent, updateProfile, uploadProfilePicture } = require('../controllers/studentController');
const router = express.Router();

// Register a new student
router.post('/register', registerStudent);

// Login a student
router.post('/login', loginStudent);

// Update student profile
router.put('/update', updateProfile);

// Upload profile picture
router.post('/upload', uploadProfilePicture);

module.exports = router;