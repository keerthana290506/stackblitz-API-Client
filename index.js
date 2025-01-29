// API: Retrieve Students Above Threshold
// ---------------------------------------
// Task:
// Implement an API to fetch students whose total marks exceed a given threshold.
//
// Endpoint:
// POST /students/above-threshold
//
// Request Body:
// {
//   "threshold": <number>
// }
//
// Response:
// Success: List of students with their names and total marks who meet the criteria.
// Example:
// {
//   "count": 2,
//   "students": [
//     { "name": "Alice Johnson", "total": 433 },
//     { "name": "Bob Smith", "total": 410 }
//   ]
// }
//
// No Matches:
// {
//   "count": 0,
//   "students": []
// }
//
// Purpose:
// Help teachers retrieve and analyze student performance efficiently.
const express = require('express');
const { resolve } = require('path');
const students = require('./data.json');  // Corrected the JSON file import

const app = express();
const port = 3010;



app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

app.post('/students/above-threshold', (req, res) => {
  const { threshold } = req.body;  // Extract threshold from the request body

  // Validate the threshold
  if (typeof threshold !== 'number' || threshold <= 0) {
    return res.status(400).json({ error: "Invalid threshold value" });
  }

  // Filter students whose total marks exceed the threshold
  const filteredStudents = students.filter(student => student.total > threshold);

  // Send response with count and list of students
  res.json({
    count: filteredStudents.length,
    students: filteredStudents
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

