import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Welcome to the Student Registration System</h2>
      <div className="flex justify-around">
        <Link to="/signup" className="p-2 bg-blue-500 text-white rounded">Sign Up</Link>
        <Link to="/login" className="p-2 bg-blue-500 text-white rounded">Login</Link>
      </div>
    </div>
  );
};

export default Home;