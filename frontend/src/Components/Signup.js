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

  const [errors, setErrors] = useState({});

  const validate = () => {
    const errors = {};
    if (!formData.firstName) errors.firstName = 'First Name is required';
    if (!formData.lastName) errors.lastName = 'Last Name is required';
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email address is invalid';
    }
    if (!formData.age) {
      errors.age = 'Age is required';
    } else if (isNaN(formData.age) || formData.age <= 18) {
      errors.age = 'Age must be a number greater than 18';
    }
    if (!formData.password) errors.password = 'Password is required';
    return errors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
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
      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        onChange={handleChange}
        className="w-full p-2 mb-2 border rounded"
      />
      {errors.firstName && <p className="text-red-500">{errors.firstName}</p>}
      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        onChange={handleChange}
        className="w-full p-2 mb-2 border rounded"
      />
      {errors.lastName && <p className="text-red-500">{errors.lastName}</p>}
      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
        className="w-full p-2 mb-2 border rounded"
      />
      {errors.email && <p className="text-red-500">{errors.email}</p>}
      <input
        type="number"
        name="age"
        placeholder="Age"
        onChange={handleChange}
        className="w-full p-2 mb-2 border rounded"
      />
      {errors.age && <p className="text-red-500">{errors.age}</p>}
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
        className="w-full p-2 mb-2 border rounded"
      />
      {errors.password && <p className="text-red-500">{errors.password}</p>}
      <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Sign Up</button>
    </form>
  );
};

export default Signup;