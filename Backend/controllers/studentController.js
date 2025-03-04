// filepath: Backend/controllers/studentController.js
const Student = require('../models/Student');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

// Helper function to send email
const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: subject,
      text: text,
    });

    console.log('Email sent successfully');
  } catch (error) {
    console.error('Email not sent:', error);
  }
};

// Register a new student
exports.registerStudent = async (req, res) => {
  const { firstName, lastName, email, age, password } = req.body;

  try {
    // Validate input
    if (!firstName || !lastName || !email || !age || !password) {
      return res.status(400).json({ msg: 'Please enter all fields' });
    }

    if (age <= 18 || isNaN(age)) {
      return res.status(400).json({ msg: 'Age must be a number greater than 18' });
    }

    // Check if student already exists
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ msg: 'Student already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new student
    const newStudent = new Student({
      firstName,
      lastName,
      email,
      age,
      password: hashedPassword,
    });

    await newStudent.save();

    // Send registration email
    await sendEmail(email, 'Registration Successful', 'Welcome to the Student Registration System!');

    res.status(201).json({ msg: 'Student registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Login a student
exports.loginStudent = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate input
    if (!email || !password) {
      return res.status(400).json({ msg: 'Please enter all fields' });
    }

    // Check if student exists
    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token, student: { id: student._id, firstName: student.firstName, lastName: student.lastName, email: student.email } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Update student profile
exports.updateProfile = async (req, res) => {
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

    res.json({ msg: 'Profile updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Upload profile picture
exports.uploadProfilePicture = async (req, res) => {
  const { id, profilePicture } = req.body;

  try {
    // Validate input
    if (!id || !profilePicture) {
      return res.status(400).json({ msg: 'Please provide student ID and profile picture' });
    }

    // Check if student exists
    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({ msg: 'Student not found' });
    }

    // Update profile picture
    student.profilePicture = profilePicture;

    await student.save();

    res.json({ msg: 'Profile picture uploaded successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
};