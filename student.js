const http = require('http');

let students = [
    { id: 1, name: "Rahul", email: "rahul@gmail.com", course: "CS", year: 2 },
    { id: 2, name: "Priya", email: "priya@gmail.com", course: "IT", year: 3 },
    { id: 3, name: "Amit", email: "amit@gmail.com", course: "EE", year: 4 }
];

const server = http.createServer((req, res) => {

    res.setHeader("Content-Type", "application/json");

    const url = new URL(req.url, `http://${req.headers.host}`);


    if (req.method === "GET" && url.pathname === "/students") {

        let result = students;

        // query filtering
        const year = url.searchParams.get("year");
        if (year) {
            result = result.filter(s => s.year == year);
        }

        // pagination
        const page = parseInt(url.searchParams.get("page")) || 1;
        const limit = parseInt(url.searchParams.get("limit")) || result.length;

        const start = (page - 1) * limit;
        const end = start + limit;

        result = result.slice(start, end);

        res.end(JSON.stringify(result));
    }

    // GET 
    else if(req.method === "GET" && req.url.startsWith("/students/")) {

        const id = parseInt(req.url.split("/")[2]);
        const student = students.find(s => s.id === id);

        if(!student){
            res.statusCode = 404;
            return res.end(JSON.stringify({
                success:false,
                message:"Student not found"
            }));
        }

        res.end(JSON.stringify(student));
    }

    // POST 
    else if (req.method === "POST" && req.url === "/students") {

        let body = "";

        req.on("data", (data) => {
            body += data;
        });

        req.on("end", () => {

            const student = JSON.parse(body);

            const emailRegex = /\S+@\S+\.\S+/;

            // validation
            if (!student.name || !student.email || !student.course || !student.year) {
                res.statusCode = 400;
                return res.end(JSON.stringify({
                    success: false,
                    message: "All fields are required"
                }));
            }

            if (!emailRegex.test(student.email)) {
                res.statusCode = 400;
                return res.end(JSON.stringify({
                    success:false,
                    message:"Invalid email format"
                }));
            }

            if (student.year < 1 || student.year > 4) {
                res.statusCode = 400;
                return res.end(JSON.stringify({
                    success: false,
                    message: "Year must be between 1 and 4"
                }));
            }

            student.id = students.length + 1;

            students.push(student);

            res.end(JSON.stringify({
                message: "Student added successfully",
                student
            }));
        });
    }

    // PUT 
    else if(req.method==="PUT" && req.url.startsWith("/students/")){

        const id = parseInt(req.url.split("/")[2]);

        let body = "";

        req.on("data",(data)=>{
            body += data;
        });

        req.on("end",()=>{
            const updated = JSON.parse(body);

            const student = students.find(s => s.id === id);

            if(!student){
                res.statusCode = 404;
                return res.end(JSON.stringify({
                    success:false,
                    message:"Student not found"
                }));
            }

            student.name = updated.name;
            student.email = updated.email;
            student.course = updated.course;
            student.year = updated.year;

            res.end(JSON.stringify({
                message:"Student updated",
                student
            }));
        });
    }

    // DELETE 
    else if (req.method === "DELETE" && req.url.startsWith("/students/")) {

        const id = parseInt(req.url.split("/")[2]);

        students = students.filter(s => s.id !== id);

        res.end(JSON.stringify({
            message: "Student deleted"
        }));
    }

    // Invalid route
    else {
        res.statusCode = 404;
        res.end(JSON.stringify({
            success: false,
            message: "Route not found"
        }));
    }

});

server.listen(4000, () => {
    console.log("Server running on port 4000");
});
