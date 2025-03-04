// filepath: Backend/controllers/teacherController.js
const Teacher = require('../models/Teacher');
const Student = require('../models/Student');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register a new teacher
exports.registerTeacher = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    // Validate input
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ msg: 'Please enter all fields' });
    }

    // Check if teacher already exists
    const existingTeacher = await Teacher.findOne({ email });
    if (existingTeacher) {
      return res.status(400).json({ msg: 'Teacher already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new teacher
    const newTeacher = new Teacher({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await newTeacher.save();

    res.status(201).json({ msg: 'Teacher registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Login a teacher
exports.loginTeacher = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate input
    if (!email || !password) {
      return res.status(400).json({ msg: 'Please enter all fields' });
    }

    // Check if teacher exists
    const teacher = await Teacher.findOne({ email });
    if (!teacher) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, teacher.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign({ id: teacher._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token, teacher: { id: teacher._id, firstName: teacher.firstName, lastName: teacher.lastName, email: teacher.email } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Get all students
exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Update a student
exports.updateStudent = async (req, res) => {
  const { id, firstName, lastName, email, age, subjects } = req.body;

  try {
    // Validate input
    if (!id || !firstName || !lastName || !email || !age) {
      return res.status(400).json({ msg: 'Please enter all fields' });
    }

    if (age <= 18 || isNaN(age)) {
      return res.status(400).json({ msg: 'Age must be a number greater than 18' });
    }

    // Check if student exists
    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({ msg: 'Student not found' });
    }

    // Update student details
    student.firstName = firstName;
    student.lastName = lastName;
    student.email = email;
    student.age = age;
    student.subjects = subjects;

    await student.save();

    res.json({ msg: 'Student updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Delete a student
exports.deleteStudent = async (req, res) => {
  const { id } = req.params;

  try {
    // Check if student exists
    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({ msg: 'Student not found' });
    }

    // Delete student
    await student.remove();

    res.json({ msg: 'Student deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
};