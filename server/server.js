const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const database = require("./Configuration/DataBaseConnection");
multer = require("multer");

const upload = multer({ storage: multer.memoryStorage });
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.listen(5000);
const router = require("./Routes/routes");
app.use(router);
const path = require("path");
// const path = require("path");
app.use(express.static(path.join(__dirname, "src")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// app.post("/postjobs", (req, res) => {
// Extract user data from the POST request

//   const sql = `INSERT INTO Jobs (jobDescription, jobType,jobCategory,jobCity,jobPrice,idusers) VALUES (?,?,?,?,?,1)`;
//   conn.query(
//       sql,
//       [jobTitle, jobType, jobCategory, jobDescription, jobPrice, jobCity],
//       (err, result) => {
//         if (err) {
//           return console.error(err.message);
//         }
//         // Return success response to the client
//         res.send("Job has been created succesfully");
//       }
//   );
// });

// app.get("/jobs", (req, res) => {
//   const sql = "SELECT * FROM Jobs";
//   conn.query(sql, (err, result) => {
//     if (err) {
//       console.error(err.message);
//       res.status(500).send("Server Error");
//     } else {
//       res.send(result);
//     }
//   });
// });
