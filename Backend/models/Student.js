// filepath: Backend/models/Student.js
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
 
    firstName: {
     type: String, 
     required: true 
    },

  lastName: {
     type: String,
      required: true 
    },

  email: { 
    type: String,
    required: true, 
    unique: true
  },

  age: { 
    type: Number,
     required: true
     },

  password: { 
    type: String, 
    required: true 
},

  subjects: { 
    type: Map, of: Number 
},

  profilePicture: {
     type: String
     },
});

module.exports = mongoose.model('Student', studentSchema);