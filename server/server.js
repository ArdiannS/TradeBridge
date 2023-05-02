const express = require("express");
const bodyParser = require("body-parser");
const session = require('express-session');

const app = express();

app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

const database = require("./Configuration/DataBaseConnection");
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
