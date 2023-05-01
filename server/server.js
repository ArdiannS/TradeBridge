const express = require("express");
const bcrypt = require("bcrypt");

const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/api", (req, res) => {
  res.json({ users: ["userOne", "userTwo", "userThree"] });
});
app.get("/api/users", (req, res) => {
  res.json({ users: ["userOne", "userTwo", "userThree", "user4"] });
});

var mysql = require("mysql");
var conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Letovica1",
  database: "TradeBridgeDb",
});

conn.connect(function (err) {
  if (err) throw err;
  console.log("Connection succesful...");
});

conn.query("select * from Users", (err, res) => {
  return console.log(res);
});

app.post("/signup", (req, res) => {
  const { username, password, email, date, userType } = req.body;

  const sqlSelect = `SELECT * FROM Users WHERE username = ? OR email = ?`;
  conn.query(sqlSelect, [username, email], (err, results) => {
    if (err) {
      return console.error(err.message);
    }
    if (results.length > 0) {
      res.status(409).send("User already exists");
    } else {
      bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
          return console.error(err.message);
        }
        const sqlInsert = `INSERT INTO Users (username, passwordi, email, birthday, usertype) VALUES (?,?,?,?,?)`;
        conn.query(
          sqlInsert,
          [username, hashedPassword, email, date, userType],
          (err, result) => {
            if (err) {
              return console.error(err.message);
            }
            res.send("User created successfully");
          }
        );
      });
    }
  });
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
app.post("/signin", (req, res) => {
  const { username, password } = req.body;
  const existsTheUsername = `SELECT * FROM Users WHERE username = ?`;

  conn.query(existsTheUsername, [username], (err, results1) => {
    if (results1?.length === 0) {
      res.send("Ky user nuk ekziston");
    } else {
      conn.query(existsTheUsername, [username], (err, results2) => {
        if (err) {
          return console.error(err.message);
        } else {
          const hashedPasswordFromDB = results2?.[0]?.passwordi;
          bcrypt.compare(password, hashedPasswordFromDB, (err, result) => {
            if (err) {
              return console.error(err.message);
            } else if (!result) {
              res.send("Username ose Password eshte gabime");
            } else {
              res.send("Sukses,MireSeVini!<3");
            }
          });
        }
      });
    }
  });
});
