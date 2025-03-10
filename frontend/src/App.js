import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './Components/Signup';
import Login from './Components/Login';
import StudentProfile from './Components/StudentProfile';
import TeacherDashboard from './Components/TeacherDashboard';
import Home from './Components/Home';

import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup userType="students" />} />
        <Route path="/login" element={<Login userType="students" />} />
        <Route path="/student-profile" element={<StudentProfile />} />
        <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
        <Route path="/teacher-signup" element={<Signup userType="teachers" />} />
        <Route path="/teacher-login" element={<Login userType="teachers" />} />
      </Routes>
    </Router>
  );
}

export default App;
