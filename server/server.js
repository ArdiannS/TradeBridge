const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const database = require('./Configuration/DataBaseConnection')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.listen(5000);
const router = require("./Routes/routes");
app.use(router);


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
