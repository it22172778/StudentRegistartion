import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Welcome to the Student Registration System</h2>
      <p className="mb-4">Please select an option below to get started:</p>
      <div className="flex flex-col space-y-4">
        <Link to="/signup" className="p-2 bg-blue-500 text-white rounded text-center">Student Sign Up</Link>
        <Link to="/login" className="p-2 bg-blue-500 text-white rounded text-center">Student Login</Link>
        <Link to="/teacher-signup" className="p-2 bg-green-500 text-white rounded text-center">Teacher Sign Up</Link>
        <Link to="/teacher-login" className="p-2 bg-green-500 text-white rounded text-center">Teacher Login</Link>
      </div>
    </div>
  );
};

export default Home;