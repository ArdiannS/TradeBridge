const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.get("/api", (req, res) => {
//   res.json({ users: ["userOne", "userTwo", "userThree"] });
// });
// app.get("/api/users", (req, res) => {
//   res.json({ users: ["userOne", "userTwo", "userThree", "user4"] });
// });

var mysql = require("mysql");
var conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "TradeBridgeDb",
});

conn.connect(function (err) {
  if (err) throw err;
  console.log("Connection succesful...");
});

conn.query("select * from users", (err, res) => {
  return console.log(res);
});

app.post("/signin", (req, res) => {
  // Extract user data from the POST request
  const { username, password } = req.body;

  // Build a SQL INSERT statement
  const sql = `INSERT INTO users (idusers, emri, mbiemri,mosha) VALUES (2, ?, ?,20)`;

  // Execute the INSERT statement with user data
  conn.query(sql, [username, password], (err, result) => {
    if (err) {
      return console.error(err.message);
    }
    // Return success response to the client
    res.send("User created successfully");
  });
});

app.post("/postjobs", (req, res) => {
  // Extract user data from the POST request
  const { jobTitle, jobType, jobCategory, jobDescription, jobPrice, jobCity } =
    req.body;

  const sql = `INSERT INTO Jobs (jobDescription, jobType,jobCategory,jobCity,jobPrice,idusers) VALUES (?,?,?,?,?,1)`;
  conn.query(
    sql,
    [jobTitle, jobType, jobCategory, jobDescription, jobPrice, jobCity],
    (err, result) => {
      if (err) {
        return console.error(err.message);
      }
      // Return success response to the client
      res.send("Job has been created succesfully");
    }
  );
});
app.listen(5000, () => {
  console.log("Server started on port 3000");
});

app.get("/jobs", (req, res) => {
  const sql = "SELECT * FROM Jobs";
  conn.query(sql, (err, result) => {
    if (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    } else {
      res.send(result);
    }
  });
});
