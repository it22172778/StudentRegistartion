import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentProfile = () => {
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    age: '',
    subjects: {},
    profilePicture: '',
  });

  useEffect(() => {
    // Fetch student profile data
    const fetchProfile = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/students/profile');
        setProfile(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setProfile({ ...profile, profilePicture: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      for (const key in profile) {
        formData.append(key, profile[key]);
      }
      const res = await axios.put('http://localhost:3000/api/students/update', formData);
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Student Profile</h2>
      <input type="text" name="firstName" value={profile.firstName} onChange={handleChange} className="w-full p-2 mb-2 border rounded" />
      <input type="text" name="lastName" value={profile.lastName} onChange={handleChange} className="w-full p-2 mb-2 border rounded" />
      <input type="email" name="email" value={profile.email} onChange={handleChange} className="w-full p-2 mb-2 border rounded" />
      <input type="number" name="age" value={profile.age} onChange={handleChange} className="w-full p-2 mb-2 border rounded" />
      <input type="file" name="profilePicture" onChange={handleFileChange} className="w-full p-2 mb-2 border rounded" />
      <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Update Profile</button>
    </form>
  );
};

export default StudentProfile;