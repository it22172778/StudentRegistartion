const express = require('express');
const { registerTeacher, loginTeacher, getStudents, updateStudent, deleteStudent } = require('../controllers/teacherController');
const router = express.Router();

// Register a new teacher
router.post('/register', registerTeacher);

// Login a teacher
router.post('/login', loginTeacher);

// Get all students
router.get('/students', getStudents);

// Update a student
router.put('/students/:id', updateStudent);

// Delete a student
router.delete('/students/:id', deleteStudent);

module.exports = router;