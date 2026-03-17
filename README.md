# 🎓 College Student Management REST API

A simple Node.js REST API for managing student records.
This project demonstrates backend concepts like HTTP methods, RESTful API design, validation, error handling, pagination, and filtering using the Node.js HTTP module (without Express).

🚀 FEATURES

📌 CRUD Operations
GET /students – Get all students
GET /students/:id – Get a single student by ID
POST /students – Add a new student
PUT /students/:id – Update a student
DELETE /students/:id – Delete a student

📄 Student Data Structure
{
[
    { id: 1, name: "Rahul", email: "rahul@gmail.com", course: "CS", year: 2 },
    { id: 2, name: "Priya", email: "priya@gmail.com", course: "IT", year: 3 },
    { id: 3, name: "Amit", email: "amit@gmail.com", course: "EE", year: 4 }
];
}

🔎 Query Features

1️⃣ Pagination
Example: GET /students?page=1&limit=2
Returns limited students per page.

2️⃣ Filtering
Example: GET /students?year=3
Returns only students from year 3.

✅ Validation
- Required fields validation
- Email format validation using Regex
- Year must be between 1 and 4

⚠️ Error Handling
400 – Bad Request / Validation Error
404 – Student Not Found
404 – Invalid Route
400 – Invalid JSON Format

🧠 RESTful Design
- Resource-based URLs (/students)
- Proper HTTP methods (GET, POST, PUT, DELETE)
- JSON response format
- Clear status codes

🛠️ Tech Stack
Node.js
HTTP module
JavaScript
JSON

🧪 Testing the API
Postman, Browser, 
Example: GET http://localhost:4000/students

📈 Learning Outcomes
- Building APIs using Node.js HTTP module
- Implementing RESTful architecture
- Handling HTTP requests and responses
- Writing validation logic
- Implementing pagination and filtering
- Handling errors properly

🔮 Future Improvements
- Add database integration (MongoDB / PostgreSQL)
- Use Express.js for cleaner routing
- Add authentication (JWT)
- Implement search functionality

👩‍💻 Author
Thanushree
Backend enthusiast exploring Node.js, APIs, and AI-powered systems.
