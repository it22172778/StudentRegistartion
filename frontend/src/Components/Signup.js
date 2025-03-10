import React, { useState } from 'react';
import axios from 'axios';

const Signup = ({ userType }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    age: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:3000/api/${userType}/register`, formData);
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">{userType === 'students' ? 'Student' : 'Teacher'} Signup</h2>
      <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} className="w-full p-2 mb-2 border rounded" />
      <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} className="w-full p-2 mb-2 border rounded" />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} className="w-full p-2 mb-2 border rounded" />
      <input type="number" name="age" placeholder="Age" onChange={handleChange} className="w-full p-2 mb-2 border rounded" />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} className="w-full p-2 mb-2 border rounded" />
      <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Sign Up</button>
    </form>
  );
};

export default Signup;