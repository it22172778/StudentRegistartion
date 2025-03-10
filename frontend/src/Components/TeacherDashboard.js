import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TeacherDashboard = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Fetch all students
    const fetchStudents = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/teachers/students');
        setStudents(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchStudents();
  }, []);

  const validate = (student) => {
    const errors = {};
    if (!student.firstName) errors.firstName = 'First Name is required';
    if (!student.lastName) errors.lastName = 'Last Name is required';
    if (!student.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(student.email)) {
      errors.email = 'Email address is invalid';
    }
    if (!student.age) {
      errors.age = 'Age is required';
    } else if (isNaN(student.age) || student.age <= 18) {
      errors.age = 'Age must be a number greater than 18';
    }
    return errors;
  };

  const handleUpdate = async (student) => {
    const validationErrors = validate(student);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      const res = await axios.put(`http://localhost:3000/api/teachers/students/${student._id}`, student);
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/teachers/students/${id}`);
      setStudents(students.filter(student => student._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Teacher Dashboard</h2>
      <ul>
        {students.map(student => (
          <li key={student._id} className="mb-2 p-2 border rounded flex justify-between items-center">
            <span>{student.firstName} {student.lastName}</span>
            <button onClick={() => setSelectedStudent(student)} className="p-2 bg-yellow-500 text-white rounded">Update</button>
            <button onClick={() => handleDelete(student._id)} className="p-2 bg-red-500 text-white rounded">Delete</button>
          </li>
        ))}
      </ul>
      {selectedStudent && (
        <div className="mt-4 p-4 border rounded shadow">
          <h3 className="text-xl font-bold mb-4">Update Student</h3>
          <input
            type="text"
            name="firstName"
            value={selectedStudent.firstName}
            onChange={(e) => setSelectedStudent({ ...selectedStudent, firstName: e.target.value })}
            className="w-full p-2 mb-2 border rounded"
          />
          {errors.firstName && <p className="text-red-500">{errors.firstName}</p>}
          <input
            type="text"
            name="lastName"
            value={selectedStudent.lastName}
            onChange={(e) => setSelectedStudent({ ...selectedStudent, lastName: e.target.value })}
            className="w-full p-2 mb-2 border rounded"
          />
          {errors.lastName && <p className="text-red-500">{errors.lastName}</p>}
          <input
            type="email"
            name="email"
            value={selectedStudent.email}
            onChange={(e) => setSelectedStudent({ ...selectedStudent, email: e.target.value })}
            className="w-full p-2 mb-2 border rounded"
          />
          {errors.email && <p className="text-red-500">{errors.email}</p>}
          <input
            type="number"
            name="age"
            value={selectedStudent.age}
            onChange={(e) => setSelectedStudent({ ...selectedStudent, age: e.target.value })}
            className="w-full p-2 mb-2 border rounded"
          />
          {errors.age && <p className="text-red-500">{errors.age}</p>}
          <button onClick={() => handleUpdate(selectedStudent)} className="w-full p-2 bg-blue-500 text-white rounded">Update</button>
        </div>
      )}
    </div>
  );
};

export default TeacherDashboard;