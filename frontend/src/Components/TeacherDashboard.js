import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TeacherDashboard = () => {
  const [students, setStudents] = useState([]);

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
            <button onClick={() => handleDelete(student._id)} className="p-2 bg-red-500 text-white rounded">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeacherDashboard;