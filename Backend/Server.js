const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const cors = require('cors');

// Import Routes
const studentRoutes = require('./routes/studentRoutes');
const teacherRoutes = require('./routes/teacherRoutes');

// Middleware
app.use(express.json());
app.use(cors());

// Connect to DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log("DB connected successfully, listening on port " + PORT);
    });
  })
  .catch((error) => console.log(error));

// Use Routes
app.use('/api/students', studentRoutes);
app.use('/api/teachers', teacherRoutes);
